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
  const url = new URL(source);
  url.searchParams.set("w", String(opts.w));
  if (opts.h) url.searchParams.set("h", String(opts.h));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", opts.h ? "min" : "max");
  url.searchParams.set("q", String(opts.q ?? 75));
  return url.toString();
}
