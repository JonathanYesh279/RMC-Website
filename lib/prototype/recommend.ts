// Deterministic recommendation rules for the conservatory prototype.
//
// No LLM, no randomness: a small typed rules table is filtered by hard
// constraints (age range, goal, instrument family, experience) and the
// survivors are scored by how specifically they match. Content comes from the
// existing conservatory dataset so nothing here invents programs, teachers or
// claims that the site doesn't already make.

import {
  departments,
  deptDetails,
  deptTeachers,
  programs,
  smallEnsembles,
  ensembles,
  type DeptTeacher,
} from "@/app/conservatory/conservatory-data";
import type { ExpKey, GoalKey, InstKey, JourneyAnswers, WhoKey } from "./journey";

export type RecommendationTarget = {
  id: string;
  kind: "department" | "program" | "ensemble" | "orchestra";
  kicker: string;
  title: string;
  tagline: string;
  description: string;
  img: string;
  ages: string;
  experienceNote: string;
  includes: string[];
  opportunities: string[];
  teachers: DeptTeacher[];
  lead: string | null;
  auditionRequired: boolean;
  primaryAction: { label: string; href: string };
  secondaryAction: { label: string; href: string };
  exploreHref: string;
  exploreLabel: string;
};

export type Rule = {
  target: string;
  goals: GoalKey[];
  minimumAge?: number;
  maximumAge?: number;
  experienceLevels?: ExpKey[];
  instrumentFamily?: InstKey[];
  weight: number;
};

export type Recommendation = {
  target: RecommendationTarget;
  reasons: string[];
};

export type RecommendationSet = {
  primary: Recommendation;
  alternatives: Recommendation[];
};

// ---------------------------------------------------------------------------
// Targets, derived from the existing conservatory dataset
// ---------------------------------------------------------------------------

const dept = (key: string) => {
  const d = departments.find((x) => x.key === key);
  if (!d) throw new Error(`Unknown department: ${key}`);
  return d;
};
const detail = (key: string) => deptDetails[key];
const program = (key: string) => {
  const p = programs.find((x) => x.key === key);
  if (!p) throw new Error(`Unknown program: ${key}`);
  return p;
};
const smallEns = (cat: string) => {
  const e = smallEnsembles.find((x) => x.cat === cat);
  if (!e) throw new Error(`Unknown ensemble: ${cat}`);
  return e;
};

const REGISTER = { label: "להתחלת הרשמה", href: "/conservatory#forms" };
const TALK = { label: "לשיחת היכרות", href: "/contact" };

function departmentTarget(
  key: string,
  extras: {
    tagline: string;
    experienceNote: string;
    includes: string[];
    opportunities: string[];
  },
): RecommendationTarget {
  const d = dept(key);
  const det = detail(key);
  return {
    id: `dept-${key}`,
    kind: "department",
    kicker: "מחלקה בקונסרבטוריון",
    title: `מחלקת ה${d.name}`,
    tagline: extras.tagline,
    description: d.desc,
    img: d.img,
    ages: `מגיל ${det.ages}`,
    experienceNote: extras.experienceNote,
    includes: extras.includes,
    opportunities: det.highlights,
    teachers: deptTeachers[key] ?? [],
    lead: det.lead,
    auditionRequired: false,
    primaryAction: REGISTER,
    secondaryAction: TALK,
    exploreHref: "/conservatory#departments",
    exploreLabel: "לכל המחלקות",
  };
}

function programTarget(
  key: string,
  extras: {
    ages: string;
    experienceNote: string;
    includes: string[];
    opportunities: string[];
    auditionRequired: boolean;
  },
): RecommendationTarget {
  const p = program(key);
  return {
    id: `prog-${key}`,
    kind: "program",
    kicker: p.kicker,
    title: p.title,
    tagline: p.subtitle,
    description: p.lede,
    img: p.img,
    ages: extras.ages,
    experienceNote: extras.experienceNote,
    includes: extras.includes,
    opportunities: extras.opportunities,
    teachers: [],
    lead: null,
    auditionRequired: extras.auditionRequired,
    primaryAction: p.cta
      ? { label: p.cta, href: "/conservatory#forms" }
      : REGISTER,
    secondaryAction: TALK,
    exploreHref: "/conservatory#programs",
    exploreLabel: "לכל התוכניות הייחודיות",
  };
}

