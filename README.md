# design-ops

Toolkit privado de desarrollo web con Cursor AI. Contiene skills, reglas, scripts y templates para crear sitios web profesionales de forma sistematica.

## Que es esto

Un workspace configurado para que Cursor AI aprenda y mejore continuamente en:

- Crear landing pages y sitios web profesionales
- Configurar Tailwind CSS con tokens semanticos
- Generar design systems documentados
- Exportar a Figma con fidelidad
- Deployar a produccion via Vercel
- Generar imagenes con AI

## Estructura

```
design-ops/
├── .cursor/
│   ├── rules/           # 3 reglas: global, tailwind, criticas
│   ├── skills/          # 7 skills especializados (evolutivos)
│   └── mcp.json         # Config MCP (html.to.design)
├── scripts/             # Puppeteer screenshots
├── templates/           # Templates reutilizables
├── figma-starter/       # figma-ds-cli para Figma
├── brand_assets/        # Assets compartidos
├── GUIA-PASO-A-PASO.md  # Guia rapida
├── CLAUDE.md            # Fallback rules
└── package.json         # Dependencias del toolkit
```

## Skills

| Skill | Proposito |
|-------|-----------|
| `web-project-setup` | Iniciar proyectos con estructura correcta |
| `frontend-design` | Estetica, tipografia, color, motion |
| `design-system` | Crear design-system.html obligatorio |
| `screenshot-review` | QA visual con Puppeteer |
| `figma-export` | Exportar a Figma con styles y tokens |
| `portfolio-deploy` | Publicar en portfolio via Vercel |
| `image-generation` | Generar imagenes con AI |

Los skills evolucionan: cada vez que descubrimos algo nuevo, se actualiza el skill correspondiente con un entry en su changelog.

## Como usar

1. Abrir este workspace en Cursor
2. Decir: "Crea un proyecto en proyectos/[nombre] para [descripcion]"
3. Cursor lee las reglas y skills automaticamente
4. Seguir la guia en `GUIA-PASO-A-PASO.md`

## Proyectos

Los proyectos viven en carpetas separadas con sus propios repos:
- **Portfolio**: [github.com/Lutimi/portfolio](https://github.com/Lutimi/portfolio)
- Cada proyecto nuevo se crea en `proyectos/` localmente

## Setup

```bash
npm install
```

Instala Puppeteer y live-server para el flujo de screenshots.
