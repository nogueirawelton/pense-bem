'use client';

import { BookOpen, Laptop } from 'phosphor-react';
import { Timer } from './Timer';
import { Question } from './Question';
import { Score } from './Score';
import { useAppStore } from '@/store/appStore';
import { useEffect } from 'react';

interface HeaderProps {
  program: {
    id: string;
    book: number;
    answers: Array<number>;
  };
}

export function Header({ program }: HeaderProps) {
  const setProgramData = useAppStore((store) => store.setProgramData);

  useEffect(() => {
    setProgramData(program);
  }, []);

  return (
    <header className="border-b border-zinc-200">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-4 lg:py-0 min-h-[80px] flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full lg:w-fit flex items-center gap-12 justify-between lg:justify-normal">
          <strong
            className="flex gap-3 items-center text-xl text-zinc-800"
            title="Livro">
            <BookOpen className="h-8 w-8" />
            {program.book}
          </strong>
          <strong
            className="flex gap-3 items-center text-xl text-zinc-800"
            title="Programa">
            <Laptop className="h-8 w-8" />
            {program.id}
          </strong>
          <Question />
        </div>
        <div className="w-full lg:w-fit mt-4 lg:mt-0 flex gap-3 items-center text-xl text-zinc-800 justify-between lg:justify-normal">
          <Score />
          <Timer />
        </div>
      </div>
    </header>
  );
}
