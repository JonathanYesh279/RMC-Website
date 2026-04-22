export type Department = {
  key: string;
  name: string;
  desc: string;
  cat: "teal" | "amber" | "coral";
  count: string;
  img: string;
};

export type DeptTeacher = {
  name: string;
  role: string;
  bio: string;
  img: string;
};

export type DeptDetail = {
  lead: string;
  ages: string;
  rooms: string;
  highlights: string[];
};

export type Ensemble = {
  name: string;
  conductor: string;
  role: string;
  schedule: string;
  badge: "badge-symph" | "badge-youth" | "badge-strings" | "badge-choir" | "badge-jazz";
  badgeText: string;
  desc: string;
  img: string;
};

export type EnsembleInstructor = {
  name: string;
  role: string;
  img: string;
};

export type ProgramBlock = {
  h: string;
  list: string[];
};

export type Program = {
  key: string;
  kicker: string;
  title: string;
  subtitle: string;
  lede: string;
  img: string;
  blocks: ProgramBlock[];
  note?: string;
  cta?: string;
};

export type StaffMember = {
  name: string;
  title: string;
  sub: string;
  color: string;
  bio: string;
  img: string;
};

export type Article = {
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  read: string;
  date?: string;
  img: string;
};

export const departments: Department[] = [
  {
    key: "piano",
    name: "פסנתר",
    desc: "לימוד פסנתר מגיל 5, מורים בכירים, רפרטואר קלאסי ומודרני.",
    cat: "teal",
    count: "210 תלמידים",
    img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "strings",
    name: "כלי קשת",
    desc: "כינור, ויולה, צ׳לו וקונטרבס. הכנה לתזמורות ולהרכבי קאמרי.",
    cat: "teal",
    count: "180 תלמידים",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "woodwind",
    name: "כלי נשיפה עץ",
    desc: "חליל, קלרינט, אבוב, בסון וסקסופון בסגל מוביל.",
    cat: "teal",
    count: "95 תלמידים",
    img: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "brass",
    name: "כלי נשיפה מתכת",
    desc: "חצוצרה, קרן יער, טרומבון וטובה — בסיס לתזמורות רוח.",
    cat: "teal",
    count: "60 תלמידים",
    img: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "guitar",
    name: "גיטרה",
    desc: "גיטרה קלאסית, חשמלית ובס. נגינה באנסמבל ובתזמורת הגיטרות.",
    cat: "teal",
    count: "130 תלמידים",
    img: "https://images.unsplash.com/photo-1510915361894-db8b7855a8f5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "drums",
    name: "תופים וכלי הקשה",
    desc: "סט תופים, כלי הקשה קלאסיים ומרימבה.",
    cat: "teal",
    count: "75 תלמידים",
    img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "vocal",
    name: "שירה",
    desc: "פיתוח קול, שירה קלאסית ופופולרית, הכנה למקהלות.",
    cat: "amber",
    count: "140 תלמידים",
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "conduct",
    name: "מנצחי תזמורות ומקהלות",
    desc: "מגמת מצטיינים להכנת מנצחים צעירים.",
    cat: "amber",
    count: "18 תלמידים",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "theory",
    name: "תורת המוזיקה",
    desc: "סולפג׳, הרמוניה, צורות מוסיקליות וקומפוזיציה.",
    cat: "coral",
    count: "כל התלמידים",
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&q=80&auto=format&fit=crop",
  },
  {
    key: "rnd",
    name: "מחקר ופיתוח",
    desc: "פרויקטים חדשניים, מחקר פדגוגי וחשיפה לטכנולוגיות חדשות.",
    cat: "coral",
    count: "מעבדה פתוחה",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80&auto=format&fit=crop",
  },
];

