import { sanityClient } from "@/sanity/client";
import {
  CONSERVATORY_HERO_QUERY,
  ENSEMBLE_INSTRUCTORS_QUERY,
  ENSEMBLE_PREVIEWS_QUERY,
  FORMS_QUERY,
  LEADERS_QUERY,
  type ConservatoryHeroDoc,
  type EnsembleInstructorDoc,
  type EnsemblePreview,
  type FormDoc,
  type LeaderDoc,
} from "@/sanity/queries";
import ConservatoryContent from "./ConservatoryContent";

export default async function ConservatoryPage() {
  const [forms, ensemblePreviews, ensembleInstructorDocs, leaderDocs, hero] =
    await Promise.all([
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
      sanityClient.fetch<EnsembleInstructorDoc[]>(
        ENSEMBLE_INSTRUCTORS_QUERY,
        {},
        { next: { revalidate: 60, tags: ["ensembleInstructor"] } },
      ),
      sanityClient.fetch<LeaderDoc[]>(
        LEADERS_QUERY,
        {},
        { next: { revalidate: 60, tags: ["leader"] } },
      ),
      sanityClient.fetch<ConservatoryHeroDoc>(
        CONSERVATORY_HERO_QUERY,
        {},
        { next: { revalidate: 60, tags: ["conservatoryHero"] } },
      ),
    ]);

  return (
    <ConservatoryContent
      forms={forms}
      ensemblePreviews={ensemblePreviews}
      ensembleInstructorDocs={ensembleInstructorDocs}
      leaderDocs={leaderDocs}
      hero={hero}
    />
  );
}
