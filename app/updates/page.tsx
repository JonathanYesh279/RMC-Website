import { sanityClient } from "@/sanity/client";
import {
  UPDATES_PAGE_QUERY,
  UPDATE_ARCHIVE_QUERY,
  UPDATE_HOLIDAYS_QUERY,
  type UpdateArchiveDoc,
  type UpdateHolidayDoc,
  type UpdatesPageDoc,
} from "@/sanity/queries";
import UpdatesContent from "./UpdatesContent";

export default async function UpdatesPage() {
  const [page, holidays, archive] = await Promise.all([
    sanityClient.fetch<UpdatesPageDoc>(
      UPDATES_PAGE_QUERY,
      {},
      { next: { revalidate: 60, tags: ["updatesPage"] } },
    ),
    sanityClient.fetch<UpdateHolidayDoc[]>(
      UPDATE_HOLIDAYS_QUERY,
      {},
      { next: { revalidate: 60, tags: ["updateHoliday"] } },
    ),
    sanityClient.fetch<UpdateArchiveDoc[]>(
      UPDATE_ARCHIVE_QUERY,
      {},
      { next: { revalidate: 60, tags: ["updateArchive"] } },
    ),
  ]);

  return (
    <UpdatesContent
      page={page ?? null}
      holidays={holidays ?? []}
      archive={archive ?? []}
    />
  );
}
