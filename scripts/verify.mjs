import { readFile } from 'node:fs/promises';

const paths=['index.html','regions.html','systems.html','land.html','visuals.html','plan.html','styles.css','app.js','src/app-v2.js','src/a11y.js','src/view.js','src/regions.js','src/land.js','src/v2.css','src/polish.css','src/navigation.css','src/visuals.js','src/visual-guides.css'];
const files=await Promise.all(paths.map(async path=>[path,await readFile(new URL(`../${path}`,import.meta.url),'utf8')]));
const source=Object.fromEntries(files),failures=[];const check=(condition,message)=>{if(!condition)failures.push(message);};

check(source['app.js'].includes("import('./src/app-v2.js')")&&source['app.js'].includes("import('./src/a11y.js')")&&source['app.js'].includes("import('./src/visuals.js')"),'Progressive enhancement loaders missing');
check(source['src/view.js'].includes('id="fit"')&&source['src/view.js'].includes('id="production"')&&source['src/view.js'].includes('id="acquire"'),'V2 core sections missing');
check(source['src/land.js'].includes("3:{")&&source['src/land.js'].includes("10:{")&&source['src/land.js'].includes("20:{"),'Distinct acreage models missing');
check(source['src/regions.js'].includes('ECCC · London normals')&&source['src/regions.js'].includes('TransLink · West Coast Express'),'Current evidence sources missing');
check(source['src/app-v2.js'].includes('PAGE_SECTIONS')&&source['src/app-v2.js'].includes('homeGateway'),'Focused workspace IA missing');
check(['home','regions','systems','land','visuals','plan'].every(page=>source[page==='home'?'index.html':`${page}.html`].includes(`data-page="${page}"`)),'Page identity hooks missing');
check(source['src/app-v2.js'].includes('keyboardTabs')&&source['src/app-v2.js'].includes('score(key)'),'Planner or keyboard interaction missing');
check(source['src/a11y.js'].includes("role','tabpanel")&&source['src/a11y.js'].includes("role','tab'"),'Tab semantics hardening missing');
check(source['src/visuals.js'].includes('beginPinch')&&source['src/visuals.js'].includes('pointers.size===2')&&source['src/visuals.js'].includes('double-tap'),'Pinch/double-tap visual gestures missing');
check(source['src/visual-guides.css'].includes('touch-action:none')&&source['src/visual-guides.css'].includes('.touch-hint'),'Gesture surface or touch guidance missing');
check(source['src/visuals.js'].includes('data-zoom="in"')&&source['src/visuals.js'].includes('data-zoom="out"'),'Accessible single-pointer zoom alternatives missing');
check(source['src/v2.css'].includes('@media(prefers-reduced-motion:reduce)')&&source['src/visual-guides.css'].includes('@media(prefers-reduced-motion:reduce)'),'Reduced-motion adaptation missing');
check(source['src/v2.css'].includes('@media(forced-colors:active)')&&source['src/polish.css'].includes('@media(forced-colors:active)'),'Forced-colors adaptation missing');
check(source['src/v2.css'].includes('min-height:44px')&&source['src/polish.css'].includes('min-height:44px'),'44px touch target floor missing');
check(source['src/polish.css'].includes('grid-template-columns:minmax(0,1fr)')&&source['src/polish.css'].includes('.two>*{min-width:0}'),'Mobile intrinsic-width containment missing');
check(source['src/navigation.css'].includes('.route-grid')&&source['src/navigation.css'].includes('aria-current'),'Workspace navigation styling missing');
check(!Object.values(source).some(text=>text.includes('transition:width')),'Width animation found');
check(!Object.values(source).some(text=>/outline\s*:\s*none/.test(text)),'Focus outline suppression found');
check(source['src/polish.css'].includes('--dm-faint:#5f6a63')&&source['src/polish.css'].includes('box-shadow:0 0 0 6px #142019'),'Final contrast/focus correction missing');
check(source['src/view.js'].includes('Research refresh: 2026-08-19'),'Research refresh date missing');
for(const [path,text] of files.filter(([p])=>p.endsWith('.js')))check(!text.includes('TODO'),`${path}: unresolved TODO`);

if(failures.length){console.error(`Verification failed (${failures.length}):`);failures.forEach(f=>console.error(`- ${f}`));process.exit(1);}
console.log('Verification passed: product, workspace IA, evidence, accessibility, gestures, responsive and resilience invariants present.');
