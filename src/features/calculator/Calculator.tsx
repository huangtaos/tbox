'use client';

import React, { useState } from 'react';
import { Calculator as CalcIcon, ArrowLeft, Delete, Equal } from 'lucide-react';

import Link from 'next/link';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleEqual = () => {
    try {
      // Sanitize input to only allow numbers, basic operators, decimals, and scientific functions
      let sanitizedExpression = (equation + display)
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/\^/g, '**');

      // Basic validation to prevent arbitrary code execution
      if (/[^0-9+\-*/.()Math.sinco tanlgqrPIE*]/.test(sanitizedExpression)) {
        throw new Error('Invalid characters');
      }
      
      const result = new Function(`return ${sanitizedExpression}`)();
      
      const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(10));
      
      setEquation(equation + display + ' =');
      setDisplay(String(formattedResult));
    } catch (err) {
      setDisplay('Error');
    }
  };

  const buttons = [
    { label: 'sin', action: () => setDisplay(prev => prev === '0' ? 'sin(' : prev + 'sin('), type: 'operator' },
    { label: 'cos', action: () => setDisplay(prev => prev === '0' ? 'cos(' : prev + 'cos('), type: 'operator' },
    { label: 'tan', action: () => setDisplay(prev => prev === '0' ? 'tan(' : prev + 'tan('), type: 'operator' },
    { label: 'C', action: handleClear, type: 'special' },
    
    { label: 'log', action: () => setDisplay(prev => prev === '0' ? 'log(' : prev + 'log('), type: 'operator' },
    { label: 'ln', action: () => setDisplay(prev => prev === '0' ? 'ln(' : prev + 'ln('), type: 'operator' },
    { label: 'sqrt', action: () => setDisplay(prev => prev === '0' ? 'sqrt(' : prev + 'sqrt('), type: 'operator' },
    { label: '÷', action: () => handleOperator('/'), type: 'operator' },
    
    { label: 'π', action: () => setDisplay(prev => prev === '0' ? 'π' : prev + 'π'), type: 'number' },
    { label: 'e', action: () => setDisplay(prev => prev === '0' ? 'e' : prev + 'e'), type: 'number' },
    { label: '^', action: () => handleOperator('^'), type: 'operator' },
    { label: '×', action: () => handleOperator('*'), type: 'operator' },
    
    { label: '7', action: () => handleNumber('7'), type: 'number' },
    { label: '8', action: () => handleNumber('8'), type: 'number' },
    { label: '9', action: () => handleNumber('9'), type: 'number' },
    { label: '-', action: () => handleOperator('-'), type: 'operator' },
    
    { label: '4', action: () => handleNumber('4'), type: 'number' },
    { label: '5', action: () => handleNumber('5'), type: 'number' },
    { label: '6', action: () => handleNumber('6'), type: 'number' },
    { label: '+', action: () => handleOperator('+'), type: 'operator' },
    
    { label: '1', action: () => handleNumber('1'), type: 'number' },
    { label: '2', action: () => handleNumber('2'), type: 'number' },
    { label: '3', action: () => handleNumber('3'), type: 'number' },
    { label: '=', action: handleEqual, type: 'equal' },
    
    { label: '(', action: () => handleNumber('('), type: 'number' },
    { label: '0', action: () => handleNumber('0'), type: 'number' },
    { label: ')', action: () => handleNumber(')'), type: 'number' },
    { label: '.', action: () => handleNumber('.'), type: 'number' },
    { label: 'DEL', action: () => setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0'), type: 'special', span: 4 },
  ];

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 返回主页
      </Link>

      <div className="bg-white rounded-[3rem] p-8 shadow-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
            <CalcIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-800">科学计算器</h2>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 mb-8 text-right min-h-[140px] flex flex-col justify-end border border-slate-100 shadow-inner">
          <div className="text-slate-400 font-bold text-sm mb-2 h-6 overflow-hidden whitespace-nowrap">{equation}</div>
          <div className="text-5xl font-black text-slate-800 tracking-tighter overflow-hidden whitespace-nowrap">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className={`
                h-14 rounded-2xl font-black text-lg transition-all cursor-pointer
                ${btn.span === 2 ? 'col-span-2' : ''}
                ${btn.span === 4 ? 'col-span-4' : ''}
                ${btn.type === 'number' ? 'bg-slate-50 text-slate-700 hover:bg-slate-100' : ''}
                ${btn.type === 'operator' ? 'bg-amber-50 text-amber-500 hover:bg-amber-500 hover:text-white' : ''}
                ${btn.type === 'special' ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : ''}
                ${btn.type === 'equal' ? 'bg-amber-500 text-white shadow-lg shadow-amber-100 hover:bg-amber-600 row-span-2 h-auto' : ''}
              `}
            >
              {btn.label === 'DEL' ? <div className="flex items-center justify-center space-x-2"><Delete className="w-5 h-5" /> <span>删除</span></div> : btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
