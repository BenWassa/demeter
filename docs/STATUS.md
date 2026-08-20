# Project Demeter — Build Status

**Release branch:** `main`  
**Last updated:** 2026-08-20  
**Current release:** V1.4 — approved responsive Field Atlas masters.

## Current product

Project Demeter is a responsive Canadian homestead field atlas for comparing regions, understanding critical household systems, sizing land, planning food/livestock depth, comparing acquisition routes, and phasing a comfortable semi-off-grid transition.

## Delivery status

| Workstream | Status | Result |
|---|---|---|
| Product / PRD / design contract | ✅ | `PRODUCT.md`, `docs/PRD.md`, `DESIGN.md` |
| Research model + regional evidence | ✅ | SW Ontario, Fraser Valley, Vancouver Island with dated source model |
| Fit Lab | ✅ | Career anchor + weighted preferences rank current regions transparently |
| Systems | ✅ | Water, wastewater, power and heat dependency / resilience models |
| Land | ✅ | 3-, 10- and 20-acre infographic-first plans plus supporting planning detail |
| Food + livestock | ✅ | Food Production Pathways infographic plus production-depth, workload and livestock detail |
| Acquisition + roadmap | ✅ | Fixer, turnkey, raw-land pathways + phased transition |
| Field Atlas IA | ✅ | Curated Place / Land / Systems / Food / Seasons reference library |
| Infographic system | ✅ | Nine live approved illustrated plates with deterministic SVG fallbacks |
| Blueprint family | ✅ | 3 / 10 / 20-acre landscape masters plus matched portrait mobile variants |
| Full-screen image viewer | ✅ | Zoom, pan, keyboard controls, focus restoration and real-image decode QA |
| Mobile direct manipulation | ✅ | Pinch-to-zoom, one-finger pan when magnified, double-tap zoom/reset; explicit controls retained |
| Mobile atlas navigation | ✅ | Grouped horizontal snap rails prevent a giant undifferentiated image stack |
| Responsive infographic selection | ✅ | Landscape blueprint art on larger viewports; portrait masters at 720px and below |
| Information architecture | ✅ | Short Home hub + focused Regions, Systems, Land, Visuals and Plan workspaces |
| Legacy deep links | ✅ | Old `/#section` links route to their focused workspace |
| Responsive / accessibility | ✅ | Keyboard tabs, focus visibility, reduced motion, forced colors, touch-target floors, overflow regression tests |
| CI / browser QA | ✅ | Desktop + mobile workspace tests, approved asset decode, and real two-finger Chromium pinch gates |
| GitHub Pages | ✅ configured | Actions deploy the built `dist/` to `https://benwassa.github.io/demeter/` |

## Release history

### V1 — planning atlas foundation

PR #1 established the product model, research/evidence framework, field-atlas design language, Fit Lab, regional explorer, systems, land, food/livestock, acquisition, roadmap, responsive behavior and CI.

### V1.1 — authored visual atlas

PR #2 integrated the first nine infographic plates, build validation and the full-screen image viewer.

### V1.2 — mobile interaction + focused workspaces

PR #3 delivered gesture-native mobile viewing, shorter Home, focused workspace URLs, shared runtime architecture and legacy deep-link compatibility. The interaction pass is documented in `docs/MOBILE_IA_REVIEW.md`.

### V1.3 — Field Atlas publication rebuild

Issue #5 applied the critique → simplify → adapt → harden → polish process to the atlas as a publication rather than a set of isolated images.

Material changes:

1. **Curated information architecture** — Place, Land, Systems, Food and Seasons each answer a specific planning question.
2. **Light field-atlas surface** — the separate dark generic gallery was retired.
3. **Natural image ratios** — cards no longer force infographic content through arbitrary crops.
4. **Canonical visual grammar** — nine deterministic SVG plates provide a stable fallback publication system.
5. **Metaphor repair** — independence dimensions remain separate; food becomes a pathway; seasonal work becomes an explicit timeline using labour intensity and systems criticality rather than gauges.
6. **Stronger QA contract** — browser tests assert grouped IA, image decode, uncropped natural ratios, mobile snap navigation and preserved zoom/pan behavior.

The finalized publication rules are documented in `docs/FIELD_ATLAS_VISUAL_SYSTEM.md`.

### V1.4 — approved infographic master integration

PR #13 organized the final raster masters and removed opaque asset uploads from repository root. The following integration pass makes those masters the live artwork:

1. **Complete acreage set** — clean 3-, 10- and 20-acre landscape blueprints are all live.
2. **Responsive blueprint family** — matching portrait 3-, 10- and 20-acre sheets are selected on mobile without changing the desktop composition.
3. **Food restored** — the approved Food Production Pathways infographic returns to the Field Atlas and becomes the primary Food visual in the Land workspace.
4. **No known-bad suppression** — 20-acre and Food no longer rely on hidden placeholders or rejected legacy artwork.
5. **Legacy bundle isolated** — the old ZIP remains audit-only under `assets/visual-guides-source/legacy/`; no live plate is extracted from it.
6. **Asset contract hardened** — all approved masters are copied and verified by build/CI, with explicit responsive-source tests.

## V1.4 quality gate

- [x] All nine Field Atlas subjects are live.
- [x] 3 / 10 / 20-acre landscape masters share the approved clean family.
- [x] 3 / 10 / 20-acre portrait masters are used at mobile widths.
- [x] Food Production Pathways is live in both Field Atlas and Land.
- [x] Known-bad 20-acre and Food suppression is removed.
- [x] Natural image ratio is preserved in library cards.
- [x] Full-screen viewer interaction contract is retained.
- [x] Mobile grouped rails and document-overflow assertions remain in CI.
- [x] Legacy visual bundle is audit-only.

## Next product depth

Prioritize planning intelligence over more interface breadth:

1. Repeatable property/listing samples and price distributions.
2. Candidate-town frost/growing-season, flood, wildfire and water layers.
3. Hospital, grocery, internet, property-tax and insurance comparisons.
4. Municipality-specific livestock/agricultural rules after subregions are shortlisted.
5. Saved scenarios/export only when repeat use justifies persistence.
