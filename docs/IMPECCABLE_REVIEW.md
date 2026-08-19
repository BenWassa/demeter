# Project Demeter — Impeccable Review & Upgrade Log

**Surface:** Demeter single-page planning atlas  
**Working branch:** `agent/demeter-foundation`  
**Review date:** 2026-08-19

## Critique — baseline

⚠️ **DEGRADED: single-context (spawn-agent and live browser-canvas tools are unavailable in this session).**

The baseline critique was completed before the V2 implementation and is also summarized in `docs/STATUS.md`. The deterministic Impeccable detector could not be run locally because the Impeccable runtime is not installed in this execution container. This is compensated for—not silently replaced—by repo-level deterministic checks plus Playwright browser testing in GitHub Actions.

### Design health baseline

| Heuristic | Score | Main issue |
|---|---:|---|
| Visibility of status | 2/4 | Region and acreage controls changed content, but the page did not explain evidence confidence or fit reasoning. |
| Match to real world | 3/4 | Well/septic/power concepts were grounded; land and food operation were too abstract. |
| User control | 2/4 | Region/system switching existed; no personal scenario controls and acreage choices overpromised unique plans. |
| Consistency | 3/4 | Visual language coherent, though composition repeated one section pattern too often. |
| Error prevention | 2/4 | Good disclaimers, but little explicit separation of sourced facts, planning judgment and parcel-level unknowns. |
| Recognition vs recall | 3/4 | Strong labels and diagrams; missing cross-system decision context. |
| Flexibility / efficiency | 2/4 | Linear reading path; weak repeat-exploration tooling. |
| Aesthetic minimalism | 3/4 | Restrained and product-specific, but insufficient visual variation by content type. |
| Error recovery | 2/4 | External imagery was non-critical, but interactive failure paths were not deliberately designed. |
| Help / documentation | 3/4 | PRD and research model existed; live evidence provenance was thin. |
| **Total** | **25/40** | **Good concept; not yet a serious planning tool.** |

### Baseline priority issues

1. **P1 — Guided concept rather than planning tool.** Placeholder regional scores and a static profile made the output feel authored for the demo rather than responsive to the user.
2. **P1 — Acreage selector overstated functionality.** Only the 10-acre plan was spatially authored.
3. **P1 — Food/livestock ambition was under-modeled.** A central homestead choice appeared as one generic system tab.
4. **P2 — Repeated section template.** Too many sections shared the same heading + panel topology.
5. **P2 — Evidence provenance was not strong enough in the live UI.**
6. **P2 — Repeat exploration was weak.** The page read well once but did not yet reward revisiting scenarios.

---

## Layout pass

### Spatial thesis

**Primary path:** dream → tune constraints → compare regions → understand critical systems → size land → choose production burden → choose acquisition route → phase the transition.

**Density:** editorial at the hero and section introductions; operational inside the atlas, blueprint, system and acquisition surfaces.

### Changes

- Added a three-column **Fit Lab** rather than another content card.
- Rebuilt regions as a **field-atlas plate** with a narrow selection index and one evidence-rich sheet.
- Rebuilt infrastructure as a **schematic** with dependency flow and failure facts.
- Made the blueprint a **large working desk** with layer controls and land-budget notes.
- Gave food/livestock its own **field guide** surface with workload, land allocation and escalation.
- Built acquisition as a **matrix** rather than narrative prose.
- Made the roadmap a **continuous track**, emphasizing sequence and gates.
- Added structural adaptations at 1080px, 820px, 560px and short-landscape contexts.

### Responsive correction found during Adapt

The first V2 mobile rule hid the section navigation. That violated the principle that adaptation should not remove core functionality. A final `polish.css` correction keeps the navigation as a horizontally scrollable second header row on mobile.

---

## Typeset pass

### Roles

- **Newsreader**: aspirational/display and analytical section headings.
- **IBM Plex Sans**: body, controls, explanations and operational UI.
- **IBM Plex Mono**: measurements, codes, dates and evidence metadata only.

### Corrections / rationale

