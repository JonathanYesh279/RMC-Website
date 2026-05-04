"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  HE_DAYS,
  HE_MONTHS,
  KIND_LABEL,
  KIND_TAG_CLASS,
  VENUES,
  type AvailabilityVenue,
  type VenueKind,
} from "./availability-data";

type CellStatus = "past" | "booked" | "partial" | "free";

type FilterKey = "all" | VenueKind;

const FILTER_CHIPS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "הכל" },
  { key: "hall", label: "אולמות מופע" },
  { key: "studio", label: "סטודיו הקלטות" },
  { key: "rehe", label: "חדרי חזרה" },
  { key: "class", label: "כיתות הוראה" },
];

function availabilityFor(
  venueKey: string,
  year: number,
  month: number,
  day: number
): CellStatus {
  const seed = (venueKey.length * 7 + year * 3 + (month + 1) * 11 + day * 13) % 100;
  const today = new Date();
  const cellDate = new Date(year, month, day);
  cellDate.setHours(0, 0, 0, 0);
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (cellDate < t) return "past";
  if (seed < 12) return "booked";
  if (seed < 38) return "partial";
  return "free";
}

function slotIsBooked(venueKey: string, day: number, slotId: string, status: CellStatus) {
  if (status !== "partial") return false;
  const seed = (venueKey.length + day * 7 + slotId.length * 3) % 100;
  return seed < 50;
}

function parseHourSpan(time: string): number {
  const m = time.match(/(\d{2}):\d{2}\s*–\s*(\d{2}):\d{2}/);
  return m ? +m[2] - +m[1] : 0;
}

