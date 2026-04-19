import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Banknote,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  CheckSquare,
  DollarSign,
  Eye,
  FileText,
  Filter,
  Kanban,
  LayoutDashboard,
  Layers,
  Moon,
  Search,
  Settings,
  TrendingUp,
  UserCircle2,
  Users,
  Wallet,
  Warehouse,
  Workflow,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ModuleHeroVisualFrame } from './HeroVisual';

type AnalyticsView = 'dashboard' | 'statistics' | 'reports';
type Period = 'month' | 'quarter' | 'year';

const NAV_ICONS = [
  LayoutDashboard,
  CheckSquare,
  Kanban,
  Users,
  BarChart3,
  Banknote,
  Warehouse,
  Workflow,
] as const;
const ANALYTICS_NAV_INDEX = 4;

export const AnalyticsModuleHeroVisual: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<AnalyticsView>('dashboard');
  const [period, setPeriod] = useState<Period>('month');

  const mainTabs: { id: AnalyticsView; label: string }[] = [
    { id: 'dashboard', label: t('modules.analytics.page.tabDashboard') },
    { id: 'statistics', label: t('modules.analytics.page.tabStatistics') },
    { id: 'reports', label: t('modules.analytics.page.tabReports') },
  ];

  const periodTabs: { id: Period; label: string }[] = [
    { id: 'month', label: t('modules.analytics.demo.periodMonth') },
    { id: 'quarter', label: t('modules.analytics.demo.periodQuarter') },
    { id: 'year', label: t('modules.analytics.demo.periodYear') },
  ];

  const tabActive = (id: AnalyticsView) =>
    view === id ? 'bg-slate-900 text-white shadow-md shadow-slate-900/15' : 'text-slate-500 hover:text-slate-700';

  const periodActive = (id: Period) =>
    period === id ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 bg-white/80';

  const funnelStages = [
    { key: 's1', pct: 100 },
    { key: 's2', pct: 16 },
    { key: 's3', pct: 29 },
    { key: 's4', pct: 0 },
    { key: 's5', pct: 21 },
  ] as const;

  return (
    <ModuleHeroVisualFrame
      urlSegment="analytics"
      logoGradientClass="from-sky-500 to-cyan-600"
      sidebarActiveIndex={ANALYTICS_NAV_INDEX}
      navIcons={NAV_ICONS}
      sidebarActiveLabel={t('modules.analytics.demo.sidebarLabel')}
      minHeightClass="min-h-[320px] sm:min-h-[400px] md:min-h-[460px]"
    >
      <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-4 border-b border-slate-100 gap-y-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <BarChart3 size={17} className="text-sky-600 shrink-0" />
                <span className="font-semibold text-slate-900 text-sm md:text-base truncate">
                  {t('modules.analytics.demo.headerTitle')}
                </span>
                <Settings size={15} className="text-slate-400 shrink-0" />
              </div>
              <div className="flex-1 min-w-[140px] order-last sm:order-none w-full sm:w-auto">
                <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-slate-100 border border-slate-200/80 text-slate-400 text-xs">
                  <Search size={14} />
                  <span className="truncate">{t('modules.analytics.demo.search')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <Moon size={16} className="text-slate-400 hidden sm:block" />
                <Bell size={16} className="text-slate-400" />
                <div className="flex items-center gap-1.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  <span className="hidden lg:inline text-xs font-medium text-slate-700 max-w-[7rem] truncate">
                    {t('modules.analytics.demo.userName')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 md:px-4 border-b border-slate-100">
              <div className="flex rounded-xl bg-slate-100 p-0.5 gap-0.5">
                {mainTabs.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setView(id)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-semibold transition-all ${tabActive(id)}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex rounded-xl bg-slate-100/90 p-0.5 gap-0.5 border border-slate-200/60">
                {periodTabs.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPeriod(id)}
                    className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-semibold transition-all ${periodActive(id)}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 p-3 md:p-4 bg-slate-50/40 overflow-hidden">
              <AnimatePresence mode="wait">
                {view === 'dashboard' && (
                  <motion.div
                    key="dash"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 h-full"
                  >
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin -mx-0.5 px-0.5">
                      {[
                        {
                          title: t('modules.analytics.demo.kpi1Title'),
                          value: t('modules.analytics.demo.kpi1Value'),
                          sub: t('modules.analytics.demo.kpi1Sub'),
                          icon: DollarSign,
                          color: 'bg-emerald-100 text-emerald-700',
                        },
                        {
                          title: t('modules.analytics.demo.kpi2Title'),
                          value: t('modules.analytics.demo.kpi2Value'),
                          sub: '',
                          icon: CheckSquare,
                          color: 'bg-sky-100 text-sky-700',
                        },
                        {
                          title: t('modules.analytics.demo.kpi3Title'),
                          value: t('modules.analytics.demo.kpi3Value'),
                          sub: '',
                          icon: TrendingUp,
                          color: 'bg-orange-100 text-orange-700',
                        },
                        {
                          title: t('modules.analytics.demo.kpi4Title'),
                          value: t('modules.analytics.demo.kpi4Value'),
                          sub: t('modules.analytics.demo.kpi4Sub'),
                          icon: BriefcaseBusiness,
                          color: 'bg-amber-100 text-amber-800',
                        },
                        {
                          title: t('modules.analytics.demo.kpi5Title'),
                          value: t('modules.analytics.demo.kpi5Value'),
                          sub: '',
                          icon: Users,
                          color: 'bg-violet-100 text-violet-700',
                        },
                      ].map((k, i) => (
                        <div
                          key={i}
                          className="min-w-[140px] sm:min-w-[152px] flex-1 rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[10px] font-medium text-slate-500 leading-tight line-clamp-2">{k.title}</span>
                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${k.color}`}>
                              <k.icon size={16} strokeWidth={2.2} />
                            </div>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-slate-900 tabular-nums leading-tight">{k.value}</p>
                          {k.sub ? <p className="text-[9px] text-slate-400 mt-1 leading-snug">{k.sub}</p> : null}
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-slate-200/90 bg-white p-3 md:p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Banknote size={18} className="text-sky-600" />
                        <h3 className="text-sm font-bold text-slate-900">{t('modules.analytics.demo.financeSectionTitle')}</h3>
                      </div>
                      <p className="text-[10px] text-slate-500 mb-3 leading-relaxed">{t('modules.analytics.demo.financeSectionLead')}</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                          <p className="text-[10px] font-semibold text-slate-600 mb-2">{t('modules.analytics.demo.financeLeftTitle')}</p>
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-2 py-2">
                              <span className="text-[9px] font-bold text-emerald-800 block">{t('modules.analytics.demo.financeIncome')}</span>
                              <span className="text-xs font-bold text-emerald-900">0 UZS</span>
                            </div>
                            <div className="rounded-lg bg-rose-50 border border-rose-100 px-2 py-2">
                              <span className="text-[9px] font-bold text-rose-800 block">{t('modules.analytics.demo.financeExpense')}</span>
                              <span className="text-xs font-bold text-rose-900">0 UZS</span>
                            </div>
                          </div>
                          <p className="text-[9px] text-slate-500 mb-1">{t('modules.analytics.demo.financeCommissions')}</p>
                          <p className="text-xs font-bold text-slate-900 pt-2 border-t border-slate-200/80">
                            {t('modules.analytics.demo.financeNet')}: 0 UZS
                          </p>
                        </div>
                        <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                          <p className="text-[10px] font-semibold text-slate-600 mb-2">{t('modules.analytics.demo.financeRightTitle')}</p>
                          <div className="space-y-2 text-[10px]">
                            <div className="flex justify-between text-slate-600">
                              <span>{t('modules.analytics.demo.financeDocs')}</span>
                              <span className="font-semibold text-slate-900">0</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span>{t('modules.analytics.demo.financeIncomeCash')}</span>
                              <span className="font-semibold text-slate-900">0 UZS</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                              <span>{t('modules.analytics.demo.financeExpensesApproved')}</span>
                              <span className="font-semibold text-slate-900">0 UZS</span>
                            </div>
                            <div className="flex justify-between items-center rounded-lg bg-sky-50 border border-sky-100 px-2 py-2 mt-2 font-bold text-slate-900">
                              <span>{t('modules.analytics.demo.financeTotal')}</span>
                              <span>0 UZS</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'statistics' && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-900">{t('modules.analytics.demo.funnelTitle')}</span>
                          <Filter size={14} className="text-slate-400" />
                        </div>
                        <div className="space-y-2">
                          {funnelStages.map((s, idx) => (
                            <div key={s.key} className="flex items-center gap-2">
                              <span className="text-[9px] text-slate-500 w-[5.5rem] shrink-0 truncate" title={t(`modules.analytics.demo.funnelStage${idx + 1}`)}>
                                {t(`modules.analytics.demo.funnelStage${idx + 1}`)}
                              </span>
                              <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-sky-500"
                                  style={{ width: `${s.pct}%` }}
                                />
                              </div>
                              <span className="text-[10px] font-bold text-slate-700 w-6 text-right tabular-nums">
                                {t(`modules.analytics.demo.funnelCount${idx + 1}`)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-sm">
                        <div className="flex items-center gap-2 mb-3">
                          <Layers size={16} className="text-sky-600" />
                          <span className="text-xs font-bold text-slate-900">{t('modules.analytics.demo.tasksByModuleTitle')}</span>
                        </div>
                        <div className="divide-y divide-slate-100">
                          <div className="flex justify-between py-2.5">
                            <span className="text-[11px] text-slate-600">{t('modules.analytics.demo.tasksTotalLabel')}</span>
                            <span className="text-sm font-bold text-slate-900 tabular-nums">{t('modules.analytics.demo.tasksTotalValue')}</span>
                          </div>
                          <div className="flex justify-between py-2.5">
                            <span className="text-[11px] text-slate-600">{t('modules.analytics.demo.tasksOverdueLabel')}</span>
                            <span className="text-sm font-bold text-rose-600 tabular-nums">{t('modules.analytics.demo.tasksOverdueValue')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200/90 bg-white shadow-sm overflow-hidden">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-900">{t('modules.analytics.demo.ratingTitle')}</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[10px]">
                          <thead>
                            <tr className="text-left text-[9px] uppercase tracking-wide text-slate-400 border-b border-slate-100">
                              <th className="px-3 py-2 w-8">{t('modules.analytics.demo.colRank')}</th>
                              <th className="px-3 py-2">{t('modules.analytics.demo.colEmployee')}</th>
                              <th className="px-3 py-2 text-right">{t('modules.analytics.demo.colClosed')}</th>
                              <th className="px-3 py-2 text-right">{t('modules.analytics.demo.colEfficiency')}</th>
                              <th className="px-3 py-2 text-right">{t('modules.analytics.demo.colSales')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-50">
                              <td className="px-3 py-2 font-semibold text-slate-600">1</td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 shrink-0" />
                                  <span className="font-medium text-slate-800 truncate">{t('modules.analytics.demo.row1Name')}</span>
                                </div>
                              </td>
                              <td className="px-3 py-2 text-right font-semibold tabular-nums">{t('modules.analytics.demo.row1Closed')}</td>
                              <td className="px-3 py-2 text-right tabular-nums text-slate-700">{t('modules.analytics.demo.row1Eff')}</td>
                              <td className="px-3 py-2 text-right font-bold text-emerald-600 tabular-nums">{t('modules.analytics.demo.row1Sales')}</td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 font-semibold text-slate-600">2</td>
                              <td className="px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-200 to-purple-300 shrink-0" />
                                  <span className="font-medium text-slate-800 truncate">{t('modules.analytics.demo.row2Name')}</span>
                                </div>
                              </td>
                              <td className="px-3 py-2 text-right font-semibold tabular-nums">{t('modules.analytics.demo.row2Closed')}</td>
                              <td className="px-3 py-2 text-right tabular-nums text-slate-700">{t('modules.analytics.demo.row2Eff')}</td>
                              <td className="px-3 py-2 text-right font-semibold text-slate-500 tabular-nums">—</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'reports' && (
                  <motion.div
                    key="rep"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {[
                      { icon: Wallet, color: 'bg-emerald-100 text-emerald-700', titleKey: 'rep1Title', descKey: 'rep1Desc' },
                      { icon: TrendingUp, color: 'bg-sky-100 text-sky-700', titleKey: 'rep2Title', descKey: 'rep2Desc' },
                      { icon: UserCircle2, color: 'bg-violet-100 text-violet-700', titleKey: 'rep3Title', descKey: 'rep3Desc' },
                      { icon: FileText, color: 'bg-orange-100 text-orange-700', titleKey: 'rep4Title', descKey: 'rep4Desc' },
                    ].map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white p-3 md:p-4 shadow-sm"
                      >
                        <div className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${r.color}`}>
                          <r.icon size={22} strokeWidth={2} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900">{t(`modules.analytics.demo.${r.titleKey}`)}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">{t(`modules.analytics.demo.${r.descKey}`)}</p>
                        </div>
                        <Eye size={18} className="text-slate-300 shrink-0" />
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
    </ModuleHeroVisualFrame>
  );
};
