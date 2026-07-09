// Vercel Serverless Function: POST /api/lead
// Отправляет заявку в Telegram напрямую через Bot API.
// Env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (обязательные), опц. RESEND_API_KEY / LEAD_EMAIL_TO / LEAD_EMAIL_FROM

export const config = { runtime: "edge" };

function escapeHtml(s: string) {
  return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
}

type Body = { name?: string; phone?: string; message?: string; topic?: string };

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  const message = String(body.message ?? "").trim().slice(0, 2000);
  const topic = String(body.topic ?? "").trim().slice(0, 200);

  if (name.length < 2 || phone.length < 4) {
    return Response.json({ error: "validation" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const text = [
    "🔔 <b>Новая заявка с сайта Windu.Group</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(phone)}`,
    topic ? `📝 <b>Тема:</b> ${escapeHtml(topic)}` : null,
    message ? `💬 <b>Комментарий:</b> ${escapeHtml(message)}` : null,
  ].filter(Boolean).join("\n");

  let telegramResult: unknown = { skipped: true };
  if (token && chatId) {
    try {
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
      });
      telegramResult = { ok: tgRes.ok, status: tgRes.status };
      if (!tgRes.ok) telegramResult = { ok: false, status: tgRes.status, body: await tgRes.text() };
    } catch (e) {
      telegramResult = { ok: false, error: String(e) };
    }
  }

  // Опциональный email через Resend, если сконфигурирован
  let emailResult: unknown = { skipped: true };
  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.LEAD_EMAIL_TO;
  const emailFrom = process.env.LEAD_EMAIL_FROM ?? "Windu.Group <onboarding@resend.dev>";
  if (resendKey && emailTo) {
    try {
      const emailBody = `Новая заявка:\n\nИмя: ${name}\nТелефон: ${phone}\nТема: ${topic || "-"}\nКомментарий: ${message || "-"}`;
      const eRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
        body: JSON.stringify({ from: emailFrom, to: [emailTo], subject: `Заявка с сайта: ${topic || "звонок"}`, text: emailBody }),
      });
      emailResult = { ok: eRes.ok, status: eRes.status };
    } catch (e) {
      emailResult = { ok: false, error: String(e) };
    }
  }

  return Response.json({ ok: true, telegram: telegramResult, email: emailResult });
}
