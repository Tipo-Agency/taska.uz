import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Dumbbell,
  Factory,
  Home,
  Laptop,
  Megaphone,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CASE_SLUGS, type CaseSlug } from '../config/cases';
import { paths } from '../routes/paths';

const CASE_VISUAL: Record<
  CaseSlug,
  { icon: LucideIcon; gradient: string; glow: string; blob: string }
> = {
  fitness: {
    icon: Dumbbell,
    gradient: 'from-rose-500 to-orange-500',
    glow: 'shadow-rose-500/25',
    blob: 'bg-rose-400/25',
  },
  production: {
    icon: Factory,
    gradient: 'from-amber-500 to-amber-800',
    glow: 'shadow-amber-500/25',
    blob: 'bg-amber-400/20',
  },
  marketing: {
    icon: Megaphone,
    gradient: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/25',
    blob: 'bg-violet-400/20',
  },
  it: {
    icon: Laptop,
    gradient: 'from-indigo-500 to-blue-700',
    glow: 'shadow-indigo-500/25',
    blob: 'bg-indigo-400/20',
  },
  delivery: {
    icon: Truck,
    gradient: 'from-sky-500 to-cyan-600',
    glow: 'shadow-sky-500/25',
    blob: 'bg-sky-400/22',
  },
  household: {
    icon: Home,
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/25',
    blob: 'bg-emerald-400/20',
  },
};

export const HomeCasesTeaser: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home-cases" className="py-24 md:py-28 relative overflow-hidden bg-canvas border-t border-slate-200/60">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:44px_44px] opacity-[0.14] pointer-events-none" />
      <div className="absolute -left-24 top-1/4 w-[min(100%,420px)] h-[420px] rounded-full bg-gradient-to-br from-sky-500/12 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[min(100%,480px)] h-[480px] bg-gradient-to-tl from-brand/[0.09] to-transparent blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-3">{t('home.teaser.casesKicker')}</p>
            <h2 className="text-3xl md:text-5xl font-bold text-ink tracking-tight leading-[1.08] mb-4">
              {t('home.teaser.casesTitle')}
            </h2>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed">{t('home.teaser.casesLead')}</p>
          </div>
          <Link
            to={paths.cases}
            className="inline-flex items-center justify-center gap-2 self-start lg:self-auto rounded-2xl border border-slate-200/90 bg-white/90 px-5 py-3.5 text-sm font-bold text-ink shadow-sm hover:border-brand/35 hover:bg-brand/[0.04] hover:text-brand transition-all group"
          >
            {t('home.teaser.allCases')}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {CASE_SLUGS.map((slug, index) => {
            const v = CASE_VISUAL[slug];
            const Icon = v.icon;
            return (
              <motion.article
                key={slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <Link
                  to={paths.case(slug)}
                  className="group relative flex flex-col h-full rounded-[1.35rem] border border-slate-200/90 bg-white/95 backdrop-blur-sm p-5 md:p-6 shadow-[0_22px_55px_-34px_rgba(15,23,42,0.16)] hover:shadow-[0_28px_70px_-28px_rgba(15,23,42,0.2)] hover:border-slate-300/90 transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl opacity-70 ${v.blob}`}
                    aria-hidden
                  />
                  <div className="relative z-10 flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`inline-flex p-3.5 rounded-2xl bg-gradient-to-br ${v.gradient} text-white shadow-lg ${v.glow} group-hover:scale-[1.06] transition-transform duration-300`}
                    >
                      <Icon size={26} strokeWidth={2} />
                    </div>
                    <span className="w-10 h-10 rounded-xl border border-slate-200/90 bg-white/90 flex items-center justify-center text-slate-400 group-hover:text-brand group-hover:border-brand/30 transition-colors shrink-0">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                  <h3 className="relative z-10 text-lg md:text-xl font-bold text-ink leading-snug mb-2 group-hover:text-brand transition-colors">
                    {t(`cases.${slug}.menu`)}
                  </h3>
                  <p className="relative z-10 text-sm text-ink-muted leading-relaxed line-clamp-3 flex-1">{t(`cases.${slug}.lead`)}</p>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
