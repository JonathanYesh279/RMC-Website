# RMC Website — UX Strategy & User Flows

Status: preparation document for the Claude Design phase.
Branch: `feature/claude-design-prep`. This document defines *what the experience
must do*; the visual design itself will be produced separately by Claude Design
(see `claude-design-brief.md`) and implemented only after user review.

Grounding: everything here is derived from the existing repository —
`app/page.tsx` (homepage), `app/conservatory/` (page + `conservatory-data.ts`),
`app/concerts/`, `app/rentals/`, `sanity/queries.ts` — and from the UX-flow
exploration on the reference branch `feature/conservatory-guided-prototype`
(flow logic in `lib/prototype/journey.ts` and `lib/prototype/recommend.ts` on
that branch). No institutional facts are invented here; where a claim appears
(e.g., "over 1,300 students") it is existing site copy.

---

## 1. Site-level model

Raanana Music Center (מרכז פיס למוסיקה רעננה) serves three distinct visitor
worlds:

1. **Conservatory and music studies** — parents, students, adult learners
2. **Concerts and performances** — audiences buying tickets or planning an evening
3. **Venue, studio, equipment, and production rentals** — producers, event
   planners, musicians who need rooms or recording

The existing homepage (`app/page.tsx`) already presents these three worlds as
portals, which is directionally correct and must be preserved as the top-level
mental model. Category names must stay explicit (no poetic-only labels); each
world may carry a short emotional action phrase:

| World | Action phrase (Hebrew) |
|---|---|
| Conservatory & music studies | ללמוד ולצמוח (learn and grow) |
| Concerts & performances | לצפות ולהקשיב (watch and listen) |
| Venue & studio rentals | ליצור ולהפיק (create and produce) |

The homepage's only job is to make the three-world choice legible within five
seconds and make entering a world feel like *entering a place*, not opening a
page.

## 2. Core principle

Move from:

> "Here is all our information."

to:

> "Tell us what you need, and we will guide you to the right next step."

The current problem is not the homepage — it is what happens *after* a world is
chosen. `/conservatory` currently renders one large client component
(`app/conservatory/ConservatoryContent.tsx`, ~1,100 lines) with **seven
internal tabs** (`departments`, `ensembles`, `groups`, `programs`, `forms`,
`leadership`, `enrichment`). This forces visitors to understand the
organization's internal structure before finding what is relevant to them.

Design consequences that apply to every world:

- Guidance-first, navigation-second. The full catalog stays reachable, but it
  is never the front door.
- One primary call to action per screen. Competing CTAs are a defect.
- Every recommendation or guided outcome must explain *why* it was shown and
  must be reversible (edit answers, go back).
- Journey state must be shareable and refresh-safe (URL parameters, not only
  local storage) — validated on the reference branch.
- Never make hover the only carrier of meaning; everything must work on touch
  and keyboard, in Hebrew RTL, with reduced-motion support.

## 3. Conservatory flow

### Three user types, three doors

The conservatory gateway replaces the seven-tab landing with one question and
three routes:

1. **New visitor / parent / student looking for a path** → guided discovery
2. **Current student or parent needing practical information** → utility hub
3. **Visitor who wants to browse everything manually** → browse-all view

No one is ever forced through the guided flow; the browse route keeps the full
information architecture available.

### Guided discovery — the question sequence

Four questions maximum, each one only when it can change the outcome
(validated flow logic exists on the reference branch, `lib/prototype/journey.ts`):

1. **Who is this for?** — child 5–7, child 8–12, teen 13–18, adult, not sure
   yet, *or* "already a student/parent at the center" (this last option exits
   immediately to the utility hub — zero wasted questions).
2. **What are they looking for?** — first introduction to music, individual
   instrument lessons, singing and voice, playing/singing together (ensemble,
   band, choir, orchestra), advanced/excellence program, music matriculation
   (בגרות) or professional preparation, not sure yet.
3. **Which musical direction interests them?** — asked only when the goal is
   individual lessons. Broad instrument families, never internal department
   jargon: piano & keyboards / violin, cello & strings / flute, clarinet, sax &
   woodwinds / trumpet, trombone & brass / guitar & bass / drums & percussion /
   "help me choose".
