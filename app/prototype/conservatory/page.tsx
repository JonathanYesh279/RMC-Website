import type { Metadata } from "next";
import ConservatoryGateway from "@/components/prototype/ConservatoryGateway";

export const metadata: Metadata = {
  title: "קונסרבטוריון · אב־טיפוס · מרכז המוסיקה רעננה",
};

export default function PrototypeConservatoryPage() {
  return <ConservatoryGateway />;
}
