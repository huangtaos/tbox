import React from 'react';
import { Hammer, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ComingSoon({ toolName }: { toolName?: string }) {
  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-slate-100 text-center">
        <div className="w-24 h-24 bg-slate-50 text-slate-400 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
          <Hammer className="w-12 h-12" />
        </div>
        
        <h2 className="text-3xl font-black text-slate-800 mb-4">
          {toolName ? `「${toolName}」` : ''}功能开发中
        </h2>
        
        <p className="text-slate-500 font-bold mb-8 max-w-md mx-auto leading-relaxed">
          我们正在努力打造这个功能，敬请期待！您可以先体验其他已上线的工具。
        </p>

        <Link 
          href="/"
          className="inline-flex items-center px-8 py-3 bg-[#ffcf33] text-[#45370a] rounded-2xl font-black hover:bg-[#f5c21a] transition-colors shadow-lg shadow-[#ffcf33]/20"
        >
          探索其他工具
        </Link>
      </div>
    </div>
  );
}
