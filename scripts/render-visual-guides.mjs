import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const C={paper:'#f1eee4',snow:'#faf9f4',ink:'#142019',soft:'#465149',spruce:'#1f4337',moss:'#667762',lake:'#58747a',soil:'#8a5038',harvest:'#c3a15b',mist:'#d9ded5',rule:'#c7cdc4',water:'#4f7f9a',waste:'#756b8e'};
const esc=(value)=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text=(x,y,value,cls='body',anchor='start')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`;
const line=(x1,y1,x2,y2,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
const bar=(x,y,value,max=4,fill=C.spruce)=>Array.from({length:max},(_,i)=>`<rect x="${x+i*22}" y="${y}" width="16" height="7" rx="1" fill="${i<value?fill:C.mist}"/>`).join('');
const noteHeading=(y,label)=>`${text(892,y,label,'eyebrow')}${line(892,y+12,1126,y+12,'class="rule"')}`;
const note=(y,label,value)=>`${text(892,y,label,'label')}${text(892,y+20,value,'note')}`;

function shell({eyebrow,title,dek,graphic,notes,footer='Conceptual planning reference · verify site-specific conditions before acting'}){
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" role="img" aria-labelledby="title desc">
<title id="title">${esc(title)}</title><desc id="desc">${esc(dek)}</desc>
<style>
  .title{font:500 36px Georgia,serif;fill:${C.ink}} .eyebrow{font:600 11px Arial,sans-serif;letter-spacing:1.6px;fill:${C.spruce}} .dek{font:400 14px Arial,sans-serif;fill:${C.soft}}
  .body{font:400 12px Arial,sans-serif;fill:${C.ink}} .small{font:400 10px Arial,sans-serif;fill:${C.soft}} .label{font:700 10px Arial,sans-serif;letter-spacing:.7px;fill:${C.ink}} .note{font:400 11px Arial,sans-serif;fill:${C.soft}}
  .mono{font:600 10px 'Courier New',monospace;letter-spacing:.4px;fill:${C.ink}} .metric{font:700 18px 'Courier New',monospace;fill:${C.ink}} .rule{stroke:${C.rule};stroke-width:1} .ink{stroke:${C.ink};stroke-width:1.2;fill:none}
  .soft-rule{stroke:${C.rule};stroke-width:1} .dash{stroke-dasharray:6 5} .zone-label{font:700 10px Arial,sans-serif;letter-spacing:.5px;fill:${C.ink}} .zone-sub{font:400 9px Arial,sans-serif;fill:${C.soft}}
</style>
<rect width="1200" height="800" fill="${C.paper}"/>
${text(54,49,`DEMETER FIELD ATLAS · ${eyebrow.toUpperCase()}`,'eyebrow')}
${text(54,95,title,'title')}
${text(54,125,dek,'dek')}
${line(54,148,1146,148,'class="rule"')}
<rect x="870" y="172" width="276" height="538" fill="${C.snow}" stroke="${C.rule}"/>
${graphic}
${notes}
${line(54,744,1146,744,'class="rule"')}
${text(54,768,footer,'small')}${text(1146,768,'PROJECT DEMETER · 2026-08-19','mono','end')}
</svg>`;
}

const legendSwatch=(y,fill,label,stroke=C.ink,dash=false)=>`<rect x="892" y="${y-10}" width="18" height="12" fill="${fill}" stroke="${stroke}" ${dash?'stroke-dasharray="4 3"':''}/>${text(920,y,label,'note')}`;

