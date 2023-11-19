import { produce } from 'immer';
import { create } from 'zustand';

interface AppStore {
  time: number;
  score: number;
  attempts: number;
  currentQuestion: number;

  answers: Array<number> | null;
  book: string | null;
  program: string | null;

  isRecordModalOpen: boolean;
  interval: any;

  setProgramData: (program: {
    id: string;
    book: string;
    answers: Array<number>;
  }) => void;

  loseAttempt: () => void;
  nextQuestion: () => void;
  reset: () => void;

  setIsRecordModalOpen: (isOpen: boolean) => void;
  startTimer: () => void;
  stopTimer: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  time: 0,
  score: 0,
  attempts: 3,
  currentQuestion: 0,

  answers: null,
  book: null,
  program: null,

  isRecordModalOpen: false,
  interval: 0,

  setProgramData: (program) =>
    set((store) =>
      produce(store, (draft) => {
        draft.answers = program.answers;
        draft.book = program.book;
        draft.program = program.id;
      })
    ),

  loseAttempt: () =>
    set((store) =>
      produce(store, (draft) => {
        draft.attempts--;
      })
    ),

  nextQuestion: () =>
    set((store) =>
      produce(store, (draft) => {
        draft.score += draft.attempts;

        if (draft.answers && draft.currentQuestion + 1 < draft.answers.length) {
          draft.currentQuestion++;
          draft.attempts = 3;
        } else {
          draft.stopTimer();
          draft.isRecordModalOpen = true;
        }
      })
    ),

  reset: () =>
    set((store) =>
      produce(store, (draft) => {
        draft.time = 0;
        draft.score = 0;
        draft.attempts = 3;
        draft.currentQuestion = 0;
        draft.answers = null;
      })
    ),

  setIsRecordModalOpen: (isOpen: boolean) =>
    set((store) =>
      produce(store, (draft) => {
        draft.isRecordModalOpen = isOpen;
      })
    ),

  startTimer: () =>
    set((store) =>
      produce(store, (draft) => {
        draft.interval = setInterval(() => {
          set((store) =>
            produce(store, (draft) => {
              draft.time++;
            })
          );
        }, 1000);
      })
    ),

  stopTimer: () =>
    set((store) =>
      produce(store, (draft) => {
        clearInterval(draft.interval);
      })
    ),
}));
