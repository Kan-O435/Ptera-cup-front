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
      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
    >
       Roomを作成
    </button>
  );
}
