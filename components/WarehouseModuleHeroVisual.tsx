import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Banknote,
  Bell,
  CheckSquare,
  Filter,
  Kanban,
  LayoutDashboard,
  Moon,
  Package,
  Plus,
  Search,
  Settings,
  Users,
  Warehouse,
  Workflow,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ModuleHeroVisualFrame } from './HeroVisual';

type WarehouseView = 'balances' | 'nomenclature' | 'journal' | 'revisions';

const NAV_ICONS = [LayoutDashboard, CheckSquare, Kanban, Users, Banknote, Warehouse, Workflow] as const;
const WH_NAV_INDEX = 5;

function FakeBarcode({ className }: { className?: string }) {
  const w = [2, 1, 3, 1, 2, 1, 4, 2, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2, 1, 3, 2, 1, 2, 1];
  return (
    <div className={`flex gap-px h-7 items-end opacity-90 ${className ?? ''}`}>
      {w.map((px, i) => (
        <div key={i} className="bg-slate-800 rounded-[0.5px] self-stretch" style={{ width: px, minHeight: '70%' }} />
      ))}
    </div>
  );
}

function FakeQr({ className }: { className?: string }) {
  const cells = Array.from({ length: 64 }, (_, i) => (((i * 17 + (i % 7)) % 11) > 4 ? 1 : 0));
  return (
    <div
      className={`grid grid-cols-8 gap-px w-[52px] h-[52px] p-1 rounded-lg bg-white border border-slate-200 ${className ?? ''}`}
    >
      {cells.map((v, i) => (
        <div key={i} className={`rounded-[0.5px] ${v ? 'bg-slate-900' : 'bg-white'}`} />
      ))}
    </div>
  );
}

