'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Idol({
  position,
  color = "#ff69b4",
  hairColor = "#442211",
  delay = 0,
}: {
  position: [number, number, number];
  color?: string;
  hairColor?: string;
  delay?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const armLRef = useRef<THREE.Group>(null);
  const armRRef = useRef<THREE.Group>(null);
  const skirtRef = useRef<THREE.Mesh>(null);
  const ponytailRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime + delay;
    const beat = t * 6;

    // 全体の上下
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(beat)) * 0.3;
    }

    // 頭の回転（これにポニーテールが連動します）
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(beat * 0.5) * 0.15;
      headRef.current.rotation.x = Math.sin(beat) * 0.08;
    }

    // ポニーテール独自の揺れ（頭の動きに加算される）
    if (ponytailRef.current) {
      ponytailRef.current.rotation.x = 0.4 + Math.sin(beat * 2) * 0.3;
      ponytailRef.current.rotation.z = Math.cos(beat * 1.5) * 0.1;
    }

    // 交互の腕振り
    const swing = Math.sin(beat) * 1.2;
    if (armRRef.current) armRRef.current.rotation.z = swing;
    if (armLRef.current) armLRef.current.rotation.z = -swing;

    // スカート
    if (skirtRef.current) {
      const s = 1 + Math.abs(Math.sin(beat)) * 0.2;
      skirtRef.current.scale.set(s, 1, s);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <group position={[0, 0, 0]}>
        
        {/* --- 頭部 --- */}
        <mesh ref={headRef} position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#ffe0bd" />
          
          {/* 髪（ベース） */}
          <mesh position={[0, 0.05, -0.05]}>
            <sphereGeometry args={[0.28, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
            <meshStandardMaterial color={hairColor} />
          </mesh>

          {/* ★ポニーテール（頭と完全に連動） */}
          <group ref={ponytailRef} position={[0, 0.15, -0.25]}>
            {/* ヘアゴム（シュシュ） */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.06, 0.02, 8, 16]} />
              <meshStandardMaterial color={color} /> {/* スカートとお揃いの色 */}
            </mesh>
            {/* 結び目 */}
            <mesh>
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
            {/* 毛束 */}
            <mesh position={[0, -0.4, -0.1]} rotation={[-0.2, 0, 0]}>
              <capsuleGeometry args={[0.1, 0.6, 4, 16]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          </group>

          {/* 顔パーツ */}
          <group position={[0, 0, 0.22]}>
             <mesh position={[0.1, 0.02, 0]}>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshStandardMaterial color="#222" />
                <mesh position={[0.015, 0.015, 0.02]}><sphereGeometry args={[0.01, 8, 8]} /><meshStandardMaterial color="white" /></mesh>
             </mesh>
             <mesh position={[-0.1, 0.02, 0]}>
                <sphereGeometry args={[0.035, 16, 16]} />
                <meshStandardMaterial color="#222" />
                <mesh position={[-0.015, 0.015, 0.02]}><sphereGeometry args={[0.01, 8, 8]} /><meshStandardMaterial color="white" /></mesh>
             </mesh>
             <mesh position={[0, -0.07, 0.01]} rotation={[0, 0, Math.PI]}>
                <torusGeometry args={[0.07, 0.015, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#d66" />
             </mesh>
          </group>
        </mesh>

        {/* 胴体 */}
        <mesh position={[0, 1.45, 0]}>
          <capsuleGeometry args={[0.18, 0.7, 4, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* スカート */}
        <mesh ref={skirtRef} position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.18, 0.55, 0.5, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* 腕 */}
        <group ref={armLRef} position={[-0.25, 1.8, 0]}>
          <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.06, 1.0, 4, 12]} />
            <meshStandardMaterial color="#ffe0bd" />
          </mesh>
        </group>
        <group ref={armRRef} position={[0.25, 1.8, 0]}>
          <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.06, 1.0, 4, 12]} />
            <meshStandardMaterial color="#ffe0bd" />
          </mesh>
        </group>

        {/* 足 */}
        <mesh position={[0.12, 0.55, 0]}><capsuleGeometry args={[0.07, 1.1, 4, 12]} /><meshStandardMaterial color="#ffe0bd" /></mesh>
        <mesh position={[-0.12, 0.55, 0]}><capsuleGeometry args={[0.07, 1.1, 4, 12]} /><meshStandardMaterial color="#ffe0bd" /></mesh>
      </group>
    </group>
  );
}