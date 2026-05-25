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
import { findMockConcertDoc, mockConcertDocs } from "../mock-adapter";
import ScrollReveal from "@/components/ScrollReveal";

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

  const heroVideoUrl = concert.heroVideoUrl ?? null;
  const videoPosterUrl = heroVideoUrl
    ? sanityImageUrl(concert.heroPoster?.url ?? concert.image.url, {
        w: 1600,
      })
    : null;

  return (
    <>
      <ScrollReveal />
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

              <div className="detail-access reveal">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="4.5" r="1.6" />
                  <path d="M12 8v5M7.5 10.5h9" />
                  <path d="M8.5 21.5l3-6 3 6" />
                </svg>
                <div>
                  <div className="detail-access-l">
                    המקום מותאם נגישות מלאה
                  </div>
                  <div className="detail-access-s">
                    מקומות לכיסאות גלגלים · עזרי שמיעה · לתיאום מראש: 09-7711330
                  </div>
                </div>
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

                {concert.ticketsEnabled !== false && concert.ticketUrl ? (
                  <>
                    <a
                      className="ddc-cta"
                      href={concert.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      לרכישת כרטיסים
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 5l-6 5 6 5" />
                      </svg>
                    </a>
                    <div className="ddc-secure">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        aria-hidden="true"
                      >
                        <rect x="3" y="6" width="8" height="7" rx="1" />
                        <path d="M5 6V4a2 2 0 0 1 4 0v2" />
                      </svg>
                      {concert.ticketProviderLabel ||
                        "תשלום מאובטח באתר העירייה"}
                    </div>
                  </>
                ) : (
                  <div className="ddc-soon">פרטי רכישת הכרטיסים יתפרסמו בקרוב</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
