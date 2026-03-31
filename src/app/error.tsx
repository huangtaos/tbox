'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4 h-full min-h-[80vh]">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-md w-full text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-red-500 rounded-3xl -rotate-6 opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 bg-white rounded-3xl shadow-xl flex items-center justify-center border-2 border-slate-100">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-6xl font-black text-slate-800 tracking-tighter mb-4">500</h1>
        <h2 className="text-2xl font-bold text-slate-600 mb-6">服务器出错了</h2>
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
          抱歉，我们的服务器遇到了一些问题，无法完成您的请求。请稍后再试或返回主页。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => reset()}
            className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 text-white rounded-2xl font-black hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-5 h-5 mr-2" /> 重试
          </button>
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#ffcf33] text-[#45370a] rounded-2xl font-black hover:bg-[#f5c21a] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> 返回主页
          </Link>
        </div>
      </div>
    </div>
  );
}