function ensembleTarget(
  cat: string,
  extras: {
    ages: string;
    experienceNote: string;
    includes: string[];
    opportunities: string[];
    auditionRequired: boolean;
  },
): RecommendationTarget {
  const e = smallEns(cat);
  return {
    id: `ens-${cat}`,
    kind: "ensemble",
    kicker: e.catLabel,
    title: e.name,
    tagline: e.level,
    description: e.desc,
    img: e.img,
    ages: extras.ages,
    experienceNote: extras.experienceNote,
    includes: extras.includes,
    opportunities: extras.opportunities,
    teachers: [],
    lead: e.lead,
    auditionRequired: extras.auditionRequired,
    primaryAction: TALK,
    secondaryAction: REGISTER,
    exploreHref: "/conservatory#groups",
    exploreLabel: "לכל ההרכבים",
  };
}

const stringsOrchestra = ensembles[2];
const youthOrchestra = ensembles[1];
const choir = ensembles[3];

const TARGETS: Record<string, RecommendationTarget> = {};
const ALL_TARGETS: RecommendationTarget[] = [
  departmentTarget("piano", {
    tagline: "נקודת פתיחה מוכחת לנגנים צעירים",
    experienceNote: "לא נדרש ניסיון קודם — המורים בונים את הבסיס מהצליל הראשון.",
    includes: [
      "שיעור אישי שבועי עם מורה מהסגל",
      "תורת המוסיקה ופיתוח שמיעה בקבוצה",
      "הופעות כיתה ורסיטלים לאורך השנה",
    ],
    opportunities: detail("piano").highlights,
  }),
  departmentTarget("strings", {
    tagline: "הדרך אל התזמורות והקאמרי",
    experienceNote: "מתחילים מגיל 6 — הכלי מותאם לגוף ולגיל.",
    includes: [
      "שיעור אישי שבועי עם מורה מהסגל",
      "תורת המוסיקה ופיתוח שמיעה בקבוצה",
      "שילוב הדרגתי באנסמבלים ובתזמורות",
    ],
    opportunities: detail("strings").highlights,
  }),
  departmentTarget("woodwind", {
    tagline: "מהחליל הראשון ועד הסימפונית",
    experienceNote: "מתחילים מגיל 7, בהתאם למבנה הנשימה והגוף.",
    includes: [
      "שיעור אישי שבועי עם מורה מהסגל",
      "תורת המוסיקה ופיתוח שמיעה בקבוצה",
      "אנסמבל כלי נשיפה למתקדמים",
    ],
    opportunities: detail("woodwind").highlights,
  }),
  departmentTarget("brass", {
    tagline: "הבסיס לתזמורות הרוח",
    experienceNote: "מתחילים מגיל 9 — כשהנשימה והשפתיים בשלות לכלי.",
    includes: [
      "שיעור אישי שבועי עם מורה מהסגל",
      "תורת המוסיקה ופיתוח שמיעה בקבוצה",
      "שילוב בתזמורת הרוח ובאירועי העיר",
    ],
    opportunities: detail("brass").highlights,
  }),
  departmentTarget("guitar", {
    tagline: "קלאסי, חשמלי ובס — לפי הכיוון שלכם",
    experienceNote: "מתחילים מגיל 6, בגיטרה מותאמת גודל.",
    includes: [
      "שיעור אישי שבועי עם מורה מהסגל",
      "תורת המוסיקה ופיתוח שמיעה בקבוצה",
      "תזמורת גיטרות והרכבי רוק וג׳אז",
    ],
    opportunities: detail("guitar").highlights,
  }),
  departmentTarget("drums", {
    tagline: "קצב, גרוב וכלי הקשה קלאסיים",
    experienceNote: "מתחילים מגיל 7 — סט תופים, מרימבה וכלי הקשה.",
    includes: [
      "שיעור אישי שבועי בסטודיו תופים מבודד",
      "תורת המוסיקה ופיתוח שמיעה בקבוצה",
      "דרך אל ״דרם ליין״ — הרכב המתופפים",
    ],
    opportunities: detail("drums").highlights,
  }),
  departmentTarget("vocal", {
    tagline: "פיתוח קול — קלאסי, פופ ושירה יחד",
    experienceNote: "פתוח לכל הגילאים וללא ניסיון קודם.",
    includes: [
      "שיעור פיתוח קול אישי",
      "תורת המוסיקה ופיתוח שמיעה",
      "הכנה למקהלות ולהרכב הווקאלי",
    ],
    opportunities: detail("vocal").highlights,
  }),
  {
    ...departmentTarget("theory", {
      tagline: "מסלול הבגרות במוסיקה — 5 יח״ל",
      experienceNote: "מיועד לתלמידי תיכון עם רקע מוסיקלי פעיל.",
      includes: [
        "סולפג׳, הרמוניה וניתוח יצירות",
        "ליווי אישי של מוביל מסלול הבגרות",
        "רסיטל ופרויקט גמר",
      ],
      opportunities: detail("theory").highlights,
    }),
    id: "dept-bagrut",
    title: "מסלול בגרות במוסיקה",
    ages: "כיתות ט׳–י״ב",
  },
  programTarget("talmim", {
    ages: "כיתות י׳–י״ב",
    experienceNote: "לנגנים מצטיינים עם שנות נגינה מאחוריהם — הקבלה בבחינות כניסה.",
    includes: [
      "מסלול קלאסי בניהול גיא פורת או מסלול ג׳אז בניהול עמית פרידמן",
      "שעות אימון מובנות, כיתות אמן וניתוח יצירות",
      "רסיטל בגרות בהיקף 5 יח״ל",
    ],
    opportunities: [
      "הופעה כסולן עם תזמורת מקצועית",
      "סיור שנתי לבירת תרבות בחו״ל",
      "השתתפות בתחרויות ופסטיבלים",
    ],
    auditionRequired: true,
  }),
  programTarget("mechoname", {
    ages: "גילאי 13–19",
    experienceNote: "למוסיקאים צעירים ברמה גבוהה השואפים לקריירה סולנית.",
    includes: [
      "ליווי אישי לפי תוכנית עבודה מסודרת",
      "קונצרטים בליווי תזמורת מקצועית",
      "הכנה לכיתות אמן ולתחרויות בינלאומיות",
    ],
    opportunities: [
      "רסיטלים שנתיים לסולנים המצטיינים",
      "עד 12 נגנים נבחרים מכל הארץ",
    ],
    auditionRequired: true,
  }),
  programTarget("rimon", {
    ages: "חטיבת ביניים",
    experienceNote: "לנגנים מנוסים עם רקע מוסיקלי מוכח — קבלה בבחינה וראיון.",
    includes: [
      "תוכנית המותאמת לצרכי התלמיד",
      "ליווי מוסיקאים בכירים",
      "התמחות בביצוע מוסיקלי",
    ],
    opportunities: ["שיתוף פעולה עם הצוות החינוכי", "הופעות לאורך השנה"],
    auditionRequired: true,
  }),
  programTarget("hafaka", {
    ages: "גילאי 16 ומעלה",
    experienceNote: "הקבלה בראיון אישי — מתאים גם ליוצרים בלי רקע פורמלי בתיאוריה.",
    includes: [
      "אולפן מקצועי ואולפן ביתי — מחשב, פלאגינים ומקלדת שליטה",
      "הקלטות חיות עם נגני המרכז",
      "ליווי של מפיק מוסיקלי מקצועי",
    ],
    opportunities: ["הפקת יצירות מקוריות", "מכינה בתורת המוסיקה למי שזקוק"],
    auditionRequired: false,
  }),
  ensembleTarget("adults", {
    ages: "גילאי 18 ומעלה",
    experienceNote: "לחובבי מוסיקה ונגנים עם רקע קודם — לא נדרשת רמה מקצועית.",
    includes: [
      "חזרה שבועית קבועה בהרכב",
      "רפרטואר מגוון המותאם להרכב",
      "ליווי מוסיקלי של רז קרוגמן והדס טריינין",
    ],
    opportunities: ["מופעי סיום עונה", "נגינה בצוותא בקהילה מוסיקלית"],
    auditionRequired: false,
  }),
  ensembleTarget("workshop", {
    ages: "נגנים צעירים · אחרי שנת נגינה",
    experienceNote: "ההצטרפות בהמלצת מורה הכלי — ההתנסות הראשונה בנגינה בצוותא.",
    includes: [
      "הקשבה והבנת קטע כתוב",
      "נגינת סולו ושמירה על מבנה",
      "שתי קבוצות לפי רמה",
    ],
    opportunities: ["הופעות בערבי הקונסרבטוריון"],
    auditionRequired: false,
  }),
  ensembleTarget("jazz", {
    ages: "גילאי 16–18",
    experienceNote: "ממתחילים באלתור ועד הרכבים מתקדמים.",
    includes: [
      "אלתור והרמוניות ג׳אז",
      "רפרטואר מ־Real Book עד ג׳אז עכשווי",
      "ארבעה הרכבים לפי רמה",
    ],
    opportunities: ["הופעות בערבי הגמר ובאירועי העיר"],
    auditionRequired: false,
  }),
  ensembleTarget("rock", {
    ages: "לפי גיל ורמה",
    experienceNote: "נדרש בסיס בכלי — הלהקות נבנות לפי גיל ורמת נגינה.",
    includes: [
      "רוק קלאסי, פאנק, פופ ואלטרנטיב",
      "כתיבה ואלתור משותפים",
      "שש להקות פעילות",
    ],
    opportunities: ["נגינה חיה והופעות סיום"],
    auditionRequired: false,
  }),
  ensembleTarget("vocal", {
    ages: "כיתות ח׳–י״ב",
    experienceNote: "ללא ניסיון קודם נדרש — לומדים לשיר בקולות מהשיעור הראשון.",
    includes: [
      "שירה בקולות וג׳אז ווקאלי",
      "שירה מתווים ועבודת במה",
      "מוסיקה ישראלית וקלה",
    ],
    opportunities: ["הופעות עם הרכבי המרכז"],
    auditionRequired: false,
  }),
  {
    id: "orch-strings",
    kind: "orchestra",
    kicker: "תזמורת",
    title: stringsOrchestra.name,
    tagline: stringsOrchestra.badgeText,
    description: stringsOrchestra.desc,
    img: stringsOrchestra.img,
    ages: "גילאי 9–12",
    experienceNote: "מתקבלים לאחר כשלוש שנות למידה, לרוב מתוך אנסמבלי כלי הקשת.",
    includes: [
      stringsOrchestra.schedule,
      "שתי תוכניות מופע בשנה",
      "רפרטואר קלאסי, בארוק, רגטיים וקאונטרי",
    ],
    opportunities: ["הופעות ברעננה ומחוצה לה"],
    teachers: [],
    lead: stringsOrchestra.conductor,
    auditionRequired: true,
    primaryAction: TALK,
    secondaryAction: REGISTER,
    exploreHref: "/conservatory#ensembles",
    exploreLabel: "לכל התזמורות והמקהלות",
  },
  {
    id: "orch-youth",
    kind: "orchestra",
    kicker: "תזמורת",
    title: youthOrchestra.name,
    tagline: youthOrchestra.badgeText,
    description: youthOrchestra.desc,
    img: youthOrchestra.img,
    ages: "בני נוער",
    experienceNote: "לנגנים מנוסים — ההצטרפות בתיאום עם המנצח ג׳פרי הווארד.",
    includes: [
      youthOrchestra.schedule,
      "רפרטואר תזמורתי מלא",
      "הופעות בארץ ובחו״ל",
    ],
    opportunities: [
      "הופעה משותפת עם הפילהרמונית הישראלית (2007)",
      "מקום שלישי בתחרות וינה לתזמורות נוער",
    ],
    teachers: [],
    lead: youthOrchestra.conductor,
    auditionRequired: true,
    primaryAction: TALK,
    secondaryAction: REGISTER,
    exploreHref: "/conservatory#ensembles",
    exploreLabel: "לכל התזמורות והמקהלות",
  },
  {
    id: "ens-choir",
    kind: "ensemble",
    kicker: "מקהלה",
    title: choir.name,
    tagline: choir.badgeText,
    description: choir.desc,
    img: choir.img,
    ages: "שתי קבוצות גיל: 5–8 ו־8–14",
    experienceNote: "לא נדרש ניסיון — הדגש על אהבת שירה ושימוש נכון בקול.",
    includes: [
      choir.schedule,
      "רפרטואר מותאם גיל: אופרה, מחזמר וקטעים מקוריים",
      "עבודה קולית נכונה מהיסוד",
    ],
    opportunities: ["הופעות עם הרכבי המרכז ובאירועי העיר"],
    teachers: [],
    lead: choir.conductor,
    auditionRequired: false,
    primaryAction: REGISTER,
    secondaryAction: TALK,
    exploreHref: "/conservatory#ensembles",
    exploreLabel: "לכל התזמורות והמקהלות",
  },
];
for (const t of ALL_TARGETS) {
  TARGETS[t.id] = t;
}

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

