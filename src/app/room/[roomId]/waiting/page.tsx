'use client';

import { useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

export default function WaitingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const roomId = params?.roomId;
  const nickname = searchParams.get('nickname') || '名無し';

  useEffect(() => {
    if (!roomId) return;

    // ここではダミーで 3 秒後にステージ開始をシミュレート
    const timer = setTimeout(() => {
      // ステージ操作ページに自動遷移
      router.push(`/room/${roomId}/stage_control?nickname=${encodeURIComponent(nickname)}`);
    }, 3000);

    return () => clearTimeout(timer);
  }, [roomId, nickname, router]);

  if (!roomId) return <p>Room ID が不正です</p>;

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">少々お待ちください…</h2>
        <p>ステージが始まるまでお待ちください</p>
      </div>
    </div>
  );
}
