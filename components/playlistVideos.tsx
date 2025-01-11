'use client';
import { ArrowLeft, Clock, Eye, Music2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { VideoItem } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function PlaylistVideos({
  videos,
  name,
}: {
  videos: VideoItem[];
  name: string;
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

  function parseISODuration(duration: string): string {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = match?.[1] ? parseInt(match[1], 10) : 0;
    const minutes = match?.[2] ? parseInt(match[2], 10) : 0;
    const seconds = match?.[3] ? parseInt(match[3], 10) : 0;

    // Format into HH:MM:SS or MM:SS if no hours
    return hours > 0
      ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  const formatViews = (views: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(views);
  };

  return (
    <div>
      <header className="sticky px-5  z-40 w-full border-b border-[#1F1F23] bg-[#0A0A0B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0B]/60">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/playlists"
              className="rounded-lg p-2 text-white hover:bg-[#1F1F23] transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-[#8257E5]/10 p-2.5">
                <Music2 className="h-8 w-8 text-[#8257E5]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {name}
                </h1>
                <p className="text-sm text-[#A1A1AA]">{videos.length} videos</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-[#8257E5]/20">
              <AvatarImage
                src={session.data?.user?.image ?? undefined}
                alt={session.data?.user?.name ?? undefined}
              />
              <AvatarFallback className="bg-[#1F1F23]">
                {session.data?.user?.name?.charAt(0) ?? 'X'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-white">
                {session.data?.user?.name ?? undefined}
              </p>
              <p className="text-sm text-[#A1A1AA]">Creator</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-10">
        <div className="space-y-6">
          {videos.map((video) => (
            <div
              onClick={() =>
                router.push(
                  `/watch/${video.snippet.playlistId}/${video.snippet.resourceId.videoId}`
                )
              }
              key={video.id}
              className="group cursor-pointer flex gap-6 rounded-xl border border-[#1F1F23] bg-[#121214] p-4 transition-colors hover:bg-[#1F1F23]"
            >
              <div className="relative aspect-video w-64 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={video.snippet.thumbnails.standard?.url}
                  alt={video.snippet.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
                  {parseISODuration(video.videoDuration)}
                </div>
              </div>
              <div className=" max-w-[75%] space-y-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-[#8257E5] transition-colors">
                  {video.snippet.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] truncate overflow-hidden whitespace-nowrap text-ellipsis">
                  {video.snippet.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-[#A1A1AA]">
                  <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" />
                    <span>{formatViews(video.viewCount)} views</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>
                      {formatDate(video.contentDetails.videoPublishedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
