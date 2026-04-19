import React from 'react';
import { Link } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  GraduationCap,
  ListTodo,
  Package,
  PlayCircle,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  Users2,
  Video,
  Wallet,
  Workflow,
} from 'lucide-react';
import { Button } from '../components/Button';
import { MarketingPageShell } from '../components/MarketingPageShell';
import { useLanguage } from '../contexts/LanguageContext';
import type { AppOutletContext } from '../layouts/AppLayout';
import { paths } from '../routes/paths';
import { fadeUpInView, staggerContainer, staggerItem, viewportOnce } from '../constants/motion';

// ─── Types ───────────────────────────────────────────────────────────────────

type ModuleColors = {
  header: string;
  iconWrap: string;
  icon: string;
  nameText: string;
  tag: string;
  tagText: string;
  checkIcon: string;
  scenarioBg: string;
  scenarioBorder: string;
  border: string;
  link: string;
  roleBadgeBg: string;
  roleBadgeText: string;
};

type ModuleEduConfig = {
  id: string;
  icon: React.ElementType;
  nameKey: string;
  rolesKey: string;
  topicKeys: readonly string[];
  scenarioKey: string;
  linkPath: string;
  colors: ModuleColors;
};

type FormatConfig = {
  icon: React.ElementType;
  titleKey: string;
  bodyKey: string;
  iconBg: string;
  iconColor: string;
};

type RoleConfig = {
  icon: React.ElementType;
  titleKey: string;
  descKey: string;
  modulesKey: string;
  iconBg: string;
  iconColor: string;
};

type MaterialConfig = {
  icon: React.ElementType;
  textKey: string;
};

// ─── Static config ────────────────────────────────────────────────────────────

