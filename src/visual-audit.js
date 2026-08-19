const ITEMS=[
  {id:'region',title:'Region comparison',group:'Place',legacy:'region-comparison.webp',current:'region-comparison.svg'},
  {id:'acre3',title:'3-acre compact homestead',group:'Land',legacy:'blueprint-3-acre.webp',current:'blueprint-3-acre.svg'},
  {id:'acre10',title:'10-acre homestead',group:'Land',legacy:'blueprint-10-acre.webp',current:'blueprint-10-acre.svg',extras:[
    {id:'approved-png',label:'Approved PNG before Issue #5',src:'assets/visual-audit-source/blueprint-10-acre.png'},
    {id:'alt-a',label:'10-acre source alternative A',src:'assets/visual-audit-source/blueprint-10-acre-alt-a.png'},
    {id:'alt-b',label:'10-acre source alternative B',src:'assets/visual-audit-source/blueprint-10-acre-alt-b.png'}
  ]},
  {id:'acre20',title:'20-acre smallholding',group:'Land',legacy:'blueprint-20-acre.webp',current:'blueprint-20-acre.svg'},
  {id:'spectrum',title:'The independence spectrum',group:'Systems',legacy:'independence-spectrum.webp',current:'independence-spectrum.svg'},
  {id:'systems',title:'Homestead systems',group:'Systems',legacy:'homestead-systems.webp',current:'homestead-systems.svg'},
  {id:'food',title:'Food production pathways',group:'Food',legacy:'food-production-pathways.webp',current:'food-production-pathways.svg'},
  {id:'yearOn',title:'The homestead year · Southwest Ontario',group:'Seasons',legacy:'homestead-year-southwest-ontario.webp',current:'homestead-year-southwest-ontario.svg'},
  {id:'yearBc',title:'The homestead year · Coastal BC',group:'Seasons',legacy:'homestead-year-coastal-bc.webp',current:'homestead-year-coastal-bc.svg'}
];

const OUTCOMES=[
  ['keep','Keep selected version'],
  ['recreate','Recreate from selected version'],
  ['rethink','Rethink / start over'],
  ['drop','Drop visual'],
  ['unsure','Unsure']
];
const STORAGE='demeter.visual-audit.v1';
const blankReviews=()=>Object.fromEntries(ITEMS.map(item=>[item.id,{preferredVariant:null,outcome:null,note:''}]));
const defaultState=()=>({schema:'demeter.visual-audit.v1',reviews:blankReviews()});
let state=loadState(),undoStack=[],redoStack=[],legacyUrls={},auditReady=false;

const list=document.querySelector('#audit-list');
const progress=document.querySelector('#audit-progress');
const jsonOutput=document.querySelector('#audit-json');
const undoButton=document.querySelector('#audit-undo');
const redoButton=document.querySelector('#audit-redo');
const unreviewedOnly=document.querySelector('#audit-unreviewed-only');
const viewer=document.querySelector('#audit-viewer');
const viewerImage=document.querySelector('#audit-viewer-image');
const viewerCaption=document.querySelector('#audit-viewer-caption');

