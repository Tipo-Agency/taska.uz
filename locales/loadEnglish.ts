/**
 * Английские строки разбиты по `locales/en/*.json` — отдельные чанки, параллельная загрузка.
 */
const enChunks = import.meta.glob<Record<string, string>>('./en/*.json', { import: 'default' });

export async function loadEnglishLocale(): Promise<Record<string, string>> {
  const merged: Record<string, string> = {};
  await Promise.all(
    Object.values(enChunks).map(async (loader) => {
      const data = await loader();
      Object.assign(merged, data);
    }),
  );
  return merged;
}
