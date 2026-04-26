"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  SERVICE_FEE_PER_TICKET,
  type TicketTier,
  type TierKey,
} from "@/lib/concertPricing";

type Copy = {
  purchaseEyebrow: string;
  purchaseTitle: string;
  accessibilityNote: string;
  secureNote: string;
  cancellationNote: string;
};

export default function TicketPurchase({
  concertTitle,
  thumbUrl,
  thumbAlt,
  shortDate,
  time,
  tiers,
  copy,
}: {
  concertTitle: string;
  thumbUrl: string;
  thumbAlt: string;
  shortDate: string;
  time: string;
  tiers: TicketTier[];
  copy: Copy;
}) {
  const [selectedKey, setSelectedKey] = useState<TierKey>("standard");
  const selectedTier = tiers.find((t) => t.key === selectedKey) ?? tiers[0];
  const [qty, setQty] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);

  const subtotal = selectedTier.price * qty;
  const fee = qty * SERVICE_FEE_PER_TICKET;
  const total = subtotal + fee;

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

  return (
    <section className="purchase" id="tickets">
      <div className="container">
        <div className="purchase-head reveal">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            {copy.purchaseEyebrow}
          </div>
          <h2>{copy.purchaseTitle}</h2>
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
              <p>{copy.accessibilityNote}</p>
            </div>
          </div>

          <aside className="order-summary reveal" aria-label="סיכום הזמנה">
            <h3>סיכום הזמנה</h3>
            <div className="os-concert">
              <div
                className="os-thumb"
                style={{ backgroundImage: `url('${thumbUrl}')` }}
                role="img"
                aria-label={thumbAlt}
              />
              <div>
                <div className="os-title">{concertTitle}</div>
                <div className="os-date">
                  {shortDate} · {time}
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
              {copy.secureNote}
            </div>
            <div className="os-note">{copy.cancellationNote}</div>
          </aside>
        </form>
      </div>
    </section>
  );
}
