
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      plants: {
        Row: {
          id: number
          created_at: string
          name: string
          description: string | null
          user_id: string
          image_url: string | null
          watering_frequency: string
          light_level: string
          temperature: string
          humidity: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          description?: string | null
          user_id: string
          image_url?: string | null
          watering_frequency: string
          light_level: string
          temperature: string
          humidity?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          description?: string | null
          user_id?: string
          image_url?: string | null
          watering_frequency?: string
          light_level?: string
          temperature?: string
          humidity?: string | null
        }
      }
      reminders: {
        Row: {
          id: number
          created_at: string
          plant_id: number
          task_type: string
          due_date: string
          is_completed: boolean
          user_id: string
        }
        Insert: {
          id?: number
          created_at?: string
          plant_id: number
          task_type: string
          due_date: string
          is_completed?: boolean
          user_id: string
        }
        Update: {
          id?: number
          created_at?: string
          plant_id?: number
          task_type?: string
          due_date?: string
          is_completed?: boolean
          user_id?: string
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
