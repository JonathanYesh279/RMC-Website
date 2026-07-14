import type { Metadata } from "next";
import ExploreConservatory from "@/components/prototype/ExploreConservatory";

export const metadata: Metadata = {
  title: "כל התוכן · אב־טיפוס · מרכז המוסיקה רעננה",
};

export default function ExplorePage() {
  return <ExploreConservatory />;
}
