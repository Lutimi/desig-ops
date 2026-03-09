# Como Crear una Web — Guia Rapida

> Todo esta configurado en design-ops. Solo sigue estos pasos cada vez que quieras hacer una web nueva.

---

## PASO 0 — Contexto (Cursor te preguntara esto)

Antes de empezar, Cursor te hara estas preguntas:

| Pregunta | Default | Ejemplo |
|----------|---------|---------|
| Idioma de la web | Español | "En ingles" |
| Rubro / Industria | — | "Fintech", "Restaurante", "Fitness" |
| Pais / Region | Peru | "Peru", "Latam", "Global" |

Esto adapta textos, moneda (S/), formatos, tono y vocabulario automaticamente.

---

## PASO 1 — Dime para quien es la web

Dile a Cursor:

> "Crea un nuevo proyecto en `proyectos/[nombre]`.
> Es una landing page para [descripcion del negocio/producto].
> El estilo debe ser [dark mode / light mode / minimalista / bold / etc]."

Cursor automaticamente leera el skill `web-project-setup` y creara toda la estructura.

---

## PASO 2 — Dale tu marca

Si ya tienes logo y colores:

> "Mi logo: @brand_assets/logo.png
> Mis colores: primary #FF6B00, secondary #1A1A2E, accent #00D4FF
> Fuentes: Syne para titulos, DM Sans para texto"

Si NO tienes nada:

> "No tengo logo ni colores. Inventa un branding profesional."

Tailwind se configura con nombres semanticos — cambiar branding = editar una linea.

---

## PASO 3 — Pide las imagenes

> "Genera con Nano Banana 2 las imagenes que necesite la web:
> - Hero image (16:9, fondo oscuro)
> - 3 imagenes para features
> - Lo que creas necesario"

Cursor leera el skill `image-generation` para generar imagenes coherentes.

---

## PASO 4 — Construir

> "Construye la landing page completa con todo lo anterior.
> Sections: hero, features, about, testimonials, CTA, footer.
> Animaciones suaves. Responsive."

Cursor automaticamente:
- Leera el skill `frontend-design` para estetica
- Usara el skill `screenshot-review` para QA visual
- Consultara 21st.dev para inspiracion de componentes

---

## PASO 5 — Design System (automatico)

Cursor creara `design-system.html` usando el skill `design-system`:

- Paleta de colores con swatches y nombres Tailwind
- Tipografia con todos los niveles
- Componentes con preview y codigo copiable
- Espaciado y grid con breakpoints

Accede en: `http://localhost:[puerto]/design-system.html`

---

## PASO 6 — Revisar

> "Abre el servidor local para que pueda ver la web."

Revisa en `http://localhost:3000`. Si algo no te gusta:

> "Cambia [lo que quieras cambiar]"
> "Genera otra imagen para el hero"
> "Haz el boton mas grande con efecto glow"

---

## PASO 7 — Publicar

Cuando estes satisfecho:

> "Pushea este proyecto al portfolio"

Cursor leera el skill `portfolio-deploy` y:
1. Copiara el proyecto al portfolio
2. Agregara la card en el index
3. Hara push a GitHub → Vercel deploya automaticamente

---

## PASO 8 — Exportar a Figma

> "Exportemos este proyecto a Figma"

Flujo (skill `figma-export`):
1. Tu importas la web con html.to.design (plugin de Figma)
2. Cursor aplica Paint Styles, Text Styles, Variables y Components
3. Organiza las paginas de Figma

---

## Estructura del Workspace

```
design-ops/
├── .cursor/
│   ├── rules/                  ← 3 reglas (global, tailwind, criticas)
│   ├── skills/                 ← 7 skills especializados
│   │   ├── web-project-setup/
│   │   ├── frontend-design/
│   │   ├── design-system/
│   │   ├── screenshot-review/
│   │   ├── figma-export/
│   │   ├── portfolio-deploy/
│   │   └── image-generation/
│   └── mcp.json                ← Config MCP
├── scripts/                    ← Herramientas (screenshot, etc)
├── templates/                  ← Templates reutilizables
│   ├── brand-guidelines.md
│   ├── tailwind.config.template.js
│   └── project-structure.md
├── figma-starter/              ← figma-ds-cli
├── brand_assets/               ← Assets compartidos
├── proyectos/                  ← AQUI VAN TUS WEBS
│   ├── ewallet-web/
│   ├── portfolio/              ← Portfolio (repo separado)
│   └── ...
├── GUIA-PASO-A-PASO.md         ← Este archivo
├── CLAUDE.md                   ← Fallback rules
└── package.json
```

---

## Skills Disponibles

| Skill | Que hace | Cuando se usa |
|-------|----------|---------------|
| `web-project-setup` | Inicia proyecto con estructura correcta | Nuevo proyecto |
| `frontend-design` | Estetica, tipografia, color, motion | Escribir frontend |
| `design-system` | Crea design-system.html | Documentar tokens |
| `screenshot-review` | QA visual con Puppeteer | Despues de cambios |
| `figma-export` | Exportar a Figma | Pasar a Figma |
| `portfolio-deploy` | Publicar en portfolio | Proyecto terminado |
| `image-generation` | Generar imagenes con AI | Necesitar assets |

Los skills evolucionan: cada vez que aprendemos algo nuevo, se actualiza el skill correspondiente.

---

## Atajos Utiles

| Quiero... | Dile a Cursor... |
|-----------|------------------|
| Nueva web | "Crea un proyecto en proyectos/[nombre] para [descripcion]" |
| Generar imagenes | "Genera imagenes con Nano Banana para [seccion]" |
| Clonar un sitio | "Clona este sitio [screenshot] con mi branding" |
| Agregar animacion | "Agrega [tipo] al [seccion]" |
| Buscar componente | "Busca en 21st.dev un [navbar / hero / pricing] moderno" |
| Ver design system | "Abre el design system del proyecto [nombre]" |
| Exportar a Figma | "Exportemos este proyecto a Figma" |
| Publicar | "Pushea al portfolio" |

---

## Inspiracion

| Sitios completos | Componentes | Herramientas |
|-----------------|-------------|--------------|
| [godly.website](https://godly.website) | [21st.dev](https://21st.dev) | [coolors.co](https://coolors.co) |
| [awwwards.com](https://awwwards.com) | [ui.aceternity.com](https://ui.aceternity.com) | [fonts.google.com](https://fonts.google.com) |
| [dribbble.com](https://dribbble.com) | | [vercel.com](https://vercel.com) |
