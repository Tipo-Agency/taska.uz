/**
 * Единая точка для событий аналитики (Яндекс.Метрика).
 * Компоненты вызывают именованные хелперы — не `trackMetrikaGoal` напрямую.
 */

declare global {
  interface Window {
    trackMetrikaGoal?: (goal: string) => void;
  }
}

const METRIKA_COUNTER_ID = 106475005;

function sendMetrikaGoal(goal: string): void {
  if (typeof window === 'undefined') return;
  const send = () => {
    if (typeof window.trackMetrikaGoal === 'function') {
      window.trackMetrikaGoal(goal);
    } else {
      const w = window as Window & { ym?: (...args: unknown[]) => void };
      if (typeof w.ym === 'function') {
        try {
          w.ym(METRIKA_COUNTER_ID, 'reachGoal', goal);
        } catch {
          /* ignore */
        }
      }
    }
  };
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => send());
  } else {
    setTimeout(send, 0);
  }
}

/** Клик по ссылке на демо (demo.taska.uz). */
export function trackDemoClick(): void {
  sendMetrikaGoal('demo_click');
}

/** Открытие формы заявки из шапки / CTA. */
export function trackFormOpen(): void {
  sendMetrikaGoal('click_form_open');
}

/** Успешная отправка лида с формы. */
export function trackLeadSubmit(): void {
  sendMetrikaGoal('lead_submit');
}

/** Расширение без правки `analytics.ts` — только если появится новая цель. */
export function trackRawGoal(goal: string): void {
  sendMetrikaGoal(goal);
}
