import { defineField, defineType } from "sanity";

export default defineType({
  name: "formDocument",
  title: "טפסים להורדה",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "שם הטופס",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "file",
      title: "קובץ PDF",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "תיאור קצר",
      type: "text",
      rows: 2,
      validation: (r) => r.max(180),
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
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
