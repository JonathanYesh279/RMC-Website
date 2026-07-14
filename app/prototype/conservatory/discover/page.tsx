import type { Metadata } from "next";
import DiscoveryJourney from "@/components/prototype/DiscoveryJourney";
import { answersFromParams } from "@/lib/prototype/journey";

export const metadata: Metadata = {
  title: "מציאת מסלול · אב־טיפוס · מרכז המוסיקה רעננה",
};

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const answers = answersFromParams(await searchParams);
  return <DiscoveryJourney answers={answers} />;
}
