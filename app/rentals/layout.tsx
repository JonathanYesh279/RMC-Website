import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "שכירויות והקלטות · מרכז המוסיקה רעננה",
  description:
    "שלושה חללים אקוסטיים ברמה הגבוהה ביותר — האודיטוריום המרכזי, האולם הקאמרי וסטודיו ההקלטות. פתוחים להשכרה למופעים, כנסים, הפקות וידאו והקלטות אולפן.",
};

export default function RentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
