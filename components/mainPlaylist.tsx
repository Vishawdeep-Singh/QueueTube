// 'use client';

// import { useState } from 'react';
// import { PlaylistCard } from './playlistCard';
// import { Playlist} from '@/types/types';
// import { getPlaylist } from '@/actions/youtube';
// import { toast } from 'sonner';

// export default function PlaylistGrid({
//   initialPlaylists,
// }: {
//   initialPlaylists: Playlist;
// }) {
//   const [playlists, setPlaylists] = useState<PlaylistItems[]>(
//     initialPlaylists.items
//   ); // Holds fetched playlists
//   const [nextPageToken, setNextPageToken] = useState<string | null>(
//     initialPlaylists.nextPageToken
//   ); // Tracks the next page token
//   const [isFetching, setIsFetching] = useState(false); // Loading state

//   // Function to fetch more playlists
//   const fetchPlaylists = async () => {
//     if (!nextPageToken || isFetching) return;

//     setIsFetching(true);
//     try {
//       const res = await getPlaylist(nextPageToken);

//       if (!res.ok) {
//         const errorData = await res.json();
//         const errorMessage = errorData?.error || 'Failed to fetch playlists';
//         toast.error(errorMessage);
//         return;
//       }

//       const data = await res.json();

//       // Append new items and update the next page token
//       setPlaylists((prev) => [...prev, ...data.items]);
//       setNextPageToken(data.nextPageToken || null); // Handle end of pages
//     } catch (err) {
//       console.error('Error fetching playlists:', err);
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   return (
//     <main className="container mx-auto py-10">
//       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {playlists.map((playlist) => (
//           <PlaylistCard key={playlist.id} Snippet={playlist.snippet} />
//         ))}
//       </div>

//       {/* Load More Button */}
//       {nextPageToken && (
//         <div className="mt-8 text-center">
//           <button
//             onClick={fetchPlaylists}
//             className="px-4 py-2 rounded bg-[#8257E5] text-white font-medium hover:bg-[#9466FF] transition"
//             disabled={isFetching}
//           >
//             {isFetching ? 'Loading...' : 'Load More'}
//           </button>
//         </div>
//       )}
//     </main>
//   );
// }
