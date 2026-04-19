import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  LineChart,
  Package,
  Plug,
  QrCode,
  RefreshCw,
} from 'lucide-react';
import { Button } from './Button';
import { ClientLogos } from './ClientLogos';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';
import { ModuleLandingFooterStack } from './moduleLanding/ModuleLandingFooterStack';
import { WarehouseModuleHeroVisual } from './WarehouseModuleHeroVisual';
import { MODULE_IDS, type ModuleId } from '../config/siteNavigation';
import { paths } from '../routes/paths';
import { trackDemoClick } from '../services/analytics';
import { useLanguage } from '../contexts/LanguageContext';

const FUNC_KEYS = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'] as const;
const SC_KEYS = ['sc1', 'sc2', 'sc3'] as const;
const FEATURE_ICONS = [Package, QrCode, Boxes, ClipboardList, Plug, LineChart] as const;

const OTHER_MODULES: ModuleId[] = MODULE_IDS.filter((m) => m !== 'warehouse');

const INTEGRATION_KEYS = ['int1', 'int2', 'int3', 'int4'] as const;

type WarehouseModuleLandingProps = {
  onOpenModal: () => void;
};

export const WarehouseModuleLanding: React.FC<WarehouseModuleLandingProps> = ({ onOpenModal }) => {
  const { t } = useLanguage();
  const included = [
    t('modules.warehouse.b1'),
    t('modules.warehouse.b2'),
    t('modules.warehouse.b3'),
    t('modules.warehouse.b4'),
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.45 },
  };

  const viewCards = [
    {
      icon: LineChart,
      titleKey: 'modules.warehouse.page.viewBalancesTitle' as const,
      leadKey: 'modules.warehouse.page.viewBalancesLead' as const,
      accent: 'from-teal-600 to-emerald-700',
    },
    {
      icon: Package,
      titleKey: 'modules.warehouse.page.viewNomenclatureTitle' as const,
      leadKey: 'modules.warehouse.page.viewNomenclatureLead' as const,
      accent: 'from-slate-600 to-slate-800',
    },
    {
      icon: RefreshCw,
      titleKey: 'modules.warehouse.page.viewJournalTitle' as const,
      leadKey: 'modules.warehouse.page.viewJournalLead' as const,
      accent: 'from-cyan-600 to-teal-700',
    },
    {
      icon: ClipboardList,
      titleKey: 'modules.warehouse.page.viewRevisionsTitle' as const,
      leadKey: 'modules.warehouse.page.viewRevisionsLead' as const,
      accent: 'from-emerald-600 to-green-700',
    },
  ];

  return (
    <main className="bg-canvas">
      <section className="relative min-h-[min(100vh,56rem)] flex flex-col justify-center pt-28 pb-16 md:pb-24 overflow-hidden bg-canvas bg-mesh-canvas">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.35] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 -left-24 w-[420px] h-[420px] bg-teal-400/14 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 -right-24 w-[520px] h-[520px] bg-emerald-400/12 blur-[110px] rounded-full" />

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
              {t('modules.warehouse.page.heroKicker')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex justify-center mb-5"
            >
              <span className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border border-teal-200/80 bg-teal-50/95 text-teal-950 shadow-sm">
                {t('modules.warehouse.label')}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight mb-4"
            >
              {t('modules.warehouse.title')}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2 }}
              className="h-1.5 w-20 md:w-28 mx-auto rounded-full bg-gradient-to-r from-teal-600 to-emerald-600 mb-6"
              aria-hidden
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {t('modules.warehouse.desc')}
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

          <WarehouseModuleHeroVisual />
        </div>
      </section>

      <ClientLogos />

      <section className="py-16 md:py-20 bg-white border-y border-slate-200/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeUp} className="relative rounded-[2rem] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.11] bg-gradient-to-br from-teal-500 to-emerald-600" />
            <div className="relative border border-slate-200/80 bg-gradient-to-br from-slate-50/90 to-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{t('solutions.page.audienceKicker')}</p>
              <p className="text-lg md:text-xl text-ink leading-relaxed font-medium">{t('modules.warehouse.whoFor')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50/80">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700 mb-3">{t('modules.warehouse.page.viewsKicker')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">{t('modules.warehouse.page.viewsTitle')}</h2>
            <p className="text-gray-500 text-lg leading-relaxed">{t('modules.warehouse.page.viewsLead')}</p>
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
                  className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-teal-200/80 transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${card.accent} text-white mb-5 shadow-lg`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t(card.titleKey)}</h3>
                  <p className="text-gray-500 leading-relaxed">{t(card.leadKey)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200/60">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div {...fadeUp} className="max-w-2xl mb-10 md:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-700 mb-3">{t('modules.warehouse.page.integrationsKicker')}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modules.warehouse.page.integrationsTitle')}</h2>
            <p className="text-gray-500 text-lg leading-relaxed">{t('modules.warehouse.page.integrationsLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4">
            {INTEGRATION_KEYS.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 md:p-6 shadow-sm"
              >
                <div className="shrink-0 p-3 rounded-xl bg-teal-50 text-teal-800 border border-teal-100">
                  <Plug size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{t(`modules.warehouse.page.${key}Name` as 'modules.warehouse.page.int1Name')}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
                      {t(`modules.warehouse.page.${key}Badge` as 'modules.warehouse.page.int1Badge')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{t(`modules.warehouse.page.${key}Desc` as 'modules.warehouse.page.int1Desc')}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white border-t border-slate-200/60">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('modulePage.functionsTitle')}</h2>
            <p className="text-gray-500 text-lg">{t('modules.warehouse.page.featuresLead')}</p>
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
                  className="group rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-teal-50/30 p-6 md:p-8 hover:border-teal-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-teal-100 text-teal-900 mb-5 group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                  <p className="text-gray-800 leading-relaxed text-[15px] md:text-base font-medium">{t(`modules.warehouse.${k}`)}</p>
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
            <p className="text-gray-500 text-lg">{t('modules.warehouse.page.includedLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl">
            {included.map((line) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex gap-3 rounded-2xl border border-teal-200/50 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="text-teal-600 shrink-0 mt-0.5" size={22} />
                <p className="text-slate-800 leading-relaxed font-medium">{line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-teal-600 to-emerald-800 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t('modules.scenarioTitle')}</h2>
            <p className="text-white/70 text-lg max-w-2xl">{t('modules.warehouse.page.scenariosLead')}</p>
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
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <div className="h-1 w-12 rounded-full bg-teal-400/90 mb-4" />
                  <p className="text-white/90 leading-relaxed text-[15px] md:text-lg">{t(`modules.warehouse.${k}`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('modules.warehouse.page.moreModules')}</h2>
            <p className="text-gray-500">{t('modules.warehouse.page.moreModulesLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl">
            {OTHER_MODULES.map((mid) => (
              <Link
                key={mid}
                to={paths.module(mid)}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-teal-200 hover:shadow-md px-5 py-4 transition-all duration-200"
              >
                <span className="font-semibold text-gray-900 group-hover:text-teal-800 transition-colors">{t(`modules.${mid}.label`)}</span>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-teal-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ModuleLandingFooterStack onOpenModal={onOpenModal} />
    </main>
  );
};
