import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit/'

// Initialize Redis and Ratelimit
// We use a try-catch or conditional initialization to prevent build errors if env vars are missing during build/dev
let ratelimit: Ratelimit | undefined

try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        ratelimit = new Ratelimit({
            redis: Redis.fromEnv(),
            // Rate limit: 5 requests per 1 minute
            limiter: Ratelimit.slidingWindow(5, "1 m"),
            analytics: true,
            prefix: "@upstash/ratelimit",
        })
    }
} catch (error) {
    console.error("Failed to initialize Upstash Ratelimit:", error)
}

export async function middleware(req: NextRequest) {
    // 1. Protect /admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        const basicAuth = req.headers.get('authorization')

        if (basicAuth) {
            const authValue = basicAuth.split(' ')[1]
            const [user, pwd] = atob(authValue).split(':')

            const validUser = process.env.ADMIN_USER
            const validPass = process.env.ADMIN_PASSWORD

            if (validUser && validPass && user === validUser && pwd === validPass) {
                return NextResponse.next()
            }
        }

        return new NextResponse('Authentication Required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
            },
        })
    }

    // 2. Rate Limit Search Queries to protect OpenAI API usage
    // Only verify when 'query' param is present on the home page
    if (ratelimit && req.nextUrl.pathname === '/' && req.nextUrl.searchParams.has('query')) {
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1"
        const { success, limit, reset, remaining } = await ratelimit.limit(ip)

        if (!success) {
            return new NextResponse('Too Many Requests', {
                status: 429,
                headers: {
                    'X-RateLimit-Limit': limit.toString(),
                    'X-RateLimit-Remaining': remaining.toString(),
                    'X-RateLimit-Reset': reset.toString(),
                },
            })
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
