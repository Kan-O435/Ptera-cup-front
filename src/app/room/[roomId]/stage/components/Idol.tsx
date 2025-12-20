'use client';

import { useEffect, useState, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib'; 
import { VRMLoaderPlugin } from '@pixiv/three-vrm';

type IdolProps = {
  position: [number, number, number];
  delay?: number;
  userId: number; // ★追加：個体を識別するID
};

export default function Idol({ position, delay = 0, userId }: IdolProps) {
  const [vrm, setVrm] = useState<any>(null);

  // ★魔法の修正：URLの後ろに ?id=... をつけることで、キャッシュを使わずに
  // 強制的に「新しいモデル」として読み込ませます。これで脳みそが3つになります。
  const url = `/models/idol.vrm?id=${userId}`;

  const gltf = useLoader(GLTFLoader, url, (loader: any) => {
    loader.register((parser: any) => new VRMLoaderPlugin(parser));
  });

  // VRMの初期設定
  useEffect(() => {
    if (!gltf || !gltf.userData.vrm) return;

    const vrmInstance = gltf.userData.vrm;

    // マテリアルエラー対策（リボンなどが消える問題の修正）
    vrmInstance.scene.traverse((obj: any) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        // シェーダーエラーが出る場合、標準マテリアルに置き換え
        const processMaterial = (mat: any) => {
          if (mat.type === 'ShaderMaterial' || mat.name.includes('リボン')) {
            return new THREE.MeshStandardMaterial({
              color: mat.color || 0xffffff,
              map: mat.uniforms?.map?.value || mat.map || null,
              transparent: true,
              alphaTest: 0.5,
              side: THREE.DoubleSide,
            });
          }
          return mat;
        };
        obj.material = Array.isArray(obj.material) ? obj.material.map(processMaterial) : processMaterial(obj.material);
      }
    });

    setVrm(vrmInstance);
  }, [gltf]);

  // アニメーションループ
  useFrame((state, delta) => {
    if (!vrm || !vrm.humanoid) return;

    vrm.update(delta);
    const t = state.clock.elapsedTime + delay;
    const beat = t * 6; // テンポ

    const getBone = (name: string) => vrm.humanoid.getNormalizedBoneNode(name);
    
    // ボーン取得
    const hips = getBone('hips');
    const rUArm = getBone('rightUpperArm');
    const rLArm = getBone('rightLowerArm');
    const lUArm = getBone('leftUpperArm');
    const lLArm = getBone('leftLowerArm');

    // 激しいジャンプ
    if (hips) {
      hips.position.y = Math.abs(Math.sin(beat)) * 0.15;
      hips.rotation.y = Math.sin(beat * 0.5) * 0.2;
    }

    // 腕を上下に振る
    const armSwing = Math.sin(beat) * 0.5;
    if (rUArm) rUArm.rotation.x = -11.0 + armSwing;
    if (rLArm) rLArm.rotation.x = -0.5 + armSwing * 0.5;
    if (lUArm) lUArm.rotation.x = -11.0 - armSwing;
    if (lLArm) lLArm.rotation.x = -0.5 - armSwing * 0.5;
  });

  return (
    <group position={position}>
      {vrm && (
        <primitive 
          object={vrm.scene} 
          position={[0, 2, 0]} //上に2m持ち上げる
          rotation={[0, Math.PI, 0]} 
          scale={[3, 3, 3]} 
        />
      )}
    </group>
  );
}