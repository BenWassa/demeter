# Project Demeter — Product Requirements Document

## 1. Product Summary

Project Demeter is an interactive planning tool for designing a comfortable, resilient, semi-off-grid life in Canada.

It combines regional comparison, property archetypes, homestead systems, land-use blueprints, cost/risk thinking, and a phased transition roadmap in one coherent experience.

The initial product should feel equally capable of doing two things:

- making the life vivid enough to evaluate emotionally;
- making the trade-offs concrete enough to evaluate rationally.

The user should move naturally from **aspiration → comparison → understanding → spatial planning → action plan**.

## 2. Problem

“Living off-grid” is a vague category that hides several distinct decisions:

- where to live;
- how remote to be;
- how much land is genuinely useful;
- whether to buy an existing rural property or build;
- how water, septic, power, heat, food, internet, access, and transport work together;
- how much comfort to preserve;
- how much work and technical knowledge the lifestyle requires;
- how to sequence the transition financially and practically.

Existing information is fragmented across real-estate sites, municipal regulations, homesteading media, farming resources, energy installers, Reddit/YouTube, and government pages. It is difficult to see the whole system or compare one life configuration against another.

Demeter should create that integrated mental model.

## 3. Product Vision

A user should be able to open Demeter and answer:

> “What would a resilient rural life that actually fits me look like, where could I build it, and what would it take?”

The long-term product can become a personal decision environment for one of the largest lifestyle choices a user can make.

## 4. Initial User Scenario

The seed scenario for v0/v1 is a Canadian professional planning 5–10 years ahead who wants:

- substantial privacy and land without wilderness-level remoteness;
- moderate-to-high self-sufficiency;
- high comfort and modern amenities;
- meaningful food production;
- remote-first work;
- groceries and hospital access around 30 minutes where feasible;
- occasional access to a major employment city;
- milder Canadian climates rather than the harshest winter zones;
- potentially 10–25 acres, while remaining open to smaller acreage if it meets the actual use case;
- an older/fixer rural property as the current baseline acquisition strategy, while still wanting to understand new-build economics.

The product architecture must support other preference profiles later.

## 5. Product Principles

### 5.1 Reality and aspiration must coexist

Cinematic imagery is valuable only if it connects back to land, systems, cost, access, or lifestyle. The product should inspire without manufacturing fantasy.

### 5.2 Useful land beats raw acreage

Acreage is not a sufficient proxy. Sun exposure, soil, slope, drainage, zoning, existing structures, water, tree cover, access, and layout are first-class factors.

### 5.3 Resilience beats ideological purity

Demeter should distinguish:

- rural conventional;
- semi-off-grid;
- grid-optional / resilient;
- fully off-grid.

The app should not assume that disconnecting a functioning grid connection is desirable.

### 5.4 Progressive complexity

Every system should begin with a simple mental model, then expose maintenance, cost, failure modes, and regulation as the user asks for depth.

### 5.5 Volatile facts are dated

Property-market snapshots, regulations, incentives, schedules, climate data, and prices should carry source metadata and freshness dates.

## 6. Information Architecture

### 6.1 Home / Field Atlas

Purpose: establish the vision and route the user into exploration.

Content:

- cinematic hero;
- concise articulation of the Demeter model;
- current planning profile summary;
- three initial region entries;
- preview of land blueprint;
- preview of system stack;
- path into planner.

Primary actions:

- Explore regions
- Shape my homestead

### 6.2 Region Explorer

Initial regions:

- Southwest Ontario
- Fraser Valley, BC
- Central / South Vancouver Island

Each region should contain:

- cinematic visual identity;
- geographic orientation;
- climate / winter reality;
- land and property profile;
- healthcare / grocery / city access;
- food-growing potential;
- regulatory considerations;
- likely acquisition archetypes;
- strengths;
- compromises;
- “best fit when…” summary;
- evidence/source panel.

### 6.3 Region Comparison

Users select two or three regions.

Comparison dimensions:

- winter severity;
- growing potential;
- acreage affordability;
- city access;
- healthcare/grocery access;
- regulatory complexity;
- wildfire/flood/other relevant hazards;
- water considerations;
- internet/work viability;
- overall fit with selected preferences.

The comparison should use rows and aligned measurements rather than a grid of identical cards.

### 6.4 Lifestyle Planner

Inputs should remain understandable rather than becoming a 40-field form.

Initial controls:

- comfort;
- privacy;
- self-sufficiency;
- food-production ambition;
- willingness for physical work;
- winter tolerance;
- target town/hospital distance;
- city attendance requirement;
- acreage aspiration;
- livestock ambition;
- fixer vs finished vs raw land;
- grid-connected vs grid-optional vs fully off-grid preference;
- budget when known.

