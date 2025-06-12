'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { HeroParticles } from '@/components/HeroParticles'

import { 
  Search, 
  Book, 
  MessageSquare, 
  Mail,
  Phone,
  ExternalLink,
  ArrowRight,
  HelpCircle,
  FileText,
  Video
} from 'lucide-react'

export default function SupportPage() {
  const supportOptions = [
    {
      icon: Book,
      title: "Documentation",
      description: "Comprehensive guides and API reference",
      link: "/docs",
      action: "Browse Docs"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      link: "#",
      action: "Start Chat"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      link: "/contact",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      link: "tel:+15551234567",
      action: "Call Now"
    }
  ]

  const popularArticles = [
    {
      title: "Getting Started with Optima API",
      category: "Quick Start",
      readTime: "5 min",
      icon: Book
    },
    {
      title: "Authentication and API Keys",
      category: "Security",
      readTime: "3 min",
      icon: FileText
    },
    {
      title: "Understanding Rate Limits",
      category: "API Reference",
      readTime: "4 min",
      icon: FileText
    },
    {
      title: "Process Optimization Best Practices",
      category: "Guides",
      readTime: "8 min",
      icon: Book
    },
    {
      title: "Troubleshooting Common Issues",
      category: "Troubleshooting",
      readTime: "6 min",
      icon: HelpCircle
    },
    {
      title: "Webhook Setup and Configuration",
      category: "Integration",
      readTime: "7 min",
      icon: FileText
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get help, find answers, and learn how to make the most of Optima API
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help articles, guides, and more..."
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {supportOptions.map((option) => (
            <Card key={option.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <option.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open(option.link, '_blank')}
                >
                  {option.action}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
          <HeroParticles />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Popular Articles */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Popular Help Articles</CardTitle>
                <CardDescription>
                  Most viewed articles and guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <article.icon className="h-8 w-8 text-blue-600" />
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-900">{article.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Video Tutorials */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="mr-2 h-6 w-6" />
                  Video Tutorials
                </CardTitle>
                <CardDescription>
                  Step-by-step video guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Getting Started in 5 Minutes</h3>
                    <p className="text-sm text-gray-600">Complete walkthrough of your first optimization</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <div className="h-32 bg-gray-200 rounded mb-3 flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1">Advanced API Usage</h3>
                    <p className="text-sm text-gray-600">Deep dive into advanced features and best practices</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="/docs" className="flex items-center text-blue-600 hover:text-blue-700">
                  <Book className="mr-2 h-4 w-4" />
                  API Documentation
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
                <a href="/playground" className="flex items-center text-blue-600 hover:text-blue-700">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  API Playground
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
                <a href="/status" className="flex items-center text-blue-600 hover:text-blue-700">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  System Status
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
                <a href="/contact" className="flex items-center text-blue-600 hover:text-blue-700">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                  <ExternalLink className="ml-auto h-4 w-4" />
                </a>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Support Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9 AM - 6 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">10 AM - 4 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-800 font-medium">Currently Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Need More Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Email Support</h4>
                  <p className="text-sm text-gray-600">support@optima-api.com</p>
                  <p className="text-xs text-gray-500">Response within 4 hours</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Phone Support</h4>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-xs text-gray-500">Business hours only</p>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Start Live Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  )
}