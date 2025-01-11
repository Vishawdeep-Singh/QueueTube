'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function PlaylistsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to your error tracking service

    toast.error('Failed to load playlists', {
      description: error.message,
    });
  }, [error]);

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Failed to load playlists</h2>
      </div>
      <p className="text-muted-foreground text-lg text-center">
        {error.message}
      </p>
      <Button
        onClick={reset}
        className="bg-[#4d2ff5] font-bold hover:bg-[#6d5ccf]"
      >
        Try again
      </Button>
    </div>
  );
}
