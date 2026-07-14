// The guided discovery flow. Deliberately not a chatbot and not a form:
// one focused visual question per screen, large link-answers, contextual
// imagery and a visible progress rail. Because every answer is a plain link
// that rewrites the URL search params, the flow is refresh-safe, shareable,
// and fully keyboard-navigable with zero client state.

import Link from "next/link";
import { redirect } from "next/navigation";
import CinematicMedia from "./CinematicMedia";
import JourneyProgress from "./JourneyProgress";
import {
  hrefForAnswer,
  hrefForBack,
  isComplete,
  nextUnanswered,
  paramsFromAnswers,
  RESULT_PATH,
  type JourneyAnswers,
} from "@/lib/prototype/journey";

export default function DiscoveryJourney({ answers }: { answers: JourneyAnswers }) {
  if (isComplete(answers)) {
    redirect(`${RESULT_PATH}${paramsFromAnswers(answers)}`);
  }
  const question = nextUnanswered(answers)!;

  return (
    <section className="pt-journey">
      <aside className="pt-journey-media" aria-hidden="true">
        <CinematicMedia key={question.id} img={question.img} alt="" />
      </aside>

      <div className="pt-journey-panel" key={question.id}>
        <div className="pt-journey-top">
          <Link href={hrefForBack(answers)} className="pt-back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M5 3l5 4-5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            חזרה
          </Link>
          <JourneyProgress answers={answers} current={question.id} />
        </div>

        <p className="pt-journey-eyebrow">{question.eyebrow}</p>
        <h1 className="pt-journey-title">{question.title}</h1>
        {question.subtitle ? (
          <p className="pt-journey-sub">{question.subtitle}</p>
        ) : null}

        <nav className="pt-answers" aria-label={question.title}>
          {question.options.map((opt, i) => (
            <Link
              key={opt.key}
              href={hrefForAnswer(answers, question.id, opt.key)}
              className="pt-answer"
              style={{ "--pt-i": i } as React.CSSProperties}
            >
              <span className="pt-answer-label">{opt.label}</span>
              {opt.note ? <span className="pt-answer-note">{opt.note}</span> : null}
            </Link>
          ))}
        </nav>

        <p className="pt-journey-escape">
          לא חייבים לענות —{" "}
          <Link href="/prototype/conservatory/explore">אפשר גם לעיין בכל התוכן</Link>
        </p>
      </div>
    </section>
  );
}
