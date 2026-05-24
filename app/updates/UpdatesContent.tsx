"use client";

import { useEffect } from "react";
import Link from "next/link";
import type {
  UpdateArchiveDoc,
  UpdateHolidayDoc,
  UpdatesPageDoc,
} from "@/sanity/queries";

// ── Hard-coded fallbacks (used when a Sanity field is empty) ──
const FALLBACK = {
  hero: {
    statusPill: "פורסם עדכון חדש — לפני 3 ימים",
    lede: "כל מה שצריך לדעת על שעות פעילות, חגים וחופשות, מערכת השיעורים ולוח השנה של הקונסרבטוריון — מתעדכן באופן שוטף ע״י מזכירות המרכז.",
    todayLine: "היום ראשון · המרכז פעיל בשעות 14:00–20:00",
  },
  featured: {
    image:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "מודעת חופשת פסח",
    statusTag: "מודעה פעילה",
    eyebrowMain: "חופשת חג ·",
    eyebrowEm: "פסח תשפ״ו",
    title:
      "חופשת פסח — השיעורים הפרטיים יתקיימו עד יום שלישי 31/03 (כולל)",
    body: "חזרה ללימודים סדירים ביום חמישי 09/04. הזמני פעילות לתזמורות והרכבי החדר יפורטו בעדכון נפרד שיופץ דרך המורים הראשיים.",
    meta1Label: "תקופת חופשה",
    meta1Value: "01.04 – 08.04",
    meta1Sub: "שמונה ימי חופשה",
    meta2Label: "חזרה ללימודים",
    meta2Value: "09.04.2026",
    meta2Sub: "יום חמישי · 14:00",
  },
  holidaysUpdatedLabel: "לפני 5 ימים",
  hours: {
    adminChip: "תמונה דינמית · מתעדכנת לפי תקופה",
    validUntil: "31.03.2026",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80&auto=format&fit=crop",
    imageAlt: "תמונת שעות הפעילות לתקופה הנוכחית",
    overlayLabel: "תוקף התמונה",
    overlayValue: "תקופת חג פסח",
    overlayBadge: "21.03 → 08.04",
    sideLede:
      "שעות עזר טקסטואליות לשעת חירום, כאשר התמונה עוד לא נטענה או המבקר זקוק לנגישות מהירה.",
    noteLead: "שימו לב:",
    noteBody:
      "בתקופת החופשה (01.04–08.04) המזכירות פעילה רק בימי ב׳ ו־ד׳ בשעות 10:00–13:00.",
  },
  theory: {
    image:
      "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "לוח שעות התאוריה",
    updatedDate: "27.08.2025",
  },
  calendar: {
    image:
      "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=1400&q=80&auto=format&fit=crop",
    imageAlt: "לוח השנה השנתי",
    adminChip: "תמונה שנתית",
    publishedDate: "15.08.2025",
  },
  archiveSummary: "12 עדכונים · שנת תשפ״ו",
  subscribe: {
    lede: "פעם בחודש, כשמתפרסם משהו חדש — מודעת חג, שינוי במערכת או הודעה חשובה — נשלח אליכם תקציר קצר. ללא ספאם.",
    emailPlaceholder: "כתובת המייל שלך",
    submitLabel: "הירשם",
    channelsHeading: "או עקבו אחרינו:",
    facebookLabel: "פייסבוק",
    facebookUrl: "#",
    instagramLabel: "אינסטגרם",
    instagramUrl: "#",
  },
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
    metaTags: ["חופשה", "8 ימים", "כל המחלקות"],
    description: "שיעורים פרטיים עד 31/03 כולל. חזרה ביום חמישי 09/04.",
    dateRange: "01.04 – 08.04",
    dateSub: "חופשה רשמית",
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
    metaTags: ["חופשה", "3 ימים", "כל המחלקות"],
    description:
      "המרכז סגור בערב החג וביום החג. החזרות יחודשו כרגיל למחרת.",
    dateRange: "21.05 – 23.05",
    dateSub: "חופשת חג",
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
    metaTags: ["אירוע מיוחד", "אודיטוריום"],
    description:
      "לרגל קונצרט הסיום, האולם הקאמרי יישאר סגור להשכרה ביום זה.",
    dateRange: "28.06.2026",
    dateSub: "יום שבת · 19:00",
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
  fallbackTime: string;
  fallbackToday?: boolean;
  fallbackClosed?: boolean;
}> = [
  { key: "hoursDaySunday", label: "ראשון", fallbackTime: "14:00 – 20:00", fallbackToday: true },
  { key: "hoursDayMonday", label: "שני", fallbackTime: "14:00 – 21:00" },
  { key: "hoursDayTuesday", label: "שלישי", fallbackTime: "14:00 – 21:00" },
  { key: "hoursDayWednesday", label: "רביעי", fallbackTime: "14:00 – 21:00" },
  { key: "hoursDayThursday", label: "חמישי", fallbackTime: "14:00 – 20:00" },
  { key: "hoursDayFriday", label: "שישי", fallbackTime: "חופשת חג", fallbackClosed: true },
  { key: "hoursDaySaturday", label: "שבת", fallbackTime: "סגור", fallbackClosed: true },
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
};

