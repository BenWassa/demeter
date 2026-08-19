const regionData = {
  ontario: {
    location: 'Ontario · Norfolk → Elgin → Middlesex',
    name: 'Southwest Ontario',
    thesis: 'The practical baseline: productive rural land, real towns nearby, and the strongest Toronto connection of the current shortlist.',
    winterScore: 56,
    winterLabel: 'Moderate',
    valueScore: 78,
    valueLabel: 'Strongest of 3',
    accessScore: 82,
    accessLabel: 'Strong',
    growingScore: 75,
    growingLabel: 'Strong',
    bottom: 'Best current balance for a fixer-upper acreage strategy without giving up hospitals, towns, remote-work infrastructure, or occasional Toronto access.'
  },
  fraser: {
    location: 'British Columbia · Mission → Chilliwack → Agassiz',
    name: 'Fraser Valley',
    thesis: 'The climate-and-access contender: milder winters and direct Lower Mainland connectivity, with significantly more pressure on land value and use.',
    winterScore: 88,
    winterLabel: 'Mildest',
    valueScore: 42,
    valueLabel: 'Expensive',
    accessScore: 88,
    accessLabel: 'Excellent',
    growingScore: 86,
    growingLabel: 'Excellent',
    bottom: 'Most compelling when climate and Vancouver access justify paying materially more for acreage and accepting tighter land-use constraints.'
  },
  island: {
    location: 'British Columbia · Cowichan → Nanaimo hinterland',
    name: 'Vancouver Island',
    thesis: 'The lifestyle wildcard: maritime climate, forest-and-field landscapes, and excellent homestead character if work becomes genuinely location-independent.',
    winterScore: 92,
    winterLabel: 'Mildest',
    valueScore: 52,
    valueLabel: 'Premium',
    accessScore: 58,
    accessLabel: 'Conditional',
    growingScore: 84,
    growingLabel: 'Excellent',
    bottom: 'Potentially the strongest pure homestead lifestyle, but the city-access equation changes quickly when regular Vancouver or Toronto attendance enters the picture.'
  }
};

const systemData = {
  water: {
    flow: ['Well', 'Pump', 'Pressure', 'Treatment', 'House'],
    title: 'Own the source. Learn the routine.',
    copy: 'A drilled well can make household water independent without turning the owner into a well contractor. The practical job is testing, filters, pump awareness, freeze protection, and having a plan for outages.',
    effort: 'Low–moderate',
    risk: 'High',
    resilience: 'Storage + backup power'
  },
  power: {
    flow: ['Grid', 'Solar', 'Inverter', 'Battery', 'House'],
    title: 'Resilience matters more than disconnection.',
    copy: 'A grid-optional home can combine a normal utility connection with solar, battery storage, and generator backup. The objective is continuity and lower dependence, not removing a useful connection simply to qualify as “off-grid.”',
    effort: 'Low after install',
    risk: 'High in winter',
    resilience: 'Battery + generator'
  },
  heat: {
    flow: ['Heat pump', 'Wood', 'Fuel backup', 'Envelope', 'House'],
    title: 'Canadian comfort requires redundancy.',
    copy: 'Heating is where romantic off-grid ideas meet winter. A strong system starts with the building envelope, uses an efficient primary source, and keeps a second heat source that can operate through outages or extreme cold.',
    effort: 'Moderate',
    risk: 'Critical',
    resilience: 'Second heat source'
  },
  food: {
    flow: ['Soil', 'Beds', 'Greenhouse', 'Storage', 'Kitchen'],
    title: 'Food independence grows in layers.',
    copy: 'Meaningful food production does not require farming every acre. Intensive beds, greenhouse space, berries, orchard crops, storage, and chickens can create a substantial household food system while leaving most land flexible.',
    effort: 'Moderate–high',
    risk: 'Low',
    resilience: 'Diversity + storage'
  }
};

