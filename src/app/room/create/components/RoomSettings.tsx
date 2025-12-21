'use client';

type RoomSettingsProps = {
  roomName: string;
  setRoomName: (name: string) => void;
  publicRoom: boolean;
  setPublicRoom: (val: boolean) => void;
};

export default function RoomSettings({
  roomName,
  setRoomName,
  publicRoom,
  setPublicRoom,
}: RoomSettingsProps) {
  
  // 共通の縁取りスタイル
  const textStrokeStyle = {
    textShadow: `
      1.5px 1.5px 0 #000,
      -1.5px 1.5px 0 #000,
      1.5px -1.5px 0 #000,
      -1.5px -1.5px 0 #000
    `
  };

  return (
    <div className="flex flex-col gap-6 text-white">
      {/* ルーム名入力 */}
      <div>
        <label 
          className="block mb-2 font-black italic tracking-widest text-sm text-pink-400 uppercase"
          style={textStrokeStyle}
        >
          ルーム名
        </label>
        <input
          type="text"
          placeholder="ルーム名を入力..."
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full p-4 bg-black/50 border border-white/20 rounded-2xl text-white placeholder:text-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all font-bold"
        />
      </div>

      {/* 公開設定 */}
      <div>
        <label 
          className="block mb-2 font-black italic tracking-widest text-sm text-pink-400 uppercase"
          style={textStrokeStyle}
        >
          公開設定
        </label>
        <div className="relative">
          <select
            value={publicRoom ? 'public' : 'private'}
            onChange={(e) => setPublicRoom(e.target.value === 'public')}
            className="w-full p-4 bg-black/50 border border-white/20 rounded-2xl text-white outline-none focus:border-pink-500 appearance-none cursor-pointer font-bold transition-all"
          >
            <option value="public" className="bg-gray-900 text-white">🔓 公開ルーム </option>
            <option value="private" className="bg-gray-900 text-white">🔒 非公開ルーム </option>
          </select>
          {/* カスタム矢印アイコン */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-pink-500 font-bold">
            ▼
          </div>
        </div>
      </div>
    </div>
  );
}