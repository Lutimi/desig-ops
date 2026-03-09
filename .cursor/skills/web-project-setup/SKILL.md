---
name: web-project-setup
description: Inicializar un proyecto web desde cero con estructura correcta, Tailwind semantico y preguntas obligatorias. Usar cuando el usuario pida crear un nuevo sitio, landing page o proyecto web.
---

# Web Project Setup

Skill para iniciar proyectos web con la estructura y configuracion correcta desde el primer momento.

## Flujo de Inicio

### 1. Preguntas Obligatorias (PASO 0)

Antes de crear cualquier archivo:

```
1. Idioma → default: español
2. Rubro/Industria → ej: fintech, restaurante, fitness
3. Pais/Region → default: Peru (S/, +51, DD/MM/YYYY)
```

No continuar hasta tener respuestas.

### 2. Crear Estructura

```
proyectos/[nombre-proyecto]/
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

### 3. Configurar Tailwind

Copiar el template base desde `templates/tailwind.config.template.js` y adaptar:
- Colores segun el branding del proyecto
- Fuentes segun la industria y tono
- Mantener SIEMPRE los nombres semanticos

Para Tailwind v4 (proyectos Astro/Vite), usar `@theme {}` en CSS:

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

Para Tailwind v3 (proyectos vanilla), usar `tailwind.config.js`.

### 4. HTML Base

El `index.html` debe incluir:
- Google Fonts preload para las fuentes elegidas
- Tailwind CSS via CDN o build
- Estructura semantica con `<!-- SECTION: Nombre -->` en cada seccion
- Meta tags basicos (title, description, viewport, og:image)

### 5. Checklist Post-Setup

- [ ] Estructura de carpetas creada
- [ ] Tailwind configurado con nombres semanticos
- [ ] Fuentes de Google Fonts incluidas
- [ ] `index.html` con estructura base
- [ ] `design-system.html` creado (ver skill `design-system`)
- [ ] Servidor local funcionando (`live-server` o `astro dev`)

## Decisiones de Arquitectura

| Tipo de proyecto | Stack recomendado |
|-----------------|-------------------|
| Landing page simple | Vanilla HTML + Tailwind CDN |
| Multi-pagina / portfolio | Astro + Tailwind v4 |
| App interactiva | React/Next.js + Tailwind |

Siempre preguntar al usuario si no esta claro que stack usar.

## Changelog

- v1.0 (2026-03-08): Skill inicial basado en flujo de NexVault y portfolio
