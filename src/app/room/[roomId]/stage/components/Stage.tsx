'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Idol from './Idol';

type StageProps = {
  onLiveEnd: () => void;
};

// ==========================================
// ⚡️ オーディオリアクティブ・レーザー
// ==========================================
function Laser({ 
  color, 
  position, 
  delay, 
  energyRef,
  activationLevel // ★追加：出現に必要な音量レベル（0.0 〜 2.0くらい）
}: { 
  color: string, 
  position: [number, number, number], 
  delay: number,
  energyRef: React.MutableRefObject<number>,
  activationLevel: number 
}) {
  const groupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !beamRef.current) return;
    const t = state.clock.elapsedTime;
    const energy = energyRef.current; // 音量 (0.0 〜 2.5)

    // ★ 判定：今の音量は、このレーザーの出現条件を超えているか？
    const isActive = energy > activationLevel;

    // 動きの計算（見えていなくても裏で動かしておく）
    const speed = 2 + (energy * 5);
    groupRef.current.rotation.y = Math.sin(t * speed + delay) * 0.8; 
    groupRef.current.rotation.x = Math.sin(t * (speed * 0.5) + delay) * 0.3;
    groupRef.current.rotation.z += 0.05 + energy * 0.1;

    // ★ 表示/非表示の切り替えアニメーション
    // isActiveなら不透明度を 0.8 に、違うなら 0 に向かって変化させる
    const targetOpacity = isActive ? 0.8 : 0;
    
    // 現在の不透明度を取得
    const mat = beamRef.current.material as THREE.MeshBasicMaterial;
    
    // Lerp（線形補間）を使って、パッ！と消えるのではなくシュッ！と消えるようにする（数値 0.2 を変えると反応速度が変わる）
    mat.opacity += (targetOpacity - mat.opacity) * 0.2;

    // ほぼ透明なら描画しない（負荷軽減）
    beamRef.current.visible = mat.opacity > 0.01;

    // 出現時は太さも少し変化させる
    const thicknessScale = isActive ? 1 + (energy * 0.5) : 0.1;
    // X軸とZ軸（太さ）を伸縮
    beamRef.current.scale.set(thicknessScale, 1, thicknessScale);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* 円柱の向き：X軸90度回転でZ方向に伸ばす */}
      <mesh ref={beamRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 25]}> 
        <cylinderGeometry args={[0.03, 0.03, 50, 8]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ==========================================
// 🎤 ステージ本体
// ==========================================
export default function Stage({ onLiveEnd }: StageProps) {
  const { camera } = useThree();
  const [isPlaying, setIsPlaying] = useState(false);

  // ★ 音楽の強さ（エネルギー）を格納する箱
  // これを全てのレーザーで共有する（再レンダリングなしで高速連携）
  const energyRef = useRef(0);

  // 背景テクスチャ作成
  const backgroundTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#111827'); // gray-900
    gradient.addColorStop(0.5, '#831843'); // pink-900
    gradient.addColorStop(1, '#111827'); // gray-900
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    return new THREE.CanvasTexture(canvas);
  }, []);

  // 1. オーディオシステムの構築
  const [listener] = useState(() => new THREE.AudioListener());
  const [sound] = useState(() => new THREE.Audio(listener));
  const [analyser] = useState(() => new THREE.AudioAnalyser(sound, 32)); // 32 = 解像度（軽くする）

  // 2. 音源のロード
  const buffer = useLoader(THREE.AudioLoader, '/sounds/live-bgm2.mp3');

  useEffect(() => {
    sound.setBuffer(buffer);
    sound.setLoop(false);
    sound.setVolume(0.5);
    camera.add(listener); // カメラに耳をつける

    // 再生終了時の処理
    sound.onEnded = () => {
      onLiveEnd();
    };

    return () => {
      sound.stop();
      camera.remove(listener);
    };
  }, [buffer, camera, listener, sound, onLiveEnd]);

  // 3. 再生開始関数
  const handlePlay = () => {
    if (sound.isPlaying) return;
    // ブラウザの自動再生ポリシー対策
    if (sound.context.state === 'suspended') {
      sound.context.resume();
    }
    sound.play();
    setIsPlaying(true);
  };

  // 4. 毎フレーム音のデータを解析して energyRef に入れる
  useFrame(() => {
    if (!sound.isPlaying) return;

    // 平均周波数データを取得 (0 〜 255)
    const freq = analyser.getAverageFrequency();
    
    // 扱いやすいように 0.0 〜 1.0 に正規化
    // 少し感度を上げるために 100 で割ったり調整
    energyRef.current = freq / 100; 
  });

  // アイドル設定
  const idols = [
    { pos: [0, 0, 0], delay: 0, userId: 1 },
    { pos: [5, 0, -2], delay: 0, userId: 2 },
    { pos: [-5, 0, -2], delay: 0, userId: 3 },
  ];

  return (
    <group position={[0, -1, 0]}>
      {/* クリックで再生開始 */}
      <mesh receiveShadow onClick={handlePlay}>
        <boxGeometry args={[16, 1, 8]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.6} metalness={0.15} />
      </mesh>

      {/* ステージ前縁 */}
      <mesh position={[0, -0.45, 4.05]}>
        <boxGeometry args={[16, 0.1, 0.2]} />
        <meshStandardMaterial color="#666" roughness={0.6} />
      </mesh>

      {/* 背景 */}
      <mesh position={[0, 5, -6]}>
        <boxGeometry args={[16, 10, 0.5]} />
        <meshBasicMaterial map={backgroundTexture} />
      </mesh>
      
      {/* アイドルはマウント時はそのまま表示 */}
      {idols.map((idol, index) => (
        <React.Fragment key={index}>
          {/* play()した後だけ動かしたい場合はここに条件分岐を入れても良い */}
           <Idol 
             userId={idol.userId} 
             position={idol.pos as [number, number, number]} 
             delay={idol.delay} 
           />
        </React.Fragment>
      ))}

      

      {/* ⚡️ レーザー群：activationLevel で出現順をコントロール
        
        レベルの目安（曲によりますが）:
        0.2 : 静かなイントロでも出る
        0.6 : Aメロ・Bメロくらいで出る
        1.0 : サビで出る
        1.5 : めっちゃ盛り上がってる時だけ出る
      */}

      {/* Lv 0.2: 常にセンターは出しておく */}
      <Laser position={[0, 8, -5]} color="#00ffff" delay={0} energyRef={energyRef} activationLevel={0.2} />

      {/* Lv 0.5: 少し音がなると左右が出る */}
      <Laser position={[2, 8, -5]} color="#00ffff" delay={1} energyRef={energyRef} activationLevel={0.5} />
      <Laser position={[-2, 8, -5]} color="#00ffff" delay={2} energyRef={energyRef} activationLevel={0.5} />

      {/* Lv 0.8: 盛り上がるとピンクが出る */}
      <Laser position={[5, 8, -5]} color="#ff00ff" delay={3} energyRef={energyRef} activationLevel={0.8} />
      <Laser position={[-5, 8, -5]} color="#ff00ff" delay={4} energyRef={energyRef} activationLevel={0.8} />
      
      {/* Lv 1.2: サビで下からの緑レーザー解禁 */}
      <Laser position={[8, 0, -5]} color="#00ff00" delay={5} energyRef={energyRef} activationLevel={1.2} />
      <Laser position={[-8, 0, -5]} color="#00ff00" delay={6} energyRef={energyRef} activationLevel={1.2} />
      
      {/* Lv 1.5: 超盛り上がった時の隠しレーザー（さらに外側） */}
      <Laser position={[12, 5, -5]} color="#ffffff" delay={7} energyRef={energyRef} activationLevel={1.5} />
      <Laser position={[-12, 5, -5]} color="#ffffff" delay={8} energyRef={energyRef} activationLevel={1.5} />

    {/* 照明 */}
      <ambientLight intensity={1.5} />
      <spotLight position={[0, 20, 20]} angle={0.5} intensity={1000} castShadow />
      <pointLight position={[-10, 5, 5]} color="#ff00ff" intensity={500} />
      <pointLight position={[10, 5, 5]} color="#00ffff" intensity={500} />
    </group>
  );
}