// components/PenlightRoom.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

type PenlightColor = 'red' | 'green' | 'blue' | 'yellow' | 'off';

interface Penlight {
  id: string;
  color: PenlightColor;
  full: boolean;
}

interface Props {
  wsUrl: string;
  roomId: string;
  deviceId: string;
  nickname: string;
}

export default function PenlightRoom({ wsUrl, roomId, deviceId, nickname }: Props) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [penlights, setPenlights] = useState<Penlight[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket(`${wsUrl}?roomId=${roomId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connected');
      setConnected(true);
      ws.send(JSON.stringify({
        type: 'join',
        device_id: deviceId,
        nickname
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // 受信例: { type: 'update', penlights: [{id, color, full}] }
        if (data.type === 'update' && Array.isArray(data.penlights)) {
          setPenlights(data.penlights);
        }
      } catch (e) {
        console.error('Invalid WS message', e);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setConnected(false);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error', err);
    };

    return () => {
      ws.close();
    };
  }, [roomId, deviceId, nickname, wsUrl]);

  const sendUpdate = (color: PenlightColor, full: boolean, call?: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    wsRef.current.send(JSON.stringify({
      type: 'penlight_update',
      device_id: deviceId,
      color,
      full,
      call
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Penlight Room {roomId}</h2>
      <div className="mb-4">
        <span>Status: </span>
        <span className={connected ? 'text-green-600' : 'text-red-600'}>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      <div className="mb-4 flex gap-2">
        {(['red', 'green', 'blue', 'yellow', 'off'] as PenlightColor[]).map((c) => (
          <button
            key={c}
            className={`px-3 py-1 rounded text-white ${c !== 'off' ? `bg-${c}-500` : 'bg-gray-500'}`}
            onClick={() => sendUpdate(c, false)}
          >
            {c.toUpperCase()}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded bg-purple-600 text-white"
          onClick={() => sendUpdate('off', true)}
        >
          FULL
        </button>
        <button
          className="px-3 py-1 rounded bg-orange-500 text-white"
          onClick={() => sendUpdate('off', false, 'call')}
        >
          CALL
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {penlights.map((p) => (
          <div
            key={p.id}
            className={`w-8 h-16 rounded ${p.color !== 'off' ? `bg-${p.color}-500` : 'bg-gray-300'}`}
            style={{ opacity: p.full ? 1 : 0.5 }}
            title={p.id}
          />
        ))}
      </div>
    </div>
  );
}
