import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "קונסרבטוריון · מרכז המוסיקה רעננה",
  description:
    "הקונסרבטוריון של מרכז המוסיקה רעננה — מחלקות נגינה, תזמורות ומקהלות, תוכניות ייחודיות, טפסים, סגל המורים וכתבות.",
};

export default function ConservatoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
