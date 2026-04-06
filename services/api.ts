import type { Lead } from '../types';
import { trackMetrikaGoal } from './metrics';
import { getCurrentUTMParams } from './utmTracking';

/**
 * Приём заявок: POST /api/integrations/site/leads (тот же origin).
 * Ключ X-Api-Key добавляет nginx на сервере (или Vite-прокси в dev — см. README), не фронт.
 * Переопределение URL: VITE_LEAD_SUBMIT_URL.
 */
const DEFAULT_SITE_LEADS_URL = '/api/integrations/site/leads';

const siteLeadsUrl = () => import.meta.env.VITE_LEAD_SUBMIT_URL?.trim() || DEFAULT_SITE_LEADS_URL;

/** Опционально: ID воронки / источника в CRM tipa (задаются в .env при сборке) */
const funnelIdFromEnv = () => import.meta.env.VITE_TIPA_FUNNEL_ID?.trim() || '';
const sourceIdFromEnv = () => import.meta.env.VITE_TIPA_SOURCE_ID?.trim() || '';

/**
 * Тело POST интеграции «сайт → лиды» (camelCase, совместимо с прежним create_deal).
 * @see README — раздел «Заявки»
 */
export interface SiteLeadPayload {
  title: string;
  contactName: string;
  notes: string;
  /** До ~50 симв., например website / taska.uz */
  source: string;
  stage: string;
  funnelId?: string;
  /** UUID справочника «Источник» в tipa (если задан VITE_TIPA_SOURCE_ID) */
  sourceId?: string;
  /** Номер в компактном виде (+998…) для подстановки в карточку сделки */
  phone?: string;
  /** Алиас для бэкендов, которые ожидают именно это имя поля */
  contactPhone?: string;
  amount?: number;
  currency?: string;
}

function buildPhoneLines(rawContact: string): { display: string; compact: string } {
  const raw = rawContact.trim();
  if (!raw) return { display: '', compact: '' };
  if (raw.startsWith('+')) {
    const parts = raw.split(/\s+/);
    const cc = parts[0];
    const local = parts.slice(1).join(' ') || raw.slice(cc.length).trim();
    const display = `${cc} ${local}`.trim();
    const compact = `${cc}${local.replace(/\s/g, '')}`;
    return { display, compact };
  }
  return { display: raw, compact: raw.replace(/\s/g, '') };
}

function buildNotes(leadData: Lead, phoneDisplay: string): string {
  const lines: string[] = [];
  if (phoneDisplay) lines.push(`Телефон: ${phoneDisplay}`);
  if (leadData.message?.trim()) lines.push(`Сообщение: ${leadData.message.trim()}`);
  lines.push(`Форма: ${leadData.source === 'modal_form' ? 'модальное окно' : 'форма внизу страницы'}`);

  const utm = getCurrentUTMParams();
  const utmPairs = Object.entries(utm).filter(([, v]) => Boolean(v?.trim?.()));
  if (utmPairs.length > 0) {
    lines.push(`UTM: ${utmPairs.map(([k, v]) => `${k}=${v}`).join(', ')}`);
  }
  return lines.join('\n');
}

function buildSiteLeadPayload(leadData: Lead): SiteLeadPayload {
  const name = (leadData.name || '').trim();
  const { display: phoneDisplay, compact: phoneCompact } = buildPhoneLines(leadData.contact || '');
  const phone = phoneCompact || phoneDisplay || undefined;

  const payload: SiteLeadPayload = {
    title: name ? `Заявка с сайта: ${name}` : 'Заявка с сайта taska.uz',
    contactName: name || '—',
    notes: buildNotes(leadData, phoneDisplay),
    source: 'taska.uz',
    stage: 'new',
    amount: 0,
    currency: 'UZS',
  };

  if (phone) {
    payload.phone = phone;
    payload.contactPhone = phone;
  }

  const fid = funnelIdFromEnv();
  if (fid) payload.funnelId = fid;

  const sid = sourceIdFromEnv();
  if (sid) payload.sourceId = sid;

  return payload;
}

async function postSiteLeadToTipa(payload: SiteLeadPayload): Promise<boolean> {
  const url = siteLeadsUrl();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'cors',
      /** Без кук: иначе nginx на taska.uz может ответить «400 Request Header Or Cookie Too Large». */
      credentials: 'omit',
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      if (import.meta.env.DEV) {
        console.error('[submitLead] POST site/leads', res.status, text);
      } else {
        console.error('[submitLead] POST site/leads', res.status);
      }
      return false;
    }
    return true;
  } catch (error) {
    if (import.meta.env.DEV) console.error('[submitLead] site/leads', error);
    return false;
  }
}

export type SubmitLeadResult = {
  /** Лид принят tipa (POST site/leads → 2xx) */
  ok: boolean;
};

/**
 * POST `/api/integrations/site/leads` — ключ `X-Api-Key` добавляет nginx / dev-прокси, не клиент.
 * Уведомления настраиваются в CRM (tipa), отдельный бот с сайта не используется.
 */
export const submitLead = async (leadData: Lead): Promise<SubmitLeadResult> => {
  try {
    const payload = buildSiteLeadPayload(leadData);
    const ok = await postSiteLeadToTipa(payload);
    if (ok) {
      trackMetrikaGoal('lead_submit');
    }
    return { ok };
  } catch (error) {
    console.error('[submitLead]', error);
    return { ok: false };
  }
};
