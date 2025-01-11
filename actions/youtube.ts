'use server';

import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function getPlaylist(nextPageToken?: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error('Unauthorized: No session found');
    }

    if (!session.accessToken) {
      throw new Error('Unauthorized: Token not found');
    }
    if (nextPageToken) {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/playlists?mine=true&part=snippet&maxResults=50&pageToken=' +
          nextPageToken,
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
    } else {
      const response = await fetch(
        'https://www.googleapis.com/youtube/v3/playlists?mine=true&part=snippet,contentDetails,id&maxResults=50',
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
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function getVideos(id: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error('Unauthorized: No session found');
    }

    if (!session.accessToken) {
      throw new Error('Unauthorized: Token not found');
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,id&maxResults=50&playlistId=${id}`,
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
        errorData?.error?.message || 'Failed to fetch videos';
      throw new Error(errorMessage);
    }

    const data = await response.json();

    const videoIds = data.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(',');

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&maxResults=50`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!videosResponse.ok) {
      const errorData = await videosResponse.json();
      throw new Error(
        errorData?.error?.message || 'Failed to fetch video details'
      );
    }

    const videosData = await videosResponse.json();
    const combinedData = data.items.map((item: any) => {
      const videoDetails = videosData.items.find((video: any) => {
        return video.id === item.snippet.resourceId.videoId;
      });
      return {
        ...item,
        videoDuration: videoDetails.contentDetails.duration || 'N/A',
        viewCount: videoDetails.statistics.viewCount || 'N/A',
      };
    });

    const playlistTitle = data.items[0]?.snippet?.title || 'N/A';
    return NextResponse.json({ combinedData, playlistTitle });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function getVideoandPlaylists(
  playlistId: string,
  videoId: string
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error('Unauthorized: No session found');
    }

    if (!session.accessToken) {
      throw new Error('Unauthorized: Token not found');
    }

    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!videoResponse.ok) {
      const errorData = await videoResponse.json();
      const errorMessage =
        errorData?.error?.message || 'Failed to fetch video details';
      throw new Error(errorMessage);
    }
    const videoData = await videoResponse.json();
    const channelId = videoData.items[0].snippet.channelId;

    const channelDetailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!channelDetailsResponse.ok) {
      const errorData = await channelDetailsResponse.json();
      const errorMessage =
        errorData?.error?.message || 'Failed to fetch channel details';
      throw new Error(errorMessage);
    }

    const channelData = await channelDetailsResponse.json();
    const channelThumbnails = channelData.items[0].snippet.thumbnails;

    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,id&maxResults=50&playlistId=${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!playlistResponse.ok) {
      const errorData = await playlistResponse.json();
      throw new Error(
        errorData?.error?.message || 'Failed to fetch playlist details'
      );
    }
    const playlistData = await playlistResponse.json();

    const videoIds = playlistData.items
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(',');

    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&maxResults=50`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!videosResponse.ok) {
      const errorData = await videosResponse.json();
      throw new Error(
        errorData?.error?.message || 'Failed to fetch video details'
      );
    }

    const videosData = await videosResponse.json();
    const combinedData = playlistData.items.map((item: any) => {
      const videoDetails = videosData.items.find((video: any) => {
        return video.id === item.snippet.resourceId.videoId;
      });
      return {
        ...item,
        videoDuration: videoDetails.contentDetails.duration || 'N/A',
        viewCount: videoDetails.statistics.viewCount || 'N/A',
      };
    });

    const playlistTitle = playlistData.items[0]?.snippet?.title || 'N/A';

    return NextResponse.json({
      videoData,
      combinedData,
      channelThumbnails,
      playlistTitle,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
