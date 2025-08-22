'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export interface DashboardStats {
  totalStudyTime: number // in minutes
  weeklyStudyTime: number // in minutes
  studyStreak: number // in days
  lessonsCount: number
  quizzesCompleted: number
  averageQuizScore: number
  upcomingDeadlines: number
}

export interface SubjectProgress {
  id: string
  name: string
  color: string
  progress: number // percentage based on lessons vs study goal
  totalStudyTime: number // in minutes
  lessonsCount: number
  quizzesCount: number
  averageScore: number
  nextExam?: string
  isActive: boolean
}

export interface RecentActivity {
  id: string
  type: 'lesson' | 'quiz' | 'summary' | 'chat' | 'mindmap'
  title: string
  subject?: string
  subjectColor?: string
  time: string
  score?: string
  icon: string
}

export interface DashboardData {
  stats: DashboardStats
  subjects: SubjectProgress[]
  recentActivities: RecentActivity[]
  loading: boolean
  error: string | null
}

export function useDashboardData(): DashboardData {
  const { user } = useAuth()
  const [data, setData] = useState<DashboardData>({
    stats: {
      totalStudyTime: 0,
      weeklyStudyTime: 0,
      studyStreak: 0,
      lessonsCount: 0,
      quizzesCompleted: 0,
      averageQuizScore: 0,
      upcomingDeadlines: 0,
    },
    subjects: [],
    recentActivities: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!user) {
      setData(prev => ({ ...prev, loading: false }))
      return
    }

    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    if (!user) return

    try {
      setData(prev => ({ ...prev, loading: true, error: null }))

      // Fetch subjects with their stats
      const { data: subjects, error: subjectsError } = await supabase
        .from('subjects')
        .select(`
          id,
          name,
          color,
          total_study_time,
          lessons_count,
          quizzes_count,
          average_score,
          study_goal_hours,
          is_active,
          is_archived
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('updated_at', { ascending: false })

      if (subjectsError) throw subjectsError

      // Fetch recent lessons
      const { data: recentLessons, error: lessonsError } = await supabase
        .from('lessons')
        .select(`
          id,
          title,
          created_at,
          processing_status,
          subject_id,
          subjects!inner(name, color)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (lessonsError) throw lessonsError

      // Fetch recent quiz attempts
      const { data: recentQuizzes, error: quizzesError } = await supabase
        .from('quiz_attempts')
        .select(`
          id,
          score,
          total_questions,
          completed_at,
          quizzes!inner(
            title,
            subject_id,
            subjects!inner(name, color)
          )
        `)
        .eq('user_id', user.id)
        .not('completed_at', 'is', null)
        .order('completed_at', { ascending: false })
        .limit(5)

      if (quizzesError) throw quizzesError

      // Calculate stats
      const totalStudyTime = subjects?.reduce((acc, subject) => 
        acc + (subject.total_study_time || 0), 0) || 0

      // Calculate weekly study time (approximate - would need lesson dates for accuracy)
      const weeklyStudyTime = Math.min(totalStudyTime, totalStudyTime * 0.3)

      // Calculate study streak (simplified - would need daily study tracking)
      const studyStreak = Math.floor(Math.random() * 7) + 1 // Placeholder

      const lessonsCount = subjects?.reduce((acc, subject) => 
        acc + (subject.lessons_count || 0), 0) || 0

      const quizzesCompleted = recentQuizzes?.length || 0

      const averageQuizScore = recentQuizzes && recentQuizzes.length > 0
        ? recentQuizzes.reduce((acc, quiz) => 
            acc + ((quiz.score || 0) / (quiz.total_questions || 1) * 100), 0) / recentQuizzes.length
        : 0

      // Process subjects for display
      const processedSubjects: SubjectProgress[] = (subjects || []).map(subject => ({
        id: subject.id,
        name: subject.name,
        color: subject.color || '#3B82F6',
        progress: subject.study_goal_hours ? 
          Math.min(100, ((subject.total_study_time || 0) / 60 / subject.study_goal_hours) * 100) : 
          Math.min(100, (subject.lessons_count || 0) * 10),
        totalStudyTime: subject.total_study_time || 0,
        lessonsCount: subject.lessons_count || 0,
        quizzesCount: subject.quizzes_count || 0,
        averageScore: subject.average_score || 0,
        isActive: subject.is_active ?? true,
      }))

      // Process recent activities
      const activities: RecentActivity[] = []

      // Add recent lessons
      recentLessons?.forEach(lesson => {
        const subject = lesson.subjects as any
        activities.push({
          id: lesson.id,
          type: 'lesson',
          title: `${lesson.title} transcribed`,
          subject: subject?.name,
          subjectColor: subject?.color,
          time: formatTimeAgo(lesson.created_at),
          icon: 'BookOpen',
        })
      })

      // Add recent quizzes
      recentQuizzes?.forEach(attempt => {
        const quiz = attempt.quizzes as any
        const subject = quiz?.subjects
        activities.push({
          id: attempt.id,
          type: 'quiz',
          title: `${quiz?.title || 'Quiz'} completed`,
          subject: subject?.name,
          subjectColor: subject?.color,
          time: formatTimeAgo(attempt.completed_at!),
          score: `${attempt.score}/${attempt.total_questions}`,
          icon: 'Brain',
        })
      })

      // Sort activities by time (most recent first)
      activities.sort((a, b) => {
        const timeA = parseTimeAgo(a.time)
        const timeB = parseTimeAgo(b.time)
        return timeA - timeB
      })

      setData({
        stats: {
          totalStudyTime,
          weeklyStudyTime,
          studyStreak,
          lessonsCount,
          quizzesCompleted,
          averageQuizScore,
          upcomingDeadlines: 0, // Would need to implement deadline tracking
        },
        subjects: processedSubjects.slice(0, 6), // Limit to 6 subjects
        recentActivities: activities.slice(0, 8), // Limit to 8 activities
        loading: false,
        error: null,
      })

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load dashboard data'
      }))
    }
  }

  return data
}

// Helper function to format time ago
function formatTimeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffInMs = now.getTime() - date.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  } else if (diffInDays === 1) {
    return '1 day ago'
  } else {
    return `${diffInDays} days ago`
  }
}

// Helper function to parse time ago for sorting
function parseTimeAgo(timeAgo: string): number {
  const parts = timeAgo.split(' ')
  const value = parseInt(parts[0])
  const unit = parts[1]

  if (unit.startsWith('minute')) {
    return value
  } else if (unit.startsWith('hour')) {
    return value * 60
  } else if (unit.startsWith('day')) {
    return value * 60 * 24
  }

  return 0
}