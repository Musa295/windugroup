# Деплой на Vercel

Проект — SSR на TanStack Start. Сборка выполняется через Nitro-preset `vercel`,
который создаёт директорию `.vercel/output` (Vercel Build Output API v3).
Vercel подхватывает её автоматически — ручных rewrites не требуется.

## Настройки проекта в Vercel

- Framework Preset: **Other** (мы уже задаём `framework: null` в `vercel.json`)
- Build Command: `vite build` (задано в `vercel.json`)
- Install Command: `bun install` (задано в `vercel.json`)
- Output Directory: **оставить пустым** — Vercel сам увидит `.vercel/output`
- Node.js Version: 20.x или новее

## Переменные окружения

Добавьте в Vercel → Project → Settings → Environment Variables:

Обязательные для заявок:
- `TELEGRAM_BOT_TOKEN` — токен Telegram-бота
- `TELEGRAM_CHAT_ID` — ID чата/канала для уведомлений

Опционально (email через Resend):
- `RESEND_API_KEY`
- `LEAD_EMAIL_TO`
- `LEAD_EMAIL_FROM`

## Что работает после деплоя

- SSR всех страниц, включая `/catalog/$category/$sub`
- `/sitemap.xml`, `/robots.txt`, все статические ассеты с длинным кэшем
- `POST /api/lead` — edge-функция Vercel (файл `api/lead.ts`)
- `POST /api/public/lead` — server route TanStack Start
- Все клиентские редиректы (`/services/*` → `/catalog/*`)

## Локальная проверка сборки

```bash
bun install
bun run build
# результат: .vercel/output/
```
