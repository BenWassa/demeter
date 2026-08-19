# Project Demeter — Build Status

**Release branch:** `main`  
**Working PR:** #3 — `agent/mobile-ia-pass` → `main`  
**Last updated:** 2026-08-19  
**Current release:** V1.1 on `main`; V1.2 mobile/IA release candidate in PR #3.

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
| Field Atlas | ✅ | Nine approved infographic plates, including corrected blueprint editions |
| Full-screen image viewer | ✅ | Zoom, pan, keyboard controls, focus restoration and real-image decode QA |
| Mobile direct manipulation | ✅ RC | Pinch-to-zoom, one-finger pan when magnified, double-tap zoom/reset; explicit controls retained as accessible alternatives |
| Information architecture | ✅ RC | Short Home hub + focused Regions, Systems, Land, Visuals and Plan workspaces |
| Legacy deep links | ✅ RC | Old `/#section` links route to their new focused workspace |
| Responsive / accessibility | ✅ | Keyboard tabs, focus visibility, reduced motion, forced colors, touch-target floors, mobile overflow regression tests |
| CI / browser QA | ✅ RC | Six-page build; desktop + Pixel 7 workspace tests; real asset decode; real two-finger Chromium pinch test |
| GitHub Pages | ✅ configured | Actions workflow deploys the built `dist/`; repository Pages URL is `https://benwassa.github.io/demeter/` |

`RC` = implemented in PR #3 and pending merge to `main`.

## Release history

### V1 — planning atlas foundation

PR #1 established the product model, research/evidence framework, field-atlas design language, Fit Lab, regional explorer, systems, land, food/livestock, acquisition, roadmap, responsive behavior and CI.

### V1.1 — authored visual atlas

PR #2 merged as `e91f797415b4b8711d466d6bf7dcf216b0596a84`.

- Integrated all nine approved Demeter infographic plates.
- Build validates and exposes the image bundle under `dist/assets/visual-guides/`.
- Added responsive full-screen viewing, zoom/pan controls and real-image browser QA.

### V1.2 — mobile interaction + focused workspaces

PR #3 applies an Impeccable critique → adapt → harden → polish pass documented in `docs/MOBILE_IA_REVIEW.md`.

Material changes:

1. **Gesture-native mobile viewer** — pinch zoom is primary on touch; drag pans magnified imagery; double-tap provides quick zoom/reset. Buttons and keyboard controls remain available rather than making a multipoint gesture mandatory.
2. **Shorter Home** — the homepage is now orientation + routing instead of the entire application.
3. **Focused URLs** — `regions.html`, `systems.html`, `land.html`, `visuals.html`, `plan.html`.
4. **Shared runtime** — page separation does not fork product logic or data.
5. **Compatibility** — saved links such as `/#blueprint` redirect to the equivalent focused page.

## Quality gates

Before V1.2 merges:

- [x] Deterministic verification passes.
- [x] All six HTML entry points build.
- [x] All nine atlas images decode from the built artifact.
- [x] Desktop and Pixel 7 profiles load each workspace independently.
- [x] No tested page creates document-level mobile horizontal overflow.
- [x] Existing keyboard tab navigation remains green.
- [x] Full-screen image open / zoom / reset / close path remains green.
- [x] Real two-finger touch input increases zoom on the mobile Chromium profile.
- [x] Legacy section deep links are covered by browser QA.

## Next product depth

After V1.2, prioritize planning intelligence over more interface breadth:

1. Repeatable property/listing samples and price distributions.
2. Candidate-town frost/growing-season, flood, wildfire and water layers.
3. Hospital, grocery, internet, property-tax and insurance comparisons.
4. Municipality-specific livestock/agricultural rules after subregions are shortlisted.
5. Saved scenarios/export only when repeat use justifies persistence.
