// middleware.ts
import { auth } from '@/app/(auth)/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default auth((req) => {
  try {
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
});

export const config = {
  matcher: [
    '/',
    '/id',
    '/api/:path*',
    '/login',
    '/register'
  ]
};