/**
 * NexVault Design System → Figma
 * 
 * Exports the complete NexVault design system into Figma:
 * - Color variables (Figma Variables)
 * - Typography styles (Figma Text Styles)
 * - Spacing tokens
 * - UI Components with variants (Button, Card, Badge, Avatar, Navbar)
 * - Cover page
 */
import { FigmaClient } from './src/figma-client.js';

const client = new FigmaClient();
await client.connect();
console.log('✓ Conectado a Figma');

async function run(code) {
  const result = await client.eval(code);
  return result;
}

function hex(c) {
  return `{r:parseInt('${c}'.substring(1,3),16)/255,g:parseInt('${c}'.substring(3,5),16)/255,b:parseInt('${c}'.substring(5,7),16)/255}`;
}

// ═══════════════════════════════════════════════════════════
// STEP 1: Create Pages
// ═══════════════════════════════════════════════════════════
console.log('\n📄 Creando paginas...');

await run(`(async ()=>{
  const pages = figma.root.children.map(p => p.name);
  
  const needed = ['🎨 Cover', '🔵 Color Tokens', '🔤 Typography', '📐 Spacing', '🧩 Components', '📱 Landing Page'];
  
  for (const name of needed) {
    if (!pages.includes(name)) {
      const page = figma.createPage();
      page.name = name;
    }
  }
  
  // Rename default page if it's "Page 1" or "Short"
  const first = figma.root.children[0];
  if (first.name === 'Page 1' || first.name === 'Short') {
    first.name = '🎨 Cover';
  }
  
  return figma.root.children.map(p => p.name).join(', ');
})()`);

console.log('✓ Paginas creadas');

// ═══════════════════════════════════════════════════════════
// STEP 2: Color Variables (Figma Variables API)
// ═══════════════════════════════════════════════════════════
console.log('\n🎨 Creando color variables...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  let collection;
  const existing = figma.variables.getLocalVariableCollections();
  collection = existing.find(c => c.name === 'NexVault Colors');
  if (!collection) {
    collection = figma.variables.createVariableCollection('NexVault Colors');
  }
  
  const modeId = collection.modes[0].modeId;
  
  const colors = [
    { name: 'background', value: '#0B0E14', desc: 'Fondo principal — azul casi negro' },
    { name: 'surface', value: '#151925', desc: 'Cards, modales, secciones elevadas' },
    { name: 'primary', value: '#6366F1', desc: 'Indigo — botones, links, acciones principales' },
    { name: 'primary-dark', value: '#4F46E5', desc: 'Indigo oscuro — hover states' },
    { name: 'primary-light', value: '#818CF8', desc: 'Indigo claro — highlights' },
    { name: 'accent', value: '#34D399', desc: 'Verde menta — exito, dinero, indicadores positivos' },
    { name: 'accent-dark', value: '#059669', desc: 'Verde oscuro — hover accent' },
    { name: 'text-main', value: '#F8FAFC', desc: 'Blanco hueso — texto principal' },
    { name: 'text-muted', value: '#94A3B8', desc: 'Gris azulado — texto secundario, captions' },
    { name: 'border', value: '#FFFFFF0F', desc: 'Borde sutil — 6% blanco' },
    { name: 'border-hover', value: '#6366F140', desc: 'Borde hover — 25% primary' },
    { name: 'glass-bg', value: '#15192599', desc: 'Fondo glassmorphism — 60% surface' },
    { name: 'glow-primary', value: '#6366F14D', desc: 'Glow indigo — sombras y efectos' },
    { name: 'glow-accent', value: '#34D39933', desc: 'Glow verde — sombras accent' },
  ];

  const existingVars = figma.variables.getLocalVariables('COLOR');
  
  for (const c of colors) {
    const hexClean = c.value.substring(0, 7);
    const colorVal = h(hexClean);
    let alpha = 1;
    if (c.value.length > 7) {
      alpha = parseInt(c.value.substring(7), 16) / 255;
    }
    
    let variable = existingVars.find(v => v.name === 'NexVault/' + c.name);
    if (!variable) {
      variable = figma.variables.createVariable('NexVault/' + c.name, collection, 'COLOR');
    }
    variable.description = c.desc;
    variable.setValueForMode(modeId, { r: colorVal.r, g: colorVal.g, b: colorVal.b, a: alpha });
  }

  return colors.length + ' color variables created';
})()`);

console.log('✓ Color variables creadas');

// ═══════════════════════════════════════════════════════════
// STEP 3: Spacing Variables
// ═══════════════════════════════════════════════════════════
console.log('\n📐 Creando spacing tokens...');

await run(`(async ()=>{
  let collection;
  const existing = figma.variables.getLocalVariableCollections();
  collection = existing.find(c => c.name === 'NexVault Spacing');
  if (!collection) {
    collection = figma.variables.createVariableCollection('NexVault Spacing');
  }
  
  const modeId = collection.modes[0].modeId;
  
  const spacings = [
    { name: 'xs', value: 4 },
    { name: 'sm', value: 8 },
    { name: 'md', value: 12 },
    { name: 'base', value: 16 },
    { name: 'lg', value: 24 },
    { name: 'xl', value: 32 },
    { name: '2xl', value: 48 },
    { name: '3xl', value: 64 },
    { name: '4xl', value: 80 },
    { name: 'section-y', value: 80, desc: 'Padding vertical de secciones (py-16 lg:py-20)' },
    { name: 'header-mb', value: 48, desc: 'Margin bottom de headers de seccion (mb-12)' },
  ];

  const existingVars = figma.variables.getLocalVariables('FLOAT');
  
  for (const s of spacings) {
    let variable = existingVars.find(v => v.name === 'spacing/' + s.name);
    if (!variable) {
      variable = figma.variables.createVariable('spacing/' + s.name, collection, 'FLOAT');
    }
    if (s.desc) variable.description = s.desc;
    variable.setValueForMode(modeId, s.value);
  }

  return spacings.length + ' spacing tokens created';
})()`);

console.log('✓ Spacing tokens creados');

// ═══════════════════════════════════════════════════════════
// STEP 4: Cover Page
// ═══════════════════════════════════════════════════════════
console.log('\n🎨 Creando Cover page...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  const coverPage = figma.root.children.find(p => p.name === '🎨 Cover');
  if (!coverPage) return 'Cover page not found';
  await figma.setCurrentPageAsync(coverPage);
  
  // Clear existing
  coverPage.children.forEach(c => c.remove());
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});

  const frame = figma.createFrame();
  frame.name = 'Cover';
  frame.resize(1200, 800);
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  frame.primaryAxisSizingMode = 'FIXED';
  frame.counterAxisSizingMode = 'FIXED';
  frame.paddingTop = 0;
  frame.paddingBottom = 0;
  frame.paddingLeft = 0;
  frame.paddingRight = 0;
  frame.itemSpacing = 24;
  frame.fills = [{type:'SOLID', color: h('#0B0E14')}];

  // Logo circle
  const logo = figma.createFrame();
  logo.name = 'Logo';
  logo.resize(80, 80);
  logo.cornerRadius = 16;
  logo.fills = [{type:'SOLID', color: h('#6366F1')}];
  logo.layoutMode = 'VERTICAL';
  logo.primaryAxisAlignItems = 'CENTER';
  logo.counterAxisAlignItems = 'CENTER';
  frame.appendChild(logo);

  const logoText = figma.createText();
  logoText.fontName = {family:'Inter',style:'Bold'};
  logoText.characters = 'N';
  logoText.fontSize = 40;
  logoText.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  logo.appendChild(logoText);

  // Title
  const title = figma.createText();
  title.fontName = {family:'Inter',style:'Bold'};
  title.characters = 'NexVault';
  title.fontSize = 72;
  title.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  title.letterSpacing = {value: -2, unit: 'PIXELS'};
  frame.appendChild(title);

  // Subtitle
  const sub = figma.createText();
  sub.fontName = {family:'Inter',style:'Regular'};
  sub.characters = 'Design System — Billetera Digital de Nueva Generacion';
  sub.fontSize = 20;
  sub.fills = [{type:'SOLID', color: h('#94A3B8')}];
  frame.appendChild(sub);

  // Divider line
  const line = figma.createLine();
  line.resize(200, 0);
  line.strokes = [{type:'SOLID', color: h('#6366F1'), opacity: 0.4}];
  line.strokeWeight = 2;
  frame.appendChild(line);

  // Info
  const info = figma.createText();
  info.fontName = {family:'Inter',style:'Regular'};
  info.characters = 'Fintech • Peru • Dark Mode • Tailwind CSS';
  info.fontSize = 14;
  info.fills = [{type:'SOLID', color: h('#94A3B8')}];
  frame.appendChild(info);

  // Date
  const date = figma.createText();
  date.fontName = {family:'Inter',style:'Regular'};
  date.characters = 'Marzo 2026 — v1.0';
  date.fontSize = 12;
  date.fills = [{type:'SOLID', color: {r:0.58,g:0.64,b:0.72}}];
  frame.appendChild(date);

  figma.viewport.scrollAndZoomIntoView([frame]);
  return 'Cover created';
})()`);

