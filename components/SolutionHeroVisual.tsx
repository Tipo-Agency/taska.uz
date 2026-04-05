import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  BedDouble,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  Clock,
  Factory,
  HardHat,
  HeartPulse,
  Instagram,
  MapPin,
  Package,
  PackageCheck,
  Percent,
  Route,
  Stethoscope,
  Store,
  Timer,
  TrendingUp,
  Truck,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import type { SolutionSlug } from '../config/siteNavigation';

export type SolutionHeroTheme = {
  heroProgress: string;
  heroChip: string;
  heroStatBorder: string;
  heroContentTint: string;
};

type SolutionHeroVisualProps = {
  slug: SolutionSlug;
  theme: SolutionHeroTheme;
};

const SLUG_META: Record<
  SolutionSlug,
  { hostIcon: LucideIcon; hostClass: string }
> = {
  retail: { hostIcon: Store, hostClass: 'text-orange-500' },
  services: { hostIcon: BriefcaseBusiness, hostClass: 'text-violet-600' },
  manufacturing: { hostIcon: Factory, hostClass: 'text-slate-600' },
  logistics: { hostIcon: Truck, hostClass: 'text-sky-600' },
  wholesale: { hostIcon: Package, hostClass: 'text-amber-700' },
  construction: { hostIcon: HardHat, hostClass: 'text-yellow-700' },
  healthcare: { hostIcon: Stethoscope, hostClass: 'text-rose-600' },
  hospitality: { hostIcon: UtensilsCrossed, hostClass: 'text-lime-700' },
};

function BrowserTop({ slug }: { slug: SolutionSlug }) {
  const { hostIcon: HostIcon, hostClass } = SLUG_META[slug];
  return (
    <div className="h-11 border-b border-slate-200/80 flex items-center px-4 gap-2 bg-gradient-to-r from-slate-50 to-white">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/90" />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="h-7 px-4 rounded-lg bg-slate-100/90 border border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center gap-2 max-w-[min(100%,280px)]">
          <HostIcon size={12} className={hostClass} />
          <span className="truncate">
            taska.uz<span className="text-slate-400"> / </span>
            {slug}
          </span>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-100 to-slate-200/80 border border-slate-200/80" />
    </div>
  );
}

function Bar({ theme, widthPct }: { theme: SolutionHeroTheme; widthPct: number }) {
  return (
    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
      <div className={`h-full rounded-full ${theme.heroProgress}`} style={{ width: `${widthPct}%` }} />
    </div>
  );
}

