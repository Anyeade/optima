import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          api_key: string | null
          subscription_tier: 'free' | 'professional' | 'enterprise' | 'enterprise_plus'
          role: 'user' | 'admin' | 'super_admin'
          api_calls_used: number
          api_calls_limit: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          api_key?: string | null
          subscription_tier?: 'free' | 'professional' | 'enterprise' | 'enterprise_plus'
          role?: 'user' | 'admin' | 'super_admin'
          api_calls_used?: number
          api_calls_limit?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          api_key?: string | null
          subscription_tier?: 'free' | 'professional' | 'enterprise' | 'enterprise_plus'
          role?: 'user' | 'admin' | 'super_admin'
          api_calls_used?: number
          api_calls_limit?: number
          created_at?: string
          updated_at?: string
        }
      }
      processes: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          status: 'active' | 'paused' | 'optimizing'
          optimization_score: number
          process_data: any | null
          insights: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          status?: 'active' | 'paused' | 'optimizing'
          optimization_score?: number
          process_data?: any | null
          insights?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          status?: 'active' | 'paused' | 'optimizing'
          optimization_score?: number
          process_data?: any | null
          insights?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_actions: {
        Row: {
          id: string
          admin_id: string
          action_type: string
          target_user_id: string | null
          details: any | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          admin_id: string
          action_type: string
          target_user_id?: string | null
          details?: any | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          admin_id?: string
          action_type?: string
          target_user_id?: string | null
          details?: any | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      system_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: any
          description: string | null
          updated_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: any
          description?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: any
          description?: string | null
          updated_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          status: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          status?: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          status?: 'open' | 'in_progress' | 'resolved' | 'closed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          assigned_to?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      support_ticket_messages: {
        Row: {
          id: string
          ticket_id: string
          sender_id: string
          message: string
          is_internal: boolean
          attachments: any | null
          created_at: string
        }
        Insert: {
          id?: string
          ticket_id: string
          sender_id: string
          message: string
          is_internal?: boolean
          attachments?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          ticket_id?: string
          sender_id?: string
          message?: string
          is_internal?: boolean
          attachments?: any | null
          created_at?: string
        }
      }
      system_notifications: {
        Row: {
          id: string
          title: string
          message: string
          type: 'info' | 'warning' | 'error' | 'success'
          target_audience: 'all' | 'users' | 'admins'
          is_active: boolean
          expires_at: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          message: string
          type?: 'info' | 'warning' | 'error' | 'success'
          target_audience?: 'all' | 'users' | 'admins'
          is_active?: boolean
          expires_at?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          message?: string
          type?: 'info' | 'warning' | 'error' | 'success'
          target_audience?: 'all' | 'users' | 'admins'
          is_active?: boolean
          expires_at?: string | null
          created_by?: string | null
          created_at?: string
        }
      }
      api_usage_logs: {
        Row: {
          id: string
          user_id: string
          endpoint: string
          method: string
          status_code: number | null
          response_time_ms: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          endpoint: string
          method: string
          status_code?: number | null
          response_time_ms?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          endpoint?: string
          method?: string
          status_code?: number | null
          response_time_ms?: number | null
          created_at?: string
        }
      }
    }
  }
}