import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Banknote,
  BarChart3,
  BriefcaseBusiness,
  CheckSquare,
  Kanban,
  Users,
  Warehouse,
  Workflow,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MODULE_IDS, type ModuleId } from '../config/siteNavigation';
import { paths } from '../routes/paths';

const moduleIcons: Record<ModuleId, LucideIcon> = {
  tasks: CheckSquare,
  funnel: Kanban,
  clients: Users,
  finance: Banknote,
  warehouse: Warehouse,
  processes: Workflow,
  analytics: BarChart3,
  team: BriefcaseBusiness,
};

const moduleGradients: Record<ModuleId, string> = {
  tasks: 'from-emerald-500 to-teal-600',
  funnel: 'from-blue-500 to-indigo-600',
  clients: 'from-violet-500 to-purple-600',
  finance: 'from-amber-500 to-orange-600',
  warehouse: 'from-teal-500 to-cyan-600',
  processes: 'from-indigo-500 to-violet-600',
  analytics: 'from-sky-500 to-cyan-600',
  team: 'from-rose-500 to-pink-600',
};

const moduleGlow: Record<ModuleId, string> = {
  tasks: 'shadow-emerald-500/25',
  funnel: 'shadow-blue-500/25',
  clients: 'shadow-violet-500/25',
  finance: 'shadow-amber-500/25',
  warehouse: 'shadow-teal-500/25',
  processes: 'shadow-indigo-500/25',
  analytics: 'shadow-sky-500/25',
  team: 'shadow-rose-500/25',
};

export const SystemModules: React.FC = () => {
  const { t } = useLanguage();
  const modules = MODULE_IDS.map((id) => ({
    id,
    icon: moduleIcons[id],
    gradient: moduleGradients[id],
    glow: moduleGlow[id],
    label: t(`modules.${id}.label`),
    title: t(`modules.${id}.title`),
    chip1: t(`modules.${id}.b1`),
  }));

  return (
    <section id="system-modules" className="py-24 md:py-32 relative bg-canvas border-t border-slate-200/60 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.12] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,90vw)] h-[min(900px,90vw)] bg-gradient-to-br from-brand/[0.07] via-transparent to-sky-500/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-3">{t('modules.sectionKicker')}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4 tracking-tight leading-[1.08]">
            {t('modules.heading')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand via-emerald-600 to-brand-dark">Taska</span>
          </h2>
          <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl">{t('modules.subtitleHome')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {modules.map((module, index) => (
            <motion.article
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <Link
                to={paths.module(module.id)}
                className="group relative flex flex-col h-full rounded-[1.35rem] border border-slate-200/90 bg-white/90 backdrop-blur-sm p-5 md:p-6 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.18)] hover:shadow-[0_28px_64px_-26px_rgba(15,23,42,0.22)] hover:border-slate-300/90 transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`pointer-events-none absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-25 group-hover:opacity-40 transition-opacity bg-gradient-to-br ${module.gradient}`}
                  aria-hidden
                />
                <div className="relative z-10 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${module.gradient} text-white shadow-lg ${module.glow} group-hover:scale-[1.06] transition-transform duration-300`}
                    >
                      <module.icon size={30} strokeWidth={2} />
                    </div>
                    <span className="w-10 h-10 rounded-xl border border-slate-200/90 bg-white/90 flex items-center justify-center text-slate-400 group-hover:text-brand group-hover:border-brand/35 group-hover:bg-brand/[0.04] transition-colors">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 mb-1.5">{module.label}</p>
                  <h3 className="text-lg md:text-xl font-bold text-ink leading-snug tracking-tight mb-4 group-hover:text-brand transition-colors">
                    {module.title}
                  </h3>

                  <div className="mt-auto space-y-4 pt-1">
                    <p className="w-full rounded-xl bg-slate-100/90 text-slate-700 text-xs font-semibold px-3 py-2.5 border border-slate-200/80 leading-relaxed">
                      {module.chip1}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                      {t('modulePage.more')}
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 md:mt-20 rounded-[1.5rem] border border-brand/20 bg-gradient-to-br from-brand/[0.07] via-white to-emerald-500/[0.05] px-6 md:px-10 py-8 md:py-10 shadow-[0_24px_60px_-32px_rgba(22,101,52,0.12)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-2">{t('modules.custom.heading')}</div>
            <h3 className="text-2xl md:text-3xl font-bold text-ink mb-3 tracking-tight">{t('modules.custom.title')}</h3>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-3xl">{t('modules.custom.desc')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
