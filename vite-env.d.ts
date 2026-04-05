/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  /** Канонический origin сайта (для SEO и e2e). По умолчанию https://taska.uz */
  readonly VITE_SITE_ORIGIN?: string;
  /**
   * Полный URL создания сделки. По умолчанию: https://tipa.taska.uz/api/deals
   */
  readonly VITE_LEAD_SUBMIT_URL?: string;
  /** Опционально: funnelId для CRM на tipa */
  readonly VITE_TIPA_FUNNEL_ID?: string;
  readonly VITE_TELEGRAM_BOT_TOKEN?: string;
  readonly VITE_TELEGRAM_CHAT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
