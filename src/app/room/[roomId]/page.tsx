'use client';

import { useParams, useRouter } from 'next/navigation';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId = params?.roomId as string | undefined;
  const participants = 1; // 固定

  if (!roomId) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>Room ID が不正です</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="relative w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">🎉 Room を作成しました！</h1>

        <p className="mb-4">
          Room ID：
          <span className="ml-2 font-mono bg-black px-2 py-1 rounded">
            {roomId}
          </span>
        </p>

        <p className="mb-4">参加者数：{participants} 人</p>
      </div>

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded shadow-md transition-all active:scale-95"
        onClick={() => router.push(`/room/${roomId}/stage`)}
      >
        ステージへ進む
      </button>
    </div>
  );
}
