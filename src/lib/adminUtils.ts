import { supabase } from './supabase'
import { Database } from './supabase'

type Profile = Database['public']['Tables']['profiles']['Row']
type AdminAction = Database['public']['Tables']['admin_actions']['Row']
type SupportTicket = Database['public']['Tables']['support_tickets']['Row']
type SystemSetting = Database['public']['Tables']['system_settings']['Row']

// User Management
export const adminUserService = {
  // Get all users with pagination
  async getUsers(page = 1, limit = 20, search = '') {
    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`)
    }

    const { data, error, count } = await query
      .range((page - 1) * limit, page * limit - 1)

    return { data, error, count, totalPages: Math.ceil((count || 0) / limit) }
  },

  // Get user by ID
  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    return { data, error }
  },

  // Update user
  async updateUser(id: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  },

  // Delete user
  async deleteUser(id: string) {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)

    return { error }
  },

  // Get user statistics
  async getUserStats() {
    const { data: totalUsers, error: totalError } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })

    const { data: activeUsers, error: activeError } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .gte('updated_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    const { data: adminUsers, error: adminError } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .in('role', ['admin', 'super_admin'])

    return {
      totalUsers: totalUsers?.length || 0,
      activeUsers: activeUsers?.length || 0,
      adminUsers: adminUsers?.length || 0,
      errors: { totalError, activeError, adminError }
    }
  }
}

// Analytics Service
export const adminAnalyticsService = {
  // Get API usage statistics
  async getApiUsageStats(days = 30) {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
    
    const { data, error } = await supabase
      .from('api_usage_logs')
      .select('*')
      .gte('created_at', startDate)

    if (error) return { data: null, error }

    // Process data for charts
    const dailyUsage = data.reduce((acc: any, log) => {
      const date = new Date(log.created_at).toDateString()
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

    const endpointUsage = data.reduce((acc: any, log) => {
      acc[log.endpoint] = (acc[log.endpoint] || 0) + 1
      return acc
    }, {})

    const statusCodes = data.reduce((acc: any, log) => {
      const status = log.status_code || 'unknown'
      acc[status] = (acc[status] || 0) + 1
      return acc
    }, {})

    return {
      data: {
        totalRequests: data.length,
        dailyUsage,
        endpointUsage,
        statusCodes,
        averageResponseTime: data.reduce((sum, log) => sum + (log.response_time_ms || 0), 0) / data.length
      },
      error: null
    }
  },

  // Get user growth statistics
  async getUserGrowthStats(days = 30) {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
    
    const { data, error } = await supabase
      .from('profiles')
      .select('created_at')
      .gte('created_at', startDate)
      .order('created_at', { ascending: true })

    if (error) return { data: null, error }

    const dailySignups = data.reduce((acc: any, profile) => {
      const date = new Date(profile.created_at).toDateString()
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})

    return { data: { dailySignups, totalNewUsers: data.length }, error: null }
  }
}

// Support Ticket Service
export const adminSupportService = {
  // Get all tickets
  async getTickets(page = 1, limit = 20, status = 'all') {
    let query = supabase
      .from('support_tickets')
      .select(`
        *,
        user:profiles!support_tickets_user_id_fkey(email, full_name),
        assigned_admin:profiles!support_tickets_assigned_to_fkey(email, full_name)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query
      .range((page - 1) * limit, page * limit - 1)

    return { data, error, count, totalPages: Math.ceil((count || 0) / limit) }
  },

  // Update ticket
  async updateTicket(id: string, updates: Partial<SupportTicket>) {
    const { data, error } = await supabase
      .from('support_tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    return { data, error }
  },

  // Get ticket messages
  async getTicketMessages(ticketId: string) {
    const { data, error } = await supabase
      .from('support_ticket_messages')
      .select(`
        *,
        sender:profiles!support_ticket_messages_sender_id_fkey(email, full_name, role)
      `)
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true })

    return { data, error }
  },

  // Add message to ticket
  async addTicketMessage(ticketId: string, senderId: string, message: string, isInternal = false) {
    const { data, error } = await supabase
      .from('support_ticket_messages')
      .insert({
        ticket_id: ticketId,
        sender_id: senderId,
        message,
        is_internal: isInternal
      })
      .select()
      .single()

    return { data, error }
  }
}

// System Settings Service
export const adminSettingsService = {
  // Get all settings
  async getSettings() {
    const { data, error } = await supabase
      .from('system_settings')
      .select('*')
      .order('setting_key', { ascending: true })

    return { data, error }
  },

  // Update setting
  async updateSetting(key: string, value: any, updatedBy: string) {
    const { data, error } = await supabase
      .from('system_settings')
      .update({
        setting_value: value,
        updated_by: updatedBy,
        updated_at: new Date().toISOString()
      })
      .eq('setting_key', key)
      .select()
      .single()

    return { data, error }
  },

  // Create new setting
  async createSetting(key: string, value: any, description: string, createdBy: string) {
    const { data, error } = await supabase
      .from('system_settings')
      .insert({
        setting_key: key,
        setting_value: value,
        description,
        updated_by: createdBy
      })
      .select()
      .single()

    return { data, error }
  }
}

// Admin Actions Service
export const adminActionsService = {
  // Get admin actions log
  async getAdminActions(page = 1, limit = 50) {
    const { data, error, count } = await supabase
      .from('admin_actions')
      .select(`
        *,
        admin:profiles!admin_actions_admin_id_fkey(email, full_name),
        target_user:profiles!admin_actions_target_user_id_fkey(email, full_name)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)

    return { data, error, count, totalPages: Math.ceil((count || 0) / limit) }
  }
}

// Utility functions
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat().format(num)
}

export const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'text-green-600 bg-green-100',
    inactive: 'text-gray-600 bg-gray-100',
    suspended: 'text-red-600 bg-red-100',
    open: 'text-blue-600 bg-blue-100',
    in_progress: 'text-yellow-600 bg-yellow-100',
    resolved: 'text-green-600 bg-green-100',
    closed: 'text-gray-600 bg-gray-100',
    low: 'text-gray-600 bg-gray-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-orange-600 bg-orange-100',
    urgent: 'text-red-600 bg-red-100'
  }
  return colors[status] || 'text-gray-600 bg-gray-100'
}

export const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    user: 'text-blue-600 bg-blue-100',
    admin: 'text-purple-600 bg-purple-100',
    super_admin: 'text-red-600 bg-red-100'
  }
  return colors[role] || 'text-gray-600 bg-gray-100'
}