# Project Demeter — Build Status

**Working branch:** `agent/demeter-foundation`  
**PR:** #1  
**Last updated:** 2026-08-19

## Objective

Ship a coherent end-to-end v1 of Project Demeter: an interactive Canadian homestead field atlas that combines regional comparison, systems literacy, land-use blueprints, food/livestock planning, property archetypes, and a phased path toward a comfortable semi-off-grid life.

## Status legend

- ✅ Complete
- 🟡 In progress
- ⬜ Planned
- ⚠️ Blocked / degraded

## Delivery status

| Workstream | Status | Notes |
|---|---|---|
| Product definition | ✅ | `PRODUCT.md` is the durable source of product truth. |
| PRD / IA | ✅ | `docs/PRD.md` defines the broader product and staged delivery. |
| Research model | ✅ | `docs/RESEARCH_PLAN.md` defines evidence classes and refresh rules. |
| Current regional evidence | 🟡 | Replacing illustrative scores with dated, source-backed planning evidence for SW Ontario, Fraser Valley, and Vancouver Island. |
| Visual system | 🟡 | `DESIGN.md` defines the Canadian field-atlas world; current implementation is being upgraded against it. |
| Region explorer | 🟡 | Three-region prototype exists; upgrading to sourced facts, trade-offs, access and climate signals. |
| Systems explorer | 🟡 | Water/power/heat/food exists; adding stronger diagrams, ownership burden and resilience layers. |
| Blueprint Lab | 🟡 | 10-acre reference exists; distinct 3/10/20-acre authored plans are being built. |
| Food & livestock | 🟡 | Adding household food-system and livestock-capacity visualizations with workload and space implications. |
| Property archetypes | 🟡 | Adding fixer-upper / ready homestead / raw-land comparison and acquisition logic. |
| Personal fit planner | 🟡 | Adding interactive profile controls and recommendation output from the current seed scenario. |
| Roadmap | 🟡 | Existing staged roadmap will be expanded into acquisition → resilience → production sequencing. |
| Responsive / accessibility | 🟡 | Existing baseline is being reworked and validated through Impeccable adapt/harden/audit passes. |
| CI verification | ⬜ | Add deterministic source checks plus browser smoke tests in GitHub Actions. |
| GitHub Pages deployment | ⬜ | Add Pages workflow once the v1 interface is stable. |

## Impeccable review sequence

| Pass | Status | Purpose |
|---|---|---|
| `critique` | 🟡 | Baseline product/design critique before major upgrade. Degraded because this session has no sub-agent or browser-canvas tool. |
| `layout` | ⬜ | Rebuild reading order, section rhythm, density and responsive topology. |
| `typeset` | ⬜ | Normalize role hierarchy, reading measure and type delivery. |
| `colorize` | ⬜ | Tighten field-atlas palette so color communicates land, systems and state rather than decoration. |
| `adapt` | ⬜ | Ensure phone/tablet/desktop are structurally adapted, not merely scaled. |
| `harden` | ⬜ | Handle JS-off, missing data, long text, reduced motion, offline/asset failures and keyboard paths. |
| `polish` | ⬜ | Final cross-surface craft and consistency pass. |
| `audit` | ⬜ | Score accessibility, performance, theming, responsive design and implementation integrity after fixes. |

## Current evidence baseline

Research refresh date: **2026-08-19**.

- Environment and Climate Change Canada 1991–2020 normals: London January daily mean **−5.4°C**; Abbotsford **3.7°C**.
- VIA Rail: London–Toronto averages roughly **2h33m**, with **41 weekly departures** currently shown.
- TransLink: weekday West Coast Express runs Mission City → Waterfront in about **75 minutes** on the published morning schedule.
- BC Agricultural Land Commission: ALR land prioritizes agriculture; residential use, fill, subdivision and non-farm use are specifically regulated, and local rules still apply.
- Ontario: private well owners are responsible for compliant maintenance; licensed well contractors are recommended/required for regulated well work. Rural septic systems are owner-responsibility infrastructure.
- Natural Resources Canada distinguishes grid-connected and off-grid PV; off-grid PV normally requires storage. Demeter therefore treats grid-optional resilience as the default target rather than ideological disconnection.
- FCC reported average Ontario farmland values increased **2.2% in 2025**; current Mission-area listing evidence continues to show substantial land-price pressure in the Fraser Valley.

## Current baseline critique

⚠️ **DEGRADED: single-context (sub-agent and browser-canvas tools unavailable in this session).**

### What is already strong

- The visual thesis is product-specific: documentary landscape + survey/field-guide language is more defensible than generic green SaaS or cottagecore.
- The hero establishes an aspirational emotional frame before shifting into analysis.
- The 10-acre blueprint is the strongest product-specific object on the page and should become a central interaction model.

### Priority problems to resolve

1. **P1 — The page is still a guided concept, not yet a planning tool.** Region scores are illustrative and the personal profile is static. Upgrade: sourced evidence + user-adjustable planning profile + explicit reasoning for fit.
2. **P1 — Blueprint interaction overpromises breadth.** Only the 10-acre plan is spatially authored. Upgrade: distinct 3/10/20-acre plans with different topology and capacity logic.
3. **P1 — Food/livestock is underrepresented.** It is central to the homestead ambition but currently compressed into one generic system tab. Upgrade: dedicated production infographic with space, labour, seasonality and escalation tiers.
4. **P2 — Information architecture is too linear for repeat exploration.** Upgrade: stronger local navigation/section wayfinding and richer compare interactions without turning the experience into a dashboard grid.
5. **P2 — Visual hierarchy relies on repeated section templates.** Upgrade: vary composition according to content type—region atlas plate, systems schematic, blueprint desk, livestock field guide, acquisition matrix—while retaining one design language.
6. **P2 — Evidence provenance is weak in the live UI.** Upgrade: date-stamped source notes and clear distinction between sourced facts, planning judgments and illustrative scenarios.

## Definition of done for this build

- [ ] Sourced regional profiles replace placeholder scoring.
- [ ] Personal fit controls visibly change recommendations.
- [ ] Distinct 3-, 10-, and 20-acre plans exist and are usable on mobile.
- [ ] Food + livestock module communicates realistic escalation and workload.
- [ ] Property archetypes compare acquisition routes and infrastructure risk.
- [ ] Water, wastewater, heat and power diagrams expose maintenance + failure modes.
- [ ] Every interactive control has keyboard-visible focus and a non-color state cue.
- [ ] Layout works at 360px phone, 768px tablet, 1024–1440px desktop and short landscape.
- [ ] Reduced-motion behavior preserves state feedback.
- [ ] External imagery failure does not make core content unusable.
- [ ] GitHub Actions verifies source invariants and browser smoke paths.
- [ ] GitHub Pages deployment workflow is present.
- [ ] Final Impeccable audit is documented with remaining limitations.
