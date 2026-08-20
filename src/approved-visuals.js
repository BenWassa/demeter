export const approvedVisualSources={
  region:'assets/visual-guides/region-comparison.png',
  spectrum:'assets/visual-guides/independence-spectrum.png',
  systems:'assets/visual-guides/homestead-systems.png',
  yearOn:'assets/visual-guides/homestead-year-southwest-ontario.png',
  yearBc:'assets/visual-guides/homestead-year-coastal-bc.png'
};

export function applyApprovedVisuals(){
  const lightbox=document.querySelector('#visual-lightbox-image');
  const dialog=document.querySelector('#visual-lightbox');

  for(const [id,source] of Object.entries(approvedVisualSources)){
    const card=document.querySelector(`[data-visual="${id}"]`);
    const thumbnail=card?.querySelector('img');
    if(!card||!thumbnail) continue;

    // Keep the generated SVG in `src` as a resilient fallback and stable URL,
    // while preferring the audited illustrated master for actual rendering.
    thumbnail.srcset=`${source} 1x`;
    thumbnail.dataset.approvedSource=source;

    card.addEventListener('click',()=>{
      if(!lightbox) return;
      lightbox.srcset=`${source} 1x`;
      lightbox.dataset.approvedSource=source;
    });
  }

  dialog?.addEventListener('close',()=>{
    if(!lightbox) return;
    lightbox.removeAttribute('srcset');
    delete lightbox.dataset.approvedSource;
  });
}
