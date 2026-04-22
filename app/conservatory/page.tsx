import { sanityClient } from "@/sanity/client";
import { FORMS_QUERY, type FormDoc } from "@/sanity/queries";
import ConservatoryContent from "./ConservatoryContent";

export default async function ConservatoryPage() {
  const forms = await sanityClient.fetch<FormDoc[]>(
    FORMS_QUERY,
    {},
    { next: { revalidate: 60, tags: ["formDocument"] } },
  );

  return <ConservatoryContent forms={forms} />;
}
