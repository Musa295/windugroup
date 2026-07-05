import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(4).max(40),
  message: z.string().trim().max(2000).optional(),
  topic: z.string().trim().max(200).optional(),
});

// Формирует красивое сообщение для Telegram
function formatTelegramMessage(data: z.infer<typeof leadSchema>) {
  return [
    "🔔 <b>Новая заявка с сайта Windu.Group</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(data.name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(data.phone)}`,
    data.topic ? `📝 <b>Тема:</b> ${escapeHtml(data.topic)}` : null,
    data.message ? `💬 <b>Комментарий:</b> ${escapeHtml(data.message)}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
}

async function sendTelegram(text: string) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY || !chatId) return { skipped: true, reason: "telegram_not_configured" };

  const res = await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": TELEGRAM_API_KEY,
    },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  });
  return { ok: res.ok, status: res.status };
}

async function sendEmail(subject: string, text: string) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM ?? "Windu.Group <onboarding@resend.dev>";
  if (!LOVABLE_API_KEY || !RESEND_API_KEY || !to) return { skipped: true, reason: "email_not_configured" };

  const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
    }),
  });
  return { ok: res.ok, status: res.status };
}

export const Route = createFileRoute("/api/public/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "invalid_json" }, { status: 400 });
        }
        const parsed = leadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "validation", issues: parsed.error.issues }, { status: 400 });
        }
        const data = parsed.data;

        const tgText = formatTelegramMessage(data);
        const emailText = `Новая заявка:\n\nИмя: ${data.name}\nТелефон: ${data.phone}\nТема: ${data.topic ?? "-"}\nКомментарий: ${data.message ?? "-"}`;

        const [tg, email] = await Promise.all([
          sendTelegram(tgText).catch((e) => ({ error: String(e) })),
          sendEmail(`Заявка с сайта: ${data.topic ?? "звонок"}`, emailText).catch((e) => ({ error: String(e) })),
        ]);

        return Response.json({ ok: true, telegram: tg, email });
      },
    },
  },
});
