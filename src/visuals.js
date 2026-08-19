const visuals=[
  {id:'region',title:'Region comparison',kicker:'Regional atlas',src:'assets/visual-guides/region-comparison.webp',wide:true,alt:'Project Demeter comparison of Southwest Ontario, Fraser Valley and Vancouver Island.'},
  {id:'acre3',title:'3-acre compact homestead',kicker:'Blueprint · 3 acres',src:'assets/visual-guides/blueprint-3-acre.webp',alt:'Conceptual three-acre homestead blueprint with well, septic, food production, privacy and solar-ready zones.'},
  {id:'acre10',title:'10-acre balanced homestead',kicker:'Blueprint · 10 acres',src:'assets/visual-guides/blueprint-10-acre.webp',alt:'Conceptual ten-acre balanced homestead blueprint with distinct homestead, food, meadow, woodland and infrastructure zones.'},
  {id:'acre20',title:'20-acre expanded rural holding',kicker:'Blueprint · 20 acres',src:'assets/visual-guides/blueprint-20-acre.webp',alt:'Conceptual twenty-acre rural holding blueprint with homestead core, pasture, woodland, flexible land and infrastructure zones.'},
  {id:'spectrum',title:'The independence spectrum',kicker:'Resilience model',src:'assets/visual-guides/independence-spectrum.webp',wide:true,alt:'Five rural-home configurations comparing utility independence, operating burden and resilience potential.'},
  {id:'systems',title:'Homestead systems',kicker:'Infrastructure',src:'assets/visual-guides/homestead-systems.webp',alt:'Homestead systems overview for water, wastewater, electricity, heat and their dependencies.'},
  {id:'food',title:'Food production pathways',kicker:'Food + livestock',src:'assets/visual-guides/food-production-pathways.webp',alt:'Food production pathways showing garden, season extension, perennial food, poultry and grazing livestock as optional branches.'},
  {id:'yearOn',title:'The homestead year · Southwest Ontario',kicker:'Seasonal reality',src:'assets/visual-guides/homestead-year-southwest-ontario.webp',wide:true,alt:'Seasonal Southwest Ontario homestead work, labour intensity and system criticality from spring through winter.'},
  {id:'yearBc',title:'The homestead year · Coastal BC',kicker:'Seasonal reality',src:'assets/visual-guides/homestead-year-coastal-bc.webp',wide:true,alt:'Seasonal Coastal British Columbia homestead work, labour intensity and system criticality from winter through autumn.'}
];

const markup=`<section class="section visual-atlas" id="visual-atlas"><div class="page-shell"><header class="split"><div><p class="marker">Field atlas plates</p><h2>See the systems as a whole.</h2></div><p>Tap a plate to inspect it. On touchscreens, pinch to zoom and drag to pan. Accessible controls remain available for the same actions.</p></header><div class="visual-grid">${visuals.map(v=>`<button class="visual-card${v.wide?' wide':''}" type="button" data-visual="${v.id}" aria-label="Open ${v.title} full screen"><img src="${v.src}" alt="${v.alt}" loading="lazy" decoding="async"><span class="visual-card-copy"><small>${v.kicker}</small><strong>${v.title}</strong></span></button>`).join('')}</div></div></section>
<dialog class="visual-lightbox" id="visual-lightbox" aria-labelledby="visual-lightbox-heading"><div class="visual-lightbox-shell"><header class="visual-lightbox-bar"><div class="visual-lightbox-title"><small id="visual-lightbox-kicker">Field atlas plate</small><strong id="visual-lightbox-heading"></strong></div><div class="visual-zoom" aria-label="Image zoom controls"><button type="button" data-zoom="out" aria-label="Zoom out">−</button><output id="visual-zoom-level">100%</output><button type="button" data-zoom="in" aria-label="Zoom in">+</button><button type="button" data-zoom="reset">Reset</button></div><button class="visual-close" type="button" aria-label="Close full-screen image">×</button></header><div class="visual-stage" id="visual-stage"><img id="visual-lightbox-image" alt=""><p class="visual-hint"><span class="touch-hint">Pinch to zoom · drag to pan · double-tap to reset</span><span class="pointer-hint">Wheel or +/− to zoom · drag to pan · 0 to reset</span></p></div></div></dialog>`;

