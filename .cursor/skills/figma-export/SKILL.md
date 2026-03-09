---
name: figma-export
description: Exportar proyectos web a Figma con html.to.design y figma-ds-cli. Usar cuando el usuario quiera pasar un proyecto terminado a Figma con styles, variables y componentes organizados.
---

# Figma Export

Flujo completo para exportar un proyecto web a Figma con fidelidad visual y tokens de diseno correctos.

## Flujo de 2 Pasos

### Paso 1 — Usuario importa con html.to.design

El usuario importa manualmente usando el plugin html.to.design (MCP en `.cursor/mcp.json`):

1. **Landing desktop** (1440px) — replica visual pixel-perfect
2. **Landing mobile** (375px) — version responsive
3. **design-system.html** (desktop) — todos los tokens y componentes

El plugin crea frames en Figma con imagenes, textos y estructura del DOM.
El usuario avisa cuando termino de importar.

### Paso 2 — Cursor aplica styles y organiza

Usar `figma-starter/` (figma-ds-cli) para:

1. Crear Paint Styles, Text Styles, Variables
2. Vincular styles a los nodos importados
3. Organizar paginas segun estructura obligatoria

**IMPORTANTE**: Usar APIs async de Figma:
- `figma.getLocalPaintStylesAsync()`
- `figma.getLocalTextStylesAsync()`
- `node.setFillStyleIdAsync(styleId)`
- `node.setTextStyleIdAsync(styleId)`
- `node.setStrokeStyleIdAsync(styleId)`

## Nomenclatura de Styles

### Paint Styles (Color) — por categoria

| Categoria | Prefijo | Ejemplos |
|-----------|---------|----------|
| Marca | `Brand /` | `Brand / bg-primary`, `Brand / bg-accent` |
| Superficies | `Surface /` | `Surface / bg-background`, `Surface / bg-surface` |
| Texto | `Text /` | `Text / text-text-main`, `Text / text-primary` |
| Bordes | `Border /` | `Border / border-white/5`, `Border / border-primary/20` |
| Efectos | `Effect /` | `Effect / bg-primary/10`, `Effect / glass-card` |

Cada style debe tener en su description: uso, clase Tailwind completa, valor hex/CSS.

### Text Styles — por familia

| Categoria | Prefijo | Ejemplos |
|-----------|---------|----------|
| Display | `font-display /` | `font-display / text-7xl font-bold` |
| Body | `font-body /` | `font-body / text-lg`, `font-body / text-sm` |
| UI | `UI /` | `UI / button`, `UI / badge`, `UI / nav-brand` |

Cada style debe tener en su description: uso, HTML ejemplo, tamano px/line-height.

## Variables

### Color Variables
- Collection con todos los colores del proyecto
- Incluir colores con opacidad (borders, glass, glows)

### Spacing Variables
- Collection con escala: 4, 8, 12, 16, 24, 32, 48, 64

## Componentes Figma

- Cada componente UI = Figma Component (no frame simple)
- Incluir variantes: Button/Primary, Button/Secondary, Button/Ghost
- Badges, Cards, Navbar, Footer como components

## Paginas Obligatorias en Figma

```
🎨 Cover
🔵 Color Tokens
🔤 Typography
📐 Spacing
🧩 Components
📱 Landing Page
📋 Design System Doc
```

## Regla Critica

Si algo falla durante la exportacion:
1. DETENER inmediatamente
2. Explicar que fallo y por que
3. Preguntar al usuario como proceder
4. NUNCA continuar asumiendo

## Changelog

- v1.0 (2026-03-08): Skill inicial con flujo html.to.design + figma-ds-cli, nomenclatura Tailwind, APIs async
