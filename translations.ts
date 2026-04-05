export type Lang = 'ru' | 'uz' | 'en';

const STORAGE_KEY = 'taska_lang';

export function getStoredLang(): Lang {
  if (typeof window === 'undefined') return 'ru';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'uz' || stored === 'ru' || stored === 'en') return stored;
  return 'ru';
}

export function setStoredLang(lang: Lang): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, lang);
}
