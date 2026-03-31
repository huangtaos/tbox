'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Copy, Check, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import CryptoJS from 'crypto-js';

export default function Md5Hash() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (input) {
      setOutput(CryptoJS.MD5(input).toString());
    } else {
      setOutput('');
    }
  }, [input]);

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
          <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">MD5 哈希</h2>
            <p className="text-slate-400 font-bold">快速生成字符串的 MD5 加密值</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">输入文本</label>
              <button 
                onClick={() => setInput('')}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors flex items-center"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> 清空
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="在此输入需要计算 MD5 的文本..."
              className="w-full h-64 p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all resize-none font-mono text-sm text-slate-700"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">MD5 结果 (32位小写)</label>
              <button 
                onClick={handleCopy}
                disabled={!output}
                className={`text-xs font-bold transition-colors flex items-center ${
                  !output ? 'text-slate-300 cursor-not-allowed' : 
                  copied ? 'text-emerald-500' : 'text-indigo-500 hover:text-indigo-600 cursor-pointer'
                }`}
              >
                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                {copied ? '已复制' : '复制结果'}
              </button>
            </div>
            <div className="w-full h-64 p-6 bg-slate-800 border-2 border-slate-800 rounded-2xl overflow-auto relative group">
              {output ? (
                <div className="space-y-6">
                  <div>
                    <div className="text-xs text-slate-400 mb-1 font-bold">32位小写</div>
                    <div className="font-mono text-emerald-400 break-all">{output}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 font-bold">32位大写</div>
                    <div className="font-mono text-emerald-400 break-all">{output.toUpperCase()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 font-bold">16位小写</div>
                    <div className="font-mono text-emerald-400 break-all">{output.substring(8, 24)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 mb-1 font-bold">16位大写</div>
                    <div className="font-mono text-emerald-400 break-all">{output.substring(8, 24).toUpperCase()}</div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-600 font-mono text-sm">
                  等待输入...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
