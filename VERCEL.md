# Деплой на Vercel

Проект собран под Cloudflare Workers (SSR через `@cloudflare/vite-plugin` + `wrangler.jsonc`). На Vercel он публикуется в **SPA-режиме**: клиентский роутинг TanStack Router работает полностью, статика раздаётся как есть.

## Что работает на Vercel
- Все страницы (`/`, `/catalog`, `/catalog/:slug`, `/calculator`, `/promotions`, `/portfolio`, `/price-list`, `/reviews`, `/contacts`, `/thank-you`) — благодаря SPA-фолбэку на `index.html`.
- Прямые ссылки и F5 на любой роут (rewrite настроен в `vercel.json`).
- `robots.txt`, `favicon.png` — как статические файлы.
- Долгий кэш на `/assets/*` и `/_build/*`.

## Что НЕ работает на Vercel без миграции адаптера
- Серверные функции `createServerFn` (`src/routes/api/public/lead.ts`, отправка заявок в Telegram/Email).
- Динамический `sitemap.xml` (server route).
- SSR (страницы рендерятся на клиенте после гидрации пустого шелла).

Чтобы всё это заработало на Vercel, нужно заменить пресет Cloudflare на Vercel (`@tanstack/react-start` + serverless-адаптер Vercel). Пока используется Cloudflare — деплой SSR-функционала делайте через Lovable Hosting (кнопка Publish), там всё работает нативно.

## Инструкция по деплою
1. New Project → Import Git Repository.
2. Framework Preset: **Other** (не Vite и не Next — конфиг лежит в `vercel.json`).
3. Build Command: `vite build` (уже задан).
4. Output Directory: `.output/public` (уже задан).
5. Install Command: `bun install` (или оставить авто).
6. Deploy.

Никаких переменных окружения для SPA-режима не требуется. Ключи `TELEGRAM_*`, `RESEND_*` имеют смысл только на Lovable-хостинге, где выполняются серверные функции.
