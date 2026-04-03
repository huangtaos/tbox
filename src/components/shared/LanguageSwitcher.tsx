'use client';

import { useI18n } from '@/lib/I18nProvider';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === 'zh-CN' ? 'en' : 'zh-CN')}
      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-bold text-slate-600"
      title="Switch Language / 切换语言"
    >
      <Globe className="w-4 h-4" />
      <span>{locale === 'zh-CN' ? 'EN' : '中文'}</span>
    </button>
  );
}
