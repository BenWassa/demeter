# Project Demeter — Field Atlas visual system

**Status:** canonical publication system  
**Established:** 2026-08-19  
**Scope:** `visuals.html`, `src/visuals.js`, `src/visual-guides.css`, generated plates under `dist/assets/visual-guides/`

## Thesis

The Field Atlas is a **modern Canadian field-reference publication**, not an image gallery.

Every plate should look as if it was commissioned for the same issue of the same publication. Information complexity may increase when the subject demands it; graphic ornament does not.

The newest clean blueprint treatment is the visual master: warm paper, restrained title block, dominant information graphic, a narrow notes / legend area, real labels and rules, and only enough illustration to improve comprehension.

## Publication grammar

All canonical plates use:

- warm off-white `Paper` background;
- green-black `Ink` typography;
- restrained Spruce, Moss, Lake, Soil and Harvest semantic accents;
- a simple top title / deck block;
- one dominant information graphic;
- a narrow notes / legend column where useful;
- thin rules instead of ornamental frames;
- explicit labels rather than decorative symbols;
- one quiet source / caveat line at the bottom.

The runtime assets are SVGs generated from `scripts/render-visual-guides.mjs`. This makes the publication grammar explicit in code and prevents individual plates from drifting into unrelated poster styles.

## Atlas information architecture

The library is grouped by the question the visual answers:

1. **Place** — Which regional trade-offs change where the homestead should be?
2. **Land** — How does useful acreage change layout, options and maintenance burden?
3. **Systems** — What must keep working, and what kind of resilience helps?
4. **Food** — How far should production deepen before it becomes an operation?
5. **Seasons** — When do workload and household-system criticality stack up?

Desktop uses a curated editorial layout. Mobile keeps the five groups but turns each group into a horizontal snap rail, preventing the page from becoming one long undifferentiated stack.

## Image and viewer contract

- Preserve every plate's natural aspect ratio in the library.
- Never force `object-fit: cover` or arbitrary card aspect ratios on infographic content.
- Full-screen viewer behaviour remains part of the product contract:
  - pinch to zoom on touch;
  - one-finger pan when magnified;
  - double-tap zoom / reset;
  - wheel and keyboard zoom;
  - explicit `+`, `−` and Reset controls;
  - `0` reset shortcut;
  - focus restoration to the opening plate after close.

## Plate-specific rules

### Blueprints — 3 / 10 / 20 acres

All three use the same renderer and the same template. Only land-use complexity changes.

Required semantics:

- house / serviced core;
- food-production zones;
- field / livestock zones where appropriate;
- woodlot / privacy;
- well / potable-water path in Lake blue;
- wastewater path / reserve in blue-grey-purple;
- dashed reserve / future boundaries;
- all-season road;
- restrained orientation / approximate scale reference;
- explicit conceptual-plan caveat.

The 20-acre plate is a true standalone replacement, not the previously suppressed incorrect raster.

### Region comparison

The comparison itself dominates. Use aligned region columns and shared decision rows. Decorative atlas framing, fake map ornament and poster-like embellishment are out.

### Independence spectrum

Keep three variables separate:

- utility independence;
- operating burden;
- resilience potential.

Do not collapse them into one score. Do not use gauges, rings or faux-scientific dials.

### Homestead systems

Show water, wastewater, power and heat as dependency chains. Keep normal operating flow visually separate from the resilience move. Scanability is more important than showing every possible component.

### Food production pathways

Use a branching operating pathway rather than botanical / vintage-poster illustration. Progression means deeper infrastructure and daily commitment; it is not a lifestyle status ladder.

### Homestead year

The seasonal plates use a monthly timeline with two explicitly named ordinal measures:

- **Labour intensity** — routine workload in the month;
- **Systems criticality** — consequence / urgency of system failure.

Use bars and labels. No speedometers, gauges or other instrument metaphors that imply precision the model does not have.

## Anti-drift rules

Reject:

- ornamental mastheads;
- fake vintage-cartography framing;
- oversized compass roses or sun arcs;
- faux survey contours;
- meaningless gauges, speedometers, progress rings or radar forms;
- decorative botanical illustration that competes with pathway logic;
- arbitrary crops of information graphics;
- separate visual languages for individual plates;
- adding decoration because a subject has more information.

## Audit result for Issue #5

The previous set mixed a dark generic gallery with raster plates from several stylistic generations. The main publication problems were:

- forced 4:5 / 3:2 card crops;
- no editorial grouping;
- a corrected 10-acre raster patched after module import;
- a known-wrong 20-acre plate hidden at runtime;
- older plates using poster, vintage-botanical and gauge metaphors inconsistent with Demeter's information-design rules;
- a build pipeline tied to an opaque legacy ZIP bundle.

Issue #5 replaces that runtime system with nine canonical SVG plates, one source-controlled visual grammar, explicit publication groups, natural-ratio rendering and stronger browser tests.