const RULES: Rule[] = [
  // --- Individual instrument lessons, by family ---
  { target: "dept-piano", goals: ["instrument"], instrumentFamily: ["piano", "help"], weight: 10 },
  { target: "dept-strings", goals: ["instrument"], instrumentFamily: ["strings"], minimumAge: 6, weight: 10 },
  { target: "dept-woodwind", goals: ["instrument"], instrumentFamily: ["woodwind"], minimumAge: 7, weight: 10 },
  { target: "dept-brass", goals: ["instrument"], instrumentFamily: ["brass"], minimumAge: 9, weight: 10 },
  { target: "dept-guitar", goals: ["instrument"], instrumentFamily: ["guitar"], minimumAge: 6, weight: 10 },
  { target: "dept-drums", goals: ["instrument"], instrumentFamily: ["drums"], minimumAge: 7, weight: 10 },
  // "Help me choose" — piano is the proven starting point; strings close behind.
  { target: "dept-strings", goals: ["instrument"], instrumentFamily: ["help"], minimumAge: 6, weight: 6 },
  // Complementary paths alongside lessons.
  { target: "ens-workshop", goals: ["instrument"], maximumAge: 13, weight: 3 },
  { target: "ens-choir", goals: ["instrument"], minimumAge: 5, maximumAge: 12, weight: 2 },
  { target: "ens-rock", goals: ["instrument"], instrumentFamily: ["guitar", "drums"], minimumAge: 10, maximumAge: 18, experienceLevels: ["beginner", "some", "advanced"], weight: 4 },

  // --- Singing and voice ---
  { target: "dept-vocal", goals: ["voice"], weight: 10 },
  { target: "ens-vocal", goals: ["voice"], minimumAge: 13, maximumAge: 18, weight: 7 },
  { target: "ens-choir", goals: ["voice"], minimumAge: 5, maximumAge: 14, weight: 7 },

  // --- First introduction / not sure ---
  { target: "dept-piano", goals: ["intro", "unsure"], weight: 6 },
  { target: "ens-choir", goals: ["intro", "unsure"], minimumAge: 5, maximumAge: 14, weight: 5 },
  { target: "dept-vocal", goals: ["intro", "unsure"], minimumAge: 13, weight: 4 },
  { target: "dept-guitar", goals: ["intro", "unsure"], minimumAge: 13, weight: 3 },

  // --- Playing / singing together ---
  { target: "ens-adults", goals: ["ensemble"], minimumAge: 18, weight: 12 },
  { target: "orch-strings", goals: ["ensemble"], minimumAge: 9, maximumAge: 12, experienceLevels: ["some", "advanced"], weight: 9 },
  { target: "orch-youth", goals: ["ensemble"], minimumAge: 13, maximumAge: 18, experienceLevels: ["advanced"], weight: 10 },
  { target: "ens-jazz", goals: ["ensemble"], minimumAge: 15, maximumAge: 18, experienceLevels: ["some", "advanced"], weight: 8 },
  { target: "ens-rock", goals: ["ensemble"], minimumAge: 10, maximumAge: 18, experienceLevels: ["beginner", "some", "advanced", "unsure"], weight: 7 },
  { target: "ens-vocal", goals: ["ensemble"], minimumAge: 13, maximumAge: 18, experienceLevels: ["none", "beginner", "unsure"], weight: 8 },
  { target: "ens-choir", goals: ["ensemble"], minimumAge: 5, maximumAge: 14, experienceLevels: ["none", "beginner", "unsure"], weight: 8 },
  { target: "ens-workshop", goals: ["ensemble"], minimumAge: 7, maximumAge: 13, experienceLevels: ["beginner", "some", "unsure"], weight: 8 },
  // Adults who want to play together but also create.
  { target: "prog-hafaka", goals: ["ensemble"], minimumAge: 16, weight: 4 },
  { target: "dept-vocal", goals: ["ensemble"], minimumAge: 18, weight: 3 },

  // --- Excellence and advanced tracks ---
  { target: "prog-talmim", goals: ["excellence", "bagrut"], minimumAge: 15, maximumAge: 18, experienceLevels: ["some", "advanced"], weight: 12 },
  { target: "prog-mechoname", goals: ["excellence"], minimumAge: 13, maximumAge: 19, experienceLevels: ["advanced"], weight: 11 },
  { target: "prog-rimon", goals: ["excellence"], minimumAge: 12, maximumAge: 15, experienceLevels: ["some", "advanced"], weight: 9 },
  { target: "orch-youth", goals: ["excellence"], minimumAge: 13, maximumAge: 18, experienceLevels: ["advanced"], weight: 7 },
  { target: "prog-hafaka", goals: ["excellence"], minimumAge: 16, weight: 5 },

  // --- Matriculation / professional preparation ---
  { target: "dept-bagrut", goals: ["bagrut"], minimumAge: 14, maximumAge: 18, weight: 10 },
  { target: "prog-hafaka", goals: ["bagrut"], minimumAge: 16, weight: 6 },
];

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

