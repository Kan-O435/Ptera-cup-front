'use client';
import { useParams } from 'next/navigation';

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId;

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Room 作成しました！</h1>
        <p>Room ID: {roomId}</p>
        {/* 後で「参加者待機画面」や「ステージページ」に遷移するリンクを追加可能 */}
      </div>
    </div>
  );
}
