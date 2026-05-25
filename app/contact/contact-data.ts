// Static contact-page content, transcribed from the approved design
// (contact-v1-verbose.html). Kept here so the page component stays markup-only.

export type InfoBlock = {
  icon: "parking" | "clock" | "mail";
  title: string;
  // Either prose lines or an hours table — never both.
  lines?: string[];
  hours?: { day: string; time: string; closed?: boolean }[];
  email?: string;
  emailNote?: string;
};

export const infoBlocks: InfoBlock[] = [
  {
    icon: "parking",
    title: "חניה",
    lines: [
      "חניון ציבורי בתשלום בבניין הקונסרבטוריון, גישה דרך רחוב אצטיון.",
      "חניות כחול-לבן לאורך רחוב אחוזה ורחוב ירושלים — חינם בערב ובשבת.",
    ],
  },
  {
    icon: "clock",
    title: "שעות פעילות המשרד",
    hours: [
      { day: "ימי א׳ – ה׳", time: "11:00 – 22:00" },
      { day: "יום ו׳ וערבי חג", time: "09:00 – 14:00" },
      { day: "שבת וחגים", time: "סגור", closed: true },
      { day: "חופשת קיץ (יולי-אוגוסט)", time: "09:00 – 14:00" },
    ],
  },
  {
    icon: "mail",
    title: "פניות כלליות",
    email: "info@music-raanana.org.il",
    emailNote: "פקס: 09-774-1288",
  },
];

export type StaffMember = {
  name: string;
  role: string;
  blurb: string;
  email: string;
  photo: string;
  accent: "coral" | "amber" | "teal" | "ink";
};

export const staff: StaffMember[] = [
  {
    name: "לימור אקטע",
    role: "ניהול ומינהל",
    blurb:
      "מנהלת המרכז — אחראית על תפעול שוטף, הובלת הצוות החינוכי וייצוג המוסד מול הרשות והעירייה.",
    email: "limora@raanana.muni.il",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&auto=format&fit=crop&crop=faces",
    accent: "coral",
  },
  {
    name: "משה בן-יוחנה",
    role: "סגן מנהל",
    blurb:
      "סגן מנהלת המרכז — אחראי על תוכניות ייחודיות, הרכבים ייצוגיים ועל ניהול האולמות והאודיטוריום.",
    email: "mosheby.rmc@gmail.com",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80&auto=format&fit=crop&crop=faces",
    accent: "amber",
  },
  {
    name: "ריטה אסקין",
    role: "מינהלה ורישום",
    blurb:
      "רכזת אדמיניסטרטיבית — נקודת מענה ראשונה לכל בעלי העניין: הרשמה, גביה, טפסים, אישורים ושיבוץ שיעורים.",
    email: "ritae@raanana.muni.il",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&auto=format&fit=crop&crop=faces",
    accent: "teal",
  },
  {
    name: "ריקרדו ורטהיימר",
    role: "שיווק ועיתונות",
    blurb:
      "מנהל שיווק המרכז — אחראי על קמפיינים, ניהול הקונצרטים מול הקהל, יחסי ציבור ופניות התקשורת.",
    email: "ricardo@raanana.muni.il",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&auto=format&fit=crop&crop=faces",
    accent: "ink",
  },
];

export type RouteCard = {
  title: string;
  body: string;
  phone: string;
  phoneHref: string;
  email: string;
};

export const routeCards: RouteCard[] = [
  {
    title: "הרשמה לקונסרבטוריון",
    body: "שיבוץ שיעור פרטני, רישום למקהלות ולתזמורות, מלגות וטפסים. מומלץ לפנות בכתב לרכזת המינהלית עם פרטי התלמיד והנושא.",
    phone: "09-771-1330",
    phoneHref: "tel:+97297711330",
    email: "ritae@raanana.muni.il",
  },
  {
    title: "שכירויות ובדיקת זמינות",
    body: "השכרת האודיטוריום, האולם הקאמרי וסטודיו ההקלטות — תיאום, הצעת מחיר וצוות טכני. תשובות לפניות בדרך כלל תוך 48 שעות.",
    phone: "09-774-0559",
    phoneHref: "tel:+97297740559",
    email: "mosheby.rmc@gmail.com",
  },
  {
    title: "קופת הקונצרטים",
    body: "רכישת כרטיסים לקונצרטים ולמופעי הילדים, מנויים עונתיים, החזרים ואיבוד כרטיסים. הקופה פתוחה שעה לפני כל מופע.",
    phone: "09-771-1330",
    phoneHref: "tel:+97297711330",
    email: "ricardo@raanana.muni.il",
  },
];

export const topicOptions = [
  "הרשמה לקונסרבטוריון",
  "שכירות אולם / סטודיו",
  "כרטיסים לקונצרט",
  "מלגות וסיוע",
  "פניות תקשורת",
  "אחר",
];

export type AccessibilityRow = {
  institution: string;
  address: string;
  // Each column after the address is a yes/no facility.
  facilities: { label: string; available: boolean }[];
};

export const accessibilityColumns = [
  "חניה",
  "גישה רציפה",
  "מעלית",
  "עמדת שירות נגישה",
  "שירותי נכים",
];

export const accessibilityRows: AccessibilityRow[] = [
  {
    institution: "מרכז פיס למוסיקה רעננה",
    address: "אצטיון 48",
    facilities: accessibilityColumns.map((label) => ({ label, available: true })),
  },
];

// Google Maps embed for אצטיון 48 רעננה.
export const mapEmbedSrc =
  "https://www.google.com/maps?q=%D7%90%D7%A6%D7%98%D7%99%D7%95%D7%9F%2048%20%D7%A8%D7%A2%D7%A0%D7%A0%D7%94&hl=he&z=16&output=embed";
export const mapDirectionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Etzion+48+Raanana";
