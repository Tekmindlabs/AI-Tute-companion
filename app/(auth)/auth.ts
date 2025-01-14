// app/(auth)/auth.ts
import { compare } from 'bcrypt-ts';
import NextAuth, { getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from '@/lib/db/queries';
import { authConfig } from './auth.config';
import type { User, Session } from 'next-auth';

interface ExtendedSession extends Session {
  user: User;
}

const handler = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const users = await getUser(email);
        if (users.length === 0) return null;
        const passwordsMatch = await compare(password, users[0].password!);
        if (!passwordsMatch) return null;
        return users[0] as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

// Export the auth function using getServerSession
export const auth = () => getServerSession(authConfig);

// Export other utilities
export const signIn = handler.signIn;
export const signOut = handler.signOut;
export const { GET, POST } = handler;