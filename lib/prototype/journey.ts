// Guided-discovery journey model for the conservatory prototype.
//
// The whole flow is stateless on the client: every answer is encoded in the
// URL search params (who / goal / inst / exp), so the journey survives
// refreshes, is shareable, and back/edit are plain links. Question order is
// adaptive — questions that cannot affect the recommendation are skipped.

export type WhoKey =
  | "child57"
  | "child812"
  | "teen"
  | "adult"
  | "unsure"
  | "existing";

export type GoalKey =
  | "intro"
  | "instrument"
  | "voice"
  | "ensemble"
  | "excellence"
  | "bagrut"
  | "unsure";

export type InstKey =
  | "piano"
  | "strings"
  | "woodwind"
  | "brass"
  | "guitar"
  | "drums"
  | "help";

export type ExpKey = "none" | "beginner" | "some" | "advanced" | "unsure";

export type JourneyAnswers = {
  who?: WhoKey;
  goal?: GoalKey;
  inst?: InstKey;
  exp?: ExpKey;
};

export type QuestionId = keyof JourneyAnswers;

export type JourneyOption = {
  key: string;
  label: string;
  note?: string;
};

export type JourneyQuestion = {
  id: QuestionId;
  eyebrow: string;
  title: string;
  subtitle?: string;
  img: string;
  imgAlt: string;
  options: JourneyOption[];
};

export const WHO_QUESTION: JourneyQuestion = {
  id: "who",
  eyebrow: "שאלה ראשונה",
  title: "למי מחפשים מסלול מוסיקלי?",
  subtitle: "כמה שאלות קצרות — ונציע נקודת פתיחה שמתאימה בדיוק לכם.",
  img: "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=1400&q=80&auto=format&fit=crop",
  imgAlt: "ידיים צעירות על קלידי פסנתר",
  options: [
    { key: "child57", label: "ילד או ילדה · גיל 5–7", note: "צעדים ראשונים בעולם הצלילים" },
    { key: "child812", label: "ילד או ילדה · גיל 8–12", note: "הגיל הקלאסי להתחלת כלי נגינה" },
    { key: "teen", label: "נער או נערה · גיל 13–18", note: "העמקה, הרכבים ומסלולי מצוינות" },
    { key: "adult", label: "מבוגר · 18 ומעלה", note: "אף פעם לא מאוחר להתחיל או לחזור" },
    { key: "unsure", label: "עוד לא בטוחים", note: "נציע נקודת פתיחה רחבה" },
    { key: "existing", label: "אנחנו כבר תלמידים או הורים במרכז", note: "נדלג על השאלות — ישר למידע השימושי" },
  ],
};

export const GOAL_QUESTION: JourneyQuestion = {
  id: "goal",
  eyebrow: "שאלה שנייה",
  title: "מה מחפשים אצלנו?",
  subtitle: "בחרו את הכיוון הקרוב ביותר — תמיד אפשר לשנות.",
  img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1400&q=80&auto=format&fit=crop",
  imgAlt: "נגני תזמורת בזמן חזרה",
  options: [
    { key: "intro", label: "היכרות ראשונה עם מוסיקה", note: "בלי התחייבות לכלי מסוים" },
    { key: "instrument", label: "שיעורי נגינה אישיים בכלי", note: "מסלול אישי עם מורה מהסגל" },
    { key: "voice", label: "שירה ופיתוח קול", note: "קלאסי, פופ ושירה בקבוצה" },
    { key: "ensemble", label: "לנגן או לשיר ביחד", note: "הרכב, להקה, מקהלה או תזמורת" },
    { key: "excellence", label: "מסלול מתקדם או תוכנית מצוינות", note: "לנגנים עם בסיס קיים" },
    { key: "bagrut", label: "בגרות במוסיקה או הכנה מקצועית", note: "5 יח״ל, תיאוריה והפקה" },
    { key: "unsure", label: "עוד לא בטוחים", note: "נציע התחלה פתוחה" },
  ],
};

export const INST_QUESTION: JourneyQuestion = {
  id: "inst",
  eyebrow: "שאלה שלישית",
  title: "איזה צליל קורא לכם?",
  subtitle: "משפחות כלים רחבות — את ההתאמה המדויקת עושים יחד עם המורה.",
  img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1400&q=80&auto=format&fit=crop",
  imgAlt: "פסנתר כנף על במה מוארת",
  options: [
    { key: "piano", label: "פסנתר וקלידים" },
    { key: "strings", label: "כינור, צ׳לו וכלי קשת" },
    { key: "woodwind", label: "חליל, קלרינט וסקסופון", note: "כלי נשיפה מעץ" },
    { key: "brass", label: "חצוצרה וטרומבון", note: "כלי נשיפה ממתכת" },
    { key: "guitar", label: "גיטרה ובס" },
    { key: "drums", label: "תופים וכלי הקשה" },
    { key: "help", label: "צריכים עזרה לבחור", note: "נמליץ על נקודת פתיחה מוכחת" },
  ],
};

