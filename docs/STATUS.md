# Project Demeter — Build Status

**Working branch:** `agent/demeter-foundation`  
**PR:** #1  
**Last updated:** 2026-08-19  
**Release state:** V1 implementation complete; release gate green; PR ready for merge.

## Objective

Ship a coherent end-to-end V1 of Project Demeter: an interactive Canadian homestead field atlas that combines regional comparison, systems literacy, land-use blueprints, food/livestock planning, property archetypes, and a phased path toward a comfortable semi-off-grid life.

## Delivery status

| Workstream | Status | Result |
|---|---|---|
| Product definition | ✅ | `PRODUCT.md` is the durable product source of truth. |
| PRD / IA | ✅ | `docs/PRD.md` defines product scope, information architecture and roadmap. |
| Research model | ✅ | `docs/RESEARCH_PLAN.md` defines evidence classes and refresh rules. |
| Current regional evidence | ✅ | `docs/REGION_RESEARCH.md` + live evidence for SW Ontario, Fraser Valley and Vancouver Island, refreshed 2026-08-19. |
| Visual system | ✅ | Canadian field-atlas world implemented: documentary landscape + survey precision + field-guide clarity. |
| Personal Fit Lab | ✅ | Career anchor + five weighted priorities produce transparent three-region ranking. |
| Region explorer | ✅ | Climate/access/market evidence, fit score, capability bars, watch items and source links. |
| Systems explorer | ✅ | Water, wastewater, power and heat dependency schematics with burden, consequence and professional boundary. |
| Blueprint Lab | ✅ | Distinct authored 3-, 10- and 20-acre plans with toggleable food/livestock/infrastructure/privacy layers. |
| Food & livestock | ✅ | Three production levels expose land allocation, workload, livestock fit and friction. |
| Property archetypes | ✅ | Fixer acreage, ready homestead and raw-land/build routes compared. |
| Roadmap | ✅ | Remote-work optionality → regional testing → acquisition → resilience → optional production depth. |
| Responsive / accessibility | ✅ | Desktop/tablet/mobile/short-landscape adaptation; keyboard tab navigation; reduced motion; forced colors; focus/touch hardening. |
| Progressive failure mode | ✅ | Existing static atlas remains usable if V2 JavaScript enhancement fails. |
| CI verification | ✅ | Deterministic verification + build + Playwright desktop/mobile/keyboard smoke tests. |
| Browser evidence | ✅ | CI run `32217850358`: all four Playwright tests passed; desktop and mobile screenshots uploaded. |
| GitHub Pages workflow | ✅ | `.github/workflows/pages.yml` builds and deploys `dist/` from `main`; actual deployment occurs after merge. |

## Impeccable review sequence

| Pass | Status | Result |
|---|---|---|
| `critique` | ✅* | Baseline 25/40; six priority design/product problems identified. *Degraded single-context run because spawn-agent/live canvas unavailable. |
| `layout` | ✅ | Replaced repeated panels with atlas plate, schematic, blueprint desk, field guide, acquisition matrix and track. |
| `typeset` | ✅ | Newsreader display + Plex Sans UI + Plex Mono measurement roles, bounded prose and overflow-safe copy. |
| `colorize` | ✅ | Restrained paper/spruce system with semantic land/material accents; corrected metadata contrast. |
| `adapt` | ✅ | Structural mobile/tablet/desktop/short-landscape adaptation; mobile section navigation retained. |
| `harden` | ✅ | Progressive enhancement fallback, keyboard tabs, reduced motion, forced colors, internal overflow containment. |
| `polish` | ✅ | Focus visibility, touch targets, tab/panel labels and final responsive containment corrected. |
| `audit` | ✅ | Final technical design audit **17/20**. Remaining points are deliberate external-asset/performance and deeper assistive-technology testing limits. |

## Browser defects found and fixed

### Mobile intrinsic-width leak

The first browser gate found **440px of document-level horizontal overflow** on Pixel-sized mobile while desktop and keyboard paths passed. Instrumented Playwright diagnostics identified the Systems tab rail: four 210px tabs contributed an 840px min-content width to a grid item whose default `min-width:auto` expanded the document.

**Fix:** the mobile grid now uses `minmax(0,1fr)` and zeroable grid children; the tab rail remains horizontally scrollable inside its own surface. The subsequent CI run passed the mobile overflow assertion.

### Contrast / focus review

The original muted metadata token was below the intended AA body-text threshold on the paper field, and a gold-only focus ring was not strong enough against all light surfaces.

**Fix:** metadata moved to `#5f6a63`; focus is now a two-tone gold + ink indicator with a forced-colors override.

## Evidence baseline

Research refresh date: **2026-08-19**.

- ECCC 1991–2020 normals: London January daily mean **−5.4°C**; Abbotsford **3.7°C**; Victoria Airport **4.6°C** as a maritime proxy.
- VIA Rail currently shows London → Toronto average **2h33m** and **41 weekly departures**.
- TransLink's published weekday schedule shows Mission City → Waterfront in about **75 minutes** on morning West Coast Express service.
- BC ALR land prioritizes agriculture and specifically regulates housing, subdivision, fill and non-farm use alongside local rules.
- Ontario private well/septic systems are owner-responsibility infrastructure with regulated/professional work boundaries.
- Natural Resources Canada distinguishes grid-connected and off-grid PV; off-grid PV normally requires storage. Demeter therefore defaults to **grid-optional resilience**.
- FCC reported average Ontario farmland values increased **2.2% in 2025**; a dated Mission listing is retained only as a market-pressure scale check, never a regional valuation.

## Definition of done

- [x] Sourced regional profiles replace placeholder scoring.
- [x] Personal fit controls visibly change recommendations.
- [x] Distinct 3-, 10-, and 20-acre plans exist and are usable on mobile.
- [x] Food + livestock module communicates escalation and workload.
- [x] Property archetypes compare acquisition routes and infrastructure risk.
- [x] Water, wastewater, heat and power diagrams expose maintenance + failure modes.
- [x] Interactive controls have keyboard-visible focus and non-color state cues.
- [x] Responsive layouts cover phone, tablet, desktop and short landscape.
- [x] Reduced-motion and forced-colors behaviors are present.
- [x] External hero imagery is non-critical to content usability.
- [x] GitHub Actions verifies source invariants and browser smoke paths.
- [x] GitHub Pages deployment workflow is present.
- [x] Final Impeccable audit is documented with limitations.

## Next depth — deliberately not V1 release blockers

1. Build repeatable property/listing samples instead of isolated market examples.
2. Add candidate-town frost/growing-season, water, wildfire and flood layers.
3. Add hospital, grocery, internet, property-tax and insurance comparisons.
4. Validate livestock/agricultural bylaws after municipalities are shortlisted.
5. Add saved scenarios/export only when real repeat-use behavior justifies persistence.
