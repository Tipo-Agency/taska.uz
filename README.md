# Taska.uz

Маркетинговый сайт и лендинги модулей Taska (React, Vite, TypeScript).

## Локальный запуск

- **Node.js** LTS
- `npm install`
- Скопируйте `.env.example` → `.env.local`. Лиды: **`POST /api/integrations/site/leads`**; заголовок **`X-Api-Key`** не из браузера: в проде его добавляет **nginx** на сервере, локально — **`TIPA_SITE_API_KEY`** в прокси Vite (без префикса `VITE_`, в бандл не попадает). Опционально: **`VITE_LEAD_SUBMIT_URL`**, **`VITE_TIPA_FUNNEL_ID`**, **`VITE_TIPA_SOURCE_ID`**, Telegram.
- `npm run dev`

## Сборка

`npm run build` — артефакты в `dist/`. **Tailwind CSS** через **PostCSS** (`tailwind.config.js`, `postcss.config.js`, `./index.css` в `index.tsx`), без CDN.

В прод-сборке страницы подгружаются **lazy** (`React.lazy`); лендинги модулей (`/modules/:id`) грузят отдельными чанками; в `vite.config.ts` вынесены **react** / **react-router** / **react-helmet-async**, **framer-motion**, **lucide-react`.

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

В GitHub задайте Secrets для workflow `.github/workflows/deploy.yml`: `SERVER_HOST`, `SERVER_USER`, `SERVER_PATH`, `SERVER_SSH_KEY`, плюс при необходимости `VITE_TELEGRAM_*`, `VITE_TIPA_FUNNEL_ID`, `VITE_TIPA_SOURCE_ID`. Ключ tipa для лидов храните **только на сервере** в конфиге nginx (см. ниже), не в переменных сборки. Пуш в `main` выполняет pull на сервере и сборку.

На nginx для hashed-ассетов из `dist/assets/` имеет смысл длинный кэш (`immutable`, `max-age` год) и **HTTP/2**; **push** по сути снят с повестки в пользу **preload/prefetch** из HTML (у нас prefetch локалей делается из JS). Для растровых баннеров позже можно добавить **AVIF/WebP** в `<picture>` — сейчас в логотипах партнёров в основном SVG.

**Прокси API tipa (обязательно в проде):** фронт шлёт **`POST /api/integrations/site/leads`** на тот же хост (`taska.uz`), иначе браузер не сходит на `tipa.taska.uz` из‑за CORS. Удобнее один префикс **`/api/`**:

Если nginx отвечает **400 Request Header Or Cookie Too Large**, в блоке **`server { ... }`** для `taska.uz` (или в `http { }`) **обязательно** увеличьте буферы под большие Cookie от метрики/рекламы — иначе запрос не дойдёт до прокси:

```nginx
client_header_buffer_size 16k;
large_client_header_buffers 4 32k;
```

Фронт шлёт **`credentials: 'omit'`**, но заголовки от браузера всё равно могут быть тяжёлыми — без строк выше CRM может не получать лиды.

Пример **`location`** (все пути `/api/...` на tipa, в т.ч. лиды):

```nginx
location /api/ {
    proxy_pass https://tipa.taska.uz/api/;
    proxy_http_version 1.1;
    proxy_ssl_server_name on;
    proxy_set_header Host tipa.taska.uz;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Ключ из админки tipa — только здесь (файл вне репозитория, не в VITE_*).
    proxy_set_header X-Api-Key "ВАШ_КЛЮЧ_ИЗ_TIPA";
}
```

**Критично:** не ставьте **`proxy_set_header Host $host`**. Тогда на tipa уходит `Host: taska.uz`, виртуальный хост на `tipa.taska.uz` отвечает **400** и лиды не создаются. Нужен именно **`Host tipa.taska.uz`** (как в примере выше).

## Контакты и SEO

Публичные телефон / email / Telegram: **`config/siteContact.ts`**. Поля `telephone` и `sameAs` в JSON-LD в `index.html` держите в синке с этим файлом.

## Заявки (лиды)

`services/api.ts` → **`submitLead`**:

1. **`POST /api/integrations/site/leads`** на **том же origin**, nginx → **`https://tipa.taska.uz/api/integrations/site/leads`**. Заголовок **`X-Api-Key`** задаётся **только в nginx** (или в dev — **`TIPA_SITE_API_KEY`** в Vite-прокси), в статике сайта ключей нет. Тело JSON (camelCase): `title`, `contactName`, `phone` / `contactPhone`, `notes`, `source`, `stage`; опционально `funnelId`, `sourceId`. UTM в **`notes`**. Endpoint снаружи по-прежнему публичный POST — при спаме имеет смысл rate limit на nginx или в tipa.
2. Параллельно — **Telegram**, если заданы `VITE_TELEGRAM_BOT_TOKEN` и `VITE_TELEGRAM_CHAT_ID`.

Прямой запрос на `tipa.taska.uz` из браузера без прокси — **CORS**; прокси **`/api/`** на nginx — основной вариант.
