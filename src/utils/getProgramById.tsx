import programs from '@/programs.json';

export function getProgramById(programId: string) {
  return programs.find((program) => program.id == programId);
}
