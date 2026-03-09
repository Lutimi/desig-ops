---
name: design-system
description: Create the mandatory design-system.html page for every project. Use when starting a new project or when documenting tokens, components, and visual styles.
---

# Design System Page

Every project MUST include a `design-system.html` that visually documents all tokens and components. This page is the reference for Figma export.

## Required Structure (6 sections)

### 1. Color Palette
- Visual swatch for each color
- Semantic Tailwind name (`bg-primary`, `text-accent`)
- Hex/CSS value
- Usage description (e.g. "Primary buttons, active links")
- WCAG contrast noted where applicable

### 2. Typography Scale
- All levels: h1-h6, body, caption, overline, button
- Font-family, weight, size in px, line-height
- Visual preview of each level with sample text
- Google Fonts import link

### 3. Spacing System
- Tailwind-based scale: 1(4px), 2(8px), 3(12px), 4(16px), 6(24px), 8(32px), 12(48px), 16(64px)
- Visual bars or blocks
- Notes on when to use each level

### 4. Components Gallery
- Buttons: primary, secondary, ghost, disabled, loading
- Cards: glass-card, solid-card with variants
- Inputs: text, password, select with states (focus, error, disabled)
- Badges/Tags
- Navbar
- Footer
- Each component with visual preview AND copyable HTML code

### 5. Icons & Assets
- Icons used in the project (inline SVG)
- AI-generated images (thumbnails)
- Logo if available

### 6. Grid & Layout
- Breakpoints: 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop)
- Main container max-width
- Column system used

## Page Rules

- Must be navigable with internal sidebar/nav
- Visually attractive (not a boring document)
- Uses the same Tailwind config as the project
- Includes accessibility notes (contrast, minimum sizes)
- Each section with anchor ID: `#colors`, `#typography`, `#spacing`, `#components`, `#assets`, `#grid`

## Connection to Figma

Everything in `design-system.html` maps to:
- **Paint Styles** in Figma (colors)
- **Text Styles** in Figma (typography)
- **Components** in Figma (buttons, cards, etc.)
- **Variables** in Figma (spacing, colors)

See `figma-export` skill for the full workflow.

## Base Template

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design System — [Project]</title>
</head>
<body class="bg-background text-text-main">
  <nav id="ds-nav"><!-- Internal navigation --></nav>
  <main>
    <section id="colors"><!-- Color Palette --></section>
    <section id="typography"><!-- Typography Scale --></section>
    <section id="spacing"><!-- Spacing System --></section>
    <section id="components"><!-- Components Gallery --></section>
    <section id="assets"><!-- Icons & Assets --></section>
    <section id="grid"><!-- Grid & Layout --></section>
  </main>
</body>
</html>
```

## Changelog

- v1.0 (2026-03-08): Initial skill extracted from monolithic rule
- v1.1 (2026-03-09): Rewritten in English
