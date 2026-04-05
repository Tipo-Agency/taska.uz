import type { SolutionSlug } from './siteNavigation';

export type SolutionPageTheme = {
  /** Gradient for highlighted accents (Tailwind from-to) */
  titleGradient: string;
  pillClass: string;
  blobA: string;
  blobB: string;
  painCardBorder: string;
  painDot: string;
  autoIconBg: string;
  outcomeBorder: string;
  scenarioNumBg: string;
  scenarioBar: string;
  heroProgress: string;
  heroChip: string;
  heroStatBorder: string;
  /** Subtle tint in hero mock content area (Tailwind gradient stops) */
  heroContentTint: string;
};

export const solutionPageTheme: Record<SolutionSlug, SolutionPageTheme> = {
  retail: {
    titleGradient: 'from-orange-500 to-amber-600',
    pillClass: 'bg-orange-100 text-orange-900 border-orange-200/80',
    blobA: 'bg-orange-400/15',
    blobB: 'bg-amber-300/20',
    painCardBorder: 'border-orange-200/60',
    painDot: 'bg-orange-500',
    autoIconBg: 'bg-orange-100 text-orange-800',
    outcomeBorder: 'border-emerald-200/90',
    scenarioNumBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
    scenarioBar: 'bg-orange-400',
    heroProgress: 'bg-gradient-to-r from-orange-500 to-amber-500',
    heroChip: 'bg-orange-100 text-orange-900 border border-orange-200/70',
    heroStatBorder: 'border-orange-200/80',
    heroContentTint: 'from-slate-50/90 via-white to-orange-50/35',
  },
  services: {
    titleGradient: 'from-violet-500 to-purple-700',
    pillClass: 'bg-violet-100 text-violet-900 border-violet-200/80',
    blobA: 'bg-violet-400/15',
    blobB: 'bg-purple-300/15',
    painCardBorder: 'border-violet-200/60',
    painDot: 'bg-violet-500',
    autoIconBg: 'bg-violet-100 text-violet-800',
    outcomeBorder: 'border-emerald-200/90',
    scenarioNumBg: 'bg-gradient-to-br from-violet-500 to-purple-700',
    scenarioBar: 'bg-violet-400',
    heroProgress: 'bg-gradient-to-r from-violet-500 to-purple-600',
    heroChip: 'bg-violet-100 text-violet-900 border border-violet-200/70',
    heroStatBorder: 'border-violet-200/80',
    heroContentTint: 'from-slate-50/90 via-white to-violet-50/40',
  },
  manufacturing: {
    titleGradient: 'from-slate-600 to-slate-800',
    pillClass: 'bg-slate-200 text-slate-900 border-slate-300/80',
    blobA: 'bg-slate-400/15',
    blobB: 'bg-zinc-300/15',
    painCardBorder: 'border-slate-200/80',
    painDot: 'bg-slate-600',
    autoIconBg: 'bg-slate-200 text-slate-800',
    outcomeBorder: 'border-emerald-200/90',
    scenarioNumBg: 'bg-gradient-to-br from-slate-600 to-slate-800',
    scenarioBar: 'bg-slate-500',
    heroProgress: 'bg-gradient-to-r from-slate-500 to-slate-700',
    heroChip: 'bg-slate-200 text-slate-900 border border-slate-300/70',
    heroStatBorder: 'border-slate-200/90',
    heroContentTint: 'from-slate-50/95 via-white to-slate-100/50',
  },
  logistics: {
    titleGradient: 'from-sky-500 to-blue-700',
    pillClass: 'bg-sky-100 text-sky-900 border-sky-200/80',
    blobA: 'bg-sky-400/15',
    blobB: 'bg-blue-300/15',
    painCardBorder: 'border-sky-200/60',
    painDot: 'bg-sky-500',
    autoIconBg: 'bg-sky-100 text-sky-800',
    outcomeBorder: 'border-emerald-200/90',
    scenarioNumBg: 'bg-gradient-to-br from-sky-500 to-blue-700',
    scenarioBar: 'bg-sky-400',
    heroProgress: 'bg-gradient-to-r from-sky-500 to-blue-600',
    heroChip: 'bg-sky-100 text-sky-900 border border-sky-200/70',
    heroStatBorder: 'border-sky-200/80',
    heroContentTint: 'from-slate-50/90 via-white to-sky-50/45',
  },
  wholesale: {
    titleGradient: 'from-amber-500 to-yellow-700',
    pillClass: 'bg-amber-100 text-amber-950 border-amber-200/80',
    blobA: 'bg-amber-400/15',
    blobB: 'bg-yellow-300/15',
    painCardBorder: 'border-amber-200/70',
    painDot: 'bg-amber-600',
    autoIconBg: 'bg-amber-100 text-amber-900',
    outcomeBorder: 'border-emerald-200/90',
    scenarioNumBg: 'bg-gradient-to-br from-amber-500 to-yellow-700',
    scenarioBar: 'bg-amber-500',
    heroProgress: 'bg-gradient-to-r from-amber-500 to-yellow-600',
    heroChip: 'bg-amber-100 text-amber-950 border border-amber-200/70',
    heroStatBorder: 'border-amber-200/80',
    heroContentTint: 'from-slate-50/90 via-white to-amber-50/40',
  },
  construction: {
    titleGradient: 'from-yellow-500 to-orange-600',
    pillClass: 'bg-yellow-100 text-yellow-950 border-yellow-200/80',
    blobA: 'bg-yellow-400/15',
    blobB: 'bg-orange-300/15',
    painCardBorder: 'border-yellow-200/70',
    painDot: 'bg-yellow-600',
    autoIconBg: 'bg-yellow-100 text-yellow-900',
    outcomeBorder: 'border-emerald-200/90',
    scenarioNumBg: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    scenarioBar: 'bg-yellow-500',
    heroProgress: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    heroChip: 'bg-yellow-100 text-yellow-950 border border-yellow-200/70',
    heroStatBorder: 'border-yellow-200/80',
    heroContentTint: 'from-slate-50/90 via-white to-yellow-50/35',
  },
  healthcare: {
    titleGradient: 'from-rose-500 to-red-700',
    pillClass: 'bg-red-100 text-red-950 border-red-200/80',
    blobA: 'bg-rose-400/15',
    blobB: 'bg-red-300/15',
    painCardBorder: 'border-rose-200/60',
    painDot: 'bg-rose-600',
    autoIconBg: 'bg-rose-100 text-rose-900',
    outcomeBorder: 'border-emerald-200/90',
    scenarioNumBg: 'bg-gradient-to-br from-rose-500 to-red-700',
    scenarioBar: 'bg-rose-500',
    heroProgress: 'bg-gradient-to-r from-rose-500 to-red-600',
    heroChip: 'bg-rose-100 text-rose-950 border border-rose-200/70',
    heroStatBorder: 'border-rose-200/80',
    heroContentTint: 'from-slate-50/90 via-white to-rose-50/35',
  },
  hospitality: {
    titleGradient: 'from-lime-500 to-green-700',
    pillClass: 'bg-lime-100 text-lime-950 border-lime-200/80',
    blobA: 'bg-lime-400/15',
    blobB: 'bg-green-300/15',
    painCardBorder: 'border-lime-200/70',
    painDot: 'bg-lime-600',
    autoIconBg: 'bg-lime-100 text-lime-900',
    outcomeBorder: 'border-emerald-200/90',
    scenarioNumBg: 'bg-gradient-to-br from-lime-500 to-green-700',
    scenarioBar: 'bg-lime-500',
    heroProgress: 'bg-gradient-to-r from-lime-500 to-green-600',
    heroChip: 'bg-lime-100 text-lime-950 border border-lime-200/70',
    heroStatBorder: 'border-lime-200/80',
    heroContentTint: 'from-slate-50/90 via-white to-lime-50/30',
  },
};
