export const MODULE_IDS = [
  'tasks',
  'funnel',
  'clients',
  'finance',
  'warehouse',
  'processes',
  'analytics',
  'team',
] as const;

export type ModuleId = (typeof MODULE_IDS)[number];

export function isModuleId(id: string): id is ModuleId {
  return (MODULE_IDS as readonly string[]).includes(id);
}

export const SOLUTION_SLUGS = [
  'retail',
  'services',
  'manufacturing',
  'logistics',
  'wholesale',
  'construction',
  'healthcare',
  'hospitality',
] as const;

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number];

export function isSolutionSlug(slug: string): slug is SolutionSlug {
  return (SOLUTION_SLUGS as readonly string[]).includes(slug);
}
