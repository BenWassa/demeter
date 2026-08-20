import { cp, mkdir, rm, access, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { inflateRawSync } from 'node:zlib';
import { renderVisualGuides, visualGuideFiles } from './render-visual-guides.mjs';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const pages=['index.html','regions.html','systems.html','land.html','visuals.html','plan.html','visual-audit.html','review-new4.html'];
const approvedRasterPlates=[
  'blueprint-10-acre.png',
  'region-comparison.png',
  'independence-spectrum.png',
  'homestead-systems.png',
  'homestead-year-southwest-ontario.png',
  'homestead-year-coastal-bc.png'
];

function findZipEntry(buffer,target){
  let eocd=-1;
  for(let i=buffer.length-22;i>=Math.max(0,buffer.length-65557);i--){
    if(buffer.readUInt32LE(i)===0x06054b50){eocd=i;break;}
  }
  if(eocd<0) throw new Error('ZIP end record not found');
  const count=buffer.readUInt16LE(eocd+10);
  let offset=buffer.readUInt32LE(eocd+16);
  for(let i=0;i<count;i++){
    if(buffer.readUInt32LE(offset)!==0x02014b50) throw new Error('Invalid ZIP directory');
    const method=buffer.readUInt16LE(offset+10);
    const compressedSize=buffer.readUInt32LE(offset+20);
    const nameLength=buffer.readUInt16LE(offset+28);
    const extraLength=buffer.readUInt16LE(offset+30);
    const commentLength=buffer.readUInt16LE(offset+32);
    const localOffset=buffer.readUInt32LE(offset+42);
    const name=buffer.subarray(offset+46,offset+46+nameLength).toString('utf8');
    if(name===target||name.endsWith(`/${target}`)) return {name,method,compressedSize,localOffset};
    offset+=46+nameLength+extraLength+commentLength;
  }
  throw new Error(`ZIP entry not found: ${target}`);
}

async function extractZipEntry(zipPath,target,destination){
  const buffer=await readFile(zipPath);
  const entry=findZipEntry(buffer,target);
  const local=entry.localOffset;
  if(buffer.readUInt32LE(local)!==0x04034b50) throw new Error('Invalid ZIP local header');
  const nameLength=buffer.readUInt16LE(local+26);
  const extraLength=buffer.readUInt16LE(local+28);
  const start=local+30+nameLength+extraLength;
  const compressed=buffer.subarray(start,start+entry.compressedSize);
  const bytes=entry.method===0?compressed:entry.method===8?inflateRawSync(compressed):null;
  if(!bytes) throw new Error(`Unsupported ZIP compression ${entry.method}`);
  await writeFile(destination,bytes);
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of [...pages, 'styles.css', 'app.js']) {
  await cp(resolve(root, file), resolve(dist, file));
}
for(const file of [
  'file_000000008bd0820cb4cdc6496aa6dfb6.png',
  'file_00000000ba3c820c944db9b352208891.png',
  'file_00000000d11881fb802059881cb96426.png',
  'file_00000000f2f081f7a7a20a7d178f6e50.png'
]) await cp(resolve(root,file),resolve(dist,file));
await cp(resolve(root, 'src'), resolve(dist, 'src'), { recursive: true });

const rendered=await renderVisualGuides(dist);
for (const file of visualGuideFiles) await access(resolve(dist, 'assets', 'visual-guides', file));
if(rendered.length!==9) throw new Error(`Expected 9 canonical field-atlas plates, rendered ${rendered.length}.`);

// Generated SVGs remain deterministic fallbacks. Copy the explicitly approved
// illustrated masters alongside them; runtime selection happens in
// `src/approved-visuals.js`.
const liveVisualDir=resolve(dist,'assets','visual-guides');
for(const file of approvedRasterPlates){
  await cp(resolve(root,'assets','visual-guides',file),resolve(liveVisualDir,file));
  await access(resolve(liveVisualDir,file));
}

// The approved 3-acre raster master is retained inside the original visual
// bundle. Extract that one known-good plate into the built site rather than
// publishing the schematic SVG fallback.
const legacyBundle=resolve(root,'demeter-visual-guides-assets.zip');
await extractZipEntry(legacyBundle,'blueprint-3-acre.webp',resolve(liveVisualDir,'blueprint-3-acre.webp'));
await access(resolve(liveVisualDir,'blueprint-3-acre.webp'));

// Temporary visual-audit workspace: preserve the pre-Issue-5 bundle and the
// surviving 10-acre source variants so the user can continue comparing the
// remaining acreage / food implementation without affecting the live atlas.
await cp(legacyBundle,resolve(dist,'demeter-visual-guides-assets.zip'));
const auditSource=resolve(dist,'assets','visual-audit-source');
await mkdir(auditSource,{recursive:true});
for(const [from,to] of [
  ['assets/visual-guides/blueprint-10-acre.png','blueprint-10-acre.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-a.png','blueprint-10-acre-alt-a.png'],
  ['assets/visual-guides-source/blueprint-10-acre-alt-b.png','blueprint-10-acre-alt-b.png']
]) await cp(resolve(root,from),resolve(auditSource,to));

console.log(`Rendered ${rendered.length} canonical SVG field-atlas fallbacks.`);
console.log(`Prepared ${approvedRasterPlates.length+1} approved illustrated masters.`);
console.log(`Built ${pages.length} Demeter pages → dist/`);
