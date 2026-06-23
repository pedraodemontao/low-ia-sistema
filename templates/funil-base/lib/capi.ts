// Meta Conversions API (server-side). Token e IDs vêm de Environment Variables na Vercel.
// Env necessárias: META_CAPI_TOKEN (obrigatória), PIXEL_ID (opcional, default abaixo), CAKTO_WEBHOOK_SECRET (opcional).
import crypto from "crypto";

const sha256 = (v: string) => crypto.createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

type CapiOpts = {
  email?: string;
  phone?: string;
  externalId?: string; // CPF/doc — vira external_id (hash)
  fbc?: string; // _fbc (clique do anúncio) — não hasheia
  fbp?: string; // _fbp (browser) — não hasheia
  value?: number;
  currency?: string;
  eventId?: string;
  eventSourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  custom?: Record<string, unknown>;
};

export async function sendCapi(event: string, opts: CapiOpts = {}) {
  const PIXEL_ID = process.env.PIXEL_ID || "SEU_PIXEL_ID_AQUI";
  const TOKEN = process.env.META_CAPI_TOKEN;
  if (!TOKEN) return { skipped: "sem META_CAPI_TOKEN" };

  const user_data: Record<string, unknown> = {};
  if (opts.email) user_data.em = [sha256(opts.email)];
  if (opts.phone) user_data.ph = [sha256(opts.phone.replace(/\D/g, ""))];
  if (opts.externalId) user_data.external_id = [sha256(String(opts.externalId).replace(/\D/g, ""))];
  if (opts.fbc) user_data.fbc = opts.fbc;
  if (opts.fbp) user_data.fbp = opts.fbp;
  if (opts.clientIp) user_data.client_ip_address = opts.clientIp;
  if (opts.userAgent) user_data.client_user_agent = opts.userAgent;

  const data = [{
    event_name: event,
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_id: opts.eventId, // mesmo id do pixel no browser → Meta deduplica
    event_source_url: opts.eventSourceUrl,
    user_data,
    custom_data: {
      ...(opts.value != null ? { value: opts.value, currency: opts.currency || "BRL" } : {}),
      ...(opts.custom || {}),
    },
  }];

  const payload: Record<string, unknown> = { data };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  const res = await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${TOKEN}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