const AGE_RANGE: Record<WhoKey, [number, number] | null> = {
  child57: [5, 7],
  child812: [8, 12],
  teen: [13, 18],
  adult: [18, 120],
  unsure: null,
  existing: null,
};

const WHO_LABEL: Record<WhoKey, string> = {
  child57: "לגילאי 5–7",
  child812: "לגילאי 8–12",
  teen: "לגילאי 13–18",
  adult: "למבוגרים",
  unsure: "",
  existing: "",
};

function ruleMatches(rule: Rule, a: JourneyAnswers): boolean {
  const goal = a.goal ?? "unsure";
  if (goal !== "unsure" && !rule.goals.includes(goal)) return false;
  if (goal === "unsure" && !rule.goals.includes("unsure")) return false;

  const range = a.who ? AGE_RANGE[a.who] : null;
  if (range) {
    const [lo, hi] = range;
    if (rule.minimumAge !== undefined && hi < rule.minimumAge) return false;
    if (rule.maximumAge !== undefined && lo > rule.maximumAge) return false;
  }

  if (rule.instrumentFamily && a.inst && !rule.instrumentFamily.includes(a.inst)) {
    return false;
  }
  if (
    rule.experienceLevels &&
    a.exp &&
    a.exp !== "unsure" &&
    !rule.experienceLevels.includes(a.exp)
  ) {
    return false;
  }
  return true;
}

