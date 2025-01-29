import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const userAgent = req.headers.get('user-agent') || '';

    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);

    if (isMobile) {
        return NextResponse.redirect(new URL(`/not-allowed`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico|logos|icons|images).*)'],
};