# Project Demeter — Design Direction

## Design Thesis

**Demeter is a modern Canadian field atlas.**

The visual world combines three sources that belong to the subject:

1. **Documentary landscape photography** — the life should feel tangible, seasonal, inhabited, and Canadian.
2. **Land-survey precision** — measurements, regions, acreage, systems, and access should feel mapped rather than decorated.
3. **Agricultural field-guide clarity** — dense practical knowledge should remain readable, calm, and trustworthy.

The interface should feel like something between a beautifully produced field atlas, a serious rural planning notebook, and a contemporary public-interest data publication.

It should never feel like a prepper website, a generic SaaS dashboard, a luxury real-estate brochure, or cottagecore lifestyle content.

## Surface Modes

Demeter uses different visual intensity according to the job of the surface.

### Home and regional openings — Persuade / Experience

The first viewport earns emotional attention through real landscape imagery, spatial composition, and one clear thesis. It should make the user want to step into the place and then immediately reveal the planning reality underneath.

### Planner and comparison — Operate

Controls, aligned data, selections, and recommendations become quieter and more systematic. Familiar interaction patterns are a feature. Decoration recedes.

### Systems and guidance — Read

Long-form explanation uses strong editorial hierarchy, diagrams, and constrained reading measure. The user should be able to understand a system without feeling they entered a technical manual.

### Blueprint Lab — Operate / Experience

The land plan is the visual subject. Technical geometry is appropriate here because the product is literally communicating spatial relationships.

## Core Visual Motif

### The surveyed landscape

Photography and planning information coexist in one frame.

A strong Demeter composition often contains:

- a real landscape or property image;
- a precise line, rule, coordinate, distance, acreage, or label;
- restrained supporting copy;
- one dominant decision or place.

Survey language must carry meaning. Do not scatter contour lines, map grids, coordinates, compass marks, or blueprint textures as generic “outdoors” decoration.

## First Homepage Concept

The homepage should open on a cinematic rural scene under a restrained dark overlay.

The first viewport contains:

- DEMETER wordmark / project name;
- the line **“A field atlas for the life you want to build.”**;
- one compact statement explaining that the product connects region, land, systems, and roadmap;
- two actions: **Explore regions** and **Shape my homestead**;
- a narrow “survey plate” showing the current seed scenario: 8–20 useful acres, ≤30 min to essentials, remote-first, grid-optional.

Below the fold, the page changes register from aspiration to analysis rather than repeating another hero.

Recommended sequence:

1. Hero / thesis
2. Region comparison strip
3. System stack explainer
4. 10-acre blueprint
5. Transition roadmap
6. Source / research promise

## Typography

The product has an editorial layer and an operational layer.

### Display / editorial

Use **Newsreader** for large hero and editorial headings.

Character: humane, literary, grounded, contemporary rather than rustic.

Use only where expression helps comprehension: hero, region title, major reading headings.

### UI / body

Use **IBM Plex Sans** for navigation, controls, body copy, comparison data, labels, and system explanations.

Character: precise, neutral, legible, with enough technical credibility for planning information.

### Measurement

Use **IBM Plex Mono** only for true measurement, coordinates, source dates, acreage callouts, or tabular technical values. Never use monospace as a general “technical aesthetic.”

### Scale

- Hero display: fluid only on Persuade / Experience surfaces, maximum 5.5rem.
- Product page title: 2–2.75rem.
- Section title: 1.65–2rem.
- Body: 1rem–1.1rem.
- Metadata: 0.75–0.875rem; never below 0.75rem.
- Prose measure: approximately 65–75 characters.

Headings should use balanced wrapping where supported. Tracking should never be tighter than -0.04em.

## Color System

The palette is derived from Canadian rural landscapes rather than generic “eco green.”

### Core

- **Paper** `#F1EEE4` — primary daylight canvas.
- **Ink** `#142019` — primary text; green-black rather than pure black.
- **Spruce** `#1F4337` — primary action / selected state.
- **Moss** `#667762` — secondary natural information.
- **Lake** `#58747A` — water, climate, and cool secondary data.
- **Soil** `#8A5038` — land, construction, warning-adjacent emphasis.
- **Harvest** `#C3A15B` — restrained highlight / seasonal annotation.
- **Mist** `#D9DED5` — rules, secondary surfaces, inactive structure.
- **Snow** `#FAF9F4` — raised reading surface.

### Rules

- Ink on Paper is the default reading combination.
- Spruce is reserved for primary actions, selection, and meaningful state.
- Lake, Soil, and Harvest should communicate domain meaning where possible, not decorate arbitrary sections.
- Never use gray text on saturated colored backgrounds; secondary text should be tinted from the same hue family.
- No gradient text.
- Image overlays may use restrained gradients when needed for legibility because the gradient belongs to image treatment, not typography.

## Layout

### Overall

Use wide editorial margins, strong vertical rhythm, and visible alignment.

Desktop content width should generally cap around 1200–1320px, while reading copy remains much narrower.

### Structure

Prefer:

- ruled rows;
- comparison bands;
- split editorial compositions;
- image + data pairings;
- legends;
- inline notes;
- true diagrams.

Avoid using repeated same-size cards as the page skeleton.

Cards are acceptable only when the contained object genuinely behaves like an independent selectable unit.

### Borders and elevation

Demeter is primarily flat and printed in character.

- 1px rules do most separation work.
- Shadows are rare and reserved for genuine overlay/elevation.
- No border + large shadow “ghost cards.”
- Default radii: 0–8px for large structures; 999px only for compact chips/toggles where the pill form is semantically natural.

## Imagery

### Photography brief

Desired:

