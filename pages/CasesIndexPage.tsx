import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import { CASE_SLUGS, type CaseSlug } from '../config/cases';
import { paths } from '../routes/paths';
import type { AppOutletContext } from '../layouts/AppLayout';

const CasesIndexPage: React.FC = () => {
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  return (
    <MarketingPageShell
      accent="sky"
      kicker={t('cases.kicker')}
      title={t('cases.indexTitle')}
      lead={t('cases.indexSubtitle')}
      onOpenModal={openModal}
      contentMaxWidth="5xl"
    >
      <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
        {CASE_SLUGS.map((slug: CaseSlug, index) => (
          <motion.article
            key={slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Link
              to={paths.case(slug)}
              className="group block h-full rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-sky-50/25 p-6 md:p-8 shadow-sm hover:border-sky-300/70 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-ink group-hover:text-sky-800 transition-colors leading-tight">
                  {t(`cases.${slug}.menu`)}
                </h2>
                <span className="shrink-0 rounded-full border border-slate-200/90 p-2.5 text-ink-muted group-hover:border-sky-300 group-hover:bg-sky-50 group-hover:text-sky-700 transition-all">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <p className="text-ink-muted text-sm md:text-base leading-relaxed line-clamp-3">{t(`cases.${slug}.lead`)}</p>
            </Link>
          </motion.article>
        ))}
      </div>
    </MarketingPageShell>
  );
};

export default CasesIndexPage;
