'use client';

import CreateRoomButton from '@/src/app/components/CreateRoomButton';

export default function DashboardPage() {
  return (
    <div className="w-screen h-screen flex bg-black text-white">
      
      {/* 左：ステージ（今は仮） */}
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-400">Stage Preview</p>
      </div>

      {/* 右：操作パネル */}
      <div className="w-96 bg-gray-900 p-6 flex flex-col gap-6">
        <h2 className="text-xl font-bold">Dashboard</h2>

        <CreateRoomButton />
      </div>

    </div>
  );
}
