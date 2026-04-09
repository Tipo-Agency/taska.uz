import React from 'react';
import { motion } from 'framer-motion';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';

const SECTION_KEYS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12'] as const;

const PrivacyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <MarketingPageShell
      accent="slate"
      kicker={t('legal.privacy.kicker')}
      title={t('legal.privacy.title')}
      lead={t('legal.privacy.updated')}
      heroAlign="left"
      compact
      contentMaxWidth="3xl"
    >
      <div className="space-y-5 md:space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-ink-muted leading-relaxed text-[15px] md:text-base rounded-3xl border border-slate-200/80 bg-white/90 px-6 py-5 md:px-8 md:py-6 shadow-sm"
        >
          {t('legal.privacy.intro')}
        </motion.p>

        {SECTION_KEYS.map((k, i) => (
          <motion.section
            key={k}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/50 px-6 py-6 md:px-8 md:py-7 shadow-sm"
          >
            <h2 className="text-lg md:text-xl font-bold text-ink mb-3">{t(`legal.privacy.${k}Title`)}</h2>
            <p className="text-ink-muted leading-relaxed text-[15px] md:text-base">{t(`legal.privacy.${k}Body`)}</p>
          </motion.section>
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm text-ink-muted leading-relaxed border-t border-slate-200/80 pt-8 mt-2"
        >
          {t('legal.privacy.disclaimer')}
        </motion.p>
      </div>
    </MarketingPageShell>
  );
};

export default PrivacyPage;
