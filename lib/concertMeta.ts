export type Genre = "classical" | "jazz" | "israeli" | "kids";
export type Availability = "open" | "hot" | "full";

export const GENRE_TAG: Record<
  Genre,
  { className: string; label: string }
> = {
  classical: { className: "tag-classical", label: "קלאסי" },
  jazz: { className: "tag-jazz", label: "ג׳אז" },
  israeli: { className: "tag-israeli", label: "ישראלי" },
  kids: { className: "tag-kids", label: "ילדים" },
};

export const GENRE_FILTERS: { id: "all" | Genre; label: string }[] = [
  { id: "all", label: "הכל" },
  { id: "classical", label: "קלאסי" },
  { id: "jazz", label: "ג׳אז" },
  { id: "israeli", label: "מוסיקה ישראלית" },
  { id: "kids", label: "קונצרטים לילדים" },
];

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  open: "כרטיסים זמינים",
  hot: "מקומות אחרונים",
  full: "אולם מלא",
};

export function genreTag(g: string) {
  return GENRE_TAG[g as Genre] ?? GENRE_TAG.classical;
}

export function availabilityLabel(a: string) {
  return AVAILABILITY_LABEL[a as Availability] ?? AVAILABILITY_LABEL.open;
}

export const CONCERT_DEFAULTS = {
  duration: "כ־90 דקות",
  language: "תוכנייה בעברית",
  badge: "כרטיסים זמינים",
  programMessage: "תוכנייה מלאה תפורסם בקרוב",
  factLabels: {
    venue: "מקום",
    duration: "משך",
    language: "שפה",
  },
  crumbs: { home: "דף הבית", list: "מופעים וקונצרטים" },
  emptyState: {
    title: "אין קונצרטים בקטגוריה זו",
    body: "בדקו שוב בקרוב או בחרו פילטר אחר.",
  },
  monthDividerSuffix: (count: number) => `${count} קונצרטים`,
};
