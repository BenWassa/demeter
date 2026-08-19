# Project Demeter — Build Status

**Release branch:** `main`  
**Last updated:** 2026-08-19  
**Current release:** V1.3 — coherent Field Atlas publication system.

## Current product

Project Demeter is a responsive Canadian homestead field atlas for comparing regions, understanding critical household systems, sizing land, planning food/livestock depth, comparing acquisition routes, and phasing a comfortable semi-off-grid transition.

## Delivery status

| Workstream | Status | Result |
|---|---|---|
| Product / PRD / design contract | ✅ | `PRODUCT.md`, `docs/PRD.md`, `DESIGN.md` |
| Research model + regional evidence | ✅ | SW Ontario, Fraser Valley, Vancouver Island with dated source model |
| Fit Lab | ✅ | Career anchor + weighted preferences rank current regions transparently |
| Systems | ✅ | Water, wastewater, power and heat dependency / resilience models |
| Land | ✅ | Distinct 3-, 10- and 20-acre interactive plans |
| Food + livestock | ✅ | Production depth, workload and livestock friction |
| Acquisition + roadmap | ✅ | Fixer, turnkey, raw-land pathways + phased transition |
| Field Atlas IA | ✅ | Curated Place / Land / Systems / Food / Seasons reference library |
| Infographic system | ✅ | Nine canonical SVG plates generated from one restrained publication grammar |
| Blueprint family | ✅ | 3 / 10 / 20-acre sheets share one template; correct standalone 20-acre replacement is live |
| Full-screen image viewer | ✅ | Zoom, pan, keyboard controls, focus restoration and real-image decode QA |
| Mobile direct manipulation | ✅ | Pinch-to-zoom, one-finger pan when magnified, double-tap zoom/reset; explicit controls retained |
| Mobile atlas navigation | ✅ | Grouped horizontal snap rails prevent a giant undifferentiated image stack |
| Information architecture | ✅ | Short Home hub + focused Regions, Systems, Land, Visuals and Plan workspaces |
| Legacy deep links | ✅ | Old `/#section` links route to their focused workspace |
| Responsive / accessibility | ✅ | Keyboard tabs, focus visibility, reduced motion, forced colors, touch-target floors, overflow regression tests |
| CI / browser QA | ✅ | Six-page build; desktop + mobile workspace tests; canonical asset decode; real two-finger Chromium pinch test |
| GitHub Pages | ✅ configured | Actions deploy the built `dist/` to `https://benwassa.github.io/demeter/` |

## Release history

### V1 — planning atlas foundation

PR #1 established the product model, research/evidence framework, field-atlas design language, Fit Lab, regional explorer, systems, land, food/livestock, acquisition, roadmap, responsive behavior and CI.

### V1.1 — authored visual atlas

PR #2 integrated the first nine infographic plates, build validation and the full-screen image viewer.

### V1.2 — mobile interaction + focused workspaces

PR #3 delivered gesture-native mobile viewing, shorter Home, focused workspace URLs, shared runtime architecture and legacy deep-link compatibility. The interaction pass is documented in `docs/MOBILE_IA_REVIEW.md`.

### V1.3 — Field Atlas publication rebuild

Issue #5 applies the critique → simplify → adapt → harden → polish process to the atlas as a publication rather than a set of isolated images.

Material changes:

1. **Curated information architecture** — Place, Land, Systems, Food and Seasons each answer a specific planning question.
2. **Light field-atlas surface** — the separate dark generic gallery has been retired.
3. **Natural image ratios** — cards no longer force infographic content through 4:5 / 3:2 crops.
4. **Canonical visual grammar** — nine runtime SVG plates are rendered from `scripts/render-visual-guides.mjs`; styling and semantic accents are shared rather than improvised plate-by-plate.
5. **Blueprint consistency** — all three acreage sheets use one renderer/template and the corrected 20-acre smallholding is restored as a live standalone plate.
6. **Metaphor repair** — independence dimensions remain separate; food becomes a pathway; seasonal work becomes an explicit timeline using labour intensity and systems criticality rather than gauges.
7. **Legacy raster retirement** — the opaque ZIP bundle and raster patching are no longer part of the runtime build. Historical raster files are source/archive references only.
8. **Stronger QA contract** — browser tests assert the five groups, all nine SVG decodes, 20-acre visibility, uncropped natural ratios, mobile snap navigation and preserved zoom/pan behavior.

The finalized publication rules are documented in `docs/FIELD_ATLAS_VISUAL_SYSTEM.md`.

## V1.3 quality gate

- [x] Canonical nine-plate output defined in one renderer.
- [x] 3 / 10 / 20-acre plates share one blueprint template.
- [x] Known-bad 20-acre runtime suppression removed.
- [x] No live atlas reference uses the legacy WebP / PNG bundle.
- [x] Natural image ratio is preserved in library cards.
- [x] Full-screen viewer interaction contract retained.
- [x] Mobile grouped rails and no-document-overflow assertions added.
- [x] Final visual-system rules documented.
- [x] Branch CI / exact browser screenshots verified before merge.

## Next product depth

Prioritize planning intelligence over more interface breadth:

1. Repeatable property/listing samples and price distributions.
2. Candidate-town frost/growing-season, flood, wildfire and water layers.
3. Hospital, grocery, internet, property-tax and insurance comparisons.
4. Municipality-specific livestock/agricultural rules after subregions are shortlisted.
5. Saved scenarios/export only when repeat use justifies persistence.
