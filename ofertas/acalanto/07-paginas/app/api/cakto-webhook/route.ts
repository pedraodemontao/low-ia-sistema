import { NextRequest, NextResponse } from "next/server";
import { sendCapi } from "@/lib/capi";

// Webhook da Cakto → Purchase no Meta CAPI.
// Payload Cakto: { event:"purchase_approved", data:[ { status, amount, id, customer:{email,phone,docNumber}, fbc, fbp, product } ], secret }
// URL na Cakto: https://resultado-.vercel.app/api/cakto-webhook?secret=<CAKTO_WEBHOOK_SECRET>
export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => ({} as Record<string, any>));

  // valida segredo (query ?secret=)
  const secret = req.nextUrl.searchParams.get("secret");
  if (process.env.CAKTO_WEBHOOK_SECRET && secret !== process.env.CAKTO_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const order = Array.isArray(b?.data) ? b.data[0] : (b?.data ?? b);
  const event = String(b?.event ?? "");
  const status = String(order?.status ?? "");

  // só conta venda aprovada (ignora pix gerado, recusa, reembolso, chargeback...)
  if (event !== "purchase_approved" && !/^paid$|approved/i.test(status)) {
    return NextResponse.json({ ignored: event || status || "sem evento" });
  }

  const cust = order?.customer ?? {};
  const r = await sendCapi("Purchase", {
    email: cust.email,
    phone: cust.phone,
    externalId: cust.docNumber,
    value: Number(order?.amount) || undefined,
    currency: "BRL",
    eventId: order?.id ? String(order.id) : undefined, // dedupe
    fbc: order?.fbc ?? undefined,
    fbp: order?.fbp ?? undefined,
    custom: {
      content_name: order?.product?.name ?? "Sua Oferta",
      order_ref: order?.refId,
    },
  });
  return NextResponse.json({ ok: true, r });
}
