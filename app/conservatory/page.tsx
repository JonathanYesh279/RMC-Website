"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import {
  articles,
  catLabels,
  departments,
  ensembles,
  forms,
  programs,
  staff,
} from "./conservatory-data";

const tabLabels = [
  "מחלקות",
  "תזמורות, מקהלות והרכבים",
  "תוכניות ייחודיות",
  "טפסים",
  "הנהלה, מינהל ונציגות הורים",
  "העשרה",
];

const STORAGE_KEY = "conservatoryTab";

export default function ConservatoryPage() {
  const [active, setActive] = useState(0);
  const [indicator, setIndicator] = useState({ width: 0, tx: 0 });
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const positionIndicator = useCallback((idx: number) => {
    const btn = buttonsRef.current[idx];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const rect = btn.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    const right = navRect.right - rect.right;
    setIndicator({ width: rect.width, tx: -right });
  }, []);

  useEffect(() => {
    try {
      const stored = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
      if (!isNaN(stored) && stored >= 0 && stored < tabLabels.length) {
        setActive(stored);
      }
    } catch {}
  }, []);

  useLayoutEffect(() => {
    positionIndicator(active);
  }, [active, positionIndicator]);

  useEffect(() => {
    const onResize = () => positionIndicator(active);
    window.addEventListener("resize", onResize);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => positionIndicator(active));
    }
    const t = setTimeout(() => positionIndicator(active), 150);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, [active, positionIndicator]);

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
    document
      .querySelectorAll(".reveal:not(.in)")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [active]);

  const activate = useCallback(
    (idx: number, { scroll = true }: { scroll?: boolean } = {}) => {
      setActive(idx);
      try {
        localStorage.setItem(STORAGE_KEY, String(idx));
      } catch {}
      if (scroll && stickyRef.current) {
        const offset =
          window.scrollY + stickyRef.current.getBoundingClientRect().top;
        if (window.scrollY > offset + 20) {
          window.scrollTo({ top: offset - 10, behavior: "smooth" });
        }
      }
    },
    []
  );

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const len = tabLabels.length;
    if (e.key === "ArrowLeft") {
      const n = (i + 1) % len;
      buttonsRef.current[n]?.focus();
      activate(n, { scroll: false });
    } else if (e.key === "ArrowRight") {
      const n = (i - 1 + len) % len;
      buttonsRef.current[n]?.focus();
      activate(n, { scroll: false });
    } else if (e.key === "Home") {
      buttonsRef.current[0]?.focus();
      activate(0, { scroll: false });
    } else if (e.key === "End") {
      buttonsRef.current[len - 1]?.focus();
      activate(len - 1, { scroll: false });
    }
  };

  const [feature, ...rest] = articles;
  const sideList = rest.slice(0, 3);
  const bottomGrid = rest.slice(3);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="reveal">
            <div className="crumbs">
              דף הבית · <span>קונסרבטוריון</span>
            </div>
            <h1>
              חינוך מוסיקלי
              <br />
              <em>למצוינות</em>
            </h1>
          </div>
          <p className="lede reveal">
            הקונסרבטוריון של מרכז פיס למוסיקה רעננה הוא הגדול בישראל — חממה
            ל-1,300 תלמידים משש מחלקות נגינה, חמישה הרכבים ייצוגיים, ומסלולי
            לימוד מגיל 5 ועד הכנה לבגרות ולאקדמיה.
          </p>
        </div>
      </section>

      <div className="tabs-sticky" ref={stickyRef}>
        <div className="container">
          <nav
            className="tabs-nav"
            role="tablist"
            aria-label="ניווט בקונסרבטוריון"
            ref={navRef}
          >
            {tabLabels.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-controls={`panel-${i}`}
                ref={(el) => {
                  buttonsRef.current[i] = el;
                }}
                className="tab-btn"
                onClick={() => activate(i)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {label}
              </button>
            ))}
            <div
              className="tab-indicator"
              style={{
                width: `${indicator.width}px`,
                transform: `translateX(${indicator.tx}px)`,
              }}
            />
          </nav>
        </div>
      </div>

      <div className="container">
        <div
          className={`tab-panel ${active === 0 ? "active" : ""}`}
          id="panel-0"
          role="tabpanel"
        >
          <div className="panel-head">
            <div>
              <div className="eyebrow">עשר מחלקות</div>
              <h2>ששת הכלים ועוד.</h2>
            </div>
            <p className="trail">
              כל מחלקה מתנהלת בידי סגל מוביל, עם מסלול אישי מגיל 5 ועד מסלול
              המצוינות. המחלקות מעבירות תלמידים לתזמורות ולהרכבים הייצוגיים של
              המרכז.
            </p>
          </div>
          <div className="dept-grid">
            {departments.map((d, i) => (
              <article
                key={d.name}
                className="dept-card reveal"
                style={{ transitionDelay: `${Math.min(i * 40, 320)}ms` }}
              >
                <span className="count">{d.count}</span>
                <div
                  className="img"
                  style={{ backgroundImage: `url('${d.img}')` }}
                />
                <div className="body">
                  <span className={`cat cat-${d.cat}`}>
                    <span className="dot" />
                    {catLabels[d.cat]}
                  </span>
                  <h3>{d.name}</h3>
                  <p>{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className={`tab-panel ${active === 1 ? "active" : ""}`}
          id="panel-1"
          role="tabpanel"
        >
          <div className="panel-head">
            <div>
              <div className="eyebrow">תזמורות, מקהלות והרכבים</div>
              <h2>חמישה גופים ייצוגיים.</h2>
            </div>
            <p className="trail">
              לצד הלימוד הפרטני, התלמידים נקלטים בהרכבים המרכזיים של המרכז —
              התזמורת הסימפונית, תזמורת הנוער, תזמורת כלי קשת, המקהלה העירונית
              וההרכבים הקאמריים.
            </p>
          </div>
          <div className="ensemble-list">
            {ensembles.map((e) => (
              <article key={e.name} className="ensemble reveal">
                <div
                  className="img"
                  style={{ backgroundImage: `url('${e.img}')` }}
                />
                <div>
                  <h3>{e.name}</h3>
                  <div className="meta">
                    <span>
                      <strong>{e.conductor}</strong>
                      <br />
                      {e.role}
                    </span>
                    <span>{e.schedule}</span>
                  </div>
                  <p>{e.desc}</p>
                </div>
                <span className={`badge ${e.badge}`}>{e.badgeText}</span>
              </article>
            ))}
          </div>
        </div>

        <div
          className={`tab-panel ${active === 2 ? "active" : ""}`}
          id="panel-2"
          role="tabpanel"
        >
          <div className="panel-head">
            <div>
              <div className="eyebrow">מסלולים ייחודיים</div>
              <h2>מעבר לשיעור הפרטני.</h2>
            </div>
            <p className="trail">
              ארבע תוכניות שמעמיקות את החוויה המוסיקלית — מסלולי מצוינות, בגרות,
              סדנאות קיץ וחילופי נוער עם קונסרבטוריונים באירופה.
            </p>
          </div>
          <div className="programs-grid">
            {programs.map((p) => (
              <a key={p.cls} href="#" className={`program ${p.cls} reveal`}>
                <div
                  className="img"
                  style={{ backgroundImage: `url('${p.img}')` }}
                />
                <div className="body">
                  <span className="tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div
          className={`tab-panel ${active === 3 ? "active" : ""}`}
          id="panel-3"
          role="tabpanel"
        >
          <div className="panel-head">
            <div>
              <div className="eyebrow">מסמכים ואישורים</div>
              <h2>טפסים להורדה.</h2>
            </div>
            <p className="trail">
              רוב המסמכים מיועדים להדפסה, חתימה וסריקה חזרה למזכירות — כתובת
              המייל info@music-raanana.org.il. שאלות? מוקד המזכירות בטלפון
              09-7711330.
            </p>
          </div>
          <div className="forms-list">
            {forms.map((f) => (
              <a key={f.title} href="#" className="form-row reveal">
                <div className="ico">
                  <svg
                    width="22"
                    height="26"
                    viewBox="0 0 22 26"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden="true"
                  >
                    <path d="M3 2h10l6 6v16H3z" />
                    <path d="M13 2v6h6" />
                  </svg>
                </div>
                <div>
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
                <span className="dl">
                  הורדה
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M7 2v8m0 0l3-3m-3 3L4 7M2 12h10" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div
          className={`tab-panel ${active === 4 ? "active" : ""}`}
          id="panel-4"
          role="tabpanel"
        >
          <div className="panel-head">
            <div>
              <div className="eyebrow">הצוות שמוביל</div>
              <h2>הנהלה, מינהל ונציגות הורים.</h2>
            </div>
            <p className="trail">
              המרכז מתנהל בשיתוף פעולה בין הצוות המוסיקלי, המינהל האדמיניסטרטיבי
              ונציגות ההורים — יחד אחראים על חיי המרכז.
            </p>
          </div>
          <div className="staff-grid">
            {staff.map((s) => (
              <article key={s.name} className="staff reveal">
                <div
                  className="portrait"
                  style={{ backgroundImage: `url('${s.img}')` }}
                />
                <h4>{s.name}</h4>
                <div className="accent" style={{ background: s.color }} />
                <p className="role">
                  <strong>{s.title}</strong>
                  {s.sub}
                </p>
                <p
                  className="role"
                  style={{ marginTop: 8, color: "var(--ink-3)" }}
                >
                  {s.bio}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          className={`tab-panel ${active === 5 ? "active" : ""}`}
          id="panel-5"
          role="tabpanel"
        >
          <div className="panel-head">
            <div>
              <div className="eyebrow">מגזין המרכז</div>
              <h2>העשרה וכתבות.</h2>
            </div>
            <p className="trail">
              כתבות מקוריות שכותב הצוות המוסיקלי של המרכז — מדריכים להורים, טיפים
              לתרגול, מאמרי היסטוריה וסקירות של הרפרטואר העונתי.
            </p>
          </div>

          <div className="articles-feature">
            <article className="article-featured reveal">
              <div
                className="img"
                style={{ backgroundImage: `url('${feature.img}')` }}
              />
              <span className="tag">{feature.tag}</span>
              <h3>{feature.title}</h3>
              <p>{feature.excerpt}</p>
              <div className="meta">
                <span>{feature.author}</span>
                <span className="sep" />
                <span>{feature.read}</span>
                {feature.date && (
                  <>
                    <span className="sep" />
                    <span>{feature.date}</span>
                  </>
                )}
              </div>
            </article>
            <div className="article-list-side">
              {sideList.map((a) => (
                <article key={a.title} className="article-row reveal">
                  <div
                    className="img"
                    style={{ backgroundImage: `url('${a.img}')` }}
                  />
                  <div>
                    <span className="tag">{a.tag}</span>
                    <h4>{a.title}</h4>
                    <div className="meta">
                      {a.author} · {a.read}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="articles-grid">
            {bottomGrid.map((a) => (
              <article key={a.title} className="article-card reveal">
                <div
                  className="img"
                  style={{ backgroundImage: `url('${a.img}')` }}
                />
                <span className="tag" style={{ color: "var(--coral)" }}>
                  {a.tag}
                </span>
                <h4>{a.title}</h4>
                <p>{a.excerpt}</p>
                <div className="meta">
                  <span>{a.author}</span>
                  <span>·</span>
                  <span>{a.read}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
