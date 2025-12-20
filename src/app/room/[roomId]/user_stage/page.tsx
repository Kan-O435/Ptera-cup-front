'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const WS_URL = 'wss://your-websocket-server.example.com'; // 後で実際のURLに置き換え

export default function UserStagePage() {
  const { roomId } = useParams() as { roomId: string };
  const [name, setName] = useState('');
  const [penlightColor, setPenlightColor] = useState<string | null>(null);
  const [call, setCall] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // 名前を取得
  useEffect(() => {
    const storedName = localStorage.getItem(`room-${roomId}-name`);
    if (!storedName) return;
    setName(storedName);
  }, [roomId]);

  // WebSocket 接続
  useEffect(() => {
    if (!name) return;

    const socket = new WebSocket(`${WS_URL}?roomId=${roomId}&name=${name}`);
    setWs(socket);

    socket.onopen = () => console.log('WebSocket connected');
    socket.onmessage = (msg) => console.log('Received:', msg.data);

    return () => socket.close();
  }, [roomId, name]);

  // ペンライト変更
  const handlePenlight = (color: string) => {
    setPenlightColor(color);
    ws?.send(JSON.stringify({ type: 'penlight', color }));
  };

  // コール変更
  const handleCall = (c: string) => {
    setCall(c);
    ws?.send(JSON.stringify({ type: 'call', call: c }));
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 gap-6">
      <h1 className="text-2xl font-bold mb-4">🎶 スマホ参加者ステージ</h1>
      <p className="text-gray-300 mb-4">参加者名：{name}</p>

      {/* コール選択 */}
      <div className="flex gap-4">
        {['コールA', 'コールB', 'コールC'].map((c) => (
          <button
            key={c}
            onClick={() => handleCall(c)}
            className={`px-4 py-2 rounded ${
              call === c ? 'bg-green-500' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ペンライト選択 */}
      <div className="flex gap-4 mt-4">
        {['赤', '青', '緑'].map((color) => (
          <button
            key={color}
            onClick={() => handlePenlight(color)}
            className={`px-6 py-2 rounded ${
              penlightColor === color ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {color}
          </button>
        ))}
      </div>

      <p className="text-gray-400 mt-4">
        選択中：ペンライト {penlightColor || '-'} / コール {call || '-'}
      </p>
    </div>
  );
}
