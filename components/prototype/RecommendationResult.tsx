// The recommendation screen. Honest framing ("a strong place to begin"),
// one primary action, an explicit "why", and the parent-first facts: age fit,
// experience needed, what learning includes, and what happens next.
// Content is disclosed progressively (CSS-staggered) rather than all at once.

import Link from "next/link";
import CinematicMedia from "./CinematicMedia";
import JourneyProgress from "./JourneyProgress";
import {
  DISCOVER_PATH,
  EXPLORE_PATH,
  type JourneyAnswers,
} from "@/lib/prototype/journey";
import { recommend } from "@/lib/prototype/recommend";

export default function RecommendationResult({ answers }: { answers: JourneyAnswers }) {
  const { primary, alternatives } = recommend(answers);
  const t = primary.target;

  return (
    <section className="pt-result">
      <header className="pt-result-hero">
        <div className="pt-result-hero-body">
          <p className="pt-kicker">{t.kicker}</p>
          <p className="pt-result-frame">
            הנה נקודת פתיחה חזקה, על סמך מה שסיפרתם:
          </p>
          <h1 className="pt-result-title">{t.title}</h1>
          <p className="pt-result-tagline">{t.tagline}</p>

          <ul className="pt-why" aria-label="למה ההמלצה הזאת">
            {primary.reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <div className="pt-result-actions">
            <Link href={t.primaryAction.href} className="pt-cta">
              {t.primaryAction.label}
            </Link>
            <Link href={t.secondaryAction.href} className="pt-cta-quiet">
              {t.secondaryAction.label}
            </Link>
          </div>
        </div>
        <div className="pt-result-hero-media">
          <CinematicMedia img={t.img} alt={t.title} />
        </div>
      </header>

      <div className="pt-result-body">
        <div className="pt-result-facts">
          <div className="pt-fact">
            <h2 className="pt-fact-h">למי זה מתאים</h2>
            <p>{t.ages}</p>
            <p className="pt-fact-note">{t.experienceNote}</p>
          </div>
          <div className="pt-fact">
            <h2 className="pt-fact-h">מה הלמידה כוללת</h2>
            <ul>
              {t.includes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="pt-fact">
            <h2 className="pt-fact-h">לאן זה יכול להוביל</h2>
            <ul>
              {t.opportunities.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="pt-result-desc">{t.description}</p>

        {t.teachers.length > 0 || t.lead ? (
          <div className="pt-result-people">
            <h2 className="pt-fact-h">
              {t.teachers.length > 0 ? "מי מלמד כאן" : "מי מוביל"}
            </h2>
            {t.teachers.length > 0 ? (
              <ul className="pt-people">
                {t.teachers.slice(0, 4).map((p) => (
                  <li key={p.name} className="pt-person">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt="" loading="lazy" />
                    <span className="pt-person-name">{p.name}</span>
                    <span className="pt-person-role">{p.role}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{t.lead}</p>
            )}
          </div>
        ) : null}

        {t.auditionRequired ? (
          <p className="pt-audition">
            שימו לב: הקבלה למסלול הזה כוללת בחינת כניסה או ראיון אישי. נשמח
            ללוות אתכם בהכנה — <Link href="/contact">דברו איתנו</Link>.
          </p>
        ) : null}

        {alternatives.length > 0 ? (
          <div className="pt-alts">
            <h2 className="pt-fact-h">עוד כיוונים ששווה להכיר</h2>
            <div className="pt-alts-grid">
              {alternatives.map((alt) => (
                <Link key={alt.target.id} href={alt.target.exploreHref} className="pt-alt">
                  {alt.target.kicker !== alt.target.title ? (
                    <span className="pt-alt-kicker">{alt.target.kicker}</span>
                  ) : null}
                  <span className="pt-alt-title">{alt.target.title}</span>
                  <span className="pt-alt-note">{alt.reasons[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <footer className="pt-result-foot">
          <div className="pt-result-edit">
            <h2 className="pt-fact-h">התשובות שלכם</h2>
            <JourneyProgress answers={answers} current={null} />
            <p className="pt-result-edit-note">
              לחיצה על תשובה מחזירה אתכם לשאלה — ההמלצה תתעדכן בהתאם.
            </p>
          </div>
          <div className="pt-result-links">
            <Link href={DISCOVER_PATH}>להתחיל את השאלון מחדש</Link>
            <Link href={EXPLORE_PATH}>לעיין בכל המחלקות והתוכניות</Link>
            <Link href={t.exploreHref}>{t.exploreLabel} באתר הנוכחי</Link>
          </div>
        </footer>
      </div>
    </section>
  );
}
