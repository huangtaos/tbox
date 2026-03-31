'use client';

import React, { useState, useRef } from 'react';
import { QrCode, Copy, Check, ArrowLeft, Download, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';

export default function QrGenerator() {
  const [input, setInput] = useState('https://tbox.example.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;
    
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
          <div className="w-14 h-14 bg-fuchsia-50 text-fuchsia-500 rounded-2xl flex items-center justify-center">
            <QrCode className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">二维码生成</h2>
            <p className="text-slate-400 font-bold">将文本或链接转换为二维码图片</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700">内容</label>
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
                placeholder="输入 URL、文本、电话号码等..."
                className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-fuchsia-300 focus:ring-4 focus:ring-fuchsia-50 transition-all resize-none font-mono text-sm text-slate-700"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">尺寸: {size}px</label>
              <input 
                type="range" 
                min="128" 
                max="512" 
                step="32"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">前景色</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="font-mono text-xs text-slate-500">{fgColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">背景色</label>
                <div className="flex items-center space-x-2">
                  <input 
                    type="color" 
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0 p-0"
                  />
                  <span className="font-mono text-xs text-slate-500">{bgColor}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">容错率</label>
              <div className="flex space-x-2">
                {['L', 'M', 'Q', 'H'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setLevel(lvl as any)}
                    className={`flex-1 py-2 rounded-xl font-bold text-sm transition-colors ${level === lvl ? 'bg-fuchsia-500 text-white shadow-md' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                  >
                    {lvl === 'L' ? '7%' : lvl === 'M' ? '15%' : lvl === 'Q' ? '25%' : '30%'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-8">
            <div 
              className="p-4 bg-white border-2 border-slate-100 rounded-3xl shadow-sm flex items-center justify-center"
              style={{ minWidth: 288, minHeight: 288 }}
              ref={qrRef}
            >
              {input ? (
                <QRCodeCanvas 
                  value={input} 
                  size={Math.min(size, 256)} 
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level={level}
                  includeMargin={true}
                />
              ) : (
                <div className="text-slate-400 font-bold text-sm">请输入内容生成二维码</div>
              )}
            </div>

            <button 
              onClick={handleDownload}
              disabled={!input}
              className={`px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center shadow-lg w-full max-w-xs ${
                !input ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-fuchsia-500 text-white hover:bg-fuchsia-600 hover:shadow-xl cursor-pointer'
              }`}
            >
              <Download className="w-5 h-5 mr-2" /> 下载二维码
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
