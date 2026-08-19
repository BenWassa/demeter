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
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'src/visual-guides.css';
      document.head.append(style);
      visualModule.initVisuals();
    })
    .catch((error) => {
      console.error('Demeter enhancement failed; static atlas remains available.', error);
      document.documentElement.classList.remove('v2-loading');
    });
}