const BLUEPRINTS={
  'blueprint-3-acre.svg':{
    title:'3-acre compact homestead',dek:'A tight serviced core: daily food, workshop and privacy fit only when sun, access and wastewater space cooperate.',acre:'3 ACRES',scale:'≈ 110 × 110 m near-square parcel',reality:'Buy shape and sun, not headline acreage.',zones:[
      [205,485,175,92,'#dce4df','HOUSE','daily core'],[395,458,168,120,'#dce4c9','KITCHEN GARDEN','beds · compost'],[575,474,98,76,'#dbe4e6','GREENHOUSE','season extension'],[95,405,118,94,'#e2e4df','SHOP','tools · storage'],[330,320,250,92,'#dce4c9','ORCHARD','fruit · berries'],[600,316,155,105,'#eee4c9','CHICKENS','coop · run'],[86,226,668,62,'#cfd9d1','TREE BUFFER','privacy · habitat'],[555,584,186,48,'#eeeaf1','SEPTIC RESERVE','protect from traffic',true]],
    well:[172,560],house:[205,531],septic:[555,608]
  },
  'blueprint-10-acre.svg':{
    title:'10-acre working homestead',dek:'A balanced layout keeps daily chores close while field, orchard and woodland absorb the extra distance.',acre:'10 ACRES',scale:'≈ 200 × 200 m near-square parcel',reality:'Options increase; daily walking should not.',zones:[
      [210,490,166,88,'#dce4df','HOUSE','mudroom · kitchen axis'],[392,452,175,126,'#dce4c9','KITCHEN GARDEN','intensive beds'],[580,470,96,78,'#dbe4e6','GREENHOUSE','propagation'],[92,407,122,100,'#e2e4df','SHOP / BARN','tools · storage'],[315,325,285,94,'#dce4c9','ORCHARD + BERRIES','perennial food'],[618,315,172,250,'#eee4c9','FLEX FIELD','poultry · grazing'],[86,218,704,70,'#cfd9d1','WOODLOT + TRAILS','privacy · fuel · habitat'],[520,592,218,48,'#eeeaf1','SEPTIC / RESERVE','conceptual siting',true]],
    well:[164,563],house:[210,534],septic:[520,616]
  },
  'blueprint-20-acre.svg':{
    title:'20-acre smallholding',dek:'A real smallholding scale: rotational grazing, habitat and woodlot fit, with a matching rise in fencing, equipment and care.',acre:'20 ACRES',scale:'≈ 285 × 285 m near-square parcel',reality:'Extra land needs a job or it becomes maintenance.',zones:[
      [128,505,142,78,'#dce4df','HOUSE','service core'],[286,480,142,104,'#dce4c9','GARDEN','household + surplus'],[442,500,84,64,'#dbe4e6','GLASSHOUSE','season extension'],[72,420,122,88,'#e2e4df','BARN / SHOP','feed · equipment'],[245,348,238,92,'#dce4c9','ORCHARD','fruit · berries'],[506,322,128,130,'#eee4c9','PADDOCK A','rotation'],[648,322,128,130,'#eee4c9','PADDOCK B','rotation'],[545,468,231,116,'#e7dfc7','FLEX FIELD','hay · rest'],[72,218,704,78,'#cfd9d1','WOODLOT / HABITAT','trails · fuel · buffer'],[300,600,180,40,'#eeeaf1','SEPTIC RESERVE','concept only',true]],
    well:[105,570],house:[128,544],septic:[300,620]
  }
};

