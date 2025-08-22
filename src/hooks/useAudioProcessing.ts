import { useState, useCallback } from 'react'
import { supabase, db, storage } from '@/lib/supabase'
import { aiServices, aiUtils } from '@/lib/firebase-ai'
import type { Database } from '@/lib/supabase'

type Lesson = Database['public']['Tables']['lessons']['Row']
type LessonInsert = Database['public']['Tables']['lessons']['Insert']

interface ProcessingState {
  isProcessing: boolean
  progress: number
  currentStep: string
  error: string | null
  result: Lesson | null
}

export function useAudioProcessing() {
  const [state, setState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    currentStep: '',
    error: null,
    result: null,
  })

  const updateProgress = useCallback((progress: number, step: string) => {
    setState(prev => ({
      ...prev,
      progress,
      currentStep: step,
    }))
  }, [])

  const processAudioFile = useCallback(async (
    audioFile: File,
    lessonData: {
      title: string
      subjectId: string
      userId: string
    }
  ): Promise<Lesson | null> => {
    try {
      setState({
        isProcessing: true,
        progress: 0,
        currentStep: 'Validating file...',
        error: null,
        result: null,
      })

      // 1. Validate audio file
      const validation = aiUtils.validateAudioFile(audioFile)
      if (!validation.valid) {
        throw new Error(validation.error)
      }

      updateProgress(10, 'Uploading audio file...')

      // 2. Generate unique file path
      const fileExtension = audioFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`
      const filePath = `${lessonData.userId}/${fileName}`

      // 3. Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await storage.audioLessons.upload(filePath, audioFile)
      
      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      updateProgress(25, 'Creating lesson record...')

      // 4. Create lesson record in database
      const lessonInsert: LessonInsert = {
        ...lessonData,
        audio_url: uploadData.path,
        duration: null, // Will be updated after processing
        status: 'processing',
        ai_processing_metadata: {
          originalFileName: audioFile.name,
          fileSize: audioFile.size,
          startedAt: new Date().toISOString(),
        },
      }

      const { data: lesson, error: lessonError } = await db.lessons.create(lessonInsert)
      
      if (lessonError || !lesson) {
        throw new Error(`Failed to create lesson: ${lessonError?.message}`)
      }

      const lessonId = Array.isArray(lesson) ? lesson[0].id : lesson.id

      updateProgress(35, 'Transcribing audio...')

      // 5. Transcribe audio using Firebase AI
      const transcriptionResult = await aiServices.transcribeAudio(audioFile)

      updateProgress(55, 'Generating summary...')

      // 6. Generate summary
      const summaryResult = await aiServices.generateSummary(transcriptionResult.text)

      updateProgress(75, 'Creating quiz questions...')

      // 7. Generate quiz
      const quizResult = await aiServices.generateQuiz(transcriptionResult.text, 'medium', 10)

      updateProgress(85, 'Generating mind map...')

      // 8. Generate mind map
      const mindMapResult = await aiServices.generateMindMap(transcriptionResult.text)

      updateProgress(95, 'Saving results...')

      // 9. Update lesson with AI processing results
      const processingMetadata = {
        originalFileName: audioFile.name,
        fileSize: audioFile.size,
        startedAt: lessonInsert.ai_processing_metadata?.startedAt,
        completedAt: new Date().toISOString(),
        transcriptionConfidence: transcriptionResult.confidence,
        summaryKeyPoints: summaryResult.keyPoints.length,
        quizQuestions: quizResult.questions.length,
        mindMapNodes: mindMapResult.nodes.length,
      }

      const { data: updatedLesson, error: updateError } = await db.lessons.update(lessonId, {
        transcript: transcriptionResult.text,
        summary: summaryResult.summary,
        status: 'completed',
        ai_processing_metadata: processingMetadata,
      })

      if (updateError) {
        throw new Error(`Failed to update lesson: ${updateError.message}`)
      }

      // 10. Save generated quiz
      if (quizResult.questions.length > 0) {
        await db.quizzes.create({
          lesson_id: lessonId,
          title: quizResult.title,
          questions: quizResult.questions,
          difficulty: 'medium',
        })
      }

      updateProgress(100, 'Processing complete!')

      const finalLesson = Array.isArray(updatedLesson) ? updatedLesson[0] : updatedLesson

      setState(prev => ({
        ...prev,
        isProcessing: false,
        progress: 100,
        currentStep: 'Complete',
        result: finalLesson,
      }))

      return finalLesson || null

    } catch (error) {
      console.error('Audio processing failed:', error)
      
      setState(prev => ({
        ...prev,
        isProcessing: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }))

      return null
    }
  }, [updateProgress])

  const recordAudio = useCallback(async (): Promise<Blob | null> => {
    try {
      setState(prev => ({
        ...prev,
        currentStep: 'Requesting microphone access...',
        error: null,
      }))

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      })

      return new Promise((resolve, reject) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus'
        })
        
        const chunks: Blob[] = []

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' })
          stream.getTracks().forEach(track => track.stop())
          resolve(blob)
        }

        mediaRecorder.onerror = (event) => {
          stream.getTracks().forEach(track => track.stop())
          reject(new Error('Recording failed'))
        }

        // Start recording
        mediaRecorder.start(1000) // Collect data every second

        // Auto-stop after 10 minutes (for safety)
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop()
          }
        }, 10 * 60 * 1000)

        // Return control to stop recording manually
        setState(prev => ({
          ...prev,
          currentStep: 'Recording... (click stop when finished)',
        }))
      })

    } catch (error) {
      console.error('Recording failed:', error)
      setState(prev => ({
        ...prev,
        error: 'Failed to access microphone. Please check permissions.',
      }))
      return null
    }
  }, [])

  const resetState = useCallback(() => {
    setState({
      isProcessing: false,
      progress: 0,
      currentStep: '',
      error: null,
      result: null,
    })
  }, [])

  return {
    ...state,
    processAudioFile,
    recordAudio,
    resetState,
    estimateProcessingTime: aiUtils.getEstimatedProcessingTime,
    validateAudioFile: aiUtils.validateAudioFile,
  }
}