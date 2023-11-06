import { useAppStore } from '@/store/appStore';
import { Heart } from 'phosphor-react';
import { useEffect } from 'react';

export function Attempts() {
  const attempts = useAppStore((store) => store.attempts);
  const nextQuestion = useAppStore((store) => store.nextQuestion);

  useEffect(() => {
    if (!attempts) {
      nextQuestion();
    }
  }, [attempts]);

  return (
    <strong
      data-lives={attempts}
      className="flex gap-3 items-center text-xl"
      title="Tentativas">
      <Heart className="h-8 w-8" />
      {attempts}
    </strong>
  );
}
