"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { key: "conservatory", label: "קונסרבטוריון", href: "/conservatory" },
  { key: "rentals", label: "שכירויות והקלטות", href: "/rentals" },
  { key: "concerts", label: "מופעים וקונצרטים", href: "/concerts" },
  { key: "contact", label: "צור קשר", href: "#" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [solid, setSolid] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  if (pathname.startsWith("/studio")) return null;

  return (
    <header
      className={`site-header ${solid ? "solid" : "transparent"}`}
      id="siteHeader"
    >
      <div className="header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="מרכז פיס למוסיקה רעננה — דף הבית"
        >
          <Image
            src="/logo-raanana-music-center.png"
            alt=""
            width={630}
            height={417}
            priority
            className="brand-logo"
          />
          <span className="brand-wordmark">
            מרכז פיס למוסיקה רעננה
            <small>RAANANA PAIS MUSIC CENTER</small>
          </span>
        </Link>
        <nav className="nav" aria-label="ניווט ראשי">
          {navItems.map((item) => {
            const current =
              item.href !== "#" &&
              (pathname === item.href || pathname.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.key}
                href={item.href}
                className="nav-link"
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <a className="header-cta" href="#">
          הרשמה לשנה״ל
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 3L4 7l5 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <button
          className="icon-btn mobile-toggle"
          aria-label="פתיחת תפריט"
          type="button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
