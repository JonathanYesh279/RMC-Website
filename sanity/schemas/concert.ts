import { defineField, defineType } from "sanity";
import { slugifyHebrew } from "../../lib/slugifyHebrew";

export default defineType({
  name: "concert",
  title: "קונצרטים — קונצרט בודד",
  type: "document",
  groups: [
    { name: "id", title: "זיהוי", default: true },
    { name: "classification", title: "סיווג" },
    { name: "schedule", title: "מועד ומקום" },
    { name: "image", title: "תמונה" },
    { name: "copy", title: "טקסטים" },
    { name: "tickets", title: "כרטיסים וזמינות" },
    { name: "details", title: "פרטים מורחבים" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "שם הקונצרט",
      description:
        'מופיע ככותרת בכרטיס הקונצרט ברשימה הראשית, וגם ככותרת ראשית בעמוד פרטי הקונצרט. למשל: "ברהמס · הסימפוניה הרביעית".',
      type: "string",
      group: "id",
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "מזהה כתובת (Slug)",
      description:
        "החלק האחרון בכתובת ה-URL של עמוד הקונצרט (/concerts/SLUG). מתורגם אוטומטית מעברית. אפשר לערוך ידנית.",
      type: "slug",
      group: "id",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => slugifyHebrew(input),
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "genre",
      title: "סגנון",
      description: "משפיע על תווית הסיווג ועל סינון ברשימת הקונצרטים.",
      type: "string",
      group: "classification",
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
      title: "תגית מודגשת (אופציונלי)",
      description:
        'לשימוש שיווקי בלבד — לא לזמינות מקומות. למשל: "בכורה", "מומלץ למשפחות · גילאי 5+", "מופע סיום העונה".',
      type: "string",
      group: "classification",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "date",
      title: "תאריך ושעה",
      description:
        "תאריך ושעת הקונצרט (שעון ישראל). מהשדה הזה נגזרים יום, חודש ושעה המופיעים בעמוד.",
      type: "datetime",
      group: "schedule",
      options: { dateFormat: "DD/MM/YYYY", timeFormat: "HH:mm", timeStep: 5 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "venue",
      title: "מקום",
      description:
        'אולם ההופעה. למשל: "האודיטוריום המרכזי", "האולם הקאמרי".',
      type: "string",
      group: "schedule",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "image",
      title: "תמונת קונצרט",
      description:
        "תמונה ראשית של הקונצרט. משמשת בכרטיס ברשימה ובכותרת עמוד פרטי הקונצרט. רצוי 16:9, מינימום 1600 רוחב.",
      type: "image",
      group: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "טקסט חלופי (נגישות)",
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
    defineField({
      name: "shortDescription",
      title: "תיאור קצר",
      description:
        "מופיע בכרטיס הקונצרט ברשימה הראשית של עמוד הקונצרטים. מומלץ עד 2-3 משפטים.",
      type: "text",
      rows: 3,
      group: "copy",
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: "lede",
      title: "פסקת פתיחה (עמוד הקונצרט)",
      description:
        "הפסקה שמופיעה מתחת לכותרת בעמוד פרטי הקונצרט. ארוך יותר מהתיאור הקצר.",
      type: "text",
      rows: 5,
      group: "copy",
      validation: (r) => r.required().max(600),
    }),
    defineField({
      name: "basePrice",
      title: "מחיר בסיס (₪)",
      description:
        "מחיר כרטיס רגיל. מחירי כרטיס פרימיום וסטודנט נגזרים אוטומטית בקוד (לא ניתנים לעריכה כאן).",
      type: "number",
      group: "tickets",
      validation: (r) => r.required().integer().min(0).max(2000),
    }),
    defineField({
      name: "availability",
      title: "מצב זמינות",
      description:
        'המצב נבחר כאן בלבד. תווית הטקסט שמופיעה באתר ("כרטיסים זמינים" / "מקומות אחרונים" / "אולם מלא") נגזרת אוטומטית.',
      type: "string",
      group: "tickets",
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
    defineField({
      name: "duration",
      title: "משך (אופציונלי)",
      description:
        'מופיע בעמוד פרטי הקונצרט. למשל: "95 דקות · הפסקה אחת". אם יושאר ריק, יוצג טקסט ברירת מחדל.',
      type: "string",
      group: "details",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "language",
      title: "שפה / תוכנייה (אופציונלי)",
      description:
        'מופיע בעמוד פרטי הקונצרט. למשל: "תוכנייה בעברית". אם יושאר ריק, יוצג טקסט ברירת מחדל.',
      type: "string",
      group: "details",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "program",
      title: "תוכנייה (יצירות)",
      description:
        "רשימת היצירות שיבוצעו בקונצרט. מופיע בעמוד פרטי הקונצרט. אופציונלי — אם תושאר ריקה, יוצג טקסט ברירת מחדל.",
      type: "array",
      group: "details",
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
