import { defineQuery } from "next-sanity";

export const FORMS_QUERY = defineQuery(`
  *[_type == "formDocument" && defined(file.asset)] | order(displayOrder asc, title asc) {
    _id,
    title,
    description,
    "fileUrl": file.asset->url
  }
`);

export type FormDoc = {
  _id: string;
  title: string;
  description: string | null;
  fileUrl: string;
};

export const ENSEMBLE_PREVIEWS_QUERY = defineQuery(`
  *[_type == "ensemblePreview" && defined(image.asset)] | order(displayOrder asc, name asc) {
    _id,
    name,
    instructor,
    level,
    description,
    category,
    accent,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt
  }
`);

export type EnsemblePreview = {
  _id: string;
  name: string;
  instructor: string;
  level: string;
  description: string;
  category: string | null;
  accent: "teal" | "amber" | "coral" | null;
  imageUrl: string;
  imageAlt: string | null;
};
