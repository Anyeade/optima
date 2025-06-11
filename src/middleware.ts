import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({ name, value, ...options })
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({ name, value: '', ...options })
          res.cookies.set({ name, value: '', ...options })
        }
      }
    }
  )

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Admin routes protection
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Check if user is authenticated
    if (!session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/auth'
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user has admin role
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
        // Redirect non-admin users to dashboard
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/dashboard'
        return NextResponse.redirect(redirectUrl)
      }

      // Super admin only routes
      if (req.nextUrl.pathname.startsWith('/admin/system') && profile.role !== 'super_admin') {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/admin'
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error('Error checking admin role:', error)
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/auth'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Dashboard route protection
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/auth'
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Handle non-matched routes
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');
  if (isApiRoute) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    );
  }

  // Check if route exists
  const routeExists = [
    '/',
    '/about',
    '/admin',
    '/dashboard',
    '/auth',
    '/blog',
    '/careers',
    '/api-docs',
    '/help',
    '/playground',
    '/pricing',
    '/privacy',
    '/status'
  ].includes(req.nextUrl.pathname);

  if (!routeExists) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/error';
    redirectUrl.searchParams.set('statusCode', '404');
    return NextResponse.rewrite(redirectUrl);
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|error).*)',
  ],
}