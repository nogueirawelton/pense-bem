import { useAppStore } from '@/store/appStore';
import { Cake } from 'phosphor-react';

export function Score() {
  const score = useAppStore((store) => store.score);

  return (
    <strong
      className="flex gap-3 items-center text-xl text-zinc-800 w-28"
      title="Pontuação">
      <Cake className="h-8 w-8" />
      {score}
    </strong>
  );
}