export const EXP_QUESTION: JourneyQuestion = {
  id: "exp",
  eyebrow: "שאלה אחרונה",
  title: "כמה ניסיון כבר יש?",
  subtitle: "זה עוזר לנו לכוון בין מסלולי התחלה למסלולי המשך.",
  img: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1400&q=80&auto=format&fit=crop",
  imgAlt: "כנרת מתאמנת באולם",
  options: [
    { key: "none", label: "אין ניסיון קודם", note: "מתחילים מאפס — וזה מצוין" },
    { key: "beginner", label: "מתחילים", note: "עד שנתיים של לימוד" },
    { key: "some", label: "כמה שנים של נגינה" },
    { key: "advanced", label: "רמה מתקדמת", note: "רפרטואר, תחרויות או הרכבים" },
    { key: "unsure", label: "לא בטוחים" },
  ],
};

const ALL_QUESTIONS: Record<QuestionId, JourneyQuestion> = {
  who: WHO_QUESTION,
  goal: GOAL_QUESTION,
  inst: INST_QUESTION,
  exp: EXP_QUESTION,
};

/** The ordered list of questions that apply, given what is answered so far. */
export function stepsFor(answers: JourneyAnswers): JourneyQuestion[] {
  const steps: JourneyQuestion[] = [WHO_QUESTION, GOAL_QUESTION];
  // Instrument family only matters when the goal is individual lessons.
  if (answers.goal === "instrument") steps.push(INST_QUESTION);
  // A "first introduction" implies no experience — asking would be noise.
  if (answers.goal !== "intro") steps.push(EXP_QUESTION);
  return steps;
}

export function nextUnanswered(answers: JourneyAnswers): JourneyQuestion | null {
  for (const q of stepsFor(answers)) {
    if (!answers[q.id]) return q;
  }
  return null;
}

export function isComplete(answers: JourneyAnswers): boolean {
  return nextUnanswered(answers) === null && !!answers.who && !!answers.goal;
}

const VALID: Record<QuestionId, ReadonlySet<string>> = {
  who: new Set(WHO_QUESTION.options.map((o) => o.key)),
  goal: new Set(GOAL_QUESTION.options.map((o) => o.key)),
  inst: new Set(INST_QUESTION.options.map((o) => o.key)),
  exp: new Set(EXP_QUESTION.options.map((o) => o.key)),
};

/** Parse and validate journey answers out of raw search params. */
export function answersFromParams(
  params: Record<string, string | string[] | undefined>,
): JourneyAnswers {
  const answers: JourneyAnswers = {};
  for (const id of Object.keys(ALL_QUESTIONS) as QuestionId[]) {
    const raw = params[id];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value && VALID[id].has(value)) {
      answers[id] = value as never;
    }
  }
  return answers;
}

export function paramsFromAnswers(answers: JourneyAnswers): string {
  const sp = new URLSearchParams();
  for (const id of Object.keys(ALL_QUESTIONS) as QuestionId[]) {
    const value = answers[id];
    if (value) sp.set(id, value);
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

export const DISCOVER_PATH = "/prototype/conservatory/discover";
export const RESULT_PATH = "/prototype/conservatory/result";
export const CURRENT_STUDENTS_PATH = "/prototype/conservatory/current-students";
export const EXPLORE_PATH = "/prototype/conservatory/explore";

/**
 * The href for choosing `option` on `question`: continues the flow, jumps to
 * the result when this answer completes it, or exits to the current-students
 * hub for existing families.
 */
export function hrefForAnswer(
  answers: JourneyAnswers,
  question: QuestionId,
  option: string,
): string {
  if (question === "who" && option === "existing") {
    return CURRENT_STUDENTS_PATH;
  }
  const next: JourneyAnswers = { ...answers, [question]: option };
  const qs = paramsFromAnswers(next);
  return isComplete(next) ? `${RESULT_PATH}${qs}` : `${DISCOVER_PATH}${qs}`;
}

/**
 * Editing an earlier answer keeps everything answered before it and clears it
 * and everything after — later answers may no longer apply.
 */
export function hrefForEditing(
  answers: JourneyAnswers,
  question: QuestionId,
): string {
  const order: QuestionId[] = ["who", "goal", "inst", "exp"];
  const cut = order.indexOf(question);
  const kept: JourneyAnswers = {};
  for (const id of order.slice(0, cut)) {
    if (answers[id]) kept[id] = answers[id] as never;
  }
  return `${DISCOVER_PATH}${paramsFromAnswers(kept)}`;
}

/** Href for the back control: clears the most recent answered question. */
export function hrefForBack(answers: JourneyAnswers): string {
  const answered = stepsFor(answers).filter((q) => answers[q.id]);
  const last = answered[answered.length - 1];
  if (!last) return "/prototype/conservatory";
  return hrefForEditing(answers, last.id);
}

export function answerLabel(id: QuestionId, key: string): string {
  return ALL_QUESTIONS[id].options.find((o) => o.key === key)?.label ?? key;
}
