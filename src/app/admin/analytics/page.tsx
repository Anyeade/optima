'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Users,
  Zap,
  Clock,
  Globe,
  RefreshCw
} from 'lucide-react'
import { adminAnalyticsService } from '@/lib/adminUtils'
import { formatNumber, formatDate } from '@/lib/adminUtils'

interface AnalyticsData {
  apiUsage: {
    totalRequests: number
    dailyUsage: Record<string, number>
    endpointUsage: Record<string, number>
    statusCodes: Record<string, number>
    averageResponseTime: number
  }
  userGrowth: {
    dailySignups: Record<string, number>
    totalNewUsers: number
  }
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState(30)

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      
      const [apiUsageResult, userGrowthResult] = await Promise.all([
        adminAnalyticsService.getApiUsageStats(timeRange),
        adminAnalyticsService.getUserGrowthStats(timeRange)
      ])

      if (apiUsageResult.data && userGrowthResult.data) {
        setAnalytics({
          apiUsage: apiUsageResult.data,
          userGrowth: userGrowthResult.data
        })
      }
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTopEndpoints = () => {
    if (!analytics?.apiUsage.endpointUsage) return []
    
    return Object.entries(analytics.apiUsage.endpointUsage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
  }

  const getStatusCodeStats = () => {
    if (!analytics?.apiUsage.statusCodes) return []
    
    return Object.entries(analytics.apiUsage.statusCodes)
      .map(([code, count]) => ({
        code,
        count,
        percentage: Math.round((count / analytics.apiUsage.totalRequests) * 100)
      }))
      .sort((a, b) => b.count - a.count)
  }

  const getDailyUsageChart = () => {
    if (!analytics?.apiUsage.dailyUsage) return []
    
    return Object.entries(analytics.apiUsage.dailyUsage)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-7) // Last 7 days
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Platform usage statistics and performance metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
          <Button variant="outline" onClick={loadAnalytics}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total API Requests</CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(analytics?.apiUsage.totalRequests || 0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Last {timeRange} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(analytics?.apiUsage.averageResponseTime || 0)}ms
            </div>
            <p className="text-xs text-gray-500 mt-1">Average response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">New Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {formatNumber(analytics?.userGrowth.totalNewUsers || 0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Last {timeRange} days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {analytics?.apiUsage.statusCodes ? 
                Math.round(((analytics.apiUsage.statusCodes['200'] || 0) / analytics.apiUsage.totalRequests) * 100) : 0}%
            </div>
            <p className="text-xs text-gray-500 mt-1">HTTP 200 responses</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-600" />
              Daily API Usage
            </CardTitle>
            <CardDescription>
              API requests over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getDailyUsageChart().map(([date, count]) => (
                <div key={date} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="flex items-center space-x-2 flex-1 ml-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min((count / Math.max(...Object.values(analytics?.apiUsage.dailyUsage || {}))) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      {formatNumber(count)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5 text-green-600" />
              Top Endpoints
            </CardTitle>
            <CardDescription>
              Most frequently accessed API endpoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getTopEndpoints().map(([endpoint, count]) => (
                <div key={endpoint} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 truncate flex-1">
                    {endpoint}
                  </span>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min((count / Math.max(...Object.values(analytics?.apiUsage.endpointUsage || {}))) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      {formatNumber(count)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Codes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-orange-600" />
              Response Status Codes
            </CardTitle>
            <CardDescription>
              HTTP status code distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {getStatusCodeStats().map(({ code, count, percentage }) => (
                <div key={code} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      code.startsWith('2') ? 'bg-green-100 text-green-800' :
                      code.startsWith('4') ? 'bg-yellow-100 text-yellow-800' :
                      code.startsWith('5') ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {code}
                    </span>
                    <span className="text-sm text-gray-600">{percentage}%</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatNumber(count)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-purple-600" />
              User Growth
            </CardTitle>
            <CardDescription>
              New user registrations over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(analytics?.userGrowth.dailySignups || {})
                .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                .slice(-7)
                .map(([date, count]) => (
                <div key={date} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  <div className="flex items-center space-x-2 flex-1 ml-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min((count / Math.max(...Object.values(analytics?.userGrowth.dailySignups || {}))) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      {formatNumber(count)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>
            Key performance indicators and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {analytics?.apiUsage.averageResponseTime ? 
                  analytics.apiUsage.averageResponseTime < 200 ? 'Excellent' :
                  analytics.apiUsage.averageResponseTime < 500 ? 'Good' :
                  analytics.apiUsage.averageResponseTime < 1000 ? 'Fair' : 'Poor'
                  : 'N/A'
                }
              </div>
              <div className="text-sm text-gray-600">Response Time Performance</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {analytics?.apiUsage.totalRequests ? 
                  Math.round(analytics.apiUsage.totalRequests / timeRange) : 0
                }
              </div>
              <div className="text-sm text-gray-600">Avg Daily Requests</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {analytics?.userGrowth.totalNewUsers ? 
                  Math.round(analytics.userGrowth.totalNewUsers / timeRange) : 0
                }
              </div>
              <div className="text-sm text-gray-600">Avg Daily Signups</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}