export type Department = {
  name: string;
  desc: string;
  cat: "teal" | "amber" | "coral";
  count: string;
  img: string;
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

export type Program = {
  cls: "p1" | "p2" | "p3" | "p4";
  tag: string;
  title: string;
  desc: string;
  img: string;
};

export type FormDoc = {
  title: string;
  size: string;
  desc: string;
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
    name: "פסנתר",
    desc: "לימוד פסנתר מגיל 5, מורים בכירים, רפרטואר קלאסי ומודרני.",
    cat: "teal",
    count: "210 תלמידים",
    img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "כלי קשת",
    desc: "כינור, ויולה, צ׳לו וקונטרבס. הכנה לתזמורות ולהרכבי קאמרי.",
    cat: "teal",
    count: "180 תלמידים",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "כלי נשיפה עץ",
    desc: "חליל, קלרינט, אבוב, בסון וסקסופון בסגל מוביל.",
    cat: "teal",
    count: "95 תלמידים",
    img: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "כלי נשיפה מתכת",
    desc: "חצוצרה, קרן יער, טרומבון וטובה — בסיס לתזמורות רוח.",
    cat: "teal",
    count: "60 תלמידים",
    img: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "גיטרה",
    desc: "גיטרה קלאסית, חשמלית ובס. נגינה באנסמבל ובתזמורת הגיטרות.",
    cat: "teal",
    count: "130 תלמידים",
    img: "https://images.unsplash.com/photo-1510915361894-db8b7855a8f5?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "תופים וכלי הקשה",
    desc: "סט תופים, כלי הקשה קלאסיים ומרימבה.",
    cat: "teal",
    count: "75 תלמידים",
    img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "שירה",
    desc: "פיתוח קול, שירה קלאסית ופופולרית, הכנה למקהלות.",
    cat: "amber",
    count: "140 תלמידים",
    img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "מנצחי תזמורות ומקהלות",
    desc: "מגמת מצטיינים להכנת מנצחים צעירים.",
    cat: "amber",
    count: "18 תלמידים",
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "תורת המוזיקה",
    desc: "סולפג׳, הרמוניה, צורות מוסיקליות וקומפוזיציה.",
    cat: "coral",
    count: "כל התלמידים",
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&q=80&auto=format&fit=crop",
  },
  {
    name: "מחקר ופיתוח",
    desc: "פרויקטים חדשניים, מחקר פדגוגי וחשיפה לטכנולוגיות חדשות.",
    cat: "coral",
    count: "מעבדה פתוחה",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80&auto=format&fit=crop",
  },
];

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

export const programs: Program[] = [
  {
    cls: "p1",
    tag: "תוכנית דגל",
    title: "תוכנית מצוינות",
    desc: "מסלול בן ארבע שנים למוסיקאים צעירים מצטיינים, כולל שיעורים פרטניים מורחבים, כיתות אמן, מפגשים עם סולנים בינלאומיים וחשיפה לתחרויות.",
    img: "https://images.unsplash.com/photo-1583608564476-3d6e2c8d4e1f?w=1600&q=80&auto=format&fit=crop",
  },
  {
    cls: "p2",
    tag: "הכנה לבגרות",
    title: "בגרות במוסיקה",
    desc: "מסלול מלא של 5 יח״ל מוסיקה — תיאוריה, סולפג׳, ביצוע ומבחני בגרות.",
    img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&q=80&auto=format&fit=crop",
  },
  {
    cls: "p3",
    tag: "חופשת קיץ",
    title: "סדנאות קיץ",
    desc: "שבועיים אינטנסיביים של נגינה בהרכבים, כיתות אמן וקונצרטי חניכים.",
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80&auto=format&fit=crop",
  },
  {
    cls: "p4",
    tag: "חילופי נוער",
    title: "חילופי נוער בינלאומיים",
    desc: "תלמידי הקונסרבטוריון מתארחים ומארחים בקונסרבטוריונים מובילים באירופה. בין התחנות: וינה, פירנצה, ליון ופראג.",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1600&q=80&auto=format&fit=crop",
  },
];

export const forms: FormDoc[] = [
  {
    title: "טופס הרשמה לשנה״ל תשפ״ז",
    size: "2.4 MB · PDF",
    desc: "טופס הרשמה מלא הכולל פרטי תלמיד, מסלול לימוד ואישורים נדרשים.",
  },
  {
    title: "טופס ביטול רישום",
    size: "840 KB · PDF",
    desc: "הוראות וטופס לביטול רישום או החלפת מסלול לימוד.",
  },
  {
    title: "אישור רפואי",
    size: "620 KB · PDF",
    desc: "אישור רפואי נדרש להשתתפות בתזמורות ובפעילויות חוץ.",
  },
  {
    title: "הסכם תשלומים",
    size: "1.1 MB · PDF",
    desc: "פרטי תשלום, מועדי חיוב והסדרי הנחות.",
  },
  {
    title: "טופס העברת שיעור",
    size: "340 KB · PDF",
    desc: "בקשה להעברת שיעור חד-פעמית או לשינוי קבוע במערכת.",
  },
  {
    title: "אישור הורים לפעילות חוץ",
    size: "420 KB · PDF",
    desc: "נדרש לפני כל קונצרט, חזרה מחוץ למרכז או סיור תזמורת.",
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
