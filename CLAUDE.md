# Design-Ops — Fallback Rules

> Reglas de respaldo. Las reglas principales viven en `.cursor/rules/` y los flujos detallados en `.cursor/skills/`.

## Core

- Leer el skill correspondiente ANTES de escribir codigo (ver tabla en `.cursor/rules/global.mdc`)
- PASO 0 obligatorio: preguntar idioma, rubro, pais antes de cada proyecto nuevo
- Tailwind CSS obligatorio con nombres semanticos (ver `.cursor/rules/tailwind-standards.mdc`)

## Tech Stack

- HTML/CSS/JS (vanilla) + Tailwind CSS como base
- Astro + Tailwind v4 para multi-pagina/portfolio
- Puppeteer para screenshots automatizados
- Nano Banana 2 (mcp-image) para imagenes AI
- 21st.dev Magic para inspiracion de componentes
- html.to.design + figma-ds-cli para exportar a Figma

## Reglas Criticas

- NUNCA push a GitHub sin permiso explicito
- NUNCA dejar algo incompleto sin avisar
- SIEMPRE preguntar si algo falla o no se puede automatizar
- SIEMPRE usar Tailwind con config semantico
- SIEMPRE crear design-system.html en cada proyecto
- SIEMPRE comentar secciones HTML con `<!-- SECTION: Nombre -->`

## Skills Disponibles

```
.cursor/skills/
├── web-project-setup/    → Iniciar proyecto
├── frontend-design/      → Estetica y UI
├── design-system/        → design-system.html
├── screenshot-review/    → QA visual
├── figma-export/         → Exportar a Figma
├── portfolio-deploy/     → Publicar en portfolio
└── image-generation/     → Generar imagenes AI
```

## Evolucion

Los skills se actualizan cuando aprendemos algo nuevo. Cada skill tiene un `## Changelog` al final.
