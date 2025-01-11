'use client';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { signOut, useSession } from 'next-auth/react';
import { Mail } from 'lucide-react';
import { Button } from './ui/button';
export const Profile = () => {
  const session = useSession();
  if (!session.data?.user) return null;
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="rounded-full p-1 transition-colors hover:bg-[#1F1F23] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8257E5]">
            <Avatar className="h-10 w-10 ring-2 ring-[#8257E5]/90">
              <AvatarImage
                src={session.data?.user?.image ?? undefined}
                alt={session.data?.user?.name ?? undefined}
              />
              <AvatarFallback className="bg-[#1F1F23]">
                {(session.data?.user?.name ?? 'X').charAt(0)}
              </AvatarFallback>
            </Avatar>
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 border-[#1F1F23] bg-[#121214] p-6 text-white">
          <div className="flex justify-between space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={session.data?.user?.image ?? undefined} />
              <AvatarFallback>
                {(session.data?.user?.name ?? 'X').charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-4 flex-1">
              <h4 className="text-sm font-semibold">
                {session.data?.user?.name}
              </h4>
              <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                <Mail className="h-4 w-4" />
                <span>{session.data?.user?.email}</span>
              </div>
              <Button
                onClick={async () => {
                  await signOut({ callbackUrl: '/', redirect: true });
                }}
                className="bg-[#4d2ff5] font-bold hover:bg-[#6d5ccf]"
              >
                Log Out
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
