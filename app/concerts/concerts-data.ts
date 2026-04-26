export type Genre = "classical" | "jazz" | "israeli" | "kids";

export type Soldness = "open" | "hot" | "full";

export type ProgramItem = { work: string; composer: string };

export type Concert = {
  slug: string;
  d: string;
  m: string;
  t: string;
  title: string;
  venue: string;
  genre: Genre;
  price: string;
  basePrice: number;
  soldness: Soldness;
  soldLabel: string;
  desc: string;
  img: string;
  // Optional richer content for the detail page (falls back to defaults)
  lede?: string;
  duration?: string;
  language?: string;
  badge?: string;
  program?: ProgramItem[];
};

export const featuredConcertSlug = "brahms-symphony-4";

export const featuredConcert = {
  badge: "בכורה · הזמנה מוקדמת",
  dateNum: "14",
  dateMonth: "מאי 2026",
  dateMeta: "יום רביעי · 20:30",
  title: "ברהמס · הסימפוניה הרביעית במי-מינור",
  body:
    "התזמורת הסימפונית בניצוחו של פרופ׳ גיא פורת מבצעת את הסימפוניה הרביעית של יוהנס ברהמס — יצירה שנכתבה בשיא הבגרות היצירתית של המלחין ונחשבת לאחת הפסגות של הרפרטואר הרומנטי. הערב ייפתח בפתיחה לאופרה קוריולן של בטהובן.",
  meta: [
    { label: "מקום:", value: "האודיטוריום המרכזי" },
    { label: "משך:", value: "95 דקות · הפסקה אחת" },
    { label: "שפה:", value: "תוכנייה בעברית" },
  ],
  primaryCta: {
    label: "לרכישת כרטיסים — ₪120",
    href: `/concerts/${featuredConcertSlug}#tickets`,
  },
  secondaryCta: { label: "קרא עוד על הקונצרט", href: `/concerts/${featuredConcertSlug}` },
  image:
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1400&q=80&auto=format&fit=crop",
};

export const genreFilters: { id: "all" | Genre; label: string }[] = [
  { id: "all", label: "הכל" },
  { id: "classical", label: "קלאסי" },
  { id: "jazz", label: "ג׳אז" },
  { id: "israeli", label: "מוסיקה ישראלית" },
  { id: "kids", label: "קונצרטים לילדים" },
];

export const dateRangeLabel = "מאי 2026 — יולי 2026";

export const genreTag: Record<Genre, { className: string; label: string }> = {
  classical: { className: "tag-classical", label: "קלאסי" },
  jazz: { className: "tag-jazz", label: "ג׳אז" },
  israeli: { className: "tag-israeli", label: "ישראלי" },
  kids: { className: "tag-kids", label: "ילדים" },
};

