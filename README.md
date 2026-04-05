# Taska.uz

Маркетинговый сайт и лендинги модулей Taska (React, Vite, TypeScript).

## Локальный запуск

- **Node.js** LTS
- `npm install`
- Скопируйте `.env.example` → `.env.local`. Лиды по умолчанию: **`POST /api/deals`** (тот же origin). Локально Vite проксирует на tipa; в проде нужен **nginx** (см. ниже). Опционально: **`VITE_LEAD_SUBMIT_URL`**, **`VITE_TIPA_FUNNEL_ID`**, **`VITE_TIPA_SOURCE_ID`** (UUID из tipa), Telegram.
- `npm run dev`

## Сборка

`npm run build` — артефакты в `dist/`. В прод-сборке страницы подгружаются **lazy** (`React.lazy`); лендинги модулей (`/modules/:id`) грузят отдельными чанками; в `vite.config.ts` вынесены **react** / **react-router** / **react-helmet-async**, **framer-motion**, **lucide-react`.

Переводы: английский разбит на **`locales/en/*.json`** (несколько чанков, параллельная загрузка через **`locales/loadEnglish.ts`**); **`locales/ru.json`** и **`locales/uz.json`** — отдельные чанки при выборе языка. Фоновый **prefetch** возможных локалей по **`navigator.language`** / `navigator.languages` — в **`hooks/useLocaleChunkPrefetch.ts`** (гео/IP не используем: язык интерфейса по-прежнему из `localStorage`).

Скрипт **`scripts/split-en-json.mjs`** — пересборка `en/*.json` из монолитного `en.json`, если когда-то понадобится снова собрать файл из одного источника.

После сборки генерируются **PWA**: `manifest.webmanifest`, **`sw.js`** (workbox), регистрация в **`index.tsx`**. Иконка: **`public/pwa-maskable.svg`**.

`npm run typecheck` — проверка TypeScript без эмита.

`npm run lh:ci` — Lighthouse (сбор метрик по **`dist/`**, без жёстких assert; артефакты в **`.lighthouseci/`**).

## CI

Пуш и pull request в `main` запускают **`.github/workflows/ci.yml`**: `npm ci`, `npm audit --omit=dev`, `typecheck`, `build`, Playwright (Chromium).

Отдельно **`.github/workflows/lighthouse.yml`**: сборка и **`npm run lh:ci`** (артефакт с отчётами Lighthouse).

## Тесты E2E

`npm run test:e2e` — Playwright (Chromium), поднимает `npm run dev` на порту 3000. Сценарии: формы лида, смена **`<title>`** `/` ↔ `/login`, переключение языков **RU → UZ → EN → RU** (`header-lang-trigger`). UI-режим: `npm run test:e2e:ui`.

Первый запуск: `npx playwright install chromium`.

## SEO (SPA)

`<title>`, `meta description`, canonical, **og:image** (`{VITE_SITE_ORIGIN}/og-image.jpg`) и Twitter Card задаются в **`components/SeoHead.tsx`** через **react-helmet-async**; текст по маршруту собирает **`config/resolvePageSeo.ts`** (переводы `seo.*` + заголовки страниц). Канонический URL: **`VITE_SITE_ORIGIN`** (по умолчанию `https://taska.uz`) или `https://taska.uz` из `resolvePageSeo.ts`.

Статический `index.html` остаётся стартовым для краулеров без JS; после гидрации мета обновляется под роут и язык.

## Деплой

В GitHub задайте Secrets для workflow `.github/workflows/deploy.yml`: `SERVER_HOST`, `SERVER_USER`, `SERVER_PATH`, `SERVER_SSH_KEY`. Пуш в `main` выполняет pull на сервере и сборку.

На nginx для hashed-ассетов из `dist/assets/` имеет смысл длинный кэш (`immutable`, `max-age` год) и **HTTP/2**; **push** по сути снят с повестки в пользу **preload/prefetch** из HTML (у нас prefetch локалей делается из JS). Для растровых баннеров позже можно добавить **AVIF/WebP** в `<picture>` — сейчас в логотипах партнёров в основном SVG.

**Прокси заявок в CRM (обязательно в проде):** фронт шлёт **`POST /api/deals`** на тот же хост (`taska.uz`), иначе браузер блокирует прямой запрос на `tipa.taska.uz` (CORS). Пример локации:

```nginx
location /api/deals {
    proxy_pass https://tipa.taska.uz/api/deals;
    proxy_http_version 1.1;
    proxy_set_header Host tipa.taska.uz;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Content-Type $http_content_type;
}
```

Если nginx отвечает **400 Request Header Or Cookie Too Large**, фронт уже шлёт запрос **без кук** (`credentials: 'omit'`). При необходимости на сервере поднимите буферы, например: `large_client_header_buffers 4 16k;`.

## Контакты и SEO

Публичные телефон / email / Telegram: **`config/siteContact.ts`**. Поля `telephone` и `sameAs` в JSON-LD в `index.html` держите в синке с этим файлом.

## Заявки (лиды)

`services/api.ts` → **`submitLead`**:

1. **`POST /api/deals`** на **том же origin**, nginx проксирует на **`https://tipa.taska.uz/api/deals`**. Тело JSON (camelCase): `title`, `contactName`, `phone` / `contactPhone` (номер с сайта, иначе в CRM пусто в поле контакта), `notes`, `source` (`taska.uz`), `stage` (`new`); опционально `funnelId` и `sourceId` (**`VITE_TIPA_FUNNEL_ID`** / **`VITE_TIPA_SOURCE_ID`** в `.env` при сборке — UUID из админки tipa, иначе выпадающие «Воронка» и «Источник» остаются пустыми). UTM в **`notes`**. **`Content-Type: application/json`**. **Без Authorization.**
2. Параллельно — **Telegram**, если заданы `VITE_TELEGRAM_BOT_TOKEN` и `VITE_TELEGRAM_CHAT_ID`.

Прямой запрос из браузера на `tipa.taska.uz` без прокси не проходит из‑за **CORS**; альтернатива — настроить `Access-Control-Allow-Origin` на стороне tipa (менее удобно, чем прокси на nginx).
