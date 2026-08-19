import { readFile } from 'node:fs/promises';

const files = await Promise.all([
  'index.html','styles.css','app.js','src/app-v2.js','src/view.js','src/regions.js','src/land.js','src/v2.css'
].map(async path => [path, await readFile(new URL(`../${path}`, import.meta.url), 'utf8')]));
const source = Object.fromEntries(files);
const failures = [];
const check = (condition,message) => { if (!condition) failures.push(message); };

check(source['app.js'].includes("import('./src/app-v2.js')"), 'Progressive enhancement loader missing');
check(source['src/view.js'].includes('id="fit"') && source['src/view.js'].includes('id="production"') && source['src/view.js'].includes('id="acquire"'), 'V2 core sections missing');
check(source['src/land.js'].includes("3:{") && source['src/land.js'].includes("10:{") && source['src/land.js'].includes("20:{"), 'Distinct acreage models missing');
check(source['src/regions.js'].includes('ECCC · London normals') && source['src/regions.js'].includes('TransLink · West Coast Express'), 'Current evidence sources missing');
check(source['src/app-v2.js'].includes('keyboardTabs') && source['src/app-v2.js'].includes('score(key)'), 'Planner or keyboard interaction missing');
check(source['src/v2.css'].includes('@media(prefers-reduced-motion:reduce)'), 'Reduced-motion adaptation missing');
check(source['src/v2.css'].includes('@media(forced-colors:active)'), 'Forced-colors adaptation missing');
check(source['src/v2.css'].includes('min-height:44px'), '44px touch target floor missing');
check(!source['src/v2.css'].includes('transition:width'), 'Width animation found');
check(!Object.values(source).some(text => /outline\s*:\s*none/.test(text)), 'Focus outline suppression found');
check(source['src/view.js'].includes('Research refresh: 2026-08-19'), 'Research refresh date missing');

for (const [path,text] of files.filter(([p]) => p.endsWith('.js'))) {
  check(!text.includes('TODO'), `${path}: unresolved TODO`);
}

if (failures.length) {
  console.error(`Verification failed (${failures.length}):`);
  failures.forEach(f => console.error(`- ${f}`));
  process.exit(1);
}
console.log('Verification passed: product, evidence, accessibility and resilience invariants present.');
