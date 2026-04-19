import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../constants/motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from './Button';
import { CtaBand } from './CtaBand';
import { ClientLogos } from './ClientLogos';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';
import { TelegramSection } from './TelegramSection';
import { paths } from '../routes/paths';
import { trackDemoClick } from '../services/analytics';
import { useLanguage } from '../contexts/LanguageContext';

export type MarketingAccent = 'emerald' | 'sky' | 'amber' | 'indigo' | 'cyan' | 'violet' | 'slate';

const ACCENTS: Record<MarketingAccent, { b1: string; b2: string; bar: string }> = {
  emerald: {
    b1: 'bg-emerald-400/14',
    b2: 'bg-teal-400/10',
    bar: 'from-emerald-500 to-teal-600',
  },
  sky: {
    b1: 'bg-sky-400/14',
    b2: 'bg-cyan-400/10',
    bar: 'from-sky-500 to-cyan-600',
  },
  amber: {
    b1: 'bg-amber-400/14',
    b2: 'bg-orange-400/10',
    bar: 'from-amber-500 to-orange-500',
  },
  indigo: {
    b1: 'bg-indigo-400/14',
    b2: 'bg-violet-400/10',
    bar: 'from-indigo-500 to-violet-600',
  },
  cyan: {
    b1: 'bg-cyan-400/14',
    b2: 'bg-sky-400/10',
    bar: 'from-cyan-500 to-sky-600',
  },
  violet: {
    b1: 'bg-violet-400/14',
    b2: 'bg-fuchsia-400/10',
    bar: 'from-violet-500 to-fuchsia-600',
  },
  slate: {
    b1: 'bg-slate-400/12',
    b2: 'bg-slate-500/10',
    bar: 'from-slate-600 to-slate-800',
  },
};

export type MarketingPageShellProps = {
  accent: MarketingAccent;
  kicker: string;
  title: string;
  lead?: string;
  /** Default: home */
  backLink?: { to: string; label: string };
  /** Centered hero (list pages) vs left (long reads) */
  heroAlign?: 'center' | 'left';
  /** Smaller hero for article-style pages */
  compact?: boolean;
  /** Content column max width */
  contentMaxWidth?: '3xl' | '4xl' | '5xl' | '6xl';
  heroActions?: React.ReactNode;
  children: React.ReactNode;
  onOpenModal?: () => void;
  /** Telegram, ContactForm, FAQ + final CTA */
  showFooterStack?: boolean;
  /** Default true */
  showClientLogos?: boolean;
};

const CONTENT_MAX: Record<NonNullable<MarketingPageShellProps['contentMaxWidth']>, string> = {
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
};

export const MarketingPageShell: React.FC<MarketingPageShellProps> = ({
  accent,
  kicker,
  title,
  lead,
  backLink = { to: paths.home, label: '' },
  heroAlign = 'center',
  compact = false,
  contentMaxWidth = '3xl',
  heroActions,
  children,
  onOpenModal,
  showFooterStack = true,
  showClientLogos = true,
}) => {
  const { t } = useLanguage();
  const backLabel = backLink.label || t('modulePage.back');
  const a = ACCENTS[accent];
  const isCenter = heroAlign === 'center';
  const titleClass = compact
    ? 'text-3xl md:text-4xl lg:text-[2.75rem]'
    : 'text-4xl md:text-5xl lg:text-6xl';

  return (
    <main className="bg-canvas">
      <section
        className={`relative overflow-hidden bg-canvas bg-mesh-canvas ${
          compact ? 'pt-28 pb-10 md:pb-14' : 'pt-28 pb-14 md:pb-20 min-h-[min(72vh,42rem)] flex flex-col justify-center'
        }`}
      >
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.35] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
        <div className={`absolute top-1/4 -left-24 w-[420px] h-[420px] ${a.b1} blur-[100px] rounded-full`} />
        <div className={`absolute bottom-0 -right-24 w-[520px] h-[520px] ${a.b2} blur-[110px] rounded-full`} />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to={backLink.to}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-brand mb-6 md:mb-8 transition-colors duration-200"
          >
            <span aria-hidden="true">←</span>
            {backLabel}
          </Link>

          <div className={isCenter ? 'max-w-4xl mx-auto text-center' : 'max-w-3xl'}>
            <motion.p {...fadeUp(12)} className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-3 md:mb-4">
              {kicker}
            </motion.p>
            <motion.h1 {...fadeUp(16)} transition={{ delay: 0.05 }} className={`${titleClass} font-bold text-ink leading-[1.1] tracking-tight mb-4 md:mb-5`}>
              {title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.12 }}
              className={`h-1.5 w-20 md:w-28 rounded-full bg-gradient-to-r ${a.bar} mb-5 md:mb-6 ${isCenter ? 'mx-auto' : ''}`}
              aria-hidden="true"
            />
            {lead ? (
              <motion.p
                {...fadeUp(14)}
                transition={{ delay: 0.1 }}
                className={`text-lg md:text-xl text-ink-muted leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'} mb-6 md:mb-8`}
              >
                {lead}
              </motion.p>
            ) : null}
            {heroActions ? (
              <motion.div
                {...fadeUp(12)}
                transition={{ delay: 0.15 }}
                className={isCenter ? 'flex flex-col sm:flex-row items-center justify-center gap-3' : 'flex flex-col sm:flex-row gap-3'}
              >
                {heroActions}
              </motion.div>
            ) : null}
          </div>
        </div>
      </section>

      {showClientLogos ? <ClientLogos /> : null}

      <div className={`container mx-auto px-4 ${CONTENT_MAX[contentMaxWidth]} py-14 md:py-20`}>
        {children}
      </div>

      {onOpenModal ? (
        <section className="py-16 bg-canvas border-t border-slate-200/60">
          <div className="container mx-auto px-4 max-w-5xl">
            <CtaBand
              title={t('cta.demoTitle')}
              subtitle={t('cta.demoSubtitle')}
              primaryLabel={t('cta.leaveRequest')}
              onPrimary={onOpenModal}
            />
          </div>
        </section>
      ) : null}

      {showFooterStack && onOpenModal ? (
        <>
          <TelegramSection onOpenModal={onOpenModal} />
          <ContactForm />
          <FAQ />
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="bg-brand rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl max-w-6xl mx-auto">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full pointer-events-none -mr-20 -mt-20" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 blur-[80px] rounded-full pointer-events-none -ml-10 -mb-10" />
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="text-left max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {t('cta.finalTitle')} <br /> {t('cta.finalTitle2')}
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl font-medium">{t('cta.finalSubtitle')}</p>
                  </div>
                  <div className="shrink-0 flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={onOpenModal}
                      size="md"
                      className="bg-white !text-brand hover:bg-gray-100 border-none shadow-xl w-full sm:w-auto"
                      icon={<ArrowRight size={20} />}
                    >
                      {t('cta.discussProject')}
                    </Button>
                    <a
                      href="https://demo.taska.uz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto"
                      onClick={() => trackDemoClick()}
                    >
                      <Button variant="outline" className="w-full sm:w-auto border-white/40 bg-transparent text-white hover:bg-white/10">
                        {t('hero.demo')}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
};
