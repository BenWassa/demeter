const polish=document.createElement('link');
polish.rel='stylesheet'; polish.href='src/polish.css'; document.head.append(polish);

const tabGroups = [
  ['#region-tabs','region-panel'],['#system-tabs','system-panel'],['#food-tabs','food-panel'],['#arch-tabs','arch-panel']
];
for (const [groupSelector,panelId] of tabGroups) {
  const group=document.querySelector(groupSelector); if(!group) continue;
  group.setAttribute('role','tablist');
  const buttons=[...group.querySelectorAll('button')];
  buttons.forEach((button,index)=>{
    button.setAttribute('role','tab');
    button.id ||= `${group.id}-tab-${index+1}`;
    button.setAttribute('aria-controls',panelId);
    button.addEventListener('click',()=>{
      const panel=document.getElementById(panelId);
      if(panel) panel.setAttribute('aria-labelledby',button.id);
    });
  });
}
const panels=[['.atlas .plate','region-panel','#region-tabs .on'],['.schematic','system-panel','#system-tabs .on'],['.field','food-panel','#food-tabs .on'],['.acq .plate','arch-panel','#arch-tabs .on']];
for(const [selector,id,labelSelector] of panels){
  const panel=document.querySelector(selector); if(!panel) continue;
  panel.id=id; panel.setAttribute('role','tabpanel'); panel.tabIndex=0;
  const label=document.querySelector(labelSelector); if(label) panel.setAttribute('aria-labelledby',label.id);
}
