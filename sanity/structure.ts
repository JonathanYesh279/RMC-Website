import type { StructureResolver } from "sanity/structure";
import { SINGLETON_IDS } from "./schemas";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("תוכן האתר")
    .items([
      S.listItem()
        .title("🎵 קונצרטים")
        .child(
          S.list()
            .title("קונצרטים")
            .items([
              S.listItem()
                .title("כל הקונצרטים")
                .schemaType("concert")
                .child(
                  S.documentTypeList("concert")
                    .title("כל הקונצרטים")
                    .defaultOrdering([{ field: "date", direction: "asc" }]),
                ),
              S.divider(),
              S.listItem()
                .title("⚙️ עמוד הרשימה")
                .id("concertsPage")
                .child(
                  S.document()
                    .schemaType("concertsPage")
                    .documentId(SINGLETON_IDS.concertsPage),
                ),
              S.listItem()
                .title("⚙️ טקסטים — עמוד פרטי קונצרט")
                .id("concertCopy")
                .child(
                  S.document()
                    .schemaType("concertCopy")
                    .documentId(SINGLETON_IDS.concertCopy),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("🎓 קונסרבטוריון")
        .child(
          S.list()
            .title("קונסרבטוריון")
            .items([
              S.listItem()
                .title("⚙️ וידאו בכותרת")
                .id("conservatoryHero")
                .child(
                  S.document()
                    .schemaType("conservatoryHero")
                    .documentId(SINGLETON_IDS.conservatoryHero),
                ),
              S.divider(),
              S.documentTypeListItem("ensemblePreview").title("הרכבים — כרטיסי תצוגה"),
              S.documentTypeListItem("ensembleInstructor").title("הרכבים — מנחים"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("👥 הנהלה ומורים")
        .child(
          S.list()
            .title("הנהלה ומורים")
            .items([
              S.documentTypeListItem("leader").title("הנהלת המרכז"),
              S.documentTypeListItem("teacher").title("מורים"),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("formDocument").title("📄 טפסים להורדה"),
    ]);
