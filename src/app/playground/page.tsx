'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  Play, 
  Copy, 
  Download,
  Settings,
  Code,
  Zap,
  BarChart3,
  Brain
} from 'lucide-react'

export default function PlaygroundPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState('analyze')
  const [requestBody, setRequestBody] = useState(`{
  "process_name": "Customer Onboarding",
  "steps": [
    {
      "name": "Account Creation",
      "duration": 300,
      "success_rate": 0.95,
      "cost": 2.50
    },
    {
      "name": "Email Verification",
      "duration": 1800,
      "success_rate": 0.87,
      "cost": 1.00
    },
    {
      "name": "Profile Setup",
      "duration": 600,
      "success_rate": 0.92,
      "cost": 3.00
    }
  ],
  "data_source": "manual_input"
}`)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const endpoints = [
    {
      id: 'analyze',
      name: 'Process Analysis',
      method: 'POST',
      path: '/api/v1/processes/analyze',
      icon: Brain,
      description: 'Analyze a business process and get optimization insights'
    },
    {
      id: 'insights',
      name: 'Get Insights',
      method: 'GET',
      path: '/api/v1/processes/{id}/insights',
      icon: BarChart3,
      description: 'Get real-time insights for a specific process'
    },
    {
      id: 'automate',
      name: 'Trigger Automation',
      method: 'POST',
      path: '/api/v1/automation/trigger',
      icon: Zap,
      description: 'Trigger automated optimization for a process'
    }
  ]

  const handleRun = async () => {
    setLoading(true)
    
    try {
      let url = ''
      let method = 'GET'
      let body = null
      
      switch (selectedEndpoint) {
        case 'analyze':
          url = '/api/v1/processes/analyze'
          method = 'POST'
          body = requestBody
          break
        case 'insights':
          url = '/api/v1/processes/demo123/insights'
          method = 'GET'
          break
        case 'automate':
          url = '/api/v1/automation/trigger'
          method = 'POST'
          body = JSON.stringify({
            process_id: 'proc_demo123',
            automation_type: 'workflow_optimization'
          })
          break
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer optima_demo_key_12345'
        },
        ...(body && { body })
      })
      
      const data = await response.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({
        error: 'Failed to call API',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, null, 2))
    } finally {
      setLoading(false)
    }
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(response)
  }

  const downloadResponse = () => {
    const blob = new Blob([response], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'optima-api-response.json'
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Playground</h1>
          <p className="text-gray-600">
            Test Optima API endpoints with real data and see live responses. 
            Perfect for exploring our AI optimization capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Endpoints */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Endpoints</CardTitle>
                <CardDescription>
                  Select an endpoint to test
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {endpoints.map((endpoint) => (
                  <button
                    key={endpoint.id}
                    onClick={() => setSelectedEndpoint(endpoint.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedEndpoint === endpoint.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <endpoint.icon className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-sm">{endpoint.name}</div>
                        <div className="text-xs text-gray-500">{endpoint.method}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <div className="font-mono text-xs bg-gray-100 p-2 rounded border">
                    optima_demo_key_12345
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Environment
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>Production</option>
                    <option>Sandbox</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Request */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Code className="mr-2 h-5 w-5" />
                        Request
                      </CardTitle>
                      <CardDescription>
                        {endpoints.find(e => e.id === selectedEndpoint)?.method}{' '}
                        {endpoints.find(e => e.id === selectedEndpoint)?.path}
                      </CardDescription>
                    </div>
                    <Button onClick={handleRun} disabled={loading}>
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Play className="mr-2 h-4 w-4" />
                      )}
                      Run
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Request Body
                      </label>
                      <textarea
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        className="w-full h-64 p-3 border border-gray-300 rounded font-mono text-sm"
                        placeholder="Enter JSON request body..."
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Headers
                      </Button>
                      <Button variant="outline" size="sm">
                        Format JSON
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Response</CardTitle>
                      <CardDescription>
                        {response ? 'Status: 200 OK' : 'Click "Run" to see response'}
                      </CardDescription>
                    </div>
                    {response && (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={copyResponse}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadResponse}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Processing request...</p>
                      </div>
                    </div>
                  ) : response ? (
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg h-64 overflow-auto">
                      <pre className="text-sm">
                        <code>{response}</code>
                      </pre>
                    </div>
                  ) : (
                    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Response will appear here</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Examples */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Example Use Cases</CardTitle>
                <CardDescription>
                  Try these common scenarios to explore Optima API capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <h3 className="font-medium text-gray-900 mb-2">E-commerce Checkout</h3>
                    <p className="text-sm text-gray-600">
                      Optimize a 5-step checkout process with cart abandonment issues
                    </p>
                  </button>
                  
                  <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <h3 className="font-medium text-gray-900 mb-2">Support Ticket Flow</h3>
                    <p className="text-sm text-gray-600">
                      Analyze customer support workflow with response time bottlenecks
                    </p>
                  </button>
                  
                  <button className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                    <h3 className="font-medium text-gray-900 mb-2">Employee Onboarding</h3>
                    <p className="text-sm text-gray-600">
                      Streamline HR onboarding process with document verification delays
                    </p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}