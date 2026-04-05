import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  GripVertical,
  History,
  Kanban,
  ListChecks,
  Plus,
  Table2,
  TrendingUp,
  UserX,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from './Button';
import { ClientLogos } from './ClientLogos';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';
import { FunnelModuleHeroVisual } from './FunnelModuleHeroVisual';
import { TelegramSection } from './TelegramSection';
import { MODULE_IDS, type ModuleId } from '../config/siteNavigation';
import { paths } from '../routes/paths';
import { trackMetrikaGoal } from '../services/metrics';
import { useLanguage } from '../contexts/LanguageContext';

const FUNC_KEYS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const;
const SC_KEYS = ['sc1', 'sc2', 'sc3'] as const;
const FEATURE_ICONS = [Kanban, ListChecks, Zap, TrendingUp, Users, History] as const;

const OTHER_MODULES: ModuleId[] = MODULE_IDS.filter((m) => m !== 'funnel');

type FunnelModuleLandingProps = {
  onOpenModal: () => void;
};

export const FunnelModuleLanding: React.FC<FunnelModuleLandingProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const included = [
    t('modules.funnel.b1'),
    t('modules.funnel.b2'),
    t('modules.funnel.b3'),
    t('modules.funnel.b4'),
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.45 },
  };

  const viewCards = [
    {
      icon: Kanban,
      titleKey: 'modules.funnel.page.viewKanbanTitle' as const,
      leadKey: 'modules.funnel.page.viewKanbanLead' as const,
      accent: 'from-violet-600 to-purple-700',
    },
    {
      icon: Table2,
      titleKey: 'modules.funnel.page.viewListTitle' as const,
      leadKey: 'modules.funnel.page.viewListLead' as const,
      accent: 'from-slate-600 to-slate-800',
    },
    {
      icon: UserX,
      titleKey: 'modules.funnel.page.viewLostTitle' as const,
      leadKey: 'modules.funnel.page.viewLostLead' as const,
      accent: 'from-rose-500 to-red-600',
    },
  ];

  return (
    <main className="bg-canvas">
      <section className="relative min-h-[min(100vh,56rem)] flex flex-col justify-center pt-28 pb-16 md:pb-24 overflow-hidden bg-canvas bg-mesh-canvas">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.35] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] bg-violet-400/15 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[520px] h-[520px] bg-fuchsia-400/12 blur-[110px] rounded-full" />

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
              {t('modules.funnel.page.heroKicker')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex justify-center mb-5"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border border-violet-200/80 bg-violet-50/95 text-violet-950 shadow-sm">
                {t('modules.funnel.label')}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight mb-4"
            >
              {t('modules.funnel.title')}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2 }}
              className="h-1.5 w-20 md:w-28 mx-auto rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-6"
              aria-hidden
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {t('modules.funnel.desc')}
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
                onClick={() => trackMetrikaGoal('demo_click')}
              >
                <Button variant="secondary" size="md" className="w-full sm:w-auto min-w-[180px] gap-2" icon={<ExternalLink size={17} />}>
                  {t('hero.demo')}
                </Button>
              </a>
            </motion.div>
          </div>

          <FunnelModuleHeroVisual />
        </div>
      </section>

      <ClientLogos />

      <section className="py-16 md:py-20 bg-white border-y border-slate-200/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeUp} className="relative rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.11] bg-gradient-to-br from-violet-500 to-fuchsia-600" />
            <div className="relative border border-slate-200/80 bg-gradient-to-br from-slate-50/90 to-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{t('solutions.page.audienceKicker')}</p>
              <p className="text-lg md:text-xl text-ink leading-relaxed font-medium">{t('modules.funnel.whoFor')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/80">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 mb-3">{t('modules.funnel.page.viewsKicker')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">{t('modules.funnel.page.viewsTitle')}</h2>
            <p className="text-gray-500 text-lg leading-relaxed">{t('modules.funnel.page.viewsLead')}</p>
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
                  className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${card.accent} text-white mb-5 shadow-lg`}>
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">{t('modules.funnel.page.detailKicker')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modules.funnel.page.detailTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('modules.funnel.page.detailLead')}</p>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="max-w-5xl mx-auto rounded-[1.75rem] border border-slate-200/90 bg-slate-50/50 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.25)] overflow-hidden"
          >
            <div className="grid lg:grid-cols-[1.12fr_0.88fr] divide-y lg:divide-y-0 lg:divide-x divide-slate-200/80">
              <div className="p-6 md:p-8 bg-white">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest mb-1">{t('modules.funnel.demo.modalDeal')}</p>
                    <p className="text-lg md:text-xl font-bold text-slate-900 leading-snug">{t('modules.funnel.demo.modalTitle')}</p>
                  </div>
                  <div className="flex gap-2 text-slate-400">
                    <span className="w-8 h-8 rounded-lg border border-slate-200/80 flex items-center justify-center text-xs">□</span>
                    <span className="w-8 h-8 rounded-lg border border-slate-200/80 flex items-center justify-center">×</span>
                  </div>
                </div>
                <div className="space-y-2.5 mb-5">
                  {[
                    { k: 'modules.funnel.demo.fieldFunnel' as const, v: t('modules.funnel.demo.fieldFunnelVal') },
                    { k: 'modules.funnel.demo.fieldStage' as const, v: t('modules.funnel.demo.fieldStageVal') },
                    { k: 'modules.funnel.demo.fieldSource' as const, v: t('modules.funnel.demo.fieldSourceVal') },
                    { k: 'modules.funnel.demo.fieldResponsible' as const, v: t('modules.funnel.demo.userName') },
                  ].map((row) => (
                    <div key={row.k} className="flex justify-between items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide shrink-0">{t(row.k)}</span>
                      <span className="text-xs font-semibold text-slate-900 text-right">{row.v}</span>
                    </div>
                  ))}
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">{t('modules.funnel.demo.fieldAmount')}</span>
                    <span className="text-sm font-bold text-slate-900 tabular-nums">{t('modules.funnel.demo.modalAmount')}</span>
                  </div>
                </div>
                <div className="mb-5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">{t('modules.funnel.demo.note')}</p>
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 text-sm text-slate-700 leading-relaxed">{t('modules.funnel.demo.noteText')}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold py-2.5 shadow-sm hover:bg-emerald-700"
                  >
                    <CheckCircle2 size={16} />
                    {t('modules.funnel.demo.successBtn')}
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 text-white text-sm font-semibold py-2.5 shadow-sm hover:bg-rose-700"
                  >
                    <span className="text-lg leading-none">×</span>
                    {t('modules.funnel.demo.rejectBtn')}
                  </button>
                </div>
                <Button className="w-full !bg-violet-600 hover:!bg-violet-700 !border-none shadow-md shadow-violet-600/20">
                  {t('modules.funnel.demo.saveBtn')}
                </Button>
              </div>
              <div className="p-6 md:p-8 bg-slate-50/90">
                <div className="flex rounded-lg bg-slate-200/60 p-0.5 gap-0.5 mb-4">
                  {[t('modules.funnel.demo.tabChat'), t('modules.funnel.demo.tabTasks'), t('modules.funnel.demo.tabMeetings')].map((label, i) => (
                    <span
                      key={label}
                      className={`flex-1 text-center text-[10px] sm:text-xs font-bold py-2 rounded-md ${
                        i === 0 ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500'
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 min-h-[120px] flex items-center justify-center px-4 mb-4">
                  <p className="text-sm text-slate-400 text-center">{t('modules.funnel.demo.chatEmpty')}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400">{t('modules.funnel.demo.chatPlaceholder')}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-violet-50/40 to-white border-t border-slate-200/60">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-10 md:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 mb-3">{t('modules.funnel.page.builderKicker')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modules.funnel.page.builderTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('modules.funnel.page.builderLead')}</p>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="max-w-3xl mx-auto rounded-2xl border border-violet-200/60 bg-white shadow-lg shadow-violet-500/5 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/80">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t('modules.funnel.demo.builderModalTitle')}</span>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[140px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">{t('modules.funnel.demo.builderName')}</span>
                  <span className="text-sm font-semibold text-slate-900">{t('modules.funnel.demo.fieldFunnelVal')}</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{t('modules.funnel.demo.builderColor')}</span>
                  <span className="w-6 h-6 rounded-full bg-emerald-500 ring-2 ring-white shadow border border-slate-200" />
                </div>
              </div>
              <div className="flex gap-2 text-[10px] font-bold border-b border-slate-100 pb-2">
                <span className="px-2 py-1 rounded-md bg-violet-100 text-violet-900">{t('modules.funnel.demo.builderTabStages')}</span>
                <span className="px-2 py-1 rounded-md text-slate-400">{t('modules.funnel.demo.builderTabSources')}</span>
                <span className="px-2 py-1 rounded-md text-slate-400">{t('modules.funnel.demo.builderTabAuto')}</span>
              </div>
              {[1, 2].map((n) => (
                <div key={n} className="rounded-xl border border-slate-200/80 p-3 bg-white">
                  <div className="flex items-start gap-2">
                    <GripVertical size={16} className="text-slate-300 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-400 tabular-nums">{n}.</span>
                        <span className="text-sm font-semibold text-slate-900">{t(`modules.funnel.demo.builderStage${n}` as 'modules.funnel.demo.builderStage1')}</span>
                        <span className={`w-3 h-3 rounded-full shrink-0 ${n === 1 ? 'bg-slate-400' : 'bg-blue-500'}`} />
                      </div>
                      <div className="rounded-lg bg-violet-50/80 border border-violet-100 px-3 py-2">
                        <p className="text-[10px] font-bold text-violet-800 uppercase mb-1">{t('modules.funnel.demo.autoTaskLabel')}</p>
                        <p className="text-[11px] text-slate-700">{t(`modules.funnel.demo.autoTask${n}` as 'modules.funnel.demo.autoTask1')}</p>
                        <p className="text-[10px] text-violet-700 font-semibold mt-1.5">{t('modules.funnel.demo.assignResponsible')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900"
              >
                <Plus size={16} />
                {t('modules.funnel.demo.addStage')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modulePage.functionsTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('modules.funnel.page.featuresLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl">
            {FUNC_KEYS.map((k, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-violet-50/40 p-6 md:p-8 hover:border-violet-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-violet-100 text-violet-900 mb-5 group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                  <p className="text-gray-800 leading-relaxed text-[15px] md:text-base font-medium">{t(`modules.funnel.${k}`)}</p>
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
            <p className="text-gray-500 text-lg">{t('modules.funnel.page.includedLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {included.map((line) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-3 rounded-2xl border border-violet-200/50 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="text-violet-600 shrink-0 mt-0.5" size={22} />
                <p className="text-slate-800 leading-relaxed font-medium">{line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-violet-600 to-fuchsia-700 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t('modules.scenarioTitle')}</h2>
            <p className="text-white/70 text-lg max-w-2xl">{t('modules.funnel.page.scenariosLead')}</p>
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
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <div className="h-1 w-12 rounded-full bg-violet-400/90 mb-4" />
                  <p className="text-white/90 leading-relaxed text-[15px] md:text-lg">{t(`modules.funnel.${k}`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('modules.funnel.page.moreModules')}</h2>
            <p className="text-gray-500">{t('modules.funnel.page.moreModulesLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl">
            {OTHER_MODULES.map((mid) => (
              <Link
                key={mid}
                to={paths.module(mid)}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-violet-200 hover:shadow-md px-5 py-4 transition-all duration-200"
              >
                <span className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors">{t(`modules.${mid}.label`)}</span>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-violet-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-gray-50/70 px-6 md:px-10 py-8 md:py-10 shadow-sm max-w-5xl mx-auto">
            <div className="text-left max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('cta.demoTitle')}</h3>
              <p className="text-gray-500 text-sm md:text-base">{t('cta.demoSubtitle')}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button onClick={onOpenModal} className="w-full sm:w-auto" icon={<ArrowRight size={18} />}>
                {t('cta.leaveRequest')}
              </Button>
              <a
                href="https://demo.taska.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
                onClick={() => trackMetrikaGoal('demo_click')}
              >
                <Button variant="secondary" className="w-full sm:w-auto">
                  {t('hero.demo')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

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
                  onClick={() => trackMetrikaGoal('demo_click')}
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
    </main>
  );
};
