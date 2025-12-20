'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function JoinRoomPage() {
  const params = useParams();
  const router = useRouter();
  const roomId = params?.roomId;

  const [nickname, setNickname] = useState('');

  if (!roomId) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>Room ID が不正です</p>
      </div>
    );
  }

  const handleJoin = () => {
    if (!nickname) return;

    // 待機ページに遷移
    router.push(`/room/${roomId}/waiting?nickname=${encodeURIComponent(nickname)}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">🎤 Room に参加</h1>

        <p className="mb-4">ニックネームを入力してください</p>
        <input
          type="text"
          placeholder="ニックネーム"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-3 rounded text-black mb-4"
        />

        <button
          onClick={handleJoin}
          disabled={!nickname}
          className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded text-white font-bold disabled:opacity-50"
        >
          参加する
        </button>
      </div>
    </div>
  );
}
