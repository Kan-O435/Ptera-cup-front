'use client';

import { useRouter } from 'next/navigation';

export default function CreateRoomButton() {
  const router = useRouter();

  const createRoom = () => {
    const roomId = crypto.randomUUID().slice(0, 6);
    router.push(`/room/${roomId}`);
  };

  return (
    <button
      onClick={createRoom}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Roomを作成
    </button>
  );
}
