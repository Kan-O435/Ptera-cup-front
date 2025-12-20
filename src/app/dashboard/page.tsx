import CreateRoomButton from '@/src/app/components/CreateRoomButton';

export default function DashboardPage() {
  return (
    <div className="h-screen flex">
      {/* 左側 */}
      <div className="flex-1 p-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>

      {/* 右側 */}
      <div className="w-64 p-6 border-l flex items-start justify-center">
        <CreateRoomButton />
      </div>
    </div>
  );
}
