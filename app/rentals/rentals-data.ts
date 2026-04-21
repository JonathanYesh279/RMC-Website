export type HeroStat = { n: string; l: string };

export type VenueSpec = { dt: string; dd: string };
export type VenueCta = { label: string; href: string; variant: "ink" | "outline" | "coral" };

export type Venue = {
  id: string;
  number: string;
  numberTone: "amber" | "coral" | "teal";
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  specs: VenueSpec[];
  ctas: VenueCta[];
};

export type Service = {
  title: string;
  description: string;
  icon: "mic" | "lights" | "video" | "stage";
};

export type ProcessStep = { title: string; description: string };

export type BookingContact = {
  title: string;
  body: string;
  icon: "pin" | "envelope" | "clock";
};

export const heroStats: HeroStat[] = [
  { n: "3", l: "חללים אקוסטיים" },
  { n: "650", l: "מקומות ישיבה כולל" },
  { n: "2", l: "פסנתרי קונצרט" },
  { n: "120+", l: "הפקות בשנה שעברה" },
];

export const venues: Venue[] = [
  {
    id: "auditorium",
    number: "01",
    numberTone: "amber",
    eyebrow: "החלל הגדול",
    title: "האודיטוריום המרכזי.",
    body: "הלב הפועם של המרכז — אולם קונצרטים של 470 מקומות עם אקוסטיקה מתכוונת, במה גדולה של 120 מ״ר ושני אזורי אורקסטרה. תוכנן על ידי BBM Akustik מברלין, אותו משרד שעיצב את פילהרמוניית אלבה בהמבורג.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&q=80&auto=format&fit=crop",
    specs: [
      { dt: "קיבולת", dd: "470 מקומות" },
      { dt: "במה", dd: "120 מ״ר" },
      { dt: "זמן הדהוד", dd: "1.8 שניות" },
      { dt: "פסנתר", dd: "Steinway D-274" },
      { dt: "תאורה", dd: "LED מלא + מערכת זרקורי חסך" },
      { dt: "קול", dd: "d&b audiotechnik Y-Series" },
    ],
    ctas: [
      { label: "בדיקת זמינות", href: "#contact", variant: "ink" },
      { label: "סיור וירטואלי 360°", href: "#", variant: "outline" },
    ],
  },
  {
    id: "chamber",
    number: "02",
    numberTone: "coral",
    eyebrow: "החלל האינטימי",
    title: "האולם הקאמרי.",
    body: "180 מקומות באקוסטיקה טבעית מעולה — חלל ללא מערכת הגברה, בנוי לביצועי מוסיקה קאמרית, ליד, ג׳אז אקוסטי ומפגשי קריאה. מוקף בפאנלים של עץ אלון איטלקי וקירות מפוסלים למקסימום פיזור קול.",
    image:
      "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1400&q=80&auto=format&fit=crop",
    specs: [
      { dt: "קיבולת", dd: "180 מקומות" },
      { dt: "במה", dd: "42 מ״ר" },
      { dt: "זמן הדהוד", dd: "1.4 שניות" },
      { dt: "פסנתר", dd: "Yamaha C7X" },
      { dt: "אקלים", dd: "בקרת לחות לכלים אקוסטיים" },
      { dt: "הקלטה", dd: "חיבור ישיר לסטודיו" },
    ],
    ctas: [
      { label: "בדיקת זמינות", href: "#contact", variant: "ink" },
      { label: "סיור וירטואלי 360°", href: "#", variant: "outline" },
    ],
  },
  {
    id: "studio",
    number: "03",
    numberTone: "teal",
    eyebrow: "סטודיו הקלטות",
    title: "הסטודיו המקצועי.",
    body: "חדר הקלטה אקוסטי של 85 מ״ר וחדר בקרה מאובזרים ברמה עולמית — יכולת להקליט הרכבים של עד 25 נגנים במקביל. מיקרופוני Neumann ו-Schoeps, קונסולת SSL AWS 948, מערכת צג Genelec 8351. צוות הנדסת קול פנימי.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400&q=80&auto=format&fit=crop",
    specs: [
      { dt: "חדר הקלטה", dd: "85 מ״ר · 6 מ׳ גובה" },
      { dt: "חדר בקרה", dd: "32 מ״ר · Genelec 8351" },
      { dt: "קונסולה", dd: "SSL AWS 948 Delta" },
      { dt: "מיקרופונים", dd: "Neumann U87/U47 · Schoeps CMC" },
      { dt: "DAW", dd: "Pro Tools HDX · Pyramix" },
      { dt: "תמיכה", dd: "מהנדס קול פנימי" },
    ],
    ctas: [
      { label: "הצעת מחיר", href: "#contact", variant: "ink" },
      { label: "דוגמאות הקלטה", href: "#", variant: "outline" },
    ],
  },
];

export const services: Service[] = [
  {
    title: "הנדסת קול",
    description:
      "צוות של 4 מהנדסי קול מוסמכים, מיקסים חיים, הקלטות מרובות ערוצים וערבוב במאסטרינג.",
    icon: "mic",
  },
  {
    title: "תאורת במה",
    description:
      "מערכת LED מלאה · 48 זרקורים ממוחשבים · מעצב תאורה פנימי לעיצוב אווירה לפי המופע.",
    icon: "lights",
  },
  {
    title: "תיעוד וידאו",
    description:
      "3 מצלמות 4K קבועות, בקרה מרכזית, הזרמה חיה ל-YouTube/Vimeo, הפקת עריכה סופית.",
    icon: "video",
  },
  {
    title: "ניהול במה",
    description:
      "מנהלי במה ותיקים · ניהול רפרטואר, מעברי סט, תיאום עם אמנים ומפיקים חיצוניים.",
    icon: "stage",
  },
];

export const processSteps: ProcessStep[] = [
  {
    title: "בדיקת זמינות",
    description:
      "פנייה ראשונית, בדיקת תאריכים והתאמה של החלל לאופי האירוע. תוך 48 שעות נחזור עם תשובה.",
  },
  {
    title: "פגישה וסיור",
    description:
      "סיור פיזי במקום, מפגש עם צוות הפקה, הגדרת דרישות טכניות וקבלת הצעת מחיר מפורטת.",
  },
  {
    title: "תכנון הפקה",
    description:
      "פגישות עבודה עם מהנדסי קול ותאורה, בניית לו״ז חזרות ובדיקת דרישות מיוחדות.",
  },
  {
    title: "יום האירוע",
    description:
      "צוות מלא על הבמה, חזרה טכנית מלאה, וליווי מקצועי לכל אורך האירוע עד לסיום הניקיון.",
  },
];

export const clients: string[] = [
  "הפילהרמונית הישראלית",
  "קרן ברכה",
  "כאן 11",
  "Universal Music",
  "תיאטרון הבימה",
  "מרכז סוזן דלל",
  "קול המוסיקה",
];

export const bookingContacts: BookingContact[] = [
  {
    title: "הפקות ואולמות",
    body: "מאיה אברהמי · מנהלת הפקות · rentals@raanana-music.co.il",
    icon: "pin",
  },
  {
    title: "סטודיו הקלטות",
    body: "רני דנגוט · מהנדס קול ראשי · studio@raanana-music.co.il",
    icon: "envelope",
  },
  {
    title: "שעות פעילות",
    body: "ימים א׳–ה׳ 09:00–18:00 · ו׳ 09:00–13:00 · סיורים לפי תיאום",
    icon: "clock",
  },
];
