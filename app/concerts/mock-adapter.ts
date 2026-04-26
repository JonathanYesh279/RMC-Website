import type { ConcertDoc, ConcertsPageDoc } from "@/sanity/queries";
import type { Concert } from "./concerts-data";
import {
  concerts as mockConcerts,
  featuredConcert as mockFeatured,
  featuredConcertSlug,
  subscriptionIntro,
  subscriptionTiers,
} from "./concerts-data";

const MOCK_YEAR = 2026;
const MONTH_INDEX: Record<string, number> = {
  ינואר: 1,
  פברואר: 2,
  מרץ: 3,
  אפריל: 4,
  מאי: 5,
  יוני: 6,
  יולי: 7,
  אוגוסט: 8,
  ספטמבר: 9,
  אוקטובר: 10,
  נובמבר: 11,
  דצמבר: 12,
};

// Israel observes DST late-March through late-October. All current mock
// concerts fall in May-July, so +03:00 is correct. If the mock list ever
// includes winter dates, swap to +02:00 for Nov-Mar.
function mockIsoDate(d: string, m: string, t: string): string {
  const month = MONTH_INDEX[m] ?? 1;
  const day = Number(d);
  const offset = month >= 4 && month <= 10 ? "+03:00" : "+02:00";
  return `${MOCK_YEAR}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0",
  )}T${t}:00${offset}`;
}

export function mockToConcertDoc(c: Concert): ConcertDoc {
  return {
    _id: `mock-${c.slug}`,
    title: c.title,
    slug: c.slug,
    genre: c.genre,
    highlightBadge: c.badge ?? null,
    date: mockIsoDate(c.d, c.m, c.t),
    venue: c.venue,
    image: {
      url: c.img,
      alt: c.title,
      width: null,
      height: null,
      lqip: null,
    },
    shortDescription: c.desc,
    lede: c.lede ?? c.desc,
    basePrice: c.basePrice,
    availability: c.soldness,
    duration: c.duration ?? null,
    language: c.language ?? null,
    program: c.program ?? null,
    heroVideoUrl: null,
    heroPoster: null,
  };
}

export const mockConcertDocs: ConcertDoc[] = mockConcerts.map(mockToConcertDoc);

export function findMockConcertDoc(slug: string): ConcertDoc | null {
  const hit = mockConcerts.find((c) => c.slug === slug);
  return hit ? mockToConcertDoc(hit) : null;
}

// Synthesizes the page singleton view we'd get from Sanity, using the
// existing mock featured + subscription content. Used only when the
// Sanity page singleton hasn't been created yet.
export function mockPageDoc(): NonNullable<ConcertsPageDoc> {
  const featured = mockToConcertDoc(
    mockConcerts.find((c) => c.slug === featuredConcertSlug) ?? mockConcerts[0],
  );
  // The mock featured object carries its own badge/lede; preserve them
  // on the synthesized concert doc so the featured band looks identical.
  if (mockFeatured.badge) featured.highlightBadge = mockFeatured.badge;
  if (mockFeatured.body) featured.lede = mockFeatured.body;
  return {
    featuredEyebrow: "הקונצרט הקרוב",
    featuredBlurb: mockFeatured.body,
    primaryCtaLabel: "לרכישת כרטיסים",
    secondaryCtaLabel: "קרא עוד על הקונצרט",
    dateRangeLabel: null,
    subEyebrow: subscriptionIntro.eyebrow,
    subTitle: subscriptionIntro.title,
    subTitleEm: subscriptionIntro.titleEm,
    subBody: subscriptionIntro.body,
    subTiers: subscriptionTiers.map((t) => ({
      title: t.title,
      body: t.body,
      price: t.price,
    })),
    featured,
  };
}
