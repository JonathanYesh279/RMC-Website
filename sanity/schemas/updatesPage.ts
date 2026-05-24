import { defineField, defineType } from "sanity";

const altField = defineField({
  name: "alt",
  title: "טקסט חלופי",
  type: "string",
  validation: (r) =>
    r.max(120).custom((alt, ctx) => {
      const parent = ctx.parent as { asset?: unknown } | undefined;
      if (parent?.asset && !alt)
        return "חובה להוסיף טקסט חלופי כשהועלתה תמונה";
      return true;
    }),
});

const dayRowField = (
  dayKey: string,
  dayTitle: string,
  initialTime: string,
  initialToday = false,
  initialClosed = false,
) =>
  defineField({
    name: dayKey,
    title: dayTitle,
    type: "object",
    group: "hours",
    fields: [
      defineField({
        name: "time",
        title: "שעות",
        description: 'למשל: ״14:00 – 20:00״, ״חופשת חג״ או ״סגור״.',
        type: "string",
        validation: (r) => r.max(40),
        initialValue: initialTime,
      }),
      defineField({
        name: "today",
        title: "סמן את היום הזה כ״היום״",
        description: "ההדגשה הירוקה בטבלה. סמנו רק יום אחד.",
        type: "boolean",
        initialValue: initialToday,
      }),
      defineField({
        name: "closed",
        title: "מציין שהמרכז סגור",
        description:
          "כשמסומן, השעות מוצגות באדום באותיות גדולות (״חופשת חג״, ״סגור״).",
        type: "boolean",
        initialValue: initialClosed,
      }),
    ],
    options: { columns: 3 },
  });

