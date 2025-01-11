import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/db'; // Adjust based on your prisma client location
// import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

// function encryptToken(token: string): Buffer {
//   const algorithm = 'aes-256-gcm';
//   const iv = randomBytes(16);
//   const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'base64');

//   const cipher = createCipheriv(algorithm, key, iv);
//   const encrypted = Buffer.concat([
//     cipher.update(token, 'utf8'),
//     cipher.final(),
//   ]);

//   return Buffer.concat([iv, encrypted]);
// }

// function decryptToken(encryptedData: Buffer): string {
//   const algorithm = 'aes-256-gcm';
//   const iv = encryptedData.subarray(0, 16);
//   const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'base64');
//   const encryptedToken = encryptedData.subarray(16);

//   const decipher = createDecipheriv(algorithm, key, iv);
//   const decrypted = Buffer.concat([
//     decipher.update(encryptedToken),
//     decipher.final(),
//   ]);

//   return decrypted.toString('utf8');
// }

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            'openid email profile https://www.googleapis.com/auth/youtube.readonly',
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) {
        return false;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { accounts: true },
        });

        // If no user exists, allow sign in
        if (!existingUser) {
          return true;
        }

        // If user exists, check if this Google account is already linked
        if (
          existingUser.accounts.some(
            (acc) =>
              acc.provider === account?.provider &&
              acc.providerAccountId === account?.providerAccountId
          )
        ) {
          return true;
        }

        // If user exists but no accounts are linked yet, allow linking
        if (existingUser.accounts.length === 0) {
          return true;
        }

        return false;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },

    async session({ session, user }) {
      const accessToken = await prisma.user.findUnique({
        where: { email: user.email },
        select: { accounts: { select: { access_token: true } } },
      });
      if (accessToken && accessToken.accounts[0].access_token) {
        session.accessToken = accessToken.accounts[0].access_token;
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
};

// async function refreshGoogleAccessToken(
//   refreshToken: string
// ): Promise<{ accessToken: string; expiresIn: number } | null> {
//   if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//     console.error('Missing Google OAuth credentials');
//     return null;
//   }

//   try {
//     const response = await fetch('https://oauth2.googleapis.com/token', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         grant_type: 'refresh_token',
//         refresh_token: refreshToken,
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       console.error('Failed to refresh token:', data);
//       return null;
//     }

//     return {
//       accessToken: data.access_token,
//       expiresIn: data.expires_in,
//     };
//   } catch (error) {
//     console.error('Error refreshing access token:', error);
//     return null;
//   }
// }

export default authOptions;
