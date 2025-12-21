'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white gap-8 p-4">
      {/* タイトルセクション */}
      <div className="text-center">
        <h1 className="text-5xl font-black italic tracking-tighter bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
          CALL SHARE APP
        </h1>
        <p className="text-gray-400 font-medium">推しのコールを、みんなで共有しよう。</p>
      </div>

      {/* ボタンエリア */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {/* ログインボタン */}
        <button
          onClick={() => router.push('/auth?mode=login')}
          className="w-full bg-white text-gray-900 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all shadow-xl"
        >
          ログイン
        </button>

        {/* サインアップボタン */}
        <button
          onClick={() => router.push('/auth?mode=signup')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-pink-500/20"
        >
          新規アカウント作成
        </button>

        

        
      </div>
      
      {/* 演出用の背景ぼかし装飾 */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/20 rounded-full blur-[100px] -z-10"></div>
    </div>
  );
}