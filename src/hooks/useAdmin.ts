import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

export function useAdmin() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (currentUser) {
        await fetchProfile(currentUser.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (currentUser) {
        await fetchProfile(currentUser.id)
      } else {
        setProfile(null)
        setIsAdmin(false)
        setIsSuperAdmin(false)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        setProfile(null)
        setIsAdmin(false)
        setIsSuperAdmin(false)
      } else {
        setProfile(data)
        setIsAdmin(data.role === 'admin' || data.role === 'super_admin')
        setIsSuperAdmin(data.role === 'super_admin')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
      setIsAdmin(false)
      setIsSuperAdmin(false)
    } finally {
      setLoading(false)
    }
  }

  const logAdminAction = async (
    actionType: string,
    targetUserId?: string,
    details?: any
  ) => {
    if (!user || !isAdmin) return

    try {
      await supabase.from('admin_actions').insert({
        admin_id: user.id,
        action_type: actionType,
        target_user_id: targetUserId || null,
        details: details || null,
      })
    } catch (error) {
      console.error('Error logging admin action:', error)
    }
  }

  return {
    user,
    profile,
    loading,
    isAdmin,
    isSuperAdmin,
    logAdminAction,
    refreshProfile: () => user && fetchProfile(user.id),
  }
}