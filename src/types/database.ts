export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          confidence: number | null
          content: string
          created_at: string
          id: string
          is_deleted: boolean | null
          is_edited: boolean | null
          role: string
          session_id: string
          sources: Json | null
          suggestions: Json | null
          tokens_used: number | null
          updated_at: string
        }
        Insert: {
          confidence?: number | null
          content: string
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          role: string
          session_id: string
          sources?: Json | null
          suggestions?: Json | null
          tokens_used?: number | null
          updated_at?: string
        }
        Update: {
          confidence?: number | null
          content?: string
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          is_edited?: boolean | null
          role?: string
          session_id?: string
          sources?: Json | null
          suggestions?: Json | null
          tokens_used?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          context_type: string | null
          created_at: string
          id: string
          last_message_at: string | null
          lesson_id: string | null
          message_count: number | null
          status: string | null
          subject_id: string | null
          title: string | null
          total_tokens_used: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          context_type?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          lesson_id?: string | null
          message_count?: number | null
          status?: string | null
          subject_id?: string | null
          title?: string | null
          total_tokens_used?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          context_type?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          lesson_id?: string | null
          message_count?: number | null
          status?: string | null
          subject_id?: string | null
          title?: string | null
          total_tokens_used?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_sessions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_sessions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          audio_duration: number | null
          audio_file_name: string | null
          audio_file_url: string | null
          audio_size: number | null
          bookmarked: boolean | null
          concepts: Json | null
          created_at: string
          description: string | null
          estimated_reading_time: number | null
          id: string
          key_points: Json | null
          last_reviewed_at: string | null
          lesson_date: string | null
          lesson_type: string | null
          processed_at: string | null
          processing_error: string | null
          processing_status: string | null
          study_time: number | null
          subject_id: string | null
          summary: string | null
          tags: Json | null
          times_reviewed: number | null
          title: string
          transcript: string | null
          transcript_confidence: number | null
          updated_at: string
          user_id: string
          user_notes: string | null
          user_rating: number | null
        }
        Insert: {
          audio_duration?: number | null
          audio_file_name?: string | null
          audio_file_url?: string | null
          audio_size?: number | null
          bookmarked?: boolean | null
          concepts?: Json | null
          created_at?: string
          description?: string | null
          estimated_reading_time?: number | null
          id?: string
          key_points?: Json | null
          last_reviewed_at?: string | null
          lesson_date?: string | null
          lesson_type?: string | null
          processed_at?: string | null
          processing_error?: string | null
          processing_status?: string | null
          study_time?: number | null
          subject_id?: string | null
          summary?: string | null
          tags?: Json | null
          times_reviewed?: number | null
          title: string
          transcript?: string | null
          transcript_confidence?: number | null
          updated_at?: string
          user_id: string
          user_notes?: string | null
          user_rating?: number | null
        }
        Update: {
          audio_duration?: number | null
          audio_file_name?: string | null
          audio_file_url?: string | null
          audio_size?: number | null
          bookmarked?: boolean | null
          concepts?: Json | null
          created_at?: string
          description?: string | null
          estimated_reading_time?: number | null
          id?: string
          key_points?: Json | null
          last_reviewed_at?: string | null
          lesson_date?: string | null
          lesson_type?: string | null
          processed_at?: string | null
          processing_error?: string | null
          processing_status?: string | null
          study_time?: number | null
          subject_id?: string | null
          summary?: string | null
          tags?: Json | null
          times_reviewed?: number | null
          title?: string
          transcript?: string | null
          transcript_confidence?: number | null
          updated_at?: string
          user_id?: string
          user_notes?: string | null
          user_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      mind_maps: {
        Row: {
          central_concept: string
          color_scheme: string | null
          created_at: string
          id: string
          last_viewed_at: string | null
          layout_type: string | null
          lesson_id: string | null
          nodes: Json
          subject_id: string | null
          themes: Json | null
          title: string
          updated_at: string
          user_id: string
          views_count: number | null
        }
        Insert: {
          central_concept: string
          color_scheme?: string | null
          created_at?: string
          id?: string
          last_viewed_at?: string | null
          layout_type?: string | null
          lesson_id?: string | null
          nodes: Json
          subject_id?: string | null
          themes?: Json | null
          title: string
          updated_at?: string
          user_id: string
          views_count?: number | null
        }
        Update: {
          central_concept?: string
          color_scheme?: string | null
          created_at?: string
          id?: string
          last_viewed_at?: string | null
          layout_type?: string | null
          lesson_id?: string | null
          nodes?: Json
          subject_id?: string | null
          themes?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mind_maps_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mind_maps_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          daily_study_goal: number | null
          education_level: string | null
          email: string
          field_of_study: string | null
          full_name: string | null
          id: string
          institution: string | null
          last_active_at: string | null
          learning_style: Json | null
          notification_preferences: Json | null
          preferred_difficulty: string | null
          preferred_language: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          daily_study_goal?: number | null
          education_level?: string | null
          email: string
          field_of_study?: string | null
          full_name?: string | null
          id: string
          institution?: string | null
          last_active_at?: string | null
          learning_style?: Json | null
          notification_preferences?: Json | null
          preferred_difficulty?: string | null
          preferred_language?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          daily_study_goal?: number | null
          education_level?: string | null
          email?: string
          field_of_study?: string | null
          full_name?: string | null
          id?: string
          institution?: string | null
          last_active_at?: string | null
          learning_style?: Json | null
          notification_preferences?: Json | null
          preferred_difficulty?: string | null
          preferred_language?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quiz_answers: {
        Row: {
          answered_at: string
          attempt_id: string
          id: string
          is_correct: boolean
          question_id: string
          time_taken: number | null
          user_answer: string | null
        }
        Insert: {
          answered_at?: string
          attempt_id: string
          id?: string
          is_correct: boolean
          question_id: string
          time_taken?: number | null
          user_answer?: string | null
        }
        Update: {
          answered_at?: string
          attempt_id?: string
          id?: string
          is_correct?: boolean
          question_id?: string
          time_taken?: number | null
          user_answer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_attempts: {
        Row: {
          completed_at: string | null
          correct_answers: number
          created_at: string
          id: string
          quiz_id: string
          score: number
          started_at: string
          status: string | null
          time_taken: number | null
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          correct_answers: number
          created_at?: string
          id?: string
          quiz_id: string
          score: number
          started_at?: string
          status?: string | null
          time_taken?: number | null
          total_questions: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          correct_answers?: number
          created_at?: string
          id?: string
          quiz_id?: string
          score?: number
          started_at?: string
          status?: string | null
          time_taken?: number | null
          total_questions?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string
          difficulty: string | null
          explanation: string | null
          id: string
          options: Json | null
          question_order: number
          question_text: string
          question_type: string
          quiz_id: string
          times_answered: number | null
          times_correct: number | null
          topic: string | null
          updated_at: string
        }
        Insert: {
          correct_answer: string
          created_at?: string
          difficulty?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          question_order: number
          question_text: string
          question_type: string
          quiz_id: string
          times_answered?: number | null
          times_correct?: number | null
          topic?: string | null
          updated_at?: string
        }
        Update: {
          correct_answer?: string
          created_at?: string
          difficulty?: string | null
          explanation?: string | null
          id?: string
          options?: Json | null
          question_order?: number
          question_text?: string
          question_type?: string
          quiz_id?: string
          times_answered?: number | null
          times_correct?: number | null
          topic?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          attempts_count: number | null
          average_score: number | null
          best_score: number | null
          created_at: string
          description: string | null
          difficulty: string | null
          estimated_time: number | null
          id: string
          last_attempt_at: string | null
          lesson_id: string | null
          question_count: number
          status: string | null
          subject_id: string | null
          tags: Json | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts_count?: number | null
          average_score?: number | null
          best_score?: number | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          estimated_time?: number | null
          id?: string
          last_attempt_at?: string | null
          lesson_id?: string | null
          question_count?: number
          status?: string | null
          subject_id?: string | null
          tags?: Json | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts_count?: number | null
          average_score?: number | null
          best_score?: number | null
          created_at?: string
          description?: string | null
          difficulty?: string | null
          estimated_time?: number | null
          id?: string
          last_attempt_at?: string | null
          lesson_id?: string | null
          question_count?: number
          status?: string | null
          subject_id?: string | null
          tags?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quizzes_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          academic_year: string | null
          average_score: number | null
          color: string | null
          created_at: string
          credits: number | null
          description: string | null
          icon: string | null
          id: string
          institution: string | null
          is_active: boolean | null
          is_archived: boolean | null
          lessons_count: number | null
          name: string
          professor: string | null
          quizzes_count: number | null
          semester: string | null
          study_goal_hours: number | null
          target_grade: string | null
          total_study_time: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          academic_year?: string | null
          average_score?: number | null
          color?: string | null
          created_at?: string
          credits?: number | null
          description?: string | null
          icon?: string | null
          id?: string
          institution?: string | null
          is_active?: boolean | null
          is_archived?: boolean | null
          lessons_count?: number | null
          name: string
          professor?: string | null
          quizzes_count?: number | null
          semester?: string | null
          study_goal_hours?: number | null
          target_grade?: string | null
          total_study_time?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          academic_year?: string | null
          average_score?: number | null
          color?: string | null
          created_at?: string
          credits?: number | null
          description?: string | null
          icon?: string | null
          id?: string
          institution?: string | null
          is_active?: boolean | null
          is_archived?: boolean | null
          lessons_count?: number | null
          name?: string
          professor?: string | null
          quizzes_count?: number | null
          semester?: string | null
          study_goal_hours?: number | null
          target_grade?: string | null
          total_study_time?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const