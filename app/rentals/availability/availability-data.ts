export type VenueKind = "hall" | "studio" | "rehe" | "class";

export type Slot = {
  id: string;
  title: string;
  time: string;
  desc: string;
  priceWeek: number;
  priceWknd: number;
};

export type PricingRow = [pkg: string, weekday: string, weekend: string, note: string];

export type EquipmentCategory = "pa" | "mic" | "ins" | "rec" | "light" | "misc";

export type EquipmentItem = {
  name: string;
  spec: string;
  cat: EquipmentCategory;
  price: number;
  qty: number;
};

export type AvailabilityVenue = {
  kind: VenueKind;
  name: string;
  meta: string;
  cap: string;
  hours: string;
  min: string;
  crew: string;
  base: string;
  baseRate: number;
  img: string;
  thumb: string;
  pricing: PricingRow[];
  slots: Slot[];
  equipment: string[];
};

export const EQ_CATALOG: Record<string, EquipmentItem> = {
  // PA / Mixing
  mix_dlive: { name: "Allen & Heath dLive S5000", spec: "128 ערוצים · DSP מלא · UI להפקות גדולות", cat: "pa", price: 0, qty: 1 },
  mix_ssl: { name: "SSL AWS 948 δ-edition", spec: "מיקסר אנלוגי 48 ערוצים · אינטגרציית DAW", cat: "pa", price: 0, qty: 1 },
  mix_x32: { name: "Behringer X32", spec: "32 ערוצים · דיגיטלי · נייד", cat: "pa", price: 800, qty: 2 },
  pa_main: { name: "L-Acoustics Kara II Line", spec: "מערך תליה ראשי · 2×6 קופסאות + 2 SUB", cat: "pa", price: 0, qty: 1 },
  pa_kiva: { name: "L-Acoustics Kiva II", spec: "מערך נייד · אולמות עד 250 מקומות", cat: "pa", price: 0, qty: 2 },
  monitor: { name: "מסכי במה d&b M4", spec: "מסכי החזרה אישיים · 4 ערוצים נפרדים", cat: "pa", price: 0, qty: 8 },
  iem: { name: "Shure PSM-1000 IEM", spec: "מערכת אוזניות אלחוטיות · עד 6 משדרים", cat: "pa", price: 1200, qty: 6 },

  // Microphones
  mic_sm58: { name: "Shure SM58", spec: "מיקרופון ווקאל דינמי · קלאסיקה", cat: "mic", price: 0, qty: 12 },
  mic_sm57: { name: "Shure SM57", spec: "מיקרופון אינסטרומנט · תופים, גיטרה, נחושת", cat: "mic", price: 0, qty: 10 },
  mic_ksm9: { name: "Shure KSM9 אלחוטי", spec: "ווקאל אלחוטי קונדנסר · ערוץ דיגיטלי", cat: "mic", price: 350, qty: 8 },
  mic_dpa: { name: "DPA 4099 (לכלי מיתר)", spec: "מיקרופון קליפ לכינור, צ׳לו, נשיפה", cat: "mic", price: 250, qty: 10 },
  mic_neumann: { name: "Neumann KM 184 זוג", spec: "זוג מיקרופוני אולם קונדנסר · להקלטה אקוסטית", cat: "mic", price: 600, qty: 2 },
  mic_dpa4011: { name: "DPA 4011 זוג", spec: "זוג קונדנסר Cardioid להקלטה קלאסית", cat: "mic", price: 800, qty: 1 },
  mic_lavalier: { name: "DPA 4061 לאוואלייר", spec: "מיקרופון דש אלחוטי · לדוברים, מנחים", cat: "mic", price: 280, qty: 6 },
  mic_kick: { name: "AKG D112 (Kick)", spec: "מיקרופון תוף בס", cat: "mic", price: 0, qty: 2 },

  // Instruments
  ins_steinway: { name: "Steinway D-274", spec: "פסנתר כנף קונצרט · 9 רגל · באולם בלבד", cat: "ins", price: 0, qty: 1 },
  ins_yamaha_c7: { name: "Yamaha C7X", spec: "פסנתר כנף 7½ רגל · אולם קאמרי", cat: "ins", price: 0, qty: 1 },
  ins_kawai: { name: "Kawai GX-2", spec: "פסנתר כנף בייבי · חזרות וכיתות", cat: "ins", price: 0, qty: 4 },
  ins_upright: { name: "פסנתר עומד Yamaha U3", spec: "פסנתר עומד · להוראה ולחזרות", cat: "ins", price: 0, qty: 6 },
  ins_drumkit: { name: "Yamaha Maple Custom Drums", spec: "מערכת תופים מלאה · 4 פיסס + צ׳יילו", cat: "ins", price: 450, qty: 2 },
  ins_amps: { name: "מגברי גיטרה (Fender / Marshall)", spec: "מגברי במה · גיטרה ובס", cat: "ins", price: 350, qty: 4 },
  ins_harp: { name: "נבל Salvi Daphne 47", spec: "נבל קונצרט · להזמנה מראש בלבד", cat: "ins", price: 1200, qty: 1 },
  ins_marimba: { name: "מארימבה Marimba One", spec: "5 אוקטבות · רוזווד", cat: "ins", price: 800, qty: 1 },

  // Recording
  rec_protools: { name: "תחנת Pro Tools HDX", spec: "64 ערוצים בו-זמנית · Avid HDX", cat: "rec", price: 0, qty: 1 },
  rec_dante: { name: "מערכת Dante 64×64", spec: "תשתית רשת אודיו דיגיטלית", cat: "rec", price: 0, qty: 1 },
  rec_engineer: { name: "מהנדס הקלטה ראשי", spec: "6 שעות · עריכה ראשונה כלולה", cat: "rec", price: 2400, qty: 1 },
  rec_video: { name: "הקלטת וידאו 4K (3 מצלמות)", spec: "הפקת וידאו · עריכה לא כלולה", cat: "rec", price: 4500, qty: 1 },
  rec_stream: { name: "הזרמה חיה (Multi-platform)", spec: "YouTube · Facebook · Vimeo · ספירת צופים", cat: "rec", price: 1800, qty: 1 },

  // Lighting + stage
  light_basic: { name: "תאורת LED בסיסית", spec: "12 גופי LED RGB · לוח הפעלה", cat: "light", price: 0, qty: 1 },
  light_full: { name: "עיצוב תאורה מלא", spec: "מעצב תאורה · 30 גופים · נשלט DMX", cat: "light", price: 2800, qty: 1 },
  light_movers: { name: "גופים זזים Robe Pointe", spec: "8 גופים · להפקות גדולות", cat: "light", price: 1600, qty: 1 },
  stage_riser: { name: "בימות ניידות (1×2 מ׳)", spec: "בימה מודולרית · בגבהים שונים", cat: "light", price: 180, qty: 12 },
  stage_truss: { name: "מערכת טרסים תלייה", spec: "מבנה תלייה · 8 מטר רוחב", cat: "light", price: 900, qty: 1 },

  // Misc
  misc_chairs: { name: "כסאות תזמורת (Wenger)", spec: "כסא נגן מתכוונן", cat: "misc", price: 0, qty: 80 },
  misc_stands: { name: "סטנדרים לתווים", spec: "סטנד נגן + מנורת LED", cat: "misc", price: 0, qty: 80 },
  misc_podium: { name: "פודיום מנצח", spec: "פודיום מוגבה למנצח · עם סטנד", cat: "misc", price: 0, qty: 2 },
  misc_piano_tune: { name: "כיוונון פסנתר לפני האירוע", spec: "מכוון מקצועי · בוקר האירוע", cat: "misc", price: 850, qty: 1 },
  misc_translation: { name: "מערכת תרגום סימולטני", spec: "50 מקלטים · 2 תאי מתרגמים", cat: "misc", price: 1400, qty: 1 },
};

