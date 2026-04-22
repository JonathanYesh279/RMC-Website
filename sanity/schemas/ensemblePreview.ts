import { defineField, defineType } from "sanity";

export default defineType({
  name: "ensemblePreview",
  title: "הרכבים — כרטיסי תצוגה",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "שם ההרכב",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "instructor",
      title: "מנחה",
      type: "string",
      validation: (r) => r.required().max(120),
    }),
    defineField({
      name: "level",
      title: "רמה",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "description",
      title: "תיאור קצר",
      type: "text",
      rows: 4,
      validation: (r) => r.required().max(400),
    }),
    defineField({
      name: "image",
      title: "תמונה",
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
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "תג קטגוריה (אופציונלי)",
      description: "למשל: ״הרכבי ג׳אז״, ״להקות רוק״. ישמש כתווית על התמונה.",
      type: "string",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "accent",
      title: "צבע תג",
      type: "string",
      options: {
        list: [
          { title: "טורקיז", value: "teal" },
          { title: "זהב", value: "amber" },
          { title: "קורל", value: "coral" },
        ],
        layout: "radio",
      },
      initialValue: "teal",
    }),
    defineField({
      name: "displayOrder",
      title: "סדר תצוגה (אופציונלי)",
      description:
        "מספר נמוך יותר = גבוה יותר ברשימה. הרכבים ללא סדר תצוגה יופיעו בסוף.",
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
    select: { title: "name", subtitle: "instructor", media: "image" },
  },
});
