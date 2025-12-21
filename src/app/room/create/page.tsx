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
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="flex h-screen p-8 gap-8 bg-gray-900 text-white">
      {/* 左：楽曲選択 */}
      <div className="flex-1 overflow-y-auto bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">楽曲を選択</h2>
        <SongList selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
      </div>

      {/* 右：ルーム設定 */}
      <div className="w-96 flex flex-col gap-4">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">ルーム設定</h2>
          <RoomSettings
            roomName={roomName}
            setRoomName={setRoomName}
            publicRoom={publicRoom}
            setPublicRoom={setPublicRoom}
          />
          <button
            onClick={handleCreateRoom}
            disabled={!selectedSong || !roomName}
            className={`mt-4 w-full py-3 rounded-lg font-bold text-lg transition-all transform
              ${!selectedSong || !roomName
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 hover:scale-105 hover:shadow-md text-white'}`}
          >
            Room を作成
          </button>
        </div>
      </div>
    </div>
  );
}
