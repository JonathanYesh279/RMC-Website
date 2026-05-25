"use client";

import { useEffect } from "react";
import Link from "next/link";
import type {
  UpdateArchiveDoc,
  UpdateHolidayDoc,
  UpdatesPageDoc,
} from "@/sanity/queries";
import { FALLBACK_HOURS_ROWS } from "./derived";

// ── Hard-coded fallbacks (used when a Sanity field is empty) ──
const FALLBACK = {
  hero: {
    lede: "כל מה שצריך לדעת על שעות פעילות, חגים וחופשות, מערכת השיעורים ולוח השנה של הקונסרבטוריון — מתעדכן באופן שוטף ע״י מזכירות המרכז.",
  },
  featured: {
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "מודעת חופשת פסח",
  },
  hours: {
    noteLead: "שימו לב:",
    noteBody:
      "בתקופת החופשה (01.04–08.04) המזכירות פעילה רק בימי ב׳ ו־ד׳ בשעות 10:00–13:00.",
  },
  theory: {
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "לוח שעות התאוריה",
  },
  calendar: {
    image:
      "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=1400&q=80&auto=format&fit=crop",
    imageAlt: "לוח השנה השנתי",
  },
  archiveSummary: "12 עדכונים · שנת תשפ״ו",
} as const;

const FALLBACK_HOLIDAYS: UpdateHolidayDoc[] = [
  {
    _id: "fallback-hol-pesach",
    imageUrl:
      "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=900&q=80&auto=format&fit=crop",
    imageAlt: "חופשת פסח תשפ״ו",
    cornerTone: "amber",
    cornerLabel: "פעיל",
    title: "חופשת פסח תשפ״ו",
    description: "שיעורים פרטיים עד 31/03 כולל. חזרה ביום חמישי 09/04.",
    dateRange: "01.04 – 08.04",
    linkUrl: null,
  },
  {
    _id: "fallback-hol-shavuot",
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80&auto=format&fit=crop",
    imageAlt: "חופשת שבועות",
    cornerTone: "teal",
    cornerLabel: "בעוד 5 שבועות",
    title: "חופשת שבועות",
    description:
      "המרכז סגור בערב החג וביום החג. החזרות יחודשו כרגיל למחרת.",
    dateRange: "21.05 – 23.05",
    linkUrl: null,
  },
  {
    _id: "fallback-hol-finale",
    imageUrl:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=900&q=80&auto=format&fit=crop",
    imageAlt: "קונצרט הסיום השנתי",
    cornerTone: "default",
    cornerLabel: "קונצרט סיום",
    title: "קונצרט הסיום השנתי",
    description:
      "לרגל קונצרט הסיום, האולם הקאמרי יישאר סגור להשכרה ביום זה.",
    dateRange: "28.06.2026",
    linkUrl: null,
  },
];

const FALLBACK_ARCHIVE: UpdateArchiveDoc[] = [
  {
    _id: "fallback-arc-1",
    imageUrl:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80&auto=format&fit=crop",
    imageAlt: "עדכון תאריכי חופשת חנוכה",
    tag: "חופשה",
    tagTone: "amber",
    name: "עדכון תאריכי חופשת חנוכה תשפ״ו · המרכז סגור 14.12–22.12",
    date: "2025-12-07",
    dateDisplay: "07.12.2025",
    relativeLabel: "לפני 3 חודשים",
    linkUrl: null,
  },
  {
    _id: "fallback-arc-2",
    imageUrl:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80&auto=format&fit=crop",
    imageAlt: "קונצרט יום העצמאות",
    tag: "אירוע",
    tagTone: "coral",
    name: "קונצרט יום העצמאות — מסיבה מוסיקלית בכיכר העירייה",
    date: "2025-04-14",
    dateDisplay: "14.04.2025",
    relativeLabel: "לפני שנה",
    linkUrl: null,
  },
  {
    _id: "fallback-arc-3",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&auto=format&fit=crop",
    imageAlt: "שינוי שעות מזכירות",
    tag: "שעות פעילות",
    tagTone: "teal",
    name: "שינוי שעות מזכירות לקראת תקופת המבחנים — דצמבר 2025",
    date: "2025-11-28",
    dateDisplay: "28.11.2025",
    relativeLabel: "לפני 4 חודשים",
    linkUrl: null,
  },
  {
    _id: "fallback-arc-4",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop",
    imageAlt: "פתיחת שנת לימודים",
    tag: "הודעה כללית",
    tagTone: "gray",
    name: "פתיחת שנת לימודים תשפ״ו — מערכת חדשה, מורים חדשים, ברוכים השבים",
    date: "2025-08-27",
    dateDisplay: "27.08.2025",
    relativeLabel: "לפני 9 חודשים",
    linkUrl: null,
  },
  {
    _id: "fallback-arc-5",
    imageUrl:
      "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&q=80&auto=format&fit=crop",
    imageAlt: "חופשת ראש השנה",
    tag: "חופשה",
    tagTone: "amber",
    name: "חופשת ראש השנה תשפ״ו — שיעורים מתחדשים ביום ראשון 28.09",
    date: "2025-09-15",
    dateDisplay: "15.09.2025",
    relativeLabel: "לפני 8 חודשים",
    linkUrl: null,
  },
];

