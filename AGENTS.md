# Design-Ops — Agent Instructions

> Fallback rules. Primary rules live in `.cursor/rules/`. Detailed workflows live in `.cursor/skills/`.

## Core

- Read the matching skill BEFORE writing code (see skill table in `.cursor/rules/global.mdc`)
- Step 0 mandatory: ask language, industry, country before every new project
- Tailwind CSS required with semantic tokens (see `.cursor/rules/tailwind-standards.mdc`)

## Tech Stack

- HTML/CSS/JS (vanilla) + Tailwind CSS as default
- Astro + Tailwind v4 for multi-page / portfolio
- Puppeteer for automated screenshots
- Nano Banana 2 (mcp-image) for AI images
- 21st.dev Magic for component inspiration
- html.to.design + figma-ds-cli for Figma export

## Critical Rules

- NEVER push to GitHub without explicit permission
- NEVER leave anything incomplete without explaining
- ALWAYS stop and ask if something fails or can't be automated
- ALWAYS use Tailwind with semantic config
- ALWAYS create design-system.html for every project

## Available Skills

```
.cursor/skills/
├── web-project-setup/    → Initialize project
├── frontend-design/      → Aesthetics and UI
├── design-system/        → design-system.html
├── screenshot-review/    → Visual QA
├── figma-export/         → Export to Figma
├── portfolio-deploy/     → Publish to portfolio
└── image-generation/     → Generate AI images
```

## Evolution

Skills are updated when we learn something new. Each skill has a `## Changelog` at the end.
