// Progress rail for the guided flow: shows every applicable step, marks the
// current one, and turns answered steps into edit links (editing a step
// clears it and everything after it, since later questions may change).

import Link from "next/link";
import {
  answerLabel,
  hrefForEditing,
  stepsFor,
  type JourneyAnswers,
  type QuestionId,
} from "@/lib/prototype/journey";

const STEP_NAMES: Record<QuestionId, string> = {
  who: "למי",
  goal: "מה מחפשים",
  inst: "הכלי",
  exp: "ניסיון",
};

export default function JourneyProgress({
  answers,
  current,
}: {
  answers: JourneyAnswers;
  current: QuestionId | null;
}) {
  const steps = stepsFor(answers);
  return (
    <ol className="pt-progress" aria-label="התקדמות בשאלון">
      {steps.map((q, i) => {
        const value = answers[q.id];
        const state = value ? "done" : q.id === current ? "now" : "todo";
        return (
          <li key={q.id} className={`pt-progress-step is-${state}`}>
            <span className="pt-progress-dot" aria-hidden="true">
              {value ? "✓" : i + 1}
            </span>
            {value ? (
              <Link
                href={hrefForEditing(answers, q.id)}
                className="pt-progress-label"
                title="לחצו כדי לשנות את התשובה"
              >
                <span className="pt-progress-name">{STEP_NAMES[q.id]}</span>
                <span className="pt-progress-answer">{answerLabel(q.id, value)}</span>
              </Link>
            ) : (
              <span className="pt-progress-label" aria-current={state === "now" ? "step" : undefined}>
                <span className="pt-progress-name">{STEP_NAMES[q.id]}</span>
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
