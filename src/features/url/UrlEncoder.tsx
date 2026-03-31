'use client';

import React, { useState } from 'react';
import { Link as LinkIcon, Copy, Check, ArrowLeft, RefreshCw, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch (e) {
      setOutput('解析错误：无效的 URL 编码');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer w-fit"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-14 h-14 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center">
            <LinkIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">URL 编解码</h2>
            <p className="text-slate-400 font-bold">对 URL 字符串进行安全编码与解码</p>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-8">
          <button 
            onClick={() => { setMode('encode'); setOutput(''); }}
            className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all cursor-pointer ${mode === 'encode' ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
          >
            URL 编码
          </button>
          <button 
            onClick={() => { setMode('decode'); setOutput(''); }}
            className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all cursor-pointer ${mode === 'decode' ? 'bg-sky-500 text-white shadow-lg shadow-sky-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
          >
            URL 解码
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">输入内容</label>
              <button 
                onClick={() => { setInput(''); setOutput(''); }}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> 清空
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? "输入需要编码的 URL..." : "输入需要解码的 URL..."}
              className="w-full h-64 p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-sky-300 focus:ring-4 focus:ring-sky-50 transition-all resize-none font-mono text-sm text-slate-700"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">处理结果</label>
              <button 
                onClick={handleCopy}
                disabled={!output}
                className={`text-xs font-bold transition-colors flex items-center ${
                  !output ? 'text-slate-300 cursor-not-allowed' : 
                  copied ? 'text-emerald-500' : 'text-sky-500 hover:text-sky-600 cursor-pointer'
                }`}
              >
                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                {copied ? '已复制' : '复制结果'}
              </button>
            </div>
            <div className="w-full h-64 p-6 bg-slate-800 border-2 border-slate-800 rounded-2xl overflow-auto relative group">
              {output ? (
                <div className="font-mono text-emerald-400 break-all whitespace-pre-wrap">{output}</div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-600 font-mono text-sm">
                  等待处理...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleProcess}
            disabled={!input}
            className={`px-10 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center shadow-lg ${
              !input ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-sky-500 text-white hover:bg-sky-600 hover:shadow-xl cursor-pointer'
            }`}
          >
            <ArrowRightLeft className="w-5 h-5 mr-3" /> 
            {mode === 'encode' ? '开始编码' : '开始解码'}
          </button>
        </div>
      </div>
    </div>
  );
}
