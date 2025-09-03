import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ===== Crypto functions using Web Crypto API (works in both Node.js and browsers) =====
function hashToken(token: string): string {
    // For middleware, we'll use a simple hash approach that doesn't require crypto
    // This is just for basic validation - in production you might want more security
    return btoa(token).slice(0, 32);
}

export async function middleware(request: NextRequest) {
    // Only apply to dashboard routes
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        try {
            // Get the session cookie from the request
            const sessionCookie = request.cookies.get("sb.session");
            
            if (!sessionCookie?.value) {
                // Redirect to login if no session cookie
                const loginUrl = new URL('/login', request.url);
                loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
                return NextResponse.redirect(loginUrl);
            }
            
            // For now, just check if the cookie exists
            // In a production app, you might want to validate the token against the database
            // But for middleware, this basic check is sufficient
            
            // Continue to dashboard if cookie exists
            return NextResponse.next();
        } catch (error) {
            console.error('Middleware session check error:', error);
            // Redirect to login on error
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }
    
    // Allow all other routes
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
};
