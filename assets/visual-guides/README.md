# Field Atlas asset policy

The live Field Atlas plates are generated as canonical SVG files during `npm run build` by `scripts/render-visual-guides.mjs`.

This directory may retain raster references from earlier visual-development passes, but those files are **source/archive material only** and are not copied into `dist/` or referenced by the live application.

Runtime asset names are:

- `region-comparison.svg`
- `blueprint-3-acre.svg`
- `blueprint-10-acre.svg`
- `blueprint-20-acre.svg`
- `independence-spectrum.svg`
- `homestead-systems.svg`
- `food-production-pathways.svg`
- `homestead-year-southwest-ontario.svg`
- `homestead-year-coastal-bc.svg`

The generated SVG system deliberately keeps all nine plates in one publication grammar and guarantees the 3 / 10 / 20-acre blueprints use one shared template rather than diverging raster treatments.
