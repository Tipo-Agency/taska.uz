import React, { Fragment, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Banknote,
  BarChart3,
  BriefcaseBusiness,
  Calendar,
  CheckSquare,
  Kanban,
  LayoutDashboard,
  Package,
  TrendingUp,
  Users,
  Warehouse,
  Workflow,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { MODULE_IDS, type ModuleId } from '../config/siteNavigation';
import { TasksModuleHeroMainColumn } from './TasksModuleHeroVisual';

export type HomeHeroTab = 'overview' | ModuleId;

const MODULE_PATH: Record<ModuleId, string> = {
  tasks: 'tasks',
  funnel: 'funnel',
  clients: 'clients',
  finance: 'finance',
  warehouse: 'warehouse',
  processes: 'processes',
  analytics: 'analytics',
  team: 'team',
};

const MODULE_ICONS: Record<ModuleId, typeof CheckSquare> = {
  tasks: CheckSquare,
  funnel: Kanban,
  clients: Users,
  finance: Banknote,
  warehouse: Warehouse,
  processes: Workflow,
  analytics: BarChart3,
  team: BriefcaseBusiness,
};

function demoUrl(tab: HomeHeroTab): string {
  if (tab === 'overview') return 'demo.taska.uz/dashboard';
  return `demo.taska.uz/${MODULE_PATH[tab]}`;
}

export const HomeHeroTabsVisual: React.FC = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<HomeHeroTab>('overview');

  const nav = useMemo(() => {
    const rest = MODULE_IDS.map((id) => ({
      id: id as HomeHeroTab,
      icon: MODULE_ICONS[id],
      label: t(`modules.${id}.label`),
    }));
    return [
      { id: 'overview' as const, icon: LayoutDashboard, label: t('home.hero.tabOverview') },
      ...rest,
    ];
  }, [t]);

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: 14, y: 80 }}
      animate={{ opacity: 1, rotateX: 0, y: 0 }}
      transition={{ duration: 0.85, delay: 0.35, type: 'spring', stiffness: 70 }}
      className="relative mt-14 md:mt-20 w-full max-w-5xl mx-auto perspective-1000"
      style={{ perspective: '1200px' }}
    >
      <div className="rounded-2xl md:rounded-[1.35rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-28px_rgba(15,23,42,0.28)] overflow-hidden ring-1 ring-slate-900/[0.04]">
        <div className="h-10 md:h-11 border-b border-slate-200/80 flex items-center px-3 md:px-4 gap-2 bg-slate-50/95 justify-between">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="hidden sm:flex h-7 flex-1 max-w-[min(60%,320px)] mx-2 bg-white border border-slate-200/90 rounded-lg items-center justify-center text-[10px] text-slate-500 font-mono truncate px-2">
            {demoUrl(tab)}
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200/80 shrink-0" />
        </div>

        <div className="flex flex-col md:flex-row min-h-[320px] sm:min-h-[380px] md:min-h-[420px]">
          <aside className="flex md:flex-col border-b md:border-b-0 md:border-r border-slate-200/80 bg-slate-50/50 md:w-[13.5rem] lg:w-56 shrink-0 md:min-h-0 md:max-h-[min(70vh,520px)]">
            <div className="hidden md:flex items-center gap-2 px-3 pt-3 pb-2 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-emerald-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                T
              </div>
              <span className="font-bold text-slate-800 text-sm truncate">Taska Core</span>
            </div>
            <nav className="flex md:flex-col md:flex-1 md:min-h-0 md:overflow-y-auto p-2 gap-1 overflow-x-auto md:overflow-x-visible scrollbar-thin">
              {nav.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-[11px] lg:text-xs font-semibold whitespace-nowrap md:whitespace-normal transition-all shrink-0 md:shrink ${
                    tab === id
                      ? 'bg-white text-brand shadow-sm border border-slate-200/90'
                      : 'text-slate-500 hover:bg-white/80 border border-transparent'
                  }`}
                >
                  <Icon size={16} className="shrink-0 opacity-90" />
                  <span className="md:line-clamp-2">{label}</span>
                </button>
              ))}
            </nav>
            <div className="hidden md:block shrink-0 p-2 pt-0">
              <div className="p-3 bg-brand/5 rounded-xl border border-brand/10">
                <div className="text-[10px] font-semibold text-brand mb-1">{t('hero.ui.salesPlan')}</div>
                <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-brand h-full w-[85%] rounded-full" />
                </div>
                <div className="text-[9px] text-slate-500 mt-1 text-right tabular-nums">85%</div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0 bg-slate-50/30 overflow-hidden">
            <AnimatePresence mode="wait">
              <Fragment key={tab}>
                <HeroTabPanel tab={tab} t={t} />
              </Fragment>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-canvas/90 to-transparent rounded-b-2xl md:rounded-b-[1.35rem]"
        aria-hidden
      />
    </motion.div>
  );
};

type TFn = (key: string) => string;

function HeroTabPanel({ tab, t }: { tab: HomeHeroTab; t: TFn }) {
  const wrap = (children: React.ReactNode, className = '') => (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (tab === 'overview') {
    return wrap(
      <div className="h-full p-4 md:p-5 flex flex-col gap-4 overflow-auto max-h-[min(52vh,480px)] md:max-h-none">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] text-slate-500 mb-0.5">{t('hero.ui.revenue')}</div>
                <div className="text-lg font-bold text-slate-900">
                  42.5M <span className="text-xs font-normal text-slate-400">UZS</span>
                </div>
              </div>
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <BarChart3 size={16} />
              </div>
            </div>
            <div className="mt-2 flex items-end gap-0.5 h-7">
              {[40, 60, 45, 70, 85, 60, 75].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-emerald-100 rounded-t-sm" />
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] text-slate-500 mb-0.5">{t('hero.ui.tasks')}</div>
                <div className="text-lg font-bold text-slate-900">
                  12 <span className="text-xs font-normal text-slate-400">{t('hero.ui.tasksInWork')}</span>
                </div>
              </div>
              <div className="p-1.5 bg-sky-50 text-sky-600 rounded-lg">
                <Activity size={16} />
              </div>
            </div>
            <div className="mt-3 flex -space-x-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[9px] text-slate-600 font-bold"
                >
                  {i === 4 ? '+3' : ''}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[11px] text-slate-500 mb-0.5">{t('hero.ui.efficiency')}</div>
                <div className="text-lg font-bold text-slate-900">98%</div>
              </div>
              <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                <Zap size={16} />
              </div>
            </div>
            <div className="mt-3 h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-[98%] bg-amber-400 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col sm:flex-row gap-3 min-h-0">
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="flex justify-between items-center pb-1 border-b border-slate-200/60">
              <span className="font-semibold text-xs text-slate-700">{t('hero.ui.inWork')}</span>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-500">4</span>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm">
              <div className="flex gap-1.5 mb-1.5">
                <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 text-[9px] font-bold rounded">DEV</span>
                <span className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[9px] font-bold rounded">HIGH</span>
              </div>
              <div className="text-xs font-medium text-slate-800">{t('hero.ui.integrationTask')}</div>
              <div className="flex justify-between items-center mt-2">
                <Users size={12} className="text-slate-400" />
                <div className="text-[9px] text-slate-400">{t('hero.ui.today')}</div>
              </div>
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-sm opacity-90">
              <div className="text-xs font-medium text-slate-800">{t('hero.ui.landingTask')}</div>
              <div className="w-full bg-slate-100 h-1 rounded-full mt-2">
                <div className="w-1/2 bg-blue-500 h-full rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex-[1.4] bg-white rounded-xl border border-slate-200/80 p-3 shadow-sm hidden sm:flex flex-col min-h-[140px]">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-xs text-slate-800">{t('hero.ui.schedule')}</h4>
              <Calendar size={14} className="text-slate-400" />
            </div>
            <div className="space-y-2 flex-1">
              {[
                { name: 'ERP System Launch', start: 0, w: 60, col: 'bg-emerald-500' },
                { name: 'Mobile App Design', start: 30, w: 40, col: 'bg-blue-500' },
                { name: 'Marketing Strategy', start: 10, w: 30, col: 'bg-amber-500' },
              ].map((bar, i) => (
                <div key={i} className="relative h-7 bg-slate-50 rounded-lg flex items-center px-2">
                  <div
                    className={`absolute top-1 bottom-1 rounded opacity-20 ${bar.col}`}
                    style={{ left: `${bar.start}%`, width: `${bar.w}%` }}
                  />
                  <div
                    className={`absolute top-1.5 bottom-1.5 rounded ${bar.col}`}
                    style={{ left: `${bar.start}%`, width: '3px' }}
                  />
                  <span className="relative z-10 text-[9px] font-medium text-slate-600 ml-1 truncate">{bar.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>,
    );
  }

  if (tab === 'tasks') {
    return wrap(
      <div className="h-full min-h-[280px] md:min-h-[380px]">
        <TasksModuleHeroMainColumn />
      </div>,
    );
  }

  if (tab === 'analytics') {
    return wrap(
      <div className="h-full p-3 md:p-4 overflow-auto max-h-[min(52vh,480px)] md:max-h-none">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <BarChart3 size={16} className="text-sky-600" />
            <span className="font-semibold text-sm text-slate-900">{t('modules.analytics.demo.headerTitle')}</span>
          </div>
          <div className="flex rounded-lg bg-white border border-slate-200/80 p-0.5 gap-0.5">
            {(
              [
                { id: 'month' as const, key: 'modules.analytics.demo.periodMonth' as const },
                { id: 'quarter' as const, key: 'modules.analytics.demo.periodQuarter' as const },
                { id: 'year' as const, key: 'modules.analytics.demo.periodYear' as const },
              ] as const
            ).map(({ id, key }) => (
              <span
                key={id}
                className={`px-2 py-1 rounded-md text-[10px] font-semibold ${
                  id === 'month' ? 'bg-sky-600 text-white' : 'text-slate-500'
                }`}
              >
                {t(key)}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
          {(
            [
              { title: 'modules.analytics.demo.kpi1Title', value: 'modules.analytics.demo.kpi1Value', sub: 'modules.analytics.demo.kpi1Sub' },
              { title: 'modules.analytics.demo.kpi2Title', value: 'modules.analytics.demo.kpi2Value' },
              { title: 'modules.analytics.demo.kpi3Title', value: 'modules.analytics.demo.kpi3Value' },
              { title: 'modules.analytics.demo.kpi4Title', value: 'modules.analytics.demo.kpi4Value', sub: 'modules.analytics.demo.kpi4Sub' },
              { title: 'modules.analytics.demo.kpi5Title', value: 'modules.analytics.demo.kpi5Value' },
            ] as const
          ).map((k, i) => (
            <div key={i} className="rounded-xl bg-white border border-slate-200/80 p-2.5 shadow-sm">
              <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wide">{t(k.title)}</div>
              <div className="text-sm font-bold text-slate-900 mt-0.5 tabular-nums leading-tight">{t(k.value)}</div>
              {'sub' in k ? <div className="text-[9px] text-slate-400 mt-1 leading-snug">{t(k.sub)}</div> : null}
            </div>
          ))}
          <div className="rounded-xl bg-gradient-to-br from-sky-500/10 to-cyan-500/5 border border-sky-200/50 p-2.5 flex flex-col justify-center">
            <TrendingUp size={18} className="text-sky-600 mb-1" />
            <div className="text-[10px] font-bold text-slate-800">{t('modules.analytics.demo.funnelTitle')}</div>
            <div className="text-[9px] text-slate-500 mt-0.5">{t('home.hero.analyticsHint')}</div>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-sm">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">{t('modules.analytics.demo.funnelTitle')}</div>
          <div className="space-y-1.5">
            {(
              [
                { stage: 'modules.analytics.demo.funnelStage1', w: '100%', c: 'bg-slate-300' },
                { stage: 'modules.analytics.demo.funnelStage2', w: '16%', c: 'bg-sky-400' },
                { stage: 'modules.analytics.demo.funnelStage3', w: '29%', c: 'bg-sky-500' },
                { stage: 'modules.analytics.demo.funnelStage4', w: '8%', c: 'bg-sky-600' },
                { stage: 'modules.analytics.demo.funnelStage5', w: '21%', c: 'bg-emerald-500' },
              ] as const
            ).map((row) => (
              <div key={row.stage} className="flex items-center gap-2">
                <div className="w-24 shrink-0 text-[9px] text-slate-600 truncate">{t(row.stage)}</div>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.c}`} style={{ width: row.w }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>,
    );
  }

  if (tab === 'funnel') {
    return wrap(
      <div className="p-3 md:p-4 overflow-auto max-h-[min(52vh,520px)]">
        <div className="flex items-center gap-2 mb-3">
          <Kanban size={16} className="text-blue-600" />
          <span className="font-semibold text-sm text-slate-900">{t('modules.funnel.demo.pageTitle')}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 ml-auto">{t('modules.funnel.demo.filterPill')}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(
            [
              { stage: 'modules.funnel.demo.stage1', cards: ['modules.funnel.demo.cardTitle1', 'modules.funnel.demo.cardTitle2'] as const },
              { stage: 'modules.funnel.demo.stage2', cards: ['modules.funnel.demo.cardTitle3'] as const },
              { stage: 'modules.funnel.demo.stage3', cards: ['modules.funnel.demo.cardTitle4'] as const },
              { stage: 'modules.funnel.demo.stage4', cards: [] as const },
            ] as const
          ).map((col) => (
            <div
              key={col.stage}
              className="min-w-[120px] flex-1 rounded-xl border border-slate-200/80 bg-slate-100/80 p-2 flex flex-col gap-2"
            >
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide truncate">{t(col.stage)}</div>
              {col.cards.map((ck) => (
                <div key={ck} className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                  <div className="text-[9px] font-semibold text-blue-600">{t('modules.funnel.demo.cardTagSite')}</div>
                  <p className="text-[10px] font-semibold text-slate-800 mt-1 line-clamp-2 leading-snug">{t(ck)}</p>
                  <div className="text-[9px] text-slate-400 mt-1.5 tabular-nums">{t('modules.funnel.demo.cardAmount1')}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>,
    );
  }

  if (tab === 'clients') {
    return wrap(
      <div className="p-3 md:p-4 overflow-auto max-h-[min(52vh,520px)]">
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="rounded-xl bg-white border border-slate-200/80 px-3 py-2 shadow-sm flex-1 min-w-[120px]">
            <div className="text-[9px] text-slate-500">{t('modules.clients.demo.kpiRevenue')}</div>
            <div className="text-sm font-bold text-slate-900 tabular-nums">{t('modules.clients.demo.kpiRevenueVal')}</div>
          </div>
          <div className="rounded-xl bg-white border border-slate-200/80 px-3 py-2 shadow-sm flex-1 min-w-[120px]">
            <div className="text-[9px] text-slate-500">{t('modules.clients.demo.kpiContracts')}</div>
            <div className="text-sm font-bold text-slate-900">{t('modules.clients.demo.kpiContractsVal')}</div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden text-[10px]">
          <div className="grid grid-cols-12 gap-1 px-2 py-1.5 bg-slate-50 text-slate-500 font-semibold uppercase tracking-wide border-b border-slate-100">
            <span className="col-span-4">{t('modules.clients.demo.colClient')}</span>
            <span className="col-span-4">{t('modules.clients.demo.colServices')}</span>
            <span className="col-span-4 text-right">{t('modules.clients.demo.colAmount')}</span>
          </div>
          {(
            [
              ['modules.clients.demo.ctRow1Client', 'modules.clients.demo.ctRow1Svc', 'modules.clients.demo.ctRow1Amt'],
              ['modules.clients.demo.ctRow2Client', 'modules.clients.demo.ctRow2Svc', 'modules.clients.demo.ctRow2Amt'],
              ['modules.clients.demo.ctRow3Client', 'modules.clients.demo.ctRow3Svc', 'modules.clients.demo.ctRow3Amt'],
            ] as const
          ).map(([a, b, c], i) => (
            <div key={i} className="grid grid-cols-12 gap-1 px-2 py-2 border-b border-slate-50 text-slate-800">
              <span className="col-span-4 font-medium truncate">{t(a)}</span>
              <span className="col-span-4 text-slate-600 truncate">{t(b)}</span>
              <span className="col-span-4 text-right tabular-nums font-medium">{t(c)}</span>
            </div>
          ))}
        </div>
      </div>,
    );
  }

  if (tab === 'finance') {
    return wrap(
      <div className="p-3 md:p-4 overflow-auto max-h-[min(52vh,520px)]">
        <div className="flex items-center gap-2 mb-3">
          <Banknote size={16} className="text-amber-600" />
          <span className="font-semibold text-sm text-slate-900">{t('modules.finance.demo.headerTitle')}</span>
          <span className="text-[10px] ml-auto px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold">{t('modules.finance.demo.toggleActive')}</span>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-600">{t('modules.finance.demo.bdrByMonth')}</span>
            <span className="text-[10px] text-slate-500">{t('modules.finance.demo.bdrYear')}</span>
          </div>
          <div className="p-2 space-y-1">
            <div className="text-[9px] font-semibold text-slate-500 px-1">{t('modules.finance.demo.bdrIncome')}</div>
            <div className="grid grid-cols-5 gap-1 text-[9px] text-center text-slate-500 font-medium px-1">
              <span />
              <span>{t('modules.finance.demo.bdrM1')}</span>
              <span>{t('modules.finance.demo.bdrM2')}</span>
              <span>{t('modules.finance.demo.bdrM3')}</span>
              <span>{t('modules.finance.demo.bdrM4')}</span>
            </div>
            <div className="grid grid-cols-5 gap-1 text-[10px] items-center px-1 py-1 rounded-lg bg-emerald-50/50">
              <span className="text-slate-700 font-medium truncate">{t('modules.finance.demo.bdrIncRow1')}</span>
              <span className="text-center tabular-nums">{t('modules.finance.demo.bdrR11')}</span>
              <span className="text-center tabular-nums">{t('modules.finance.demo.bdrR12')}</span>
              <span className="text-center tabular-nums">{t('modules.finance.demo.bdrR13')}</span>
              <span className="text-center tabular-nums">{t('modules.finance.demo.bdrR14')}</span>
            </div>
            <div className="text-[9px] font-semibold text-slate-500 px-1 pt-1">{t('modules.finance.demo.bdrExpense')}</div>
            <div className="grid grid-cols-4 gap-1 text-[10px] text-slate-700 px-1">
              <span className="col-span-1 font-medium">{t('modules.finance.demo.bdrM1')}</span>
              <span className="col-span-3 tabular-nums text-rose-600 font-semibold">{t('modules.finance.demo.bdrExp1')}</span>
            </div>
          </div>
        </div>
      </div>,
    );
  }

  if (tab === 'warehouse') {
    return wrap(
      <div className="p-3 md:p-4 overflow-auto max-h-[min(52vh,520px)]">
        <div className="flex items-center gap-2 mb-3">
          <Package size={16} className="text-teal-600" />
          <span className="font-semibold text-sm text-slate-900">{t('modules.warehouse.demo.headerTitle')}</span>
        </div>
        <div className="flex gap-2 mb-3">
          <div className="flex-1 rounded-xl bg-white border border-slate-200/80 p-2 shadow-sm">
            <div className="text-[9px] text-slate-500">{t('modules.warehouse.demo.kpiStockValue')}</div>
            <div className="text-xs font-bold text-slate-900 tabular-nums">
              {t('modules.warehouse.demo.kpiStockValueVal')} <span className="text-slate-400 font-normal">{t('modules.warehouse.demo.kpiCurrency')}</span>
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-amber-50 border border-amber-200/60 p-2">
            <div className="text-[9px] text-amber-800">{t('modules.warehouse.demo.kpiLowStock')}</div>
            <div className="text-xs font-bold text-amber-900">{t('modules.warehouse.demo.kpiLowStockVal')}</div>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden text-[10px]">
          <div className="grid grid-cols-12 gap-1 px-2 py-1.5 bg-slate-50 text-slate-500 font-semibold uppercase border-b border-slate-100">
            <span className="col-span-6">{t('modules.warehouse.demo.colNomenclature')}</span>
            <span className="col-span-3 text-right">{t('modules.warehouse.demo.colBalance')}</span>
            <span className="col-span-3 text-right">{t('modules.warehouse.demo.colStatus')}</span>
          </div>
          {(
            [
              ['modules.warehouse.demo.balRow1Name', 'modules.warehouse.demo.balRow1Qty', 'modules.warehouse.demo.statusOk'],
              ['modules.warehouse.demo.balRow2Name', 'modules.warehouse.demo.balRow2Qty', 'modules.warehouse.demo.statusLow'],
              ['modules.warehouse.demo.balRow3Name', 'modules.warehouse.demo.balRow3Qty', 'modules.warehouse.demo.statusReserved'],
            ] as const
          ).map(([name, qty, st], i) => (
            <div key={i} className="grid grid-cols-12 gap-1 px-2 py-2 border-b border-slate-50">
              <span className="col-span-6 text-slate-800 truncate">{t(name)}</span>
              <span className="col-span-3 text-right tabular-nums font-medium">{t(qty)}</span>
              <span className="col-span-3 text-right text-[9px] text-emerald-700 font-semibold">{t(st)}</span>
            </div>
          ))}
        </div>
      </div>,
    );
  }

  if (tab === 'processes') {
    return wrap(
      <div className="p-3 md:p-4 overflow-auto max-h-[min(52vh,520px)] space-y-3">
        <div className="flex items-center gap-2">
          <Workflow size={16} className="text-indigo-600" />
          <span className="font-semibold text-sm text-slate-900">{t('modules.processes.demo.headerTitle')}</span>
        </div>
        <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
          <div className="flex justify-between items-start gap-2">
            <div>
              <div className="text-xs font-bold text-slate-900">{t('modules.processes.demo.tplCardTitle')}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{t('modules.processes.demo.tplSteps')}</div>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold">{t('modules.processes.demo.tplVersion')}</span>
          </div>
          <div className="mt-2 flex gap-2 text-[9px] text-slate-500">
            <span>{t('modules.processes.demo.tplActive')}</span>
            <span>·</span>
            <span>{t('modules.processes.demo.tplDone')}</span>
          </div>
        </div>
        <div className="rounded-xl border border-indigo-200/60 bg-indigo-50/40 p-3">
          <div className="text-[10px] font-bold text-indigo-900 uppercase tracking-wide">{t('modules.processes.demo.runSectionTitle')}</div>
          <div className="mt-2 rounded-lg bg-white border border-indigo-100 p-2">
            <div className="flex justify-between items-center gap-2">
              <span className="text-[10px] font-semibold text-slate-900 truncate">{t('modules.processes.demo.runInstTitle')}</span>
              <span className="text-[9px] text-emerald-600 font-bold shrink-0">{t('modules.processes.demo.runStatusActive')}</span>
            </div>
            <div className="text-[9px] text-slate-600 mt-1">{t('modules.processes.demo.runCurrentStep')}</div>
            <div className="text-[9px] text-slate-400 mt-1">{t('modules.processes.demo.runTasksProg')}</div>
          </div>
        </div>
      </div>,
    );
  }

  if (tab === 'team') {
    return wrap(
      <div className="p-3 md:p-4 overflow-auto max-h-[min(52vh,520px)]">
        <div className="flex items-center gap-2 mb-3">
          <BriefcaseBusiness size={16} className="text-rose-600" />
          <span className="font-semibold text-sm text-slate-900">{t('modules.team.demo.headerTitle')}</span>
        </div>
        <div className="space-y-2">
          {(
            [
              ['modules.team.demo.cardMainName', 'modules.team.demo.cardMainRole'],
              ['modules.team.demo.cardName2', 'modules.team.demo.cardRole2'],
              ['modules.team.demo.cardName3', 'modules.team.demo.cardRole3'],
            ] as const
          ).map(([nk, rk]) => (
            <div key={nk} className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 shrink-0" />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">{t(nk)}</div>
                <div className="text-[10px] text-slate-500 truncate">{t(rk)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl border border-slate-200/80 bg-slate-50 p-2.5">
          <div className="text-[9px] font-bold text-slate-500 uppercase">{t('modules.team.demo.orgDeptMkt')}</div>
          <div className="text-[10px] text-slate-800 mt-1">{t('modules.team.demo.orgHeadMktNames')}</div>
        </div>
      </div>,
    );
  }

  return null;
}
