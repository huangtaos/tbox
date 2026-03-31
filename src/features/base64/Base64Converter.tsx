'use client';

import React, { useState } from 'react';
import { Binary, ArrowLeft, Copy, Check, ArrowRightLeft, Trash2 } from 'lucide-react';

import Link from 'next/link';

export default function Base64Converter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  const handleEncode = () => {
    if (!inputText) return;
    try {
      setOutputText(btoa(unescape(encodeURIComponent(inputText))));
      setError('');
    } catch (err) {
      setError('编码失败');
    }
  };

  const handleDecode = () => {
    if (!inputText) return;
    try {
      setOutputText(decodeURIComponent(escape(atob(inputText))));
      setError('');
    } catch (err) {
      setError('解码失败: 请确保输入的是有效的 Base64 字符串');
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError('');
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="flex items-center space-x-4 mb-10">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <Binary className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">Base64 编解码</h2>
            <p className="text-slate-400 font-bold">文本与 Base64 格式互转</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-black text-slate-500 uppercase tracking-widest ml-2">输入内容</label>
              <button 
                onClick={handleClear}
                className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" /> 清空
              </button>
            </div>
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="在此输入文本或 Base64 字符串..."
              className="w-full min-h-[160px] bg-slate-50 border-2 border-slate-50 rounded-3xl p-6 font-mono text-sm outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={handleEncode}
              className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-black flex items-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 cursor-pointer"
            >
              <ArrowRightLeft className="w-5 h-5 mr-2" /> 文本 ➔ Base64
            </button>
            <button 
              onClick={handleDecode}
              className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-black flex items-center hover:bg-slate-900 transition-all shadow-lg shadow-slate-200 cursor-pointer"
            >
              <ArrowRightLeft className="w-5 h-5 mr-2" /> Base64 ➔ 文本
            </button>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-black text-slate-500 uppercase tracking-widest ml-2">输出结果</label>
              <button 
                onClick={handleCopy}
                disabled={!outputText}
                className={`text-xs font-bold flex items-center transition-all cursor-pointer ${isCopied ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500 disabled:opacity-30'}`}
              >
                {isCopied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {isCopied ? '已复制' : '复制结果'}
              </button>
            </div>
            <div className="w-full min-h-[160px] bg-slate-900 rounded-3xl p-6 font-mono text-sm text-blue-400 overflow-auto relative">
              {error ? (
                <div className="text-red-400 font-bold">{error}</div>
              ) : outputText ? (
                <pre className="whitespace-pre-wrap">{outputText}</pre>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-700 font-bold">等待转换...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
