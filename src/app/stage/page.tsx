'use client';

import { useEffect, useRef } from 'react';
import Stage from './Stage';
import Idol from './Idol';
import Audience from './Audience';
import Penlights from './Penlights';

export default function StagePage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 音楽再生
    audioRef.current?.play().catch(() => {});

    // WebSocket 接続
    const ws = new WebSocket(
      'wss://izjcpqec6k.execute-api.ap-southeast-2.amazonaws.com/dev'
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('🟢 connected');

      ws.send(
        JSON.stringify({
          action: 'joinRoom',
          roomId: 'demo-room',
        })
      );
    };

    ws.onmessage = (event) => {
      console.log('📩 message', event.data);
    };

    ws.onerror = (e) => {
      console.error('🔴 ws error', e);
    };

    ws.onclose = () => {
      console.log('⚪ closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-black text-white">
      <Stage>
        <Idol />
        <Audience />
        <Penlights />
      </Stage>

      <audio ref={audioRef} src="/music/demo.mp3" loop />
    </div>
  );
}
