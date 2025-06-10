import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { 
  Target, 
  Users, 
  Award, 
  Globe,
  Heart,
  Lightbulb,
  Shield,
  Zap
} from 'lucide-react'

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      bio: "Former McKinsey consultant with 10+ years in process optimization. Led digital transformation at Fortune 500 companies.",
      image: "/team/sarah.jpg"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-founder", 
      bio: "Ex-Google AI researcher. Built machine learning systems that process billions of data points daily.",
      image: "/team/marcus.jpg"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      bio: "PhD in Computer Science from Stanford. Published 50+ papers on process mining and optimization algorithms.",
      image: "/team/emily.jpg"
    },
    {
      name: "David Kim",
      role: "VP of Engineering",
      bio: "Former Stripe engineering lead. Expert in building scalable APIs and distributed systems.",
      image: "/team/david.jpg"
    }
  ]

  const values = [
    {
      icon: Target,
      title: "Customer Success",
      description: "Every optimization we deliver must create measurable value for our customers' businesses."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We push the boundaries of AI to solve complex business problems that seemed impossible before."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We protect our customers' data with enterprise-grade security and transparent practices."
    },
    {
      icon: Heart,
      title: "Human-Centered",
      description: "AI should augment human intelligence, not replace it. We design for human empowerment."
    }
  ]

  const milestones = [
    { year: "2022", event: "Company founded by Sarah and Marcus" },
    { year: "2022", event: "Seed funding raised ($2M)" },
    { year: "2023", event: "First 100 customers onboarded" },
    { year: "2023", event: "Series A funding ($15M)" },
    { year: "2024", event: "10,000+ processes optimized" },
    { year: "2024", event: "Enterprise partnerships launched" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Optima API
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're on a mission to transform how businesses operate by making AI-powered process optimization accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Users className="mr-2 h-5 w-5" />
                Join Our Team
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg">
                <Globe className="mr-2 h-5 w-5" />
                Our Impact
              </Button>
            </Link>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Target className="mr-3 h-8 w-8 text-blue-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed">
                To democratize business process optimization through AI, enabling every organization to achieve operational excellence and unlock their full potential.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Zap className="mr-3 h-8 w-8 text-blue-600" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed">
                A world where every business process is intelligently optimized, where inefficiencies are eliminated, and where human potential is amplified by AI.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">{milestone.year}</span>
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-900 font-medium">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">10,000+</div>
                  <div className="text-blue-100">Processes Optimized</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-blue-100">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">$50M+</div>
                  <div className="text-blue-100">Cost Savings Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">99.9%</div>
                  <div className="text-blue-100">API Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gray-900 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Join Us in Transforming Business</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Whether you're looking to optimize your processes or join our team, we'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth?mode=signup">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/careers">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900">
                    View Open Positions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}