import React from 'react';
import { Navigate, useOutletContext, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/Button';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import { isCaseSlug, type CaseSlug } from '../config/cases';
import { paths } from '../routes/paths';
import { trackMetrikaGoal } from '../services/metrics';
import type { AppOutletContext } from '../layouts/AppLayout';

const PAIN_KEYS = ['pain1', 'pain2', 'pain3'] as const;
const OUT_KEYS = ['out1', 'out2', 'out3'] as const;
const EX_KEYS = ['ex1', 'ex2', 'ex3'] as const;

const CasePage: React.FC = () => {
  const { slug } = useParams();
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  if (!slug || !isCaseSlug(slug)) {
    return <Navigate to="/404" replace />;
  }

  const key = slug as CaseSlug;
  const bullets = [t(`cases.${key}.b1`), t(`cases.${key}.b2`), t(`cases.${key}.b3`), t(`cases.${key}.b4`)];

  const heroActions = (
    <>
      <Button size="md" className="w-full sm:w-auto min-w-[180px]" onClick={openModal} icon={<ArrowRight size={18} />}>
        {t('cases.cta')}
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
      accent="sky"
      kicker={t('cases.kicker')}
      title={t(`cases.${key}.title`)}
      lead={t(`cases.${key}.lead`)}
      backLink={{ to: paths.cases, label: t('cases.backToList') }}
      heroAlign="left"
      heroActions={heroActions}
      onOpenModal={openModal}
      contentMaxWidth="3xl"
    >
      <p className="text-ink leading-relaxed border-l-4 border-sky-400/80 pl-5 py-3 mb-12 md:mb-14 rounded-r-2xl bg-gradient-to-r from-sky-50/90 to-white shadow-sm text-[15px] md:text-base">
        {t(`cases.${key}.forWho`)}
      </p>

      <section className="mb-12 md:mb-14">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-900/70 mb-5">{t('cases.section.context')}</h2>
        <ul className="space-y-3">
          {PAIN_KEYS.map((k, i) => (
            <motion.li
              key={k}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 text-ink leading-relaxed rounded-2xl border border-amber-100/90 bg-amber-50/40 px-5 py-4 shadow-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" aria-hidden />
              <span className="text-[15px]">{t(`cases.${key}.${k}`)}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="mb-12 md:mb-14">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-900/70 mb-5">{t('cases.section.how')}</h2>
        <ul className="space-y-3">
          {bullets.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 text-ink leading-relaxed rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-500 shrink-0" aria-hidden />
              <span className="text-[15px]">{line}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="mb-12 md:mb-14">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-900/70 mb-5">{t('cases.section.result')}</h2>
        <ul className="space-y-3">
          {OUT_KEYS.map((k, i) => (
            <motion.li
              key={k}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 text-ink leading-relaxed rounded-2xl border border-emerald-100/90 bg-emerald-50/35 px-5 py-4 shadow-sm"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden />
              <span className="text-[15px]">{t(`cases.${key}.${k}`)}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-sky-900/70 mb-5">{t('cases.section.examples')}</h2>
        <div className="space-y-4">
          {EX_KEYS.map((k, i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-white to-sky-50/20 px-5 py-5 md:px-6 md:py-6 shadow-sm"
            >
              <span className="text-xs font-bold text-sky-700 tabular-nums mb-2 block">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-ink-muted leading-relaxed text-[15px]">{t(`cases.${key}.${k}`)}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </MarketingPageShell>
  );
};

export default CasePage;
