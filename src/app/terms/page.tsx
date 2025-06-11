'use client'

import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { FileText, Scale, Shield, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using the Optima API service, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service constitute a legally binding agreement between you and Optima API."
    },
    {
      title: "Description of Service",
      content: "Optima API provides AI-powered business process optimization services through our API platform. Our service analyzes your business processes and provides recommendations for optimization and automation."
    },
    {
      title: "User Accounts",
      content: "You must create an account to use our services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account."
    },
    {
      title: "API Usage and Limits",
      content: "Your use of the API is subject to rate limits and usage quotas based on your subscription plan. Excessive usage that impacts service performance may result in temporary restrictions. You may not use the API for any illegal or unauthorized purpose."
    },
    {
      title: "Data and Privacy",
      content: "You retain ownership of all data you submit to our service. We process your data in accordance with our Privacy Policy. You represent that you have the right to submit any data to our service and that such submission does not violate any third-party rights."
    },
    {
      title: "Intellectual Property",
      content: "The Optima API service, including all software, algorithms, and documentation, is protected by intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of our service without explicit written permission."
    },
    {
      title: "Payment Terms",
      content: "Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change our pricing with 30 days' notice to existing customers."
    },
    {
      title: "Service Availability",
      content: "While we strive to maintain high availability, we do not guarantee uninterrupted service. We may perform maintenance that temporarily affects service availability. We are not liable for any downtime or service interruptions."
    },
    {
      title: "Limitation of Liability",
      content: "Our liability is limited to the amount you paid for the service in the 12 months preceding the claim. We are not liable for any indirect, incidental, special, or consequential damages arising from your use of our service."
    },
    {
      title: "Termination",
      content: "Either party may terminate this agreement at any time. Upon termination, your access to the service will cease, and we may delete your data in accordance with our data retention policy. Provisions that should survive termination will remain in effect."
    },
    {
      title: "Changes to Terms",
      content: "We may modify these terms at any time. We will notify you of material changes via email or through our service. Your continued use of the service after such notification constitutes acceptance of the modified terms."
    },
    {
      title: "Governing Law",
      content: "These terms are governed by the laws of Delaware, United States. Any disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4" variant="secondary">
            <Scale className="h-4 w-4 mr-2" />
            Terms of Service
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Please read these terms carefully before using our services. 
            By using Optima API, you agree to these terms and conditions.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <span>Last updated: June 10, 2024</span>
            <span>•</span>
            <span>Effective: June 10, 2024</span>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-amber-50 border-amber-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
                <CardTitle className="text-xl text-amber-800">Important Notice</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700">
                These terms constitute a legally binding agreement. Please read them carefully. 
                If you do not agree to these terms, you may not use our services. 
                For questions about these terms, please contact our legal team at legal@optima-api.com.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Terms Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center space-x-3">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span>{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Points Summary */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Points Summary</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Here are the most important aspects of our terms
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <CardTitle>Your Data Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">You retain ownership of your data. We process it only to provide our services.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <CardTitle>Service Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">API usage is subject to rate limits and quotas based on your subscription plan.</p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Scale className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <CardTitle>Fair Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Use our service responsibly and in accordance with applicable laws and regulations.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Legal */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About These Terms?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our legal team is available to help clarify any questions about our terms of service
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary">Contact Legal Team</Button>
            </Link>
            <Link href="/privacy">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                View Privacy Policy
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-sm opacity-75">
            <p>Email us directly at: legal@optima-api.com</p>
          </div>
        </div>
      </section>

    </div>
  )
}