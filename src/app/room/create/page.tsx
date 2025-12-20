'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RoomSettings from './components/RoomSettings';
import SongList from './components/SongList';

export default function CreateRoomPage() {
  const router = useRouter();
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [roomName, setRoomName] = useState('');
  const [publicRoom, setPublicRoom] = useState(true);

  const handleCreateRoom = () => {
    const roomId = crypto.randomUUID().slice(0, 6);
    // ここで AWS API などに作成情報送信することも可能
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="flex h-screen p-8 gap-8">
      {/* 左：楽曲選択 */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">楽曲を選択</h2>
        <SongList selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
      </div>

      {/* 右：ルーム設定 */}
      <div className="w-96 flex flex-col gap-4">
        <RoomSettings
          roomName={roomName}
          setRoomName={setRoomName}
          publicRoom={publicRoom}
          setPublicRoom={setPublicRoom}
        />
        <button
          onClick={handleCreateRoom}
          className="bg-blue-500 text-white py-2 rounded"
          disabled={!selectedSong || !roomName}
        >
          Room を作成
        </button>
      </div>
    </div>
  );
}
