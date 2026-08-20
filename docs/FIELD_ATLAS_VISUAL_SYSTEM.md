# Project Demeter — Field Atlas visual system

**Status:** canonical publication system  
**Established:** 2026-08-19  
**Audit correction:** 2026-08-20  
**Scope:** `visuals.html`, `src/visuals.js`, `src/approved-visuals.js`, `src/visual-guides.css`, source masters under `assets/visual-guides/`, and built plates under `dist/assets/visual-guides/`

## Thesis

The Field Atlas is a **modern Canadian field-reference publication**, not an image gallery and not a generic dashboard.

The strongest approved composition is the master for each subject. Consistency comes from a shared publication shell—paper, typography, palette, hierarchy, restrained rules and family-level conventions—not from forcing every plate through one identical renderer.

Preserve illustration, texture, spatial richness and information density when they make a plate easier to understand or remember. Simplify ornament before simplifying useful content.

## Publication grammar

Canonical plates should generally use:

- warm off-white paper;
- dark spruce / charcoal typography;
- muted agricultural greens and earth tones;
- restrained blue accents for water, weather or infrastructure where useful;
- clear title and deck hierarchy;
- explicit labels and readable comparison structures;
- thin rules and quiet grouping rather than decorative frames;
- illustration that supports comprehension rather than competing with it;
- a restrained source / caveat line where appropriate.

Avoid visual flattening. A clean plate may still be richly illustrated.

## Asset policy

The generated `.svg` files remain stable fallback URLs for the nine atlas concepts. Approved illustrated masters can coexist with those fallbacks as first-class source-controlled PNG assets.

Two source paths are valid:

1. **Approved illustrated master** — a source-controlled PNG selected through the visual audit. The build copies it directly into the publication and `src/approved-visuals.js` prefers it for rendering.
2. **Generated information plate** — produced directly as SVG by `scripts/render-visual-guides.mjs` and used as the live plate where no approved raster master has superseded it.

Approved illustrated masters currently drive:

- Region comparison;
- The independence spectrum;
- Homestead systems;
- The homestead year · Southwest Ontario;
- The homestead year · Coastal British Columbia.

Generated plates currently remain live for:

- 3-acre compact homestead;
- 10-acre working homestead;
- 20-acre smallholding;
- Food production pathways.

The Land / Food audit choices are already recorded; their source assets and responsive variants remain a separate implementation step.

## Atlas information architecture

The library is grouped by the question the visual answers:

1. **Place** — Which regional trade-offs change where the homestead should be?
2. **Land** — How does useful acreage change layout, options and maintenance burden?
3. **Systems** — What must keep working, and what kind of resilience helps?
4. **Food** — How far should production deepen before it becomes an operation?
5. **Seasons** — When do workload and household-system criticality stack up?

Desktop uses a curated editorial layout. Mobile keeps the five groups and uses horizontal snap rails where needed so complex plates retain their natural proportions.

## Image and viewer contract

- Preserve every plate's natural aspect ratio in the library.
- Never force `object-fit: cover` or arbitrary card crops on infographic content.
- Approved raster masters should be served directly rather than recompressed into derivative assets.
- Generated SVG sources remain valid resilient fallbacks.
- Full-screen inspection remains part of the product contract:
  - pinch to zoom on touch;
  - one-finger pan when magnified;
  - double-tap zoom / reset;
  - wheel and keyboard zoom;
  - explicit `+`, `−` and Reset controls;
  - `0` reset shortcut;
  - focus restoration after close.

## Plate-specific rules

### Blueprints — 3 / 10 / 20 acres

Blueprints should feel like one family, but responsive format can legitimately change composition. Preserve the strongest site-plan logic instead of forcing identical geometry into every viewport.

Required semantics include:

- house / serviced core;
- food-production zones;
- field / livestock zones where appropriate;
- woodlot / privacy;
- well / potable-water path in restrained blue;
- wastewater path / reserve in blue-grey / purple;
- dashed reserve / future boundaries;
- all-season road;
- restrained orientation / approximate scale reference;
- explicit conceptual-plan caveat.

### Region comparison

The three-region comparison dominates. Use aligned decision rows and useful atmospheric regional illustration. Remove decorative atlas framing rather than stripping out the landscapes.

### Independence spectrum

Keep three variables separate:

- utility independence;
- operating burden;
- resilience potential.

Use simple ordinal bars. Do not collapse the dimensions into one score or use gauges, rings or faux-scientific dials. The illustrated household progression is useful and should remain.

### Homestead systems

Show water, wastewater, power and heat as readable dependency chains, with the resilience move clearly separated. The internal technical illustrations are part of the information design; avoid ornamental outer framing.

### Food production pathways

Progression should communicate deeper infrastructure and daily commitment without implying a lifestyle-status ladder. The audited legacy preference should be preserved when its production asset is wired.

### Homestead year

Use a January-to-December timeline with two explicitly named ordinal measures:

- **Labour intensity** — routine workload in the month;
- **Systems criticality** — consequence / urgency of system failure.

Use simple five-step bars or equivalent ordinal marks. No speedometers, gauges or fake numerical precision. Preserve seasonal scenes and regional character because they make the annual rhythm legible at a glance.

## Anti-drift rules

Reject:

- ornamental mastheads or heavy outer framing;
- fake vintage-cartography decoration;
- oversized compass roses or decorative sun arcs;
- faux survey contours;
- meaningless gauges, speedometers, progress rings or radar forms;
- arbitrary crops of information graphics;
- generic corporate-dashboard styling;
- forcing every subject into the same diagram grammar;
- removing useful illustration solely to make a plate look more minimal;
- adding decoration because a subject contains more information.

## Audit correction after Issue #5

Issue #5 correctly fixed the Field Atlas container: editorial grouping, natural-ratio presentation, viewer interaction, mobile containment and a brittle legacy asset pipeline.

The subsequent visual audit found that the content redesign had overcorrected. Several legacy plates carried stronger illustration, hierarchy and memorability than the generated replacements. The approved direction is therefore selective restoration and refinement rather than universal SVG simplification.

The current system keeps the stronger Issue #5 product shell while allowing approved illustrated masters to be first-class production assets.
