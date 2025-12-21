'use client';

import { useParams, useRouter } from 'next/navigation';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId = params?.roomId as string | undefined;
  const participants = 1; // 固定

  // 共通の縁取りスタイル
  const textStrokeStyle = {
    textShadow: `
      3px 3px 0 #000,
      -3px 3px 0 #000,
      3px -3px 0 #000,
      -3px -3px 0 #000,
      0 4px 10px rgba(0,0,0,0.8)
    `
  };

  if (!roomId) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Room ID が不正です</p>
      </div>
    );
  }

  return (
    <div 
      className="h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/bg/bg.png')" }}
    >
      {/* 背景オーバーレイ（ライブ前の高揚感を出すために少し暗めに） */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* メインカード：半透明にして背景を透かす */}
      <div className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-md p-10 rounded-[40px] shadow-2xl flex flex-col items-center text-center border-2 border-white/20">
        
        <h1 
          className="text-4xl font-black italic tracking-tighter text-white mb-8"
          style={textStrokeStyle}
        >
          ルームを作成しました！
        </h1>

        <div className="space-y-6 mb-10 w-full">
          {/* ルームID表示エリア */}
          <div className="flex flex-col gap-2">
            <span className="text-pink-400 font-black text-sm tracking-widest uppercase">Room ID</span>
            <div 
              className="bg-black/60 border border-pink-500/50 rounded-2xl py-4 px-6 text-2xl font-mono font-bold text-white tracking-widest shadow-inner"
              style={{ textShadow: '0 0 10px rgba(255, 0, 255, 0.5)' }}
            >
              {roomId}
            </div>
          </div>

          {/* 参加者数表示エリア */}
          <div className="flex justify-between items-center bg-white/5 rounded-2xl px-6 py-4 border border-white/5">
            <span className="font-bold text-gray-300">参加予定人数</span>
            <span className="text-2xl font-black text-white" style={textStrokeStyle}>
              {participants} <span className="text-sm">人</span>
            </span>
          </div>
        </div>

        {/* 進むボタン：さらに立体的に */}
        <button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 active:scale-95 text-white font-black py-5 rounded-2xl shadow-[0_8px_0_rgb(130,0,80)] transition-all text-2xl"
          style={textStrokeStyle}
          onClick={() => router.push(`/room/${roomId}/stage`)}
        >
          ステージへ進む
        </button>

        <p className="mt-6 text-gray-400 text-xs font-bold tracking-widest uppercase opacity-60">
          Prepare for the Live Show
        </p>
      </div>

      {/* 演出用の光 */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-600/30 rounded-full blur-[150px] -z-10"></div>
    </div>
  );
}