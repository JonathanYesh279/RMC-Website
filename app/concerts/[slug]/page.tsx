import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchConcerts } from "@/sanity/fetch";
import {
  CONCERT_BY_SLUG_QUERY,
  CONCERT_COPY_QUERY,
  CONCERT_SLUGS_QUERY,
  type ConcertCopyDoc,
  type ConcertDoc,
} from "@/sanity/queries";
import { formatConcertDate } from "@/lib/concertDate";
import { CONCERT_DEFAULTS } from "@/lib/concertMeta";
import { sanityImageUrl } from "@/lib/sanityImage";
import { buildTiers } from "@/lib/concertPricing";
import { findMockConcertDoc, mockConcertDocs } from "../mock-adapter";
import TicketPurchase from "./TicketPurchase";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  // Pre-render Sanity slugs (if any) plus every mock slug, so detail
  // routes work whether or not editors have published content yet.
  let sanitySlugs: string[] = [];
  try {
    sanitySlugs = await fetchConcerts<string[]>(CONCERT_SLUGS_QUERY);
  } catch {
    sanitySlugs = [];
  }
  const all = new Set<string>([
    ...sanitySlugs,
    ...mockConcertDocs.map((c) => c.slug),
  ]);
  return Array.from(all).map((slug) => ({ slug }));
}

export default async function ConcertDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [sanityConcert, copy] = await Promise.all([
    fetchConcerts<ConcertDoc | null>(CONCERT_BY_SLUG_QUERY, { slug }),
    fetchConcerts<ConcertCopyDoc>(CONCERT_COPY_QUERY),
  ]);

  const concert = sanityConcert ?? findMockConcertDoc(slug);
  if (!concert) notFound();

  const date = formatConcertDate(concert.date);
  const tiers = buildTiers(concert.basePrice);
  const lede = concert.lede || concert.shortDescription;
  const duration = concert.duration ?? CONCERT_DEFAULTS.duration;
  const language = concert.language ?? CONCERT_DEFAULTS.language;
  const program =
    concert.program && concert.program.length > 0
      ? concert.program
      : [{ work: concert.title, composer: CONCERT_DEFAULTS.programMessage }];
  const heroBadge = concert.highlightBadge ?? CONCERT_DEFAULTS.badge;

  const heroBg = sanityImageUrl(concert.image.url, { w: 2000, q: 60 });
  const heroImg = sanityImageUrl(concert.image.url, { w: 1600 });
  const thumbImg = sanityImageUrl(concert.image.url, { w: 240 });

  const heroVideoUrl = concert.heroVideoUrl ?? null;
  const videoPosterUrl = heroVideoUrl
    ? sanityImageUrl(concert.heroPoster?.url ?? concert.image.url, {
        w: 1600,
      })
    : null;

  return (
    <>
      <section className="detail-hero">
        <div
          className="detail-bg"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        <div className="detail-shell container">
          <nav className="detail-crumbs reveal" aria-label="פירורי לחם">
            <Link href="/">{CONCERT_DEFAULTS.crumbs.home}</Link> /{" "}
            <Link href="/concerts">{CONCERT_DEFAULTS.crumbs.list}</Link>{" "}
            / <span>{concert.title}</span>
          </nav>

          <div className="detail-grid">
            <div>
              <div
                className="detail-img reveal"
                style={{
                  backgroundImage: `url('${
                    heroVideoUrl ? (videoPosterUrl ?? heroImg) : heroImg
                  }')`,
                }}
                role={heroVideoUrl ? undefined : "img"}
                aria-label={
                  heroVideoUrl ? undefined : concert.image.alt || concert.title
                }
              >
                {heroVideoUrl ? (
                  <video
                    className="detail-img-video"
                    src={heroVideoUrl}
                    poster={videoPosterUrl ?? undefined}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={concert.image.alt || concert.title}
                  />
                ) : null}
                <div className="detail-badge">{heroBadge}</div>
              </div>
              <div className="detail-info reveal">
                <h1>{concert.title}</h1>
                <p className="detail-lede">{lede}</p>
              </div>

              <div className="detail-facts reveal">
                <div className="detail-fact">
                  <div className="detail-fact-l">
                    {CONCERT_DEFAULTS.factLabels.venue}
                  </div>
                  <div className="detail-fact-v">{concert.venue}</div>
                </div>
                <div className="detail-fact">
                  <div className="detail-fact-l">
                    {CONCERT_DEFAULTS.factLabels.duration}
                  </div>
                  <div className="detail-fact-v">{duration}</div>
                </div>
                <div className="detail-fact">
                  <div className="detail-fact-l">
                    {CONCERT_DEFAULTS.factLabels.language}
                  </div>
                  <div className="detail-fact-v">{language}</div>
                </div>
              </div>

              <div className="detail-program reveal">
                <h3>{copy?.programHeading ?? "תוכנייה"}</h3>
                <ul>
                  {program.map((p, i) => (
                    <li key={`${p.composer}-${p.work}-${i}`}>
                      <span className="prog-work">{p.work}</span>
                      <span className="prog-composer">{p.composer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="detail-date-card reveal">
                <div className="ddc-chip">
                  {copy?.upcomingChip ?? "הקונצרט הקרוב"}
                </div>
                <div className="ddc-num">{date.day}</div>
                <div className="ddc-mo">{date.monthFull}</div>
                <div className="ddc-day">{date.dayName}</div>
                <div className="ddc-time">{date.time}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TicketPurchase
        concertTitle={concert.title}
        thumbUrl={thumbImg}
        thumbAlt={concert.image.alt || concert.title}
        shortDate={date.shortDate}
        time={date.time}
        tiers={tiers}
        copy={{
          purchaseEyebrow: copy?.purchaseEyebrow ?? "רכישת כרטיסים",
          purchaseTitle:
            copy?.purchaseTitle ?? "בחרו כרטיסים והשלימו הזמנה",
          buyerDetailsHeading:
            copy?.buyerDetailsHeading ?? "פרטי הרוכש",
          orderSummaryHeading:
            copy?.orderSummaryHeading ?? "סיכום הזמנה",
          payCtaLabel:
            copy?.payCtaLabel ?? "המשך לתשלום בכרטיס אשראי",
          accessibilityNote:
            copy?.accessibilityNote ??
            "המרכז מונגש לבעלי מוגבלויות. לסיוע בהזמנה ניתן לפנות אלינו.",
          secureNote: copy?.secureNote ?? "תשלום מאובטח בתקן PCI-DSS",
          cancellationNote:
            copy?.cancellationNote ??
            "ניתן לבטל עד 48 שעות לפני המופע ולקבל זיכוי מלא.",
        }}
      />
    </>
  );
}
