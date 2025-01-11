import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../../../lib/authOptions';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    const headersList = headers();

    const session = (await getServerSession(authOptions)) as Session;

    if (!session) {
      throw new Error('Unauthorized: No session found');
    }

    if (!session.accessToken) {
      throw new Error('Unauthorized: Token not found');
    }

    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/playlists',
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage =
        errorData?.error?.message || 'Failed to fetch playlists';
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
