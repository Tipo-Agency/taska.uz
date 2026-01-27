/**
 * UTM Tracking utility
 * Скопировано и упрощено из tipa.uz/lib/utmTracking.ts
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const UTM_STORAGE_KEY = 'taska_utm_params';
const UTM_EXPIRY_DAYS = 30;

export function parseUTMFromURL(): UTMParams {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as (keyof UTMParams)[])
    .forEach((key) => {
      const value = params.get(key);
      if (value) {
        utm[key] = value;
      }
    });

  return utm;
}

export function saveUTMParams(params: UTMParams): void {
  if (typeof window === 'undefined' || Object.keys(params).length === 0) return;

  try {
    const data = {
      params,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function getStoredUTMParams(): UTMParams | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY);
    if (!stored) return null;

    const data = JSON.parse(stored);
    const savedDate = new Date(data.timestamp);
    const now = new Date();
    const daysDiff = (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60 * 24);

    if (daysDiff > UTM_EXPIRY_DAYS) {
      localStorage.removeItem(UTM_STORAGE_KEY);
      return null;
    }

    return data.params;
  } catch {
    return null;
  }
}

export function getCurrentUTMParams(): UTMParams {
  const urlParams = parseUTMFromURL();
  if (Object.keys(urlParams).length > 0) {
    saveUTMParams(urlParams);
    return urlParams;
  }
  return getStoredUTMParams() || {};
}

export function attachUTMToData(data: Record<string, any>): Record<string, any> {
  const utm = getCurrentUTMParams();
  return {
    ...data,
    ...utm,
  };
}