- Canadian rural landscapes;
- working properties rather than pristine vacation estates;
- visible weather and seasons;
- natural light;
- inhabited details without staged “farm influencer” styling;
- houses, fields, woodlots, greenhouses, workshops, barns, garden rows, winter heat, access roads.

Avoid:

- stock-photo handshake / family poses;
- luxury estate aerials as the dominant reference;
- hyper-saturated sunsets;
- generic cabins in untouched wilderness when the product scenario is town-accessible rural living;
- obvious survivalist imagery.

### Treatment

Let strong images stay photographic. Do not add grain, faux-film distress, torn-paper edges, doodles, or geometric cutouts by default.

Image captions and metadata may borrow field-atlas discipline: place, season, distance, acreage, or source.

## Interaction

### Controls

- Controls should say what happens: “Compare regions,” “View 10 acres,” “Show power system.”
- Standard buttons remain standard buttons.
- Selection must be obvious without depending on color alone.
- Keyboard focus must always be visible.
- Hover is enhancement, never the only cue.

### Motion

Motion is restrained and purposeful.

One authored expressive moment is enough on a page.

Candidates:

- subtle hero image settling / crop transition on initial load;
- blueprint zone linework appearing when a land-use layer is enabled;
- comparison row values sliding into aligned position when the region selection changes.

Routine product transitions: ~150–250ms.

No orchestrated fade-in sequence for every section. No bounce or elastic easing.

Respect `prefers-reduced-motion`.

## Blueprint Language

The Blueprint Lab is where technical graphic language becomes explicit.

### Visual grammar

- dark Spruce or deep Ink drawing field;
- pale Paper / Mist lines;
- Harvest or Lake as limited system-layer accents;
- crisp vector geometry;
- real dimensions and assumptions where known;
- simple label leaders;
- legend outside the drawing when mobile space is constrained.

A background grid is permitted because this is an actual measuring/planning surface.

### Spatial principle

The blueprint should teach relationships, for example:

- kitchen garden near the house;
- orchard beyond the intensive garden;
- septic field protected from traffic;
- well separated appropriately in the conceptual model;
- workshop accessible from drive;
- pasture and woodlot using larger peripheral zones;
- solar placed according to open sun exposure.

Authored layouts are illustrative, not site-engineering plans. State assumptions clearly.

## Region Visual System

Regions should not become identical cards with different photographs.

Each region page uses the same information architecture but lets local geography alter the composition.

Examples:

- Southwest Ontario: agricultural field geometry, road/town network, productive-land emphasis.
- Fraser Valley: mountain/valley compression, rain, ALR and city-access tension.
- Vancouver Island: forest/field edge, maritime climate, ferry/metro access tension.

Comparison surfaces normalize the data; detail surfaces can feel geographically distinct.

## Data Visualization

Use aligned comparisons before charts.

Preferred forms:

- dot plots;
- horizontal ranges;
- seasonal bands;
- small maps;
- aligned score rows with textual explanation;
- land-use area diagrams.

Avoid:

- decorative donut charts;
- progress rings;
- meaningless gauges;
- radar charts unless the user truly benefits from seeing multivariate shape.

## Accessibility Contract

- WCAG AA contrast minimum.
- Text over hero imagery must remain readable under worst-case crop.
- Minimum practical touch target ~44px.
- Full keyboard operation.
- `:focus-visible` treatment uses a clear Spruce/Harvest contrast depending on surface.
- Information encoded by color also carries labels, pattern, position, or text.
- Reduced-motion support.
- Region comparison and blueprint have linear equivalents for screen readers.
- Selected tabs/buttons expose state with appropriate ARIA where needed.

## Responsive Contract

### Mobile portrait

- Hero becomes a strong vertical composition; survey plate sits below the primary actions rather than floating over critical image content.
- Region comparison becomes a compact selection rail plus one active region detail at a time.
- System selectors become horizontally scrollable or wrap into two columns; details remain linear.
- Blueprint scales to viewport with a readable external legend and acreage switcher.
- No interaction requires hover.

### Tablet

- Split image/data layouts begin to appear.
- Blueprint may share space with its legend.

### Desktop

- Hero uses a controlled wide crop.
- Comparison rows show multiple regions simultaneously.
- Blueprint and narrative can form a 2-column planning desk.

### Short landscape

Do not simply compress the portrait stack. Hero height and blueprint layout should adapt structurally so primary controls remain visible.

## Browser Surfaces

The prototype and final product should deliberately style:

- text selection;
- focus rings;
- underline offset;
- numeric alignment / tabular figures;
- scrollbar only if a custom treatment is necessary and does not break native expectations.

## Anti-Patterns

Reject these unless a future brief specifically earns them:

- generic green gradient landing page;
- leaf icons as the brand;
- repeated rounded cards with icon + title + paragraph;
- cards nested inside cards;
- fake topo lines or blueprint grids outside a map/measurement context;
- glassmorphism;
- gradient text;
- excessive pills;
- large soft shadows around every surface;
- monospace everywhere;
- rustic script fonts;
- faux paper textures and coffee-stain “field notebook” cosplay;
- generic farm-stock photography;
- huge vanity metrics in the hero;
- “01 / 02 / 03” decorative section numbering;
- decorative motion on an operational surface.

## Prototype Quality Floor

The first prototype must include:

- real responsive behavior;
- hover/focus/selected states;
- working region and system controls;
- a meaningful blueprint rather than a placeholder box;
- reduced motion handling;
- semantic HTML;
- no framework dependency;
- no invented claims presented as current facts.

Illustrative planning values must be explicitly labeled as illustrative.

## Design Test

A screenshot should pass this question:

> Could this interface plausibly belong to a serious Canadian land-planning publication even if every leaf icon and sustainability cliché were removed?

If the answer is no, the design has drifted.
