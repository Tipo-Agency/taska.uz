import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Filter,
  GanttChart,
  History,
  Kanban,
  Layers,
  Link2,
  MessageSquare,
  Paperclip,
  Table2,
} from 'lucide-react';
import { Button } from './Button';
import { ClientLogos } from './ClientLogos';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';
import { TasksModuleHeroVisual } from './TasksModuleHeroVisual';
import { ModuleLandingFooterStack } from './moduleLanding/ModuleLandingFooterStack';
import { MODULE_IDS, type ModuleId } from '../config/siteNavigation';
import { paths } from '../routes/paths';
import { trackDemoClick } from '../services/analytics';
import { useLanguage } from '../contexts/LanguageContext';

const FUNC_KEYS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const;
const SC_KEYS = ['sc1', 'sc2', 'sc3'] as const;
const FEATURE_ICONS = [Layers, ClipboardList, Bell, Link2, Filter, History] as const;

const OTHER_MODULES: ModuleId[] = MODULE_IDS.filter((m) => m !== 'tasks');

type TasksModuleLandingProps = {
  onOpenModal: () => void;
};

export const TasksModuleLanding: React.FC<TasksModuleLandingProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const included = [
    t('modules.tasks.b1'),
    t('modules.tasks.b2'),
    t('modules.tasks.b3'),
    t('modules.tasks.b4'),
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.45 },
  };

  const viewCards = [
    {
      icon: Table2,
      titleKey: 'modules.tasks.page.viewTableTitle' as const,
      leadKey: 'modules.tasks.page.viewTableLead' as const,
      accent: 'from-slate-600 to-slate-800',
    },
    {
      icon: Kanban,
      titleKey: 'modules.tasks.page.viewKanbanTitle' as const,
      leadKey: 'modules.tasks.page.viewKanbanLead' as const,
      accent: 'from-violet-600 to-indigo-700',
    },
    {
      icon: GanttChart,
      titleKey: 'modules.tasks.page.viewGanttTitle' as const,
      leadKey: 'modules.tasks.page.viewGanttLead' as const,
      accent: 'from-blue-600 to-sky-600',
    },
  ];

  return (
    <main className="bg-canvas">
      <section className="relative min-h-[min(100vh,56rem)] flex flex-col justify-center pt-28 pb-16 md:pb-24 overflow-hidden bg-canvas bg-mesh-canvas">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.35] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] bg-emerald-400/15 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[520px] h-[520px] bg-brand/10 blur-[110px] rounded-full" />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to={paths.home}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-brand mb-8 transition-colors duration-200"
          >
            <span aria-hidden>←</span>
            {t('modulePage.back')}
          </Link>

          <div className="max-w-4xl mx-auto text-center mb-6 md:mb-10">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-4"
            >
              {t('modules.tasks.page.heroKicker')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex justify-center mb-5"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/90 text-emerald-900 shadow-sm">
                {t('modules.tasks.label')}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight mb-4"
            >
              {t('modules.tasks.title')}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2 }}
              className="h-1.5 w-20 md:w-28 mx-auto rounded-full bg-gradient-to-r from-brand to-emerald-600 mb-6"
              aria-hidden
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {t('modules.tasks.desc')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Button size="md" className="w-full sm:w-auto min-w-[180px]" icon={<ArrowRight size={18} />} onClick={onOpenModal}>
                {t('modulePage.cta')}
              </Button>
              <a
                href="https://demo.taska.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                onClick={() => trackDemoClick()}
              >
                <Button variant="secondary" size="md" className="w-full sm:w-auto min-w-[180px] gap-2" icon={<ExternalLink size={17} />}>
                  {t('hero.demo')}
                </Button>
              </a>
            </motion.div>
          </div>

          <TasksModuleHeroVisual />
        </div>
      </section>

      <ClientLogos />

      <section className="py-16 md:py-20 bg-white border-y border-slate-200/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeUp} className="relative rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.11] bg-gradient-to-br from-brand to-emerald-600" />
            <div className="relative border border-slate-200/80 bg-gradient-to-br from-slate-50/90 to-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{t('solutions.page.audienceKicker')}</p>
              <p className="text-lg md:text-xl text-ink leading-relaxed font-medium">{t('modules.tasks.whoFor')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/80">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-3">{t('modules.tasks.page.viewsKicker')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">{t('modules.tasks.page.viewsTitle')}</h2>
            <p className="text-gray-500 text-lg leading-relaxed">{t('modules.tasks.page.viewsLead')}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto">
            {viewCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.titleKey}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-brand/20 transition-all duration-300"
                >
                  <div
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${card.accent} text-white mb-5 shadow-lg`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t(card.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">{t(card.leadKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-10 md:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">{t('modules.tasks.page.detailKicker')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modules.tasks.page.detailTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('modules.tasks.page.detailLead')}</p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto rounded-[1.75rem] border border-slate-200/90 bg-slate-50/50 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.25)] overflow-hidden"
          >
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
              <div className="p-6 md:p-8 bg-white">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-1">{t('modules.tasks.demo.modalLabel')}</p>
                    <p className="text-lg md:text-xl font-bold text-slate-900 leading-snug">{t('modules.tasks.demo.modalTitle')}</p>
                  </div>
                  <div className="flex gap-2 text-slate-400">
                    <span className="w-8 h-8 rounded-lg border border-slate-200/80 flex items-center justify-center text-xs">□</span>
                    <span className="w-8 h-8 rounded-lg border border-slate-200/80 flex items-center justify-center">×</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { k: 'modules.tasks.demo.fieldStatus' as const, pill: 'bg-slate-100 text-slate-700 border-slate-200', v: t('modules.tasks.demo.statusNew') },
                    { k: 'modules.tasks.demo.fieldPriority' as const, pill: 'bg-amber-100 text-amber-900 border-amber-200/80', v: t('modules.tasks.demo.prioMid') },
                    { k: 'modules.tasks.demo.fieldModule' as const, pill: 'bg-sky-100 text-sky-900 border-sky-200/80', v: t('modules.tasks.demo.modPill') },
                    { k: 'modules.tasks.demo.fieldDue' as const, pill: 'bg-white text-slate-800 border-slate-200', v: '25.01 — 06.04.2026' },
                  ].map((row) => (
                    <div key={row.k} className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">{t(row.k)}</p>
                      <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-lg border ${row.pill}`}>{row.v}</span>
                    </div>
                  ))}
                  <div className="sm:col-span-2 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">{t('modules.tasks.demo.fieldAssignees')}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-300" />
                      <span className="text-sm font-medium text-slate-800">{t('modules.tasks.demo.userName')}</span>
                      <span className="w-7 h-7 rounded-lg border border-dashed border-slate-300 text-slate-400 text-center text-sm leading-7">+</span>
                    </div>
                  </div>
                </div>
                <div className="mb-5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">{t('modules.tasks.demo.description')}</p>
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50 min-h-[72px] p-3 text-sm text-slate-400">
                    {t('modules.tasks.demo.descriptionPlaceholder')}
                  </div>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold">
                    <Paperclip size={16} />
                    {t('modules.tasks.demo.attachments')}
                  </div>
                  <Button size="sm" className="shrink-0">
                    {t('modules.tasks.demo.save')}
                  </Button>
                </div>
              </div>
              <div className="p-6 md:p-8 bg-slate-50/90">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare size={18} className="text-slate-500" />
                  <h3 className="font-bold text-slate-900">{t('modules.tasks.demo.comments')}</h3>
                  <span className="text-xs font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">2</span>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="text-xs text-slate-500 bg-white/80 border border-slate-200/60 rounded-xl px-3 py-2">
                    {t('modules.tasks.demo.systemComment')}
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-300 shrink-0" />
                    <div className="flex-1 rounded-2xl rounded-tl-sm bg-white border border-slate-200/80 px-3 py-2 text-sm text-slate-800 shadow-sm">
                      {t('modules.tasks.demo.userComment')}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400">{t('modules.tasks.demo.commentPlaceholder')}</div>
                <p className="text-[10px] text-slate-400 mt-2">{t('modules.tasks.demo.enterToSend')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modulePage.functionsTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('modules.tasks.page.featuresLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl">
            {FUNC_KEYS.map((k, i) => {
              const Icon = FEATURE_ICONS[i]!;
              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-emerald-50/30 p-6 md:p-8 hover:border-brand/25 hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-emerald-100 text-emerald-800 mb-5 group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                  <p className="text-gray-800 leading-relaxed text-[15px] md:text-base font-medium">{t(`modules.tasks.${k}`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/50 border-t border-slate-200/60">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modulePage.included')}</h2>
            <p className="text-gray-500 text-lg">{t('modules.tasks.page.includedLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {included.map((line) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-3 rounded-2xl border border-emerald-200/60 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={22} />
                <p className="text-slate-800 leading-relaxed font-medium">{line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-gradient-to-br from-emerald-600 to-brand pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t('modules.scenarioTitle')}</h2>
            <p className="text-white/70 text-lg max-w-2xl">{t('modules.tasks.page.scenariosLead')}</p>
          </motion.div>
          <div className="space-y-5">
            {SC_KEYS.map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 md:gap-8 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm p-5 md:p-8"
              >
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-brand flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <div className="h-1 w-12 rounded-full bg-emerald-400/90 mb-4" />
                  <p className="text-white/90 leading-relaxed text-[15px] md:text-lg">{t(`modules.tasks.${k}`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('modules.tasks.page.moreModules')}</h2>
            <p className="text-gray-500">{t('modules.tasks.page.moreModulesLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl">
            {OTHER_MODULES.map((mid) => (
              <Link
                key={mid}
                to={paths.module(mid)}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-brand/30 hover:shadow-md px-5 py-4 transition-all duration-200"
              >
                <span className="font-semibold text-gray-900 group-hover:text-brand transition-colors">{t(`modules.${mid}.label`)}</span>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-brand shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ModuleLandingFooterStack onOpenModal={onOpenModal} />
    </main>
  );
};
