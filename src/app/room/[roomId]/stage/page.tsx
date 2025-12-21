'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Stage from './components/Stage';
import Audience from './components/Audience';

export default function StagePage() {
  const [isLiveEnded, setIsLiveEnded] = useState(false);
  const router = useRouter();

  // 🎵 コールSE
  const hakukoRef = useRef<HTMLAudioElement | null>(null);
  const fufuuRef = useRef<HTMLAudioElement | null>(null);

  const playSE = (audioRef: React.RefObject<HTMLAudioElement>) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0; // 連打対応
    audioRef.current.play();
  };

  return (
    <div className="h-screen w-screen bg-black relative">
      {/* ====== 3D STAGE ====== */}
      <Canvas
        shadows
        camera={{
          position: [0, 3.5, 14],
          fov: 45,
        }}
      >
        <ambientLight intensity={0.45} />

        <directionalLight
          position={[0, 10, 12]}
          intensity={1.2}
        />

        <spotLight
          position={[0, 12, 3.5]}
          intensity={3.5}
          angle={0.35}
          penumbra={0.6}
          castShadow
        />

        <Stage onLiveEnd={() => setIsLiveEnded(true)} />
        <Audience count={30} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.3}
          maxPolarAngle={Math.PI / 2.3}
        />
      </Canvas>

      {/* ====== コールボタンUI ====== */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-6 z-50">
        <button
          onClick={() => playSE(hakukoRef)}
          className="px-8 py-4 rounded-full bg-pink-600 text-white font-bold text-xl shadow-lg active:scale-95"
        >
          はくこ
        </button>

        <button
          onClick={() => playSE(fufuuRef)}
          className="px-8 py-4 rounded-full bg-blue-600 text-white font-bold text-xl shadow-lg active:scale-95"
        >
          ふーふー
        </button>
      </div>

      {/* ====== Audio Elements ====== */}
      <audio ref={hakukoRef} src="/bgm1.mp3" preload="auto" />
      <audio ref={fufuuRef} src="/bgm2.mp3" preload="auto" />

      {/* ====== 終了モーダル ====== */}
      {isLiveEnded && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center text-white">
            <p className="text-lg mb-4">ライブは終了しました</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              戻る
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
