'use client';

import Person from './Person';

export default function Audience({ count }: { count: number }) {
  return (
    <group position={[0, -2, 6]}>
      {Array.from({ length: count }).map((_, i) => {
        const row = Math.floor(i / 10);
        const col = i % 10;

        return (
          <Person
            key={i}
            position={[
              col * 1.2 - 5.4,
              0,
              row * 1.4,
            ]}
          />
        );
      })}
    </group>
  );
}
