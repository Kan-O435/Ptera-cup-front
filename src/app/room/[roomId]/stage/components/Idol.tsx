'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export default function Idol() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return (
    <mesh ref={ref} position={[0, 1.5, 0]} castShadow>
      <cylinderGeometry args={[0.4, 0.4, 3, 32]} />
      <meshStandardMaterial color="#ff69b4" />
    </mesh>
  );
}
