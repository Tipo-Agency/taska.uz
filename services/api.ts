import type { Lead } from '../types';
import { trackMetrikaGoal } from './metrics';
import { getCurrentUTMParams } from './utmTracking';

/**
 * Приём заявок: POST /api/deals на том же origin (nginx проксирует на tipa.taska.uz),
 * иначе браузер блокирует кросс-доменный запрос — у tipa нет корректного CORS для taska.uz.
 * Переопределение: VITE_LEAD_SUBMIT_URL (например прямой URL только для отладки с сервера).
 */
const DEFAULT_DEALS_URL = '/api/deals';

const dealsUrl = () => import.meta.env.VITE_LEAD_SUBMIT_URL?.trim() || DEFAULT_DEALS_URL;

/** Опционально: ID воронки / источника в CRM tipa (задаются в .env при сборке) */
const funnelIdFromEnv = () => import.meta.env.VITE_TIPA_FUNNEL_ID?.trim() || '';
const sourceIdFromEnv = () => import.meta.env.VITE_TIPA_SOURCE_ID?.trim() || '';

/**
 * Тело POST /api/deals (camelCase, как create_deal на tipa.taska.uz).
 * Телефон дублируем в `phone` / `contactPhone` — в интерфейсе CRM подставляются в поля контакта, не только в «Примечание».
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

function buildDealPayload(leadData: Lead): TipaDealCreateBody {
  const name = (leadData.name || '').trim();
  const { display: phoneDisplay, compact: phoneCompact } = buildPhoneLines(leadData.contact || '');
  const phone = phoneCompact || phoneDisplay || undefined;

  const payload: TipaDealCreateBody = {
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

async function postDealToTipa(payload: TipaDealCreateBody): Promise<boolean> {
  const url = dealsUrl();
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
        console.error('[submitLead] POST /api/deals', res.status, text);
      } else {
        console.error('[submitLead] POST /api/deals', res.status);
      }
      return false;
    }
    return true;
  } catch (error) {
    if (import.meta.env.DEV) console.error('[submitLead] /api/deals', error);
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

export type SubmitLeadResult = {
  /** Сделка создана в CRM (POST /api/deals → 2xx) */
  crmOk: boolean;
  /** Сообщение ушло в Telegram */
  telegramOk: boolean;
  /** Хотя бы один канал сработал — можно не ронять UX полностью */
  ok: boolean;
};

/**
 * POST `/api/deals` (тот же origin → tipa) + Telegram параллельно.
 * `crmOk` / `telegramOk` — для отладки; пользователю показываем один сценарий успеха при `ok`.
 */
export const submitLead = async (leadData: Lead): Promise<SubmitLeadResult> => {
  try {
    const payload = buildDealPayload(leadData);
    const [crmOk, telegramOk] = await Promise.all([postDealToTipa(payload), notifyTelegram(leadData)]);
    const ok = crmOk || telegramOk;
    if (ok) {
      trackMetrikaGoal('lead_submit');
    }
    return { crmOk, telegramOk, ok };
  } catch (error) {
    console.error('[submitLead]', error);
    return { crmOk: false, telegramOk: false, ok: false };
  }
};
