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
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block mb-1">ルーム名</label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block mb-1">公開設定</label>
        <select
          value={publicRoom ? 'public' : 'private'}
          onChange={(e) => setPublicRoom(e.target.value === 'public')}
          className="w-full p-2 border rounded"
        >
          <option value="public">公開</option>
          <option value="private">非公開</option>
        </select>
      </div>
    </div>
  );
}
