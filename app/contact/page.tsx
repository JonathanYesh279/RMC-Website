"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopicSelect from "./TopicSelect";
import {
  accessibilityColumns,
  accessibilityRows,
  infoBlocks,
  mapDirectionsUrl,
  mapEmbedSrc,
  routeCards,
  staff,
  topicOptions,
  type InfoBlock,
} from "./contact-data";

const infoIcon: Record<InfoBlock["icon"], React.ReactElement> = {
  bus: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="6" width="14" height="9" rx="1" />
      <path d="M6 6V4h8v2M6 15v2M14 15v2" />
      <circle cx="7" cy="11" r=".8" fill="currentColor" stroke="none" />
      <circle cx="13" cy="11" r=".8" fill="currentColor" stroke="none" />
    </svg>
  ),
  parking: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 10V6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v4" />
      <rect x="3" y="10" width="14" height="6" rx="1" />
      <path d="M6 16v1M14 16v1" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l3 2" />
    </svg>
  ),
  mail: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 6l7 5 7-5" />
      <rect x="3" y="5" width="14" height="11" rx="1" />
    </svg>
  ),
};

const mailIcon = (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="1.5" y="2.5" width="11" height="9" />
    <path d="M1.5 3l5.5 4 5.5-4" />
  </svg>
);

const arrowIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9 3L4 7l5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContactPage() {
  const [sent, setSent] = useState(false);

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
      {/* ================= HERO ================= */}
      <section className="ct-hero">
        <div className="container">
          <div className="reveal">
            <div className="crumbs">
              <Link href="/">דף הבית</Link> · <span>צור קשר</span>
            </div>
            <h1>
              נשמח לעמוד
              <br />
              <em>לרשותכם.</em>
            </h1>
          </div>
          <p className="lede reveal">
            מרכז פיס למוסיקה רעננה פתוח לקהל ולתלמידים שישה ימים בשבוע. צוות המשרד
            ישמח לסייע בכל שאלה בנושאי לימודים, הרשמה, שכירויות, אבדות ומציאות או
            רכישת כרטיסים — בטלפון, בדוא״ל או בהגעה למשרדים בקומה הראשונה.
          </p>
        </div>
      </section>

      {/* ================= MAP + DETAILS ================= */}
      <section className="ct-anchor">
        <div className="container">
          <div className="ct-anchor-grid">
            <div className="ct-map reveal">
              <iframe
                title="מרכז פיס למוסיקה רעננה — אצטיון 48"
                src={mapEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="ct-map-tag">
                <span className="pin">המיקום שלנו</span>
                <strong>מרכז פיס למוסיקה</strong>
                <span>רחוב אצטיון 48, רעננה</span>
                <a href={mapDirectionsUrl} target="_blank" rel="noopener">
                  הצג מסלול הגעה
                  {arrowIcon}
                </a>
              </div>
            </div>

            <div className="ct-anchor-body reveal">
              <div className="ct-info-blocks">
                {infoBlocks.map((block) => (
                  <div className="row" key={block.title}>
                    <span className="ic">{infoIcon[block.icon]}</span>
                    <div>
                      <h4>{block.title}</h4>
                      {block.hours ? (
                        block.hours.map((row) => (
                          <div className="ct-hours-row" key={row.day}>
                            <span className="d">{row.day}</span>
                            <span className="h">
                              {row.closed ? (
                                <span className="closed">{row.time}</span>
                              ) : (
                                row.time
                              )}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="lines">
                          {block.lines?.map((line) => (
                            <span key={line}>{line}</span>
                          ))}
                          {block.email && (
                            <a href={`mailto:${block.email}`} dir="ltr">
                              {block.email}
                            </a>
                          )}
                          {block.emailNote && <span>{block.emailNote}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STAFF DIRECTORY ================= */}
      <section className="ct-staff">
        <div className="container">
          <div className="ct-staff-head--centered reveal">
            <div className="eyebrow" style={{ justifySelf: "center" }}>
              הצוות שלנו
            </div>
            <p className="trail">
              לכל פנייה ניתן לפנות ישירות לאחד מאנשי הצוות בהתאם לנושא. אנו
              משתדלים לחזור לכל פנייה תוך יום עסקים.
            </p>
          </div>

          <div className="ct-staff-grid reveal">
            {staff.map((member) => (
              <div className="ct-staff-card" key={member.email}>
                <div
                  className={`avatar avatar--${member.accent}`}
                  style={{ backgroundImage: `url('${member.photo}')` }}
                  role="img"
                  aria-label={member.name}
                />
                <div className="role">{member.role}</div>
                <h3 className="name">{member.name}</h3>
                <p className="blurb">{member.blurb}</p>
                <a className="email" href={`mailto:${member.email}`}>
                  {mailIcon}
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK ROUTING ================= */}
      <section className="ct-route">
        <div className="container">
          <div className="ct-route-head reveal">
            <div className="eyebrow">פניות לפי נושא</div>
            <h2>
              למי כדאי <em>לפנות.</em>
            </h2>
            <p>
              שלוש פניות נפוצות שמגיעות אלינו מדי שבוע — לכל נושא מספר טלפון
              ייעודי וכתובת דוא״ל ישירה לטיפול מהיר.
            </p>
          </div>

          <div className="ct-route-grid reveal">
            {routeCards.map((card) => (
              <div className="ct-route-card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <div className="targets">
                  <a href={card.phoneHref}>
                    <span>טלפון</span>
                    <span>{card.phone}</span>
                  </a>
                  <a href={`mailto:${card.email}`}>
                    <span>דוא״ל</span>
                    <span style={{ fontSize: "13px" }}>{card.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MESSAGE FORM ================= */}
      <section className="ct-form-section">
        <div className="container">
          <div className="ct-form-grid ct-form-grid--single">
            <div style={{ textAlign: "center", marginBlockEnd: "8px" }}>
              <div
                className="eyebrow"
                style={{
                  color: "rgba(255,255,255,.55)",
                  justifyContent: "center",
                  display: "inline-flex",
                }}
              >
                השאירו לנו הודעה
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,.7)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  marginBlockStart: "14px",
                  maxWidth: "480px",
                  marginInline: "auto",
                }}
              >
                השאירו פרטים ונחזור אליכם תוך יום עסקים.
              </p>
            </div>
            <form
              className="ct-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="row2">
                <div>
                  <label htmlFor="ct-name">שם מלא</label>
                  <input id="ct-name" type="text" placeholder="ישראל ישראלי" required />
                </div>
                <div>
                  <label htmlFor="ct-phone">טלפון</label>
                  <input id="ct-phone" type="tel" placeholder="050-0000000" />
                </div>
              </div>

              <div className="row2">
                <div>
                  <label htmlFor="ct-email">דוא״ל</label>
                  <input
                    id="ct-email"
                    type="email"
                    placeholder="name@example.com"
                    dir="ltr"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="ct-topic">נושא הפניה</label>
                  <TopicSelect id="ct-topic" name="topic" options={topicOptions} />
                </div>
              </div>

              <div>
                <label htmlFor="ct-msg">הודעה</label>
                <textarea
                  id="ct-msg"
                  placeholder="כתבו לנו במה נוכל לעזור…"
                  required
                />
              </div>

              <div className="submit-row">
                <p className="privacy">
                  בלחיצה על «שליחה» אני מאשר/ת את{" "}
                  <a href="#">מדיניות הפרטיות</a> ומסכים/ה לקבל מענה לפניה זו
                  בלבד.
                </p>
                <button type="submit">
                  {sent ? "ההודעה נשלחה — תודה!" : "שליחת הודעה"}
                  {!sent && arrowIcon}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ================= ACCESSIBILITY ================= */}
      <section className="ct-access">
        <div className="container">
          <div className="ct-access-head reveal">
            <div>
              <div className="eyebrow">נגישות</div>
              <h2>
                הסדרי נגישות
                <br />
                מבנים.
              </h2>
            </div>
            <p className="trail">
              להלן הסדרי הנגישות הקיימים במרכז פיס למוסיקה רעננה. לשאלות וצרכים
              מיוחדים נא לפנות מראש לרכזת הנגישות, ריטה אסקין.
            </p>
          </div>

          <div className="reveal">
            <table
              className="ct-access-table"
              aria-label="טבלת הסדרי נגישות במרכז המוסיקה רעננה"
            >
              <thead>
                <tr>
                  <th>שם המוסד</th>
                  <th>כתובת</th>
                  {accessibilityColumns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {accessibilityRows.map((row) => (
                  <tr key={row.institution}>
                    <td>{row.institution}</td>
                    <td>{row.address}</td>
                    {row.facilities.map((facility) => (
                      <td
                        key={facility.label}
                        className={facility.available ? "yes" : undefined}
                      >
                        {facility.available ? "יש" : "אין"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ct-access-foot">
              <div className="left">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="4" r="1.6" />
                  <path d="M7 8h6l-2 4M9 6v6l-3 5M11 12l3 5" />
                </svg>
                <span>
                  רכזת נגישות — ריטה אסקין · 09-771-1330 · ritae@raanana.muni.il
                </span>
              </div>
              <a href="#">
                הצהרת הנגישות המלאה
                {arrowIcon}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tri-color divider */}
      <div className="ct-rule" aria-hidden="true">
        <div className="a" />
        <div className="b" />
        <div className="c" />
      </div>
    </>
  );
}
