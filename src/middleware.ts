import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const PRIVATE_PATHS = ['/favorites', '/dashboard', '/admin'];

const intlMiddleware = createMiddleware(routing);

function isPrivatePath(pathname: string): boolean {
    const pathWithoutLocale = pathname.replace(/^\/(tk|ru)/, '') || '/';
    return PRIVATE_PATHS.some(privatePath => {
        return pathWithoutLocale === privatePath ||
            pathWithoutLocale.startsWith(`${privatePath}/`);
    });
}

function decodeJWT(token: string): any {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = parts[1];
        const decoded = JSON.parse(atob(payload));
        return decoded;
    } catch (error) {
        console.error('JWT decode error:', error);
        return null;
    }
}

function isTokenExpired(token: string): boolean {
    try {
        const decoded = decodeJWT(token);
        if (!decoded || !decoded.exp) {
            return true;
        }

        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Token validation error:', error);
        return true;
    }
}

function getTokenFromRequest(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    const tokenFromCookie = request.cookies.get('auth_token')?.value;
    if (tokenFromCookie) {
        return tokenFromCookie;
    }

    return null;
}

function createRedirectUrl(request: NextRequest, path: string): string {
    const url = request.nextUrl.clone();
    const localeMatch = request.nextUrl.pathname.match(/^\/(tk|ru)/);
    const locale = localeMatch ? localeMatch[1] : 'tk';
    url.pathname = `/${locale}${path}`;
    return url.toString();
}

function createUnauthorizedResponse(): NextResponse {
    return new NextResponse(
        JSON.stringify({ error: 'Unauthorized' }),
        {
            status: 401,
            headers: { 'content-type': 'application/json' }
        }
    );
}

export default async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for Next.js internals and static files
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    const isPrivate = isPrivatePath(pathname);

    // For public paths, just apply internationalization
    if (!isPrivate) {
        return intlMiddleware(request);
    }

    // For private paths, check authentication
    const token = getTokenFromRequest(request);

    if (!token) {
        const loginUrl = createRedirectUrl(request, '/login');
        return NextResponse.redirect(loginUrl);
    }

    if (isTokenExpired(token)) {
        const response = NextResponse.redirect(createRedirectUrl(request, '/login'));
        response.cookies.delete('auth_token');
        return response;
    }

    // Token is valid, apply internationalization
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};