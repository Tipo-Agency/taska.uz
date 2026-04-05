import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/Button';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import { trackMetrikaGoal } from '../services/metrics';
import type { AppOutletContext } from '../layouts/AppLayout';

const SECTION_KEYS = ['s1', 's2', 's3', 's4', 's5'] as const;

const WorkOrganizationPage: React.FC = () => {
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  const heroActions = (
    <>
      <Button size="md" className="w-full sm:w-auto min-w-[180px]" onClick={openModal} icon={<ArrowRight size={18} />}>
        {t('work.cta')}
      </Button>
      <a
        href="https://demo.taska.uz"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto"
        onClick={() => trackMetrikaGoal('demo_click')}
      >
        <Button variant="secondary" size="md" className="w-full sm:w-auto min-w-[180px] gap-2" icon={<ExternalLink size={17} />}>
          {t('hero.demo')}
        </Button>
      </a>
    </>
  );

  return (
    <MarketingPageShell
      accent="emerald"
      kicker={t('work.kicker')}
      title={t('work.title')}
      lead={t('work.lead')}
      heroActions={heroActions}
      onOpenModal={openModal}
      contentMaxWidth="3xl"
    >
      <div className="space-y-5 md:space-y-6">
        {SECTION_KEYS.map((k, i) => (
          <motion.section
            key={k}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-emerald-50/20 px-6 py-6 md:px-8 md:py-8 shadow-sm hover:border-emerald-200/60 hover:shadow-lg transition-all duration-300"
          >
            <h2 className="text-lg md:text-xl font-bold text-ink mb-3">{t(`work.${k}Title`)}</h2>
            <p className="text-ink-muted leading-relaxed whitespace-pre-line text-[15px] md:text-base">{t(`work.${k}Body`)}</p>
          </motion.section>
        ))}
      </div>
    </MarketingPageShell>
  );
};

export default WorkOrganizationPage;
