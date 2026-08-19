document.documentElement.classList.add('v2-loading');
import('./src/app-v2.js').catch((error) => {
  console.error('Demeter enhancement failed; static atlas remains available.', error);
  document.documentElement.classList.remove('v2-loading');
});
