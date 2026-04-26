"use client";

import { useEffect } from "react";
import { set, useFormValue, type SlugInputProps } from "sanity";
import { slugifyHebrew } from "../../lib/slugifyHebrew";

// Headless slug input: derives slug.current from the document's title on
// first save and never overwrites it afterward, so URLs stay stable even
// if a concert is renamed mid-season. Combined with a `hidden` predicate
// on the field, editors never see the slug at all.
export function AutoSlugInput(props: SlugInputProps) {
  const { value, onChange } = props;
  const title = useFormValue(["title"]) as string | undefined;
  const current = value?.current;

  useEffect(() => {
    if (current) return;
    if (!title) return;
    const next = slugifyHebrew(title);
    if (!next) return;
    onChange(set({ _type: "slug", current: next }));
  }, [title, current, onChange]);

  return null;
}
