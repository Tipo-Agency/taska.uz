import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Сбрасывает скролл при смене страницы (не при смене только hash на той же странице). */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
