const visuals=[
  {id:'region',group:'place',title:'Region comparison',kicker:'Three-region decision plate',description:'Winter, metro access, market pressure and the constraint most likely to change the decision.',src:'assets/visual-guides/region-comparison.svg',alt:'Project Demeter comparison of Southwest Ontario, Fraser Valley and Vancouver Island across winter, metro access, market pressure, strengths and watch-outs.'},
  {id:'acre3',group:'land',title:'3-acre compact homestead',kicker:'Blueprint · 3 acres',description:'A compact layout where water, wastewater, food production and privacy must work together efficiently.',src:'assets/visual-guides/blueprint-3-acre.svg',alt:'Conceptual three-acre homestead blueprint with one house, drilled well, septic tank and leaching areas, kitchen garden, greenhouse, orchard, chickens, utility storage, privacy planting and a solar-ready clearing.'},
  {id:'acre10',group:'land',title:'10-acre working homestead',kicker:'Blueprint · 10 acres',description:'A balanced layout with a compact daily-use core, meaningful open ground and room for workshop, woodland and future flexibility.',src:'assets/visual-guides/blueprint-10-acre.svg',alt:'Conceptual ten-acre homestead blueprint with one house, drilled well, septic system and reserve, garden, greenhouse, orchard, chickens, workshop, utility area, open flexible ground, woodland and a solar-ready clearing.'},
  {id:'acre20',group:'land',title:'20-acre smallholding',kicker:'Blueprint · 20 acres',description:'An expanded holding with pasture, woodland, flexible ground and deliberately uncommitted future space.',src:'assets/visual-guides/blueprint-20-acre.svg',alt:'Conceptual twenty-acre rural holding with one main house, workshop or barn, utility shed, chickens, drilled well, septic system and reserve, garden, greenhouse, orchard, pasture, meadow, woodland, trails, solar-ready clearing and an empty flexible future zone.'},
  {id:'spectrum',group:'systems',title:'The independence spectrum',kicker:'Resilience model',description:'Utility independence, operating burden and resilience shown as separate variables.',src:'assets/visual-guides/independence-spectrum.svg',alt:'Five rural home configurations comparing utility independence, operating burden and resilience potential without a combined score.'},
  {id:'systems',group:'systems',title:'Homestead systems',kicker:'Dependency map',description:'Water, wastewater, power and heat shown as simple dependency chains with a resilience move.',src:'assets/visual-guides/homestead-systems.svg',alt:'Homestead systems overview for water, wastewater, electricity and heat showing dependency flows and resilience moves.'},
  {id:'food',group:'food',title:'Food production pathways',kicker:'Operating pathways',description:'Three practical levels of household food ambition, compared by workload, infrastructure and what each level adds.',src:'assets/visual-guides/food-production-pathways.svg',alt:'Food production pathways comparing kitchen support, a household food system and a smallholding across typical outputs, labour and infrastructure needs.'},
  {id:'yearOn',group:'seasons',title:'The homestead year · Southwest Ontario',kicker:'Seasonal operating pattern',description:'Monthly labour intensity and systems criticality for a cold-winter, concentrated growing season.',src:'assets/visual-guides/homestead-year-southwest-ontario.svg',alt:'Southwest Ontario seasonal timeline showing monthly labour intensity, systems criticality and major seasonal work.'},
  {id:'yearBc',group:'seasons',title:'The homestead year · Coastal BC',kicker:'Seasonal operating pattern',description:'A longer, milder growing year with winter attention shifting toward rain, wind and drainage.',src:'assets/visual-guides/homestead-year-coastal-bc.svg',alt:'Coastal British Columbia seasonal timeline showing monthly labour intensity, systems criticality and major seasonal work.'}
];

const groups=[
  {id:'place',number:'01',title:'Place',question:'Which regional trade-offs change where the homestead should be?'},
  {id:'land',number:'02',title:'Land',question:'How does useful acreage change the layout, options and maintenance burden?'},
  {id:'systems',number:'03',title:'Systems',question:'What has to keep working, and what kind of resilience actually helps?'},
  {id:'food',number:'04',title:'Food',question:'How far should food production deepen before it becomes an operation?'},
  {id:'seasons',number:'05',title:'Seasons',question:'When do workload and household-system criticality stack up through the year?'}
];

const cardMarkup=(v)=>`<button class="visual-card" type="button" data-visual="${v.id}" aria-label="Open ${v.title} full screen"><span class="visual-image-wrap"><img src="${v.src}" alt="${v.alt}" loading="lazy" decoding="async"></span><span class="visual-card-copy"><small>${v.kicker}</small><strong>${v.title}</strong><span>${v.description}</span></span></button>`;
const groupMarkup=(group)=>`<section class="visual-group" id="atlas-${group.id}" aria-labelledby="atlas-${group.id}-title"><header class="visual-group-head"><div><small>${group.number}</small><h2 id="atlas-${group.id}-title">${group.title}</h2></div><p>${group.question}</p></header><div class="visual-rail" role="list">${visuals.filter(v=>v.group===group.id).map(v=>`<div role="listitem">${cardMarkup(v)}</div>`).join('')}</div></section>`;

const markup=`<section class="visual-atlas" id="visual-atlas"><div class="page-shell"><header class="visual-atlas-head"><p class="marker">Field Atlas</p><h1>Reference plates for the decisions that shape a homestead.</h1><p>Read by question, then open any plate for full-screen inspection. The publication uses one restrained graphic language across place, land, systems, food and seasons.</p><nav class="visual-index" aria-label="Field Atlas sections">${groups.map(g=>`<a href="#atlas-${g.id}"><span>${g.number}</span>${g.title}</a>`).join('')}</nav></header><div class="visual-groups">${groups.map(groupMarkup).join('')}</div></div></section>
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
  let opener=null,scale=1,x=0,y=0,drag=null,pinch=null,lastTap=null,lastPointerType='mouse';
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
  stage.addEventListener('dblclick',e=>{if(lastPointerType==='touch')return;e.preventDefault();scale>1?reset():zoomTo(2,e.clientX,e.clientY);});

  stage.addEventListener('pointerdown',e=>{
    lastPointerType=e.pointerType||'mouse';
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

export { visuals, groups };
