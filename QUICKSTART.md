# Quickstart — How to Create a Website

> Everything is configured in design-ops. Follow these steps for every new web project.

---

## Step 0 — Context

Cursor will ask these questions before starting:

| Question | Default | Example |
|----------|---------|---------|
| Language | Spanish | "In English" |
| Industry | — | "Fintech", "Restaurant", "Fitness" |
| Country | Peru | "Peru", "Latam", "Global" |

This automatically adapts copy, currency (S/), date formats, tone, and vocabulary.

---

## Step 1 — Describe the project

Tell Cursor:

> "Create a new project in `proyectos/[name]`.
> It's a landing page for [business/product description].
> Style: [dark mode / light / minimal / bold / etc]."

**Default stack: Astro + Tailwind + React islands.** This covers everything: static pages, 21st.dev components, Vercel deploy, Figma export. Only use vanilla HTML for quick throwaway prototypes.

If you want 21st.dev components, just ask:

> "Search 21st.dev for a modern hero section"

Cursor will generate the React component and integrate it as an Astro island.

Cursor reads the `web-project-setup` skill and creates the full structure.

---

## Step 2 — Provide branding

Cursor will ask about your UI brand. Three options:

**Option A — You have brand assets:**

> "My logo: @brand_assets/logo.png
> Colors: primary #FF6B00, accent #00D4FF
> Fonts: Syne for headings, DM Sans for body"

**Option B — You have a reference site:**

> "I like the style of [paste URL or drag screenshot].
> Use that as inspiration for the brand."

Cursor will analyze the reference, extract colors/fonts, and propose a brand for your approval.

**Option C — You have nothing:**

> "No branding yet. Create something professional for [industry]."

Cursor will propose 2-3 palette options based on the industry. Pick one and go.

Tailwind uses semantic tokens — changing branding later = editing one config.

---

## Step 3 — Request images

> "Generate images with Nano Banana 2:
> - Hero image (16:9, dark background)
> - 3 feature images
> - Whatever else is needed"

Cursor reads the `image-generation` skill for consistent results.

---

## Step 4 — Build

> "Build the full landing page.
> Sections: hero, features, about, testimonials, CTA, footer.
> Smooth animations. Responsive."

Cursor automatically:
- Reads `frontend-design` skill for aesthetics
- Uses `screenshot-review` skill for visual QA
- Checks 21st.dev for component inspiration

---

## Step 5 — Design System (automatic)

Cursor creates `design-system.html` using the `design-system` skill:

- Color palette with swatches and Tailwind names
- Typography scale with all levels
- Components with preview and copyable code
- Spacing and grid with breakpoints

Access at: `http://localhost:[port]/design-system.html`

---

## Step 6 — Review

> "Start the local server so I can review."

Check at `http://localhost:3000`. Request changes:

> "Change [whatever you want]"
> "Generate a different hero image"
> "Make the button bigger with glow effect"

---

## Step 7 — Publish

When satisfied:

> "Push this project to the portfolio"

Cursor reads `portfolio-deploy` skill:
1. Copies project to portfolio
2. Adds the card to index
3. Pushes to GitHub → Vercel autodeploys

---

## Step 8 — Export to Figma

> "Let's export this project to Figma"

Workflow (`figma-export` skill):
1. You import the web with html.to.design (Figma plugin)
2. Cursor applies Paint Styles, Text Styles, Variables, and Components
3. Organizes Figma pages

---

## Workspace Structure

```
design-ops/
├── .cursor/
│   ├── rules/           ← 3 rules (global, tailwind, critical)
│   ├── skills/          ← 7 specialized skills
│   └── mcp.json         ← MCP config
├── scripts/             ← Puppeteer tools
├── templates/           ← Reusable templates
├── figma-starter/       ← figma-ds-cli
├── brand_assets/        ← Shared assets
├── proyectos/           ← Your web projects
├── QUICKSTART.md        ← This file
├── AGENTS.md            ← Fallback rules
└── package.json
```

---

## Available Skills

| Skill | What it does | When to use |
|-------|-------------|-------------|
| `web-project-setup` | Initialize project structure | New project |
| `frontend-design` | Aesthetics, typography, color, motion | Writing frontend |
| `design-system` | Create design-system.html | Documenting tokens |
| `screenshot-review` | Visual QA with Puppeteer | After changes |
| `figma-export` | Export to Figma | Transfer to Figma |
| `portfolio-deploy` | Publish to portfolio | Finished project |
| `image-generation` | Generate AI images | Need assets |

Skills evolve: every time we learn something new, the relevant skill gets updated.

---

## Quick Commands

| I want to... | Tell Cursor... |
|-------------|----------------|
| New website | "Create a project in proyectos/[name] for [description]" |
| Generate images | "Generate images with Nano Banana for [section]" |
| Clone a site | "Clone this site [screenshot] with my branding" |
| Add animation | "Add [type] to [section]" |
| Find component | "Search 21st.dev for a modern [navbar / hero / pricing]" |
| View design system | "Open the design system for [project]" |
| Export to Figma | "Let's export this to Figma" |
| Publish | "Push to portfolio" |

---

## Inspiration

| Full sites | Components | Tools |
|-----------|------------|-------|
| [godly.website](https://godly.website) | [21st.dev](https://21st.dev) | [coolors.co](https://coolors.co) |
| [awwwards.com](https://awwwards.com) | [ui.aceternity.com](https://ui.aceternity.com) | [fonts.google.com](https://fonts.google.com) |
| [dribbble.com](https://dribbble.com) | | [vercel.com](https://vercel.com) |
