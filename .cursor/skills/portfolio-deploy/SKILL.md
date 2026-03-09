---
name: portfolio-deploy
description: Deployar proyectos terminados al portfolio web via GitHub y Vercel. Usar cuando un proyecto este listo para publicarse o cuando se necesite agregar un proyecto al portfolio.
---

# Portfolio Deploy

Flujo para publicar proyectos terminados en el portfolio web y obtener URLs publicas.

## Arquitectura

- **Repo**: `https://github.com/Lutimi/portfolio.git`
- **Stack**: Astro + Tailwind CSS v4
- **Deploy**: Vercel (autodeploy on push)
- **URL publica**: Se usa con html.to.design para importar a Figma

## Flujo al Finalizar un Proyecto

### 1. Preparar el proyecto

- Verificar que la web funciona correctamente en local
- Verificar que `design-system.html` esta completo
- Tomar screenshots finales de validacion

### 2. Copiar al portfolio

Para proyectos vanilla (HTML/CSS/JS):
```
Copiar src/ y public/ del proyecto a:
proyectos/portfolio/public/projects/[nombre-proyecto]/
```

Para proyectos que necesitan pagina dedicada:
```
Crear pagina en:
proyectos/portfolio/src/pages/proyecto/[nombre].astro
```

### 3. Agregar card al portfolio

Editar `proyectos/portfolio/src/pages/index.astro`:
- Agregar entrada al array `projects` con: title, description, image, tags, href, industry, country, year
- Si es link externo (Behance): `href` con URL completa, se muestra badge "Behance"
- Si es proyecto local: `href` con ruta relativa

### 4. Push y deploy

```bash
cd proyectos/portfolio
git add .
git commit -m "feat: agregar proyecto [nombre]"
git push origin main
```

Vercel detecta el push y deploya automaticamente.

### 5. Usar URL publica

La URL de Vercel se puede usar con html.to.design para importar a Figma sin necesidad de tuneles locales.

## Tipos de Proyecto en el Portfolio

| Tipo | Donde va | Href |
|------|----------|------|
| Web propia (vanilla) | `public/projects/[nombre]/` | `/projects/[nombre]/src/index.html` |
| Web propia (Astro page) | `src/pages/proyecto/[nombre].astro` | `/proyecto/[nombre]` |
| Behance | Solo card con link | `https://behance.net/...` |
| PDF case study | `public/projects/[nombre].pdf` + pagina dedicada | `/proyecto/[nombre]` |

## Seccion Desafios

- Ruta: `/desafios`
- Protegida con password (SHA-256 client-side)
- Password actual: `desafio123`
- Para agregar desafios: editar `src/pages/desafios.astro`

## Changelog

- v1.0 (2026-03-08): Skill inicial basado en flujo del portfolio Astro con Vercel
