---
name: design-system
description: Crear la pagina design-system.html obligatoria en cada proyecto. Usar cuando se inicie un proyecto nuevo o se necesite documentar tokens, componentes y estilos visuales del proyecto.
---

# Design System Page

Cada proyecto DEBE incluir `design-system.html` que documenta visualmente todos los tokens y componentes. Esta pagina es la referencia para exportar a Figma.

## Estructura Obligatoria (6 secciones)

### 1. Color Palette
- Swatch visual de cada color
- Nombre semantico Tailwind (`bg-primary`, `text-accent`)
- Valor hex/CSS
- Uso descrito (ej: "Botones principales, links activos")
- Contraste WCAG indicado donde aplique

### 2. Typography Scale
- Todos los niveles: h1-h6, body, caption, overline, button
- Font-family, weight, size en px, line-height
- Preview visual de cada nivel con texto de ejemplo
- Fuentes de Google Fonts con link de importacion

### 3. Spacing System
- Escala basada en Tailwind: 1(4px), 2(8px), 3(12px), 4(16px), 6(24px), 8(32px), 12(48px), 16(64px)
- Visualizacion con barras o bloques
- Notas sobre cuando usar cada nivel

### 4. Components Gallery
- Botones: primary, secondary, ghost, disabled, loading
- Cards: glass-card, solid-card con variantes
- Inputs: text, password, select con estados (focus, error, disabled)
- Badges/Tags
- Navbar
- Footer
- Cada componente con preview visual Y codigo HTML copiable

### 5. Icons & Assets
- Iconos usados en el proyecto (SVG inline)
- Imagenes generadas con AI (thumbnails)
- Logo si existe

### 6. Grid & Layout
- Breakpoints: 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop)
- Max-width del contenedor principal
- Sistema de columnas usado

## Reglas de la Pagina

- Debe ser navegable con sidebar/nav interno
- Visualmente atractiva (no un documento aburrido)
- Usar el mismo Tailwind config del proyecto
- Incluir notas de accesibilidad (contraste, tamanos minimos)
- Cada seccion con ID para anclas: `#colors`, `#typography`, `#spacing`, `#components`, `#assets`, `#grid`

## Conexion con Figma

Todo lo que aparezca en `design-system.html` se convierte en:
- **Paint Styles** en Figma (colores)
- **Text Styles** en Figma (tipografia)
- **Components** en Figma (botones, cards, etc.)
- **Variables** en Figma (spacing, colores)

Ver skill `figma-export` para el flujo completo.

## Template Base

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design System — [Proyecto]</title>
  <!-- Tailwind + Google Fonts -->
</head>
<body class="bg-background text-text-main">
  <nav id="ds-nav"><!-- Navegacion interna --></nav>
  <main>
    <section id="colors"><!-- Color Palette --></section>
    <section id="typography"><!-- Typography Scale --></section>
    <section id="spacing"><!-- Spacing System --></section>
    <section id="components"><!-- Components Gallery --></section>
    <section id="assets"><!-- Icons & Assets --></section>
    <section id="grid"><!-- Grid & Layout --></section>
  </main>
</body>
</html>
```

## Changelog

- v1.0 (2026-03-08): Skill inicial extraido de regla monolitica, expandido con estructura detallada
