'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-black text-white gap-6">
      <h1 className="text-3xl font-bold">🎤 Music Calling App</h1>

      <button
        onClick={() => router.push('/dashboard')}
        className="bg-blue-500 px-6 py-3 rounded-lg text-lg"
      >
        Dashboardへ
      </button>
    </div>
  );
}
