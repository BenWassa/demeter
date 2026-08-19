import { cp, mkdir, rm, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderVisualGuides, visualGuideFiles } from './render-visual-guides.mjs';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const pages=['index.html','regions.html','systems.html','land.html','visuals.html','plan.html','visual-audit.html'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of [...pages, 'styles.css', 'app.js']) {
  await cp(resolve(root, file), resolve(dist, file));
}
await cp(resolve(root, 'src'), resolve(dist, 'src'), { recursive: true });

const rendered=await renderVisualGuides(dist);
for (const file of visualGuideFiles) await access(resolve(dist, 'assets', 'visual-guides', file));
if(rendered.length!==9) throw new Error(`Expected 9 canonical field-atlas plates, rendered ${rendered.length}.`);

// Temporary visual-audit workspace: preserve the pre-Issue-5 bundle and the
// surviving 10-acre source variants so the user can compare before/current
// work without putting legacy assets back into the live Field Atlas.
await cp(resolve(root,'demeter-visual-guides-assets.zip'),resolve(dist,'demeter-visual-guides-assets.zip'));
const auditSource=resolve(dist,'assets','visual-audit-source');
await mkdir(auditSource,{recursive:true});
for(const [from,to] of [
  ['assets/visual-guides/blueprint-10-acre.png','blueprint-10-acre.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-a.png','blueprint-10-acre-alt-a.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-b.png','blueprint-10-acre-alt-b.png']
]) await cp(resolve(root,from),resolve(auditSource,to));

console.log(`Rendered ${rendered.length} canonical SVG field-atlas plates.`);
console.log(`Built ${pages.length} Demeter pages → dist/`);
