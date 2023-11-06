'use client';

import { useAppStore } from '@/store/appStore';
import * as Dialog from '@radix-ui/react-dialog';
import ReactConfetti from 'react-confetti';
import { Cake, Clock } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function RecordScore() {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [name, setName] = useState('');

  const router = useRouter();

  const isRecordModalOpen = useAppStore((store) => store.isRecordModalOpen);
  const setIsRecordModalOpen = useAppStore(
    (store) => store.setIsRecordModalOpen
  );

  const score = useAppStore((store) => store.score);
  const time = useAppStore((store) => store.time);
  const book = useAppStore((store) => store.book);
  const program = useAppStore((store) => store.program);

  const reset = useAppStore((store) => store.reset);

  const minutes = String(Math.floor(time / 60));
  const seconds = String(time % 60);

  useEffect(() => {
    if (isRecordModalOpen) {
      setIsGameFinished(true);
    }

    if (isGameFinished && !isRecordModalOpen) {
      router.push('/pontuacao');
    }
  }, [isRecordModalOpen]);

  function saveScore() {
    const storedScores = localStorage.getItem('score');
    const scoreData = {
      name,
      time,
      book,
      program,
      score,
    };

    if (!storedScores) {
      localStorage.setItem('score', JSON.stringify([scoreData]));
    } else {
      localStorage.setItem(
        'score',
        JSON.stringify([...JSON.parse(storedScores), scoreData])
      );
    }
  }

  return (
    <Dialog.Root
      open={isRecordModalOpen}
      onOpenChange={setIsRecordModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.2)]" />
        <Dialog.Content className="fixed inset-0 z-40">
          <ReactConfetti
            className="h-screen w-screen"
            width={1920}
            height={1080}
          />
          <div className="fixed z-50 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[480px] aspect-video shadow-sm rounded-lg p-8">
            <header className="mt-6 flex justify-center">
              <strong
                className="flex gap-3 items-center text-xl text-zinc-800 w-28"
                title="Pontuação Final">
                <Cake className="h-8 w-8" />
                {score}
              </strong>
              <strong
                className="flex gap-3 items-center text-xl text-zinc-800 w-[104px]"
                title="Tempo de Conclusão">
                <Clock className="h-8 w-8" />
                {minutes.padStart(2, '0')}:{seconds.padStart(2, '0')}
              </strong>
            </header>
            <form
              className="lg:px-8"
              onSubmit={(e) => {
                e.preventDefault();
                saveScore();
                reset();
                setIsRecordModalOpen(false);
              }}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Seu Nome"
                className="mt-8 w-full h-12 rounded-lg border-4 font-bold text-2xl text-center text-sky-300 border-zinc-800 placeholder:uppercase placeholder:text-sky-300"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-lg mx-auto block bg-teal-400 text-white mt-8">
                Salvar
              </button>
            </form>
          </div>
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
