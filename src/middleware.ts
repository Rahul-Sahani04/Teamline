import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that don't require authentication
const publicPaths = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  const { pathname } = request.nextUrl

  // Allow access to public paths without authentication
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // If no token is present, redirect to login
  if (!token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  try {
    // For API routes, add the token to the headers
    if (pathname.startsWith('/api/graphql')) {
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set('Authorization', `Bearer ${token.value}`)
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }

    // Continue with the request
    return NextResponse.next()
  } catch (error) {
    // If token verification fails, redirect to login
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. Public assets
     * 2. API routes that don't require auth
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}