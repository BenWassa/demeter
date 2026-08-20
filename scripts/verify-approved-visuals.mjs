import { access, readFile } from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const app=await readFile(new URL('app.js',root),'utf8');
const runtime=await readFile(new URL('src/approved-visuals.js',root),'utf8');
const build=await readFile(new URL('scripts/build.mjs',root),'utf8');
const landscapeMasters=[
  'blueprint-3-acre-landscape.png',
  'blueprint-10-acre-landscape.png',
  'blueprint-20-acre-landscape.png'
];
const portraitMasters=[
  'blueprint-3-acre-portrait.png',
  'blueprint-10-acre-portrait.png',
  'blueprint-20-acre-portrait.png'
];
const otherMasters=[
  'food-production-pathways.png',
  'region-comparison.png',
  'independence-spectrum.png',
  'homestead-systems.png',
  'homestead-year-southwest-ontario.png',
  'homestead-year-coastal-bc.png'
];
const directMasters=[...landscapeMasters,...portraitMasters,...otherMasters];

const failures=[];
const check=(condition,message)=>{if(!condition)failures.push(message);};
check(app.includes("import('./src/approved-visuals.js')"),'Approved visual runtime is not loaded');
for(const file of directMasters){
  check(runtime.includes(file),`${file}: runtime selection missing`);
  check(build.includes(file),`${file}: build copy missing`);
  try{await access(new URL(`assets/visual-guides/${file}`,root));}catch{failures.push(`${file}: source master missing`);}
}
check(runtime.includes('approvedVisualPortraitSources')&&runtime.includes('(max-width: 720px)'),'Responsive portrait blueprint selection missing');
check(runtime.includes('preferredVisualSource'),'Viewer does not resolve responsive approved sources');
check(!runtime.includes('suppressedVisuals'),'Approved 20-acre/Food plates are still suppressed');
check(runtime.includes('acre20')&&runtime.includes('food:'),'20-acre or Food approved source missing');
check(runtime.includes('srcset')&&runtime.includes('approvedSource'),'Approved masters are not preferred without retaining SVG fallbacks');

if(failures.length){
  console.error(`Approved visual verification failed (${failures.length}):`);
  failures.forEach(f=>console.error(`- ${f}`));
  process.exit(1);
}
console.log(`Approved visual verification passed: ${directMasters.length} responsive/current raster masters are built and available.`);
