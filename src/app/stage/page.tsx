'use client';

import { useEffect, useRef } from 'react';

export default function StagePage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 自動再生（ユーザー操作後に有効）
    audioRef.current?.play().catch(() => {});
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-white flex">
      
      {/* 左：ステージ演出エリア */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-purple-900 to-black">
        
        {/* 仮アイドル */}
        <div
          className="absolute bottom-20 left-1/2 -translate-x-1/2
                     w-32 h-48 bg-pink-400 rounded-xl
                     animate-bounce"
        >
          <p className="text-center mt-2 font-bold">IDOL</p>
        </div>

        {/* ペンライト（仮） */}
        <div className="absolute bottom-0 left-0 w-full h-20 flex justify-center gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-16 bg-green-400 rounded-full animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* 右：操作・情報エリア */}
      <div className="w-96 bg-gray-900 p-6 flex flex-col gap-4">
        <h2 className="text-xl font-bold">Stage Control</h2>

        <button
          onClick={() => audioRef.current?.play()}
          className="bg-blue-500 rounded-lg py-2"
        >
          ▶ 再生
        </button>

        <button
          onClick={() => audioRef.current?.pause()}
          className="bg-red-500 rounded-lg py-2"
        >
          ⏸ 停止
        </button>

        <div className="mt-4">
          <p className="text-sm text-gray-400">Room ID</p>
          <p className="text-lg font-mono">demo-room</p>
        </div>
      </div>

      {/* 音楽 */}
      <audio ref={audioRef} src="/music/demo.mp3" />
    </div>
  );
}
