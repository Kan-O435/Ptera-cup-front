'use client';

export default function Person({
  position,
  color = '#00ffff',
}: {
  position: [number, number, number];
  color?: string;
}) {
  return (
    <group position={position}>
      {/* 人 */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 1.4, 8]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* ペンライト（固定） */}
      <mesh position={[0.3, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}