function loadState(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE));
    if(parsed?.schema===STORAGE&&parsed.reviews) return {...defaultState(),...parsed,reviews:{...blankReviews(),...parsed.reviews}};
  }catch{}
  return defaultState();
}
function clone(value){return JSON.parse(JSON.stringify(value));}
function save(){localStorage.setItem(STORAGE,JSON.stringify(state));}
function commit(mutator){
  undoStack.push(clone(state)); if(undoStack.length>80)undoStack.shift();
  redoStack=[];mutator(state);save();render();
}
function undo(){if(!undoStack.length)return;redoStack.push(clone(state));state=undoStack.pop();save();render();}
function redo(){if(!redoStack.length)return;undoStack.push(clone(state));state=redoStack.pop();save();render();}
function isReviewed(review){return Boolean(review.preferredVariant||['rethink','drop','unsure'].includes(review.outcome));}
function exportData(){
  return {
    schema:'demeter.visual-audit.v1',
    generatedAt:new Date().toISOString(),
    context:{repository:'BenWassa/demeter',baseline:'pre-Issue-5 legacy Field Atlas',current:'post-Issue-5 canonical rebuild'},
    reviews:Object.fromEntries(ITEMS.map(item=>[item.id,{title:item.title,group:item.group,...state.reviews[item.id]}]))
  };
}
function updateSummary(){
  const done=ITEMS.filter(item=>isReviewed(state.reviews[item.id])).length;
  progress.textContent=auditReady?`${done} / ${ITEMS.length} reviewed`:'Loading comparison set…';
  undoButton.disabled=!auditReady||!undoStack.length;redoButton.disabled=!auditReady||!redoStack.length;
  jsonOutput.value=JSON.stringify(exportData(),null,2);
}
function variantMarkup(item,review){
  const variants=[
    {id:'legacy',label:'Previous live plate',src:legacyUrls[item.legacy]||'',pending:!legacyUrls[item.legacy]},
    {id:'current',label:'Current Issue #5 rebuild',src:`assets/visual-guides/${item.current}`},
    ...(item.extras||[])
  ];
  return variants.map(v=>`<article class="audit-variant ${review.preferredVariant===v.id?'selected':''}" data-variant="${v.id}">
    <button class="audit-image-button" type="button" data-preview="${v.id}" ${v.pending?'data-pending disabled':!auditReady?'disabled':''} aria-label="Preview ${v.label}">
      ${v.pending?'<div class="audit-image-loading">Loading previous plate…</div>':`<img src="${v.src}" alt="${item.title} · ${v.label}" decoding="async">`}
    </button>
    <div class="audit-variant-foot">
      <span>${v.label}</span>
      <button type="button" class="audit-select" data-select="${v.id}" ${v.pending?'data-pending disabled':!auditReady?'disabled':''}>${review.preferredVariant===v.id?'Selected':'Prefer this'}</button>
    </div>
  </article>`).join('');
}
function render(){
  list.innerHTML=ITEMS.map((item,index)=>{
    const review=state.reviews[item.id];
    const hidden=unreviewedOnly.checked&&isReviewed(review);
    return `<article class="audit-item" data-item="${item.id}" ${hidden?'hidden':''}>
      <header class="audit-item-head">
        <div><p class="audit-kicker">${String(index+1).padStart(2,'0')} · ${item.group}</p><h2>${item.title}</h2></div>
        <span class="audit-status ${isReviewed(review)?'done':''}">${isReviewed(review)?'Reviewed':'Needs decision'}</span>
      </header>
      <div class="audit-variants">${variantMarkup(item,review)}</div>
      <div class="audit-outcomes" aria-label="Outcome for ${item.title}">
        ${OUTCOMES.map(([id,label])=>`<button type="button" data-outcome="${id}" class="${review.outcome===id?'selected':''}" ${!auditReady?'disabled':''}>${label}</button>`).join('')}
      </div>
      <label class="audit-note">Note <textarea data-note rows="2" ${!auditReady?'disabled':''} placeholder="What specifically do you like, dislike, or want preserved?">${escapeHtml(review.note)}</textarea></label>
    </article>`;
  }).join('');
  updateSummary();
}
function escapeHtml(value){return String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
function openPreview(itemId,variantId){
  const item=ITEMS.find(i=>i.id===itemId);if(!item)return;
  const variant=variantId==='legacy'?{label:'Previous live plate',src:legacyUrls[item.legacy]}:variantId==='current'?{label:'Current Issue #5 rebuild',src:`assets/visual-guides/${item.current}`}:(item.extras||[]).find(v=>v.id===variantId);
  if(!variant?.src)return;viewerImage.src=variant.src;viewerImage.alt=`${item.title} · ${variant.label}`;viewerCaption.textContent=`${item.title} · ${variant.label}`;viewer.showModal();
}

list.addEventListener('click',event=>{
  if(!auditReady)return;
  const itemEl=event.target.closest('.audit-item');if(!itemEl)return;const id=itemEl.dataset.item;
  const select=event.target.closest('[data-select]');if(select&&!select.disabled){commit(s=>{s.reviews[id].preferredVariant=select.dataset.select;});return;}
  const outcome=event.target.closest('[data-outcome]');if(outcome&&!outcome.disabled){commit(s=>{s.reviews[id].outcome=outcome.dataset.outcome;});return;}
  const preview=event.target.closest('[data-preview]');if(preview&&!preview.disabled)openPreview(id,preview.dataset.preview);
});
list.addEventListener('change',event=>{
  if(!auditReady||!event.target.matches('[data-note]'))return;const item=event.target.closest('.audit-item');const next=event.target.value;if(state.reviews[item.dataset.item].note===next)return;
  commit(s=>{s.reviews[item.dataset.item].note=next;});
});

undoButton.addEventListener('click',undo);redoButton.addEventListener('click',redo);
document.addEventListener('keydown',event=>{
  if(auditReady&&(event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='z'){
    event.preventDefault();event.shiftKey?redo():undo();
  }
});
unreviewedOnly.addEventListener('change',render);
document.querySelector('#audit-copy').addEventListener('click',async event=>{
  const json=JSON.stringify(exportData(),null,2);
  try{await navigator.clipboard.writeText(json);event.currentTarget.textContent='Copied';setTimeout(()=>event.currentTarget.textContent='Copy JSON',1200);}catch{jsonOutput.focus();jsonOutput.select();}
});
document.querySelector('#audit-download').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify(exportData(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='demeter-visual-audit.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),0);
});
document.querySelector('#audit-reset').addEventListener('click',()=>{
  if(!auditReady||!confirm('Clear all visual-review choices and notes? You can undo immediately afterwards.'))return;commit(()=>{state=defaultState();});
});
document.querySelector('#audit-viewer-close').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close();});
viewer.addEventListener('close',()=>{viewerImage.removeAttribute('src');});