export const EQ_CATEGORIES: { id: "all" | EquipmentCategory; label: string }[] = [
  { id: "all", label: "הכל" },
  { id: "pa", label: "הגברה ומיקסרים" },
  { id: "mic", label: "מיקרופונים" },
  { id: "ins", label: "כלי נגינה" },
  { id: "rec", label: "הקלטה" },
  { id: "light", label: "תאורה ובמה" },
  { id: "misc", label: "אביזרים נוספים" },
];

const hallSlots = (
  m1: string,
  m2: string,
  a1: string,
  a2: string,
  e1: string,
  e2: string,
  prices: [number, number][]
): Slot[] => [
  {
    id: "morning",
    title: "בוקר",
    time: `${m1} – ${m2}`,
    desc: "חזרות, סדנאות, פעילות חינוך",
    priceWeek: prices[0][0],
    priceWknd: prices[0][1],
  },
  {
    id: "afternoon",
    title: "אחה״צ",
    time: `${a1} – ${a2}`,
    desc: "הפקות וידאו, חזרות כלליות",
    priceWeek: prices[1][0],
    priceWknd: prices[1][1],
  },
  {
    id: "evening",
    title: "ערב מופע",
    time: `${e1} – ${e2}`,
    desc: "ערב מופע מלא · כולל צוות הפקה",
    priceWeek: prices[2][0],
    priceWknd: prices[2][1],
  },
];

