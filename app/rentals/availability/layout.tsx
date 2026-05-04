import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "בדיקת זמינות · מרכז המוסיקה רעננה",
  description:
    "לוח זמנים חי לכל החללים במרכז המוסיקה רעננה — בחרו תאריך, חלון הפקה ושלחו בקשת הזמנה. תשובה תוך 48 שעות עם אישור והצעת מחיר.",
};

export default function AvailabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
