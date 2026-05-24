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
        description:
          "ההדגשה הירוקה בטבלה. סמנו רק יום אחד. אם אף יום לא מסומן, האתר יזהה אוטומטית את היום הנוכחי.",
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
    { name: "hero", title: "1️⃣ כותרת ראשית", default: true },
    { name: "featured", title: "2️⃣ תמונה מרכזית (עדכון פעיל)" },
    { name: "holidays", title: "3️⃣ חגים, חופשות ואירועים" },
    { name: "hours", title: "4️⃣ שעות פעילות" },
    { name: "theory", title: "5️⃣ מערכת השיעורים" },
    { name: "calendar", title: "6️⃣ לוח שנה" },
    { name: "archive", title: "7️⃣ עדכונים קודמים" },
    { name: "subscribe", title: "8️⃣ הרשמה לעדכונים" },
  ],
  fields: [
    // ── 1️⃣ Hero ─────────────────────────────────────────────────────
    defineField({
      name: "heroLede",
      title: "פסקת תיאור בכותרת",
      description: "הפסקה הקטנה מתחת לכותרת ״מידע ועדכונים.״.",
      type: "text",
      rows: 4,
      group: "hero",
      validation: (r) => r.max(400),
    }),
    // NOTE: heroStatusPill ("פורסם עדכון חדש — לפני X ימים") is computed
    //       automatically from the most recent archive item.
    // NOTE: heroTodayLine is computed automatically from the day-of-week
    //       and the matching שעות פעילות row below.

    // ── 2️⃣ Featured (Big image) — image-only ───────────────────────
    defineField({
      name: "featuredImage",
      title: "תמונת המודעה הגדולה",
      description:
        "התמונה הגדולה של העדכון המרכזי. יחס מומלץ: 4:3. הכל בתוך התמונה — אין שדות טקסט נוספים.",
      type: "image",
      options: { hotspot: true },
      group: "featured",
      fields: [altField],
    }),

    // ── 3️⃣ Holidays — section meta only (cards live in their own document) ─
    defineField({
      name: "holidaysUpdatedLabel",
      title: "תווית ״עודכן״ בצד הימני של הסקציה",
      description:
        'הטקסט בצד הימני של ראש הסקציה. למשל: ״לפני 5 ימים״ — האדמין מעדכן ידנית.',
      type: "string",
      group: "holidays",
      validation: (r) => r.max(60),
    }),

    // ── 4️⃣ Activity hours ──────────────────────────────────────────
    defineField({
      name: "hoursAdminChip",
      title: "תווית טורקיז בראש הסקציה",
      description:
        'למשל: ״תמונה דינמית · מתעדכנת לפי תקופה״. תוצג רק אם תוזן.',
      type: "string",
      group: "hours",
      validation: (r) => r.max(80),
    }),
    defineField({
      name: "hoursValidUntil",
      title: 'תאריך תוקף (אחרי "בתוקף עד")',
      description: 'למשל: ״31.03.2026״. תוצג רק אם תוזן.',
      type: "string",
      group: "hours",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "hoursImage",
      title: "תמונה לצד טבלת השעות (אופציונלי)",
      description:
        "אם תועלה תמונה, היא תופיע לצד טבלת השעות. אם תושאר ריקה, הטבלה תוצג לבד במרכז.",
      type: "image",
      options: { hotspot: true },
      group: "hours",
      fields: [altField],
    }),
    defineField({
      name: "hoursOverlayLabel",
      title: "תווית שכבת התמונה — תווית קטנה",
      description:
        'הטקסט הקטן בכרטיסיה השחורה על התמונה. למשל: ״תוקף התמונה״. (רק אם הועלתה תמונה)',
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
      title: "פסקת עזר בטבלת השעות",
      description:
        "הפסקה הקצרה שמופיעה מתחת לכותרת ״שעות פתיחה — שבוע נוכחי״ בטבלה הכהה.",
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

    // ── 5️⃣ Theory — image only ────────────────────────────────────
    defineField({
      name: "theoryImage",
      title: "תמונת לוח השעות",
      description:
        "הצילום של לוח שעות התאוריה. יחס מומלץ: 16:10. כל המידע בתוך התמונה.",
      type: "image",
      options: { hotspot: true },
      group: "theory",
      fields: [altField],
    }),

    // ── 6️⃣ Yearly calendar — image only ───────────────────────────
    defineField({
      name: "calendarImage",
      title: "תמונת לוח השנה השנתי",
      description:
        "התמונה השלמה של הלוח. יחס מומלץ: 4:3. כל המידע בתוך התמונה.",
      type: "image",
      options: { hotspot: true },
      group: "calendar",
      fields: [altField],
    }),

    // ── 7️⃣ Archive — section meta only ────────────────────────────
    defineField({
      name: "archiveSummary",
      title: "תווית סיכום בצד הימני של הסקציה",
      description: 'למשל: ״12 עדכונים · שנת תשפ״ו״.',
      type: "string",
      group: "archive",
      validation: (r) => r.max(80),
    }),

    // ── 8️⃣ Subscribe ──────────────────────────────────────────────
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
      validation: (r) => r.uri({ scheme: ["http", "https"] }),
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
      validation: (r) => r.uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    prepare: () => ({ title: "עמוד מידע ועדכונים" }),
  },
});
