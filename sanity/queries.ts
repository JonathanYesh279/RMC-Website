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
