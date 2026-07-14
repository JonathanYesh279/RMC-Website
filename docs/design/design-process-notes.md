# Design Process Notes — what happened, and the corrected workflow

## Previous process (July 2026) — what actually happened

A local development agent was asked to explore a guidance-first conservatory
experience. It built a complete high-fidelity prototype directly in the
codebase on branch `feature/conservatory-guided-prototype`: six `/prototype`
routes, ten components, a deterministic recommendation engine, and a ~1,400
line custom stylesheet implementing a full "Living Stage" visual direction.

What was good about it:

- It was **safely isolated** — `main` was never touched, styles could not
  leak into production, and the branch remains intact as a reference.
- The **UX flow ideas were validated in a real browser**: the three-door
  gateway, the four-question guided flow with URL-param state and adaptive
  skipping, the early exit for current students, the honest recommendation
  framing with a single primary CTA, and the intent-based browse-all
  grouping. All four canonical scenarios passed.

What was wrong about it:

- It **mixed UX exploration with visual design implementation**. The visual
  direction (typography scale, color registers, layout language, motion) was
  decided unilaterally by a development agent and hard-coded, instead of
  being explored as *design work* that the user could review, compare, and
  select from before any code existed.
- That made the visual direction expensive to change and easy to mistake for
  a decision that had actually been made.

## Corrected process — five steps

1. **Local agent prepares UX strategy and a design brief** (this branch,
   `feature/claude-design-prep`): documentation only — `user-flows.md`,
   `claude-design-brief.md`, `implementation-handoff.md`, this file. No UI
   code, no CSS, no dependencies.
2. **Claude Design creates the visual design** from the prompt in
   `claude-design-brief.md` — high-fidelity screens, tokens, typography,
   motion and handoff notes. Iteration happens there, where it is cheap.
3. **The user reviews and selects a direction.** Nothing is implemented
   until this happens.
4. **A local development agent implements the chosen design** on a fresh
   isolated branch, following `implementation-handoff.md`: prototype routes
   first, scoped styling, deterministic logic, existing data reused
   read-only.
5. **Only after explicit approval are production routes updated** — as a
   separate, deliberate task with its own safety gates.

Roles in one line each: this branch = *what and why*; Claude Design = *how it
looks*; the future dev branch = *how it's built*; the user = *the gate
between every stage*.

## Status of the previous prototype branch

`feature/conservatory-guided-prototype` is **kept, untouched, unmerged** — a
UX-flow and logic reference (`lib/prototype/journey.ts`,
`lib/prototype/recommend.ts` are worth porting). It is **not** the visual
source of truth, and it must not be deleted, rewritten, merged, or deployed.
If the user later wants it archived or removed, that is a separate task.
Screenshots from its verification (`proto-*.png`, untracked in the repo
root) show the flow and may accompany the brief only with the caveat that
they do not represent the intended visual direction.

## Do not repeat the previous mistake

- **Do not implement final visual design before Claude Design output
  exists.** If there is no user-provided design output, the implementation
  task has not started.
- **Do not create a large CSS design system locally in this preparation
  task.** This branch is documentation-only, by definition.
- **Do not treat the previous prototype as the final visual direction.** Its
  value is flow logic and validated interaction requirements — nothing
  visual.
- **Do not merge or deploy anything.** Not this branch, not the prototype
  branch, not anything derived from them, until the user explicitly says so.
