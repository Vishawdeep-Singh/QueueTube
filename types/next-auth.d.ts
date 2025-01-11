import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string;
  }
}