export const concerts: Concert[] = [
  {
    slug: "brahms-symphony-4",
    d: "14",
    m: "מאי",
    t: "20:30",
    title: "ברהמס · הסימפוניה הרביעית",
    venue: "האודיטוריום המרכזי",
    genre: "classical",
    price: "₪120",
    basePrice: 120,
    soldness: "hot",
    soldLabel: "מקומות אחרונים",
    desc:
      "התזמורת הסימפונית בניצוחו של פרופ׳ גיא פורת מבצעת את הסימפוניה הרביעית של ברהמס, יצירה שנכתבה בשיא הבגרות היצירתית של המלחין. הערב ייפתח בפתיחה לאופרה קוריולן של בטהובן.",
    img:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&q=80&auto=format&fit=crop",
    lede:
      "התזמורת הסימפונית בניצוחו של פרופ׳ גיא פורת מבצעת את הסימפוניה הרביעית של יוהנס ברהמס — יצירה שנכתבה בשיא הבגרות היצירתית של המלחין ונחשבת לאחת הפסגות של הרפרטואר הרומנטי. הערב ייפתח בפתיחה לאופרה קוריולן של בטהובן.",
    duration: "95 דקות · הפסקה",
    language: "תוכנייה בעברית",
    badge: "בכורה · הזמנה מוקדמת",
    program: [
      { work: "פתיחה לאופרה ״קוריולן״, אופוס 62", composer: "בטהובן" },
      { work: "סימפוניה מס׳ 4 במי-מינור, אופוס 98", composer: "ברהמס" },
    ],
  },
  {
    slug: "ella-fitzgerald-tribute",
    d: "22",
    m: "מאי",
    t: "21:00",
    title: "ערב ג׳אז · מחווה לאלה פיצג׳רלד",
    venue: "האולם הקאמרי",
    genre: "jazz",
    price: "₪95",
    basePrice: 95,
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "הרכב הג׳אז של המרכז בערב מחווה לאלה פיצג׳רלד, עם הזמרת נטע רוזנבלום. רפרטואר הכולל את הסטנדרטים הגדולים ויצירות מההקלטות האייקוניות של פיצג׳רלד עם אלינגטון ו-Basie.",
    img:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200&q=80&auto=format&fit=crop",
    duration: "90 דקות · ללא הפסקה",
    program: [
      { work: "Sets מתוך The Cole Porter Songbook", composer: "פיצג׳רלד / פורטר" },
      { work: "מחרוזת אלינגטון — Take the A Train, Mood Indigo ועוד", composer: "פיצג׳רלד / אלינגטון" },
    ],
  },
  {
    slug: "youth-orchestra-finale",
    d: "29",
    m: "מאי",
    t: "19:00",
    title: "קונצרט סיום · תזמורת הנוער",
    venue: "האודיטוריום המרכזי",
    genre: "classical",
    price: "₪80",
    basePrice: 80,
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "תזמורת הנוער הייצוגית בניצוחו של ג׳פרי הווארד — קונצרט הגמר העונתי. על התוכנית: דבוז׳ק, מנדלסון וקטע בכורה מקורי של רני גולן.",
    img:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1200&q=80&auto=format&fit=crop",
    duration: "100 דקות · הפסקה",
    program: [
      { work: "סימפוניה מס׳ 9, ״מהעולם החדש״ — פרק רביעי", composer: "דבוז׳ק" },
      { work: "פתיחה הברידיאנית, אופוס 26", composer: "מנדלסון" },
      { work: "בכורה ישראלית — יצירה לתזמורת", composer: "רני גולן" },
    ],
  },
  {
    slug: "peter-and-the-wolf",
    d: "04",
    m: "יוני",
    t: "17:00",
    title: "פיטר והזאב · קונצרט לילדים",
    venue: "האודיטוריום המרכזי",
    genre: "kids",
    price: "₪60",
    basePrice: 60,
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "הסיפור הקלאסי של פרוקופייב בגרסה מרתקת המותאמת לגילאי 4–10, עם מספר חי ותזמורת כלי קשת על הבמה. ההזדמנות להכיר מקרוב את הכלים של התזמורת.",
    img:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80&auto=format&fit=crop",
    duration: "55 דקות · ללא הפסקה",
    badge: "מומלץ למשפחות · גילאי 4–10",
    program: [{ work: "פיטר והזאב, אופוס 67 (גרסה מקוצרת ומסופרת)", composer: "פרוקופייב" }],
  },
  {
    slug: "israeli-songbook-night",
    d: "12",
    m: "יוני",
    t: "20:30",
    title: "ליל שירה ישראלית",
    venue: "האולם הקאמרי",
    genre: "israeli",
    price: "₪90",
    basePrice: 90,
    soldness: "full",
    soldLabel: "אולם כמעט מלא",
    desc:
      "ערב של שירי ארץ ישראל והזמר העברי בעיבודים חדשים של רני גולן. עם המקהלה העירונית הייצוגית וסולנים אורחים, כולל הזמרת אחינעם ניני במופע פתיחה.",
    img:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80&auto=format&fit=crop",
    duration: "110 דקות · הפסקה",
    badge: "מקומות אחרונים",
  },
  {
    slug: "mozart-divertimento",
    d: "18",
    m: "יוני",
    t: "20:00",
    title: "מוצרט · הדיברטימנטו בפה במז׳ור",
    venue: "האולם הקאמרי",
    genre: "classical",
    price: "₪110",
    basePrice: 110,
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "רביעיית כלי קשת של המרכז מבצעת את הדיברטימנטו K.138 של מוצרט לצד יצירות של היידן. ערב של מוסיקה קאמרית אינטימית באולם הקאמרי.",
    img:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80&auto=format&fit=crop",
    duration: "80 דקות · הפסקה",
    program: [
      { work: "דיברטימנטו בפה במז׳ור, K. 138", composer: "מוצרט" },
      { work: "רביעיית מיתרים אופוס 76 מס׳ 3 ״הקיסר״", composer: "היידן" },
    ],
  },
  {
    slug: "blue-note-modern-jazz",
    d: "25",
    m: "יוני",
    t: "21:00",
    title: "Blue Note · ערב ג׳אז מודרני",
    venue: "האולם הקאמרי",
    genre: "jazz",
    price: "₪95",
    basePrice: 95,
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "הרכב הג׳אז של המרכז מגיש ערב המוקדש ליצירות מתקופת Blue Note של שנות ה-60: הרבי הנקוק, וויין שורטר, ארט בלייקי ועוד. הרכב מורחב עם נגני אורח.",
    img:
      "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=1200&q=80&auto=format&fit=crop",
    duration: "100 דקות · הפסקה",
    program: [
      { work: "Maiden Voyage", composer: "הרבי הנקוק" },
      { work: "Footprints", composer: "וויין שורטר" },
      { work: "Moanin'", composer: "בובי טימונס / ארט בלייקי" },
    ],
  },
  {
    slug: "carnival-of-the-animals",
    d: "02",
    m: "יולי",
    t: "17:00",
    title: "קרנבל החיות · מופע משפחתי",
    venue: "האודיטוריום המרכזי",
    genre: "kids",
    price: "₪55",
    basePrice: 55,
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "היצירה האלמותית של סן-סאנס בגרסה משפחתית, עם הדגמות כלים ומילות קישור. תזמורת כלי קשת של המרכז מנצחת מרינה זיסקינד.",
    img:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80&auto=format&fit=crop",
    duration: "50 דקות · ללא הפסקה",
    badge: "מופע משפחתי · גילאי 5+",
    program: [{ work: "קרנבל החיות (גרסה משפחתית עם מספר)", composer: "סן-סאנס" }],
  },
  {
    slug: "season-finale-gala",
    d: "09",
    m: "יולי",
    t: "20:30",
    title: "גאלה · סיום שנת הלימודים",
    venue: "האודיטוריום המרכזי",
    genre: "classical",
    price: "₪130",
    basePrice: 130,
    soldness: "hot",
    soldLabel: "מקומות אחרונים",
    desc:
      "הקונצרט הגדול של סיום העונה — התזמורת הסימפונית, המקהלה העירונית ותזמורת הנוער יחד על הבמה. רפרטואר כולל בטהובן, ורדי וקטעי בכורה של תלמידי תוכנית המצוינות.",
    img:
      "https://images.unsplash.com/photo-1580651315530-69c8e0903883?w=1200&q=80&auto=format&fit=crop",
    duration: "120 דקות · הפסקה",
    badge: "אירוע סיום העונה",
    program: [
      { work: "פתיחה לאופרה ״אגמונט״, אופוס 84", composer: "בטהובן" },
      { work: "מקהלות נבחרות מ״נבוקו״", composer: "ורדי" },
      { work: "בכורות מתוכנית המצוינות", composer: "תלמידי המרכז" },
    ],
  },
  {
    slug: "matan-caesar-evening",
    d: "16",
    m: "יולי",
    t: "20:00",
    title: "מתאן קיסר · ערב ישראלי",
    venue: "האולם הקאמרי",
    genre: "israeli",
    price: "₪100",
    basePrice: 100,
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "הזמר והיוצר מתאן קיסר באירוח המקהלה העירונית — שיריו המוכרים בעיבודים מקהלתיים חדשים של רני גולן. ערב מיוחד של פגישה בין יוצרים.",
    img:
      "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=1200&q=80&auto=format&fit=crop",
    duration: "95 דקות · הפסקה",
  },
];

