/**
 * NexVault — Fix Styles with Tailwind Nomenclature
 * 
 * Deletes old styles and recreates with proper Tailwind naming:
 * - Color Styles organized by category (Brand, Text, Surface, Border, Effect)
 * - Text Styles with Tailwind class names (font-display/text-7xl, etc.)
 * - Image placeholders with clear filenames for manual import
 */
import { FigmaClient } from './src/figma-client.js';

const client = new FigmaClient();
await client.connect();
console.log('✓ Conectado a Figma');

async function run(code) {
  return await client.eval(code);
}

// ═══════════════════════════════════════════════════════════
// STEP 1: Delete ALL old Paint Styles and recreate with Tailwind naming
// ═══════════════════════════════════════════════════════════
console.log('\n🗑️  Eliminando styles antiguos...');

await run(`(async ()=>{
  const paintStyles = figma.getLocalPaintStyles();
  for (const s of paintStyles) { s.remove(); }
  const textStyles = figma.getLocalTextStyles();
  for (const s of textStyles) { s.remove(); }
  return 'Deleted ' + paintStyles.length + ' paint styles, ' + textStyles.length + ' text styles';
})()`);

console.log('✓ Styles antiguos eliminados');

// ═══════════════════════════════════════════════════════════
// STEP 2: Create Color Styles with Tailwind nomenclature
// ═══════════════════════════════════════════════════════════
console.log('\n🎨 Creando Color Styles con nomenclatura Tailwind...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  const styles = [
    // ── BRAND (colores de marca)
    { name: 'Brand / bg-primary',        hex: '#6366F1', desc: 'Indigo — botones, links, acciones principales. Tailwind: bg-primary' },
    { name: 'Brand / bg-primary (hover)', hex: '#4F46E5', desc: 'Indigo oscuro — hover state. Tailwind: hover:bg-primary' },
    { name: 'Brand / bg-primary (light)', hex: '#818CF8', desc: 'Indigo claro — focus rings, highlights. Tailwind: ring-primary' },
    { name: 'Brand / bg-accent',          hex: '#34D399', desc: 'Verde menta — exito, dinero, positivo. Tailwind: bg-accent' },
    { name: 'Brand / bg-accent (hover)',   hex: '#059669', desc: 'Verde oscuro — hover accent. Tailwind: hover:bg-accent' },

    // ── SURFACE (fondos y superficies)
    { name: 'Surface / bg-background',   hex: '#0B0E14', desc: 'Fondo principal — azul casi negro. Tailwind: bg-background' },
    { name: 'Surface / bg-surface',      hex: '#151925', desc: 'Cards, modales, secciones elevadas. Tailwind: bg-surface' },
    { name: 'Surface / bg-white',        hex: '#FFFFFF', desc: 'Blanco puro — labels sobre primary. Tailwind: bg-white' },

    // ── TEXT (colores de texto)
    { name: 'Text / text-text-main',     hex: '#F8FAFC', desc: 'Blanco hueso — texto principal, titulos. Tailwind: text-text-main' },
    { name: 'Text / text-text-muted',    hex: '#94A3B8', desc: 'Gris azulado — texto secundario, captions. Tailwind: text-text-muted' },
    { name: 'Text / text-white',         hex: '#FFFFFF', desc: 'Blanco puro — texto sobre primary/accent. Tailwind: text-white' },
    { name: 'Text / text-primary',       hex: '#6366F1', desc: 'Indigo — labels, overlines, links. Tailwind: text-primary' },
    { name: 'Text / text-accent',        hex: '#34D399', desc: 'Verde — indicadores positivos, badges. Tailwind: text-accent' },

    // ── BORDER (bordes)
    { name: 'Border / border-white/5',   hex: '#FFFFFF', opacity: 0.05, desc: 'Borde sutil — separadores. Tailwind: border-white/5' },
    { name: 'Border / border-white/10',  hex: '#FFFFFF', opacity: 0.10, desc: 'Borde medio — cards. Tailwind: border-white/10' },
    { name: 'Border / border-primary/20', hex: '#6366F1', opacity: 0.20, desc: 'Borde primary — steps, badges. Tailwind: border-primary/20' },
    { name: 'Border / border-primary/30', hex: '#6366F1', opacity: 0.30, desc: 'Borde primary hover — avatars. Tailwind: border-primary/30' },
    { name: 'Border / border-accent/20',  hex: '#34D399', opacity: 0.20, desc: 'Borde accent — step 3. Tailwind: border-accent/20' },
    { name: 'Border / border-accent/30',  hex: '#34D399', opacity: 0.30, desc: 'Borde accent — avatar Valeria. Tailwind: border-accent/30' },

    // ── EFFECT (glows, glass, overlays)
    { name: 'Effect / bg-primary/5',     hex: '#6366F1', opacity: 0.05, desc: 'Badge background. Tailwind: bg-primary/5' },
    { name: 'Effect / bg-primary/10',    hex: '#6366F1', opacity: 0.10, desc: 'Icon container background. Tailwind: bg-primary/10' },
    { name: 'Effect / bg-primary/15',    hex: '#6366F1', opacity: 0.15, desc: 'Glow fuerte. Tailwind: bg-primary/15' },
    { name: 'Effect / bg-accent/10',     hex: '#34D399', opacity: 0.10, desc: 'Icon container accent. Tailwind: bg-accent/10' },
    { name: 'Effect / bg-surface/60',    hex: '#151925', opacity: 0.60, desc: 'Glass card background. Tailwind: bg-surface/60 + backdrop-blur' },
    { name: 'Effect / bg-surface/50',    hex: '#151925', opacity: 0.50, desc: 'Glass card large. Tailwind: bg-surface/50 + backdrop-blur' },
  ];

  for (const s of styles) {
    const style = figma.createPaintStyle();
    style.name = s.name;
    style.description = s.desc;
    const color = h(s.hex);
    const opacity = s.opacity !== undefined ? s.opacity : 1;
    style.paints = [{ type: 'SOLID', color: color, opacity: opacity }];
  }

  // Gradient styles
  const grad1 = figma.createPaintStyle();
  grad1.name = 'Effect / text-gradient (primary→accent)';
  grad1.description = 'Gradiente hero text. Tailwind: text-gradient (custom class). CSS: linear-gradient(135deg, #6366F1, #34D399)';
  grad1.paints = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: { r: 0.39, g: 0.4, b: 0.95, a: 1 } },
      { position: 1, color: { r: 0.2, g: 0.83, b: 0.6, a: 1 } }
    ],
    gradientTransform: [[0.7, 0.7, 0], [-0.7, 0.7, 0.5]]
  }];

  const grad2 = figma.createPaintStyle();
  grad2.name = 'Effect / btn-primary gradient';
  grad2.description = 'Boton principal. Tailwind: btn-primary (custom class). CSS: linear-gradient(135deg, #6366F1, #4F46E5)';
  grad2.paints = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: { r: 0.39, g: 0.4, b: 0.95, a: 1 } },
      { position: 1, color: { r: 0.31, g: 0.27, b: 0.9, a: 1 } }
    ],
    gradientTransform: [[0.7, 0.7, 0], [-0.7, 0.7, 0.5]]
  }];

  return (styles.length + 2) + ' color styles created';
})()`);

console.log('✓ Color Styles creados (26 styles organizados por categoria)');

// ═══════════════════════════════════════════════════════════
// STEP 3: Create Text Styles with Tailwind nomenclature
// ═══════════════════════════════════════════════════════════
console.log('\n🔤 Creando Text Styles con nomenclatura Tailwind...');

await run(`(async ()=>{
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Inter',style:'Light'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Regular'});

  const styles = [
    // ── DISPLAY (font-display = Space Grotesk)
    {
      name: 'font-display / text-7xl font-bold',
      family: 'Space Grotesk', style: 'Bold',
      size: 72, lh: 80, ls: -2,
      desc: 'Hero title. HTML: <h1 class="font-display text-7xl font-bold">. 72px/80px, -2px tracking'
    },
    {
      name: 'font-display / text-6xl font-bold',
      family: 'Space Grotesk', style: 'Bold',
      size: 64, lh: 72, ls: -2,
      desc: 'CTA title. HTML: <h2 class="font-display text-6xl font-bold">. 64px/72px, -2px tracking'
    },
    {
      name: 'font-display / text-5xl font-bold',
      family: 'Space Grotesk', style: 'Bold',
      size: 48, lh: 56, ls: -1,
      desc: 'Section headings. HTML: <h2 class="font-display text-5xl font-bold">. 48px/56px, -1px tracking'
    },
    {
      name: 'font-display / text-3xl font-semibold',
      family: 'Space Grotesk', style: 'Medium',
      size: 32, lh: 40, ls: -0.5,
      desc: 'Subsection headings. HTML: <h3 class="font-display text-3xl font-semibold">. 32px/40px'
    },
    {
      name: 'font-display / text-2xl font-semibold',
      family: 'Space Grotesk', style: 'Medium',
      size: 24, lh: 32, ls: 0,
      desc: 'Card titles. HTML: <h4 class="font-display text-2xl font-semibold">. 24px/32px'
    },
    {
      name: 'font-display / text-xl font-semibold',
      family: 'Space Grotesk', style: 'Medium',
      size: 20, lh: 28, ls: 0,
      desc: 'Feature card titles. HTML: <h3 class="font-display text-xl font-semibold">. 20px/28px'
    },
    {
      name: 'font-display / text-lg font-semibold',
      family: 'Space Grotesk', style: 'Medium',
      size: 18, lh: 28, ls: 0,
      desc: 'Step titles. HTML: <h3 class="font-display text-lg font-semibold">. 18px/28px'
    },

    // ── DISPLAY STATS (numeros grandes)
    {
      name: 'font-display / text-5xl font-bold (stat)',
      family: 'Space Grotesk', style: 'Bold',
      size: 48, lh: 56, ls: -1,
      desc: 'Stat numbers. HTML: <p class="font-display text-5xl font-bold">. 48px/56px'
    },

    // ── BODY (font-body = Inter)
    {
      name: 'font-body / text-lg',
      family: 'Inter', style: 'Regular',
      size: 18, lh: 28, ls: 0,
      desc: 'Intro paragraphs, hero description. HTML: <p class="text-lg">. 18px/28px'
    },
    {
      name: 'font-body / text-base',
      family: 'Inter', style: 'Regular',
      size: 16, lh: 24, ls: 0,
      desc: 'Default body text. HTML: <p class="text-base">. 16px/24px'
    },
    {
      name: 'font-body / text-sm',
      family: 'Inter', style: 'Regular',
      size: 14, lh: 20, ls: 0,
      desc: 'Card descriptions, nav links. HTML: <p class="text-sm">. 14px/20px'
    },
    {
      name: 'font-body / text-sm leading-relaxed',
      family: 'Inter', style: 'Regular',
      size: 14, lh: 22, ls: 0,
      desc: 'Card body text with relaxed line height. HTML: <p class="text-sm leading-relaxed">. 14px/22px'
    },
    {
      name: 'font-body / text-xs',
      family: 'Inter', style: 'Regular',
      size: 12, lh: 16, ls: 0,
      desc: 'Captions, fine print. HTML: <p class="text-xs">. 12px/16px'
    },

    // ── UI (elementos interactivos)
    {
      name: 'UI / text-sm font-medium (button)',
      family: 'Inter', style: 'Medium',
      size: 14, lh: 20, ls: 0.2,
      desc: 'Button labels. HTML: <span class="text-sm font-medium">. 14px/20px'
    },
    {
      name: 'UI / text-base font-semibold (button-lg)',
      family: 'Inter', style: 'Semi Bold',
      size: 16, lh: 24, ls: 0,
      desc: 'Large button labels. HTML: <span class="text-base font-semibold">. 16px/24px'
    },
    {
      name: 'UI / text-lg font-semibold (button-xl)',
      family: 'Inter', style: 'Semi Bold',
      size: 18, lh: 28, ls: 0,
      desc: 'CTA button labels. HTML: <span class="text-lg font-semibold">. 18px/28px'
    },
    {
      name: 'UI / text-sm font-semibold (name)',
      family: 'Inter', style: 'Semi Bold',
      size: 14, lh: 20, ls: 0,
      desc: 'Author names, bold labels. HTML: <p class="text-sm font-semibold">. 14px/20px'
    },
    {
      name: 'UI / text-xs uppercase tracking-widest (overline)',
      family: 'Inter', style: 'Semi Bold',
      size: 12, lh: 16, ls: 2,
      desc: 'Section labels, overlines. HTML: <span class="text-xs font-semibold tracking-widest uppercase">. 12px/16px, 2px tracking'
    },
    {
      name: 'UI / text-xs font-medium tracking-wide (badge)',
      family: 'Inter', style: 'Medium',
      size: 11, lh: 16, ls: 1.5,
      desc: 'Badge text. HTML: <span class="text-xs font-medium tracking-wide uppercase">. 11px/16px'
    },
    {
      name: 'UI / text-xl font-semibold (nav-brand)',
      family: 'Space Grotesk', style: 'Bold',
      size: 20, lh: 28, ls: 0,
      desc: 'Navbar brand name. HTML: <span class="font-display font-bold text-xl">. 20px/28px'
    },
  ];

  for (const s of styles) {
    const textStyle = figma.createTextStyle();
    textStyle.name = s.name;
    textStyle.description = s.desc;
    textStyle.fontName = { family: s.family, style: s.style };
    textStyle.fontSize = s.size;
    textStyle.lineHeight = { value: s.lh, unit: 'PIXELS' };
    textStyle.letterSpacing = { value: s.ls, unit: 'PIXELS' };
  }

  return styles.length + ' text styles created';
})()`);

console.log('✓ Text Styles creados (20 styles con nomenclatura Tailwind)');

// ═══════════════════════════════════════════════════════════
// STEP 4: Update Color Tokens page with new naming
// ═══════════════════════════════════════════════════════════
console.log('\n🔵 Actualizando pagina Color Tokens...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255};
  }

  const page = figma.root.children.find(p => p.name === '🔵 Color Tokens');
  if (!page) return 'Page not found';
  await figma.setCurrentPageAsync(page);
  page.children.forEach(c => c.remove());
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});

  const container = figma.createFrame();
  container.name = 'Color Tokens — Tailwind';
  container.resize(1200, 10);
  container.layoutMode = 'VERTICAL';
  container.primaryAxisSizingMode = 'AUTO';
  container.counterAxisSizingMode = 'FIXED';
  container.paddingTop = 60; container.paddingBottom = 60;
  container.paddingLeft = 60; container.paddingRight = 60;
  container.itemSpacing = 48;
  container.fills = [{type:'SOLID', color: h('#0B0E14')}];

  // Title
  const label = figma.createText();
  label.fontName = {family:'Inter',style:'Semi Bold'};
  label.characters = 'COLOR TOKENS';
  label.fontSize = 12;
  label.letterSpacing = {value: 2, unit: 'PIXELS'};
  label.fills = [{type:'SOLID', color: h('#6366F1')}];
  container.appendChild(label);

  const heading = figma.createText();
  heading.fontName = {family:'Space Grotesk',style:'Bold'};
  heading.characters = 'Color Palette — Tailwind CSS';
  heading.fontSize = 40;
  heading.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  container.appendChild(heading);

  const categories = [
    {
      title: 'BRAND — Colores de marca',
      colors: [
        { name: 'bg-primary', hex: '#6366F1', tw: 'bg-primary' },
        { name: 'bg-primary (hover)', hex: '#4F46E5', tw: 'hover:bg-primary' },
        { name: 'bg-primary (light)', hex: '#818CF8', tw: 'ring-primary' },
        { name: 'bg-accent', hex: '#34D399', tw: 'bg-accent' },
        { name: 'bg-accent (hover)', hex: '#059669', tw: 'hover:bg-accent' },
      ]
    },
    {
      title: 'SURFACE — Fondos y superficies',
      colors: [
        { name: 'bg-background', hex: '#0B0E14', tw: 'bg-background' },
        { name: 'bg-surface', hex: '#151925', tw: 'bg-surface' },
        { name: 'bg-white', hex: '#FFFFFF', tw: 'bg-white' },
      ]
    },
    {
      title: 'TEXT — Colores de texto',
      colors: [
        { name: 'text-text-main', hex: '#F8FAFC', tw: 'text-text-main' },
        { name: 'text-text-muted', hex: '#94A3B8', tw: 'text-text-muted' },
        { name: 'text-white', hex: '#FFFFFF', tw: 'text-white' },
        { name: 'text-primary', hex: '#6366F1', tw: 'text-primary' },
        { name: 'text-accent', hex: '#34D399', tw: 'text-accent' },
      ]
    },
    {
      title: 'BORDER — Bordes',
      colors: [
        { name: 'border-white/5', hex: '#FFFFFF', tw: 'border-white/5', note: '5% opacity' },
        { name: 'border-white/10', hex: '#FFFFFF', tw: 'border-white/10', note: '10% opacity' },
        { name: 'border-primary/20', hex: '#6366F1', tw: 'border-primary/20', note: '20% opacity' },
        { name: 'border-primary/30', hex: '#6366F1', tw: 'border-primary/30', note: '30% opacity' },
      ]
    },
    {
      title: 'EFFECT — Glows, glass, overlays',
      colors: [
        { name: 'bg-primary/10', hex: '#6366F1', tw: 'bg-primary/10', note: 'Icon containers' },
        { name: 'bg-surface/60', hex: '#151925', tw: 'glass-card', note: 'Glassmorphism' },
        { name: 'bg-surface/50', hex: '#151925', tw: 'glass-card-lg', note: 'Large glass' },
      ]
    },
  ];

  for (const cat of categories) {
    const catFrame = figma.createFrame();
    catFrame.name = cat.title;
    catFrame.layoutMode = 'VERTICAL';
    catFrame.primaryAxisSizingMode = 'AUTO';
    catFrame.counterAxisSizingMode = 'AUTO';
    catFrame.itemSpacing = 16;
    catFrame.fills = [];

    const catTitle = figma.createText();
    catTitle.fontName = {family:'Inter',style:'Semi Bold'};
    catTitle.characters = cat.title;
    catTitle.fontSize = 13;
    catTitle.letterSpacing = {value: 1, unit: 'PIXELS'};
    catTitle.fills = [{type:'SOLID', color: h('#94A3B8')}];
    catFrame.appendChild(catTitle);

    const row = figma.createFrame();
    row.name = 'Swatches';
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    row.itemSpacing = 16;
    row.fills = [];

    for (const c of cat.colors) {
      const swatch = figma.createFrame();
      swatch.name = c.name;
      swatch.layoutMode = 'VERTICAL';
      swatch.primaryAxisSizingMode = 'AUTO';
      swatch.counterAxisSizingMode = 'FIXED';
      swatch.resize(140, 10);
      swatch.itemSpacing = 6;
      swatch.fills = [];

      const box = figma.createFrame();
      box.resize(140, 70);
      box.cornerRadius = 10;
      box.fills = [{type:'SOLID', color: h(c.hex)}];
      if (c.hex === '#0B0E14' || c.hex === '#151925' || c.hex === '#FFFFFF') {
        box.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.1}];
        box.strokeWeight = 1;
      }
      swatch.appendChild(box);

      const nm = figma.createText();
      nm.fontName = {family:'Inter',style:'Medium'};
      nm.characters = c.name;
      nm.fontSize = 11;
      nm.fills = [{type:'SOLID', color: h('#F8FAFC')}];
      swatch.appendChild(nm);

      const info = figma.createText();
      info.fontName = {family:'Inter',style:'Regular'};
      info.characters = c.hex + (c.note ? ' • ' + c.note : '');
      info.fontSize = 10;
      info.fills = [{type:'SOLID', color: h('#94A3B8')}];
      swatch.appendChild(info);

      row.appendChild(swatch);
    }
    catFrame.appendChild(row);
    container.appendChild(catFrame);
  }

  figma.viewport.scrollAndZoomIntoView([container]);
  return 'Color tokens page updated';
})()`);

