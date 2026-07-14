import type { Metadata } from "next";
import CurrentStudentHub from "@/components/prototype/CurrentStudentHub";
import { sanityClient } from "@/sanity/client";
import { FORMS_QUERY, type FormDoc } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "תלמידים והורים · אב־טיפוס · מרכז המוסיקה רעננה",
};

export default async function CurrentStudentsPage() {
  // Real CMS-backed forms when available; the hub degrades to a link to the
  // production forms section if the fetch fails (e.g. offline preview).
  let forms: FormDoc[] = [];
  try {
    forms = await sanityClient.fetch<FormDoc[]>(
      FORMS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["formDocument"] } },
    );
  } catch {
    forms = [];
  }
  return <CurrentStudentHub forms={forms} />;
}
