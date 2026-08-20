import { cp, mkdir, rm, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderVisualGuides, visualGuideFiles } from './render-visual-guides.mjs';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const pages=['index.html','regions.html','systems.html','land.html','visuals.html','plan.html','visual-audit.html'];
const approvedRasterPlates=[
  'region-comparison.png',
  'independence-spectrum.png',
  'homestead-systems.png',
  'homestead-year-southwest-ontario.png',
  'homestead-year-coastal-bc.png'
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of [...pages, 'styles.css', 'app.js']) {
  await cp(resolve(root, file), resolve(dist, file));
}
await cp(resolve(root, 'src'), resolve(dist, 'src'), { recursive: true });

const rendered=await renderVisualGuides(dist);
for (const file of visualGuideFiles) await access(resolve(dist, 'assets', 'visual-guides', file));
if(rendered.length!==9) throw new Error(`Expected 9 canonical field-atlas plates, rendered ${rendered.length}.`);

// The generated SVGs remain stable fallbacks. Copy the explicitly approved
// illustrated source masters alongside them; runtime selection happens via
// `src/approved-visuals.js` so the PNG bytes are served directly, not re-encoded.
const liveVisualDir=resolve(dist,'assets','visual-guides');
for(const file of approvedRasterPlates){
  await cp(resolve(root,'assets','visual-guides',file),resolve(liveVisualDir,file));
  await access(resolve(liveVisualDir,file));
}

// Temporary visual-audit workspace: preserve the pre-Issue-5 bundle and the
// surviving 10-acre source variants so the user can continue comparing the
// remaining acreage / food implementation without affecting the live atlas.
await cp(resolve(root,'demeter-visual-guides-assets.zip'),resolve(dist,'demeter-visual-guides-assets.zip'));
const auditSource=resolve(dist,'assets','visual-audit-source');
await mkdir(auditSource,{recursive:true});
for(const [from,to] of [
  ['assets/visual-guides/blueprint-10-acre.png','blueprint-10-acre.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-a.png','blueprint-10-acre-alt-a.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-b.png','blueprint-10-acre-alt-b.png']
]) await cp(resolve(root,from),resolve(auditSource,to));

console.log(`Rendered ${rendered.length} canonical SVG field-atlas fallbacks.`);
console.log(`Copied ${approvedRasterPlates.length} approved illustrated masters.`);
console.log(`Built ${pages.length} Demeter pages → dist/`);
