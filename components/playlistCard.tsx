'use client';
import { Clock, Music2, Play, Video } from 'lucide-react';
import { PlaylistContentDetails, PlaylistSnippet } from '@/types/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function PlaylistCard({
  Snippet,
  contentDetails,
  id,
}: {
  Snippet: PlaylistSnippet;
  contentDetails: PlaylistContentDetails;
  id: string;
}) {
  const session = useSession();
  const router = useRouter();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#1F1F23] bg-[#121214] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8257E5]/10">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={Snippet.thumbnails?.standard?.url}
          alt={Snippet.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
          <Video className="h-4 w-4" />
          <span>{contentDetails.itemCount} videos</span>
        </div>
        <button
          className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#8257E5] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-[#9466FF] hover:scale-110"
          onClick={() => router.push(`/playlists/${id}`)}
        >
          <Play className="h-7 w-7" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4 flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-[#8257E5]/20">
            <AvatarImage
              src={session.data?.user?.image ?? undefined}
              alt={session.data?.user?.name ?? undefined}
            />
            <AvatarFallback className="bg-[#1F1F23]">
              {session.data?.user?.name?.charAt(0) ?? 'X'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-white hover:text-[#8257E5] transition-colors">
              {session.data?.user?.name ?? undefined}
            </h3>
            <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
              <Clock className="h-4 w-4" />
              <span>{formatDate(Snippet.publishedAt)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Music2 className={cn('h-5 w-5', 'text-[#8257E5]')} />
            <h2 className="text-xl font-bold text-white hover:text-[#8257E5] transition-colors">
              {Snippet.title}
            </h2>
          </div>
          <p className="line-clamp-2 text-sm text-[#A1A1AA]">
            {Snippet.description}
          </p>
        </div>
      </div>
    </div>
  );
}
