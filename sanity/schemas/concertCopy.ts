import { defineField, defineType } from "sanity";

export default defineType({
  name: "concertCopy",
  title: "טקסטים כלליים לעמוד קונצרט",
  type: "document",
  groups: [
    { name: "purchase", title: "כותרות אזור רכישת הכרטיסים", default: true },
    { name: "notes", title: "הערות בתחתית הטופס" },
  ],
  fields: [
    defineField({
      name: "purchaseEyebrow",
      title: "כותרת קטנה מעל אזור הרכישה",
      description:
        "הטקסט הקטן הצבעוני מעל הכותרת בתחילת אזור רכישת הכרטיסים. למשל: ״רכישת כרטיסים״.",
      type: "string",
      group: "purchase",
      validation: (r) => r.max(60),
      initialValue: "רכישת כרטיסים",
    }),
    defineField({
      name: "purchaseTitle",
      title: "כותרת ראשית של אזור הרכישה",
      description: 'למשל: ״בחרו כרטיסים והשלימו הזמנה״.',
      type: "string",
      group: "purchase",
      validation: (r) => r.max(120),
      initialValue: "בחרו כרטיסים והשלימו הזמנה",
    }),
    defineField({
      name: "accessibilityNote",
      title: "הודעת נגישות",
      description:
        "הפסקה שמופיעה מתחת לטופס פרטי הרוכש. כוללת מידע על נגישות וקישורים ליצירת קשר.",
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
      description:
        "השורה הקטנה מתחת לכפתור התשלום בסיכום ההזמנה.",
      type: "string",
      group: "notes",
      validation: (r) => r.max(120),
      initialValue: "תשלום מאובטח בתקן PCI-DSS",
    }),
    defineField({
      name: "cancellationNote",
      title: "הודעת מדיניות ביטול",
      description: "השורה האחרונה בתחתית סיכום ההזמנה.",
      type: "string",
      group: "notes",
      validation: (r) => r.max(160),
      initialValue: "ניתן לבטל עד 48 שעות לפני המופע ולקבל זיכוי מלא.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "טקסטים כלליים לעמוד קונצרט" }),
  },
});
