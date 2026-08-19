# Project Demeter — Impeccable Review & Upgrade Log

**Surface:** Demeter single-page planning atlas  
**Working branch:** `agent/demeter-foundation`  
**Review date:** 2026-08-19

## Critique — baseline

⚠️ **DEGRADED: single-context (spawn-agent and live browser-canvas tools are unavailable in this session).**

The baseline critique was completed before V2 implementation. The deterministic Impeccable CLI detector could not be run locally in this execution environment; this limitation is preserved rather than hidden. Repo-level deterministic checks and Playwright browser tests provide the runtime release evidence.

### Design health baseline

| Heuristic | Score | Main issue |
|---|---:|---|
| Visibility of status | 2/4 | Controls changed content without enough evidence confidence or fit reasoning. |
| Match to real world | 3/4 | Core infrastructure was grounded; land and food operation were too abstract. |
| User control | 2/4 | No personal scenario controls; acreage choices overstated unique planning depth. |
| Consistency | 3/4 | Coherent language, but one repeated section topology dominated. |
| Error prevention | 2/4 | Sourced facts, planning judgments and parcel unknowns were insufficiently separated. |
| Recognition vs recall | 3/4 | Strong labels and diagrams; weak cross-system decision context. |
| Flexibility / efficiency | 2/4 | Linear first-read experience; weak repeat exploration. |
| Aesthetic minimalism | 3/4 | Restrained and product-specific but too compositionally uniform. |
| Error recovery | 2/4 | Interactive failure paths were not deliberately designed. |
| Help / documentation | 3/4 | Strong PRD/research model; thin live evidence provenance. |
| **Total** | **25/40** | **Good concept; not yet a serious planning tool.** |

### Baseline priorities

1. **P1 — Guided concept rather than planning tool.**
2. **P1 — Acreage selector overstated functionality.**
3. **P1 — Food/livestock ambition was under-modeled.**
4. **P2 — Repeated section template.**
5. **P2 — Evidence provenance was weak in the live UI.**
6. **P2 — Repeat exploration was weak.**

---

## Layout pass

**Primary path:** dream → tune constraints → compare regions → understand critical systems → size land → choose production burden → choose acquisition route → phase the transition.

**Density:** editorial at hero/section introductions; operational inside the atlas, blueprint, systems and acquisition surfaces.

### Changes

- Added a three-column **Fit Lab** instead of another content card.
- Rebuilt regions as a **field-atlas plate** with selector index + evidence sheet.
- Rebuilt infrastructure as a **dependency schematic**.
- Made Blueprint Lab a **working survey desk** with layer controls and land-budget notes.
- Gave food/livestock its own **field-guide** surface.
- Built acquisition as a **matrix** rather than prose cards.
- Made the roadmap a **continuous track**.
- Added structural adaptation at 1080px, 820px, 560px and short-landscape contexts.

---

## Typeset pass

### Roles

- **Newsreader** — aspirational/display and analytical headings.
- **IBM Plex Sans** — body, controls, explanations and operational UI.
- **IBM Plex Mono** — measurements, codes, dates and evidence metadata only.

### Corrections

- Maintained a readable body floor and browser zoom behavior.
- Bounded analytical prose rather than stretching it across desktop.
- Restricted mono to genuinely measurement/data-like content.
- Kept expressive hero type away from operational controls.
- Long content wraps; critical labels are not ellipsized.
- System/Georgia/monospace fallbacks preserve usable content if hosted fonts fail.

---

## Colorize pass

### Strategy

Restrained agricultural/survey palette: paper + spruce dominate; lake/soil/harvest appear where they have a material or semantic job.

### Corrections

- Primary action/state uses spruce/ink rather than decorative saturated green.
- Harvest is reserved for focus/progress emphasis.
- Blueprint zones use distinct fills **plus labels**, so land-use meaning is not color-only.
- Dark-section secondary copy is hue-related rather than generic gray.
- Muted metadata was darkened to `#5f6a63` after contrast review.
- Focus became a two-tone gold + ink indicator so it remains visible against both light and dark surfaces.
- Forced-colors treatment preserves selection/focus without relying on the hero image.

---

