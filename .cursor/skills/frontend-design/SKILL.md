---
name: frontend-design
description: Crear interfaces frontend distintivas y de calidad produccion. Usar cuando se construyan componentes web, paginas, landing pages, dashboards o cualquier UI. Genera codigo creativo y pulido que evita estetica generica de IA.
---

# Frontend Design

Skill para crear interfaces frontend distintivas que evitan la estetica generica "AI slop". Implementar codigo funcional con atencion excepcional a detalles esteticos.

## Design Thinking

Antes de codear, comprometer una direccion estetica BOLD:

- **Proposito**: Que problema resuelve esta interfaz? Para quien?
- **Tono**: Elegir un extremo — brutalmente minimal, maximalista, retro-futurista, organico, luxury, playful, editorial, art deco, industrial, etc.
- **Diferenciacion**: Que hace esto INOLVIDABLE?

## Estetica — Reglas

### Tipografia
- Elegir fuentes de Google Fonts que sean unicas y con caracter
- NUNCA usar: Arial, Inter generico, Roboto, system fonts como default
- Pair: una display font bold + una body font refinada
- Combinaciones probadas: Space Grotesk + Inter, Syne + DM Sans, Clash Display + Satoshi

### Color
- CSS variables para paleta cohesiva
- Colores dominantes con acentos fuertes > paletas timidas y distribuidas
- Dark mode: fondos entre #0A-#15, nunca negro puro #000
- Glassmorphism: `backdrop-blur` + bordes semi-transparentes + fondos con opacidad

### Motion
- CSS puro para animaciones (compatibilidad con Astro y vanilla)
- Priorizar: entrada escalonada (`animation-delay`), hover states sorpresivos, scroll reveals
- `@keyframes` custom > clases utilitarias genericas
- CUIDADO: animaciones complejas rompen screenshots de Puppeteer — documentar cuando skipear

### Layout
- Asimetria, overlap, flujo diagonal, elementos que rompen el grid
- Espacio negativo generoso O densidad controlada
- NUNCA: card-stack centrado predecible

### Fondos y Profundidad
- Gradient meshes, noise textures, grain overlays, transparencias
- Sombras dramaticas, blur layers
- NUNCA: fondos solidos planos sin textura

## Patrones Aprendidos (NexVault)

### Glassmorphism efectivo
```css
.glass-card {
  background: rgba(21, 25, 37, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
}
```

### Animaciones orbitales (hero sections)
- Anillos rotando a diferentes velocidades y direcciones
- Orbs flotantes con glow (`box-shadow` con color y blur)
- Glass cards flotantes con labels de skills
- Particulas con fade in/out

### Text gradient
```css
.text-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Grain overlay
```css
.grain::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,...");
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

## Anti-Patrones

- Gradientes morado-sobre-blanco (cliche AI)
- Layouts centrados genericos sin personalidad
- Mismas fuentes en todos los proyectos
- Animaciones que no aportan significado
- Fondos solidos sin textura ni profundidad

## Variedad Obligatoria

NUNCA converger en las mismas elecciones entre proyectos:
- Alternar light/dark themes
- Diferentes familias tipograficas
- Diferentes estilos visuales
- Cada proyecto debe sentirse unico

## Changelog

- v1.0 (2026-03-08): Skill inicial
- v1.1 (2026-03-08): Agregado patrones de NexVault (glassmorphism, orbitales, grain), anti-patrones, leccion sobre animaciones y Puppeteer
