import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Heart,
  Coffee,
  Zap,
  Globe
} from 'lucide-react'

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      salary: "$150k - $200k",
      description: "Build and optimize machine learning models for process optimization algorithms."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "New York, NY / Remote",
      type: "Full-time", 
      salary: "$130k - $170k",
      description: "Drive product strategy and roadmap for our AI-powered optimization platform."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Austin, TX / Remote",
      type: "Full-time",
      salary: "$80k - $120k",
      description: "Help enterprise customers achieve maximum value from our optimization solutions."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      description: "Scale our infrastructure to handle millions of API requests and optimize performance."
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance plus wellness stipend"
    },
    {
      icon: Coffee,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO"
    },
    {
      icon: Zap,
      title: "Growth & Learning",
      description: "$3,000 annual learning budget and conference attendance"
    },
    {
      icon: DollarSign,
      title: "Equity & Compensation",
      description: "Competitive salary, equity package, and performance bonuses"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Help us transform how businesses operate by building the future of AI-powered process optimization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#open-positions">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Users className="mr-2 h-5 w-5" />
                View Open Positions
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                <Globe className="mr-2 h-5 w-5" />
                Life at Optima
              </Button>
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Work With Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardHeader>
                  <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{position.title}</h3>
                      <p className="text-gray-600 mb-4">{position.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {position.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {position.type}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {position.salary}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Culture */}
        <Card className="mb-16 bg-blue-600 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Innovation First</h3>
                <p className="text-blue-100">We encourage experimentation and bold ideas that push the boundaries of what's possible.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Customer Obsessed</h3>
                <p className="text-blue-100">Every decision we make is guided by creating value for our customers and their success.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Team First</h3>
                <p className="text-blue-100">We win together, support each other, and celebrate both individual and team achievements.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Card>
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't See Your Role?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Send Us Your Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}