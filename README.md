# design-ops

Private web development toolkit for Cursor AI. Contains skills, rules, scripts, and templates for creating professional websites systematically.

## What is this

A workspace configured so Cursor AI learns and continuously improves at:

- Creating professional landing pages and websites
- Configuring Tailwind CSS with semantic tokens
- Generating documented design systems
- Exporting to Figma with fidelity
- Deploying to production via Vercel
- Generating images with AI

## Structure

```
design-ops/
├── .cursor/
│   ├── rules/           # 3 rules: global, tailwind, critical
│   ├── skills/          # 7 specialized skills (evolving)
│   └── mcp.json         # MCP config (html.to.design)
├── scripts/             # Puppeteer screenshots
├── templates/           # Reusable templates
├── figma-starter/       # figma-ds-cli for Figma
├── brand_assets/        # Shared assets
├── QUICKSTART.md        # Step-by-step guide
├── AGENTS.md            # Fallback agent instructions
└── package.json         # Toolkit dependencies
```

## Skills

| Skill | Purpose |
|-------|---------|
| `web-project-setup` | Initialize projects with correct structure |
| `frontend-design` | Aesthetics, typography, color, motion |
| `design-system` | Create mandatory design-system.html |
| `screenshot-review` | Visual QA with Puppeteer |
| `figma-export` | Export to Figma with styles and tokens |
| `portfolio-deploy` | Publish to portfolio via Vercel |
| `image-generation` | Generate images with AI |

Skills evolve: every time we discover something new, the relevant skill gets updated with a changelog entry.

## How to use

1. Open this workspace in Cursor
2. Say: "Create a project in proyectos/[name] for [description]"
3. Cursor reads rules and skills automatically
4. Follow the guide in `QUICKSTART.md`

## Projects

Projects live in separate folders with their own repos:
- **Portfolio**: [github.com/Lutimi/portfolio](https://github.com/Lutimi/portfolio)
- New projects are created in `proyectos/` locally

## Setup

```bash
npm install
```

Installs Puppeteer and live-server for the screenshot workflow.
