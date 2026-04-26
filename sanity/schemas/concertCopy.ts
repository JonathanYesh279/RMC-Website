import { defineField, defineType } from "sanity";

export default defineType({
  name: "concertCopy",
  title: "עמוד פרטי קונצרט — טקסטים גלובליים",
  type: "document",
  groups: [
    { name: "purchase", title: "כותרות רכישה", default: true },
    { name: "notes", title: "הערות בתחתית" },
  ],
  fields: [
    defineField({
      name: "purchaseEyebrow",
      title: "כותרת-על של אזור הרכישה",
      description: 'הטקסט הקטן מעל הכותרת. למשל: "רכישת כרטיסים".',
      type: "string",
      group: "purchase",
      validation: (r) => r.max(60),
      initialValue: "רכישת כרטיסים",
    }),
    defineField({
      name: "purchaseTitle",
      title: "כותרת ראשית של אזור הרכישה",
      description: 'למשל: "בחרו כרטיסים והשלימו הזמנה".',
      type: "string",
      group: "purchase",
      validation: (r) => r.max(120),
      initialValue: "בחרו כרטיסים והשלימו הזמנה",
    }),
    defineField({
      name: "accessibilityNote",
      title: "הודעת נגישות",
      description:
        "הפסקה הקטנה מתחת לטופס פרטי הרוכש. כוללת מידע על נגישות וקישורים ליצירת קשר.",
      type: "text",
      rows: 3,
      group: "notes",
      validation: (r) => r.max(400),
      initialValue:
        "המרכז מונגש לבעלי מוגבלויות. לסיוע בהזמנה או לבקשת מקומות נגישים ניתן לפנות לטלפון 09-7711330 או למייל info@music-raanana.org.il.",
    }),
    defineField({
      name: "secureNote",
      title: "הודעת תשלום מאובטח",
      description: "מופיע מתחת לכפתור התשלום בסיכום ההזמנה.",
      type: "string",
      group: "notes",
      validation: (r) => r.max(120),
      initialValue: "תשלום מאובטח בתקן PCI-DSS",
    }),
    defineField({
      name: "cancellationNote",
      title: "הודעת מדיניות ביטול",
      description: "השורה הקטנה בתחתית סיכום ההזמנה.",
      type: "string",
      group: "notes",
      validation: (r) => r.max(160),
      initialValue: "ניתן לבטל עד 48 שעות לפני המופע ולקבל זיכוי מלא.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "עמוד פרטי קונצרט — טקסטים" }),
  },
});
