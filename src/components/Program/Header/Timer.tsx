import { useAppStore } from '@/store/appStore';
import { Clock } from 'phosphor-react';
import { useEffect } from 'react';

export function Timer() {
  const time = useAppStore((store) => store.time);
  const startTimer = useAppStore((store) => store.startTimer);
  const stopTimer = useAppStore((store) => store.stopTimer);

  const minutes = String(Math.floor(time / 60));
  const seconds = String(time % 60);

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  return (
    <strong
      className="flex gap-3 items-center text-xl text-zinc-800 w-[104px]"
      title="Tempo">
      <Clock className="h-8 w-8" />
      {minutes.padStart(2, '0')}:{seconds.padStart(2, '0')}
    </strong>
  );
}
