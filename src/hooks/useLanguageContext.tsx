import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';
import { translations, getLocalizedText } from '../i18n/translations';
import type { TranslationDictionary } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  tEn: TranslationDictionary;
  tAr: TranslationDictionary;
  isRtl: boolean;
  isBoth: boolean;
  getText: (loc: { en: string; ar: string }) => { primary: string; secondary?: string };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'zoba_birthday_language_pref';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'ar' || saved === 'both') {
      return saved;
    }
    return 'ar';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  const isRtl = false;
  const isBoth = false;

  useEffect(() => {
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
    document.body.style.fontFamily = "var(--font-dm), var(--font-cairo), sans-serif";
  }, []);

  const dictionary = language === 'en' ? translations.en : translations.ar;

  const getText = (loc: { en: string; ar: string }) => {
    return getLocalizedText(loc, language);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: dictionary,
        tEn: translations.en,
        tAr: translations.ar,
        isRtl,
        isBoth,
        getText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
