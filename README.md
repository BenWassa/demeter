# Project Demeter

Project Demeter is an interactive planning atlas for designing a comfortable, resilient, semi-off-grid life in Canada — combining regional evidence, homestead systems, land-use blueprints, food/livestock planning, property archetypes, and phased pathways to self-sufficiency.

## Current state

Demeter V1 is a dependency-light progressive web experience with a static fallback and browser-tested interactive layer.

- [`PRODUCT.md`](PRODUCT.md) — durable product truth and seed planning scenario
- [`docs/PRD.md`](docs/PRD.md) — product requirements, information architecture, MVP and roadmap
- [`DESIGN.md`](DESIGN.md) — visual and responsive design contract
- [`docs/STATUS.md`](docs/STATUS.md) — build ledger and current release status
- [`docs/REGION_RESEARCH.md`](docs/REGION_RESEARCH.md) — dated regional evidence baseline
- [`docs/RESEARCH_PLAN.md`](docs/RESEARCH_PLAN.md) — evidence model and research backlog
- [`docs/IMPECCABLE_REVIEW.md`](docs/IMPECCABLE_REVIEW.md) — critique, design passes, hardening and audit record

## V1 experience

The current interface includes:

- cinematic Canadian field-atlas hero;
- personal Fit Lab with career-anchor and priority controls;
- evidence-backed comparison of Southwest Ontario, Fraser Valley and Vancouver Island;
- water, wastewater, power and heating dependency schematics;
- genuinely distinct 3-, 10-, and 20-acre land-use plans;
- toggleable food, livestock, infrastructure and privacy layers;
- food-production ladder from kitchen garden to smallholding;
- acquisition archetypes for fixer acreage, ready homestead and raw land;
- phased transition roadmap;
- dated evidence register and source links;
- responsive phone/tablet/desktop/short-landscape composition;
- keyboard tab navigation, reduced-motion and forced-colors handling;
- static fallback if the enhanced JavaScript experience fails.

## Development

Requires Node.js 22+ for the verification/test toolchain.

```bash
npm install
npm run verify
npm run build
npm test
```

`npm run serve` serves the repository at `http://127.0.0.1:4173` for browser testing.

The production site remains static and builds to `dist/`. GitHub Actions runs deterministic verification plus Playwright tests at desktop and Pixel-sized mobile viewports. The Pages workflow deploys `dist/` from `main`.

## Evidence policy

Demeter distinguishes three things in the interface and docs:

1. **Sourced facts** — dated observations from authoritative sources.
2. **Volatile signals** — schedules, listings, prices and policy states that require refresh dates.
3. **Planning judgments** — Demeter's explicit comparative interpretation, never presented as external fact.

Every actual property still requires parcel-level due diligence for legal access, zoning, water, wastewater, hazards, building condition and local rules.

## Working design thesis

**A modern Canadian field atlas:** documentary landscape photography, land-survey precision, agricultural field-guide clarity, and blueprints that carry real planning meaning.

## Next research depth

V1 answers the shape of the problem. Future work should deepen rather than widen it first:

1. repeatable property/listing samples for each candidate region;
2. frost/growing-season, water, wildfire and flood evidence at candidate-town level;
3. hospital, grocery, internet, tax and insurance comparisons;
4. validated municipal livestock/agricultural-use rules for shortlisted municipalities;
5. property-saving/export only after real purchase-search behavior justifies persistence.

## Image credit

Hero photography: Michael Hamments / Unsplash — farmland near Simcoe, Ontario.
