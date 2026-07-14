# Claude Design Brief — RMC "Living Stage" Redesign

This file IS the deliverable: a complete, ready-to-send prompt for
**Claude Design**. Everything between the start/end markers below can be
copy-pasted into Claude Design as-is. It asks for visual design work only —
no production code. Implementation happens later, in this repository, by a
development agent following `docs/design/implementation-handoff.md`.

---

## ▶ PROMPT START — copy from here

You are designing the visual experience for the redesigned website of the
**Raanana Music Center (מרכז פיס למוסיקה רעננה)** — Israel's largest
conservatory (the existing site states over 1,300 students), which is also an
active concert venue and a rentable production facility. Your output is a
high-fidelity **visual design**, not production code. A development team will
implement your design later inside an existing Next.js codebase, so every
screen you produce must be realistically buildable and must come with design
tokens and handoff notes.

### 1. What already exists (design within this reality)

The current production website is live and will keep running while you work.
Relevant facts about it:

- **Language and direction: Hebrew, RTL.** Every layout you design must be
  right-to-left first. Body copy, navigation, and UI labels are Hebrew.
- **Stack (context only):** Next.js 16 + React 19 + Tailwind CSS v4 +
  TypeScript, with content managed in Sanity. Design tokens are CSS custom
  properties.
- **Homepage** already presents the three worlds of the center as portals:
  Conservatory / Concerts / Rentals. The three-world idea is correct — keep it.
- **Conservatory page** is one long page with seven internal tabs
  (departments, orchestras & choirs, ensembles, special programs, forms,
  leadership, enrichment articles). This is the core problem to redesign.
- **Concerts** — a season list plus per-event detail pages with program,
  pricing, and ticket links. Past events are automatically hidden.
- **Rentals** — halls (auditorium, chamber hall) and a recording studio, with
  an existing availability-request flow.
- **Existing brand accents** (keep these as the family, refine as needed):
  teal `#3cbabd`, coral `#e83c4e`, amber `#fcbc40`, on a warm neutral
  foundation — ivory `#faf7f2` page background, `#f3ede1` warmer surface,
  hairlines `#e6e1d8`, and an ink scale `#1a1a1a → #3a3a3a → #6b6b6b →
  #9a9a9a`. Buttons are currently pill-shaped. Elevation is a soft three-step
  shadow scale.
- **Typography today:** the Hebrew sans **Assistant** (Google Fonts) is the
  only family, used for everything. You may — and are encouraged to —
  recommend pairing it with a more expressive, legally usable Hebrew display
  webfont (with a safe fallback), or make a deliberate case for staying
  single-family.
- **Real content that exists and must be designed for** (do not invent new
  institutional facts): ~10 teaching departments (piano, strings, woodwinds,
  brass, guitar, drums & percussion, voice, conducting, theory, R&D); five
  representative large ensembles (symphonic orchestra, youth orchestra, string
  orchestra, city choir, jazz/wind chamber groups); smaller groups including
  rock bands, jazz combos, a vocal ensemble, beginner ensemble workshops, and
  **adult ensembles (18+)**; seven special programs (an international
  violin/cello competition-festival, gifted and excellence tracks, two school
  music-major partnerships, a music-production course, a children's concert
  series); registration forms; leadership/staff; parent-facing enrichment
  articles. Teacher and staff entries have names, roles, short bios and
  photos.
- **Media reality:** current imagery is stock placeholders. Design the media
  system assuming real RMC photography and short-form cinematic video of the
  actual building, halls, rehearsal rooms, teachers and students will be
  collected later — specify what should be shot, but design gracefully for
  the placeholder period too.

### 2. The product problem you are designing for

The homepage's three-world choice works. The failure begins after a visitor
chooses a world: the site turns into a conventional information website —
tabs, cards, menus, long content sections — that requires users to understand
the organization's internal structure.

The redesign must flip the model from **navigation-first** to
**guidance-first**:

> Not "here is all our information" — but "tell us what you need, and we'll
> take you to the right next step."

The full information architecture must remain reachable for people who prefer
to browse; guidance is the front door, never a cage.

### 3. Screens to design (deliverables)

Design high-fidelity desktop **and** mobile states for each of the following.
The conservatory journey is the priority; concerts and rentals may be
directional.

1. **Homepage — the three worlds.** A cinematic, full-viewport entry that
   makes Conservatory / Concerts / Rentals legible within five seconds.
   Explicit category names (Hebrew), each with a short action phrase —
   ללמוד ולצמוח / לצפות ולהקשיב / ליצור ולהפיק. Hovering or focusing a world
   may shift the atmosphere; selecting one should feel like *entering that
   world*. Hover must never be the only carrier of meaning (touch and
   keyboard parity), and design the calm default state as carefully as the
   active one.
2. **Conservatory gateway.** Replaces the seven tabs. Opens with the question
   "בואו נמצא את המסלול המוסיקלי שמתאים לכם" (let's find the musical path
   that fits you) and presents three doors: (a) find me a path — the guided
   flow, the visual primary; (b) I'm already a student/parent here; (c)
   browse all departments and programs.
3. **Guided discovery flow.** Conversational in spirit but explicitly **not a
   chat interface and not a form**. One focused question per screen, large
   selectable answers, contextual imagery, visible progress, back/edit at
   every step. The four questions: who is this for (child 5–7 / child 8–12 /
   teen / adult / not sure / already-a-student exit) → what are they looking
   for (first introduction / instrument lessons / voice / play together /
   excellence / matriculation / not sure) → which instrument family (only for
   lessons; broad families, never internal jargon; includes "help me choose")
   → experience level (skipped when meaningless).