- Maintained 16px body floor and browser zoom behavior.
- Kept analytical prose to bounded measures rather than stretching across desktop.
- Used mono only where the content is genuinely measurement/data-like; it is not a generic “technical” costume.
- Kept hero type expressive while product controls retain stable sans typography.
- Long content uses wrapping instead of truncation; no critical label is ellipsized.
- Font failure has normal system/Georgia/monospace fallbacks; core content does not disappear.

---

## Colorize pass

### Strategy

Restrained agricultural/survey palette: paper + spruce dominate; lake/soil/harvest appear where they have a material or semantic job.

### Corrections / rationale

- Primary text/action remains high-contrast spruce/ink rather than scattering saturated green throughout the page.
- Harvest is reserved for focus/progress emphasis.
- Blueprint zones use distinct fills **plus labels**, so land-use meaning is never color-only.
- Dark sections use light text derived from the same green-neutral world rather than generic gray.
- Forced-colors treatment preserves selection state and removes dependence on the hero image.

---

## Adapt pass

### Desktop

- Full section index in header.
- Multi-column fit and systems work areas.
- Atlas selector and evidence plate visible simultaneously.
- 3/10/20 plans have enough canvas to preserve labels.

### Tablet

- Fit result drops below the controls.
- Atlas/acquisition selectors become horizontally scrollable rails.
- Blueprint legend moves below the plan.
- Evidence stacks rather than compressing.

### Mobile

- Primary navigation remains available in a horizontal row instead of disappearing.
- Interactive controls meet a 44px minimum target where compact controls are used.
- Tabs scroll horizontally when their labels cannot fit honestly.
- Blueprint becomes a contained pan surface rather than shrinking labels into illegibility.
- Roadmap becomes a single reading column.

### Short landscape

The hero reduces height and keeps the survey plate beside the main copy rather than forcing the portrait stack into a short viewport.

---

## Harden pass

### Failure and edge-case decisions

- **JavaScript failure:** the original static Demeter page remains the fallback; the V2 experience is progressive enhancement rather than a blank application shell.
- **V2 module failure:** loader catches the error and leaves the static atlas in place.
- **Hero image failure:** image is atmospheric background only; solid dark surface + all text remain usable.
- **Font failure:** system fallbacks preserve content and controls.
- **External evidence links:** facts and current observations remain readable even if a source is temporarily unreachable.
- **Long content:** wrapping and flexible grid columns avoid clipping.
- **Reduced motion:** hero settle and state transitions are intentionally removed.
- **Forced colors:** core panels, controls and selection states remain legible.
- **Keyboard:** left/right/home/end navigation implemented for tab groups; tab panels are labeled and focusable.
- **Mobile overflow:** intended horizontal pan is confined to tab rails and the blueprint canvas, not the whole document.

---

## Polish pass

### Final craft corrections

- Restored mobile section wayfinding after the Adapt review.
- Added minimum target size to source links and compact controls.
- Synchronized active tab labels with their tab panels.
- Kept state animation on `transform`/opacity rather than animating layout width.
- Kept the strongest visual moment—the land blueprint—functional rather than decorative.
- Preserved the field-atlas world instead of drifting into a conventional dashboard during feature expansion.

---

## Audit — implementation score before browser evidence

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 3/4 | Semantic source page, visible focus from base system, tab keyboard handling, reduced motion, forced colors, 44px compact controls. Browser run still required. |
| Performance | 3/4 | Dependency-free runtime; modular JS; background hero; transform/opacity state motion. External font/image requests remain. |
| Responsive design | 4/4 | Structural desktop/tablet/mobile/short-landscape rules, retained mobile navigation, contained blueprint panning. |
| Theming | 3/4 | Strong semantic token core; a few world-specific blueprint/dark-surface literals remain intentionally local. |
| Implementation integrity | 4/4 | Product-specific forms, clear evidence model, real distinct acreage plans, progressive fallback, no framework/card-grid default. |
| **Provisional total** | **17/20** | **Good; browser evidence is the remaining gate.** |

## Browser / CI gate

GitHub Actions now performs:

1. dependency install;
2. deterministic product/a11y/resilience verification;
3. static build;
4. Chromium install;
5. Playwright desktop + mobile smoke paths;
6. screenshot/report artifact upload.

The final score and any runtime defects must be updated only after that workflow completes; a clean source review is not treated as proof of a clean rendered product.
