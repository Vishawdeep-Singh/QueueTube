'use client';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';

export const SignIn = () => {
  return (
    <div className="flex items-center  min-h-screen bg-[#0A0A0B] justify-center ">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl border border-[#1F1F23] bg-[#121214] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8257E5]/10">
        <h1 className="text-3xl font-bold text-center text-[#8257E5]">
          QueueTube
        </h1>
        <p className="text-center text-gray-400 text-lg">
          Sign in to your account to continue
        </p>
        <Button
          onClick={async () => {
            await signIn('google', {
              callbackUrl: '/playlists',
              redirect: true,
            });
          }}
          className={`w-full    bg-[#4d2ff5] font-bold hover:bg-[#6d5ccf] flex items-center justify-center gap-2`}
        >
          <img className="h-5 w-5" src="/googleIcon.svg" alt="" />
          <span className="font-semibold">Sign in with Google</span>
        </Button>
        <p className="text-xs text-center text-gray-500">
          By signing in, you agree to our{' '}
          <a href="#" className="underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};
