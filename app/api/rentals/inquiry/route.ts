import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import {
  EQ_CATALOG,
  VENUES,
} from "@/app/rentals/availability/availability-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VAT_RATE = 0.17;

const InquirySchema = z.object({
  honeypot: z.string().max(200).optional().default(""),
  contact: z.object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    organization: z.string().trim().max(120).optional().default(""),
    eventType: z.string().trim().min(1).max(80),
    email: z.string().trim().email().max(160),
    phone: z.string().trim().min(5).max(40),
    participants: z
      .number()
      .int()
      .min(0)
      .max(100000)
      .nullable()
      .optional(),
    dateFlexibility: z.string().trim().max(80).optional().default(""),
    notes: z.string().trim().max(2000).optional().default(""),
  }),
  selection: z.object({
    venueKey: z.string().trim().min(1).max(40),
    date: z.string().min(1).max(40),
    isWeekend: z.boolean(),
    slotIds: z.array(z.string().min(1).max(40)).min(1).max(20),
    equipmentIds: z
      .array(z.string().min(1).max(60))
      .max(60)
      .optional()
      .default([]),
  }),
});

type Inquiry = z.infer<typeof InquirySchema>;

type ResolvedSlot = {
  id: string;
  title: string;
  time: string;
  hours: number;
  desc: string;
  price: number;
};

type ResolvedEquipment = {
  id: string;
  name: string;
  spec: string;
  price: number;
};

type Resolved = {
  venueName: string;
  venueMeta: string;
  slots: ResolvedSlot[];
  equipment: ResolvedEquipment[];
  pricing: {
    hallTotal: number;
    eqTotal: number;
    subtotal: number;
    vat: number;
    total: number;
  };
  dateLabel: string;
  tierLabel: string;
};

