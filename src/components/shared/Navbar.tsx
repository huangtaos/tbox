'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  ChevronDown, Calculator, Ruler, Timer, Droplets, ListTodo,
  Braces, Hash, Binary, Lock, Link as LinkIcon, Fingerprint,
  QrCode, Key, FileText, FileCode, FileType, Search, User,
  Languages, FileUp, FileDown, FilePen, Image
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onOpenSearch: () => void;
}

export default function Navbar({ currentView, onOpenSearch }: NavbarProps) {
  const { visitCount } = useApp();

  return (
    <header className="nav-header sticky top-0 z-[100] h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-10 h-full">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center space-x-3 cursor-pointer robot-logo group"
          >
            <div className="relative w-10 h-10 bg-[#ffcf33] rounded-xl flex flex-col items-center justify-center shadow-sm border-2 border-[#f5c21a]">
              <div className="absolute -top-1.5 w-0.5 h-2 bg-[#ffcf33] border-t border-x border-[#f5c21a]"></div>
              <div className="absolute -top-2.5 w-2 h-2 bg-[#ffcf33] rounded-full border border-[#f5c21a]"></div>
              <div className="flex items-center space-x-2.5 mt-2">
                <div className="w-1.5 h-1.5 bg-[#45370a] rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-[#45370a] rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#45370a]">tbox</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1 h-full">
            <Link 
              href="/"
              className={`px-4 text-sm font-bold flex items-center transition-colors cursor-pointer ${currentView === 'dashboard' ? 'text-gray-900 border-b-2 border-[#ffcf33]' : 'text-gray-500 hover:text-gray-900'}`}
            >
              主页
            </Link>
            
            <div className="dropdown group">
              <button className={`px-4 text-sm font-semibold flex items-center h-full transition-colors cursor-pointer ${['pomodoro', 'todo', 'water-tracker', 'calculator', 'unit-converter'].includes(currentView) ? 'text-gray-900 border-b-2 border-[#ffcf33]' : 'text-gray-500 hover:text-gray-900'}`}>
                效率工具 <ChevronDown className="ml-1.5 w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="dropdown-content">
                <Link href="/tools/pomodoro" className="w-full flex items-center p-3 hover:bg-red-50 rounded-xl transition group/item cursor-pointer">
                  <Timer className="w-4 h-4 mr-3.5 text-red-500 transition-colors group-hover/item:text-red-600" />
                  <span className="text-sm font-bold text-gray-800">番茄时间</span>
                </Link>
                <Link href="/tools/todo" className="w-full flex items-center p-3 hover:bg-blue-50 rounded-xl transition group/item cursor-pointer">
                  <ListTodo className="w-4 h-4 mr-3.5 text-blue-500 transition-colors group-hover/item:text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">待办事项</span>
                </Link>
                <Link href="/tools/water-tracker" className="w-full flex items-center p-3 hover:bg-cyan-50 rounded-xl transition group/item cursor-pointer">
                  <Droplets className="w-4 h-4 mr-3.5 text-cyan-500 transition-colors group-hover/item:text-cyan-600" />
                  <span className="text-sm font-bold text-gray-800">饮水追踪</span>
                </Link>
                <Link href="/tools/calculator" className="w-full flex items-center p-3 hover:bg-amber-50 rounded-xl transition group/item cursor-pointer">
                  <Calculator className="w-4 h-4 mr-3.5 text-amber-500 transition-colors group-hover/item:text-amber-600" />
                  <span className="text-sm font-bold text-gray-800">计算器</span>
                </Link>
                <Link href="/tools/unit-converter" className="w-full flex items-center p-3 hover:bg-emerald-50 rounded-xl transition group/item cursor-pointer">
                  <Ruler className="w-4 h-4 mr-3.5 text-emerald-500 transition-colors group-hover/item:text-emerald-600" />
                  <span className="text-sm font-bold text-gray-800">单位换算</span>
                </Link>
              </div>
            </div>

            <div className="dropdown group">
              <button className={`px-4 text-sm font-semibold flex items-center h-full transition-colors cursor-pointer ${['json-formatter', 'timestamp-converter', 'base64-converter', 'md5-hash', 'url-encoder', 'uuid-generator', 'qr-generator', 'password-generator'].includes(currentView) ? 'text-gray-900 border-b-2 border-[#ffcf33]' : 'text-gray-500 hover:text-gray-900'}`}>
                开发者工具 <ChevronDown className="ml-1.5 w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="dropdown-content">
                <Link href="/tools/json-formatter" className="w-full flex items-center p-3 hover:bg-blue-50 rounded-xl transition group/item cursor-pointer">
                  <Braces className="w-4 h-4 mr-3.5 text-blue-500 transition-colors group-hover/item:text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">JSON 格式化</span>
                </Link>
                <Link href="/tools/timestamp-converter" className="w-full flex items-center p-3 hover:bg-blue-50 rounded-xl transition group/item cursor-pointer">
                  <Hash className="w-4 h-4 mr-3.5 text-blue-500 transition-colors group-hover/item:text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">时间戳转换</span>
                </Link>
                <Link href="/tools/base64-converter" className="w-full flex items-center p-3 hover:bg-blue-50 rounded-xl transition group/item cursor-pointer">
                  <Binary className="w-4 h-4 mr-3.5 text-blue-500 transition-colors group-hover/item:text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">Base64 编解码</span>
                </Link>
                <Link href="/tools/md5-hash" className="w-full flex items-center p-3 hover:bg-blue-50 rounded-xl transition group/item cursor-pointer">
                  <Lock className="w-4 h-4 mr-3.5 text-blue-500 transition-colors group-hover/item:text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">MD5 哈希</span>
                </Link>
                <Link href="/tools/url-encoder" className="w-full flex items-center p-3 hover:bg-blue-50 rounded-xl transition group/item cursor-pointer">
                  <LinkIcon className="w-4 h-4 mr-3.5 text-blue-500 transition-colors group-hover/item:text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">URL 编解码</span>
                </Link>
                <Link href="/tools/uuid-generator" className="w-full flex items-center p-3 hover:bg-blue-50 rounded-xl transition group/item cursor-pointer">
                  <Fingerprint className="w-4 h-4 mr-3.5 text-blue-500 transition-colors group-hover/item:text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">UUID 生成</span>
                </Link>
                <Link href="/tools/qr-generator" className="w-full flex items-center p-3 hover:bg-purple-50 rounded-xl transition group/item cursor-pointer">
                  <QrCode className="w-4 h-4 mr-3.5 text-purple-500 transition-colors group-hover/item:text-purple-600" />
                  <span className="text-sm font-bold text-gray-800">二维码生成</span>
                </Link>
                <Link href="/tools/password-generator" className="w-full flex items-center p-3 hover:bg-purple-50 rounded-xl transition group/item cursor-pointer">
                  <Key className="w-4 h-4 mr-3.5 text-purple-500 transition-colors group-hover/item:text-purple-600" />
                  <span className="text-sm font-bold text-gray-800">密码生成器</span>
                </Link>
              </div>
            </div>

            <div className="dropdown group">
              <button className={`px-4 text-sm font-semibold flex items-center h-full transition-colors cursor-pointer ${['pdf-to-word', 'word-to-pdf', 'markdown-preview', 'word-count', 'file-encrypt', 'file-compress'].includes(currentView) ? 'text-gray-900 border-b-2 border-[#ffcf33]' : 'text-gray-500 hover:text-gray-900'}`}>
                文档处理工具 <ChevronDown className="ml-1.5 w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="dropdown-content">
                <Link href="/tools/pdf-to-word" className="w-full flex items-center p-3 hover:bg-orange-50 rounded-xl transition group/item cursor-pointer">
                  <FileUp className="w-4 h-4 mr-3.5 text-orange-500 transition-colors group-hover/item:text-orange-600" />
                  <span className="text-sm font-bold text-gray-800">PDF 转 Word</span>
                </Link>
                <Link href="/tools/word-to-pdf" className="w-full flex items-center p-3 hover:bg-blue-50 rounded-xl transition group/item cursor-pointer">
                  <FileDown className="w-4 h-4 mr-3.5 text-blue-500 transition-colors group-hover/item:text-blue-600" />
                  <span className="text-sm font-bold text-gray-800">Word 转 PDF</span>
                </Link>
                <Link href="/tools/markdown-preview" className="w-full flex items-center p-3 hover:bg-indigo-50 rounded-xl transition group/item cursor-pointer">
                  <FileCode className="w-4 h-4 mr-3.5 text-indigo-500 transition-colors group-hover/item:text-indigo-600" />
                  <span className="text-sm font-bold text-gray-800">Markdown 预览</span>
                </Link>
                <Link href="/tools/word-count" className="w-full flex items-center p-3 hover:bg-indigo-50 rounded-xl transition group/item cursor-pointer">
                  <FileType className="w-4 h-4 mr-3.5 text-indigo-500 transition-colors group-hover/item:text-indigo-600" />
                  <span className="text-sm font-bold text-gray-800">字数统计</span>
                </Link>
                <Link href="/tools/file-encrypt" className="w-full flex items-center p-3 hover:bg-slate-50 rounded-xl transition group/item cursor-pointer">
                  <Lock className="w-4 h-4 mr-3.5 text-slate-500 transition-colors group-hover/item:text-slate-600" />
                  <span className="text-sm font-bold text-gray-800">文件加密</span>
                </Link>
                <Link href="/tools/file-compress" className="w-full flex items-center p-3 hover:bg-slate-50 rounded-xl transition group/item cursor-pointer">
                  <FileDown className="w-4 h-4 mr-3.5 text-slate-500 transition-colors group-hover/item:text-slate-600" />
                  <span className="text-sm font-bold text-gray-800">文件压缩</span>
                </Link>
              </div>
            </div>

            <div className="dropdown group">
              <button className={`px-4 text-sm font-semibold flex items-center h-full transition-colors cursor-pointer ${['image-compress', 'change-photo-background'].includes(currentView) ? 'text-gray-900 border-b-2 border-[#ffcf33]' : 'text-gray-500 hover:text-gray-900'}`}>
                图片处理工具 <ChevronDown className="ml-1.5 w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="dropdown-content">
                <Link href="/tools/image-compress" className="w-full flex items-center p-3 hover:bg-slate-50 rounded-xl transition group/item cursor-pointer">
                  <FilePen className="w-4 h-4 mr-3.5 text-slate-500 transition-colors group-hover/item:text-slate-600" />
                  <span className="text-sm font-bold text-gray-800">图片压缩</span>
                </Link>
                <Link href="/tools/change-photo-background" className="w-full flex items-center p-3 hover:bg-teal-50 rounded-xl transition group/item cursor-pointer">
                  <Image className="w-4 h-4 mr-3.5 text-teal-500 transition-colors group-hover/item:text-teal-600" />
                  <span className="text-sm font-bold text-gray-800">证件照换底色</span>
                </Link>
              </div>
            </div>

            <Link 
              href="/tools/translator"
              className={`px-4 text-sm font-bold flex items-center transition-colors cursor-pointer ${currentView === 'translator' ? 'text-gray-900 border-b-2 border-[#ffcf33]' : 'text-gray-500 hover:text-gray-900'}`}
            >
              <Languages className="w-4 h-4 mr-1.5" /> 翻译工具
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={onOpenSearch}
              className="flex items-center space-x-4 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-gray-400 hover:text-[#45370a] hover:border-slate-200 transition-all cursor-pointer group min-w-[240px]"
            >
              <Search className="w-6 h-6" />
              <span className="text-base font-bold hidden sm:inline">搜索工具...</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
