/** @type {import('tailwindcss').Config} */

// ============================================================
// TEMPLATE — Tailwind Config con nombres semanticos
// Copiar este archivo al proyecto y adaptar colores/fuentes
// ============================================================

// Para Tailwind v3 (proyectos vanilla HTML)
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // -- Fondos --
        background: "#0B0E14",   // Fondo principal de la pagina
        surface: "#151925",      // Cards, secciones elevadas
        "surface-alt": "#1E2333", // Fondos alternativos

        // -- Marca --
        primary: "#6366F1",       // Botones principales, links, acentos
        "primary-hover": "#818CF8", // Hover de primary
        accent: "#34D399",        // CTAs, badges, alertas
        "accent-hover": "#6EE7B7", // Hover de accent

        // -- Texto --
        "text-main": "#F8FAFC",   // Texto principal (sobre fondo oscuro)
        "text-muted": "#94A3B8",  // Texto secundario
        "text-dim": "#64748B",    // Texto terciario, placeholders

        // -- Bordes --
        border: "#1E293B",        // Bordes por defecto
        "border-hover": "#334155", // Bordes en hover

        // -- Glass --
        glass: "rgba(21, 25, 37, 0.6)",      // Fondo glassmorphism
        "glass-hover": "rgba(30, 35, 51, 0.8)", // Glass en hover
      },
      fontFamily: {
        display: ['"Space Grotesk"', "sans-serif"], // Titulos
        body: ['"Inter"', "sans-serif"],             // Texto general
      },
    },
  },
  plugins: [],
};

// ============================================================
// Para Tailwind v4 (proyectos Astro/Vite), usar @theme en CSS:
//
// @import "tailwindcss";
//
// @theme {
//   --color-background: #0B0E14;
//   --color-surface: #151925;
//   --color-surface-alt: #1E2333;
//   --color-primary: #6366F1;
//   --color-primary-hover: #818CF8;
//   --color-accent: #34D399;
//   --color-accent-hover: #6EE7B7;
//   --color-text-main: #F8FAFC;
//   --color-text-muted: #94A3B8;
//   --color-text-dim: #64748B;
//   --color-border: #1E293B;
//   --color-border-hover: #334155;
//   --color-glass: rgba(21, 25, 37, 0.6);
//   --color-glass-hover: rgba(30, 35, 51, 0.8);
//   --font-display: "Space Grotesk", sans-serif;
//   --font-body: "Inter", sans-serif;
// }
// ============================================================
