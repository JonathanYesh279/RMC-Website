import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מידע ועדכונים · מרכז המוסיקה רעננה",
  description:
    "שעות פעילות, חופשות חגים, מערכת השיעורים ולוח השנה השנתי של הקונסרבטוריון — מתעדכן באופן שוטף ע״י מזכירות המרכז.",
};

export default function UpdatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
