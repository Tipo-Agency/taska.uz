import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import { NEWS_IDS, type NewsId } from '../config/news';
import { paths } from '../routes/paths';
import type { AppOutletContext } from '../layouts/AppLayout';

const NewsIndexPage: React.FC = () => {
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  return (
    <MarketingPageShell
      accent="amber"
      kicker={t('news.kicker')}
      title={t('news.indexTitle')}
      lead={t('news.indexSubtitle')}
      onOpenModal={openModal}
      contentMaxWidth="3xl"
    >
      <ul className="space-y-5">
        {NEWS_IDS.map((id: NewsId, index) => (
          <motion.li
            key={id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
            <article className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-amber-50/20 p-6 md:p-8 shadow-sm hover:border-amber-200/80 hover:shadow-lg transition-all duration-300">
              <time className="text-xs font-semibold text-amber-800/90 tabular-nums block mb-2">{t(`news.${id}.date`)}</time>
              <h2 className="text-xl md:text-2xl font-bold text-ink mb-2 leading-tight">
                <Link to={paths.newsArticle(id)} className="hover:text-amber-900 transition-colors">
                  {t(`news.${id}.title`)}
                </Link>
              </h2>
              <p className="text-ink-muted text-sm md:text-[15px] leading-relaxed mb-4">{t(`news.${id}.excerpt`)}</p>
              <Link to={paths.newsArticle(id)} className="text-sm font-semibold text-brand hover:underline inline-flex items-center gap-1">
                {t('news.readMore')} <span aria-hidden>→</span>
              </Link>
            </article>
          </motion.li>
        ))}
      </ul>
    </MarketingPageShell>
  );
};

export default NewsIndexPage;
