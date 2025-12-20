'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// ✅ Cloudflare Tunnel の公開URL
const BASE_URL = 'https://salvador-creation-pills-seo.trycloudflare.com';

export default function RoomPage() {
  const params = useParams();
  const router = useRouter();

  const roomId = params?.roomId as string | undefined;

  const [participants, setParticipants] = useState(1);
  const [qrUrl, setQrUrl] = useState('');
  const [joinUrl, setJoinUrl] = useState('');

  useEffect(() => {
    if (!roomId) return;

    setParticipants(Math.floor(Math.random() * 10) + 1);

    const url = `${BASE_URL}/room/${roomId}`;
    setJoinUrl(url);

    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
      url
    )}`;
    setQrUrl(qr);
  }, [roomId]);

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
        <h1 className="text-2xl font-bold mb-4">
          🎉 Room を作成しました！
        </h1>

        <p className="mb-2">
          Room ID：
          <span className="ml-2 font-mono bg-black px-2 py-1 rounded">
            {roomId}
          </span>
        </p>

        <p className="mb-4">参加者数：{participants} 人</p>

        {qrUrl && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <img src={qrUrl} alt="Room QR Code" />
            <p className="text-sm text-gray-300">
              📱 QR を読み取るだけで参加できます
            </p>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4 break-all">
          参加URL：<br />
          {joinUrl}
        </p>
      </div>

      <button
        className="mt-6 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded"
        onClick={() => router.push(`/room/${roomId}/stage`)}
      >
        ステージへ進む
      </button>

    </div>
  );
}
