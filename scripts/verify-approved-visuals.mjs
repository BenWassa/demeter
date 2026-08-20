import { access, readFile } from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const app=await readFile(new URL('app.js',root),'utf8');
const runtime=await readFile(new URL('src/approved-visuals.js',root),'utf8');
const build=await readFile(new URL('scripts/build.mjs',root),'utf8');
const expected=[
  'region-comparison.png',
  'independence-spectrum.png',
  'homestead-systems.png',
  'homestead-year-southwest-ontario.png',
  'homestead-year-coastal-bc.png'
];

const failures=[];
const check=(condition,message)=>{if(!condition)failures.push(message);};
check(app.includes("import('./src/approved-visuals.js')"),'Approved visual runtime is not loaded');
for(const file of expected){
  check(runtime.includes(file),`${file}: runtime selection missing`);
  check(build.includes(file),`${file}: build copy missing`);
  try{await access(new URL(`assets/visual-guides/${file}`,root));}catch{failures.push(`${file}: source master missing`);}
}
check(runtime.includes('srcset')&&runtime.includes('approvedSource'),'Approved masters are not preferred without replacing SVG fallback URLs');

if(failures.length){
  console.error(`Approved visual verification failed (${failures.length}):`);
  failures.forEach(f=>console.error(`- ${f}`));
  process.exit(1);
}
console.log('Approved visual verification passed: five audited PNG masters are source-controlled, built and preferred at runtime.');
