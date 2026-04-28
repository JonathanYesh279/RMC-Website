import { defineField, defineType } from "sanity";
import { SPECIAL_PROGRAM_OPTIONS } from "../../lib/specialPrograms";

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
      name: "linkedSpecialProgram",
      title: "שיוך לתוכנית מיוחדת (אופציונלי)",
      description:
        "אם הטופס משמש כטופס הרישום של תוכנית מיוחדת בעמוד הקונסרבטוריון, בחרו את התוכנית. כפתור הקריאה לפעולה בכרטיסיית התוכנית יקושר אוטומטית לקובץ. השאירו ריק אם הטופס כללי.",
      type: "string",
      options: {
        list: SPECIAL_PROGRAM_OPTIONS.map(({ value, title }) => ({
          value,
          title,
        })),
      },
    }),
    defineField({
      name: "displayOrder",
      title: "סדר תצוגה (אופציונלי)",
      description:
        "מספר נמוך יותר = גבוה יותר ברשימה. טפסים ללא סדר תצוגה יופיעו בסוף.",
      type: "number",
      validation: (r) => r.integer().min(1).max(99),
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
