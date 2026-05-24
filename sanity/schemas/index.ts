import teacher from "./teacher";
import leader from "./leader";
import formDocument from "./formDocument";
import ensemblePreview from "./ensemblePreview";
import ensembleInstructor from "./ensembleInstructor";
import conservatoryHero from "./conservatoryHero";
import concert from "./concert";
import concertsPage from "./concertsPage";
import concertCopy from "./concertCopy";
import updatesPage from "./updatesPage";
import updateHoliday from "./updateHoliday";
import updateArchive from "./updateArchive";

export const schemaTypes = [
  teacher,
  leader,
  formDocument,
  ensemblePreview,
  ensembleInstructor,
  conservatoryHero,
  concert,
  concertsPage,
  concertCopy,
  updatesPage,
  updateHoliday,
  updateArchive,
];

export const SINGLETON_TYPES = new Set([
  "concertsPage",
  "concertCopy",
  "conservatoryHero",
  "updatesPage",
]);

export const SINGLETON_IDS: Record<string, string> = {
  concertsPage: "concertsPage",
  concertCopy: "concertCopy",
  conservatoryHero: "conservatoryHero",
  updatesPage: "updatesPage",
};
