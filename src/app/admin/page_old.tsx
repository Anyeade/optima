'use client'

import { useState } from 'react'
import { AdminNavigation } from '@/components/admin/AdminNavigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Database,
  Server,
  Globe,
  Shield
} from 'lucide-react'

interface DashboardStats {
  users: {
    total: number
    active: number
    admins: number
  }
  api: {
    totalRequests: number
    averageResponseTime: number
  }
  support: {
    openTickets: number
    totalTickets: number
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentActions, setRecentActions] = useState<any[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Load user stats
      const userStats = await adminUserService.getUserStats()
      
      // Load API stats
      const apiStats = await adminAnalyticsService.getApiUsageStats(7)
      
      // Load support stats
      const supportStats = await adminSupportService.getTickets(1, 1000)
      const openTickets = supportStats.data?.filter(ticket => ticket.status === 'open').length || 0

      setStats({
        users: {
          total: userStats.totalUsers,
          active: userStats.activeUsers,
          admins: userStats.adminUsers
        },
        api: {
          totalRequests: apiStats.data?.totalRequests || 0,
          averageResponseTime: Math.round(apiStats.data?.averageResponseTime || 0)
        },
        support: {
          openTickets,
          totalTickets: supportStats.count || 0
        }
      })

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Users',
      value: formatNumber(stats?.users.total || 0),
      description: `${stats?.users.active || 0} active this month`,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/users'
    },
    {
      title: 'API Requests',
      value: formatNumber(stats?.api.totalRequests || 0),
      description: 'Last 7 days',
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/analytics'
    },
    {
      title: 'Open Tickets',
      value: formatNumber(stats?.support.openTickets || 0),
      description: `${stats?.support.totalTickets || 0} total tickets`,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/admin/support'
    },
    {
      title: 'Avg Response Time',
      value: `${stats?.api.averageResponseTime || 0}ms`,
      description: 'Last 7 days',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/admin/analytics'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome to the Optima API administration panel
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={loadDashboardData}>
            <Activity className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/admin/analytics">
            <Button>
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.title} href={card.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {card.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${card.bgColor}`}>
                    <Icon className={`h-4 w-4 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{card.value}</div>
                  <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-green-600" />
              System Status
            </CardTitle>
            <CardDescription>
              Current system health and status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Service</span>
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-1 h-4 w-4" />
                <span className="text-sm font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-1 h-4 w-4" />
                <span className="text-sm font-medium">Operational</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Authentication</span>
              <div className="flex items-center text-green-600">
                <CheckCircle className="mr-1 h-4 w-4" />
                <span className="text-sm font-medium">Operational</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/users" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/support" className="block">
              <Button variant="outline" className="w-full justify-start">
                <AlertCircle className="mr-2 h-4 w-4" />
                View Support Tickets
              </Button>
            </Link>
            <Link href="/admin/notifications" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Activity className="mr-2 h-4 w-4" />
                Send Notification
              </Button>
            </Link>
            <Link href="/admin/analytics" className="block">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest administrative actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600">System started successfully</span>
              <span className="text-gray-400 ml-auto">{formatDate(new Date().toISOString())}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <span className="text-gray-600">Admin dashboard accessed</span>
              <span className="text-gray-400 ml-auto">{formatDate(new Date().toISOString())}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <span className="text-gray-600">Database connection established</span>
              <span className="text-gray-400 ml-auto">{formatDate(new Date().toISOString())}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}