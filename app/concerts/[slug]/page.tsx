"use client";

import { use, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  concertDateLabels,
  findConcertBySlug,
  type Concert,
} from "../concerts-data";

type TicketTier = {
  key: "standard" | "premium" | "student";
  name: string;
  desc: string;
  price: number;
};

function buildTiers(c: Concert): TicketTier[] {
  const round10 = (n: number) => Math.round(n / 10) * 10;
  return [
    {
      key: "standard",
      name: "כרטיס רגיל",
      desc: "ישיבה חופשית באולם המרכזי",
      price: c.basePrice,
    },
    {
      key: "premium",
      name: "פרימיום — שורות ראשונות",
      desc: "שורות 1–5 · תוכנייה מודפסת · כניסה מועדפת",
      price: round10(c.basePrice * 1.5),
    },
    {
      key: "student",
      name: "סטודנט / חייל",
      desc: "בהצגת תעודה בכניסה · ישיבה חופשית",
      price: round10(c.basePrice * 0.75),
    },
  ];
}

export default function ConcertDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const concert = findConcertBySlug(slug);
  if (!concert) notFound();

  const dates = useMemo(() => concertDateLabels(concert), [concert]);
  const tiers = useMemo(() => buildTiers(concert), [concert]);

  const [selectedKey, setSelectedKey] = useState<TicketTier["key"]>("standard");
  const selectedTier = tiers.find((t) => t.key === selectedKey) ?? tiers[0];
  const [qty, setQty] = useState(1);

  const subtotal = selectedTier.price * qty;
  const fee = qty * 8;
  const total = subtotal + fee;

  const formRef = useRef<HTMLFormElement>(null);

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

  const handlePay = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const requiredInputs = form.querySelectorAll<HTMLInputElement>(
      "input[required]",
    );
    let valid = true;
    requiredInputs.forEach((input) => {
      if (!input.value.trim()) {
        valid = false;
        input.style.borderColor = "var(--color-coral)";
      } else {
        input.style.borderColor = "";
      }
    });
    if (!valid) {
      window.alert("נא למלא את כל שדות החובה");
      return;
    }
    window.alert(
      "מעבר לעמוד תשלום מאובטח...\n(בגרסה מלאה — כאן נפתח שער סליקה)",
    );
  };

  const lede = concert.lede ?? concert.desc;
  const duration = concert.duration ?? "כ־90 דקות";
  const language = concert.language ?? "תוכנייה בעברית";
  const program = concert.program ?? [
    { work: concert.title, composer: "תוכנייה מלאה תפורסם בקרוב" },
  ];
  const heroBadge = concert.badge ?? "כרטיסים זמינים";

  return (
    <>
      <section className="detail-hero">
        <div
          className="detail-bg"
          style={{ backgroundImage: `url('${concert.img}')` }}
        />
        <div className="detail-shell container">
          <nav className="detail-crumbs reveal" aria-label="פירורי לחם">
            <Link href="/">דף הבית</Link> /{" "}
            <Link href="/concerts">מופעים וקונצרטים</Link>{" "}
            / <span>{concert.title}</span>
          </nav>

          <div className="detail-grid">
            <div>
              <div
                className="detail-img reveal"
                style={{ backgroundImage: `url('${concert.img}')` }}
                role="img"
                aria-label={concert.title}
              >
                <div className="detail-badge">{heroBadge}</div>
              </div>
              <div className="detail-info reveal">
                <h1>{concert.title}</h1>
                <p className="detail-lede">{lede}</p>
              </div>

              <div className="detail-facts reveal">
                <div className="detail-fact">
                  <div className="detail-fact-l">מקום</div>
                  <div className="detail-fact-v">{concert.venue}</div>
                </div>
                <div className="detail-fact">
                  <div className="detail-fact-l">משך</div>
                  <div className="detail-fact-v">{duration}</div>
                </div>
                <div className="detail-fact">
                  <div className="detail-fact-l">שפה</div>
                  <div className="detail-fact-v">{language}</div>
                </div>
              </div>

              <div className="detail-program reveal">
                <h3>תוכנייה</h3>
                <ul>
                  {program.map((p) => (
                    <li key={`${p.composer}-${p.work}`}>
                      <span className="prog-work">{p.work}</span>
                      <span className="prog-composer">{p.composer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="detail-date-card reveal">
                <div className="ddc-chip">הקונצרט הקרוב</div>
                <div className="ddc-num">{Number(concert.d)}</div>
                <div className="ddc-mo">{dates.monthFull}</div>
                <div className="ddc-day">{dates.dayName}</div>
                <div className="ddc-time">{concert.t}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="purchase" id="tickets">
        <div className="container">
          <div className="purchase-head reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              רכישת כרטיסים
            </div>
            <h2>בחרו כרטיסים והשלימו הזמנה</h2>
          </div>

          <form
            ref={formRef}
            className="purchase-grid"
            onSubmit={handlePay}
            noValidate
          >
            <div>
              <div className="ticket-types reveal">
                {tiers.map((tier) => {
                  const selected = tier.key === selectedKey;
                  return (
                    <button
                      key={tier.key}
                      type="button"
                      className={`ticket-type${selected ? " selected" : ""}`}
                      onClick={() => setSelectedKey(tier.key)}
                      aria-pressed={selected}
                    >
                      <span className="tt-radio" aria-hidden="true" />
                      <span className="tt-info">
                        <span className="tt-info-h">{tier.name}</span>
                        <span className="tt-info-p">{tier.desc}</span>
                      </span>
                      <span className="tt-price">
                        ₪{tier.price}
                        <small>לכרטיס</small>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="qty-row reveal">
                <div className="qty-label">כמות כרטיסים</div>
                <div className="qty-ctrl">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    aria-label="הפחת כמות"
                  >
                    −
                  </button>
                  <div className="qty-val" aria-live="polite">
                    {qty}
                  </div>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    disabled={qty >= 10}
                    aria-label="הוסף כמות"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-section reveal">
                <h3>פרטי הרוכש</h3>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="cd-first">
                      שם פרטי <span className="req">*</span>
                    </label>
                    <input
                      id="cd-first"
                      type="text"
                      placeholder="ישראל"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cd-last">
                      שם משפחה <span className="req">*</span>
                    </label>
                    <input
                      id="cd-last"
                      type="text"
                      placeholder="ישראלי"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cd-email">
                      דוא״ל <span className="req">*</span>
                    </label>
                    <input
                      id="cd-email"
                      type="email"
                      placeholder="israel@example.com"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="cd-phone">
                      טלפון <span className="req">*</span>
                    </label>
                    <input
                      id="cd-phone"
                      type="tel"
                      placeholder="050-1234567"
                      required
                    />
                  </div>
                  <div className="field full">
                    <label htmlFor="cd-notes">הערות (אופציונלי)</label>
                    <textarea
                      id="cd-notes"
                      placeholder="נגישות, מקומות ליד המעבר, וכד׳"
                    />
                  </div>
                </div>
              </div>

              <div className="access-note reveal">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="8" />
                  <path d="M10 9v5M10 6.5v.01" />
                </svg>
                <p>
                  המרכז מונגש לבעלי מוגבלויות. לסיוע בהזמנה או לבקשת מקומות
                  נגישים ניתן לפנות ל
                  <a href="tel:097711330">09-7711330</a> או{" "}
                  <a href="mailto:info@music-raanana.org.il">
                    info@music-raanana.org.il
                  </a>
                  .
                </p>
              </div>
            </div>

            <aside className="order-summary reveal" aria-label="סיכום הזמנה">
              <h3>סיכום הזמנה</h3>
              <div className="os-concert">
                <div
                  className="os-thumb"
                  style={{ backgroundImage: `url('${concert.img}')` }}
                  role="img"
                  aria-label={concert.title}
                />
                <div>
                  <div className="os-title">{concert.title}</div>
                  <div className="os-date">
                    {dates.shortDate} · {concert.t}
                  </div>
                </div>
              </div>

              <div className="os-lines">
                <div className="os-line">
                  <span>
                    {selectedTier.name} × {qty}
                  </span>
                  <span className="val">₪{subtotal}</span>
                </div>
                <div className="os-line">
                  <span>עמלת שירות</span>
                  <span className="val">₪{fee}</span>
                </div>
              </div>

              <div className="os-total">
                <span className="lbl">סה״כ לתשלום</span>
                <span className="amt">₪{total}</span>
              </div>

              <button type="submit" className="pay-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <rect x="2" y="5" width="16" height="11" rx="2" />
                  <path d="M2 9h16" />
                  <path d="M6 13h3" />
                </svg>
                המשך לתשלום בכרטיס אשראי
              </button>

              <div className="os-secure">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <rect x="3" y="6" width="8" height="7" rx="1" />
                  <path d="M5 6V4a2 2 0 0 1 4 0v2" />
                </svg>
                תשלום מאובטח בתקן PCI-DSS
              </div>
              <div className="os-note">
                ניתן לבטל עד 48 שעות לפני המופע ולקבל זיכוי מלא.
              </div>
            </aside>
          </form>
        </div>
      </section>
    </>
  );
}
