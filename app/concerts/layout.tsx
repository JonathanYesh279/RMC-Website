import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מופעים וקונצרטים · מרכז המוסיקה רעננה",
  description:
    "עונת המופעים של מרכז המוסיקה רעננה — קונצרטים סימפוניים, ערבי ג׳אז, מופעי ילדים ומוסיקה ישראלית באודיטוריום המרכזי ובאולם הקאמרי. כרטיסים בודדים ומנויי עונה.",
};

export default function ConcertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
