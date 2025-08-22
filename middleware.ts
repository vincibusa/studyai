import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh session if expired - required for Server Components
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = req.nextUrl

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/lessons',
    '/quiz',
    '/tutor',
    '/grades',
    '/mindmaps',
    '/workspace',
    '/settings'
  ]

  // Define auth routes that should redirect if user is already logged in
  const authRoutes = ['/auth', '/onboarding']

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Check if current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )

  // If user is not logged in and trying to access protected route
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/auth', req.url)
    redirectUrl.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is logged in and trying to access auth routes
  if (session && isAuthRoute) {
    // Check if user has completed onboarding
    if (pathname.startsWith('/onboarding')) {
      // Allow access to onboarding if profile is incomplete
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, education_level')
        .eq('id', session.user.id)
        .single()

      // If profile is complete, redirect to dashboard
      if (profile?.full_name && profile?.education_level) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    } else {
      // Redirect to dashboard if trying to access /auth
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // If user is logged in but hasn't completed onboarding
  if (session && !isAuthRoute && !pathname.startsWith('/onboarding')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, education_level')
      .eq('id', session.user.id)
      .single()

    // If profile is incomplete, redirect to onboarding
    if (!profile?.full_name || !profile?.education_level) {
      return NextResponse.redirect(new URL('/onboarding', req.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     * - api routes (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
}