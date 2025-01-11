import { getPlaylist } from '@/actions/youtube';
import { Playlists } from '@/components/playlists';
import authOptions from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function fetchPlaylists() {
  try {
    const response = await getPlaylist();
    console.log('response', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.log('errorData', errorData);
      const errorMessage = errorData?.error || 'Failed to fetch playlists';
      throw new Error(errorMessage);
    }
    const playlists = await response.json();
    console.log('playlists', playlists.items[0]);
    return playlists;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export default async function PlaylistsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }
  const playlists = await fetchPlaylists();

  return <Playlists playlists={playlists} />;
}
