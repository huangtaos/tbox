'use client';

import React, { useState, useEffect } from 'react';
import { Hash, ArrowLeft, Copy, Check, Clock, ArrowRightLeft } from 'lucide-react';

import Link from 'next/link';

export default function TimestampConverter() {
  const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [inputTimestamp, setInputTimestamp] = useState('');
  const [outputDate, setOutputDate] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [outputTimestamp, setOutputTimestamp] = useState('');
  const [isTimestampCopied, setIsTimestampCopied] = useState(false);
  const [isDateCopied, setIsDateCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTimestampToDate = () => {
    if (!inputTimestamp) return;
    const ts = parseInt(inputTimestamp, 10);
    if (isNaN(ts)) {
      setOutputDate('无效的时间戳');
      return;
    }
    const date = new Date(inputTimestamp.length === 10 ? ts * 1000 : ts);
    setOutputDate(date.toLocaleString('zh-CN', { hour12: false }));
  };

  const handleDateToTimestamp = () => {
    if (!inputDate) return;
    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      setOutputTimestamp('无效的日期格式');
      return;
    }
    setOutputTimestamp(Math.floor(date.getTime() / 1000).toString());
  };

  const copyToClipboard = (text: string, setter: (v: boolean) => void) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="flex items-center space-x-4 mb-10">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <Hash className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">时间戳转换</h2>
            <p className="text-slate-400 font-bold">Unix 时间戳与本地日期互转</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between border border-slate-100">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">当前 Unix 时间戳</p>
              <p className="text-2xl font-black text-slate-800 font-mono">{currentTimestamp}</p>
            </div>
          </div>
          <button 
            onClick={() => setInputTimestamp(currentTimestamp.toString())}
            className="px-6 py-3 bg-white text-blue-500 rounded-xl font-black text-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
          >
            使用当前时间
          </button>
        </div>

        <div className="space-y-12">
          {/* TS -> Date */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Unix 时间戳 (秒/毫秒)</label>
              <input 
                type="text" 
                value={inputTimestamp}
                onChange={(e) => setInputTimestamp(e.target.value)}
                placeholder="例如: 1710123456"
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-mono font-bold text-slate-700"
              />
            </div>
            <button 
              onClick={handleTimestampToDate}
              className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 mt-6 cursor-pointer"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">北京时间 (GMT+8)</label>
                {outputDate && (
                  <button 
                    onClick={() => copyToClipboard(outputDate, setIsDateCopied)}
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isDateCopied ? 'text-emerald-500' : 'text-slate-300 hover:text-blue-500'}`}
                  >
                    {isDateCopied ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>
              <div className="w-full bg-slate-900 border-2 border-slate-900 rounded-2xl px-6 py-4 font-mono font-bold text-blue-400 min-h-[60px] flex items-center">
                {outputDate || <span className="text-slate-700">等待转换...</span>}
              </div>
            </div>
          </div>

          {/* Date -> TS */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">本地日期时间</label>
              <input 
                type="text" 
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                placeholder="例如: 2024-03-11 10:00:00"
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white transition-all font-mono font-bold text-slate-700"
              />
            </div>
            <button 
              onClick={handleDateToTimestamp}
              className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-100 mt-6 cursor-pointer"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Unix 时间戳 (秒)</label>
                {outputTimestamp && (
                  <button 
                    onClick={() => copyToClipboard(outputTimestamp, setIsTimestampCopied)}
                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isTimestampCopied ? 'text-emerald-500' : 'text-slate-300 hover:text-blue-500'}`}
                  >
                    {isTimestampCopied ? 'Copied' : 'Copy'}
                  </button>
                )}
              </div>
              <div className="w-full bg-slate-900 border-2 border-slate-900 rounded-2xl px-6 py-4 font-mono font-bold text-blue-400 min-h-[60px] flex items-center">
                {outputTimestamp || <span className="text-slate-700">等待转换...</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
