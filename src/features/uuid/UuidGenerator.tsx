'use client';

import React, { useState } from 'react';
import { Fingerprint, RefreshCw, Copy, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UuidGenerator() {
  const [uuid, setUuid] = useState(crypto.randomUUID());
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setUuid(crypto.randomUUID());
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer w-fit"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <Fingerprint className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">UUID 生成器</h2>
            <p className="text-slate-400 font-bold">快速生成随机 UUID (v4)</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <div className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-mono text-xl text-center text-slate-800 break-all">
              {uuid}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={generate}
              className="flex-1 py-4 bg-blue-500 text-white rounded-2xl font-black hover:bg-blue-600 transition-colors flex items-center justify-center cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 mr-2" /> 重新生成
            </button>
            <button
              onClick={copyToClipboard}
              className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-black hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer"
            >
              {copied ? <Check className="w-5 h-5 mr-2 text-green-400" /> : <Copy className="w-5 h-5 mr-2" />}
              {copied ? '已复制' : '复制 UUID'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
