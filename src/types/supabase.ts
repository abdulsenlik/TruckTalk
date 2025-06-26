export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          author: string
          content: string
          cover_image: string | null
          created_at: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          summary: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string
          content: string
          cover_image?: string | null
          created_at?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          summary: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          content?: string
          cover_image?: string | null
          created_at?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          summary?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      bootcamp_dialogue_vocabulary: {
        Row: {
          definition: string | null
          dialogue_id: string
          id: number
          translation: string | null
          word: string
        }
        Insert: {
          definition?: string | null
          dialogue_id: string
          id?: number
          translation?: string | null
          word: string
        }
        Update: {
          definition?: string | null
          dialogue_id?: string
          id?: number
          translation?: string | null
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_dialogue_vocabulary_dialogue_id_fkey"
            columns: ["dialogue_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_dialogues"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_dialogues: {
        Row: {
          description: string | null
          english_text: string | null
          id: string
          section_id: string
          title: string
          translated_text: string | null
        }
        Insert: {
          description?: string | null
          english_text?: string | null
          id: string
          section_id: string
          title: string
          translated_text?: string | null
        }
        Update: {
          description?: string | null
          english_text?: string | null
          id?: string
          section_id?: string
          title?: string
          translated_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_dialogues_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_exercise_options: {
        Row: {
          exercise_id: string
          id: number
          is_correct: boolean | null
          option_text: string
        }
        Insert: {
          exercise_id: string
          id?: number
          is_correct?: boolean | null
          option_text: string
        }
        Update: {
          exercise_id?: string
          id?: number
          is_correct?: boolean | null
          option_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_exercise_options_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_exercises: {
        Row: {
          answer: string | null
          explanation: string | null
          id: string
          question: string
          section_id: string
          type: string
        }
        Insert: {
          answer?: string | null
          explanation?: string | null
          id: string
          question: string
          section_id: string
          type: string
        }
        Update: {
          answer?: string | null
          explanation?: string | null
          id?: string
          question?: string
          section_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_exercises_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_modules: {
        Row: {
          completion: number | null
          day_number: number
          description: string | null
          duration: number | null
          id: number
          title: string
        }
        Insert: {
          completion?: number | null
          day_number: number
          description?: string | null
          duration?: number | null
          id?: number
          title: string
        }
        Update: {
          completion?: number | null
          day_number?: number
          description?: string | null
          duration?: number | null
          id?: number
          title?: string
        }
        Relationships: []
      }
      bootcamp_practice_phrases: {
        Row: {
          audio_url: string | null
          id: number
          phrase: string
          section_id: string
        }
        Insert: {
          audio_url?: string | null
          id?: number
          phrase: string
          section_id: string
        }
        Update: {
          audio_url?: string | null
          id?: number
          phrase?: string
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_practice_phrases_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_practice_scenarios: {
        Row: {
          audio_url: string | null
          expected_response: string | null
          id: string
          prompt: string | null
          section_id: string
          situation: string | null
          title: string
        }
        Insert: {
          audio_url?: string | null
          expected_response?: string | null
          id: string
          prompt?: string | null
          section_id: string
          situation?: string | null
          title: string
        }
        Update: {
          audio_url?: string | null
          expected_response?: string | null
          id?: string
          prompt?: string | null
          section_id?: string
          situation?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_practice_scenarios_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_practice_tips: {
        Row: {
          id: number
          scenario_id: string
          tip: string
        }
        Insert: {
          id?: number
          scenario_id: string
          tip: string
        }
        Update: {
          id?: number
          scenario_id?: string
          tip?: string
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_practice_tips_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_practice_scenarios"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_quiz_options: {
        Row: {
          id: number
          option_text: string
          question_id: number
        }
        Insert: {
          id?: number
          option_text: string
          question_id: number
        }
        Update: {
          id?: number
          option_text?: string
          question_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_quiz_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_quiz_questions: {
        Row: {
          correct_answer: string
          id: number
          question: string
          section_id: string
        }
        Insert: {
          correct_answer: string
          id?: number
          question: string
          section_id: string
        }
        Update: {
          correct_answer?: string
          id?: number
          question?: string
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_quiz_questions_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_sections: {
        Row: {
          completed: boolean | null
          description: string | null
          duration: number | null
          id: string
          module_id: number
          order: number
          title: string
          type: string
        }
        Insert: {
          completed?: boolean | null
          description?: string | null
          duration?: number | null
          id: string
          module_id: number
          order: number
          title: string
          type: string
        }
        Update: {
          completed?: boolean | null
          description?: string | null
          duration?: number | null
          id?: string
          module_id?: number
          order?: number
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_sections_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      bootcamp_vocabulary: {
        Row: {
          audio_url: string | null
          definition: string | null
          example: string | null
          id: number
          section_id: string
          translation_kg: string | null
          translation_ru: string | null
          translation_tr: string | null
          word: string
        }
        Insert: {
          audio_url?: string | null
          definition?: string | null
          example?: string | null
          id?: number
          section_id: string
          translation_kg?: string | null
          translation_ru?: string | null
          translation_tr?: string | null
          word: string
        }
        Update: {
          audio_url?: string | null
          definition?: string | null
          example?: string | null
          id?: number
          section_id?: string
          translation_kg?: string | null
          translation_ru?: string | null
          translation_tr?: string | null
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "bootcamp_vocabulary_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "bootcamp_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          progress: Json | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          progress?: Json | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          progress?: Json | null
          username?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
