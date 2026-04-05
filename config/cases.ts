export const CASE_SLUGS = ['fitness', 'production', 'marketing', 'it', 'delivery', 'household'] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

export function isCaseSlug(slug: string): slug is CaseSlug {
  return (CASE_SLUGS as readonly string[]).includes(slug);
}
