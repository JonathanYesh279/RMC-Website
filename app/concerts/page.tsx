"use client";

import { useEffect, useMemo, useState } from "react";
import {
  concerts,
  dateRangeLabel,
  featuredConcert,
  genreFilters,
  genreTag,
  subscriptionIntro,
  subscriptionTiers,
  type Concert,
  type Genre,
} from "./concerts-data";

type Filter = "all" | Genre;

function groupByMonth(list: Concert[]) {
  const groups: { month: string; items: Concert[] }[] = [];
  list.forEach((c) => {
    const last = groups[groups.length - 1];
    if (last && last.month === c.m) {
      last.items.push(c);
    } else {
      groups.push({ month: c.m, items: [c] });
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

export default function ConcertsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => (filter === "all" ? concerts : concerts.filter((c) => c.genre === filter)),
    [filter],
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
  }, []);

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
    <main>
      <section className="featured-concert">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              הקונצרט הקרוב
            </div>
          </div>
          <div className="featured-inner">
            <div className="reveal" style={{ position: "relative" }}>
              <div
                className="featured-img"
                style={{ backgroundImage: `url('${featuredConcert.image}')` }}
                role="img"
                aria-label={featuredConcert.title}
              >
                <div className="featured-badge">{featuredConcert.badge}</div>
              </div>
            </div>
            <div className="featured-text reveal">
              <div className="date-xl">
                <span className="d">{featuredConcert.dateNum}</span>
                <div className="info">
                  <strong>{featuredConcert.dateMonth}</strong>
                  {featuredConcert.dateMeta}
                </div>
              </div>
              <h2>{featuredConcert.title}</h2>
              <p className="body">{featuredConcert.body}</p>
              <div className="meta-line">
                {featuredConcert.meta.map((m) => (
                  <span key={m.label}>
                    <strong>{m.label}</strong> {m.value}
                  </span>
                ))}
              </div>
              <div className="cta-row">
                <a
                  href={featuredConcert.primaryCta.href}
                  className="btn btn--coral"
                >
                  {featuredConcert.primaryCta.label}
                </a>
                <a
                  href={featuredConcert.secondaryCta.href}
                  className="btn btn--outline"
                >
                  {featuredConcert.secondaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="filter-bar">
        <div className="container">
          <div className="row">
            <div
              className="filter-chips"
              role="tablist"
              aria-label="סינון לפי ז׳אנר"
            >
              {genreFilters.map((f) => {
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
            <div className="filter-date" aria-label="טווח תאריכים">
              <CalendarIcon />
              {dateRangeLabel}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="concerts-list" id="concertsList">
          {grouped.length === 0 ? (
            <div className="empty-state">
              <h3>אין קונצרטים בקטגוריה זו</h3>
              <p>בדקו שוב בקרוב או בחרו פילטר אחר.</p>
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.month}>
                <div className="month-divider reveal">
                  {group.month} 2026
                  <span>{group.items.length} קונצרטים</span>
                </div>
                {group.items.map((c) => {
                  const tag = genreTag[c.genre];
                  return (
                    <a
                      key={`${c.m}-${c.d}-${c.title}`}
                      className="concert-row reveal"
                      href="#"
                    >
                      <div
                        className="img"
                        style={{ backgroundImage: `url('${c.img}')` }}
                        role="img"
                        aria-label={c.title}
                      />
                      <div className="mid">
                        <div className="datebar">
                          <span className="day">{c.d}</span>
                          <span>
                            {c.m} · {c.t}
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
                            {c.t}
                          </span>
                        </div>
                        <p className="desc">{c.desc}</p>
                      </div>
                      <div className="side">
                        <div className="price">
                          <small>החל מ-</small>
                          {c.price}
                        </div>
                        <div className="soldness" data-state={c.soldness}>
                          <span className="dot" />
                          {c.soldLabel}
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

      <section className="sub-band">
        <div className="container sub-inner">
          <div className="reveal">
            <div className="eyebrow sub-eyebrow">
              <span className="eyebrow-dot" />
              {subscriptionIntro.eyebrow}
            </div>
            <h2>
              {subscriptionIntro.title}
              <br />
              <em>{subscriptionIntro.titleEm}</em>
            </h2>
            <p>{subscriptionIntro.body}</p>
          </div>
          <div className="sub-tiers reveal">
            {subscriptionTiers.map((tier) => (
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
        </div>
      </section>
    </main>
  );
}
