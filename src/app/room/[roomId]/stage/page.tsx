'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Stage from './components/Stage';
// import Audience from './components/Audience';
import Penlights from './components/Penlights';
import { useState, useEffect } from 'react';

// ✅ WebSocket URL（Lambda + API Gateway）
const WS_URL = 'wss://xxxx.execute-api.ap-southeast-2.amazonaws.com/dev';

export default function StagePage() {
  const [participantCount, setParticipantCount] = useState(30); // 参加者数

  // デモ用にランダムで参加者増減
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipantCount(25 + Math.floor(Math.random() * 10));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen bg-black">
      <Canvas
        shadows
        camera={{
          position: [0, 3.5, 14],
          fov: 45,
        }}
      >
        {/* 全体の最低限の明るさ */}
        <ambientLight intensity={0.45} />

        {/* ステージ全体を照らす正面ライト */}
        <directionalLight
          position={[0, 10, 12]}
          intensity={1.2}
        />

        {/* アイドル専用スポットライト */}
        <spotLight
          position={[0, 12, 3.5]}
          intensity={3.5}
          angle={0.35}
          penumbra={0.6}
          castShadow
        />

        {/* ステージ */}
        <Stage />

        {/* 観客ペンライト */}
        <Penlights count={participantCount} wsUrl={WS_URL} />

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