const acreageData = {
  3: {
    label: '3-acre capacity',
    thesis: 'Compared with the fixed 10-acre reference drawing, three well-arranged acres can still hold a comfortable rural home, serious garden, small orchard, chickens, workshop, and privacy. A distinct 3-acre plan is a later blueprint deliverable.',
    list: [
      ['1 ac', 'house, drive, septic, well, utility area'],
      ['0.5–1 ac', 'garden, greenhouse, orchard, compost'],
      ['0.5 ac', 'shop, chickens, flexible yard'],
      ['remainder', 'privacy buffer, paths, future use']
    ]
  },
  10: {
    label: '10-acre reference plan',
    thesis: 'The drawing at left is the authored reference: enough room for serious food production, a shop, optional pasture, and a meaningful privacy/woodlot buffer without requiring a full farm operation.',
    list: [
      ['1–2 ac', 'house, drive, septic, garden, shop'],
      ['2–3 ac', 'orchard, greenhouse, intensive food zone'],
      ['2–3 ac', 'pasture / flexible field'],
      ['3+ ac', 'woodlot, trails, privacy, future use']
    ]
  },
  20: {
    label: '20-acre capacity',
    thesis: 'Compared with the fixed 10-acre reference drawing, twenty acres moves into true smallholding territory: more livestock, woodlot, field, habitat, and future-building options — alongside much more maintenance. A distinct 20-acre plan is a later blueprint deliverable.',
    list: [
      ['2 ac', 'household core + infrastructure'],
      ['3–4 ac', 'orchard, market-scale garden, greenhouse'],
      ['5–7 ac', 'rotational pasture / flexible field'],
      ['7+ ac', 'woodlot, trails, habitat, expansion']
    ]
  }
};

function setSelectionState(buttons, activeButton) {
  buttons.forEach((button) => {
    const active = button === activeButton;
    button.classList.toggle('is-active', active);

    if (button.getAttribute('role') === 'tab') {
      button.setAttribute('aria-selected', String(active));
    } else {
      button.setAttribute('aria-pressed', String(active));
    }
  });
}

function updateRegion(regionKey) {
  const data = regionData[regionKey];
  if (!data) return;

  document.querySelector('#region-location').textContent = data.location;
  document.querySelector('#region-name').textContent = data.name;
  document.querySelector('#region-thesis').textContent = data.thesis;
  document.querySelector('#winter-meter').style.setProperty('--score', `${data.winterScore}%`);
  document.querySelector('#winter-label').textContent = data.winterLabel;
  document.querySelector('#value-meter').style.setProperty('--score', `${data.valueScore}%`);
  document.querySelector('#value-label').textContent = data.valueLabel;
  document.querySelector('#access-meter').style.setProperty('--score', `${data.accessScore}%`);
  document.querySelector('#access-label').textContent = data.accessLabel;
  document.querySelector('#growing-meter').style.setProperty('--score', `${data.growingScore}%`);
  document.querySelector('#growing-label').textContent = data.growingLabel;
  document.querySelector('#region-bottom').textContent = data.bottom;
}

function updateSystem(systemKey) {
  const data = systemData[systemKey];
  if (!data) return;

  const flow = document.querySelector('#system-flow');
  flow.setAttribute('aria-label', `${systemKey} system flow`);
  flow.replaceChildren();

  data.flow.forEach((step, index) => {
    const span = document.createElement('span');
    span.textContent = step;
    flow.append(span);

    if (index < data.flow.length - 1) {
      const connector = document.createElement('i');
      connector.setAttribute('aria-hidden', 'true');
      flow.append(connector);
    }
  });

  document.querySelector('#system-title').textContent = data.title;
  document.querySelector('#system-copy').textContent = data.copy;
  document.querySelector('#system-effort').textContent = data.effort;
  document.querySelector('#system-risk').textContent = data.risk;
  document.querySelector('#system-resilience').textContent = data.resilience;
}

function updateAcreage(acres) {
  const data = acreageData[acres];
  if (!data) return;

  document.querySelector('#acreage-label').textContent = data.label;
  document.querySelector('#acreage-thesis').textContent = data.thesis;

  const list = document.querySelector('#acreage-list');
  list.replaceChildren();

  data.list.forEach(([amount, use]) => {
    const item = document.createElement('li');
    const strong = document.createElement('strong');
    const span = document.createElement('span');
    strong.textContent = amount;
    span.textContent = use;
    item.append(strong, span);
    list.append(item);
  });
}

const regionButtons = [...document.querySelectorAll('[data-region]')];
regionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setSelectionState(regionButtons, button);
    updateRegion(button.dataset.region);
  });
});

const systemButtons = [...document.querySelectorAll('[data-system]')];
systemButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setSelectionState(systemButtons, button);
    updateSystem(button.dataset.system);
  });
});

const acreageButtons = [...document.querySelectorAll('[data-acres]')];
acreageButtons.forEach((button) => {
  if (!button.hasAttribute('aria-pressed')) button.setAttribute('aria-pressed', 'false');

  button.addEventListener('click', () => {
    setSelectionState(acreageButtons, button);
    updateAcreage(button.dataset.acres);
  });
});
