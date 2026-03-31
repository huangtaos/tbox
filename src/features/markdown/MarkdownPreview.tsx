'use client';

import React, { useState } from 'react';
import { FileCode, ArrowLeft, Copy, Trash2, Check, Download } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState('# 欢迎使用 Markdown 预览\n\n在这里输入 Markdown 文本，右侧会实时显示渲染效果。\n\n## 功能特点\n- **实时预览**：所见即所得\n- *支持标准语法*：加粗、斜体、列表等\n- [链接支持](https://example.com)\n\n### 代码块\n```javascript\nconsole.log("Hello World");\n```\n\n> 这是一段引用文本。');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!markdown) return;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setMarkdown('');
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `markdown-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer w-fit"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
            <FileCode className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">Markdown 预览</h2>
            <p className="text-slate-400 font-bold">实时编辑和预览 Markdown 文本</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          <div className="flex flex-col space-y-4 h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800">编辑区</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={handleCopy}
                  className="flex items-center px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? '已复制' : '复制'}
                </button>
                <button 
                  onClick={handleDownload}
                  className="flex items-center px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  下载
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
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="在此输入 Markdown 文本..."
              className="flex-1 p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl font-mono text-sm text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="flex flex-col space-y-4 h-full">
            <div className="flex items-center justify-between h-10">
              <h3 className="text-lg font-black text-slate-800">预览区</h3>
            </div>
            <div className="flex-1 p-6 bg-white border-2 border-slate-100 rounded-2xl overflow-y-auto prose prose-slate max-w-none">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
