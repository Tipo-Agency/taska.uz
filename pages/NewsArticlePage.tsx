import React from 'react';
import { Navigate, useOutletContext, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import { isNewsId, type NewsId } from '../config/news';
import { paths } from '../routes/paths';
import type { AppOutletContext } from '../layouts/AppLayout';

const PARA_KEYS = ['p1', 'p2', 'p3', 'p4'] as const;

const NewsArticlePage: React.FC = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  if (!id || !isNewsId(id)) {
    return <Navigate to="/404" replace />;
  }

  const key = id as NewsId;

  return (
    <MarketingPageShell
      accent="amber"
      kicker={t('news.kicker')}
      title={t(`news.${key}.title`)}
      backLink={{ to: paths.news, label: t('news.backToList') }}
      heroAlign="left"
      compact
      onOpenModal={openModal}
      contentMaxWidth="3xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-slate-200/80 bg-white/95 px-6 py-8 md:px-10 md:py-10 shadow-sm"
      >
        <time className="text-xs font-semibold text-ink-muted tabular-nums block mb-6">{t(`news.${key}.date`)}</time>
        <div className="space-y-6 text-ink-muted leading-relaxed text-[15px] md:text-base">
          {PARA_KEYS.map((k, i) => (
            <motion.p key={k} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              {t(`news.${key}.${k}`)}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </MarketingPageShell>
  );
};

export default NewsArticlePage;
