import { visuals } from './visuals.js';

const blueprintByAcreage={
  '3':'acre3',
  '10':'acre10',
  '20':'acre20'
};

const addStyle=(href)=>{
  if(document.querySelector(`link[href="${href}"]`)) return;
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href=href;
  document.head.append(link);
};

const visualById=(id)=>visuals.find((visual)=>visual.id===id);

function plateButton(visual,id){
  return `<button class="infographic-primary" id="${id}" type="button" data-infographic-visual="${visual.id}" data-infographic-source="${visual.src}" aria-label="Open ${visual.title} full screen"><span class="infographic-image-wrap"><img src="${visual.src}" alt="${visual.alt}" decoding="async"></span><span class="infographic-primary-copy"><small>${visual.kicker}</small><strong>${visual.title}</strong><span>${visual.description}</span><em>Tap to inspect full screen</em></span></button>`;
}

function viewerMarkup(){
  return `<dialog class="visual-lightbox" id="land-visual-lightbox" aria-labelledby="land-visual-lightbox-heading"><div class="visual-lightbox-shell"><header class="visual-lightbox-bar"><div class="visual-lightbox-title"><small id="land-visual-lightbox-kicker">Field atlas plate</small><strong id="land-visual-lightbox-heading"></strong></div><div class="visual-zoom" aria-label="Image zoom controls"><button type="button" data-land-zoom="out" aria-label="Zoom out">−</button><output id="land-visual-zoom-level">100%</output><button type="button" data-land-zoom="in" aria-label="Zoom in">+</button><button type="button" data-land-zoom="reset">Reset</button></div><button class="visual-close" type="button" aria-label="Close full-screen image">×</button></header><div class="visual-stage" id="land-visual-stage"><img id="land-visual-lightbox-image" alt=""><p class="visual-hint"><span class="touch-hint">Pinch to zoom · drag to pan · double-tap to reset</span><span class="pointer-hint">Wheel or +/− to zoom · drag to pan · 0 to reset</span></p></div></div></dialog>`;
}

function initInlineViewer(){
  const triggers=[...document.querySelectorAll('[data-infographic-visual]')];
  if(!triggers.length) return;
  document.body.insertAdjacentHTML('beforeend',viewerMarkup());

  const dialog=document.querySelector('#land-visual-lightbox');
  const stage=document.querySelector('#land-visual-stage');
  const image=document.querySelector('#land-visual-lightbox-image');
  const heading=document.querySelector('#land-visual-lightbox-heading');
  const kicker=document.querySelector('#land-visual-lightbox-kicker');
  const level=document.querySelector('#land-visual-zoom-level');
  const close=dialog.querySelector('.visual-close');
  const pointers=new Map();
  const starts=new Map();
  let opener=null,scale=1,x=0,y=0,drag=null,pinch=null,lastTap=null,lastPointerType='mouse';
  const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
  const render=()=>{image.style.transform=`translate(${x}px,${y}px) scale(${scale})`;level.value=`${Math.round(scale*100)}%`;level.textContent=level.value;stage.classList.toggle('is-zoomed',scale>1.01);};
  const reset=()=>{scale=1;x=0;y=0;drag=null;pinch=null;render();};
  const stagePoint=(clientX,clientY)=>{const r=stage.getBoundingClientRect();return{x:clientX-(r.left+r.width/2),y:clientY-(r.top+r.height/2)};};
  const zoomTo=(next,clientX=null,clientY=null)=>{next=clamp(Math.round(next*100)/100,1,4);if(next===scale)return;if(clientX!==null&&clientY!==null){const p=stagePoint(clientX,clientY);const contentX=(p.x-x)/scale,contentY=(p.y-y)/scale;x=p.x-contentX*next;y=p.y-contentY*next;}scale=next;if(scale===1){x=0;y=0;}render();};
  const zoom=(delta,clientX=null,clientY=null)=>zoomTo(scale+delta,clientX,clientY);
  const touchPair=()=>[...pointers.values()].slice(0,2);
  const beginPinch=()=>{const [a,b]=touchPair();if(!a||!b)return;const dx=b.x-a.x,dy=b.y-a.y,mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2},p=stagePoint(mid.x,mid.y);pinch={distance:Math.hypot(dx,dy)||1,scale,contentX:(p.x-x)/scale,contentY:(p.y-y)/scale};drag=null;};
  const updatePinch=()=>{const [a,b]=touchPair();if(!pinch||!a||!b)return;const dx=b.x-a.x,dy=b.y-a.y,next=clamp(pinch.scale*(Math.hypot(dx,dy)||1)/pinch.distance,1,4),mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2},p=stagePoint(mid.x,mid.y);scale=next;x=p.x-pinch.contentX*scale;y=p.y-pinch.contentY*scale;if(scale===1){x=0;y=0;}render();};

  const open=(trigger)=>{
    const visual=visualById(trigger.dataset.infographicVisual);
    if(!visual) return;
    opener=trigger;
    heading.textContent=visual.title;
    kicker.textContent=visual.kicker;
    image.src=trigger.dataset.infographicSource||visual.src;
    image.alt=visual.alt;
    reset();
    dialog.showModal();
    close.focus();
  };

  triggers.forEach((trigger)=>trigger.addEventListener('click',()=>open(trigger)));
  close.addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',(event)=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{reset();pointers.clear();starts.clear();image.removeAttribute('src');opener?.focus();});
  dialog.querySelector('[data-land-zoom="in"]').addEventListener('click',()=>zoom(.25));
  dialog.querySelector('[data-land-zoom="out"]').addEventListener('click',()=>zoom(-.25));
  dialog.querySelector('[data-land-zoom="reset"]').addEventListener('click',reset);
  stage.addEventListener('wheel',(event)=>{event.preventDefault();zoom(event.deltaY<0?.2:-.2,event.clientX,event.clientY);},{passive:false});
  stage.addEventListener('dblclick',(event)=>{if(lastPointerType==='touch')return;event.preventDefault();scale>1?reset():zoomTo(2,event.clientX,event.clientY);});
  stage.addEventListener('pointerdown',(event)=>{lastPointerType=event.pointerType||'mouse';stage.setPointerCapture(event.pointerId);starts.set(event.pointerId,{x:event.clientX,y:event.clientY,time:performance.now()});if(event.pointerType==='touch'){pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});if(pointers.size===2)beginPinch();else if(scale>1)drag={id:event.pointerId,sx:event.clientX,sy:event.clientY,x,y};}else if(scale>1){drag={id:event.pointerId,sx:event.clientX,sy:event.clientY,x,y};stage.classList.add('is-dragging');}});
  stage.addEventListener('pointermove',(event)=>{if(event.pointerType==='touch'&&pointers.has(event.pointerId)){pointers.set(event.pointerId,{x:event.clientX,y:event.clientY});if(pointers.size>=2){updatePinch();return;}}if(!drag||event.pointerId!==drag.id)return;x=drag.x+(event.clientX-drag.sx);y=drag.y+(event.clientY-drag.sy);render();});
  const endPointer=(event)=>{const start=starts.get(event.pointerId);starts.delete(event.pointerId);const wasTouch=event.pointerType==='touch';if(wasTouch)pointers.delete(event.pointerId);if(pointers.size<2)pinch=null;if(drag?.id===event.pointerId){drag=null;stage.classList.remove('is-dragging');}if(wasTouch&&start&&pointers.size===0){const travel=Math.hypot(event.clientX-start.x,event.clientY-start.y),now=performance.now();if(travel<14&&now-start.time<350){if(lastTap&&now-lastTap.time<320&&Math.hypot(event.clientX-lastTap.x,event.clientY-lastTap.y)<42){scale>1?reset():zoomTo(2,event.clientX,event.clientY);lastTap=null;}else lastTap={time:now,x:event.clientX,y:event.clientY};}}};
  stage.addEventListener('pointerup',endPointer);
  stage.addEventListener('pointercancel',endPointer);
  dialog.addEventListener('keydown',(event)=>{if(event.key==='+'||event.key==='='){event.preventDefault();zoom(.25);}if(event.key==='-'){event.preventDefault();zoom(-.25);}if(event.key==='0'){event.preventDefault();reset();}});
}