export function initVisuals(){
  if(document.body.dataset.page!=='visuals'||document.querySelector('#visual-atlas')) return;
  const main=document.querySelector('main'); if(!main)return;
  main.insertAdjacentHTML('beforeend',markup);

  const dialog=document.querySelector('#visual-lightbox');
  const stage=document.querySelector('#visual-stage');
  const image=document.querySelector('#visual-lightbox-image');
  const heading=document.querySelector('#visual-lightbox-heading');
  const kicker=document.querySelector('#visual-lightbox-kicker');
  const level=document.querySelector('#visual-zoom-level');
  const close=document.querySelector('.visual-close');
  const pointers=new Map();
  const starts=new Map();
  let opener=null,scale=1,x=0,y=0,drag=null,pinch=null,lastTap=null;
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  const render=()=>{image.style.transform=`translate(${x}px,${y}px) scale(${scale})`;level.value=`${Math.round(scale*100)}%`;level.textContent=level.value;stage.classList.toggle('is-zoomed',scale>1.01);};
  const reset=()=>{scale=1;x=0;y=0;drag=null;pinch=null;render();};
  const stagePoint=(clientX,clientY)=>{const r=stage.getBoundingClientRect();return{x:clientX-(r.left+r.width/2),y:clientY-(r.top+r.height/2)};};
  const zoomTo=(next,clientX=null,clientY=null)=>{
    next=clamp(Math.round(next*100)/100,1,4); if(next===scale)return;
    if(clientX!==null&&clientY!==null){const p=stagePoint(clientX,clientY);const contentX=(p.x-x)/scale;const contentY=(p.y-y)/scale;x=p.x-contentX*next;y=p.y-contentY*next;}
    scale=next;if(scale===1){x=0;y=0;}render();
  };
  const zoom=(delta,clientX=null,clientY=null)=>zoomTo(scale+delta,clientX,clientY);
  const touchPair=()=>[...pointers.values()].slice(0,2);
  const beginPinch=()=>{const [a,b]=touchPair();if(!a||!b)return;const dx=b.x-a.x,dy=b.y-a.y;const mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};const p=stagePoint(mid.x,mid.y);pinch={distance:Math.hypot(dx,dy)||1,scale,contentX:(p.x-x)/scale,contentY:(p.y-y)/scale};drag=null;};
  const updatePinch=()=>{const [a,b]=touchPair();if(!pinch||!a||!b)return;const dx=b.x-a.x,dy=b.y-a.y;const next=clamp(pinch.scale*(Math.hypot(dx,dy)||1)/pinch.distance,1,4);const mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};const p=stagePoint(mid.x,mid.y);scale=next;x=p.x-pinch.contentX*scale;y=p.y-pinch.contentY*scale;if(scale===1){x=0;y=0;}render();};
  const open=(card)=>{const v=visuals.find(item=>item.id===card.dataset.visual);if(!v)return;opener=card;heading.textContent=v.title;kicker.textContent=v.kicker;image.src=v.src;image.alt=v.alt;reset();dialog.showModal();close.focus();};

  document.querySelectorAll('.visual-card').forEach(card=>{card.addEventListener('click',()=>open(card));card.querySelector('img').addEventListener('error',()=>card.classList.add('asset-error'));});
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{reset();pointers.clear();starts.clear();image.removeAttribute('src');opener?.focus();});
  document.querySelector('[data-zoom="in"]').addEventListener('click',()=>zoom(.25));
  document.querySelector('[data-zoom="out"]').addEventListener('click',()=>zoom(-.25));
  document.querySelector('[data-zoom="reset"]').addEventListener('click',reset);
  stage.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?.2:-.2,e.clientX,e.clientY);},{passive:false});
  stage.addEventListener('dblclick',e=>{if(e.pointerType==='touch')return;e.preventDefault();scale>1?reset():zoomTo(2,e.clientX,e.clientY);});

  stage.addEventListener('pointerdown',e=>{
    stage.setPointerCapture(e.pointerId);
    starts.set(e.pointerId,{x:e.clientX,y:e.clientY,time:performance.now()});
    if(e.pointerType==='touch'){
      pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pointers.size===2)beginPinch();
      else if(scale>1)drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,x,y};
    }else if(scale>1){drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,x,y};stage.classList.add('is-dragging');}
  });
  stage.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch'&&pointers.has(e.pointerId)){
      pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pointers.size>=2){updatePinch();return;}
    }
    if(!drag||e.pointerId!==drag.id)return;x=drag.x+(e.clientX-drag.sx);y=drag.y+(e.clientY-drag.sy);render();
  });
  const endPointer=e=>{
    const start=starts.get(e.pointerId);starts.delete(e.pointerId);
    const wasTouch=e.pointerType==='touch';
    if(wasTouch)pointers.delete(e.pointerId);
    if(pointers.size<2)pinch=null;
    if(drag?.id===e.pointerId){drag=null;stage.classList.remove('is-dragging');}
    if(wasTouch&&start&&pointers.size===0){
      const travel=Math.hypot(e.clientX-start.x,e.clientY-start.y),now=performance.now();
      if(travel<14&&now-start.time<350){
        if(lastTap&&now-lastTap.time<320&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<42){scale>1?reset():zoomTo(2,e.clientX,e.clientY);lastTap=null;}
        else lastTap={time:now,x:e.clientX,y:e.clientY};
      }
    }
  };
  stage.addEventListener('pointerup',endPointer);stage.addEventListener('pointercancel',endPointer);
  dialog.addEventListener('keydown',e=>{if(e.key==='+'||e.key==='='){e.preventDefault();zoom(.25);}if(e.key==='-'){e.preventDefault();zoom(-.25);}if(e.key==='0'){e.preventDefault();reset();}});
}

export { visuals };
