import { NextResponse } from 'next/server';

// TEMPORARY: Minimal middleware to test if proxy.ts is running at all
export default async function middleware(req: any) {
  console.log('[PROXY TEST] Request received:', req.nextUrl.pathname);
  console.log('[PROXY TEST] AUTH_SECRET exists:', !!process.env.AUTH_SECRET);
  
  // Just pass through all requests for now
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
