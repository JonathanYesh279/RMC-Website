import type { Metadata } from "next";
import {
  MUNICIPALITY_TICKETS_URL,
  MUNICIPALITY_TICKETS_LABEL,
} from "@/lib/ticketing";

export const metadata: Metadata = {
  title: "כרטיסים · מרכז המוסיקה רעננה",
  description:
    "רכישת כרטיסים למופעי מרכז המוסיקה רעננה דרך מערכת הכרטיסים של עיריית רעננה.",
};

const ExternalIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 18 18"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 3H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3" />
    <path d="M11 3h4v4M15 3l-7 7" />
  </svg>
);

export default function TicketsPage() {
  return (
    <div className="tickets-page">
      <section className="container tickets-intro">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          {MUNICIPALITY_TICKETS_LABEL}
        </div>
        <h1>רכישת כרטיסים</h1>
        <p>
          רכישת הכרטיסים והתשלום מתבצעים במערכת הכרטיסים של עיריית רעננה. ניתן
          לעיין בלוח המופעים המלא כאן באתר, או לפתוח אותו ישירות באתר העירייה —
          שם מתבצע התשלום באופן מאובטח.
        </p>
        <a
          className="btn btn--coral"
          href={MUNICIPALITY_TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          פתיחת לוח המופעים באתר העירייה
          <ExternalIcon />
        </a>
      </section>

      <section className="container">
        <div className="tickets-frame-wrap">
          <iframe
            className="tickets-frame"
            src={MUNICIPALITY_TICKETS_URL}
            title={MUNICIPALITY_TICKETS_LABEL}
            loading="lazy"
          />
        </div>
        <p className="tickets-note">
          אם לוח המופעים אינו נטען כראוי, ניתן{" "}
          <a href={MUNICIPALITY_TICKETS_URL} target="_blank" rel="noopener noreferrer">
            לפתוח אותו ישירות באתר העירייה
          </a>
          .
        </p>
      </section>
    </div>
  );
}
