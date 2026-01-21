import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const authMiddleware = NextAuth(authConfig).auth;

export default async function middleware(req: any) {
  try {
    console.log('[Middleware] Processing request:', req.nextUrl.pathname);
    console.log('[Middleware] AUTH_SECRET exists:', !!process.env.AUTH_SECRET);
    console.log('[Middleware] POSTGRES_URL exists:', !!process.env.POSTGRES_URL);
    
    return await authMiddleware(req);
  } catch (error) {
    console.error('[Middleware Error]:', error);
    console.error('[Middleware Error Stack]:', error instanceof Error ? error.stack : 'No stack');
    
    // Temporarily allow through to see the actual page error
    return NextResponse.next();
  }
}

export const config = {
  // https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