const DAY_ORDER: Array<{
  key:
    | "hoursDaySunday"
    | "hoursDayMonday"
    | "hoursDayTuesday"
    | "hoursDayWednesday"
    | "hoursDayThursday"
    | "hoursDayFriday"
    | "hoursDaySaturday";
  label: string;
}> = [
  { key: "hoursDaySunday", label: "ראשון" },
  { key: "hoursDayMonday", label: "שני" },
  { key: "hoursDayTuesday", label: "שלישי" },
  { key: "hoursDayWednesday", label: "רביעי" },
  { key: "hoursDayThursday", label: "חמישי" },
  { key: "hoursDayFriday", label: "שישי" },
  { key: "hoursDaySaturday", label: "שבת" },
];

function formatIsoDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

function ChevronStart() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M7 3L3 6l4 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  page: UpdatesPageDoc;
  holidays: UpdateHolidayDoc[];
  archive: UpdateArchiveDoc[];
  /** Computed on the server from the most recent archive item. Null = hide pill. */
  statusPill: string | null;
  /** Computed on the server from today's day-of-week + the hours table. */
  todayLine: string;
};

export default function UpdatesContent({
  page,
  holidays,
  archive,
  statusPill,
  todayLine,
}: Props) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    document
      .querySelectorAll(".reveal:not(.in)")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const holidayList = holidays.length > 0 ? holidays : FALLBACK_HOLIDAYS;
  const archiveList = archive.length > 0 ? archive : FALLBACK_ARCHIVE;

  const heroLede = page?.heroLede ?? FALLBACK.hero.lede;

  const featImg = page?.featuredImageUrl ?? FALLBACK.featured.image;
  const featAlt = page?.featuredImageAlt ?? FALLBACK.featured.imageAlt;

  const hoursNoteLead = page?.hoursNoteLead ?? FALLBACK.hours.noteLead;
  const hoursNoteBody = page?.hoursNoteBody ?? FALLBACK.hours.noteBody;

  const theoryImg = page?.theoryImageUrl ?? FALLBACK.theory.image;
  const theoryImgAlt = page?.theoryImageAlt ?? FALLBACK.theory.imageAlt;

  const calendarImg = page?.calendarImageUrl ?? FALLBACK.calendar.image;
  const calendarImgAlt =
    page?.calendarImageAlt ?? FALLBACK.calendar.imageAlt;

  const archiveSummary = page?.archiveSummary ?? FALLBACK.archiveSummary;

  return (
    <>
      <section className="up-hero">
        <div className="up-hero-shell container">
          <div className="up-crumbs">
            <Link href="/">בית</Link>
            <span style={{ marginInline: 8, opacity: 0.55 }}>/</span>
            <span>מידע ועדכונים</span>
          </div>

          <div className="up-h-row">
            <div className="reveal">
              {statusPill && (
                <span className="up-status">
                  <span className="pulse" />
                  {statusPill}
                </span>
              )}
              <h1 className="up-h-title">
                מידע <em>ועדכונים.</em>
              </h1>
              <p className="up-h-lede">{heroLede}</p>
            </div>

            <aside
              className="up-h-stats up-h-stats-solo reveal"
              aria-label="שעות פעילות היום"
            >
              <div className="up-h-quick">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M7 1.5v5l3 2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle cx="7" cy="7" r="5.6" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                <span>{todayLine}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="up-main">
        <div className="container">
          {/* Big image (featured update — image only, no text overlay) */}
          <section className="up-sec">
            <article className="up-featured up-featured--solo reveal">
              <div
                className="up-feat-media up-feat-media--solo"
                style={{ backgroundImage: `url('${featImg}')` }}
                role="img"
                aria-label={featAlt}
              />
            </article>
          </section>

          {/* Holidays */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">חגים, חופשות ואירועים</span>
              </div>
              <div className="up-sec-meta" />
            </header>

            <div className="up-cards">
              {holidayList.map((h) => (
                <article className="up-card reveal" key={h._id}>
                  <div
                    className="up-card-media"
                    style={{
                      backgroundImage: h.imageUrl
                        ? `url('${h.imageUrl}')`
                        : undefined,
                    }}
                    role="img"
                    aria-label={h.imageAlt ?? h.title}
                  >
                    {h.cornerLabel && (
                      <span
                        className={`up-card-corner${
                          h.cornerTone === "amber"
                            ? " amber"
                            : h.cornerTone === "teal"
                              ? " teal"
                              : ""
                        }`}
                      >
                        {h.cornerLabel}
                      </span>
                    )}
                  </div>
                  <div className="up-card-body">
                    <div className="up-card-title">{h.title}</div>
                    {h.description && (
                      <p className="up-card-text">{h.description}</p>
                    )}
                    <div className="up-card-foot">
                      <div className="date">{h.dateRange}</div>
                      {h.linkUrl ? (
                        <a href={h.linkUrl}>
                          קרא עוד
                          <ChevronStart />
                        </a>
                      ) : (
                        <span />
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Activity hours — table only */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">שעות פעילות</span>
              </div>
              <div className="up-sec-meta" />
            </header>

            <div className="up-hours up-hours--solo">
              <div className="up-hours-side reveal">
                <h3>שעות פתיחה — שבוע נוכחי</h3>

                <div className="up-hours-list">
                  {DAY_ORDER.map((d, i) => {
                    const row = page?.[d.key];
                    const fb = FALLBACK_HOURS_ROWS[i];
                    const time = row?.time ?? fb.time;
                    const today = row?.today ?? false;
                    const closed = row?.closed ?? fb.closed;
                    return (
                      <div
                        key={d.key}
                        className={`up-hours-row${today ? " today" : ""}${
                          closed ? " closed" : ""
                        }`}
                      >
                        <span className="day">{d.label}</span>
                        <span className="time">{time}</span>
                      </div>
                    );
                  })}
                </div>

                {(hoursNoteLead || hoursNoteBody) && (
                  <div className="up-hours-note">
                    {hoursNoteLead && <strong>{hoursNoteLead}</strong>}
                    {hoursNoteLead && hoursNoteBody && " "}
                    {hoursNoteBody}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Theory hours board — image only */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">מערכת השיעורים</span>
              </div>
              <div className="up-sec-meta" />
            </header>

            <div
              className="up-theory-board reveal"
              style={{ backgroundImage: `url('${theoryImg}')` }}
              role="img"
              aria-label={theoryImgAlt}
            />
          </section>

          {/* Yearly calendar — image only */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">לוח שנה</span>
              </div>
              <div className="up-sec-meta" />
            </header>

            <div
              className="up-cal-board reveal"
              style={{ backgroundImage: `url('${calendarImg}')` }}
              role="img"
              aria-label={calendarImgAlt}
            />
          </section>

          {/* Archive */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">עדכונים קודמים</span>
              </div>
              <div className="up-sec-meta">
                {archiveSummary && (
                  <span className="up-updated">{archiveSummary}</span>
                )}
              </div>
            </header>

            <div className="up-archive reveal">
              {archiveList.map((a) => {
                const dateText = a.dateDisplay ?? formatIsoDate(a.date);
                const tagToneClass =
                  a.tagTone === "amber"
                    ? " amber"
                    : a.tagTone === "coral"
                      ? " coral"
                      : a.tagTone === "gray"
                        ? " gray"
                        : "";
                if (a.linkUrl) {
                  return (
                    <a className="up-arc-row" href={a.linkUrl} key={a._id}>
                      <ArcRowInner item={a} dateText={dateText} tagToneClass={tagToneClass} />
                    </a>
                  );
                }
                return (
                  <div className="up-arc-row" key={a._id}>
                    <ArcRowInner item={a} dateText={dateText} tagToneClass={tagToneClass} />
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function ArcRowInner({
  item,
  dateText,
  tagToneClass,
}: {
  item: UpdateArchiveDoc;
  dateText: string;
  tagToneClass: string;
}) {
  return (
    <>
      <div
        className="up-arc-thumb"
        style={{
          backgroundImage: item.imageUrl ? `url('${item.imageUrl}')` : undefined,
        }}
        role="img"
        aria-label={item.imageAlt ?? item.name}
      />
      <div className="up-arc-info">
        <div className={`up-arc-tag${tagToneClass}`}>
          <span className="d" />
          {item.tag}
        </div>
        <div className="up-arc-name">{item.name}</div>
      </div>
      <div className="up-arc-date">
        {dateText}
        {item.relativeLabel && <small>{item.relativeLabel}</small>}
      </div>
      <span className="up-arc-action">
        <ChevronStart />
      </span>
    </>
  );
}