Outputs:

- recommended region order;
- recommended property archetype;
- recommended acreage band;
- system stack;
- key tensions/trade-offs;
- first research priorities;
- roadmap implications.

Recommendation logic should be transparent enough that the user can understand why an option scores well or poorly.

### 6.5 Systems Library

Initial systems:

- Water
- Wastewater / septic
- Electricity
- Heating
- Food
- Livestock
- Buildings / workshop
- Internet / remote work
- Access / transport
- Land / soil / drainage

Each system page or panel should follow a consistent learning ladder:

1. What it does
2. Simple system diagram
3. What the owner actually has to do
4. Typical maintenance
5. Failure modes
6. Cost bands
7. Regulation / professional work boundaries
8. Upgrade path
9. How the system interacts with other systems

### 6.6 Blueprint Lab

Purpose: make acreage spatially legible.

Initial scenarios:

- 3 acres
- 10 acres
- 20 acres

Initial layers:

- house;
- driveway / access;
- septic field and reserve area;
- well / water zone;
- garden;
- greenhouse;
- orchard / berries;
- chickens;
- pasture;
- barn/workshop;
- solar zone;
- water storage;
- woodlot;
- trails / recreation;
- privacy buffer.

v0 can use authored layouts. Later versions can support drag/reposition, parcel dimensions, sun, slope, and setbacks.

### 6.7 Property Archetypes

Initial archetypes:

- Comfortable Starter Homestead
- Rural Fixer on Useful Acreage
- Expanded Working Homestead
- BC Lifestyle Acreage
- Ontario Value Acreage
- Raw-Land Custom Build

Each should include:

- who it fits;
- typical acreage;
- infrastructure starting point;
- expected work level;
- capital intensity;
- biggest risks;
- likely first three years of upgrades.

### 6.8 Roadmap

Default transition stages:

- Phase 0 — clarify life / career / financial constraints
- Phase 1 — build skills and test rural living
- Phase 2 — shortlist regions and property archetypes
- Phase 3 — acquire property
- Phase 4 — stabilize house and critical systems
- Phase 5 — establish food and workshop systems
- Phase 6 — deepen energy / water / food resilience

The roadmap should be editable later, but the first version can present it as an informed default.

## 7. MVP Definition

The MVP should prove the experience before building a large data backend.

### Required

1. Responsive landing experience
2. Three-region explorer / comparison
3. Lightweight preference planner
4. Four foundational system explainers: water, septic, power, heating
5. One strong 10-acre blueprint
6. Property-archetype overview
7. Phased roadmap
8. Research/source model documented even if much content is seeded locally

### Deliberately deferred

- live property listings;
- accounts / auth;
- cloud sync;
- map-based parcel search;
- geospatial parcel analysis;
- construction estimating engine;
- crop calendar;
- livestock management;
- AI chat agent;
- real-time travel routing;
- automated regulatory interpretation.

## 8. Initial Front-End Prototype

Before framework selection, build a zero-build interactive concept in the repo root so it can be opened locally or deployed directly with GitHub Pages.

The concept should prove:

- cinematic hero direction;
- visual hierarchy;
- regional comparison vocabulary;
- interactive system switching;
- authored blueprint treatment;
- mobile behavior;
- whether the visual identity can carry both inspiration and practical analysis.

Do not treat this prototype as the final application architecture.

## 9. Visual / Experience Direction

See `DESIGN.md` for the durable design contract.

Working thesis:

**A modern Canadian field atlas:** documentary landscape photography, land-survey precision, agricultural field-guide typography, restrained natural color, and blueprints that are genuinely informational.

The design should avoid:

- generic SaaS dashboards;
- repeated rounded cards;
- prepper aesthetics;
- cottagecore nostalgia;
- luxury real-estate gloss;
- faux-rustic textures;
- meaningless topo/grid decoration outside places where mapping or measurement is real.

## 10. Data Model

A later application can normalize the following entities.

### Region

- id
- name
- province
- geography summary
- climate metrics
- growing metrics
- access metrics
- cost metrics
- regulation notes
- hazard notes
- property archetypes
- strengths
- trade-offs
- source references
- last researched

### Preference Profile

- comfort
- privacy
- selfSufficiency
- foodProduction
- physicalWork
- winterTolerance
- townAccess
- cityAccess
- acreagePreference
- livestockPreference
- acquisitionPreference
- gridPreference
- budget

### Homestead System

- id
- name
- purpose
- simple model
- owner tasks
- maintenance
- failure modes
- cost bands
- professional boundaries
- dependencies
- source references

### Blueprint Scenario

