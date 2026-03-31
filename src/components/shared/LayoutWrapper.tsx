'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from './Navbar';
import SearchModal from './SearchModal';
import FeedbackModal from './FeedbackModal';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Determine current view from pathname
  let currentView = 'dashboard';
  if (pathname.startsWith('/tools/')) {
    currentView = pathname.split('/tools/')[1];
  } else if (pathname === '/profile') {
    currentView = 'profile';
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col relative">
      <Navbar 
        currentView={currentView} 
        onOpenSearch={() => setIsSearchOpen(true)} 
      />
      <main className="flex-1">
        {children}
      </main>
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelect={(toolId) => {
          setIsSearchOpen(false);
          router.push(`/tools/${toolId}`);
        }}
      />
      <FeedbackModal />
    </div>
  );
}
