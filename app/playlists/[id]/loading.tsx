'use client';

import { ArrowLeft, Music2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton'; // Reusable skeleton loader
import Link from 'next/link';

export default function PlaylistVideosSkeleton() {
  return (
    <div>
      <header className="dark sticky px-5 z-40 w-full border-b border-[#1F1F23] bg-[#0A0A0B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0B]/60">
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
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-20 mt-2" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16 mt-2" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-10">
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="group flex gap-6 rounded-xl border dark  p-4"
            >
              <Skeleton className="relative aspect-video w-64 flex-shrink-0 overflow-hidden rounded-lg" />
              <div className="max-w-[75%] space-y-2">
                <Skeleton className="h-5 w-[70%]" />
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center gap-4 text-sm">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
