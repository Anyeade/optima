'use client'

import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroParticles } from '@/components/HeroParticles'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import {
  Calendar,
  User,
  ArrowRight,
  Tag,
  TrendingUp,
  BookOpen
} from 'lucide-react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts")
  
  const featuredPost = {
    title: "The Future of Business Process Optimization: AI-Driven Insights",
    excerpt: "Discover how artificial intelligence is revolutionizing the way companies optimize their workflows, reduce costs, and improve efficiency.",
    author: "Sarah Chen",
    date: "December 8, 2024",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "/blog/featured.jpg"
  }

  const blogPosts = [
    {
      title: "5 Ways AI Can Reduce Your Customer Support Costs by 40%",
      excerpt: "Learn practical strategies to automate support workflows and improve customer satisfaction while cutting operational expenses.",
      author: "Marcus Rodriguez",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Customer Support",
      image: "/blog/support.jpg"
    },
    {
      title: "E-commerce Process Optimization: A Complete Guide",
      excerpt: "From cart abandonment to fulfillment, discover how to optimize every step of your e-commerce customer journey.",
      author: "Emily Watson",
      date: "December 2, 2024",
      readTime: "10 min read",
      category: "E-commerce",
      image: "/blog/ecommerce.jpg"
    },
    {
      title: "ROI Calculator: Measuring the Impact of Process Optimization",
      excerpt: "A step-by-step guide to calculating and demonstrating the return on investment from your optimization initiatives.",
      author: "David Kim",
      date: "November 28, 2024",
      readTime: "7 min read",
      category: "Business Strategy",
      image: "/blog/roi.jpg"
    },
    {
      title: "Building Scalable Automation: Lessons from 1000+ Implementations",
      excerpt: "Key insights and best practices from implementing process automation across diverse industries and company sizes.",
      author: "Sarah Chen",
      date: "November 25, 2024",
      readTime: "9 min read",
      category: "Automation",
      image: "/blog/automation.jpg"
    },
    {
      title: "The Psychology of Change Management in Process Optimization",
      excerpt: "Understanding human factors and resistance to change when implementing new optimized workflows in your organization.",
      author: "Dr. Lisa Park",
      date: "November 22, 2024",
      readTime: "8 min read",
      category: "Change Management",
      image: "/blog/change.jpg"
    },
    {
      title: "API Integration Best Practices for Process Optimization",
      excerpt: "Technical guide to integrating Optima API with your existing systems for maximum efficiency and reliability.",
      author: "Marcus Rodriguez",
      date: "November 18, 2024",
      readTime: "12 min read",
      category: "Technical",
      image: "/blog/api.jpg"
    }
  ]

  const categories = [
    "All Posts",
    "AI & Technology", 
    "Business Strategy",
    "Customer Support",
    "E-commerce",
    "Automation",
    "Change Management",
    "Technical"
  ]

  return (
    <div className="min-h-screen bg-background">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Optima Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, strategies, and best practices for business process optimization and AI-driven automation
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <BookOpen className="h-24 w-24 text-white opacity-50" />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium text-sm">{featuredPost.category}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm">Featured</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredPost.date}
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link href="/blog/ai-powered-process-optimization">
                  <Button className="bg-primary hover:bg-primary/90">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
          <HeroParticles />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === selectedCategory ? "default" : "outline"}
                    size="sm"
                    className={category === selectedCategory ? "bg-primary hover:bg-primary/90" : ""}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="text-primary font-medium text-sm">{post.category}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Newsletter Signup */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Stay Updated
                </CardTitle>
                <CardDescription>
                  Get the latest insights delivered to your inbox
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-input rounded focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts.slice(0, 3).map((post, index) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center text-xs text-muted-foreground space-x-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(1).map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full hover:bg-accent/80 cursor-pointer"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  )
}