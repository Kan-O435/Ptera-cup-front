'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  // 共通の縁取りスタイル
  const textStrokeStyle = {
    textShadow: `
      3px 3px 0 #000,
      -3px 3px 0 #000,
      3px -3px 0 #000,
      -3px -3px 0 #000,
      0 4px 10px rgba(0,0,0,0.8)
    `
  };

  return (
    <div 
      className="w-screen h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: "url('/bg/bg.png')" }}
    >
      {/* 背景オーバーレイ */}
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      {/* タイトルセクション */}
      <div className="text-center z-10 mb-8">
        <h1 
          className="text-8xl font-black italic tracking-tighter text-white mb-4"
          style={textStrokeStyle}
        >
          AI-dol
        </h1>
        <p 
          className="text-4xl font-black italic tracking-tighter text-white mb-2"
          style={textStrokeStyle}
        >
          離れていても、みんなでコールしよう。
        </p>
      </div>

      {/* ボタンエリア */}
      <div className="text-2xl font-black italic tracking-tighter text-white mb-4">
        {/* ログインボタン */}
        <button
          onClick={() => router.push('/auth?mode=login')}
          className="w-full bg-gray-500 text-white font-black py-4 rounded-2xl hover:bg-gray-600 transition-all active:translate-y-1 active:shadow-none"
          style={textStrokeStyle}
        >
          ログイン
        </button>

        {/* サインアップボタン */}
        <button
          onClick={() => router.push('/auth?mode=signup')}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-black py-4 rounded-2xl hover:scale-105 transition-transform shadow-[0_6px_0_rgb(150,0,50)]"
          style={{ ...textStrokeStyle, fontSize: '1.5rem' }}
        >
          新規アカウント作成
        </button>
      </div>
      
      {/* 演出用の光（色を少し強めました） */}
      <div className="absolute -top-10 -left-10 w-80 h-80 bg-purple-600/30 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-pink-600/30 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
}