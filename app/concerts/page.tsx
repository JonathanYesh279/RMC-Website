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
import { mockConcertDocs, mockPageDoc } from "./mock-adapter";

export const revalidate = 60;

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
  const [sanityConcerts, sanityPage] = await Promise.all([
    fetchConcerts<ConcertDoc[]>(CONCERTS_LIST_QUERY),
    fetchConcerts<ConcertsPageDoc>(CONCERTS_PAGE_QUERY),
  ]);

  // Per-section fallback: until editors create real content in Sanity,
  // the page keeps rendering the original mock list and bands.
  const concerts: ConcertDoc[] =
    sanityConcerts.length > 0 ? sanityConcerts : mockConcertDocs;

  const fallbackPage = mockPageDoc();
  const page: NonNullable<ConcertsPageDoc> = sanityPage ?? fallbackPage;

  // Featured priority: explicit upcoming pick → first upcoming concert
  // (Sanity if any, else mock) → none.
  const now = new Date();
  const isUpcoming = (c: ConcertDoc) => new Date(c.date) >= now;
  const featuredConcert: ConcertDoc | null = (() => {
    if (page.featured && isUpcoming(page.featured)) return page.featured;
    const firstUpcoming = concerts.find(isUpcoming);
    if (firstUpcoming) return firstUpcoming;
    return fallbackPage.featured && isUpcoming(fallbackPage.featured)
      ? fallbackPage.featured
      : null;
  })();

  const cards = concerts.map(toCard);
  const dateRangeLabel =
    page.dateRangeLabel || deriveDateRangeLabel(concerts.map((c) => c.date));

  const featuredDate = featuredConcert
    ? formatConcertDate(featuredConcert.date)
    : null;
  const featuredBlurb =
    page.featuredBlurb || featuredConcert?.lede || "";

  const showSubBand = Boolean(
    page.subTitle || page.subBody || (page.subTiers && page.subTiers.length),
  );

  return (
    <main>
      {featuredConcert && featuredDate ? (
        <section className="featured-concert">
          <div className="container">
            <div className="sec-head reveal">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                {page.featuredEyebrow ?? "הקונצרט הקרוב"}
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
                    {page.primaryCtaLabel ?? "לרכישת כרטיסים"} — ₪
                    {featuredConcert.basePrice}
                  </a>
                  <a
                    href={`/concerts/${featuredConcert.slug}`}
                    className="btn btn--outline"
                  >
                    {page.secondaryCtaLabel ?? "קרא עוד על הקונצרט"}
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
                {page.subEyebrow ?? "מנויי עונה"}
              </div>
              <h2>
                {page.subTitle ?? "עונה שלמה של"}
                <br />
                <em>{page.subTitleEm ?? "מוסיקה חיה."}</em>
              </h2>
              {page.subBody ? <p>{page.subBody}</p> : null}
            </div>
            {page.subTiers && page.subTiers.length > 0 ? (
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
