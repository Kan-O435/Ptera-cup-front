'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

export default function StageControlPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const roomId = params?.roomId;
  const nickname = searchParams.get('nickname') || '名無し';

  const [color, setColor] = useState<'red' | 'blue' | 'green' | null>(null);
  const [call, setCall] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket(`wss://your-websocket-server.example.com?roomId=${roomId}`);
    socket.onopen = () => {
      console.log('WebSocket connected');
      // 初期参加メッセージ
      socket.send(JSON.stringify({ type: 'join', nickname }));
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received', data);
      // 他の参加者の情報受信などに利用
    };
    setWs(socket);

    return () => {
      socket.close();
    };
  }, [roomId, nickname]);

  const handleColorChange = (c: 'red' | 'blue' | 'green') => {
    setColor(c);
    ws?.send(JSON.stringify({ type: 'penlight', color: c, nickname }));
  };

  const handleCall = (v: string) => {
    setCall(v);
    ws?.send(JSON.stringify({ type: 'call', call: v, nickname }));
  };

  if (!roomId) return <p>Room ID が不正です</p>;

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-900 text-white p-4">
      {/* 上部：コール選択 */}
      <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-lg text-center mb-4">
        <h2 className="text-2xl font-bold mb-4">コールを選択</h2>
        <div className="flex justify-center gap-4">
          {['がんばれ！', 'ファイト！', '最高！'].map((v) => (
            <button
              key={v}
              onClick={() => handleCall(v)}
              className={`px-4 py-2 rounded font-bold ${
                call === v ? 'bg-white text-black' : 'bg-blue-500'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* 下部：ペンライト色選択 */}
      <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">ペンライトの色を選択</h2>
        <div className="flex justify-center gap-4">
          {['red', 'blue', 'green'].map((c) => (
            <button
              key={c}
              onClick={() => handleColorChange(c as 'red' | 'blue' | 'green')}
              className={`px-4 py-2 rounded font-bold ${
                color === c ? 'bg-white text-black' : `bg-${c}-500`
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
