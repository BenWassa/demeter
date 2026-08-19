document.documentElement.classList.add('v2-loading');
import('./src/app-v2.js')
  .then(() => import('./src/a11y.js'))
  .then(() => import('./src/visuals.js'))
  .then(({ initVisuals }) => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'src/visual-guides.css';
    document.head.append(style);
    initVisuals();
  })
  .catch((error) => {
    console.error('Demeter enhancement failed; static atlas remains available.', error);
    document.documentElement.classList.remove('v2-loading');
  });
