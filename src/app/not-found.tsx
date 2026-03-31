'use client';

import React from 'react';
import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-4 h-full min-h-[80vh]">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-md w-full text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-[#ffcf33] rounded-3xl rotate-6 opacity-20 animate-pulse"></div>
          <div className="absolute inset-0 bg-white rounded-3xl shadow-xl flex items-center justify-center border-2 border-slate-100">
            <FileQuestion className="w-16 h-16 text-[#45370a]" />
          </div>
        </div>
        
        <h1 className="text-6xl font-black text-slate-800 tracking-tighter mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-600 mb-6">页面未找到</h2>
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
          抱歉，您访问的页面不存在或已被移除。也许您想回到主页看看其他工具？
        </p>
        
        <Link 
          href="/"
          className="inline-flex items-center px-8 py-4 bg-[#ffcf33] text-[#45370a] rounded-2xl font-black hover:bg-[#f5c21a] transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> 返回主页
        </Link>
      </div>
    </div>
  );
}
