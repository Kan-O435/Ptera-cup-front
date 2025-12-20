"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // ログインとサインアップの切り替え
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3001/auth/sign_in' : 'http://localhost:3001/auth';
    
    try {
      const payload = isLogin 
        ? { email, password } 
        : { name, email, password, password_confirmation: password };

      const response = await axios.post(url, payload);

      if (isLogin) {
        // ログイン成功時：トークンをLocalStorageに保存（これが大事！）
        const headers = response.headers;
        localStorage.setItem('access-token', headers['access-token']);
        localStorage.setItem('client', headers['client']);
        localStorage.setItem('uid', headers['uid']);
        
        alert('ログイン成功！');
        router.push('/dashboard'); // ダッシュボードへ移動
      } else {
        alert('仮登録完了！メールを確認してください。');
      }
    } catch (error: any) {
      const errorMsgs = error.response?.data?.errors?.full_messages || [error.message];
      alert('エラー: ' + errorMsgs.join(', '));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl w-96 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-pink-500">
          {isLogin ? 'Welcome Back!' : 'Join the Live!'}
        </h1>
        
        {!isLogin && (
          <input
            type="text" placeholder="名前" value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-pink-500 outline-none"
          />
        )}

        <input
          type="email" placeholder="メールアドレス" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-pink-500 outline-none"
        />

        <input
          type="password" placeholder="パスワード" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-pink-500 outline-none"
        />

        <button type="submit" className="bg-pink-600 hover:bg-pink-500 py-2 rounded font-bold transition">
          {isLogin ? 'ログイン' : '新規登録'}
        </button>

        <p 
          className="text-sm text-gray-400 text-center cursor-pointer hover:text-white"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'アカウントを持っていない方はこちら' : '登録済みの方はこちら'}
        </p>
      </form>
    </div>
  );
}