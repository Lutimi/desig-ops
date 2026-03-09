---
name: web-project-setup
description: Initialize a web project from scratch with correct folder structure, semantic Tailwind config, and mandatory questions. Use when the user asks to create a new site, landing page, or web project.
---

# Web Project Setup

Skill for initializing web projects with the correct structure and configuration from the start.

## Initialization Flow

### 1. Confirm Step 0 Answers

The global rule (`global.mdc`) handles mandatory questions (language, industry, country). Before proceeding, verify those answers are available. If not, ask now.

### 2. Create Folder Structure

```
proyectos/[project-name]/
├── src/
│   ├── index.html
│   ├── design-system.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
└── public/
    └── images/
```

### 3. Configure Tailwind

Copy the base template from `templates/tailwind.config.template.js` and adapt:
- Colors based on project branding
- Fonts based on industry and tone
- ALWAYS keep semantic names

For Tailwind v4 (Astro/Vite projects), use `@theme {}` in CSS:

```css
@import "tailwindcss";

@theme {
  --color-background: #0B0E14;
  --color-surface: #151925;
  --color-primary: #6366F1;
  --color-accent: #34D399;
  --color-text-main: #F8FAFC;
  --color-text-muted: #94A3B8;
  --color-text-dim: #64748B;
  --color-border: #1E293B;
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

For Tailwind v3 (vanilla projects), use `tailwind.config.js`.

### 4. Base HTML

The `index.html` must include:
- Google Fonts preload for chosen fonts
- Tailwind CSS via CDN or build
- Semantic structure with `<!-- SECTION: Name -->` per section
- Basic meta tags (title, description, viewport, og:image)

### 5. Post-Setup Checklist

- [ ] Folder structure created
- [ ] Tailwind configured with semantic names
- [ ] Google Fonts included
- [ ] `index.html` with base structure
- [ ] `design-system.html` created (see `design-system` skill)
- [ ] Local server running (`live-server` or `astro dev`)

## Architecture Decisions

| Project type | Recommended stack |
|-------------|-------------------|
| Quick prototype / static landing | Vanilla HTML + Tailwind CDN |
| Any real project (default) | Astro + Tailwind v4 + React islands |

**Astro is the default for all projects.** It covers every scenario in our workflow:

- Static by default → fast, Vercel-friendly, great for html.to.design
- Tailwind v4 native via `@tailwindcss/vite`
- React islands via `@astrojs/react` → 21st.dev components work directly
- Multi-page routing built-in → design-system page, project pages
- Puppeteer screenshots work (static output)
- Already proven in our portfolio

Use vanilla HTML only for quick throwaway prototypes.

## Astro Project Setup

```bash
cd proyectos
npm create astro@latest [project-name]
```

Select: Empty project, TypeScript (strict), install dependencies.

### Post-create steps

```bash
cd [project-name]
npx astro add tailwind react
```

This installs:
- `@tailwindcss/vite` — Tailwind v4
- `@astrojs/react` — React component support (for 21st.dev)

### Apply semantic tokens

In `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --color-background: #0B0E14;
  --color-surface: #151925;
  --color-primary: #6366F1;
  --color-accent: #34D399;
  --color-text-main: #F8FAFC;
  --color-text-muted: #94A3B8;
  --color-text-dim: #64748B;
  --color-border: #1E293B;
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

### Add Google Fonts

In `src/layouts/Layout.astro`, preload fonts in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### Astro Folder Structure

```
proyectos/[project-name]/
├── src/
│   ├── pages/
│   │   ├── index.astro              ← Landing page
│   │   └── design-system.astro      ← Design system page
│   ├── components/
│   │   ├── sections/                ← Hero.astro, Features.astro, etc.
│   │   ├── ui/                      ← 21st.dev React components (.tsx)
│   │   └── layout/                  ← Header.astro, Footer.astro
│   ├── layouts/
│   │   └── Layout.astro             ← Base layout with fonts + meta
│   └── styles/
│       └── global.css               ← @theme with semantic tokens
├── public/
│   └── images/
├── astro.config.mjs
└── package.json
```

## Using 21st.dev Components in Astro

21st.dev Magic generates React/TSX snippets. In Astro, use them as interactive islands:

1. Ask: "Search 21st.dev for a modern pricing table"
2. The `21st_magic_component_builder` tool returns a TSX snippet
3. Save it in `src/components/ui/PricingTable.tsx`
4. Adapt colors/fonts to use semantic Tailwind tokens
5. Import in an Astro page with `client:load` or `client:visible`:

```astro
---
import PricingTable from '../components/ui/PricingTable'
---
<PricingTable client:visible />
```

- `client:load` → hydrates immediately (interactive on load)
- `client:visible` → hydrates when scrolled into view (better performance)
- No directive → renders as static HTML (no JS shipped)

The `21st_magic_component_inspiration` tool fetches previews for visual reference without generating code.

### When a component doesn't need interactivity

If the 21st.dev component is purely visual (no onClick, no state), convert it to an `.astro` file instead. This ships zero JS to the browser.

## Changelog

- v1.0 (2026-03-08): Initial skill based on NexVault and portfolio workflow
- v1.1 (2026-03-09): Rewritten in English
- v1.2 (2026-03-09): Added Next.js setup, 21st.dev integration, architecture decision table
