import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Lang, getStoredLang, setStoredLang } from '../translations';
import { LocaleSkeleton } from '../components/LocaleSkeleton';
import { useLocaleChunkPrefetch } from '../hooks/useLocaleChunkPrefetch';

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function documentHtmlLang(l: Lang): string {
  if (l === 'uz') return 'uz';
  if (l === 'en') return 'en';
  return 'ru-UZ';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => getStoredLang());
  const [dict, setDict] = useState<Record<string, string> | null>(null);
  const [ruFallback, setRuFallback] = useState<Record<string, string> | null>(null);

  useLocaleChunkPrefetch(lang);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (lang === 'en') {
        const { loadEnglishLocale } = await import('../locales/loadEnglish');
        const [enDict, ru] = await Promise.all([
          loadEnglishLocale(),
          import('../locales/ru.json'),
        ]);
        if (!cancelled) {
          setDict(enDict);
          setRuFallback(ru.default as Record<string, string>);
        }
        return;
      }

      setDict(null);

      if (lang === 'ru') {
        const ru = await import('../locales/ru.json');
        if (!cancelled) {
          const d = ru.default as Record<string, string>;
          setDict(d);
          setRuFallback(d);
        }
        return;
      }

      const [uzMod, ruMod] = await Promise.all([
        import('../locales/uz.json'),
        import('../locales/ru.json'),
      ]);
      if (!cancelled) {
        setDict(uzMod.default as Record<string, string>);
        setRuFallback(ruMod.default as Record<string, string>);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = documentHtmlLang(lang);
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    setStoredLang(l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = documentHtmlLang(l);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      if (lang === 'en') {
        if (!dict) return key;
        if (dict[key]) return dict[key];
        return ruFallback?.[key] ?? key;
      }
      if (!dict) return key;
      if (lang === 'uz') {
        return dict[key] ?? ruFallback?.[key] ?? key;
      }
      return dict[key] ?? key;
    },
    [lang, dict, ruFallback],
  );

  if (dict === null) {
    return <LocaleSkeleton />;
  }

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
