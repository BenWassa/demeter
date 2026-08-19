import { regions, systems, sources } from './regions.js';
import { plans, production, archetypes } from './land.js';
import { mainMarkup } from './view.js';

for (const href of ['src/v2.css','src/navigation.css']) {
  const style=document.createElement('link'); style.rel='stylesheet'; style.href=href; document.head.append(style);
}

const page=document.body.dataset.page || 'home';
const main=document.querySelector('main');
main.innerHTML=mainMarkup;

const PAGE_SECTIONS={
  home:['top'],
  regions:['fit','regions','sources'],
  systems:['systems'],
  land:['blueprint','production'],
  plan:['acquire','roadmap'],
  visuals:[]
};
const allowed=new Set(PAGE_SECTIONS[page] || PAGE_SECTIONS.home);
[...main.children].forEach(section=>{ if(section.id && !allowed.has(section.id)) section.remove(); });

const homeGateway=`<section class="section home-gateway" id="start"><div class="page-shell"><header class="split"><div><p class="marker">Choose a workspace</p><h2>One project. Five focused questions.</h2></div><p>Demeter is now organized around the decisions you return to, rather than one long first-read page.</p></header><nav class="route-grid" aria-label="Demeter workspaces"><a href="regions.html"><small>01 · Where?</small><strong>Explore regions</strong><span>Tune your priorities and compare Southwest Ontario, Fraser Valley and Vancouver Island.</span></a><a href="systems.html"><small>02 · What must run?</small><strong>Understand systems</strong><span>Water, wastewater, power and heat—dependencies, failure modes and professional boundaries.</span></a><a href="land.html"><small>03 · How much land?</small><strong>Shape the homestead</strong><span>Work through 3, 10 and 20-acre plans, food production and livestock burden.</span></a><a href="visuals.html" class="route-feature"><small>04 · See it</small><strong>Open the field atlas</strong><span>Nine authored plates. Full-screen inspection with native-feeling mobile zoom and pan.</span><img src="assets/visual-guides/blueprint-10-acre.webp" alt="Preview of the 10-acre Demeter field-atlas blueprint" loading="lazy"></a><a href="plan.html"><small>05 · How do I get there?</small><strong>Plan the transition</strong><span>Compare fixer, turnkey and raw-land routes, then phase the move into resilient acreage.</span></a></nav></div></section>`;
if(page==='home'){
  document.querySelector('#top')?.insertAdjacentHTML('afterend',homeGateway);
  const actions=document.querySelectorAll('.hero-actions a');
  if(actions[0]){actions[0].href='regions.html';actions[0].textContent='Explore regions';}
  if(actions[1]){actions[1].href='visuals.html';actions[1].textContent='Open the field atlas';}
}

const navItems=[['regions','Regions','regions.html'],['systems','Systems','systems.html'],['land','Land','land.html'],['visuals','Visuals','visuals.html'],['plan','Plan','plan.html']];
const nav=document.querySelector('.site-nav');
if(nav) nav.innerHTML=navItems.map(([key,label,href])=>`<a href="${href}"${page===key?' aria-current="page"':''}>${label}</a>`).join('');
const brand=document.querySelector('.brand'); if(brand) brand.href='index.html';
const action=document.querySelector('.header-action');
if(action){
  const actions={home:['Tune your fit','regions.html#fit'],regions:['Tune fit','#fit'],systems:['Open plates','visuals.html'],land:['Open plates','visuals.html'],visuals:['Open land tools','land.html'],plan:['Compare routes','#acquire']};
  const [label,href]=actions[page]||actions.home; action.textContent=label; action.href=href;
}

document.documentElement.classList.remove('v2-loading');
document.documentElement.classList.add('v2-ready');

