import type { Metadata } from "next";
import Link from "next/link";
import "./prototype.css";

// Isolated experimental experience. The stylesheet is imported only here, so
// it loads on /prototype/* routes alone, and every class in it is
// pt-prefixed — nothing can leak into the production pages.

export const metadata: Metadata = {
  title: "אב־טיפוס · מרכז המוסיקה רעננה",
  description: "גרסת התנסות לחוויית אתר מונחית — קונסרבטוריון רעננה.",
  robots: { index: false, follow: false },
};

export default function PrototypeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="pt-root">
      {children}
      <Link href="/prototype" className="pt-ribbon">
        אב־טיפוס · גרסת התנסות
      </Link>
    </div>
  );
}
