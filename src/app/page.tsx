import { Form } from '@/components/Home/Form';

export default function Home() {
  return (
    <main className="lg:h-screen h-[calc(100vh-80px)] flex items-center justify-center px-4 lg:px-8">
      <div className="flex flex-col items-center gap-8">
        <p className="text-center text-lg">
          Para entrar em um programa, insira o seu respectivo código.
        </p>
        <Form />
      </div>
    </main>
  );
}
