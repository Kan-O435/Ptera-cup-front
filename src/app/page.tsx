export default function Dashboard() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">
        音楽にコールを混ぜるアプリ
      </h1>

      <div className="flex gap-4">
        <a
          href="/audience"
          className="px-6 py-3 bg-pink-500 text-white rounded-xl"
        >
          観客として参加
        </a>

        <a
          href="/stage"
          className="px-6 py-3 bg-blue-500 text-white rounded-xl"
        >
          ステージ表示
        </a>
      </div>
    </main>
  );
}
