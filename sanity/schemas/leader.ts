import { defineField, defineType } from "sanity";

export default defineType({
  name: "leader",
  title: "הנהגת המרכז",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם מלא",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "title",
      title: "תפקיד",
      type: "string",
      description: 'למשל: "מנהל ומנצח הבית"',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "subtitle",
      title: "תת-כותרת",
      type: "string",
      description: 'למשל: "התזמורת הסימפונית"',
      validation: (r) => r.max(60),
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
          title: "טקסט חלופי",
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
      title: "ביוגרפיה",
      type: "text",
      rows: 3,
      validation: (r) => r.max(300),
    }),
    defineField({
      name: "accent",
      title: "צבע הדגשה",
      type: "string",
      options: {
        list: [
          { value: "teal", title: "ירקרק (Teal)" },
          { value: "coral", title: "אלמוג (Coral)" },
          { value: "amber", title: "זהוב (Amber)" },
          { value: "ink", title: "שחור (Ink)" },
        ],
        layout: "radio",
      },
      initialValue: "teal",
      validation: (r) => r.required(),
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
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
