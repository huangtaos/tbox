'use client';

import React, { useState } from 'react';
import { FileType, ArrowLeft, Copy, Trash2, Check } from 'lucide-react';
import Link from 'next/link';

export default function WordCount() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = {
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text === '' ? 0 : text.split(/\r\n|\r|\n/).length,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim() !== '').length : 0,
    chineseChars: (text.match(/[\u4e00-\u9fa5]/g) || []).length,
    englishWords: (text.match(/[a-zA-Z]+/g) || []).length,
    numbers: (text.match(/\d+/g) || []).length,
    punctuations: (text.match(/[.,\/#!$%\^&\*;:{}=\-_`~()""''[\]]/g) || []).length,
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer w-fit"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
            <FileType className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">字数统计</h2>
            <p className="text-slate-400 font-bold">实时统计文本的字符数、单词数、行数等信息</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">输入文本</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={handleCopy}
                  className="flex items-center px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? '已复制' : '复制'}
                </button>
                <button 
                  onClick={handleClear}
                  className="flex items-center px-4 py-2 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  清空
                </button>
              </div>
            </div>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="在此输入或粘贴文本..."
              className="w-full h-[400px] p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-mono text-sm text-slate-700 outline-none focus:border-emerald-500 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-800">统计结果</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 mb-1">总字符数</div>
                <div className="text-2xl font-black text-slate-800">{stats.chars}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 mb-1">字符数(不含空格)</div>
                <div className="text-2xl font-black text-slate-800">{stats.charsNoSpaces}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 mb-1">单词数</div>
                <div className="text-2xl font-black text-slate-800">{stats.words}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 mb-1">行数</div>
                <div className="text-2xl font-black text-slate-800">{stats.lines}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 mb-1">段落数</div>
                <div className="text-2xl font-black text-slate-800">{stats.paragraphs}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 mb-1">中文字符</div>
                <div className="text-2xl font-black text-slate-800">{stats.chineseChars}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 mb-1">英文字符</div>
                <div className="text-2xl font-black text-slate-800">{stats.englishWords}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="text-sm font-bold text-slate-400 mb-1">数字</div>
                <div className="text-2xl font-black text-slate-800">{stats.numbers}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
