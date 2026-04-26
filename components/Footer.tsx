"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;

  return (
    <footer className="site-footer flush">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-about">
            <span className="brand-mark" role="img" aria-hidden="true" />
            <p>
              מרכז פיס למוסיקה רעננה — הקונסרבטוריון הגדול בישראל, חממה לחינוך
              מוסיקלי המשרתת מעל 1,300 תלמידים. בית פתוח לכל בני הנוער ותושבי
              העיר, בכל הסגנונות המוסיקליים.
            </p>
            <div className="footer-socials" aria-label="רשתות חברתיות">
              <a href="#" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M9.3 15v-6h2l.3-2.4H9.3V5c0-.7.2-1.2 1.2-1.2h1.3V1.6c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.3v1.8H4.5V9h2.2v6h2.6z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <rect x="2" y="2" width="12" height="12" rx="3" />
                  <circle cx="8" cy="8" r="2.6" />
                  <circle cx="11.3" cy="4.7" r=".7" fill="currentColor" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M15 4.3c-.2-.7-.7-1.2-1.4-1.4C12.3 2.6 8 2.6 8 2.6s-4.3 0-5.6.3c-.7.2-1.2.7-1.4 1.4C.8 5.6.8 8 .8 8s0 2.4.3 3.7c.2.7.7 1.2 1.4 1.4 1.3.3 5.6.3 5.6.3s4.3 0 5.6-.3c.7-.2 1.2-.7 1.4-1.4.3-1.3.3-3.7.3-3.7s0-2.4-.3-3.7zM6.5 10.6V5.4L10.9 8l-4.4 2.6z" />
                </svg>
              </a>
              <a href="#" aria-label="Spotify">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.7 11.5c-.2.2-.5.3-.7.1-1.9-1.2-4.4-1.4-7.3-.8-.3.1-.5-.1-.6-.4-.1-.3.1-.5.4-.6 3.2-.7 5.9-.4 8.1.9.3.2.3.5.1.8zm1-2.2c-.2.3-.6.4-.9.2-2.2-1.4-5.6-1.8-8.2-1-.3.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 3-.9 6.7-.4 9.2 1.1.3.2.4.6.2 1zm.1-2.3c-2.6-1.6-7-1.7-9.5-1-.4.1-.9-.1-1-.6-.1-.4.1-.9.6-1 2.9-.9 7.7-.7 10.7 1.1.4.2.5.8.3 1.2-.3.4-.8.5-1.1.3z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>ניווט</h4>
            <ul>
              <li>
                <Link href="/conservatory">קונסרבטוריון</Link>
              </li>
              <li>
                <Link href="/rentals">שכירויות והקלטות</Link>
              </li>
              <li>
                <Link href="/concerts">מופעים וקונצרטים</Link>
              </li>
              <li>
                <a href="#">גלריה</a>
              </li>
              <li>
                <a href="#">אודות</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>מידע לתלמידים</h4>
            <ul>
              <li>
                <a href="#">הרשמה לשנה״ל</a>
              </li>
              <li>
                <a href="#">לוח שנה</a>
              </li>
              <li>
                <a href="#">טפסים</a>
              </li>
              <li>
                <a href="#">סגל המורים</a>
              </li>
              <li>
                <a href="#">שאלות נפוצות</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>צור קשר</h4>
            <ul className="footer-contact">
              <li>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <path d="M7 12.5s4.5-3 4.5-7a4.5 4.5 0 0 0-9 0c0 4 4.5 7 4.5 7z" />
                  <circle cx="7" cy="5.5" r="1.5" />
                </svg>
                <span>
                  רחוב עציון 48
                  <br />
                  רעננה, 4322948
                </span>
              </li>
              <li>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <path d="M2 3l2-1 1.5 3L4 6s1 3 4 4l1-1.5L12 10l-1 2c-4 .5-9-4-9-9z" />
                </svg>
                <span>09-7711330</span>
              </li>
              <li>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                >
                  <rect x="1.5" y="2.5" width="11" height="9" />
                  <path d="M1.5 3l5.5 4 5.5-4" />
                </svg>
                <span>info@music-raanana.org.il</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 מרכז פיס למוסיקה רעננה. כל הזכויות שמורות.</div>
          <div>
            <a href="#">מדיניות פרטיות</a> · <a href="#">תנאי שימוש</a> ·{" "}
            <a href="#">נגישות</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
