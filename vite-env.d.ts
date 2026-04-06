/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  /** Канонический origin сайта (для SEO и e2e). По умолчанию https://taska.uz */
  readonly VITE_SITE_ORIGIN?: string;
  /**
   * URL приёма лидов с сайта. По умолчанию: `/api/integrations/site/leads`.
   */
  readonly VITE_LEAD_SUBMIT_URL?: string;
  /** Опционально: funnelId для CRM на tipa */
  readonly VITE_TIPA_FUNNEL_ID?: string;
  /** Опционально: UUID источника лида в справочнике tipa */
  readonly VITE_TIPA_SOURCE_ID?: string;
  readonly VITE_TELEGRAM_BOT_TOKEN?: string;
  readonly VITE_TELEGRAM_CHAT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