function formatHebrewDate(d: Date): string {
  return `${d.getDate()} ${HE_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function getDefaultDate(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 60; i++) {
    const cand = new Date(today);
    cand.setDate(today.getDate() + i);
    cand.setHours(0, 0, 0, 0);
    return cand;
  }
  return today;
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M2 7h10M9 4l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L13.5 13.5" strokeLinecap="round" />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M5 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M9 3L5 7l4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <path d="M3 7l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M3 9h12M9 3l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const INCLUSIONS = [
  {
    title: "חלל מוכן לשימוש",
    body: "ניקיון מקדים, מיזוג, תאורת רקע ובמה ערוכה לפי דרישה.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="4" width="14" height="10" rx="1" />
        <path d="M5 4V2.5h8V4M9 14v1.5" />
      </svg>
    ),
  },
  {
    title: "מערכת קול בסיסית",
    body: "הגברה, מיקרופונים אלחוטיים ומסכי במה (פירוט נוסף לכל חלל בנפרד).",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M9 2.5v9M9 11.5a2.5 2.5 0 0 0 2.5-2.5V5a2.5 2.5 0 0 0-5 0v4A2.5 2.5 0 0 0 9 11.5zM5 9a4 4 0 0 0 8 0M9 14.5v1" />
      </svg>
    ),
  },
  {
    title: "תאורת במה",
    body: "תאורת LED קבועה, ניתן להזמין מעצב תאורה לעיצוב מלא של המופע.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="9" cy="6.5" r="3.5" />
        <path d="M9 10v6M6 16h6" />
      </svg>
    ),
  },
  {
    title: "חדרי הלבשה",
    body: "שני חדרי הלבשה צמודים לבמה, מקלחות, מקררים ומתקני שתייה.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M2.5 15.5V6l3-2.5h7L15.5 6v9.5M2.5 15.5h13M7 12.5h4M7 9.5h4" />
      </svg>
    ),
  },
  {
    title: "זמן הקמה ופירוק",
    body: "שעה לפני ושעה אחרי כלולות במחיר; ההגדלה אפשרית בתעריף שעתי.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="9" cy="9" r="6.5" />
        <path d="M9 5.5V9l2.5 1.5" />
      </svg>
    ),
  },
  {
    title: "חניה בשבילכם",
    body: "40 מקומות חניה לאמנים ולצוות, 220 מקומות חניה ציבוריים סמוכים.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 14.5V8l6-4.5L15 8v6.5M3 14.5h12M7 14.5v-4h4v4" />
      </svg>
    ),
  },
];

const PROCESS_STEPS = [
  {
    title: "בקשת זמינות",
    body: "שליחת הטופס — אישור זמינות ראשוני תוך 48 שעות עבודה. אופציה זמנית של 7 ימים נשמרת בלוח.",
  },
  {
    title: "סיור והצעה",
    body: "פגישה פיזית במקום, מיפוי דרישות טכניות ושליחת הצעת מחיר מותאמת בכתב.",
  },
  {
    title: "חתימה ומקדמה",
    body: "חתימה על חוזה, תשלום מקדמה של 30% ושריון התאריך באופן סופי בלוח.",
  },
  {
    title: "תכנון וביצוע",
    body: "פגישות תיאום עם מהנדסי הקול, חזרה כללית ביום שלפני, וצוות הפקה מלא לאורך האירוע.",
  },
];

const FAQS = [
  {
    q: "כמה זמן מראש כדאי להזמין?",
    a: "לאודיטוריום המרכזי — מומלץ 4–6 חודשים מראש, במיוחד לסופי שבוע. האולם הקאמרי וסטודיו ההקלטות לרוב פנויים בהתראה של 3–6 שבועות, אבל עדיין מומלץ לבדוק מוקדם.",
  },
  {
    q: "האם אפשר להחזיק תאריך לפני חתימת חוזה?",
    a: "כן — לאחר אישור זמינות ראשוני נשריין את התאריך עבורכם למשך 7 ימי עבודה ללא חיוב. במידה ולקוח אחר מבקש את אותו התאריך נחזור אליכם להחלטה תוך 24 שעות.",
  },
  {
    q: "מה כלול במחיר ומה גובים בנפרד?",
    a: "המחיר הבסיסי כולל את שימוש בחלל, מערכת קול בסיסית, תאורת רקע, חדרי הלבשה ושעת הקמה ושעת פירוק. בנפרד נגבים: פסנתר קונצרט, מהנדס קול ייעודי, מעצב תאורה, צילום וידאו, הקלטת אולפן ושירותי הפקה מורחבים.",
  },
  {
    q: "מה מדיניות הביטול?",
    a: "ביטול עד 30 יום לפני המועד — החזר מלא של המקדמה. ביטול 14–30 יום — החזר 50%. ביטול בפחות מ-14 יום — המקדמה אינה מוחזרת אך ניתן להעביר את התאריך פעם אחת בכפוף לזמינות.",
  },
  {
    q: "האם אפשר לערוך חזרה כללית בערב הקודם?",
    a: "ברוב המקרים כן, בכפוף לזמינות החלל ובתעריף חזרות מוזל (כ-60% מהתעריף הרגיל). חזרה טכנית של עד 3 שעות ביום האירוע עצמו כלולה במחיר.",
  },
  {
    q: "האם החלל מונגש לבעלי מוגבלויות?",
    a: "כן — כל החללים מונגשים מלא, כולל גישה לבמה, מקומות ישיבה ייעודיים, חדרי שירותים ושירותי תרגום סימולטני בעברית-אנגלית-רוסית-ערבית בתיאום מראש.",
  },
];

export default function AvailabilityPage() {
  const initialDate = useMemo(getDefaultDate, []);

  const [venueKey, setVenueKey] = useState<string>("auditorium");
  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerFilter, setPickerFilter] = useState<FilterKey>("all");
  const [pickerQuery, setPickerQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // pick venue from ?venue= on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("venue");
    if (fromUrl && VENUES[fromUrl]) {
      setVenueKey(fromUrl);
    }
  }, []);

  // sync ?venue= on changes
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("venue", venueKey);
    window.history.replaceState(null, "", url);
  }, [venueKey]);

  // reveal-on-scroll
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [venueKey, viewMonth, viewYear]);

  // close modal on Escape, lock body scroll while open
  useEffect(() => {
    if (!pickerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPickerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => searchInputRef.current?.focus(), 30);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      clearTimeout(t);
    };
  }, [pickerOpen]);

  const venue: AvailabilityVenue = VENUES[venueKey];
  const isWeekend = selectedDate.getDay() === 5 || selectedDate.getDay() === 6;

  const filterCounts = useMemo(() => {
    const all = Object.values(VENUES);
    const counts: Record<FilterKey, number> = {
      all: all.length,
      hall: 0,
      studio: 0,
      rehe: 0,
      class: 0,
    };
    all.forEach((v) => {
      counts[v.kind]++;
    });
    return counts;
  }, []);

  const filteredVenues = useMemo(() => {
    const q = pickerQuery.trim().toLowerCase();
    return Object.entries(VENUES).filter(([, v]) => {
      if (pickerFilter !== "all" && v.kind !== pickerFilter) return false;
      if (!q) return true;
      const hay = (v.name + " " + v.meta + " " + KIND_LABEL[v.kind]).toLowerCase();
      return hay.includes(q);
    });
  }, [pickerFilter, pickerQuery]);

  const calendarCells = useMemo(() => {
    const firstDow = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const today = new Date();
    const isToday = (d: number) =>
      viewYear === today.getFullYear() &&
      viewMonth === today.getMonth() &&
      d === today.getDate();

    const cells: Array<
      | { kind: "empty"; key: string }
      | { kind: "day"; day: number; status: CellStatus; today: boolean; selected: boolean; key: string }
    > = [];
    for (let i = 0; i < firstDow; i++) cells.push({ kind: "empty", key: `e${i}` });
    for (let d = 1; d <= daysInMonth; d++) {
      const status = availabilityFor(venueKey, viewYear, viewMonth, d);
      const sel =
        selectedDate.getFullYear() === viewYear &&
        selectedDate.getMonth() === viewMonth &&
        selectedDate.getDate() === d;
      cells.push({
        kind: "day",
        day: d,
        status,
        today: isToday(d),
        selected: sel,
        key: `d${d}`,
      });
    }
    return cells;
  }, [venueKey, viewYear, viewMonth, selectedDate]);

  const slotItems = useMemo(() => {
    const status = availabilityFor(
      venueKey,
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    return venue.slots.map((s) => {
      const booked = slotIsBooked(venueKey, selectedDate.getDate(), s.id, status);
      const price = isWeekend ? s.priceWknd : s.priceWeek;
      return { slot: s, booked, price };
    });
  }, [venue, venueKey, selectedDate, isWeekend]);

  const summary = useMemo(() => {
    const slotObjs = venue.slots.filter((s) => selectedSlots.has(s.id));
    const totalHours = slotObjs.reduce((acc, s) => acc + parseHourSpan(s.time), 0);
    const total = slotObjs.reduce(
      (acc, s) => acc + (isWeekend ? s.priceWknd : s.priceWeek),
      0
    );
    return { slotObjs, totalHours, total };
  }, [venue, selectedSlots, isWeekend]);

  const dayName = HE_DAYS[selectedDate.getDay()];

  function shiftMonth(dir: 1 | -1) {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y--;
    } else if (m > 11) {
      m = 0;
      y++;
    }
    setViewMonth(m);
    setViewYear(y);
  }

  function pickDate(day: number) {
    const next = new Date(viewYear, viewMonth, day);
    setSelectedDate(next);
    setSelectedSlots(new Set());
  }

  function toggleSlot(id: string) {
    setSelectedSlots((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function chooseVenue(key: string) {
    setVenueKey(key);
    setSelectedSlots(new Set());
    setPickerOpen(false);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedSlots.size === 0) {
      alert("נא לבחור לפחות חלון זמן אחד");
      return;
    }
    alert("הבקשה נשלחה!\nנחזור אליכם תוך 48 שעות עם אישור והצעת מחיר.");
  }

  return (
    <>
      <section className="av-hero">
        <div
          className="av-hero-bg"
          style={{ backgroundImage: `url('${venue.img}')` }}
        />
        <div className="av-hero-shell container">
          <div className="av-crumbs reveal">
            <a href="/">דף הבית</a> / <a href="/rentals">שכירויות והקלטות</a> /{" "}
            <span>{venue.name} — בדיקת זמינות</span>
          </div>
          <h1 className="av-h1 reveal">
            בחירת תאריך · בדיקת <em>זמינות.</em>
          </h1>
          <p className="av-lede reveal">
            לוח זמנים בזמן אמת לכל החללים שלנו — צפו בתאריכים פנויים, בחרו חלון
            הפקה ושלחו בקשת הזמנה. נחזור אליכם תוך 48 שעות עם אישור והצעת מחיר
            מפורטת.
          </p>

          <div className="vsel reveal">
            <div
              className="vsel-thumb"
              style={{ backgroundImage: `url('${venue.thumb}')` }}
            />
            <div className="vsel-info">
              <div className="vsel-eyebrow">{KIND_LABEL[venue.kind]}</div>
              <div className="vsel-name">{venue.name}</div>
              <div className="vsel-meta">{venue.meta}</div>
            </div>
            <button
              type="button"
              className="vsel-change"
              aria-haspopup="listbox"
              aria-expanded={pickerOpen}
              onClick={() => setPickerOpen(true)}
            >
              <ChevronIcon />
              החלפת חלל
            </button>
          </div>

          <div className="av-summary reveal">
            <div className="av-summary-cell">
              <div className="av-sc-l">קיבולת</div>
              <div className="av-sc-v">{venue.cap}</div>
            </div>
            <div className="av-summary-cell">
              <div className="av-sc-l">שעות פעילות</div>
              <div className="av-sc-v">{venue.hours}</div>
            </div>
            <div className="av-summary-cell">
              <div className="av-sc-l">מינימום הזמנה</div>
              <div className="av-sc-v">{venue.min}</div>
            </div>
            <div className="av-summary-cell">
              <div className="av-sc-l">צוות הפקה</div>
              <div className="av-sc-v">{venue.crew}</div>
            </div>
            <div className="av-summary-cell">
              <div className="av-sc-l">תעריף בסיסי</div>
              <div className="av-sc-v">{venue.base}</div>
            </div>
          </div>
        </div>
      </section>

      {pickerOpen && (
        <>
          <div
            className="vsel-backdrop open"
            onClick={() => setPickerOpen(false)}
            aria-hidden="true"
          />
          <div
            className="vsel-panel open"
            role="dialog"
            aria-modal="true"
            aria-label="בחירת חלל"
          >
            <div className="vsel-panel-head">
              <div>
                <h3>בחירת חלל</h3>
                <div className="lede">
                  חיפוש, סינון ומיון בין כל החללים הזמינים במרכז
                </div>
              </div>
              <button
                type="button"
                className="vsel-close"
                aria-label="סגירה"
                onClick={() => setPickerOpen(false)}
              >
                <CloseIcon />
              </button>
            </div>
            <div className="vsel-search">
              <label className="vsel-search-input">
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="חיפוש חלל לפי שם, טיפוס, קיבולת…"
                  value={pickerQuery}
                  onChange={(e) => setPickerQuery(e.target.value)}
                />
              </label>
            </div>
            <div className="vsel-filters">
              {FILTER_CHIPS.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  className={`vsel-chip${pickerFilter === chip.key ? " active" : ""}`}
                  onClick={() => setPickerFilter(chip.key)}
                >
                  {chip.label}
                  <span className="ct">{filterCounts[chip.key]}</span>
                </button>
              ))}
            </div>
            <div className="vsel-list">
              {filteredVenues.length === 0 ? (
                <div className="vsel-empty">
                  לא נמצאו חללים תואמים. נסו מילה אחרת או סננו לכל הקטגוריות.
                </div>
              ) : (
                filteredVenues.map(([key, v]) => (
                  <div
                    key={key}
                    role="option"
                    aria-selected={key === venueKey}
                    className={`vsel-row${key === venueKey ? " selected" : ""}`}
                    onClick={() => chooseVenue(key)}
                  >
                    <div
                      className="vsel-row-img"
                      style={{ backgroundImage: `url('${v.thumb}')` }}
                    />
                    <div>
                      <div className="vsel-row-name">{v.name}</div>
                      <div className="vsel-row-meta">
                        <span>{v.cap}</span>
                        <span className="dot">·</span>
                        <span>{v.hours}</span>
                        <span className="dot">·</span>
                        <span>מינימום {v.min}</span>
                      </div>
                    </div>
                    <span className={`vsel-row-tag ${KIND_TAG_CLASS[v.kind]}`}>
                      {KIND_LABEL[v.kind]}
                    </span>
                    <div className="vsel-row-price">
                      {v.base}
                      <small>תעריף בסיסי</small>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="vsel-foot">
              <span>
                {filteredVenues.length === 0
                  ? "לא נמצאו חללים"
                  : `${filteredVenues.length} חללים זמינים`}
              </span>
              <span>מיון לפי זמינות לתאריך הנבחר</span>
            </div>
          </div>
        </>
      )}

      <section className="av-main">
        <div className="container av-grid">
          <div>
            <div className="av-sec reveal">
              <div className="av-sec-head">
                <div className="eyebrow">
                  <span className="av-eb-dot" style={{ background: "var(--teal)" }} />
                  שלב 1 · בחירת תאריך
                </div>
                <h2>זמינות באולם — {venue.name}</h2>
                <p>
                  לחצו על תאריך לצפייה בחלונות הזמינים. הזמנות פתוחות עד 6 חודשים
                  מראש; מועדים פופולריים נסגרים לרוב 8 שבועות מראש.
                </p>
              </div>
              <div className="cal">
                <div className="cal-top">
                  <div className="cal-month">
                    <span>{HE_MONTHS[viewMonth]}</span>
                    <small>{viewYear}</small>
                  </div>
                  <div className="cal-nav">
                    <button
                      type="button"
                      className="cal-nav-btn"
                      aria-label="חודש קודם"
                      onClick={() => shiftMonth(-1)}
                    >
                      <PrevIcon />
                    </button>
                    <button
                      type="button"
                      className="cal-nav-btn"
                      aria-label="חודש הבא"
                      onClick={() => shiftMonth(1)}
                    >
                      <NextIcon />
                    </button>
                  </div>
                </div>
                <div className="cal-dows">
                  {["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "שבת"].map((d) => (
                    <div key={d} className="cal-dow">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="cal-grid">
                  {calendarCells.map((cell) =>
                    cell.kind === "empty" ? (
                      <div key={cell.key} className="cal-cell empty" />
                    ) : (
                      <button
                        key={cell.key}
                        type="button"
                        disabled={cell.status === "past" || cell.status === "booked"}
                        className={[
                          "cal-cell",
                          cell.status,
                          cell.today ? "today" : "",
                          cell.selected && cell.status !== "past" && cell.status !== "booked"
                            ? "selected"
                            : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => pickDate(cell.day)}
                      >
                        <span className="d">{cell.day}</span>
                        {cell.status === "free" && <span className="pill">פנוי</span>}
                        {cell.status === "partial" && <span className="pill">חלקית</span>}
                        {cell.status === "booked" && <span className="pill">תפוס</span>}
                      </button>
                    )
                  )}
                </div>
                <div className="cal-legend">
                  <span>
                    <i className="lg-free" />
                    פנוי
                  </span>
                  <span>
                    <i className="lg-part" />
                    חלקית פנוי
                  </span>
                  <span>
                    <i className="lg-booked" />
                    תפוס
                  </span>
                  <span>
                    <i className="lg-today" />
                    היום
                  </span>
                </div>
              </div>
            </div>

            <div className="av-sec reveal">
              <div className="av-sec-head">
                <div className="eyebrow">
                  <span className="av-eb-dot" style={{ background: "var(--amber)" }} />
                  שלב 2 · בחירת חלון
                </div>
                <h2>
                  חלונות זמינים · {formatHebrewDate(selectedDate)}, {dayName}
                  {isWeekend ? " · תעריף סוף שבוע" : ""}
                </h2>
                <p>
                  אפשר לבחור חלון בודד או לסמן מספר חלונות עוקבים להפקה ארוכה.
                  תעריפי שבת/חג מסומנים בנפרד.
                </p>
              </div>
              <div className="slots">
                {slotItems.map(({ slot, booked, price }) => {
                  const sel = selectedSlots.has(slot.id);
                  return (
                    <div
                      key={slot.id}
                      className={[
                        "slot",
                        sel ? "selected" : "",
                        booked ? "disabled" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => !booked && toggleSlot(slot.id)}
                    >
                      <div className="slot-check">
                        <CheckIcon />
                      </div>
                      <div className="slot-info">
                        <h4>{slot.title}</h4>
                        <p>{slot.desc}</p>
                      </div>
                      <div className="slot-time">{slot.time}</div>
                      <div className="slot-price">
                        ₪{price.toLocaleString("he-IL")}
                        <small>{booked ? "תפוס" : "לחלון"}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="av-sec reveal">
              <div className="av-sec-head">
                <div className="eyebrow">
                  <span className="av-eb-dot" style={{ background: "var(--coral)" }} />
                  תעריפים · {venue.name}
                </div>
                <h2>מחירון השכרה</h2>
                <p>
                  המחירים אינם כוללים מע״מ ומופיעים לכל החללים. בחבילות הפקה
                  גדולות (יותר מ-12 שעות) חלות הנחות.
                </p>
              </div>
              <div className="av-pricing">
                <table>
                  <thead>
                    <tr>
                      <th>חבילה</th>
                      <th>ימי חול (א׳–ה׳)</th>
                      <th>סופ״ש וחג</th>
                      <th>הערות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {venue.pricing.map(([pkg, weekday, weekend, note]) => (
                      <tr key={pkg}>
                        <td>{pkg}</td>
                        <td className="amt">{weekday}</td>
                        <td className="amt">{weekend}</td>
                        <td>{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="av-pricing-foot">
                  המחיר כולל שימוש בחלל, מערכת קול בסיסית, תאורת רקע ומיזוג.
                  תוספות (פסנתר קונצרט, מהנדס קול, צילום וידאו) נגבות בנפרד —
                  ראו ״מה כלול״.
                </div>
              </div>
            </div>

            <div className="av-sec reveal">
              <div className="av-sec-head">
                <div className="eyebrow">
                  <span className="av-eb-dot" style={{ background: "var(--teal)" }} />
                  כלול בהשכרה
                </div>
                <h2>מה אתם מקבלים</h2>
              </div>
              <div className="incl-grid">
                {INCLUSIONS.map((inc) => (
                  <div className="incl" key={inc.title}>
                    <div className="ico">{inc.icon}</div>
                    <div>
                      <h4>{inc.title}</h4>
                      <p>{inc.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="av-sec reveal">
              <div className="av-sec-head">
                <div className="eyebrow">
                  <span className="av-eb-dot" style={{ background: "var(--coral)" }} />
                  שלב 3 · פרטים ושליחה
                </div>
                <h2>פרטי הפנייה</h2>
                <p>
                  הצוות שלנו יחזור אליכם תוך 48 שעות עם אישור זמינות, הצעת מחיר
                  מותאמת והזמנה לסיור פיזי במקום.
                </p>
              </div>
              <form className="av-form-card" onSubmit={onSubmit}>
                <h3>איש הקשר וההפקה</h3>
                <div className="form-grid">
                  <div className="field">
                    <label>
                      שם פרטי <span className="req">*</span>
                    </label>
                    <input type="text" placeholder="ישראל" required />
                  </div>
                  <div className="field">
                    <label>
                      שם משפחה <span className="req">*</span>
                    </label>
                    <input type="text" placeholder="ישראלי" required />
                  </div>
                  <div className="field">
                    <label>שם הארגון / ההפקה</label>
                    <input type="text" placeholder="הפקת אבני חברתי" />
                  </div>
                  <div className="field">
                    <label>
                      סוג האירוע <span className="req">*</span>
                    </label>
                    <select required defaultValue="">
                      <option value="" disabled>
                        בחרו סוג
                      </option>
                      <option>קונצרט / רסיטל</option>
                      <option>הקלטת סטודיו</option>
                      <option>הקלטה חיה / שידור</option>
                      <option>חזרה / חזרה כללית</option>
                      <option>הפקת וידאו</option>
                      <option>כנס / יום עיון</option>
                      <option>אירוע פרטי</option>
                      <option>אחר</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>
                      דוא״ל <span className="req">*</span>
                    </label>
                    <input type="email" placeholder="rentals@example.com" required />
                  </div>
                  <div className="field">
                    <label>
                      טלפון <span className="req">*</span>
                    </label>
                    <input type="tel" placeholder="050-1234567" required />
                  </div>
                  <div className="field">
                    <label>מספר משתתפים מתוכנן</label>
                    <input type="number" placeholder="0" min={0} />
                  </div>
                  <div className="field">
                    <label>תאריך גמיש?</label>
                    <select defaultValue="לא — תאריך מדויק">
                      <option>לא — תאריך מדויק</option>
                      <option>גמיש בשבוע סמוך</option>
                      <option>גמיש לחלוטין</option>
                    </select>
                  </div>
                  <div className="field full">
                    <label>תוספות וצרכים מיוחדים</label>
                    <textarea placeholder="לדוגמה: צריכים פסנתר קונצרט מכוון, צוות הקלטה מרובה ערוצים, תאורה צבעונית, חדר הלבשה נוסף, הגברה לקהל גדול וכו׳" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div>
            <aside className="av-sum reveal">
              <h3>סיכום הבקשה</h3>
              <div className="av-sum-venue">
                <div
                  className="av-sum-thumb"
                  style={{ backgroundImage: `url('${venue.thumb}')` }}
                />
                <div>
                  <div className="av-sum-vname">{venue.name}</div>
                  <div className="av-sum-vmeta">{venue.meta}</div>
                </div>
              </div>
              <div className="av-sum-lines">
                <div className="av-sum-line">
                  <span className="av-sum-l">תאריך</span>
                  <span className="av-sum-v">{formatHebrewDate(selectedDate)}</span>
                </div>
                <div className="av-sum-line">
                  <span className="av-sum-l">חלונות</span>
                  <span
                    className={`av-sum-v${summary.slotObjs.length === 0 ? " muted" : ""}`}
                  >
                    {summary.slotObjs.length === 0
                      ? "לא נבחרו"
                      : summary.slotObjs.map((s) => s.title).join(" · ")}
                  </span>
                </div>
                <div className="av-sum-line">
                  <span className="av-sum-l">סה״כ שעות</span>
                  <span className="av-sum-v">
                    {summary.totalHours > 0 ? `${summary.totalHours} שעות` : "—"}
                  </span>
                </div>
                <div className="av-sum-line">
                  <span className="av-sum-l">תעריף יום</span>
                  <span className="av-sum-v">{isWeekend ? "סוף שבוע" : "יום חול"}</span>
                </div>
              </div>
              <div className="av-sum-est">
                <span className="lbl">הערכת מחיר</span>
                <span className="amt">
                  <small>לא כולל מע״מ</small>
                  {summary.total > 0 ? `₪${summary.total.toLocaleString("he-IL")}` : "—"}
                </span>
              </div>
              <button
                type="button"
                className="av-sum-btn"
                onClick={() => {
                  if (selectedSlots.size === 0) {
                    alert("נא לבחור לפחות חלון זמן אחד");
                    return;
                  }
                  alert(
                    "הבקשה נשלחה!\nנחזור אליכם תוך 48 שעות עם אישור והצעת מחיר."
                  );
                }}
              >
                <ArrowIcon />
                שליחת בקשת הזמנה
              </button>
              <div className="av-sum-foot">
                <strong>אין חיוב בשלב זה.</strong> המספר מהווה הערכה ראשונית; מחיר
                סופי ייקבע בהצעה המפורטת.
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="av-process">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">
                <span className="av-eb-dot" style={{ background: "var(--teal)" }} />
                איך זה עובד
              </div>
              <h2>מהבקשה ועד יום ההפקה.</h2>
            </div>
            <p className="trail">
              תהליך ברור בארבעה שלבים — ככל שתפנו מוקדם יותר, כך גדל הסיכוי
              להבטיח תאריך מועדף.
            </p>
          </div>
          <div className="av-steps">
            {PROCESS_STEPS.map((step) => (
              <div className="av-step reveal" key={step.title}>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="av-faq">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">
                <span className="av-eb-dot" style={{ background: "var(--coral)" }} />
                שאלות נפוצות
              </div>
              <h2>בודקים זמינות בפעם הראשונה?</h2>
            </div>
          </div>
          <div className="faq-list reveal">
            {FAQS.map((item, idx) => (
              <div
                key={item.q}
                className={`faq-item${openFaq === idx ? " open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-q"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                >
                  {item.q}
                  <span className="pm">+</span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
