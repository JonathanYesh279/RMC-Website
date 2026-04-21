"use client";

import { useEffect } from "react";
import {
  bookingContacts,
  clients,
  heroStats,
  processSteps,
  services,
  venues,
  type BookingContact,
  type Service,
  type Venue,
} from "./rentals-data";

const serviceIcon: Record<Service["icon"], React.ReactElement> = {
  mic: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M11 3v11M11 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3zM6 11a5 5 0 0 0 10 0M11 18v1" />
    </svg>
  ),
  lights: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="11" cy="8" r="5" />
      <path d="M11 13v7M7 20h8" />
    </svg>
  ),
  video: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="3" y="6" width="16" height="10" />
      <circle cx="11" cy="11" r="2.5" />
      <path d="M6 6V4h4v2M12 6V4h4v2" />
    </svg>
  ),
  stage: (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M3 19V7l4-3h8l4 3v12M3 19h16M8 15h6M8 11h6" />
    </svg>
  ),
};

const contactIcon: Record<BookingContact["icon"], React.ReactElement> = {
  pin: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M10 17s6-5 6-10a6 6 0 0 0-12 0c0 5 6 10 6 10z" />
      <circle cx="10" cy="7" r="2" />
    </svg>
  ),
  envelope: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="5" width="14" height="10" />
      <path d="M11 9c1.5 0 1.5-2 0-2s-1.5 2 0 2zM13 13h2M4 5l5 5 5-5" />
    </svg>
  ),
  clock: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="10" cy="10" r="7" />
      <path d="M10 6v4l3 2" />
    </svg>
  ),
};

function btnClass(variant: "ink" | "outline" | "coral") {
  return `btn btn--${variant}`;
}

function venueNumClass(tone: Venue["numberTone"]) {
  if (tone === "coral") return "venue-num venue-num--coral";
  if (tone === "teal") return "venue-num venue-num--teal";
  return "venue-num";
}

export default function RentalsPage() {
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
  }, []);

  return (
    <main>
      <section className="page-hero-rentals">
        <div className="container">
          <div className="reveal">
            <div className="crumbs">
              דף הבית · <span>שכירויות והקלטות</span>
            </div>
            <h1>
              חללים שנבנו
              <br />
              <em>למוסיקה.</em>
            </h1>
          </div>
          <p className="lede reveal">
            האודיטוריום המרכזי, האולם הקאמרי וסטודיו ההקלטות — שלושה חללים
            אקוסטיים ברמה הגבוהה ביותר, פתוחים להשכרה למופעים, כנסים, הפקות
            וידאו והקלטות אולפן. תכנון אקוסטי של BBM Akustik.
          </p>
          <div className="stats-row reveal">
            {heroStats.map((s) => (
              <div className="stat" key={s.l}>
                <span className="n">{s.n}</span>
                <span className="l">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {venues.map((venue, idx) => {
        const flip = idx === 1;
        return (
          <section
            key={venue.id}
            id={venue.id}
            className={`venue${flip ? " venue--alt venue--flip" : ""}`}
          >
            <div className="container">
              <div className="venue-inner">
                <div className="venue-img-wrap reveal">
                  <span className={venueNumClass(venue.numberTone)}>
                    {venue.number}
                  </span>
                  <div
                    className="venue-img"
                    style={{ backgroundImage: `url('${venue.image}')` }}
                    role="img"
                    aria-label={venue.title}
                  />
                </div>
                <div className="venue-text reveal">
                  <div className="eyebrow">{venue.eyebrow}</div>
                  <h2>{venue.title}</h2>
                  <p className="body">{venue.body}</p>
                  <dl className="venue-specs">
                    {venue.specs.map((spec) => (
                      <div key={spec.dt}>
                        <dt>{spec.dt}</dt>
                        <dd>{spec.dd}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="venue-ctas">
                    {venue.ctas.map((cta) => (
                      <a
                        key={cta.label}
                        href={cta.href}
                        className={btnClass(cta.variant)}
                      >
                        {cta.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="services">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">שירותים נלווים</div>
              <h2>כל מה שצריך בהפקה אחת.</h2>
            </div>
            <p className="trail">
              צוות מלא של הנדסת קול, תאורה, ניהול במה ותיעוד וידאו — הכל בתוך
              המרכז, ללא צורך בספקי חוץ.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div className="service reveal" key={service.title}>
                <div className="ico">{serviceIcon[service.icon]}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process">
        <div className="container">
          <div className="sec-head reveal">
            <div>
              <div className="eyebrow">איך זה עובד</div>
              <h2>מבדיקת זמינות עד העלאת המסך.</h2>
            </div>
            <p className="trail">
              התהליך שלנו פשוט ושקוף — בין פנייה ראשונית לאירוע המוצלח שלכם
              עוברים ארבעה שלבים ברורים.
            </p>
          </div>
          <div className="process-steps">
            {processSteps.map((step) => (
              <div className="step reveal" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="clients">
        <div className="container">
          <h4>לקוחות והפקות אחרונות</h4>
          <div className="clients-logos">
            {clients.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="book-band" id="contact">
        <div className="container book-inner">
          <div className="reveal">
            <div className="eyebrow">הזמנות והצעות מחיר</div>
            <h2>
              מוכנים להעלות
              <br />
              את <em>ההפקה הבאה?</em>
            </h2>
            <p>
              בין אם זה קונצרט בודד, סדרת הקלטות או הפקה גדולה — הצוות שלנו
              יחזור אליכם תוך 48 שעות עם הצעת מחיר מותאמת, תאריכים זמינים וסיור
              במקום.
            </p>
            <div className="cta-row">
              <a
                href="mailto:rentals@raanana-music.co.il"
                className="btn btn--coral"
              >
                שליחת בקשה
              </a>
              <a href="tel:+97297610000" className="btn btn--outline">
                09-761-0000
              </a>
            </div>
          </div>
          <div className="book-contacts reveal">
            {bookingContacts.map((contact) => (
              <div className="book-contact" key={contact.title}>
                <div className="ico">{contactIcon[contact.icon]}</div>
                <div>
                  <h4>{contact.title}</h4>
                  <p>{contact.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
