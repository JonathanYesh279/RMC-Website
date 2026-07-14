// Browse-all route: the full conservatory catalog, regrouped by visitor
// intent (learn / play together / go further / student resources) instead of
// the seven internal tabs. Everything links into the existing production
// page's deep-linkable sections, so no content is hidden or duplicated.

import Link from "next/link";
import {
  articles,
  departments,
  ensembles,
  programs,
  smallEnsembles,
} from "@/app/conservatory/conservatory-data";
import { DISCOVER_PATH } from "@/lib/prototype/journey";

const GROUPS = [
  { id: "learn", label: "ללמוד" },
  { id: "together", label: "מנגנים יחד" },
  { id: "further", label: "להתפתח הלאה" },
  { id: "resources", label: "משאבים לתלמידים" },
];

const instrumentDepartments = departments.filter((d) => d.cat === "teal");
const voiceAndPerformance = departments.filter((d) => d.cat === "amber");
const theoryAndResearch = departments.filter((d) => d.cat === "coral");

export default function ExploreConservatory() {
  return (
    <section className="pt-explore">
      <header className="pt-explore-head">
        <nav className="pt-crumbs" aria-label="ניווט">
          <Link href="/prototype">הבמה הראשית</Link>
          <span aria-hidden="true">·</span>
          <Link href="/prototype/conservatory">קונסרבטוריון</Link>
          <span aria-hidden="true">·</span>
          <span>כל התוכן</span>
        </nav>
        <h1 className="pt-explore-title">כל מה שקורה בקונסרבטוריון</h1>
        <p className="pt-explore-sub">
          מסודר לפי מה שאתם מחפשים — לא לפי המבנה הארגוני שלנו. כל פריט מוביל
          למידע המלא.
        </p>
        <nav className="pt-explore-nav" aria-label="קבוצות תוכן">
          {GROUPS.map((g) => (
            <a key={g.id} href={`#pt-${g.id}`}>
              {g.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="pt-explore-groups">
        <section id="pt-learn" className="pt-group">
          <h2 className="pt-group-title">ללמוד</h2>
          <p className="pt-group-sub">
            שיעורים אישיים בכלי, שירה ותורת המוסיקה — מהצליל הראשון.
          </p>
          <ul className="pt-items">
            {instrumentDepartments.map((d) => (
              <li key={d.key}>
                <Link href="/conservatory#departments" className="pt-item">
                  <span className="pt-item-title">{d.name}</span>
                  <span className="pt-item-desc">{d.desc}</span>
                  <span className="pt-item-meta">{d.count}</span>
                </Link>
              </li>
            ))}
            {voiceAndPerformance.map((d) => (
              <li key={d.key}>
                <Link href="/conservatory#departments" className="pt-item">
                  <span className="pt-item-title">{d.name}</span>
                  <span className="pt-item-desc">{d.desc}</span>
                  <span className="pt-item-meta">{d.count}</span>
                </Link>
              </li>
            ))}
            {theoryAndResearch.map((d) => (
              <li key={d.key}>
                <Link href="/conservatory#departments" className="pt-item">
                  <span className="pt-item-title">{d.name}</span>
                  <span className="pt-item-desc">{d.desc}</span>
                  <span className="pt-item-meta">{d.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="pt-together" className="pt-group">
          <h2 className="pt-group-title">מנגנים יחד</h2>
          <p className="pt-group-sub">
            תזמורות, מקהלות, להקות והרכבים — לכל גיל ולכל רמה, כולל מבוגרים.
          </p>
          <ul className="pt-items">
            {ensembles.map((e) => (
              <li key={e.name}>
                <Link href="/conservatory#ensembles" className="pt-item">
                  <span className="pt-item-title">{e.name}</span>
                  <span className="pt-item-desc">
                    {e.role}: {e.conductor}
                  </span>
                  <span className="pt-item-meta">{e.schedule}</span>
                </Link>
              </li>
            ))}
            {smallEnsembles.map((e) => (
              <li key={e.cat}>
                <Link href="/conservatory#groups" className="pt-item">
                  <span className="pt-item-title">{e.name}</span>
                  <span className="pt-item-desc">{e.level}</span>
                  <span className="pt-item-meta">{e.lead}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="pt-further" className="pt-group">
          <h2 className="pt-group-title">להתפתח הלאה</h2>
          <p className="pt-group-sub">
            תוכניות מצוינות ומחוננים, מגמות, בגרות, תחרויות ופסטיבלים.
          </p>
          <ul className="pt-items">
            {programs.map((p) => (
              <li key={p.key}>
                <Link href="/conservatory#programs" className="pt-item">
                  <span className="pt-item-title">{p.title}</span>
                  <span className="pt-item-desc">{p.subtitle}</span>
                  <span className="pt-item-meta">{p.kicker}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="pt-resources" className="pt-group">
          <h2 className="pt-group-title">משאבים לתלמידים ולהורים</h2>
          <p className="pt-group-sub">כל השירותים השוטפים במקום אחד.</p>
          <ul className="pt-items">
            <li>
              <Link href="/conservatory#forms" className="pt-item">
                <span className="pt-item-title">טפסים ומסמכי רישום</span>
                <span className="pt-item-desc">רישום למחלקות ולתוכניות המיוחדות</span>
              </Link>
            </li>
            <li>
              <Link href="/updates" className="pt-item">
                <span className="pt-item-title">עדכונים והודעות</span>
                <span className="pt-item-desc">שעות פעילות, חגים והודעות שוטפות</span>
              </Link>
            </li>
            <li>
              <Link href="/conservatory#leadership" className="pt-item">
                <span className="pt-item-title">הנהלה, מינהל ונציגות הורים</span>
                <span className="pt-item-desc">מי מוביל את המרכז ואיך יוצרים קשר</span>
              </Link>
            </li>
            {articles.slice(0, 3).map((a) => (
              <li key={a.title}>
                <Link href="/conservatory#enrichment" className="pt-item">
                  <span className="pt-item-title">{a.title}</span>
                  <span className="pt-item-desc">{a.excerpt}</span>
                  <span className="pt-item-meta">
                    {a.tag} · {a.read}
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/conservatory#enrichment" className="pt-item">
                <span className="pt-item-title">כל מאמרי ההעשרה</span>
                <span className="pt-item-desc">מדריכים להורים, פרקטיקה והיסטוריה</span>
              </Link>
            </li>
          </ul>
        </section>
      </div>

      <footer className="pt-explore-foot">
        <p>
          מרגישים אבודים בשפע?{" "}
          <Link href={DISCOVER_PATH}>ענו על 3–4 שאלות ונכוון אתכם</Link>
        </p>
      </footer>
    </section>
  );
}
