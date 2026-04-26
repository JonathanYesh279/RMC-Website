const TZ = "Asia/Jerusalem";

const HEBREW_MONTHS = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

const HEBREW_DAYS = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
];

function partsInJerusalem(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const parts = fmt.formatToParts(date);
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const weekdayShort = get("weekday");
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: get("hour"),
    minute: get("minute"),
    weekdayIdx: weekdayMap[weekdayShort] ?? 0,
  };
}

export type ConcertDateLabels = {
  iso: string;
  day: number;
  dayPadded: string;
  monthShort: string;
  monthFull: string;
  dayName: string;
  dayNameShort: string;
  time: string;
  shortDate: string;
};

export function formatConcertDate(iso: string): ConcertDateLabels {
  const date = new Date(iso);
  const p = partsInJerusalem(date);
  const monthName = HEBREW_MONTHS[p.month - 1] ?? "";
  const dayName = HEBREW_DAYS[p.weekdayIdx] ?? "";
  return {
    iso,
    day: p.day,
    dayPadded: String(p.day).padStart(2, "0"),
    monthShort: monthName,
    monthFull: `${monthName} ${p.year}`,
    dayName: `יום ${dayName}`,
    dayNameShort: dayName,
    time: `${p.hour}:${p.minute}`,
    shortDate: `${p.day} ${monthName} ${p.year}`,
  };
}

export function deriveDateRangeLabel(
  isoDates: string[],
): string | null {
  if (isoDates.length === 0) return null;
  const sorted = [...isoDates].sort();
  const first = formatConcertDate(sorted[0]);
  const last = formatConcertDate(sorted[sorted.length - 1]);
  if (first.monthFull === last.monthFull) return first.monthFull;
  return `${first.monthFull} — ${last.monthFull}`;
}
