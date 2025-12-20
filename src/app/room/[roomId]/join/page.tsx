'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function JoinRoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  const [status, setStatus] = useState('connecting');

  useEffect(() => {
    if (!roomId) return;

    // ⭐️ API Gateway の WebSocket URL
    const ws = new WebSocket(
      `wss://izjcpqec6k.execute-api.ap-southeast-2.amazonaws.com/dev?roomId=${roomId}`
    );

    ws.onopen = () => {
      console.log('WS connected');

      ws.send(
        JSON.stringify({
          action: 'join',
          roomId,
        })
      );

      setStatus('joined');
    };

    ws.onerror = (e) => {
      console.error(e);
      setStatus('error');
    };

    return () => {
      ws.close();
    };
  }, [roomId]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      {status === 'connecting' && <p>接続中...</p>}
      {status === 'joined' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">参加しました！</h1>
          <p className="text-gray-400">Room ID: {roomId}</p>
        </div>
      )}
      {status === 'error' && <p>接続エラー</p>}
    </div>
  );
}
