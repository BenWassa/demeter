# Field Atlas asset policy

The live Field Atlas keeps a stable nine-file SVG runtime contract, but the source of each plate may differ.

Five plates now use user-approved illustrated PNG masters. During `npm run build`, `scripts/build.mjs` embeds those PNGs losslessly inside self-contained SVG wrappers at the existing runtime filenames. This preserves the approved artwork exactly while keeping the atlas viewer, tests and URLs stable.

Approved illustrated masters:

- `region-comparison.png` → `region-comparison.svg`
- `independence-spectrum.png` → `independence-spectrum.svg`
- `homestead-systems.png` → `homestead-systems.svg`
- `homestead-year-southwest-ontario.png` → `homestead-year-southwest-ontario.svg`
- `homestead-year-coastal-bc.png` → `homestead-year-coastal-bc.svg`

The remaining live plates are generated directly as SVG by `scripts/render-visual-guides.mjs`:

- `blueprint-3-acre.svg`
- `blueprint-10-acre.svg`
- `blueprint-20-acre.svg`
- `food-production-pathways.svg`

The renderer still produces all nine generated plates first so they remain available as deterministic references and fallbacks. The approved remakes then replace only the five explicitly selected plates in the build output.

Do not replace an approved illustrated master merely to force every plate through one renderer. Publication consistency comes from typography, palette, information hierarchy, restrained framing and family-level conventions; useful illustration and strong composition should be preserved.

The Land / Food audit choices are already recorded. Their final source assets and responsive variants remain a separate implementation step; the temporary visual-audit bundle and 10-acre alternatives stay available until that work is complete.
