'use client'

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { CheckCircle, Zap, Shield, BarChart3, Cpu, Globe, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "OptimaCore Engine",
      description: "Advanced AI algorithms that analyze your business processes and identify optimization opportunities in real-time.",
      benefits: ["Real-time analysis", "Pattern recognition", "Predictive insights", "Automated recommendations"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Process Analytics",
      description: "Comprehensive analytics dashboard with detailed metrics, trends, and performance indicators.",
      benefits: ["Custom dashboards", "Real-time metrics", "Historical trends", "Export capabilities"]
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Automated Optimization",
      description: "Let AI automatically implement optimizations based on your business rules and preferences.",
      benefits: ["Smart automation", "Rule-based triggers", "Safety controls", "Rollback capabilities"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-grade security with encryption, compliance, and audit trails for enterprise peace of mind.",
      benefits: ["End-to-end encryption", "SOC 2 compliance", "Audit logs", "Role-based access"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "API Integration",
      description: "Seamlessly integrate with your existing tools and workflows through our comprehensive API.",
      benefits: ["RESTful API", "Webhooks", "SDKs available", "Rate limiting"]
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Real-time Monitoring",
      description: "Monitor your processes 24/7 with instant alerts and notifications when issues arise.",
      benefits: ["24/7 monitoring", "Instant alerts", "Custom thresholds", "Multi-channel notifications"]
    }
  ]

  const useCases = [
    {
      title: "Customer Onboarding",
      description: "Optimize user registration and onboarding flows to reduce drop-off rates by up to 40%.",
      metrics: ["40% less drop-off", "60% faster completion", "25% higher satisfaction"]
    },
    {
      title: "Order Processing",
      description: "Streamline e-commerce order fulfillment with intelligent routing and automation.",
      metrics: ["50% faster processing", "30% cost reduction", "99.9% accuracy"]
    },
    {
      title: "Support Workflows",
      description: "Enhance customer support with AI-powered ticket routing and response optimization.",
      metrics: ["70% faster resolution", "45% fewer escalations", "90% satisfaction rate"]
    },
    {
      title: "Financial Operations",
      description: "Automate invoice processing, payments, and reconciliation with intelligent validation.",
      metrics: ["80% automation rate", "95% accuracy", "60% time savings"]
    }
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
              <Link href="/docs" className="text-gray-600 hover:text-blue-600">Docs</Link>
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
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4" variant="secondary">
            <Zap className="h-4 w-4 mr-2" />
            Powered by OptimaCore AI
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Powerful Features for
            <br />Business Optimization
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how Optima API&rsquo;s advanced features can transform your business processes,
            reduce costs, and accelerate growth through intelligent automation.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/playground">
              <Button size="lg">Try Live Demo</Button>
            </Link>
            <Link href="/docs">
              <Button size="lg" variant="outline">View Documentation</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Core Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to optimize, automate, and scale your business processes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Real-World Use Cases</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how businesses across industries are using Optima API to drive results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {useCase.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm font-semibold text-blue-600">{metric}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Enterprise-Ready</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built for scale with enterprise-grade security, compliance, and support
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Security & Compliance</h3>
              <p className="text-gray-600">SOC 2, GDPR, and HIPAA compliant with enterprise-grade security</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Role-based access, team workspaces, and collaborative optimization</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Scale</h3>
              <p className="text-gray-600">Multi-region deployment with 99.99% uptime SLA</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Optimize Your Business?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses already using Optima API to streamline operations and drive growth.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/auth">
              <Button size="lg" variant="secondary">Start Free Trial</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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