export const SolutionHeroVisual: React.FC<SolutionHeroVisualProps> = ({ slug, theme }) => {
  const tint = `bg-gradient-to-br ${theme.heroContentTint}`;

  if (slug === 'retail') {
    const stores = [
      { name: 'Flagship', sub: 'Stock on hand', pct: 78 },
      { name: 'Mall pop-up', sub: 'In transit', pct: 52 },
      { name: 'Hub DC', sub: 'Reserved', pct: 91 },
    ];
    return (
      <motion.div
        initial={{ opacity: 0, y: 28, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.85, delay: 0.35, type: 'spring', stiffness: 80 }}
        className="w-full max-w-5xl mx-auto perspective-1000"
      >
        <div className="rounded-t-[1.75rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-24px_rgba(15,23,42,0.25)] overflow-hidden ring-1 ring-slate-900/[0.04]">
          <BrowserTop slug="retail" />
          <div className={`p-5 md:p-8 ${tint}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Inventory</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.heroChip}`}>Live</span>
                </div>
                {stores.map((s) => (
                  <div
                    key={s.name}
                    className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{s.name}</div>
                        <div className="text-[11px] text-slate-500">{s.sub}</div>
                      </div>
                      <Package size={16} className="text-orange-500/90" />
                    </div>
                    <Bar theme={theme} widthPct={s.pct} />
                    <div className="mt-1.5 text-right text-[10px] font-mono text-slate-400">{s.pct}%</div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/95 p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Sales funnel</span>
                  <TrendingUp size={16} className="text-emerald-500" />
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {['New', 'Deal', 'Paid'].map((label, i) => (
                    <div key={label} className="text-center">
                      <div className={`text-lg font-bold ${i === 2 ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {i === 0 ? '24' : i === 1 ? '11' : '7'}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {['Lead', 'Qualify', 'Offer', 'Pay'].map((c, i) => (
                    <div
                      key={c}
                      className={`min-w-[4.5rem] rounded-xl px-2 py-3 text-center text-[10px] font-semibold border ${
                        i === 1
                          ? 'bg-orange-50 border-orange-200 text-orange-900'
                          : 'bg-slate-50 border-slate-200/80 text-slate-600'
                      }`}
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-px bg-slate-100" />
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-600">
                  <Users size={14} className="text-slate-400" />
                  <span>Shift tasks · 6 open</span>
                </div>
              </div>
              <div className="lg:col-span-3 flex flex-col gap-3">
                <div className="flex-1 rounded-2xl border border-slate-200/80 bg-gradient-to-b from-pink-50/80 to-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 text-white">
                      <Instagram size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Social leads</div>
                      <div className="text-[10px] text-slate-500">Direct · Stories</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2 text-[11px] text-slate-700 shadow-sm">
                      New DM → CRM card
                    </div>
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2 text-[11px] text-slate-700 shadow-sm">
                      Promo code tracked
                    </div>
                  </div>
                </div>
                <div className={`rounded-2xl border ${theme.heroStatBorder} bg-white/90 p-4 shadow-sm`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Today</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">42.5M</div>
                  <div className="text-[11px] text-slate-500">UZS · net</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-t from-slate-50 to-transparent border-t border-slate-100/80" />
        </div>
      </motion.div>
    );
  }

  if (slug === 'services') {
    const projects = [
      { name: 'Enterprise rollout', phase: 'Build', pct: 68 },
      { name: 'Mobile redesign', phase: 'QA', pct: 84 },
      { name: 'API integration', phase: 'Discovery', pct: 32 },
    ];
    return (
      <motion.div
        initial={{ opacity: 0, y: 28, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.85, delay: 0.35, type: 'spring', stiffness: 78 }}
        className="w-full max-w-5xl mx-auto perspective-1000"
      >
        <div className="rounded-t-[1.75rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-24px_rgba(15,23,42,0.25)] overflow-hidden ring-1 ring-slate-900/[0.04]">
          <BrowserTop slug="services" />
          <div className={`p-5 md:p-8 ${tint}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Active projects</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.heroChip}`}>3 sprint</span>
                </div>
                {projects.map((p) => (
                  <div key={p.name} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                        <div className="text-[11px] text-slate-500">{p.phase}</div>
                      </div>
                      <ClipboardList size={16} className="text-violet-600" />
                    </div>
                    <Bar theme={theme} widthPct={p.pct} />
                    <div className="mt-1.5 text-right text-[10px] font-mono text-slate-400">{p.pct}%</div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/95 p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Milestones</span>
                  <Clock size={16} className="text-violet-500" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['Brief', 'Design', 'Build', 'UAT', 'Close'].map((c, i) => (
                    <div
                      key={c}
                      className={`min-w-[3.25rem] rounded-xl px-2 py-3 text-center text-[10px] font-semibold border ${
                        i === 2
                          ? 'bg-violet-50 border-violet-200 text-violet-900'
                          : 'bg-slate-50 border-slate-200/80 text-slate-600'
                      }`}
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 mb-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Billable vs plan</div>
                  <Bar theme={theme} widthPct={76} />
                  <div className="flex justify-between mt-2 text-[11px] text-slate-600">
                    <span>142 h / 186 h</span>
                    <span className="font-semibold text-violet-700">76%</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-600">
                  <Users size={14} className="text-slate-400" />
                  <span>8 roles · approvals on stage change</span>
                </div>
              </div>
              <div className="lg:col-span-3 flex flex-col gap-3">
                <div className={`rounded-2xl border ${theme.heroStatBorder} bg-white/90 p-4 shadow-sm`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Margin</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">31%</div>
                  <div className="text-[11px] text-slate-500">MTD · blended</div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-violet-50/60 to-white p-4 shadow-sm flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent size={16} className="text-violet-600" />
                    <span className="text-xs font-bold text-slate-900">Risk flags</span>
                  </div>
                  <div className="space-y-2 text-[11px] text-slate-700">
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">Budget &gt; 90% on 2 projects</div>
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">1 milestone overdue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-t from-slate-50 to-transparent border-t border-slate-100/80" />
        </div>
      </motion.div>
    );
  }

  if (slug === 'manufacturing') {
    const lines = [
      { name: 'Line A · Assembly', oee: 87, target: 'Target 85%' },
      { name: 'Line B · Packing', oee: 72, target: 'Bottleneck' },
      { name: 'Line C · QC', oee: 94, target: 'Stable' },
    ];
    return (
      <motion.div
        initial={{ opacity: 0, y: 28, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.85, delay: 0.35, type: 'spring', stiffness: 78 }}
        className="w-full max-w-5xl mx-auto perspective-1000"
      >
        <div className="rounded-t-[1.75rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-24px_rgba(15,23,42,0.25)] overflow-hidden ring-1 ring-slate-900/[0.04]">
          <BrowserTop slug="manufacturing" />
          <div className={`p-5 md:p-8 ${tint}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Shop floor</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.heroChip}`}>Shift 2</span>
                </div>
                {lines.map((l) => (
                  <div key={l.name} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{l.name}</div>
                        <div className="text-[11px] text-slate-500">{l.target}</div>
                      </div>
                      <Activity size={16} className="text-slate-600" />
                    </div>
                    <Bar theme={theme} widthPct={l.oee} />
                    <div className="mt-1.5 flex justify-between text-[10px] text-slate-500">
                      <span>OEE</span>
                      <span className="font-mono">{l.oee}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/95 p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Work orders</span>
                  <PackageCheck size={16} className="text-emerald-600" />
                </div>
                <div className="space-y-2">
                  {[
                    { id: 'WO-2041', sku: 'SKU-882', st: 'Running', tone: 'bg-slate-100 text-slate-800 border-slate-200' },
                    { id: 'WO-2042', sku: 'SKU-119', st: 'Queued', tone: 'bg-amber-50 text-amber-900 border-amber-200' },
                    { id: 'WO-2040', sku: 'SKU-440', st: 'Done', tone: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
                  ].map((w) => (
                    <div key={w.id} className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-slate-50/80 px-3 py-2.5">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{w.id}</div>
                        <div className="text-[10px] text-slate-500">{w.sku}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${w.tone}`}>{w.st}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-px bg-slate-100" />
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-600">
                  <Timer size={14} className="text-slate-400" />
                  <span>Changeover logged · next batch 14:20</span>
                </div>
              </div>
              <div className="lg:col-span-3 flex flex-col gap-3">
                <div className={`rounded-2xl border ${theme.heroStatBorder} bg-white/90 p-4 shadow-sm`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">First-pass yield</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">98.2%</div>
                  <div className="text-[11px] text-slate-500">Last 24h</div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm flex-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Scrap trend</div>
                  <Bar theme={theme} widthPct={22} />
                  <div className="mt-2 text-[11px] text-slate-600">↓ vs yesterday · within limit</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-t from-slate-50 to-transparent border-t border-slate-100/80" />
        </div>
      </motion.div>
    );
  }

  if (slug === 'logistics') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.85, delay: 0.35, type: 'spring', stiffness: 78 }}
        className="w-full max-w-5xl mx-auto perspective-1000"
      >
        <div className="rounded-t-[1.75rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-24px_rgba(15,23,42,0.25)] overflow-hidden ring-1 ring-slate-900/[0.04]">
          <BrowserTop slug="logistics" />
          <div className={`p-5 md:p-8 ${tint}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Fleet</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.heroChip}`}>Live GPS</span>
                </div>
                {[
                  { plate: '01 A 777 AA', route: 'TAS → SAM', pct: 64 },
                  { plate: '01 B 102 BB', route: 'Hub → Retail', pct: 38 },
                  { plate: '01 C 889 CC', route: 'Xalqaro', pct: 91 },
                ].map((v) => (
                  <div key={v.plate} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{v.plate}</div>
                        <div className="text-[11px] text-slate-500">{v.route}</div>
                      </div>
                      <Truck size={16} className="text-sky-600" />
                    </div>
                    <Bar theme={theme} widthPct={v.pct} />
                    <div className="mt-1.5 text-[10px] text-slate-500">Route progress</div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/95 p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Dispatch board</span>
                  <Route size={16} className="text-sky-600" />
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 mb-3 relative overflow-hidden">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-3">
                    <span>Departure</span>
                    <span>ETA window</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-2 flex-1 rounded-full ${i === 2 ? 'bg-sky-500' : 'bg-slate-200'}`} />
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-600 flex items-center gap-1">
                    <MapPin size={12} className="text-sky-500" />
                    3 stops · proof-of-delivery on last mile
                  </div>
                </div>
                <div className="space-y-2">
                  {['Load #8821 · sealed', 'Load #8822 · customs hold', 'Load #8819 · delivered'].map((t) => (
                    <div key={t} className="rounded-lg bg-white border border-slate-100 px-3 py-2 text-[11px] text-slate-700 shadow-sm">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3 flex flex-col gap-3">
                <div className={`rounded-2xl border ${theme.heroStatBorder} bg-white/90 p-4 shadow-sm`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">OTIF</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">96%</div>
                  <div className="text-[11px] text-slate-500">Rolling 7d</div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-sky-50/70 to-white p-4 shadow-sm flex-1">
                  <div className="text-xs font-bold text-slate-900 mb-2">Exceptions</div>
                  <div className="space-y-2 text-[11px] text-slate-700">
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">1 delay &gt; 2h · owner assigned</div>
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">Temp log OK · reefer #4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-t from-slate-50 to-transparent border-t border-slate-100/80" />
        </div>
      </motion.div>
    );
  }

  if (slug === 'wholesale') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.85, delay: 0.35, type: 'spring', stiffness: 78 }}
        className="w-full max-w-5xl mx-auto perspective-1000"
      >
        <div className="rounded-t-[1.75rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-24px_rgba(15,23,42,0.25)] overflow-hidden ring-1 ring-slate-900/[0.04]">
          <BrowserTop slug="wholesale" />
          <div className={`p-5 md:p-8 ${tint}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">B2B orders</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.heroChip}`}>Today</span>
                </div>
                {[
                  { buyer: 'Partner East', lines: '42 SKU · mix', vol: 88 },
                  { buyer: 'HoReCa chain', lines: '18 SKU · frozen', vol: 61 },
                  { buyer: 'Regional DC', lines: '120 SKU · pallet', vol: 74 },
                ].map((o) => (
                  <div key={o.buyer} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{o.buyer}</div>
                        <div className="text-[11px] text-slate-500">{o.lines}</div>
                      </div>
                      <Package size={16} className="text-amber-700" />
                    </div>
                    <Bar theme={theme} widthPct={o.vol} />
                    <div className="mt-1.5 text-[10px] text-slate-500">Pick progress</div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/95 p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Credit & terms</span>
                  <TrendingUp size={16} className="text-amber-600" />
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 mb-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Limit utilization</div>
                  <Bar theme={theme} widthPct={54} />
                  <div className="flex justify-between mt-2 text-[11px] text-slate-600">
                    <span>54% of approved limit</span>
                    <span className="font-semibold text-amber-800">Safe</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { k: 'Price tier A', v: '1 240 поз.' },
                    { k: 'Rebate Q2', v: 'Pending sign-off' },
                  ].map((x) => (
                    <div key={x.k} className="rounded-xl border border-slate-200/70 bg-white px-3 py-2.5">
                      <div className="text-[10px] text-slate-500 font-bold uppercase">{x.k}</div>
                      <div className="text-xs font-semibold text-slate-900 mt-0.5">{x.v}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-600">
                  <ClipboardList size={14} className="text-slate-400" />
                  <span>Wave pick · 2 batches staged</span>
                </div>
              </div>
              <div className="lg:col-span-3 flex flex-col gap-3">
                <div className={`rounded-2xl border ${theme.heroStatBorder} bg-white/90 p-4 shadow-sm`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">GMV today</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">186M</div>
                  <div className="text-[11px] text-slate-500">UZS · shipped</div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-amber-50/60 to-white p-4 shadow-sm flex-1">
                  <div className="text-xs font-bold text-slate-900 mb-2">Backorders</div>
                  <div className="text-[11px] text-slate-700 space-y-2">
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">3 SKU below MOQ</div>
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">1 PO awaiting confirm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-t from-slate-50 to-transparent border-t border-slate-100/80" />
        </div>
      </motion.div>
    );
  }

  if (slug === 'construction') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.85, delay: 0.35, type: 'spring', stiffness: 78 }}
        className="w-full max-w-5xl mx-auto perspective-1000"
      >
        <div className="rounded-t-[1.75rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-24px_rgba(15,23,42,0.25)] overflow-hidden ring-1 ring-slate-900/[0.04]">
          <BrowserTop slug="construction" />
          <div className={`p-5 md:p-8 ${tint}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Sites</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.heroChip}`}>3 active</span>
                </div>
                {[
                  { site: 'Tower B · facade', pct: 58 },
                  { site: 'Logistics pad', pct: 82 },
                  { site: 'Interior fit-out', pct: 34 },
                ].map((s) => (
                  <div key={s.site} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-slate-900">{s.site}</div>
                      <Building2 size={16} className="text-yellow-700" />
                    </div>
                    <Bar theme={theme} widthPct={s.pct} />
                    <div className="mt-1.5 text-[10px] text-slate-500">Plan vs fact</div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/95 p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Master timeline</span>
                  <HardHat size={16} className="text-orange-600" />
                </div>
                <div className="space-y-3 mb-4">
                  {[
                    { label: 'Foundation', w: '88%', active: false },
                    { label: 'Structure', w: '62%', active: true },
                    { label: 'MEP rough-in', w: '28%', active: false },
                  ].map((r) => (
                    <div key={r.label}>
                      <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                        <span>{r.label}</span>
                        {r.active && <span className="text-orange-700">In progress</span>}
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${r.active ? theme.heroProgress : 'bg-slate-300'}`}
                          style={{ width: r.w }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Subcontractors</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Concrete', 'Steel', 'Electrical'].map((x) => (
                      <span key={x} className="text-[10px] font-semibold px-2 py-1 rounded-lg bg-white border border-slate-200 text-slate-700">
                        {x}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-3 flex flex-col gap-3">
                <div className={`rounded-2xl border ${theme.heroStatBorder} bg-white/90 p-4 shadow-sm`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Materials ETA</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">Tomorrow</div>
                  <div className="text-[11px] text-slate-500">Glass panels · lot verified</div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm flex-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Safety</div>
                  <div className="text-[11px] text-slate-700 space-y-2">
                    <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-emerald-900 font-medium">0 incidents · 14d</div>
                    <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">Toolbox talk logged</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-t from-slate-50 to-transparent border-t border-slate-100/80" />
        </div>
      </motion.div>
    );
  }

  if (slug === 'healthcare') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 28, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.85, delay: 0.35, type: 'spring', stiffness: 78 }}
        className="w-full max-w-5xl mx-auto perspective-1000"
      >
        <div className="rounded-t-[1.75rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-24px_rgba(15,23,42,0.25)] overflow-hidden ring-1 ring-slate-900/[0.04]">
          <BrowserTop slug="healthcare" />
          <div className={`p-5 md:p-8 ${tint}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
              <div className="lg:col-span-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Schedule</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.heroChip}`}>Clinic A</span>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
                  <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Slots · afternoon</div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['10', '11', '12', '13', '14', '15', '16', '17'].map((h, i) => (
                      <div
                        key={h}
                        className={`text-center text-[10px] font-bold py-2 rounded-lg border ${
                          i === 3 || i === 5 ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-slate-50 border-slate-200/80 text-slate-500'
                        }`}
                      >
                        {h}:00
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <HeartPulse size={16} className="text-rose-600" />
                    <span className="text-xs font-bold text-slate-900">Triage queue</span>
                  </div>
                  <Bar theme={theme} widthPct={44} />
                  <div className="mt-2 text-[11px] text-slate-600">7 waiting · SLA green</div>
                </div>
              </div>
              <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/95 p-4 md:p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Care pathways</span>
                  <ClipboardList size={16} className="text-rose-600" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {['Intake', 'Labs', 'Consult', 'Plan', 'Follow-up'].map((c, i) => (
                    <div
                      key={c}
                      className={`min-w-[3.5rem] rounded-xl px-2 py-3 text-center text-[10px] font-semibold border ${
                        i === 2 ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-slate-50 border-slate-200/80 text-slate-600'
                      }`}
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mt-2">
                  <div className="rounded-lg bg-white border border-slate-100 px-3 py-2 text-[11px] text-slate-700 shadow-sm">
                    Protocol checklist · auto tasks on stage
                  </div>
                  <div className="rounded-lg bg-white border border-slate-100 px-3 py-2 text-[11px] text-slate-700 shadow-sm">
                    Consent & documents · versioned
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-600">
                  <Users size={14} className="text-slate-400" />
                  <span>Role-based access · audit trail on</span>
                </div>
              </div>
              <div className="lg:col-span-3 flex flex-col gap-3">
                <div className={`rounded-2xl border ${theme.heroStatBorder} bg-white/90 p-4 shadow-sm`}>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">No-show rate</div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">4.1%</div>
                  <div className="text-[11px] text-slate-500">Week · ↓ trend</div>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-rose-50/50 to-white p-4 shadow-sm flex-1">
                  <div className="text-xs font-bold text-slate-900 mb-2">Rooms</div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between rounded-lg bg-white border border-slate-100 px-3 py-2">
                      <span className="text-slate-600">Exam 1</span>
                      <span className="font-bold text-emerald-700">Free</span>
                    </div>
                    <div className="flex justify-between rounded-lg bg-white border border-slate-100 px-3 py-2">
                      <span className="text-slate-600">Exam 2</span>
                      <span className="font-bold text-rose-800">Busy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-8 bg-gradient-to-t from-slate-50 to-transparent border-t border-slate-100/80" />
        </div>
      </motion.div>
    );
  }

  /* hospitality */
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.85, delay: 0.35, type: 'spring', stiffness: 78 }}
      className="w-full max-w-5xl mx-auto perspective-1000"
    >
      <div className="rounded-t-[1.75rem] border border-slate-200/90 bg-white shadow-[0_32px_80px_-24px_rgba(15,23,42,0.25)] overflow-hidden ring-1 ring-slate-900/[0.04]">
        <BrowserTop slug="hospitality" />
        <div className={`p-5 md:p-8 ${tint}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Tonight</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.heroChip}`}>Live PMS</span>
              </div>
              <div className={`rounded-2xl border ${theme.heroStatBorder} bg-white/90 p-4 shadow-sm`}>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Occupancy</div>
                <div className="text-3xl font-bold text-slate-900 tabular-nums">87%</div>
                <Bar theme={theme} widthPct={87} />
                <div className="mt-2 text-[11px] text-slate-500">142 / 163 keys</div>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <BedDouble size={16} className="text-lime-700" />
                  <span className="text-xs font-bold text-slate-900">Housekeeping</span>
                </div>
                <div className="space-y-2 text-[11px] text-slate-700">
                  <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                    <span>Clean · ready</span>
                    <span className="font-bold text-emerald-700">118</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
                    <span>Dirty / in progress</span>
                    <span className="font-bold text-amber-800">24</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/95 p-4 md:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">F&B covers</span>
                <UtensilsCrossed size={16} className="text-lime-700" />
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { k: 'Breakfast', v: '186' },
                  { k: 'Lunch', v: '224' },
                  { k: 'Dinner', v: 'forecast 310' },
                ].map((x) => (
                  <div key={x.k} className="text-center rounded-xl border border-slate-200/80 bg-slate-50/80 py-3">
                    <div className="text-lg font-bold text-slate-900">{x.v}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{x.k}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 mb-3">
                <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Events & banquets</div>
                <div className="flex gap-2 overflow-x-auto">
                  {['Hall A · 80 pax', 'Terrace · cocktail', 'Conference · 40'].map((e) => (
                    <div key={e} className="min-w-[7rem] rounded-lg bg-white border border-slate-100 px-2 py-2 text-[10px] font-semibold text-slate-700 shadow-sm">
                      {e}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <Clock size={14} className="text-slate-400" />
                <span>POS sync · kitchen display linked</span>
              </div>
            </div>
            <div className="lg:col-span-3 flex flex-col gap-3">
              <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-lime-50/70 to-white p-4 shadow-sm flex-1">
                <div className="text-xs font-bold text-slate-900 mb-2">Arrivals / departures</div>
                <div className="space-y-2 text-[11px] text-slate-700">
                  <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">Check-in wave 14:00–18:00 · 38 rooms</div>
                  <div className="rounded-lg bg-white border border-slate-100 px-3 py-2">Late checkout requests · 4</div>
                </div>
              </div>
              <div className={`rounded-2xl border ${theme.heroStatBorder} bg-white/90 p-4 shadow-sm`}>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">RevPAR hint</div>
                <div className="text-2xl font-bold text-slate-900 tabular-nums">+12%</div>
                <div className="text-[11px] text-slate-500">vs last week</div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 bg-gradient-to-t from-slate-50 to-transparent border-t border-slate-100/80" />
      </div>
    </motion.div>
  );
};
