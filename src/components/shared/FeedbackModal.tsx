'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle2 } from 'lucide-react';

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    
    // Feedback will be sent to the configured email
    console.log(`Sending feedback: ${feedback}`);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFeedback('');
      
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 2000);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-slate-700 hover:scale-105 transition-all z-40 group"
        aria-label="提供反馈"
      >
        <MessageSquare className="w-6 h-6 group-hover:animate-pulse" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-black text-slate-800 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-slate-500" />
                意见反馈
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 mb-2">感谢您的反馈！</h3>
                  <p className="text-slate-500 font-medium text-sm">我们会认真阅读您的每一条建议，不断改进产品。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p className="text-sm font-bold text-slate-500 mb-4">
                    您对 tbox 有什么建议或发现了什么问题？请告诉我们。
                  </p>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="在这里输入您的反馈内容..."
                    className="w-full h-32 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-medium text-sm text-slate-700 outline-none focus:border-slate-400 focus:bg-white transition-all resize-none mb-4"
                    required
                  />
                  <button
                    type="submit"
                    disabled={!feedback.trim() || isSubmitting}
                    className="w-full bg-slate-800 text-white py-3.5 rounded-xl font-black hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">提交中...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        提交反馈
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
