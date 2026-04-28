// Single source of truth for the conservatory page's "תוכניות מיוחדות" keys.
// Used by the Sanity formDocument schema (to populate the linkedSpecialProgram
// dropdown) AND by the conservatory-data static program list (to type the
// `key` field). Keep entries here aligned with the static `programs` array
// in app/conservatory/conservatory-data.ts.

export const SPECIAL_PROGRAM_OPTIONS = [
  { value: "keshet", title: "פסטיבל ״קשת ערן״" },
  { value: "talmim", title: "תלמים" },
  { value: "mechoname", title: "מחלקת מחוננים ומצטיינים" },
  { value: "alon", title: "מגמת מוסיקה · חטיבת אלון" },
  { value: "rimon", title: "מגמת מוסיקה · חטיבת רימון" },
  { value: "hafaka", title: "הפקה מוסיקלית" },
  { value: "tzipor", title: "צפור, לאן את נוסעת?" },
] as const satisfies ReadonlyArray<{ value: string; title: string }>;

export type SpecialProgramKey =
  (typeof SPECIAL_PROGRAM_OPTIONS)[number]["value"];
