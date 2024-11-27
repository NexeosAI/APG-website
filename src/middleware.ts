import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if user is authenticated
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Check if user is an admin for admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const { data: adminRole } = await supabase
      .from('admin_roles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (!adminRole) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
} 