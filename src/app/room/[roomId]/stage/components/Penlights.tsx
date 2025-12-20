'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  count: number;
};

export default function Penlights({ count }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = new THREE.Object3D();

  const positions = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 12,
      y: 0.5,
      z: (Math.random() - 0.5) * 4,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    positions.forEach((p, i) => {
      dummy.position.set(p.x, p.y + Math.sin(clock.elapsedTime * 5 + i) * 0.3, p.z);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color="lime" emissive="lime" />
    </instancedMesh>
  );
}
