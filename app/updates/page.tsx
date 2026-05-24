"use client";

import { useEffect } from "react";
import Link from "next/link";

const FEATURED_IMG =
  "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1600&q=80&auto=format&fit=crop";

const HOLIDAYS = [
  {
    id: "hol-pesach",
    img: "https://images.unsplash.com/photo-1554244933-d876deb6b2ff?w=900&q=80&auto=format&fit=crop",
    cornerTone: "amber" as const,
    cornerLabel: "פעיל",
    title: "חופשת פסח תשפ״ו",
    meta: ["חופשה", "8 ימים", "כל המחלקות"],
    text: "שיעורים פרטיים עד 31/03 כולל. חזרה ביום חמישי 09/04.",
    date: "01.04 – 08.04",
    sub: "חופשה רשמית",
  },
  {
    id: "hol-shavuot",
    img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80&auto=format&fit=crop",
    cornerTone: "teal" as const,
    cornerLabel: "בעוד 5 שבועות",
    title: "חופשת שבועות",
    meta: ["חופשה", "3 ימים", "כל המחלקות"],
    text: "המרכז סגור בערב החג וביום החג. החזרות יחודשו כרגיל למחרת.",
    date: "21.05 – 23.05",
    sub: "חופשת חג",
  },
  {
    id: "hol-finale",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=900&q=80&auto=format&fit=crop",
    cornerTone: "default" as const,
    cornerLabel: "קונצרט סיום",
    title: "קונצרט הסיום השנתי",
    meta: ["אירוע מיוחד", "אודיטוריום"],
    text: "לרגל קונצרט הסיום, האולם הקאמרי יישאר סגור להשכרה ביום זה.",
    date: "28.06.2026",
    sub: "יום שבת · 19:00",
  },
];

type HoursRow = { day: string; time: string; today?: boolean; closed?: boolean };
const HOURS: HoursRow[] = [
  { day: "ראשון", time: "14:00 – 20:00", today: true },
  { day: "שני", time: "14:00 – 21:00" },
  { day: "שלישי", time: "14:00 – 21:00" },
  { day: "רביעי", time: "14:00 – 21:00" },
  { day: "חמישי", time: "14:00 – 20:00" },
  { day: "שישי", time: "חופשת חג", closed: true },
  { day: "שבת", time: "סגור", closed: true },
];

const TABLES = [
  {
    id: "sched-theory",
    eyebrow: "מערכת ראשית",
    title: "שיעורי תאוריה — ימים א׳, ב׳, ד׳, ה׳",
    badge: { label: "עדכני", tone: "fresh" as const },
    img: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=1400&q=80&auto=format&fit=crop",
    foot: "27.08.2025",
    footLead: "עודכן",
  },
  {
    id: "sched-prep",
    eyebrow: "מערכת משנית",
    title: "הכנה לקלאסי ובגרות — ערבי ה׳, ו׳",
    badge: { label: "בעדכון", tone: "stale" as const },
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1400&q=80&auto=format&fit=crop",
    foot: "14.04.2026",
    footLead: "בעדכון — חזרה",
  },
];

const CALENDAR_LEGEND = [
  { label: "ימי לימוד רגילים", count: "154", cls: "lg-school" },
  { label: "חגי ישראל", count: "18", cls: "lg-hol" },
  { label: "חול המועד", count: "11", cls: "lg-chol" },
  { label: "סגירה / שבת", count: "52", cls: "lg-close" },
];

const ARCHIVE = [
  {
    id: "arc-1",
    img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80&auto=format&fit=crop",
    tag: "חופשה",
    tagTone: "amber" as const,
    name: "עדכון תאריכי חופשת חנוכה תשפ״ו · המרכז סגור 14.12–22.12",
    date: "07.12.2025",
    rel: "לפני 3 חודשים",
  },
  {
    id: "arc-2",
    img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&q=80&auto=format&fit=crop",
    tag: "אירוע",
    tagTone: "coral" as const,
    name: "קונצרט יום העצמאות — מסיבה מוסיקלית בכיכר העירייה",
    date: "14.04.2025",
    rel: "לפני שנה",
  },
  {
    id: "arc-3",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80&auto=format&fit=crop",
    tag: "שעות פעילות",
    tagTone: "teal" as const,
    name: "שינוי שעות מזכירות לקראת תקופת המבחנים — דצמבר 2025",
    date: "28.11.2025",
    rel: "לפני 4 חודשים",
  },
  {
    id: "arc-4",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80&auto=format&fit=crop",
    tag: "הודעה כללית",
    tagTone: "gray" as const,
    name: "פתיחת שנת לימודים תשפ״ו — מערכת חדשה, מורים חדשים, ברוכים השבים",
    date: "27.08.2025",
    rel: "לפני 9 חודשים",
  },
  {
    id: "arc-5",
    img: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&q=80&auto=format&fit=crop",
    tag: "חופשה",
    tagTone: "amber" as const,
    name: "חופשת ראש השנה תשפ״ו — שיעורים מתחדשים ביום ראשון 28.09",
    date: "15.09.2025",
    rel: "לפני 8 חודשים",
  },
];