function blueprintPlate(data){
  const zones=data.zones.map(([x,y,w,h,fill,label,sub,dashed])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${fill}" stroke="${C.ink}" ${dashed?'stroke-dasharray="6 5"':''}/>${text(x+12,y+22,label,'zone-label')}${text(x+12,y+39,sub,'zone-sub')}`).join('');
  const graphic=`<rect x="70" y="194" width="742" height="462" fill="${C.snow}" stroke="${C.ink}" stroke-width="1.4"/>${zones}
    <path d="M70 635 H812" stroke="${C.soft}" stroke-width="9"/><text x="86" y="650" class="mono" fill="${C.snow}">ALL-SEASON ROAD</text>
    <circle cx="${data.well[0]}" cy="${data.well[1]}" r="10" fill="${C.water}" stroke="${C.ink}"/>${text(data.well[0]+16,data.well[1]+4,'WELL','zone-label')}
    <path d="M${data.well[0]+10} ${data.well[1]} L${data.house[0]} ${data.house[1]}" stroke="${C.water}" stroke-width="3" fill="none"/>
    <path d="M${data.house[0]+88} ${data.house[1]+10} L${data.septic[0]} ${data.septic[1]}" stroke="${C.waste}" stroke-width="3" fill="none" stroke-dasharray="7 5"/>
    ${text(76,184,data.scale,'mono')}
    <path d="M720 678h80 M720 674v8 M760 674v8 M800 674v8" stroke="${C.ink}"/>${text(720,697,'approx. 50 m reference','small')}`;
  const notes=`${noteHeading(202,'KEY NOTES')}${note(232,'LAND MODEL',data.acre)}${note(278,'LAYOUT RULE',data.reality)}
    ${noteHeading(340,'LEGEND')}${legendSwatch(370,'#dce4df','home / serviced core')}${legendSwatch(394,'#dce4c9','food production')}${legendSwatch(418,'#eee4c9','field / livestock')}${legendSwatch(442,'#cfd9d1','woodlot / privacy')}${legendSwatch(466,'none','future / reserve',C.waste,true)}
    ${line(892,492,910,492,`stroke="${C.water}" stroke-width="3"`)}${text(920,496,'potable water path','note')}${line(892,516,910,516,`stroke="${C.waste}" stroke-width="3" stroke-dasharray="6 4"`)}${text(920,520,'wastewater path','note')}
    ${noteHeading(572,'ORIENTATION')}<path d="M916 658v-52m0 0-9 15m9-15 9 15" stroke="${C.ink}" fill="none"/>${text(916,596,'N','mono','middle')}${text(944,625,'North shown for','note')}${text(944,642,'reading only; adapt','note')}${text(944,659,'to actual parcel.','note')}`;
  return shell({eyebrow:'Land · blueprint',title:data.title,dek:data.dek,graphic,notes,footer:'Illustrative near-rectangular parcel · not a survey or site-engineering plan'});
}

function regionPlate(){
  const cols=[
    ['SOUTHWEST ONTARIO','−5.4°C','2h33 to Toronto','Lower of 3','Value + productive land','Heating · drainage · zoning'],
    ['FRASER VALLEY','3.7°C','≈75m WCE to Vancouver','Highest pressure','Mildness + metro access','ALR · flood · price'],
    ['VANCOUVER ISLAND','4.6°C','Remote-led','Premium','Privacy + mildness','Ferry · wildfire · water']
  ];
  const x=[80,330,580];
  const graphic=`${cols.map((c,i)=>`<rect x="${x[i]}" y="204" width="218" height="414" fill="${C.snow}" stroke="${C.rule}"/>${text(x[i]+18,232,c[0],'eyebrow')}${line(x[i]+18,247,x[i]+200,247,'class="rule"')}${text(x[i]+18,282,c[1],'metric')}${text(x[i]+18,302,'January daily mean','small')}${text(x[i]+18,348,'METRO ACCESS','label')}${text(x[i]+18,369,c[2],'body')}${text(x[i]+18,416,'MARKET SIGNAL','label')}${text(x[i]+18,437,c[3],'body')}${text(x[i]+18,484,'BEST AT','label')}${text(x[i]+18,505,c[4],'body')}${text(x[i]+18,552,'WATCH FIRST','label')}${text(x[i]+18,573,c[5],'body')}`).join('')}`;
  const notes=`${noteHeading(202,'HOW TO READ')}${text(892,234,'Compare the same decision','note')}${text(892,251,'dimensions across all three','note')}${text(892,268,'regions before opening detail.','note')}${noteHeading(330,'ANCHOR')}${text(892,362,'Toronto access favours','note')}${text(892,379,'Southwest Ontario. Vancouver','note')}${text(892,396,'access favours Fraser Valley.','note')}${text(892,413,'Remote work gives the Island','note')}${text(892,430,'more room to lead.','note')}${noteHeading(492,'SOURCE BASIS')}${text(892,524,'ECCC 1991–2020 normals;','note')}${text(892,541,'VIA and TransLink schedules;','note')}${text(892,558,'current Demeter market and','note')}${text(892,575,'planning research.','note')}`;
  return shell({eyebrow:'Place · comparison',title:'Region comparison',dek:'Three candidate regions, aligned on winter, access, market pressure and the constraint most likely to change the decision.',graphic,notes,footer:'Planning comparison · research refresh 2026-08-19 · see Regions workspace for source links'});
}

function independencePlate(){
  const rows=[
    ['GRID STANDARD',1,1,1,'Simple operation; outage exposure remains.'],
    ['GRID + BACKUP',1,2,3,'Generator or critical-load backup covers short failures.'],
    ['SOLAR + BATTERY',2,2,4,'Daily resilience rises without abandoning the grid.'],
    ['GRID-OPTIONAL',3,3,4,'Critical loads can run through longer outages.'],
    ['FULL OFF-GRID',4,4,3,'Maximum independence; highest design and operating burden.']
  ];
  const graphic=`${text(272,190,'UTILITY INDEPENDENCE','label','middle')}${text(468,190,'OPERATING BURDEN','label','middle')}${text(664,190,'RESILIENCE POTENTIAL','label','middle')}${rows.map((r,i)=>{const y=230+i*82;return `${text(78,y,r[0],'label')}${bar(242,y-7,r[1],4,C.lake)}${bar(438,y-7,r[2],4,C.soil)}${bar(634,y-7,r[3],4,C.spruce)}${text(78,y+25,r[4],'small')}${line(78,y+45,808,y+45,'class="rule"')}`}).join('')}`;
  const notes=`${noteHeading(202,'THREE SEPARATE QUESTIONS')}${note(236,'INDEPENDENCE','How little do utilities matter?')}${note(292,'BURDEN','How much must you operate?')}${note(348,'RESILIENCE','How gracefully does failure land?')}${noteHeading(420,'DESIGN PRINCIPLE')}${text(892,453,'Do not collapse these into','note')}${text(892,470,'one score. A system can be','note')}${text(892,487,'highly resilient without being','note')}${text(892,504,'fully independent.','note')}${noteHeading(566,'DEFAULT DEMETER BIAS')}${text(892,599,'Keep useful grid connections;','note')}${text(892,616,'add storage, backup power and','note')}${text(892,633,'redundancy where failure hurts.','note')}`;
  return shell({eyebrow:'Systems · resilience',title:'The independence spectrum',dek:'Utility independence, operating burden and resilience are related variables—not synonyms and not a single score.',graphic,notes});
}

function systemsPlate(){
  const rows=[
    ['WATER',C.lake,['Aquifer','Well','Pump','Pressure','Treatment','House'],'Backup power + stored water'],
    ['WASTEWATER',C.waste,['House','Tank','Treatment','Distribution','Leaching bed'],'Protect field + preserve reserve'],
    ['POWER',C.harvest,['Grid','Solar','Inverter','Battery','Critical loads','Generator'],'Battery + generator'],
    ['HEAT',C.soil,['Envelope','Heat pump','Distribution','House','Backup heat'],'Envelope + second heat source']
  ];
  const graphic=rows.map((r,i)=>{const y=212+i*108;const nodes=r[2];const start=150;const gap=104;return `${text(78,y,r[0],'eyebrow')}${nodes.map((n,j)=>`${j?line(start+(j-1)*gap+64,y-5,start+j*gap,y-5,`stroke="${r[1]}" stroke-width="2"`):''}<rect x="${start+j*gap}" y="${y-26}" width="64" height="42" rx="2" fill="${C.snow}" stroke="${r[1]}"/>${text(start+j*gap+32,y,n,'small','middle')}`).join('')}${text(150,y+43,`RESILIENCE MOVE · ${r[3]}`,'label')}${line(78,y+62,810,y+62,'class="rule"')}`}).join('');
  const notes=`${noteHeading(202,'SCAN ORDER')}${text(892,234,'1 · Source or input','note')}${text(892,254,'2 · Conversion / distribution','note')}${text(892,274,'3 · Household load','note')}${text(892,294,'4 · Failure bridge','note')}${noteHeading(356,'PROFESSIONAL BOUNDARY')}${text(892,389,'Licensed or regulated work','note')}${text(892,406,'still belongs with qualified','note')}${text(892,423,'well, septic, electrical, HVAC','note')}${text(892,440,'and fuel professionals.','note')}${noteHeading(502,'SYSTEM PRIORITY')}${text(892,535,'Water and heat failures become','note')}${text(892,552,'time-critical quickly. Wastewater','note')}${text(892,569,'is quiet until it is expensive.','note')}${text(892,586,'Power supports all three.','note')}`;
  return shell({eyebrow:'Systems · dependencies',title:'Homestead systems',dek:'Four household systems shown as dependency chains, with the resilience move separated from the normal operating path.',graphic,notes});
}

function foodPlate(){
  const graphic=`<path d="M110 390 H220 M390 390 H500 M670 390 H780" stroke="${C.spruce}" stroke-width="2" fill="none"/>
    <rect x="80" y="330" width="140" height="120" fill="${C.snow}" stroke="${C.ink}"/>${text(98,360,'KITCHEN-SCALE','eyebrow')}${text(98,389,'Beds · herbs · berries','body')}${text(98,413,'Daily load · LOW','label')}
    <rect x="250" y="300" width="140" height="180" fill="${C.snow}" stroke="${C.ink}"/>${text(268,330,'HOUSEHOLD SYSTEM','eyebrow')}${text(268,359,'Garden + orchard','body')}${text(268,379,'Greenhouse + storage','body')}${text(268,399,'Chickens optional','body')}${text(268,431,'Daily load · MEDIUM','label')}
    <rect x="500" y="270" width="170" height="240" fill="${C.snow}" stroke="${C.ink}"/>${text(518,300,'SMALLHOLDING','eyebrow')}${text(518,329,'Crops + orchard','body')}${text(518,349,'Poultry + grazing','body')}${text(518,369,'Feed + equipment','body')}${text(518,401,'Daily load · HIGH','label')}${text(518,435,'365-day coverage','label')}
    <rect x="710" y="300" width="100" height="54" fill="#dce4c9" stroke="${C.rule}"/>${text(760,332,'ORCHARD','label','middle')}<path d="M585 270 V220 H760 V300" stroke="${C.moss}" fill="none"/>
    <rect x="710" y="382" width="100" height="54" fill="#dbe4e6" stroke="${C.rule}"/>${text(760,414,'GLASS','label','middle')}<path d="M670 390 H710" stroke="${C.lake}" fill="none"/>
    <rect x="710" y="464" width="100" height="54" fill="#eee4c9" stroke="${C.rule}"/>${text(760,496,'GRAZING','label','middle')}<path d="M585 510 V548 H760 V518" stroke="${C.harvest}" fill="none"/>
    ${text(82,558,'Increase production depth only when the workflow, water, storage and coverage are ready.','body')}`;
  const notes=`${noteHeading(202,'PATHWAY LOGIC')}${text(892,234,'The main branch is operational','note')}${text(892,251,'depth, not a lifestyle ladder.','note')}${text(892,268,'Stop where workload still fits','note')}${text(892,285,'the life you want.','note')}${noteHeading(348,'ADD BEFORE SCALE')}${text(892,381,'Water close to production','note')}${text(892,401,'Wash / store workflow','note')}${text(892,421,'Freezer or cold storage','note')}${text(892,441,'Vacation / animal coverage','note')}${noteHeading(504,'ANIMAL THRESHOLD')}${text(892,537,'Chickens add daily routine.','note')}${text(892,557,'Grazing stock adds fencing,','note')}${text(892,577,'winter feed, vet care and','note')}${text(892,597,'365-day responsibility.','note')}`;
  return shell({eyebrow:'Food · pathways',title:'Food production pathways',dek:'A branching operating model: move from kitchen-scale abundance toward a smallholding only as infrastructure and daily coverage deepen.',graphic,notes});
}

function yearPlate({title,dek,region,tasks,labour,critical}){
  const months=['J','F','M','A','M','J','J','A','S','O','N','D'];
  const x0=102,step=58;
  const graphic=`${months.map((m,i)=>`${text(x0+i*step,210,m,'label','middle')}${line(x0+i*step,225,x0+i*step,540,'class="soft-rule"')}`).join('')}
    ${text(76,264,'LABOUR','eyebrow')}${labour.map((v,i)=>bar(x0-18+i*step,286,v,4,C.soil)).join('')}
    ${text(76,352,'SYSTEMS CRITICALITY','eyebrow')}${critical.map((v,i)=>bar(x0-18+i*step,374,v,4,C.lake)).join('')}
    ${line(76,430,806,430,'class="rule"')}${text(76,460,'SEASONAL WORK','eyebrow')}
    <rect x="98" y="480" width="214" height="64" fill="#e7eadf" stroke="${C.rule}"/>${text(112,503,tasks[0][0],'label')}${text(112,525,tasks[0][1],'small')}
    <rect x="326" y="480" width="214" height="64" fill="#eee4c9" stroke="${C.rule}"/>${text(340,503,tasks[1][0],'label')}${text(340,525,tasks[1][1],'small')}
    <rect x="554" y="480" width="214" height="64" fill="#dfe6e5" stroke="${C.rule}"/>${text(568,503,tasks[2][0],'label')}${text(568,525,tasks[2][1],'small')}
    ${text(76,590,region,'mono')}`;
  const notes=`${noteHeading(202,'MEASURES')}${note(236,'LABOUR INTENSITY','Routine workload in the month')}${note(302,'SYSTEMS CRITICALITY','Consequence / urgency of failure')}${noteHeading(380,'LEVELS')}${text(892,414,'1 · low','note')}${text(892,434,'2 · moderate','note')}${text(892,454,'3 · high','note')}${text(892,474,'4 · peak / critical','note')}${noteHeading(532,'READING RULE')}${text(892,565,'Bars are ordinal planning','note')}${text(892,582,'levels, not measured hours or','note')}${text(892,599,'probabilities. Use them to see','note')}${text(892,616,'when workload and dependency','note')}${text(892,633,'stack on top of each other.','note')}`;
  return shell({eyebrow:'Seasons · operating year',title,dek,graphic,notes,footer:'Illustrative seasonal operating pattern · tune for crop mix, property systems and local weather'});
}

const plates={
  'region-comparison.svg':regionPlate(),
  ...Object.fromEntries(Object.entries(BLUEPRINTS).map(([name,data])=>[name,blueprintPlate(data)])),
  'independence-spectrum.svg':independencePlate(),
  'homestead-systems.svg':systemsPlate(),
  'food-production-pathways.svg':foodPlate(),
  'homestead-year-southwest-ontario.svg':yearPlate({title:'The homestead year · Southwest Ontario',dek:'A cold-winter operating year with a concentrated spring-through-autumn labour peak and winter-critical household systems.',region:'SOUTHWEST ONTARIO · cold winter / concentrated growing season',labour:[1,1,2,3,4,4,4,4,4,3,2,1],critical:[4,4,3,2,2,2,2,2,2,3,4,4],tasks:[['SPRING','start · plant · water systems'],['SUMMER / FALL','harvest · preserve · maintain'],['WINTER','heat · snow · backup readiness']]}),
  'homestead-year-coastal-bc.svg':yearPlate({title:'The homestead year · Coastal BC',dek:'A milder, longer growing year with work spread across more months and winter attention shifting toward rain, wind and drainage.',region:'COASTAL BC · mild winter / longer shoulder seasons',labour:[2,2,2,3,3,4,4,4,4,3,2,2],critical:[3,3,3,2,2,2,2,2,2,3,3,3],tasks:[['WINTER / EARLY SPRING','drainage · pruning · starts'],['SPRING / SUMMER','plant · irrigate · harvest'],['AUTUMN','preserve · storm readiness']]}),
};

export const visualGuideFiles=Object.keys(plates);
export async function renderVisualGuides(root){
  const out=resolve(root,'assets','visual-guides');
  await mkdir(out,{recursive:true});
  await Promise.all(Object.entries(plates).map(([name,svg])=>writeFile(resolve(out,name),svg,'utf8')));
  return visualGuideFiles;
}