console.log('✓ Color Tokens page actualizada');

// ═══════════════════════════════════════════════════════════
// STEP 5: Update Typography page
// ═══════════════════════════════════════════════════════════
console.log('\n🔤 Actualizando pagina Typography...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255};
  }

  const page = figma.root.children.find(p => p.name === '🔤 Typography');
  if (!page) return 'Page not found';
  await figma.setCurrentPageAsync(page);
  page.children.forEach(c => c.remove());
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Regular'});

  const container = figma.createFrame();
  container.name = 'Typography — Tailwind';
  container.resize(1100, 10);
  container.layoutMode = 'VERTICAL';
  container.primaryAxisSizingMode = 'AUTO';
  container.counterAxisSizingMode = 'FIXED';
  container.paddingTop = 60; container.paddingBottom = 60;
  container.paddingLeft = 60; container.paddingRight = 60;
  container.itemSpacing = 40;
  container.fills = [{type:'SOLID', color: h('#0B0E14')}];

  const label = figma.createText();
  label.fontName = {family:'Inter',style:'Semi Bold'};
  label.characters = 'TYPOGRAPHY';
  label.fontSize = 12;
  label.letterSpacing = {value: 2, unit: 'PIXELS'};
  label.fills = [{type:'SOLID', color: h('#6366F1')}];
  container.appendChild(label);

  const heading = figma.createText();
  heading.fontName = {family:'Space Grotesk',style:'Bold'};
  heading.characters = 'Type Scale — Tailwind CSS';
  heading.fontSize = 40;
  heading.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  container.appendChild(heading);

  const fontNote = figma.createText();
  fontNote.fontName = {family:'Inter',style:'Regular'};
  fontNote.characters = 'font-display = Space Grotesk (titulos)  •  font-body = Inter (cuerpo, UI)';
  fontNote.fontSize = 14;
  fontNote.fills = [{type:'SOLID', color: h('#94A3B8')}];
  container.appendChild(fontNote);

  const samples = [
    { tw: 'font-display text-7xl font-bold', sample: 'Tu Dinero, Reinventado.', family: 'Space Grotesk', style: 'Bold', size: 56, lh: 64, ls: -2 },
    { tw: 'font-display text-5xl font-bold', sample: 'Construido para el futuro', family: 'Space Grotesk', style: 'Bold', size: 40, lh: 48, ls: -1 },
    { tw: 'font-display text-xl font-semibold', sample: 'Seguridad de Grado Militar', family: 'Space Grotesk', style: 'Medium', size: 20, lh: 28, ls: 0 },
    { tw: 'font-body text-lg', sample: 'NexVault es la billetera digital de nueva generacion que combina seguridad.', family: 'Inter', style: 'Regular', size: 18, lh: 28, ls: 0 },
    { tw: 'font-body text-sm leading-relaxed', sample: 'Encriptacion AES de 256 bits, autenticacion biometrica y deteccion de fraude.', family: 'Inter', style: 'Regular', size: 14, lh: 22, ls: 0 },
    { tw: 'text-xs uppercase tracking-widest', sample: 'POR QUE NEXVAULT', family: 'Inter', style: 'Semi Bold', size: 12, lh: 16, ls: 2 },
    { tw: 'text-sm font-medium (button)', sample: 'Comenzar', family: 'Inter', style: 'Medium', size: 14, lh: 20, ls: 0.2 },
    { tw: 'text-xs (caption)', sample: 'Sin tarjeta de credito. Cancela cuando quieras.', family: 'Inter', style: 'Regular', size: 12, lh: 16, ls: 0 },
  ];

  for (const s of samples) {
    const row = figma.createFrame();
    row.name = s.tw;
    row.layoutMode = 'VERTICAL';
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    row.itemSpacing = 6;
    row.fills = [];
    row.paddingBottom = 16;
    row.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.03}];
    row.strokeWeight = 1;
    row.strokeAlign = 'INSIDE';

    const twLabel = figma.createText();
    twLabel.fontName = {family:'Inter',style:'Medium'};
    twLabel.characters = s.tw + '  —  ' + s.family + ' ' + s.style + ' ' + s.size + 'px/' + s.lh + 'px';
    twLabel.fontSize = 11;
    twLabel.fills = [{type:'SOLID', color: h('#6366F1')}];
    row.appendChild(twLabel);

    const sample = figma.createText();
    sample.fontName = {family: s.family, style: s.style};
    sample.characters = s.sample;
    sample.fontSize = s.size;
    sample.lineHeight = {value: s.lh, unit: 'PIXELS'};
    sample.letterSpacing = {value: s.ls, unit: 'PIXELS'};
    sample.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    row.appendChild(sample);

    container.appendChild(row);
  }

  figma.viewport.scrollAndZoomIntoView([container]);
  return 'Typography page updated';
})()`);

console.log('✓ Typography page actualizada');

// ═══════════════════════════════════════════════════════════
// STEP 6: Add image placeholders to Landing Page
// ═══════════════════════════════════════════════════════════
console.log('\n🖼️  Actualizando placeholders de imagen en Landing Page...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255};
  }

  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});

  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  if (!page) return 'Page not found';
  await figma.setCurrentPageAsync(page);

  // Find all frames named "Image" or "Hero Image" and update them
  function findAll(node, name) {
    let results = [];
    if (node.name === name || node.name.startsWith(name)) results.push(node);
    if (node.children) {
      for (const child of node.children) {
        results = results.concat(findAll(child, name));
      }
    }
    return results;
  }

  const main = page.children[0];
  if (!main) return 'No main frame';

  // Update hero image placeholder
  const heroImgs = findAll(main, 'Hero Image');
  for (const img of heroImgs) {
    img.fills = [{type:'SOLID', color: h('#1a1f2e')}];
    img.strokes = [{type:'SOLID', color: h('#6366F1'), opacity: 0.2}];
    img.strokeWeight = 2;
    img.strokeAlign = 'INSIDE';
    // Update label
    const labels = img.children.filter(c => c.type === 'TEXT');
    if (labels.length > 0) {
      labels[0].characters = '📱 COPIAR: hero.png\\n\\nRuta: proyectos/ewallet-web/src/images/hero.png\\nTamaño: 1536x1536px';
      labels[0].fontSize = 14;
      labels[0].textAlignHorizontal = 'CENTER';
      labels[0].lineHeight = {value: 22, unit: 'PIXELS'};
    }
  }

  // Update feature image placeholders
  const featureCards = findAll(main, 'Card -');
  const featureImages = ['feature-security.png', 'feature-speed.png', 'feature-global.png'];
  let imgIdx = 0;
  for (const card of featureCards) {
    const imgFrames = card.children.filter(c => c.name === 'Image');
    for (const imgF of imgFrames) {
      if (imgIdx < featureImages.length) {
        imgF.fills = [{type:'SOLID', color: h('#1a1f2e')}];
        imgF.strokes = [{type:'SOLID', color: h('#34D399'), opacity: 0.2}];
        imgF.strokeWeight = 2;
        imgF.strokeAlign = 'INSIDE';
        const labels = imgF.children.filter(c => c.type === 'TEXT');
        if (labels.length > 0) {
          labels[0].characters = '🖼 COPIAR: ' + featureImages[imgIdx] + '\\nRuta: src/images/' + featureImages[imgIdx];
          labels[0].fontSize = 11;
          labels[0].textAlignHorizontal = 'CENTER';
        }
        imgIdx++;
      }
    }
  }

  // Update testimonial avatars
  const testimonials = findAll(main, 'Testimonial -');
  const avatarFiles = ['avatar-carolina.png', 'avatar-diego.png', 'avatar-valeria.png'];
  let avIdx = 0;
  for (const tCard of testimonials) {
    const authors = findAll(tCard, 'Author');
    for (const author of authors) {
      const ellipses = author.children.filter(c => c.type === 'ELLIPSE');
      for (const ell of ellipses) {
        if (avIdx < avatarFiles.length) {
          ell.name = 'COPIAR: ' + avatarFiles[avIdx];
          avIdx++;
        }
      }
    }
  }

  figma.viewport.scrollAndZoomIntoView([main]);
  return 'Image placeholders updated';
})()`);

console.log('✓ Placeholders de imagen actualizados');

// Navigate to color tokens to show result
await run(`(async ()=>{
  const page = figma.root.children.find(p => p.name === '🔵 Color Tokens');
  if (page) {
    await figma.setCurrentPageAsync(page);
    if (page.children.length > 0) figma.viewport.scrollAndZoomIntoView(page.children);
  }
  return 'Done';
})()`);

console.log('\n' + '═'.repeat(50));
console.log('✅ Styles corregidos con nomenclatura Tailwind');
console.log('═'.repeat(50));
console.log('\n📎 Color Styles (26 total):');
console.log('   Brand/     → bg-primary, bg-accent, hovers');
console.log('   Surface/   → bg-background, bg-surface, bg-white');
console.log('   Text/      → text-text-main, text-text-muted, text-primary, text-accent');
console.log('   Border/    → border-white/5, border-primary/20, etc.');
console.log('   Effect/    → bg-primary/10, glass-card, gradients');
console.log('\n📝 Text Styles (20 total):');
console.log('   font-display/  → text-7xl font-bold ... text-lg font-semibold');
console.log('   font-body/     → text-lg, text-base, text-sm, text-xs');
console.log('   UI/            → button, button-lg, overline, badge, nav-brand');

client.close();
