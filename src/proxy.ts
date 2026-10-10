import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers
    })

    if (!session?.user) {
        const signInUrl = new URL('/signin', request.url)
        signInUrl.searchParams.set('callbackURL', `${request.nextUrl.pathname}${request.nextUrl.search}`)
        return NextResponse.redirect(signInUrl)
    }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ['/profile/:path*', '/product/:path*', '/infos/:path*'],
}