export default function UpdatesContent({ page, holidays, archive }: Props) {
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

  const statusPill = page?.heroStatusPill ?? FALLBACK.hero.statusPill;
  const heroLede = page?.heroLede ?? FALLBACK.hero.lede;
  const todayLine = page?.heroTodayLine ?? FALLBACK.hero.todayLine;

  const featImg = page?.featuredImageUrl ?? FALLBACK.featured.image;
  const featAlt = page?.featuredImageAlt ?? FALLBACK.featured.imageAlt;
  const featStatusTag = page?.featuredStatusTag ?? FALLBACK.featured.statusTag;
  const featEyebrowMain =
    page?.featuredEyebrowMain ?? FALLBACK.featured.eyebrowMain;
  const featEyebrowEm =
    page?.featuredEyebrowEm ?? FALLBACK.featured.eyebrowEm;
  const featTitle = page?.featuredTitle ?? FALLBACK.featured.title;
  const featBody = page?.featuredBody ?? FALLBACK.featured.body;
  const featM1Label = page?.featuredMeta1Label ?? FALLBACK.featured.meta1Label;
  const featM1Value = page?.featuredMeta1Value ?? FALLBACK.featured.meta1Value;
  const featM1Sub = page?.featuredMeta1Sub ?? FALLBACK.featured.meta1Sub;
  const featM2Label = page?.featuredMeta2Label ?? FALLBACK.featured.meta2Label;
  const featM2Value = page?.featuredMeta2Value ?? FALLBACK.featured.meta2Value;
  const featM2Sub = page?.featuredMeta2Sub ?? FALLBACK.featured.meta2Sub;

  const holidaysUpdated =
    page?.holidaysUpdatedLabel ?? FALLBACK.holidaysUpdatedLabel;

  const hoursAdminChip = page?.hoursAdminChip ?? FALLBACK.hours.adminChip;
  const hoursValidUntil = page?.hoursValidUntil ?? FALLBACK.hours.validUntil;
  const hoursImg = page?.hoursImageUrl ?? FALLBACK.hours.image;
  const hoursImgAlt = page?.hoursImageAlt ?? FALLBACK.hours.imageAlt;
  const hoursOverlayLabel =
    page?.hoursOverlayLabel ?? FALLBACK.hours.overlayLabel;
  const hoursOverlayValue =
    page?.hoursOverlayValue ?? FALLBACK.hours.overlayValue;
  const hoursOverlayBadge =
    page?.hoursOverlayBadge ?? FALLBACK.hours.overlayBadge;
  const hoursSideLede = page?.hoursSideLede ?? FALLBACK.hours.sideLede;
  const hoursNoteLead = page?.hoursNoteLead ?? FALLBACK.hours.noteLead;
  const hoursNoteBody = page?.hoursNoteBody ?? FALLBACK.hours.noteBody;

  const theoryImg = page?.theoryImageUrl ?? FALLBACK.theory.image;
  const theoryImgAlt = page?.theoryImageAlt ?? FALLBACK.theory.imageAlt;
  const theoryUpdated = page?.theoryUpdatedDate ?? FALLBACK.theory.updatedDate;

  const calendarImg = page?.calendarImageUrl ?? FALLBACK.calendar.image;
  const calendarImgAlt =
    page?.calendarImageAlt ?? FALLBACK.calendar.imageAlt;
  const calendarAdminChip =
    page?.calendarAdminChip ?? FALLBACK.calendar.adminChip;
  const calendarPublished =
    page?.calendarPublishedDate ?? FALLBACK.calendar.publishedDate;

  const archiveSummary = page?.archiveSummary ?? FALLBACK.archiveSummary;

  const subLede = page?.subscribeLede ?? FALLBACK.subscribe.lede;
  const subPlaceholder =
    page?.subscribeEmailPlaceholder ?? FALLBACK.subscribe.emailPlaceholder;
  const subSubmit =
    page?.subscribeSubmitLabel ?? FALLBACK.subscribe.submitLabel;
  const subChannelsHeading =
    page?.subscribeChannelsHeading ?? FALLBACK.subscribe.channelsHeading;
  const subFbLabel =
    page?.subscribeFacebookLabel ?? FALLBACK.subscribe.facebookLabel;
  const subFbUrl =
    page?.subscribeFacebookUrl ?? FALLBACK.subscribe.facebookUrl;
  const subIgLabel =
    page?.subscribeInstagramLabel ?? FALLBACK.subscribe.instagramLabel;
  const subIgUrl =
    page?.subscribeInstagramUrl ?? FALLBACK.subscribe.instagramUrl;

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

            {todayLine && (
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
            )}
          </div>
        </div>
      </section>

      <div className="up-main">
        <div className="container">
          {/* Featured update */}
          <section className="up-sec">
            <article className="up-featured reveal">
              <div
                className="up-feat-media"
                style={{ backgroundImage: `url('${featImg}')` }}
                role="img"
                aria-label={featAlt}
              >
                {featStatusTag && (
                  <span className="up-feat-tag">
                    <span className="d" />
                    {featStatusTag}
                  </span>
                )}
              </div>
              <div className="up-feat-body">
                {(featEyebrowMain || featEyebrowEm) && (
                  <span className="up-feat-eyebrow">
                    {featEyebrowMain} {featEyebrowEm && <em>{featEyebrowEm}</em>}
                  </span>
                )}
                <h3 className="up-feat-title">{featTitle}</h3>
                <p className="up-feat-text">{featBody}</p>
                <div className="up-feat-meta">
                  <div className="up-feat-meta-item">
                    <div className="l">{featM1Label}</div>
                    <div className="v">
                      {featM1Value}
                      {featM1Sub && <small>{featM1Sub}</small>}
                    </div>
                  </div>
                  <div className="up-feat-meta-item">
                    <div className="l">{featM2Label}</div>
                    <div className="v">
                      {featM2Value}
                      {featM2Sub && <small>{featM2Sub}</small>}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>

          {/* Holidays */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">חגים, חופשות ואירועים</span>
              </div>
              <div className="up-sec-meta">
                <span className="up-updated">
                  עודכן <b>{holidaysUpdated}</b>
                </span>
              </div>
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
                    {h.metaTags && h.metaTags.length > 0 && (
                      <div className="up-card-meta">
                        {h.metaTags.map((m, i) => (
                          <span key={`${m}-${i}`} style={{ display: "contents" }}>
                            <span>{m}</span>
                            {i < h.metaTags!.length - 1 && <span className="sep" />}
                          </span>
                        ))}
                      </div>
                    )}
                    {h.description && (
                      <p className="up-card-text">{h.description}</p>
                    )}
                    <div className="up-card-foot">
                      <div className="date">
                        {h.dateRange}
                        {h.dateSub && <small>{h.dateSub}</small>}
                      </div>
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

          {/* Activity hours */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">שעות פעילות</span>
              </div>
              <div className="up-sec-meta">
                {hoursAdminChip && (
                  <span className="up-admin-chip">{hoursAdminChip}</span>
                )}
                {hoursValidUntil && (
                  <span className="up-updated">
                    בתוקף עד <b>{hoursValidUntil}</b>
                  </span>
                )}
              </div>
            </header>

            <div className="up-hours">
              <div
                className="up-hours-img reveal"
                style={{ backgroundImage: `url('${hoursImg}')` }}
                role="img"
                aria-label={hoursImgAlt}
              >
                {(hoursOverlayLabel || hoursOverlayValue || hoursOverlayBadge) && (
                  <div className="up-hours-overlay">
                    <div>
                      {hoursOverlayLabel && (
                        <div className="l">{hoursOverlayLabel}</div>
                      )}
                      {hoursOverlayValue && (
                        <div className="v">{hoursOverlayValue}</div>
                      )}
                    </div>
                    {hoursOverlayBadge && (
                      <span className="badge">{hoursOverlayBadge}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="up-hours-side reveal">
                <h3>שעות פתיחה — שבוע נוכחי</h3>
                {hoursSideLede && <p className="lede">{hoursSideLede}</p>}

                <div className="up-hours-list">
                  {DAY_ORDER.map((d) => {
                    const row = page?.[d.key];
                    const time = row?.time ?? d.fallbackTime;
                    const today = row?.today ?? d.fallbackToday ?? false;
                    const closed = row?.closed ?? d.fallbackClosed ?? false;
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

          {/* Theory hours board */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">מערכת השיעורים</span>
              </div>
              <div className="up-sec-meta">
                {theoryUpdated && (
                  <span className="up-updated">
                    עודכן <b>{theoryUpdated}</b>
                  </span>
                )}
              </div>
            </header>

            <div
              className="up-theory-board reveal"
              style={{ backgroundImage: `url('${theoryImg}')` }}
              role="img"
              aria-label={theoryImgAlt}
            />
          </section>

          {/* Yearly calendar */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">לוח שנה</span>
              </div>
              <div className="up-sec-meta">
                {calendarAdminChip && (
                  <span className="up-admin-chip">{calendarAdminChip}</span>
                )}
                {calendarPublished && (
                  <span className="up-updated">
                    פורסם <b>{calendarPublished}</b>
                  </span>
                )}
              </div>
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

      {/* Subscribe band */}
      <section className="up-subscribe">
        <div className="container up-sub-inner">
          <div className="up-sub-l reveal">
            <span className="eyebrow">להישאר מעודכנים</span>
            <h2>
              קבלו עדכונים <em>ישירות למייל</em>
            </h2>
            <p>{subLede}</p>
          </div>
          <form
            className="up-sub-form reveal"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="up-sub-input">
              <input
                type="email"
                placeholder={subPlaceholder}
                required
                aria-label={subPlaceholder}
              />
              <button type="submit">{subSubmit}</button>
            </div>
            <div className="up-sub-channels">
              {subChannelsHeading && <span>{subChannelsHeading}</span>}
              <a href={subFbUrl}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M9.3 15v-6h2l.3-2.4H9.3V5c0-.7.2-1.2 1.2-1.2h1.3V1.6c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v1.8H4.5V9h2.2v6h2.6z" />
                </svg>
                {subFbLabel}
              </a>
              <a href={subIgUrl}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="2" y="2" width="12" height="12" rx="3" />
                  <circle cx="8" cy="8" r="2.6" />
                </svg>
                {subIgLabel}
              </a>
            </div>
          </form>
        </div>
      </section>
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
