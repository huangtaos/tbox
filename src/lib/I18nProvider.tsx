'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import zhCN from '@/messages/zh-CN.json';
import en from '@/messages/en.json';

type Messages = typeof zhCN;

interface I18nContextValue {
  locale: 'zh-CN' | 'en';
  setLocale: (locale: 'zh-CN' | 'en') => void;
  t: (key: string) => string;
}

const messages: Record<string, Messages> = { 'zh-CN': zhCN, en };

const I18nContext = createContext<I18nContextValue | null>(null);

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? path;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<'zh-CN' | 'en'>('zh-CN');

  useEffect(() => {
    const saved = localStorage.getItem('tbox-locale') as 'zh-CN' | 'en' | null;
    if (saved && (saved === 'zh-CN' || saved === 'en')) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: 'zh-CN' | 'en') => {
    setLocaleState(newLocale);
    localStorage.setItem('tbox-locale', newLocale);
  };

  const t = (key: string): string => {
    const currentMessages = messages[locale];
    return getNestedValue(currentMessages, key);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
