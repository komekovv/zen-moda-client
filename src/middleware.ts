import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const PUBLIC_PATHS = ['/', '/login', '/forgot-password', '/register'];
const PROTECTED_PATHS = ['favorites'];

const intlMiddleware = createMiddleware(routing);

function isPublicPath(pathname: string): boolean {
    const pathWithoutLocale = pathname.replace(/^\/(tk|ru)/, '') || '/';
    return PUBLIC_PATHS.some(publicPath => {
        return pathWithoutLocale === publicPath ||
            pathWithoutLocale.startsWith(`${publicPath}/`);
    });
}

function isProtectedPath(pathname: string): boolean {
    const pathWithoutLocale = pathname.replace(/^\/(tk|ru)/, '') || '/';
    return PROTECTED_PATHS.some(protectedPath => {
        return pathWithoutLocale === protectedPath ||
            pathWithoutLocale.startsWith(`${protectedPath}/`);
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

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    const isPublic = isPublicPath(pathname);
    const isProtected = isProtectedPath(pathname);
    const token = getTokenFromRequest(request);

    if (isPublic) {
        if (token && !isTokenExpired(token)) {
            const redirectUrl = createRedirectUrl(request, '/');
            return NextResponse.redirect(redirectUrl);
        }
        if (token && isTokenExpired(token)) {
            const response = intlMiddleware(request);
            response.cookies.delete('auth_token');
            return response;
        }
        return intlMiddleware(request);
    }

    if (isProtected || !isPublic) {
        if (!token) {
            if (pathname.startsWith('/api')) {
                return createUnauthorizedResponse();
            }
            const loginUrl = createRedirectUrl(request, '/login');
            return NextResponse.redirect(loginUrl);
        }

        if (isTokenExpired(token)) {
            const response = pathname.startsWith('/api')
                ? createUnauthorizedResponse()
                : NextResponse.redirect(createRedirectUrl(request, '/login'));

            response.cookies.delete('auth_token');
            return response;
        }

        return intlMiddleware(request);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};