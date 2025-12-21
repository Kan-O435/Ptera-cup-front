'use client';

import { useEffect, useState } from 'react';

type Props = {
  wsUrl: string;
  deviceId: string;
  nickname: string;
};

export default function PenlightControl({ wsUrl, deviceId, nickname }: Props) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [color, setColor] = useState<string>('#ff0000'); // 初期色赤

  // WebSocket 接続
  useEffect(() => {
    const socket = new WebSocket(`${wsUrl}?roomId=1`); // roomId は動的に渡す
    socket.onopen = () => {
      console.log('WS connected');
      socket.send(
        JSON.stringify({
          type: 'join',
          device_id: deviceId,
          nickname,
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received:', data);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [wsUrl, deviceId, nickname]);

  // ペンライト色変更
  const changeColor = (newColor: string) => {
    setColor(newColor);
    ws?.send(
      JSON.stringify({
        type: 'color',
        color: newColor,
      })
    );
  };

  // コール（wave）送信
  const sendCall = () => {
    ws?.send(
      JSON.stringify({
        type: 'call',
      })
    );
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-900 p-4 rounded-lg shadow-lg flex flex-col items-center gap-4">
      <h2 className="text-white font-bold">🎨 ペンライト操作</h2>

      <div className="flex gap-2">
        <button
          className="w-10 h-10 rounded-full bg-red-500"
          onClick={() => changeColor('#ff0000')}
        />
        <button
          className="w-10 h-10 rounded-full bg-green-500"
          onClick={() => changeColor('#00ff00')}
        />
        <button
          className="w-10 h-10 rounded-full bg-blue-500"
          onClick={() => changeColor('#0000ff')}
        />
        <button
          className="w-10 h-10 rounded-full bg-yellow-500"
          onClick={() => changeColor('#ffff00')}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={sendCall}
      >
        📣 コール
      </button>
    </div>
  );
}
