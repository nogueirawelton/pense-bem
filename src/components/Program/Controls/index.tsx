import { useMemo } from 'react';
import { Button } from './Button';

export function Controls() {
  const buttons = useMemo(
    () => [
      {
        letter: 'A',
        color: 'red',
      },
      {
        letter: 'B',
        color: 'yellow',
      },
      {
        letter: 'C',
        color: 'blue',
      },
      {
        letter: 'D',
        color: 'green',
      },
    ],
    []
  );
  return (
    <div className="flex gap-3">
      {buttons.map(({ letter, color }, index) => (
        <Button
          key={index}
          id={index}
          letter={letter}
          color={color}
        />
      ))}
    </div>
  );
}
