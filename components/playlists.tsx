import { Playlist } from '@/types/types';
import { Music } from 'lucide-react';
import { PlaylistCard } from './playlistCard';
import { FC } from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Profile } from './profile';

export const Playlists: FC<{ playlists: Playlist }> = async ({ playlists }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <header className="sticky top-0 z-40 px-4 w-full border-b border-[#1F1F23] bg-[#0A0A0B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0B]/60 ">
        <div className="container flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#8257E5]/10 p-2">
              <Music className="h-8 w-8 text-indigo-400" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Youtube's Playlists
            </h1>
          </div>
          <Profile />
        </div>
      </header>

      <main className="container mx-auto py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {playlists.items.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              Snippet={playlist.snippet}
              contentDetails={playlist.contentDetails}
              id={playlist.id}
            />
          ))}
        </div>
      </main>
      {/* <PlaylistGrid initialPlaylists={playlists} /> */}
    </div>
  );
};
// export const playlists: Playlist[] = [
//   {
//     id: '1',
//     title: 'Summer Vibes 2024',
//     description:
//       'Perfect playlist for those sunny beach days and outdoor adventures',
//     author: {
//       name: 'Sarah Wilson',
//       avatar:
//         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
//     },
//     coverImage:
//       'https://images.unsplash.com/photo-1534854638093-bada1813ca19?w=400',
//     timeCreated: '2024-03-15T10:30:00Z',
//   },
//   {
//     id: '2',
//     title: 'Late Night Jazz',
//     description: 'Smooth jazz collection for peaceful evening relaxation',
//     author: {
//       name: 'Marcus Chen',
//       avatar:
//         'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
//     },
//     coverImage:
//       'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400',
//     timeCreated: '2024-03-10T20:15:00Z',
//   },
//   {
//     id: '3',
//     title: 'Workout Motivation',
//     description: 'High-energy tracks to keep you moving and motivated',
//     author: {
//       name: 'Alex Thompson',
//       avatar:
//         'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
//     },
//     coverImage:
//       'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400',
//     timeCreated: '2024-03-08T15:45:00Z',
//   },
// ];
