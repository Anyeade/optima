'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap,
  Plus,
  Eye,
  Settings,
  Copy,
  RefreshCw
} from 'lucide-react'
import { generateApiKey, formatApiCalls, getSubscriptionLimits } from '@/lib/utils'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [apiKey, setApiKey] = useState('optima_demo_key_12345')
  const [apiCalls] = useState(1247)
  const [processes] = useState([
    { id: 1, name: 'Customer Onboarding', status: 'active', score: 87 },
    { id: 2, name: 'Sales Pipeline', status: 'optimizing', score: 92 },
    { id: 3, name: 'Support Tickets', status: 'active', score: 78 }
  ])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
  }

  const regenerateApiKey = () => {
    setApiKey(generateApiKey())
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const limits = getSubscriptionLimits('free')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your processes.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Processes</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{processes.length}</div>
              <p className="text-xs text-gray-500">
                {limits.processes === -1 ? 'Unlimited' : `${processes.length}/${limits.processes} used`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Calls</CardTitle>
              <Zap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatApiCalls(apiCalls)}</div>
              <p className="text-xs text-gray-500">
                {formatApiCalls(apiCalls)}/{formatApiCalls(limits.apiCalls)} this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Optimization</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-gray-500">Free tier</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* API Key Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Manage your API key and monitor usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="flex space-x-2">
                    <div className="flex-1 font-mono text-sm bg-gray-100 p-3 rounded border">
                      {apiKey}
                    </div>
                    <Button variant="outline" size="sm" onClick={copyApiKey}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={regenerateApiKey}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Usage This Month
                    </label>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatApiCalls(apiCalls)}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(apiCalls / limits.apiCalls) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subscription Tier
                    </label>
                    <div className="text-2xl font-bold text-gray-900">Free</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Upgrade Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Processes */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Processes</CardTitle>
                    <CardDescription>
                      Monitor and manage your optimization processes
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Process
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processes.map((process) => (
                    <div key={process.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{process.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">{process.status}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{process.score}%</div>
                          <div className="text-xs text-gray-500">Optimized</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Get started with common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Process
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  API Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="h-4 w-4 mr-2" />
                  Test API
                </Button>
              </CardContent>
            </Card>

            {/* Getting Started */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  New to Optima API? Start here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Account created
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    API key generated
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                    First API call
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                    Create first process
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  )
}