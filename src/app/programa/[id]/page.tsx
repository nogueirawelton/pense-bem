import { Controls } from '@/components/Program/Controls';
import { Footer } from '@/components/Program/Footer';
import { Header } from '@/components/Program/Header';
import { RecordScore } from '@/components/Program/RecordScore';
import { getProgramById } from '@/utils/getProgramById';
import { notFound } from 'next/navigation';

interface ProgramPageParams {
  params: {
    id: string;
  };
}

export default function ProgramPage({ params }: ProgramPageParams) {
  const { id } = params;

  const program = getProgramById(id);

  if (!program) {
    return notFound();
  }

  return (
    <>
      <main className="flex flex-col lg:h-screen h-[calc(100vh-80px)]">
        <Header program={program} />
        <div className="flex-1 grid place-items-center">
          <Controls />
        </div>
        <Footer />
      </main>
      <RecordScore />
    </>
  );
}