- acreage
- assumptions
- zones
- structures
- infrastructure
- optional layers
- notes

### Source Record

- title
- publisher
- url
- jurisdiction
- published / updated date
- retrieved date
- claim tags
- confidence / notes

## 11. Research Architecture

Demeter should distinguish three classes of information.

### Durable knowledge

Examples: how a pressure tank works, what a septic drain field does, what redundancy means.

Store as maintained product content.

### Jurisdictional rules

Examples: building permits, septic requirements, agricultural land restrictions.

Store with jurisdiction and review date. Never generalize a municipal rule to an entire province without evidence.

### Volatile market / logistical data

Examples: listing prices, transit schedules, incentives, contractor costs.

Always timestamp. Prefer source links and ranges over false precision.

## 12. Accessibility Requirements

- WCAG AA contrast as baseline.
- Keyboard operability for all controls.
- Visible `:focus-visible` state.
- Touch targets at least ~44px where practical.
- Reduced-motion support.
- Meaning must never depend on color alone.
- Blueprint labels need a non-visual equivalent or data table in production.
- Comparison content must remain readable without horizontal precision gestures on mobile.
- Hero imagery must not compromise text legibility.

## 13. Responsive Requirements

### Mobile

- linear, editorial exploration;
- region comparison becomes stacked rows with a persistent selected-region context;
- blueprint remains pannable/zoomable later, but the authored MVP should scale legibly and provide a text legend;
- planner controls should be thumb-friendly and never depend on hover.

### Tablet

- two-column comparisons where useful;
- blueprint and legend may split.

### Desktop

- wider comparison matrix;
- blueprint and system detail can coexist side-by-side;
- photography can carry more cinematic scale without pushing analysis below the fold unnecessarily.

## 14. Performance Requirements

- Hero image should use responsive formats and sizing in production.
- Noncritical imagery should lazy-load.
- Core comparison and planner interactions should work without waiting for large imagery.
- Avoid JS-heavy visual effects that do not improve comprehension.
- Prototype should remain dependency-free.

## 15. Measurement

Early success is qualitative and task-based.

Useful signals:

- user can identify a leading region after comparison;
- user can explain why the recommendation fits;
- user can correctly describe the major homestead systems after exploration;
- user can estimate what different acreages can hold;
- user leaves with a concrete next action rather than more ambiguity.

Future analytics can measure:

- planner completion;
- region comparison depth;
- system explainer opens;
- blueprint interaction;
- saved scenarios;
- return visits after research updates.

## 16. Risks

### False precision

Risk: cost and suitability scores look more authoritative than the underlying data.

Mitigation: ranges, timestamps, source transparency, confidence labels.

### Romanticization

Risk: beautiful imagery makes difficult properties look more suitable than they are.

Mitigation: pair visual inspiration with maintenance, access, risk, and system reality.

### Regulatory overreach

Risk: the app implies legal advice or universal provincial rules.

Mitigation: jurisdictional sourcing and explicit due-diligence boundaries.

### Scope explosion

Risk: Demeter turns into real estate + farming + construction + finance + maps simultaneously.

Mitigation: preserve the core decision chain and add depth only when it helps the user choose.

### Generic design

Risk: the concept collapses into cards, sliders, green gradients, and leaf icons.

Mitigation: enforce the field-atlas visual thesis in `DESIGN.md` and use Impeccable critique/audit passes on major UI work.

## 17. Delivery Plan

### Milestone 0 — Foundation

- PRODUCT.md
- PRD
- DESIGN.md
- deployable concept homepage

### Milestone 1 — Regional Atlas

- structured region data
- three region detail experiences
- comparison interaction
- source/freshness model

### Milestone 2 — Homestead Planner

- preference profile
- recommendation logic v1
- property archetypes
- recommendation explanation

### Milestone 3 — Systems + Blueprint

- systems library
- 3 / 10 / 20 acre authored plans
- cross-system dependencies

### Milestone 4 — Planning Workspace

- scenario persistence
- roadmap customization
- cost ranges
- export / share

### Milestone 5 — Data Expansion

Only after the core product proves useful:

- richer maps;
- current market data;
- deeper municipal research;
- property evaluation workflow.

## 18. MVP Acceptance Criteria

The MVP is successful when a first-time user can, on mobile or desktop:

1. understand Demeter within the first viewport;
2. explore three materially different Canadian region options;
3. provide a compact lifestyle preference profile;
4. receive an understandable recommendation rather than an opaque score;
5. learn the basic role of water, septic, power, and heating systems;
6. inspect a spatially coherent 10-acre homestead blueprint;
7. understand a realistic phased route from current life to operating homestead;
8. identify where claims came from and when volatile information was last checked.
