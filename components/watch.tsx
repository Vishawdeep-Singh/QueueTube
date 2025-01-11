'use client';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Eye,
  MessageCircle,
  Music2,
  ThumbsUp,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Thumbnails, Video, VideoItem, type WatchVideo } from '@/types/types';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

export function WatchVideo({
  playlistId,
  playlistData,
  videoData,
  videoId,
  channelThumbnails,
  playlistName,
}: {
  playlistId: string;
  playlistData: VideoItem[];
  videoData: WatchVideo;
  videoId: string;
  channelThumbnails: Thumbnails;
  playlistName: string;
}) {
  console.log('AAAABBBB', videoData);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const router = useRouter();
  const formatViews = (views: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(views);
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
  const [loading, setLoading] = useState(false);

  function handleVideoClick(videoId: string) {
    setLoading(true); // Show loader
    router.push(`/watch/${playlistId}/${videoId}`);
  }

  return (
    <div className="min-h-screen">
      <header className="sticky  z-40 w-full border-b border-[#1F1F23] bg-[#0A0A0B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0B]/60">
        <div className="container flex px-5 h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href={`/playlists/${playlistId}`}
              className="rounded-lg p-2 text-white hover:bg-[#1F1F23] transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              {playlistName}
            </h1>
          </div>
        </div>
      </header>

      <div className="container ml-10 grid grid-cols-[1fr,400px] gap-10 py-6">
        <div className="space-y-4">
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white">
              {videoData.items[0].snippet.title}
            </h1>
            <div className="flex items-center space-x-5">
              <img
                src={channelThumbnails.high.url}
                className="h-10 w-10 rounded-full "
              />
              <div className="text-white font-bold text-xl">
                {videoData.items[0].snippet.channelTitle}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#A1A1AA]">
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>
                  {formatViews(videoData.items[0].statistics.viewCount)} views
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>
                  {formatDate(videoData.items[0].snippet.publishedAt)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <ThumbsUp className="h-4 w-4" />
                <span>
                  {formatViews(videoData.items[0].statistics.likeCount)} likes
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" />
                <span>
                  {formatViews(videoData.items[0].statistics.commentCount)}{' '}
                  comments
                </span>
              </div>
            </div>
            <p className="text-[#A1A1AA]">
              {videoData.items[0].snippet.description}
            </p>
          </div>
        </div>

        {/* side playlist component */}
        <div className="space-y-4  overflow-y-auto border border-indigo-600 rounded-2xl p-3 max-h-[calc(100vh-150px)]">
          <div className="flex items-center gap-2">
            <Music2 className="h-5 w-5 text-[#8257E5]" />
            <h2 className="font-semibold text-white">Up Next</h2>
          </div>
          <div className="space-y-2">
            {playlistData.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoClick(video.contentDetails.videoId)}
                className={`group flex w-full gap-4 rounded-lg p-2 text-left transition-colors ${
                  video.contentDetails.videoId === videoId
                    ? 'bg-[#1F1F23]'
                    : 'hover:bg-[#1F1F23]'
                }`}
              >
                <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={video.snippet.thumbnails.standard?.url}
                    alt={video.snippet.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
                    {parseISODuration(video.videoDuration)}
                  </div>
                  {videoId === video.contentDetails.videoId && (
                    <div className="absolute inset-0 bg-[#8257E5]/10" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <h3
                    className={`line-clamp-2 text-sm font-medium ${
                      video.contentDetails.videoId === videoId
                        ? 'text-[#8257E5]'
                        : 'text-white group-hover:text-[#8257E5]'
                    }`}
                  >
                    {video.snippet.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#A1A1AA]">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatViews(video.viewCount)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(video.snippet.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
