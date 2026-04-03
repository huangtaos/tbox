'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Image as ImageIcon, ArrowLeft, Download, Trash2, AlertCircle, UploadCloud, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { removeBackground } from '@imgly/background-removal';

type BackgroundColor = 'blue' | 'white' | 'red';

const BACKGROUND_COLORS: Record<BackgroundColor, { name: string; hex: string; rgb: [number, number, number] }> = {
  blue: { name: '蓝色', hex: '#438EDB', rgb: [67, 142, 219] },
  white: { name: '白色', hex: '#FFFFFF', rgb: [255, 255, 255] },
  red: { name: '红色', hex: '#D93A3A', rgb: [217, 58, 58] },
};

export default function ChangePhotoBackground() {
  const [file, setFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [selectedColor, setSelectedColor] = useState<BackgroundColor>('blue');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith('image/')) {
        setError('请选择有效的图片文件 (JPG, PNG 等)');
        return;
      }
      setFile(selectedFile);
      setProcessedImage(null);
      setError('');

      // 创建预览
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const processImage = useCallback(async () => {
    if (!file || !originalPreview) {
      setError('请先选择图片');
      return;
    }

    setIsProcessing(true);
    setError('');
    setProgress(0);

    try {
      // 第一步：使用 AI 去除背景
      setProgress(10);
      
      const blob = await removeBackground(file, {
        progress: (key, current, total) => {
          if (total > 0) {
            const percent = Math.round((current / total) * 60) + 10;
            setProgress(Math.min(percent, 70));
          }
        },
      });

      setProgress(70);

      // 第二步：创建带新背景的图片
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
          setError('Canvas 初始化失败');
          setIsProcessing(false);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('无法获取 Canvas 上下文');
          setIsProcessing(false);
          return;
        }

        // 绘制新背景色
        const bgColor = BACKGROUND_COLORS[selectedColor].rgb;
        ctx.fillStyle = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        setProgress(80);

        // 绘制去除背景后的图片（带透明通道）
        ctx.drawImage(img, 0, 0);

        setProgress(100);

        // 导出结果
        const dataUrl = canvas.toDataURL('image/png');
        setProcessedImage(dataUrl);
        setIsProcessing(false);
      };

      img.onerror = () => {
        setError('图片加载失败');
        setIsProcessing(false);
      };

      // 创建去除背景后的图片 URL
      const url = URL.createObjectURL(blob);
      img.src = url;

    } catch (err: any) {
      console.error('处理错误:', err);
      setError(err.message || '处理图片时出错，请重试');
      setIsProcessing(false);
    }
  }, [file, originalPreview, selectedColor]);

  const handleDownload = () => {
    if (!processedImage) return;
    const a = document.createElement('a');
    a.href = processedImage;
    a.download = `photo-${selectedColor}-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const clearFile = () => {
    setFile(null);
    setOriginalPreview(null);
    setProcessedImage(null);
    setError('');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link
        href="/"
        className="flex items-center text-slate-400 hover:text-slate-800 mb-8 transition-colors font-bold group cursor-pointer w-fit"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        返回主页
      </Link>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-14 h-14 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">证件照换底色</h2>
            <p className="text-slate-400 font-bold">智能抠图，一键更换证件照背景颜色</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：上传和设置 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 文件上传 */}
            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700">上传证件照</label>
              <div
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                  file
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 hover:border-teal-300 bg-slate-50'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                  {file ? (
                    <>
                      <ImageIcon className="w-10 h-10 text-teal-500 mb-4" />
                      <span className="text-teal-600 font-bold text-sm break-all">{file.name}</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-10 h-10 text-slate-400 mb-4" />
                      <span className="text-slate-600 font-bold">点击上传证件照</span>
                      <span className="text-slate-400 text-xs mt-2">支持 JPG、PNG 格式</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* 背景色选择 */}
            <div className="space-y-4">
              <label className="block text-sm font-black text-slate-700">选择背景色</label>
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(BACKGROUND_COLORS) as BackgroundColor[]).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      selectedColor === color
                        ? 'border-teal-500 shadow-lg scale-105'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className="w-full aspect-square rounded-xl mb-2"
                      style={{ backgroundColor: BACKGROUND_COLORS[color].hex }}
                    />
                    <span className="text-sm font-bold text-slate-700">
                      {BACKGROUND_COLORS[color].name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="flex items-center text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">
                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={processImage}
                disabled={!file || isProcessing}
                className="flex-1 bg-teal-500 text-white py-4 rounded-2xl font-black hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    处理中...
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-5 h-5 mr-2" />
                    开始换底
                  </>
                )}
              </button>
              {file && (
                <button
                  onClick={clearFile}
                  disabled={isProcessing}
                  className="px-6 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* 右侧：预览区域 */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 原图预览 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <h3 className="text-lg font-black text-slate-800 mb-4">原图</h3>
              <div className="aspect-[3/4] bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center">
                {originalPreview ? (
                  <img
                    src={originalPreview}
                    alt="原图"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-slate-400 font-medium text-sm">请上传证件照</span>
                )}
              </div>
            </div>

            {/* 处理结果 */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
              <h3 className="text-lg font-black text-slate-800 mb-4">处理结果</h3>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden flex items-center justify-center relative">
                {isProcessing ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-10 h-10 animate-spin text-teal-500 mb-4" />
                    <span className="text-slate-600 font-bold text-sm">
                      正在处理... {progress}%
                    </span>
                    <div className="w-32 h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
                      <div
                        className="h-full bg-teal-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : processedImage ? (
                  <img
                    src={processedImage}
                    alt="处理后"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-slate-400 font-medium text-sm">点击"开始换底"查看结果</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 下载按钮 */}
        {processedImage && !isProcessing && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleDownload}
              className="px-10 py-4 bg-green-500 text-white rounded-2xl font-black hover:bg-green-600 transition-colors flex items-center justify-center shadow-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              下载换底后的证件照
            </button>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-12 p-6 bg-teal-50 rounded-2xl border border-teal-100">
          <h3 className="text-lg font-black text-teal-800 mb-4">使用说明</h3>
          <ul className="space-y-2 text-sm text-teal-700">
            <li>• 上传清晰的证件照（正面免冠照片效果最佳）</li>
            <li>• 选择您需要的背景颜色：蓝色、白色或红色</li>
            <li>• 点击"开始换底"，系统将自动进行人物分割并替换背景</li>
            <li>• 处理完成后点击下载按钮保存图片</li>
            <li>• 所有处理均在浏览器本地完成，照片不会上传到服务器</li>
          </ul>
        </div>
      </div>

      {/* 隐藏的 Canvas 用于图像处理 */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
