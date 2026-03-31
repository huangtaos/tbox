'use client';

import React, { useState } from 'react';
import { Braces, ArrowLeft, Copy, Trash2, Check, AlertCircle, AlignLeft, Shrink } from 'lucide-react';

import Link from 'next/link';

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [jsonError, setJsonError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleFormatJson = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (err: any) {
      setJsonError(`无效的 JSON: ${err.message}`);
    }
  };

  const handleMinifyJson = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed));
      setJsonError('');
    } catch (err: any) {
      setJsonError(`无效的 JSON: ${err.message}`);
    }
  };

  const handleCopyJson = () => {
    if (!jsonOutput) return;
    navigator.clipboard.writeText(jsonOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClearJson = () => {
    setJsonInput('');
    setJsonOutput('');
    setJsonError('');
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="flex items-center space-x-4 mb-10">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <Braces className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">JSON 格式化</h2>
            <p className="text-slate-400 font-bold">校验、格式化、压缩 JSON 数据</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-black text-slate-500 uppercase tracking-widest">输入 JSON</label>
              <button 
                onClick={handleClearJson}
                className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" /> 清空
              </button>
            </div>
            <textarea 
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='在此粘贴你的 JSON 代码...'
              className="flex-1 min-h-[400px] bg-slate-50 border-2 border-slate-50 rounded-3xl p-6 font-mono text-sm outline-none focus:border-blue-500 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-black text-slate-500 uppercase tracking-widest">输出结果</label>
              <button 
                onClick={handleCopyJson}
                disabled={!jsonOutput}
                className={`text-xs font-bold flex items-center transition-all cursor-pointer ${isCopied ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500 disabled:opacity-30'}`}
              >
                {isCopied ? <Check className="w-3.5 h-3.5 mr-1" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                {isCopied ? '已复制' : '复制结果'}
              </button>
            </div>
            <div className="flex-1 min-h-[400px] bg-slate-900 rounded-3xl p-6 font-mono text-sm text-blue-400 overflow-auto relative group">
              {jsonError ? (
                <div className="flex items-start text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                  <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
                  <span className="font-bold">{jsonError}</span>
                </div>
              ) : jsonOutput ? (
                <pre className="whitespace-pre-wrap">{jsonOutput}</pre>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-600">
                  <Braces className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-bold">等待输入...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-10">
          <button 
            onClick={handleFormatJson}
            className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-black flex items-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 cursor-pointer"
          >
            <AlignLeft className="w-5 h-5 mr-2" /> 格式化 (Beautify)
          </button>
          <button 
            onClick={handleMinifyJson}
            className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-black flex items-center hover:bg-slate-900 transition-all shadow-lg shadow-slate-200 cursor-pointer"
          >
            <Shrink className="w-5 h-5 mr-2" /> 压缩 (Minify)
          </button>
        </div>
      </div>
    </div>
  );
}
