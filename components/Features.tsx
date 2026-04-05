import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Briefcase,
  CheckSquare,
  DollarSign,
  FileText,
  Sparkles,
  Users,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Features: React.FC = () => {
  const { t } = useLanguage();
  const modules = [
    {
      title: t('features.taskManager'),
      desc: t('features.taskManagerDesc'),
      icon: CheckSquare,
      size: 'large' as const,
      glow: 'shadow-[0_0_60px_-12px_rgba(14,165,233,0.45)]',
      iconWrap: 'bg-gradient-to-br from-sky-400 to-blue-600 text-white',
      rim: 'from-sky-500/40 via-blue-500/20 to-transparent',
      preview: 'kanban' as const,
    },
    {
      title: t('features.finance'),
      desc: t('features.financeDesc'),
      icon: DollarSign,
      size: 'small' as const,
      glow: 'shadow-[0_0_48px_-14px_rgba(16,185,129,0.4)]',
      iconWrap: 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white',
      rim: 'from-emerald-500/35 via-teal-500/15 to-transparent',
      preview: 'bars' as const,
    },
    {
      title: t('features.crmBase'),
      desc: t('features.crmBaseDesc'),
      icon: Users,
      size: 'small' as const,
      glow: 'shadow-[0_0_48px_-14px_rgba(139,92,246,0.4)]',
      iconWrap: 'bg-gradient-to-br from-violet-400 to-purple-600 text-white',
      rim: 'from-violet-500/35 via-purple-500/15 to-transparent',
      preview: 'avatars' as const,
    },
    {
      title: t('features.telegramBot'),
      desc: t('features.telegramBotDesc'),
      icon: Bot,
      size: 'tall' as const,
      glow: 'shadow-[0_0_56px_-12px_rgba(22,163,74,0.45)]',
      iconWrap: 'bg-gradient-to-br from-brand to-emerald-700 text-white',
      rim: 'from-brand/50 via-emerald-500/25 to-transparent',
      preview: 'pulse' as const,
    },
    {
      title: t('features.documents'),
      desc: t('features.documentsDesc'),
      icon: FileText,
      size: 'small' as const,
      glow: 'shadow-[0_0_40px_-14px_rgba(245,158,11,0.35)]',
      iconWrap: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white',
      rim: 'from-amber-500/35 via-orange-400/15 to-transparent',
      preview: 'doc' as const,
    },
    {
      title: t('features.hrKpi'),
      desc: t('features.hrKpiDesc'),
      icon: Briefcase,
      size: 'small' as const,
      glow: 'shadow-[0_0_40px_-14px_rgba(244,63,94,0.35)]',
      iconWrap: 'bg-gradient-to-br from-rose-400 to-pink-600 text-white',
      rim: 'from-rose-500/35 via-pink-500/15 to-transparent',
      preview: 'kpi' as const,
    },
    {
      title: t('features.ceoDashboard'),
      desc: t('features.ceoDashboardDesc'),
      icon: BarChart3,
      size: 'wide' as const,
      glow: 'shadow-[0_0_56px_-14px_rgba(100,116,139,0.35)]',
      iconWrap: 'bg-gradient-to-br from-slate-600 to-slate-900 text-white',
      rim: 'from-slate-500/40 via-slate-700/15 to-transparent',
      preview: 'chart' as const,
    },
  ];

  function ModulePreview({ kind }: { kind: (typeof modules)[number]['preview'] }) {
    switch (kind) {
      case 'kanban':
        return (
          <div className="mt-5 flex gap-2">
            {[
              ['bg-sky-500', 70],
              ['bg-violet-500', 45],
              ['bg-emerald-500', 55],
            ].map(([c, w], i) => (
              <div key={i} className="flex-1 rounded-xl bg-slate-900/[0.04] border border-slate-200/80 p-2 backdrop-blur-sm">
                <div className={`h-1 rounded-full ${c} mb-2 opacity-90`} style={{ width: `${w}%` }} />
                <div className="space-y-1.5">
                  <div className="h-2 bg-slate-200/90 rounded-md w-full" />
                  <div className="h-2 bg-slate-200/70 rounded-md w-4/5" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'bars':
        return (
          <div className="mt-5 flex items-end gap-1 h-14 px-1">
            {[35, 55, 40, 70, 50, 80, 45].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-600/90 to-emerald-400/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        );
      case 'avatars':
        return (
          <div className="mt-5 flex items-center gap-2">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-violet-200 to-purple-300 ring-1 ring-violet-200/50"
                />
              ))}
            </div>
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{t('features.previewLeads')}</div>
          </div>
        );
      case 'pulse':
        return (
          <div className="mt-auto pt-6 flex flex-col items-center gap-3">
            <div className="relative w-14 h-14 rounded-2xl bg-slate-900/[0.04] border border-slate-200/80 flex items-center justify-center">
              <span className="absolute inset-0 rounded-2xl bg-brand/15 animate-ping opacity-40" />
              <Bot size={26} className="text-brand relative z-10" />
            </div>
            <div className="w-full rounded-xl bg-slate-900/[0.03] border border-dashed border-brand/25 px-3 py-2 text-[10px] text-slate-600 text-center leading-snug">
              {t('features.previewBotLine')}
            </div>
          </div>
        );
      case 'doc':
        return (
          <div className="mt-5 rounded-xl border border-slate-200/90 bg-white/80 p-3 shadow-inner">
            <div className="flex gap-2 mb-2">
              <div className="h-2 w-12 bg-amber-200 rounded" />
              <div className="h-2 flex-1 bg-slate-100 rounded" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-slate-100 rounded w-full" />
              <div className="h-1.5 bg-slate-100 rounded w-[92%]" />
              <div className="h-1.5 bg-slate-100 rounded w-[78%]" />
            </div>
          </div>
        );
      case 'kpi':
        return (
          <div className="mt-5 flex gap-3">
            <div className="flex-1 rounded-xl bg-rose-50 border border-rose-100 p-2 text-center">
              <div className="text-lg font-bold text-rose-700 tabular-nums">94%</div>
              <div className="text-[9px] font-medium text-rose-600/80 uppercase tracking-wide">{t('features.previewOkr')}</div>
            </div>
            <div className="flex-1 rounded-xl bg-slate-50 border border-slate-200/80 p-2 flex flex-col justify-center gap-1">
              <div className="h-1.5 bg-rose-200 rounded-full overflow-hidden">
                <div className="h-full w-[78%] bg-rose-500 rounded-full" />
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-slate-500 rounded-full" />
              </div>
            </div>
          </div>
        );
      case 'chart':
        return (
          <div className="mt-5 flex flex-col sm:flex-row gap-4 items-stretch">
            <div className="flex-1 flex items-end gap-1 h-24 px-1 rounded-xl bg-slate-900/[0.03] border border-slate-200/60 p-2">
              {[30, 45, 38, 62, 55, 78, 70, 85, 72].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-slate-700 to-slate-400/80" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="sm:w-36 flex flex-col gap-2 justify-center">
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2">
                <div className="text-[9px] text-emerald-700 font-bold uppercase">{t('features.previewMargin')}</div>
                <div className="text-sm font-bold text-emerald-800 tabular-nums">+24%</div>
              </div>
              <div className="rounded-lg bg-slate-100/80 border border-slate-200/80 px-3 py-2">
                <div className="text-[9px] text-slate-500 font-bold uppercase">{t('features.previewBurn')}</div>
                <div className="text-sm font-bold text-slate-800 tabular-nums">−8%</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden bg-canvas bg-mesh-canvas border-t border-slate-200/60">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-[0.18] pointer-events-none" />
      <div className="absolute -left-32 top-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-brand/12 via-transparent to-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-[min(100%,520px)] h-[520px] bg-gradient-to-tl from-violet-500/8 via-transparent to-transparent blur-[100px] pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none hidden lg:block" aria-hidden>
        <defs>
          <linearGradient id="feat-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(22,163,74)" />
            <stop offset="100%" stopColor="rgb(14,165,233)" />
          </linearGradient>
        </defs>
        <path
          d="M 80 120 Q 280 60 520 180 T 920 140 T 1180 320"
          fill="none"
          stroke="url(#feat-line)"
          strokeWidth="1.5"
          strokeDasharray="8 14"
        />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-12 lg:gap-16 mb-16 md:mb-20">
          <div className="lg:w-[42%] lg:max-w-xl flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand shadow-sm w-fit mb-6"
            >
              <Sparkles size={14} className="text-brand" />
              {t('features.sectionKicker')}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-ink leading-[1.08] mb-5"
            >
              {t('features.heading1')}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-brand via-emerald-600 to-sky-600">
                  {t('features.heading2')}
                </span>
                <span
                  className="absolute -inset-x-1 -inset-y-0.5 bg-gradient-to-r from-brand/15 via-emerald-500/10 to-sky-500/10 rounded-lg -rotate-1 pointer-events-none"
                  aria-hidden
                />
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-ink-muted text-base md:text-lg leading-relaxed"
            >
              {t('features.subtitle')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:flex-1 relative min-h-[200px] rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50/90 p-6 md:p-8 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.2)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative flex items-center gap-3 mb-4">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
              </div>
              <div className="flex-1 h-8 rounded-lg bg-slate-100/90 border border-slate-200/80 text-[11px] text-slate-500 font-mono flex items-center justify-center truncate px-2">
                app.taska.uz / <span className="text-brand font-semibold">workspace</span>
              </div>
            </div>
            <div className="relative grid grid-cols-3 gap-2 text-[10px] font-semibold text-slate-600">
              <div className="col-span-2 rounded-xl bg-slate-900/[0.03] border border-slate-200/70 p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 uppercase tracking-wider text-[9px]">{t('features.hubLive')}</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    OK
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                    <div className="text-[9px] text-slate-400 mb-1">{t('features.hubTasks')}</div>
                    <div className="text-lg font-bold text-slate-900 tabular-nums">24</div>
                  </div>
                  <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                    <div className="text-[9px] text-slate-400 mb-1">{t('features.hubDeals')}</div>
                    <div className="text-lg font-bold text-slate-900 tabular-nums">₿ 12</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-gradient-to-b from-brand/12 to-emerald-600/5 border border-brand/15 p-2 flex flex-col justify-between">
                <BarChart3 className="text-brand w-5 h-5 opacity-80" />
                <div className="text-[9px] text-slate-600 leading-tight">{t('features.hubSync')}</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-fr md:min-h-[580px]">
          {modules.map((item, idx) => {
            let colClass = 'md:col-span-1';
            let rowClass = 'md:row-span-1';
            if (item.size === 'large') colClass = 'md:col-span-2';
            if (item.size === 'wide') colClass = 'md:col-span-3';
            if (item.size === 'tall') {
              colClass = 'md:col-span-1';
              rowClass = 'md:row-span-2';
            }

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className={`group relative ${colClass} ${rowClass}`}
              >
                <div
                  className={`absolute -inset-[1px] rounded-[1.4rem] bg-gradient-to-br opacity-70 group-hover:opacity-100 transition-opacity duration-500 ${item.rim}`}
                  aria-hidden
                />
                <div
                  className={`relative h-full rounded-[1.35rem] border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 md:p-7 shadow-[0_22px_55px_-32px_rgba(15,23,42,0.18)] group-hover:shadow-[0_32px_70px_-28px_rgba(15,23,42,0.22)] transition-all duration-300 flex flex-col overflow-hidden`}
                >
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full opacity-30 group-hover:opacity-50 transition-opacity bg-gradient-to-br ${item.rim}`}
                    aria-hidden
                  />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start gap-3 mb-1">
                      <div
                        className={`inline-flex p-3.5 rounded-2xl ${item.iconWrap} ${item.glow} shadow-lg scale-100 group-hover:scale-[1.05] transition-transform duration-300`}
                      >
                        <item.icon size={26} strokeWidth={2} />
                      </div>
                      {item.size === 'tall' ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-brand to-emerald-700 text-white shadow-md shadow-brand/25">
                          {t('features.top')}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 tabular-nums opacity-60 group-hover:opacity-100 transition-opacity">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      )}
                    </div>
                    <div className="relative z-10 flex-1 flex flex-col min-h-0">
                      <h3 className="text-lg md:text-xl font-bold text-ink tracking-tight leading-snug mt-2">{item.title}</h3>
                      <p className="text-ink-muted text-sm leading-relaxed mt-2 line-clamp-3">{item.desc}</p>
                      <ModulePreview kind={item.preview} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
