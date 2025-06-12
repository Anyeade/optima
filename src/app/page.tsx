import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroParticles } from '@/components/HeroParticles'
import { Button } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import {
  Zap,
  BarChart3,
  Brain,
  Shield,
  Rocket,
  Users,
  ArrowRight,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="absolute inset-0 z-0">
          <HeroParticles />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Optimize Everything,
              <span className="text-blue-600"> Automate Success</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Harness the power of AI to transform your business processes. Optima API uses advanced 
              machine learning to identify bottlenecks, predict optimizations, and automate workflows 
              for maximum efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?mode=signup">
                <Button size="lg" className="text-lg px-8 py-3">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powered by OptimaCore AI Engine
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our specialized AI model combines process mining, predictive analytics, and machine learning 
              to deliver unprecedented business optimization capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Intelligent Process Discovery</CardTitle>
                <CardDescription>
                  AI automatically maps and analyzes your existing workflows, identifying 
                  inefficiencies and optimization opportunities in real-time.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Predictive Optimization</CardTitle>
                <CardDescription>
                  Advanced algorithms predict process performance and suggest improvements 
                  before bottlenecks occur, ensuring continuous efficiency gains.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Rocket className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Smart Automation</CardTitle>
                <CardDescription>
                  Implement AI-recommended automations with one click, reducing manual work 
                  and eliminating human error in critical business processes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
              <div className="text-gray-600">Average Efficiency Gain</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Hours Saved Per Month</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Integrations Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">API Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transform Any Business Process
            </h2>
            <p className="text-xl text-gray-600">
              From customer onboarding to supply chain management, Optima API optimizes it all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Customer Onboarding",
                description: "Reduce onboarding time by 60% with AI-optimized workflows"
              },
              {
                icon: BarChart3,
                title: "Sales Pipeline",
                description: "Increase conversion rates through intelligent lead scoring and routing"
              },
              {
                icon: Clock,
                title: "Support Tickets",
                description: "Automate ticket classification and routing for faster resolution"
              },
              {
                icon: Target,
                title: "Marketing Campaigns",
                description: "Optimize campaign performance with predictive audience targeting"
              },
              {
                icon: Shield,
                title: "Compliance Workflows",
                description: "Ensure 100% compliance with automated monitoring and reporting"
              },
              {
                icon: Rocket,
                title: "Product Development",
                description: "Accelerate time-to-market with optimized development processes"
              }
            ].map((useCase, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <useCase.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Optimize Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using Optima API to transform their operations. 
            Start your free trial today and see results in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth?mode=signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
