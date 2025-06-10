'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { 
  BarChart3, 
  Settings, 
  LogOut, 
  User, 
  Menu,
  X,
  Zap
} from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Optima API</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link href="/processes" className="text-gray-700 hover:text-blue-600">
                  Processes
                </Link>
                <Link href="/api-docs" className="text-gray-700 hover:text-blue-600">
                  API Docs
                </Link>
                <Link href="/playground" className="text-gray-700 hover:text-blue-600">
                  Playground
                </Link>
                <div className="flex items-center space-x-4">
                  <Link href="/settings">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/pricing" className="text-gray-700 hover:text-blue-600">
                  Pricing
                </Link>
                <Link href="/docs" className="text-gray-700 hover:text-blue-600">
                  Docs
                </Link>
                <Link href="/auth">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {user ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link href="/processes" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Processes
                </Link>
                <Link href="/api-docs" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  API Docs
                </Link>
                <Link href="/playground" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Playground
                </Link>
                <Link href="/settings" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Settings
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Pricing
                </Link>
                <Link href="/docs" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Docs
                </Link>
                <Link href="/auth" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                  Sign In
                </Link>
                <Link href="/auth?mode=signup" className="block px-3 py-2 text-blue-600 font-medium">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}