const state={anchor:'toronto',priority:{mildness:8,access:7,value:7,privacy:6,self:6},region:'ontario',layers:new Set(['food','livestock','infrastructure','privacy'])};
const $=(s)=>document.querySelector(s); const $$=(s)=>[...document.querySelectorAll(s)];
function activate(buttons,active,selected=false){buttons.forEach(b=>{const on=b===active;b.classList.toggle('on',on);b.setAttribute(selected?'aria-selected':'aria-pressed',String(on));if(selected)b.tabIndex=on?0:-1;});}
function keyboardTabs(buttons){buttons.forEach((b,i)=>b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();let n=i;if(e.key==='ArrowRight')n=(i+1)%buttons.length;if(e.key==='ArrowLeft')n=(i-1+buttons.length)%buttons.length;if(e.key==='Home')n=0;if(e.key==='End')n=buttons.length-1;buttons[n].focus();buttons[n].click();}));}
function score(key){const r=regions[key],p=state.priority,w=p.mildness+p.access+p.value+p.privacy+p.self||1;return Math.round(100*(p.mildness*r.cap.mildness+p.access*r.anchor[state.anchor]+p.value*r.cap.value+p.privacy*r.cap.privacy+p.self*r.cap.self)/(10*w));}
function renderFit(){if(!$('#fit-title'))return;const rank=Object.keys(regions).map(k=>[k,score(k)]).sort((a,b)=>b[1]-a[1]);const lead=regions[rank[0][0]];$('#fit-title').textContent=`${lead.name} leads.`;$('#fit-reason').textContent=state.anchor==='toronto'?'Toronto access strongly rewards Southwest Ontario; mildness can pull BC upward as its weight rises.':state.anchor==='vancouver'?'The Fraser Valley gains a large access advantage; Vancouver Island competes when privacy and remote flexibility matter more.':'With the city anchor relaxed, climate and privacy give the BC options more room to lead.';$('#ranking').innerHTML=rank.map(([k,s],i)=>`<li><span>${i+1}. ${regions[k].name}</span><i><b style="--fit:${s/100}"></b></i><strong>${s}</strong></li>`).join('');if($('#region-score'))$('#region-score').textContent=score(state.region);}
function renderRegion(key){if(!$('#region-name'))return;state.region=key;const r=regions[key];$('#region-route').textContent=r.route;$('#region-name').textContent=r.name;$('#region-thesis').textContent=r.thesis;$('#region-winter').textContent=r.winter;$('#region-winter-note').textContent=r.winterNote;$('#region-access').textContent=r.access;$('#region-access-note').textContent=r.accessNote;$('#region-market').textContent=r.market;$('#region-market-note').textContent=r.marketNote;$('#region-watch').textContent=r.watch;$('#region-why').textContent=r.why;$('#region-score').textContent=score(key);$('#caps').innerHTML=[['Mildness',r.cap.mildness],['Acreage value',r.cap.value],['Privacy / space',r.cap.privacy],['Self-sufficiency runway',r.cap.self]].map(([n,v])=>`<div><span>${n}</span><i><b style="--fit:${v/10}"></b></i><strong>${v.toFixed(1)}</strong></div>`).join('');$('#region-sources').innerHTML=r.src.map(s=>`<a href="${s.url}" target="_blank" rel="noreferrer">${s.label}</a>`).join('');}
function renderSystem(key){if(!$('#sys-title'))return;const s=systems[key];$('#sys-code').textContent=s.code;$('#sys-principle').textContent=s.principle;$('#sys-flow').innerHTML=s.flow.map((n,i)=>`<span>${n}</span>${i<s.flow.length-1?'<i></i>':''}`).join('');$('#sys-title').textContent=s.title;$('#sys-copy').textContent=s.copy;$('#sys-effort').textContent=s.effort;$('#sys-risk').textContent=s.risk;$('#sys-pro').textContent=s.pro;$('#sys-resilience').textContent=s.resilience;}
function planSvg(p){const zone=p.zones.map(([x,y,w,h,kind,layer,label,sub])=>`<g class="plan-group ${state.layers.has(layer)?'':'muted'}" data-plan-layer="${layer}"><rect class="zone ${kind}" x="${x}" y="${y}" width="${w}" height="${h}"/><text x="${x+18}" y="${y+36}">${label}</text><text class="sub" x="${x+18}" y="${y+59}">${sub}</text></g>`).join('');return `<defs><pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25"/></pattern></defs><rect class="ground" x="1" y="1" width="998" height="618"/><rect class="grid" x="1" y="1" width="998" height="618"/><path class="road" d="M0 590H1000"/><text class="roadlabel" x="35" y="612">ALL-SEASON ROAD</text>${zone}<g class="plan-group ${state.layers.has('infrastructure')?'':'muted'}"><circle class="well" cx="${p.well[0]}" cy="${p.well[1]}" r="15"/><text x="${p.well[0]+25}" y="${p.well[1]+5}">WELL</text></g><path class="north" d="M930 550v-55m0 0-10 18m10-18 10 18"/>`;}
function renderPlan(key){if(!$('#plan'))return;const p=plans[key];$('#plan').innerHTML=`<title id="plan-title">Illustrative ${p.label}</title><desc id="plan-desc">${p.thesis}</desc>${planSvg(p)}`;$('#plan-label').textContent=p.label;$('#plan-thesis').textContent=p.thesis;$('#plan-budget').innerHTML=p.budget.map(([a,u])=>`<div><dt>${a}</dt><dd>${u}</dd></div>`).join('');$('#plan-reality').textContent=p.reality;}
function renderFood(key){if(!$('#food-name'))return;const f=production[key];$('#food-code').textContent=f.code;$('#food-name').textContent=f.name;$('#food-load').textContent=f.load;$('#food-copy').textContent=f.copy;$('#food-ribbon').innerHTML=f.ribbon.map(([n,v])=>`<span style="--share:${v}"><b>${n}</b><small>${v}%</small></span>`).join('');$('#food-build').innerHTML=f.build.map(x=>`<li>${x}</li>`).join('');$('#food-animals').innerHTML=f.animals.map(([a,v])=>`<li><span>${a}</span><b>${v}</b></li>`).join('');$('#food-friction').innerHTML=f.friction.map(x=>`<li>${x}</li>`).join('');}
function renderArch(key){if(!$('#arch-name'))return;const a=archetypes[key];$('#arch-label').textContent=a.label;$('#arch-name').textContent=a.name;$('#arch-copy').textContent=a.copy;$('#arch-capital').textContent=a.capital;$('#arch-risk').textContent=a.risk;$('#arch-diy').textContent=a.diy;$('#arch-time').textContent=a.time;$('#arch-inspect').textContent=a.inspect;}
function bindTabs(selector,attr,render){const buttons=$$(selector);if(!buttons.length)return;activate(buttons,buttons.find(b=>b.classList.contains('on'))||buttons[0],true);buttons.forEach(b=>b.addEventListener('click',()=>{activate(buttons,b,true);render(b.dataset[attr]);}));keyboardTabs(buttons);}

