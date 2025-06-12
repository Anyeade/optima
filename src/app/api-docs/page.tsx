'use client'

import { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroParticles } from '@/components/HeroParticles'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  Code, 
  Zap, 
  BarChart3, 
  Brain, 
  Webhook,
  FileText,
  Play,
  Copy,
  CheckCircle
} from 'lucide-react'

export default function ApiDocsPage() {
  const [copiedText, setCopiedText] = useState<string>('')

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/processes/analyze',
      description: 'Analyze a business process and get optimization insights',
      icon: Brain,
      example: {
        request: `{
  "process_name": "Customer Onboarding",
  "steps": [
    {
      "name": "Account Creation",
      "duration": 300,
      "success_rate": 0.95
    },
    {
      "name": "Email Verification", 
      "duration": 1800,
      "success_rate": 0.87
    }
  ],
  "data_source": "csv_upload"
}`,
        response: `{
  "process_id": "proc_abc123",
  "optimization_score": 73,
  "bottlenecks": [
    {
      "step": "Email Verification",
      "issue": "High abandonment rate",
      "impact": "medium"
    }
  ],
  "recommendations": [
    {
      "type": "automation",
      "description": "Implement automated email reminders",
      "estimated_improvement": "15%"
    }
  ]
}`
      }
    },
    {
      method: 'GET',
      path: '/api/v1/processes/{id}/insights',
      description: 'Get real-time insights and metrics for a specific process',
      icon: BarChart3,
      example: {
        request: `GET /api/v1/processes/proc_abc123/insights`,
        response: `{
  "process_id": "proc_abc123",
  "current_score": 78,
  "trend": "improving",
  "metrics": {
    "avg_completion_time": 2100,
    "success_rate": 0.91,
    "cost_per_completion": 12.50
  },
  "predictions": {
    "next_week_volume": 1250,
    "optimization_potential": "23%"
  }
}`
      }
    },
    {
      method: 'POST',
      path: '/api/v1/automation/trigger',
      description: 'Trigger an automated optimization for a process',
      icon: Zap,
      example: {
        request: `{
  "process_id": "proc_abc123",
  "automation_type": "workflow_optimization",
  "parameters": {
    "target_improvement": 20,
    "max_changes": 3
  }
}`,
        response: `{
  "automation_id": "auto_xyz789",
  "status": "initiated",
  "estimated_completion": "2024-06-10T15:30:00Z",
  "expected_improvements": [
    "Reduce step 2 duration by 25%",
    "Increase overall success rate to 94%"
  ]
}`
      }
    },
    {
      method: 'POST',
      path: '/api/v1/webhooks',
      description: 'Set up webhooks for real-time process notifications',
      icon: Webhook,
      example: {
        request: `{
  "url": "https://your-app.com/webhooks/optima",
  "events": ["process.optimized", "bottleneck.detected"],
  "process_ids": ["proc_abc123"]
}`,
        response: `{
  "webhook_id": "wh_def456",
  "status": "active",
  "secret": "whsec_abc123def456"
}`
      }
    }
  ]

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedText(code)
    setTimeout(() => setCopiedText(''), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              API Documentation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Integrate Optima's AI-powered process optimization into your applications. 
              Our RESTful API is designed for developers who want to build intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Play className="mr-2 h-5 w-5" />
                Try in Playground
              </Button>
              <Button variant="outline" size="lg">
                <FileText className="mr-2 h-5 w-5" />
                Download OpenAPI Spec
              </Button>
            </div>
          </div>
        </div>
      </section>
          <HeroParticles />

      {/* Quick Start */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start</h2>
            <p className="text-xl text-gray-600">Get up and running with Optima API in minutes</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Authentication
                </CardTitle>
                <CardDescription>
                  All API requests require authentication using your API key
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400"># Include your API key in headers</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyCode('curl -H "Authorization: Bearer YOUR_API_KEY"')}
                    >
                      {copiedText === 'curl -H "Authorization: Bearer YOUR_API_KEY"' ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div>curl -H "Authorization: Bearer YOUR_API_KEY" \</div>
                  <div className="ml-4">https://api.optima.com/v1/processes</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Base URL
                </CardTitle>
                <CardDescription>
                  All API endpoints are relative to our base URL
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400"># Production API base URL</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => copyCode('https://api.optima.com/v1')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>https://api.optima.com/v1</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">API Endpoints</h2>
            <p className="text-xl text-gray-600">Core endpoints for process optimization and automation</p>
          </div>

          <div className="space-y-8">
            {endpoints.map((endpoint, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <endpoint.icon className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-lg font-mono">{endpoint.path}</code>
                        </div>
                        <p className="text-gray-600 mt-1">{endpoint.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Try it
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Request</h4>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400">JSON</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyCode(endpoint.example.request)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code>{endpoint.example.request}</code>
                        </pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Response</h4>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-400">JSON</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => copyCode(endpoint.example.response)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code>{endpoint.example.response}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs and Libraries */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SDKs & Libraries</h2>
            <p className="text-xl text-gray-600">Official libraries for popular programming languages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'JavaScript/Node.js', command: 'npm install @optima/api-client' },
              { name: 'Python', command: 'pip install optima-api' },
              { name: 'Go', command: 'go get github.com/optima/go-client' }
            ].map((sdk, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{sdk.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-sm">
                    <div className="flex justify-between items-center">
                      <span>{sdk.command}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyCode(sdk.command)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our developer support team is here to help you integrate Optima API successfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Join Discord Community
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      </div>
    </div>
  )
}