import type { CaseSlug } from '../config/cases';
import type { NewsId } from '../config/news';
import type { ModuleId, SolutionSlug } from '../config/siteNavigation';

export const paths = {
  home: '/',
  login: '/login',
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies',
  education: '/education',
  investors: '/investors',
  partners: '/partners',
  work: '/work',
  cases: '/cases',
  case: (slug: CaseSlug) => `/cases/${slug}` as const,
  news: '/news',
  newsArticle: (id: NewsId) => `/news/${id}` as const,
  module: (id: ModuleId) => `/modules/${id}` as const,
  solution: (slug: SolutionSlug) => `/solutions/${slug}` as const,
};
