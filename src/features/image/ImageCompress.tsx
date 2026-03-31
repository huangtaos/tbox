'use client';

import React, { useState, useRef } from 'react';
import { Image as ImageIcon, ArrowLeft, Download, Trash2, AlertCircle, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import imageCompression from 'browser-image-compression';

export default function ImageCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState('');
  const [quality, setQuality] = useState(0.8);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith('image/')) {
        setError('请选择有效的图片文件 (JPG, PNG, WebP 等)');
        return;
      }
      setFile(selectedFile);
      setCompressedFile(null);
      setError('');
    }
  };

  const compressImage = async () => {
    if (!file) {
      setError('请选择要压缩的图片');
      return;
    }

    setIsCompressing(true);
    setError('');

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: quality,
      };

      const compressedBlob = await imageCompression(file, options);
      const compressed = new File([compressedBlob], file.name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });
      
      setCompressedFile(compressed);
    } catch (err: any) {
      setError(err.message || '压缩图片时出错');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compressed-${compressedFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearFile = () => {
    setFile(null);
    setCompressedFile(null);
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
          <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">图片压缩</h2>
            <p className="text-slate-400 font-bold">在浏览器中智能压缩图片，减小文件体积</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700">选择图片</label>
              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${file ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-purple-300 bg-slate-50'}`}
              >
                <input 
                  type="file" 
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                  {file ? (
                    <>
                      <ImageIcon className="w-10 h-10 text-purple-500 mb-4" />
                      <span className="text-purple-600 font-bold break-all">{file.name}</span>
                      <span className="text-purple-400 text-sm mt-2">
                        原始大小: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 text-slate-400 mb-4" />
                      <span className="text-slate-600 font-bold">点击选择图片</span>
                      <span className="text-slate-400 text-sm mt-2">支持 JPG, PNG, WebP 等格式</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700">压缩质量: {Math.round(quality * 100)}%</label>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.1" 
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>体积更小</span>
                <span>画质更好</span>
              </div>
            </div>

            {error && (
              <div className="flex items-center text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">
                <AlertCircle className="w-4 h-4 mr-2" /> {error}
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <button 
                onClick={compressImage}
                disabled={!file || isCompressing}
                className="flex-1 bg-purple-500 text-white py-4 rounded-2xl font-black hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isCompressing ? (
                  <span className="animate-pulse">正在压缩...</span>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5 mr-2" />
                    开始压缩
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

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-center items-center">
            <h3 className="text-lg font-black text-slate-800 mb-6 self-start">压缩结果</h3>
            
            {compressedFile ? (
              <div className="w-full flex flex-col items-center">
                <div className="w-32 h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <div className="text-center">
                    <div className="text-2xl font-black">
                      -{Math.round((1 - compressedFile.size / file!.size) * 100)}%
                    </div>
                    <div className="text-xs font-bold mt-1">体积减小</div>
                  </div>
                </div>
                
                <div className="w-full bg-white p-6 rounded-2xl border border-slate-100 shadow-sm mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-slate-500">压缩前</span>
                    <span className="text-sm font-black text-slate-800">{(file!.size / 1024).toFixed(1)} KB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-green-600">压缩后</span>
                    <span className="text-sm font-black text-green-600">{(compressedFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>

                <button 
                  onClick={handleDownload}
                  className="w-full bg-green-500 text-white py-4 rounded-2xl font-black hover:bg-green-600 transition-colors flex items-center justify-center shadow-md"
                >
                  <Download className="w-5 h-5 mr-2" />
                  下载压缩后的图片
                </button>
              </div>
            ) : (
              <div className="text-center text-slate-400 font-medium py-12">
                点击左侧"开始压缩"按钮查看结果
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
