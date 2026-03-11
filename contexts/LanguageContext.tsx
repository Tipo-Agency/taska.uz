import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lang, getStoredLang, setStoredLang, t as translate } from '../translations';

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru');

  useEffect(() => {
    const l = getStoredLang();
    setLangState(l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l === 'uz' ? 'uz' : 'ru-UZ';
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    setStoredLang(l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l === 'uz' ? 'uz' : 'ru-UZ';
    }
  };

  const t = (key: string) => translate(lang, key);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
