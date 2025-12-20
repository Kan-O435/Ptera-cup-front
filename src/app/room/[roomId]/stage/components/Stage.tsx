'use client';

export default function Stage() {
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

      {/* ======================
          アイドル（前・明るい）
         ====================== */}
      <mesh position={[0, 1.3, 1.2]} castShadow>
        <capsuleGeometry args={[0.4, 1.2, 6, 12]} />
        <meshStandardMaterial
          color="#ff99cc"
          roughness={0.25}
          metalness={0.25}
          emissive="#440018"
          emissiveIntensity={0.7}
        />
      </mesh>
    </group>
  );
}
