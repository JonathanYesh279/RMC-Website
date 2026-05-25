"use client";

import { useEffect, useRef, useState } from "react";

type TopicSelectProps = {
  id: string;
  name: string;
  options: string[];
  defaultValue?: string;
};

/**
 * Custom listbox that matches the dark form aesthetic — a native <select>
 * can't have its option panel styled, so this reproduces the design's
 * keyboard-accessible dropdown (Arrow keys / Enter / Space / Escape,
 * outside-click close) and mirrors the chosen value into a hidden input.
 */
export default function TopicSelect({
  id,
  name,
  options,
  defaultValue = options[0],
}: TopicSelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const [active, setActive] = useState(() =>
    Math.max(0, options.indexOf(defaultValue)),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [open]);

  // Keep the active option scrolled into view while navigating.
  useEffect(() => {
    if (open) optionRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const choose = (index: number) => {
    setSelected(options[index]);
    setActive(index);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div
      className={`ct-select${open ? " is-open" : ""}`}
      ref={rootRef}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        id={id}
        ref={triggerRef}
        className="ct-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="ct-select-value">{selected}</span>
        <svg
          className="caret"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 5l3 3 3-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <ul className="ct-select-list" role="listbox" tabIndex={-1} hidden={!open}>
        {options.map((opt, i) => (
          <li
            key={opt}
            ref={(el) => {
              optionRefs.current[i] = el;
            }}
            role="option"
            aria-selected={opt === selected}
            className={i === active ? "is-active" : undefined}
            onMouseEnter={() => setActive(i)}
            onClick={() => choose(i)}
          >
            {opt}
          </li>
        ))}
      </ul>
      <input type="hidden" name={name} value={selected} />
    </div>
  );
}
