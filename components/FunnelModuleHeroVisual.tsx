import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Kanban,
  LayoutList,
  Moon,
  Plus,
  Search,
  Settings,
  Table2,
  UserX,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ModuleHeroVisualFrame } from './HeroVisual';

type FunnelView = 'kanban' | 'list' | 'lost';

const NAV_ICONS = [LayoutList, Kanban, Kanban, Kanban, Kanban, Kanban, Kanban] as const;

export const FunnelModuleHeroVisual: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<FunnelView>('kanban');

  const tabs: { id: FunnelView; label: string; icon: typeof Kanban }[] = [
    { id: 'kanban', label: t('modules.funnel.page.tabKanban'), icon: Kanban },
    { id: 'list', label: t('modules.funnel.page.tabList'), icon: Table2 },
    { id: 'lost', label: t('modules.funnel.page.tabLost'), icon: UserX },
  ];

  const tabBtn = (id: FunnelView, active: boolean) =>
    active
      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/25'
      : 'text-slate-500 hover:text-slate-700';

  const stages = [
    { key: 's1', dot: 'bg-slate-400', count: 38 },
    { key: 's2', dot: 'bg-blue-500', count: 6 },
    { key: 's3', dot: 'bg-violet-500', count: 11 },
    { key: 's4', dot: 'bg-amber-500', count: 0 },
  ] as const;

  return (
    <ModuleHeroVisualFrame
      urlSegment="funnel"
      logoGradientClass="from-violet-600 to-fuchsia-600"
      sidebarActiveIndex={2}
      navIcons={NAV_ICONS}
      sidebarActiveLabel={t('modules.funnel.demo.pageTitle')}
    >
      <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-4 border-b border-slate-100 gap-y-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-semibold text-slate-900 text-sm md:text-base truncate">
                  {t('modules.funnel.demo.pageTitle')}
                </span>
                <Settings size={15} className="text-slate-400 shrink-0" />
              </div>
              <div className="flex-1 min-w-[140px] order-last sm:order-none w-full sm:w-auto">
                <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-slate-100 border border-slate-200/80 text-slate-400 text-xs">
                  <Search size={14} />
                  <span className="truncate">{t('modules.funnel.demo.search')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <Moon size={16} className="text-slate-400 hidden sm:block" />
                <div className="relative">
                  <Bell size={16} className="text-slate-400" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-white" />
                </div>
                <div className="flex items-center gap-1.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  <span className="hidden lg:inline text-xs font-medium text-slate-700 max-w-[7rem] truncate">
                    {t('modules.funnel.demo.userName')}
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
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] sm:text-xs font-semibold transition-all ${tabBtn(id, view === id)}`}
                  >
                    <Icon size={14} className="shrink-0" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-flex text-[10px] font-semibold text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200/80 bg-white">
                  {t('modules.funnel.demo.filterPill')}
                </span>
                <button
                  type="button"
                  className="p-2 rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30 hover:bg-violet-700"
                  aria-label="Add deal"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-2 sm:p-3 md:p-4 overflow-hidden bg-slate-50/40">
              <AnimatePresence mode="wait">
                {view === 'kanban' && (
                  <motion.div
                    key="kanban"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-1 px-1"
                  >
                    {stages.map((col, idx) => (
                      <div
                        key={col.key}
                        className="min-w-[150px] sm:min-w-[168px] flex-1 rounded-xl border border-slate-200/80 bg-slate-100/80 p-2 flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between text-[10px] sm:text-xs font-semibold text-slate-600 px-0.5">
                          <span className="flex items-center gap-1.5 min-w-0">
                            <span className={`w-2 h-2 rounded-full shrink-0 ${col.dot}`} />
                            <span className="truncate">{t(`modules.funnel.demo.stage${idx + 1}` as 'modules.funnel.demo.stage1')}</span>
                          </span>
                          <span className="tabular-nums text-slate-400">{col.count}</span>
                        </div>
                        {idx === 0 && (
                          <>
                            <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                              <div className="flex flex-wrap gap-1 mb-1">
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-violet-100 text-violet-800">
                                  {t('modules.funnel.demo.cardTagSite')}
                                </span>
                              </div>
                              <p className="text-[11px] font-semibold text-slate-900 leading-snug">{t('modules.funnel.demo.cardTitle1')}</p>
                              <p className="text-[11px] font-bold text-violet-700 mt-1.5 tabular-nums">{t('modules.funnel.demo.cardAmount1')}</p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="w-5 h-5 rounded-full bg-slate-300" />
                                <span className="text-[9px] text-slate-400">{t('modules.funnel.demo.cardSourceSite')}</span>
                              </div>
                            </div>
                            <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                                {t('modules.funnel.demo.cardTagAgency')}
                              </span>
                              <p className="text-[11px] font-semibold text-slate-900 leading-snug mt-1">{t('modules.funnel.demo.cardTitle2')}</p>
                              <p className="text-[11px] font-bold text-slate-800 mt-1 tabular-nums">{t('modules.funnel.demo.cardAmount2')}</p>
                            </div>
                          </>
                        )}
                        {idx === 1 && (
                          <div className="rounded-lg bg-white border border-slate-200/80 p-2 shadow-sm">
                            <p className="text-[11px] font-semibold text-slate-900">{t('modules.funnel.demo.cardTitle3')}</p>
                            <p className="text-[11px] text-violet-700 font-bold mt-1">{t('modules.funnel.demo.cardAmount3')}</p>
                          </div>
                        )}
                        {idx === 2 && (
                          <div className="rounded-lg bg-white border border-violet-200/80 p-2 shadow-sm ring-1 ring-violet-100">
                            <p className="text-[11px] font-semibold text-slate-900">{t('modules.funnel.demo.cardTitle4')}</p>
                            <p className="text-[10px] text-slate-500 mt-1">{t('modules.funnel.demo.cardHintKp')}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}

                {view === 'list' && (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-x-auto"
                  >
                    <table className="w-full text-left text-[10px] sm:text-xs min-w-[520px]">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wide">
                          <th className="px-2 sm:px-3 py-2">{t('modules.funnel.demo.colDeal')}</th>
                          <th className="px-2 py-2">{t('modules.funnel.demo.colAmount')}</th>
                          <th className="px-2 py-2 hidden sm:table-cell">{t('modules.funnel.demo.colService')}</th>
                          <th className="px-2 py-2">{t('modules.funnel.demo.colStage')}</th>
                          <th className="px-2 py-2">{t('modules.funnel.demo.colSource')}</th>
                          <th className="px-2 sm:px-3 py-2">{t('modules.funnel.demo.colOwner')}</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-800">
                        <tr className="border-b border-slate-50">
                          <td className="px-2 sm:px-3 py-2.5 font-medium max-w-[140px]">{t('modules.funnel.demo.row1deal')}</td>
                          <td className="px-2 py-2.5 font-semibold tabular-nums text-violet-800">{t('modules.funnel.demo.row1amt')}</td>
                          <td className="px-2 py-2.5 hidden sm:table-cell text-slate-400">—</td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-violet-50 text-violet-900 border border-violet-200/80 text-[10px] font-semibold">
                              {t('modules.funnel.demo.row1stage')}
                            </span>
                          </td>
                          <td className="px-2 py-2.5 text-[10px]">{t('modules.funnel.demo.row1src')}</td>
                          <td className="px-2 sm:px-3 py-2.5">
                            <div className="flex items-center gap-1">
                              <div className="w-5 h-5 rounded-full bg-slate-300" />
                              <span className="truncate max-w-[5rem]">{t('modules.funnel.demo.userShort')}</span>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-slate-50">
                          <td className="px-2 sm:px-3 py-2.5 font-medium">{t('modules.funnel.demo.row2deal')}</td>
                          <td className="px-2 py-2.5 font-semibold tabular-nums">{t('modules.funnel.demo.row2amt')}</td>
                          <td className="px-2 py-2.5 hidden sm:table-cell text-slate-400">—</td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200/80 text-[10px] font-semibold">
                              {t('modules.funnel.demo.row2stage')}
                            </span>
                          </td>
                          <td className="px-2 py-2.5 text-[10px]">{t('modules.funnel.demo.row2src')}</td>
                          <td className="px-2 sm:px-3 py-2.5">
                            <div className="flex items-center gap-1">
                              <div className="w-5 h-5 rounded-full bg-slate-300" />
                              <span className="truncate max-w-[5rem]">{t('modules.funnel.demo.userShort')}</span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-3 py-2.5 font-medium">{t('modules.funnel.demo.row3deal')}</td>
                          <td className="px-2 py-2.5 font-semibold tabular-nums">{t('modules.funnel.demo.row3amt')}</td>
                          <td className="px-2 py-2.5 hidden sm:table-cell text-slate-400">—</td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200/80 text-[10px] font-semibold">
                              {t('modules.funnel.demo.row3stage')}
                            </span>
                          </td>
                          <td className="px-2 py-2.5 text-[10px]">{t('modules.funnel.demo.row3src')}</td>
                          <td className="px-2 sm:px-3 py-2.5">
                            <div className="flex items-center gap-1">
                              <div className="w-5 h-5 rounded-full bg-slate-300" />
                              <span className="truncate max-w-[5rem]">{t('modules.funnel.demo.userShort')}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {view === 'lost' && (
                  <motion.div
                    key="lost"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-x-auto"
                  >
                    <table className="w-full text-left text-[10px] sm:text-xs min-w-[480px]">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wide">
                          <th className="px-2 sm:px-3 py-2">{t('modules.funnel.demo.colDeal')}</th>
                          <th className="px-2 py-2">{t('modules.funnel.demo.colAmount')}</th>
                          <th className="px-2 py-2">{t('modules.funnel.demo.colSource')}</th>
                          <th className="px-2 py-2">{t('modules.funnel.demo.colOwner')}</th>
                          <th className="px-2 sm:px-3 py-2">{t('modules.funnel.demo.colDate')}</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-800">
                        <tr className="border-b border-slate-50">
                          <td className="px-2 sm:px-3 py-2.5 font-medium">{t('modules.funnel.demo.lost1deal')}</td>
                          <td className="px-2 py-2.5 tabular-nums text-slate-500">{t('modules.funnel.demo.lost1amt')}</td>
                          <td className="px-2 py-2.5 text-[10px]">{t('modules.funnel.demo.lost1src')}</td>
                          <td className="px-2 py-2.5">{t('modules.funnel.demo.userShort')}</td>
                          <td className="px-2 sm:px-3 py-2.5 text-slate-500">12.12.2025</td>
                        </tr>
                        <tr className="border-b border-slate-50">
                          <td className="px-2 sm:px-3 py-2.5 font-medium">{t('modules.funnel.demo.lost2deal')}</td>
                          <td className="px-2 py-2.5 tabular-nums text-slate-500">{t('modules.funnel.demo.lost2amt')}</td>
                          <td className="px-2 py-2.5 text-[10px]">{t('modules.funnel.demo.lost2src')}</td>
                          <td className="px-2 py-2.5">{t('modules.funnel.demo.userShort')}</td>
                          <td className="px-2 sm:px-3 py-2.5 text-slate-500">08.01.2026</td>
                        </tr>
                        <tr>
                          <td className="px-2 sm:px-3 py-2.5 font-medium">{t('modules.funnel.demo.lost3deal')}</td>
                          <td className="px-2 py-2.5 tabular-nums font-semibold text-slate-900">{t('modules.funnel.demo.lost3amt')}</td>
                          <td className="px-2 py-2.5 text-[10px]">{t('modules.funnel.demo.lost3src')}</td>
                          <td className="px-2 py-2.5">{t('modules.funnel.demo.userShort')}</td>
                          <td className="px-2 sm:px-3 py-2.5 text-slate-500">22.01.2026</td>
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
    </ModuleHeroVisualFrame>
  );
};
