---
name: image-generation
description: Generar imagenes con AI para proyectos web usando Nano Banana 2 (mcp-image). Usar cuando se necesiten imagenes hero, features, avatares o assets visuales para un proyecto.
---

# Image Generation

Skill para generar imagenes de alta calidad con AI para proyectos web.

## Herramienta Principal

**Nano Banana 2** via MCP (`mcp-image` server)

## Cuando Generar Imagenes

- Hero section: imagen principal del landing (16:9 o 3:2)
- Features: iconos 3D o ilustraciones para cada feature (1:1)
- Testimonios: avatares de personas (1:1, retratos)
- Backgrounds: texturas, gradientes, patrones
- Logos: si el proyecto no tiene branding propio

## Prompts Efectivos

### Hero Images
```
Prompt: "Futuristic 3D render of [objeto], dark background with [color] glow,
glass material, volumetric lighting, professional product photography style,
8k quality, no text"
```

### Feature Icons
```
Prompt: "3D icon of [concepto], isometric view, glass material with [color]
tint, dark background, minimal, clean, professional, 8k"
```

### Avatares
```
Prompt: "Professional headshot portrait of [descripcion], natural lighting,
neutral background, photorealistic, high quality"
```

## Tamanos Recomendados

| Uso | Aspect Ratio | Resolucion sugerida |
|-----|-------------|---------------------|
| Hero | 16:9 | 1440x810 |
| Feature | 1:1 | 512x512 |
| Avatar | 1:1 | 256x256 |
| Card cover | 16:9 | 800x450 |
| OG Image | 1.91:1 | 1200x630 |

## Donde Guardar

```
proyectos/[nombre]/
├── src/images/          ← Imagenes de desarrollo
└── public/images/       ← Copia para produccion
```

Siempre guardar en ambas ubicaciones para tener respaldo.

## Reglas

- NUNCA generar hashes largos o contenido binario en el chat
- Si la generacion falla, explicar y preguntar al usuario
- Las imagenes deben ser coherentes con el branding del proyecto
- Usar el mismo estilo visual en todas las imagenes de un proyecto
- Incluir "no text" en prompts para evitar texto ilegible en imagenes

## Alternativas

Si mcp-image no esta disponible:
- Pedir al usuario que genere manualmente en otra herramienta
- Usar SVG placeholders con el branding del proyecto (como se hizo con DiveRent y WIKIVI covers)
- Nunca dejar espacios vacios sin explicar

## Changelog

- v1.0 (2026-03-08): Skill inicial con prompts, tamanos y flujo de guardado
