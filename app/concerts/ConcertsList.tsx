"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CONCERT_DEFAULTS,
  GENRE_FILTERS,
  type Genre,
  genreTag,
} from "@/lib/concertMeta";

export type ConcertCard = {
  slug: string;
  title: string;
  genre: Genre;
  dayPadded: string;
  monthShort: string;
  monthFull: string;
  time: string;
  venue: string;
  shortDescription: string;
  priceLabel: string;
  availability: "open" | "hot" | "full";
  availabilityLabel: string;
  imageUrl: string;
  imageAlt: string;
};

type Filter = "all" | Genre;

function groupByMonth(list: ConcertCard[]) {
  const groups: { monthFull: string; items: ConcertCard[] }[] = [];
  list.forEach((c) => {
    const last = groups[groups.length - 1];
    if (last && last.monthFull === c.monthFull) {
      last.items.push(c);
    } else {
      groups.push({ monthFull: c.monthFull, items: [c] });
    }
  });
  return groups;
}

const PinIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    aria-hidden="true"
  >
    <path d="M6 10.5s3.5-2.5 3.5-5.5a3.5 3.5 0 0 0-7 0c0 3 3.5 5.5 3.5 5.5z" />
    <circle cx="6" cy="5" r="1.2" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    aria-hidden="true"
  >
    <circle cx="6" cy="6" r="4.5" />
    <path d="M6 3v3l2 1.5" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    aria-hidden="true"
  >
    <rect x="2" y="3" width="10" height="9" />
    <path d="M2 6h10M5 1v3M9 1v3" />
  </svg>
);

export default function ConcertsList({
  concerts,
  dateRangeLabel,
}: {
  concerts: ConcertCard[];
  dateRangeLabel: string | null;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? concerts
        : concerts.filter((c) => c.genre === filter),
    [filter, concerts],
  );

  const counts = useMemo(() => {
    const map: Record<Filter, number> = {
      all: concerts.length,
      classical: 0,
      jazz: 0,
      israeli: 0,
      kids: 0,
    };
    concerts.forEach((c) => {
      map[c.genre] += 1;
    });
    return map;
  }, [concerts]);

  const grouped = useMemo(() => groupByMonth(filtered), [filtered]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    document
      .querySelectorAll(".reveal:not(.in)")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filter]);

  return (
    <>
      <div className="filter-bar">
        <div className="container">
          <div className="row">
            <div
              className="filter-chips"
              role="tablist"
              aria-label="סינון לפי ז׳אנר"
            >
              {GENRE_FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`chip${active ? " active" : ""}`}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                    <span className="ct">{counts[f.id]}</span>
                  </button>
                );
              })}
            </div>
            {dateRangeLabel ? (
              <div className="filter-date" aria-label="טווח תאריכים">
                <CalendarIcon />
                {dateRangeLabel}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="concerts-list" id="concertsList">
          {grouped.length === 0 ? (
            <div className="empty-state">
              <h3>{CONCERT_DEFAULTS.emptyState.title}</h3>
              <p>{CONCERT_DEFAULTS.emptyState.body}</p>
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.monthFull}>
                <div className="month-divider reveal">
                  {group.monthFull}
                  <span>
                    {CONCERT_DEFAULTS.monthDividerSuffix(group.items.length)}
                  </span>
                </div>
                {group.items.map((c) => {
                  const tag = genreTag(c.genre);
                  return (
                    <a
                      key={c.slug}
                      className="concert-row reveal"
                      href={`/concerts/${c.slug}`}
                    >
                      <div
                        className="img"
                        style={{ backgroundImage: `url('${c.imageUrl}')` }}
                        role="img"
                        aria-label={c.imageAlt || c.title}
                      />
                      <div className="mid">
                        <div className="datebar">
                          <span className="day">{c.dayPadded}</span>
                          <span>
                            {c.monthShort} · {c.time}
                          </span>
                          <span className={`genre-tag ${tag.className}`}>
                            {tag.label}
                          </span>
                        </div>
                        <h3>{c.title}</h3>
                        <div className="meta">
                          <span className="ico">
                            <PinIcon />
                            {c.venue}
                          </span>
                          <span className="ico">
                            <ClockIcon />
                            {c.time}
                          </span>
                        </div>
                        <p className="desc">{c.shortDescription}</p>
                      </div>
                      <div className="side">
                        <div className="price">
                          <small>החל מ-</small>
                          {c.priceLabel}
                        </div>
                        <div className="soldness" data-state={c.availability}>
                          <span className="dot" />
                          {c.availabilityLabel}
                        </div>
                        <span
                          className="btn btn--coral"
                          style={{ justifyContent: "center" }}
                        >
                          לרכישת כרטיסים
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
