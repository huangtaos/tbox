'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, Braces, Hash, Binary, Ruler, Lock, Link as LinkIcon, Fingerprint, QrCode, Key, FileCode, FileType, Heart, Coffee, Zap, Languages, FileUp, FileDown, Timer, Droplets, ListTodo } from 'lucide-react';

interface DashboardProps {
  onOpenDonation: () => void;
}

export default function Dashboard({
  onOpenDonation,
}: DashboardProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="relative mb-8">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-1.5 bg-[#ffcf33] bg-opacity-20 text-[#45370a] rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-[#ffcf33] border-opacity-30">
            <Zap className="w-3 h-3 mr-2 fill-current" />
            你的全能工具箱
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight">
            让工作更 <span className="text-[#ffcf33] underline decoration-8 decoration-[#ffcf33]/30 underline-offset-8">简单</span>，更高效
          </h1>
          <p className="text-lg md:text-xl text-slate-500 w-full font-bold leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
            tbox 为开发者和日常办公提供一系列精选工具。完全免费，即开即用，隐私安全。
          </p>
        </div>
      </section>

      {/* Common Tools Grid */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-800 flex items-center">
            <Zap className="w-6 h-6 mr-3 text-[#ffcf33]" />
            常用工具
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Link href="/tools/pomodoro" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-red-500 group-hover:text-white transition-all shadow-inner">
              <Timer className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-red-950">番茄时间</span>
          </Link>
          <Link href="/tools/todo" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <ListTodo className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-blue-950">待办事项</span>
          </Link>
          <Link href="/tools/water-tracker" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-inner">
              <Droplets className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-cyan-950">饮水追踪</span>
          </Link>
          <Link href="/tools/calculator" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner">
              <Calculator className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-amber-950">计算器</span>
          </Link>
          <Link href="/tools/json-formatter" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <Braces className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-blue-950">JSON 格式化</span>
          </Link>
          <Link href="/tools/timestamp-converter" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <Hash className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-blue-950">时间戳转换</span>
          </Link>
          <Link href="/tools/base64-converter" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <Binary className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-blue-950">Base64 编解码</span>
          </Link>
          <Link href="/tools/unit-converter" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner">
              <Ruler className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-emerald-950">单位换算</span>
          </Link>
          <Link href="/tools/md5-hash" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center" >
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-blue-950">MD5 哈希</span>
          </Link>
          <Link href="/tools/url-encoder" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center" >
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <LinkIcon className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-blue-950">URL 编解码</span>
          </Link>
          <Link href="/tools/uuid-generator" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center" >
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
              <Fingerprint className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-blue-950">UUID 生成</span>
          </Link>
          <Link href="/tools/qr-generator" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center" >
            <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-inner">
              <QrCode className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-purple-950">二维码生成</span>
          </Link>
          <Link href="/tools/password-generator" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center" >
            <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-inner">
              <Key className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-purple-950">密码生成器</span>
          </Link>
          <Link href="/tools/markdown-preview" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center" >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
              <FileCode className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-indigo-950">Markdown 预览</span>
          </Link>
          <Link href="/tools/word-count" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center" >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
              <FileType className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-indigo-950">字数统计</span>
          </Link>
          <Link href="/tools/translator" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
              <Languages className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-indigo-950">翻译工具</span>
          </Link>
          <Link href="/tools/pdf-to-word" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-inner">
              <FileUp className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-orange-950">PDF 转 Word</span>
          </Link>
          <Link href="/tools/word-to-pdf" className="tool-card p-8 rounded-3xl flex flex-col items-center cursor-pointer group text-center block" >
            <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4.5 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-inner">
              <FileDown className="w-7 h-7" />
            </div>
            <span className="text-sm font-bold text-gray-800 transition-colors group-hover:text-blue-950">Word 转 PDF</span>
          </Link>
        </div>
      </section>

      {/* Donation Section */}
      <section className="mt-8 mb-10">
        <div className="bg-[#ffcf33] bg-opacity-10 rounded-[2.5rem] p-10 md:p-16 border-2 border-[#ffcf33] border-opacity-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center px-4 py-1.5 bg-[#ffcf33] bg-opacity-20 text-[#45370a] rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Heart className="w-3 h-3 mr-2 fill-current" />
              支持我们
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-6">
              觉得好用？请作者喝杯咖啡吧！
            </h2>
            <p className="text-slate-600 font-bold mb-8 leading-relaxed">
              tbox 是一个完全免费的开源项目。您的支持将帮助我们支付服务器费用，并激励我们开发更多实用的工具。每一份打赏都是我们前进的动力。
            </p>
            <button
              onClick={onOpenDonation}
              className="px-10 py-4 bg-[#ffcf33] text-[#45370a] rounded-2xl font-black text-lg hover:bg-[#f5c21a] transition-all shadow-lg hover:shadow-xl flex items-center justify-center mx-auto md:mx-0 cursor-pointer"
            >
              <Coffee className="w-5 h-5 mr-3" />
              立即打赏
            </button>
          </div>
          <div className="relative">
            <div className="w-64 h-64 bg-white rounded-3xl shadow-2xl p-6 flex items-center justify-center border-4 border-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8" />
                </div>
                <p className="text-sm font-black text-slate-800">Buy me a coffee</p>
                <p className="text-xs text-slate-400 mt-1">感谢您的支持</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
              <Heart className="w-6 h-6 fill-current" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
