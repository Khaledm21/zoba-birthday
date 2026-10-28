import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguageContext';
import type { Language } from '../../types';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const options: { id: Language; label: string }[] = [
    { id: 'ar', label: 'العربية' },
    { id: 'en', label: 'EN' },
    { id: 'both', label: 'كلاهما (Both)' },
  ];

  return (
    <div className="fixed top-5 right-5 z-40 flex items-center">
      <div className="glass-panel rounded-full p-1 flex items-center gap-1 shadow-lg shadow-black/30 border border-[#B9A4E8]/20">
        <div className="pl-2 pr-1 text-[#B9A4E8]">
          <Globe className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-0.5">
          {options.map((opt) => {
            const isActive = language === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setLanguage(opt.id)}
                aria-pressed={isActive}
                className={`px-2.5 py-1 text-xs rounded-full font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#B9A4E8] to-[#F8D98D] text-[#17172B] shadow-sm font-semibold'
                    : 'text-[#C5BFD8] hover:text-[#FFF5F0] hover:bg-[#222139]/60'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
