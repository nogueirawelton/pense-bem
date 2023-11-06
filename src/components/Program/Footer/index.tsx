'use client';

import { useRouter } from 'next/navigation';
import { SignOut } from 'phosphor-react';
import { Attempts } from './Attempts';
import { useAppStore } from '@/store/appStore';

export function Footer() {
  const router = useRouter();

  const reset = useAppStore((store) => store.reset);

  return (
    <footer className="h-20 flex items-center justify-between px-4 lg:px-8">
      <button
        className="flex gap-3 items-center bg-teal-500 rounded-lg text-white h-10 px-4"
        onClick={() => {
          router.push('/');
          reset();
        }}>
        <SignOut className="rotate-180 w-6 h-6" />
        Voltar
      </button>
      <Attempts />
    </footer>
  );
}