4. **Recommendation result.** Honest framing: "here is a strong place to
   begin based on what you told us" — never a claimed perfect match. Must
   present, in a parent's priority order: age fit, whether experience is
   required (and audition/interview warnings), what the learning includes,
   who teaches it (real staff cards exist), where it can lead, ONE primary
   action (begin registration / request an introductory conversation), a
   quiet secondary, one or two alternative paths each with a one-line reason,
   and visible edit-your-answers affordance. Design the disclosure so the
   screen never dumps everything at once.
5. **Current-student utility hub.** "מה אתם צריכים היום?" (what do you need
   today?) — a fast, plain, task-first screen: forms and registration
   documents, updates, ensembles and rehearsal info, special programs,
   contacts, concert calendar, and a "coming soon" student-system tile. This
   screen is deliberately functional rather than cinematic — design what
   restraint looks like in this design language.
6. **Browse-all conservatory screen.** The complete catalog regrouped by
   visitor intent — Learn / Perform together / Develop further / Student
   resources — with search or filtering where lists are long. Nothing hidden
   for minimalism's sake.
7. **Optional, directional:** the concerts world (lead with the nearest big
   event as a poster moment; filters by audience, date, genre,
   family-friendly, price; frictionless path to tickets) and the rentals
   world (open by asking what the visitor is planning; route to the fitting
   hall/studio/service showing capacity, use cases, equipment, availability
   request, contact).

### 4. Design concept: "Living Stage"

The site should feel like stepping into an active cultural and musical
institution — you are allowed and encouraged to reinterpret this concept
visually, but it should evoke:

- stage light and performance energy
- rehearsal rooms, instruments in use, music stands and scores
- teachers and students — real, warm, human
- cultural seriousness without stiffness; modern but not sterile
- warm human details over corporate polish

Visual language directions to explore: large editorial Hebrew typography;
stage-light-inspired contrast (consider how the identity behaves in a dark,
lit "stage" register versus the warm ivory "daylight" reading register);
layered media and strong image cropping; clear hierarchy; intentional
asymmetry; restrained use of the teal/coral/amber accents against calm
neutral surfaces.

### 5. What to avoid — hard constraints

This must NOT look like a generic AI-generated website, a SaaS landing page,
a municipal portal, or a dashboard. Explicitly banned:

- random decorative gradient blobs
- excessive glassmorphism
- neon purple/blue SaaS palettes
- generic bento grids
- floating abstract 3D objects
- template-like hero sections (oversized empty copy, no useful action)
- pills around every label
- walls of identical bordered cards
- dashboard-like UI for public-facing screens
- municipal-government-website energy

If a layout could be swapped onto any startup's site by changing the logo, it
is wrong. The result must be culturally specific to a real Israeli music
center.

### 6. Motion direction

Motion supports orientation and storytelling: smooth scene transitions, a
destination transition that carries the chosen homepage world into its next
screen, masked image/text reveals, subtle depth, progressive disclosure of
the recommendation. Avoid: constant floating elements, heavy parallax, scroll
hijacking, long unskippable intros, motion that delays content or breaks
keyboard navigation. Everything needs a `prefers-reduced-motion` behavior and
must stay performant on average mobile devices. Deliver motion notes per
screen (what moves, when, roughly how long, and what reduced-motion shows).

### 7. Accessibility requirements (design-level)

Hebrew RTL throughout; mobile-first responsive thinking; visible focus
states designed (not defaulted); semantic heading structure implied by the
layouts; touch targets comfortably large; no hover-only information;
contrast that passes WCAG AA on both the dark "stage" and light "ivory"
registers; back navigation and answer-editing visible at every journey step.

### 8. Required deliverables checklist

- High-fidelity visual direction (art direction rationale in a few sentences)
- All screens from section 3, desktop + mobile
- Interaction notes per screen (hover/focus/press states, transitions)
- Motion direction incl. reduced-motion behavior
- **Design tokens**: full color system (building on teal/coral/amber + warm
  neutrals + ink scale), type scale, spacing rhythm, radii, elevation —
  expressed so they can become CSS custom properties
- **Typography recommendation**: keep Assistant alone, or pair it with a
  specific legally usable Hebrew display webfont (name it, with fallback)
- **Media & video guidance**: what real RMC footage/photography to capture,
  aspect ratios, cropping behavior, and how layouts behave with placeholder
  stills in the meantime
- Accessibility notes per screen
- **Developer handoff notes**: component boundaries you envision (e.g.,
  world portal, journey question, answer option, progress rail, result
  header, task tile), responsive breakpoint behavior, and anything the
  implementing team must not get wrong

### 9. Success criteria

- The three worlds are understood within five seconds.
- A new conservatory visitor reaches a meaningful recommendation in 3–4
  decisions, and every recommendation explains why it was shown.
- A current parent reaches practical resources almost immediately.
- No screen has competing primary CTAs.
- The design is unmistakably RMC — warm, cultural, alive — and could not be
  mistaken for a template.
- The mobile experience is complete, not an afterthought.

## ◀ PROMPT END — copy up to here

---

### Notes for the user (not part of the prompt)

- If Claude Design supports attachments, attach a few current-site
  screenshots (several exist untracked in the repo root, e.g.
  `homepage-1440.png`, `conservatory-full.png`) so it sees the current state
  and brand feel. `proto-*.png` screenshots from the reference branch show
  the UX *flow* — share them only with the caveat that they are not the
  visual direction.
- The prompt deliberately avoids naming teachers or programs beyond what the
  site already publishes; Claude Design should use placeholder names where it
  needs specifics.
- After you pick a direction, hand the chosen output plus
  `docs/design/implementation-handoff.md` to the development agent.
