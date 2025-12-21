'use client';

import { useParams, useRouter } from 'next/navigation';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId = params?.roomId as string | undefined;
  const participants = 1; // 固定

  if (!roomId) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-lg">Room ID が不正です</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 relative overflow-hidden">
      {/* 背景ぼかし */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/20 rounded-full blur-[120px] -z-10"></div>

      {/* メインカード */}
      <div className="relative w-full max-w-md bg-gray-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center">
        <h1 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          ルーム作成完了！
        </h1>

        <p className="mb-4 text-gray-300">
          ルームID：
          <span className="ml-2 font-mono bg-gray-900 px-3 py-1 rounded-lg text-white">
            {roomId}
          </span>
        </p>

        <p className="mb-6 text-gray-300">
          参加者数：<span className="font-semibold text-white">{participants} 人</span>
        </p>

        <button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95"
          onClick={() => router.push(`/room/${roomId}/stage`)}
        >
          ステージへ進む
        </button>
      </div>
    </div>
  );
}
