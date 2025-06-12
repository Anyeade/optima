'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  AlertTriangle,
  Database,
  Zap,
  FileText,
  MessageSquare,
  Shield,
  Globe,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface SidebarItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: SidebarItem[]
}

const sidebarItems: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    badge: '1,247',
    children: [
      { name: 'All Users', href: '/admin/users', icon: Users },
      { name: 'Active Users', href: '/admin/users/active', icon: Users },
      { name: 'Subscriptions', href: '/admin/users/subscriptions', icon: DollarSign },
      { name: 'User Analytics', href: '/admin/users/analytics', icon: BarChart3 }
    ]
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    children: [
      { name: 'Overview', href: '/admin/analytics', icon: BarChart3 },
      { name: 'API Usage', href: '/admin/analytics/api', icon: Zap },
      { name: 'Revenue', href: '/admin/analytics/revenue', icon: DollarSign },
      { name: 'Performance', href: '/admin/analytics/performance', icon: Globe }
    ]
  },
  {
    name: 'Billing',
    href: '/admin/billing',
    icon: DollarSign,
    children: [
      { name: 'Overview', href: '/admin/billing', icon: DollarSign },
      { name: 'Transactions', href: '/admin/billing/transactions', icon: FileText },
      { name: 'Subscriptions', href: '/admin/billing/subscriptions', icon: Users },
      { name: 'Reports', href: '/admin/billing/reports', icon: BarChart3 }
    ]
  },
  {
    name: 'Support',
    href: '/admin/support',
    icon: MessageSquare,
    badge: '23',
    children: [
      { name: 'Tickets', href: '/admin/support', icon: MessageSquare },
      { name: 'Live Chat', href: '/admin/support/chat', icon: MessageSquare },
      { name: 'Knowledge Base', href: '/admin/support/kb', icon: FileText },
      { name: 'Feedback', href: '/admin/support/feedback', icon: MessageSquare }
    ]
  },
  {
    name: 'System',
    href: '/admin/system',
    icon: Database,
    children: [
      { name: 'Health', href: '/admin/system', icon: Database },
      { name: 'API Monitoring', href: '/admin/system/api', icon: Zap },
      { name: 'Logs', href: '/admin/system/logs', icon: FileText },
      { name: 'Alerts', href: '/admin/system/alerts', icon: AlertTriangle }
    ]
  },
  {
    name: 'Security',
    href: '/admin/security',
    icon: Shield,
    children: [
      { name: 'Overview', href: '/admin/security', icon: Shield },
      { name: 'Access Logs', href: '/admin/security/logs', icon: FileText },
      { name: 'API Keys', href: '/admin/security/keys', icon: Zap },
      { name: 'Permissions', href: '/admin/security/permissions', icon: Users }
    ]
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    children: [
      { name: 'General', href: '/admin/settings', icon: Settings },
      { name: 'API Config', href: '/admin/settings/api', icon: Zap },
      { name: 'Notifications', href: '/admin/settings/notifications', icon: AlertTriangle },
      { name: 'Integrations', href: '/admin/settings/integrations', icon: Globe }
    ]
  }
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  const isExpanded = (itemName: string) => expandedItems.includes(itemName)

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const expanded = isExpanded(item.name)
    const active = isActive(item.href)

    return (
      <div key={item.name}>
        <div
          className={`
            flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md cursor-pointer
            ${level > 0 ? 'ml-6 pl-6 border-l border-gray-200' : ''}
            ${active 
              ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
          `}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.name)
            }
          }}
        >
          <Link 
            href={item.href} 
            className="flex items-center flex-1"
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault()
              }
            }}
          >
            <item.icon className={`mr-3 h-5 w-5 ${active ? 'text-blue-700' : 'text-gray-400'}`} />
            <span className="flex-1">{item.name}</span>
            {item.badge && (
              <span className={`
                ml-2 px-2 py-1 text-xs rounded-full
                ${active 
                  ? 'bg-blue-200 text-blue-800' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {item.badge}
              </span>
            )}
          </Link>
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleExpanded(item.name)
              }}
              className="ml-2 p-1 rounded hover:bg-gray-200"
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-400" />
              )}
            </button>
          )}
        </div>

        {hasChildren && expanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Administration</h2>
        <nav className="space-y-1">
          {sidebarItems.map(item => renderSidebarItem(item))}
        </nav>
      </div>

      {/* System Status Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">System Status</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600 font-medium">Operational</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">API Health</span>
            <span className="text-green-600 font-medium">99.9%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Active Users</span>
            <span className="text-gray-900 font-medium">892</span>
          </div>
        </div>
      </div>
    </div>
  )
}