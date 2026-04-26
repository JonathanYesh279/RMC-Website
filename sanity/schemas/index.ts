import teacher from "./teacher";
import leader from "./leader";
import formDocument from "./formDocument";
import ensemblePreview from "./ensemblePreview";
import ensembleInstructor from "./ensembleInstructor";
import conservatoryHero from "./conservatoryHero";
import concert from "./concert";
import concertsPage from "./concertsPage";
import concertCopy from "./concertCopy";

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
];

export const SINGLETON_TYPES = new Set([
  "concertsPage",
  "concertCopy",
  "conservatoryHero",
]);

export const SINGLETON_IDS: Record<string, string> = {
  concertsPage: "concertsPage",
  concertCopy: "concertCopy",
  conservatoryHero: "conservatoryHero",
};
