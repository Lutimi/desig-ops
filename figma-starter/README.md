# Figma Starter Kit

Starter kit para controlar Figma Desktop desde Cursor. Sin API key, sin configuración extra.

## Requisitos

- **Figma Desktop** (cuenta gratis funciona)
- **Cursor** (o cualquier editor con terminal)
- **Node.js** v18+
- **Windows o macOS**

## Setup

```bash
# 1. Instalar dependencias
npm install

# 2. Abrir Figma Desktop con un archivo de diseño abierto

# 3. Patchear Figma (solo la primera vez, o después de actualizar Figma)
npx figma-ds-cli patch

# 4. Verificar conexión
node test-connection.mjs
```

## Uso

### Script directo (recomendado)

Crea un archivo `.mjs` e importa `FigmaClient`:

```javascript
import { FigmaClient } from './src/figma-client.js';
const client = new FigmaClient();
await client.connect();

const result = await client.eval(`(()=>{
  // Aquí va código de Figma Plugin API
  const frame = figma.createFrame();
  frame.name = 'Mi Frame';
  frame.resize(400, 300);
  return frame.id;
})()`);

console.log('Frame creado:', result);
client.close();
```

### CLI

```bash
# Evaluar código directo
npx figma-ds-cli eval "figma.currentPage.name"

# Evaluar desde archivo
npx figma-ds-cli eval -f mi-script.js

# Ver todos los comandos
npx figma-ds-cli --help
```

## Estructura

```
figma-starter/
├── src/                  # Core del CLI (no tocar)
│   ├── index.js          # CLI entry point
│   ├── figma-client.js   # Conexión directa CDP
│   ├── figma-patch.js    # Patcheo de Figma Desktop
│   ├── figjam-client.js  # Soporte FigJam
│   └── daemon.js         # Daemon para Safe Mode
├── plugin/               # Plugin Figma (Safe Mode)
├── docs/                 # Documentación de referencia
├── test-connection.mjs   # Script de prueba
├── example.mjs           # Ejemplo básico
└── package.json
```

## Tips

- **Siempre** ten un archivo de diseño abierto en Figma antes de conectar
- Si Figma se actualiza, corre `npx figma-ds-cli patch` de nuevo
- Para operaciones largas, divide en múltiples `await client.eval()` pequeños
- Usa `(async ()=>{ ... })()` para código async dentro de eval
- Carga fonts antes de crear texto: `await figma.loadFontAsync({family:'Inter',style:'Regular'})`

## Referencia rápida Figma Plugin API

```javascript
// Crear elementos
figma.createFrame()
figma.createText()
figma.createRectangle()
figma.createEllipse()
figma.createLine()
figma.createComponent()
figma.createVector()

// Buscar elementos
figma.currentPage.children
figma.getNodeById('1:23')
figma.currentPage.findAll(n => n.type === 'TEXT')

// Estilos
figma.createPaintStyle()
figma.createTextStyle()
figma.getLocalPaintStyles()
figma.getLocalTextStyles()

// Fonts (obligatorio antes de crear/editar texto)
await figma.loadFontAsync({family:'Inter', style:'Regular'})
```

## Licencia

MIT — Basado en [figma-ds-cli](https://github.com/silships/figma-cli) por Sil Bormüller
