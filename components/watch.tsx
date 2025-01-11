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
import YouTube from 'react-youtube';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';

export function WatchVideo({
  playlistId,
  playlistData,
  videoData,
  videoId,
  channelThumbnails,
  playlistName,
}: {
  playlistId: string;
  playlistData: any[];
  videoData: any;
  videoId: string;
  channelThumbnails: any;
  playlistName: string;
}) {
  const router = useRouter();

  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    playlistData.findIndex((video) => video.contentDetails.videoId === videoId)
  );

  const playNextVideo = () => {
    const currentIndex = playlistData.findIndex(
      (video) => video.contentDetails.videoId === videoId
    );
    if (currentIndex < playlistData.length - 1) {
      const nextVideo = playlistData[currentIndex + 1];
      handleVideoClick(nextVideo.contentDetails.videoId);
    }
  };

  const handleVideoClick = (newVideoId: string) => {
    router.push(`/watch/${playlistId}/${newVideoId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatViews = (views: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(views);
  };

  const parseISODuration = (duration: string): string => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = match?.[1] ? parseInt(match[1], 10) : 0;
    const minutes = match?.[2] ? parseInt(match[2], 10) : 0;
    const seconds = match?.[3] ? parseInt(match[3], 10) : 0;

    return hours > 0
      ? `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${minutes}:${String(seconds).padStart(2, '0')}`;
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === 0) {
      playNextVideo();
    }
  };

  const playerOptions = {
    height: '500',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
    },
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < playlistData.length - 1) {
      const nextVideo = playlistData[currentVideoIndex + 1];
      router.push(`/watch/${playlistId}/${nextVideo.contentDetails.videoId}`);
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      const prevVideo = playlistData[currentVideoIndex - 1];
      router.push(`/watch/${playlistId}/${prevVideo.contentDetails.videoId}`);
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky z-40 w-full border-b border-[#1F1F23] bg-[#0A0A0B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0B]/60">
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

      <div className="container mx-auto grid grid-cols-[1fr,400px] gap-10 py-6">
        <div className="space-y-4">
          <div className="w-full overflow-hidden rounded-xl bg-black">
            <YouTube
              videoId={videoId}
              opts={playerOptions}
              onStateChange={onPlayerStateChange}
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white">
              {videoData.items[0].snippet.title}
            </h1>
            <div className="flex justify-between">
              <Button
                onClick={handlePreviousVideo}
                disabled={currentVideoIndex === 0}
                className="px-4 font-bold text-lg hover:bg-gray-800 transition-colors duration-200 ease-in-out py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Previous
              </Button>
              <Button
                onClick={handleNextVideo}
                disabled={currentVideoIndex === playlistData.length - 1}
                className="px-4 py-2 bg-blue-600 text-lg text-white rounded font-bold hover:bg-indigo-800 transition-colors duration-200 ease-in-out disabled:opacity-50"
              >
                Next
              </Button>
            </div>
            <div className="flex items-center space-x-5">
              <img
                src={channelThumbnails.high.url}
                className="h-10 w-10 rounded-full"
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

        <div className="space-y-4 overflow-y-auto border border-indigo-600 rounded-2xl p-3 max-h-[calc(100vh-150px)]">
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
