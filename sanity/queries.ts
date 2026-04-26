import { defineQuery } from "next-sanity";

export const FORMS_QUERY = defineQuery(`
  *[_type == "formDocument" && defined(file.asset)] | order(displayOrder asc, title asc) {
    _id,
    title,
    description,
    "fileUrl": file.asset->url
  }
`);

export type FormDoc = {
  _id: string;
  title: string;
  description: string | null;
  fileUrl: string;
};

export const ENSEMBLE_PREVIEWS_QUERY = defineQuery(`
  *[_type == "ensemblePreview" && defined(image.asset)] | order(displayOrder asc, name asc) {
    _id,
    name,
    instructor,
    level,
    description,
    category,
    accent,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`);

export type EnsemblePreview = {
  _id: string;
  name: string;
  instructor: string;
  level: string;
  description: string;
  category: string | null;
  accent: "teal" | "amber" | "coral" | null;
  imageUrl: string;
  imageAlt: string | null;
};

export const ENSEMBLE_INSTRUCTORS_QUERY = defineQuery(`
  *[_type == "ensembleInstructor"] | order(displayOrder asc, name asc) {
    _id,
    name,
    role,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`);

export type EnsembleInstructorDoc = {
  _id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  imageAlt: string | null;
};

export const LEADERS_QUERY = defineQuery(`
  *[_type == "leader"] | order(displayOrder asc, name asc) {
    _id,
    name,
    title,
    subtitle,
    bio,
    accent,
    "imageUrl": photo.asset->url,
    "imageAlt": photo.alt
  }
`);

export type LeaderDoc = {
  _id: string;
  name: string;
  title: string;
  subtitle: string | null;
  bio: string | null;
  accent: "teal" | "coral" | "amber" | "ink";
  imageUrl: string | null;
  imageAlt: string | null;
};

export const CONSERVATORY_HERO_QUERY = defineQuery(`
  *[_type == "conservatoryHero"][0] {
    headline,
    headlineEm,
    lede,
    "videoUrl": video.asset->url,
    "posterUrl": poster.asset->url,
    "posterAlt": poster.alt
  }
`);

export type ConservatoryHeroDoc = {
  headline: string | null;
  headlineEm: string | null;
  lede: string | null;
  videoUrl: string | null;
  posterUrl: string | null;
  posterAlt: string | null;
} | null;

const CONCERT_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  genre,
  highlightBadge,
  date,
  venue,
  "image": {
    "url": image.asset->url,
    "alt": image.alt,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "lqip": image.asset->metadata.lqip
  },
  shortDescription,
  lede,
  basePrice,
  availability,
  duration,
  language,
  program[]{ work, composer },
  "heroVideoUrl": heroVideo.asset->url,
  "heroPoster": {
    "url": heroPoster.asset->url,
    "alt": heroPoster.alt
  }
`;

export const CONCERTS_LIST_QUERY = defineQuery(`
  *[_type == "concert" && defined(slug.current) && dateTime(date) >= dateTime(now())]
    | order(date asc) {
    ${CONCERT_PROJECTION}
  }
`);

export const CONCERTS_PAGE_QUERY = defineQuery(`
  *[_type == "concertsPage" && _id == "concertsPage"][0] {
    featuredEyebrow,
    featuredBlurb,
    primaryCtaLabel,
    secondaryCtaLabel,
    dateRangeLabel,
    subEyebrow,
    subTitle,
    subTitleEm,
    subBody,
    subTiers[]{ title, body, price },
    "featured": featured->{
      ${CONCERT_PROJECTION}
    }
  }
`);

export const CONCERT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "concert" && slug.current == $slug][0] {
    ${CONCERT_PROJECTION}
  }
`);

export const CONCERT_SLUGS_QUERY = defineQuery(`
  *[_type == "concert" && defined(slug.current) && dateTime(date) >= dateTime(now())].slug.current
`);

export const CONCERT_COPY_QUERY = defineQuery(`
  *[_type == "concertCopy" && _id == "concertCopy"][0] {
    purchaseEyebrow,
    purchaseTitle,
    accessibilityNote,
    secureNote,
    cancellationNote
  }
`);

export type ConcertImage = {
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  lqip: string | null;
};

export type ProgramItemDoc = {
  work: string;
  composer: string;
};

export type ConcertHeroPoster = {
  url: string | null;
  alt: string | null;
} | null;

export type ConcertDoc = {
  _id: string;
  title: string;
  slug: string;
  genre: "classical" | "jazz" | "israeli" | "kids";
  highlightBadge: string | null;
  date: string;
  venue: string;
  image: ConcertImage;
  shortDescription: string;
  lede: string;
  basePrice: number;
  availability: "open" | "hot" | "full";
  duration: string | null;
  language: string | null;
  program: ProgramItemDoc[] | null;
  heroVideoUrl: string | null;
  heroPoster: ConcertHeroPoster;
};

export type SubscriptionTierDoc = {
  title: string;
  body: string;
  price: string;
};

export type ConcertsPageDoc = {
  featuredEyebrow: string | null;
  featuredBlurb: string | null;
  primaryCtaLabel: string | null;
  secondaryCtaLabel: string | null;
  dateRangeLabel: string | null;
  subEyebrow: string | null;
  subTitle: string | null;
  subTitleEm: string | null;
  subBody: string | null;
  subTiers: SubscriptionTierDoc[] | null;
  featured: ConcertDoc | null;
} | null;

export type ConcertCopyDoc = {
  purchaseEyebrow: string | null;
  purchaseTitle: string | null;
  accessibilityNote: string | null;
  secureNote: string | null;
  cancellationNote: string | null;
} | null;
