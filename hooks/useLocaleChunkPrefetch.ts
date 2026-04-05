import { useEffect } from 'react';
import type { Lang } from '../translations';

/**
 * Подгружает в фоне чанки локалей, которые пользователь с большой вероятностью выберет.
 * Ориентир — `navigator.language` / `navigator.languages`, без гео и IP.
 * Текущий язык из localStorage не подменяем: только прогрев кэша модулей.
 */
export function useLocaleChunkPrefetch(activeLang: Lang): void {
  useEffect(() => {
    const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : '';
    const list = typeof navigator !== 'undefined' ? (navigator.languages ?? []).map((l) => l.toLowerCase()) : [];

    const prefers = (code: string) =>
      nav.startsWith(code) || list.some((l) => l.startsWith(code));

    const idle =
      typeof requestIdleCallback !== 'undefined'
        ? (cb: () => void) => requestIdleCallback(() => cb(), { timeout: 2500 })
        : (cb: () => void) => setTimeout(cb, 800);

    idle(() => {
      if (activeLang !== 'ru' && (prefers('ru') || prefers('uk'))) {
        void import('../locales/ru.json');
      }
      if (activeLang !== 'uz' && prefers('uz')) {
        void import('../locales/uz.json');
      }
      if (activeLang !== 'en' && (prefers('en') || nav === 'en-us')) {
        void import('../locales/loadEnglish').then((m) => m.loadEnglishLocale());
      }
    });
  }, [activeLang]);
}
