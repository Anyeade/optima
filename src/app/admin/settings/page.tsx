'use client'

import { useState } from 'react'
import { AdminNavigation } from '@/components/admin/AdminNavigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { 
  Settings, 
  Save, 
  RefreshCw,
  Globe,
  Shield,
  Zap,
  Bell,
  Database,
  Mail,
  Slack,
  Github,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Trash2
} from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  permissions: string[]
  created: string
  lastUsed: string
  status: 'active' | 'inactive'
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setSaving] = useState(false)
  const [showApiKeys, setShowApiKeys] = useState<{ [key: string]: boolean }>({})
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'Optima API',
    platformDescription: 'AI-powered business process optimization platform',
    supportEmail: 'support@optima-api.com',
    maxUsersPerAccount: 10,
    defaultApiRateLimit: 1000,
    maintenanceMode: false,
    registrationEnabled: true
  })

  // API Configuration
  const [apiSettings, setApiSettings] = useState({
    baseUrl: 'https://api.optima-api.com',
    version: 'v1',
    defaultTimeout: 30,
    maxRequestSize: 10,
    enableCors: true,
    allowedOrigins: 'https://optima-api.com,https://app.optima-api.com',
    rateLimitWindow: 60,
    rateLimitRequests: 1000
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    slackNotifications: false,
    webhookNotifications: true,
    systemAlerts: true,
    userSignupNotifications: true,
    errorNotifications: true,
    slackWebhook: '',
    emailFrom: 'noreply@optima-api.com'
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    requireTwoFactor: false,
    sessionTimeout: 24,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    maxLoginAttempts: 5,
    lockoutDuration: 30,
    enableAuditLog: true,
    ipWhitelist: '',
    enableApiKeyRotation: true,
    apiKeyExpiryDays: 365
  })

  // Mock API Keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Master Admin Key',
      key: 'optima_admin_sk_1234567890abcdef',
      permissions: ['read', 'write', 'admin'],
      created: '2024-01-15',
      lastUsed: '2024-06-10',
      status: 'active'
    },
    {
      id: '2',
      name: 'Analytics Service',
      key: 'optima_analytics_sk_abcdef1234567890',
      permissions: ['read'],
      created: '2024-02-20',
      lastUsed: '2024-06-09',
      status: 'active'
    },
    {
      id: '3',
      name: 'Backup Service',
      key: 'optima_backup_sk_fedcba0987654321',
      permissions: ['read', 'backup'],
      created: '2024-03-10',
      lastUsed: '2024-06-08',
      status: 'inactive'
    }
  ])

  const saveSettings = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    // Show success message
  }

  const toggleApiKeyVisibility = (keyId: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  const generateNewApiKey = () => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: `optima_new_sk_${Math.random().toString(36).substring(2, 15)}`,
      permissions: ['read'],
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      status: 'active'
    }
    setApiKeys(prev => [...prev, newKey])
  }

  const deleteApiKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId))
  }

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'api', name: 'API Config', icon: Zap },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Globe }
  ]

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Configuration</CardTitle>
          <CardDescription>Basic platform settings and configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform Name
              </label>
              <Input
                value={generalSettings.platformName}
                onChange={(e) => setGeneralSettings(prev => ({ ...prev, platformName: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Email
              </label>
              <Input
                type="email"
                value={generalSettings.supportEmail}
                onChange={(e) => setGeneralSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              value={generalSettings.platformDescription}
              onChange={(e) => setGeneralSettings(prev => ({ ...prev, platformDescription: e.target.value }))}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Users Per Account
              </label>
              <Input
                type="number"
                value={generalSettings.maxUsersPerAccount}
                onChange={(e) => setGeneralSettings(prev => ({ ...prev, maxUsersPerAccount: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default API Rate Limit (per hour)
              </label>
              <Input
                type="number"
                value={generalSettings.defaultApiRateLimit}
                onChange={(e) => setGeneralSettings(prev => ({ ...prev, defaultApiRateLimit: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                <p className="text-sm text-gray-500">Temporarily disable platform access</p>
              </div>
              <button
                onClick={() => setGeneralSettings(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  generalSettings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    generalSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">User Registration</h4>
                <p className="text-sm text-gray-500">Allow new users to register</p>
              </div>
              <button
                onClick={() => setGeneralSettings(prev => ({ ...prev, registrationEnabled: !prev.registrationEnabled }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  generalSettings.registrationEnabled ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    generalSettings.registrationEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderApiSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Configure API endpoints and rate limiting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base URL
              </label>
              <Input
                value={apiSettings.baseUrl}
                onChange={(e) => setApiSettings(prev => ({ ...prev, baseUrl: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Version
              </label>
              <Input
                value={apiSettings.version}
                onChange={(e) => setApiSettings(prev => ({ ...prev, version: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Timeout (seconds)
              </label>
              <Input
                type="number"
                value={apiSettings.defaultTimeout}
                onChange={(e) => setApiSettings(prev => ({ ...prev, defaultTimeout: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Request Size (MB)
              </label>
              <Input
                type="number"
                value={apiSettings.maxRequestSize}
                onChange={(e) => setApiSettings(prev => ({ ...prev, maxRequestSize: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate Limit Window (minutes)
              </label>
              <Input
                type="number"
                value={apiSettings.rateLimitWindow}
                onChange={(e) => setApiSettings(prev => ({ ...prev, rateLimitWindow: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allowed Origins (comma-separated)
            </label>
            <Input
              value={apiSettings.allowedOrigins}
              onChange={(e) => setApiSettings(prev => ({ ...prev, allowedOrigins: e.target.value }))}
              placeholder="https://example.com,https://app.example.com"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Enable CORS</h4>
              <p className="text-sm text-gray-500">Allow cross-origin requests</p>
            </div>
            <button
              onClick={() => setApiSettings(prev => ({ ...prev, enableCors: !prev.enableCors }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                apiSettings.enableCors ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  apiSettings.enableCors ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage system API keys and permissions</CardDescription>
            </div>
            <Button onClick={generateNewApiKey}>
              <Plus className="h-4 w-4 mr-2" />
              Generate Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {apiKeys.map((apiKey) => (
              <div key={apiKey.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{apiKey.name}</h4>
                    <p className="text-sm text-gray-500">
                      Created: {apiKey.created} • Last used: {apiKey.lastUsed}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={apiKey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {apiKey.status}
                    </Badge>
                    <Button variant="outline" size="sm" onClick={() => deleteApiKey(apiKey.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex-1 font-mono text-sm bg-gray-100 p-2 rounded">
                    {showApiKeys[apiKey.id] ? apiKey.key : '•'.repeat(apiKey.key.length)}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleApiKeyVisibility(apiKey.id)}
                  >
                    {showApiKeys[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyApiKey(apiKey.key)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {apiKey.permissions.map((permission) => (
                    <Badge key={permission} variant="outline">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication & Security</CardTitle>
          <CardDescription>Configure security policies and authentication requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Session Timeout (hours)
              </label>
              <Input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password Min Length
              </label>
              <Input
                type="number"
                value={securitySettings.passwordMinLength}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Login Attempts
              </label>
              <Input
                type="number"
                value={securitySettings.maxLoginAttempts}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lockout Duration (minutes)
              </label>
              <Input
                type="number"
                value={securitySettings.lockoutDuration}
                onChange={(e) => setSecuritySettings(prev => ({ ...prev, lockoutDuration: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP Whitelist (comma-separated)
            </label>
            <Input
              value={securitySettings.ipWhitelist}
              onChange={(e) => setSecuritySettings(prev => ({ ...prev, ipWhitelist: e.target.value }))}
              placeholder="192.168.1.1,10.0.0.0/8"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Require Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Force 2FA for all admin accounts</p>
              </div>
              <button
                onClick={() => setSecuritySettings(prev => ({ ...prev, requireTwoFactor: !prev.requireTwoFactor }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securitySettings.requireTwoFactor ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    securitySettings.requireTwoFactor ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Password Special Characters</h4>
                <p className="text-sm text-gray-500">Require special characters in passwords</p>
              </div>
              <button
                onClick={() => setSecuritySettings(prev => ({ ...prev, passwordRequireSpecial: !prev.passwordRequireSpecial }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securitySettings.passwordRequireSpecial ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    securitySettings.passwordRequireSpecial ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Enable Audit Logging</h4>
                <p className="text-sm text-gray-500">Log all admin actions and changes</p>
              </div>
              <button
                onClick={() => setSecuritySettings(prev => ({ ...prev, enableAuditLog: !prev.enableAuditLog }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securitySettings.enableAuditLog ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    securitySettings.enableAuditLog ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure how and when to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <button
                onClick={() => setNotificationSettings(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Slack Notifications</h4>
                <p className="text-sm text-gray-500">Send alerts to Slack channel</p>
              </div>
              <button
                onClick={() => setNotificationSettings(prev => ({ ...prev, slackNotifications: !prev.slackNotifications }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.slackNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.slackNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">System Alerts</h4>
                <p className="text-sm text-gray-500">Critical system notifications</p>
              </div>
              <button
                onClick={() => setNotificationSettings(prev => ({ ...prev, systemAlerts: !prev.systemAlerts }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.systemAlerts ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.systemAlerts ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email From Address
              </label>
              <Input
                type="email"
                value={notificationSettings.emailFrom}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailFrom: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slack Webhook URL
              </label>
              <Input
                value={notificationSettings.slackWebhook}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, slackWebhook: e.target.value }))}
                placeholder="https://hooks.slack.com/services/..."
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Third-Party Integrations</CardTitle>
          <CardDescription>Configure external service integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Slack className="h-8 w-8 text-purple-600" />
                <div>
                  <h4 className="font-medium">Slack</h4>
                  <p className="text-sm text-gray-500">Send notifications to Slack channels</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Github className="h-8 w-8 text-gray-900" />
                <div>
                  <h4 className="font-medium">GitHub</h4>
                  <p className="text-sm text-gray-500">Issue tracking and deployment webhooks</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Not Connected</Badge>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="h-8 w-8 text-blue-600" />
                <div>
                  <h4 className="font-medium">SendGrid</h4>
                  <p className="text-sm text-gray-500">Email delivery service</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="h-8 w-8 text-green-600" />
                <div>
                  <h4 className="font-medium">Supabase</h4>
                  <p className="text-sm text-gray-500">Database and authentication</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'api':
        return renderApiSettings()
      case 'security':
        return renderSecuritySettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'integrations':
        return renderIntegrationsSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      
      <div className="flex">
        <AdminSidebar />
        
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Configure platform settings and preferences</p>
              </div>
              <Button onClick={saveSettings} disabled={isSaving}>
                {isSaving ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}