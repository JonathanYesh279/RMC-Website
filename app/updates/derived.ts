// Helpers for values that are computed on the server rather than authored in
// Sanity: the hero status pill (derived from the most recent archive item)
// and the today-line in the hero stats card (derived from the current
// day-of-week + the matching שעות פעילות row).

import type { DayRow, UpdateArchiveDoc, UpdatesPageDoc } from "@/sanity/queries";

/** Default שעות פעילות per day, used when no Sanity value is set. */
export const FALLBACK_HOURS_ROWS: ReadonlyArray<{
  time: string;
  closed: boolean;
}> = [
  { time: "14:00 – 20:00", closed: false }, // Sun
  { time: "14:00 – 21:00", closed: false }, // Mon
  { time: "14:00 – 21:00", closed: false }, // Tue
  { time: "14:00 – 21:00", closed: false }, // Wed
  { time: "14:00 – 20:00", closed: false }, // Thu
  { time: "חופשת חג", closed: true }, // Fri
  { time: "סגור", closed: true }, // Sat
];

const DAY_NAMES_HE = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
] as const;

const HOURS_KEYS: Array<keyof NonNullable<UpdatesPageDoc>> = [
  "hoursDaySunday",
  "hoursDayMonday",
  "hoursDayTuesday",
  "hoursDayWednesday",
  "hoursDayThursday",
  "hoursDayFriday",
  "hoursDaySaturday",
];

/** Day index (0=Sunday … 6=Saturday) for Asia/Jerusalem right now. */
export function getJerusalemDayIndex(now: Date = new Date()): number {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jerusalem",
    weekday: "short",
  }).format(now);
  const map: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  return map[weekday] ?? 0;
}

/** Build the "היום ראשון · המרכז פעיל בשעות 14:00–20:00" line for the hero. */
export function buildTodayLine(
  page: UpdatesPageDoc,
  fallbackRows: ReadonlyArray<{ time: string; closed: boolean }>,
  now: Date = new Date(),
): string {
  const idx = getJerusalemDayIndex(now);
  const name = DAY_NAMES_HE[idx];
  const sanityRow = page?.[HOURS_KEYS[idx]] as DayRow | undefined;
  const fallback = fallbackRows[idx];
  const time = sanityRow?.time ?? fallback.time;
  const closed = sanityRow?.closed ?? fallback.closed;
  if (closed) return `היום ${name} · המרכז סגור`;
  return `היום ${name} · המרכז פעיל בשעות ${time}`;
}

/** Hebrew gendered count for masculine nouns (יום/שבוע/חודש). */
function masculineHebrewCount(n: number, one: string, two: string, plural: string): string {
  if (n === 1) return one;
  if (n === 2) return two;
  return `${n} ${plural}`;
}

/** Hebrew gendered count for feminine nouns (שנה). */
function feminineHebrewCount(n: number, one: string, two: string, plural: string): string {
  if (n === 1) return one;
  if (n === 2) return two;
  return `${n} ${plural}`;
}

/**
 * Build the "פורסם עדכון חדש — לפני X" status pill from the most-recent
 * archive item. Returns null if there is nothing to report.
 */
export function buildStatusPill(
  archive: ReadonlyArray<UpdateArchiveDoc>,
  now: Date = new Date(),
): string | null {
  const latest = archive[0];
  if (!latest?.date) return null;

  const then = new Date(`${latest.date}T00:00:00`);
  if (Number.isNaN(then.getTime())) return null;

  const msPerDay = 86_400_000;
  const today = new Date(
    new Date(now).toLocaleString("en-US", { timeZone: "Asia/Jerusalem" }),
  );
  today.setHours(0, 0, 0, 0);
  const days = Math.max(0, Math.round((today.getTime() - then.getTime()) / msPerDay));

  let suffix: string;
  if (days === 0) suffix = "היום";
  else if (days === 1) suffix = "אתמול";
  else if (days < 7) suffix = `לפני ${masculineHebrewCount(days, "יום", "יומיים", "ימים")}`;
  else if (days < 30) {
    const weeks = Math.round(days / 7);
    suffix = `לפני ${masculineHebrewCount(weeks, "שבוע", "שבועיים", "שבועות")}`;
  } else if (days < 365) {
    const months = Math.max(1, Math.round(days / 30));
    suffix = `לפני ${masculineHebrewCount(months, "חודש", "חודשיים", "חודשים")}`;
  } else {
    const years = Math.max(1, Math.round(days / 365));
    suffix = `לפני ${feminineHebrewCount(years, "שנה", "שנתיים", "שנים")}`;
  }

  return `פורסם עדכון חדש — ${suffix}`;
}
