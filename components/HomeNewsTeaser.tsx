import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Newspaper } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { NEWS_IDS, type NewsId } from '../config/news';
import { paths } from '../routes/paths';

const NEWS_ACCENT: Record<NewsId, { bar: string; soft: string }> = {
  'analytics-dashboards': { bar: 'from-sky-500 to-cyan-500', soft: 'from-sky-500/12 to-cyan-500/5' },
  'weekly-plans-meetings': { bar: 'from-amber-500 to-orange-500', soft: 'from-amber-500/12 to-orange-500/5' },
  'telegram-automation': { bar: 'from-brand to-emerald-600', soft: 'from-brand/15 to-emerald-500/8' },
};

export const HomeNewsTeaser: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home-news" className="py-24 md:py-28 relative overflow-hidden bg-slate-950 text-white border-t border-white/10">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.4),rgba(15,23,42,0.92))]" />
      <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-[0.07] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,900px)] h-[320px] bg-gradient-to-b from-brand/25 via-emerald-600/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 md:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300/95 mb-5">
              <Newspaper size={14} className="text-emerald-400" />
              {t('home.teaser.newsKicker')}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.08] mb-4 text-white">
              {t('home.teaser.newsTitle')}
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">{t('home.teaser.newsLead')}</p>
          </div>
          <Link
            to={paths.news}
            className="inline-flex items-center justify-center gap-2 self-start lg:self-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3.5 text-sm font-bold text-white hover:bg-white/15 hover:border-white/30 transition-all group"
          >
            {t('home.teaser.allNews')}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {NEWS_IDS.map((id, index) => {
            const a = NEWS_ACCENT[id];
            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Link
                  to={paths.newsArticle(id)}
                  className="group relative flex flex-col h-full rounded-[1.35rem] border border-white/10 bg-white/[0.06] backdrop-blur-md p-6 md:p-7 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.5)] hover:border-white/20 hover:bg-white/[0.09] transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${a.bar} opacity-90`}
                    aria-hidden
                  />
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full opacity-40 blur-2xl bg-gradient-to-br ${a.soft}`}
                    aria-hidden
                  />
                  <time className="relative z-10 text-xs font-semibold text-slate-500 tabular-nums tracking-wide mb-3">{t(`news.${id}.date`)}</time>
                  <h3 className="relative z-10 text-lg md:text-xl font-bold text-white leading-snug mb-3 group-hover:text-emerald-200 transition-colors">
                    {t(`news.${id}.title`)}
                  </h3>
                  <p className="relative z-10 text-sm text-slate-400 leading-relaxed line-clamp-3 flex-1">{t(`news.${id}.excerpt`)}</p>
                  <span className="relative z-10 mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 group-hover:text-emerald-300">
                    {t('news.readMore')}
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
