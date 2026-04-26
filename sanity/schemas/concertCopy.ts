import { defineField, defineType } from "sanity";

export default defineType({
  name: "concertCopy",
  title: "טקסטים כלליים לעמוד קונצרט",
  type: "document",
  groups: [
    { name: "hero", title: "א. כותרות בעמוד הקונצרט", default: true },
    { name: "purchase", title: "ב. אזור רכישת הכרטיסים" },
    { name: "notes", title: "ג. הערות בתחתית הטופס" },
  ],
  fields: [
    defineField({
      name: "programHeading",
      title: "כותרת אזור התוכנייה",
      description:
        "הכותרת מעל רשימת היצירות בעמוד פרטי הקונצרט. למשל: ״תוכנייה״ או ״רפרטואר הערב״.",
      type: "string",
      group: "hero",
      validation: (r) => r.max(60),
      initialValue: "תוכנייה",
    }),
    defineField({
      name: "upcomingChip",
      title: "תווית מועד הקונצרט בכרטיס התאריך",
      description:
        "הסטיקר הקטן בראש כרטיס התאריך בעמוד הקונצרט. למשל: ״הקונצרט הקרוב״ או ״המופע שלכם״.",
      type: "string",
      group: "hero",
      validation: (r) => r.max(60),
      initialValue: "הקונצרט הקרוב",
    }),
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
      name: "buyerDetailsHeading",
      title: "כותרת אזור פרטי הרוכש",
      description:
        "הכותרת מעל טופס פרטי הרוכש (שם, מייל, טלפון). למשל: ״פרטי הרוכש״.",
      type: "string",
      group: "purchase",
      validation: (r) => r.max(80),
      initialValue: "פרטי הרוכש",
    }),
    defineField({
      name: "orderSummaryHeading",
      title: "כותרת סיכום ההזמנה",
      description:
        "הכותרת מעל קופסת סיכום ההזמנה בצד שמאל. למשל: ״סיכום הזמנה״.",
      type: "string",
      group: "purchase",
      validation: (r) => r.max(80),
      initialValue: "סיכום הזמנה",
    }),
    defineField({
      name: "payCtaLabel",
      title: "טקסט כפתור התשלום",
      description:
        "הטקסט שמופיע על כפתור הרכישה הראשי בסיכום ההזמנה. למשל: ״המשך לתשלום בכרטיס אשראי״.",
      type: "string",
      group: "purchase",
      validation: (r) => r.max(80),
      initialValue: "המשך לתשלום בכרטיס אשראי",
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
