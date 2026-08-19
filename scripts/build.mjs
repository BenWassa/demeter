import { cp, mkdir, rm, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const visualBundle = resolve(root, 'demeter-visual-guides-assets.zip');
const sourceVisualDir = resolve(root, 'assets', 'visual-guides');
const visualFiles = [
  'region-comparison.webp',
  'blueprint-3-acre.webp',
  'blueprint-10-acre.webp',
  'blueprint-20-acre.webp',
  'independence-spectrum.webp',
  'homestead-systems.webp',
  'food-production-pathways.webp',
  'homestead-year-southwest-ontario.webp',
  'homestead-year-coastal-bc.webp'
];
const overlayVisualFiles = ['blueprint-10-acre.png'];
const pages=['index.html','regions.html','systems.html','land.html','visuals.html','plan.html'];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of [...pages, 'styles.css', 'app.js']) {
  await cp(resolve(root, file), resolve(dist, file));
}
await cp(resolve(root, 'src'), resolve(dist, 'src'), { recursive: true });

try {
  await access(visualBundle);
  await execFileAsync('unzip', ['-q', '-o', visualBundle, '-d', dist]);
  for (const file of visualFiles) await access(resolve(dist, 'assets', 'visual-guides', file));
  for (const file of overlayVisualFiles) {
    await access(resolve(sourceVisualDir, file));
    await cp(resolve(sourceVisualDir, file), resolve(dist, 'assets', 'visual-guides', file));
    await access(resolve(dist, 'assets', 'visual-guides', file));
  }
  console.log(`Included ${visualFiles.length} base visual-guide assets + ${overlayVisualFiles.length} corrected blueprint override.`);
} catch (error) {
  console.error('Visual guide assets are missing, invalid, or could not be prepared.', error);
  process.exitCode = 1;
  throw error;
}

console.log(`Built ${pages.length} focused Demeter pages → dist/`);
