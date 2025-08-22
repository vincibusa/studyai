import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create Supabase client with TypeScript types
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Legacy Database type (keeping for compatibility, but use imported types instead)
export type LegacyDatabase = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          university: string | null
          course: string | null
          year: number | null
          target_gpa: number | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          university?: string | null
          course?: string | null
          year?: number | null
          target_gpa?: number | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          university?: string | null
          course?: string | null
          year?: number | null
          target_gpa?: number | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          user_id: string
          name: string
          professor: string | null
          credits: number | null
          current_grade: number | null
          target_grade: number | null
          color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          professor?: string | null
          credits?: number | null
          current_grade?: number | null
          target_grade?: number | null
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          professor?: string | null
          credits?: number | null
          current_grade?: number | null
          target_grade?: number | null
          color?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          user_id: string
          subject_id: string
          title: string
          audio_url: string | null
          duration: number | null
          transcript: string | null
          summary: string | null
          status: 'uploading' | 'processing' | 'completed' | 'error'
          ai_processing_metadata: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id: string
          title: string
          audio_url?: string | null
          duration?: number | null
          transcript?: string | null
          summary?: string | null
          status?: 'uploading' | 'processing' | 'completed' | 'error'
          ai_processing_metadata?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string
          title?: string
          audio_url?: string | null
          duration?: number | null
          transcript?: string | null
          summary?: string | null
          status?: 'uploading' | 'processing' | 'completed' | 'error'
          ai_processing_metadata?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string
          title: string
          questions: any
          difficulty: 'easy' | 'medium' | 'hard'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          title: string
          questions: any
          difficulty: 'easy' | 'medium' | 'hard'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          title?: string
          questions?: any
          difficulty?: 'easy' | 'medium' | 'hard'
          created_at?: string
          updated_at?: string
        }
      }
      quiz_attempts: {
        Row: {
          id: string
          quiz_id: string
          user_id: string
          answers: any
          score: number
          completed_at: string
        }
        Insert: {
          id?: string
          quiz_id: string
          user_id: string
          answers: any
          score: number
          completed_at?: string
        }
        Update: {
          id?: string
          quiz_id?: string
          user_id?: string
          answers?: any
          score?: number
          completed_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          lesson_id: string | null
          subject_id: string | null
          messages: any
          context_metadata: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id?: string | null
          subject_id?: string | null
          messages: any
          context_metadata?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string | null
          subject_id?: string | null
          messages?: any
          context_metadata?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      study_analytics: {
        Row: {
          id: string
          user_id: string
          date: string
          study_time_minutes: number
          lessons_completed: number
          quizzes_completed: number
          average_quiz_score: number | null
          subjects_studied: string[]
          ai_insights: any | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          study_time_minutes?: number
          lessons_completed?: number
          quizzes_completed?: number
          average_quiz_score?: number | null
          subjects_studied?: string[]
          ai_insights?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          study_time_minutes?: number
          lessons_completed?: number
          quizzes_completed?: number
          average_quiz_score?: number | null
          subjects_studied?: string[]
          ai_insights?: any | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Type-safe Supabase client
export type SupabaseClient = ReturnType<typeof createClient<Database>>

// Current database types (from generated schema)
import type { Tables, TablesInsert, TablesUpdate } from '@/types/database'
export type { Tables, TablesInsert, TablesUpdate }
export type Profile = Tables<'profiles'>
export type Subject = Tables<'subjects'>
export type Lesson = Tables<'lessons'>
export type Quiz = Tables<'quizzes'>
export type QuizQuestion = Tables<'quiz_questions'>
export type QuizAttempt = Tables<'quiz_attempts'>
export type ChatSession = Tables<'chat_sessions'>
export type ChatMessage = Tables<'chat_messages'>
export type MindMap = Tables<'mind_maps'>

// Auth helpers
export const auth = {
  signUp: (email: string, password: string, userData?: any) =>
    supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    }),
  
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),
  
  signInWithOAuth: (provider: 'google' | 'apple') =>
    supabase.auth.signInWithOAuth({ provider }),
  
  signOut: () => supabase.auth.signOut(),
  
  getUser: () => supabase.auth.getUser(),
  
  getSession: () => supabase.auth.getSession(),
  
  onAuthStateChange: (callback: (event: any, session: any) => void) =>
    supabase.auth.onAuthStateChange(callback),
}

// Database helpers
export const db = {
  profiles: {
    get: (userId: string) =>
      supabase.from('profiles').select('*').eq('id', userId).single(),
    
    create: (profileData: Database['public']['Tables']['profiles']['Insert']) =>
      supabase.from('profiles').insert(profileData),
    
    update: (userId: string, updates: Database['public']['Tables']['profiles']['Update']) =>
      supabase.from('profiles').update(updates).eq('id', userId),
  },
  
  subjects: {
    getByUser: (userId: string) =>
      supabase.from('subjects').select('*').eq('user_id', userId),
    
    create: (subjectData: Database['public']['Tables']['subjects']['Insert']) =>
      supabase.from('subjects').insert(subjectData),
    
    update: (subjectId: string, updates: Database['public']['Tables']['subjects']['Update']) =>
      supabase.from('subjects').update(updates).eq('id', subjectId),
    
    delete: (subjectId: string) =>
      supabase.from('subjects').delete().eq('id', subjectId),
  },
  
  lessons: {
    getByUser: (userId: string) =>
      supabase
        .from('lessons')
        .select(`
          *,
          subjects (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false }),
    
    getById: (lessonId: string) =>
      supabase
        .from('lessons')
        .select(`
          *,
          subjects (*),
          quizzes (*)
        `)
        .eq('id', lessonId)
        .single(),
    
    create: (lessonData: Database['public']['Tables']['lessons']['Insert']) =>
      supabase.from('lessons').insert(lessonData),
    
    update: (lessonId: string, updates: Database['public']['Tables']['lessons']['Update']) =>
      supabase.from('lessons').update(updates).eq('id', lessonId),
    
    delete: (lessonId: string) =>
      supabase.from('lessons').delete().eq('id', lessonId),
  },
  
  quizzes: {
    getByLesson: (lessonId: string) =>
      supabase.from('quizzes').select('*').eq('lesson_id', lessonId),
    
    create: (quizData: Database['public']['Tables']['quizzes']['Insert']) =>
      supabase.from('quizzes').insert(quizData),
  },
  
  chatSessions: {
    getByUser: (userId: string) =>
      supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false }),
    
    create: (chatData: Database['public']['Tables']['chat_sessions']['Insert']) =>
      supabase.from('chat_sessions').insert(chatData),
    
    update: (sessionId: string, updates: Database['public']['Tables']['chat_sessions']['Update']) =>
      supabase.from('chat_sessions').update(updates).eq('id', sessionId),
  },
}

// Storage helpers
export const storage = {
  audioLessons: {
    upload: (filePath: string, file: File) =>
      supabase.storage.from('audio-lessons').upload(filePath, file),
    
    download: (filePath: string) =>
      supabase.storage.from('audio-lessons').download(filePath),
    
    getPublicUrl: (filePath: string) =>
      supabase.storage.from('audio-lessons').getPublicUrl(filePath),
    
    remove: (filePaths: string[]) =>
      supabase.storage.from('audio-lessons').remove(filePaths),
  },
}