4. **What is their experience level?** — none, beginner (<2 years), several
   years, advanced, not sure. Skipped when it has no effect (e.g., "first
   introduction" implies none).

Interaction requirements: not a chatbot, not a long form. One focused visual
question per screen, large selectable answers, contextual imagery, visible
progress, and back/edit controls at every step. Answers are editable from the
result screen and the recommendation updates accordingly.

### The recommendation result

Honest framing — never "we found your perfect match", but "here is a strong
place to begin based on what you told us." The result screen must answer the
questions a parent actually has, in this order:

1. Is this suitable for the age? (age fit stated explicitly)
2. Is previous experience required? (including audition/interview warnings)
3. What does the learning include?
4. Who teaches / leads it?
5. What happens next? — one primary action (begin registration or request an
   introductory conversation) plus one quiet secondary
6. One or two alternative paths, each with a one-line reason
7. Edit answers / restart / browse everything

Recommendations come from a small deterministic rules layer (age range, goal,
instrument family, experience level, audition flag) mapped onto content that
already exists in `app/conservatory/conservatory-data.ts` — departments,
ensembles, special programs. No LLM in the decision path.

### Required scenarios (acceptance criteria)

| # | Visitor | Expected outcome |
|---|---|---|
| A | Parent, beginner piano for an 8-year-old | Piano department recommended, age-appropriate explanation, no-experience reassurance, registration/conversation CTA |
| B | 16-year-old experienced musician, advanced path | Excellence programs surface (תלמים, מחלקת מחוננים, מגמות) — never beginner department content |
| C | Adult with previous experience, wants to play with others | Adult ensembles (הרכבי מבוגרים) prioritized; alternatives must also be adult-appropriate (boundary lesson from the reference branch: age-18 overlap leaked youth jazz/rock ensembles into adult results until the adult band was made 19+) |
| D | Current parent needs a form or update | Reaches the utility hub without answering any discovery questions |

### Current-student utility hub

Task-first, plain, fast — "What do you need today?": forms and registration
documents (real Sanity `formDocument` content via `FORMS_QUERY` in
`sanity/queries.ts`), information and updates (`/updates`), ensembles and
rehearsal schedules, special programs, contacts, concert calendar, and a
placeholder for a future student system. This screen is deliberately
functional, not cinematic.

### Browse-all view

The full catalog regrouped by visitor intent instead of the seven internal
tabs:

- **Learn** — instrument departments, singing, music theory, beginner pathways
- **Perform together** — orchestras, choirs, ensembles, bands (including adults)
- **Develop further** — excellence and gifted programs, matriculation
  preparation, competitions and festivals (e.g., קשת ערן)
- **Student resources** — forms, updates, leadership and contacts, enrichment
  articles

Nothing is hidden for minimalism's sake; use progressive disclosure, search or
filtering where the lists get long. Deep links into existing content anchors
(`/conservatory#departments` etc.) remain valid.

## 4. Concerts flow

Current state: `/concerts` lists upcoming events (Sanity-backed, with a
deliberate `dateTime(date) >= now()` filter — past concerts are hidden by
design) and `/concerts/[slug]` renders event detail with program, pricing and
ticketing fields.

Target experience:

- **Lead with the nearest or most important event**, full-bleed and emotional —
  a poster moment, not a table row. The rest of the season follows.
- **Filter by what audiences actually ask**: audience (family/kids vs. general),
  date range, genre (classical, jazz, children's), family-friendly, price.
  Filters refine — they are never a prerequisite to seeing anything.
- **Reduce friction to ticket purchase**: persistent, single primary "tickets"
  action on every event surface; price and availability visible before the
  click; purchase path never more than one step away.
- **Keep discovery visual and emotional** — event imagery, date and venue
  legible at a glance; a calendar/list toggle may exist but the default view
  sells the experience of attending.
- Student/conservatory performances cross-link to the conservatory world
  ("hear the students you're enrolling with").

## 5. Rentals flow

Current state: `/rentals` presents halls and studio descriptions
(`rentals-data.ts`) and `/rentals/availability` already implements an
availability-request flow with an inquiry API (`app/api/rentals/inquiry`).

Target experience:

- **Open by asking what the visitor is planning** — a concert or show, a
  rehearsal, a recording, a private/community event, equipment or production
  services, "not sure yet".
- **Match them to a path**: the answer routes to the fitting venue
  (auditorium / chamber hall / recording studio), service, or booking flow —
  instead of forcing a manual comparison of all venues.
- **Each venue/service answer shows**: capacity, typical use cases, included
  equipment and technical specs, an availability-request action (reusing the
  existing `/rentals/availability` flow), and a direct contact action.
- A compact comparison remains available for visitors who want it, but it is
  the secondary path, not the entry.

## 6. Cross-cutting requirements

- Hebrew RTL first (`<html lang="he" dir="rtl">` in `app/layout.tsx`); all
  flows must read naturally in Hebrew.
- Mobile-first; complete on mobile, not simplified.
- Full keyboard support, visible focus states, semantic headings, accessible
  labels, touch-friendly targets, reasonable contrast.
- `prefers-reduced-motion` respected everywhere.
- State survives refresh; journeys are shareable URLs.
- Success test: three worlds understood in ≤5 seconds; a new conservatory
  visitor reaches a meaningful recommendation in 3–4 decisions; a current
  parent reaches practical resources almost immediately.
