import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  History,
  LayoutGrid,
  ListChecks,
  PlayCircle,
  Save,
  Workflow,
  Zap,
} from 'lucide-react';
import { Button } from './Button';
import { ClientLogos } from './ClientLogos';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';
import { ProcessesModuleHeroVisual } from './ProcessesModuleHeroVisual';
import { TelegramSection } from './TelegramSection';
import { MODULE_IDS, type ModuleId } from '../config/siteNavigation';
import { paths } from '../routes/paths';
import { trackMetrikaGoal } from '../services/metrics';
import { useLanguage } from '../contexts/LanguageContext';

const FUNC_KEYS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const;
const SC_KEYS = ['sc1', 'sc2', 'sc3'] as const;
const FEATURE_ICONS = [LayoutGrid, Zap, ListChecks, GitBranch, History, PlayCircle] as const;

const OTHER_MODULES: ModuleId[] = MODULE_IDS.filter((m) => m !== 'processes');

type ProcessesModuleLandingProps = {
  onOpenModal: () => void;
};

export const ProcessesModuleLanding: React.FC<ProcessesModuleLandingProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const included = [
    t('modules.processes.b1'),
    t('modules.processes.b2'),
    t('modules.processes.b3'),
    t('modules.processes.b4'),
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.45 },
  };

  const viewCards = [
    {
      icon: LayoutGrid,
      titleKey: 'modules.processes.page.viewTemplatesTitle' as const,
      leadKey: 'modules.processes.page.viewTemplatesLead' as const,
      accent: 'from-indigo-600 to-violet-700',
    },
    {
      icon: PlayCircle,
      titleKey: 'modules.processes.page.viewRunningTitle' as const,
      leadKey: 'modules.processes.page.viewRunningLead' as const,
      accent: 'from-slate-700 to-slate-900',
    },
    {
      icon: CheckCircle2,
      titleKey: 'modules.processes.page.viewCompletedTitle' as const,
      leadKey: 'modules.processes.page.viewCompletedLead' as const,
      accent: 'from-emerald-600 to-teal-700',
    },
    {
      icon: Workflow,
      titleKey: 'modules.processes.page.viewEditorTitle' as const,
      leadKey: 'modules.processes.page.viewEditorLead' as const,
      accent: 'from-violet-600 to-fuchsia-700',
    },
  ];

  return (
    <main className="bg-canvas">
      <section className="relative min-h-[min(100vh,56rem)] flex flex-col justify-center pt-28 pb-16 md:pb-24 overflow-hidden bg-canvas bg-mesh-canvas">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.35] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] bg-indigo-400/14 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[520px] h-[520px] bg-violet-400/12 blur-[110px] rounded-full" />

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
              {t('modules.processes.page.heroKicker')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex justify-center mb-5"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border border-indigo-200/80 bg-indigo-50/95 text-indigo-950 shadow-sm">
                {t('modules.processes.label')}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight mb-4"
            >
              {t('modules.processes.title')}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2 }}
              className="h-1.5 w-20 md:w-28 mx-auto rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 mb-6"
              aria-hidden
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {t('modules.processes.desc')}
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

          <ProcessesModuleHeroVisual />
        </div>
      </section>

      <ClientLogos />

      <section className="py-16 md:py-20 bg-white border-y border-slate-200/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeUp} className="relative rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.11] bg-gradient-to-br from-indigo-500 to-violet-600" />
            <div className="relative border border-slate-200/80 bg-gradient-to-br from-slate-50/90 to-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{t('solutions.page.audienceKicker')}</p>
              <p className="text-lg md:text-xl text-ink leading-relaxed font-medium">{t('modules.processes.whoFor')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/80">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-700 mb-3">{t('modules.processes.page.viewsKicker')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">{t('modules.processes.page.viewsTitle')}</h2>
            <p className="text-gray-500 text-lg leading-relaxed">{t('modules.processes.page.viewsLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {viewCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.titleKey}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-indigo-200/80 transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${card.accent} text-white mb-5 shadow-lg`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t(card.titleKey)}</h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">{t(card.leadKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fadeUp} className="max-w-2xl mb-10 md:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 mb-3">{t('modules.processes.page.editorKicker')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modules.processes.page.editorTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('modules.processes.page.editorLead')}</p>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="rounded-[1.5rem] border border-slate-200/90 bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] overflow-hidden max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/80">
              <span className="text-sm font-bold text-slate-900">{t('modules.processes.demo.editorModalTitle')}</span>
              <span className="text-[10px] font-bold text-rose-600">{t('modules.processes.demo.editorDelete')}</span>
            </div>
            <div className="p-5 md:p-6 space-y-4">
              <div className="flex gap-2 p-1 rounded-xl bg-slate-100 border border-slate-200/80">
                <span className="flex-1 text-center text-xs font-bold py-2 rounded-lg text-slate-500">{t('modules.processes.demo.editorTabSteps')}</span>
                <span className="flex-1 text-center text-xs font-bold py-2 rounded-lg bg-white text-indigo-700 shadow-sm border border-indigo-100">
                  {t('modules.processes.demo.editorTabScheme')}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">{t('modules.processes.demo.editorNameLabel')}</p>
                <div className="h-10 rounded-xl border border-slate-200 bg-white px-3 flex items-center text-sm font-semibold text-slate-900">
                  {t('modules.processes.demo.editorProcessName')}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">{t('modules.processes.demo.editorDescLabel')}</p>
                <div className="min-h-[52px] rounded-xl border border-dashed border-slate-200 bg-slate-50/50" />
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/80 p-4">
                <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">{t('modules.processes.demo.editorVisHint')}</p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-800">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-indigo-600 text-white text-[10px]">1</span>
                  <span>{t('modules.processes.demo.editorStep1')}</span>
                  <span className="text-indigo-400">→</span>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-indigo-600 text-white text-[10px]">2</span>
                  <span>{t('modules.processes.demo.editorStep2')}</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <button type="button" className="text-sm font-semibold text-slate-600 px-4 py-2">
                  {t('modules.processes.demo.editorCancel')}
                </button>
                <Button className="!bg-indigo-600 hover:!bg-indigo-700 !border-none text-sm px-5 gap-2" icon={<Save size={16} />}>
                  {t('modules.processes.demo.editorSave')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modulePage.functionsTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('modules.processes.page.featuresLead')}</p>
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
                  className="group rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-indigo-50/25 p-6 md:p-8 hover:border-indigo-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-indigo-100 text-indigo-900 mb-5 group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                  <p className="text-gray-800 leading-relaxed text-[15px] md:text-base font-medium">{t(`modules.processes.${k}`)}</p>
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
            <p className="text-gray-500 text-lg">{t('modules.processes.page.includedLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {included.map((line) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-3 rounded-2xl border border-indigo-200/50 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="text-indigo-600 shrink-0 mt-0.5" size={22} />
                <p className="text-slate-800 leading-relaxed font-medium">{line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-indigo-600 to-violet-800 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t('modules.scenarioTitle')}</h2>
            <p className="text-white/70 text-lg max-w-2xl">{t('modules.processes.page.scenariosLead')}</p>
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
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <div className="h-1 w-12 rounded-full bg-indigo-400/90 mb-4" />
                  <p className="text-white/90 leading-relaxed text-[15px] md:text-lg">{t(`modules.processes.${k}`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('modules.processes.page.moreModules')}</h2>
            <p className="text-gray-500">{t('modules.processes.page.moreModulesLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl">
            {OTHER_MODULES.map((mid) => (
              <Link
                key={mid}
                to={paths.module(mid)}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-indigo-200 hover:shadow-md px-5 py-4 transition-all duration-200"
              >
                <span className="font-semibold text-gray-900 group-hover:text-indigo-800 transition-colors">{t(`modules.${mid}.label`)}</span>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-indigo-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
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
