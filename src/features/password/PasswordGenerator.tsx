'use client';

import React, { useState, useEffect } from 'react';
import { Key, Copy, Check, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateStrength = () => {
    let score = 0;
    if (length > 8) score += 1;
    if (length > 12) score += 1;
    if (includeUppercase) score += 1;
    if (includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;

    if (score < 3) return { label: '弱', color: 'bg-red-500', text: 'text-red-500' };
    if (score < 5) return { label: '中', color: 'bg-amber-500', text: 'text-amber-500' };
    return { label: '强', color: 'bg-emerald-500', text: 'text-emerald-500' };
  };

  const strength = calculateStrength();

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
          <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
            <Key className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">密码生成器</h2>
            <p className="text-slate-400 font-bold">生成安全、随机的强密码</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700">密码长度: {length}</label>
              </div>
              <input 
                type="range" 
                min="4" 
                max="64" 
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">包含字符</label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${includeUppercase ? 'bg-rose-500 text-white' : 'bg-slate-100 text-transparent group-hover:bg-slate-200'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <input type="checkbox" className="hidden" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
                  <span className="text-sm font-bold text-slate-600">大写字母 (A-Z)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${includeLowercase ? 'bg-rose-500 text-white' : 'bg-slate-100 text-transparent group-hover:bg-slate-200'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <input type="checkbox" className="hidden" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
                  <span className="text-sm font-bold text-slate-600">小写字母 (a-z)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${includeNumbers ? 'bg-rose-500 text-white' : 'bg-slate-100 text-transparent group-hover:bg-slate-200'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <input type="checkbox" className="hidden" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                  <span className="text-sm font-bold text-slate-600">数字 (0-9)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${includeSymbols ? 'bg-rose-500 text-white' : 'bg-slate-100 text-transparent group-hover:bg-slate-200'}`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <input type="checkbox" className="hidden" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                  <span className="text-sm font-bold text-slate-600">特殊符号 (!@#)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="w-full p-8 bg-slate-800 border-2 border-slate-800 rounded-3xl relative group min-h-[160px] flex flex-col justify-center">
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <div className={`flex items-center px-2 py-1 rounded-md bg-white/10 ${strength.text} text-xs font-bold`}>
                  <ShieldCheck className="w-3 h-3 mr-1" /> {strength.label}
                </div>
              </div>
              
              {password ? (
                <div className="font-mono text-emerald-400 text-2xl break-all text-center leading-relaxed">
                  {password}
                </div>
              ) : (
                <div className="text-slate-500 font-mono text-sm text-center">
                  请至少选择一种字符类型
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={generatePassword}
                className="flex-1 px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer"
              >
                <RefreshCw className="w-5 h-5 mr-2" /> 重新生成
              </button>
              <button 
                onClick={handleCopy}
                disabled={!password}
                className={`flex-1 px-6 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center shadow-lg ${
                  !password ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 
                  copied ? 'bg-emerald-500 text-white shadow-emerald-100' : 'bg-rose-500 text-white hover:bg-rose-600 hover:shadow-xl cursor-pointer'
                }`}
              >
                {copied ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
                {copied ? '已复制' : '复制密码'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
