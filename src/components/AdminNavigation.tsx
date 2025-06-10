'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAdmin } from '@/hooks/useAdmin'
import { Button } from '@/components/ui/Button'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LifeBuoy, 
  BarChart3, 
  Shield,
  Bell,
  LogOut,
  Zap,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

export function AdminNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, profile, isAdmin, isSuperAdmin } = useAdmin()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    const { supabase } = await import('@/lib/supabase')
    await supabase.auth.signOut()
    router.push('/')
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: pathname === '/admin'
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users,
      current: pathname.startsWith('/admin/users')
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      current: pathname.startsWith('/admin/analytics')
    },
    {
      name: 'Support',
      href: '/admin/support',
      icon: LifeBuoy,
      current: pathname.startsWith('/admin/support')
    },
    {
      name: 'Notifications',
      href: '/admin/notifications',
      icon: Bell,
      current: pathname.startsWith('/admin/notifications')
    }
  ]

  // Super admin only navigation
  if (isSuperAdmin) {
    navigation.push({
      name: 'System Settings',
      href: '/admin/system',
      icon: Settings,
      current: pathname.startsWith('/admin/system')
    })
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="bg-gray-900 text-white">
      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-300 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 mb-8">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold">Admin Panel</span>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                    ${item.current
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info and actions */}
          <div className="flex-shrink-0 px-4 py-4 border-t border-gray-700">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {profile?.full_name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {profile?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                </p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700">
                  <Zap className="mr-2 h-4 w-4" />
                  User Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors
                    ${item.current
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              )
            })}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="px-2 space-y-1">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700">
                  <Zap className="mr-2 h-4 w-4" />
                  User Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-gray-300 border-gray-600 hover:bg-gray-700"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}