## Adapt pass

### Desktop

- Full section index in header.
- Multi-column fit/systems work areas.
- Atlas selector + evidence plate visible simultaneously.
- 3/10/20 plans retain labels at useful scale.

### Tablet

- Fit result moves below controls.
- Atlas/acquisition selectors become horizontal rails.
- Blueprint legend moves below plan.
- Evidence stacks rather than compressing.

### Mobile

- Section navigation remains available as a horizontally scrollable header row.
- Compact controls use a 44px minimum target.
- Tabs scroll horizontally when labels cannot fit honestly.
- Blueprint is a contained pan surface rather than shrinking labels to illegibility.
- Roadmap becomes a single reading column.

### Short landscape

Hero height reduces and keeps the survey plate beside the main copy instead of forcing a portrait stack into a shallow viewport.

### Defect found by browser Adapt verification

The first Playwright mobile run found **440px of document-level horizontal overflow**. Instrumentation identified the Systems tab rail: four 210px tabs created an 840px min-content width which a grid item with default `min-width:auto` propagated to the document.

**Fix:** mobile `.two`/`.tri` grids use `minmax(0,1fr)` and their children can shrink with `min-width:0`; the tab rail itself remains locally scrollable. The next browser gate passed.

---

## Harden pass

- **JavaScript failure:** original static Demeter content remains as a usable fallback.
- **Enhancement failure:** loader catches the module error and leaves the static page intact.
- **Hero image failure:** imagery is atmospheric; solid dark surface + all core copy remain usable.
- **Font failure:** system fallbacks preserve content/controls.
- **External source failure:** sourced facts remain readable even if an outbound source is temporarily unreachable.
- **Long text:** wrapping and zeroable grid children prevent clipping/min-content blowouts.
- **Reduced motion:** hero settle and state transitions are removed.
- **Forced colors:** controls, focus and selection remain legible.
- **Keyboard:** left/right/home/end navigation for tab groups; focusable, correctly labeled tabpanels.
- **Horizontal scroll:** intentional scrolling is confined to tab rails and the blueprint canvas, not the document.

---

## Polish pass

- Restored mobile section wayfinding after the first Adapt draft had hidden it.
- Added target-size floors to source links and compact controls.
- Synchronized active tab labels and tabpanel accessible names.
- Kept state animation on transform/opacity instead of layout width.
- Preserved the blueprint as the strongest functional visual moment.
- Kept the field-atlas world intact while adding feature depth; no generic dashboard/card-grid drift.
- Corrected muted-text contrast and cross-surface focus visibility.

---

## Final audit

| Dimension | Score | Evidence |
|---|---:|---|
| Accessibility | 3/4 | Keyboard tabs, focus-visible system, non-color states, reduced motion, forced colors, semantic tabpanels and target floors. Dedicated screen-reader/axe/device audit remains future depth. |
| Performance | 3/4 | Dependency-light runtime, static build, progressive fallback, transform/opacity state motion. Hosted fonts + hero image remain external requests. |
| Responsive design | 4/4 | Structural desktop/tablet/mobile/short-landscape rules; retained mobile navigation; mobile document overflow regression-tested. |
| Theming | 3/4 | Strong semantic token core; a few blueprint/dark-surface literals remain intentionally local to the material world. |
| Implementation integrity | 4/4 | Evidence model, real distinct acreage plans, personal fit logic, progressive fallback and content-specific surface forms. |
| **Final total** | **17/20** | **Strong V1. Remaining points represent deeper production testing/asset work, not hidden release defects.** |

## Browser / CI release gate

GitHub Actions run **32217850358** completed successfully after the responsive fix:

1. dependency install — ✅
2. deterministic product/evidence/a11y/resilience verification — ✅
3. static build — ✅
4. Chromium install — ✅
5. desktop planning-path smoke test — ✅
6. mobile planning-path + no-document-overflow smoke test — ✅
7. desktop keyboard tab navigation — ✅
8. mobile keyboard tab navigation — ✅
9. desktop + mobile full-page screenshots uploaded as CI evidence — ✅

The browser gate caught and drove a real mobile fix; it is therefore part of the product quality system rather than a ceremonial test.
