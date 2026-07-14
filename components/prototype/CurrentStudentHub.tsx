// Task-first utility hub for current students and parents. Deliberately
// plain and fast: "what do you need today?" answered with direct links and
// the real registration forms inline (fetched from Sanity by the page).

import Link from "next/link";
import type { FormDoc } from "@/sanity/queries";

const TASKS = [
  {
    title: "עדכונים והודעות",
    desc: "שעות פעילות, חגים והודעות שוטפות",
    href: "/updates",
  },
  {
    title: "הרכבים ותזמורות",
    desc: "לוחות חזרות ומסגרות הנגינה בצוותא",
    href: "/conservatory#ensembles",
  },
  {
    title: "תוכניות מיוחדות",
    desc: "תלמים, מגמות, קשת ערן והפקה מוסיקלית",
    href: "/conservatory#programs",
  },
  {
    title: "אנשי קשר",
    desc: "מזכירות, הנהלה ונציגות ההורים",
    href: "/contact",
  },
  {
    title: "לוח קונצרטים",
    desc: "הופעות תלמידים והרכבי המרכז",
    href: "/concerts",
  },
];

export default function CurrentStudentHub({ forms }: { forms: FormDoc[] }) {
  return (
    <section className="pt-hub">
      <nav className="pt-crumbs" aria-label="ניווט">
        <Link href="/prototype">הבמה הראשית</Link>
        <span aria-hidden="true">·</span>
        <Link href="/prototype/conservatory">קונסרבטוריון</Link>
        <span aria-hidden="true">·</span>
        <span>תלמידים והורים</span>
      </nav>

      <h1 className="pt-hub-title">מה אתם צריכים היום?</h1>
      <p className="pt-hub-sub">
        בלי סיורים מיותרים — הדברים שהורים ותלמידים מחפשים הכי הרבה, במקום אחד.
      </p>

      <div className="pt-hub-grid">
        <div className="pt-hub-forms">
          <h2 className="pt-hub-h">טפסים ומסמכי רישום</h2>
          {forms.length > 0 ? (
            <ul className="pt-forms">
              {forms.slice(0, 6).map((f) => (
                <li key={f._id}>
                  <a href={f.fileUrl} target="_blank" rel="noopener noreferrer">
                    <span className="pt-form-title">{f.title}</span>
                    {f.description ? (
                      <span className="pt-form-desc">{f.description}</span>
                    ) : null}
                    <span className="pt-form-dl">להורדה ↓</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="pt-hub-empty">
              הטפסים זמינים בעמוד הקונסרבטוריון —{" "}
              <Link href="/conservatory#forms">למעבר לטפסים</Link>.
            </p>
          )}
          {forms.length > 6 ? (
            <Link className="pt-hub-more" href="/conservatory#forms">
              לכל הטפסים ({forms.length})
            </Link>
          ) : null}
        </div>

        <nav className="pt-tasks" aria-label="פעולות נפוצות">
          {TASKS.map((task) => (
            <Link key={task.href} href={task.href} className="pt-task">
              <span className="pt-task-title">{task.title}</span>
              <span className="pt-task-desc">{task.desc}</span>
            </Link>
          ))}
          <div className="pt-task pt-task--soon" aria-disabled="true">
            <span className="pt-task-title">מערכת התלמידים</span>
            <span className="pt-task-desc">
              צפייה בשיעורים ובנוכחות — בקרוב בגרסה הבאה
            </span>
            <span className="pt-task-badge">בקרוב</span>
          </div>
        </nav>
      </div>

      <p className="pt-hub-foot">
        חדשים במרכז?{" "}
        <Link href="/prototype/conservatory/discover">
          מצאו את המסלול שמתאים לכם בכמה שאלות
        </Link>
      </p>
    </section>
  );
}