async function settleImages(){
  const images=[...list.querySelectorAll('.audit-variant img')];
  await Promise.all(images.map(async image=>{
    try{await image.decode();}catch{
      if(!image.complete)await new Promise(resolve=>{image.addEventListener('load',resolve,{once:true});image.addEventListener('error',resolve,{once:true});});
    }
  }));
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
}
async function loadLegacyBundle(){
  try{
    const response=await fetch('demeter-visual-guides-assets.zip');if(!response.ok)throw new Error(`Legacy bundle HTTP ${response.status}`);
    const buffer=await response.arrayBuffer();const entries=parseZip(buffer);
    for(const item of ITEMS){
      const entry=entries.find(e=>e.name===item.legacy||e.name.endsWith(`/${item.legacy}`));
      if(entry){const bytes=await inflateEntry(buffer,entry);legacyUrls[item.legacy]=URL.createObjectURL(new Blob([bytes],{type:'image/webp'}));}
    }
  }catch(error){console.warn('Legacy visual bundle unavailable',error);}
  render();
  await settleImages();
  auditReady=true;
  document.documentElement.classList.add('audit-ready');
  render();
  await settleImages();
}
function parseZip(buffer){
  const view=new DataView(buffer),bytes=new Uint8Array(buffer);let eocd=-1;
  for(let i=buffer.byteLength-22;i>=Math.max(0,buffer.byteLength-65557);i--){if(view.getUint32(i,true)===0x06054b50){eocd=i;break;}}
  if(eocd<0)throw new Error('ZIP end record not found');
  const count=view.getUint16(eocd+10,true),decoder=new TextDecoder();let offset=view.getUint32(eocd+16,true);const entries=[];
  for(let i=0;i<count;i++){
    if(view.getUint32(offset,true)!==0x02014b50)throw new Error('Invalid ZIP directory');
    const method=view.getUint16(offset+10,true),compressedSize=view.getUint32(offset+20,true),nameLength=view.getUint16(offset+28,true),extraLength=view.getUint16(offset+30,true),commentLength=view.getUint16(offset+32,true),localOffset=view.getUint32(offset+42,true);
    const name=decoder.decode(bytes.slice(offset+46,offset+46+nameLength));entries.push({name,method,compressedSize,localOffset});offset+=46+nameLength+extraLength+commentLength;
  }
  return entries;
}
async function inflateEntry(buffer,entry){
  const view=new DataView(buffer),bytes=new Uint8Array(buffer),local=entry.localOffset;
  if(view.getUint32(local,true)!==0x04034b50)throw new Error('Invalid ZIP local header');
  const nameLength=view.getUint16(local+26,true),extraLength=view.getUint16(local+28,true),start=local+30+nameLength+extraLength;
  const compressed=bytes.slice(start,start+entry.compressedSize);if(entry.method===0)return compressed;
  if(entry.method!==8)throw new Error(`Unsupported ZIP compression ${entry.method}`);
  const stream=new Blob([compressed]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return new Uint8Array(await new Response(stream).arrayBuffer());
}

render();loadLegacyBundle();