console.log('✓ Cover page creada');

// ═══════════════════════════════════════════════════════════
// STEP 5: Color Tokens Page (visual swatches)
// ═══════════════════════════════════════════════════════════
console.log('\n🔵 Creando pagina de Color Tokens...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  const page = figma.root.children.find(p => p.name === '🔵 Color Tokens');
  if (!page) return 'Page not found';
  await figma.setCurrentPageAsync(page);
  page.children.forEach(c => c.remove());
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});

  const colors = [
    { name: 'background', value: '#0B0E14', tw: 'bg-background' },
    { name: 'surface', value: '#151925', tw: 'bg-surface' },
    { name: 'primary', value: '#6366F1', tw: 'bg-primary' },
    { name: 'primary-dark', value: '#4F46E5', tw: 'hover:bg-primary' },
    { name: 'primary-light', value: '#818CF8', tw: 'text-primary/light' },
    { name: 'accent', value: '#34D399', tw: 'bg-accent' },
    { name: 'accent-dark', value: '#059669', tw: 'hover:bg-accent' },
    { name: 'text-main', value: '#F8FAFC', tw: 'text-text-main' },
    { name: 'text-muted', value: '#94A3B8', tw: 'text-text-muted' },
  ];

  // Title
  const titleFrame = figma.createFrame();
  titleFrame.name = 'Section Title';
  titleFrame.layoutMode = 'VERTICAL';
  titleFrame.primaryAxisSizingMode = 'AUTO';
  titleFrame.counterAxisSizingMode = 'AUTO';
  titleFrame.itemSpacing = 8;
  titleFrame.fills = [];
  titleFrame.paddingBottom = 40;

  const label = figma.createText();
  label.fontName = {family:'Inter',style:'Semi Bold'};
  label.characters = 'COLOR TOKENS';
  label.fontSize = 12;
  label.letterSpacing = {value: 2, unit: 'PIXELS'};
  label.fills = [{type:'SOLID', color: h('#6366F1')}];
  titleFrame.appendChild(label);

  const heading = figma.createText();
  heading.fontName = {family:'Inter',style:'Bold'};
  heading.characters = 'Color Palette';
  heading.fontSize = 40;
  heading.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  titleFrame.appendChild(heading);

  // Grid of swatches
  const grid = figma.createFrame();
  grid.name = 'Color Grid';
  grid.layoutMode = 'HORIZONTAL';
  grid.layoutWrap = 'WRAP';
  grid.primaryAxisSizingMode = 'FIXED';
  grid.counterAxisSizingMode = 'AUTO';
  grid.resize(1000, 100);
  grid.itemSpacing = 20;
  grid.counterAxisSpacing = 20;
  grid.fills = [];

  for (const c of colors) {
    const swatch = figma.createFrame();
    swatch.name = c.name;
    swatch.layoutMode = 'VERTICAL';
    swatch.primaryAxisSizingMode = 'AUTO';
    swatch.counterAxisSizingMode = 'FIXED';
    swatch.resize(160, 100);
    swatch.itemSpacing = 8;
    swatch.fills = [];

    const colorBox = figma.createFrame();
    colorBox.name = c.name + '-swatch';
    colorBox.resize(160, 100);
    colorBox.cornerRadius = 12;
    colorBox.fills = [{type:'SOLID', color: h(c.value)}];
    if (c.name === 'background' || c.name === 'surface') {
      colorBox.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.1}];
      colorBox.strokeWeight = 1;
    }
    swatch.appendChild(colorBox);

    const nameText = figma.createText();
    nameText.fontName = {family:'Inter',style:'Semi Bold'};
    nameText.characters = c.name;
    nameText.fontSize = 13;
    nameText.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    swatch.appendChild(nameText);

    const hexText = figma.createText();
    hexText.fontName = {family:'Inter',style:'Regular'};
    hexText.characters = c.value + '  •  ' + c.tw;
    hexText.fontSize = 11;
    hexText.fills = [{type:'SOLID', color: h('#94A3B8')}];
    swatch.appendChild(hexText);

    grid.appendChild(swatch);
  }

  figma.viewport.scrollAndZoomIntoView([titleFrame, grid]);
  return 'Color tokens page created';
})()`);

console.log('✓ Color tokens page creada');

// ═══════════════════════════════════════════════════════════
// STEP 6: Typography Page
// ═══════════════════════════════════════════════════════════
console.log('\n🔤 Creando pagina de Typography...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  const page = figma.root.children.find(p => p.name === '🔤 Typography');
  if (!page) return 'Page not found';
  await figma.setCurrentPageAsync(page);
  page.children.forEach(c => c.remove());
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Inter',style:'Light'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Regular'});

  // Create text styles
  const styles = [
    { name: 'Display / H1', family: 'Space Grotesk', style: 'Bold', size: 64, lh: 72, ls: -2, color: '#F8FAFC', desc: 'Hero titles — font-display text-6xl font-bold' },
    { name: 'Display / H2', family: 'Space Grotesk', style: 'Bold', size: 48, lh: 56, ls: -1, color: '#F8FAFC', desc: 'Section headings — font-display text-4xl font-bold' },
    { name: 'Display / H3', family: 'Space Grotesk', style: 'Medium', size: 32, lh: 40, ls: -0.5, color: '#F8FAFC', desc: 'Subsection headings — font-display text-3xl font-semibold' },
    { name: 'Display / H4', family: 'Space Grotesk', style: 'Medium', size: 24, lh: 32, ls: 0, color: '#F8FAFC', desc: 'Card titles — font-display text-2xl font-semibold' },
    { name: 'Body / Large', family: 'Inter', style: 'Regular', size: 18, lh: 28, ls: 0, color: '#94A3B8', desc: 'Intro paragraphs — text-lg' },
    { name: 'Body / Base', family: 'Inter', style: 'Regular', size: 16, lh: 24, ls: 0, color: '#94A3B8', desc: 'Default body text — text-base' },
    { name: 'Body / Small', family: 'Inter', style: 'Regular', size: 14, lh: 20, ls: 0, color: '#94A3B8', desc: 'Secondary text — text-sm' },
    { name: 'UI / Button', family: 'Inter', style: 'Medium', size: 14, lh: 20, ls: 0.2, color: '#FFFFFF', desc: 'Button labels — text-sm font-medium' },
    { name: 'UI / Caption', family: 'Inter', style: 'Regular', size: 12, lh: 16, ls: 0.3, color: '#94A3B8', desc: 'Captions, labels — text-xs' },
    { name: 'UI / Overline', family: 'Inter', style: 'Semi Bold', size: 12, lh: 16, ls: 2, color: '#6366F1', desc: 'Section labels — text-xs uppercase tracking-widest' },
  ];

  // Create Figma text styles
  for (const s of styles) {
    const existing = figma.getLocalTextStyles().find(ts => ts.name === 'NexVault/' + s.name);
    const textStyle = existing || figma.createTextStyle();
    textStyle.name = 'NexVault/' + s.name;
    textStyle.description = s.desc;
    textStyle.fontName = { family: s.family, style: s.style };
    textStyle.fontSize = s.size;
    textStyle.lineHeight = { value: s.lh, unit: 'PIXELS' };
    textStyle.letterSpacing = { value: s.ls, unit: 'PIXELS' };
  }

  // Visual page
  const container = figma.createFrame();
  container.name = 'Typography Scale';
  container.layoutMode = 'VERTICAL';
  container.primaryAxisSizingMode = 'AUTO';
  container.counterAxisSizingMode = 'FIXED';
  container.resize(900, 100);
  container.itemSpacing = 0;
  container.fills = [{type:'SOLID', color: h('#0B0E14')}];
  container.paddingTop = 60;
  container.paddingBottom = 60;
  container.paddingLeft = 60;
  container.paddingRight = 60;

  // Section title
  const label = figma.createText();
  label.fontName = {family:'Inter',style:'Semi Bold'};
  label.characters = 'TYPOGRAPHY';
  label.fontSize = 12;
  label.letterSpacing = {value: 2, unit: 'PIXELS'};
  label.fills = [{type:'SOLID', color: h('#6366F1')}];
  container.appendChild(label);

  const heading = figma.createText();
  heading.fontName = {family:'Inter',style:'Bold'};
  heading.characters = 'Type Scale';
  heading.fontSize = 40;
  heading.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  container.appendChild(heading);

  // Spacer
  const spacer = figma.createFrame();
  spacer.name = 'spacer';
  spacer.resize(900, 40);
  spacer.fills = [];
  container.appendChild(spacer);

  // Font info
  const fontInfo = figma.createText();
  fontInfo.fontName = {family:'Inter',style:'Regular'};
  fontInfo.characters = 'Display: Space Grotesk (400-700)  •  Body: Inter (300-700)';
  fontInfo.fontSize = 14;
  fontInfo.fills = [{type:'SOLID', color: h('#94A3B8')}];
  container.appendChild(fontInfo);

  const spacer2 = figma.createFrame();
  spacer2.name = 'spacer2';
  spacer2.resize(900, 40);
  spacer2.fills = [];
  container.appendChild(spacer2);

  for (const s of styles) {
    const row = figma.createFrame();
    row.name = s.name;
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.resize(780, 10);
    row.itemSpacing = 24;
    row.fills = [];
    row.paddingTop = 16;
    row.paddingBottom = 16;
    row.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.05}];
    row.strokeWeight = 1;
    row.strokeAlign = 'INSIDE';

    // Meta column
    const meta = figma.createFrame();
    meta.name = 'meta';
    meta.layoutMode = 'VERTICAL';
    meta.primaryAxisSizingMode = 'AUTO';
    meta.counterAxisSizingMode = 'FIXED';
    meta.resize(180, 10);
    meta.itemSpacing = 4;
    meta.fills = [];

    const metaName = figma.createText();
    metaName.fontName = {family:'Inter',style:'Semi Bold'};
    metaName.characters = s.name;
    metaName.fontSize = 12;
    metaName.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    meta.appendChild(metaName);

    const metaSize = figma.createText();
    metaSize.fontName = {family:'Inter',style:'Regular'};
    metaSize.characters = s.size + 'px / ' + s.lh + 'px';
    metaSize.fontSize = 11;
    metaSize.fills = [{type:'SOLID', color: h('#94A3B8')}];
    meta.appendChild(metaSize);

    row.appendChild(meta);

    // Sample text
    const sample = figma.createText();
    sample.fontName = {family: s.family, style: s.style};
    sample.characters = s.name.includes('Display') ? 'Tu dinero, tu control' : 'Gestiona tus finanzas con total seguridad y transparencia.';
    sample.fontSize = Math.min(s.size, 48);
    sample.lineHeight = {value: Math.min(s.lh, 56), unit: 'PIXELS'};
    sample.letterSpacing = {value: s.ls, unit: 'PIXELS'};
    sample.fills = [{type:'SOLID', color: h(s.color)}];
    row.appendChild(sample);

    container.appendChild(row);
  }

  figma.viewport.scrollAndZoomIntoView([container]);
  return 'Typography page created with ' + styles.length + ' styles';
})()`);