function fmt(n: number) {
  return `₪${n.toLocaleString("he-IL")}`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseHourSpan(time: string): number {
  const m = time.match(/(\d{1,2}):\d{2}\s*[–\-]\s*(\d{1,2}):\d{2}/);
  return m ? +m[2] - +m[1] : 0;
}

function dateLabelHe(iso: string): string {
  try {
    return new Intl.DateTimeFormat("he-IL", {
      timeZone: "Asia/Jerusalem",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function resolveAgainstCatalog(
  payload: Inquiry,
): { ok: true; data: Resolved } | { ok: false; error: string } {
  const venue = VENUES[payload.selection.venueKey];
  if (!venue) return { ok: false, error: "החלל שנבחר לא קיים" };

  const slotMap = new Map(venue.slots.map((s) => [s.id, s]));
  const slots: ResolvedSlot[] = [];
  for (const id of payload.selection.slotIds) {
    const s = slotMap.get(id);
    if (!s) return { ok: false, error: "אחד מחלונות הזמן שנבחרו לא תקין" };
    slots.push({
      id: s.id,
      title: s.title,
      time: s.time,
      hours: parseHourSpan(s.time),
      desc: s.desc,
      price: payload.selection.isWeekend ? s.priceWknd : s.priceWeek,
    });
  }

  const allowedEq = new Set(venue.equipment);
  const equipment: ResolvedEquipment[] = [];
  for (const id of payload.selection.equipmentIds) {
    const item = EQ_CATALOG[id];
    if (!item || !allowedEq.has(id)) {
      return { ok: false, error: "פריט ציוד שנבחר לא זמין בחלל הזה" };
    }
    equipment.push({ id, name: item.name, spec: item.spec, price: item.price });
  }

  const hallTotal = slots.reduce((acc, s) => acc + s.price, 0);
  const eqTotal = equipment.reduce((acc, e) => acc + e.price, 0);
  const subtotal = hallTotal + eqTotal;
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + vat;

  return {
    ok: true,
    data: {
      venueName: venue.name,
      venueMeta: venue.meta,
      slots,
      equipment,
      pricing: { hallTotal, eqTotal, subtotal, vat, total },
      dateLabel: dateLabelHe(payload.selection.date),
      tierLabel: payload.selection.isWeekend ? "סוף שבוע" : "יום חול",
    },
  };
}

function row(label: string, value: string, bold = false): string {
  const w = bold ? "700" : "500";
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #efeae0;color:#6b6b6b;font-size:13px;width:42%">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #efeae0;color:#1a1a1a;font-size:14px;font-weight:${w}">${value}</td>
  </tr>`;
}

function section(title: string, inner: string): string {
  return `<h3 style="margin:24px 0 8px;color:#1a1a1a;font-size:15px;font-weight:600;border-bottom:2px solid #3cbabd;padding-bottom:4px;display:inline-block">${escapeHtml(title)}</h3>
  <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;background:#faf7f2;border:1px solid #e6e1d8">${inner}</table>`;
}

function buildHtml(payload: Inquiry, r: Resolved): string {
  const c = payload.contact;

  const contactRows = [
    row("שם מלא", escapeHtml(`${c.firstName} ${c.lastName}`)),
    c.organization ? row("ארגון / הפקה", escapeHtml(c.organization)) : "",
    row("סוג אירוע", escapeHtml(c.eventType)),
    row(
      "דוא״ל",
      `<a href="mailto:${escapeHtml(c.email)}" style="color:#e83c4e;text-decoration:none">${escapeHtml(c.email)}</a>`,
    ),
    row(
      "טלפון",
      `<a href="tel:${escapeHtml(c.phone)}" style="color:#1a1a1a;text-decoration:none">${escapeHtml(c.phone)}</a>`,
    ),
    c.participants != null
      ? row("מספר משתתפים", String(c.participants))
      : "",
    c.dateFlexibility ? row("גמישות תאריך", escapeHtml(c.dateFlexibility)) : "",
  ].join("");

  const venueRows = [
    row("חלל", escapeHtml(r.venueName)),
    row("פרטי חלל", escapeHtml(r.venueMeta)),
    row("תאריך", escapeHtml(r.dateLabel)),
    row("תעריף", escapeHtml(r.tierLabel)),
  ].join("");

  const slotsRows = r.slots
    .map((s) =>
      row(
        `${s.title} · ${s.time}`,
        `${escapeHtml(s.desc)} · ${s.hours} שעות &nbsp;·&nbsp; <strong>${fmt(s.price)}</strong>`,
      ),
    )
    .join("");

  const equipmentRows = r.equipment.length
    ? r.equipment
        .map((e) =>
          row(
            escapeHtml(e.name),
            `${escapeHtml(e.spec)} &nbsp;·&nbsp; <strong>${e.price === 0 ? "כלול" : fmt(e.price)}</strong>`,
          ),
        )
        .join("")
    : row("—", "לא נבחר ציוד נוסף");

  const pricingRows = [
    row("השכרת חלל", fmt(r.pricing.hallTotal)),
    row("ציוד נוסף", r.pricing.eqTotal > 0 ? fmt(r.pricing.eqTotal) : "₪0"),
    row("סכום ביניים", fmt(r.pricing.subtotal)),
    row("מע״מ (17%)", fmt(r.pricing.vat)),
    row("סה״כ הערכה ראשונית", `<span style="color:#e83c4e;font-size:18px">${fmt(r.pricing.total)}</span>`, true),
  ].join("");

  const notesBlock = c.notes
    ? section(
        "תוספות וצרכים מיוחדים",
        `<tr><td style="padding:12px;color:#1a1a1a;font-size:14px;line-height:1.7;white-space:pre-wrap">${escapeHtml(c.notes)}</td></tr>`,
      )
    : "";

  return `<!doctype html>
<html dir="rtl" lang="he">
<body style="margin:0;padding:24px;background:#f3ede1;font-family:Assistant,Arial,sans-serif;color:#1a1a1a">
  <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e6e1d8;padding:24px 28px">
    <div style="font-size:11px;color:#9a9a9a;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px">RMC · Rentals Inquiry</div>
    <h1 style="margin:0 0 4px;font-size:22px;color:#1a1a1a">בקשת הזמנה חדשה</h1>
    <p style="margin:0 0 20px;color:#3a3a3a;font-size:14px">${escapeHtml(r.venueName)} · ${escapeHtml(r.dateLabel)}</p>

    ${section("איש קשר", contactRows)}
    ${section("חלל ותאריך", venueRows)}
    ${section("חלונות זמן", slotsRows)}
    ${section("ציוד וכלים", equipmentRows)}
    ${section("הערכת מחיר", pricingRows)}
    ${notesBlock}

    <p style="margin:24px 0 0;color:#9a9a9a;font-size:11px">המספר מהווה הערכה ראשונית; מחיר סופי ייקבע בהצעה המפורטת.</p>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "גוף הבקשה לא תקין" },
      { status: 400 },
    );
  }

  const parsed = InquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "אחד השדות לא תקין. בדקו וודאו שכל שדות החובה מולאו." },
      { status: 400 },
    );
  }
  const payload = parsed.data;

  if (payload.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const resolved = resolveAgainstCatalog(payload);
  if (!resolved.ok) {
    return NextResponse.json({ ok: false, error: resolved.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RENTALS_INQUIRY_TO;
  const from = process.env.RENTALS_INQUIRY_FROM;
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { ok: false, error: "השירות אינו מוגדר כראוי. נסו מאוחר יותר או צרו קשר טלפונית." },
      { status: 500 },
    );
  }

  const html = buildHtml(payload, resolved.data);
  const subject = `בקשת הזמנה — ${resolved.data.venueName} · ${resolved.data.dateLabel}`;

  const resend = new Resend(apiKey);
  const sendResult = await resend.emails.send({
    from,
    to,
    replyTo: payload.contact.email,
    subject,
    html,
  });

  if (sendResult.error) {
    return NextResponse.json(
      { ok: false, error: "שליחת המייל נכשלה. נסו שוב או צרו קשר טלפונית." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
