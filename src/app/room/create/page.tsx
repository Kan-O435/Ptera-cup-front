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
    <div className="flex h-screen p-8 gap-8 bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-200">
      {/* 左：楽曲選択 */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-indigo-400 to-purple-500 p-6 rounded-2xl shadow-2xl text-white animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-6 drop-shadow-lg">楽曲を選択</h2>
        <SongList selectedSong={selectedSong} setSelectedSong={setSelectedSong} />
      </div>

      {/* 右：ルーム設定 */}
      <div className="w-96 flex flex-col gap-6">
        <div className="bg-gradient-to-br from-pink-400 to-red-500 p-6 rounded-2xl shadow-2xl text-white animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 drop-shadow-md">ルーム設定</h2>
          <RoomSettings
            roomName={roomName}
            setRoomName={setRoomName}
            publicRoom={publicRoom}
            setPublicRoom={setPublicRoom}
          />
          <button
            onClick={handleCreateRoom}
            className={`mt-4 py-3 rounded-xl font-bold text-lg transition-all transform 
              ${!selectedSong || !roomName
                ? 'bg-gray-400 cursor-not-allowed text-gray-200'
                : 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:scale-105 hover:shadow-lg active:scale-95 text-white shadow-md'}`}
            disabled={!selectedSong || !roomName}
          >
            Room を作成
          </button>
        </div>
      </div>
    </div>
  );
}
