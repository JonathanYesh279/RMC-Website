import { defineField, defineType } from "sanity";

export default defineType({
  name: "updateHoliday",
  title: "חגים, חופשות ואירועים",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "תמונה",
      description: "התמונה המרובעת שמופיעה בכרטיסייה. מומלץ יחס 1:1.",
      type: "image",
      options: { hotspot: true },
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
      name: "cornerLabel",
      title: "תווית פינה",
      description:
        "התווית הקטנה בפינת התמונה. למשל: ״פעיל״, ״בעוד 5 שבועות״, ״קונצרט סיום״.",
      type: "string",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "cornerTone",
      title: "גוון התווית",
      description: "צבע הרקע של תווית הפינה.",
      type: "string",
      options: {
        list: [
          { title: "ענבר (זהוב)", value: "amber" },
          { title: "טורקיז", value: "teal" },
          { title: "ברירת מחדל (לבן)", value: "default" },
        ],
        layout: "radio",
      },
      initialValue: "default",
    }),
    defineField({
      name: "title",
      title: "כותרת הכרטיסייה",
      description: "למשל: ״חופשת פסח תשפ״ו״.",
      type: "string",
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: "metaTags",
      title: "תגיות מטא",
      description:
        "התגיות הקצרות שמופיעות מתחת לכותרת, מופרדות בנקודות. למשל: ״חופשה״, ״8 ימים״, ״כל המחלקות״.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (r) => r.max(5),
    }),
    defineField({
      name: "description",
      title: "תיאור קצר",
      description: "פסקה קצרה בגוף הכרטיסייה.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(240),
    }),
    defineField({
      name: "dateRange",
      title: "תאריכים",
      description: "טקסט חופשי לתאריכים. למשל: ״01.04 – 08.04״.",
      type: "string",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "dateSub",
      title: "תווית תאריכים משנית",
      description:
        "השורה הקטנה מתחת לתאריך. למשל: ״חופשה רשמית״, ״יום שבת · 19:00״.",
      type: "string",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "linkUrl",
      title: 'קישור "קרא עוד" (אופציונלי)',
      description: "אם יושאר ריק, הלינק יהיה לא-פעיל.",
      type: "url",
      validation: (r) =>
        r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
    }),
    defineField({
      name: "displayOrder",
      title: "סדר תצוגה",
      description: "מספר נמוך יותר מופיע קודם. למשל: 1, 2, 3.",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "סדר תצוגה",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "dateRange",
      media: "image",
    },
  },
});
