'use client';

import React from 'react';
import { Droplets, ArrowLeft, RotateCcw, Plus, Coffee, Waves } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function WaterTrackerPage() {
  const { water, waterGoal, addWater, resetWater, setWaterGoal } = useApp();
  const progress = Math.min((water / waterGoal) * 100, 100);

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link href="/" className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center">
              <Droplets className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800">饮水追踪</h2>
              <p className="text-slate-400 font-bold">保持水分，保持健康</p>
            </div>
          </div>
          <button
            onClick={resetWater}
            className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[3/4] max-w-[240px] mx-auto w-full bg-slate-50 rounded-[3rem] border-8 border-white shadow-inner overflow-hidden">
            {/* Water level */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-cyan-400 transition-all duration-1000 ease-in-out"
              style={{ height: `${progress}%` }}
            >
              <div className="absolute -top-4 left-0 right-0 h-8 text-cyan-400 opacity-50">
                <Waves className="w-full h-full animate-pulse" />
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
              <span className="text-5xl font-black text-slate-800 tracking-tighter">{water}</span>
              <span className="text-sm font-black text-slate-400 uppercase tracking-widest">ml</span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="font-black text-slate-800">今日目标</h3>
                <span className="text-2xl font-black text-cyan-500">
                  {waterGoal} <span className="text-xs text-slate-400">ml</span>
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000"
                step="100"
                value={waterGoal}
                onChange={(e) => setWaterGoal(parseInt(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div>
              <h3 className="font-black text-slate-800 mb-4">快速添加</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { amount: 200, label: '小杯', icon: <Droplets className="w-4 h-4" /> },
                  { amount: 350, label: '中杯', icon: <Coffee className="w-4 h-4" /> },
                  { amount: 500, label: '大杯', icon: <Plus className="w-4 h-4" /> }
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => addWater(item.amount)}
                    className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl hover:bg-cyan-50 hover:text-cyan-600 transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-xs font-black">{item.amount}ml</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Info */}
            <div className="bg-slate-50 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">今日进度</span>
                <span className="text-lg font-black text-cyan-500">{Math.round(progress)}%</span>
              </div>
              <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              {water >= waterGoal && (
                <p className="text-center mt-3 text-sm font-bold text-cyan-600">🎉 恭喜达成今日饮水目标！</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
