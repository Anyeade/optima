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

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 45670,
    monthlyRevenue: 12340,
    apiCalls: 2847392,
    systemHealth: 99.9,
    activeProcesses: 3421,
    supportTickets: 23
  })

  const [recentActivity] = useState([
    { id: 1, type: 'user_signup', user: 'john@example.com', time: '2 minutes ago' },
    { id: 2, type: 'api_call', user: 'sarah@company.com', time: '5 minutes ago' },
    { id: 3, type: 'subscription', user: 'mike@startup.io', time: '12 minutes ago' },
    { id: 4, type: 'support_ticket', user: 'lisa@corp.com', time: '18 minutes ago' },
    { id: 5, type: 'process_created', user: 'alex@business.net', time: '25 minutes ago' }
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup': return <Users className="h-4 w-4 text-green-600" />
      case 'api_call': return <Zap className="h-4 w-4 text-blue-600" />
      case 'subscription': return <DollarSign className="h-4 w-4 text-purple-600" />
      case 'support_ticket': return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case 'process_created': return <Activity className="h-4 w-4 text-indigo-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityText = (type: string, user: string) => {
    switch (type) {
      case 'user_signup': return `${user} signed up`
      case 'api_call': return `${user} made API call`
      case 'subscription': return `${user} upgraded subscription`
      case 'support_ticket': return `${user} created support ticket`
      case 'process_created': return `${user} created new process`
      default: return `${user} performed action`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Platform overview and system management</p>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-green-600">+8% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">API Calls Today</CardTitle>
                <Zap className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.apiCalls.toLocaleString()}</div>
                <p className="text-xs text-blue-600">+15% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.systemHealth}%</div>
                <p className="text-xs text-green-600">All systems operational</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* System Status */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>
                    Real-time platform health and performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Server className="h-5 w-5 text-green-600" />
                        <div>
                          <h3 className="font-medium">API Servers</h3>
                          <p className="text-sm text-gray-500">All regions operational</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-600">Healthy</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Database className="h-5 w-5 text-green-600" />
                        <div>
                          <h3 className="font-medium">Database</h3>
                          <p className="text-sm text-gray-500">Primary and replicas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-600">Healthy</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-yellow-600" />
                        <div>
                          <h3 className="font-medium">CDN</h3>
                          <p className="text-sm text-gray-500">Global content delivery</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium text-yellow-600">Degraded</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-green-600" />
                        <div>
                          <h3 className="font-medium">Security</h3>
                          <p className="text-sm text-gray-500">Authentication & monitoring</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-600">Secure</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest platform events and user actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {getActivityText(activity.type, activity.user)}
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Alerts */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Billing Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Support Queue
                  </Button>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>
                    Important notifications and warnings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">CDN Performance</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      Slight degradation in EU region
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Usage Spike</span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      API calls up 25% today
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Backup Complete</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Daily backup successful
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                  <CardDescription>
                    Key performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>API Response Time</span>
                      <span>142ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Database Load</span>
                      <span>34%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}