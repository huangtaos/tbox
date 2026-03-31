'use client';

import React, { useState } from 'react';
import Dashboard from '@/components/shared/Dashboard';

export default function Home() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto px-6 pt-10 pb-20">
        <Dashboard 
          onOpenDonation={() => setIsDonationOpen(true)}
        />
      </div>

      {/* Donation Modal */}
      {isDonationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-3xl font-black text-slate-800 mb-6 text-center">感谢支持！</h3>
            <p className="text-slate-500 font-bold text-center mb-8">
              您的打赏是对我们最大的鼓励。请使用微信或支付宝扫码。
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="aspect-square bg-slate-50 rounded-3xl flex items-center justify-center border-2 border-slate-100">
                <span className="text-xs font-black text-slate-400">微信支付</span>
              </div>
              <div className="aspect-square bg-slate-50 rounded-3xl flex items-center justify-center border-2 border-slate-100">
                <span className="text-xs font-black text-slate-400">支付宝</span>
              </div>
            </div>
            <button 
              onClick={() => setIsDonationOpen(false)}
              className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black hover:bg-slate-700 transition-colors cursor-pointer"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  );
}
