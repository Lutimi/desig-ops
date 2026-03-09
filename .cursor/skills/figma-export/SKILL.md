---
name: figma-export
description: Export web projects to Figma using html.to.design and figma-ds-cli. Use when the user wants to transfer a finished project to Figma with organized styles, variables, and components.
---

# Figma Export

Complete workflow to export a web project to Figma with visual fidelity and correct design tokens.

## 2-Step Workflow

### Step 1 — User imports with html.to.design

The user manually imports using the html.to.design plugin (MCP configured in `.cursor/mcp.json`):

1. **Landing desktop** (1440px) — pixel-perfect visual replica
2. **Landing mobile** (375px) — responsive version
3. **design-system.html** (desktop) — all tokens and components

The plugin creates frames in Figma with images, text, and DOM structure.
The user confirms when the import is done.

### Step 2 — Cursor applies styles and organizes

Use `figma-starter/` (figma-ds-cli) to:

1. Create Paint Styles, Text Styles, Variables
2. Bind styles to the imported nodes
3. Organize pages per the required structure

**IMPORTANT** — Always use Figma async APIs:

```
figma.getLocalPaintStylesAsync()
figma.getLocalTextStylesAsync()
node.setFillStyleIdAsync(styleId)
node.setTextStyleIdAsync(styleId)
node.setStrokeStyleIdAsync(styleId)
```

## Color Styles (Paint Styles)

Organized by category using `/` separators. Names map directly to Tailwind classes.

### Brand Colors

```
Brand / primary          → #6366F1  (bg-primary, text-primary)
Brand / primary-hover    → #818CF8  (hover:bg-primary-hover)
Brand / accent           → #34D399  (bg-accent, text-accent)
Brand / accent-hover     → #6EE7B7  (hover:bg-accent-hover)
```

### Surface Colors

```
Surface / background     → #0B0E14  (bg-background)
Surface / surface        → #151925  (bg-surface)
Surface / surface-alt    → #1E2333  (bg-surface-alt)
```

### Text Colors

```
Text / text-main         → #F8FAFC  (text-text-main)
Text / text-muted        → #94A3B8  (text-text-muted)
Text / text-dim          → #64748B  (text-text-dim)
```

### Border Colors

```
Border / border          → #1E293B  (border-border)
Border / border-hover    → #334155  (border-border-hover)
Border / white-5         → rgba(255,255,255,0.05)
Border / primary-20      → rgba(99,102,241,0.2)
```

### Effect Colors

```
Effect / glass           → rgba(21,25,37,0.6)   (glass-card bg)
Effect / glass-hover     → rgba(30,35,51,0.8)   (glass-card hover)
Effect / primary-10      → rgba(99,102,241,0.1)  (glow, overlay)
Effect / accent-10       → rgba(52,211,153,0.1)  (glow, overlay)
```

### Style Description Format

Every Paint Style description must include:

```
Usage: [where it's used]
Tailwind: [exact class name]
Value: [hex or rgba]
```

Example: `Usage: Primary buttons, active links | Tailwind: bg-primary | Value: #6366F1`

## Text Styles

Organized by Tailwind utility classes. The style name IS the Tailwind class combination.

### Display (font-display — e.g. Space Grotesk)

```
font-display / text-7xl font-bold      → 72px / 1.1  / 700
font-display / text-6xl font-bold      → 60px / 1.1  / 700
font-display / text-5xl font-bold      → 48px / 1.1  / 700
font-display / text-4xl font-bold      → 36px / 1.15 / 700
font-display / text-3xl font-bold      → 30px / 1.2  / 700
font-display / text-3xl font-semibold  → 30px / 1.2  / 600
font-display / text-2xl font-bold      → 24px / 1.25 / 700
font-display / text-2xl font-semibold  → 24px / 1.25 / 600
font-display / text-xl font-semibold   → 20px / 1.3  / 600
font-display / text-lg font-semibold   → 18px / 1.4  / 600
```

### Body (font-body — e.g. Inter)

```
font-body / text-xl                    → 20px / 1.6  / 400
font-body / text-lg                    → 18px / 1.6  / 400
font-body / text-base                  → 16px / 1.6  / 400
font-body / text-base font-medium      → 16px / 1.6  / 500
font-body / text-sm                    → 14px / 1.5  / 400
font-body / text-sm font-medium        → 14px / 1.5  / 500
font-body / text-xs                    → 12px / 1.5  / 400
font-body / text-xs font-semibold      → 12px / 1.5  / 600
```

### UI Elements

```
UI / button-primary      → font-body, 14px, 500, tracking-wide
UI / button-ghost        → font-body, 14px, 500, tracking-normal
UI / nav-link            → font-body, 14px, 500
UI / nav-brand           → font-display, 20px, 700
UI / badge               → font-body, 10px, 600, uppercase, tracking-wider
UI / section-label       → font-body, 12px, 600, uppercase, tracking-widest
UI / overline            → font-body, 11px, 600, uppercase, tracking-widest
```

### Style Description Format

Every Text Style description must include:

```
Usage: [where it's used]
HTML: [example tag]
Size: [px] / Line-height: [value] / Weight: [number]
```

Example: `Usage: Page titles | HTML: <h1> | Size: 72px / Line-height: 1.1 / Weight: 700`

## Variables

### Color Variable Collection

One collection named `Colors` with all project colors:

```
Brand/primary         → #6366F1
Brand/primary-hover   → #818CF8
Brand/accent          → #34D399
Brand/accent-hover    → #6EE7B7
Surface/background    → #0B0E14
Surface/surface       → #151925
Surface/surface-alt   → #1E2333
Text/text-main        → #F8FAFC
Text/text-muted       → #94A3B8
Text/text-dim         → #64748B
Border/border         → #1E293B
Border/border-hover   → #334155
```

### Spacing Variable Collection

One collection named `Spacing` with Tailwind scale:

```
spacing/1   → 4px
spacing/2   → 8px
spacing/3   → 12px
spacing/4   → 16px
spacing/5   → 20px
spacing/6   → 24px
spacing/8   → 32px
spacing/10  → 40px
spacing/12  → 48px
spacing/16  → 64px
spacing/20  → 80px
spacing/24  → 96px
```

## Figma Components

Every UI component must be a Figma Component (not a plain frame):

```
Button / Primary
Button / Secondary
Button / Ghost
Button / Disabled
Card / Glass
Card / Solid
Card / Outlined
Badge / Default
Badge / Accent
Input / Default
Input / Focus
Input / Error
Input / Disabled
Navbar
Footer
```

## Required Figma Pages

```
Cover
Color Tokens
Typography
Spacing
Components
Landing Page
Design System Doc
```

## Critical Rule

If anything fails during export:

1. STOP immediately
2. Explain what failed and why
3. Ask the user how to proceed
4. NEVER continue assuming

## Changelog

- v1.0 (2026-03-08): Initial skill with html.to.design + figma-ds-cli workflow
- v1.1 (2026-03-09): Full Tailwind nomenclature for Color Styles and Text Styles, all docs in English
