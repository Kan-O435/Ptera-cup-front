'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Stage from './components/Stage';
import Audience from './components/Audience';

export default function StagePage() {
  const [isLiveEnded, setIsLiveEnded] = useState(false);
  const router = useRouter();

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
        <Stage onLiveEnd={() => setIsLiveEnded(true)} />

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

      {isLiveEnded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center text-white">
            <p className="text-lg mb-4">ライブは終了しました</p>
            <button onClick={() => router.push('/dashboard')} className="bg-blue-500 text-white px-4 py-2 rounded">戻る</button>
          </div>
        </div>
      )}
    </div>
  );
}
