import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "קונצרטים | Raanana Music Center",
};

export default function ConcertsPage() {
  return (
    <Container className="pt-[140px] pb-16">
      <h1 className="text-3xl font-bold mb-4">קונצרטים</h1>
      {/* TODO: concerts data will be fetched here — API or CMS integration pending */}
      <p className="text-neutral-700">
        תוכן מציין מקום עבור עמוד הקונצרטים.
      </p>
    </Container>
  );
}
