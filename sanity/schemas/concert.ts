import { defineField, defineType } from "sanity";
import { slugifyHebrew } from "../../lib/slugifyHebrew";
import { AutoSlugInput } from "../components/AutoSlugInput";

export default defineType({
  name: "concert",
  title: "קונצרט",
  type: "document",
  groups: [
    { name: "main", title: "א. מידע ראשי בראש הכרטיס", default: true },
    { name: "schedule", title: "ב. מועד ומיקום" },
    { name: "image", title: "ג. תמונה ראשית" },
    { name: "copy", title: "ד. טקסטים שמופיעים בכרטיס ובעמוד" },
    { name: "tickets", title: "ה. מחירים וכרטיסים" },
    { name: "program", title: "ו. תוכנית הקונצרט" },
    { name: "hero", title: "ז. וידאו רקע לעמוד הקונצרט (אופציונלי)" },
  ],
  fields: [
    // ── א. מידע ראשי ──────────────────────────────────────────────
    defineField({
      name: "title",
      title: "שם הקונצרט",
      description:
        "מופיע ככותרת בכרטיס הקונצרט ברשימה, וגם ככותרת הראשית בעמוד פרטי הקונצרט. למשל: ״ברהמס · הסימפוניה הרביעית״.",
      type: "string",
      group: "main",
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "כתובת עמוד אוטומטית",
      description:
        "החלק האחרון בכתובת ה-URL של עמוד הקונצרט. נוצר אוטומטית מהשם בעת השמירה הראשונה — אין צורך לערוך.",
      type: "slug",
      group: "main",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => slugifyHebrew(input),
      },
      // Hidden once a slug exists, so editors never see this field after
      // the first save. Locks the URL so renaming a concert later won't
      // change its address (preserves shared links and SEO).
      hidden: ({ document }) => {
        const slug = document?.slug as { current?: string } | undefined;
        return Boolean(slug?.current);
      },
      components: { input: AutoSlugInput },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "genre",
      title: "סיווג / קטגוריה",
      description:
        "משפיע על תווית הצבע בכרטיס הקונצרט ועל הסינון ברשימת הקונצרטים.",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "קלאסי", value: "classical" },
          { title: "ג׳אז", value: "jazz" },
          { title: "ישראלי", value: "israeli" },
          { title: "ילדים", value: "kids" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "highlightBadge",
      title: "תגית קצרה (אופציונלי)",
      description:
        "סטיקר קטן ומודגש שמופיע על תמונת הקונצרט בכרטיס וברצועה הגדולה. למשל: ״בכורה״ או ״מומלץ למשפחות״. השאירו ריק אם אין צורך.",
      type: "string",
      group: "main",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "availability",
      title: "מצב זמינות כרטיסים",
      description:
        "התווית הצבעונית בכרטיס הקונצרט (למשל ״כרטיסים זמינים״ / ״מקומות אחרונים״). הטקסט עצמו נקבע אוטומטית — בחרו רק את המצב.",
      type: "string",
      group: "main",
      options: {
        list: [
          { title: "כרטיסים זמינים", value: "open" },
          { title: "מקומות אחרונים", value: "hot" },
          { title: "אולם מלא / אזל", value: "full" },
        ],
        layout: "radio",
      },
      initialValue: "open",
      validation: (r) => r.required(),
    }),

    // ── ב. מועד ומיקום ────────────────────────────────────────────
    defineField({
      name: "date",
      title: "תאריך ושעה",
      description:
        "תאריך ושעת הקונצרט (לפי שעון ישראל). מהשדה הזה האתר מחשב אוטומטית את היום, החודש והשעה שמופיעים בכרטיס ובעמוד.",
      type: "datetime",
      group: "schedule",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 5 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "venue",
      title: "מקום האירוע",
      description:
        "אולם ההופעה. למשל: ״האודיטוריום המרכזי״ או ״האולם הקאמרי״.",
      type: "string",
      group: "schedule",
      validation: (r) => r.required().max(80),
    }),

    // ── ג. תמונה ראשית ────────────────────────────────────────────
    defineField({
      name: "image",
      title: "תמונת הקונצרט",
      description:
        "תמונה ראשית של הקונצרט. מופיעה בכרטיס ברשימה וברקע עמוד פרטי הקונצרט. רצוי תמונה איכותית ביחס 16:9, רוחב מינימלי 1600 פיקסלים.",
      type: "image",
      group: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "טקסט חלופי לתמונה (נגישות)",
          description:
            "תיאור קצר של מה שרואים בתמונה — נקרא על ידי קוראי מסך. למשל: ״תזמורת על במת האודיטוריום״.",
          type: "string",
          validation: (r) =>
            r.max(160).custom((alt, ctx) => {
              const parent = ctx.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !alt)
                return "חובה להוסיף טקסט חלופי כשהועלתה תמונה";
              return true;
            }),
        }),
      ],
      validation: (r) => r.required(),
    }),

    // ── ד. טקסטים ─────────────────────────────────────────────────
    defineField({
      name: "shortDescription",
      title: "תיאור קצר לכרטיס ברשימה",
      description:
        "מופיע מתחת לכותרת בכרטיס הקונצרט ברשימת הקונצרטים. כתבו 2-3 משפטים קצרים שמסכמים את הקונצרט.",
      type: "text",
      rows: 3,
      group: "copy",
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "lede",
      title: "טקסט פתיחה לעמוד הקונצרט",
      description:
        "הפסקה הגדולה שמופיעה מתחת לכותרת בעמוד פרטי הקונצרט. ארוכה ומפורטת יותר מהתיאור הקצר.",
      type: "text",
      rows: 5,
      group: "copy",
      validation: (r) => r.required().max(600),
    }),
    defineField({
      name: "duration",
      title: "משך הקונצרט (אופציונלי)",
      description:
        "מופיע בעמוד פרטי הקונצרט תחת ״משך״. למשל: ״95 דקות · הפסקה אחת״.",
      type: "string",
      group: "copy",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "language",
      title: "שפה / תוכנייה (אופציונלי)",
      description:
        "מופיע בעמוד פרטי הקונצרט תחת ״שפה״. למשל: ״תוכנייה בעברית״.",
      type: "string",
      group: "copy",
      validation: (r) => r.max(60),
    }),

    // ── ה. מחירים וכרטיסים ────────────────────────────────────────
    defineField({
      name: "basePrice",
      title: "מחיר בסיס בלבד (₪)",
      description:
        "מחיר כרטיס רגיל. המחירים של פרימיום וסטודנט מחושבים אוטומטית — אין צורך להזין אותם.",
      type: "number",
      group: "tickets",
      validation: (r) => r.required().integer().min(0).max(2000),
    }),

    // ── ו. תוכנית הקונצרט ─────────────────────────────────────────
    defineField({
      name: "program",
      title: "יצירות / תוכנייה",
      description:
        "רשימת היצירות שיבוצעו בקונצרט. מופיעה בעמוד פרטי הקונצרט. אם תשאירו ריק, יוצג טקסט ברירת מחדל.",
      type: "array",
      group: "program",
      of: [
        defineField({
          name: "programItem",
          title: "יצירה",
          type: "object",
          fields: [
            defineField({
              name: "work",
              title: "שם היצירה",
              type: "string",
              validation: (r) => r.required().max(160),
            }),
            defineField({
              name: "composer",
              title: "מלחין / מבצע",
              type: "string",
              validation: (r) => r.required().max(120),
            }),
          ],
          preview: {
            select: { title: "work", subtitle: "composer" },
          },
        }),
      ],
    }),

    // ── ז. וידאו רקע לעמוד הקונצרט ─────────────────────────────────
    defineField({
      name: "heroVideo",
      title: "וידאו רקע ללולאה (אופציונלי)",
      description:
        "וידאו קצר שמתנגן בלולאה אינסופית ברקע של עמוד הקונצרט, מאחורי תמונת הקונצרט והכרטיס. מומלץ: 720p, 16:9, פחות מ-20MB, ללא סאונד, עד 20 שניות, ללא Fade-out בסוף. אם לא יוזן, יוצג הרקע המטושטש הקיים.",
      type: "file",
      group: "hero",
      options: { accept: "video/mp4" },
    }),
    defineField({
      name: "heroPoster",
      title: "תמונת פוסטר לוידאו (אופציונלי)",
      description:
        "מוצגת לפני שהווידאו נטען, במכשירים ניידים, ובמצב חיסכון בנתונים. אם לא תוזן, תוצג תמונת הקונצרט הראשית כפוסטר.",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "טקסט חלופי",
          type: "string",
          validation: (r) =>
            r.max(160).custom((alt, ctx) => {
              const parent = ctx.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !alt)
                return "חובה להוסיף טקסט חלופי כשהועלתה תמונה";
              return true;
            }),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "תאריך — קרוב ראשון",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "תאריך — אחרון ראשון",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      genre: "genre",
      media: "image",
    },
    prepare: ({ title, date, genre, media }) => {
      const genreLabel: Record<string, string> = {
        classical: "קלאסי",
        jazz: "ג׳אז",
        israeli: "ישראלי",
        kids: "ילדים",
      };
      const subtitleParts: string[] = [];
      if (genre && genreLabel[genre as string])
        subtitleParts.push(genreLabel[genre as string]);
      if (date) {
        try {
          const formatted = new Intl.DateTimeFormat("he-IL", {
            timeZone: "Asia/Jerusalem",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(date as string));
          subtitleParts.push(formatted);
        } catch {
          /* ignore bad date */
        }
      }
      return {
        title: title || "(ללא שם)",
        subtitle: subtitleParts.join(" · "),
        media,
      };
    },
  },
});
