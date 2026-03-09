---
name: image-generation
description: Generate AI images for web projects using Nano Banana 2 (mcp-image). Use when hero images, feature illustrations, avatars, or visual assets are needed.
---

# Image Generation

Skill for generating high-quality AI images for web projects.

## Primary Tool

**Nano Banana 2** via MCP (`mcp-image` server)

## When to Generate Images

- Hero section: main landing image (16:9 or 3:2)
- Features: 3D icons or illustrations per feature (1:1)
- Testimonials: people avatars (1:1, portraits)
- Backgrounds: textures, gradients, patterns
- Logos: if the project has no branding yet

## Effective Prompts

### Hero Images

```
"Futuristic 3D render of [object], dark background with [color] glow,
glass material, volumetric lighting, professional product photography style,
8k quality, no text"
```

### Feature Icons

```
"3D icon of [concept], isometric view, glass material with [color] tint,
dark background, minimal, clean, professional, 8k"
```

### Avatars

```
"Professional headshot portrait of [description], natural lighting,
neutral background, photorealistic, high quality"
```

## Recommended Sizes

| Usage | Aspect Ratio | Suggested Resolution |
|-------|-------------|---------------------|
| Hero | 16:9 | 1440x810 |
| Feature | 1:1 | 512x512 |
| Avatar | 1:1 | 256x256 |
| Card cover | 16:9 | 800x450 |
| OG Image | 1.91:1 | 1200x630 |

## Where to Save

```
proyectos/[name]/
├── src/images/          ← Development images
└── public/images/       ← Production copy
```

Always save in both locations for backup.

## Rules

- NEVER generate long hashes or binary content in chat
- If generation fails, explain and ask the user
- Images must be coherent with the project branding
- Use the same visual style across all images in a project
- Include "no text" in prompts to avoid illegible text in images

## Fallbacks

If mcp-image is not available:
- Ask the user to generate manually in another tool
- Use SVG placeholders with project branding (as done with DiveRent and WIKIVI covers)
- Never leave empty spaces without explanation

## Changelog

- v1.0 (2026-03-08): Initial skill with prompts, sizes, and save workflow
- v1.1 (2026-03-09): Rewritten in English
