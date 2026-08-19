import { cp, mkdir, rm, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderVisualGuides, visualGuideFiles } from './render-visual-guides.mjs';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const pages=['index.html','regions.html','systems.html','land.html','visuals.html','plan.html'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of [...pages, 'styles.css', 'app.js']) {
  await cp(resolve(root, file), resolve(dist, file));
}
await cp(resolve(root, 'src'), resolve(dist, 'src'), { recursive: true });

const rendered=await renderVisualGuides(dist);
for (const file of visualGuideFiles) await access(resolve(dist, 'assets', 'visual-guides', file));
if(rendered.length!==9) throw new Error(`Expected 9 canonical field-atlas plates, rendered ${rendered.length}.`);

console.log(`Rendered ${rendered.length} canonical SVG field-atlas plates.`);
console.log(`Built ${pages.length} focused Demeter pages → dist/`);
