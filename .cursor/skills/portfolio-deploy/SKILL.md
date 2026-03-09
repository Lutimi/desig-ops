---
name: portfolio-deploy
description: Deploy finished projects to the portfolio website via GitHub and Vercel. Use when a project is ready to publish or when adding a project to the portfolio.
---

# Portfolio Deploy

Workflow for publishing finished projects to the portfolio and getting public URLs.

## Architecture

- **Location**: `webtask/proyectos/portfolio/` (has its own git repo, separate from design-ops)
- **Repo**: `https://github.com/Lutimi/portfolio.git`
- **Stack**: Astro + Tailwind CSS v4
- **Deploy**: Vercel (autodeploy on push)
- **Public URL**: Used with html.to.design for Figma import

**IMPORTANT**: Pushes are ONLY made from `proyectos/portfolio/`. The design-ops repo (`desig-ops`) is the toolkit and NEVER contains the portfolio.

## Workflow After Finishing a Project

### 1. Prepare the project

- Verify the site works correctly locally
- Verify `design-system.html` is complete
- Take final validation screenshots

### 2. Copy to portfolio

For vanilla projects (HTML/CSS/JS):

```
Copy src/ and public/ to:
proyectos/portfolio/public/projects/[project-name]/
```

For projects needing a dedicated page:

```
Create page at:
proyectos/portfolio/src/pages/proyecto/[name].astro
```

### 3. Add card to portfolio

Edit `proyectos/portfolio/src/pages/index.astro`:
- Add entry to the `projects` array with: title, description, image, tags, href, industry, country, year
- External link (Behance): full URL in `href`, shows "Behance" badge
- Local project: relative path in `href`

### 4. Push and deploy

```bash
cd proyectos/portfolio
git add .
git commit -m "feat: add [project-name] project"
git push origin main
```

Vercel detects the push and deploys automatically.

### 5. Use public URL

The Vercel URL can be used with html.to.design for Figma import without local tunnels.

## Project Types in Portfolio

| Type | Location | Href |
|------|----------|------|
| Own web (vanilla) | `public/projects/[name]/` | `/projects/[name]/src/index.html` |
| Own web (Astro page) | `src/pages/proyecto/[name].astro` | `/proyecto/[name]` |
| Behance | Card with external link only | `https://behance.net/...` |
| PDF case study | `public/projects/[name].pdf` + dedicated page | `/proyecto/[name]` |

## Challenges Section

- Route: `/desafios`
- Protected with password (SHA-256 client-side)
- Current password: `desafio123`
- To add challenges: edit `src/pages/desafios.astro`

## Changelog

- v1.0 (2026-03-08): Initial skill based on Astro portfolio with Vercel
- v1.1 (2026-03-09): Clarified portfolio lives in proyectos/portfolio/ with own repo
- v1.2 (2026-03-09): Rewritten in English
