'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

type PenlightData = {
  color: string;
  action: 'wave' | 'call' | 'idle';
};

type Props = {
  count: number;
  wsUrl: string;
};

export default function Penlights({ count, wsUrl }: Props) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();

  // 各ペンライトの状態
  const [penlights, setPenlights] = useState<PenlightData[]>(
    Array.from({ length: count }).map(() => ({
      color: '#00ff00',
      action: 'idle',
    }))
  );

  // 初期位置をランダムに配置
  const positions = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: (Math.random() - 0.5) * 12,
        y: 0.5,
        z: (Math.random() - 0.5) * 4,
      })),
    [count]
  );

  // WebSocket接続
  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === 'update' && data.participantId != null) {
        setPenlights((prev) => {
          const next = [...prev];
          // participantIdが範囲内かチェック
          const idx = data.participantId % count;
          next[idx] = {
            color: data.color || next[idx].color,
            action: data.action || 'idle',
          };
          return next;
        });
      }
    };

    return () => ws.close();
  }, [wsUrl, count]);

  // アニメーション
  useFrame(({ clock }) => {
    penlights.forEach((p, i) => {
      const basePos = positions[i];
      dummy.position.set(
        basePos.x,
        basePos.y + Math.sin(clock.elapsedTime * 5 + i) * 0.3,
        basePos.z
      );

      // 振り上げ/コールの回転
      if (p.action === 'wave') {
        dummy.rotation.z = Math.sin(clock.elapsedTime * 10 + i) * THREE.MathUtils.degToRad(60);
      } else if (p.action === 'call') {
        dummy.rotation.x = Math.sin(clock.elapsedTime * 15 + i) * THREE.MathUtils.degToRad(60);
      } else {
        dummy.rotation.set(0, 0, 0);
      }

      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);

      // 色変更
      const mat = meshRef.current?.material as THREE.MeshStandardMaterial;
      mat.color.set(p.color);
      mat.emissive.set(p.color);
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
