export type SanityImage = {
  url: string;
  alt: string | null;
  width: number | null;
  height: number | null;
  lqip: string | null;
};

export function sanityImageUrl(
  source: string,
  opts: { w: number; h?: number; q?: number },
) {
  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return source;
  }
  // Only rewrite Sanity CDN URLs — leave external URLs (e.g. Unsplash
  // mock images) untouched so we don't double-up incompatible params.
  if (!url.hostname.endsWith("cdn.sanity.io")) return source;
  url.searchParams.set("w", String(opts.w));
  if (opts.h) url.searchParams.set("h", String(opts.h));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", opts.h ? "min" : "max");
  url.searchParams.set("q", String(opts.q ?? 75));
  return url.toString();
}
