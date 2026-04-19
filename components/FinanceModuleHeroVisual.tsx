import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Banknote,
  Bell,
  CheckSquare,
  ChevronDown,
  FileSpreadsheet,
  FileText,
  Kanban,
  LayoutDashboard,
  Moon,
  Plus,
  Search,
  Settings,
  Trash2,
  TrendingDown,
  TrendingUp,
  Users,
  Warehouse,
  Workflow,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ModuleHeroVisualFrame } from './HeroVisual';

type FinanceView = 'planning' | 'bdr' | 'requests' | 'statements' | 'finplan';

const NAV_ICONS = [LayoutDashboard, CheckSquare, Kanban, Users, Banknote, Warehouse, Workflow] as const;
const FIN_NAV_INDEX = 4;

export const FinanceModuleHeroVisual: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<FinanceView>('planning');

  const tabs: { id: FinanceView; label: string }[] = [
    { id: 'planning', label: t('modules.finance.page.tabPlanning') },
    { id: 'bdr', label: t('modules.finance.page.tabBdr') },
    { id: 'requests', label: t('modules.finance.page.tabRequests') },
    { id: 'statements', label: t('modules.finance.page.tabStatements') },
    { id: 'finplan', label: t('modules.finance.page.tabFinPlan') },
  ];

  const tabActive = (id: FinanceView) =>
    view === id ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20' : 'text-slate-500 hover:text-slate-700';

  const bdrMonths = ['bdrM1', 'bdrM2', 'bdrM3', 'bdrM4'] as const;

  return (
    <ModuleHeroVisualFrame
      urlSegment="finance"
      logoGradientClass="from-amber-500 to-orange-600"
      sidebarActiveIndex={FIN_NAV_INDEX}
      navIcons={NAV_ICONS}
      sidebarActiveLabel={t('modules.finance.demo.sidebarLabel')}
      minHeightClass="min-h-[300px] sm:min-h-[360px] md:min-h-[420px]"
    >
      <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-4 border-b border-slate-100 gap-y-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Banknote size={17} className="text-amber-600 shrink-0" />
                <span className="font-semibold text-slate-900 text-sm md:text-base truncate">{t('modules.finance.demo.headerTitle')}</span>
                <Settings size={15} className="text-slate-400 shrink-0" />
              </div>
              <div className="flex-1 min-w-[140px] order-last sm:order-none w-full sm:w-auto">
                <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-slate-100 border border-slate-200/80 text-slate-400 text-xs">
                  <Search size={14} />
                  <span className="truncate">{t('modules.finance.demo.search')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <Moon size={16} className="text-slate-400 hidden sm:block" />
                <Bell size={16} className="text-slate-400" />
                <div className="flex items-center gap-1.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  <span className="hidden lg:inline text-xs font-medium text-slate-700 max-w-[7rem] truncate">
                    {t('modules.finance.demo.userName')}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 md:px-4 border-b border-slate-100 flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setView(tab.id)}
                    className={`px-2 sm:px-2.5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold transition-all whitespace-nowrap ${tabActive(tab.id)}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {view === 'planning' && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-bold text-slate-500 bg-slate-100 rounded-full px-2 py-1 border border-slate-200/80">
                    <span className="text-slate-900">{t('modules.finance.demo.toggleActive')}</span>
                    <span>/</span>
                    <span>{t('modules.finance.demo.toggleArchive')}</span>
                  </span>
                )}
                <button type="button" className="p-2 rounded-lg bg-emerald-600 text-white shadow-md shadow-emerald-600/25" aria-label="Add">
                  <Plus size={17} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-2 sm:p-3 md:p-4 overflow-hidden bg-slate-50/40 overflow-y-auto max-h-[min(480px,58vh)]">
              <AnimatePresence mode="wait">
                {view === 'planning' && (
                  <motion.div
                    key="planning"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">{t('modules.finance.demo.planDeptTitle')}</p>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm flex flex-wrap items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-100 shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900">{t('modules.finance.demo.planCardTitle')}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{t('modules.finance.demo.planCardMeta')}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
                            {t('modules.finance.demo.planStatusCreated')}
                          </span>
                          <span className="text-[10px] text-slate-400">{t('modules.finance.demo.planCardDate')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-auto">
                        <button type="button" className="p-1.5 text-slate-400 hover:text-rose-500" aria-label="Delete">
                          <Trash2 size={15} />
                        </button>
                        <button type="button" className="p-1.5 text-slate-400 hover:text-amber-600" aria-label="Open">
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'bdr' && (
                  <motion.div
                    key="bdr"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex flex-wrap items-center gap-2 justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-1 rounded-lg border border-slate-200 bg-white text-slate-700">
                          {t('modules.finance.demo.bdrYear')}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-900 text-white">{t('modules.finance.demo.bdrByMonth')}</span>
                        <span className="text-[10px] font-semibold text-slate-400">{t('modules.finance.demo.bdrByQ')}</span>
                        <span className="text-[10px] font-semibold text-slate-400">{t('modules.finance.demo.bdrByYear')}</span>
                      </div>
                      <button type="button" className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-violet-600 text-white shadow-sm">
                        {t('modules.finance.demo.saveBtn')}
                      </button>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-x-auto">
                      <table className="w-full text-left text-[9px] sm:text-[10px] min-w-[420px]">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wide">
                            <th className="px-2 py-2 w-24">{t('modules.finance.demo.bdrColArticle')}</th>
                            {bdrMonths.map((m) => (
                              <th key={m} className="px-1 py-2 text-right tabular-nums">
                                {t(`modules.finance.demo.${m}` as 'modules.finance.demo.bdrM1')}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-slate-800">
                          <tr className="border-b border-slate-50 bg-emerald-50/40">
                            <td className="px-2 py-1.5 font-bold text-emerald-800">
                              <span className="inline-flex items-center gap-1">
                                <TrendingUp size={12} /> {t('modules.finance.demo.bdrIncome')}
                              </span>
                            </td>
                            {bdrMonths.map((m) => (
                              <td key={m} className="px-1 py-1.5 text-right font-semibold tabular-nums text-emerald-800">
                                {t(`modules.finance.demo.bdrInc${m.slice(-1)}` as 'modules.finance.demo.bdrInc1')}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-50">
                            <td className="px-2 py-1 pl-4 text-slate-600">{t('modules.finance.demo.bdrIncRow1')}</td>
                            {bdrMonths.map((m) => (
                              <td key={m} className="px-1 py-1 text-right tabular-nums text-slate-700">
                                {t(`modules.finance.demo.bdrR1${m.slice(-1)}` as 'modules.finance.demo.bdrR11')}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-slate-50 bg-rose-50/40">
                            <td className="px-2 py-1.5 font-bold text-rose-800">
                              <span className="inline-flex items-center gap-1">
                                <TrendingDown size={12} /> {t('modules.finance.demo.bdrExpense')}
                              </span>
                            </td>
                            {bdrMonths.map((m) => (
                              <td key={m} className="px-1 py-1.5 text-right font-semibold tabular-nums text-rose-800">
                                {t(`modules.finance.demo.bdrExp${m.slice(-1)}` as 'modules.finance.demo.bdrExp1')}
                              </td>
                            ))}
                          </tr>
                          <tr className="bg-slate-50/80">
                            <td className="px-2 py-1.5 font-bold text-blue-800">{t('modules.finance.demo.bdrProfit')}</td>
                            {bdrMonths.map((m) => (
                              <td
                                key={m}
                                className={`px-1 py-1.5 text-right font-bold tabular-nums ${
                                  m === 'bdrM1' || m === 'bdrM2' ? 'text-rose-600' : 'text-emerald-700'
                                }`}
                              >
                                {t(`modules.finance.demo.bdrPr${m.slice(-1)}` as 'modules.finance.demo.bdrPr1')}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {view === 'requests' && (
                  <motion.div
                    key="requests"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-xs font-bold text-slate-900 mb-2">{t('modules.finance.demo.reqRegistryTitle')}</p>
                    <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-x-auto">
                      <table className="w-full text-left text-[9px] sm:text-[10px] min-w-[520px]">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wide">
                            <th className="px-2 py-2">{t('modules.finance.demo.colDate')}</th>
                            <th className="px-2 py-2 hidden sm:table-cell">{t('modules.finance.demo.colEmployee')}</th>
                            <th className="px-2 py-2">{t('modules.finance.demo.colDept')}</th>
                            <th className="px-2 py-2">{t('modules.finance.demo.colArticle')}</th>
                            <th className="px-2 py-2">{t('modules.finance.demo.colAmount')}</th>
                            <th className="px-2 py-2 hidden md:table-cell">{t('modules.finance.demo.colDesc')}</th>
                            <th className="px-2 py-2">{t('modules.finance.demo.colStatus')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-50">
                            <td className="px-2 py-2 text-slate-600">{t('modules.finance.demo.req1Date')}</td>
                            <td className="px-2 py-2 hidden sm:table-cell text-slate-700">{t('modules.finance.demo.req1Emp')}</td>
                            <td className="px-2 py-2 text-slate-600">{t('modules.finance.demo.req1Dept')}</td>
                            <td className="px-2 py-2 font-medium">{t('modules.finance.demo.req1Article')}</td>
                            <td className="px-2 py-2 font-bold tabular-nums">{t('modules.finance.demo.req1Amt')}</td>
                            <td className="px-2 py-2 text-slate-500 hidden md:table-cell">{t('modules.finance.demo.req1Desc')}</td>
                            <td className="px-2 py-2">
                              <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[9px] font-bold">
                                {t('modules.finance.demo.statusApproved')}
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-2 py-2 text-slate-600">{t('modules.finance.demo.req2Date')}</td>
                            <td className="px-2 py-2 hidden sm:table-cell text-slate-700">{t('modules.finance.demo.req2Emp')}</td>
                            <td className="px-2 py-2 text-slate-600">{t('modules.finance.demo.req2Dept')}</td>
                            <td className="px-2 py-2 font-medium">{t('modules.finance.demo.req2Article')}</td>
                            <td className="px-2 py-2 font-bold tabular-nums">{t('modules.finance.demo.req2Amt')}</td>
                            <td className="px-2 py-2 text-slate-500 hidden md:table-cell">{t('modules.finance.demo.req2Desc')}</td>
                            <td className="px-2 py-2">
                              <span className="inline-flex px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200/80 text-[9px] font-bold">
                                {t('modules.finance.demo.statusRejected')}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {view === 'statements' && (
                  <motion.div
                    key="statements"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="flex flex-wrap gap-1.5 pb-1 border-b border-slate-200/60">
                      <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-slate-900 text-white">{t('modules.finance.demo.stSubBalance')}</span>
                      <span className="text-[9px] font-semibold text-slate-400 px-2 py-1">{t('modules.finance.demo.stSubIn')}</span>
                      <span className="text-[9px] font-semibold text-slate-400 px-2 py-1">{t('modules.finance.demo.stSubOut')}</span>
                      <span className="text-[9px] font-semibold text-slate-400 px-2 py-1">{t('modules.finance.demo.stSubRec')}</span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      {(
                        [
                          { k: 'stKpiIn', val: 'stKpiInVal', color: 'text-emerald-700' },
                          { k: 'stKpiOut', val: 'stKpiOutVal', color: 'text-rose-700' },
                          { k: 'stKpiBal', val: 'stKpiBalVal', color: 'text-emerald-700' },
                          { k: 'stKpiFee', val: 'stKpiFeeVal', color: 'text-amber-700' },
                        ] as const
                      ).map((row) => (
                        <div key={row.k} className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
                          <p className="text-[9px] font-bold uppercase text-slate-500 mb-1">{t(`modules.finance.demo.${row.k}` as 'modules.finance.demo.stKpiIn')}</p>
                          <p className={`text-sm font-bold tabular-nums ${row.color}`}>{t(`modules.finance.demo.${row.val}` as 'modules.finance.demo.stKpiInVal')}</p>
                          <p className="text-[9px] text-slate-400">UZS</p>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-left text-[10px] font-semibold text-slate-800 shadow-sm hover:bg-slate-50/80"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <FileSpreadsheet size={16} className="text-violet-600 shrink-0" />
                        <span className="truncate">{t('modules.finance.demo.stRowTitle')}</span>
                      </span>
                      <ChevronDown size={16} className="text-slate-400 shrink-0" />
                    </button>
                  </motion.div>
                )}

                {view === 'finplan' && (
                  <motion.div
                    key="finplan"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200/80">
                        {t('modules.finance.demo.fpCfoBadge')}
                      </span>
                      <span className="text-[10px] text-slate-500">{t('modules.finance.demo.fpSubtitle')}</span>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <p className="text-[9px] font-bold uppercase text-slate-500 mb-1">{t('modules.finance.demo.fpDept')}</p>
                          <div className="h-9 rounded-lg border border-slate-200 bg-slate-50/80 px-2 flex items-center text-[11px] font-medium text-slate-800">
                            {t('modules.finance.demo.fpDeptVal')}
                          </div>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase text-slate-500 mb-1">{t('modules.finance.demo.fpPeriod')}</p>
                          <div className="h-9 rounded-lg border border-slate-200 bg-slate-50/80 px-2 flex items-center text-[11px] text-slate-700">
                            {t('modules.finance.demo.fpPeriodVal')}
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase text-slate-500 mb-1">{t('modules.finance.demo.fpIncome')}</p>
                        <div className="h-11 rounded-lg border border-slate-200 bg-white px-3 flex items-center text-sm font-bold tabular-nums text-slate-900">
                          {t('modules.finance.demo.fpIncomeVal')}
                        </div>
                      </div>
                      <div className="rounded-lg border border-dashed border-amber-200/80 bg-amber-50/30 p-3">
                        <p className="text-[9px] font-bold uppercase text-slate-600 mb-1">{t('modules.finance.demo.fpFundsTitle')}</p>
                        <p className="text-[10px] text-slate-500 mb-2">{t('modules.finance.demo.fpFundsHint')}</p>
                        {(['fpF1', 'fpF2', 'fpF3'] as const).map((fk) => (
                          <div key={fk} className="flex items-center justify-between gap-2 py-1.5 border-b border-amber-100/80 last:border-0">
                            <span className="text-[11px] font-medium text-slate-800">{t(`modules.finance.demo.${fk}Label` as 'modules.finance.demo.fpF1Label')}</span>
                            <span className="text-xs font-bold tabular-nums text-slate-700">{t(`modules.finance.demo.${fk}Val` as 'modules.finance.demo.fpF1Val')}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 justify-end pt-1">
                        <button type="button" className="text-[10px] font-bold px-3 py-2 rounded-lg border border-slate-200 text-slate-600 bg-white">
                          {t('modules.finance.demo.fpConduct')}
                        </button>
                        <button type="button" className="text-[10px] font-bold px-4 py-2 rounded-lg bg-slate-900 text-white shadow-sm flex items-center gap-1.5">
                          {t('modules.finance.demo.fpSave')}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
    </ModuleHeroVisualFrame>
  );
};
