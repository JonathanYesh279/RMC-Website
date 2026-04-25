export type Genre = "classical" | "jazz" | "israeli" | "kids";

export type Soldness = "open" | "hot" | "full";

export type Concert = {
  d: string;
  m: string;
  t: string;
  title: string;
  venue: string;
  genre: Genre;
  price: string;
  soldness: Soldness;
  soldLabel: string;
  desc: string;
  img: string;
};

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
  primaryCta: { label: "לרכישת כרטיסים — ₪120", href: "#" },
  secondaryCta: { label: "קרא עוד על הקונצרט", href: "#" },
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
    d: "14",
    m: "מאי",
    t: "20:30",
    title: "ברהמס · הסימפוניה הרביעית",
    venue: "האודיטוריום המרכזי",
    genre: "classical",
    price: "₪120",
    soldness: "hot",
    soldLabel: "מקומות אחרונים",
    desc:
      "התזמורת הסימפונית בניצוחו של פרופ׳ גיא פורת מבצעת את הסימפוניה הרביעית של ברהמס, יצירה שנכתבה בשיא הבגרות היצירתית של המלחין. הערב ייפתח בפתיחה לאופרה קוריולן של בטהובן.",
    img:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1200&q=80&auto=format&fit=crop",
  },
  {
    d: "22",
    m: "מאי",
    t: "21:00",
    title: "ערב ג׳אז · מחווה לאלה פיצג׳רלד",
    venue: "האולם הקאמרי",
    genre: "jazz",
    price: "₪95",
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "הרכב הג׳אז של המרכז בערב מחווה לאלה פיצג׳רלד, עם הזמרת נטע רוזנבלום. רפרטואר הכולל את הסטנדרטים הגדולים ויצירות מההקלטות האייקוניות של פיצג׳רלד עם אלינגטון ו-Basie.",
    img:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    d: "29",
    m: "מאי",
    t: "19:00",
    title: "קונצרט סיום · תזמורת הנוער",
    venue: "האודיטוריום המרכזי",
    genre: "classical",
    price: "₪80",
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "תזמורת הנוער הייצוגית בניצוחו של ג׳פרי הווארד — קונצרט הגמר העונתי. על התוכנית: דבוז׳ק, מנדלסון וקטע בכורה מקורי של רני גולן.",
    img:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1200&q=80&auto=format&fit=crop",
  },
  {
    d: "04",
    m: "יוני",
    t: "17:00",
    title: "פיטר והזאב · קונצרט לילדים",
    venue: "האודיטוריום המרכזי",
    genre: "kids",
    price: "₪60",
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "הסיפור הקלאסי של פרוקופייב בגרסה מרתקת המותאמת לגילאי 4–10, עם מספר חי ותזמורת כלי קשת על הבמה. ההזדמנות להכיר מקרוב את הכלים של התזמורת.",
    img:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80&auto=format&fit=crop",
  },
  {
    d: "12",
    m: "יוני",
    t: "20:30",
    title: "ליל שירה ישראלית",
    venue: "האולם הקאמרי",
    genre: "israeli",
    price: "₪90",
    soldness: "full",
    soldLabel: "אולם כמעט מלא",
    desc:
      "ערב של שירי ארץ ישראל והזמר העברי בעיבודים חדשים של רני גולן. עם המקהלה העירונית הייצוגית וסולנים אורחים, כולל הזמרת אחינעם ניני במופע פתיחה.",
    img:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80&auto=format&fit=crop",
  },
  {
    d: "18",
    m: "יוני",
    t: "20:00",
    title: "מוצרט · הדיברטימנטו בפה במז׳ור",
    venue: "האולם הקאמרי",
    genre: "classical",
    price: "₪110",
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "רביעיית כלי קשת של המרכז מבצעת את הדיברטימנטו K.138 של מוצרט לצד יצירות של היידן. ערב של מוסיקה קאמרית אינטימית באולם הקאמרי.",
    img:
      "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&q=80&auto=format&fit=crop",
  },
  {
    d: "25",
    m: "יוני",
    t: "21:00",
    title: "Blue Note · ערב ג׳אז מודרני",
    venue: "האולם הקאמרי",
    genre: "jazz",
    price: "₪95",
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "הרכב הג׳אז של המרכז מגיש ערב המוקדש ליצירות מתקופת Blue Note של שנות ה-60: הרבי הנקוק, וויין שורטר, ארט בלייקי ועוד. הרכב מורחב עם נגני אורח.",
    img:
      "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=1200&q=80&auto=format&fit=crop",
  },
  {
    d: "02",
    m: "יולי",
    t: "17:00",
    title: "קרנבל החיות · מופע משפחתי",
    venue: "האודיטוריום המרכזי",
    genre: "kids",
    price: "₪55",
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "היצירה האלמותית של סן-סאנס בגרסה משפחתית, עם הדגמות כלים ומילות קישור. תזמורת כלי קשת של המרכז מנצחת מרינה זיסקינד.",
    img:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80&auto=format&fit=crop",
  },
  {
    d: "09",
    m: "יולי",
    t: "20:30",
    title: "גאלה · סיום שנת הלימודים",
    venue: "האודיטוריום המרכזי",
    genre: "classical",
    price: "₪130",
    soldness: "hot",
    soldLabel: "מקומות אחרונים",
    desc:
      "הקונצרט הגדול של סיום העונה — התזמורת הסימפונית, המקהלה העירונית ותזמורת הנוער יחד על הבמה. רפרטואר כולל בטהובן, ורדי וקטעי בכורה של תלמידי תוכנית המצוינות.",
    img:
      "https://images.unsplash.com/photo-1580651315530-69c8e0903883?w=1200&q=80&auto=format&fit=crop",
  },
  {
    d: "16",
    m: "יולי",
    t: "20:00",
    title: "מתאן קיסר · ערב ישראלי",
    venue: "האולם הקאמרי",
    genre: "israeli",
    price: "₪100",
    soldness: "open",
    soldLabel: "כרטיסים זמינים",
    desc:
      "הזמר והיוצר מתאן קיסר באירוח המקהלה העירונית — שיריו המוכרים בעיבודים מקהלתיים חדשים של רני גולן. ערב מיוחד של פגישה בין יוצרים.",
    img:
      "https://images.unsplash.com/photo-1514119412350-e174d90d280e?w=1200&q=80&auto=format&fit=crop",
  },
];

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
