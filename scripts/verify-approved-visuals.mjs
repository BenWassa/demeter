import { access, readFile } from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const app=await readFile(new URL('app.js',root),'utf8');
const runtime=await readFile(new URL('src/approved-visuals.js',root),'utf8');
const build=await readFile(new URL('scripts/build.mjs',root),'utf8');
const directMasters=[
  'blueprint-10-acre.png',
  'region-comparison.png',
  'independence-spectrum.png',
  'homestead-systems.png',
  'homestead-year-southwest-ontario.png',
  'homestead-year-coastal-bc.png'
];
const bundledMasters=['blueprint-3-acre.webp'];

const failures=[];
const check=(condition,message)=>{if(!condition)failures.push(message);};
check(app.includes("import('./src/approved-visuals.js')"),'Approved visual runtime is not loaded');
for(const file of directMasters){
  check(runtime.includes(file),`${file}: runtime selection missing`);
  check(build.includes(file),`${file}: build copy missing`);
  try{await access(new URL(`assets/visual-guides/${file}`,root));}catch{failures.push(`${file}: source master missing`);}
}
for(const file of bundledMasters){
  check(runtime.includes(file),`${file}: runtime selection missing`);
  check(build.includes(file)&&build.includes('demeter-visual-guides-assets.zip'),`${file}: bundle extraction missing`);
}
check(runtime.includes('srcset')&&runtime.includes('approvedSource'),'Approved masters are not preferred without replacing SVG fallback URLs');
check(runtime.includes("new Set(['acre20','food'])"),'Known-unapproved 20-acre/Food placeholders are not suppressed');

if(failures.length){
  console.error(`Approved visual verification failed (${failures.length}):`);
  failures.forEach(f=>console.error(`- ${f}`));
  process.exit(1);
}
console.log('Approved visual verification passed: seven audited raster masters are built/preferred and known-unapproved placeholders are withheld.');
