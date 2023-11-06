'use client';

import { useAppStore } from '@/store/appStore';
import { toast } from 'react-toastify';

interface ButtonProps {
  id: number;
  letter: string;
  color: string;
}

export function Button({ letter, color, id }: ButtonProps) {
  const answers = useAppStore((store) => store.answers);
  const currentQuestion = useAppStore((store) => store.currentQuestion);

  const loseAttempt = useAppStore((store) => store.loseAttempt);
  const nextQuestion = useAppStore((store) => store.nextQuestion);

  function handleAnswer() {
    if (!answers) {
      return;
    }

    if (id != answers[currentQuestion]) {
      toast.error('Resposta incorreta!');
      loseAttempt();

      return;
    }

    toast.success('Resposta correta!');
    nextQuestion();
  }

  return (
    <button
      data-button={color}
      onClick={handleAnswer}
      className="rounded-lg uppercase h-16 w-16 lg:h-40 lg:w-40 text-white grid place-items-center font-bold text-3xl">
      {letter}
    </button>
  );
}
