# Estructura Obligatoria de Proyecto

Cada proyecto nuevo debe seguir esta estructura:

```
proyectos/[nombre-proyecto]/
├── src/
│   ├── index.html              # Landing page principal
│   ├── design-system.html      # Design system (OBLIGATORIO)
│   ├── css/
│   │   └── styles.css          # Estilos custom (complementa Tailwind)
│   ├── js/
│   │   └── main.js             # JavaScript
│   └── images/                 # Imagenes del proyecto
└── public/
    └── images/                 # Copia de respaldo de imagenes
```

## Variante Astro

Para proyectos multi-pagina o portfolios:

```
proyectos/[nombre-proyecto]/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   └── ...
│   ├── components/
│   ├── layouts/
│   │   └── Layout.astro
│   └── styles/
│       └── global.css          # @theme con tokens Tailwind v4
├── public/
│   ├── images/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── tailwind.config.js          # Solo si Tailwind v3
```

## Archivos Obligatorios

1. `index.html` (o `index.astro`) — Pagina principal
2. `design-system.html` — Documentacion visual de tokens y componentes
3. Config de Tailwind con nombres semanticos
4. Google Fonts importadas

## Convenciones de Nombres

- Carpetas: kebab-case (`ewallet-web`, `fitness-app`)
- Archivos HTML: kebab-case (`design-system.html`)
- Clases CSS: kebab-case con prefijo semantico (`glass-card`, `text-gradient`)
- Secciones HTML: comentario `<!-- SECTION: Nombre -->`
