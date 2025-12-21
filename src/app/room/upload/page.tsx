'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setMessage(`"${file.name}" をアップロードしました！`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileName) {
      setMessage(`"${fileName}" の保存に成功しました！`);
    } else {
      setMessage('ファイルを選択してください。');
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">楽曲アップロード</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4 w-full max-w-md"
      >
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="text-gray-200 file:bg-pink-600 file:text-white file:px-4 file:py-2 file:rounded-full file:cursor-pointer"
        />

        {fileName && (
          <p className="text-green-400 mt-2">{`選択されたファイル: ${fileName}`}</p>
        )}

        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-full font-bold mt-4 transition-all"
        >
          アップロード
        </button>

        {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
      </form>

      <button
        className="mt-8 text-pink-500 hover:text-pink-400 underline"
        onClick={() => router.back()}
      >
        戻る
      </button>
    </div>
  );
}
