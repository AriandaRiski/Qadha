import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export default async function middleware(req) {
    const path = req.nextUrl.pathname
    const session = await getToken({req, secret : '51ZYEOoKX6tHd4r1T80cXgf/b/BHbz+hNtvwBR7rdV0='})
 if(!session && path.startsWith('/user')) {
    return NextResponse.redirect(new URL('/login', req.url))
 }
 
}

