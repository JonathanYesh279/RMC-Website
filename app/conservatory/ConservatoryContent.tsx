"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion, type PanInfo } from "motion/react";
import {
  articles,
  catLabels,
  departments,
  deptDetails,
  deptTeachers,
  ensembleInstructors as fallbackEnsembleInstructors,
  ensembles,
  programs,
  smallEnsembles,
  staff as fallbackStaff,
} from "./conservatory-data";
import type {
  EnsembleInstructorDoc,
  EnsemblePreview,
  FormDoc,
  LeaderDoc,
} from "@/sanity/queries";

const DEFAULT_INSTRUCTOR_IMAGE = "/fallbacks/instructor-portrait.jpg";
const DEFAULT_LEADER_IMAGE = "/fallbacks/instructor-portrait.jpg";

type InstructorCard = {
  key: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string | null;
};

type EnsembleCard = {
  key: string;
  imageUrl: string;
  imageAlt: string | null;
  category: string | null;
  accent: "teal" | "amber" | "coral";
  name: string;
  instructor: string;
  level: string;
  description: string;
};

type LeaderCard = {
  key: string;
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  image: string;
  imageAlt: string | null;
  accentStyle: string;
};

const tabLabels = [
  "מחלקות",
  "תזמורות ומקהלות",
  "הרכבים",
  "תוכניות ייחודיות",
  "טפסים",
  "הנהלה, מינהל ונציגות הורים",
  "העשרה",
];

const STORAGE_KEY = "conservatoryTab";

