'use client'

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { BookOpen, Search, MessageCircle, FileText, Video, Code, Zap, Shield } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Getting Started",
      description: "Quick start guides and basic concepts",
      articles: [
        { title: "Your First API Call", href: "#", type: "Guide" },
        { title: "Authentication Setup", href: "#", type: "Tutorial" },
        { title: "Understanding Rate Limits", href: "#", type: "Guide" },
        { title: "API Key Management", href: "#", type: "Tutorial" }
      ]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "API Reference",
      description: "Complete documentation for all endpoints",
      articles: [
        { title: "Process Analysis API", href: "#", type: "Reference" },
        { title: "Automation Triggers", href: "#", type: "Reference" },
        { title: "Webhooks Configuration", href: "#", type: "Guide" },
        { title: "Error Handling", href: "#", type: "Guide" }
      ]
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Tutorials",
      description: "Step-by-step implementation guides",
      articles: [
        { title: "E-commerce Optimization", href: "#", type: "Tutorial" },
        { title: "Customer Support Automation", href: "#", type: "Tutorial" },
        { title: "Sales Process Optimization", href: "#", type: "Tutorial" },
        { title: "HR Workflow Automation", href: "#", type: "Tutorial" }
      ]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Compliance",
      description: "Best practices and security guidelines",
      articles: [
        { title: "API Security Best Practices", href: "#", type: "Guide" },
        { title: "Data Privacy & GDPR", href: "#", type: "Guide" },
        { title: "SOC 2 Compliance", href: "#", type: "Reference" },
        { title: "Audit Logs", href: "#", type: "Tutorial" }
      ]
    }
  ]

  const popularArticles = [
    { title: "How to get started with Optima API", views: "12.5k", type: "Tutorial" },
    { title: "Understanding optimization scores", views: "8.2k", type: "Guide" },
    { title: "Setting up webhooks for real-time updates", views: "6.8k", type: "Tutorial" },
    { title: "Troubleshooting common API errors", views: "5.9k", type: "Guide" },
    { title: "Best practices for process analysis", views: "4.7k", type: "Guide" }
  ]

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0)

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
            <BookOpen className="h-4 w-4 mr-2" />
            Help Center
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find answers, guides, and tutorials to help you get the most out of Optima API
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for help articles, guides, and tutorials..."
              className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>
                  Complete reference for all endpoints and features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/docs">
                  <Button className="w-full">View Docs</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <Video className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>
                  Watch step-by-step implementation guides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">Coming Soon</Button>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get help from our technical support team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/support">
                  <Button className="w-full" variant="outline">Get Support</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Articles</h2>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                {popularArticles.map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-6 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{article.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">{article.type}</Badge>
                          <span className="text-sm text-gray-500">{article.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {(searchQuery ? filteredCategories : categories).map((category, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.articles.map((article, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <span className="text-gray-700">{article.title}</span>
                        <Badge variant="outline" className="text-xs">{article.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {searchQuery && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found for "{searchQuery}"</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our support team is here to help you succeed with Optima API
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/support">
              <Button size="lg" variant="secondary">Contact Support</Button>
            </Link>
            <Link href="/playground">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Try API Playground
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