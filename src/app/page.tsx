export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* ヘッダー */}
      <header className="p-4 text-2xl font-bold border-b border-gray-700">
      </header>

      {/* メイン */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* 左：演出エリア */}
        <section className="flex-1 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-64 h-64 bg-gray-800 rounded-xl flex items-center justify-center mb-4">
              演出（仮）
            </div>
            <p className="text-gray-400 text-sm">
              ※ 動画入れる
            </p>
          </div>
        </section>

        {/* 右：ルーム操作 */}
        <section className="w-96 bg-gray-800 p-6 flex flex-col gap-6">
          <h2 className="text-xl font-semibold">ルーム</h2>

          {/* ルーム作成 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
              ルーム名
            </label>
            <input
              type="text"
              placeholder="例：寝不足アイドル現場"
              className="px-3 py-2 rounded bg-gray-700 text-white"
            />
            <button className="mt-2 px-4 py-2 bg-pink-500 rounded">
              ルーム作成
            </button>
          </div>

          <hr className="border-gray-600" />

          {/* ルーム参加 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
              ルームID
            </label>
            <input
              type="text"
              placeholder="1234"
              className="px-3 py-2 rounded bg-gray-700 text-white"
            />
            <button className="mt-2 px-4 py-2 bg-blue-500 rounded">
              参加
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
