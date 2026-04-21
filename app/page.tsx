"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const bgs = [
  "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=2200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=2200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580651315530-69c8e0903883?w=2200&q=80&auto=format&fit=crop",
];

const portals = [
  {
    num: "01",
    title: "קונסרבטוריון",
    href: "/conservatory",
    desc: "חינוך מוסיקלי למצוינות — שש מחלקות, חמישה הרכבים ייצוגיים, מגיל 5 ועד בגרות.",
    cta: "לדף הקונסרבטוריון",
  },
  {
    num: "02",
    title: "שכירויות והקלטות",
    href: "/rentals",
    desc: "אולמות וחללי הקלטה מקצועיים — האודיטוריום, האולם הקאמרי וסטודיו ההקלטות.",
    cta: "לבדיקת זמינות",
  },
  {
    num: "03",
    title: "מופעים וקונצרטים",
    href: "/concerts",
    desc: "הבמה הפועמת של רעננה — עשרות קונצרטים בעונה, מוסיקה קלאסית, ג׳אז וילדים.",
    cta: "ללוח הקונצרטים",
  },
];

export default function Home() {
  const [activeBg, setActiveBg] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.body.classList.add("home-locked");
    document.body.dataset.page = "home";
    return () => {
      document.body.classList.remove("home-locked");
      delete document.body.dataset.page;
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setActiveBg((prev) => (prev + 1) % bgs.length);
    }, 7000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className={`hero-landing ${hoveredIdx !== null ? "is-hovering" : ""}`}
      id="hero"
      aria-label="עמוד הבית"
    >
      <div className="hl-bg">
        {bgs.map((url, i) => (
          <div
            key={url}
            className={`hl-bg-slide ${i === activeBg ? "active" : ""}`}
            style={{ backgroundImage: `url('${url}')` }}
          />
        ))}
        <div className="hl-scrim" />
      </div>

      <div className="hl-inner">
        <div className="hl-top">
          <span className="hl-eyebrow">רעננה · מרכז פיס למוסיקה</span>
          <h1 className="hl-title">
            חינוך מוסיקלי
            <br />
            <em>למצוינות.</em>
          </h1>
          <p className="hl-sub">
            בית פתוח לכל בני הנוער ותושבי העיר — הקונסרבטוריון הגדול בישראל, מעל
            1,300 תלמידים.
          </p>
        </div>

        <nav className="hl-portals" aria-label="שלוש מחלקות המרכז">
          {portals.map((p, i) => (
            <Link
              key={p.num}
              href={p.href}
              className={`hl-portal ${
                hoveredIdx !== null && hoveredIdx !== i ? "dim" : ""
              }`}
              onMouseEnter={() => {
                setHoveredIdx(i);
                setActiveBg(i);
                setPaused(true);
              }}
              onMouseLeave={() => {
                setHoveredIdx(null);
                setPaused(false);
              }}
              onFocus={() => {
                setActiveBg(i);
                setPaused(true);
              }}
              onBlur={() => {
                setPaused(false);
              }}
            >
              <span className="hl-num">{p.num}</span>
              <div className="hl-pbody">
                <h2>{p.title}</h2>
                <p>{p.desc}</p>
                <span className="hl-pcta">
                  {p.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M9 3L4 7l5 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
