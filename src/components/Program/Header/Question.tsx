import { useAppStore } from '@/store/appStore';
import { Question as Ask } from 'phosphor-react';

export function Question() {
  const currentQuestion = useAppStore((store) => store.currentQuestion);
  const program = useAppStore((store) => store.program);

  const multiplier = Number(program?.charAt(2)) - 1;

  return (
    <strong
      className="flex gap-3 items-center text-xl text-zinc-800"
      title="Pergunta">
      <Ask className="h-8 w-8" />
      {currentQuestion + (multiplier || 0) * 30 + 1}
    </strong>
  );
}
