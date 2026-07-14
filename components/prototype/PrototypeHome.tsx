"use client";

// Cinematic entry: three explicit worlds on a dark stage. Hovering or
// focusing a world shifts the atmosphere (backdrop + stage light in the
// world's accent), but the choice is always legible without hover — titles,
// descriptions and CTAs are permanent. Touch simply taps through.

import { useEffect, useState } from "react";
import Link from "next/link";

type World = {
  key: "conservatory" | "concerts" | "rentals";
  title: string;
  action: string;
  desc: string;
  cta: string;
  href: string;
  img: string;
  accent: string;
};

const WORLDS: World[] = [
  {
    key: "conservatory",
    title: "קונסרבטוריון ולימודי מוסיקה",
    action: "ללמוד ולצמוח",
    desc: "שיעורים אישיים, תזמורות ומקהלות ומסלולי מצוינות — מגיל 5 ועד בגרות.",
    cta: "למציאת המסלול שלכם",
    href: "/prototype/conservatory",
    img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=2000&q=80&auto=format&fit=crop",
    accent: "var(--teal)",
  },
  {
    key: "concerts",
    title: "קונצרטים ומופעים",
    action: "לצפות ולהקשיב",
    desc: "הבמה הפועמת של רעננה — עשרות קונצרטים בעונה: קלאסי, ג׳אז ומופעי ילדים.",
    cta: "ללוח הקונצרטים",
    href: "/concerts",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=2000&q=80&auto=format&fit=crop",
    accent: "var(--coral)",
  },
  {
    key: "rentals",
    title: "השכרת אולמות וסטודיו",
    action: "ליצור ולהפיק",
    desc: "האודיטוריום, האולם הקאמרי וסטודיו ההקלטות — לאירועים, לחזרות ולהפקות.",
    cta: "לבדיקת זמינות",
    href: "/rentals",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=2000&q=80&auto=format&fit=crop",
    accent: "var(--amber)",
  },
];

export default function PrototypeHome() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    document.body.classList.add("home-locked", "pt-stage-page");
    return () => {
      document.body.classList.remove("home-locked", "pt-stage-page");
    };
  }, []);

  return (
    <section className="pt-stage" aria-label="שלושת עולמות מרכז המוסיקה">
      <div className="pt-stage-bg" aria-hidden="true">
        {WORLDS.map((w, i) => (
          <div
            key={w.key}
            className={`pt-stage-slide ${active === i ? "is-on" : ""}`}
            style={{ backgroundImage: `url('${w.img}')` }}
          />
        ))}
        <div
          className={`pt-stage-light ${active !== null ? "is-on" : ""}`}
          style={
            active !== null
              ? { background: `radial-gradient(52% 68% at 50% 108%, color-mix(in srgb, ${WORLDS[active].accent} 34%, transparent), transparent 70%)` }
              : undefined
          }
        />
      </div>

      <header className="pt-stage-head">
        <p className="pt-kicker">
          מרכז פיס למוסיקה רעננה <span className="pt-kicker-badge">אב־טיפוס</span>
        </p>
        <h1 className="pt-stage-title">
          הבמה כבר מוארת.
          <em> לאן נכנסים?</em>
        </h1>
      </header>

      <nav className="pt-worlds" aria-label="בחירת עולם">
        {WORLDS.map((w, i) => (
          <Link
            key={w.key}
            href={w.href}
            className={`pt-world ${active !== null && active !== i ? "is-dim" : ""} ${active === i ? "is-lit" : ""}`}
            style={{ "--pt-accent": w.accent } as React.CSSProperties}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <span className="pt-world-action">{w.action}</span>
            <h2 className="pt-world-title">{w.title}</h2>
            <p className="pt-world-desc">{w.desc}</p>
            <span className="pt-world-cta">
              {w.cta}
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M9 3L4 7l5 4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        ))}
      </nav>

      <p className="pt-stage-note">
        גרסת התנסות לחוויית אתר חדשה ·{" "}
        <Link href="/">לאתר הנוכחי</Link>
      </p>
    </section>
  );
}
