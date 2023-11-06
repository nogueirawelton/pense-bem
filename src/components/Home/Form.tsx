'use client';

import { verifyIfProgramExists } from '@/utils/verifyIfProgramExists';
import { useRouter } from 'next/navigation';
import { useState, useRef, FormEvent } from 'react';
import { toast } from 'react-toastify';

export function Form() {
  const [firstDigit, setFirstDigit] = useState('');
  const [secondDigit, setSecondDigit] = useState('');
  const [thirdDigit, setThirdDigit] = useState('');

  const router = useRouter();

  const secondInputRef = useRef<HTMLInputElement>(null);
  const thirdInputRef = useRef<HTMLInputElement>(null);

  const isButtonDisabled = !(
    firstDigit.length &&
    secondDigit.length &&
    thirdDigit.length
  );

  function reset() {
    setFirstDigit('');
    setSecondDigit('');
    setThirdDigit('');
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const programCode = firstDigit.concat(secondDigit, thirdDigit);

    if (!verifyIfProgramExists(programCode)) {
      toast.error('Programa indisponível ou não existente!');
      reset();
      return;
    }

    router.push(`/programa/${programCode}`);
  }

  return (
    <form
      className="flex flex-col gap-x-8 gap-y-4"
      onSubmit={onSubmit}>
      <span className="grid place-items-center w-20 h-20 uppercase rounded-lg border-4 font-black text-xl text-center text-sky-300 border-zinc-800">
        Livro
      </span>
      <input
        value={firstDigit}
        onChange={(e) => {
          const value = e.target.value;

          setFirstDigit(value);

          if (value.length > 0) {
            secondInputRef.current?.focus();
          }
        }}
        maxLength={1}
        type="text"
        className="w-20 h-20 rounded-lg border-4 font-bold text-5xl text-center text-sky-300 border-zinc-800"
      />
      <input
        ref={secondInputRef}
        value={secondDigit}
        onChange={(e) => {
          const value = e.target.value;

          setSecondDigit(value);

          if (value.length > 0) {
            thirdInputRef.current?.focus();
          }
        }}
        maxLength={1}
        type="text"
        className="w-20 h-20 rounded-lg border-4 font-bold text-5xl text-center text-sky-300 border-zinc-800"
      />
      <input
        ref={thirdInputRef}
        value={thirdDigit}
        onChange={(e) => {
          const value = e.target.value;

          setThirdDigit(value);
        }}
        maxLength={1}
        type="text"
        className="w-20 h-20 rounded-lg border-4 font-bold text-5xl text-center text-sky-300 border-zinc-800"
      />
      <button
        disabled={isButtonDisabled}
        className="w-20 h-20 uppercase rounded-lg border-4 font-black text-xl text-center text-sky-300 border-zinc-800 disabled:cursor-not-allowed">
        Enter
      </button>
    </form>
  );
}
