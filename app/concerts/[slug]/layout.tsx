import type { Metadata } from "next";
import {
  concertDateLabels,
  concerts,
  findConcertBySlug,
} from "../concerts-data";

export async function generateStaticParams() {
  return concerts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const concert = findConcertBySlug(slug);
  if (!concert) {
    return {
      title: "קונצרט לא נמצא · מרכז המוסיקה רעננה",
    };
  }
  const dates = concertDateLabels(concert);
  return {
    title: `${concert.title} · רכישת כרטיסים · מרכז המוסיקה רעננה`,
    description: `${concert.desc} ${dates.shortDate}, ${concert.t} · ${concert.venue}.`,
  };
}

export default function ConcertDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