export default function ConservatoryContent({
  forms,
  ensemblePreviews,
  ensembleInstructorDocs,
  leaderDocs,
}: {
  forms: FormDoc[];
  ensemblePreviews: EnsemblePreview[];
  ensembleInstructorDocs: EnsembleInstructorDoc[];
  leaderDocs: LeaderDoc[];
}) {
  const [active, setActive] = useState(0);
  const [indicator, setIndicator] = useState({ width: 0, tx: 0 });
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const [openDeptKey, setOpenDeptKey] = useState<string | null>(null);
  const [teacherIdx, setTeacherIdx] = useState(0);
  const [activeProg, setActiveProg] = useState(0);
  const deptOverlayRef = useRef<HTMLDivElement | null>(null);
  const deptCarouselRef = useRef<HTMLDivElement | null>(null);

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

  // ===== Department overlay =====
  const openDept = openDeptKey
    ? departments.find((d) => d.key === openDeptKey) ?? null
    : null;
  const openDetail = openDeptKey ? deptDetails[openDeptKey] ?? null : null;
  const openTeachers = useMemo(
    () => (openDeptKey ? deptTeachers[openDeptKey] ?? [] : []),
    [openDeptKey]
  );
  const [autoPause, setAutoPause] = useState(false);

  const handleOpenDept = useCallback((key: string) => {
    setOpenDeptKey(key);
    setTeacherIdx(0);
    setAutoPause(false);
  }, []);
  const handleCloseDept = useCallback(() => {
    setOpenDeptKey(null);
  }, []);

  useEffect(() => {
    if (!openDeptKey) return;
    const id = requestAnimationFrame(() => {
      const el = deptOverlayRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [openDeptKey]);

  useEffect(() => {
    if (!openDeptKey) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") handleCloseDept();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openDeptKey, handleCloseDept]);

  useEffect(() => {
    if (!openDeptKey || !openTeachers.length || autoPause) return;
    const t = setInterval(() => {
      setTeacherIdx((i) => (i + 1) % openTeachers.length);
    }, 2800);
    return () => clearInterval(t);
  }, [openDeptKey, openTeachers.length, autoPause]);

  const stepTeacher = (dir: number) => {
    if (!openTeachers.length) return;
    setTeacherIdx((i) => (i + dir + openTeachers.length) % openTeachers.length);
  };

  const trackPercent =
    openTeachers.length > 0
      ? teacherIdx * (100 / Math.min(openTeachers.length, 3))
      : 0;

  // ===== Programs carousel =====
  const progCount = programs.length;
  const setProg = (i: number) => setActiveProg(((i % progCount) + progCount) % progCount);

  const [feature, ...rest] = articles;
  const sideList = rest.slice(0, 3);
  const bottomGrid = rest.slice(3);

  const ensembleCards: EnsembleCard[] = ensemblePreviews.length
    ? ensemblePreviews.map((e) => ({
        key: e._id,
        imageUrl: `${e.imageUrl}?w=1200&q=80&auto=format&fit=crop`,
        imageAlt: e.imageAlt,
        category: e.category,
        accent: e.accent ?? "teal",
        name: e.name,
        instructor: e.instructor,
        level: e.level,
        description: e.description,
      }))
    : smallEnsembles.map((e) => ({
        key: e.name,
        imageUrl: e.img,
        imageAlt: null,
        category: e.catLabel,
        accent: e.color,
        name: e.name,
        instructor: e.lead,
        level: e.level,
        description: e.desc,
      }));

  const instructorCards: InstructorCard[] = ensembleInstructorDocs.length
    ? ensembleInstructorDocs.map((p) => ({
        key: p._id,
        name: p.name,
        role: p.role,
        image: p.imageUrl
          ? `${p.imageUrl}?w=600&q=80&auto=format&fit=crop`
          : DEFAULT_INSTRUCTOR_IMAGE,
        imageAlt: p.imageAlt,
      }))
    : fallbackEnsembleInstructors.map((p) => ({
        key: p.name,
        name: p.name,
        role: p.role,
        image: p.img,
        imageAlt: null,
      }));

  const leaderCards: LeaderCard[] = leaderDocs.length
    ? leaderDocs.map((p) => ({
        key: p._id,
        name: p.name,
        title: p.title,
        subtitle: p.subtitle ?? "",
        bio: p.bio ?? "",
        image: p.imageUrl
          ? `${p.imageUrl}?w=600&q=80&auto=format&fit=crop`
          : DEFAULT_LEADER_IMAGE,
        imageAlt: p.imageAlt,
        accentStyle: `var(--${p.accent})`,
      }))
    : fallbackStaff.map((s) => ({
        key: s.name,
        name: s.name,
        title: s.title,
        subtitle: s.sub,
        bio: s.bio,
        image: s.img,
        imageAlt: null,
        accentStyle: s.color,
      }));

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
        {/* Panel 0: מחלקות */}
        <div
          className={`tab-panel ${active === 0 ? "active" : ""}`}
          id="panel-0"
          role="tabpanel"
        >
          <div className="dept-grid">
            {departments.map((d, i) => (
              <article
                key={d.key}
                className="dept-card reveal"
                data-dept={d.key}
                style={{ transitionDelay: `${Math.min(i * 40, 320)}ms` }}
                onClick={() => handleOpenDept(d.key)}
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
                  <span className="dept-more">
                    פרטים ומורים <span className="arrow">←</span>
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Department detail — inline expanding panel */}
          <div
            ref={deptOverlayRef}
            className={`dept-overlay ${openDeptKey ? "is-open" : ""}`}
          >
            <div className="dept-sheet" role="dialog" aria-modal="false">
              <button
                type="button"
                className="dept-close"
                aria-label="סגירה"
                onClick={handleCloseDept}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="dept-hero">
                <div
                  className="dept-hero-img"
                  style={
                    openDept
                      ? { backgroundImage: `url('${openDept.img}')` }
                      : undefined
                  }
                />
                <div className="dept-hero-scrim" />
                <div className="dept-hero-body">
                  <span className="eyebrow" style={{ color: "#fcbc40" }}>
                    <span
                      className="eyebrow-dot"
                      style={{ background: "#fcbc40" }}
                    />
                    מחלקה
                  </span>
                  <h2 className="dept-hero-title">{openDept?.name}</h2>
                  <p className="dept-hero-desc">{openDept?.desc}</p>
                  <dl className="dept-facts">
                    <div>
                      <dt>ראש המחלקה</dt>
                      <dd>{openDetail?.lead || "—"}</dd>
                    </div>
                    <div>
                      <dt>גילאים</dt>
                      <dd>{openDetail?.ages || "—"}</dd>
                    </div>
                    <div>
                      <dt>חללי אימון</dt>
                      <dd>{openDetail?.rooms || "—"}</dd>
                    </div>
                    <div>
                      <dt>תלמידים</dt>
                      <dd>{openDept?.count || "—"}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="dept-section">
                <div className="dept-section-head">
                  <div>
                    <div className="eyebrow">
                      <span className="eyebrow-dot" />
                      הסגל
                    </div>
                    <h3>המורים של המחלקה</h3>
                  </div>
                  <div className="dept-carousel-ctrl">
                    <button
                      type="button"
                      className="dept-nav"
                      aria-label="הקודם"
                      onClick={() => {
                        stepTeacher(-1);
                        setAutoPause(false);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15 6l-6 6 6 6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="dept-nav"
                      aria-label="הבא"
                      onClick={() => {
                        stepTeacher(1);
                        setAutoPause(false);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  className="dept-carousel"
                  ref={deptCarouselRef}
                  onMouseEnter={() => setAutoPause(true)}
                  onMouseLeave={() => setAutoPause(false)}
                >
                  <motion.div
                    className="dept-track"
                    drag="x"
                    dragElastic={0.08}
                    dragMomentum={false}
                    dragConstraints={deptCarouselRef}
                    onDragStart={() => setAutoPause(true)}
                    onDragEnd={(_, info: PanInfo) => {
                      const w = deptCarouselRef.current?.offsetWidth ?? 0;
                      const visible = Math.min(openTeachers.length || 1, 3);
                      const stepPx = w / visible;
                      const threshold = Math.max(60, stepPx * 0.4);
                      if (info.offset.x > threshold) stepTeacher(1);
                      else if (info.offset.x < -threshold) stepTeacher(-1);
                    }}
                    animate={{ x: `${trackPercent}%` }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 0.61, 0.36, 1],
                    }}
                    style={{ touchAction: "pan-y" }}
                  >
                    {openTeachers.map((t, i) => (
                      <article
                        key={`${t.name}-${i}`}
                        className={`dept-card-t ${i === teacherIdx ? "is-center" : ""}`}
                      >
                        <div
                          className="dept-card-img"
                          style={{ backgroundImage: `url('${t.img}')` }}
                        />
                        <div className="dept-card-body">
                          <h4>{t.name}</h4>
                          <span className="dept-card-role">{t.role}</span>
                          <p>{t.bio}</p>
                        </div>
                      </article>
                    ))}
                  </motion.div>
                </div>
                <div className="dept-dots">
                  {openTeachers.map((t, i) => (
                    <button
                      key={`${t.name}-dot-${i}`}
                      type="button"
                      className={`dept-dot ${i === teacherIdx ? "is-active" : ""}`}
                      aria-label={`מורה ${i + 1}`}
                      onClick={() => {
                        setTeacherIdx(i);
                        setAutoPause(false);
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="dept-section dept-highlights-wrap">
                <div className="eyebrow">
                  <span className="eyebrow-dot" />
                  מאפיינים
                </div>
                <h3>מה מייחד את המחלקה</h3>
                <ul className="dept-highlights">
                  {(openDetail?.highlights ?? []).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 1: תזמורות ומקהלות */}
        <div
          className={`tab-panel ${active === 1 ? "active" : ""}`}
          id="panel-1"
          role="tabpanel"
        >
          <div className="panel-head">
            <div>
              <div className="eyebrow">תזמורות ומקהלות</div>
              <h2>חמישה גופים ייצוגיים.</h2>
            </div>
            <p className="trail">
              לצד הלימוד הפרטני, התלמידים נקלטים בהרכבים המרכזיים של המרכז —
              התזמורת הסימפונית, תזמורת הנוער, תזמורת כלי קשת, המקהלה העירונית
              והמקהלות.
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

        {/* Panel 2: הרכבים */}
        <div
          className={`tab-panel ${active === 2 ? "active" : ""}`}
          id="panel-2"
          role="tabpanel"
        >
          <div className="panel-head">
            <div>
              <div className="eyebrow">ארבעה-עשר הרכבים</div>
              <h2>
                נגינה
                <br />
                בצוותא.
              </h2>
            </div>
            <p className="trail">
              השתתפות בהרכב משנה לחלוטין את חוויית הלימוד — המוטיבציה גדלה,
              האימון האישי משתפר, והתלמיד פוגש אנשים בעלי עניין משותף. במרכז
              פועלים ארבעה-עשר הרכבים בסגנונות מגוונים, בהתאם לרמה ולגיל.
            </p>
          </div>

          <div className="ens-intro">
            <div className="ens-intro-item">
              <span className="n">14</span>
              <span className="l">הרכבים פעילים</span>
            </div>
            <div className="ens-intro-item">
              <span className="n">6</span>
              <span className="l">סגנונות מוסיקליים</span>
            </div>
            <div className="ens-intro-item">
              <span className="n">10</span>
              <span className="l">מנחים מקצועיים</span>
            </div>
            <div className="ens-intro-item">
              <span className="n">280+</span>
              <span className="l">נגנים בעונה</span>
            </div>
          </div>

          <div className="ens-grid">
            {ensembleCards.map((e, i) => (
              <article
                key={e.key}
                className="ens-card reveal"
                style={{ transitionDelay: `${Math.min(i * 50, 300)}ms` }}
              >
                <div
                  className="ens-img"
                  role={e.imageAlt ? "img" : undefined}
                  aria-label={e.imageAlt ?? undefined}
                  style={{ backgroundImage: `url('${e.imageUrl}')` }}
                >
                  {e.category && (
                    <span className={`ens-cat ens-cat-${e.accent}`}>
                      {e.category}
                    </span>
                  )}
                </div>
                <div className="ens-body">
                  <h3>{e.name}</h3>
                  <dl className="ens-meta">
                    <div>
                      <dt>מנחה</dt>
                      <dd>{e.instructor}</dd>
                    </div>
                    <div>
                      <dt>רמה</dt>
                      <dd>{e.level}</dd>
                    </div>
                  </dl>
                  <p>{e.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="ens-instr-head">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              הסגל
            </div>
            <h3>
              עשרה מנחים
              <br />
              <em>מקצועיים.</em>
            </h3>
            <p>
              סגל מלא של נגנים ומלחינים בעלי ניסיון בימתי — מלווים את ההרכבים
              בחזרות שבועיות ובהכנה למופעים.
            </p>
          </div>
          <div className="ens-instructors">
            {instructorCards.map((p, i) => (
              <figure
                key={p.key}
                className="ens-instr reveal"
                style={{ transitionDelay: `${Math.min(i * 30, 240)}ms` }}
              >
                <div
                  className="portrait"
                  role={p.imageAlt ? "img" : undefined}
                  aria-label={p.imageAlt ?? undefined}
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <figcaption>
                  <strong>{p.name}</strong>
                  <span>{p.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="ens-enroll">
            <div className="ens-enroll-head">
              <div>
                <div className="eyebrow" style={{ color: "var(--amber)" }}>
                  <span
                    className="eyebrow-dot"
                    style={{ background: "var(--amber)" }}
                  />
                  הרשמה להרכבים
                </div>
                <h3>
                  הקדימו להירשם —
                  <br />
                  <em>מספר המקומות מוגבל.</em>
                </h3>
              </div>
              <p className="trail">
                תהליך ההרשמה פתוח לתלמידי המרכז ולחיצוניים כאחד. הרשמה להרכבים
                הייצוגיים נעשית בטופס מקוון, לאחריה אודישן קצר ושיבוץ לפי רמה.
              </p>
            </div>
            <div className="ens-steps">
              <div className="ens-step">
                <span className="num">01</span>
                <h4>מילוי טופס</h4>
                <p>
                  טופס מקוון להרכב המבוקש — פרטים אישיים, גיל, שנות ניסיון
                  והמלצת מורה כלי.
                </p>
              </div>
              <div className="ens-step">
                <span className="num">02</span>
                <h4>אודישן קצר</h4>
                <p>
                  פגישת היכרות של 15 דקות עם מנחה ההרכב — קטע מוכן ובדיקת יכולת
                  הקשבה.
                </p>
              </div>
              <div className="ens-step">
                <span className="num">03</span>
                <h4>שיבוץ והתחלה</h4>
                <p>
                  שיבוץ להרכב המתאים לרמה ולגיל. חזרה ראשונה בשבוע שלאחר מכן.
                </p>
              </div>
            </div>
            <div className="ens-cta-row">
              <a href="#" className="btn btn--coral">
                טופס הרשמה להרכב ייצוגי
              </a>
              <a href="#" className="btn btn--outline">
                טופס הרשמה להרכב רגיל
              </a>
              <span className="ens-note">
                שאלות?{" "}
                <a href="mailto:ensembles@music-raanana.org.il">
                  ensembles@music-raanana.org.il
                </a>{" "}
                · 09-7711330
              </span>
            </div>
          </div>
        </div>

        {/* Panel 3: תוכניות ייחודיות */}
        <div
          className={`tab-panel ${active === 3 ? "active" : ""}`}
          id="panel-3"
          role="tabpanel"
        >
          <div className="prog-carousel">
            <div className="prog-layout">
              <aside className="prog-index" aria-label="ניווט תוכניות">
                <div className="prog-index-label">
                  <span>תוכניות</span>
                  <span className="prog-counter">
                    {activeProg + 1} / {progCount}
                  </span>
                </div>
                <ol className="prog-index-list" role="tablist">
                  {programs.map((p, i) => (
                    <li key={p.key}>
                      <button
                        type="button"
                        className={`prog-tab ${activeProg === i ? "is-active" : ""}`}
                        role="tab"
                        aria-selected={activeProg === i}
                        onClick={() => setProg(i)}
                      >
                        <span className="prog-tab-num">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="prog-tab-body">
                          <span className="prog-tab-title">{p.title}</span>
                          <span className="prog-tab-sub">{p.kicker}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
                <div className="prog-index-nav">
                  <button
                    type="button"
                    className="prog-nav"
                    aria-label="תוכנית קודמת"
                    onClick={() => setProg(activeProg - 1)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="prog-nav"
                    aria-label="תוכנית הבאה"
                    onClick={() => setProg(activeProg + 1)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M15 6l-6 6 6 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </aside>
              <div className="prog-stage">
                {programs.map((p, i) => (
                  <article
                    key={p.key}
                    className={`prog-slide ${activeProg === i ? "is-active" : ""}`}
                  >
                    <div
                      className="prog-hero"
                      style={{ backgroundImage: `url('${p.img}')` }}
                    >
                      <div className="prog-hero-scrim" />
                      <div className="prog-hero-body">
                        <span className="prog-kicker">{p.kicker}</span>
                        <h3 className="prog-title">{p.title}</h3>
                        <div className="prog-sub">{p.subtitle}</div>
                      </div>
                    </div>
                    <div className="prog-content">
                      <p className="prog-lede">{p.lede}</p>
                      <div className="prog-blocks">
                        {p.blocks.map((b) => (
                          <div key={b.h} className="prog-block">
                            <h4>{b.h}</h4>
                            <ul>
                              {b.list.map((li) => (
                                <li key={li}>{li}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {p.note && <div className="prog-note">{p.note}</div>}
                      {p.cta && (
                        <a href="#" className="btn btn--coral prog-cta">
                          {p.cta}
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel 4: טפסים */}
        <div
          className={`tab-panel ${active === 4 ? "active" : ""}`}
          id="panel-4"
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
              <a
                key={f._id}
                href={f.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="form-row reveal"
              >
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
                  {f.description && <p>{f.description}</p>}
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

        {/* Panel 5: הנהלה */}
        <div
          className={`tab-panel ${active === 5 ? "active" : ""}`}
          id="panel-5"
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
            {leaderCards.map((s) => (
              <article key={s.key} className="staff reveal">
                <div
                  className="portrait"
                  role={s.imageAlt ? "img" : undefined}
                  aria-label={s.imageAlt ?? undefined}
                  style={{ backgroundImage: `url('${s.image}')` }}
                />
                <h4>{s.name}</h4>
                <div className="accent" style={{ background: s.accentStyle }} />
                <p className="role">
                  <strong>{s.title}</strong>
                  {s.subtitle}
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

        {/* Panel 6: העשרה */}
        <div
          className={`tab-panel ${active === 6 ? "active" : ""}`}
          id="panel-6"
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
