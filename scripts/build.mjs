import { cp, mkdir, rm, access, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { renderVisualGuides, visualGuideFiles } from './render-visual-guides.mjs';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const pages=['index.html','regions.html','systems.html','land.html','visuals.html','plan.html','visual-audit.html'];

const approvedRasterPlates=[
  ['region-comparison.svg','region-comparison.png'],
  ['independence-spectrum.svg','independence-spectrum.png'],
  ['homestead-systems.svg','homestead-systems.png'],
  ['homestead-year-southwest-ontario.svg','homestead-year-southwest-ontario.png'],
  ['homestead-year-coastal-bc.svg','homestead-year-coastal-bc.png']
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

// Five user-approved illustrated masters intentionally replace the generated
// Issue #5 versions. Wrap each source PNG in a self-contained SVG so the live
// atlas keeps one stable runtime contract while preserving the approved pixels
// exactly and avoiding external-resource restrictions inside <img>-loaded SVGs.
const liveVisualDir=resolve(dist,'assets','visual-guides');
for(const [runtimeName,sourceName] of approvedRasterPlates){
  const bytes=await readFile(resolve(root,'assets','visual-guides',sourceName));
  if(!(bytes[0]===0x89&&bytes[1]===0x50&&bytes[2]===0x4e&&bytes[3]===0x47)) throw new Error(`${sourceName} is not a PNG source master.`);
  const data=bytes.toString('base64');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024"><image width="1536" height="1024" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${data}"/></svg>`;
  await writeFile(resolve(liveVisualDir,runtimeName),svg,'utf8');
}

// Temporary visual-audit workspace: preserve the pre-Issue-5 bundle and the
// surviving 10-acre source variants so the user can continue comparing the
// remaining acreage / food decisions without affecting the live atlas.
await cp(resolve(root,'demeter-visual-guides-assets.zip'),resolve(dist,'demeter-visual-guides-assets.zip'));
const auditSource=resolve(dist,'assets','visual-audit-source');
await mkdir(auditSource,{recursive:true});
for(const [from,to] of [
  ['assets/visual-guides/blueprint-10-acre.png','blueprint-10-acre.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-a.png','blueprint-10-acre-alt-a.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-b.png','blueprint-10-acre-alt-b.png']
]) await cp(resolve(root,from),resolve(auditSource,to));

console.log(`Rendered ${rendered.length} canonical SVG field-atlas plates.`);
console.log(`Applied ${approvedRasterPlates.length} approved illustrated remakes.`);
console.log(`Built ${pages.length} Demeter pages → dist/`);
