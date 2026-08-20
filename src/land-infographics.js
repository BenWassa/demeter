import { production } from './land.js';
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

function renderFoodDetail(key){
  const detail=document.querySelector('#food-detail');
  const item=production[key];
  if(!detail||!item) return;
  detail.innerHTML=`<div class="food-detail-head"><div><small>${item.code}</small><h3>${item.name}</h3></div><strong>Routine load · ${item.load}</strong></div><p>${item.copy}</p><div class="food-detail-grid"><div><b>Build first</b><ul>${item.build.map((value)=>`<li>${value}</li>`).join('')}</ul></div><div><b>Livestock fit</b><ul>${item.animals.map(([name,value])=>`<li><span>${name}</span><strong>${value}</strong></li>`).join('')}</ul></div><div><b>What gets harder</b><ul>${item.friction.map((value)=>`<li>${value}</li>`).join('')}</ul></div></div>`;
}

export function initLandInfographics(){
  if(document.body.dataset.page!=='land') return;
  addStyle('src/visual-guides.css');
  addStyle('src/land-infographics.css');

  const blueprint=document.querySelector('#blueprint');
  if(blueprint){
    const initial=visualById('acre10');
    blueprint.innerHTML=`<div class="page-shell"><header class="split infographic-section-head"><div><p class="marker">Land blueprints</p><h2>Read the whole property as one system.</h2><p>The authored Field Atlas plate is now the primary plan. Switch acreage, then open the plate full screen to inspect the details.</p></div><div class="seg infographic-switch" id="infographic-acre-buttons" role="tablist" aria-label="Blueprint acreage"><button type="button" role="tab" data-acres="3" aria-selected="false">3 acres</button><button type="button" role="tab" class="on" data-acres="10" aria-selected="true">10 acres</button><button type="button" role="tab" data-acres="20" aria-selected="false">20 acres</button></div></header><button class="infographic-primary" id="land-infographic-trigger" type="button" data-infographic-visual="acre10" data-infographic-source="${initial.src}" aria-label="Open ${initial.title} full screen"><span class="infographic-image-wrap"><img id="land-infographic-image" src="${initial.src}" alt="${initial.alt}" decoding="async"></span><span class="infographic-primary-copy"><small>Field Atlas plate</small><strong id="land-infographic-title">${initial.title}</strong><span id="land-infographic-description">${initial.description}</span><em>Tap to inspect full screen</em></span></button></div>`;

    const buttons=[...blueprint.querySelectorAll('#infographic-acre-buttons button')];
    const trigger=blueprint.querySelector('#land-infographic-trigger');
    const image=blueprint.querySelector('#land-infographic-image');
    const title=blueprint.querySelector('#land-infographic-title');
    const description=blueprint.querySelector('#land-infographic-description');
    const select=(acreage)=>{
      const id=blueprintByAcreage[acreage],visual=visualById(id);
      if(!visual)return;
      buttons.forEach((button)=>{const active=button.dataset.acres===acreage;button.classList.toggle('on',active);button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
      trigger.dataset.infographicVisual=id;
      trigger.dataset.infographicSource=visual.src;
      trigger.setAttribute('aria-label',`Open ${visual.title} full screen`);
      image.src=visual.src;
      image.alt=visual.alt;
      title.textContent=visual.title;
      description.textContent=visual.description;
    };
    buttons.forEach((button,index)=>{button.addEventListener('click',()=>select(button.dataset.acres));button.addEventListener('keydown',(event)=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='ArrowRight')next=(index+1)%buttons.length;if(event.key==='ArrowLeft')next=(index-1+buttons.length)%buttons.length;if(event.key==='Home')next=0;if(event.key==='End')next=buttons.length-1;buttons[next].focus();buttons[next].click();});});
  }

  const food=document.querySelector('#production');
  if(food){
    const visual=visualById('food');
    food.innerHTML=`<div class="page-shell"><header class="split infographic-section-head"><div><p class="marker">Food production</p><h2>See the pathways before choosing the workload.</h2><p>The Field Atlas infographic is the primary explanation. The operating-depth controls below remain as supporting detail.</p></div></header><button class="infographic-primary" type="button" data-infographic-visual="food" data-infographic-source="${visual.src}" aria-label="Open ${visual.title} full screen"><span class="infographic-image-wrap"><img id="food-infographic-image" src="${visual.src}" alt="${visual.alt}" loading="lazy" decoding="async"></span><span class="infographic-primary-copy"><small>${visual.kicker}</small><strong>${visual.title}</strong><span>${visual.description}</span><em>Tap to inspect full screen</em></span></button><section class="food-support" aria-labelledby="food-support-title"><div class="food-support-head"><div><small>Supporting detail</small><h3 id="food-support-title">Choose an operating depth.</h3></div><div class="seg" id="food-support-tabs" role="tablist" aria-label="Food production depth"><button type="button" role="tab" class="on" data-food="garden" aria-selected="true">Kitchen</button><button type="button" role="tab" data-food="household" aria-selected="false">Household</button><button type="button" role="tab" data-food="smallholding" aria-selected="false">Smallholding</button></div></div><article id="food-detail" aria-live="polite"></article></section></div>`;
    const tabs=[...food.querySelectorAll('#food-support-tabs button')];
    tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>{tabs.forEach((button)=>{const active=button===tab;button.classList.toggle('on',active);button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});renderFoodDetail(tab.dataset.food);});tab.addEventListener('keydown',(event)=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();let next=index;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;tabs[next].focus();tabs[next].click();});});
    renderFoodDetail('garden');
  }

  initInlineViewer();
}