const HOURS_POSTER =
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80&auto=format&fit=crop";
const CALENDAR_POSTER =
  "https://images.unsplash.com/photo-1606326608690-4e0281b1e588?w=1400&q=80&auto=format&fit=crop";

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

export default function UpdatesPage() {
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
              <span className="up-status">
                <span className="pulse" />
                פורסם עדכון חדש — לפני 3 ימים
              </span>
              <h1 className="up-h-title">
                מידע <em>ועדכונים.</em>
              </h1>
              <p className="up-h-lede">
                כל מה שצריך לדעת על שעות פעילות, חגים וחופשות, מערכת השיעורים
                ולוח השנה של הקונסרבטוריון — מתעדכן באופן שוטף ע״י מזכירות
                המרכז.
              </p>
            </div>

            <aside className="up-h-stats reveal" aria-label="סטטוס עדכונים">
              <div className="up-h-stats-row">
                <div className="up-h-stat">
                  <div className="up-h-stat-l">עודכן לאחרונה</div>
                  <div className="up-h-stat-v">
                    21.03.2026
                    <small>חופשת פסח תשפ״ו</small>
                  </div>
                </div>
                <div className="up-h-stat">
                  <div className="up-h-stat-l">עדכונים פעילים</div>
                  <div className="up-h-stat-v">
                    7<small>4 חופשות · 3 שינויים</small>
                  </div>
                </div>
              </div>
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
                <span>
                  היום ראשון · המרכז פעיל בשעות{" "}
                  <b style={{ color: "#fff", fontWeight: 600 }}>14:00–20:00</b>
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="up-main">
        <div className="container">
          {/* Featured update */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">עדכון מרכזי · מודעה</span>
                <h2>
                  פרסום <em>חדש</em> מהמזכירות
                </h2>
                <p>
                  הודעה רשמית של הקונסרבטוריון, בולטת לכל מי שנכנס לעמוד. האדמין
                  מעלה את המודעה כתמונה — ההודעה מופיעה כפי שעוצבה.
                </p>
              </div>
              <div className="up-sec-meta">
                <span className="up-admin-chip">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <circle cx="6" cy="4" r="2" stroke="currentColor" strokeWidth="1.3" />
                    <path
                      d="M2 11c0-2.2 1.8-4 4-4s4 1.8 4 4"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                    />
                  </svg>
                  מנוהל ע״י מזכירות המרכז
                </span>
                <span className="up-updated">
                  <span className="dotline" />
                  פורסם <b>21 במרץ 2026</b>
                </span>
              </div>
            </header>

            <article className="up-featured reveal">
              <div
                className="up-feat-media"
                style={{ backgroundImage: `url('${FEATURED_IMG}')` }}
                role="img"
                aria-label="מודעת חופשת פסח"
              >
                <span className="up-feat-tag">
                  <span className="d" />
                  מודעה פעילה
                </span>
              </div>
              <div className="up-feat-body">
                <span className="up-feat-eyebrow">
                  חופשת חג · <em>פסח תשפ״ו</em>
                </span>
                <h3 className="up-feat-title">
                  חופשת פסח — השיעורים הפרטיים יתקיימו עד יום שלישי 31/03 (כולל)
                </h3>
                <p className="up-feat-text">
                  חזרה ללימודים סדירים ביום חמישי 09/04. הזמני פעילות לתזמורות
                  והרכבי החדר יפורטו בעדכון נפרד שיופץ דרך המורים הראשיים.
                </p>
                <div className="up-feat-meta">
                  <div className="up-feat-meta-item">
                    <div className="l">תקופת חופשה</div>
                    <div className="v">
                      01.04 – 08.04
                      <small>שמונה ימי חופשה</small>
                    </div>
                  </div>
                  <div className="up-feat-meta-item">
                    <div className="l">חזרה ללימודים</div>
                    <div className="v">
                      09.04.2026
                      <small>יום חמישי · 14:00</small>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>

          {/* Holidays / occasions */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">חגים, חופשות ואירועים</span>
                <h2>
                  מועדים <em>קרובים</em>
                </h2>
                <p>
                  הודעות תקופתיות עבור חגים ואירועים מיוחדים. מתחלפות מעת לעת —
                  האדמין מחליף את התמונה ואת התאריך.
                </p>
              </div>
              <div className="up-sec-meta">
                <span className="up-updated">
                  עודכן <b>לפני 5 ימים</b>
                </span>
              </div>
            </header>

            <div className="up-cards">
              {HOLIDAYS.map((h) => (
                <article className="up-card reveal" key={h.id}>
                  <div
                    className="up-card-media"
                    style={{ backgroundImage: `url('${h.img}')` }}
                    role="img"
                    aria-label={h.title}
                  >
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
                  </div>
                  <div className="up-card-body">
                    <div className="up-card-title">{h.title}</div>
                    <div className="up-card-meta">
                      {h.meta.map((m, i) => (
                        <span key={m} style={{ display: "contents" }}>
                          <span>{m}</span>
                          {i < h.meta.length - 1 && <span className="sep" />}
                        </span>
                      ))}
                    </div>
                    <p className="up-card-text">{h.text}</p>
                    <div className="up-card-foot">
                      <div className="date">
                        {h.date}
                        <small>{h.sub}</small>
                      </div>
                      <a href="#">
                        קרא עוד
                        <ChevronStart />
                      </a>
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
                <h2>
                  מתי <em>אנחנו פתוחים</em>
                </h2>
                <p>
                  שעות הפעילות השוטפות של המרכז. המזכירות מעדכנת את התמונה לפי
                  תקופה — תקופת לימודים, ערבי חג, חופשות.
                </p>
              </div>
              <div className="up-sec-meta">
                <span className="up-admin-chip">תמונה דינמית · מתעדכנת לפי תקופה</span>
                <span className="up-updated">
                  בתוקף עד <b>31.03.2026</b>
                </span>
              </div>
            </header>

            <div className="up-hours">
              <div
                className="up-hours-img reveal"
                style={{ backgroundImage: `url('${HOURS_POSTER}')` }}
                role="img"
                aria-label="תמונת שעות הפעילות לתקופה הנוכחית"
              >
                <div className="up-hours-overlay">
                  <div>
                    <div className="l">תוקף התמונה</div>
                    <div className="v">תקופת חג פסח</div>
                  </div>
                  <span className="badge">21.03 → 08.04</span>
                </div>
              </div>

              <div className="up-hours-side reveal">
                <h3>שעות פתיחה — שבוע נוכחי</h3>
                <p className="lede">
                  שעות עזר טקסטואליות לשעת חירום, כאשר התמונה עוד לא נטענה או
                  המבקר זקוק לנגישות מהירה.
                </p>

                <div className="up-hours-list">
                  {HOURS.map((h) => (
                    <div
                      key={h.day}
                      className={`up-hours-row${h.today ? " today" : ""}${
                        h.closed ? " closed" : ""
                      }`}
                    >
                      <span className="day">{h.day}</span>
                      <span className="time">{h.time}</span>
                    </div>
                  ))}
                </div>

                <div className="up-hours-note">
                  <strong>שימו לב:</strong> בתקופת החופשה (01.04–08.04)
                  המזכירות פעילה רק בימי ב׳ ו־ד׳ בשעות 10:00–13:00.
                </div>
              </div>
            </div>
          </section>

          {/* Schedule tables */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">מערכת השיעורים תשפ״ו</span>
                <h2>
                  טבלאות <em>שיעורי תאוריה והכנה</em>
                </h2>
                <p>
                  טבלאות המערכת מתעדכנות בתחילת השנה ולעיתים גם בחופשת חגים.
                  האדמין מעלה צילום של הטבלה ככפי שיצרה — והמערכת מציגה אותה.
                </p>
              </div>
              <div className="up-sec-meta">
                <span className="up-updated">
                  פתיחת שנה <b>27.08.2025</b>
                </span>
              </div>
            </header>

            <div className="up-tables">
              {TABLES.map((t) => (
                <article className="up-table-card reveal" key={t.id}>
                  <header className="up-table-head">
                    <div className="t">
                      <small>{t.eyebrow}</small>
                      {t.title}
                    </div>
                    <span className={`v ${t.badge.tone}`}>{t.badge.label}</span>
                  </header>
                  <div
                    className="up-table-img"
                    style={{ backgroundImage: `url('${t.img}')` }}
                    role="img"
                    aria-label={t.title}
                  />
                  <div className="up-table-foot">
                    <div className="info">
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <rect x="2" y="3" width="10" height="9" stroke="currentColor" strokeWidth="1.3" />
                        <path
                          d="M2 6h10M5 1.5v2.5M9 1.5v2.5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                      {t.footLead} <strong>{t.foot}</strong>
                    </div>
                    <a href="#" aria-label="הורד PDF">
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1v8m0 0L4 6m3 3l3-3M2 11h10"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      הורד PDF
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Yearly calendar */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">לוח שנה</span>
                <h2>
                  תוכנית <em>ימי הלימודים והחופשות</em> · תשפ״ו
                </h2>
                <p>
                  תמונת הלוח השנתי המלא — כולל חגים, חופשות, ימי הורים,
                  וקונצרטים. בדרך כלל מתעדכן פעם בשנה בתחילת ספטמבר.
                </p>
              </div>
              <div className="up-sec-meta">
                <span className="up-admin-chip">תמונה שנתית</span>
                <span className="up-updated">
                  פורסם <b>15.08.2025</b>
                </span>
              </div>
            </header>

            <div className="up-cal reveal">
              <div
                className="up-cal-img"
                style={{ backgroundImage: `url('${CALENDAR_POSTER}')` }}
                role="img"
                aria-label="לוח השנה השנתי"
              />
              <aside className="up-cal-side">
                <h3>איך לקרוא את הלוח</h3>
                <p className="lede">
                  מקרא צבעים תואם את התמונה. אם משהו לא ברור — אפשר להוריד את
                  הקובץ המקורי כ־PDF.
                </p>

                <div className="up-cal-legend">
                  {CALENDAR_LEGEND.map((l) => (
                    <div className="row" key={l.label}>
                      <i className={l.cls} />
                      <span className="lbl">{l.label}</span>
                      <span className="ct">{l.count}</span>
                    </div>
                  ))}
                </div>

                <a className="btn-download" href="#">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M7 1v8m0 0L4 6m3 3l3-3M2 12h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  הורד לוח שנה PDF
                </a>
              </aside>
            </div>
          </section>

          {/* Archive */}
          <section className="up-sec">
            <header className="up-sec-head reveal">
              <div>
                <span className="eyebrow">היסטוריה</span>
                <h2>
                  עדכונים <em>קודמים</em>
                </h2>
                <p>
                  מתעד גרסאות קודמות של מודעות והודעות מהמרכז. שמירה למעקב —
                  אינו תוקף.
                </p>
              </div>
              <div className="up-sec-meta">
                <span className="up-updated">12 עדכונים · שנת תשפ״ו</span>
              </div>
            </header>

            <div className="up-archive reveal">
              {ARCHIVE.map((a) => (
                <a className="up-arc-row" href="#" key={a.id}>
                  <div
                    className="up-arc-thumb"
                    style={{ backgroundImage: `url('${a.img}')` }}
                    role="img"
                    aria-label={a.name}
                  />
                  <div className="up-arc-info">
                    <div
                      className={`up-arc-tag${
                        a.tagTone === "amber"
                          ? " amber"
                          : a.tagTone === "coral"
                            ? " coral"
                            : a.tagTone === "gray"
                              ? " gray"
                              : ""
                      }`}
                    >
                      <span className="d" />
                      {a.tag}
                    </div>
                    <div className="up-arc-name">{a.name}</div>
                  </div>
                  <div className="up-arc-date">
                    {a.date}
                    <small>{a.rel}</small>
                  </div>
                  <span className="up-arc-action">
                    <ChevronStart />
                  </span>
                </a>
              ))}
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
            <p>
              פעם בחודש, כשמתפרסם משהו חדש — מודעת חג, שינוי במערכת או הודעה
              חשובה — נשלח אליכם תקציר קצר. ללא ספאם.
            </p>
          </div>
          <form
            className="up-sub-form reveal"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="up-sub-input">
              <input type="email" placeholder="כתובת המייל שלך" required />
              <button type="submit">הירשם</button>
            </div>
            <div className="up-sub-channels">
              <span>או עקבו אחרינו:</span>
              <a href="#">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M9.3 15v-6h2l.3-2.4H9.3V5c0-.7.2-1.2 1.2-1.2h1.3V1.6c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v1.8H4.5V9h2.2v6h2.6z" />
                </svg>
                פייסבוק
              </a>
              <a href="#">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <rect x="2" y="2" width="12" height="12" rx="3" />
                  <circle cx="8" cy="8" r="2.6" />
                </svg>
                אינסטגרם
              </a>
            </div>
          </form>
        </div>
      </section>

      <div className="up-admin-note">
        <div className="container">
          <span>
            <strong>למזכירות:</strong> כל תמונה בעמוד הזה ניתנת להחלפה ע״י
            גרירה ושחרור. הגדלים האידיאליים מוצגים בכל שלוט. שינויים נשמרים
            אוטומטית.
          </span>
          <span className="pill">
            <span className="dot" />
            גרור תמונה לכל אזור כדי להחליף
          </span>
        </div>
      </div>
    </>
  );
}
