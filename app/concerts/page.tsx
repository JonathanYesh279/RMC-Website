import { fetchConcerts } from "@/sanity/fetch";
import {
  CONCERTS_LIST_QUERY,
  CONCERTS_PAGE_QUERY,
  type ConcertDoc,
  type ConcertsPageDoc,
} from "@/sanity/queries";
import { formatConcertDate, deriveDateRangeLabel } from "@/lib/concertDate";
import { availabilityLabel as labelFor } from "@/lib/concertMeta";
import { sanityImageUrl } from "@/lib/sanityImage";
import ConcertsList, {
  type ConcertCard,
} from "./ConcertsList";

export const revalidate = 60;

const FALLBACK = {
  featuredEyebrow: "הקונצרט הקרוב",
  primaryCtaLabel: "לרכישת כרטיסים",
  secondaryCtaLabel: "קרא עוד על הקונצרט",
  subEyebrow: "מנויי עונה",
  subTitle: "עונה שלמה של",
  subTitleEm: "מוסיקה חיה.",
};

function toCard(c: ConcertDoc): ConcertCard {
  const d = formatConcertDate(c.date);
  return {
    slug: c.slug,
    title: c.title,
    genre: c.genre,
    dayPadded: d.dayPadded,
    monthShort: d.monthShort,
    monthFull: d.monthFull,
    time: d.time,
    venue: c.venue,
    shortDescription: c.shortDescription,
    priceLabel: `₪${c.basePrice}`,
    availability: c.availability,
    availabilityLabel: labelFor(c.availability),
    imageUrl: sanityImageUrl(c.image.url, { w: 1200 }),
    imageAlt: c.image.alt ?? c.title,
  };
}

export default async function ConcertsPage() {
  const [concerts, page] = await Promise.all([
    fetchConcerts<ConcertDoc[]>(CONCERTS_LIST_QUERY),
    fetchConcerts<ConcertsPageDoc>(CONCERTS_PAGE_QUERY),
  ]);

  const cards = concerts.map(toCard);
  const dateRangeLabel =
    page?.dateRangeLabel || deriveDateRangeLabel(concerts.map((c) => c.date));

  const featuredConcert =
    page?.featured && new Date(page.featured.date) >= new Date()
      ? page.featured
      : null;

  const featuredDate = featuredConcert
    ? formatConcertDate(featuredConcert.date)
    : null;
  const featuredBlurb =
    page?.featuredBlurb || featuredConcert?.lede || "";
  const primaryCtaLabel = page?.primaryCtaLabel ?? FALLBACK.primaryCtaLabel;
  const secondaryCtaLabel =
    page?.secondaryCtaLabel ?? FALLBACK.secondaryCtaLabel;
  const featuredEyebrow = page?.featuredEyebrow ?? FALLBACK.featuredEyebrow;

  const showSubBand =
    page && (page.subTitle || page.subBody || page.subTiers?.length);

  return (
    <main>
      {featuredConcert && featuredDate ? (
        <section className="featured-concert">
          <div className="container">
            <div className="sec-head reveal">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                {featuredEyebrow}
              </div>
            </div>
            <div className="featured-inner">
              <div className="reveal" style={{ position: "relative" }}>
                <div
                  className="featured-img"
                  style={{
                    backgroundImage: `url('${sanityImageUrl(
                      featuredConcert.image.url,
                      { w: 1600 },
                    )}')`,
                  }}
                  role="img"
                  aria-label={
                    featuredConcert.image.alt || featuredConcert.title
                  }
                >
                  {featuredConcert.highlightBadge ? (
                    <div className="featured-badge">
                      {featuredConcert.highlightBadge}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="featured-text reveal">
                <div className="date-xl">
                  <span className="d">{featuredDate.day}</span>
                  <div className="info">
                    <strong>{featuredDate.monthFull}</strong>
                    {featuredDate.dayName} · {featuredDate.time}
                  </div>
                </div>
                <h2>{featuredConcert.title}</h2>
                <p className="body">{featuredBlurb}</p>
                <div className="meta-line">
                  <span>
                    <strong>מקום:</strong> {featuredConcert.venue}
                  </span>
                  {featuredConcert.duration ? (
                    <span>
                      <strong>משך:</strong> {featuredConcert.duration}
                    </span>
                  ) : null}
                  {featuredConcert.language ? (
                    <span>
                      <strong>שפה:</strong> {featuredConcert.language}
                    </span>
                  ) : null}
                </div>
                <div className="cta-row">
                  <a
                    href={`/concerts/${featuredConcert.slug}#tickets`}
                    className="btn btn--coral"
                  >
                    {primaryCtaLabel} — ₪{featuredConcert.basePrice}
                  </a>
                  <a
                    href={`/concerts/${featuredConcert.slug}`}
                    className="btn btn--outline"
                  >
                    {secondaryCtaLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <ConcertsList concerts={cards} dateRangeLabel={dateRangeLabel} />

      {showSubBand ? (
        <section className="sub-band">
          <div className="container sub-inner">
            <div className="reveal">
              <div className="eyebrow sub-eyebrow">
                <span className="eyebrow-dot" />
                {page?.subEyebrow ?? FALLBACK.subEyebrow}
              </div>
              <h2>
                {page?.subTitle ?? FALLBACK.subTitle}
                <br />
                <em>{page?.subTitleEm ?? FALLBACK.subTitleEm}</em>
              </h2>
              {page?.subBody ? <p>{page.subBody}</p> : null}
            </div>
            {page?.subTiers && page.subTiers.length > 0 ? (
              <div className="sub-tiers reveal">
                {page.subTiers.map((tier) => (
                  <div className="sub-tier" key={tier.title}>
                    <div>
                      <h3>{tier.title}</h3>
                      <p>{tier.body}</p>
                    </div>
                    <div className="price-tag">
                      <small>לעונה</small>
                      {tier.price}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </main>
  );
}

