import { sanityClient } from "./client";

export const CONCERTS_TAG = "concerts";

export async function fetchConcerts<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate: 60, tags: [CONCERTS_TAG] },
  });
}