$$('[data-priority]').forEach(input=>input.addEventListener('input',()=>{state.priority[input.dataset.priority]=+input.value;input.nextElementSibling.textContent=input.value;renderFit();}));
const anchors=$$('#anchors button');if(anchors.length){activate(anchors,anchors[0]);anchors.forEach(b=>b.addEventListener('click',()=>{state.anchor=b.dataset.anchor;activate(anchors,b);renderFit();}));}
bindTabs('#region-tabs button','region',renderRegion);bindTabs('#system-tabs button','system',renderSystem);bindTabs('#food-tabs button','food',renderFood);bindTabs('#arch-tabs button','arch',renderArch);
const acres=$$('#acre-buttons button');if(acres.length){activate(acres,acres.find(b=>b.classList.contains('on'))||acres[0]);acres.forEach(b=>b.addEventListener('click',()=>{activate(acres,b);renderPlan(b.dataset.acres);}));}
const layers=$$('.layers button');layers.forEach(b=>{b.setAttribute('aria-pressed','true');b.addEventListener('click',()=>{const k=b.dataset.layer;if(state.layers.has(k)){state.layers.delete(k);b.classList.remove('on');b.setAttribute('aria-pressed','false');}else{state.layers.add(k);b.classList.add('on');b.setAttribute('aria-pressed','true');}renderPlan($('#acre-buttons .on')?.dataset.acres||'10');});});
if($('#source-register'))$('#source-register').innerHTML=Object.values(sources).filter((s,i,a)=>a.findIndex(x=>x.url===s.url)===i).map(s=>`<a href="${s.url}" target="_blank" rel="noreferrer">${s.label}</a>`).join('');

renderFit();renderRegion('ontario');renderSystem('water');renderPlan('10');renderFood('garden');renderArch('fixer');
