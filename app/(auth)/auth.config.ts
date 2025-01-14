// app/(auth)/auth.config.ts
import type { NextAuthConfig } from 'next-auth/types';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    newUser: '/'
  },
  callbacks: {
    authorized({ 
      auth, 
      request: { nextUrl } 
    }: { 
      auth: { user?: any } | null; 
      request: { nextUrl: URL } 
    }) {
      const isLoggedIn = !!auth?.user;
      const isOnChat = nextUrl.pathname.startsWith('/');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnRegister = nextUrl.pathname.startsWith('/register');

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl));
      }

      if (isOnLogin || isOnRegister) {
        return true;
      }

      return isLoggedIn;
    }
  }
};