import { cp, mkdir, rm, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderVisualGuides, visualGuideFiles } from './render-visual-guides.mjs';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const pages=['index.html','regions.html','systems.html','land.html','visuals.html','plan.html','visual-audit.html'];
const approvedRasterPlates=[
  'blueprint-3-acre-landscape.png',
  'blueprint-10-acre-landscape.png',
  'blueprint-20-acre-landscape.png',
  'blueprint-3-acre-portrait.png',
  'blueprint-10-acre-portrait.png',
  'blueprint-20-acre-portrait.png',
  'food-production-pathways.png',
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
if(rendered.length!==9) throw new Error(`Expected 9 canonical field-atlas fallback plates, rendered ${rendered.length}.`);

// Keep deterministic SVG fallbacks, then copy every approved illustrated
// master used by the responsive runtime into the same built asset directory.
const liveVisualDir=resolve(dist,'assets','visual-guides');
for(const file of approvedRasterPlates){
  await cp(resolve(root,'assets','visual-guides',file),resolve(liveVisualDir,file));
  await access(resolve(liveVisualDir,file));
}

// The legacy bundle remains audit-only. It is no longer needed to supply any
// live Field Atlas artwork.
const legacyBundle=resolve(root,'assets','visual-guides-source','legacy','demeter-visual-guides-assets.zip');
await cp(legacyBundle,resolve(dist,'demeter-visual-guides-assets.zip'));
const auditSource=resolve(dist,'assets','visual-audit-source');
await mkdir(auditSource,{recursive:true});
for(const [from,to] of [
  ['assets/visual-guides/blueprint-10-acre-landscape.png','blueprint-10-acre.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-a.png','blueprint-10-acre-alt-a.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-b.png','blueprint-10-acre-alt-b.png']
]) await cp(resolve(root,from),resolve(auditSource,to));

console.log(`Rendered ${rendered.length} canonical SVG field-atlas fallbacks.`);
console.log(`Prepared ${approvedRasterPlates.length} approved illustrated masters.`);
console.log(`Built ${pages.length} Demeter pages → dist/`);
