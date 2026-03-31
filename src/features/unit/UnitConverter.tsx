'use client';

import React, { useState } from 'react';
import { Ruler, ArrowLeft, ArrowRightLeft } from 'lucide-react';

import Link from 'next/link';

export default function UnitConverter() {
  const [category, setCategory] = useState('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');

  const units: Record<string, Record<string, number>> = {
    length: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, ft: 0.3048, yd: 0.9144, mile: 1609.34 },
    weight: { mg: 0.001, g: 1, kg: 1000, t: 1000000, oz: 28.3495, lb: 453.592 },
    area: { mm2: 0.000001, cm2: 0.0001, m2: 1, km2: 1000000, ha: 10000, acre: 4046.86 },
    volume: { ml: 0.001, l: 1, m3: 1000, cup: 0.236588, pt: 0.473176, qt: 0.946353, gal: 3.78541 },
    speed: { 'm/s': 1, 'km/h': 0.277778, 'mph': 0.44704, 'knot': 0.514444 },
    data: { B: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 },
    time: { sec: 1, min: 60, hr: 3600, day: 86400, week: 604800, year: 31536000 },
    temperature: { C: 1, F: 1, K: 1 } // Special handling needed
  };

  const categories = [
    { id: 'length', name: '长度', icon: '📏' },
    { id: 'weight', name: '重量', icon: '⚖️' },
    { id: 'area', name: '面积', icon: '🗺️' },
    { id: 'volume', name: '体积', icon: '🧪' },
    { id: 'speed', name: '速度', icon: '🚀' },
    { id: 'data', name: '数据', icon: '💾' },
    { id: 'time', name: '时间', icon: '⏰' },
    { id: 'temperature', name: '温度', icon: '🌡️' }
  ];

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    const firstUnit = Object.keys(units[cat])[0];
    const secondUnit = Object.keys(units[cat])[1];
    setFromUnit(firstUnit);
    setToUnit(secondUnit);
  };

  const convert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '0';

    if (category === 'temperature') {
      let celsius = val;
      if (fromUnit === 'F') celsius = (val - 32) * 5 / 9;
      if (fromUnit === 'K') celsius = val - 273.15;

      let result = celsius;
      if (toUnit === 'F') result = (celsius * 9 / 5) + 32;
      if (toUnit === 'K') result = celsius + 273.15;
      return result.toLocaleString('zh-CN', { maximumFractionDigits: 4 });
    }

    const baseValue = val * units[category][fromUnit];
    const result = baseValue / units[category][toUnit];
    return result.toLocaleString('zh-CN', { maximumFractionDigits: 6 });
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
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
            <Ruler className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">单位换算</h2>
            <p className="text-slate-400 font-bold">快速转换长度、重量、面积等单位</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-6 py-3 rounded-2xl font-black text-sm transition-all cursor-pointer flex items-center ${category === cat.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
            >
              <span className="mr-2 text-lg">{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">数值</label>
              <input 
                type="number" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all font-black text-slate-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">从单位</label>
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all font-black text-slate-700 appearance-none cursor-pointer"
              >
                {Object.keys(units[category]).map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shadow-inner">
              <ArrowRightLeft className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">结果</label>
              <div className="w-full bg-slate-900 border-2 border-slate-900 rounded-2xl px-6 py-4 font-mono font-black text-emerald-400 min-h-[60px] flex items-center">
                {convert()}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">到单位</label>
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 outline-none focus:border-emerald-500 focus:bg-white transition-all font-black text-slate-700 appearance-none cursor-pointer"
              >
                {Object.keys(units[category]).map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
