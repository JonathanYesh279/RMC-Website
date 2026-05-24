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
import {
  buildStatusPill,
  buildTodayLine,
  FALLBACK_HOURS_ROWS,
} from "./derived";

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

  const safeHolidays = holidays ?? [];
  const safeArchive = archive ?? [];
  const statusPill = buildStatusPill(safeArchive);
  const todayLine = buildTodayLine(page ?? null, FALLBACK_HOURS_ROWS);

  return (
    <UpdatesContent
      page={page ?? null}
      holidays={safeHolidays}
      archive={safeArchive}
      statusPill={statusPill}
      todayLine={todayLine}
    />
  );
}
