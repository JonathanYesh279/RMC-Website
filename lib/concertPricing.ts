export type TierKey = "standard" | "premium" | "student";

export type TicketTier = {
  key: TierKey;
  name: string;
  desc: string;
  price: number;
};

export const SERVICE_FEE_PER_TICKET = 8;

const TIER_DEFS: Array<Omit<TicketTier, "price"> & { multiplier: number }> = [
  {
    key: "standard",
    name: "כרטיס רגיל",
    desc: "ישיבה חופשית באולם המרכזי",
    multiplier: 1,
  },
  {
    key: "premium",
    name: "פרימיום — שורות ראשונות",
    desc: "שורות 1–5 · תוכנייה מודפסת · כניסה מועדפת",
    multiplier: 1.5,
  },
  {
    key: "student",
    name: "סטודנט / חייל",
    desc: "בהצגת תעודה בכניסה · ישיבה חופשית",
    multiplier: 0.75,
  },
];

const round10 = (n: number) => Math.round(n / 10) * 10;

export function buildTiers(basePrice: number): TicketTier[] {
  return TIER_DEFS.map((t) => ({
    key: t.key,
    name: t.name,
    desc: t.desc,
    price: t.multiplier === 1 ? basePrice : round10(basePrice * t.multiplier),
  }));
}