export const VENUES: Record<string, AvailabilityVenue> = {
  auditorium: {
    kind: "hall",
    name: "האודיטוריום המרכזי",
    meta: "470 מקומות · Steinway D-274 · 120 מ״ר במה",
    cap: "470 מקומות",
    hours: "07:00 – 23:00",
    min: "4 שעות",
    crew: "קול · תאורה · ניהול במה",
    base: "₪1,800 / שעה",
    baseRate: 1800,
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪1,800", "₪2,400", "מינימום 4 שעות"],
      ["חצי יום (5 שעות)", "₪7,800", "₪10,500", "בין 8:00–14:00 או 16:00–22:00"],
      ["יום מלא (10 שעות)", "₪14,000", "₪19,000", "כולל זמן הקמה ופירוק"],
      ["ערב מופע", "₪22,000", "₪28,000", "כולל מהנדס קול ראשי"],
    ],
    slots: hallSlots("07:00", "12:00", "13:00", "17:00", "18:00", "23:00", [
      [8500, 11500],
      [7000, 9500],
      [11000, 14000],
    ]),
    equipment: [
      "mix_dlive", "pa_main", "monitor", "iem", "mic_sm58", "mic_sm57", "mic_ksm9", "mic_dpa", "mic_neumann", "mic_lavalier", "mic_kick",
      "ins_steinway", "ins_drumkit", "ins_amps", "ins_harp", "ins_marimba",
      "rec_protools", "rec_dante", "rec_engineer", "rec_video", "rec_stream",
      "light_basic", "light_full", "light_movers", "stage_riser", "stage_truss",
      "misc_chairs", "misc_stands", "misc_podium", "misc_piano_tune", "misc_translation",
    ],
  },
  chamber: {
    kind: "hall",
    name: "האולם הקאמרי",
    meta: "180 מקומות · Yamaha C7X · אקוסטיקה טבעית",
    cap: "180 מקומות",
    hours: "08:00 – 22:00",
    min: "3 שעות",
    crew: "קול · ניהול במה",
    base: "₪900 / שעה",
    baseRate: 900,
    img: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1519683109079-d5f539e1542f?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪900", "₪1,200", "מינימום 3 שעות"],
      ["חצי יום (5 שעות)", "₪3,800", "₪5,200", "בין 8:00–14:00 או 16:00–22:00"],
      ["יום מלא (10 שעות)", "₪7,200", "₪9,800", "כולל זמן הקמה ופירוק"],
      ["ערב מופע", "₪11,000", "₪14,500", "כולל מהנדס קול"],
    ],
    slots: hallSlots("08:00", "12:00", "13:00", "17:00", "18:00", "22:00", [
      [3600, 4800],
      [3600, 4800],
      [5800, 7600],
    ]),
    equipment: [
      "mix_x32", "pa_kiva", "monitor", "mic_sm58", "mic_ksm9", "mic_dpa", "mic_neumann", "mic_dpa4011", "mic_lavalier",
      "ins_yamaha_c7", "ins_amps",
      "rec_protools", "rec_engineer", "rec_video", "rec_stream",
      "light_basic", "light_full", "stage_riser",
      "misc_chairs", "misc_stands", "misc_podium", "misc_piano_tune",
    ],
  },
  blackbox: {
    kind: "hall",
    name: "האולם השחור",
    meta: "120 מקומות · קונפיגורציה משתנה · תאורה מתוכנתת",
    cap: "120 מקומות (גמיש)",
    hours: "08:00 – 24:00",
    min: "4 שעות",
    crew: "קול · תאורה · במאי טכני",
    base: "₪750 / שעה",
    baseRate: 750,
    img: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪750", "₪950", "מינימום 4 שעות"],
      ["חצי יום (5 שעות)", "₪3,200", "₪4,200", "הצבת ישיבה גמישה"],
      ["יום מלא (10 שעות)", "₪6,000", "₪8,000", "כולל הקמה ופירוק"],
      ["ערב מופע", "₪9,500", "₪12,500", "כולל תאורה ובמאי טכני"],
    ],
    slots: hallSlots("08:00", "12:00", "13:00", "17:00", "18:00", "24:00", [
      [3000, 4000],
      [3000, 4000],
      [4800, 6400],
    ]),
    equipment: [
      "mix_x32", "pa_kiva", "monitor", "mic_sm58", "mic_sm57", "mic_ksm9", "mic_lavalier",
      "ins_kawai", "ins_drumkit", "ins_amps",
      "rec_video", "rec_stream",
      "light_basic", "light_full", "light_movers", "stage_riser", "stage_truss",
      "misc_chairs", "misc_stands",
    ],
  },
  foyer: {
    kind: "hall",
    name: "הפויאה ההיסטורית",
    meta: "90 מקומות עומד · אירועי קוקטייל · גלריה",
    cap: "90 מקומות (עומד)",
    hours: "10:00 – 23:00",
    min: "3 שעות",
    crew: "מארח · טכנאי קול",
    base: "₪600 / שעה",
    baseRate: 600,
    img: "https://images.unsplash.com/photo-1571266028243-d220bc476f63?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1571266028243-d220bc476f63?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪600", "₪800", "מינימום 3 שעות"],
      ["חצי יום (5 שעות)", "₪2,400", "₪3,200", "מתאים לפתיחות תערוכה"],
      ["ערב קוקטייל", "₪5,800", "₪7,400", "כולל הגברה ניידת"],
      ["יום מלא", "₪4,500", "₪6,000", "יום עיון או כנס בוקר"],
    ],
    slots: hallSlots("10:00", "13:00", "14:00", "17:00", "19:00", "23:00", [
      [1800, 2400],
      [1800, 2400],
      [3200, 4200],
    ]),
    equipment: [
      "mix_x32", "pa_kiva", "mic_sm58", "mic_ksm9", "mic_lavalier",
      "ins_kawai",
      "rec_stream",
      "light_basic", "stage_riser",
      "misc_chairs", "misc_stands",
    ],
  },
  studio: {
    kind: "studio",
    name: "הסטודיו המקצועי A",
    meta: "85 מ״ר · SSL AWS 948 · עד 25 נגנים",
    cap: "עד 25 נגנים",
    hours: "09:00 – 24:00",
    min: "4 שעות",
    crew: "מהנדס קול ראשי · עוזר הפקה",
    base: "₪1,200 / שעה",
    baseRate: 1200,
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪1,200", "₪1,500", "מינימום 4 שעות · כולל מהנדס"],
      ["חצי יום (5 שעות)", "₪5,400", "₪6,800", "הקלטה + עריכה ראשונית"],
      ["יום מלא (10 שעות)", "₪10,000", "₪12,500", "הקלטה + מיקס ראשוני"],
      ["חבילת אלבום (5 ימים)", "₪42,000", "₪52,000", "כולל מאסטרינג ראשוני"],
    ],
    slots: [
      { id: "morning", title: "בוקר", time: "09:00 – 13:00", desc: "הקלטות סולו, voiceover, פודקאסטים", priceWeek: 4800, priceWknd: 6000 },
      { id: "afternoon", title: "אחה״צ", time: "14:00 – 18:00", desc: "הרכבים בינוניים, תקליטי לייב", priceWeek: 4800, priceWknd: 6000 },
      { id: "evening", title: "ערב לילה", time: "19:00 – 24:00", desc: "הרכבים גדולים, הקלטה מתוזמרת", priceWeek: 6000, priceWknd: 7500 },
    ],
    equipment: [
      "mix_ssl", "monitor", "iem", "mic_sm58", "mic_sm57", "mic_ksm9", "mic_dpa", "mic_neumann", "mic_dpa4011", "mic_lavalier", "mic_kick",
      "ins_kawai", "ins_drumkit", "ins_amps",
      "rec_protools", "rec_dante", "rec_engineer",
      "misc_chairs", "misc_stands", "misc_piano_tune",
    ],
  },
  studioB: {
    kind: "studio",
    name: "סטודיו B · בקרה",
    meta: "32 מ״ר · ProTools HDX · מיקס ומאסטרינג",
    cap: "עד 6 נגנים",
    hours: "09:00 – 24:00",
    min: "3 שעות",
    crew: "מהנדס מיקס",
    base: "₪650 / שעה",
    baseRate: 650,
    img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪650", "₪820", "מינימום 3 שעות"],
      ["חצי יום", "₪2,800", "₪3,500", "הקלטה אינטימית או מיקס"],
      ["יום מלא", "₪5,200", "₪6,500", "מיקס + מאסטרינג ראשוני"],
      ["חבילת מיקס", "₪8,400", "₪10,500", "3 ימי מיקס לאלבום"],
    ],
    slots: [
      { id: "morning", title: "בוקר", time: "09:00 – 13:00", desc: "מיקס ומאסטרינג עם מהנדס בית", priceWeek: 2600, priceWknd: 3300 },
      { id: "afternoon", title: "אחה״צ", time: "14:00 – 18:00", desc: "הקלטה אינטימית · סולן או דואט", priceWeek: 2600, priceWknd: 3300 },
      { id: "evening", title: "ערב", time: "19:00 – 23:00", desc: "מיקס ארוך · התייחסות ביקורתית", priceWeek: 2600, priceWknd: 3300 },
    ],
    equipment: [
      "mix_ssl", "monitor", "mic_sm58", "mic_dpa", "mic_neumann", "mic_lavalier",
      "rec_protools", "rec_dante", "rec_engineer",
    ],
  },
  vocalbooth: {
    kind: "studio",
    name: "תא ווקאל · Iso Booth",
    meta: "8 מ״ר · Neumann U87 · voiceover ופודקאסט",
    cap: "יחיד",
    hours: "08:00 – 22:00",
    min: "2 שעות",
    crew: "אופציונלי",
    base: "₪320 / שעה",
    baseRate: 320,
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪320", "₪400", "מינימום 2 שעות"],
      ["חצי יום", "₪1,400", "₪1,750", "voiceover מתמשך"],
      ["יום מלא", "₪2,600", "₪3,250", "הקלטת אודיובוק"],
      ["חבילת פודקאסט", "₪4,800", "₪6,000", "8 פרקים · כולל עריכה"],
    ],
    slots: [
      { id: "morning", title: "בוקר", time: "08:00 – 12:00", desc: "voiceover, פרסומות, נרציה", priceWeek: 1200, priceWknd: 1500 },
      { id: "afternoon", title: "אחה״צ", time: "13:00 – 17:00", desc: "פודקאסט · הקלטה ועריכה", priceWeek: 1200, priceWknd: 1500 },
      { id: "evening", title: "ערב", time: "18:00 – 22:00", desc: "אודיובוק · סשן ארוך", priceWeek: 1200, priceWknd: 1500 },
    ],
    equipment: ["mic_sm58", "mic_neumann", "mic_lavalier", "rec_protools", "rec_engineer"],
  },
  reheLarge: {
    kind: "rehe",
    name: "חדר חזרה גדול · Lev",
    meta: "60 מ״ר · פסנתר זנב Yamaha C3 · ראי במה",
    cap: "הרכב 12 נגנים",
    hours: "07:00 – 23:00",
    min: "2 שעות",
    crew: "ללא",
    base: "₪220 / שעה",
    baseRate: 220,
    img: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪220", "₪280", "מינימום 2 שעות"],
      ["חצי יום (5 שעות)", "₪950", "₪1,200", "מתאים לחזרת אנסמבל"],
      ["יום מלא (10 שעות)", "₪1,800", "₪2,300", "כולל הקמת מיקרופונים"],
      ["חבילת חזרות (10×)", "₪1,950", "₪2,500", "מנוי חודשי · 10 שעות"],
    ],
    slots: [
      { id: "morning", title: "בוקר", time: "07:00 – 12:00", desc: "חזרות אנסמבל · עומק אקוסטי", priceWeek: 950, priceWknd: 1200 },
      { id: "afternoon", title: "אחה״צ", time: "13:00 – 18:00", desc: "תזמורת קאמרית · קריאת תווים", priceWeek: 950, priceWknd: 1200 },
      { id: "evening", title: "ערב", time: "19:00 – 23:00", desc: "חזרת לילה · סבב הפקה", priceWeek: 950, priceWknd: 1200 },
    ],
    equipment: [
      "mix_x32", "pa_kiva", "monitor", "mic_sm58", "mic_sm57", "mic_dpa",
      "ins_kawai", "ins_drumkit", "ins_amps",
      "light_basic",
      "misc_chairs", "misc_stands", "misc_podium", "misc_piano_tune",
    ],
  },
  reheMid: {
    kind: "rehe",
    name: "חדר חזרה בינוני · Bach",
    meta: "32 מ״ר · פסנתר Upright · מראות",
    cap: "הרכב 6 נגנים",
    hours: "07:00 – 23:00",
    min: "1 שעה",
    crew: "ללא",
    base: "₪140 / שעה",
    baseRate: 140,
    img: "https://images.unsplash.com/photo-1471666875520-c75081f42081?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1471666875520-c75081f42081?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪140", "₪180", "מינימום שעה אחת"],
      ["חצי יום", "₪600", "₪780", "מתאים לחמישייה"],
      ["יום מלא", "₪1,150", "₪1,500", "הרכב גדול · אסיף יומי"],
      ["מנוי חודשי", "₪1,200", "₪1,560", "10 שעות · גמיש"],
    ],
    slots: [
      { id: "morning", title: "בוקר", time: "07:00 – 12:00", desc: "חזרת חמישייה / קווינטט", priceWeek: 600, priceWknd: 780 },
      { id: "afternoon", title: "אחה״צ", time: "13:00 – 18:00", desc: "דואט / טריו · עבודה דקה", priceWeek: 600, priceWknd: 780 },
      { id: "evening", title: "ערב", time: "19:00 – 23:00", desc: "חזרה מאוחרת · קונסרבטוריון", priceWeek: 600, priceWknd: 780 },
    ],
    equipment: [
      "mic_sm58", "mic_dpa", "ins_upright", "ins_amps", "misc_chairs", "misc_stands", "misc_piano_tune",
    ],
  },
  reheSmall: {
    kind: "rehe",
    name: "חדר אישי · Solo",
    meta: "14 מ״ר · פסנתר Upright · מתאים לתרגול",
    cap: "יחיד / דואט",
    hours: "06:00 – 24:00",
    min: "1 שעה",
    crew: "ללא",
    base: "₪70 / שעה",
    baseRate: 70,
    img: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪70", "₪90", "מינימום שעה"],
      ["חצי יום", "₪300", "₪380", "תרגול ממושך · סולן"],
      ["יום מלא", "₪560", "₪720", "10 שעות · ימי הכנה"],
      ["כרטיסיית 20×", "₪1,200", "—", "גמיש לאורך השנה"],
    ],
    slots: [
      { id: "morning", title: "בוקר", time: "06:00 – 12:00", desc: "תרגול שקט · ראיית בוקר", priceWeek: 350, priceWknd: 450 },
      { id: "afternoon", title: "אחה״צ", time: "13:00 – 18:00", desc: "תרגול אחה״צ · אחרי לימודים", priceWeek: 350, priceWknd: 450 },
      { id: "evening", title: "ערב", time: "19:00 – 24:00", desc: "תרגול ערב · שעות עומס מוזיקליות", priceWeek: 350, priceWknd: 450 },
    ],
    equipment: ["ins_upright", "misc_chairs", "misc_stands"],
  },
  classMaster: {
    kind: "class",
    name: "כיתת מאסטר · Mahler",
    meta: "45 מ״ר · במה מוגבהת · 30 מקומות צופים",
    cap: "30 מקומות",
    hours: "08:00 – 22:00",
    min: "2 שעות",
    crew: "תיעוד וידאו אופציונלי",
    base: "₪380 / שעה",
    baseRate: 380,
    img: "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪380", "₪480", "כולל פסנתר זנב"],
      ["חצי יום", "₪1,650", "₪2,100", "כיתת מאסטר חצי יום"],
      ["יום מלא", "₪3,100", "₪3,950", "כולל הקלטה ותיעוד"],
      ["סדנה (3 ימים)", "₪8,400", "₪10,800", "מתאימה לקורס קיץ"],
    ],
    slots: [
      { id: "morning", title: "בוקר", time: "08:00 – 12:00", desc: "כיתת מאסטר · 4 סטודנטים", priceWeek: 1650, priceWknd: 2100 },
      { id: "afternoon", title: "אחה״צ", time: "13:00 – 17:00", desc: "הרצאה אקדמית · עד 30 צופים", priceWeek: 1650, priceWknd: 2100 },
      { id: "evening", title: "ערב", time: "18:00 – 22:00", desc: "הופעת חניכים · קונצרט סטודנטים", priceWeek: 1650, priceWknd: 2100 },
    ],
    equipment: [
      "mix_x32", "mic_sm58", "mic_lavalier", "mic_dpa",
      "ins_kawai",
      "rec_video", "rec_stream",
      "light_basic",
      "misc_chairs", "misc_stands", "misc_podium",
    ],
  },
  classRoom: {
    kind: "class",
    name: "כיתת תיאוריה · Schenker",
    meta: "28 מ״ר · לוח חכם · פסנתר",
    cap: "16 תלמידים",
    hours: "08:00 – 22:00",
    min: "1 שעה",
    crew: "ללא",
    base: "₪180 / שעה",
    baseRate: 180,
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1600&q=80&auto=format&fit=crop",
    thumb: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&q=80&auto=format&fit=crop",
    pricing: [
      ["שעה בודדת", "₪180", "₪220", "מינימום שעה"],
      ["חצי יום", "₪780", "₪960", "הוראה מתמשכת"],
      ["יום מלא", "₪1,450", "₪1,800", "יום הוראה מלא"],
      ["מנוי שנתי (סמסטר)", "₪14,000", "—", "שעה שבועית · 28 שבועות"],
    ],
    slots: [
      { id: "morning", title: "בוקר", time: "08:00 – 12:00", desc: "תיאוריה, סולפג׳, היסטוריה", priceWeek: 780, priceWknd: 960 },
      { id: "afternoon", title: "אחה״צ", time: "13:00 – 17:00", desc: "שיעורים פרטניים · קונסרבטוריון", priceWeek: 780, priceWknd: 960 },
      { id: "evening", title: "ערב", time: "18:00 – 22:00", desc: "מבוגרים · לימודי ערב", priceWeek: 780, priceWknd: 960 },
    ],
    equipment: ["mic_lavalier", "ins_upright", "rec_stream", "misc_chairs", "misc_stands"],
  },
};

export const KIND_LABEL: Record<VenueKind, string> = {
  hall: "אולם מופע",
  studio: "סטודיו הקלטות",
  rehe: "חדר חזרה",
  class: "כיתת הוראה",
};

export const KIND_TAG_CLASS: Record<VenueKind, string> = {
  hall: "tag-hall",
  studio: "tag-studio",
  rehe: "tag-rehe",
  class: "tag-class",
};

export const HE_MONTHS = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

export const HE_DAYS = [
  "יום ראשון",
  "יום שני",
  "יום שלישי",
  "יום רביעי",
  "יום חמישי",
  "יום שישי",
  "שבת",
];
