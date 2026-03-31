'use client';

import React, { useState } from 'react';
import { Languages, ArrowRightLeft, Copy, Check, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function TranslationTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState<'zh-en' | 'en-zh'>('zh-en');

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      const prompt = direction === 'zh-en' 
        ? `Translate the following Chinese text to English. Return ONLY the translation, no extra text: ${inputText}`
        : `Translate the following English text to Chinese. Return ONLY the translation, no extra text: ${inputText}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });
      
      setOutputText(response.text || '');
    } catch (error) {
      console.error('Translation error:', error);
      setOutputText('翻译出错，请稍后再试。');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDirection = () => {
    setDirection(prev => prev === 'zh-en' ? 'en-zh' : 'zh-en');
    setInputText(outputText);
    setOutputText(inputText);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 flex items-center">
            <Languages className="w-8 h-8 mr-3 text-indigo-500" /> 翻译工具
          </h2>
          <p className="text-slate-500 font-bold mt-1">支持中英文互译，由 AI 驱动</p>
        </div>
        <button 
          onClick={toggleDirection}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-pointer shadow-sm"
        >
          <span>{direction === 'zh-en' ? '中' : '英'}</span>
          <ArrowRightLeft className="w-4 h-4" />
          <span>{direction === 'zh-en' ? '英' : '中'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {direction === 'zh-en' ? '中文 (输入)' : '英文 (输入)'}
              </span>
              <button 
                onClick={() => setInputText('')}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
              >
                清空
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="输入需要翻译的文字..."
              className="w-full h-64 bg-transparent border-none outline-none resize-none text-lg font-bold text-slate-800 placeholder:text-slate-200"
            />
          </div>
          <button
            onClick={handleTranslate}
            disabled={isLoading || !inputText.trim()}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> 正在翻译...
              </>
            ) : '立即翻译'}
          </button>
        </div>

        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              {direction === 'zh-en' ? '英文 (结果)' : '中文 (结果)'}
            </span>
            {outputText && (
              <button 
                onClick={copyToClipboard}
                className="flex items-center space-x-1 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '已复制' : '复制结果'}</span>
              </button>
            )}
          </div>
          <div className="h-64 overflow-y-auto text-lg font-bold text-slate-800 leading-relaxed">
            {outputText || <span className="text-slate-200">翻译结果将显示在这里...</span>}
          </div>
          {isLoading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-[2rem] flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-2" />
                <span className="text-sm font-bold text-slate-400">AI 正在思考...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
