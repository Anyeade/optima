import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { HeroParticles } from '@/components/HeroParticles'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { CheckCircle, Zap, Star, Crown, Building } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with process optimization',
      icon: Zap,
      features: [
        'Up to 3 processes',
        '1,000 API calls/month',
        'Basic optimization insights',
        'Community support',
        'Process visualization',
        'Email notifications'
      ],
      cta: 'Start Free',
      popular: false,
      href: '/auth?mode=signup'
    },
    {
      name: 'Professional',
      price: '$49',
      period: 'per month',
      description: 'Ideal for growing businesses and teams',
      icon: Star,
      features: [
        'Up to 25 processes',
        '50,000 API calls/month',
        'Advanced AI recommendations',
        'Email support',
        'Custom integrations',
        'Real-time monitoring',
        'Advanced analytics',
        'Webhook support'
      ],
      cta: 'Start Free Trial',
      popular: true,
      href: '/auth?mode=signup'
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      description: 'For large organizations with complex needs',
      icon: Crown,
      features: [
        'Unlimited processes',
        '500,000 API calls/month',
        'Real-time optimization',
        'Priority support',
        'White-label options',
        'Custom AI model training',
        'Advanced security',
        'Dedicated account manager'
      ],
      cta: 'Start Free Trial',
      popular: false,
      href: '/auth?mode=signup'
    },
    {
      name: 'Enterprise Plus',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored solutions for enterprise-scale operations',
      icon: Building,
      features: [
        'On-premise deployment',
        'Dedicated AI models',
        'Unlimited API usage',
        '24/7 support',
        'Custom feature development',
        'SLA guarantees',
        'Multi-region deployment',
        'Compliance certifications'
      ],
      cta: 'Contact Sales',
      popular: false,
      href: '/contact'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose the perfect plan for your business. Start free and scale as you grow. 
            All plans include our core AI optimization features.
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              No setup fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-lg scale-105' : 'border border-gray-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <plan.icon className={`h-12 w-12 mx-auto mb-4 ${plan.popular ? 'text-blue-500' : 'text-gray-600'}`} />
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.price !== 'Custom' && (
                      <span className="text-gray-500">/{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={plan.href}>
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
          <HeroParticles />

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What counts as an API call?
              </h3>
              <p className="text-gray-600 mb-6">
                Each request to our optimization API counts as one API call. This includes 
                process analysis, optimization recommendations, and automation triggers.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600 mb-6">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect 
                immediately, and we'll prorate any billing differences.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                All paid plans come with a 14-day free trial. No credit card required to start. 
                The Free plan is available forever with no time limits.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I exceed my limits?
              </h3>
              <p className="text-gray-600 mb-6">
                We'll notify you when you're approaching your limits. If you exceed them, 
                we'll temporarily pause your service until you upgrade or the next billing cycle.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer custom enterprise solutions?
              </h3>
              <p className="text-gray-600 mb-6">
                Yes! Our Enterprise Plus plan includes custom features, on-premise deployment, 
                and dedicated support. Contact our sales team for a tailored solution.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and wire transfers for enterprise 
                customers. All payments are processed securely through Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Optimize Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your free trial today and see the difference AI-powered optimization can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth?mode=signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}