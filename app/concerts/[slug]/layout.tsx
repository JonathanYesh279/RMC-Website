import type { Metadata } from "next";
import { fetchConcerts } from "@/sanity/fetch";
import {
  CONCERT_BY_SLUG_QUERY,
  type ConcertDoc,
} from "@/sanity/queries";
import { formatConcertDate } from "@/lib/concertDate";
import { findMockConcertDoc } from "../mock-adapter";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sanityConcert = await fetchConcerts<ConcertDoc | null>(
    CONCERT_BY_SLUG_QUERY,
    { slug },
  );
  const concert = sanityConcert ?? findMockConcertDoc(slug);
  if (!concert) {
    return { title: "קונצרט לא נמצא · מרכז המוסיקה רעננה" };
  }
  const date = formatConcertDate(concert.date);
  return {
    title: `${concert.title} · רכישת כרטיסים · מרכז המוסיקה רעננה`,
    description: `${concert.shortDescription} ${date.shortDate}, ${date.time} · ${concert.venue}.`,
  };
}

export default function ConcertDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