function ruleScore(rule: Rule, a: JourneyAnswers): number {
  let score = rule.weight;
  if (a.goal && a.goal !== "unsure" && rule.goals.includes(a.goal)) score += 2;
  if (a.inst && rule.instrumentFamily?.includes(a.inst)) score += 3;
  if (a.exp && rule.experienceLevels?.includes(a.exp)) score += 2;
  const range = a.who ? AGE_RANGE[a.who] : null;
  if (range && rule.minimumAge !== undefined) score += 1;
  return score;
}

function reasonsFor(target: RecommendationTarget, a: JourneyAnswers): string[] {
  const reasons: string[] = [];
  if (a.who && WHO_LABEL[a.who]) {
    reasons.push(`מתאים ${WHO_LABEL[a.who]} — ${target.ages}`);
  } else {
    reasons.push(target.ages);
  }
  if (a.exp === "none" || a.exp === "beginner" || a.goal === "intro") {
    reasons.push(
      target.auditionRequired
        ? "שימו לב: הקבלה כוללת בחינה או ראיון"
        : "אפשר להתחיל בלי ניסיון קודם",
    );
  } else if (a.exp === "advanced" || a.exp === "some") {
    reasons.push(
      target.auditionRequired
        ? "מסלול לנגנים עם בסיס — הקבלה בבחינה או בראיון"
        : "מתאים למי שכבר מנגנים — נכנסים ברמה שלכם",
    );
  }
  const goalReason: Partial<Record<GoalKey, string>> = {
    intro: "היכרות רכה עם עולם המוסיקה, בלי התחייבות לכלי",
    instrument: "שיעור אישי עם מורה מסגל המחלקה",
    voice: "עבודה קולית אישית לצד שירה בקבוצה",
    ensemble: "נגינה בצוותא היא לב הפעילות כאן",
    excellence: "מסלול שנבנה סביב נגנים מצטיינים",
    bagrut: "מוביל אל בגרות במוסיקה והכנה מקצועית",
  };
  if (a.goal && goalReason[a.goal]) reasons.push(goalReason[a.goal]!);
  return reasons.slice(0, 3);
}

/** Deterministic recommendation: primary + up to two alternatives. */
export function recommend(a: JourneyAnswers): RecommendationSet {
  const scored = RULES.filter((r) => ruleMatches(r, a))
    .map((rule, i) => ({ rule, score: ruleScore(rule, a), order: i }))
    .sort((x, y) => y.score - x.score || x.order - y.order);

  const seen = new Set<string>();
  const picks: RecommendationTarget[] = [];
  for (const { rule } of scored) {
    if (seen.has(rule.target)) continue;
    seen.add(rule.target);
    picks.push(TARGETS[rule.target]);
    if (picks.length === 3) break;
  }

  // Absolute fallback so the screen never dead-ends: the piano department is
  // the center's broadest entry point.
  if (picks.length === 0) picks.push(TARGETS["dept-piano"]);

  const [primary, ...alternatives] = picks;
  return {
    primary: { target: primary, reasons: reasonsFor(primary, a) },
    alternatives: alternatives.map((t) => ({
      target: t,
      reasons: reasonsFor(t, a).slice(0, 1),
    })),
  };
}
