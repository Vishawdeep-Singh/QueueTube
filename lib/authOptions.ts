import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
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
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at ? account.expires_at * 1000 : undefined,
        };
      }

      if (!token.expiresAt || Date.now() < token.expiresAt) {
        return token;
      }

      try {
        const refreshedTokens = await refreshGoogleAccessToken(
          token.refreshToken
        );
        if (!refreshedTokens) {
          return {
            ...token,
            error: 'RefreshAccessTokenError',
          };
        }

        return {
          ...token,
          accessToken: refreshedTokens.accessToken,
          expiresAt: Date.now() + refreshedTokens.expiresIn * 1000,
          error: undefined,
        };
      } catch (error) {
        console.error('Error refreshing access token:', error);
        return {
          ...token,
          error: 'RefreshAccessTokenError',
        };
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;

      return session;
    },
  },
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
};

async function refreshGoogleAccessToken(
  refreshToken: string | undefined
): Promise<{ accessToken: string; expiresIn: number } | null> {
  if (!refreshToken) return null;
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Missing Google OAuth credentials');
    return null;
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to refresh token:', data);
      return null;
    }

    return {
      accessToken: data.access_token,
      expiresIn: data.expires_in,
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
}

export default authOptions;
