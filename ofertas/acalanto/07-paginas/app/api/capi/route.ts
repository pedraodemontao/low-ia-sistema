import { NextRequest, NextResponse } from "next/server";
import { sendCapi } from "@/lib/capi";

// Eventos do funil (Lead, InitiateCheckout, ViewContent...) espelhados server-side.
// O cliente faz POST aqui com o MESMO event_id usado no fbq do browser (dedupe).
export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({} as Record<string, unknown>));
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ua = req.headers.get("user-agent") || undefined;
  const r = await sendCapi(String(b.event || "PageView"), {
    email: b.email as string,
    phone: b.phone as string,
    value: b.value as number,
    eventId: b.eventId as string,
    eventSourceUrl: b.url as string,
    clientIp: ip,
    userAgent: ua,
    custom: b.custom as Record<string, unknown>,
  });
  return NextResponse.json({ ok: true, r });
}
