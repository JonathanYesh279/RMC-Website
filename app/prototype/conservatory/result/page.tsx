import type { Metadata } from "next";
import { redirect } from "next/navigation";
import RecommendationResult from "@/components/prototype/RecommendationResult";
import {
  answersFromParams,
  DISCOVER_PATH,
  isComplete,
  paramsFromAnswers,
} from "@/lib/prototype/journey";

export const metadata: Metadata = {
  title: "ההמלצה שלנו · אב־טיפוס · מרכז המוסיקה רעננה",
};

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const answers = answersFromParams(await searchParams);
  if (!isComplete(answers)) {
    // Arriving with a partial (or hand-edited) URL drops you back into the
    // flow at the first unanswered question, keeping what you did answer.
    redirect(`${DISCOVER_PATH}${paramsFromAnswers(answers)}`);
  }
  return <RecommendationResult answers={answers} />;
}