export const WarehouseModuleHeroVisual: React.FC = () => {
  const { t } = useLanguage();
  const [view, setView] = useState<WarehouseView>('balances');

  const tabs: { id: WarehouseView; label: string }[] = [
    { id: 'balances', label: t('modules.warehouse.page.tabBalances') },
    { id: 'nomenclature', label: t('modules.warehouse.page.tabNomenclature') },
    { id: 'journal', label: t('modules.warehouse.page.tabJournal') },
    { id: 'revisions', label: t('modules.warehouse.page.tabRevisions') },
  ];

  const tabActive = (id: WarehouseView) =>
    view === id ? 'bg-teal-700 text-white shadow-md shadow-teal-700/25' : 'text-slate-500 hover:text-slate-700';

  return (
    <ModuleHeroVisualFrame
      urlSegment="warehouse"
      logoGradientClass="from-teal-600 to-emerald-600"
      sidebarActiveIndex={WH_NAV_INDEX}
      navIcons={NAV_ICONS}
      sidebarActiveLabel={t('modules.warehouse.demo.pageTitle')}
      minHeightClass="min-h-[300px] sm:min-h-[360px] md:min-h-[420px]"
    >
      <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2 md:px-4 border-b border-slate-100 gap-y-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <Warehouse size={17} className="text-teal-600 shrink-0" />
                <span className="font-semibold text-slate-900 text-sm md:text-base truncate">
                  {t('modules.warehouse.demo.headerTitle')}
                </span>
                <Settings size={15} className="text-slate-400 shrink-0" />
              </div>
              <div className="flex-1 min-w-[140px] order-last sm:order-none w-full sm:w-auto">
                <div className="flex items-center gap-2 h-8 px-3 rounded-full bg-slate-100 border border-slate-200/80 text-slate-400 text-xs">
                  <Search size={14} />
                  <span className="truncate">{t('modules.warehouse.demo.search')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                <Moon size={16} className="text-slate-400 hidden sm:block" />
                <Bell size={16} className="text-slate-400" />
                <div className="flex items-center gap-1.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-slate-300 to-slate-400" />
                  <span className="hidden lg:inline text-xs font-medium text-slate-700 max-w-[7rem] truncate">
                    {t('modules.warehouse.demo.userName')}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 md:px-4 border-b border-slate-100 flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setView(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${tabActive(tab.id)}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  className="relative p-2 rounded-full bg-teal-600 text-white shadow-md shadow-teal-600/25"
                  aria-label="Filter"
                >
                  <Filter size={16} />
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 rounded-full bg-amber-400 text-[9px] font-bold text-amber-950 flex items-center justify-center">
                    1
                  </span>
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full bg-teal-600 text-white shadow-md shadow-teal-600/25"
                  aria-label="Add"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-2 sm:p-3 md:p-4 overflow-hidden bg-slate-50/40 overflow-y-auto max-h-[min(460px,58vh)]">
              <AnimatePresence mode="wait">
                {view === 'balances' && (
                  <motion.div
                    key="balances"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-teal-600 mb-1">
                          <Package size={16} />
                          <span className="text-[10px] font-bold uppercase text-slate-500">{t('modules.warehouse.demo.kpiStockValue')}</span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums">{t('modules.warehouse.demo.kpiStockValueVal')}</p>
                        <p className="text-[10px] text-slate-500">{t('modules.warehouse.demo.kpiCurrency')}</p>
                      </div>
                      <div className="rounded-xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-sm">
                        <div className="flex items-center gap-2 text-amber-600 mb-1">
                          <Package size={16} />
                          <span className="text-[10px] font-bold uppercase text-slate-500">{t('modules.warehouse.demo.kpiLowStock')}</span>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-slate-900 tabular-nums">{t('modules.warehouse.demo.kpiLowStockVal')}</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-x-auto">
                      <table className="w-full text-left text-[10px] sm:text-xs min-w-[420px]">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wide">
                            <th className="px-2 py-2">{t('modules.warehouse.demo.colCode')}</th>
                            <th className="px-2 py-2">{t('modules.warehouse.demo.colNomenclature')}</th>
                            <th className="px-2 py-2 w-12">{t('modules.warehouse.demo.colUnit')}</th>
                            <th className="px-2 py-2">{t('modules.warehouse.demo.colBalance')}</th>
                            <th className="px-2 py-2">{t('modules.warehouse.demo.colStatus')}</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-800">
                          {[
                            { code: 'SKU-2048', nameKey: 'balRow1Name' as const, unitKey: 'unitPcs' as const, bal: 'balRow1Qty', st: 'ok' as const },
                            { code: 'SKU-1192', nameKey: 'balRow2Name' as const, unitKey: 'unitKg' as const, bal: 'balRow2Qty', st: 'low' as const },
                            { code: 'SKU-881', nameKey: 'balRow3Name' as const, unitKey: 'unitPcs' as const, bal: 'balRow3Qty', st: 'reserved' as const },
                          ].map((row) => {
                            const statusLabel =
                              row.st === 'ok'
                                ? t('modules.warehouse.demo.statusOk')
                                : row.st === 'low'
                                  ? t('modules.warehouse.demo.statusLow')
                                  : t('modules.warehouse.demo.statusReserved');
                            return (
                            <tr key={row.code} className="border-b border-slate-50">
                              <td className="px-2 py-2.5 font-mono text-slate-600">{row.code}</td>
                              <td className="px-2 py-2.5 font-medium">{t(`modules.warehouse.demo.${row.nameKey}`)}</td>
                              <td className="px-2 py-2.5 text-slate-500">{t(`modules.warehouse.demo.${row.unitKey}`)}</td>
                              <td className="px-2 py-2.5 font-bold tabular-nums text-emerald-700">{t(`modules.warehouse.demo.${row.bal}` as 'modules.warehouse.demo.balRow1Qty')}</td>
                              <td className="px-2 py-2.5">
                                <span
                                  className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                    row.st === 'ok'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                                      : row.st === 'low'
                                        ? 'bg-amber-50 text-amber-900 border-amber-200/80'
                                        : 'bg-sky-50 text-sky-900 border-sky-200/80'
                                  }`}
                                >
                                  {statusLabel}
                                </span>
                              </td>
                            </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {view === 'nomenclature' && (
                  <motion.div
                    key="nomenclature"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {(['nomCard1', 'nomCard2'] as const).map((prefix) => (
                      <div
                        key={prefix}
                        className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm flex gap-3"
                      >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl shrink-0 bg-gradient-to-br from-teal-100 to-emerald-200 flex items-center justify-center border border-teal-200/60">
                          <Package className="text-teal-700/80" size={32} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 leading-tight">{t(`modules.warehouse.demo.${prefix}Title` as 'modules.warehouse.demo.nomCard1Title')}</p>
                          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{t(`modules.warehouse.demo.${prefix}Desc` as 'modules.warehouse.demo.nomCard1Desc')}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/80">
                              {t(`modules.warehouse.demo.${prefix}Category` as 'modules.warehouse.demo.nomCard1Category')}
                            </span>
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-violet-50 text-violet-800 border border-violet-200/80">
                              {t(`modules.warehouse.demo.${prefix}Batch` as 'modules.warehouse.demo.nomCard1Batch')}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap items-end gap-2">
                            <div className="min-w-0">
                              <p className="text-[9px] font-bold uppercase text-slate-400 mb-0.5">{t('modules.warehouse.demo.barcodeLabel')}</p>
                              <FakeBarcode />
                              <p className="text-[9px] font-mono text-slate-500 mt-0.5">{t(`modules.warehouse.demo.${prefix}Ean` as 'modules.warehouse.demo.nomCard1Ean')}</p>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold uppercase text-slate-400 mb-0.5">{t('modules.warehouse.demo.qrLabel')}</p>
                              <FakeQr />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {view === 'journal' && (
                  <motion.div
                    key="journal"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-x-auto"
                  >
                    <table className="w-full text-left text-[10px] sm:text-xs min-w-[520px]">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wide">
                          <th className="px-2 py-2">{t('modules.warehouse.demo.colDate')}</th>
                          <th className="px-2 py-2">{t('modules.warehouse.demo.colType')}</th>
                          <th className="px-2 py-2 hidden sm:table-cell">{t('modules.warehouse.demo.colFromWh')}</th>
                          <th className="px-2 py-2">{t('modules.warehouse.demo.colToWh')}</th>
                          <th className="px-2 py-2">{t('modules.warehouse.demo.colComment')}</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-800">
                        {[
                          { n: 1, typeStyle: 'posting' as const },
                          { n: 2, typeStyle: 'adjust' as const },
                          { n: 3, typeStyle: 'move' as const },
                        ].map((row) => (
                          <tr key={row.n} className="border-b border-slate-50">
                            <td className="px-2 py-2.5 text-slate-600">{t(`modules.warehouse.demo.jrRow${row.n}Date` as 'modules.warehouse.demo.jrRow1Date')}</td>
                            <td className="px-2 py-2.5">
                              <span
                                className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                  row.typeStyle === 'posting'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                                    : row.typeStyle === 'adjust'
                                      ? 'bg-teal-50 text-teal-900 border-teal-200/80'
                                      : 'bg-slate-50 text-slate-800 border-slate-200/80'
                                }`}
                              >
                                {t(`modules.warehouse.demo.jrRow${row.n}Type` as 'modules.warehouse.demo.jrRow1Type')}
                              </span>
                            </td>
                            <td className="px-2 py-2.5 text-slate-500 hidden sm:table-cell">{t(`modules.warehouse.demo.jrRow${row.n}From` as 'modules.warehouse.demo.jrRow1From')}</td>
                            <td className="px-2 py-2.5 font-medium">{t(`modules.warehouse.demo.jrRow${row.n}To` as 'modules.warehouse.demo.jrRow1To')}</td>
                            <td className="px-2 py-2.5 text-slate-600">{t(`modules.warehouse.demo.jrRow${row.n}Comment` as 'modules.warehouse.demo.jrRow1Comment')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}

                {view === 'revisions' && (
                  <motion.div
                    key="revisions"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {(['revA', 'revB'] as const).map((rid, idx) => (
                      <div key={rid} className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                        <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 border-b border-slate-100 bg-slate-50/50">
                          <div className="flex flex-wrap items-center gap-2 min-w-0">
                            <span className="text-xs font-bold text-slate-900">{t(`modules.warehouse.demo.${rid}Id` as 'modules.warehouse.demo.revAId')}</span>
                            <span className="text-[10px] text-slate-500">{t('modules.warehouse.demo.revWarehouse')}</span>
                            <span className="text-[10px] text-slate-600">{t(`modules.warehouse.demo.${rid}Date` as 'modules.warehouse.demo.revADate')}</span>
                          </div>
                          <span className="inline-flex px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-bold">
                            {t('modules.warehouse.demo.revStatusDone')}
                          </span>
                        </div>
                        <table className="w-full text-left text-[10px] sm:text-xs">
                          <thead>
                            <tr className="border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wide">
                              <th className="px-3 py-2">{t('modules.warehouse.demo.revColNom')}</th>
                              <th className="px-2 py-2">{t('modules.warehouse.demo.revColBook')}</th>
                              <th className="px-2 py-2">{t('modules.warehouse.demo.revColFact')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-3 py-2.5 font-medium">{t(`modules.warehouse.demo.${rid}Item` as 'modules.warehouse.demo.revAItem')}</td>
                              <td className="px-2 py-2.5 tabular-nums font-semibold">{t(`modules.warehouse.demo.${rid}Book` as 'modules.warehouse.demo.revABook')}</td>
                              <td
                                className={`px-2 py-2.5 tabular-nums font-bold ${
                                  idx === 1 ? 'text-rose-600' : 'text-emerald-700'
                                }`}
                              >
                                {t(`modules.warehouse.demo.${rid}Fact` as 'modules.warehouse.demo.revAFact')}
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
