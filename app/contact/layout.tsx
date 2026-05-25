import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "צור קשר · מרכז המוסיקה רעננה",
  description:
    "מרכז פיס למוסיקה רעננה — שעות פעילות, כתובת, מפה, טלפונים, כתובות דוא״ל של ההנהלה, נגישות והגעה לבניין.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
