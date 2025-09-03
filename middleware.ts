import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/admin', '/exponential-cp', '/settings']

// Routes that require specific global roles
const superAdminRoutes = ['/exponential-cp']
const adminRoutes = ['/exponential-cp']

// Routes that require organization admin roles
const organizationAdminRoutes = ['/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route requires authentication
  const requiresAuth = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (!requiresAuth) {
    return NextResponse.next()
  }

  // Get the session token from cookies
  const sessionToken = request.cookies.get('sb.session')?.value

  if (!sessionToken) {
    // Redirect to login if no session token
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // For routes that require specific role checks, we'll let the page handle the authorization
  // since we need to check both global roles and organization roles
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
