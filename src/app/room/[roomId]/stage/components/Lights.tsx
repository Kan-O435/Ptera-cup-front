'use client';

export default function Lights() {
  return (
    <>
      <spotLight
        position={[-6, 12, 6]}
        intensity={1}
        angle={0.4}
        penumbra={0.5}
      />
      <spotLight
        position={[6, 12, 6]}
        intensity={1}
        angle={0.4}
        penumbra={0.5}
      />
    </>
  );
}
