'use client';

import { useEffect, useState } from 'react';

export default function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // 後で WebSocket に置き換える
    setConnected(true);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      {!connected ? (
        <p>接続中...</p>
      ) : (
        <div>
          <h1>Room: {params.roomId}</h1>
          <p>参加しました</p>
        </div>
      )}
    </div>
  );
}
