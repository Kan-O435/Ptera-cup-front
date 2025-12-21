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

  
  useFrame((state, delta) => {
    if (!vrm || !vrm.humanoid) return;

    vrm.update(delta);
    const t = state.clock.elapsedTime + delay;
    const beat = t * 7; // ダンスのテンポ

    // --- 1. ここでボーンを取得（これが漏れていました） ---
    const getBone = (name: string) => vrm.humanoid.getNormalizedBoneNode(name);
    
    const hips = getBone('hips');
    const lUArm = getBone('leftUpperArm');   // ← 左腕(上)
    const rUArm = getBone('rightUpperArm');  // ← 右腕(上)
    const lLArm = getBone('leftLowerArm');   // ← 左腕(下/肘)
    const rLArm = getBone('rightLowerArm');  // ← 右腕(下/肘)
    const head = getBone('head');

    // --- 2. 動きの計算 ---
    const swingL = Math.sin(beat);
    const swingR = Math.sin(beat + Math.PI); // 180度ずらして交互にする

    // --- 3. 全体の揺れ ---
    if (hips) {
      hips.position.y = Math.abs(Math.sin(beat)) * 0.08;
    }

    // --- 4. 腕のポーズ（めり込み対策：前へ出す） ---
    const forwardAngle = 2.5; // マイナスを大きくするとより前へ

    if (lUArm) {
      lUArm.rotation.z = 1.1 + swingL * 0.4;
      lUArm.rotation.x = forwardAngle; // 前に突き出す
      lUArm.rotation.y = 0.2;          // 少し外側にひねる
    }
    
    if (rUArm) {
      rUArm.rotation.z = -1.1 + swingR * 0.4;
      rUArm.rotation.x = forwardAngle; // 前に突き出す
      rUArm.rotation.y = -0.2;         // 少し外側にひねる
    }

    // --- 5. 肘のポーズ ---
    if (lLArm) lLArm.rotation.z = 0.5;
    if (rLArm) rLArm.rotation.z = -0.5;

    // --- 6. 頭の揺れ ---
    if (head) {
      head.rotation.y = Math.sin(beat * 0.5) * 0.1;
    }
  });

  return (
    <group position={position}>
      {vrm && (
        <primitive 
          object={vrm.scene} 
          position={[0, 2.85, 0]} //上に2m持ち上げる
          rotation={[0, Math.PI, 0]} 
          scale={[3, 3, 3]} 
        />
      )}
    </group>
  );
}