export const deptTeachers: Record<string, DeptTeacher[]> = {
  piano: [
    { name: "רוית בן־שמעון", role: "ראש מחלקת פסנתר · סולנית", bio: "בוגרת האקדמיה של ירושלים, הופעות עם הפילהרמונית הישראלית, 20+ שנות הוראה.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80&auto=format&fit=crop" },
    { name: "יבגני רוזנטל", role: "פסנתר קלאסי · בוגרי קונצרט", bio: "בוגר גנסין מוסקבה, זוכה תחרויות בינלאומיות, מומחה לרפרטואר רומנטי.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop" },
    { name: "נועה שחר", role: "פסנתר לילדים · מתודיקה", bio: "מתודיקאית ילדים, מחברת ספרי לימוד, מתמחה בשיטת סוזוקי ובעבודה רב־חושית.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80&auto=format&fit=crop" },
    { name: "עידן כהן", role: "ג׳אז ואלתור", bio: "פסנתרן ג׳אז פעיל, שילב עם הרכבי מרכז המוסיקה, בוגר רימון.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=80&auto=format&fit=crop" },
    { name: "מיה לוינסון", role: "ליווי פסנתרני", bio: "פסנתרנית מלווה של תזמורת הנוער, מומחית במוסיקה קאמרית.", img: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80&auto=format&fit=crop" },
    { name: "תומר דרור", role: "פסנתר צעיר · מתחילים", bio: "מורה פסנתר צעיר, מורה מוביל לגילאי 5–9, גישה משחקית ומעוררת.", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=900&q=80&auto=format&fit=crop" },
  ],
  strings: [
    { name: "ג׳פרי הווארד", role: "ראש מחלקת כלי קשת", bio: "כנר, מנצח תזמורת הנוער, בוגר ג׳וליארד.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80&auto=format&fit=crop" },
    { name: "מרינה זיסקינד", role: "כינור · תזמורת כלי קשת", bio: "מנצחת ומורה בכירה, מובילה את תזמורת כלי הקשת של המרכז.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80&auto=format&fit=crop" },
    { name: "יואב פינקוס", role: "צ׳לו", bio: "בוגר האקדמיה של וינה, סולן, מופיע באנסמבלים קאמריים.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop" },
    { name: "דנה אלון", role: "ויולה · קאמרי", bio: "מומחית לרפרטואר בארוק וקלאסי, מרצה במחלקת קאמרי.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=80&auto=format&fit=crop" },
    { name: "ארתור מלצר", role: "קונטרבס", bio: "נגן הסימפונית הישראלית, מוביל הכשרת נגני בסים צעירים.", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=900&q=80&auto=format&fit=crop" },
  ],
  woodwind: [
    { name: "פרופ׳ גיא פורת", role: "ראש מחלקת נשיפה עץ · אבוב", bio: "מנהל הבית ומנצח הסימפונית, מוניטין בינלאומי כנגן אבוב.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop" },
    { name: "עמית פרידמן", role: "סקסופון · ג׳אז", bio: "מוביל מסלול הג׳אז, סולן ומלחין פעיל.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=80&auto=format&fit=crop" },
    { name: "שירה לביא", role: "חליל", bio: "חלילנית תזמורת הנוער, בוגרת האקדמיה של ת״א.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80&auto=format&fit=crop" },
    { name: "אסף ברגר", role: "קלרינט", bio: "קלרינטיסט פעיל בהרכבי קאמרי ובהוראה מתקדמת.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80&auto=format&fit=crop" },
  ],
  brass: [
    { name: "רוני אליאב", role: "ראש מחלקה · חצוצרה", bio: "חצוצרן הסימפונית של ירושלים, מוביל תזמורת הרוח.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80&auto=format&fit=crop" },
    { name: "דורון לוי", role: "קרן יער", bio: "נגן קרן יער בכיר בסימפונית, מומחה לרפרטואר רומנטי.", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=900&q=80&auto=format&fit=crop" },
    { name: "אייל גרין", role: "טרומבון", bio: "בוגר ג׳וליארד, מרצה באקדמיה.", img: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80&auto=format&fit=crop" },
    { name: "יואב ברקת", role: "טובה", bio: "פעיל בתזמורות הרוח המובילות בישראל.", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&q=80&auto=format&fit=crop" },
  ],
  guitar: [
    { name: "עידו זיו", role: "ראש מחלקה · גיטרה קלאסית", bio: "בוגר ברצלונה, סולן ומרצה בכיר.", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=900&q=80&auto=format&fit=crop" },
    { name: "בן לביא", role: "גיטרה חשמלית · רוק", bio: "מוביל הרכבי רוק במרכז.", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&q=80&auto=format&fit=crop" },
    { name: "אלון ברק", role: "גיטרה חשמלית · פאנק/פופ", bio: "גיטריסט מופיע, מפיק ומורה להרכבים.", img: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80&auto=format&fit=crop" },
    { name: "גיא ישראלי", role: "בס", bio: "בסיסט מופיע, מוביל אנסמבלים בסגנונות שונים.", img: "https://images.unsplash.com/photo-1572974571077-cf40d4128e1c?w=900&q=80&auto=format&fit=crop" },
    { name: "תמר פז", role: "גיטרה צעירה", bio: "מורה מובילה למתחילים ולילדים.", img: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80&auto=format&fit=crop" },
  ],
  drums: [
    { name: "יהושע לימוני", role: "ראש מחלקה · דרם ליין", bio: "מתופף מוביל, אחראי על הרכב המתופפים המרכזי.", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop" },
    { name: "אור שטרן", role: "כלי הקשה קלאסיים", bio: "נגן פרקושן בסימפונית, בוגר האקדמיה של ברלין.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80&auto=format&fit=crop" },
    { name: "רותם שגיא", role: "מרימבה ומלט", bio: "מומחית למרימבה, מופיעה כסולנית.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80&auto=format&fit=crop" },
    { name: "ניר כהן", role: "סט תופים · ג׳אז", bio: "מתופף פעיל בסצנת הג׳אז הישראלית.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=80&auto=format&fit=crop" },
  ],
  vocal: [
    { name: "אלה תדמור", role: "ראש מחלקה · אוקטבה מוגדלת", bio: "מנצחת ההרכב הווקאלי, מורה לשירה רב־ז׳אנרית.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80&auto=format&fit=crop" },
    { name: "ליאת ניסן ויסוצקי", role: "שירה קלאסית · מקהלה", bio: "מנצחת המקהלה העירונית הייצוגית.", img: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80&auto=format&fit=crop" },
    { name: "רני גולן", role: "מעבדים · שירה פופ", bio: "מעבד ומנהל מוסיקלי של המקהלה.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80&auto=format&fit=crop" },
    { name: "מיכל ארד", role: "פיתוח קול · ילדים", bio: "מומחית לקול ילדים ונוער.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80&auto=format&fit=crop" },
  ],
  conduct: [
    { name: "פרופ׳ גיא פורת", role: "ניצוח תזמורתי", bio: "מנצח הסימפונית ומנהל מחלקת המנצחים הצעירים.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop" },
    { name: "ליאת ניסן ויסוצקי", role: "ניצוח מקהלתי", bio: "מובילה של מגמת מנצחי המקהלות.", img: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80&auto=format&fit=crop" },
    { name: "ג׳פרי הווארד", role: "ניצוח נוער", bio: "מנצח תזמורת הנוער הייצוגית.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80&auto=format&fit=crop" },
  ],
  theory: [
    { name: "ד״ר אסנת גלעדי", role: "ראש מחלקה · תיאוריה", bio: "ד״ר למוסיקולוגיה, מרצה באקדמיה, מחברת ספרי לימוד.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80&auto=format&fit=crop" },
    { name: "איתי רון", role: "סולפג׳ · פיתוח שמיעה", bio: "מומחה לסולפג׳ רלטיבי ומוחלט.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=900&q=80&auto=format&fit=crop" },
    { name: "שירה אלעזר", role: "הרמוניה · צורות", bio: "מלחינה ומורה להרמוניה מודאלית.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80&auto=format&fit=crop" },
    { name: "עמית חכמי", role: "בגרות במוסיקה 5 יח״ל", bio: "מוביל מסלול הבגרות של המרכז.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop" },
  ],
  rnd: [
    { name: "גיא בר־דוד", role: "ראש מעבדה · טכנולוגיות אולפן", bio: "מפיק ומורה להפקה מוסיקלית.", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=900&q=80&auto=format&fit=crop" },
    { name: "ברק שרובסקי", role: "הפקה מוסיקלית", bio: "מפיק רב־ז׳אנרי, מנחה קורס ההפקה של המרכז.", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=900&q=80&auto=format&fit=crop" },
    { name: "נועם שקד", role: "חינוך מוסיקלי חדשני", bio: "חוקר פדגוגיה מוסיקלית, מוביל פרויקטים חדשניים.", img: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&q=80&auto=format&fit=crop" },
  ],
};

export const deptDetails: Record<string, DeptDetail> = {
  piano: { lead: "רוית בן־שמעון", ages: "5 ומעלה", rooms: "12 חדרי פסנתר", highlights: ["רסיטלים שנתיים", "תחרות פסנתר פנימית", "כיתות אמן בינלאומיות"] },
  strings: { lead: "ג׳פרי הווארד", ages: "6 ומעלה", rooms: "8 חדרי קאמרי", highlights: ["תזמורת כלי קשת", "קאמרי שבועי", "מופעי גמר בירושלים"] },
  woodwind: { lead: "פרופ׳ גיא פורת", ages: "7 ומעלה", rooms: "6 חדרים אקוסטיים", highlights: ["אנסמבל כלי נשיפה", "הופעה עם סימפונית", "סדנאות בינלאומיות"] },
  brass: { lead: "רוני אליאב", ages: "9 ומעלה", rooms: "5 חדרי מתכת", highlights: ["תזמורת רוח", "הופעות באירועי העיר", "הכנה למצטיינים"] },
  guitar: { lead: "עידו זיו", ages: "6 ומעלה", rooms: "10 חדרים", highlights: ["תזמורת גיטרות", "הרכבי רוק/ג׳אז", "ערבי גיטרה קלאסית"] },
  drums: { lead: "יהושע לימוני", ages: "7 ומעלה", rooms: "סטודיו תופים מבודד", highlights: ["דרם ליין", "אנסמבל פרקושן", "סדנת פוליריתמים"] },
  vocal: { lead: "אלה תדמור", ages: "כל הגילאים", rooms: "4 חדרי שירה", highlights: ["מקהלה עירונית", "אוקטבה מוגדלת", "שירה קאמרית"] },
  conduct: { lead: "פרופ׳ גיא פורת", ages: "14 ומעלה", rooms: "אולם ייעודי", highlights: ["עבודה עם תזמורת הנוער", "סדנה שנתית", "תעודת סיום"] },
  theory: { lead: "ד״ר אסנת גלעדי", ages: "כל התלמידים", rooms: "6 כיתות", highlights: ["מסלול בגרות", "אוזן יחסית/מוחלטת", "קומפוזיציה"] },
  rnd: { lead: "גיא בר־דוד", ages: "16 ומעלה", rooms: "אולפן הקלטה", highlights: ["קורס הפקה", "מעבדת MIDI", "שיתופי פעולה עם אקדמיה"] },
};

export const ensembles: Ensemble[] = [
  {
    name: "התזמורת הסימפונית",
    conductor: "פרופ׳ גיא פורת",
    role: "מנהל ומנצח הבית",
    schedule: "חזרות: ימי שני 18:00–21:00",
    badge: "badge-symph",
    badgeText: "ייצוגית",
    desc: "התזמורת הסימפונית, המונה 70 נגנים, הוקמה ב-2008 וזכתה לכבוש לבבות של מאזינים רבים. הרפרטואר כולל ביצועים ליצירות מופת קלאסיות, והנגנים הם מוסיקאים צעירים מצטיינים — רבים מהם זוכי קרן שרת. התזמורת יצאה לסיורי הופעות בפסטיבל פירנצה (2011) ובפסטיבלי פרובנס ומנטון (2012).",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1400&q=80&auto=format&fit=crop",
  },
  {
    name: "תזמורת הנוער הייצוגית",
    conductor: "מר ג׳פרי הווארד",
    role: "מנצח ומנהל מוסיקלי",
    schedule: "חזרות: ימי רביעי 17:30–20:00",
    badge: "badge-youth",
    badgeText: "נוער",
    desc: "תזמורת הנוער הייצוגית מונה 45 נגנים ומרבה להופיע באירועים בעיר רעננה ומחוצה לה, כולל מחוץ למדינה. בהיסטוריה שלה נכללים הופעה משותפת עם התזמורת הפילהרמונית הישראלית (2007), הקלטת קונצרט לרדיו הממלכתי האוסטרי, וזכייה במקום השלישי בתחרות הבינלאומית לתזמורות נוער בווינה.",
    img: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1400&q=80&auto=format&fit=crop",
  },
  {
    name: "תזמורת כלי קשת",
    conductor: "גב׳ מרינה זיסקינד",
    role: "מנצחת ומנהלת מוסיקלית",
    schedule: "חזרות: ימי ראשון 16:30–18:30",
    badge: "badge-strings",
    badgeText: "כלי קשת",
    desc: "תזמורת כלי הקשת פועלת מעל שש שנים ומונה כ-40 בני נוער בגילאי 9–12. הנגנים מתקבלים לאחר שלוש שנות למידה ולרוב הם בוגרי האנסמבלים השונים של כלי הקשת במרכז. הרפרטואר מגוון — מלחינים קלאסיים, בארוק, רגטיים וקאונטרי — והתזמורת מכינה שתי תוכניות מופע מדי שנה.",
    img: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=1400&q=80&auto=format&fit=crop",
  },
  {
    name: "המקהלה העירונית הייצוגית",
    conductor: "ליאת ניסן ויסוצקי · רני גולן",
    role: "מנצחת · מעבד ומנהל מוסיקלי",
    schedule: "חזרות: ימי שלישי 17:00–19:30",
    badge: "badge-choir",
    badgeText: "מקהלה",
    desc: "מקהלת הילדים הוקמה ב-2010 במטרה לבנות מקהלה אמנותית בהשתתפות אוהבי שירה צעירים בשתי קבוצות גיל: 5–8 ו-8–14. הדגש הוא על מודל לשירה אמנותית ועל שימוש נכון בקול. הרפרטואר מותאם לגילאים וכולל אופרה, מחזמר וקטעים מקוריים פרי עטו של רני גולן.",
    img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1400&q=80&auto=format&fit=crop",
  },
  {
    name: "הרכב ג׳אז ורביעיית כלי נשיפה",
    conductor: "אורי כספי · חגי אסרף",
    role: "מובילי ההרכבים",
    schedule: "חזרות: ימי חמישי 17:00–19:00",
    badge: "badge-jazz",
    badgeText: "הרכבים קאמריים",
    desc: "ההרכב הג׳אזי ורביעיית כלי הנשיפה פועלים לצד מסגרות ההוראה הפרטניות, ומאפשרים לתלמידים מתקדמים להרחיב אופקים סגנוניים ולהתמודד עם רפרטואר קאמרי מורכב. ההרכבים מופיעים בערבי הגמר של הקונסרבטוריון ובאירועים מיוחדים בעיר.",
    img: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1400&q=80&auto=format&fit=crop",
  },
];

export const ensembleInstructors: EnsembleInstructor[] = [
  { name: "משה בן-יוחנה", role: "סדנאות הרכבים", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop" },
  { name: "יובל כהן", role: "הרכבי ג׳אז", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&auto=format&fit=crop" },
  { name: "גיל פקר", role: "הרכבי ג׳אז", img: "https://images.unsplash.com/photo-1600878459108-617a253537e9?w=600&q=80&auto=format&fit=crop" },
  { name: "מתן ורדי", role: "הרכבי ג׳אז", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop" },
  { name: "רז קרוגמן", role: "ג׳אז · מבוגרים", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop" },
  { name: "בן לביא", role: "להקות רוק", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80&auto=format&fit=crop" },
  { name: "אלון ברק", role: "להקות רוק", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80&auto=format&fit=crop" },
  { name: "הדס טריינין", role: "רוק · מבוגרים", img: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&q=80&auto=format&fit=crop" },
  { name: "אלה תדמור", role: "הרכב ווקאלי", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop" },
  { name: "יהושע לימוני", role: "דרם ליין", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop" },
];

export const programs: Program[] = [
  {
    key: "keshet",
    kicker: "פסטיבל בינלאומי",
    title: "פסטיבל ״קשת ערן״",
    subtitle: "ע״ש ערן זולדן · 2–10 במרץ",
    lede: "התחרות הישראלית לנגני כינור וצ׳לו עד גיל 21, ובצידה כיתות אמן בהנחיית פדגוגים בינלאומיים — בשיתוף מרכז למוסיקה ירושלים.",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1800&q=80&auto=format&fit=crop",
    blocks: [
      {
        h: "קבוצות גיל",
        list: [
          "א׳ — עד גיל 11 · עד 10 דק׳, פרק קונצ׳רטו",
          "ב׳ — עד גיל 14 · עד 15 דק׳, פרק קונצ׳רטו",
          "ג׳ — עד גיל 17 · קפריס/אטיוד, באך, קונצ׳רטו",
          "ד׳ — עד גיל 21 · תוכנית עד 30 דק׳, קונצ׳רטו במלואו",
        ],
      },
      {
        h: "פרסים כספיים",
        list: [
          "קבוצה א׳ — 3,000 ₪",
          "קבוצה ב׳ — 5,000 ₪",
          "קבוצה ג׳ — 8,000 ₪",
          "קבוצה ד׳ — 10,000 ₪",
        ],
      },
      {
        h: "שופטי הגמר",
        list: [
          "פרנס הלמרסון · צ׳לו",
          "מיכאלה מרטין · כינור",
          "ינס פיטר מיינץ · צ׳לו",
          "לטיצה הונדה־רוזנברג · כינור",
        ],
      },
    ],
    note: "כיתות אמן למשתתפי הגמר בקבוצות ב׳–ד׳. עלות השתתפות: 200 ₪ לשיעור. דמי רישום לתחרות: 250 ₪.",
    cta: "טופס רישום לתחרות",
  },
  {
    key: "talmim",
    kicker: "תוכנית מצטיינים על־אזורית",
    title: "תלמים",
    subtitle: "מסלול נגנים מחוננים · כיתות י׳–י״ב",
    lede: "מסלול ייחודי לנגנים מצטיינים בתחום הביצוע — ראייה 24/7 של צרכי התלמיד, מענה מותאם אישית, ורסיטל בגרות בהיקף 5 יח״ל. בשיתוף אגף המחוננים במשרד החינוך.",
    img: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1800&q=80&auto=format&fit=crop",
    blocks: [
      {
        h: "המסלול הקלאסי · בניהול גיא פורת",
        list: [
          "שעות אימון מובנות במרכז המוסיקה",
          "שיעורי פסנתר וליווי, ניתוח יצירות",
          "כיתות אמן בינלאומיות",
          "סיור שנתי לבירת תרבות בחו״ל",
          "הופעה כסולן עם תזמורת מקצועית (י״ב)",
        ],
      },
      {
        h: "מסלול הג׳אז · בניהול עמית פרידמן",
        list: [
          "עבודה עם קטיה טובול, יובל כהן ועוד",
          "הרכבים, פיתוח שמיעה, הרמוניה",
          "אלתור, עיבוד, ניתוח יצירות",
          "השתתפות בתחרויות ופסטיבלים",
          "סיורים לימודיים בחו״ל",
        ],
      },
      {
        h: "בחינות כניסה",
        list: [
          "שתי יצירות בסגנונות שונים",
          "בחינה ראשונית בשמיעה ותיאוריה",
          "ראיון אישי · שלב שני מקיף",
          "מפגש היכרות קלאסי: 08.01 · ג׳אז: 03.02",
        ],
      },
    ],
    note: "פתוח לתלמידי כל בתי הספר באזור השרון — רעננה, הרצליה, כפר סבא, הוד השרון ועוד.",
    cta: "טופס רישום לתלמים",
  },
  {
    key: "mechoname",
    kicker: "המחלקה התיכונית",
    title: "מחלקת מחוננים ומצטיינים",
    subtitle: "העתיד המבטיח של המוסיקה הישראלית",
    lede: "נועדה לקדם מוסיקאים צעירים נבחרים בעלי פוטנציאל להיהפך למוסיקאים בוגרים מקצועיים — ליווי צמוד, תוכנית עבודה ארוכת טווח והזדמנויות רבות להופיע עם תזמורת.",
    img: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1800&q=80&auto=format&fit=crop",
    blocks: [
      {
        h: "מה מקבלים",
        list: [
          "ליווי אישי לפי תוכנית עבודה מסודרת",
          "קונצרטים בליווי תזמורת מקצועית",
          "הכנה לכיתות אמן ולתחרויות בינלאומיות",
          "רסיטלים שנתיים לסולנים המצטיינים",
        ],
      },
      {
        h: "דרישות קבלה",
        list: [
          "נגינה בכלים קלאסיים, גילאי 13–19",
          "זוכי מלגות קרן התרבות אמריקה־ישראל",
          "מכתבי המלצה · בחינות כניסה במרכז",
          "שאיפה ברורה לקריירה סולנית",
        ],
      },
      {
        h: "מנהל המחלקה · פרופ׳ גיא פורת",
        list: [
          "נגן אבוב במוניטין בינלאומיים",
          "מורה באקדמיות של ת״א ושל וינה",
          "עורך תווים בהוצאת יוניברסל",
          "לשעבר מנכ״ל אנסמבל סולני תל־אביב",
        ],
      },
    ],
    note: "בתוכנית ישתתפו עד 12 נגנים נבחרים מכל רחבי הארץ.",
    cta: "פרטים ובחינות כניסה",
  },
  {
    key: "alon",
    kicker: "מגמה בית־ספרית",
    title: "מגמת מוסיקה · חטיבת אלון",
    subtitle: "טיפוח נגנים צעירים בראשית דרכם",
    lede: "מגמה בחטיבת הביניים המאפשרת תנאים מיטביים לטיפוח כישרון מוסיקלי — כיתת אם אחת לגיבוש חברתי, והפעילות המוסיקלית מתקיימת במרכז פיס למוסיקה רעננה.",
    img: "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=1800&q=80&auto=format&fit=crop",
    blocks: [
      {
        h: "מקצועות הלימוד",
        list: ["תורת המוסיקה", "פיתוח השמיעה", "הרכבים", "אימון אישי בכלי"],
      },
      {
        h: "עקרונות התוכנית",
        list: [
          "ביצוע, ביצוע, ביצוע — הופעה מול קהל",
          "שיתוף עם המורה האישי של התלמיד",
          "נגינה בטקסים ובאירועי בי״ס והעיר",
          "חשיפה לכלי נגינה וסגנונות מגוונים",
        ],
      },
      {
        h: "צוות המורים",
        list: [
          "סגל בכיר של מרכז המוסיקה",
          "ניסיון רב בחינוך ובביצוע",
          "ליווי אישי לאורך השנה",
          "מבחן קבלה לאחר מילוי טופס רישום",
        ],
      },
    ],
    cta: "טופס רישום למגמת אלון",
  },
  {
    key: "rimon",
    kicker: "מגמה על־אזורית",
    title: "מגמת מוסיקה · חטיבת רימון",
    subtitle: "התמחות לנגנים מנוסים · פועלת משנת 2010",
    lede: "תוכנית בשיתוף מרכז המוסיקה רעננה ומינהל החינוך — למוסיקאים צעירים עם רקע עשיר, בדגש על ביצוע מוסיקלי וקידום אישי בליווי צוות מקצועי ובכיר.",
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1800&q=80&auto=format&fit=crop",
    blocks: [
      {
        h: "למי מיועדת",
        list: [
          "מוסיקאים צעירים מצטיינים",
          "רקע מוסיקלי עשיר ומוכח",
          "המלצת המורה לנגינה",
          "בחינה וראיון אישי לקבלה",
        ],
      },
      {
        h: "דגשי התוכנית",
        list: [
          "מורכבת ומכוונת לצרכי התלמיד",
          "שיתוף פעולה עם הצוות החינוכי",
          "ליווי מוסיקאים בכירים לאורך כל הדרך",
          "התמחות בתחומי הביצוע המוסיקלי",
        ],
      },
    ],
    note: "ההרשמה דרך טופס מקוון. צוות המרכז ייצור קשר לתיאום מבחן קבלה.",
    cta: "טופס רישום למגמת רימון",
  },
  {
    key: "hafaka",
    kicker: "קורס מקצועי",
    title: "הפקה מוסיקלית",
    subtitle: "אולפן מקצועי ואולפן ביתי",
    lede: "קורס ראשון מסוגו המתמקד במפיק המוסיקלי כמוסיקאי מעבד ויוצר — לא רק האיש שמזיז את הכפתורים. מחשב נייד מאובזר, פסנתר, גיטרות ותופים להקלטות חיות.",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1800&q=80&auto=format&fit=crop",
    blocks: [
      {
        h: "מה כלול",
        list: [
          "מחשב מק נייד עם שלל פלאגינים",
          "אוזניות מקצועיות ומקלדת שליטה",
          "פסנתר, גיטרות, תופים וכלים חיים",
          "הקלטה מקצועית עם נגני המרכז",
        ],
      },
      {
        h: "מבנה הלמידה",
        list: [
          "פרקטיקה בהפקה באולפן הביתי",
          "הקלטות בזמני תרגול עם נגנים",
          "ליווי מפיק מוסיקלי מקצועי",
          "מכינה בתאורית המוסיקה למי שזקוק",
        ],
      },
      {
        h: "מנחה · ברק שרובסקי",
        list: [
          "מולטי־אינסטרומנטליסט ומפיק",
          "בוגר Rimon Jazz Institute",
          "בלוז, רוק, פאנק, פופ, פיוז׳ן וג׳אז",
          "הפיק שני אלבומים כיוצר מלא",
        ],
      },
    ],
    note: "הקבלה לקורס מותנית בראיון אישי.",
    cta: "להרשמה לקורס",
  },
  {
    key: "tzipor",
    kicker: "מחזור מופעים לילדים",
    title: "צפור, לאן את נוסעת?",
    subtitle: "ע״פ שירי שלומית כהן־אסיף",
    lede: "מחזור מופעים למשפחות המבוסס על שיריה של המשוררת זוכת פרס ביאליק — 45 ספרים לילדים, 15 פרסים ספרותיים, וקול ייחודי ביצירה הישראלית לילדים.",
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1800&q=80&auto=format&fit=crop",
    blocks: [
      {
        h: "על היוצרת",
        list: [
          "שלומית כהן־אסיף · ילידת חולון, 1949",
          "בוגרת אוניברסיטת ת״א",
          "פרס זאב · פרס ראש הממשלה",
          "פרס אקו״ם על מפעל חיים",
          "גן פסלים בחולון ע״ש ״הארנב ממושי״",
        ],
      },
      {
        h: "על המופע",
        list: [
          "שירים מולחנים בביצוע נגני המרכז",
          "קריינות ותיאטרון חזותי",
          "מיועד לכל המשפחה",
          "שילוב מקהלת הילדים בכמה מהשירים",
        ],
      },
    ],
    note: "״קולה הוא קול ייחודי ומובחן ביצירה הישראלית לילדים״ — נימוקי ועדת פרס ביאליק.",
    cta: "לוח הופעות ורישום",
  },
];

export const staff: StaffMember[] = [
  {
    name: "פרופ׳ גיא פורת",
    title: "מנהל ומנצח הבית",
    sub: "התזמורת הסימפונית",
    color: "var(--coral)",
    bio: "נגן אבוב בעל מוניטין בינלאומיים, סולן ומורה באקדמיות של ת״א ושל וינה. עורך תווים בהוצאת יוניברסל.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "מר ג׳פרי הווארד",
    title: "מנצח ומנהל מוסיקלי",
    sub: "תזמורת הנוער",
    color: "var(--amber)",
    bio: "מנצח בעל ניסיון עשיר בתזמורות נוער באירופה, ליווה את התזמורת בסיורי הופעות בוינה ובפריז.",
    img: "https://images.unsplash.com/photo-1600878459108-617a253537e9?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "מר רני גולן",
    title: "מעבד, מנהל מוסיקלי ומלווה",
    sub: "המקהלה העירונית הייצוגית",
    color: "var(--teal)",
    bio: "מלחין ומעבד, כותב רפרטואר מקורי למקהלות ולהרכבים קאמריים. לימד באקדמיה למוסיקה בירושלים.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "ליאת ניסן ויסוצקי",
    title: "מנצחת",
    sub: "המקהלה העירונית הייצוגית",
    color: "var(--coral)",
    bio: "מנצחת מקהלות עם ניסיון רב בעבודה עם גילאי הרך והנוער, מתמחה בבניית מיומנויות קוליות.",
    img: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "גב׳ מרינה זיסקינד",
    title: "מנצחת ומנהלת מוסיקלית",
    sub: "תזמורת כלי קשת",
    color: "var(--amber)",
    bio: "כנרית ומנצחת, בוגרת האקדמיה למוסיקה במוסקבה. מובילה את תזמורת כלי הקשת מאז הקמתה.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "עו״ד דנה שוורץ",
    title: "מנהלת המינהל",
    sub: "הנהלת המרכז",
    color: "var(--teal)",
    bio: "מנהלת את המטה האדמיניסטרטיבי של המרכז — רישום, תקציב, תפעול ותיאום בין כל המסגרות.",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "מר אבי מלמד",
    title: "יו״ר נציגות ההורים",
    sub: "נציגות ההורים",
    color: "var(--ink)",
    bio: "מייצג את ציבור ההורים מול ההנהלה ויוזם פעילויות קהילתיות סביב המרכז.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop",
  },
  {
    name: "פרופ׳ נעמי בן-ציון",
    title: "יועצת פדגוגית",
    sub: "הנהלת המרכז",
    color: "var(--amber)",
    bio: "חוקרת חינוך מוסיקלי, מובילה את תוכנית המצוינות ואת מסלול הבגרות במוסיקה.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80&auto=format&fit=crop",
  },
];

export const articles: Article[] = [
  {
    tag: "מדריך להורים",
    title: "איך לבחור כלי נגינה לילד — מדריך מקיף",
    excerpt:
      "בחירת כלי היא אחת ההחלטות החשובות ביותר בהתפתחות המוסיקלית. מה מתאים לגיל, לאופי ולבית — וכיצד להבחין בין מסלול חובה למסלול תשוקה.",
    author: "פרופ׳ נעמי בן-ציון",
    read: "8 דקות קריאה",
    date: "12 מאי 2026",
    img: "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=1600&q=80&auto=format&fit=crop",
  },
  {
    tag: "היסטוריה",
    title: "היסטוריית התזמורת הסימפונית של המרכז",
    excerpt:
      "מ-2008 ועד היום — המסע של התזמורת מקבוצת 30 נגנים ועד הרכב ייצוגי.",
    author: "פרופ׳ גיא פורת",
    read: "6 דק׳",
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80&auto=format&fit=crop",
  },
  {
    tag: "פרקטיקה",
    title: "טיפים לתרגול יעיל — פרק ראשון",
    excerpt: "מיקוד, שגרה ותיעוד — שלושה כלים מעשיים לתרגול בבית.",
    author: "רני גולן",
    read: "5 דק׳",
    img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80&auto=format&fit=crop",
  },
  {
    tag: "נגני קשת",
    title: "כינור לצעירים — הצעדים הראשונים",
    excerpt: "מה לצפות בשנה הראשונה על הכלי, וכיצד לבנות בסיס יציב.",
    author: "מרינה זיסקינד",
    read: "7 דק׳",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80&auto=format&fit=crop",
  },
  {
    tag: "שירה",
    title: "לשיר במקהלה — מה זה בעצם?",
    excerpt: "הכוח של קולות רבים — איך בונים מקהלה שצומחת יחד.",
    author: "ליאת ניסן ויסוצקי",
    read: "6 דק׳",
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&q=80&auto=format&fit=crop",
  },
  {
    tag: "בגרות",
    title: "המדריך המלא לבגרות במוסיקה",
    excerpt:
      "מסלול חמש יח״ל — מה נדרש, איך מתכוננים ומהם פרויקטי הגמר.",
    author: "פרופ׳ נעמי בן-ציון",
    read: "10 דק׳",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop",
  },
  {
    tag: "קונצרטים",
    title: "מה לצפות מקונצרט הגמר של התזמורת",
    excerpt: "תוכניית העונה — יצירות, סולנים והמבנה של הערב.",
    author: "גיא פורת",
    read: "4 דק׳",
    img: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=800&q=80&auto=format&fit=crop",
  },
];

export const catLabels: Record<Department["cat"], string> = {
  teal: "מחלקה אינסטרומנטלית",
  amber: "הרכב / ביצוע",
  coral: "תיאוריה ומחקר",
};
