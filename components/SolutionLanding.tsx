import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BedDouble,
  Bell,
  Boxes,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Factory,
  Handshake,
  HardHat,
  HeartPulse,
  Kanban,
  MapPin,
  Package,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Truck,
  Users,
  UtensilsCrossed,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { Button } from './Button';
import { ClientLogos } from './ClientLogos';
import { ContactForm } from './ContactForm';
import { FAQ } from './FAQ';
import { SolutionHeroVisual } from './SolutionHeroVisual';
import { TelegramSection } from './TelegramSection';
import { solutionPageTheme } from '../config/solutionPageTheme';
import { SOLUTION_SLUGS, type SolutionSlug } from '../config/siteNavigation';
import { paths } from '../routes/paths';
import { trackDemoClick } from '../services/analytics';
import { useLanguage } from '../contexts/LanguageContext';

const PAIN_KEYS = ['pain1', 'pain2', 'pain3'] as const;
const OUT_KEYS = ['out1', 'out2', 'out3'] as const;
const EX_KEYS = ['ex1', 'ex2', 'ex3'] as const;
const B_KEYS = ['b1', 'b2', 'b3', 'b4'] as const;
const AUTO_ICONS_BY_SLUG: Record<SolutionSlug, [LucideIcon, LucideIcon, LucideIcon, LucideIcon]> = {
  retail: [Sparkles, Kanban, Wallet, Bell],
  services: [BriefcaseBusiness, ClipboardList, Users, Bell],
  manufacturing: [Factory, Package, ClipboardList, Activity],
  logistics: [Truck, Package, ClipboardList, MapPin],
  wholesale: [Boxes, Handshake, TrendingUp, Wallet],
  construction: [HardHat, Building2, ClipboardList, Users],
  healthcare: [Stethoscope, HeartPulse, ShieldCheck, ClipboardList],
  hospitality: [UtensilsCrossed, BedDouble, Bell, Sparkles],
};

type SolutionLandingProps = {
  slug: SolutionSlug;
  onOpenModal: () => void;
};

