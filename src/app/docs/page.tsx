'use client'

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, Zap, Shield, ExternalLink, Copy, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const quickStartCode = `// Install the Optima API client
npm install @optima/api-client

// Initialize the client
import { OptimaClient } from '@optima/api-client'

const optima = new OptimaClient({
  apiKey: 'your-api-key-here'
})

// Analyze a business process
const analysis = await optima.processes.analyze({
  name: 'User Onboarding',
  steps: [
    { name: 'Registration', duration: 120 },
    { name: 'Email Verification', duration: 300 },
    { name: 'Profile Setup', duration: 180 }
  ]
})

console.log('Optimization Score:', analysis.optimization_score)
console.log('Recommendations:', analysis.recommendations)`

  const curlExample = `curl -X POST "https://api.optima.dev/v1/processes/analyze" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "User Onboarding",
    "steps": [
      {"name": "Registration", "duration": 120},
      {"name": "Email Verification", "duration": 300},
      {"name": "Profile Setup", "duration": 180}
    ]
  }'`

  const endpoints = [
    {
      method: 'POST',
      path: '/v1/processes/analyze',
      description: 'Analyze a business process for optimization opportunities',
      params: ['name', 'steps', 'metadata (optional)']
    },
    {
      method: 'GET',
      path: '/v1/processes/{id}/insights',
      description: 'Get real-time insights for a specific process',
      params: ['id (path parameter)']
    },
    {
      method: 'POST',
      path: '/v1/automation/trigger',
      description: 'Trigger automated optimization for a process',
      params: ['process_id', 'automation_type', 'webhook_url (optional)']
    },
    {
      method: 'GET',
      path: '/v1/processes',
      description: 'List all processes for the authenticated user',
      params: ['limit (optional)', 'offset (optional)']
    },
    {
      method: 'GET',
      path: '/v1/usage',
      description: 'Get API usage statistics and limits',
      params: ['period (optional)']
    }
  ]

  const sdks = [
    { name: 'JavaScript/Node.js', status: 'Available', link: '#' },
    { name: 'Python', status: 'Available', link: '#' },
    { name: 'Go', status: 'Available', link: '#' },
    { name: 'PHP', status: 'Coming Soon', link: '#' },
    { name: 'Ruby', status: 'Coming Soon', link: '#' },
    { name: 'Java', status: 'Coming Soon', link: '#' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Optima API
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/features" className="text-gray-600 hover:text-blue-600">Features</Link>
              <Link href="/playground" className="text-gray-600 hover:text-blue-600">Playground</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
              <Link href="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              <BookOpen className="h-4 w-4 mr-2" />
              API Documentation
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Developer Documentation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Everything you need to integrate Optima API into your applications. 
              Get started in minutes with our comprehensive guides and examples.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/playground">
                <Button size="lg">Try API Playground</Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="outline">Get API Key</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Quick Start Guide</h2>
          
          <Tabs defaultValue="javascript" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            
            <TabsContent value="javascript" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    JavaScript/Node.js Example
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyCode(quickStartCode, 'js')}
                    >
                      {copiedCode === 'js' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{quickStartCode}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="curl" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    cURL Example
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyCode(curlExample, 'curl')}
                    >
                      {copiedCode === 'curl' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{curlExample}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="python" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Python Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{`# Install the Optima API client
pip install optima-api

# Import and initialize
from optima import OptimaClient

client = OptimaClient(api_key='your-api-key-here')

# Analyze a process
analysis = client.processes.analyze({
    'name': 'User Onboarding',
    'steps': [
        {'name': 'Registration', 'duration': 120},
        {'name': 'Email Verification', 'duration': 300},
        {'name': 'Profile Setup', 'duration': 180}
    ]
})

print(f"Optimization Score: {analysis['optimization_score']}")
print(f"Recommendations: {analysis['recommendations']}")`}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">API Reference</h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-lg font-mono">{endpoint.path}</code>
                      </div>
                      <Link href="/playground">
                        <Button size="sm" variant="outline">
                          Try it <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                    <CardDescription className="text-base">
                      {endpoint.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-semibold mb-2">Parameters:</h4>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.params.map((param, idx) => (
                          <Badge key={idx} variant="outline">{param}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SDKs and Libraries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">SDKs & Libraries</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sdks.map((sdk, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {sdk.name}
                      <Badge variant={sdk.status === 'Available' ? 'default' : 'secondary'}>
                        {sdk.status}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {sdk.status === 'Available' ? (
                      <Button className="w-full" asChild>
                        <Link href={sdk.link}>
                          <Code className="h-4 w-4 mr-2" />
                          View Documentation
                        </Link>
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Additional Resources</h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>API Playground</CardTitle>
                <CardDescription>
                  Test API endpoints interactively with real-time responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/playground">
                  <Button className="w-full">Open Playground</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Tutorials</CardTitle>
                <CardDescription>
                  Step-by-step guides for common integration patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/help">
                  <Button className="w-full" variant="outline">View Tutorials</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Learn about authentication, rate limits, and best practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/help">
                  <Button className="w-full" variant="outline">Security Guide</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-400 hover:text-white">Features</Link></li>
                <li><Link href="/docs" className="text-gray-400 hover:text-white">API Docs</Link></li>
                <li><Link href="/playground" className="text-gray-400 hover:text-white">Playground</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/support" className="text-gray-400 hover:text-white">Support</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link href="/status" className="text-gray-400 hover:text-white">Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Optima API. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}