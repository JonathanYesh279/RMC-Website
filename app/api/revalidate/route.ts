import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { CONCERTS_TAG } from "@/sanity/fetch";

const CONCERT_TYPES = new Set([
  "concert",
  "concertsPage",
  "concertCopy",
]);

export async function POST(req: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "Server is missing SANITY_REVALIDATE_SECRET." },
      { status: 500 },
    );
  }
  const provided =
    req.headers.get("x-sanity-secret") ??
    req.nextUrl.searchParams.get("secret");
  if (provided !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } | string } = {};
  try {
    body = await req.json();
  } catch {
    /* empty body — still revalidate broadly */
  }

  const type = body._type;
  if (type && CONCERT_TYPES.has(type)) {
    revalidateTag(CONCERTS_TAG, "max");
    revalidatePath("/concerts");
    const slug =
      typeof body.slug === "string" ? body.slug : body.slug?.current;
    if (type === "concert" && slug) revalidatePath(`/concerts/${slug}`);
    return NextResponse.json({ ok: true, revalidated: type, slug: slug ?? null });
  }

  return NextResponse.json({ ok: true, ignored: type ?? null });
}