console.log('✓ Typography page creada');

// ═══════════════════════════════════════════════════════════
// STEP 7: Spacing Page
// ═══════════════════════════════════════════════════════════
console.log('\n📐 Creando pagina de Spacing...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  const page = figma.root.children.find(p => p.name === '📐 Spacing');
  if (!page) return 'Page not found';
  await figma.setCurrentPageAsync(page);
  page.children.forEach(c => c.remove());
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});

  const container = figma.createFrame();
  container.name = 'Spacing Scale';
  container.layoutMode = 'VERTICAL';
  container.primaryAxisSizingMode = 'AUTO';
  container.counterAxisSizingMode = 'FIXED';
  container.resize(800, 100);
  container.itemSpacing = 16;
  container.fills = [{type:'SOLID', color: h('#0B0E14')}];
  container.paddingTop = 60;
  container.paddingBottom = 60;
  container.paddingLeft = 60;
  container.paddingRight = 60;

  const label = figma.createText();
  label.fontName = {family:'Inter',style:'Semi Bold'};
  label.characters = 'SPACING';
  label.fontSize = 12;
  label.letterSpacing = {value: 2, unit: 'PIXELS'};
  label.fills = [{type:'SOLID', color: h('#6366F1')}];
  container.appendChild(label);

  const heading = figma.createText();
  heading.fontName = {family:'Inter',style:'Bold'};
  heading.characters = 'Spacing Scale';
  heading.fontSize = 40;
  heading.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  container.appendChild(heading);

  const spacings = [
    { name: 'xs', value: 4, tw: '1' },
    { name: 'sm', value: 8, tw: '2' },
    { name: 'md', value: 12, tw: '3' },
    { name: 'base', value: 16, tw: '4' },
    { name: 'lg', value: 24, tw: '6' },
    { name: 'xl', value: 32, tw: '8' },
    { name: '2xl', value: 48, tw: '12' },
    { name: '3xl', value: 64, tw: '16' },
    { name: '4xl', value: 80, tw: '20' },
  ];

  for (const s of spacings) {
    const row = figma.createFrame();
    row.name = s.name;
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'FIXED';
    row.counterAxisSizingMode = 'AUTO';
    row.counterAxisAlignItems = 'CENTER';
    row.resize(680, 10);
    row.itemSpacing = 16;
    row.fills = [];

    const labelText = figma.createText();
    labelText.fontName = {family:'Inter',style:'Semi Bold'};
    labelText.characters = s.name.padEnd(6) + s.value + 'px';
    labelText.fontSize = 13;
    labelText.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    row.appendChild(labelText);

    const bar = figma.createFrame();
    bar.name = 'bar-' + s.name;
    bar.resize(s.value * 3, 24);
    bar.cornerRadius = 4;
    bar.fills = [{type:'SOLID', color: h('#6366F1'), opacity: 0.6}];
    row.appendChild(bar);

    const twLabel = figma.createText();
    twLabel.fontName = {family:'Inter',style:'Regular'};
    twLabel.characters = 'p-' + s.tw + '  /  gap-' + s.tw;
    twLabel.fontSize = 11;
    twLabel.fills = [{type:'SOLID', color: h('#94A3B8')}];
    row.appendChild(twLabel);

    container.appendChild(row);
  }

  figma.viewport.scrollAndZoomIntoView([container]);
  return 'Spacing page created';
})()`);

console.log('✓ Spacing page creada');

// ═══════════════════════════════════════════════════════════
// STEP 8: Components Page
// ═══════════════════════════════════════════════════════════
console.log('\n🧩 Creando componentes...');

// 8a: Button Component with variants
console.log('  → Button...');
await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  const page = figma.root.children.find(p => p.name === '🧩 Components');
  if (!page) return 'Page not found';
  await figma.setCurrentPageAsync(page);
  page.children.forEach(c => c.remove());
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});

  let yOffset = 0;

  // ── Section Title
  const sectionLabel = figma.createText();
  sectionLabel.fontName = {family:'Inter',style:'Semi Bold'};
  sectionLabel.characters = 'COMPONENTS';
  sectionLabel.fontSize = 12;
  sectionLabel.letterSpacing = {value: 2, unit: 'PIXELS'};
  sectionLabel.fills = [{type:'SOLID', color: h('#6366F1')}];
  sectionLabel.y = yOffset;
  yOffset += 30;

  const sectionHeading = figma.createText();
  sectionHeading.fontName = {family:'Inter',style:'Bold'};
  sectionHeading.characters = 'UI Components';
  sectionHeading.fontSize = 40;
  sectionHeading.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  sectionHeading.y = yOffset;
  yOffset += 80;

  // ── BUTTONS ──
  const btnLabel = figma.createText();
  btnLabel.fontName = {family:'Inter',style:'Semi Bold'};
  btnLabel.characters = 'Buttons';
  btnLabel.fontSize = 20;
  btnLabel.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  btnLabel.y = yOffset;
  yOffset += 40;

  function createButton(name, bgColor, textColor, x, y, w, h2, radius, strokeColor) {
    const btn = figma.createComponent();
    btn.name = name;
    btn.resize(w, h2);
    btn.layoutMode = 'HORIZONTAL';
    btn.primaryAxisAlignItems = 'CENTER';
    btn.counterAxisAlignItems = 'CENTER';
    btn.primaryAxisSizingMode = 'AUTO';
    btn.counterAxisSizingMode = 'AUTO';
    btn.paddingTop = 12;
    btn.paddingBottom = 12;
    btn.paddingLeft = 24;
    btn.paddingRight = 24;
    btn.cornerRadius = radius;
    btn.x = x;
    btn.y = y;

    if (bgColor) {
      btn.fills = [{type:'SOLID', color: h(bgColor)}];
    } else {
      btn.fills = [];
    }

    if (strokeColor) {
      btn.strokes = [{type:'SOLID', color: h(strokeColor)}];
      btn.strokeWeight = 1;
    }

    btn.effects = bgColor === '#6366F1' ? [{
      type: 'DROP_SHADOW',
      color: {r:0.39,g:0.4,b:0.95,a:0.3},
      offset:{x:0,y:0},
      radius:20,
      visible:true,
      blendMode:'NORMAL',
      spread:0
    }] : [];

    const label = figma.createText();
    label.fontName = {family:'Inter',style:'Medium'};
    label.characters = name.split('/').pop();
    label.fontSize = 14;
    label.fills = [{type:'SOLID', color: h(textColor)}];
    btn.appendChild(label);

    return btn;
  }

  createButton('Button/Primary', '#6366F1', '#FFFFFF', 0, yOffset, 160, 44, 12, null);
  createButton('Button/Secondary', '#151925', '#F8FAFC', 180, yOffset, 160, 44, 12, '#FFFFFF1A');
  createButton('Button/Ghost', null, '#94A3B8', 360, yOffset, 120, 44, 12, null);
  createButton('Button/Accent', '#34D399', '#0B0E14', 500, yOffset, 160, 44, 12, null);

  yOffset += 80;

  // ── GLASS CARD ──
  const cardLabel = figma.createText();
  cardLabel.fontName = {family:'Inter',style:'Semi Bold'};
  cardLabel.characters = 'Glass Card';
  cardLabel.fontSize = 20;
  cardLabel.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  cardLabel.y = yOffset;
  yOffset += 40;

  const card = figma.createComponent();
  card.name = 'Card/Glass';
  card.resize(340, 220);
  card.layoutMode = 'VERTICAL';
  card.primaryAxisSizingMode = 'AUTO';
  card.counterAxisSizingMode = 'FIXED';
  card.paddingTop = 28;
  card.paddingBottom = 28;
  card.paddingLeft = 28;
  card.paddingRight = 28;
  card.itemSpacing = 16;
  card.cornerRadius = 20;
  card.x = 0;
  card.y = yOffset;
  card.fills = [{type:'SOLID', color: h('#151925'), opacity: 0.6}];
  card.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.06}];
  card.strokeWeight = 1;
  card.effects = [{
    type: 'BACKGROUND_BLUR',
    radius: 16,
    visible: true
  }];

  // Icon container
  const iconBox = figma.createFrame();
  iconBox.name = 'Icon Container';
  iconBox.resize(48, 48);
  iconBox.cornerRadius = 12;
  iconBox.fills = [{type:'SOLID', color: h('#6366F1'), opacity: 0.15}];
  iconBox.layoutMode = 'VERTICAL';
  iconBox.primaryAxisAlignItems = 'CENTER';
  iconBox.counterAxisAlignItems = 'CENTER';
  card.appendChild(iconBox);

  const iconPlaceholder = figma.createText();
  iconPlaceholder.fontName = {family:'Inter',style:'Bold'};
  iconPlaceholder.characters = '🔒';
  iconPlaceholder.fontSize = 20;
  iconBox.appendChild(iconPlaceholder);

  const cardTitle = figma.createText();
  cardTitle.fontName = {family:'Inter',style:'Semi Bold'};
  cardTitle.characters = 'Seguridad Avanzada';
  cardTitle.fontSize = 18;
  cardTitle.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  card.appendChild(cardTitle);

  const cardDesc = figma.createText();
  cardDesc.fontName = {family:'Inter',style:'Regular'};
  cardDesc.characters = 'Proteccion de nivel bancario con encriptacion de extremo a extremo.';
  cardDesc.fontSize = 14;
  cardDesc.lineHeight = {value: 22, unit: 'PIXELS'};
  cardDesc.fills = [{type:'SOLID', color: h('#94A3B8')}];
  cardDesc.resize(284, 44);
  cardDesc.textAutoResize = 'HEIGHT';
  card.appendChild(cardDesc);

  yOffset += 260;

  // ── BADGE ──
  const badgeLabel = figma.createText();
  badgeLabel.fontName = {family:'Inter',style:'Semi Bold'};
  badgeLabel.characters = 'Badges';
  badgeLabel.fontSize = 20;
  badgeLabel.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  badgeLabel.y = yOffset;
  yOffset += 40;

  function createBadge(name, bgColor, textColor, text, x, y) {
    const badge = figma.createComponent();
    badge.name = name;
    badge.layoutMode = 'HORIZONTAL';
    badge.primaryAxisAlignItems = 'CENTER';
    badge.counterAxisAlignItems = 'CENTER';
    badge.primaryAxisSizingMode = 'AUTO';
    badge.counterAxisSizingMode = 'AUTO';
    badge.paddingTop = 6;
    badge.paddingBottom = 6;
    badge.paddingLeft = 16;
    badge.paddingRight = 16;
    badge.cornerRadius = 100;
    badge.x = x;
    badge.y = y;
    badge.fills = [{type:'SOLID', color: h(bgColor), opacity: 0.15}];

    const t = figma.createText();
    t.fontName = {family:'Inter',style:'Medium'};
    t.characters = text;
    t.fontSize = 12;
    t.fills = [{type:'SOLID', color: h(textColor)}];
    badge.appendChild(t);

    return badge;
  }

  createBadge('Badge/Primary', '#6366F1', '#818CF8', 'Fintech', 0, yOffset);
  createBadge('Badge/Accent', '#34D399', '#34D399', 'Activo', 120, yOffset);
  createBadge('Badge/Muted', '#94A3B8', '#94A3B8', 'Proximamente', 220, yOffset);

  yOffset += 70;

  // ── STAT CARD ──
  const statLabel = figma.createText();
  statLabel.fontName = {family:'Inter',style:'Semi Bold'};
  statLabel.characters = 'Stat Card';
  statLabel.fontSize = 20;
  statLabel.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  statLabel.y = yOffset;
  yOffset += 40;

  const stat = figma.createComponent();
  stat.name = 'Card/Stat';
  stat.resize(200, 120);
  stat.layoutMode = 'VERTICAL';
  stat.primaryAxisSizingMode = 'AUTO';
  stat.counterAxisSizingMode = 'AUTO';
  stat.primaryAxisAlignItems = 'CENTER';
  stat.counterAxisAlignItems = 'CENTER';
  stat.paddingTop = 24;
  stat.paddingBottom = 24;
  stat.paddingLeft = 24;
  stat.paddingRight = 24;
  stat.itemSpacing = 8;
  stat.cornerRadius = 16;
  stat.x = 0;
  stat.y = yOffset;
  stat.fills = [];

  const statNumber = figma.createText();
  statNumber.fontName = {family:'Inter',style:'Bold'};
  statNumber.characters = 'S/ 2.5M+';
  statNumber.fontSize = 32;
  statNumber.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  stat.appendChild(statNumber);

  const statDesc = figma.createText();
  statDesc.fontName = {family:'Inter',style:'Regular'};
  statDesc.characters = 'Transacciones procesadas';
  statDesc.fontSize = 14;
  statDesc.fills = [{type:'SOLID', color: h('#94A3B8')}];
  stat.appendChild(statDesc);

  yOffset += 160;

  // ── TESTIMONIAL CARD ──
  const testLabel = figma.createText();
  testLabel.fontName = {family:'Inter',style:'Semi Bold'};
  testLabel.characters = 'Testimonial Card';
  testLabel.fontSize = 20;
  testLabel.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  testLabel.y = yOffset;
  yOffset += 40;

  const testimonial = figma.createComponent();
  testimonial.name = 'Card/Testimonial';
  testimonial.resize(380, 200);
  testimonial.layoutMode = 'VERTICAL';
  testimonial.primaryAxisSizingMode = 'AUTO';
  testimonial.counterAxisSizingMode = 'FIXED';
  testimonial.paddingTop = 28;
  testimonial.paddingBottom = 28;
  testimonial.paddingLeft = 28;
  testimonial.paddingRight = 28;
  testimonial.itemSpacing = 16;
  testimonial.cornerRadius = 20;
  testimonial.x = 0;
  testimonial.y = yOffset;
  testimonial.fills = [{type:'SOLID', color: h('#151925'), opacity: 0.6}];
  testimonial.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.06}];
  testimonial.strokeWeight = 1;

  // Stars row
  const stars = figma.createText();
  stars.fontName = {family:'Inter',style:'Regular'};
  stars.characters = '★ ★ ★ ★ ★';
  stars.fontSize = 14;
  stars.fills = [{type:'SOLID', color: h('#6366F1')}];
  testimonial.appendChild(stars);

  // Quote
  const quote = figma.createText();
  quote.fontName = {family:'Inter',style:'Regular'};
  quote.characters = '"NexVault cambio como manejo mis finanzas. Rapido, seguro y con un diseño increible."';
  quote.fontSize = 14;
  quote.lineHeight = {value: 22, unit: 'PIXELS'};
  quote.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  quote.resize(324, 44);
  quote.textAutoResize = 'HEIGHT';
  testimonial.appendChild(quote);

  // Author row
  const authorRow = figma.createFrame();
  authorRow.name = 'Author';
  authorRow.layoutMode = 'HORIZONTAL';
  authorRow.primaryAxisSizingMode = 'AUTO';
  authorRow.counterAxisSizingMode = 'AUTO';
  authorRow.counterAxisAlignItems = 'CENTER';
  authorRow.itemSpacing = 12;
  authorRow.fills = [];

  const avatar = figma.createEllipse();
  avatar.name = 'Avatar';
  avatar.resize(40, 40);
  avatar.fills = [{type:'SOLID', color: h('#6366F1'), opacity: 0.3}];
  avatar.strokes = [{type:'SOLID', color: h('#6366F1'), opacity: 0.3}];
  avatar.strokeWeight = 2;
  authorRow.appendChild(avatar);

  const authorInfo = figma.createFrame();
  authorInfo.name = 'Info';
  authorInfo.layoutMode = 'VERTICAL';
  authorInfo.primaryAxisSizingMode = 'AUTO';
  authorInfo.counterAxisSizingMode = 'AUTO';
  authorInfo.itemSpacing = 2;
  authorInfo.fills = [];

  const authorName = figma.createText();
  authorName.fontName = {family:'Inter',style:'Semi Bold'};
  authorName.characters = 'Carolina Mendoza';
  authorName.fontSize = 14;
  authorName.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  authorInfo.appendChild(authorName);

  const authorRole = figma.createText();
  authorRole.fontName = {family:'Inter',style:'Regular'};
  authorRole.characters = 'Diseñadora Freelance';
  authorRole.fontSize = 12;
  authorRole.fills = [{type:'SOLID', color: h('#94A3B8')}];
  authorInfo.appendChild(authorRole);

  authorRow.appendChild(authorInfo);
  testimonial.appendChild(authorRow);

  // ── NAV ITEM ──
  yOffset += 260;

  const navLabel = figma.createText();
  navLabel.fontName = {family:'Inter',style:'Semi Bold'};
  navLabel.characters = 'Navbar';
  navLabel.fontSize = 20;
  navLabel.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  navLabel.y = yOffset;
  yOffset += 40;

  const navbar = figma.createComponent();
  navbar.name = 'Navbar';
  navbar.resize(1280, 64);
  navbar.layoutMode = 'HORIZONTAL';
  navbar.primaryAxisSizingMode = 'FIXED';
  navbar.counterAxisSizingMode = 'FIXED';
  navbar.primaryAxisAlignItems = 'SPACE_BETWEEN';
  navbar.counterAxisAlignItems = 'CENTER';
  navbar.paddingLeft = 24;
  navbar.paddingRight = 24;
  navbar.x = 0;
  navbar.y = yOffset;
  navbar.fills = [{type:'SOLID', color: h('#0B0E14'), opacity: 0.85}];
  navbar.effects = [{
    type: 'BACKGROUND_BLUR',
    radius: 16,
    visible: true
  }];
  navbar.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.05}];
  navbar.strokeWeight = 1;
  navbar.strokeAlign = 'INSIDE';

  // Logo group
  const logoGroup = figma.createFrame();
  logoGroup.name = 'Logo';
  logoGroup.layoutMode = 'HORIZONTAL';
  logoGroup.primaryAxisSizingMode = 'AUTO';
  logoGroup.counterAxisSizingMode = 'AUTO';
  logoGroup.counterAxisAlignItems = 'CENTER';
  logoGroup.itemSpacing = 8;
  logoGroup.fills = [];

  const navLogoBox = figma.createFrame();
  navLogoBox.name = 'LogoIcon';
  navLogoBox.resize(32, 32);
  navLogoBox.cornerRadius = 8;
  navLogoBox.fills = [{type:'SOLID', color: h('#6366F1')}];
  navLogoBox.layoutMode = 'VERTICAL';
  navLogoBox.primaryAxisAlignItems = 'CENTER';
  navLogoBox.counterAxisAlignItems = 'CENTER';
  logoGroup.appendChild(navLogoBox);

  const navLogoN = figma.createText();
  navLogoN.fontName = {family:'Inter',style:'Bold'};
  navLogoN.characters = 'N';
  navLogoN.fontSize = 16;
  navLogoN.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  navLogoBox.appendChild(navLogoN);

  const navBrand = figma.createText();
  navBrand.fontName = {family:'Inter',style:'Bold'};
  navBrand.characters = 'NexVault';
  navBrand.fontSize = 18;
  navBrand.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  logoGroup.appendChild(navBrand);

  navbar.appendChild(logoGroup);

  // Nav links
  const navLinks = figma.createFrame();
  navLinks.name = 'Links';
  navLinks.layoutMode = 'HORIZONTAL';
  navLinks.primaryAxisSizingMode = 'AUTO';
  navLinks.counterAxisSizingMode = 'AUTO';
  navLinks.itemSpacing = 32;
  navLinks.fills = [];

  const linkNames = ['Beneficios', 'Como Funciona', 'Cifras', 'Precios', 'Design System'];
  for (const ln of linkNames) {
    const link = figma.createText();
    link.fontName = {family:'Inter',style:'Regular'};
    link.characters = ln;
    link.fontSize = 14;
    link.fills = [{type:'SOLID', color: h(ln === 'Design System' ? '#34D399' : '#94A3B8')}];
    navLinks.appendChild(link);
  }
  navbar.appendChild(navLinks);

  // CTA
  const navCta = figma.createFrame();
  navCta.name = 'CTA Group';
  navCta.layoutMode = 'HORIZONTAL';
  navCta.primaryAxisSizingMode = 'AUTO';
  navCta.counterAxisSizingMode = 'AUTO';
  navCta.counterAxisAlignItems = 'CENTER';
  navCta.itemSpacing = 16;
  navCta.fills = [];

  const loginText = figma.createText();
  loginText.fontName = {family:'Inter',style:'Regular'};
  loginText.characters = 'Iniciar Sesion';
  loginText.fontSize = 14;
  loginText.fills = [{type:'SOLID', color: h('#94A3B8')}];
  navCta.appendChild(loginText);

  const ctaBtn = figma.createFrame();
  ctaBtn.name = 'CTA Button';
  ctaBtn.layoutMode = 'HORIZONTAL';
  ctaBtn.primaryAxisAlignItems = 'CENTER';
  ctaBtn.counterAxisAlignItems = 'CENTER';
  ctaBtn.primaryAxisSizingMode = 'AUTO';
  ctaBtn.counterAxisSizingMode = 'AUTO';
  ctaBtn.paddingTop = 10;
  ctaBtn.paddingBottom = 10;
  ctaBtn.paddingLeft = 20;
  ctaBtn.paddingRight = 20;
  ctaBtn.cornerRadius = 12;
  ctaBtn.fills = [{type:'SOLID', color: h('#6366F1')}];

  const ctaLabel = figma.createText();
  ctaLabel.fontName = {family:'Inter',style:'Medium'};
  ctaLabel.characters = 'Comenzar';
  ctaLabel.fontSize = 14;
  ctaLabel.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  ctaBtn.appendChild(ctaLabel);

  navCta.appendChild(ctaBtn);
  navbar.appendChild(navCta);

  figma.viewport.scrollAndZoomIntoView([sectionLabel, navbar]);
  return 'Components page created';
})()`);

