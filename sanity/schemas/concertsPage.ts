import { defineField, defineType } from "sanity";

export default defineType({
  name: "concertsPage",
  title: "הגדרות עמוד הקונצרטים",
  type: "document",
  groups: [
    { name: "featured", title: "⭐ הקונצרט הקרוב", default: true },
    { name: "subscription", title: "🎟️ רצועת מנויי עונה" },
    { name: "filter", title: "📅 טווח תאריכים" },
  ],
  fields: [
    // ── ⭐ הקונצרט הקרוב — סדר השדות לפי הסדר הויזואלי בעמוד ──────
    defineField({
      name: "featuredEyebrow",
      title: "כותרת קטנה מעל הקונצרט",
      description:
        "הטקסט הקטן הצבעוני שמופיע מעל הכותרת בראש העמוד. למשל: ״הקונצרט הקרוב״.",
      type: "string",
      group: "featured",
      validation: (r) => r.max(60),
      initialValue: "הקונצרט הקרוב",
    }),
    defineField({
      name: "featured",
      title: "בחירת הקונצרט הקרוב להצגה",
      description:
        "הקונצרט שיופיע ברצועה הגדולה בראש עמוד הקונצרטים. אם לא נבחר קונצרט, או אם הקונצרט שנבחר עבר תאריך, האתר יציג אוטומטית את הקונצרט הקרוב ביותר ברשימה.",
      type: "reference",
      group: "featured",
      to: [{ type: "concert" }],
      weak: true,
    }),
    defineField({
      name: "featuredBlurb",
      title: "טקסט פתיחה לקונצרט הקרוב (אופציונלי)",
      description:
        "הטקסט שמופיע מתחת לשם הקונצרט בראש העמוד. אם תשאירו ריק, יוצג טקסט הפתיחה של הקונצרט עצמו. כתבו משפט או שניים קצרים.",
      type: "text",
      rows: 4,
      group: "featured",
      validation: (r) => r.max(500),
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "טקסט כפתור ראשי",
      description:
        "הכפתור הקורלי הגדול. למשל: ״לרכישת כרטיסים״. המחיר נוסף אוטומטית בסוף — אין צורך לכלול אותו בטקסט.",
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
      initialValue: "לרכישת כרטיסים",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "טקסט כפתור משני",
      description:
        "הכפתור עם המסגרת ליד הכפתור הראשי. למשל: ״קרא עוד על הקונצרט״.",
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
      initialValue: "קרא עוד על הקונצרט",
    }),

    // ── 🎟️ רצועת מנויי עונה ──────────────────────────────────────
    defineField({
      name: "subEyebrow",
      title: "כותרת קטנה מעל רצועת המנויים",
      description:
        "הטקסט הקטן הצבעוני מעל הכותרת ברצועה התחתונה של עמוד הקונצרטים. למשל: ״מנויי עונה״.",
      type: "string",
      group: "subscription",
      validation: (r) => r.max(60),
      initialValue: "מנויי עונה",
    }),
    defineField({
      name: "subTitle",
      title: "כותרת ראשית — חלק רגיל",
      description: "החלק הלא-מודגש של הכותרת. למשל: ״עונה שלמה של״.",
      type: "string",
      group: "subscription",
      validation: (r) => r.max(80),
      initialValue: "עונה שלמה של",
    }),
    defineField({
      name: "subTitleEm",
      title: "כותרת ראשית — חלק מודגש בצבע",
      description:
        "החלק שמודגש בצבע אלמוג ובאות נטויה. למשל: ״מוסיקה חיה.״.",
      type: "string",
      group: "subscription",
      validation: (r) => r.max(80),
      initialValue: "מוסיקה חיה.",
    }),
    defineField({
      name: "subBody",
      title: "פסקת תיאור של רצועת המנויים",
      description:
        "מופיעה מתחת לכותרת ברצועת המנויים. הסבר על מה כולל המנוי השנתי.",
      type: "text",
      rows: 4,
      group: "subscription",
      validation: (r) => r.max(500),
    }),
    defineField({
      name: "subTiers",
      title: "כרטיסיות סוגי מנויים",
      description:
        "הכרטיסיות שמופיעות בצד ימין של רצועת המנויים. מומלץ עד 4 כרטיסיות. אם תשאירו ריק, הרצועה תציג רק את הטקסט בלי הכרטיסיות.",
      type: "array",
      group: "subscription",
      of: [
        defineField({
          name: "tier",
          title: "כרטיסיית מנוי",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "שם המנוי",
              description: "למשל: ״מנוי סימפוני״, ״מנוי משפחתי״.",
              type: "string",
              validation: (r) => r.required().max(60),
            }),
            defineField({
              name: "body",
              title: "תיאור (יתרונות המנוי)",
              description:
                "שורה או שתיים שמתארות מה כלול במנוי הזה.",
              type: "text",
              rows: 3,
              validation: (r) => r.required().max(300),
            }),
            defineField({
              name: "price",
              title: "מחיר לעונה",
              description: "נוסח חופשי. למשל: ״₪890״.",
              type: "string",
              validation: (r) => r.required().max(20),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "price" },
          },
        }),
      ],
      validation: (r) => r.max(6),
    }),

    // ── 📅 טווח תאריכים ───────────────────────────────────────────
    defineField({
      name: "dateRangeLabel",
      title: "טווח תאריכים שמופיע ברצועת הסינון (אופציונלי)",
      description:
        "מופיע ליד אייקון לוח השנה מעל רשימת הקונצרטים. למשל: ״מאי 2026 — יולי 2026״. אם תשאירו ריק, האתר יחשב את הטווח אוטומטית מתוך הקונצרטים הקיימים.",
      type: "string",
      group: "filter",
      validation: (r) => r.max(60),
    }),
  ],
  preview: {
    prepare: () => ({ title: "הגדרות עמוד הקונצרטים" }),
  },
});
