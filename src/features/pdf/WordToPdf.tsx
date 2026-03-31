'use client';

import React, { useState } from 'react';
import { FileDown, ArrowLeft, Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';

export default function WordToPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsDone(false);
    }
  };

  const convertToPdf = async () => {
    if (!file) return;
    setIsConverting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;

      const doc = new jsPDF();
      
      // Simple text extraction and rendering for PDF
      // In a real app, you'd use a more robust HTML-to-PDF library
      const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      
      const splitText = doc.splitTextToSize(text, 180);
      doc.text(splitText, 10, 10);
      
      doc.save(`${file.name.split('.')[0]}.pdf`);
      setIsDone(true);
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('转换失败，请确保文件格式正确。');
    } finally {
      setIsConverting(false);
    }
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
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <FileDown className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">Word 转 PDF</h2>
            <p className="text-slate-400 font-bold">将 .docx 文档快速转换为 PDF 格式</p>
          </div>
        </div>

        <div className="space-y-8">
          <div 
            className={`
              border-4 border-dashed rounded-[2rem] p-12 text-center transition-all
              ${file ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'}
            `}
          >
            <input 
              type="file" 
              accept=".docx" 
              onChange={handleFileChange}
              className="hidden" 
              id="word-upload"
            />
            <label htmlFor="word-upload" className="cursor-pointer flex flex-col items-center">
              {file ? (
                <>
                  <FileText className="w-16 h-16 text-blue-500 mb-4" />
                  <span className="text-xl font-black text-slate-800 mb-2">{file.name}</span>
                  <span className="text-sm font-bold text-slate-400">点击更换文件</span>
                </>
              ) : (
                <>
                  <Upload className="w-16 h-16 text-slate-200 mb-4 group-hover:text-blue-300 transition-colors" />
                  <span className="text-xl font-black text-slate-400 mb-2">点击或拖拽 Word 文件到这里</span>
                  <span className="text-sm font-bold text-slate-300">支持 .docx 格式</span>
                </>
              )}
            </label>
          </div>

          <div className="flex justify-center">
            <button
              disabled={!file || isConverting}
              onClick={convertToPdf}
              className={`
                px-12 py-4 rounded-2xl font-black text-lg transition-all flex items-center space-x-3
                ${!file || isConverting ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-blue-500 text-white shadow-xl shadow-blue-100 hover:bg-blue-600 hover:-translate-y-1'}
              `}
            >
              {isConverting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>转换中...</span>
                </>
              ) : isDone ? (
                <>
                  <CheckCircle2 className="w-6 h-6" />
                  <span>转换成功</span>
                </>
              ) : (
                <>
                  <FileDown className="w-6 h-6" />
                  <span>开始转换</span>
                </>
              )}
            </button>
          </div>

          {isDone && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center animate-in zoom-in-95 duration-300">
              <p className="text-emerald-600 font-bold">文件已成功转换并开始下载！</p>
            </div>
          )}
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-2xl">
          <h4 className="font-black text-slate-800 mb-2">💡 使用说明</h4>
          <ul className="text-sm text-slate-500 font-bold space-y-2">
            <li>• 目前仅支持 .docx 格式的 Word 文档。</li>
            <li>• 转换过程在浏览器本地完成，您的文件不会被上传到任何服务器，确保隐私安全。</li>
            <li>• 复杂的排版（如表格、特殊字体）在转换后可能会有细微差异。</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
