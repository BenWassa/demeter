# Field Atlas asset policy

The live Field Atlas keeps stable generated SVG fallback URLs, while explicitly approved illustrated PNG masters can be preferred at runtime.

Five plates now use user-approved PNG masters. During `npm run build`, `scripts/build.mjs` copies those PNGs into `dist/assets/visual-guides/` alongside the generated SVG fallbacks. `src/approved-visuals.js` selects the PNGs for actual rendering without replacing the stable SVG `src` contract.

Approved illustrated masters:

- `region-comparison.png`
- `independence-spectrum.png`
- `homestead-systems.png`
- `homestead-year-southwest-ontario.png`
- `homestead-year-coastal-bc.png`

The remaining live plates are still generated directly as SVG by `scripts/render-visual-guides.mjs`:

- `blueprint-3-acre.svg`
- `blueprint-10-acre.svg`
- `blueprint-20-acre.svg`
- `food-production-pathways.svg`

The renderer continues to produce all nine SVG plates as deterministic fallbacks. The five audited PNG masters are copied and preferred only where the user explicitly selected replacement artwork.

Do not replace an approved illustrated master merely to force every plate through one renderer. Publication consistency comes from typography, palette, information hierarchy, restrained framing and family-level conventions; useful illustration and strong composition should be preserved.

The Land / Food audit choices are already recorded. Their final source assets and responsive variants remain a separate implementation step; the temporary visual-audit bundle and 10-acre alternatives stay available until that work is complete.
