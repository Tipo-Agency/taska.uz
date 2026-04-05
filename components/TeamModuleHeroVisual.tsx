import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Banknote,
  Bell,
  BriefcaseBusiness,
  Cake,
  Calendar,
  CheckSquare,
  ChevronDown,
  Kanban,
  LayoutDashboard,
  Moon,
  Pencil,
  Phone,
  Plus,
  Search,
  Settings,
  Users,
  Warehouse,
  Workflow,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type TeamView = 'cards' | 'org' | 'structure';

const NAV_ICONS = [LayoutDashboard, CheckSquare, Kanban, Users, Banknote, Warehouse, Workflow, BriefcaseBusiness] as const;
const TEAM_NAV_INDEX = 3;

function Avatar({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-full bg-gradient-to-br from-amber-200 to-orange-300 border-2 border-white shadow-sm shrink-0 ${className ?? 'w-10 h-10'}`}
    />
  );
}

export const TeamModuleHeroVisual: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<TeamView>('cards');

  const tabs: { id: TeamView; label: string }[] = [
    { id: 'cards', label: t('modules.team.page.tabCards') },
    { id: 'org', label: t('modules.team.page.tabOrg') },
    { id: 'structure', label: t('modules.team.page.tabStructure') },
  ];

  const tabCls = (id: TeamView) =>
    view === id ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20' : 'text-slate-500 hover:text-slate-700';

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
            demo.taska.uz/team
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200/80 shrink-0" />
        </div>

        <div className="flex min-h-[300px] sm:min-h-[380px] md:min-h-[440px]">
          <aside className="hidden md:flex w-48 flex-col border-r border-slate-200/80 bg-slate-50/50 py-3 px-2 gap-0.5 shrink-0">
            <div className="flex items-center gap-2 px-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                T
              </div>
              <span className="font-bold text-slate-800 text-sm truncate">Taska</span>
            </div>
            {NAV_ICONS.map((Icon, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
                  i === TEAM_NAV_INDEX ? 'bg-white shadow-sm text-slate-900 border border-slate-200/80' : 'text-slate-400'
                }`}
              >
                <Icon size={15} className="shrink-0 opacity-80" />
                {i === TEAM_NAV_INDEX ? (
                  <span className="truncate font-medium">{t('modules.team.demo.sidebarLabel')}</span>
                ) : (
                  <span className="truncate opacity-60">· · ·</span>
                )}
              </div>
            ))}
          </aside>

          <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-4 border-b border-slate-100 gap-y-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Users size={17} className="text-rose-600 shrink-0" />
                <span className="font-semibold text-slate-900 text-sm md:text-base truncate">{t('modules.team.demo.headerTitle')}</span>
                <Settings size={15} className="text-slate-400 shrink-0" />
              </div>
              <div className="flex-1 min-w-[140px] order-last sm:order-none w-full sm:w-auto">
                <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-slate-100 border border-slate-200/80 text-slate-400 text-xs">
                  <Search size={14} />
                  <span className="truncate">{t('modules.team.demo.search')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <Moon size={16} className="text-slate-400 hidden sm:block" />
                <Bell size={16} className="text-slate-400" />
                <div className="flex items-center gap-1.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  <span className="hidden lg:inline text-xs font-medium text-slate-700 max-w-[7rem] truncate">
                    {t('modules.team.demo.userName')}
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
                    onClick={() => setView(x.id)}
                    className={`px-2.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${tabCls(x.id)}`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
              <button type="button" className="p-2 rounded-full bg-orange-500 text-white shadow-md shadow-orange-500/30 shrink-0" aria-label="Add">
                <Plus size={17} />
              </button>
            </div>

            <div className="flex-1 p-2 sm:p-3 md:p-4 overflow-hidden bg-slate-50/40 overflow-y-auto max-h-[min(480px,58vh)]">
              <AnimatePresence mode="wait">
                {view === 'cards' && (
                  <motion.div
                    key="cards"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3"
                  >
                    <div className="col-span-2 lg:col-span-1 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm relative">
                      <button type="button" className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-500" aria-label="Edit">
                        <Pencil size={14} />
                      </button>
                      <div className="flex gap-3">
                        <Avatar className="w-12 h-12" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-900">{t('modules.team.demo.cardMainName')}</p>
                          <span className="inline-flex mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-violet-100 text-violet-900 border border-violet-200/80">
                            {t('modules.team.demo.cardMainRole')}
                          </span>
                          <div className="mt-2 space-y-1 text-[10px] text-slate-600">
                            <p className="flex items-center gap-1.5">
                              <Calendar size={11} className="text-slate-400 shrink-0" />
                              {t('modules.team.demo.cardMainHired')}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <Cake size={11} className="text-slate-400 shrink-0" />
                              {t('modules.team.demo.cardMainBday')}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-1.5 rounded-lg bg-emerald-500 text-white">
                              <Phone size={10} />
                              {t('modules.team.demo.cardMainPhone')}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-1.5 rounded-lg bg-sky-500 text-white">
                              {t('modules.team.demo.cardMainTg')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {(
                      [
                        { name: 'cardName2', role: 'cardRole2' },
                        { name: 'cardName3', role: 'cardRole3' },
                        { name: 'cardName4', role: 'cardRole4' },
                        { name: 'cardName5', role: 'cardRole5' },
                      ] as const
                    ).map((c) => (
                      <div key={c.name} className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
                        <div className="flex gap-2">
                          <Avatar className="w-9 h-9" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{t(`modules.team.demo.${c.name}` as 'modules.team.demo.cardName2')}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-2">{t(`modules.team.demo.${c.role}` as 'modules.team.demo.cardRole2')}</p>
                            <p className="text-[9px] text-slate-400 mt-2">{t('modules.team.demo.cardHiredEmpty')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {view === 'org' && (
                  <motion.div
                    key="org"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center text-[10px] sm:text-xs pb-4"
                  >
                    <OrgNode
                      dept={t('modules.team.demo.orgDeptNone')}
                      title={t('modules.team.demo.orgGd')}
                      people={<Avatar className="w-7 h-7" />}
                      names={t('modules.team.demo.orgGdName')}
                    />
                    <div className="w-px h-4 bg-slate-300" />
                    <OrgNode
                      dept={t('modules.team.demo.orgDeptMkt')}
                      title={t('modules.team.demo.orgHeadMkt')}
                      people={
                        <div className="flex -space-x-1">
                          <Avatar className="w-6 h-6" />
                          <Avatar className="w-6 h-6 ring-2 ring-white" />
                        </div>
                      }
                      names={t('modules.team.demo.orgHeadMktNames')}
                    />
                    <div className="w-px h-4 bg-slate-300" />
                    <OrgNode
                      dept={t('modules.team.demo.orgDeptMkt')}
                      title={t('modules.team.demo.orgSmmLead')}
                      people={<Avatar className="w-6 h-6" />}
                      names={t('modules.team.demo.orgSmmLeadName')}
                    />
                    <div className="w-px h-4 bg-slate-300" />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-xl">
                      {(
                        [
                          ['orgLeaf1Title', 'orgLeaf1Name'],
                          ['orgLeaf2Title', 'orgLeaf2Name'],
                          ['orgLeaf3Title', 'orgLeaf3Name'],
                          ['orgLeaf4Title', 'orgLeaf4Name'],
                        ] as const
                      ).map(([titleK, nameK]) => (
                        <div
                          key={titleK}
                          className="rounded-lg border border-slate-200/80 bg-white p-2 shadow-sm text-center"
                        >
                          <p className="text-[8px] font-bold uppercase text-sky-700 mb-1">{t('modules.team.demo.orgDeptMkt')}</p>
                          <p className="text-[10px] font-bold text-slate-900 leading-tight">{t(`modules.team.demo.${titleK}` as 'modules.team.demo.orgLeaf1Title')}</p>
                          <div className="flex justify-center mt-1.5">
                            <Avatar className="w-6 h-6" />
                          </div>
                          <p className="text-[9px] text-slate-600 mt-1">{t(`modules.team.demo.${nameK}` as 'modules.team.demo.orgLeaf1Name')}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {view === 'structure' && (
                  <motion.div
                    key="structure"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">{t('modules.team.demo.structUnassigned')}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(['chip1', 'chip2', 'chip3', 'chip4'] as const).map((k) => (
                          <span
                            key={k}
                            className="inline-flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full bg-white border border-slate-200/80 text-[10px] font-semibold text-slate-800 shadow-sm"
                          >
                            <Avatar className="w-5 h-5" />
                            {t(`modules.team.demo.${k}` as 'modules.team.demo.chip1')}
                          </span>
                        ))}
                      </div>
                    </div>
                    {(
                      [
                        { title: 'structRow1Title', sub: 'structRow1Sub', people: 'structRow1People' as const, multi: false },
                        { title: 'structRow2Title', sub: 'structRow2Sub', people: 'structRow2People' as const, multi: false },
                        { title: 'structRow3Title', sub: 'structRow3Sub', people: 'structRow3People' as const, multi: true },
                        { title: 'structRow4Title', sub: 'structRow4Sub', people: 'structRow4People' as const, multi: false },
                      ] as const
                    ).map((row) => (
                      <div key={row.title} className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100 bg-slate-50/50">
                          <ChevronDown size={14} className="text-slate-400 shrink-0" />
                          <BriefcaseBusiness size={14} className="text-slate-400 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-900">{t(`modules.team.demo.${row.title}` as 'modules.team.demo.structRow1Title')}</p>
                            <p className="text-[9px] text-slate-500">{t(`modules.team.demo.${row.sub}` as 'modules.team.demo.structRow1Sub')}</p>
                          </div>
                        </div>
                        <div className="p-2 flex flex-wrap gap-2">
                          {row.multi ? (
                            <>
                              <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-2 py-1.5">
                                <Avatar className="w-7 h-7" />
                                <span className="text-[10px] font-medium text-slate-800">{t('modules.team.demo.structPersonJamshid')}</span>
                              </div>
                              <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-2 py-1.5">
                                <Avatar className="w-7 h-7" />
                                <span className="text-[10px] font-medium text-slate-800">{t('modules.team.demo.structPersonNazima')}</span>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-2 py-1.5">
                              <Avatar className="w-7 h-7" />
                              <span className="text-[10px] font-medium text-slate-800">{t(`modules.team.demo.${row.people}` as 'modules.team.demo.structRow1People')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
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

function OrgNode({
  dept,
  title,
  people,
  names,
}: {
  dept: string;
  title: string;
  people: React.ReactNode;
  names: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm min-w-[min(100%,200px)] max-w-xs w-full overflow-hidden">
      <p className="text-[8px] font-bold uppercase text-sky-700 px-3 pt-2">{dept}</p>
      <p className="text-xs font-bold text-slate-900 px-3 pb-2 text-center">{title}</p>
      <div className="px-3 py-2 bg-slate-50/90 border-t border-slate-100 flex items-center justify-center gap-2">
        {people}
        <span className="text-[10px] font-medium text-slate-700 truncate">{names}</span>
      </div>
    </div>
  );
}
