'use client';

import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, ChevronRight } from 'lucide-react';
import { ALL_TOOLS } from '@/constants';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export default function SearchModal({ isOpen, onClose, onSelect }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('tbox_recent_searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const filtered = ALL_TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(query) || 
      tool.desc.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }

      const resultsCount = searchQuery.trim() === '' ? 6 : searchResults.length;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % resultsCount);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + resultsCount) % resultsCount);
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (searchQuery.trim() === '') {
          const popularIds = ['json-formatter', 'timestamp-converter', 'calculator', 'pdf-to-word', 'word-to-pdf', 'markdown-preview'];
          handleToolSelect(popularIds[selectedIndex]);
        } else if (searchResults.length > 0) {
          saveRecentSearch(searchQuery);
          handleToolSelect(searchResults[selectedIndex].id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchQuery, searchResults, selectedIndex, recentSearches]);

  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('tbox_recent_searches', JSON.stringify(updated));
  };

  const handleToolSelect = (toolId: string) => {
    onSelect(toolId);
    setSearchQuery('');
    setSelectedIndex(0);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="text-blue-600 bg-blue-50 px-0.5 rounded">{part}</span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300">
        <div className="p-10 border-b border-slate-50 flex items-center space-x-8">
          <Search className="w-10 h-10 text-slate-400" />
          <input 
            autoFocus
            type="text"
            placeholder="搜索你需要的工具 (例如: JSON, 时间戳, PDF...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-3xl font-black text-slate-800 placeholder:text-slate-200"
          />
          <button 
            onClick={onClose}
            className="px-2 py-1 text-[10px] font-black bg-slate-100 text-slate-400 rounded-lg hover:bg-slate-200 transition-colors"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {searchQuery.trim() === '' ? (
            <div className="space-y-6">
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-3">最近搜索</h3>
                  <div className="flex flex-wrap gap-2 px-4">
                    {recentSearches.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => setSearchQuery(s)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 mb-4">热门搜索</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-2">
                  {['json-formatter', 'timestamp-converter', 'calculator', 'pdf-to-word', 'word-to-pdf', 'markdown-preview'].map((id, index) => {
                    const tool = ALL_TOOLS.find(t => t.id === id);
                    if (!tool) return null;
                    const isSelected = selectedIndex === index;
                    return (
                      <button
                        key={id}
                        onClick={() => handleToolSelect(id)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center space-x-3 p-3 rounded-2xl transition-all text-left group cursor-pointer ${isSelected ? 'bg-blue-50 border border-blue-100 shadow-sm' : 'hover:bg-slate-50 border border-transparent'}`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isSelected ? 'bg-white text-blue-500 shadow-sm' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-sm'}`}>
                          {tool.icon}
                        </div>
                        <span className={`text-sm font-bold ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>{tool.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-1">
              {searchResults.map((tool, index) => {
                const isSelected = selectedIndex === index;
                return (
                  <button
                    key={tool.id}
                    onClick={() => {
                      saveRecentSearch(searchQuery);
                      handleToolSelect(tool.id);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all text-left group cursor-pointer ${isSelected ? 'bg-blue-50 border border-blue-100 shadow-sm' : 'hover:bg-slate-50 border border-transparent'}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isSelected ? 'bg-white text-blue-500 shadow-sm' : 'bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-blue-500 group-hover:shadow-sm'}`}>
                        {tool.icon}
                      </div>
                      <div>
                        <p className={`font-bold ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                          {highlightMatch(tool.name, searchQuery)}
                        </p>
                        <p className={`text-xs font-medium ${isSelected ? 'text-blue-400' : 'text-slate-400'}`}>
                          {highlightMatch(tool.desc, searchQuery)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-[10px] font-black px-2 py-1 rounded-lg transition-all ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'}`}>
                        {tool.category}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-all ${isSelected ? 'text-blue-400 translate-x-1' : 'text-slate-200 group-hover:text-blue-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-slate-200" />
              </div>
              <p className="text-slate-400 font-bold">未找到相关工具 "{searchQuery}"</p>
              <p className="text-xs text-slate-300 mt-1">试试搜索其他关键词吧</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center"><span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded mr-1.5">↑↓</span> 选择</span>
            <span className="flex items-center"><span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded mr-1.5">Enter</span> 确认</span>
          </div>
          <p>tbox 全局搜索</p>
        </div>
      </div>
    </div>
  );
}