console.log('✓ Components page creada');

// ═══════════════════════════════════════════════════════════
// STEP 9: Navigate to Cover and zoom
// ═══════════════════════════════════════════════════════════
console.log('\n🏠 Volviendo a Cover...');

await run(`(async ()=>{
  const coverPage = figma.root.children.find(p => p.name === '🎨 Cover');
  if (coverPage) {
    await figma.setCurrentPageAsync(coverPage);
    if (coverPage.children.length > 0) {
      figma.viewport.scrollAndZoomIntoView(coverPage.children);
    }
  }
  return 'Done';
})()`);

console.log('✓ Listo!');

// ═══════════════════════════════════════════════════════════
// SUMMARY
// ═══════════════════════════════════════════════════════════
console.log('\n' + '═'.repeat(50));
console.log('✅ NexVault Design System exportado a Figma');
console.log('═'.repeat(50));
console.log('\nPaginas creadas:');
console.log('  🎨 Cover — Portada del proyecto');
console.log('  🔵 Color Tokens — 14 variables de color');
console.log('  🔤 Typography — 10 text styles (Inter)');
console.log('  📐 Spacing — 11 spacing tokens');
console.log('  🧩 Components — Button (4), Card (3), Badge (3), Navbar');
console.log('  📱 Landing Page — (lista para recrear)');
console.log('\nVariables Figma:');
console.log('  • NexVault Colors (14 color variables)');
console.log('  • NexVault Spacing (11 float variables)');
console.log('  • NexVault/ text styles (10 styles)');

client.close();
