'use client';

import { useEffect, useRef } from 'react';

const WS_URL =
  'wss://izjcpqec6k.execute-api.ap-southeast-2.amazonaws.com/dev';

export default function ControllerPage() {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('🟢 controller connected');

      ws.send(
        JSON.stringify({
          action: 'joinRoom',
          roomId: 'demo-room',
        })
      );
    };

    ws.onclose = () => {
      console.log('⚪ controller disconnected');
    };

    ws.onerror = (e) => {
      console.error('🔴 ws error', e);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendColor = (color: string) => {
    wsRef.current?.send(
      JSON.stringify({
        action: 'changePenlight',
        color,
      })
    );
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold">ペンライト操作</h1>

      <button
        onClick={() => sendColor('red')}
        className="w-48 py-4 bg-red-500 rounded-xl text-xl font-bold"
      >
        🔴 RED
      </button>

      <button
        onClick={() => sendColor('blue')}
        className="w-48 py-4 bg-blue-500 rounded-xl text-xl font-bold"
      >
        🔵 BLUE
      </button>

      <button
        onClick={() => sendColor('green')}
        className="w-48 py-4 bg-green-500 rounded-xl text-xl font-bold"
      >
        🟢 GREEN
      </button>
    </div>
  );
}
