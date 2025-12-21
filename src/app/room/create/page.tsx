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
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateRoom = () => {
    const roomId = crypto.randomUUID().slice(0, 6);
    router.push(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pinke-900 to-gray-900 text-white p-8">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black items-center justify-center mb-2 text-white">
          ルーム作成
        </h1>
        <p className="text-gray-400">推しの楽曲を選んで、みんなで盛り上がろう！</p>
      </div>

      <div className="flex gap-8 max-w-7xl mx-auto">
        {/* 左：楽曲選択 */}
        <div className="flex-1 bg-gray-800/50 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-gray-700/50">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🎵</span> 楽曲を選択
          </h2>
          
          {/* 検索バー */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="楽曲を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-gray-700/50 rounded-xl border border-gray-600 focus:border-red-500 focus:outline-none transition-colors"
            />
          </div>
          
          <SongList 
            selectedSong={selectedSong} 
            setSelectedSong={setSelectedSong} 
            searchTerm={searchTerm} 
          />
        </div>

        {/* 右：ルーム設定 */}
        <div className="w-96 flex flex-col gap-4">
          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-gray-700/50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
               ルーム設定
            </h2>
            <RoomSettings
              roomName={roomName}
              setRoomName={setRoomName}
              publicRoom={publicRoom}
              setPublicRoom={setPublicRoom}
            />
            <button
              onClick={handleCreateRoom}
              disabled={!selectedSong || !roomName}
              className={`mt-6 w-full py-4 rounded-xl font-bold text-lg transition-all transform shadow-lg
                ${!selectedSong || !roomName
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-pink-600 hover:scale-105 hover:shadow-red-500/25 text-white'}`}
            >
              ルームを作成
            </button>
          </div>
        </div>
      </div>

      {/* 背景装飾 */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
}