export function initLandInfographics(){
  if(document.body.dataset.page!=='land') return;
  addStyle('src/visual-guides.css');
  addStyle('src/land-infographics.css');

  const blueprint=document.querySelector('#blueprint');
  if(blueprint){
    const shell=blueprint.querySelector('.page-shell');
    const layers=blueprint.querySelector('.layers');
    const desk=blueprint.querySelector('.plan-desk');
    if(layers) layers.hidden=true;
    if(desk) desk.hidden=true;

    const initial=visualById('acre10');
    const host=document.createElement('div');
    host.className='infographic-host';
    host.innerHTML=plateButton(initial,'land-infographic-trigger');
    (layers||blueprint.querySelector('header'))?.insertAdjacentElement('afterend',host);

    const trigger=host.querySelector('#land-infographic-trigger');
    const image=trigger.querySelector('img');
    const title=trigger.querySelector('.infographic-primary-copy strong');
    const description=trigger.querySelector('.infographic-primary-copy>span');
    const buttons=[...blueprint.querySelectorAll('#acre-buttons button')];
    const select=(acreage)=>{
      const id=blueprintByAcreage[acreage],visual=visualById(id);
      if(!visual)return;
      trigger.dataset.infographicVisual=id;
      trigger.dataset.infographicSource=visual.src;
      trigger.setAttribute('aria-label',`Open ${visual.title} full screen`);
      image.src=visual.src;
      image.alt=visual.alt;
      title.textContent=visual.title;
      description.textContent=visual.description;
    };
    buttons.forEach((button)=>button.addEventListener('click',()=>select(button.dataset.acres)));
  }

  const food=document.querySelector('#production');
  if(food){
    const shell=food.querySelector('.page-shell');
    const detail=food.querySelector('.field');
    const ribbon=food.querySelector('.ribbon');
    const visual=visualById('food');
    if(shell){
      shell.classList.remove('two');
      shell.classList.add('food-infographic-layout');
      const host=document.createElement('div');
      host.className='infographic-host food-infographic-host';
      host.innerHTML=plateButton(visual,'food-infographic-trigger');
      shell.insertBefore(host,detail||null);
    }
    detail?.classList.add('food-detail-support');
    if(ribbon) ribbon.hidden=true;
  }

  initInlineViewer();
}
