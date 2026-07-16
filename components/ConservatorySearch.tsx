"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type SearchItemType =
  | "dept"
  | "ens"
  | "grp"
  | "prog"
  | "form"
  | "staff"
  | "art";

export type SearchAction =
  | { kind: "tab"; tab: number }
  | { kind: "dept"; deptKey: string }
  | { kind: "prog"; index: number }
  | { kind: "url"; url: string };

export type SearchItem = {
  type: SearchItemType;
  name: string;
  meta: string;
  keywords?: string;
  action: SearchAction;
};

type IconName = "grid" | "note" | "person" | "doc" | "spark" | "chev" | "search" | "x";

const GROUPS: { key: SearchItemType; label: string; icon: IconName }[] = [
  { key: "dept", label: "מחלקות", icon: "grid" },
  { key: "ens", label: "תזמורות ומקהלות", icon: "note" },
  { key: "grp", label: "הרכבים", icon: "note" },
  { key: "prog", label: "תוכניות ייחודיות", icon: "spark" },
  { key: "form", label: "טפסים", icon: "doc" },
  { key: "staff", label: "מורים וסגל", icon: "person" },
  { key: "art", label: "כתבות ומדריכים", icon: "doc" },
];

const PROMPTS = [
  "מה תרצו למצוא? נסו ״פסנתר״, ״תזמורת הנוער״ או ״טופס הרשמה״…",
  "לאיזה כלי נרשמים השנה? חפשו מחלקה, מורה או הרכב…",
  "מחפשים מסמך? הקלידו ״טופס״ לכל הטפסים והאישורים…",
  "רוצים לנגן ביחד? חפשו ״הרכב״ או ״תזמורת״…",
];

const POPULAR = [
  "פסנתר",
  "כינור",
  "תזמורת הנוער",
  "טופס הרשמה",
  "גיטרה חשמלית",
  "מקהלה",
];

const INTENTS = [
  { label: "הרשמה לשנה״ל", q: "טופס הרשמה" },
  { label: "הרכבים ואודישנים", q: "הרכב" },
  { label: "מחלקות הנגינה", q: "מחלקה" },
];

