import type { ModuleId } from './siteNavigation';

/**
 * Визуальный акцент страницы модуля (фон героя, бейджи, карточки).
 * Используется при постепенном переносе разметки в `ModuleLanding`.
 */
export type ModuleLandingAccent = 'emerald' | 'violet' | 'amber' | 'teal' | 'indigo' | 'sky' | 'rose' | 'cyan';

export const MODULE_LANDING_ACCENT: Record<ModuleId, ModuleLandingAccent> = {
  tasks: 'emerald',
  funnel: 'violet',
  clients: 'violet',
  finance: 'amber',
  warehouse: 'teal',
  processes: 'indigo',
  analytics: 'sky',
  team: 'rose',
};
