import { Navigation } from '@/components/Navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: December 10, 2024
          </p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-gray max-w-none">
            <h2>1. Information We Collect</h2>
            
            <h3>Account Information</h3>
            <p>When you create an account, we collect:</p>
            <ul>
              <li>Email address</li>
              <li>Name (optional)</li>
              <li>Company information (optional)</li>
              <li>Password (encrypted)</li>
            </ul>

            <h3>Usage Data</h3>
            <p>We automatically collect information about how you use our service:</p>
            <ul>
              <li>API calls and usage patterns</li>
              <li>Process optimization data you submit</li>
              <li>Performance metrics and analytics</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and improve our optimization services</li>
              <li>Process your API requests and generate insights</li>
              <li>Monitor usage and enforce rate limits</li>
              <li>Send important service updates and notifications</li>
              <li>Provide customer support</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Information Sharing</h2>
            
            <p>We do not sell, trade, or rent your personal information. We may share information in these limited circumstances:</p>
            
            <h3>Service Providers</h3>
            <p>We work with trusted third-party service providers who help us operate our platform:</p>
            <ul>
              <li>Cloud infrastructure providers (AWS, Google Cloud)</li>
              <li>Analytics services (anonymized data only)</li>
              <li>Payment processors (for billing)</li>
              <li>Customer support tools</li>
            </ul>

            <h3>Legal Requirements</h3>
            <p>We may disclose information if required by law or to:</p>
            <ul>
              <li>Comply with legal process or government requests</li>
              <li>Protect our rights, property, or safety</li>
              <li>Prevent fraud or security threats</li>
              <li>Enforce our Terms of Service</li>
            </ul>

            <h2>4. Data Security</h2>
            
            <p>We implement industry-standard security measures to protect your data:</p>
            <ul>
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers with 24/7 monitoring</li>
              <li>Employee background checks and training</li>
            </ul>

            <h2>5. Data Retention</h2>
            
            <p>We retain your information for as long as necessary to provide our services:</p>
            <ul>
              <li>Account data: Until you delete your account</li>
              <li>API usage logs: 2 years for analytics and billing</li>
              <li>Process optimization data: Until you delete it or close your account</li>
              <li>Support communications: 3 years</li>
            </ul>

            <h2>6. Your Rights</h2>
            
            <p>You have the following rights regarding your personal data:</p>
            
            <h3>Access and Portability</h3>
            <ul>
              <li>Request a copy of your personal data</li>
              <li>Export your process optimization data</li>
              <li>Download your API usage history</li>
            </ul>

            <h3>Correction and Deletion</h3>
            <ul>
              <li>Update your account information</li>
              <li>Delete specific process data</li>
              <li>Request account deletion</li>
            </ul>

            <h3>Control</h3>
            <ul>
              <li>Opt out of marketing communications</li>
              <li>Manage notification preferences</li>
              <li>Control data sharing settings</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            
            <p>We use cookies and similar technologies to:</p>
            <ul>
              <li>Keep you logged in</li>
              <li>Remember your preferences</li>
              <li>Analyze usage patterns (anonymized)</li>
              <li>Improve our service performance</li>
            </ul>

            <p>You can control cookies through your browser settings. Disabling cookies may affect some functionality.</p>

            <h2>8. International Data Transfers</h2>
            
            <p>Your data may be processed in countries other than your own. We ensure adequate protection through:</p>
            <ul>
              <li>Standard contractual clauses</li>
              <li>Adequacy decisions</li>
              <li>Certification schemes</li>
              <li>Binding corporate rules</li>
            </ul>

            <h2>9. Children's Privacy</h2>
            
            <p>Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately.</p>

            <h2>10. Changes to This Policy</h2>
            
            <p>We may update this privacy policy from time to time. We will:</p>
            <ul>
              <li>Notify you of material changes via email</li>
              <li>Post updates on our website</li>
              <li>Provide 30 days notice for significant changes</li>
              <li>Update the "Last updated" date</li>
            </ul>

            <h2>11. Contact Us</h2>
            
            <p>If you have questions about this privacy policy or our data practices, please contact us:</p>
            
            <div className="bg-gray-50 p-6 rounded-lg mt-6">
              <p><strong>Email:</strong> privacy@optima-api.com</p>
              <p><strong>Address:</strong> 123 Market Street, Suite 400, San Francisco, CA 94105</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>

            <h2>12. GDPR Compliance</h2>
            
            <p>For users in the European Union, we comply with the General Data Protection Regulation (GDPR). You have additional rights including:</p>
            <ul>
              <li>Right to object to processing</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to lodge a complaint with supervisory authorities</li>
            </ul>

            <h2>13. California Privacy Rights</h2>
            
            <p>California residents have additional rights under the California Consumer Privacy Act (CCPA):</p>
            <ul>
              <li>Right to know what personal information is collected</li>
              <li>Right to delete personal information</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>Right to non-discrimination for exercising privacy rights</li>
            </ul>

            <p className="text-sm text-gray-600 mt-8 pt-8 border-t">
              This privacy policy is effective as of December 10, 2024. By using Optima API, you agree to the collection and use of information in accordance with this policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}