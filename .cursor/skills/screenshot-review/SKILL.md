---
name: screenshot-review
description: Flujo de screenshots con Puppeteer para QA visual. Usar despues de construir o hacer cambios significativos en la web para validar visualmente.
---

# Screenshot Review

Flujo de QA visual usando Puppeteer para capturar y revisar screenshots de cada seccion.

## Cuando Tomar Screenshots

- Despues de construir la web inicial
- Despues de cambios visuales significativos (layout, colores, tipografia)
- Antes de hacer push a GitHub
- Al comparar con una referencia de diseno

## Cuando NO Tomar Screenshots

- Cuando hay animaciones CSS complejas (causan timeout en Puppeteer)
- Cuando hay backgrounds animados o particulas
- En esos casos: confiar en revision de codigo + snapshot del DOM en browser

## Scripts Disponibles

### `scripts/screenshot.js` — General
```bash
node scripts/screenshot.js              # Desktop 1440x900
node scripts/screenshot.js --full       # Full page
node scripts/screenshot.js --mobile     # 375x812
node scripts/screenshot.js --tablet     # 768x1024
node scripts/screenshot.js --sections   # Secciones individuales
```
Target: `http://localhost:3000`
Output: `temporary_screenshots/`

### `scripts/ds-screenshot.js` — Design System
```bash
node scripts/ds-screenshot.js
```
Target: `http://127.0.0.1:3001/design-system.html`
Output: `temporary_screenshots/ds-*.png`
Secciones: `#colors`, `#typography`, `#spacing`, `#components`, `#effects`, `#assets`, `#grid`

### `scripts/compare-screenshot.js` — Comparacion
```bash
node scripts/compare-screenshot.js
```
Target: `http://127.0.0.1:3001`
Output: `temporary_screenshots/web-*.png`

## Flujo de 2-Pass Review

### Pass 1 — Detectar problemas
1. Iniciar servidor local
2. Tomar screenshots de cada seccion
3. Comparar contra referencia (si existe) o evaluar calidad visual
4. Anotar: spacing, alineacion, colores, tipografia, responsive

### Pass 2 — Corregir y verificar
1. Corregir los problemas detectados
2. Tomar screenshots nuevamente
3. Confirmar que las correcciones se aplicaron
4. Si hay nuevos problemas, repetir

## Viewports de Testing

| Dispositivo | Ancho | Alto |
|-------------|-------|------|
| Mobile | 375px | 812px |
| Tablet | 768px | 1024px |
| Desktop | 1440px | 900px |

## Leccion Aprendida: Animaciones y Timeouts

Puppeteer puede fallar con `screenshot timed out` cuando:
- Hay muchos `@keyframes` corriendo simultaneamente
- Hay `animation: infinite` en multiples elementos
- Hay `backdrop-filter: blur()` en muchos nodos

**Solucion**: En esos casos, verificar via browser snapshot (DOM) en vez de screenshot. Documentar en el skill que se skippeo el screenshot y por que.

## Changelog

- v1.0 (2026-03-08): Skill inicial con scripts, flujo 2-pass, leccion de animaciones