export const SolutionLanding: React.FC<SolutionLandingProps> = ({ slug, onOpenModal }) => {
  const { t } = useLanguage();
  const theme = solutionPageTheme[slug];
  const otherSlugs = SOLUTION_SLUGS.filter((s) => s !== slug);

  const fadeUp = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.45 },
  };

  return (
    <main className="bg-canvas">
      <section className="relative min-h-[min(100vh,56rem)] flex flex-col justify-center pt-28 pb-16 md:pb-24 overflow-hidden bg-canvas bg-mesh-canvas">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.35] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
        <div className={`absolute top-1/4 -left-24 w-[420px] h-[420px] ${theme.blobA} blur-[100px] rounded-full`} />
        <div className={`absolute bottom-0 -right-24 w-[520px] h-[520px] ${theme.blobB} blur-[110px] rounded-full`} />

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to={paths.home}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-brand mb-8 transition-colors duration-200"
          >
            <span aria-hidden>←</span>
            {t('modulePage.back')}
          </Link>

          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-4"
            >
              {t('solutions.kicker')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="flex justify-center mb-5"
            >
              <span
                className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-1.5 rounded-full border ${theme.pillClass}`}
              >
                {t(`solutions.${slug}.menu`)}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-[1.1] tracking-tight mb-4"
            >
              {t(`solutions.${slug}.title`)}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2 }}
              className={`h-1.5 w-20 md:w-28 mx-auto rounded-full bg-gradient-to-r ${theme.titleGradient} mb-6`}
              aria-hidden
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {t(`solutions.${slug}.lead`)}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Button size="md" className="w-full sm:w-auto min-w-[180px]" icon={<ArrowRight size={18} />} onClick={onOpenModal}>
                {t('solutions.cta')}
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

          <SolutionHeroVisual
            slug={slug}
            theme={{
              heroProgress: theme.heroProgress,
              heroChip: theme.heroChip,
              heroStatBorder: theme.heroStatBorder,
              heroContentTint: theme.heroContentTint,
            }}
          />
        </div>
      </section>

      <ClientLogos />

      <section className="py-16 md:py-20 bg-white border-y border-slate-200/60">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div {...fadeUp} className="relative rounded-[2rem] overflow-hidden">
            <div className={`absolute inset-0 opacity-[0.11] bg-gradient-to-br ${theme.titleGradient}`} />
            <div className="relative border border-slate-200/80 bg-gradient-to-br from-slate-50/90 to-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)]">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">{t('solutions.page.audienceKicker')}</p>
              <p className="text-lg md:text-xl text-ink leading-relaxed font-medium">{t(`solutions.${slug}.forWho`)}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-surface-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[min(100%,480px)] h-[480px] bg-slate-200/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div {...fadeUp} className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('solutions.section.pain')}</h2>
            <p className="text-gray-500 text-lg">{t('solutions.page.painLead')}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {PAIN_KEYS.map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group rounded-3xl border ${theme.painCardBorder} bg-white p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-2xl border ${theme.autoIconBg} ${theme.painCardBorder}`}>
                    <AlertTriangle size={22} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 tabular-nums">0{i + 1}</span>
                </div>
                <p className="text-slate-800 leading-relaxed text-[15px] md:text-base">{t(`solutions.${slug}.${k}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('solutions.whatWeAutomate')}</h2>
            <p className="text-gray-500 text-lg">{t('solutions.page.automationLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl">
            {B_KEYS.map((k, i) => {
              const Icon = AUTO_ICONS_BY_SLUG[slug][i]!;
              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-slate-50/80 p-6 md:p-8 hover:border-brand/25 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-2xl ${theme.autoIconBg} mb-5 group-hover:scale-105 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <p className="text-gray-800 leading-relaxed text-[15px] md:text-base font-medium">{t(`solutions.${slug}.${k}`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/60">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">{t('solutions.section.outcome')}</h2>
            <p className="text-gray-500 text-lg">{t('solutions.page.outcomeLead')}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl">
            {OUT_KEYS.map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-3xl border-2 ${theme.outcomeBorder} bg-white p-6 md:p-8 shadow-sm relative overflow-hidden`}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-10 -mt-10 bg-gradient-to-br ${theme.titleGradient} opacity-[0.07]`}
                />
                <CheckCircle2 className="text-emerald-600 mb-4 relative" size={28} />
                <p className="text-slate-800 leading-relaxed relative text-[15px] md:text-base">{t(`solutions.${slug}.${k}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${theme.titleGradient}`} />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div {...fadeUp} className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t('solutions.section.scenarios')}</h2>
            <p className="text-white/70 text-lg max-w-2xl">{t('solutions.page.scenariosLead')}</p>
          </motion.div>
          <div className="space-y-5">
            {EX_KEYS.map((k, i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 md:gap-8 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm p-5 md:p-8"
              >
                <div
                  className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl ${theme.scenarioNumBg} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <div className={`h-1 w-12 rounded-full ${theme.scenarioBar} mb-4 opacity-90`} />
                  <p className="text-white/90 leading-relaxed text-[15px] md:text-lg">{t(`solutions.${slug}.${k}`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeUp} className="max-w-2xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t('solutions.page.moreSolutions')}</h2>
            <p className="text-gray-500">{t('solutions.page.moreSolutionsLead')}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl">
            {otherSlugs.map((s) => (
              <Link
                key={s}
                to={paths.solution(s)}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 hover:bg-white hover:border-brand/30 hover:shadow-md px-5 py-4 transition-all duration-200"
              >
                <span className="font-semibold text-gray-900 group-hover:text-brand transition-colors">{t(`solutions.${s}.menu`)}</span>
                <ArrowRight size={18} className="text-gray-400 group-hover:text-brand shrink-0 transition-transform group-hover:translate-x-0.5" />
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
                onClick={() => trackDemoClick()}
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
    </main>
  );
};
