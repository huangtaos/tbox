'use client';

import React, { useState, useRef } from 'react';
import { FileArchive, ArrowLeft, Download, Trash2, AlertCircle, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import JSZip from 'jszip';

export default function FileCompress() {
  const [files, setFiles] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
      setError('');
    }
  };

  const compressFiles = async () => {
    if (files.length === 0) {
      setError('请选择要压缩的文件');
      return;
    }

    setIsCompressing(true);
    setError('');

    try {
      const zip = new JSZip();

      files.forEach(file => {
        zip.file(file.name, file);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `archive-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || '压缩文件时出错');
    } finally {
      setIsCompressing(false);
    }
  };

  const clearFiles = () => {
    setFiles([]);
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
          <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
            <FileArchive className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">文件压缩</h2>
            <p className="text-slate-400 font-bold">在浏览器中将多个文件打包成 ZIP 压缩包</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700">选择文件 (可多选)</label>
              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${files.length > 0 ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300 bg-slate-50'}`}
              >
                <input 
                  type="file" 
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden" 
                  id="file-upload-compress"
                />
                <label htmlFor="file-upload-compress" className="cursor-pointer flex flex-col items-center">
                  {files.length > 0 ? (
                    <>
                      <FileArchive className="w-10 h-10 text-amber-500 mb-4" />
                      <span className="text-amber-600 font-bold">已选择 {files.length} 个文件</span>
                      <span className="text-amber-400 text-sm mt-2">
                        总大小: {(files.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 text-slate-400 mb-4" />
                      <span className="text-slate-600 font-bold">点击选择多个文件</span>
                      <span className="text-slate-400 text-sm mt-2">支持任意格式文件打包</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {error && (
              <div className="flex items-center text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">
                <AlertCircle className="w-4 h-4 mr-2" /> {error}
              </div>
            )}

            <div className="flex space-x-4 pt-4">
              <button 
                onClick={compressFiles}
                disabled={files.length === 0 || isCompressing}
                className="flex-1 bg-amber-500 text-white py-4 rounded-2xl font-black hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isCompressing ? (
                  <span className="animate-pulse">正在压缩...</span>
                ) : (
                  <>
                    <Download className="w-5 h-5 mr-2" />
                    打包并下载 ZIP
                  </>
                )}
              </button>
              {files.length > 0 && (
                <button 
                  onClick={clearFiles}
                  className="px-6 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-4">已选文件列表</h3>
            {files.length > 0 ? (
              <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {files.map((file, index) => (
                  <li key={index} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs font-medium text-slate-400">{(file.size / 1024).toFixed(1)} KB</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-slate-400 font-medium py-12">
                尚未选择任何文件
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
