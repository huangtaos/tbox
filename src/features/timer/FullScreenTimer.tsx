'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Pause, Play, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FullScreenTimer() {
  const { 
    timeLeft, 
    isTimerRunning, 
    setIsTimerRunning,
    isFullScreenTimer,
    setIsFullScreenTimer,
    timerMode,
    formatTime
  } = useApp();

  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isFullScreenTimer && timeLeft === 0) {
      setIsFullScreenTimer(false);
      setIsTimerRunning(false);
      router.push('/');
    }
  }, [timeLeft, isFullScreenTimer, setIsFullScreenTimer, setIsTimerRunning, router]);

  if (!mounted || !isFullScreenTimer) return null;

  const getModeColor = () => {
    if (timerMode === 'work') return 'bg-slate-900';
    if (timerMode === 'short-break') return 'bg-emerald-900';
    return 'bg-blue-900';
  };

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${getModeColor()} text-white animate-in fade-in zoom-in duration-700`}>
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full ${isTimerRunning ? 'animate-ping duration-[4000ms]' : ''}`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full ${isTimerRunning ? 'animate-pulse duration-[3000ms]' : ''}`}></div>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-2xl md:text-4xl font-black mb-8 opacity-80 tracking-widest uppercase">
          {timerMode === 'work' ? 'Focusing' : 'Resting'}
        </h2>
        <div className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none mb-12 drop-shadow-2xl">
          {formatTime(timeLeft)}
        </div>

        <div className="flex items-center justify-center space-x-8">
          <button 
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
          >
            {isTimerRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
          
          <button 
            onClick={() => setIsFullScreenTimer(false)}
            className="w-16 h-16 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
