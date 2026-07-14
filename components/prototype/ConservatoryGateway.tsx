// The conservatory gateway: one question, three doors. Replaces the
// seven-tab landing with a guidance-first fork — guided discovery (primary),
// the current-students utility hub, and a browse-everything route.

import Link from "next/link";
import CinematicMedia from "./CinematicMedia";
import {
  CURRENT_STUDENTS_PATH,
  DISCOVER_PATH,
  EXPLORE_PATH,
} from "@/lib/prototype/journey";

export default function ConservatoryGateway() {
  return (
    <section className="pt-gateway">
      <div className="pt-gateway-media">
        <CinematicMedia
          img="https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=1800&q=80&auto=format&fit=crop"
          alt="מורה ותלמידה ליד פסנתר בשיעור נגינה"
        />
      </div>

      <div className="pt-gateway-body">
        <nav className="pt-crumbs" aria-label="ניווט">
          <Link href="/prototype">הבמה הראשית</Link>
          <span aria-hidden="true">·</span>
          <span>קונסרבטוריון</span>
        </nav>

        <h1 className="pt-gateway-title">
          בואו נמצא את המסלול
          <em> המוסיקלי שמתאים לכם.</em>
        </h1>
        <p className="pt-gateway-sub">
          מעל 1,300 תלמידים כבר מנגנים כאן. במקום לחפש בין מחלקות ותוכניות —
          ספרו לנו מי אתם, ונוביל אתכם לנקודת ההתחלה הנכונה.
        </p>

        <div className="pt-doors">
          <Link href={DISCOVER_PATH} className="pt-door pt-door--primary">
            <span className="pt-door-kicker">הדרך המהירה · 3–4 שאלות</span>
            <span className="pt-door-title">למצוא מסלול שמתאים לי</span>
            <span className="pt-door-desc">
              עונים על כמה שאלות קצרות ומקבלים המלצה אישית — עם הסבר למה דווקא היא.
            </span>
            <span className="pt-door-cta">מתחילים</span>
          </Link>

          <Link href={CURRENT_STUDENTS_PATH} className="pt-door">
            <span className="pt-door-kicker">כבר אצלנו?</span>
            <span className="pt-door-title">אני תלמיד/ה או הורה במרכז</span>
            <span className="pt-door-desc">
              טפסים, עדכונים, הרכבים ואנשי קשר — בלי שאלות מיותרות.
            </span>
            <span className="pt-door-cta">למידע השימושי</span>
          </Link>

          <Link href={EXPLORE_PATH} className="pt-door">
            <span className="pt-door-kicker">מעדיפים להתרשם לבד?</span>
            <span className="pt-door-title">לעיין בכל המחלקות והתוכניות</span>
            <span className="pt-door-desc">
              כל התוכן המלא — מחלקות, הרכבים, תוכניות מצוינות ומשאבים — מסודר לפי מה שמחפשים.
            </span>
            <span className="pt-door-cta">לעיון חופשי</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
