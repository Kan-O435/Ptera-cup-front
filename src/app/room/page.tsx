'use client';

import { useRouter } from 'next/navigation';

export default function RoomIndexPage() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
      <h2 className="text-xl">Roomが指定されていません</h2>

      <button
        onClick={() => router.push('/dashboard')}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Dashboardへ戻る
      </button>
    </div>
  );
}
