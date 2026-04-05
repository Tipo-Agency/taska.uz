import { isCaseSlug } from './cases';
import { isNewsId } from './news';
import { isModuleId, isSolutionSlug } from './siteNavigation';

export const SITE_ORIGIN = import.meta.env.VITE_SITE_ORIGIN ?? 'https://taska.uz';

export type TranslateFn = (key: string) => string;

function truncateDesc(s: string, max = 160): string {
  const t = s.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
}

function withBrand(pageTitle: string, t: TranslateFn): string {
  const brand = t('seo.brandSuffix');
  return `${pageTitle} ${brand}`.replace(/\s+/g, ' ').trim();
}

/**
 * Заголовок и description для document / OG по пути (без query).
 */
export function resolvePageSeo(pathname: string, t: TranslateFn): { title: string; description: string } {
  const path = pathname || '/';
  if (path === '/') {
    return {
      title: t('seo.home.title'),
      description: t('seo.home.description'),
    };
  }

  const parts = path.split('/').filter(Boolean);
  const [a, b] = parts;

  const fallbackDesc = () => t('seo.fallbackDescription');

  if (parts.length === 1) {
    switch (a) {
      case 'login':
        return { title: withBrand(t('login.title'), t), description: t('seo.login.description') };
      case 'privacy':
        return {
          title: withBrand(t('legal.privacy.title'), t),
          description: truncateDesc(t('legal.privacy.intro')),
        };
      case 'terms':
        return {
          title: withBrand(t('legal.terms.title'), t),
          description: truncateDesc(t('legal.terms.intro')),
        };
      case 'cookies':
        return {
          title: withBrand(t('legal.cookies.title'), t),
          description: truncateDesc(t('legal.cookies.updated')),
        };
      case 'education':
        return {
          title: withBrand(t('service.education.title'), t),
          description: truncateDesc(t('service.education.lead')),
        };
      case 'investors':
        return {
          title: withBrand(t('service.investors.title'), t),
          description: truncateDesc(t('service.investors.lead')),
        };
      case 'partners':
        return {
          title: withBrand(t('service.partners.title'), t),
          description: truncateDesc(t('service.partners.lead')),
        };
      case 'work':
        return { title: withBrand(t('work.title'), t), description: truncateDesc(t('work.lead')) };
      case 'cases':
        return {
          title: withBrand(t('cases.indexTitle'), t),
          description: truncateDesc(t('cases.indexSubtitle')),
        };
      case 'news':
        return {
          title: withBrand(t('news.indexTitle'), t),
          description: truncateDesc(t('news.indexSubtitle')),
        };
      default:
        break;
    }
  }

  if (parts.length === 2 && a === 'cases' && b && isCaseSlug(b)) {
    return {
      title: withBrand(t(`cases.${b}.title`), t),
      description: truncateDesc(t(`cases.${b}.lead`)),
    };
  }

  if (parts.length === 2 && a === 'news' && b && isNewsId(b)) {
    return {
      title: withBrand(t(`news.${b}.title`), t),
      description: truncateDesc(t(`news.${b}.excerpt`)),
    };
  }

  if (parts.length === 2 && a === 'modules' && b && isModuleId(b)) {
    return {
      title: withBrand(t(`modules.${b}.title`), t),
      description: truncateDesc(t(`modules.${b}.desc`)),
    };
  }

  if (parts.length === 2 && a === 'solutions' && b && isSolutionSlug(b)) {
    return {
      title: withBrand(t(`solutions.${b}.title`), t),
      description: truncateDesc(t(`solutions.${b}.lead`)),
    };
  }

  if (a === '404' || path.includes('not-found')) {
    return { title: withBrand(t('notFound.title'), t), description: fallbackDesc() };
  }

  return {
    title: withBrand(t('notFound.title'), t),
    description: fallbackDesc(),
  };
}

export function canonicalPath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function absoluteCanonicalUrl(pathname: string): string {
  return `${SITE_ORIGIN}${canonicalPath(pathname)}`;
}
