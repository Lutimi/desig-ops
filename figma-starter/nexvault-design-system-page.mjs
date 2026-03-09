/**
 * NexVault — Design System Page Replica in Figma
 * Replicates design-system.html exactly as shown in the web
 */
import { FigmaClient } from './src/figma-client.js';

const client = new FigmaClient();
await client.connect();
console.log('✓ Conectado a Figma');

async function run(code) { return await client.eval(code); }

const IMG = {
  hero: '7181486a1781dcd478096e8199e0215230c2cfe6',
  security: 'cc05d433511401ff5f517af8590f9ae1b1bb87c0',
  speed: '97182989c6e507f1743a74b032aa60f5afb910a8',
  global: 'a231f1ad239e37342152404043b5aac170921411',
};

// ═══════════════════════════════════════════════════════════
// CLEAR & SETUP
// ═══════════════════════════════════════════════════════════
console.log('\n📋 Creando Design System page...');

await run(`(async ()=>{
  let page = figma.root.children.find(p => p.name === '📋 Design System Doc');
  if (!page) { page = figma.createPage(); page.name = '📋 Design System Doc'; }
  await figma.setCurrentPageAsync(page);
  page.children.forEach(c => c.remove());
  return 'ready';
})()`);

// ═══════════════════════════════════════════════════════════
// BUILD THE FULL DESIGN SYSTEM
// ═══════════════════════════════════════════════════════════

