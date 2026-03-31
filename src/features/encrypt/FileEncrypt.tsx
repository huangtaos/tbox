'use client';

import React, { useState, useRef } from 'react';
import { FileUp, ArrowLeft, Lock, Unlock, Download, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import CryptoJS from 'crypto-js';

export default function FileEncrypt() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const processFile = () => {
    if (!file || !password) {
      setError('请选择文件并输入密码');
      return;
    }

    setIsProcessing(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result !== 'string') throw new Error('读取文件失败');

        let outputData = '';
        let outputFileName = '';

        if (mode === 'encrypt') {
          outputData = CryptoJS.AES.encrypt(result, password).toString();
          outputFileName = `${file.name}.enc`;
        } else {
          const bytes = CryptoJS.AES.decrypt(result, password);
          outputData = bytes.toString(CryptoJS.enc.Utf8);
          if (!outputData) throw new Error('密码错误或文件已损坏');
          outputFileName = file.name.replace(/\.enc$/, '');
        }

        const blob = new Blob([outputData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = outputFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err: any) {
        setError(err.message || '处理文件时出错');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setError('读取文件失败');
      setIsProcessing(false);
    };

    if (mode === 'encrypt') {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPassword('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
            <FileUp className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">文件加密与解密</h2>
            <p className="text-slate-400 font-bold">在浏览器中安全地加密和解密文件，数据不上传服务器</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex bg-slate-100 p-1 rounded-2xl w-full">
              <button
                onClick={() => { setMode('encrypt'); clearFile(); }}
                className={`flex-1 py-3 px-6 rounded-xl font-black text-sm transition-all ${mode === 'encrypt' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Lock className="w-4 h-4 inline-block mr-2" /> 加密文件
              </button>
              <button
                onClick={() => { setMode('decrypt'); clearFile(); }}
                className={`flex-1 py-3 px-6 rounded-xl font-black text-sm transition-all ${mode === 'decrypt' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Unlock className="w-4 h-4 inline-block mr-2" /> 解密文件
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700">选择文件</label>
              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${file ? 'border-rose-500 bg-rose-50' : 'border-slate-200 hover:border-rose-300 bg-slate-50'}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                  {file ? (
                    <>
                      <FileUp className="w-10 h-10 text-rose-500 mb-4" />
                      <span className="text-rose-600 font-bold break-all">{file.name}</span>
                      <span className="text-rose-400 text-sm mt-2">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </>
                  ) : (
                    <>
                      <FileUp className="w-10 h-10 text-slate-400 mb-4" />
                      <span className="text-slate-600 font-bold">点击选择文件</span>
                      <span className="text-slate-400 text-sm mt-2">支持任意格式文件</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700">设置密码</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="输入加密/解密密码"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-rose-500 focus:bg-white transition-all font-bold text-slate-700"
              />
            </div>

            {error && (
              <div className="flex items-center text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">
                <AlertCircle className="w-4 h-4 mr-2" /> {error}
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <button 
                onClick={processFile}
                disabled={!file || !password || isProcessing}
                className="flex-1 bg-rose-500 text-white py-4 rounded-2xl font-black hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <span className="animate-pulse">处理中...</span>
                ) : (
                  <>
                    {mode === 'encrypt' ? <Lock className="w-5 h-5 mr-2" /> : <Unlock className="w-5 h-5 mr-2" />}
                    {mode === 'encrypt' ? '开始加密并下载' : '开始解密并下载'}
                  </>
                )}
              </button>
              {file && (
                <button 
                  onClick={clearFile}
                  className="px-6 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-4">使用说明</h3>
            <ul className="space-y-4 text-slate-600 font-medium text-sm">
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-black text-xs mr-3 shrink-0 mt-0.5">1</div>
                <p>所有加密和解密操作均在您的浏览器本地完成，文件不会上传到任何服务器，绝对安全。</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-black text-xs mr-3 shrink-0 mt-0.5">2</div>
                <p>加密后的文件将以 <code>.enc</code> 为后缀下载。请妥善保管您的密码，忘记密码将无法解密文件。</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-black text-xs mr-3 shrink-0 mt-0.5">3</div>
                <p>解密时请选择 <code>.enc</code> 文件，并输入加密时使用的密码。</p>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-black text-xs mr-3 shrink-0 mt-0.5">4</div>
                <p>建议处理较小的文件（&lt; 50MB），过大的文件可能会导致浏览器内存不足而崩溃。</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
