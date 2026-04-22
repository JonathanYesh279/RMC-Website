import { defineField, defineType } from "sanity";

const DEPARTMENT_OPTIONS: { value: string; title: string }[] = [
  { value: "piano", title: "פסנתר" },
  { value: "strings", title: "כלי קשת" },
  { value: "woodwind", title: "כלי נשיפה עץ" },
  { value: "brass", title: "כלי נשיפה מתכת" },
  { value: "guitar", title: "גיטרה" },
  { value: "drums", title: "תופים וכלי הקשה" },
  { value: "vocal", title: "שירה" },
  { value: "conduct", title: "מנצחי תזמורות ומקהלות" },
  { value: "theory", title: "תורת המוזיקה" },
  { value: "rnd", title: "מחקר ופיתוח" },
];

export default defineType({
  name: "teacher",
  title: "סגל ומורים",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם מלא",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "role",
      title: "תפקיד / כותרת",
      type: "string",
      description: 'למשל: "ראש מחלקת פסנתר · סולנית"',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "departments",
      title: "מחלקות",
      type: "array",
      of: [{ type: "string" }],
      options: { list: DEPARTMENT_OPTIONS },
      validation: (r) => r.required().min(1).max(3).unique(),
    }),
    defineField({
      name: "photo",
      title: "תמונה",
      type: "image",
      options: { hotspot: true },
      description:
        "אופציונלי בשלב זה. אם לא תועלה תמונה, תוצג תמונת ברירת מחדל מהאתר.",
      fields: [
        defineField({
          name: "alt",
          title: "טקסט חלופי (נגישות)",
          type: "string",
          validation: (r) =>
            r.max(120).custom((alt, ctx) => {
              const parent = ctx.parent as { asset?: unknown } | undefined;
              if (parent?.asset && !alt)
                return "חובה להוסיף טקסט חלופי כשהועלתה תמונה";
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: "bio",
      title: "ביוגרפיה קצרה",
      type: "text",
      rows: 3,
      validation: (r) => r.max(280),
    }),
    defineField({
      name: "displayOrder",
      title: "סדר תצוגה",
      type: "number",
      initialValue: 99,
      validation: (r) => r.required().integer().min(1).max(99),
    }),
  ],
  orderings: [
    {
      title: "סדר תצוגה",
      name: "displayOrder",
      by: [
        { field: "displayOrder", direction: "asc" },
        { field: "name", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
