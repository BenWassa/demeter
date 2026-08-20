export const approvedVisualSources={
  acre3:'assets/visual-guides/blueprint-3-acre-landscape.png',
  acre10:'assets/visual-guides/blueprint-10-acre-landscape.png',
  acre20:'assets/visual-guides/blueprint-20-acre-landscape.png',
  food:'assets/visual-guides/food-production-pathways.png',
  region:'assets/visual-guides/region-comparison.png',
  spectrum:'assets/visual-guides/independence-spectrum.png',
  systems:'assets/visual-guides/homestead-systems.png',
  yearOn:'assets/visual-guides/homestead-year-southwest-ontario.png',
  yearBc:'assets/visual-guides/homestead-year-coastal-bc.png'
};

export const approvedVisualPortraitSources={
  acre3:'assets/visual-guides/blueprint-3-acre-portrait.png',
  acre10:'assets/visual-guides/blueprint-10-acre-portrait.png',
  acre20:'assets/visual-guides/blueprint-20-acre-portrait.png'
};

const portraitMedia=window.matchMedia('(max-width: 720px)');
export const preferredVisualSource=(id,portrait=portraitMedia.matches)=>portrait&&approvedVisualPortraitSources[id]?approvedVisualPortraitSources[id]:approvedVisualSources[id];

function ensureResponsiveThumbnail(card,id){
  const thumbnail=card?.querySelector('img');
  const landscape=approvedVisualSources[id];
  if(!thumbnail||!landscape) return;

  thumbnail.srcset=`${landscape} 1x`;
  thumbnail.dataset.approvedSource=landscape;

  const portrait=approvedVisualPortraitSources[id];
  if(!portrait) return;

  let picture=thumbnail.parentElement?.tagName==='PICTURE'?thumbnail.parentElement:null;
  if(!picture){
    picture=document.createElement('picture');
    thumbnail.before(picture);
    picture.append(thumbnail);
  }
  let source=picture.querySelector('source[data-demeter-portrait]');
  if(!source){
    source=document.createElement('source');
    source.dataset.demeterPortrait='';
    picture.prepend(source);
  }
  source.media='(max-width: 720px)';
  source.srcset=portrait;
}

export function applyApprovedVisuals(){
  const lightbox=document.querySelector('#visual-lightbox-image');
  const dialog=document.querySelector('#visual-lightbox');

  const homePreview=document.querySelector('.route-feature img');
  if(homePreview) homePreview.src=approvedVisualSources.acre10;

  for(const id of Object.keys(approvedVisualSources)){
    const card=document.querySelector(`[data-visual="${id}"]`);
    if(!card) continue;
    ensureResponsiveThumbnail(card,id);

    card.addEventListener('click',()=>{
      if(!lightbox) return;
      const source=preferredVisualSource(id);
      lightbox.srcset=`${source} 1x`;
      lightbox.dataset.approvedSource=source;
    });
  }

  const atlasIntro=document.querySelector('.visual-atlas-head>p:not(.marker)');
  if(atlasIntro) atlasIntro.textContent='Read by question, then open any plate for full-screen inspection. The approved infographic set now spans place, land, systems, food and seasons in one restrained publication system.';

  dialog?.addEventListener('close',()=>{
    if(!lightbox) return;
    lightbox.removeAttribute('srcset');
    delete lightbox.dataset.approvedSource;
  });
}
