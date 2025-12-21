'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white gap-6 p-4">
      <h1 className="text-4xl font-extrabold">コール共有アプリ</h1>


      <button
        onClick={() => router.push('/dashboard')}
        className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:scale-105 transition-transform text-white font-bold px-6 py-3 rounded-lg shadow-lg"
      >
        ダッシュボードへ
      </button>
    </div>
  );
}
