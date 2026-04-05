import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Calendar,
  CheckSquare,
  Filter,
  GanttChart,
  Kanban,
  LayoutList,
  Moon,
  Plus,
  Search,
  Settings,
  Table2,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type TaskView = 'table' | 'kanban' | 'gantt';

const NAV_ICONS = [LayoutList, CheckSquare, Kanban, CheckSquare, CheckSquare, CheckSquare, CheckSquare] as const;

/** Right-hand column of the tasks mock (header, view tabs, table/kanban/gantt). */
export const TasksModuleHeroMainColumn: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<TaskView>('table');

  const tabs: { id: TaskView; label: string; icon: typeof Table2 }[] = [
    { id: 'table', label: t('modules.tasks.page.tabTable'), icon: Table2 },
    { id: 'kanban', label: t('modules.tasks.page.tabKanban'), icon: Kanban },
    { id: 'gantt', label: t('modules.tasks.page.tabGantt'), icon: GanttChart },
  ];

  return (
          <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-4 border-b border-slate-100 gap-y-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-semibold text-slate-900 text-sm md:text-base truncate">{t('modules.tasks.demo.pageTitle')}</span>
                <Settings size={15} className="text-slate-400 shrink-0" />
              </div>
              <div className="flex-1 min-w-[140px] order-last sm:order-none w-full sm:w-auto">
                <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-slate-100 border border-slate-200/80 text-slate-400 text-xs">
                  <Search size={14} />
                  <span className="truncate">{t('modules.tasks.demo.search')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <Moon size={16} className="text-slate-400 hidden sm:block" />
                <div className="relative">
                  <Bell size={16} className="text-slate-400" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </div>
                <div className="flex items-center gap-1.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  <span className="hidden lg:inline text-xs font-medium text-slate-700 max-w-[7rem] truncate">
                    {t('modules.tasks.demo.userName')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 md:px-4 border-b border-slate-100">
              <div className="flex rounded-lg bg-slate-100 p-0.5 gap-0.5">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setView(id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] sm:text-xs font-semibold transition-all ${
                      view === id
                        ? id === 'kanban'
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="p-2 rounded-lg border border-slate-200/80 text-slate-500 hover:bg-slate-50"
                  aria-label="Filter"
                >
                  <Filter size={16} />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/25 hover:bg-blue-700"
                  aria-label="Add"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-2 sm:p-3 md:p-4 overflow-hidden bg-slate-50/40">
              <AnimatePresence mode="wait">
                {view === 'table' && (
                  <motion.div
                    key="table"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-x-auto"
                  >
                    <table className="w-full text-left text-[10px] sm:text-xs min-w-[520px]">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wide">
                          <th className="px-2 sm:px-3 py-2">{t('modules.tasks.demo.colTask')}</th>
                          <th className="px-2 py-2">{t('modules.tasks.demo.colSource')}</th>
                          <th className="px-2 py-2">{t('modules.tasks.demo.colStatus')}</th>
                          <th className="px-2 py-2 hidden sm:table-cell">{t('modules.tasks.demo.colAssignee')}</th>
                          <th className="px-2 py-2">{t('modules.tasks.demo.colPriority')}</th>
                          <th className="px-2 py-2 hidden md:table-cell">{t('modules.tasks.demo.colModule')}</th>
                          <th className="px-2 sm:px-3 py-2">{t('modules.tasks.demo.colDue')}</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-800">
                        <tr className="border-b border-slate-50">
                          <td className="px-2 sm:px-3 py-2.5 font-medium max-w-[140px]">{t('modules.tasks.demo.row1')}</td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-800 text-[10px] font-bold">
                              {t('modules.tasks.demo.srcTask')}
                            </span>
                          </td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              {t('modules.tasks.demo.statusNew')}
                            </span>
                          </td>
                          <td className="px-2 py-2.5 hidden sm:table-cell">
                            <div className="flex items-center gap-1">
                              <div className="w-5 h-5 rounded-full bg-slate-300" />
                              <span className="text-slate-600 truncate max-w-[4.5rem]">{t('modules.tasks.demo.userShort')}</span>
                            </div>
                          </td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-semibold">
                              {t('modules.tasks.demo.prioMid')}
                            </span>
                          </td>
                          <td className="px-2 py-2.5 hidden md:table-cell">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-medium">
                              {t('modules.tasks.demo.modPill')}
                            </span>
                          </td>
                          <td className="px-2 sm:px-3 py-2.5 text-rose-600 font-medium whitespace-nowrap">
                            <span className="inline-flex items-center gap-1">
                              <Calendar size={11} />
                              06.04.2026
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-3 py-2.5 font-medium max-w-[140px]">{t('modules.tasks.demo.row2')}</td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                              {t('modules.tasks.demo.srcDeal')}
                            </span>
                          </td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              {t('modules.tasks.demo.statusWork')}
                            </span>
                          </td>
                          <td className="px-2 py-2.5 hidden sm:table-cell">
                            <div className="flex items-center gap-1">
                              <div className="w-5 h-5 rounded-full bg-slate-300" />
                              <span className="text-slate-600 truncate max-w-[4.5rem]">{t('modules.tasks.demo.userShort')}</span>
                            </div>
                          </td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-900 text-[10px] font-semibold">
                              {t('modules.tasks.demo.prioHigh')}
                            </span>
                          </td>
                          <td className="px-2 py-2.5 hidden md:table-cell">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-medium">
                              {t('modules.tasks.demo.modPill')}
                            </span>
                          </td>
                          <td className="px-2 sm:px-3 py-2.5 text-slate-600 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1">
                              <Calendar size={11} />
                              12.04.2026
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {view === 'kanban' && (
                  <motion.div
                    key="kanban"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-1 px-1"
                  >
                    {(
                      [
                        { key: 'k1', dot: 'bg-slate-400', count: 32, labelKey: 'modules.tasks.demo.kanban1' },
                        { key: 'k2', dot: 'bg-blue-500', count: 7, labelKey: 'modules.tasks.demo.kanban2' },
                        { key: 'k3', dot: 'bg-amber-500', count: 1, labelKey: 'modules.tasks.demo.kanban3' },
                        { key: 'k4', dot: 'bg-emerald-500', count: 0, labelKey: 'modules.tasks.demo.kanban4' },
                      ] as const
                    ).map((col) => (
                      <div
                        key={col.key}
                        className="min-w-[140px] sm:min-w-[158px] flex-1 rounded-xl border border-slate-200/80 bg-slate-100/80 p-2 flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between text-[10px] sm:text-xs font-semibold text-slate-600 px-0.5">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${col.dot}`} />
                            <span className="truncate">{t(col.labelKey)}</span>
                          </span>
                          <span className="tabular-nums text-slate-400">{col.count}</span>
                        </div>
                        {col.key === 'k1' && (
                          <>
                            <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                              <span className="text-[9px] font-bold text-fuchsia-600 tracking-wide">{t('modules.tasks.demo.cardTagTask')}</span>
                              <p className="text-[11px] font-semibold text-slate-900 leading-snug mt-1 line-clamp-2">
                                {t('modules.tasks.demo.cardTitle1')}
                              </p>
                              <div className="flex items-center justify-between mt-2 gap-1">
                                <div className="w-5 h-5 rounded-full bg-slate-300 shrink-0" />
                                <span className="text-[9px] text-slate-400">06.04</span>
                              </div>
                            </div>
                            <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                              <span className="text-[9px] font-bold text-blue-600 tracking-wide">{t('modules.tasks.demo.cardTagDeal')}</span>
                              <p className="text-[11px] font-semibold text-slate-900 leading-snug mt-1 line-clamp-2">
                                {t('modules.tasks.demo.cardTitle2')}
                              </p>
                              <div className="flex items-center justify-between mt-2 gap-1">
                                <div className="w-5 h-5 rounded-full bg-slate-300 shrink-0" />
                                <span className="text-[9px] text-slate-400">08.04</span>
                              </div>
                            </div>
                          </>
                        )}
                        {col.key === 'k2' && (
                          <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                            <span className="text-[9px] font-bold text-blue-600 tracking-wide">{t('modules.tasks.demo.cardTagDeal')}</span>
                            <p className="text-[11px] font-semibold text-slate-900 leading-snug mt-1 line-clamp-2">
                              {t('modules.tasks.demo.cardTitle2')}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="w-5 h-5 rounded-full bg-slate-300" />
                              <span className="text-[9px] text-slate-400">07.04</span>
                            </div>
                          </div>
                        )}
                        {col.key === 'k3' && (
                          <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                            <span className="text-[9px] font-bold text-amber-700 tracking-wide">{t('modules.tasks.demo.cardTagTask')}</span>
                            <p className="text-[11px] font-semibold text-slate-900 leading-snug mt-1">{t('modules.tasks.demo.cardTitle3')}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="w-5 h-5 rounded-full bg-slate-300" />
                              <span className="text-[9px] text-slate-400">05.04</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}

                {view === 'gantt' && (
                  <motion.div
                    key="gantt"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-slate-200/80 bg-white p-2 sm:p-3 overflow-x-auto"
                  >
                    <div className="min-w-[420px]">
                      <div className="flex text-[9px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-100 pb-2 mb-2">
                        <div className="w-28 shrink-0" />
                        <div className="flex-1 grid grid-cols-4 text-center">
                          <span>{t('modules.tasks.demo.ganttJan')}</span>
                          <span>{t('modules.tasks.demo.ganttFeb')}</span>
                          <span>{t('modules.tasks.demo.ganttMar')}</span>
                          <span>{t('modules.tasks.demo.ganttApr')}</span>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
                        {t('modules.tasks.demo.ganttGroup')}
                      </p>
                      {(
                        [
                          { labelKey: 'modules.tasks.demo.ganttRow1' as const, left: '6%', width: '52%' },
                          { labelKey: 'modules.tasks.demo.ganttRow2' as const, left: '38%', width: '34%' },
                          { labelKey: 'modules.tasks.demo.ganttRow3' as const, left: '14%', width: '40%' },
                        ] as const
                      ).map((row) => (
                        <div key={row.labelKey} className="flex items-center gap-2 mb-2.5">
                          <div className="w-28 shrink-0 text-[10px] sm:text-xs text-slate-700 font-medium truncate pr-1">
                            {t(row.labelKey)}
                          </div>
                          <div className="flex-1 h-7 relative rounded-md bg-slate-50 border border-slate-100">
                            <div
                              className="absolute top-1.5 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm shadow-blue-500/20"
                              style={{ left: row.left, width: row.width }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
  );
};

export const TasksModuleHeroVisual: React.FC = () => {
  const { t } = useLanguage();
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
            demo.taska.uz/tasks
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200/80 shrink-0" />
        </div>

        <div className="flex min-h-[280px] sm:min-h-[320px] md:min-h-[380px]">
          <aside className="hidden md:flex w-48 flex-col border-r border-slate-200/80 bg-slate-50/50 py-3 px-2 gap-0.5 shrink-0">
            <div className="flex items-center gap-2 px-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand to-emerald-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                T
              </div>
              <span className="font-bold text-slate-800 text-sm truncate">Taska</span>
            </div>
            {NAV_ICONS.map((Icon, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
                  i === 1 ? 'bg-white shadow-sm text-slate-900 border border-slate-200/80' : 'text-slate-400'
                }`}
              >
                <Icon size={15} className="shrink-0 opacity-80" />
                {i === 1 ? (
                  <span className="truncate font-medium">{t('modules.tasks.demo.pageTitle')}</span>
                ) : (
                  <span className="truncate opacity-60">· · ·</span>
                )}
              </div>
            ))}
          </aside>

          <TasksModuleHeroMainColumn />
        </div>
      </div>
    </motion.div>
  );
};
