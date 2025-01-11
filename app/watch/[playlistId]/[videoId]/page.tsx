import { getVideoandPlaylists } from '@/actions/youtube';
import { WatchVideo } from '@/components/watch';
import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function getPageDetails(playlistId: string, videoId: string) {
  try {
    const response = await getVideoandPlaylists(playlistId, videoId);
    console.log('response', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('errorData', errorData);
      const errorMessage = errorData?.error || 'Failed to fetch playlists';
      throw new Error(errorMessage);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export default async function WatchPage({
  params,
}: {
  params: { playlistId: string; videoId: string };
}) {
  if (!params.playlistId || !params.videoId) {
    return (
      <div className="container py-20 text-center text-white">
        <h2 className="text-2xl font-bold">Video not found</h2>
        <Link
          href="/playlists"
          className="mt-4 inline-block text-[#8257E5] hover:underline"
        >
          Return to playlists
        </Link>
      </div>
    );
  }
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }
  const data = await getPageDetails(params.playlistId, params.videoId);
  console.log('Watch Video Data', data.videoData);
  console.log('Channel Thumbnails', data.channelThumbnails);
  return (
    <div>
      <h1>Watch</h1>
      <WatchVideo
        playlistId={params.playlistId}
        playlistData={data.combinedData}
        videoData={data.videoData}
        videoId={params.videoId}
        channelThumbnails={data.channelThumbnails}
        playlistName={data.playlistTitle}
      />
    </div>
  );
}
