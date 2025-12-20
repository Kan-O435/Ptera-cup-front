'use client';

export default function Stage() {
  return (
    <group>
      {/* ステージ床 */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[20, 1, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* ステージ前面の縁（それっぽさ用） */}
      <mesh position={[0, -0.45, 5.01]}>
        <boxGeometry args={[20, 0.1, 0.2]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* 背景壁（黒幕） */}
      <mesh position={[0, 5, -6]}>
        <boxGeometry args={[20, 10, 1]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </group>
  );
}
