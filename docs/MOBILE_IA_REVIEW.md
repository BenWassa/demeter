# Demeter — Mobile & Information Architecture Review

**Review date:** 2026-08-19  
**Pass:** Impeccable critique → adapt → harden → polish  
**Scope:** mobile visual-atlas interaction and page-level information architecture

## Material critique

### 1. Visual viewer used desktop controls as the primary mobile model

The V1.1 lightbox supported wheel zoom, +/- buttons, drag and double-click. It worked, but on a touchscreen the interaction hierarchy was backwards: a detailed image should feel directly manipulable.

**Decision:** make **pinch-to-zoom** the primary touch zoom gesture, **one-finger drag** the pan gesture once magnified, and **double-tap** a fast zoom/reset shortcut. Keep visible zoom buttons and Reset as a secondary path.

Why the buttons remain: WCAG requires functionality that uses a multipoint gesture to also be operable without that gesture. The explicit controls are therefore accessibility infrastructure, not the preferred mobile interaction.

### 2. The homepage became a product inventory

The original V1 primary path—fit → regions → systems → land → food → acquisition → roadmap—worked for a first guided read. After the visual atlas and deeper tools were added, the same architecture became expensive for repeat use: users had to remember where a tool lived and scroll through unrelated sections to reach it.

**Decision:** Demeter becomes a small set of focused workspaces:

- **Home** — orientation and routing only
- **Regions** — Fit Lab + regional atlas + evidence register
- **Systems** — water, wastewater, power and heat
- **Land** — 3/10/20-acre Blueprint Lab + food/livestock depth
- **Visuals** — nine field-atlas plates + full-screen viewer
- **Plan** — acquisition strategy + transition roadmap

This preserves the narrative sequence as navigation while reducing page length and improving repeat-use recognition.

## Adapt pass

### Touch viewer

- `touch-action:none` is confined to the full-screen image stage, not the document.
- Two active touch pointers control pinch scale around the gesture midpoint.
- A single pointer pans only when the image is magnified.
- Double-tap toggles quick magnification/reset.
- Mouse wheel, keyboard +/-/0 and explicit buttons remain available.
- Mobile controls are visually demoted into a compact floating fallback bar.
- Touch guidance says **Pinch to zoom · drag to pan · double-tap to reset**.

### Navigation

- Primary navigation becomes page-based rather than anchor-based.
- `aria-current="page"` marks the active workspace.
- On mobile, the existing horizontally scrollable navigation rail remains available instead of being hidden behind a custom menu.
- Home uses five large route targets with plain-language questions: Where? What must run? How much land? See it. How do I get there?

## Harden pass

- Each focused page has a usable static fallback shell before enhancement.
- Shared data and interaction modules remain centralized; the page split does not fork business logic.
- Build output includes all six HTML entry points.
- Existing keyboard tabs, focus indicators, forced-colors support and reduced-motion support remain intact.
- Visual zoom retains single-pointer/button alternatives to multipoint gestures.
- CI is expanded to open every workspace independently and check document-level mobile overflow.

## Polish threshold

The goal is **less interface, not more navigation chrome**. Do not add a hamburger menu, bottom tab bar, breadcrumbs and page rails simultaneously. The current header rail + clear home hub is sufficient until usage proves otherwise.

Likewise, do not remove zoom buttons merely because pinch works. Their role is accessibility and discoverability; on mobile they should be secondary, not absent.

## Release criteria

- Home contains no full Fit/Region/Blueprint modules.
- All five workspace routes are visible from Home.
- Every workspace loads independently at a stable URL.
- All existing interactive tools still work in their new workspace.
- All nine visual assets decode from the built artifact.
- Lightbox button/keyboard path passes on desktop and mobile.
- Pinch gesture implementation and touch-action containment are deterministic source invariants.
- No page creates document-level horizontal overflow on the mobile Playwright profile.
