'use client';

import React from 'react';
import { useEffect } from 'react';
import useSound from 'use-sound'; // ★追加
import Idol from './Idol';

type StageProps = {
  onLiveEnd: () => void;
};

export default function Stage({ onLiveEnd }: StageProps) {
  // 1. 音源の設定 (public/sounds/live-bgm2.mp3 を想定)
  const [play, { stop }] = useSound('/sounds/live-bgm2.mp3', {
    volume: 0.5,
    interrupt: true, // 重複再生を防止
    onend: () => {
      onLiveEnd();
    }
  });

  // 2. マウント時に再生を開始
  useEffect(() => {
    play();
    return () => stop(); // ステージを離れる時に音を止める
  }, [play, stop]);

  // 3人の配置データ
  const idols = [
    { pos: [0, 0, 0], delay: 0, userId: 1 },    // センター
    { pos: [5, 0, -2], delay: 0, userId: 2 },   // 右
    { pos: [-5, 0, -2], delay: 0, userId: 3 },  // 左
  ];

  return (
    <group position={[0, -1, 0]}>
      {/* ======================
          ステージ床
          onClick を追加して自動再生ブロック対策
         ====================== */}
      <mesh 
        receiveShadow 
        onClick={() => play()} // ★クリックしたら音が鳴るようにする
      >
        <boxGeometry args={[16, 1, 8]} />
        <meshStandardMaterial
          color="#3a3a3a"
          roughness={0.6}
          metalness={0.15}
        />
      </mesh>

      {/* ステージ前縁 */}
      <mesh position={[0, -0.45, 4.05]}>
        <boxGeometry args={[16, 0.1, 0.2]} />
        <meshStandardMaterial color="#666" roughness={0.6} />
      </mesh>

      {/* 背景（黒幕） */}
      <mesh position={[0, 5, -6]}>
        <boxGeometry args={[16, 10, 0.5]} />
        <meshStandardMaterial color="#050505" roughness={1} />
      </mesh>
      
      {/* アイドル3人衆 */}
      {idols.map((idol, index) => (
        <Idol 
          key={index} 
          userId={idol.userId} 
          position={idol.pos as [number, number, number]} 
          delay={idol.delay} 
        />
      ))}

      {/* 照明 */}
      <ambientLight intensity={1.5} />
      <spotLight position={[0, 20, 20]} angle={0.5} intensity={1000} castShadow />
      <pointLight position={[-10, 5, 5]} color="#ff00ff" intensity={500} />
      <pointLight position={[10, 5, 5]} color="#00ffff" intensity={500} />
    </group>
  );
}