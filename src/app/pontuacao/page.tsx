'use client';

import { useRouter } from 'next/navigation';
import { SignOut } from 'phosphor-react';
import { useEffect, useReducer, useState } from 'react';

export default function Pontuacao() {
  const router = useRouter();

  const [scores, setScores] = useState<Array<{
    name: string;
    time: number;
    book: number;
    program: string;
    score: number;
  }> | null>(null);

  useEffect(() => {
    const storedScores = localStorage.getItem('score');

    if (storedScores) {
      setScores(JSON.parse(storedScores));
    }
  }, []);

  return (
    <main className="lg:h-screen h-[calc(100vh-80px)] flex-col flex items-center py-16 px-4 lg:px-8">
      <header className="flex justify-between items-center w-full max-w-screen-md">
        <strong className="text-zinc-800 text-xl">Pontuações</strong>
        <button
          className="flex gap-3 items-center bg-teal-500 rounded-lg text-white h-10 px-4"
          onClick={() => {
            router.push('/');
          }}>
          <SignOut className="rotate-180 w-6 h-6" />
          Voltar
        </button>
      </header>
      <div className="overflow-auto flex-1 w-full max-w-screen-md mt-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Livro
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Programa
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Pontuação
              </th>
              <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                Tempo
              </th>
            </tr>
          </thead>
          <tbody>
            {scores
              ?.sort((a, b) => {
                if (b.score == a.score) {
                  return a.time - b.time;
                } else {
                  return b.score - a.score;
                }
              })
              .map(({ name, time, book, program, score }) => (
                <tr className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {book}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {program}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {name || 'Anônimo'}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {score}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {String(Math.floor(time / 60)).padStart(2, '0')}:
                    {String(time % 60).padStart(2, '0')}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
