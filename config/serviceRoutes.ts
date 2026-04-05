import { paths } from '../routes/paths';

/** Пункты выпадающего меню «Компания» в шапке. */
export const companyNavItems = [
  { to: paths.work, labelKey: 'nav.work' as const, descKey: 'header.companyDD.work' as const },
  { to: paths.cases, labelKey: 'nav.cases' as const, descKey: 'header.companyDD.cases' as const },
  { to: paths.news, labelKey: 'nav.news' as const, descKey: 'header.companyDD.news' as const },
  { to: paths.education, labelKey: 'footer.education' as const, descKey: 'header.companyDD.education' as const },
  { to: paths.investors, labelKey: 'footer.investors' as const, descKey: 'header.companyDD.investors' as const },
  { to: paths.partners, labelKey: 'footer.partners' as const, descKey: 'header.companyDD.partners' as const },
] as const;