const FORMATS: FormatConfig[] = [
  {
    icon: Video,
    titleKey: 'service.education.fmt1Title',
    bodyKey: 'service.education.fmt1Body',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
  },
  {
    icon: Users,
    titleKey: 'service.education.fmt2Title',
    bodyKey: 'service.education.fmt2Body',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
  },
  {
    icon: BookOpen,
    titleKey: 'service.education.fmt3Title',
    bodyKey: 'service.education.fmt3Body',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-700',
  },
  {
    icon: ShieldCheck,
    titleKey: 'service.education.fmt4Title',
    bodyKey: 'service.education.fmt4Body',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
];

const MODULES: ModuleEduConfig[] = [
  {
    id: 'tasks',
    icon: ListTodo,
    nameKey: 'service.education.mod.tasks.name',
    rolesKey: 'service.education.mod.tasks.roles',
    topicKeys: [
      'service.education.mod.tasks.t1',
      'service.education.mod.tasks.t2',
      'service.education.mod.tasks.t3',
      'service.education.mod.tasks.t4',
      'service.education.mod.tasks.t5',
    ],
    scenarioKey: 'service.education.mod.tasks.scenario',
    linkPath: paths.module('tasks'),
    colors: {
      header: 'bg-emerald-50 border-b border-emerald-100',
      iconWrap: 'bg-emerald-100',
      icon: 'text-emerald-700',
      nameText: 'text-emerald-900',
      tag: 'bg-emerald-100',
      tagText: 'text-emerald-700',
      checkIcon: 'text-emerald-500',
      scenarioBg: 'bg-emerald-50/60',
      scenarioBorder: 'border-emerald-200',
      border: 'border-emerald-200',
      link: 'text-emerald-700 hover:text-emerald-900',
      roleBadgeBg: 'bg-emerald-50',
      roleBadgeText: 'text-emerald-700',
    },
  },
  {
    id: 'funnel',
    icon: TrendingUp,
    nameKey: 'service.education.mod.funnel.name',
    rolesKey: 'service.education.mod.funnel.roles',
    topicKeys: [
      'service.education.mod.funnel.t1',
      'service.education.mod.funnel.t2',
      'service.education.mod.funnel.t3',
      'service.education.mod.funnel.t4',
      'service.education.mod.funnel.t5',
    ],
    scenarioKey: 'service.education.mod.funnel.scenario',
    linkPath: paths.module('funnel'),
    colors: {
      header: 'bg-violet-50 border-b border-violet-100',
      iconWrap: 'bg-violet-100',
      icon: 'text-violet-700',
      nameText: 'text-violet-900',
      tag: 'bg-violet-100',
      tagText: 'text-violet-700',
      checkIcon: 'text-violet-500',
      scenarioBg: 'bg-violet-50/60',
      scenarioBorder: 'border-violet-200',
      border: 'border-violet-200',
      link: 'text-violet-700 hover:text-violet-900',
      roleBadgeBg: 'bg-violet-50',
      roleBadgeText: 'text-violet-700',
    },
  },
  {
    id: 'clients',
    icon: Users2,
    nameKey: 'service.education.mod.clients.name',
    rolesKey: 'service.education.mod.clients.roles',
    topicKeys: [
      'service.education.mod.clients.t1',
      'service.education.mod.clients.t2',
      'service.education.mod.clients.t3',
      'service.education.mod.clients.t4',
      'service.education.mod.clients.t5',
    ],
    scenarioKey: 'service.education.mod.clients.scenario',
    linkPath: paths.module('clients'),
    colors: {
      header: 'bg-purple-50 border-b border-purple-100',
      iconWrap: 'bg-purple-100',
      icon: 'text-purple-700',
      nameText: 'text-purple-900',
      tag: 'bg-purple-100',
      tagText: 'text-purple-700',
      checkIcon: 'text-purple-500',
      scenarioBg: 'bg-purple-50/60',
      scenarioBorder: 'border-purple-200',
      border: 'border-purple-200',
      link: 'text-purple-700 hover:text-purple-900',
      roleBadgeBg: 'bg-purple-50',
      roleBadgeText: 'text-purple-700',
    },
  },
  {
    id: 'finance',
    icon: Wallet,
    nameKey: 'service.education.mod.finance.name',
    rolesKey: 'service.education.mod.finance.roles',
    topicKeys: [
      'service.education.mod.finance.t1',
      'service.education.mod.finance.t2',
      'service.education.mod.finance.t3',
      'service.education.mod.finance.t4',
      'service.education.mod.finance.t5',
    ],
    scenarioKey: 'service.education.mod.finance.scenario',
    linkPath: paths.module('finance'),
    colors: {
      header: 'bg-amber-50 border-b border-amber-100',
      iconWrap: 'bg-amber-100',
      icon: 'text-amber-700',
      nameText: 'text-amber-900',
      tag: 'bg-amber-100',
      tagText: 'text-amber-700',
      checkIcon: 'text-amber-500',
      scenarioBg: 'bg-amber-50/60',
      scenarioBorder: 'border-amber-200',
      border: 'border-amber-200',
      link: 'text-amber-700 hover:text-amber-900',
      roleBadgeBg: 'bg-amber-50',
      roleBadgeText: 'text-amber-700',
    },
  },
  {
    id: 'warehouse',
    icon: Package,
    nameKey: 'service.education.mod.warehouse.name',
    rolesKey: 'service.education.mod.warehouse.roles',
    topicKeys: [
      'service.education.mod.warehouse.t1',
      'service.education.mod.warehouse.t2',
      'service.education.mod.warehouse.t3',
      'service.education.mod.warehouse.t4',
      'service.education.mod.warehouse.t5',
    ],
    scenarioKey: 'service.education.mod.warehouse.scenario',
    linkPath: paths.module('warehouse'),
    colors: {
      header: 'bg-teal-50 border-b border-teal-100',
      iconWrap: 'bg-teal-100',
      icon: 'text-teal-700',
      nameText: 'text-teal-900',
      tag: 'bg-teal-100',
      tagText: 'text-teal-700',
      checkIcon: 'text-teal-500',
      scenarioBg: 'bg-teal-50/60',
      scenarioBorder: 'border-teal-200',
      border: 'border-teal-200',
      link: 'text-teal-700 hover:text-teal-900',
      roleBadgeBg: 'bg-teal-50',
      roleBadgeText: 'text-teal-700',
    },
  },
  {
    id: 'processes',
    icon: Workflow,
    nameKey: 'service.education.mod.processes.name',
    rolesKey: 'service.education.mod.processes.roles',
    topicKeys: [
      'service.education.mod.processes.t1',
      'service.education.mod.processes.t2',
      'service.education.mod.processes.t3',
      'service.education.mod.processes.t4',
      'service.education.mod.processes.t5',
    ],
    scenarioKey: 'service.education.mod.processes.scenario',
    linkPath: paths.module('processes'),
    colors: {
      header: 'bg-indigo-50 border-b border-indigo-100',
      iconWrap: 'bg-indigo-100',
      icon: 'text-indigo-700',
      nameText: 'text-indigo-900',
      tag: 'bg-indigo-100',
      tagText: 'text-indigo-700',
      checkIcon: 'text-indigo-500',
      scenarioBg: 'bg-indigo-50/60',
      scenarioBorder: 'border-indigo-200',
      border: 'border-indigo-200',
      link: 'text-indigo-700 hover:text-indigo-900',
      roleBadgeBg: 'bg-indigo-50',
      roleBadgeText: 'text-indigo-700',
    },
  },
  {
    id: 'analytics',
    icon: BarChart3,
    nameKey: 'service.education.mod.analytics.name',
    rolesKey: 'service.education.mod.analytics.roles',
    topicKeys: [
      'service.education.mod.analytics.t1',
      'service.education.mod.analytics.t2',
      'service.education.mod.analytics.t3',
      'service.education.mod.analytics.t4',
      'service.education.mod.analytics.t5',
    ],
    scenarioKey: 'service.education.mod.analytics.scenario',
    linkPath: paths.module('analytics'),
    colors: {
      header: 'bg-sky-50 border-b border-sky-100',
      iconWrap: 'bg-sky-100',
      icon: 'text-sky-700',
      nameText: 'text-sky-900',
      tag: 'bg-sky-100',
      tagText: 'text-sky-700',
      checkIcon: 'text-sky-500',
      scenarioBg: 'bg-sky-50/60',
      scenarioBorder: 'border-sky-200',
      border: 'border-sky-200',
      link: 'text-sky-700 hover:text-sky-900',
      roleBadgeBg: 'bg-sky-50',
      roleBadgeText: 'text-sky-700',
    },
  },
  {
    id: 'team',
    icon: Users,
    nameKey: 'service.education.mod.team.name',
    rolesKey: 'service.education.mod.team.roles',
    topicKeys: [
      'service.education.mod.team.t1',
      'service.education.mod.team.t2',
      'service.education.mod.team.t3',
      'service.education.mod.team.t4',
      'service.education.mod.team.t5',
    ],
    scenarioKey: 'service.education.mod.team.scenario',
    linkPath: paths.module('team'),
    colors: {
      header: 'bg-rose-50 border-b border-rose-100',
      iconWrap: 'bg-rose-100',
      icon: 'text-rose-700',
      nameText: 'text-rose-900',
      tag: 'bg-rose-100',
      tagText: 'text-rose-700',
      checkIcon: 'text-rose-500',
      scenarioBg: 'bg-rose-50/60',
      scenarioBorder: 'border-rose-200',
      border: 'border-rose-200',
      link: 'text-rose-700 hover:text-rose-900',
      roleBadgeBg: 'bg-rose-50',
      roleBadgeText: 'text-rose-700',
    },
  },
];

const ROLES: RoleConfig[] = [
  {
    icon: GraduationCap,
    titleKey: 'service.education.role.owner.title',
    descKey: 'service.education.role.owner.desc',
    modulesKey: 'service.education.role.owner.modules',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
  },
  {
    icon: ClipboardList,
    titleKey: 'service.education.role.sales.title',
    descKey: 'service.education.role.sales.desc',
    modulesKey: 'service.education.role.sales.modules',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
  },
  {
    icon: Wallet,
    titleKey: 'service.education.role.cfo.title',
    descKey: 'service.education.role.cfo.desc',
    modulesKey: 'service.education.role.cfo.modules',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
  {
    icon: Settings,
    titleKey: 'service.education.role.ops.title',
    descKey: 'service.education.role.ops.desc',
    modulesKey: 'service.education.role.ops.modules',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
  {
    icon: Users,
    titleKey: 'service.education.role.hr.title',
    descKey: 'service.education.role.hr.desc',
    modulesKey: 'service.education.role.hr.modules',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-700',
  },
  {
    icon: Package,
    titleKey: 'service.education.role.wh.title',
    descKey: 'service.education.role.wh.desc',
    modulesKey: 'service.education.role.wh.modules',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
  },
];

const MATERIALS: MaterialConfig[] = [
  { icon: Video, textKey: 'service.education.mat1' },
  { icon: CheckCircle2, textKey: 'service.education.mat2' },
  { icon: FileText, textKey: 'service.education.mat3' },
  { icon: BookOpen, textKey: 'service.education.mat4' },
  { icon: PlayCircle, textKey: 'service.education.mat5' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mb-8 md:mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-ink mb-2 leading-tight">{title}</h2>
      {lead && <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl">{lead}</p>}
    </div>
  );
}

function ModuleCard({ mod, t }: { mod: ModuleEduConfig; t: (key: string) => string }) {
  const c = mod.colors;
  const Icon = mod.icon;
  const roles = t(mod.rolesKey).split(' · ');

  return (
    <motion.article
      variants={staggerItem(16)}
      className={`rounded-3xl border ${c.border} bg-white overflow-hidden shadow-sm flex flex-col`}
    >
      {/* Header */}
      <div className={`${c.header} px-5 py-4 flex items-center gap-3.5`}>
        <div className={`${c.iconWrap} p-2.5 rounded-xl shrink-0`} aria-hidden="true">
          <Icon size={20} className={c.icon} />
        </div>
        <h3 className={`text-base md:text-lg font-bold ${c.nameText} leading-tight`}>
          {t(mod.nameKey)}
        </h3>
      </div>

      {/* Body */}
      <div className="px-5 py-5 flex flex-col gap-5 flex-1">
        {/* Role tags */}
        <div className="flex flex-wrap gap-1.5" aria-label="Для кого">
          {roles.map((role) => (
            <span
              key={role}
              className={`inline-block text-xs font-medium ${c.tag} ${c.tagText} px-2.5 py-1 rounded-full leading-none`}
            >
              {role}
            </span>
          ))}
        </div>

        {/* Topics */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted mb-3">
            {t('service.education.topicsLabel')}
          </p>
          <ul className="space-y-2.5">
            {mod.topicKeys.map((key) => (
              <li key={key} className="flex items-start gap-2.5">
                <CheckCircle2
                  size={15}
                  className={`${c.checkIcon} mt-[3px] shrink-0`}
                  aria-hidden="true"
                />
                <span className="text-sm text-ink leading-relaxed">{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scenario */}
        <div className={`${c.scenarioBg} border ${c.scenarioBorder} rounded-2xl px-4 py-3.5 mt-auto`}>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted mb-1.5">
            {t('service.education.scenarioLabel')}
          </p>
          <p className="text-sm text-ink leading-relaxed">{t(mod.scenarioKey)}</p>
        </div>

        {/* Link to module */}
        <Link
          to={mod.linkPath}
          className={`inline-flex items-center gap-1.5 text-sm font-medium ${c.link} transition-colors group w-fit`}
        >
          {t('service.education.moduleLink')}
          <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </motion.article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const EducationPage: React.FC = () => {
  const { t } = useLanguage();
  const { openModal } = useOutletContext<AppOutletContext>();

  const heroActions = (
    <Button
      size="md"
      className="w-full sm:w-auto min-w-[220px]"
      onClick={openModal}
      icon={<ArrowRight size={18} />}
    >
      {t('service.education.cta')}
    </Button>
  );

  return (
    <MarketingPageShell
      accent="indigo"
      kicker={t('service.education.kicker')}
      title={t('service.education.title')}
      lead={t('service.education.lead')}
      heroActions={heroActions}
      onOpenModal={openModal}
      contentMaxWidth="5xl"
    >
      <div className="space-y-20">

        {/* ── Section 1: How training works ──────────────────────────────── */}
        <motion.section {...fadeUpInView(16)}>
          <SectionHeader
            title={t('service.education.formatsTitle')}
            lead={t('service.education.formatsLead')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FORMATS.map(({ icon: Icon, titleKey, bodyKey, iconBg, iconColor }, i) => (
              <motion.div
                key={titleKey}
                {...fadeUpInView(14)}
                transition={{ delay: i * 0.06 }}
                className="flex gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-5 shadow-sm"
              >
                <div className={`${iconBg} p-2.5 rounded-xl h-fit shrink-0`} aria-hidden="true">
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-ink mb-1.5">{t(titleKey)}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{t(bodyKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Section 2: Curriculum by module ───────────────────────────── */}
        <section>
          <motion.div {...fadeUpInView(16)}>
            <SectionHeader
              title={t('service.education.curriculumTitle')}
              lead={t('service.education.curriculumLead')}
            />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ ...viewportOnce, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {MODULES.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} t={t} />
            ))}
          </motion.div>
        </section>

        {/* ── Section 3: Who learns what ─────────────────────────────────── */}
        <motion.section {...fadeUpInView(16)}>
          <SectionHeader
            title={t('service.education.rolesTitle')}
            lead={t('service.education.rolesLead')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROLES.map(({ icon: Icon, titleKey, descKey, modulesKey, iconBg, iconColor }, i) => (
              <motion.div
                key={titleKey}
                {...fadeUpInView(12)}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200/80 bg-white px-5 py-5 shadow-sm flex gap-4 items-start"
              >
                <div className={`${iconBg} p-2.5 rounded-xl shrink-0`} aria-hidden="true">
                  <Icon size={19} className={iconColor} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-ink mb-1 leading-tight">
                    {t(titleKey)}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed mb-2.5">{t(descKey)}</p>
                  <div className="flex flex-wrap gap-1">
                    {t(modulesKey)
                      .split(' · ')
                      .map((m) => (
                        <span
                          key={m}
                          className="inline-block text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                        >
                          {m}
                        </span>
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Section 4: What's included ─────────────────────────────────── */}
        <motion.section {...fadeUpInView(16)}>
          <SectionHeader
            title={t('service.education.materialsTitle')}
            lead={t('service.education.materialsLead')}
          />
          <div className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white to-indigo-50/20 px-6 py-7 md:px-8 md:py-8 shadow-sm">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MATERIALS.map(({ icon: Icon, textKey }, i) => (
                <motion.li
                  key={textKey}
                  {...fadeUpInView(10)}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="bg-indigo-100 p-2 rounded-xl shrink-0 mt-0.5" aria-hidden="true">
                    <Icon size={16} className="text-indigo-700" />
                  </div>
                  <span className="text-sm md:text-base text-ink leading-relaxed">{t(textKey)}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* ── Section 5: Results ─────────────────────────────────────────── */}
        <motion.section {...fadeUpInView(16)}>
          <SectionHeader title={t('service.education.resultsTitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(['o1', 'o2', 'o3', 'o4'] as const).map((key, i) => (
              <motion.div
                key={key}
                {...fadeUpInView(12)}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm"
              >
                <CheckCircle2
                  size={20}
                  className="text-indigo-600 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <p className="text-sm md:text-base text-ink leading-relaxed">
                  {t(`service.education.${key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Outro ──────────────────────────────────────────────────────── */}
        <motion.div
          {...fadeUpInView(10)}
          className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50/30 px-7 py-8 md:px-9 md:py-10 text-center"
        >
          <GraduationCap
            size={36}
            className="text-indigo-600 mx-auto mb-4"
            aria-hidden="true"
          />
          <p className="text-lg md:text-xl text-ink font-medium leading-relaxed max-w-xl mx-auto mb-6">
            {t('service.education.outro')}
          </p>
          <Button
            size="md"
            onClick={openModal}
            icon={<ArrowRight size={18} />}
            className="w-full sm:w-auto min-w-[220px]"
          >
            {t('service.education.cta')}
          </Button>
        </motion.div>

      </div>
    </MarketingPageShell>
  );
};

export default EducationPage;
