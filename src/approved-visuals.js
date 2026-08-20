export const approvedVisualSources={
  acre3:'assets/visual-guides/blueprint-3-acre.webp',
  acre10:'assets/visual-guides/blueprint-10-acre.png',
  region:'assets/visual-guides/region-comparison.png',
  spectrum:'assets/visual-guides/independence-spectrum.png',
  systems:'assets/visual-guides/homestead-systems.png',
  yearOn:'assets/visual-guides/homestead-year-southwest-ontario.png',
  yearBc:'assets/visual-guides/homestead-year-coastal-bc.png'
};

const suppressedVisuals=new Set(['acre20','food']);

export function applyApprovedVisuals(){
  const lightbox=document.querySelector('#visual-lightbox-image');
  const dialog=document.querySelector('#visual-lightbox');

  const homePreview=document.querySelector('.route-feature img');
  if(homePreview) homePreview.src=approvedVisualSources.acre10;

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

  // Do not knowingly publish schematic placeholders or previously rejected
  // artwork. The 20-acre and Food plates return only when approved infographic
  // masters exist.
  for(const id of suppressedVisuals){
    const card=document.querySelector(`[data-visual="${id}"]`);
    card?.closest('[role="listitem"]')?.remove();
  }
  const foodGroup=document.querySelector('#atlas-food');
  if(foodGroup&&!foodGroup.querySelector('.visual-card')){
    foodGroup.remove();
    document.querySelector('.visual-index a[href="#atlas-food"]')?.remove();
  }

  dialog?.addEventListener('close',()=>{
    if(!lightbox) return;
    lightbox.removeAttribute('srcset');
    delete lightbox.dataset.approvedSource;
  });
}
