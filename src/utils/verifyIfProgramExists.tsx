import { getProgramById } from './getProgramById';

export function verifyIfProgramExists(programId: string) {
  return Boolean(getProgramById(programId));
}
