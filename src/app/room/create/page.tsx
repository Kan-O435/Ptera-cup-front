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

  // 共通の縁取りスタイル
  const textStrokeStyle = {
    textShadow: `
      2px 2px 0 #000,
      -2px 2px 0 #000,
      2px -2px 0 #000,
      -2px -2px 0 #000,
      0 4px 8px rgba(0,0,0,0.8)
    `
  };

  const handleCreateRoom = () => {
    const roomId = crypto.randomUUID().slice(0, 6);
    router.push(`/room/${roomId}`);
  };

  return (
    <div 
      className="min-h-screen flex flex-col p-8 bg-cover bg-center bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: "url('/bg/bg.png')" }}
    >
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* ヘッダー */}
      <div className="text-center mb-10 z-10">
        <h1 
          className="text-6xl font-black tracking-tighter text-white mb-3"
          style={textStrokeStyle}
        >
          ルームを作成
        </h1>
        <p 
          className="text-xl font-bold text-pink-300 tracking-wide"
          style={{ textShadow: '2px 2px 4px #000' }}
        >
          推しの楽曲を選んで、最高のステージを準備しよう！
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto w-full z-10">
        {/* 左：楽曲選択パネル */}
        <div className="flex-1 bg-gray-900/70 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white/10 flex flex-col h-[600px]">
          <h2 
            className="text-3xl font-black text-white mb-6 flex items-center gap-3"
            style={textStrokeStyle}
          >
            <span className="text-4xl"></span> 楽曲を選択
          </h2>
          
          {/* 検索バー */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="楽曲名で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 bg-black/50 rounded-2xl border border-white/20 text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none transition-all"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <SongList 
              selectedSong={selectedSong} 
              setSelectedSong={setSelectedSong} 
              searchTerm={searchTerm} 
            />
          </div>
        </div>

        {/* 右：ルーム設定パネル */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
          <div className="bg-gray-900/70 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white/10">
            <h2 
              className="text-2xl font-black text-white mb-6 flex items-center gap-3"
              style={textStrokeStyle}
            >
              設定
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
              className={`mt-10 w-full py-5 rounded-2xl font-black text-2xl transition-all transform shadow-[0_6px_0_rgb(0,0,0)] active:translate-y-1 active:shadow-none
                ${!selectedSong || !roomName
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50 shadow-none'
                  : 'bg-gradient-to-r from-red-600 to-pink-600 hover:scale-105 text-white'}`}
              style={(!selectedSong || !roomName) ? {} : textStrokeStyle}
            >
              ルームを作成
            </button>
          </div>
          
          {/* 補足：選択中の情報 */}
          {selectedSong && (
            <div className="bg-pink-600/20 backdrop-blur-md p-4 rounded-2xl border border-pink-500/30 animate-pulse">
              <p className="text-center font-bold text-pink-200">READY TO LIVE!</p>
            </div>
          )}
        </div>
      </div>

      {/* 演出用の背景光 */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[150px] -z-10"></div>
    </div>
  );
}