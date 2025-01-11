import { getVideos } from '@/actions/youtube';
import { PlaylistVideos } from '@/components/playlistVideos';
import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function getVideosFunc(id: string) {
  try {
    const response = await getVideos(id);
    console.log('response', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('errorData', errorData);
      const errorMessage = errorData?.error || 'Failed to fetch videos';
      throw new Error(errorMessage);
    }
    const videos = await response.json();
    console.log('Videos', videos);
    return videos;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function PlaylistInfo({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }
  const videos = await getVideosFunc(params.id);
  return (
    <PlaylistVideos videos={videos.combinedData} name={videos.playlistTitle} />
  );
}
