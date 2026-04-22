import { defineField, defineType } from "sanity";

export default defineType({
  name: "ensembleInstructor",
  title: "מנחי הרכבים",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "role",
      title: "תפקיד / סגנון הרכב",
      description: "למשל: ״הרכבי ג׳אז״, ״דרם ליין״, ״הרכב ווקאלי״.",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "image",
      title: "תמונה (אופציונלי)",
      description:
        "אם לא תועלה תמונה, תוצג תמונת ברירת מחדל מהאתר.",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "תיאור לנגישות (אופציונלי)",
          type: "string",
          validation: (r) => r.max(120),
        }),
      ],
    }),
    defineField({
      name: "displayOrder",
      title: "סדר תצוגה (אופציונלי)",
      description:
        "מספר נמוך יותר = גבוה יותר ברשימה. מנחים ללא סדר תצוגה יופיעו בסוף.",
      type: "number",
      validation: (r) => r.integer().min(1).max(99),
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
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
