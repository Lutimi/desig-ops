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
| Simple landing page | Vanilla HTML + Tailwind CDN |
| Multi-page / portfolio | Astro + Tailwind v4 |
| Interactive app | React/Next.js + Tailwind |

Always ask the user if the stack choice is unclear.

## Changelog

- v1.0 (2026-03-08): Initial skill based on NexVault and portfolio workflow
- v1.1 (2026-03-09): Rewritten in English
