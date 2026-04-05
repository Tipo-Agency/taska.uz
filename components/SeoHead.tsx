import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { SITE_ORIGIN, absoluteCanonicalUrl, resolvePageSeo } from '../config/resolvePageSeo';

export const SeoHead: React.FC = () => {
  const { pathname } = useLocation();
  const { t, lang } = useLanguage();

  const { title, description } = useMemo(() => resolvePageSeo(pathname, t), [pathname, t]);
  const canonical = absoluteCanonicalUrl(pathname);
  const ogLocale = lang === 'uz' ? 'uz_UZ' : lang === 'en' ? 'en_US' : 'ru_UZ';
  const ogImage = `${SITE_ORIGIN}/og-image.jpg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:site_name" content="Taska.uz" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