// Geresh/gershayim/quote/dash variants collapse so ג'אז matches ג׳אז etc.
const STRIP_RE = /[׳״'"`׳״‘’“”־–—-]/g;
const STRIP_ONE = /[׳״'"`׳״‘’“”־–—-]/;
const norm = (s: string) => s.replace(STRIP_RE, "").toLowerCase();

// Map a normalized-space match back onto the raw string so the <mark> keeps
// the original punctuation inside the highlighted slice.
function highlightSegments(
  name: string,
  q: string,
): [string, string, string] | null {
  const qn = norm(q);
  if (!qn) return null;
  const idx = norm(name).indexOf(qn);
  if (idx < 0) return null;
  let n = 0;
  let start = -1;
  let end = -1;
  for (let raw = 0; raw < name.length; raw++) {
    if (STRIP_ONE.test(name[raw])) continue;
    if (n === idx) start = raw;
    n++;
    if (n === idx + qn.length) {
      end = raw + 1;
      break;
    }
  }
  if (start < 0 || end < 0) return null;
  return [name.slice(0, start), name.slice(start, end), name.slice(end)];
}

function Icon({ name }: { name: IconName }) {
  switch (name) {
    case "grid":
      return (
        <svg className="ic" viewBox="0 0 18 18" aria-hidden="true">
          <rect x="2.5" y="2.5" width="5.4" height="5.4" rx="1.2" />
          <rect x="10.1" y="2.5" width="5.4" height="5.4" rx="1.2" />
          <rect x="2.5" y="10.1" width="5.4" height="5.4" rx="1.2" />
          <rect x="10.1" y="10.1" width="5.4" height="5.4" rx="1.2" />
        </svg>
      );
    case "note":
      return (
        <svg className="ic" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="5.4" cy="13.6" r="2.3" />
          <circle cx="13.4" cy="11.8" r="2.3" />
          <path d="M7.7 13.6V4.4l8-1.9v9.3" />
        </svg>
      );
    case "person":
      return (
        <svg className="ic" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="5.8" r="3" />
          <path d="M3.2 15.4c.7-3 3-4.4 5.8-4.4s5.1 1.4 5.8 4.4" />
        </svg>
      );
    case "doc":
      return (
        <svg className="ic" viewBox="0 0 18 18" aria-hidden="true">
          <rect x="3.8" y="2.2" width="10.4" height="13.6" rx="1.6" />
          <path d="M6.8 6.5h4.4M6.8 9.5h4.4M6.8 12.5h2.6" />
        </svg>
      );
    case "spark":
      return (
        <svg className="ic" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M9 2.2 10.8 7.2 15.8 9 10.8 10.8 9 15.8 7.2 10.8 2.2 9 7.2 7.2Z" />
        </svg>
      );
    case "chev":
      return (
        <svg className="ic" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M9 3 4 7l5 4" />
        </svg>
      );
    case "search":
      return (
        <svg className="ic" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="8.2" cy="8.2" r="5.2" />
          <path d="m12.2 12.2 3.6 3.6" />
        </svg>
      );
    case "x":
      return (
        <svg className="ic" viewBox="0 0 14 14" aria-hidden="true">
          <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
        </svg>
      );
  }
}

type GroupResult = { group: (typeof GROUPS)[number]; items: SearchItem[] };

export default function ConservatorySearch({
  items,
  condensed,
  onSelect,
}: {
  items: SearchItem[];
  condensed: boolean;
  onSelect: (item: SearchItem) => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [act, setAct] = useState(-1);
  const [interacted, setInteracted] = useState(false);
  const [promptIdx, setPromptIdx] = useState(0);
  const [promptOut, setPromptOut] = useState(false);
  const [ddMax, setDdMax] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const ddRef = useRef<HTMLDivElement>(null);
  const blurTimer = useRef<number | undefined>(undefined);
  const listboxId = useId();

  const q = query.trim();

  const results = useMemo<GroupResult[]>(() => {
    const qn = norm(q);
    if (!qn) return [];
    const scored = items
      .map((it) => {
        const nn = norm(it.name);
        let s = 0;
        if (nn.startsWith(qn)) s = 4;
        else if (nn.includes(qn)) s = 3;
        else if (norm(it.meta).includes(qn)) s = 2;
        else if (it.keywords && norm(it.keywords).includes(qn)) s = 1;
        return { it, s };
      })
      .filter((x) => x.s > 0);
    const byGroup = GROUPS.map((g) => {
      const gi = scored
        .filter((x) => x.it.type === g.key)
        .sort((a, b) => b.s - a.s)
        .slice(0, 3);
      return { g, items: gi, best: gi.length ? gi[0].s : 0 };
    })
      .filter((x) => x.items.length)
      .sort((a, b) => b.best - a.best);
    const out: GroupResult[] = [];
    let total = 0;
    for (const grp of byGroup) {
      if (total >= 9) break;
      const take = grp.items.slice(0, Math.min(3, 9 - total)).map((x) => x.it);
      out.push({ group: grp.g, items: take });
      total += take.length;
    }
    return out;
  }, [items, q]);

  const flat = useMemo(() => results.flatMap((r) => r.items), [results]);
  // Footer row ("search the whole site") is the extra keyboard stop.
  const rowCount = flat.length ? flat.length + 1 : 0;

  useEffect(() => {
    setAct(-1);
  }, [q]);

  // Rotating guidance prompt — paused while the input has a value.
  useEffect(() => {
    if (q) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setPromptOut(true);
      window.setTimeout(() => {
        setPromptIdx((i) => (i + 1) % PROMPTS.length);
        setPromptOut(false);
      }, 420);
    }, 3600);
    return () => window.clearInterval(id);
  }, [q]);

  // "/" focuses the search from anywhere on the page.
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => () => window.clearTimeout(blurTimer.current), []);

  // Keep the dropdown inside the viewport — below the hero it opens with
  // little room, so cap its height to the space that's actually visible.
  useEffect(() => {
    if (!open) return;
    const el = ddRef.current;
    if (!el) return;
    setDdMax(
      Math.max(200, window.innerHeight - el.getBoundingClientRect().top - 16),
    );
  }, [open, q]);

  const select = (item: SearchItem) => {
    setQuery(item.name);
    setOpen(false);
    setAct(-1);
    inputRef.current?.blur();
    onSelect(item);
  };

  const selectRow = (idx: number) => {
    if (!flat.length) return;
    // Footer (idx === flat.length) falls back to the best match for v1.
    select(idx >= 0 && idx < flat.length ? flat[idx] : flat[0]);
  };

  const fillQuery = (value: string) => {
    setQuery(value);
    setOpen(true);
    setInteracted(true);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      setAct(-1);
      inputRef.current?.blur();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setAct((a) => Math.min(a + 1, rowCount - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAct((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (act >= 0) selectRow(act);
      else if (flat.length) select(flat[0]);
    }
  };

  const renderName = (name: string): ReactNode => {
    const seg = highlightSegments(name, q);
    if (!seg) return name;
    return (
      <>
        {seg[0]}
        <mark>{seg[1]}</mark>
        {seg[2]}
      </>
    );
  };

  const chipList = (chips: string[]) => (
    <div className="gs-chips">
      {chips.map((p) => (
        <button
          key={p}
          type="button"
          className="gs-chip"
          onMouseDown={(e) => {
            e.preventDefault();
            fillQuery(p);
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );

  let rowIdx = -1;

  return (
    <div className={`guide-band${condensed ? " condensed" : ""}`}>
      <div className="container gb-in">
        <div className="gb-label">
          <div className="gb-ey">מדריך מהיר</div>
          <div className="gb-tt">נכוון אתכם למקום הנכון</div>
        </div>

        <div className={`gsearch${open ? " open" : ""}${q ? " has-q" : ""}`}>
          <div className={`gs-bar${interacted ? "" : " gs-pulse"}`}>
            <span className="gs-sic">
              <Icon name="search" />
            </span>
            {!q && (
              <span className={`gs-ph${promptOut ? " out" : ""}`} aria-hidden="true">
                {PROMPTS[promptIdx]}
              </span>
            )}
            <input
              ref={inputRef}
              type="text"
              value={query}
              role="combobox"
              aria-expanded={open}
              aria-controls={listboxId}
              aria-activedescendant={
                act >= 0 ? `${listboxId}-opt-${act}` : undefined
              }
              aria-autocomplete="list"
              aria-label="חיפוש בקונסרבטוריון"
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => {
                window.clearTimeout(blurTimer.current);
                setInteracted(true);
                setOpen(true);
              }}
              onBlur={() => {
                blurTimer.current = window.setTimeout(() => {
                  setOpen(false);
                  setAct(-1);
                }, 120);
              }}
              onKeyDown={onKeyDown}
            />
            {q ? (
              <button
                type="button"
                className="gs-clr"
                aria-label="ניקוי"
                onMouseDown={(e) => {
                  e.preventDefault();
                  fillQuery("");
                }}
              >
                <Icon name="x" />
              </button>
            ) : (
              <span className="gs-kbd" aria-hidden="true">
                /
              </span>
            )}
            <button
              type="button"
              className="gs-sub"
              aria-label="חיפוש"
              onMouseDown={(e) => {
                e.preventDefault();
                if (act >= 0) selectRow(act);
                else if (flat.length) select(flat[0]);
                else inputRef.current?.focus();
              }}
            >
              <Icon name="chev" />
            </button>
          </div>

          <div
            className="gs-dd"
            role="listbox"
            id={listboxId}
            ref={ddRef}
            style={ddMax ? { maxHeight: `${Math.min(ddMax, 520)}px` } : undefined}
          >
            {!q ? (
              <>
                <div className="gs-glab">חיפושים נפוצים</div>
                {chipList(POPULAR)}
              </>
            ) : !results.length ? (
              <>
                <div className="gs-none">
                  לא נמצאו תוצאות עבור «{q}» — נסו שם כלי, מורה או טופס.
                </div>
                {chipList(POPULAR.slice(0, 4))}
              </>
            ) : (
              <>
                {results.map(({ group, items: groupItems }) => (
                  <div key={group.key}>
                    <div className="gs-glab">{group.label}</div>
                    {groupItems.map((item) => {
                      rowIdx++;
                      const idx = rowIdx;
                      return (
                        <div
                          key={`${item.type}-${item.name}`}
                          id={`${listboxId}-opt-${idx}`}
                          role="option"
                          aria-selected={act === idx}
                          className={`gs-row${act === idx ? " act" : ""}`}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            select(item);
                          }}
                          onMouseMove={() => setAct(idx)}
                        >
                          <span className="gs-tic">
                            <Icon name={group.icon} />
                          </span>
                          <span className="gs-tx">
                            <span className="gs-nm">{renderName(item.name)}</span>
                            <span className="gs-mt">{item.meta}</span>
                          </span>
                          <span className="gs-go">
                            <Icon name="chev" />
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div
                  id={`${listboxId}-opt-${flat.length}`}
                  role="option"
                  aria-selected={act === flat.length}
                  className={`gs-foot${act === flat.length ? " act" : ""}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectRow(flat.length);
                  }}
                  onMouseMove={() => setAct(flat.length)}
                >
                  <Icon name="search" />
                  <span>חיפוש «{q}» בכל האתר</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="gchips">
          {INTENTS.map((c) => (
            <button
              key={c.label}
              type="button"
              className="ichip"
              onMouseDown={(e) => {
                e.preventDefault();
                fillQuery(c.q);
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
