"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // 共通の縁取りスタイル
  const textStrokeStyle = {
    textShadow: `
      2px 2px 0 #000,
      -2px 2px 0 #000,
      2px -2px 0 #000,
      -2px -2px 0 #000
    `
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3001/auth/sign_in' : 'http://localhost:3001/auth';
    
    try {
      const payload = isLogin 
        ? { email, password } 
        : { name, email, password, password_confirmation: password };

      const response = await axios.post(url, payload);

      if (isLogin) {
        const headers = response.headers;
        localStorage.setItem('access-token', headers['access-token']);
        localStorage.setItem('client', headers['client']);
        localStorage.setItem('uid', headers['uid']);
        
        alert('ログイン成功！');
        router.push('/dashboard');
      } else {
        alert('仮登録完了！メールを確認してください。');
      }
    } catch (error: any) {
      const errorMsgs = error.response?.data?.errors?.full_messages || [error.message];
      alert('エラー: ' + errorMsgs.join(', '));
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg/bg.png')" }}
    >
      {/* 背景を少し暗くするオーバーレイ */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-sm flex flex-col gap-5 border border-white/10"
      >
        <h1 
          className="text-4xl font-black text-center text-white italic tracking-wider mb-2"
          style={textStrokeStyle}
        >
          {isLogin ? 'LOGIN' : 'SIGN UP'}
        </h1>
        
        {!isLogin && (
          <input
            type="text" placeholder="名前" value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded-xl bg-black/50 text-white border border-gray-600 focus:border-pink-500 outline-none transition-all placeholder:text-gray-500"
          />
        )}

        <input
          type="email" placeholder="メールアドレス" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 rounded-xl bg-black/50 text-white border border-gray-600 focus:border-pink-500 outline-none transition-all placeholder:text-gray-500"
        />

        <input
          type="password" placeholder="パスワード" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 rounded-xl bg-black/50 text-white border border-gray-600 focus:border-pink-500 outline-none transition-all placeholder:text-gray-500"
        />

        <button 
          type="submit" 
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:scale-105 active:scale-95 text-white font-black py-4 rounded-2xl shadow-lg transition-all text-xl mt-2"
          style={textStrokeStyle}
        >
          {isLogin ? 'ログイン' : '登録する'}
        </button>

        <p 
          className="text-sm text-gray-300 text-center cursor-pointer hover:text-white font-bold"
          onClick={() => setIsLogin(!isLogin)}
          style={{ textShadow: '1px 1px 2px #000' }}
        >
          {isLogin ? '▶ アカウントを持っていない方はこちら' : '▶ 登録済みの方はこちら'}
        </p>
      </form>
    </div>
  );
}