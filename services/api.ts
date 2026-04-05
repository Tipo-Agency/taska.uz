import type { Lead } from '../types';
import { trackMetrikaGoal } from './metrics';
import { getCurrentUTMParams } from './utmTracking';

/** Публичный приём заявок как сделок: POST {base}/api/deals */
const DEFAULT_DEALS_URL = 'https://tipa.taska.uz/api/deals';

const dealsUrl = () => import.meta.env.VITE_LEAD_SUBMIT_URL?.trim() || DEFAULT_DEALS_URL;

/** Опционально: ID воронки CRM на tipa (если задан в .env) */
const funnelIdFromEnv = () => import.meta.env.VITE_TIPA_FUNNEL_ID?.trim() || '';

/**
 * Тело POST /api/deals (camelCase, как create_deal на tipa.taska.uz).
 * @see README — раздел «Заявки»
 */
export interface TipaDealCreateBody {
  title: string;
  contactName: string;
  notes: string;
  /** До ~50 симв., например website / taska.uz */
  source: string;
  stage: string;
  funnelId?: string;
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

function buildDealPayload(leadData: Lead): TipaDealCreateBody {
  const name = (leadData.name || '').trim();
  const { display: phoneDisplay } = buildPhoneLines(leadData.contact || '');

  const payload: TipaDealCreateBody = {
    title: name ? `Заявка с сайта: ${name}` : 'Заявка с сайта taska.uz',
    contactName: name || '—',
    notes: buildNotes(leadData, phoneDisplay),
    source: 'taska.uz',
    stage: 'new',
    amount: 0,
    currency: 'UZS',
  };

  const fid = funnelIdFromEnv();
  if (fid) payload.funnelId = fid;

  return payload;
}

async function postDealToTipa(payload: TipaDealCreateBody): Promise<boolean> {
  const url = dealsUrl();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'cors',
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('[submitLead] POST /api/deals', res.status, text);
      return false;
    }
    return true;
  } catch (error) {
    console.error('[submitLead] /api/deals', error);
    return false;
  }
}

async function notifyTelegram(leadData: Lead): Promise<boolean> {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    return false;
  }

  const name = (leadData.name || '').trim();
  const { compact: fullPhone } = buildPhoneLines(leadData.contact || '');

  const text = [
    '<b>Новая заявка taska.uz</b>',
    '',
    `<b>Имя:</b> ${name || '—'}`,
    `<b>Телефон:</b> ${fullPhone || leadData.contact || '—'}`,
    leadData.message ? `<b>Сообщение:</b> ${leadData.message}` : '',
    `<b>Источник:</b> ${leadData.source === 'modal_form' ? 'модальное окно' : 'форма на странице'}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });
    if (!res.ok && import.meta.env.DEV) {
      const errText = await res.text().catch(() => '');
      console.error('[submitLead] Telegram:', res.status, errText);
    }
    return res.ok;
  } catch (error) {
    if (import.meta.env.DEV) console.error('[submitLead] Telegram:', error);
    return false;
  }
}

/**
 * POST https://tipa.taska.uz/api/deals (или `VITE_LEAD_SUBMIT_URL`) + Telegram.
 * Успех, если сработал хотя бы один канал.
 */
export const submitLead = async (leadData: Lead): Promise<boolean> => {
  try {
    const payload = buildDealPayload(leadData);
    const [apiOk, tgOk] = await Promise.all([postDealToTipa(payload), notifyTelegram(leadData)]);
    const ok = apiOk || tgOk;
    if (ok) {
      trackMetrikaGoal('lead_submit');
    }
    return ok;
  } catch (error) {
    console.error('[submitLead]', error);
    return false;
  }
};
