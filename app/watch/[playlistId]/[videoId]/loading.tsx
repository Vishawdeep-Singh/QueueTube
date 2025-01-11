import { Skeleton } from '@/components/ui/skeleton';

export default function WatchVideoSkeleton() {
  return (
    <div className="min-h-screen dark">
      <div className="container flex h-20 items-center justify-between"></div>
      <div className="container ml-10 grid grid-cols-[1fr,400px] gap-6 py-6">
        <div className="space-y-4">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
}
