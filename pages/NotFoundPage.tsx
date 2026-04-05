import React from 'react';
import { Link } from 'react-router-dom';
import { useNoIndexMeta } from '../hooks/useNoIndexMeta';
import { useLanguage } from '../contexts/LanguageContext';
import { paths } from '../routes/paths';

const NotFoundPage: React.FC = () => {
  useNoIndexMeta();
  const { t } = useLanguage();

  return (
    <main className="pt-40 pb-32">
      <div className="container mx-auto px-4 text-center max-w-lg">
        <p className="text-6xl font-black text-brand/20 mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{t('notFound.title')}</h1>
        <p className="text-gray-600 mb-8">{t('notFound.lead')}</p>
        <Link
          to={paths.home}
          className="inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 hover:bg-brand-dark transition-colors"
        >
          {t('notFound.home')}
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
