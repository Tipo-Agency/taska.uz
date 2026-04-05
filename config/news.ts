export const NEWS_IDS = ['analytics-dashboards', 'weekly-plans-meetings', 'telegram-automation'] as const;

export type NewsId = (typeof NEWS_IDS)[number];

export function isNewsId(id: string): id is NewsId {
  return (NEWS_IDS as readonly string[]).includes(id);
}