await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  
  const paintStyles = figma.getLocalPaintStyles();
  const textStyles = figma.getLocalTextStyles();
  function ps(name) { const s = paintStyles.find(s => s.name === name); return s ? s.id : null; }
  function ts(name) { const s = textStyles.find(s => s.name === name); return s ? s.id : null; }

  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Regular'});

  // Main container
  const doc = figma.createFrame();
  doc.name = 'NexVault — Design System';
  doc.resize(1440, 100);
  doc.layoutMode = 'VERTICAL';
  doc.primaryAxisSizingMode = 'AUTO';
  doc.counterAxisSizingMode = 'FIXED';
  doc.paddingTop = 100; doc.paddingBottom = 80;
  doc.paddingLeft = 96; doc.paddingRight = 96;
  doc.itemSpacing = 64;
  doc.fills = [{type:'SOLID', color: h('#0B0E14')}];
  const bgStyle = ps('Surface / bg-background');
  if (bgStyle) doc.fillStyleId = bgStyle;

  // ── HEADER
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'AUTO';
  header.itemSpacing = 16;
  header.fills = [];
  header.paddingBottom = 32;

  const h1 = figma.createText();
  h1.fontName = {family:'Space Grotesk',style:'Bold'};
  h1.characters = 'Design System';
  h1.fontSize = 64;
  h1.lineHeight = {value:72,unit:'PIXELS'};
  h1.letterSpacing = {value:-2,unit:'PIXELS'};
  h1.fills = [{type:'SOLID',color:h('#F8FAFC')}];
  const h1ts = ts('font-display / text-6xl font-bold');
  if (h1ts) h1.textStyleId = h1ts;
  const h1fs = ps('Text / text-text-main');
  if (h1fs) h1.fillStyleId = h1fs;
  header.appendChild(h1);

  const sub = figma.createText();
  sub.fontName = {family:'Inter',style:'Regular'};
  sub.characters = 'Documentacion visual completa de NexVault. Todos los tokens, componentes y patrones usados en la landing page.\\nFintech • Peru • Dark Mode • Tailwind CSS';
  sub.fontSize = 18;
  sub.lineHeight = {value:28,unit:'PIXELS'};
  sub.fills = [{type:'SOLID',color:h('#94A3B8')}];
  sub.resize(700,10); sub.textAutoResize = 'HEIGHT';
  const subTs = ts('font-body / text-lg');
  if (subTs) sub.textStyleId = subTs;
  const subFs = ps('Text / text-text-muted');
  if (subFs) sub.fillStyleId = subFs;
  header.appendChild(sub);
  doc.appendChild(header);

  // ═══ HELPER: Section divider + title
  function addSection(title, number) {
    const section = figma.createFrame();
    section.name = title;
    section.layoutMode = 'VERTICAL';
    section.primaryAxisSizingMode = 'AUTO';
    section.counterAxisSizingMode = 'AUTO';
    section.itemSpacing = 24;
    section.fills = [];

    const overline = figma.createText();
    overline.fontName = {family:'Inter',style:'Semi Bold'};
    overline.characters = number + ' / ' + title.toUpperCase();
    overline.fontSize = 12;
    overline.letterSpacing = {value:2,unit:'PIXELS'};
    overline.fills = [{type:'SOLID',color:h('#6366F1')}];
    const olTs = ts('UI / text-xs uppercase tracking-widest (overline)');
    if (olTs) overline.textStyleId = olTs;
    const olFs = ps('Text / text-primary');
    if (olFs) overline.fillStyleId = olFs;
    section.appendChild(overline);

    const heading = figma.createText();
    heading.fontName = {family:'Space Grotesk',style:'Bold'};
    heading.characters = title;
    heading.fontSize = 40;
    heading.fills = [{type:'SOLID',color:h('#F8FAFC')}];
    const hTs = ts('font-display / text-5xl font-bold');
    if (hTs) heading.textStyleId = hTs;
    const hFs = ps('Text / text-text-main');
    if (hFs) heading.fillStyleId = hFs;
    section.appendChild(heading);

    return section;
  }

  // ═══════════ 01 COLORS ═══════════
  const colorSec = addSection('Colors', '01');

  // Core palette
  const coreLabel = figma.createText();
  coreLabel.fontName = {family:'Space Grotesk',style:'Medium'};
  coreLabel.characters = 'Core Palette';
  coreLabel.fontSize = 24;
  coreLabel.fills = [{type:'SOLID',color:h('#F8FAFC')}];
  colorSec.appendChild(coreLabel);

  const coreRow = figma.createFrame();
  coreRow.name = 'Core Swatches';
  coreRow.layoutMode = 'HORIZONTAL';
  coreRow.primaryAxisSizingMode = 'AUTO';
  coreRow.counterAxisSizingMode = 'AUTO';
  coreRow.itemSpacing = 16;
  coreRow.fills = [];

  const coreColors = [
    {name:'Background',hex:'#0B0E14',tw:'bg-background',style:'Surface / bg-background'},
    {name:'Surface',hex:'#151925',tw:'bg-surface',style:'Surface / bg-surface'},
    {name:'Primary',hex:'#6366F1',tw:'bg-primary / text-primary',style:'Brand / bg-primary'},
    {name:'Accent',hex:'#34D399',tw:'bg-accent / text-accent',style:'Brand / bg-accent'},
    {name:'Text Main',hex:'#F8FAFC',tw:'text-text-main',style:'Text / text-text-main'},
    {name:'Text Muted',hex:'#94A3B8',tw:'text-text-muted',style:'Text / text-text-muted'},
  ];

  for (const c of coreColors) {
    const swatch = figma.createFrame();
    swatch.name = c.name;
    swatch.layoutMode = 'VERTICAL';
    swatch.primaryAxisSizingMode = 'AUTO';
    swatch.counterAxisSizingMode = 'FIXED';
    swatch.resize(180, 10);
    swatch.itemSpacing = 0;
    swatch.fills = [];

    // Color box with label inside (like the web)
    const box = figma.createFrame();
    box.name = 'Swatch';
    box.resize(180, 140);
    box.cornerRadius = 16;
    box.fills = [{type:'SOLID', color: h(c.hex)}];
    const boxPs = ps(c.style);
    if (boxPs) box.fillStyleId = boxPs;
    if (c.name === 'Background' || c.name === 'Surface') {
      box.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.06}];
      box.strokeWeight = 1;
    }
    // Label at bottom of swatch
    box.layoutMode = 'VERTICAL';
    box.primaryAxisAlignItems = 'MAX';
    box.counterAxisAlignItems = 'MIN';
    box.paddingBottom = 12; box.paddingLeft = 12;

    const boxName = figma.createText();
    boxName.fontName = {family:'Inter',style:'Semi Bold'};
    boxName.characters = c.name;
    boxName.fontSize = 13;
    boxName.fills = [{type:'SOLID', color: h(c.hex === '#F8FAFC' || c.hex === '#94A3B8' ? '#0B0E14' : '#F8FAFC')}];
    box.appendChild(boxName);

    const boxHex = figma.createText();
    boxHex.fontName = {family:'Inter',style:'Regular'};
    boxHex.characters = c.hex;
    boxHex.fontSize = 11;
    boxHex.fills = [{type:'SOLID', color: h(c.hex === '#F8FAFC' || c.hex === '#94A3B8' ? '#151925' : '#94A3B8')}];
    box.appendChild(boxHex);

    swatch.appendChild(box);

    // Tailwind class below
    const twLabel = figma.createText();
    twLabel.fontName = {family:'Inter',style:'Regular'};
    twLabel.characters = c.tw;
    twLabel.fontSize = 11;
    twLabel.fills = [{type:'SOLID',color:h('#94A3B8')}];
    swatch.appendChild(twLabel);

    coreRow.appendChild(swatch);
  }
  colorSec.appendChild(coreRow);

  // Gradients
  const gradLabel = figma.createText();
  gradLabel.fontName = {family:'Space Grotesk',style:'Medium'};
  gradLabel.characters = 'Gradients';
  gradLabel.fontSize = 24;
  gradLabel.fills = [{type:'SOLID',color:h('#F8FAFC')}];
  colorSec.appendChild(gradLabel);

  const gradRow = figma.createFrame();
  gradRow.name = 'Gradients';
  gradRow.layoutMode = 'HORIZONTAL';
  gradRow.primaryAxisSizingMode = 'AUTO';
  gradRow.counterAxisSizingMode = 'AUTO';
  gradRow.itemSpacing = 24;
  gradRow.fills = [];

  // Primary gradient
  const grad1 = figma.createFrame();
  grad1.name = 'Primary Gradient';
  grad1.layoutMode = 'VERTICAL';
  grad1.primaryAxisSizingMode = 'AUTO';
  grad1.counterAxisSizingMode = 'FIXED';
  grad1.resize(500, 10);
  grad1.itemSpacing = 8;
  grad1.fills = [];
  const grad1Box = figma.createFrame();
  grad1Box.resize(500, 80);
  grad1Box.cornerRadius = 12;
  grad1Box.fills = [{type:'GRADIENT_LINEAR',gradientStops:[{position:0,color:{r:0.39,g:0.4,b:0.95,a:1}},{position:1,color:{r:0.2,g:0.83,b:0.6,a:1}}],gradientTransform:[[0.7,0.7,0],[-0.7,0.7,0.5]]}];
  const g1Ps = ps('Effect / text-gradient (primary→accent)');
  if (g1Ps) grad1Box.fillStyleId = g1Ps;
  grad1.appendChild(grad1Box);
  const g1Label = figma.createText();
  g1Label.fontName = {family:'Inter',style:'Regular'};
  g1Label.characters = 'Primary Gradient — linear-gradient(135deg, #6366F1, #34D399)\\nUso: .text-gradient, highlights, decoracion';
  g1Label.fontSize = 12; g1Label.lineHeight = {value:18,unit:'PIXELS'};
  g1Label.fills = [{type:'SOLID',color:h('#94A3B8')}];
  grad1.appendChild(g1Label);
  gradRow.appendChild(grad1);

  // Button gradient
  const grad2 = figma.createFrame();
  grad2.name = 'Button Gradient';
  grad2.layoutMode = 'VERTICAL';
  grad2.primaryAxisSizingMode = 'AUTO';
  grad2.counterAxisSizingMode = 'FIXED';
  grad2.resize(500, 10);
  grad2.itemSpacing = 8;
  grad2.fills = [];
  const grad2Box = figma.createFrame();
  grad2Box.resize(500, 80);
  grad2Box.cornerRadius = 12;
  grad2Box.fills = [{type:'GRADIENT_LINEAR',gradientStops:[{position:0,color:{r:0.39,g:0.4,b:0.95,a:1}},{position:1,color:{r:0.31,g:0.27,b:0.9,a:1}}],gradientTransform:[[0.7,0.7,0],[-0.7,0.7,0.5]]}];
  const g2Ps = ps('Effect / btn-primary gradient');
  if (g2Ps) grad2Box.fillStyleId = g2Ps;
  grad2.appendChild(grad2Box);
  const g2Label = figma.createText();
  g2Label.fontName = {family:'Inter',style:'Regular'};
  g2Label.characters = 'Button Gradient — linear-gradient(135deg, #6366F1, #4F46E5)\\nUso: .btn-primary';
  g2Label.fontSize = 12; g2Label.lineHeight = {value:18,unit:'PIXELS'};
  g2Label.fills = [{type:'SOLID',color:h('#94A3B8')}];
  grad2.appendChild(g2Label);
  gradRow.appendChild(grad2);
  colorSec.appendChild(gradRow);

  // Accessibility
  const accLabel = figma.createText();
  accLabel.fontName = {family:'Space Grotesk',style:'Medium'};
  accLabel.characters = 'Accesibilidad';
  accLabel.fontSize = 20;
  accLabel.fills = [{type:'SOLID',color:h('#6366F1')}];
  colorSec.appendChild(accLabel);
  const accInfo = figma.createText();
  accInfo.fontName = {family:'Inter',style:'Regular'};
  accInfo.characters = 'Text Main (#F8FAFC) sobre Background (#0B0E14) — Ratio: 17.4:1 — AAA Pass\\nText Muted (#94A3B8) sobre Background (#0B0E14) — Ratio: 7.5:1 — AAA Pass';
  accInfo.fontSize = 14; accInfo.lineHeight = {value:22,unit:'PIXELS'};
  accInfo.fills = [{type:'SOLID',color:h('#F8FAFC')}];
  colorSec.appendChild(accInfo);
  doc.appendChild(colorSec);

  // ═══════════ 02 TYPOGRAPHY ═══════════
  const typoSec = addSection('Typography', '02');
  
  const fontInfo = figma.createText();
  fontInfo.fontName = {family:'Inter',style:'Regular'};
  fontInfo.characters = 'Display: Space Grotesk (400-700) — font-display\\nBody: Inter (300-700) — font-body';
  fontInfo.fontSize = 14; fontInfo.lineHeight = {value:22,unit:'PIXELS'};
  fontInfo.fills = [{type:'SOLID',color:h('#94A3B8')}];
  typoSec.appendChild(fontInfo);

  const typoSamples = [
    {tw:'font-display text-7xl font-bold',text:'Reimagined',f:'Space Grotesk',s:'Bold',sz:72,lh:80,ls:-2},
    {tw:'font-display text-5xl font-bold',text:'Section Title',f:'Space Grotesk',s:'Bold',sz:48,lh:56,ls:-1},
    {tw:'font-body text-lg',text:'NexVault es la billetera digital de nueva generacion que combina seguridad de grado militar.',f:'Inter',s:'Regular',sz:18,lh:28,ls:0},
    {tw:'font-body text-sm leading-relaxed',text:'Encriptacion AES de 256 bits, autenticacion biometrica y deteccion de fraude en tiempo real.',f:'Inter',s:'Regular',sz:14,lh:22,ls:0},
    {tw:'text-xs uppercase tracking-widest',text:'POR QUE NEXVAULT',f:'Inter',s:'Semi Bold',sz:12,lh:16,ls:2},
    {tw:'font-display text-5xl font-bold (stat)',text:'S/ 2.4B',f:'Space Grotesk',s:'Bold',sz:48,lh:56,ls:-1},
  ];

  for (const ts2 of typoSamples) {
    const row = figma.createFrame();
    row.name = ts2.tw;
    row.layoutMode = 'VERTICAL';
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    row.itemSpacing = 8;
    row.fills = [];
    row.paddingBottom = 16;

    const label = figma.createText();
    label.fontName = {family:'Inter',style:'Medium'};
    label.characters = ts2.tw + '  —  ' + ts2.f + ' ' + ts2.s + ' ' + ts2.sz + 'px/' + ts2.lh + 'px';
    label.fontSize = 11;
    label.fills = [{type:'SOLID',color:h('#94A3B8')}];
    row.appendChild(label);

    const sample = figma.createText();
    sample.fontName = {family:ts2.f, style:ts2.s};
    sample.characters = ts2.text;
    sample.fontSize = ts2.sz;
    sample.lineHeight = {value:ts2.lh,unit:'PIXELS'};
    sample.letterSpacing = {value:ts2.ls,unit:'PIXELS'};
    if (ts2.tw.includes('stat')) {
      sample.fills = [{type:'GRADIENT_LINEAR',gradientStops:[{position:0,color:{r:0.39,g:0.4,b:0.95,a:1}},{position:1,color:{r:0.2,g:0.83,b:0.6,a:1}}],gradientTransform:[[1,0,0],[0,1,0]]}];
    } else {
      sample.fills = [{type:'SOLID',color:h('#F8FAFC')}];
    }
    row.appendChild(sample);
    typoSec.appendChild(row);
  }
  doc.appendChild(typoSec);

  // ═══════════ 03 SPACING ═══════════
  const spaceSec = addSection('Spacing', '03');
  const spacings = [{n:'xs',v:4,t:'1'},{n:'sm',v:8,t:'2'},{n:'md',v:12,t:'3'},{n:'base',v:16,t:'4'},{n:'lg',v:24,t:'6'},{n:'xl',v:32,t:'8'},{n:'2xl',v:48,t:'12'},{n:'3xl',v:64,t:'16'},{n:'4xl',v:80,t:'20'}];
  for (const sp of spacings) {
    const row = figma.createFrame();
    row.layoutMode = 'HORIZONTAL';
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    row.counterAxisAlignItems = 'CENTER';
    row.itemSpacing = 16;
    row.fills = [];
    const label = figma.createText();
    label.fontName = {family:'Inter',style:'Medium'};
    label.characters = sp.n + ' — ' + sp.v + 'px';
    label.fontSize = 13;
    label.fills = [{type:'SOLID',color:h('#F8FAFC')}];
    label.resize(120,10); label.textAutoResize = 'HEIGHT';
    row.appendChild(label);
    const bar = figma.createFrame();
    bar.resize(Math.min(sp.v * 4, 320), 20);
    bar.cornerRadius = 4;
    bar.fills = [{type:'SOLID',color:h('#6366F1'),opacity:0.5}];
    row.appendChild(bar);
    const twL = figma.createText();
    twL.fontName = {family:'Inter',style:'Regular'};
    twL.characters = 'p-' + sp.t + ' / gap-' + sp.t;
    twL.fontSize = 11;
    twL.fills = [{type:'SOLID',color:h('#94A3B8')}];
    row.appendChild(twL);
    spaceSec.appendChild(row);
  }
  doc.appendChild(spaceSec);

  // ═══════════ 04 COMPONENTS ═══════════
  const compSec = addSection('Componentes', '04');

  // Buttons
  const btnLabel = figma.createText();
  btnLabel.fontName = {family:'Space Grotesk',style:'Medium'};
  btnLabel.characters = 'Buttons';
  btnLabel.fontSize = 20;
  btnLabel.fills = [{type:'SOLID',color:h('#F8FAFC')}];
  compSec.appendChild(btnLabel);

  const btnRow = figma.createFrame();
  btnRow.name = 'Button Preview';
  btnRow.resize(800, 80);
  btnRow.layoutMode = 'HORIZONTAL';
  btnRow.primaryAxisAlignItems = 'CENTER';
  btnRow.counterAxisAlignItems = 'CENTER';
  btnRow.primaryAxisSizingMode = 'FIXED';
  btnRow.counterAxisSizingMode = 'FIXED';
  btnRow.itemSpacing = 24;
  btnRow.cornerRadius = 16;
  btnRow.fills = [{type:'SOLID',color:h('#151925'),opacity:0.4}];
  btnRow.strokes = [{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.06}];
  btnRow.strokeWeight = 1;

  // Primary btn
  const pb = figma.createFrame();
  pb.name = 'Primary';
  pb.layoutMode = 'HORIZONTAL';
  pb.primaryAxisAlignItems = 'CENTER';
  pb.counterAxisAlignItems = 'CENTER';
  pb.primaryAxisSizingMode = 'AUTO';
  pb.counterAxisSizingMode = 'AUTO';
  pb.paddingTop = 12; pb.paddingBottom = 12;
  pb.paddingLeft = 32; pb.paddingRight = 32;
  pb.cornerRadius = 16;
  pb.itemSpacing = 8;
  pb.fills = [{type:'SOLID',color:h('#6366F1')}];
  pb.effects = [{type:'DROP_SHADOW',color:{r:0.39,g:0.4,b:0.95,a:0.3},offset:{x:0,y:0},radius:20,visible:true,blendMode:'NORMAL',spread:0}];
  const pbt = figma.createText(); pbt.fontName={family:'Inter',style:'Semi Bold'}; pbt.characters='Primary Button'; pbt.fontSize=14; pbt.fills=[{type:'SOLID',color:h('#FFFFFF')}]; pb.appendChild(pbt);
  const pba = figma.createText(); pba.fontName={family:'Inter',style:'Regular'}; pba.characters='→'; pba.fontSize=14; pba.fills=[{type:'SOLID',color:h('#FFFFFF')}]; pb.appendChild(pba);
  btnRow.appendChild(pb);

  // Secondary btn
  const sb = figma.createFrame();
  sb.name = 'Secondary';
  sb.layoutMode = 'HORIZONTAL';
  sb.primaryAxisAlignItems = 'CENTER';
  sb.counterAxisAlignItems = 'CENTER';
  sb.primaryAxisSizingMode = 'AUTO';
  sb.counterAxisSizingMode = 'AUTO';
  sb.paddingTop = 12; sb.paddingBottom = 12;
  sb.paddingLeft = 24; sb.paddingRight = 24;
  sb.cornerRadius = 16;
  sb.fills = [];
  sb.strokes = [{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.1}];
  sb.strokeWeight = 1;
  const sbt = figma.createText(); sbt.fontName={family:'Inter',style:'Semi Bold'}; sbt.characters='Secondary Button'; sbt.fontSize=14; sbt.fills=[{type:'SOLID',color:h('#F8FAFC')}]; sb.appendChild(sbt);
  btnRow.appendChild(sb);

  // Small CTA
  const scta = figma.createFrame();
  scta.name = 'Small CTA';
  scta.layoutMode = 'HORIZONTAL';
  scta.primaryAxisAlignItems = 'CENTER';
  scta.counterAxisAlignItems = 'CENTER';
  scta.primaryAxisSizingMode = 'AUTO';
  scta.counterAxisSizingMode = 'AUTO';
  scta.paddingTop = 10; scta.paddingBottom = 10;
  scta.paddingLeft = 20; scta.paddingRight = 20;
  scta.cornerRadius = 12;
  scta.fills = [{type:'SOLID',color:h('#6366F1')}];
  const sctat = figma.createText(); sctat.fontName={family:'Inter',style:'Medium'}; sctat.characters='Small CTA'; sctat.fontSize=14; sctat.fills=[{type:'SOLID',color:h('#FFFFFF')}]; scta.appendChild(sctat);
  btnRow.appendChild(scta);
  compSec.appendChild(btnRow);

  // Glass Cards
  const gcLabel = figma.createText();
  gcLabel.fontName = {family:'Space Grotesk',style:'Medium'};
  gcLabel.characters = 'Glass Cards';
  gcLabel.fontSize = 20;
  gcLabel.fills = [{type:'SOLID',color:h('#F8FAFC')}];
  compSec.appendChild(gcLabel);

  const gcRow = figma.createFrame();
  gcRow.name = 'Glass Cards';
  gcRow.layoutMode = 'HORIZONTAL';
  gcRow.primaryAxisSizingMode = 'AUTO';
  gcRow.counterAxisSizingMode = 'AUTO';
  gcRow.itemSpacing = 24;
  gcRow.fills = [];

  // glass-card
  const gc1 = figma.createFrame();
  gc1.name = 'glass-card';
  gc1.resize(380, 120);
  gc1.layoutMode = 'VERTICAL';
  gc1.primaryAxisSizingMode = 'FIXED';
  gc1.counterAxisSizingMode = 'FIXED';
  gc1.paddingTop = 28; gc1.paddingBottom = 28;
  gc1.paddingLeft = 28; gc1.paddingRight = 28;
  gc1.itemSpacing = 8;
  gc1.cornerRadius = 20;
  gc1.fills = [{type:'SOLID',color:h('#151925'),opacity:0.6}];
  gc1.strokes = [{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.06}];
  gc1.strokeWeight = 1;
  gc1.effects = [{type:'BACKGROUND_BLUR',radius:16,visible:true}];
  const gc1t = figma.createText(); gc1t.fontName={family:'Space Grotesk',style:'Medium'}; gc1t.characters='glass-card'; gc1t.fontSize=18; gc1t.fills=[{type:'SOLID',color:h('#F8FAFC')}]; gc1.appendChild(gc1t);
  const gc1d = figma.createText(); gc1d.fontName={family:'Inter',style:'Regular'}; gc1d.characters='Glassmorphism con backdrop-blur, borde sutil, hover lift. Usado en features y testimonials.'; gc1d.fontSize=14; gc1d.lineHeight={value:22,unit:'PIXELS'}; gc1d.fills=[{type:'SOLID',color:h('#94A3B8')}]; gc1d.resize(324,10); gc1d.textAutoResize='HEIGHT'; gc1.appendChild(gc1d);
  gcRow.appendChild(gc1);

  // glass-card-lg
  const gc2 = figma.createFrame();
  gc2.name = 'glass-card-lg';
  gc2.resize(380, 120);
  gc2.layoutMode = 'VERTICAL';
  gc2.primaryAxisSizingMode = 'FIXED';
  gc2.counterAxisSizingMode = 'FIXED';
  gc2.paddingTop = 40; gc2.paddingBottom = 40;
  gc2.paddingLeft = 40; gc2.paddingRight = 40;
  gc2.itemSpacing = 8;
  gc2.cornerRadius = 24;
  gc2.fills = [{type:'SOLID',color:h('#151925'),opacity:0.5}];
  gc2.strokes = [{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.06}];
  gc2.strokeWeight = 1;
  gc2.effects = [{type:'BACKGROUND_BLUR',radius:20,visible:true}];
  const gc2t = figma.createText(); gc2t.fontName={family:'Space Grotesk',style:'Medium'}; gc2t.characters='glass-card-lg'; gc2t.fontSize=18; gc2t.fills=[{type:'SOLID',color:h('#F8FAFC')}]; gc2.appendChild(gc2t);
  const gc2d = figma.createText(); gc2d.fontName={family:'Inter',style:'Regular'}; gc2d.characters='Version grande con mas padding y blur. Usado en stats y CTA.'; gc2d.fontSize=14; gc2d.lineHeight={value:22,unit:'PIXELS'}; gc2d.fills=[{type:'SOLID',color:h('#94A3B8')}]; gc2d.resize(300,10); gc2d.textAutoResize='HEIGHT'; gc2.appendChild(gc2d);
  gcRow.appendChild(gc2);
  compSec.appendChild(gcRow);

  // Badges
  const bdgLabel = figma.createText();
  bdgLabel.fontName = {family:'Space Grotesk',style:'Medium'};
  bdgLabel.characters = 'Badges & Pills';
  bdgLabel.fontSize = 20;
  bdgLabel.fills = [{type:'SOLID',color:h('#F8FAFC')}];
  compSec.appendChild(bdgLabel);

  const bdgRow = figma.createFrame();
  bdgRow.name = 'Badges';
  bdgRow.layoutMode = 'HORIZONTAL';
  bdgRow.primaryAxisSizingMode = 'AUTO';
  bdgRow.counterAxisSizingMode = 'AUTO';
  bdgRow.counterAxisAlignItems = 'CENTER';
  bdgRow.itemSpacing = 12;
  bdgRow.fills = [];

  const badges = [
    {text:'NOW IN OPEN BETA',bg:'#6366F1',tc:'#94A3B8',hasDot:true},
    {text:'Tailwind CSS',bg:'#34D399',tc:'#34D399',hasDot:false},
    {text:'Figma Ready',bg:'#6366F1',tc:'#818CF8',hasDot:false},
    {text:'v1.0',bg:'#94A3B8',tc:'#94A3B8',hasDot:false},
  ];
  for (const bd of badges) {
    const badge = figma.createFrame();
    badge.layoutMode = 'HORIZONTAL';
    badge.primaryAxisAlignItems = 'CENTER';
    badge.counterAxisAlignItems = 'CENTER';
    badge.primaryAxisSizingMode = 'AUTO';
    badge.counterAxisSizingMode = 'AUTO';
    badge.paddingTop = 6; badge.paddingBottom = 6;
    badge.paddingLeft = 16; badge.paddingRight = 16;
    badge.cornerRadius = 100;
    badge.itemSpacing = 8;
    badge.fills = [{type:'SOLID',color:h(bd.bg),opacity:0.1}];
    badge.strokes = [{type:'SOLID',color:h(bd.bg),opacity:0.2}];
    badge.strokeWeight = 1;
    if (bd.hasDot) {
      const dot = figma.createEllipse();
      dot.resize(6,6);
      dot.fills = [{type:'SOLID',color:h('#34D399')}];
      badge.appendChild(dot);
    }
    const bt = figma.createText();
    bt.fontName = {family:'Inter',style:'Medium'};
    bt.characters = bd.text;
    bt.fontSize = 12;
    bt.fills = [{type:'SOLID',color:h(bd.tc)}];
    badge.appendChild(bt);
    bdgRow.appendChild(badge);
  }
  compSec.appendChild(bdgRow);

  // Icon Containers
  const icLabel = figma.createText();
  icLabel.fontName = {family:'Space Grotesk',style:'Medium'};
  icLabel.characters = 'Icon Containers';
  icLabel.fontSize = 20;
  icLabel.fills = [{type:'SOLID',color:h('#F8FAFC')}];
  compSec.appendChild(icLabel);

  const icRow = figma.createFrame();
  icRow.name = 'Icons';
  icRow.layoutMode = 'HORIZONTAL';
  icRow.primaryAxisSizingMode = 'AUTO';
  icRow.counterAxisSizingMode = 'AUTO';
  icRow.itemSpacing = 16;
  icRow.fills = [];
  const icons = [{e:'🔒',c:'#6366F1',sz:40},{e:'⚡',c:'#34D399',sz:40},{e:'1',c:'#6366F1',sz:56,isStep:true},{e:'3',c:'#34D399',sz:56,isStep:true}];
  for (const ic of icons) {
    const box = figma.createFrame();
    box.resize(ic.sz,ic.sz);
    box.cornerRadius = ic.isStep ? 16 : 12;
    box.fills = [{type:'SOLID',color:h(ic.c),opacity:0.1}];
    if (ic.isStep) { box.strokes = [{type:'SOLID',color:h(ic.c),opacity:0.2}]; box.strokeWeight = 1; }
    box.layoutMode = 'VERTICAL';
    box.primaryAxisAlignItems = 'CENTER';
    box.counterAxisAlignItems = 'CENTER';
    const t = figma.createText();
    t.fontName = ic.isStep ? {family:'Space Grotesk',style:'Bold'} : {family:'Inter',style:'Regular'};
    t.characters = ic.e;
    t.fontSize = ic.isStep ? 20 : 18;
    t.fills = [{type:'SOLID',color:h(ic.c)}];
    box.appendChild(t);
    icRow.appendChild(box);
  }
  compSec.appendChild(icRow);
  doc.appendChild(compSec);

  // ═══════════ 05 ASSETS ═══════════
  const assetSec = addSection('Imagenes Generadas', '05');
  const assetInfo = figma.createText();
  assetInfo.fontName = {family:'Inter',style:'Regular'};
  assetInfo.characters = 'Imagenes generadas con Nanobanana 2 (Google Gemini 3.1 Flash Image).\\nTodas en src/images/ del proyecto.';
  assetInfo.fontSize = 14; assetInfo.lineHeight = {value:22,unit:'PIXELS'};
  assetInfo.fills = [{type:'SOLID',color:h('#94A3B8')}];
  assetSec.appendChild(assetInfo);

  const assetRow = figma.createFrame();
  assetRow.name = 'Assets';
  assetRow.layoutMode = 'HORIZONTAL';
  assetRow.primaryAxisSizingMode = 'AUTO';
  assetRow.counterAxisSizingMode = 'AUTO';
  assetRow.itemSpacing = 16;
  assetRow.fills = [];

  const assets = [
    {name:'hero.png',hash:'${IMG.hero}',w:200,h:200},
    {name:'feature-security.png',hash:'${IMG.security}',w:200,h:120},
    {name:'feature-speed.png',hash:'${IMG.speed}',w:200,h:120},
    {name:'feature-global.png',hash:'${IMG.global}',w:200,h:120},
  ];
  for (const a of assets) {
    const af = figma.createFrame();
    af.name = a.name;
    af.layoutMode = 'VERTICAL';
    af.primaryAxisSizingMode = 'AUTO';
    af.counterAxisSizingMode = 'FIXED';
    af.resize(a.w, 10);
    af.itemSpacing = 8;
    af.fills = [];
    const img = figma.createFrame();
    img.resize(a.w, a.h);
    img.cornerRadius = 12;
    img.fills = [{type:'IMAGE',imageHash:a.hash,scaleMode:'FILL'}];
    af.appendChild(img);
    const label = figma.createText();
    label.fontName = {family:'Inter',style:'Regular'};
    label.characters = a.name;
    label.fontSize = 11;
    label.fills = [{type:'SOLID',color:h('#94A3B8')}];
    af.appendChild(label);
    assetRow.appendChild(af);
  }
  assetSec.appendChild(assetRow);
  doc.appendChild(assetSec);

  // ═══════════ 06 GRID ═══════════
  const gridSec = addSection('Grid System', '06');
  const gridInfo = figma.createText();
  gridInfo.fontName = {family:'Inter',style:'Regular'};
  gridInfo.characters = 'max-w-7xl = 1280px (contenido)\\nPadding lateral: px-6 = 24px (mobile), px-24 = 96px (desktop 1440)\\nGrid: md:grid-cols-3 con gap-6 (24px)\\nBreakpoints: sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px';
  gridInfo.fontSize = 14; gridInfo.lineHeight = {value:24,unit:'PIXELS'};
  gridInfo.fills = [{type:'SOLID',color:h('#94A3B8')}];
  gridSec.appendChild(gridInfo);
  doc.appendChild(gridSec);

  // ═══════════ 07 FIGMA NOTES ═══════════
  const notesSec = addSection('Exportacion a Figma', '07');
  const notesInfo = figma.createText();
  notesInfo.fontName = {family:'Inter',style:'Regular'};
  notesInfo.characters = 'Paint Styles: 26 color styles organizados por categoria (Brand, Surface, Text, Border, Effect)\\nText Styles: 20 text styles con nomenclatura Tailwind (font-display, font-body, UI)\\nVariables: NexVault Colors (14 vars) + NexVault Spacing (11 vars)\\nComponentes: 11 Figma Components con variantes\\n\\nCorrespondencia Tailwind → Figma:\\n  bg-background → Style "Surface / bg-background" → Variable "NexVault/background"\\n  bg-primary → Style "Brand / bg-primary" → Variable "NexVault/primary"\\n  text-text-muted → Style "Text / text-text-muted" → Variable "NexVault/text-muted"\\n  font-display text-5xl → Text Style "font-display / text-5xl font-bold"\\n  font-body text-sm → Text Style "font-body / text-sm"';
  notesInfo.fontSize = 13; notesInfo.lineHeight = {value:22,unit:'PIXELS'};
  notesInfo.fills = [{type:'SOLID',color:h('#94A3B8')}];
  notesInfo.resize(900,10); notesInfo.textAutoResize = 'HEIGHT';
  notesSec.appendChild(notesInfo);
  doc.appendChild(notesSec);

  figma.viewport.scrollAndZoomIntoView([doc]);
  return 'Design System page created. Height: ' + Math.round(doc.height) + 'px';
})()`);

console.log('✓ ' + (await Promise.resolve('Design System page created')));

// Apply styles to the DS page too
console.log('\n🎨 Aplicando styles al Design System page...');
await run(`(async ()=>{
  const page = figma.root.children.find(p => p.name === '📋 Design System Doc');
  const main = page.children[0];
  const paintStyles = figma.getLocalPaintStyles();
  const textStyles = figma.getLocalTextStyles();
  
  let applied = 0;
  function traverse(node) {
    if (!node) return;
    if (node.type === 'TEXT' && node.fills && node.fills.length > 0) {
      const fill = node.fills[0];
      if (fill.type === 'SOLID') {
        const r = Math.round(fill.color.r * 255);
        const g = Math.round(fill.color.g * 255);
        const b = Math.round(fill.color.b * 255);
        const hex = '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('').toUpperCase();
        let styleName = null;
        if (hex === '#F8FAFC') styleName = 'Text / text-text-main';
        else if (hex === '#94A3B8') styleName = 'Text / text-text-muted';
        else if (hex === '#FFFFFF') styleName = 'Text / text-white';
        else if (hex === '#6366F1') styleName = 'Text / text-primary';
        else if (hex === '#34D399') styleName = 'Text / text-accent';
        if (styleName) {
          const s = paintStyles.find(s => s.name === styleName);
          if (s) { node.fillStyleId = s.id; applied++; }
        }
      }
    }
    if (node.children) { for (const c of node.children) { traverse(c); } }
  }
  traverse(main);
  return 'Applied ' + applied + ' styles to DS page';
})()`);

console.log('\n✅ Design System page completa');
client.close();
