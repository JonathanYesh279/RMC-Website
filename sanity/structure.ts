import type { StructureResolver } from "sanity/structure";
import { SINGLETON_IDS } from "./schemas";

export const structure: StructureResolver = (S) =>
  S.list()
    .id("root")
    .title("תוכן האתר")
    .items([
      S.listItem()
        .id("section-concerts")
        .title("🎵 קונצרטים")
        .child(
          S.list()
            .id("concerts-section")
            .title("קונצרטים")
            .items([
              S.listItem()
                .id("all-concerts")
                .title("כל הקונצרטים")
                .schemaType("concert")
                .child(
                  S.documentTypeList("concert")
                    .title("כל הקונצרטים")
                    .defaultOrdering([{ field: "date", direction: "asc" }]),
                ),
              S.divider(),
              S.listItem()
                .id("concertsPage")
                .title("⚙️ עמוד הרשימה")
                .child(
                  S.document()
                    .schemaType("concertsPage")
                    .documentId(SINGLETON_IDS.concertsPage),
                ),
              S.listItem()
                .id("concertCopy")
                .title("⚙️ טקסטים — עמוד פרטי קונצרט")
                .child(
                  S.document()
                    .schemaType("concertCopy")
                    .documentId(SINGLETON_IDS.concertCopy),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .id("section-conservatory")
        .title("🎓 קונסרבטוריון")
        .child(
          S.list()
            .id("conservatory-section")
            .title("קונסרבטוריון")
            .items([
              S.listItem()
                .id("conservatoryHero")
                .title("⚙️ וידאו בכותרת")
                .child(
                  S.document()
                    .schemaType("conservatoryHero")
                    .documentId(SINGLETON_IDS.conservatoryHero),
                ),
              S.divider(),
              S.documentTypeListItem("ensemblePreview").title(
                "הרכבים — כרטיסי תצוגה",
              ),
              S.documentTypeListItem("ensembleInstructor").title(
                "הרכבים — מנחים",
              ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .id("section-people")
        .title("👥 הנהלה ומורים")
        .child(
          S.list()
            .id("people-section")
            .title("הנהלה ומורים")
            .items([
              S.documentTypeListItem("leader").title("הנהלת המרכז"),
              S.documentTypeListItem("teacher").title("מורים"),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("formDocument").title("📄 טפסים להורדה"),
    ]);
