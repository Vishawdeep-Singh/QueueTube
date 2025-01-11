'use client';

import { Music } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const PlaylistsSkeleton = () => {
  return (
    <div className="min-h-screen dark bg-[#0A0A0B]">
      <header className="sticky top-0 z-40 px-4 w-full border-b border-[#1F1F23] bg-[#0A0A0B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0B]/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#8257E5]/10 p-2">
              <Music className="h-8 w-8 text-indigo-400" />
            </div>
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg border border-[#1F1F23] bg-[#121214] p-4"
            >
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PlaylistsSkeleton;
