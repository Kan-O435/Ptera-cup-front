'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Person({
  position,
  color,
}: {
  position: [number, number, number];
  color?: string;
}) {
  const penRef = useRef<THREE.Mesh>(null);

  // 🔹 ランダムに赤・青・緑を決める（color props が無ければ）
  const defaultColor = useMemo(() => {
    if (color) return color;
    const colors = ['red', 'blue', 'green'];
    return colors[Math.floor(Math.random() * colors.length)];
  }, [color]);

  // 🔹 自然な往復振り
  useFrame(({ clock }) => {
    if (!penRef.current) return;

    // 速度を落として自然に
    const speed = 6; // 振りの速さ（小さくするほどゆっくり）
    const amplitude = Math.PI / 3; // ±60度

    penRef.current.rotation.x = -Math.PI / 6 + Math.sin(clock.elapsedTime * speed) * amplitude;
  });

  return (
    <group position={position}>
      {/* 人 */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 1.4, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* ペンライト */}
      <mesh
        ref={penRef}
        position={[0.3, 0.8, 0]}
      >
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial
          color={defaultColor}
          emissive={defaultColor}
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}