const monthIndex: Record<string, number> = {
  ינואר: 0,
  פברואר: 1,
  מרץ: 2,
  אפריל: 3,
  מאי: 4,
  יוני: 5,
  יולי: 6,
  אוגוסט: 7,
  ספטמבר: 8,
  אוקטובר: 9,
  נובמבר: 10,
  דצמבר: 11,
};

const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

export function concertDateLabels(c: Pick<Concert, "d" | "m">, year = 2026) {
  const idx = monthIndex[c.m] ?? 0;
  const date = new Date(year, idx, Number(c.d));
  return {
    monthFull: `${c.m} ${year}`,
    dayName: `יום ${dayNames[date.getDay()]}`,
    shortDate: `${Number(c.d)} ${c.m} ${year}`,
  };
}

export function findConcertBySlug(slug: string) {
  return concerts.find((c) => c.slug === slug);
}

export const subscriptionTiers = [
  {
    title: "מנוי סימפוני",
    body: "כל קונצרטי התזמורת הסימפונית · מקום שמור · פארטיטורה דיגיטלית",
    price: "₪890",
  },
  {
    title: "מנוי קאמרי",
    body: "כל הקונצרטים הקאמריים וג׳אז · האולם הקאמרי · מפגש עם האמנים",
    price: "₪640",
  },
  {
    title: "מנוי משפחתי",
    body: "כל קונצרטי הילדים · 2 מבוגרים + 2 ילדים · סדנאות היכרות עם כלי התזמורת",
    price: "₪420",
  },
];

export const subscriptionIntro = {
  eyebrow: "מנויי עונה",
  title: "עונה שלמה של",
  titleEm: "מוסיקה חיה.",
  body:
    "מנוי עונתי למרכז המוסיקה מקנה כניסה לכל 84 הקונצרטים של העונה, מקום שמור מראש, ערבי פתיחה סגורים והנחה של עד 40% על כרטיסים בודדים.",
};
