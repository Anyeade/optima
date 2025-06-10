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
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}