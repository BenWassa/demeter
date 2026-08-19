const legacyRoutes = {
  '#fit': 'regions.html#fit',
  '#regions': 'regions.html#regions',
  '#systems': 'systems.html#systems',
  '#blueprint': 'land.html#blueprint',
  '#production': 'land.html#production',
  '#visual-atlas': 'visuals.html#visual-atlas',
  '#acquire': 'plan.html#acquire',
  '#roadmap': 'plan.html#roadmap'
};

const legacyTarget = document.body.dataset.page === 'home' ? legacyRoutes[window.location.hash] : null;
if (legacyTarget) {
  window.location.replace(legacyTarget);
} else {
  document.documentElement.classList.add('v2-loading');
  import('./src/app-v2.js')
    .then(() => import('./src/a11y.js'))
    .then(() => import('./src/visuals.js'))
    .then((visualModule) => {
      const correctedTenAcre = visualModule.visuals.find((visual) => visual.id === 'acre10');
      if (correctedTenAcre) {
        correctedTenAcre.src = 'assets/visual-guides/blueprint-10-acre.png';
        correctedTenAcre.wide = true;
      }

      const preview = document.querySelector('.route-feature img');
      if (preview) preview.src = 'assets/visual-guides/blueprint-10-acre.png';
      const previewCopy = document.querySelector('.route-feature span');
      if (previewCopy) previewCopy.textContent = 'Authored field-atlas plates. Full-screen inspection with native-feeling mobile zoom and pan.';

      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'src/visual-guides.css';
      document.head.append(style);
      visualModule.initVisuals();

      // The current 20-acre image is known to be semantically wrong. Keep it out of the live atlas until its replacement is supplied.
      const incorrectTwentyAcre = document.querySelector('[data-visual="acre20"]');
      if (incorrectTwentyAcre) {
        incorrectTwentyAcre.hidden = true;
        incorrectTwentyAcre.setAttribute('aria-hidden', 'true');
        incorrectTwentyAcre.style.display = 'none';
      }
    })
    .catch((error) => {
      console.error('Demeter enhancement failed; static atlas remains available.', error);
      document.documentElement.classList.remove('v2-loading');
    });
}
