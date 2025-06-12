import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroParticles } from '@/components/HeroParticles'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  Activity,
  Server,
  Database,
  Globe
} from 'lucide-react'

export default function StatusPage() {
  const currentStatus = {
    overall: "operational",
    lastUpdated: "2024-12-10 15:30 UTC"
  }

  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.98%",
      responseTime: "145ms"
    },
    {
      name: "Process Analysis Engine",
      status: "operational", 
      uptime: "99.95%",
      responseTime: "1.2s"
    },
    {
      name: "Authentication Service",
      status: "operational",
      uptime: "99.99%",
      responseTime: "89ms"
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.97%",
      responseTime: "45ms"
    },
    {
      name: "Dashboard",
      status: "operational",
      uptime: "99.96%",
      responseTime: "320ms"
    },
    {
      name: "Documentation Site",
      status: "operational",
      uptime: "99.99%",
      responseTime: "180ms"
    }
  ]

  const incidents = [
    {
      date: "Dec 8, 2024",
      title: "Increased API Response Times",
      status: "resolved",
      duration: "23 minutes",
      description: "Brief increase in response times due to high traffic. Resolved by scaling infrastructure."
    },
    {
      date: "Dec 5, 2024", 
      title: "Dashboard Login Issues",
      status: "resolved",
      duration: "12 minutes",
      description: "Some users experienced login difficulties. Fixed authentication service configuration."
    },
    {
      date: "Dec 1, 2024",
      title: "Scheduled Maintenance",
      status: "completed",
      duration: "2 hours",
      description: "Planned database maintenance and infrastructure upgrades completed successfully."
    }
  ]

  const metrics = [
    {
      name: "API Uptime",
      value: "99.98%",
      period: "Last 30 days",
      icon: Activity
    },
    {
      name: "Average Response Time",
      value: "145ms",
      period: "Last 24 hours", 
      icon: Clock
    },
    {
      name: "Requests Processed",
      value: "2.4M",
      period: "Last 24 hours",
      icon: Server
    },
    {
      name: "Error Rate",
      value: "0.02%",
      period: "Last 24 hours",
      icon: Database
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "down":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-50"
      case "degraded":
        return "text-yellow-600 bg-yellow-50"
      case "down":
        return "text-red-600 bg-red-50"
      default:
        return "text-green-600 bg-green-50"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            System Status
          </h1>
          <p className="text-xl text-gray-600">
            Real-time status and performance metrics for Optima API
          </p>
        </div>

        {/* Overall Status */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4">
              <CheckCircle className="h-12 w-12 text-primary" />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground">All Systems Operational</h2>
                <p className="text-muted-foreground">Last updated: {currentStatus.lastUpdated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
          <HeroParticles />

        {/* Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => (
            <Card key={metric.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.name}</p>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-muted-foreground">{metric.period}</p>
                  </div>
                  <metric.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Status */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Service Status</CardTitle>
                <CardDescription>
                  Current status of all Optima API services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                          {getStatusIcon(service.status)}
                          <div>
                            <h3 className="font-medium text-foreground">{service.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Uptime: {service.uptime}</span>
                            <span>Response: {service.responseTime}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart Placeholder */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Response Time (Last 24 Hours)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Activity className="h-12 w-12 mx-auto mb-2" />
                    <p>Performance chart would be displayed here</p>
                    <p className="text-sm">Average response time: 145ms</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Incidents */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Incidents</CardTitle>
                <CardDescription>
                  Past incidents and maintenance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incidents.map((incident, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{incident.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          incident.status === 'resolved' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                        }`}>
                          {incident.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{incident.description}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{incident.date}</span>
                        <span>Duration: {incident.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subscribe to Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Informed</CardTitle>
                <CardDescription>
                  Get notified about status updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-muted rounded focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded hover:bg-primary/90 transition-colors">
                  Subscribe to Updates
                </button>
                <div className="text-xs text-muted-foreground">
                  <p>You can also follow us on:</p>
                  <div className="flex space-x-2 mt-2">
                    <a href="#" className="text-primary hover:text-primary/80">Twitter</a>
                    <span>•</span>
                    <a href="#" className="text-primary hover:text-primary/80">Discord</a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Main API</span>
                  <span className="text-primary font-medium">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Auth API</span>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Webhooks</span>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CDN</span>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  )
}