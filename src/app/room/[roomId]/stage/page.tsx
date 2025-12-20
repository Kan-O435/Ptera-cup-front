'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Stage from './components/Stage';
import Audience from './components/Audience';

export default function StagePage() {
  return (
    <div className="h-screen w-screen bg-black">
      <Canvas
        shadows
        camera={{
          position: [0, 3.5, 14], // ← 視点を前に
          fov: 45,
        }}
      >
        {/* 全体の最低限の明るさ */}
        <ambientLight intensity={0.45} />

        {/* ステージ全体を照らす正面ライト */}
        <directionalLight
          position={[0, 10, 12]}
          intensity={1.2} // ← ステージを明るく
        />

        {/* アイドル専用スポットライト（主役） */}
        <spotLight
          position={[0, 12, 3.5]} // ← アイドル前進に合わせる
          intensity={3.5}         // ← かなり明るい
          angle={0.35}
          penumbra={0.6}
          castShadow
        />

        {/* ステージ */}
        <Stage />

        {/* 観客（暗め） */}
        <Audience count={30} />

        {/* 視点は固定 */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 2.3}
        />
      </Canvas>
    </div>
  );
}
