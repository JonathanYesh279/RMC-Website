import { defineField, defineType } from "sanity";

export default defineType({
  name: "updateArchive",
  title: "עדכונים קודמים (ארכיון)",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "תמונה",
      description: "התמונה הקטנה (96×64) שמופיעה לצד השורה.",
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
      name: "tag",
      title: "תווית קטגוריה",
      description: "למשל: ״חופשה״, ״אירוע״, ״שעות פעילות״, ״הודעה כללית״.",
      type: "string",
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: "tagTone",
      title: "צבע התווית",
      description: "צבע הנקודה הקטנה לצד התווית.",
      type: "string",
      options: {
        list: [
          { title: "טורקיז", value: "teal" },
          { title: "ענבר (זהוב)", value: "amber" },
          { title: "אלמוג (אדום)", value: "coral" },
          { title: "אפור", value: "gray" },
        ],
        layout: "radio",
      },
      initialValue: "teal",
    }),
    defineField({
      name: "name",
      title: "כותרת העדכון",
      description: "השם המלא של העדכון. עד שתי שורות יוצגו.",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "date",
      title: "תאריך הפרסום",
      description: "תאריך הפרסום של העדכון. משמש לסידור הרשימה (החדש קודם).",
      type: "date",
      options: { dateFormat: "DD.MM.YYYY" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dateDisplay",
      title: "תאריך לתצוגה (אופציונלי)",
      description:
        "הטקסט שיוצג כתאריך. אם יושאר ריק, האתר יציג את התאריך הרגיל בפורמט DD.MM.YYYY.",
      type: "string",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "relativeLabel",
      title: "תווית יחסית",
      description: "התווית הקטנה. למשל: ״לפני 3 חודשים״, ״לפני שנה״.",
      type: "string",
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "linkUrl",
      title: "קישור (אופציונלי)",
      description: "אם יושאר ריק, השורה לא תהיה קליקבילית.",
      type: "url",
      validation: (r) =>
        r.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
    }),
  ],
  orderings: [
    {
      title: "תאריך — מהחדש לישן",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "date",
      media: "image",
    },
  },
});
