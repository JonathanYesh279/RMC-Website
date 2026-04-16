import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "השכרות והקלטות | Raanana Music Center",
};

export default function RentalsPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold mb-4">השכרות והקלטות</h1>
      <p className="text-neutral-700">
        תוכן מציין מקום עבור עמוד ההשכרות וההקלטות.
      </p>
    </Container>
  );
}
