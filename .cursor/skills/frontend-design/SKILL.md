---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces. Use when building web components, pages, landing pages, dashboards, or any UI. Generates creative, polished code that avoids generic AI aesthetics.
---

# Frontend Design

Skill for creating distinctive frontend interfaces that avoid generic "AI slop" aesthetics. Implement functional code with exceptional attention to aesthetic details.

## Design Thinking

Before coding, commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme — brutally minimal, maximalist, retro-futuristic, organic, luxury, playful, editorial, art deco, industrial, etc.
- **Differentiation**: What makes this UNFORGETTABLE?

## Aesthetic Rules

### Typography
- Choose unique, characterful fonts from Google Fonts
- NEVER default to: Arial, Inter (generic), Roboto, system fonts
- Pair: bold display font + refined body font
- Proven combos: Space Grotesk + Inter, Syne + DM Sans, Clash Display + Satoshi

### Color
- CSS variables for cohesive palette
- Dominant colors with sharp accents > timid evenly-distributed palettes
- Dark mode: backgrounds between #0A-#15, never pure black #000
- Glassmorphism: `backdrop-blur` + semi-transparent borders + opacity backgrounds

### Motion
- Pure CSS animations (compatible with Astro and vanilla)
- Prioritize: staggered entrance (`animation-delay`), surprising hover states, scroll reveals
- Custom `@keyframes` > generic utility classes
- WARNING: Complex animations break Puppeteer screenshots — document when skipping

### Layout
- Asymmetry, overlap, diagonal flow, grid-breaking elements
- Generous negative space OR controlled density
- NEVER: predictable centered card-stack

### Backgrounds & Depth
- Gradient meshes, noise textures, grain overlays, transparencies
- Dramatic shadows, blur layers
- NEVER: flat solid backgrounds without texture

## Learned Patterns (NexVault)

### Effective Glassmorphism

```css
.glass-card {
  background: rgba(21, 25, 37, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
}
```

### Orbital Animations (hero sections)
- Rings rotating at different speeds and directions
- Floating orbs with glow (`box-shadow` with color and blur)
- Floating glass cards with skill labels
- Particles with fade in/out

### Text Gradient

```css
.text-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Grain Overlay

```css
.grain::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,...");
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

## Anti-Patterns

- Purple-on-white gradients (AI cliche)
- Generic centered layouts with no personality
- Same fonts across all projects
- Animations that add no meaning
- Flat solid backgrounds without texture or depth

## Mandatory Variety

NEVER converge on the same choices between projects:
- Alternate light/dark themes
- Different font families
- Different visual styles
- Each project must feel unique

## Changelog

- v1.0 (2026-03-08): Initial skill
- v1.1 (2026-03-08): Added NexVault patterns, anti-patterns, Puppeteer animation lesson
- v1.2 (2026-03-09): Rewritten in English
