# Field Atlas asset policy

`assets/visual-guides/` is the canonical home for approved/current infographic artwork. Infographic uploads and source bundles must not remain at repository root.

## Current infographic masters

### Blueprint — landscape family

- `blueprint-3-acre-landscape.png`
- `blueprint-10-acre-landscape.png`
- `blueprint-20-acre-landscape.png`

### Blueprint — portrait family

- `blueprint-3-acre-portrait.png`
- `blueprint-10-acre-portrait.png`
- `blueprint-20-acre-portrait.png`

The live runtime uses landscape blueprint masters on larger viewports and the portrait family at `720px` and below.

### Food

- `food-production-pathways.png`

### Other approved Field Atlas masters

- `region-comparison.png`
- `independence-spectrum.png`
- `homestead-systems.png`
- `homestead-year-southwest-ontario.png`
- `homestead-year-coastal-bc.png`

## Source / archive assets

Superseded, rejected, or comparison-only variants belong under `assets/visual-guides-source/`, not beside current masters and never at repository root. Superseded blueprint uploads are retained under `assets/visual-guides-source/archive/` with descriptive filenames. The legacy visual-guide bundle lives under `assets/visual-guides-source/legacy/`.

## Runtime policy

Generated SVG plates remain deterministic fallbacks. `src/approved-visuals.js` selects the approved illustrated masters for live rendering while preserving the SVG source contract as a resilient fallback.

The current live atlas includes all nine subjects. The 3 / 10 / 20-acre blueprints and Food Production Pathways are no longer suppressed or supplied by legacy raster artwork.

Do not replace a stronger approved illustrated master merely to force every plate through one renderer. Publication consistency comes from typography, palette, information hierarchy, restrained framing, and family-level conventions.

## Upload rule

When new infographic binaries are uploaded through GitHub and arrive with opaque `file_...` names:

1. visually identify the asset before renaming;
2. move approved/current artwork into `assets/visual-guides/` with a descriptive canonical filename;
3. move genuinely useful superseded variants into `assets/visual-guides-source/archive/` or delete them if they have no reference value;
4. leave no infographic image binaries or source bundles at repository root.
