import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Briefcase,
  Building2,
  Kanban,
  Moon,
  Pencil,
  Plus,
  Search,
  Settings,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type ClientsView = 'base' | 'contracts' | 'finance' | 'debts';

const NAV_ICONS = [Kanban, Kanban, Kanban, Briefcase, Kanban, Kanban, Kanban] as const;

export const ClientsModuleHeroVisual: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<ClientsView>('base');

  const tabs: { id: ClientsView; label: string }[] = [
    { id: 'base', label: t('modules.clients.page.tabBase') },
    { id: 'contracts', label: t('modules.clients.page.tabContracts') },
    { id: 'finance', label: t('modules.clients.page.tabFinance') },
    { id: 'debts', label: t('modules.clients.page.tabDebts') },
  ];

  const tabActive = (id: ClientsView) =>
    view === id ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25' : 'text-slate-500 hover:text-slate-700';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.75, delay: 0.25, type: 'spring', stiffness: 80 }}
      className="mt-12 md:mt-16 w-full max-w-5xl mx-auto perspective-1000"
      style={{ perspective: '1200px' }}
    >
      <div className="rounded-2xl md:rounded-[1.35rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-28px_rgba(15,23,42,0.28)] overflow-hidden ring-1 ring-slate-900/[0.04]">
        <div className="h-10 md:h-11 border-b border-slate-200/80 flex items-center px-3 md:px-4 gap-2 bg-slate-50/95 justify-between">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="hidden sm:flex h-7 flex-1 max-w-[min(52%,280px)] mx-2 bg-white border border-slate-200/90 rounded-lg items-center justify-center text-[10px] text-slate-500 font-mono truncate px-2">
            demo.taska.uz/clients
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200/80 shrink-0" />
        </div>

        <div className="flex min-h-[300px] sm:min-h-[340px] md:min-h-[400px]">
          <aside className="hidden md:flex w-48 flex-col border-r border-slate-200/80 bg-slate-50/50 py-3 px-2 gap-0.5 shrink-0">
            <div className="flex items-center gap-2 px-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                T
              </div>
              <span className="font-bold text-slate-800 text-sm truncate">Taska</span>
            </div>
            {NAV_ICONS.map((Icon, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
                  i === 3 ? 'bg-white shadow-sm text-slate-900 border border-slate-200/80' : 'text-slate-400'
                }`}
              >
                <Icon size={15} className="shrink-0 opacity-80" />
                {i === 3 ? (
                  <span className="truncate font-medium">{t('modules.clients.demo.pageTitle')}</span>
                ) : (
                  <span className="truncate opacity-60">· · ·</span>
                )}
              </div>
            ))}
          </aside>

          <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-4 border-b border-slate-100 gap-y-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Briefcase size={17} className="text-violet-600 shrink-0" />
                <span className="font-semibold text-slate-900 text-sm md:text-base truncate">{t('modules.clients.demo.headerTitle')}</span>
                <Settings size={15} className="text-slate-400 shrink-0" />
              </div>
              <div className="flex-1 min-w-[140px] order-last sm:order-none w-full sm:w-auto">
                <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-slate-100 border border-slate-200/80 text-slate-400 text-xs">
                  <Search size={14} />
                  <span className="truncate">{t('modules.clients.demo.search')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <Moon size={16} className="text-slate-400 hidden sm:block" />
                <Bell size={16} className="text-slate-400" />
                <div className="flex items-center gap-1.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  <span className="hidden lg:inline text-xs font-medium text-slate-700 max-w-[7rem] truncate">
                    {t('modules.clients.demo.userName')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 md:px-4 border-b border-slate-100">
              <div className="flex flex-wrap rounded-lg bg-slate-100 p-0.5 gap-0.5">
                {tabs.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setView(id)}
                    className={`px-2 sm:px-2.5 py-1.5 rounded-md text-[9px] sm:text-[11px] font-semibold transition-all whitespace-nowrap ${tabActive(id)}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-flex text-[10px] font-semibold text-slate-600 px-2 py-1 rounded-lg border border-slate-200/80 bg-white">
                  {t('modules.clients.demo.funnelFilter')}
                </span>
                <button
                  type="button"
                  className="p-2 rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30 hover:bg-violet-700"
                  aria-label="Add"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-2 sm:p-3 md:p-4 overflow-hidden bg-slate-50/40 overflow-y-auto max-h-[min(420px,55vh)]">
              <AnimatePresence mode="wait">
                {view === 'base' && (
                  <motion.div
                    key="base"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
                  >
                    {(
                      [
                        { k: 'card1' as const, hasContracts: true },
                        { k: 'card2' as const, hasContracts: true },
                        { k: 'card3' as const, hasContracts: true },
                        { k: 'card4' as const, hasContracts: false },
                      ] as const
                    ).map((c) => (
                      <div
                        key={c.k}
                        className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm relative"
                      >
                        <button type="button" className="absolute top-2.5 right-2.5 text-slate-400 hover:text-violet-600" aria-label="Edit">
                          <Pencil size={14} />
                        </button>
                        <h3 className="text-sm font-bold text-slate-900 pr-7 mb-2">{t(`modules.clients.demo.${c.k}Name` as 'modules.clients.demo.card1Name')}</h3>
                        {c.hasContracts ? (
                          <>
                            <p className="text-[10px] text-slate-500 mb-1">{t(`modules.clients.demo.${c.k}Contracts` as 'modules.clients.demo.card1Contracts')}</p>
                            <p className="text-[11px] text-slate-700 mb-1">{t(`modules.clients.demo.${c.k}Service` as 'modules.clients.demo.card1Service')}</p>
                            <p className="text-sm font-bold text-emerald-600 tabular-nums">{t(`modules.clients.demo.${c.k}Amount` as 'modules.clients.demo.card1Amount')}</p>
                          </>
                        ) : (
                          <p className="text-[11px] text-slate-400 italic">{t('modules.clients.demo.cardEmpty')}</p>
                        )}
                        <button
                          type="button"
                          className="mt-3 w-full text-[10px] font-bold py-2 rounded-lg border border-violet-200 text-violet-700 bg-violet-50/50 hover:bg-violet-50"
                        >
                          {t('modules.clients.demo.addContract')}
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}

                {view === 'contracts' && (
                  <motion.div
                    key="contracts"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-x-auto"
                  >
                    <table className="w-full text-left text-[10px] sm:text-xs min-w-[520px]">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wide">
                          <th className="px-2 py-2 w-8">№</th>
                          <th className="px-2 py-2">{t('modules.clients.demo.colClient')}</th>
                          <th className="px-2 py-2 hidden sm:table-cell">{t('modules.clients.demo.colServices')}</th>
                          <th className="px-2 py-2">{t('modules.clients.demo.colAmount')}</th>
                          <th className="px-2 py-2">{t('modules.clients.demo.colPayment')}</th>
                          <th className="px-2 py-2">{t('modules.clients.demo.colStatus')}</th>
                          <th className="px-2 py-2 w-10" />
                        </tr>
                      </thead>
                      <tbody className="text-slate-800">
                        {[1, 2, 3].map((n) => (
                          <tr key={n} className="border-b border-slate-50">
                            <td className="px-2 py-2.5 text-slate-400 font-mono">1</td>
                            <td className="px-2 py-2.5 font-medium">{t(`modules.clients.demo.ctRow${n}Client` as 'modules.clients.demo.ctRow1Client')}</td>
                            <td className="px-2 py-2.5 hidden sm:table-cell text-slate-500">{t(`modules.clients.demo.ctRow${n}Svc` as 'modules.clients.demo.ctRow1Svc')}</td>
                            <td className="px-2 py-2.5 font-bold tabular-nums">{t(`modules.clients.demo.ctRow${n}Amt` as 'modules.clients.demo.ctRow1Amt')}</td>
                            <td className="px-2 py-2.5 text-slate-600">{t(`modules.clients.demo.ctRow${n}Pay` as 'modules.clients.demo.ctRow1Pay')}</td>
                            <td className="px-2 py-2.5">
                              <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-bold">
                                {t('modules.clients.demo.statusActive')}
                              </span>
                            </td>
                            <td className="px-2 py-2.5">
                              <Pencil size={14} className="text-slate-400" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {view === 'finance' && (
                  <motion.div
                    key="finance"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-600 mb-1">
                          <TrendingUp size={16} />
                          <span className="text-[10px] font-bold uppercase text-slate-500">{t('modules.clients.demo.kpiRevenue')}</span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums">{t('modules.clients.demo.kpiRevenueVal')}</p>
                        <p className="text-[10px] text-slate-500">UZS</p>
                      </div>
                      <div className="rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-violet-600 mb-1">
                          <Building2 size={16} />
                          <span className="text-[10px] font-bold uppercase text-slate-500">{t('modules.clients.demo.kpiContracts')}</span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums">{t('modules.clients.demo.kpiContractsVal')}</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-2">{t('modules.clients.demo.paySchedule')}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { day: '1', client: 'pay1', amt: 'pay1Amt' },
                          { day: '5', client: 'pay2', amt: 'pay2Amt' },
                          { day: '10', client: 'pay3', amt: 'pay3Amt' },
                          { day: '20', client: 'pay4', amt: 'pay4Amt' },
                          { day: '25', client: 'pay5', amt: 'pay5Amt' },
                          { day: '28', client: 'pay6', amt: 'pay6Amt' },
                        ].map((p) => (
                          <div key={p.day} className="rounded-lg border border-slate-100 bg-slate-50/80 p-2 flex gap-2">
                            <span className="shrink-0 w-7 h-7 rounded-md bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center">
                              {p.day}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[10px] font-bold text-slate-900 truncate">{t(`modules.clients.demo.${p.client}` as 'modules.clients.demo.pay1')}</p>
                              <p className="text-[10px] font-semibold text-violet-700 tabular-nums">{t(`modules.clients.demo.${p.amt}` as 'modules.clients.demo.pay1Amt')}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'debts' && (
                  <motion.div
                    key="debts"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-x-auto"
                  >
                    <table className="w-full text-left text-[10px] sm:text-xs min-w-[480px]">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wide">
                          <th className="px-2 sm:px-3 py-2">{t('modules.clients.demo.colClient')}</th>
                          <th className="px-2 py-2">{t('modules.clients.demo.colAmount')}</th>
                          <th className="px-2 py-2">{t('modules.clients.demo.colDue')}</th>
                          <th className="px-2 py-2">{t('modules.clients.demo.colStatus')}</th>
                          <th className="px-2 sm:px-3 py-2 hidden sm:table-cell">{t('modules.clients.demo.colDesc')}</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-800">
                        <tr className="border-b border-slate-50">
                          <td className="px-2 sm:px-3 py-2.5 font-medium">{t('modules.clients.demo.debtClient')}</td>
                          <td className="px-2 py-2.5 font-bold tabular-nums">{t('modules.clients.demo.debtAmt1')}</td>
                          <td className="px-2 py-2.5 text-slate-600">{t('modules.clients.demo.debtDue1')}</td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200/80 text-[10px] font-bold">
                              {t('modules.clients.demo.statusOverdue')}
                            </span>
                          </td>
                          <td className="px-2 sm:px-3 py-2.5 text-slate-600 hidden sm:table-cell">{t('modules.clients.demo.debtDesc1')}</td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-3 py-2.5 font-medium">{t('modules.clients.demo.debtClient')}</td>
                          <td className="px-2 py-2.5 font-bold tabular-nums">{t('modules.clients.demo.debtAmt2')}</td>
                          <td className="px-2 py-2.5 text-slate-600">{t('modules.clients.demo.debtDue2')}</td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200/80 text-[10px] font-bold">
                              {t('modules.clients.demo.statusOverdue')}
                            </span>
                          </td>
                          <td className="px-2 sm:px-3 py-2.5 text-slate-600 hidden sm:table-cell">{t('modules.clients.demo.debtDesc2')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
