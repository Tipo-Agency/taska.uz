import { useEffect } from 'react';

const DEFAULT_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

/** Служебные страницы не должны попадать в выдачу как отдельные URL. */
export function useNoIndexMeta(): void {
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previous = meta?.getAttribute('content') ?? null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');
    return () => {
      meta?.setAttribute('content', previous ?? DEFAULT_ROBOTS);
    };
  }, []);
}
