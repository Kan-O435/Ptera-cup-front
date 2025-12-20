'use client';

import Idol from './Idol';

export default function Stage() {
  // 3人の配置データ
  const idols = [
    // userId: 1, 2, 3 を割り振ることで「別人」として認識させる
    { pos: [0, 0.54, 0], delay: 0, userId: 1 },       // センター
    { pos: [5, 0.54, -2], delay: 0, userId: 2 },   // 右（大きく離す）
    { pos: [-5, 0.54, -2], delay: 0, userId: 3 },  // 左（大きく離す）
  ];

  return (
    <group position={[0, -1, 0]}>
      {/* ======================
          ステージ床（明るめ）
         ====================== */}
      <mesh receiveShadow>
        <boxGeometry args={[16, 1, 8]} />
        <meshStandardMaterial
          color="#3a3a3a"   // ← 明るく
          roughness={0.6}
          metalness={0.15}
        />
      </mesh>

      {/* ======================
          ステージ前縁
         ====================== */}
      <mesh position={[0, -0.45, 4.05]}>
        <boxGeometry args={[16, 0.1, 0.2]} />
        <meshStandardMaterial
          color="#666"
          roughness={0.6}
        />
      </mesh>

      {/* ======================
          背景（黒幕）
         ====================== */}
      <mesh position={[0, 5, -6]}>
        <boxGeometry args={[16, 10, 0.5]} />
        <meshStandardMaterial
          color="#050505"
          roughness={1}
        />
      </mesh>
      
      {/* アイドル3人衆 */}
      {idols.map((idol, index) => (
        <Idol 
          key={index} 
          userId={idol.userId} // ★ここが重要！
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