import { defineField, defineType } from "sanity";

export default defineType({
  name: "conservatoryHero",
  title: "וידאו בכותרת הקונסרבטוריון",
  type: "document",
  fields: [
    defineField({
      name: "video",
      title: "וידאו רקע (MP4)",
      type: "file",
      description:
        "וידאו רקע ללולאה אינסופית. מומלץ: 720p, 16:9, פחות מ-20MB, ללא סאונד, עד 20 שניות. ללא Fade-out בסוף.",
      options: { accept: "video/mp4" },
    }),
    defineField({
      name: "poster",
      title: "תמונת פוסטר (Fallback)",
      type: "image",
      options: { hotspot: true },
      description:
        "מוצגת לפני שהווידאו נטען, במכשירים ניידים, ובמצב חיסכון בנתונים.",
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
      name: "headline",
      title: "כותרת ראשית (אופציונלי)",
      type: "string",
      description: 'אם תושאר ריקה, תוצג כותרת ברירת המחדל "חינוך מוסיקלי".',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "headlineEm",
      title: "מילת ההדגשה (אופציונלי)",
      type: "string",
      description:
        'המילה שמופיעה באלמוג בנטוי. אם תושאר ריקה, תוצג ברירת המחדל "למצוינות".',
      validation: (r) => r.max(40),
    }),
    defineField({
      name: "lede",
      title: "תיאור קצר (אופציונלי)",
      type: "text",
      rows: 3,
      description:
        "אם יושאר ריק, יוצג תיאור ברירת המחדל מתוך הקוד.",
      validation: (r) => r.max(400),
    }),
  ],
  preview: {
    select: { title: "headline", media: "poster" },
    prepare: ({ title, media }) => ({
      title: title || "כותרת הקונסרבטוריון (ברירת מחדל)",
      media,
    }),
  },
});
