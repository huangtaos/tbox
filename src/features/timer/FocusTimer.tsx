'use client';

import React from 'react';
import { Timer, ArrowLeft, Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function FocusTimer() {
  const { 
    timeLeft, 
    setTimeLeft,
    isTimerRunning, 
    setIsTimerRunning,
    timerMode, 
    setTimerMode,
    timerSessions 
  } = useApp();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const onToggle = () => setIsTimerRunning(!isTimerRunning);
  
  const onReset = () => {
    setIsTimerRunning(false);
    setTimeLeft(timerMode === 'work' ? 25 * 60 : timerMode === 'short-break' ? 5 * 60 : 15 * 60);
  };

  const onSwitchMode = (mode: string) => {
    setTimerMode(mode);
    setIsTimerRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : mode === 'short-break' ? 5 * 60 : 15 * 60);
  };
  const getModeColor = () => {
    if (timerMode === 'work') return 'red';
    if (timerMode === 'short-break') return 'emerald';
    return 'blue';
  };

  const color = getModeColor();
  const totalTime = timerMode === 'work' ? 25 * 60 : timerMode === 'short-break' ? 5 * 60 : 15 * 60;
  const progress = (timeLeft / totalTime) * 100;

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 text-center relative overflow-hidden">
        {/* Tomato Pattern Background */}
        <div className="absolute -right-10 -bottom-10 opacity-[0.05] pointer-events-none">
          <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="55" r="40" fill="#ef4444" />
            <path d="M50 15C50 15 45 25 35 25M50 15C50 15 55 25 65 25M50 15V25" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
            <rect x="46" y="5" width="8" height="15" rx="4" fill="#16a34a" />
          </svg>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-12 relative z-10">
          <div className={`w-14 h-14 bg-${color}-50 text-${color}-500 rounded-2xl flex items-center justify-center`}>
            <Timer className="w-7 h-7" />
          </div>
          <div className="text-left">
            <h2 className="text-3xl font-black text-slate-800">专注时间</h2>
            <p className="text-slate-400 font-bold">番茄工作法，让专注更简单</p>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-12 relative z-10">
          <button 
            onClick={() => onSwitchMode('work')}
            className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all cursor-pointer ${timerMode === 'work' ? 'bg-red-500 text-white shadow-lg shadow-red-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
          >
            专注
          </button>
          <button 
            onClick={() => onSwitchMode('short-break')}
            className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all cursor-pointer ${timerMode === 'short-break' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
          >
            短休
          </button>
          <button 
            onClick={() => onSwitchMode('long-break')}
            className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all cursor-pointer ${timerMode === 'long-break' ? 'bg-blue-500 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
          >
            长休
          </button>
        </div>

        <div className="relative w-64 h-64 mx-auto mb-12 z-10">
          {/* Running Animation Ripples */}
          {isTimerRunning && (
            <>
              <div className={`absolute inset-0 rounded-full bg-${color}-500/10 animate-ping duration-[3000ms]`}></div>
              <div className={`absolute inset-0 rounded-full bg-${color}-500/5 animate-pulse duration-[2000ms] scale-110`}></div>
            </>
          )}
          
          <svg className="w-full h-full transform -rotate-90 relative z-10">
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-slate-50"
            />
            <circle
              cx="128"
              cy="128"
              r="120"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={754}
              strokeDashoffset={754 - (754 * progress) / 100}
              strokeLinecap="round"
              className={`text-${color}-500 transition-all duration-1000`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <span className="text-6xl font-black text-slate-800 tracking-tighter">{formatTime(timeLeft)}</span>
            <span className={`text-sm font-black uppercase tracking-widest mt-2 text-${color}-500`}>
              {timerMode === 'work' ? 'Focusing' : 'Resting'}
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-6 relative z-10">
          <button 
            onClick={onReset}
            className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <button 
            onClick={onToggle}
            className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all shadow-2xl cursor-pointer ${isTimerRunning ? 'bg-slate-800 text-white' : `bg-${color}-500 text-white shadow-${color}-200`}`}
          >
            {isTimerRunning ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
          </button>
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex flex-col items-center justify-center">
            <span className="text-lg font-black text-slate-800 leading-none">{timerSessions}</span>
            <span className="text-[10px] font-black uppercase mt-1">Sessions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
