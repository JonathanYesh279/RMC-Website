import { sanityClient } from "@/sanity/client";
import {
  ENSEMBLE_PREVIEWS_QUERY,
  FORMS_QUERY,
  type EnsemblePreview,
  type FormDoc,
} from "@/sanity/queries";
import ConservatoryContent from "./ConservatoryContent";

export default async function ConservatoryPage() {
  const [forms, ensemblePreviews] = await Promise.all([
    sanityClient.fetch<FormDoc[]>(
      FORMS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["formDocument"] } },
    ),
    sanityClient.fetch<EnsemblePreview[]>(
      ENSEMBLE_PREVIEWS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["ensemblePreview"] } },
    ),
  ]);

  return (
    <ConservatoryContent
      forms={forms}
      ensemblePreviews={ensemblePreviews}
    />
  );
}
