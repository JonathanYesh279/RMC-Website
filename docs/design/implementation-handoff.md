# Implementation Handoff — for the development agent (post-Claude-Design)

Audience: the future development agent that will implement the visual design
in this repository. Read this together with `user-flows.md` (what the
experience must do) and the **user-selected Claude Design output** (how it
must look). Written to be self-sufficient — do not assume access to prior
conversations.

## Preconditions — do not start without them

1. **Do not implement until the user provides the chosen Claude Design
   output.** If you are reading this and no design output has been handed to
   you, your task is not ready — stop and ask the user for it. Do not design
   visuals yourself; that mistake was made once already (see
   `design-process-notes.md`).
2. **Treat the Claude Design output as the visual source of truth.** Where it
   conflicts with the older prototype branch
   (`feature/conservatory-guided-prototype`) or with current production
   styling, the Claude Design output wins. The prototype branch is a UX-flow
   reference only — reuse its *logic* ideas, never its look.

## Ground rules during implementation

3. **Preserve production routes** until a production rollout is explicitly
   approved by the user. Do not modify `/`, `/conservatory`, `/concerts`,
   `/rentals`, `/contact`, `/updates`, `/studio`. Never commit to, merge
   into, or push `main`. No deployments.
4. **Implement first as isolated prototype routes** (e.g., under
   `app/prototype/` or a similarly isolated segment) on a fresh feature
   branch cut from up-to-date `main`. Small, intentional commits.
5. **Keep styling isolated.** Load new stylesheets only from the isolated
   layout and prefix or scope every class so nothing can leak into
   production pages. Note the stack: Tailwind CSS v4 — design tokens belong
   in `@theme` in CSS (see `app/globals.css`); there is **no**
   `tailwind.config.ts` and one must not be created. Translate Claude
   Design's tokens into new `--color-*` / `--shadow-*` / spacing custom
   properties rather than raw hex sprinkled through markup. If the design
   introduces a new Hebrew display font, load it via `next/font` with the
   documented fallback.
6. **Use deterministic recommendation rules, not an LLM.** A working, tested
   rules engine exists on the reference branch
   (`lib/prototype/recommend.ts` + `lib/prototype/journey.ts` on
   `feature/conservatory-guided-prototype`): typed rules over age range /
   goal / instrument family / experience / audition flag, URL-param journey
   state, adaptive question skipping, and an "already a student" early exit.
   Porting that logic is encouraged; it already passes the four canonical
   scenarios (see `user-flows.md` §3). Known boundary lesson baked into it:
   adults match from age 19 so that youth frameworks capped at 18 don't leak
   into adult results.
7. **Reuse existing data safely.** Read-only imports from
   `app/conservatory/conservatory-data.ts` (departments, teachers,
   ensembles, programs, staff, articles) and read-only Sanity fetches via
   existing queries in `sanity/queries.ts` (e.g., `FORMS_QUERY` for the
   current-student hub). Degrade gracefully if a fetch fails. Keep the
   boundary between real CMS content and local placeholder data explicit.
8. **Do not modify Sanity schemas or production content** unless the user
   explicitly approves it as its own task. No destructive migrations, ever.

## Definition of done

9. **Validate production routes after implementation.** `git diff
   --name-status main...HEAD` must show only added files (or explicitly
   approved modifications); load `/` and `/conservatory` in a browser and
   confirm they render unchanged; confirm the build's route list still
   contains every production route.
10. **Run lint and build before completion** (`npm run lint`,
    `npm run build`). Zero new lint issues in your files (pre-existing
    issues in production files are known — leave them). Verify the four
    scenarios from `user-flows.md` in a real browser, plus: mobile width,
    keyboard-only navigation with visible focus, and
    `prefers-reduced-motion` emulation. Report results honestly, including
    anything skipped.

## Useful repository facts

- Hebrew RTL root layout: `app/layout.tsx` (`lang="he" dir="rtl"`,
  Assistant via `next/font/google`).
- Header is fixed and always solid off the homepage
  (`components/Header.tsx`); footer hides under `body.home-locked`
  (`app/globals.css`).
- Next.js 16: `searchParams` in server pages is a `Promise` — await it.
  Read `node_modules/next/dist/docs/` before writing code (repo rule in
  `AGENTS.md`).
- Concerts hide past dates by design (`dateTime(date) >= now()`); the
  center's street is רחוב עציון 48 (עציון, not the אצטיון misspelling that
  appears in some design files).
- Git safety pattern used previously and expected again: verify clean tree →
  create a backup tag on `main` → branch from `main` → push only the feature
  branch.
