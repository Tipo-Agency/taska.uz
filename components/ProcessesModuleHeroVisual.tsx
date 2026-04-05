import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowDown,
  Banknote,
  Bell,
  Briefcase,
  Check,
  CheckSquare,
  Kanban,
  LayoutDashboard,
  List,
  Moon,
  Pencil,
  Play,
  Plus,
  Search,
  Settings,
  User,
  Users,
  Warehouse,
  Workflow,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type ProcTab = 'templates' | 'running' | 'completed';

const NAV_ICONS = [LayoutDashboard, CheckSquare, Kanban, Users, Banknote, Warehouse, Workflow] as const;
const PROC_NAV_INDEX = 6;

export const ProcessesModuleHeroVisual: React.FC = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<ProcTab>('templates');
  const [tile, setTile] = useState(true);

  const tabs: { id: ProcTab; label: string }[] = [
    { id: 'templates', label: t('modules.processes.page.tabTemplates') },
    { id: 'running', label: t('modules.processes.page.tabRunning') },
    { id: 'completed', label: t('modules.processes.page.tabCompleted') },
  ];

  const tabCls = (id: ProcTab) =>
    tab === id ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20' : 'text-slate-500 hover:text-slate-700';

  const modeCls = (isTile: boolean) =>
    tile === isTile ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-700';

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
            demo.taska.uz/processes
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200/80 shrink-0" />
        </div>

        <div className="flex min-h-[300px] sm:min-h-[360px] md:min-h-[400px]">
          <aside className="hidden md:flex w-48 flex-col border-r border-slate-200/80 bg-slate-50/50 py-3 px-2 gap-0.5 shrink-0">
            <div className="flex items-center gap-2 px-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                T
              </div>
              <span className="font-bold text-slate-800 text-sm truncate">Taska</span>
            </div>
            {NAV_ICONS.map((Icon, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
                  i === PROC_NAV_INDEX ? 'bg-white shadow-sm text-slate-900 border border-slate-200/80' : 'text-slate-400'
                }`}
              >
                <Icon size={15} className="shrink-0 opacity-80" />
                {i === PROC_NAV_INDEX ? (
                  <span className="truncate font-medium">{t('modules.processes.demo.sidebarLabel')}</span>
                ) : (
                  <span className="truncate opacity-60">· · ·</span>
                )}
              </div>
            ))}
          </aside>

          <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-4 border-b border-slate-100 gap-y-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Workflow size={17} className="text-indigo-600 shrink-0" />
                <span className="font-semibold text-slate-900 text-sm md:text-base truncate">{t('modules.processes.demo.headerTitle')}</span>
                <Settings size={15} className="text-slate-400 shrink-0" />
              </div>
              <div className="flex-1 min-w-[140px] order-last sm:order-none w-full sm:w-auto">
                <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-slate-100 border border-slate-200/80 text-slate-400 text-xs">
                  <Search size={14} />
                  <span className="truncate">{t('modules.processes.demo.search')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <Moon size={16} className="text-slate-400 hidden sm:block" />
                <Bell size={16} className="text-slate-400" />
                <div className="flex items-center gap-1.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  <span className="hidden lg:inline text-xs font-medium text-slate-700 max-w-[7rem] truncate">
                    {t('modules.processes.demo.userName')}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 md:px-4 border-b border-slate-100 flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                {tabs.map((x) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setTab(x.id)}
                    className={`px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${tabCls(x.id)}`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
              {tab !== 'completed' && (
                <div className="flex items-center gap-1 rounded-full border border-slate-200/80 p-0.5 bg-slate-50/80">
                  <button type="button" onClick={() => setTile(true)} className={`px-2 py-1 rounded-full text-[9px] font-bold ${modeCls(true)}`}>
                    {t('modules.processes.demo.viewTile')}
                  </button>
                  <button type="button" onClick={() => setTile(false)} className={`px-2 py-1 rounded-full text-[9px] font-bold ${modeCls(false)}`}>
                    {t('modules.processes.demo.viewList')}
                  </button>
                </div>
              )}
              <button type="button" className="p-2 rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-600/25 shrink-0" aria-label="Add">
                <Plus size={17} />
              </button>
            </div>

            <div className="flex-1 p-2 sm:p-3 md:p-4 overflow-hidden bg-slate-50/40 overflow-y-auto max-h-[min(460px,56vh)]">
              <AnimatePresence mode="wait">
                {tab === 'templates' && (
                  <motion.div
                    key="tpl"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={tile ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : 'space-y-2'}
                  >
                    <div
                      className={`rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm relative ${
                        tile ? '' : 'flex flex-wrap items-center gap-3'
                      }`}
                    >
                      <button type="button" className="absolute top-3 right-3 text-slate-400 hover:text-indigo-600" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <div className={`flex gap-3 ${tile ? '' : 'flex-1 min-w-0'}`}>
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center shrink-0">
                          <Workflow size={20} />
                        </div>
                        <div className="min-w-0 flex-1 pr-6">
                          <h3 className="text-sm font-bold text-slate-900">{t('modules.processes.demo.tplCardTitle')}</h3>
                          <p className="text-[11px] text-slate-400 mt-0.5">{t('modules.processes.demo.tplCardDesc')}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/80 inline-flex items-center gap-1">
                              <List size={10} /> {t('modules.processes.demo.tplSteps')}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-violet-50 text-violet-800 border border-violet-200/80">
                              {t('modules.processes.demo.tplVersion')}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200/80">
                              {t('modules.processes.demo.tplActive')}
                            </span>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                              {t('modules.processes.demo.tplDone')}
                            </span>
                          </div>
                          {tile && (
                            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                              <span className="text-[10px] text-slate-400">{t('modules.processes.demo.tplUpdated')}</span>
                              <span className="text-[10px] font-bold text-indigo-600">{t('modules.processes.demo.tplOpen')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {tab === 'running' && (
                  <motion.div
                    key="run"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{t('modules.processes.demo.runSectionTitle')}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">{t('modules.processes.demo.runSectionLead')}</p>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{t('modules.processes.demo.runInstTitle')}</p>
                          <span className="inline-flex mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200/80">
                            {t('modules.processes.demo.runStatusActive')}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <span className="p-1.5 rounded-lg border border-slate-200 text-slate-500" title="Template">
                            <List size={14} />
                          </span>
                          <span className="p-1.5 rounded-lg border border-slate-200 text-indigo-600" title="Start">
                            <Play size={14} />
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 mb-2">
                        <span className="font-semibold text-slate-800">{t('modules.processes.demo.runCurrentStep')}</span>
                      </p>
                      <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 mb-3">
                        <span>{t('modules.processes.demo.runStarted')}</span>
                        <span>{t('modules.processes.demo.runTasksProg')}</span>
                      </div>
                      <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-2.5">
                        <p className="text-[9px] font-bold uppercase text-slate-400 mb-1.5">{t('modules.processes.demo.runTasksLabel')}</p>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-medium text-slate-800 truncate">{t('modules.processes.demo.runTaskLine')}</span>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-600 shrink-0">
                            {t('modules.processes.demo.runTaskNotStarted')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {tab === 'completed' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <button type="button" className="text-[10px] font-semibold text-indigo-600 hover:underline">
                      ← {t('modules.processes.demo.compBack')}
                    </button>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{t('modules.processes.demo.compTitle')}</h3>
                      <p className="text-[11px] text-slate-500 mt-1">{t('modules.processes.demo.compMeta')}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">{t('modules.processes.demo.compStepsTitle')}</p>
                      <div className="space-y-2">
                        {[
                          { step: 'compStep1Title', task: 'compStep1Task', role: 'compStep1Role' },
                          { step: 'compStep2Title', task: 'compStep2Task', role: 'compStep2Role' },
                        ].map((row, i) => (
                          <div key={row.step}>
                            <div className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm flex flex-wrap items-start gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                <Check size={16} strokeWidth={3} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-slate-900">{t(`modules.processes.demo.${row.step}` as 'modules.processes.demo.compStep1Title')}</p>
                                <p className="text-[10px] text-indigo-600 mt-1 truncate">{t(`modules.processes.demo.${row.task}` as 'modules.processes.demo.compStep1Task')}</p>
                              </div>
                              <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200/80 shrink-0">
                                {i === 0 ? <Briefcase size={11} /> : <User size={11} />}
                                {t(`modules.processes.demo.${row.role}` as 'modules.processes.demo.compStep1Role')}
                              </span>
                            </div>
                            {i === 0 && (
                              <div className="flex justify-center py-0.5">
                                <ArrowDown size={14} className="text-slate-300" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t('modules.processes.demo.compTasksTitle')}</p>
                      <p className="text-[10px] text-slate-500 mb-2">{t('modules.processes.demo.compTasksHint')}</p>
                      <div className="rounded-xl border border-slate-200/80 bg-white overflow-hidden text-[10px]">
                        {[
                          { name: 'compTask1Name', user: 'compTask1User', date: 'compTask1Date' },
                          { name: 'compTask2Name', user: 'compTask2User', date: 'compTask2Date' },
                        ].map((row) => (
                          <div
                            key={row.name}
                            className="flex flex-wrap items-center gap-2 px-3 py-2.5 border-b border-slate-50 last:border-0"
                          >
                            <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                              <List size={14} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-slate-800 truncate">{t(`modules.processes.demo.${row.name}` as 'modules.processes.demo.compTask1Name')}</p>
                              <p className="text-slate-500 text-[9px]">
                                {t(`modules.processes.demo.${row.user}` as 'modules.processes.demo.compTask1User')} · {t(`modules.processes.demo.${row.date}` as 'modules.processes.demo.compTask1Date')}
                              </p>
                            </div>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 shrink-0">
                              {t('modules.processes.demo.compTaskDone')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
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