export default defineType({
  name: "updatesPage",
  title: "עמוד מידע ועדכונים",
  type: "document",
  groups: [
    { name: "hero", title: "🟦 כותרת ראשית", default: true },
    { name: "featured", title: "📣 עדכון מרכזי" },
    { name: "holidays", title: "🎉 חגים וחופשות" },
    { name: "hours", title: "🕘 שעות פעילות" },
    { name: "theory", title: "📋 מערכת השיעורים" },
    { name: "calendar", title: "🗓️ לוח שנה" },
    { name: "archive", title: "📦 ארכיון" },
    { name: "subscribe", title: "✉️ הרשמה לעדכונים" },
  ],
  fields: [
    // ── 🟦 Hero ──────────────────────────────────────────────────────
    defineField({
      name: "heroStatusPill",
      title: "תווית סטטוס מעל הכותרת",
      description:
        'התווית הקטנה בעיגול עם הנקודה הירוקה הפועמת. למשל: ״פורסם עדכון חדש — לפני 3 ימים״. אם תושאר ריקה, התווית לא תוצג.',
      type: "string",
      group: "hero",
      validation: (r) => r.max(80),
    }),
    defineField({
      name: "heroLede",
      title: "פסקת תיאור בכותרת",
      description: "הפסקה הקטנה מתחת לכותרת ״מידע ועדכונים.״.",
      type: "text",
      rows: 4,
      group: "hero",
      validation: (r) => r.max(400),
    }),
    defineField({
      name: "heroTodayLine",
      title: "שורת פעילות היום",
      description:
        'הטקסט שמופיע בכרטיסיית הסטטוס בצד הכותרת. למשל: ״היום ראשון · המרכז פעיל בשעות 14:00–20:00״.',
      type: "string",
      group: "hero",
      validation: (r) => r.max(120),
    }),

    // ── 📣 Featured update ───────────────────────────────────────────
    defineField({
      name: "featuredImage",
      title: "תמונת המודעה",
      description: "התמונה הגדולה של העדכון המרכזי. יחס מומלץ: 4:3.",
      type: "image",
      options: { hotspot: true },
      group: "featured",
      fields: [altField],
    }),
    defineField({
      name: "featuredStatusTag",
      title: "תווית סטטוס על התמונה",
      description: 'התווית האדומה בפינה. למשל: ״מודעה פעילה״.',
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "featuredEyebrowMain",
      title: "כותרת קטנה — חלק רגיל",
      description: 'החלק האפור של ה־eyebrow. למשל: ״חופשת חג ·״.',
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "featuredEyebrowEm",
      title: "כותרת קטנה — חלק מודגש",
      description: 'החלק האלמוגי של ה־eyebrow. למשל: ״פסח תשפ״ו״.',
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "featuredTitle",
      title: "כותרת העדכון",
      description: "הכותרת הראשית של המודעה.",
      type: "text",
      rows: 2,
      group: "featured",
      validation: (r) => r.max(200),
    }),
    defineField({
      name: "featuredBody",
      title: "פסקת תיאור",
      description: "הפסקה הקצרה שמתחת לכותרת.",
      type: "text",
      rows: 4,
      group: "featured",
      validation: (r) => r.max(500),
    }),
    defineField({
      name: "featuredMeta1Label",
      title: 'תווית מטא 1 (למשל: "תקופת חופשה")',
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "featuredMeta1Value",
      title: "ערך מטא 1",
      description: 'למשל: ״01.04 – 08.04״.',
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "featuredMeta1Sub",
      title: "תווית קטנה תחת ערך מטא 1",
      description: 'למשל: ״שמונה ימי חופשה״.',
      type: "string",
      group: "featured",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "featuredMeta2Label",
      title: 'תווית מטא 2 (למשל: "חזרה ללימודים")',
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "featuredMeta2Value",
      title: "ערך מטא 2",
      description: 'למשל: ״09.04.2026״.',
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "featuredMeta2Sub",
      title: "תווית קטנה תחת ערך מטא 2",
      description: 'למשל: ״יום חמישי · 14:00״.',
      type: "string",
      group: "featured",
      validation: (r) => r.max(60),
    }),

    // ── 🎉 Holidays ──────────────────────────────────────────────────
    defineField({
      name: "holidaysUpdatedLabel",
      title: "תווית ״עודכן״ בצד הימני של הסקציה",
      description:
        'הטקסט בצד הימני של ראש הסקציה. למשל: ״עודכן לפני 5 ימים״ — האדמין מעדכן ידנית.',
      type: "string",
      group: "holidays",
      validation: (r) => r.max(60),
    }),

    // ── 🕘 Activity hours ────────────────────────────────────────────
    defineField({
      name: "hoursAdminChip",
      title: "תווית טורקיז בראש הסקציה",
      description: 'למשל: ״תמונה דינמית · מתעדכנת לפי תקופה״.',
      type: "string",
      group: "hours",
      validation: (r) => r.max(80),
    }),
    defineField({
      name: "hoursValidUntil",
      title: 'תאריך תוקף ("בתוקף עד")',
      description: 'הטקסט שמופיע אחרי ״בתוקף עד״. למשל: ״31.03.2026״.',
      type: "string",
      group: "hours",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "hoursImage",
      title: "תמונת שעות הפעילות",
      description:
        "התמונה השמאלית של סקציית השעות. תמונה ייעודית לתקופה הנוכחית.",
      type: "image",
      options: { hotspot: true },
      group: "hours",
      fields: [altField],
    }),
    defineField({
      name: "hoursOverlayLabel",
      title: "תווית שכבת התמונה — תווית קטנה",
      description: 'הטקסט הקטן בכרטיסיה השחורה על התמונה. למשל: ״תוקף התמונה״.',
      type: "string",
      group: "hours",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "hoursOverlayValue",
      title: "תווית שכבת התמונה — ערך",
      description: 'הטקסט הגדול בכרטיסיה השחורה. למשל: ״תקופת חג פסח״.',
      type: "string",
      group: "hours",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "hoursOverlayBadge",
      title: "תג צהוב על התמונה",
      description: 'התג הצהוב הקטן. למשל: ״21.03 → 08.04״.',
      type: "string",
      group: "hours",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "hoursSideLede",
      title: "פסקת עזר בסיידבר השעות",
      description:
        "הפסקה הקצרה שמופיעה מתחת לכותרת ״שעות פתיחה — שבוע נוכחי״ בסיידבר הכהה.",
      type: "text",
      rows: 3,
      group: "hours",
      validation: (r) => r.max(300),
    }),
    dayRowField("hoursDaySunday", "ראשון", "14:00 – 20:00", true),
    dayRowField("hoursDayMonday", "שני", "14:00 – 21:00"),
    dayRowField("hoursDayTuesday", "שלישי", "14:00 – 21:00"),
    dayRowField("hoursDayWednesday", "רביעי", "14:00 – 21:00"),
    dayRowField("hoursDayThursday", "חמישי", "14:00 – 20:00"),
    dayRowField("hoursDayFriday", "שישי", "חופשת חג", false, true),
    dayRowField("hoursDaySaturday", "שבת", "סגור", false, true),
    defineField({
      name: "hoursNoteLead",
      title: "הערה — חלק מודגש",
      description: 'החלק שמופיע באותיות כתומות. למשל: ״שימו לב:״.',
      type: "string",
      group: "hours",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "hoursNoteBody",
      title: "הערה — גוף ההערה",
      description: "טקסט ההערה שמופיע אחרי החלק המודגש.",
      type: "text",
      rows: 3,
      group: "hours",
      validation: (r) => r.max(300),
    }),

    // ── 📋 Theory ────────────────────────────────────────────────────
    defineField({
      name: "theoryImage",
      title: "תמונת לוח השעות",
      description: "הצילום של לוח שעות התאוריה. יחס מומלץ: 16:10.",
      type: "image",
      options: { hotspot: true },
      group: "theory",
      fields: [altField],
    }),
    defineField({
      name: "theoryUpdatedDate",
      title: 'תאריך עדכון אחרון (אחרי "עודכן")',
      description: 'למשל: ״27.08.2025״.',
      type: "string",
      group: "theory",
      validation: (r) => r.max(40),
    }),

    // ── 🗓️ Yearly calendar ─────────────────────────────────────────
    defineField({
      name: "calendarImage",
      title: "תמונת לוח השנה השנתי",
      description: "התמונה השלמה של הלוח. יחס מומלץ: 4:3.",
      type: "image",
      options: { hotspot: true },
      group: "calendar",
      fields: [altField],
    }),
    defineField({
      name: "calendarAdminChip",
      title: "תווית טורקיז בראש הסקציה",
      description: 'למשל: ״תמונה שנתית״.',
      type: "string",
      group: "calendar",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "calendarPublishedDate",
      title: 'תאריך פרסום (אחרי "פורסם")',
      description: 'למשל: ״15.08.2025״.',
      type: "string",
      group: "calendar",
      validation: (r) => r.max(40),
    }),

    // ── 📦 Archive ───────────────────────────────────────────────────
    defineField({
      name: "archiveSummary",
      title: "תווית סיכום בצד הימני של הסקציה",
      description: 'למשל: ״12 עדכונים · שנת תשפ״ו״.',
      type: "string",
      group: "archive",
      validation: (r) => r.max(80),
    }),

    // ── ✉️ Subscribe ────────────────────────────────────────────────
    defineField({
      name: "subscribeLede",
      title: "פסקת תיאור ההרשמה",
      description: "הפסקה שמתחת לכותרת ״קבלו עדכונים ישירות למייל״.",
      type: "text",
      rows: 4,
      group: "subscribe",
      validation: (r) => r.max(400),
    }),
    defineField({
      name: "subscribeEmailPlaceholder",
      title: "טקסט בתוך שדה האימייל (placeholder)",
      description: 'למשל: ״כתובת המייל שלך״.',
      type: "string",
      group: "subscribe",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "subscribeSubmitLabel",
      title: "טקסט כפתור ההרשמה",
      description: 'למשל: ״הירשם״.',
      type: "string",
      group: "subscribe",
      validation: (r) => r.max(30),
    }),
    defineField({
      name: "subscribeChannelsHeading",
      title: 'כותרת לפני האייקונים החברתיים (למשל: "או עקבו אחרינו:")',
      type: "string",
      group: "subscribe",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "subscribeFacebookLabel",
      title: "טקסט לינק פייסבוק",
      type: "string",
      group: "subscribe",
      validation: (r) => r.max(30),
    }),
    defineField({
      name: "subscribeFacebookUrl",
      title: "כתובת פייסבוק",
      type: "url",
      group: "subscribe",
      validation: (r) =>
        r.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "subscribeInstagramLabel",
      title: "טקסט לינק אינסטגרם",
      type: "string",
      group: "subscribe",
      validation: (r) => r.max(30),
    }),
    defineField({
      name: "subscribeInstagramUrl",
      title: "כתובת אינסטגרם",
      type: "url",
      group: "subscribe",
      validation: (r) =>
        r.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    prepare: () => ({ title: "עמוד מידע ועדכונים" }),
  },
});
