import { defineField, defineType } from "sanity";

export default defineType({
  name: "concertsPage",
  title: "עמוד קונצרטים — הגדרות עמוד הרשימה",
  type: "document",
  groups: [
    { name: "featured", title: "קונצרט מוצג", default: true },
    { name: "filter", title: "רצועת סינון" },
    { name: "subscription", title: "רצועת מנויים" },
  ],
  fields: [
    defineField({
      name: "featuredEyebrow",
      title: "כותרת-על של רצועת הקונצרט המוצג",
      description:
        'הטקסט הקטן מעל הכותרת. למשל: "הקונצרט הקרוב". אם יושאר ריק, רצועת הקונצרט המוצג עדיין תוצג עם ברירת מחדל.',
      type: "string",
      group: "featured",
      validation: (r) => r.max(60),
      initialValue: "הקונצרט הקרוב",
    }),
    defineField({
      name: "featured",
      title: "הקונצרט המוצג",
      description:
        "בחרו את הקונצרט שיופיע ברצועה הראשונה של עמוד הקונצרטים. אם לא נבחר קונצרט, או אם הקונצרט שנבחר עבר תאריך — הרצועה כולה לא תוצג.",
      type: "reference",
      group: "featured",
      to: [{ type: "concert" }],
      weak: true,
    }),
    defineField({
      name: "featuredBlurb",
      title: "טקסט מותאם אישית (אופציונלי)",
      description:
        "אם תרצו שהטקסט ברצועת הקונצרט המוצג יהיה שונה מ״פסקת הפתיחה״ של הקונצרט עצמו — מלאו כאן. אם יושאר ריק, יוצג ה-lede של הקונצרט.",
      type: "text",
      rows: 4,
      group: "featured",
      validation: (r) => r.max(500),
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "תווית כפתור ראשי",
      description:
        'הכפתור הקורלי. למשל: "לרכישת כרטיסים". המחיר לא נכלל בטקסט — הוא מתווסף אוטומטית.',
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
      initialValue: "לרכישת כרטיסים",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "תווית כפתור משני",
      description: 'למשל: "קרא עוד על הקונצרט".',
      type: "string",
      group: "featured",
      validation: (r) => r.max(40),
      initialValue: "קרא עוד על הקונצרט",
    }),
    defineField({
      name: "dateRangeLabel",
      title: "תווית טווח תאריכים (אופציונלי)",
      description:
        'מופיעה ליד אייקון לוח השנה ברצועת הסינון. למשל: "מאי 2026 — יולי 2026". אם יושאר ריק, יחושב אוטומטית מהקונצרטים שבמערכת.',
      type: "string",
      group: "filter",
      validation: (r) => r.max(60),
    }),
    defineField({
      name: "subEyebrow",
      title: "כותרת-על של רצועת המנויים",
      description: 'הטקסט הקטן מעל הכותרת הראשית. למשל: "מנויי עונה".',
      type: "string",
      group: "subscription",
      validation: (r) => r.max(60),
      initialValue: "מנויי עונה",
    }),
    defineField({
      name: "subTitle",
      title: "כותרת ראשית — חלק רגיל",
      description: 'החלק הלא-נטוי של הכותרת. למשל: "עונה שלמה של".',
      type: "string",
      group: "subscription",
      validation: (r) => r.max(80),
      initialValue: "עונה שלמה של",
    }),
    defineField({
      name: "subTitleEm",
      title: "כותרת ראשית — חלק נטוי (אלמוג)",
      description: 'החלק הצבעוני בנטוי. למשל: "מוסיקה חיה.".',
      type: "string",
      group: "subscription",
      validation: (r) => r.max(80),
      initialValue: "מוסיקה חיה.",
    }),
    defineField({
      name: "subBody",
      title: "פסקת תיאור",
      description:
        "מופיעה מתחת לכותרת ברצועת המנויים. הסבר על המנויים והיתרונות שלהם.",
      type: "text",
      rows: 4,
      group: "subscription",
      validation: (r) => r.max(500),
    }),
    defineField({
      name: "subTiers",
      title: "סוגי מנויים",
      description:
        "כרטיסיות המנויים בצד ימין של הרצועה. מומלץ עד 4 כרטיסיות. אם יושאר ריק — הרצועה תציג רק את הטקסט מבלי הכרטיסיות.",
      type: "array",
      group: "subscription",
      of: [
        defineField({
          name: "tier",
          title: "מנוי",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "שם המנוי",
              type: "string",
              validation: (r) => r.required().max(60),
            }),
            defineField({
              name: "body",
              title: "תיאור (יתרונות המנוי)",
              type: "text",
              rows: 3,
              validation: (r) => r.required().max(300),
            }),
            defineField({
              name: "price",
              title: 'מחיר (כולל "₪")',
              description: 'נוסח חופשי. למשל: "₪890".',
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
  ],
  preview: {
    prepare: () => ({ title: "עמוד קונצרטים — הגדרות" }),
  },
});
