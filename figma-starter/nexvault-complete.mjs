/**
 * NexVault — Complete Figma Export (Part 2)
 * 
 * Adds:
 * 1. Paint Styles (Color Styles) — visible in Figma's style panel
 * 2. Landing Page recreation (all sections)
 * 3. Final Design System document page
 */
import { FigmaClient } from './src/figma-client.js';

const client = new FigmaClient();
await client.connect();
console.log('✓ Conectado a Figma');

async function run(code) {
  return await client.eval(code);
}

// ═══════════════════════════════════════════════════════════
// STEP 1: Create Paint Styles (Color Styles)
// ═══════════════════════════════════════════════════════════
console.log('\n🎨 Creando Color Styles (Paint Styles)...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  const colors = [
    { name: 'NexVault/Background', value: '#0B0E14', desc: 'bg-background — Fondo principal, azul casi negro' },
    { name: 'NexVault/Surface', value: '#151925', desc: 'bg-surface — Cards, modales, secciones elevadas' },
    { name: 'NexVault/Primary', value: '#6366F1', desc: 'bg-primary — Indigo, botones y acciones principales' },
    { name: 'NexVault/Primary Dark', value: '#4F46E5', desc: 'hover:bg-primary — Hover state del primary' },
    { name: 'NexVault/Primary Light', value: '#818CF8', desc: 'Indigo claro — highlights y focus rings' },
    { name: 'NexVault/Accent', value: '#34D399', desc: 'bg-accent — Verde menta, exito, dinero' },
    { name: 'NexVault/Accent Dark', value: '#059669', desc: 'hover:bg-accent — Hover state del accent' },
    { name: 'NexVault/Text Main', value: '#F8FAFC', desc: 'text-text-main — Blanco hueso, texto principal' },
    { name: 'NexVault/Text Muted', value: '#94A3B8', desc: 'text-text-muted — Gris azulado, texto secundario' },
    { name: 'NexVault/White', value: '#FFFFFF', desc: 'Blanco puro — labels sobre primary' },
  ];

  const existingStyles = figma.getLocalPaintStyles();

  for (const c of colors) {
    let style = existingStyles.find(s => s.name === c.name);
    if (!style) {
      style = figma.createPaintStyle();
    }
    style.name = c.name;
    style.description = c.desc;
    style.paints = [{ type: 'SOLID', color: h(c.value) }];
  }

  // Gradient styles
  let gradStyle = existingStyles.find(s => s.name === 'NexVault/Gradient Primary-Accent');
  if (!gradStyle) gradStyle = figma.createPaintStyle();
  gradStyle.name = 'NexVault/Gradient Primary-Accent';
  gradStyle.description = 'text-gradient — Gradiente de Primary a Accent para textos hero';
  gradStyle.paints = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: { r: 0.39, g: 0.4, b: 0.95, a: 1 } },
      { position: 1, color: { r: 0.2, g: 0.83, b: 0.6, a: 1 } }
    ],
    gradientTransform: [[0.7, 0.7, 0], [-0.7, 0.7, 0.5]]
  }];

  let btnGrad = existingStyles.find(s => s.name === 'NexVault/Gradient Button');
  if (!btnGrad) btnGrad = figma.createPaintStyle();
  btnGrad.name = 'NexVault/Gradient Button';
  btnGrad.description = 'btn-primary — Gradiente del boton principal';
  btnGrad.paints = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: { r: 0.39, g: 0.4, b: 0.95, a: 1 } },
      { position: 1, color: { r: 0.31, g: 0.27, b: 0.9, a: 1 } }
    ],
    gradientTransform: [[0.7, 0.7, 0], [-0.7, 0.7, 0.5]]
  }];

  let glassStyle = existingStyles.find(s => s.name === 'NexVault/Glass Background');
  if (!glassStyle) glassStyle = figma.createPaintStyle();
  glassStyle.name = 'NexVault/Glass Background';
  glassStyle.description = 'glass-card — Fondo glassmorphism 60% surface';
  glassStyle.paints = [{ type: 'SOLID', color: h('#151925'), opacity: 0.6 }];

  return (colors.length + 3) + ' paint styles created';
})()`);

console.log('✓ Color Styles creados');

// ═══════════════════════════════════════════════════════════
// STEP 2: Landing Page — Hero Section
// ═══════════════════════════════════════════════════════════
console.log('\n📱 Creando Landing Page en Figma...');
console.log('  → Hero section...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
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

  // ── MAIN FRAME (1440px desktop)
  const main = figma.createFrame();
  main.name = 'NexVault Landing — Desktop 1440';
  main.resize(1440, 100);
  main.layoutMode = 'VERTICAL';
  main.primaryAxisSizingMode = 'AUTO';
  main.counterAxisSizingMode = 'FIXED';
  main.itemSpacing = 0;
  main.fills = [{type:'SOLID', color: h('#0B0E14')}];

  // ── NAVBAR
  const nav = figma.createFrame();
  nav.name = 'Navbar';
  nav.resize(1440, 72);
  nav.layoutMode = 'HORIZONTAL';
  nav.primaryAxisSizingMode = 'FIXED';
  nav.counterAxisSizingMode = 'FIXED';
  nav.primaryAxisAlignItems = 'SPACE_BETWEEN';
  nav.counterAxisAlignItems = 'CENTER';
  nav.paddingLeft = 120;
  nav.paddingRight = 120;
  nav.fills = [{type:'SOLID', color: h('#0B0E14'), opacity: 0.9}];
  nav.effects = [{type:'BACKGROUND_BLUR', radius:16, visible:true}];

  // Logo
  const logoG = figma.createFrame();
  logoG.name = 'Logo';
  logoG.layoutMode = 'HORIZONTAL';
  logoG.primaryAxisSizingMode = 'AUTO';
  logoG.counterAxisSizingMode = 'AUTO';
  logoG.counterAxisAlignItems = 'CENTER';
  logoG.itemSpacing = 8;
  logoG.fills = [];
  
  const logoBox = figma.createFrame();
  logoBox.resize(32,32);
  logoBox.cornerRadius = 8;
  logoBox.fills = [{type:'SOLID', color: h('#6366F1')}];
  logoBox.layoutMode = 'VERTICAL';
  logoBox.primaryAxisAlignItems = 'CENTER';
  logoBox.counterAxisAlignItems = 'CENTER';
  const logoN = figma.createText();
  logoN.fontName = {family:'Inter',style:'Bold'};
  logoN.characters = 'N';
  logoN.fontSize = 16;
  logoN.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  logoBox.appendChild(logoN);
  logoG.appendChild(logoBox);
  
  const brand = figma.createText();
  brand.fontName = {family:'Space Grotesk',style:'Bold'};
  brand.characters = 'NexVault';
  brand.fontSize = 20;
  brand.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  logoG.appendChild(brand);
  nav.appendChild(logoG);

  // Links
  const links = figma.createFrame();
  links.name = 'Nav Links';
  links.layoutMode = 'HORIZONTAL';
  links.primaryAxisSizingMode = 'AUTO';
  links.counterAxisSizingMode = 'AUTO';
  links.itemSpacing = 32;
  links.fills = [];
  for (const t of ['Beneficios','Como Funciona','Cifras','Precios','Design System']) {
    const l = figma.createText();
    l.fontName = {family:'Inter',style:'Regular'};
    l.characters = t;
    l.fontSize = 14;
    l.fills = [{type:'SOLID', color: h(t==='Design System'?'#34D399':'#94A3B8')}];
    links.appendChild(l);
  }
  nav.appendChild(links);

  // CTA group
  const ctaG = figma.createFrame();
  ctaG.name = 'CTA';
  ctaG.layoutMode = 'HORIZONTAL';
  ctaG.primaryAxisSizingMode = 'AUTO';
  ctaG.counterAxisSizingMode = 'AUTO';
  ctaG.counterAxisAlignItems = 'CENTER';
  ctaG.itemSpacing = 16;
  ctaG.fills = [];
  const login = figma.createText();
  login.fontName = {family:'Inter',style:'Regular'};
  login.characters = 'Iniciar Sesion';
  login.fontSize = 14;
  login.fills = [{type:'SOLID', color: h('#94A3B8')}];
  ctaG.appendChild(login);
  
  const ctaBtn = figma.createFrame();
  ctaBtn.name = 'Button';
  ctaBtn.layoutMode = 'HORIZONTAL';
  ctaBtn.primaryAxisAlignItems = 'CENTER';
  ctaBtn.counterAxisAlignItems = 'CENTER';
  ctaBtn.primaryAxisSizingMode = 'AUTO';
  ctaBtn.counterAxisSizingMode = 'AUTO';
  ctaBtn.paddingTop = 10; ctaBtn.paddingBottom = 10;
  ctaBtn.paddingLeft = 20; ctaBtn.paddingRight = 20;
  ctaBtn.cornerRadius = 12;
  ctaBtn.fills = [{type:'SOLID', color: h('#6366F1')}];
  ctaBtn.effects = [{type:'DROP_SHADOW',color:{r:0.39,g:0.4,b:0.95,a:0.3},offset:{x:0,y:0},radius:20,visible:true,blendMode:'NORMAL',spread:0}];
  const ctaL = figma.createText();
  ctaL.fontName = {family:'Inter',style:'Medium'};
  ctaL.characters = 'Comenzar';
  ctaL.fontSize = 14;
  ctaL.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  ctaBtn.appendChild(ctaL);
  ctaG.appendChild(ctaBtn);
  nav.appendChild(ctaG);
  main.appendChild(nav);

  // ── HERO SECTION
  const hero = figma.createFrame();
  hero.name = 'Hero';
  hero.resize(1440, 800);
  hero.layoutMode = 'HORIZONTAL';
  hero.primaryAxisSizingMode = 'FIXED';
  hero.counterAxisSizingMode = 'FIXED';
  hero.counterAxisAlignItems = 'CENTER';
  hero.paddingLeft = 120; hero.paddingRight = 120;
  hero.paddingTop = 80; hero.paddingBottom = 80;
  hero.itemSpacing = 60;
  hero.fills = [{type:'SOLID', color: h('#0B0E14')}];

  // Left column
  const heroLeft = figma.createFrame();
  heroLeft.name = 'Hero Content';
  heroLeft.layoutMode = 'VERTICAL';
  heroLeft.primaryAxisSizingMode = 'AUTO';
  heroLeft.counterAxisSizingMode = 'FIXED';
  heroLeft.resize(580, 100);
  heroLeft.itemSpacing = 32;
  heroLeft.fills = [];

  // Badge
  const badge = figma.createFrame();
  badge.name = 'Beta Badge';
  badge.layoutMode = 'HORIZONTAL';
  badge.primaryAxisSizingMode = 'AUTO';
  badge.counterAxisSizingMode = 'AUTO';
  badge.counterAxisAlignItems = 'CENTER';
  badge.itemSpacing = 8;
  badge.paddingTop = 6; badge.paddingBottom = 6;
  badge.paddingLeft = 16; badge.paddingRight = 16;
  badge.cornerRadius = 100;
  badge.fills = [{type:'SOLID', color: h('#6366F1'), opacity: 0.05}];
  badge.strokes = [{type:'SOLID', color: h('#6366F1'), opacity: 0.3}];
  badge.strokeWeight = 1;
  
  const dot = figma.createEllipse();
  dot.resize(8,8);
  dot.fills = [{type:'SOLID', color: h('#34D399')}];
  badge.appendChild(dot);
  const badgeT = figma.createText();
  badgeT.fontName = {family:'Inter',style:'Medium'};
  badgeT.characters = 'AHORA EN BETA ABIERTA';
  badgeT.fontSize = 11;
  badgeT.letterSpacing = {value: 1.5, unit: 'PIXELS'};
  badgeT.fills = [{type:'SOLID', color: h('#94A3B8')}];
  badge.appendChild(badgeT);
  heroLeft.appendChild(badge);

  // Title
  const titleFrame = figma.createFrame();
  titleFrame.name = 'Title';
  titleFrame.layoutMode = 'VERTICAL';
  titleFrame.primaryAxisSizingMode = 'AUTO';
  titleFrame.counterAxisSizingMode = 'AUTO';
  titleFrame.itemSpacing = 0;
  titleFrame.fills = [];

  const line1 = figma.createText();
  line1.fontName = {family:'Space Grotesk',style:'Bold'};
  line1.characters = 'Tu Dinero,';
  line1.fontSize = 72;
  line1.lineHeight = {value: 80, unit: 'PIXELS'};
  line1.letterSpacing = {value: -2, unit: 'PIXELS'};
  line1.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  titleFrame.appendChild(line1);

  const line2 = figma.createText();
  line2.fontName = {family:'Space Grotesk',style:'Bold'};
  line2.characters = 'Reinventado.';
  line2.fontSize = 72;
  line2.lineHeight = {value: 80, unit: 'PIXELS'};
  line2.letterSpacing = {value: -2, unit: 'PIXELS'};
  line2.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: { r: 0.39, g: 0.4, b: 0.95, a: 1 } },
      { position: 1, color: { r: 0.2, g: 0.83, b: 0.6, a: 1 } }
    ],
    gradientTransform: [[1, 0, 0], [0, 1, 0]]
  }];
  titleFrame.appendChild(line2);
  heroLeft.appendChild(titleFrame);

  // Description
  const desc = figma.createText();
  desc.fontName = {family:'Inter',style:'Regular'};
  desc.characters = 'NexVault es la billetera digital de nueva generacion que combina seguridad de grado militar con transacciones ultrarapidas. Envia, recibe y haz crecer tu dinero en todo el mundo.';
  desc.fontSize = 18;
  desc.lineHeight = {value: 28, unit: 'PIXELS'};
  desc.fills = [{type:'SOLID', color: h('#94A3B8')}];
  desc.resize(520, 10);
  desc.textAutoResize = 'HEIGHT';
  heroLeft.appendChild(desc);

  // Buttons row
  const btns = figma.createFrame();
  btns.name = 'Buttons';
  btns.layoutMode = 'HORIZONTAL';
  btns.primaryAxisSizingMode = 'AUTO';
  btns.counterAxisSizingMode = 'AUTO';
  btns.itemSpacing = 16;
  btns.fills = [];

  const btn1 = figma.createFrame();
  btn1.name = 'CTA Primary';
  btn1.layoutMode = 'HORIZONTAL';
  btn1.primaryAxisAlignItems = 'CENTER';
  btn1.counterAxisAlignItems = 'CENTER';
  btn1.primaryAxisSizingMode = 'AUTO';
  btn1.counterAxisSizingMode = 'AUTO';
  btn1.paddingTop = 16; btn1.paddingBottom = 16;
  btn1.paddingLeft = 32; btn1.paddingRight = 32;
  btn1.cornerRadius = 16;
  btn1.fills = [{type:'SOLID', color: h('#6366F1')}];
  btn1.effects = [{type:'DROP_SHADOW',color:{r:0.39,g:0.4,b:0.95,a:0.3},offset:{x:0,y:0},radius:20,visible:true,blendMode:'NORMAL',spread:0}];
  btn1.itemSpacing = 8;
  const btn1T = figma.createText();
  btn1T.fontName = {family:'Inter',style:'Semi Bold'};
  btn1T.characters = 'Empieza Gratis';
  btn1T.fontSize = 16;
  btn1T.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  btn1.appendChild(btn1T);
  const arrow = figma.createText();
  arrow.fontName = {family:'Inter',style:'Regular'};
  arrow.characters = '→';
  arrow.fontSize = 16;
  arrow.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  btn1.appendChild(arrow);
  btns.appendChild(btn1);

  const btn2 = figma.createFrame();
  btn2.name = 'CTA Secondary';
  btn2.layoutMode = 'HORIZONTAL';
  btn2.primaryAxisAlignItems = 'CENTER';
  btn2.counterAxisAlignItems = 'CENTER';
  btn2.primaryAxisSizingMode = 'AUTO';
  btn2.counterAxisSizingMode = 'AUTO';
  btn2.paddingTop = 16; btn2.paddingBottom = 16;
  btn2.paddingLeft = 32; btn2.paddingRight = 32;
  btn2.cornerRadius = 16;
  btn2.fills = [];
  btn2.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.1}];
  btn2.strokeWeight = 1;
  const btn2T = figma.createText();
  btn2T.fontName = {family:'Inter',style:'Semi Bold'};
  btn2T.characters = 'Saber Mas';
  btn2T.fontSize = 16;
  btn2T.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  btn2.appendChild(btn2T);
  btns.appendChild(btn2);
  heroLeft.appendChild(btns);

  // Social proof
  const social = figma.createFrame();
  social.name = 'Social Proof';
  social.layoutMode = 'HORIZONTAL';
  social.primaryAxisSizingMode = 'AUTO';
  social.counterAxisSizingMode = 'AUTO';
  social.counterAxisAlignItems = 'CENTER';
  social.itemSpacing = 16;
  social.fills = [];

  const avatars = figma.createFrame();
  avatars.name = 'Avatar Stack';
  avatars.layoutMode = 'HORIZONTAL';
  avatars.primaryAxisSizingMode = 'AUTO';
  avatars.counterAxisSizingMode = 'AUTO';
  avatars.itemSpacing = -12;
  avatars.fills = [];
  
  const gradients = [
    [{r:0.39,g:0.4,b:0.95,a:1},{r:0.2,g:0.83,b:0.6,a:1}],
    [{r:0.2,g:0.83,b:0.6,a:1},{r:0.34,g:0.92,b:0.56,a:1}],
    [{r:0.49,g:0.45,b:0.98,a:1},{r:0.39,g:0.4,b:0.95,a:1}]
  ];
  for (let i = 0; i < 3; i++) {
    const av = figma.createEllipse();
    av.resize(40,40);
    av.fills = [{
      type:'GRADIENT_LINEAR',
      gradientStops:[
        {position:0, color:gradients[i][0]},
        {position:1, color:gradients[i][1]}
      ],
      gradientTransform:[[0.7,0.7,0],[-0.7,0.7,0.5]]
    }];
    av.strokes = [{type:'SOLID', color: h('#0B0E14')}];
    av.strokeWeight = 2;
    avatars.appendChild(av);
  }
  social.appendChild(avatars);

  const socialInfo = figma.createFrame();
  socialInfo.name = 'Info';
  socialInfo.layoutMode = 'VERTICAL';
  socialInfo.primaryAxisSizingMode = 'AUTO';
  socialInfo.counterAxisSizingMode = 'AUTO';
  socialInfo.itemSpacing = 2;
  socialInfo.fills = [];
  const si1 = figma.createText();
  si1.fontName = {family:'Inter',style:'Semi Bold'};
  si1.characters = '12,000+ usuarios';
  si1.fontSize = 14;
  si1.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  socialInfo.appendChild(si1);
  const si2 = figma.createText();
  si2.fontName = {family:'Inter',style:'Regular'};
  si2.characters = 'se unieron este mes';
  si2.fontSize = 12;
  si2.fills = [{type:'SOLID', color: h('#94A3B8')}];
  socialInfo.appendChild(si2);
  social.appendChild(socialInfo);
  heroLeft.appendChild(social);
  hero.appendChild(heroLeft);

  // Right column — hero image placeholder
  const heroRight = figma.createFrame();
  heroRight.name = 'Hero Image';
  heroRight.resize(500, 600);
  heroRight.cornerRadius = 24;
  heroRight.fills = [{type:'SOLID', color: h('#151925')}];
  heroRight.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.06}];
  heroRight.strokeWeight = 1;
  heroRight.layoutMode = 'VERTICAL';
  heroRight.primaryAxisAlignItems = 'CENTER';
  heroRight.counterAxisAlignItems = 'CENTER';
  const imgLabel = figma.createText();
  imgLabel.fontName = {family:'Inter',style:'Medium'};
  imgLabel.characters = '📱 Hero Image\\nimages/hero.png';
  imgLabel.fontSize = 16;
  imgLabel.textAlignHorizontal = 'CENTER';
  imgLabel.fills = [{type:'SOLID', color: h('#94A3B8')}];
  heroRight.appendChild(imgLabel);
  hero.appendChild(heroRight);
  main.appendChild(hero);

  return 'Hero created';
})()`);

console.log('  ✓ Hero');

// ── FEATURES SECTION
console.log('  → Features section...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255};
  }

  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children.find(c => c.name === 'NexVault Landing — Desktop 1440');
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  // ── FEATURES
  const features = figma.createFrame();
  features.name = 'Features';
  features.resize(1440, 10);
  features.layoutMode = 'VERTICAL';
  features.primaryAxisSizingMode = 'AUTO';
  features.counterAxisSizingMode = 'FIXED';
  features.counterAxisAlignItems = 'CENTER';
  features.paddingTop = 80; features.paddingBottom = 80;
  features.paddingLeft = 120; features.paddingRight = 120;
  features.itemSpacing = 48;
  features.fills = [{type:'SOLID', color: h('#0B0E14')}];

  // Header
  const fHeader = figma.createFrame();
  fHeader.name = 'Section Header';
  fHeader.layoutMode = 'VERTICAL';
  fHeader.primaryAxisSizingMode = 'AUTO';
  fHeader.counterAxisSizingMode = 'AUTO';
  fHeader.counterAxisAlignItems = 'CENTER';
  fHeader.itemSpacing = 16;
  fHeader.fills = [];

  const fLabel = figma.createText();
  fLabel.fontName = {family:'Inter',style:'Semi Bold'};
  fLabel.characters = 'POR QUE NEXVAULT';
  fLabel.fontSize = 12;
  fLabel.letterSpacing = {value: 2, unit: 'PIXELS'};
  fLabel.fills = [{type:'SOLID', color: h('#34D399')}];
  fHeader.appendChild(fLabel);

  const fTitle = figma.createText();
  fTitle.fontName = {family:'Space Grotesk',style:'Bold'};
  fTitle.characters = 'Construido para el futuro\\nde las finanzas';
  fTitle.fontSize = 48;
  fTitle.lineHeight = {value: 56, unit: 'PIXELS'};
  fTitle.letterSpacing = {value: -1, unit: 'PIXELS'};
  fTitle.textAlignHorizontal = 'CENTER';
  fTitle.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  fHeader.appendChild(fTitle);

  const fDesc = figma.createText();
  fDesc.fontName = {family:'Inter',style:'Regular'};
  fDesc.characters = 'Tres pilares que hacen de NexVault la billetera digital mas confiable del mercado.';
  fDesc.fontSize = 18;
  fDesc.lineHeight = {value: 28, unit: 'PIXELS'};
  fDesc.textAlignHorizontal = 'CENTER';
  fDesc.fills = [{type:'SOLID', color: h('#94A3B8')}];
  fHeader.appendChild(fDesc);
  features.appendChild(fHeader);

  // Cards grid
  const grid = figma.createFrame();
  grid.name = 'Feature Cards';
  grid.layoutMode = 'HORIZONTAL';
  grid.primaryAxisSizingMode = 'FIXED';
  grid.counterAxisSizingMode = 'AUTO';
  grid.resize(1200, 10);
  grid.itemSpacing = 24;
  grid.fills = [];

  const cardData = [
    { icon: '🔒', title: 'Seguridad de Grado Militar', desc: 'Encriptacion AES de 256 bits, autenticacion biometrica y deteccion de fraude en tiempo real.', color: '#6366F1' },
    { icon: '⚡', title: 'Transferencias Instantaneas', desc: 'Envia dinero a cualquier lugar en menos de 3 segundos. 100x mas rapido que bancos.', color: '#34D399' },
    { icon: '🌍', title: '180+ Paises', desc: 'Soporte multimoneda con tasas de conversion en tiempo real. Cero comisiones ocultas.', color: '#6366F1' },
  ];

  for (const cd of cardData) {
    const card = figma.createFrame();
    card.name = 'Card - ' + cd.title;
    card.resize(380, 10);
    card.layoutMode = 'VERTICAL';
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'FIXED';
    card.paddingTop = 28; card.paddingBottom = 28;
    card.paddingLeft = 28; card.paddingRight = 28;
    card.itemSpacing = 16;
    card.cornerRadius = 20;
    card.fills = [{type:'SOLID', color: h('#151925'), opacity: 0.6}];
    card.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.06}];
    card.strokeWeight = 1;
    card.effects = [{type:'BACKGROUND_BLUR', radius:16, visible:true}];
    card.layoutGrow = 1;

    // Image placeholder
    const imgPlaceholder = figma.createFrame();
    imgPlaceholder.name = 'Image';
    imgPlaceholder.resize(324, 180);
    imgPlaceholder.cornerRadius = 12;
    imgPlaceholder.fills = [{type:'SOLID', color: h('#0B0E14')}];
    imgPlaceholder.layoutMode = 'VERTICAL';
    imgPlaceholder.primaryAxisAlignItems = 'CENTER';
    imgPlaceholder.counterAxisAlignItems = 'CENTER';
    const imgT = figma.createText();
    imgT.fontName = {family:'Inter',style:'Regular'};
    imgT.characters = '🖼 Feature Image';
    imgT.fontSize = 14;
    imgT.fills = [{type:'SOLID', color: h('#94A3B8')}];
    imgPlaceholder.appendChild(imgT);
    card.appendChild(imgPlaceholder);

    // Icon + title row
    const titleRow = figma.createFrame();
    titleRow.name = 'Title Row';
    titleRow.layoutMode = 'HORIZONTAL';
    titleRow.primaryAxisSizingMode = 'AUTO';
    titleRow.counterAxisSizingMode = 'AUTO';
    titleRow.counterAxisAlignItems = 'CENTER';
    titleRow.itemSpacing = 12;
    titleRow.fills = [];

    const iconBox = figma.createFrame();
    iconBox.resize(40,40);
    iconBox.cornerRadius = 12;
    iconBox.fills = [{type:'SOLID', color: h(cd.color), opacity: 0.1}];
    iconBox.layoutMode = 'VERTICAL';
    iconBox.primaryAxisAlignItems = 'CENTER';
    iconBox.counterAxisAlignItems = 'CENTER';
    const iconT = figma.createText();
    iconT.fontName = {family:'Inter',style:'Regular'};
    iconT.characters = cd.icon;
    iconT.fontSize = 18;
    iconBox.appendChild(iconT);
    titleRow.appendChild(iconBox);

    const cardTitle = figma.createText();
    cardTitle.fontName = {family:'Space Grotesk',style:'Medium'};
    cardTitle.characters = cd.title;
    cardTitle.fontSize = 20;
    cardTitle.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    titleRow.appendChild(cardTitle);
    card.appendChild(titleRow);

    const cardDesc = figma.createText();
    cardDesc.fontName = {family:'Inter',style:'Regular'};
    cardDesc.characters = cd.desc;
    cardDesc.fontSize = 14;
    cardDesc.lineHeight = {value: 22, unit: 'PIXELS'};
    cardDesc.fills = [{type:'SOLID', color: h('#94A3B8')}];
    cardDesc.resize(324, 10);
    cardDesc.textAutoResize = 'HEIGHT';
    card.appendChild(cardDesc);

    grid.appendChild(card);
  }
  features.appendChild(grid);
  main.appendChild(features);

  return 'Features created';
})()`);

console.log('  ✓ Features');

// ── HOW IT WORKS + STATS + TESTIMONIALS + CTA + FOOTER
console.log('  → How it Works, Stats, Testimonials, CTA, Footer...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255};
  }

  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children.find(c => c.name === 'NexVault Landing — Desktop 1440');
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  // ═══════ HOW IT WORKS ═══════
  const howSection = figma.createFrame();
  howSection.name = 'How It Works';
  howSection.resize(1440, 10);
  howSection.layoutMode = 'VERTICAL';
  howSection.primaryAxisSizingMode = 'AUTO';
  howSection.counterAxisSizingMode = 'FIXED';
  howSection.counterAxisAlignItems = 'CENTER';
  howSection.paddingTop = 80; howSection.paddingBottom = 80;
  howSection.paddingLeft = 120; howSection.paddingRight = 120;
  howSection.itemSpacing = 48;
  howSection.fills = [{type:'SOLID', color: h('#0B0E14')}];

  const howLabel = figma.createText();
  howLabel.fontName = {family:'Inter',style:'Semi Bold'};
  howLabel.characters = 'COMO FUNCIONA';
  howLabel.fontSize = 12;
  howLabel.letterSpacing = {value: 2, unit: 'PIXELS'};
  howLabel.fills = [{type:'SOLID', color: h('#34D399')}];
  howSection.appendChild(howLabel);

  const howTitle = figma.createText();
  howTitle.fontName = {family:'Space Grotesk',style:'Bold'};
  howTitle.characters = 'Listo en minutos';
  howTitle.fontSize = 48;
  howTitle.letterSpacing = {value: -1, unit: 'PIXELS'};
  howTitle.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  howSection.appendChild(howTitle);

  const stepsRow = figma.createFrame();
  stepsRow.name = 'Steps';
  stepsRow.layoutMode = 'HORIZONTAL';
  stepsRow.primaryAxisSizingMode = 'FIXED';
  stepsRow.counterAxisSizingMode = 'AUTO';
  stepsRow.resize(1200, 10);
  stepsRow.itemSpacing = 40;
  stepsRow.fills = [];

  const steps = [
    { num: '1', title: 'Crea tu Cuenta', desc: 'Registrate en 30 segundos solo con tu correo. Sin papeleo.', color: '#6366F1' },
    { num: '2', title: 'Vincula tu Banco', desc: 'Conecta tu banco o tarjeta de forma segura.', color: '#6366F1' },
    { num: '3', title: 'Envia y Gana', desc: 'Transfiere al instante, gana cashback en cada transaccion.', color: '#34D399' },
  ];

  for (const s of steps) {
    const step = figma.createFrame();
    step.name = 'Step ' + s.num;
    step.layoutMode = 'VERTICAL';
    step.primaryAxisSizingMode = 'AUTO';
    step.counterAxisSizingMode = 'FIXED';
    step.counterAxisAlignItems = 'CENTER';
    step.resize(360, 10);
    step.itemSpacing = 16;
    step.fills = [];
    step.layoutGrow = 1;

    const numBox = figma.createFrame();
    numBox.resize(56,56);
    numBox.cornerRadius = 16;
    numBox.fills = [{type:'SOLID', color: h(s.color), opacity: 0.1}];
    numBox.strokes = [{type:'SOLID', color: h(s.color), opacity: 0.2}];
    numBox.strokeWeight = 1;
    numBox.layoutMode = 'VERTICAL';
    numBox.primaryAxisAlignItems = 'CENTER';
    numBox.counterAxisAlignItems = 'CENTER';
    const numT = figma.createText();
    numT.fontName = {family:'Space Grotesk',style:'Bold'};
    numT.characters = s.num;
    numT.fontSize = 20;
    numT.fills = [{type:'SOLID', color: h(s.color)}];
    numBox.appendChild(numT);
    step.appendChild(numBox);

    const stepTitle = figma.createText();
    stepTitle.fontName = {family:'Space Grotesk',style:'Medium'};
    stepTitle.characters = s.title;
    stepTitle.fontSize = 18;
    stepTitle.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    step.appendChild(stepTitle);

    const stepDesc = figma.createText();
    stepDesc.fontName = {family:'Inter',style:'Regular'};
    stepDesc.characters = s.desc;
    stepDesc.fontSize = 14;
    stepDesc.lineHeight = {value: 22, unit: 'PIXELS'};
    stepDesc.textAlignHorizontal = 'CENTER';
    stepDesc.fills = [{type:'SOLID', color: h('#94A3B8')}];
    stepDesc.resize(300, 10);
    stepDesc.textAutoResize = 'HEIGHT';
    step.appendChild(stepDesc);

    stepsRow.appendChild(step);
  }
  howSection.appendChild(stepsRow);
  main.appendChild(howSection);

  // ═══════ STATS ═══════
  const statsSection = figma.createFrame();
  statsSection.name = 'Stats';
  statsSection.resize(1440, 10);
  statsSection.layoutMode = 'VERTICAL';
  statsSection.primaryAxisSizingMode = 'AUTO';
  statsSection.counterAxisSizingMode = 'FIXED';
  statsSection.counterAxisAlignItems = 'CENTER';
  statsSection.paddingTop = 80; statsSection.paddingBottom = 80;
  statsSection.paddingLeft = 120; statsSection.paddingRight = 120;
  statsSection.fills = [{type:'SOLID', color: h('#0B0E14')}];

  const statsCard = figma.createFrame();
  statsCard.name = 'Stats Card';
  statsCard.resize(1200, 10);
  statsCard.layoutMode = 'HORIZONTAL';
  statsCard.primaryAxisSizingMode = 'FIXED';
  statsCard.counterAxisSizingMode = 'AUTO';
  statsCard.paddingTop = 48; statsCard.paddingBottom = 48;
  statsCard.paddingLeft = 48; statsCard.paddingRight = 48;
  statsCard.itemSpacing = 0;
  statsCard.cornerRadius = 24;
  statsCard.fills = [{type:'SOLID', color: h('#151925'), opacity: 0.5}];
  statsCard.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.06}];
  statsCard.strokeWeight = 1;
  statsCard.effects = [{type:'BACKGROUND_BLUR', radius:20, visible:true}];

  const statsData = [
    { value: 'S/ 8.5B', label: 'Volumen Transaccionado', color: null },
    { value: '180+', label: 'Paises Soportados', color: '#F8FAFC' },
    { value: '99.99%', label: 'Garantia de Disponibilidad', color: '#34D399' },
    { value: '< 3s', label: 'Velocidad de Transferencia', color: '#F8FAFC' },
  ];

  for (const sd of statsData) {
    const statItem = figma.createFrame();
    statItem.name = sd.label;
    statItem.layoutMode = 'VERTICAL';
    statItem.primaryAxisSizingMode = 'AUTO';
    statItem.counterAxisSizingMode = 'FIXED';
    statItem.counterAxisAlignItems = 'CENTER';
    statItem.resize(276, 10);
    statItem.itemSpacing = 8;
    statItem.fills = [];
    statItem.layoutGrow = 1;

    const val = figma.createText();
    val.fontName = {family:'Space Grotesk',style:'Bold'};
    val.characters = sd.value;
    val.fontSize = 48;
    val.textAlignHorizontal = 'CENTER';
    if (sd.color) {
      val.fills = [{type:'SOLID', color: h(sd.color)}];
    } else {
      val.fills = [{
        type: 'GRADIENT_LINEAR',
        gradientStops: [
          { position: 0, color: { r: 0.39, g: 0.4, b: 0.95, a: 1 } },
          { position: 1, color: { r: 0.2, g: 0.83, b: 0.6, a: 1 } }
        ],
        gradientTransform: [[1, 0, 0], [0, 1, 0]]
      }];
    }
    statItem.appendChild(val);

    const lab = figma.createText();
    lab.fontName = {family:'Inter',style:'Regular'};
    lab.characters = sd.label;
    lab.fontSize = 14;
    lab.textAlignHorizontal = 'CENTER';
    lab.fills = [{type:'SOLID', color: h('#94A3B8')}];
    statItem.appendChild(lab);

    statsCard.appendChild(statItem);
  }
  statsSection.appendChild(statsCard);
  main.appendChild(statsSection);

  // ═══════ TESTIMONIALS ═══════
  const testSection = figma.createFrame();
  testSection.name = 'Testimonials';
  testSection.resize(1440, 10);
  testSection.layoutMode = 'VERTICAL';
  testSection.primaryAxisSizingMode = 'AUTO';
  testSection.counterAxisSizingMode = 'FIXED';
  testSection.counterAxisAlignItems = 'CENTER';
  testSection.paddingTop = 80; testSection.paddingBottom = 80;
  testSection.paddingLeft = 120; testSection.paddingRight = 120;
  testSection.itemSpacing = 48;
  testSection.fills = [{type:'SOLID', color: h('#0B0E14')}];

  const testLabel = figma.createText();
  testLabel.fontName = {family:'Inter',style:'Semi Bold'};
  testLabel.characters = 'TESTIMONIOS';
  testLabel.fontSize = 12;
  testLabel.letterSpacing = {value: 2, unit: 'PIXELS'};
  testLabel.fills = [{type:'SOLID', color: h('#34D399')}];
  testSection.appendChild(testLabel);

  const testTitle = figma.createText();
  testTitle.fontName = {family:'Space Grotesk',style:'Bold'};
  testTitle.characters = 'Miles ya confian en nosotros';
  testTitle.fontSize = 48;
  testTitle.letterSpacing = {value: -1, unit: 'PIXELS'};
  testTitle.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  testSection.appendChild(testTitle);

  const testGrid = figma.createFrame();
  testGrid.name = 'Testimonial Cards';
  testGrid.layoutMode = 'HORIZONTAL';
  testGrid.primaryAxisSizingMode = 'FIXED';
  testGrid.counterAxisSizingMode = 'AUTO';
  testGrid.resize(1200, 10);
  testGrid.itemSpacing = 24;
  testGrid.fills = [];

  const testimonials = [
    { quote: '"Envie S/ 5,000 a mi familia en provincia en 2 segundos. Sin comisiones. NexVault es realmente el futuro del dinero."', name: 'Carolina Mendoza', role: 'Diseñadora Freelance' },
    { quote: '"Como fundador de startup, necesito pagar a colaboradores en 8 paises. NexVault lo maneja todo sin friccion."', name: 'Diego Ramirez', role: 'CEO, BuildStack' },
    { quote: '"El cashback en cada transaccion es increible. He ganado S/ 1,200 solo por gastar normalmente."', name: 'Valeria Torres', role: 'Cientifica de Datos' },
  ];

  for (const t of testimonials) {
    const tCard = figma.createFrame();
    tCard.name = 'Testimonial - ' + t.name;
    tCard.layoutMode = 'VERTICAL';
    tCard.primaryAxisSizingMode = 'AUTO';
    tCard.counterAxisSizingMode = 'FIXED';
    tCard.resize(380, 10);
    tCard.paddingTop = 28; tCard.paddingBottom = 28;
    tCard.paddingLeft = 28; tCard.paddingRight = 28;
    tCard.itemSpacing = 16;
    tCard.cornerRadius = 20;
    tCard.fills = [{type:'SOLID', color: h('#151925'), opacity: 0.6}];
    tCard.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.06}];
    tCard.strokeWeight = 1;
    tCard.layoutGrow = 1;

    // Stars
    const stars = figma.createText();
    stars.fontName = {family:'Inter',style:'Regular'};
    stars.characters = '★ ★ ★ ★ ★';
    stars.fontSize = 14;
    stars.fills = [{type:'SOLID', color: h('#34D399')}];
    tCard.appendChild(stars);

    const quote = figma.createText();
    quote.fontName = {family:'Inter',style:'Regular'};
    quote.characters = t.quote;
    quote.fontSize = 14;
    quote.lineHeight = {value: 22, unit: 'PIXELS'};
    quote.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    quote.resize(324, 10);
    quote.textAutoResize = 'HEIGHT';
    tCard.appendChild(quote);

    const authorRow = figma.createFrame();
    authorRow.name = 'Author';
    authorRow.layoutMode = 'HORIZONTAL';
    authorRow.primaryAxisSizingMode = 'AUTO';
    authorRow.counterAxisSizingMode = 'AUTO';
    authorRow.counterAxisAlignItems = 'CENTER';
    authorRow.itemSpacing = 12;
    authorRow.fills = [];

    const avatar = figma.createEllipse();
    avatar.resize(40,40);
    avatar.fills = [{type:'SOLID', color: h('#6366F1'), opacity: 0.3}];
    avatar.strokes = [{type:'SOLID', color: h('#6366F1'), opacity: 0.3}];
    avatar.strokeWeight = 2;
    authorRow.appendChild(avatar);

    const info = figma.createFrame();
    info.layoutMode = 'VERTICAL';
    info.primaryAxisSizingMode = 'AUTO';
    info.counterAxisSizingMode = 'AUTO';
    info.itemSpacing = 2;
    info.fills = [];
    const nm = figma.createText();
    nm.fontName = {family:'Inter',style:'Semi Bold'};
    nm.characters = t.name;
    nm.fontSize = 14;
    nm.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    info.appendChild(nm);
    const rl = figma.createText();
    rl.fontName = {family:'Inter',style:'Regular'};
    rl.characters = t.role;
    rl.fontSize = 12;
    rl.fills = [{type:'SOLID', color: h('#94A3B8')}];
    info.appendChild(rl);
    authorRow.appendChild(info);
    tCard.appendChild(authorRow);

    testGrid.appendChild(tCard);
  }
  testSection.appendChild(testGrid);
  main.appendChild(testSection);

  // ═══════ CTA ═══════
  const ctaSection = figma.createFrame();
  ctaSection.name = 'CTA';
  ctaSection.resize(1440, 10);
  ctaSection.layoutMode = 'VERTICAL';
  ctaSection.primaryAxisSizingMode = 'AUTO';
  ctaSection.counterAxisSizingMode = 'FIXED';
  ctaSection.counterAxisAlignItems = 'CENTER';
  ctaSection.paddingTop = 80; ctaSection.paddingBottom = 80;
  ctaSection.paddingLeft = 200; ctaSection.paddingRight = 200;
  ctaSection.fills = [{type:'SOLID', color: h('#0B0E14')}];

  const ctaCard = figma.createFrame();
  ctaCard.name = 'CTA Card';
  ctaCard.resize(1040, 10);
  ctaCard.layoutMode = 'VERTICAL';
  ctaCard.primaryAxisSizingMode = 'AUTO';
  ctaCard.counterAxisSizingMode = 'FIXED';
  ctaCard.counterAxisAlignItems = 'CENTER';
  ctaCard.paddingTop = 64; ctaCard.paddingBottom = 64;
  ctaCard.paddingLeft = 64; ctaCard.paddingRight = 64;
  ctaCard.itemSpacing = 24;
  ctaCard.cornerRadius = 24;
  ctaCard.fills = [{type:'SOLID', color: h('#151925'), opacity: 0.5}];
  ctaCard.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.06}];
  ctaCard.strokeWeight = 1;
  ctaCard.effects = [{type:'BACKGROUND_BLUR', radius:20, visible:true}];

  const ctaTitle1 = figma.createText();
  ctaTitle1.fontName = {family:'Space Grotesk',style:'Bold'};
  ctaTitle1.characters = 'Listo para tomar';
  ctaTitle1.fontSize = 56;
  ctaTitle1.lineHeight = {value: 64, unit: 'PIXELS'};
  ctaTitle1.textAlignHorizontal = 'CENTER';
  ctaTitle1.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  ctaCard.appendChild(ctaTitle1);

  const ctaTitle2 = figma.createText();
  ctaTitle2.fontName = {family:'Space Grotesk',style:'Bold'};
  ctaTitle2.characters = 'el control?';
  ctaTitle2.fontSize = 56;
  ctaTitle2.lineHeight = {value: 64, unit: 'PIXELS'};
  ctaTitle2.textAlignHorizontal = 'CENTER';
  ctaTitle2.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: { r: 0.39, g: 0.4, b: 0.95, a: 1 } },
      { position: 1, color: { r: 0.2, g: 0.83, b: 0.6, a: 1 } }
    ],
    gradientTransform: [[1, 0, 0], [0, 1, 0]]
  }];
  ctaCard.appendChild(ctaTitle2);

  const ctaDesc = figma.createText();
  ctaDesc.fontName = {family:'Inter',style:'Regular'};
  ctaDesc.characters = 'Unete a las 12,000+ personas que ya dieron el salto.\\nSin comisiones los primeros 3 meses.';
  ctaDesc.fontSize = 18;
  ctaDesc.lineHeight = {value: 28, unit: 'PIXELS'};
  ctaDesc.textAlignHorizontal = 'CENTER';
  ctaDesc.fills = [{type:'SOLID', color: h('#94A3B8')}];
  ctaCard.appendChild(ctaDesc);

  const ctaBtn = figma.createFrame();
  ctaBtn.name = 'CTA Button';
  ctaBtn.layoutMode = 'HORIZONTAL';
  ctaBtn.primaryAxisAlignItems = 'CENTER';
  ctaBtn.counterAxisAlignItems = 'CENTER';
  ctaBtn.primaryAxisSizingMode = 'AUTO';
  ctaBtn.counterAxisSizingMode = 'AUTO';
  ctaBtn.paddingTop = 16; ctaBtn.paddingBottom = 16;
  ctaBtn.paddingLeft = 40; ctaBtn.paddingRight = 40;
  ctaBtn.cornerRadius = 16;
  ctaBtn.fills = [{type:'SOLID', color: h('#6366F1')}];
  ctaBtn.effects = [{type:'DROP_SHADOW',color:{r:0.39,g:0.4,b:0.95,a:0.3},offset:{x:0,y:0},radius:20,visible:true,blendMode:'NORMAL',spread:0}];
  ctaBtn.itemSpacing = 8;
  const ctaBtnT = figma.createText();
  ctaBtnT.fontName = {family:'Inter',style:'Semi Bold'};
  ctaBtnT.characters = 'Crear Cuenta Gratis';
  ctaBtnT.fontSize = 18;
  ctaBtnT.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  ctaBtn.appendChild(ctaBtnT);
  const ctaArrow = figma.createText();
  ctaArrow.fontName = {family:'Inter',style:'Regular'};
  ctaArrow.characters = '→';
  ctaArrow.fontSize = 18;
  ctaArrow.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  ctaBtn.appendChild(ctaArrow);
  ctaCard.appendChild(ctaBtn);

  const ctaNote = figma.createText();
  ctaNote.fontName = {family:'Inter',style:'Regular'};
  ctaNote.characters = 'Sin tarjeta de credito. Cancela cuando quieras.';
  ctaNote.fontSize = 12;
  ctaNote.fills = [{type:'SOLID', color: h('#94A3B8')}];
  ctaCard.appendChild(ctaNote);

  ctaSection.appendChild(ctaCard);
  main.appendChild(ctaSection);

  // ═══════ FOOTER ═══════
  const footer = figma.createFrame();
  footer.name = 'Footer';
  footer.resize(1440, 10);
  footer.layoutMode = 'VERTICAL';
  footer.primaryAxisSizingMode = 'AUTO';
  footer.counterAxisSizingMode = 'FIXED';
  footer.paddingTop = 48; footer.paddingBottom = 48;
  footer.paddingLeft = 120; footer.paddingRight = 120;
  footer.itemSpacing = 32;
  footer.fills = [{type:'SOLID', color: h('#0B0E14')}];
  footer.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.05}];
  footer.strokeWeight = 1;
  footer.strokeAlign = 'INSIDE';

  const footerGrid = figma.createFrame();
  footerGrid.name = 'Footer Grid';
  footerGrid.layoutMode = 'HORIZONTAL';
  footerGrid.primaryAxisSizingMode = 'FIXED';
  footerGrid.counterAxisSizingMode = 'AUTO';
  footerGrid.resize(1200, 10);
  footerGrid.itemSpacing = 40;
  footerGrid.fills = [];

  const footerCols = [
    { title: null, items: ['NexVault', 'La billetera digital de nueva generacion para un mundo sin fronteras.'] },
    { title: 'PRODUCTO', items: ['Beneficios', 'Precios', 'Seguridad', 'API'] },
    { title: 'EMPRESA', items: ['Nosotros', 'Empleos', 'Blog', 'Prensa'] },
    { title: 'LEGAL', items: ['Privacidad', 'Terminos', 'Cookies'] },
  ];

  for (const col of footerCols) {
    const colFrame = figma.createFrame();
    colFrame.name = col.title || 'Brand';
    colFrame.layoutMode = 'VERTICAL';
    colFrame.primaryAxisSizingMode = 'AUTO';
    colFrame.counterAxisSizingMode = 'FIXED';
    colFrame.resize(270, 10);
    colFrame.itemSpacing = 12;
    colFrame.fills = [];
    colFrame.layoutGrow = 1;

    if (col.title) {
      const colTitle = figma.createText();
      colTitle.fontName = {family:'Inter',style:'Semi Bold'};
      colTitle.characters = col.title;
      colTitle.fontSize = 12;
      colTitle.letterSpacing = {value: 1.5, unit: 'PIXELS'};
      colTitle.fills = [{type:'SOLID', color: h('#94A3B8')}];
      colFrame.appendChild(colTitle);
    }

    for (let i = 0; i < col.items.length; i++) {
      const item = figma.createText();
      if (!col.title && i === 0) {
        item.fontName = {family:'Space Grotesk',style:'Bold'};
        item.fontSize = 18;
        item.fills = [{type:'SOLID', color: h('#F8FAFC')}];
      } else if (!col.title && i === 1) {
        item.fontName = {family:'Inter',style:'Regular'};
        item.fontSize = 14;
        item.lineHeight = {value: 22, unit: 'PIXELS'};
        item.fills = [{type:'SOLID', color: h('#94A3B8')}];
        item.resize(250, 10);
        item.textAutoResize = 'HEIGHT';
      } else {
        item.fontName = {family:'Inter',style:'Regular'};
        item.fontSize = 14;
        item.fills = [{type:'SOLID', color: h('#94A3B8')}];
      }
      item.characters = col.items[i];
      colFrame.appendChild(item);
    }
    footerGrid.appendChild(colFrame);
  }
  footer.appendChild(footerGrid);

  // Copyright
  const copyright = figma.createText();
  copyright.fontName = {family:'Inter',style:'Regular'};
  copyright.characters = '© 2026 NexVault. Todos los derechos reservados.';
  copyright.fontSize = 12;
  copyright.fills = [{type:'SOLID', color: h('#94A3B8')}];
  footer.appendChild(copyright);

  main.appendChild(footer);

  figma.viewport.scrollAndZoomIntoView([main]);
  return 'All sections created';
})()`);

console.log('  ✓ How It Works, Stats, Testimonials, CTA, Footer');

// ═══════════════════════════════════════════════════════════
// STEP 3: Final Design System Document Page
// ═══════════════════════════════════════════════════════════
console.log('\n📋 Creando Design System Document...');

await run(`(async ()=>{
  function h(c){
    c=c.replace('#','');
    return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255};
  }

  // Create a new page for the consolidated doc
  let docPage = figma.root.children.find(p => p.name === '📋 Design System Doc');
  if (!docPage) {
    docPage = figma.createPage();
    docPage.name = '📋 Design System Doc';
  }
  await figma.setCurrentPageAsync(docPage);
  docPage.children.forEach(c => c.remove());
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  const doc = figma.createFrame();
  doc.name = 'NexVault — Design System Documentation';
  doc.resize(1200, 10);
  doc.layoutMode = 'VERTICAL';
  doc.primaryAxisSizingMode = 'AUTO';
  doc.counterAxisSizingMode = 'FIXED';
  doc.paddingTop = 80; doc.paddingBottom = 80;
  doc.paddingLeft = 80; doc.paddingRight = 80;
  doc.itemSpacing = 60;
  doc.fills = [{type:'SOLID', color: h('#0B0E14')}];

  // ── HEADER
  const header = figma.createFrame();
  header.name = 'Header';
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'AUTO';
  header.itemSpacing = 16;
  header.fills = [];

  const docTitle = figma.createText();
  docTitle.fontName = {family:'Space Grotesk',style:'Bold'};
  docTitle.characters = 'NexVault Design System';
  docTitle.fontSize = 56;
  docTitle.letterSpacing = {value: -2, unit: 'PIXELS'};
  docTitle.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  header.appendChild(docTitle);

  const docSub = figma.createText();
  docSub.fontName = {family:'Inter',style:'Regular'};
  docSub.characters = 'Documentacion completa de tokens, estilos y componentes.\\nFintech • Peru • Dark Mode • Tailwind CSS • Marzo 2026';
  docSub.fontSize = 16;
  docSub.lineHeight = {value: 26, unit: 'PIXELS'};
  docSub.fills = [{type:'SOLID', color: h('#94A3B8')}];
  header.appendChild(docSub);
  doc.appendChild(header);

  // ── DIVIDER helper
  function addDivider() {
    const div = figma.createLine();
    div.resize(1040, 0);
    div.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.05}];
    div.strokeWeight = 1;
    doc.appendChild(div);
  }

  // ── SECTION: Colors
  addDivider();
  const colorSection = figma.createFrame();
  colorSection.name = 'Colors Section';
  colorSection.layoutMode = 'VERTICAL';
  colorSection.primaryAxisSizingMode = 'AUTO';
  colorSection.counterAxisSizingMode = 'AUTO';
  colorSection.itemSpacing = 24;
  colorSection.fills = [];

  const colorLabel = figma.createText();
  colorLabel.fontName = {family:'Inter',style:'Semi Bold'};
  colorLabel.characters = '01 — COLOR PALETTE';
  colorLabel.fontSize = 12;
  colorLabel.letterSpacing = {value: 2, unit: 'PIXELS'};
  colorLabel.fills = [{type:'SOLID', color: h('#6366F1')}];
  colorSection.appendChild(colorLabel);

  const colorDesc = figma.createText();
  colorDesc.fontName = {family:'Inter',style:'Regular'};
  colorDesc.characters = 'Todos los colores usan nombres semanticos en Tailwind CSS.\\nFigma: Usa las variables "NexVault Colors" y los Paint Styles "NexVault/..."';
  colorDesc.fontSize = 14;
  colorDesc.lineHeight = {value: 22, unit: 'PIXELS'};
  colorDesc.fills = [{type:'SOLID', color: h('#94A3B8')}];
  colorSection.appendChild(colorDesc);

  const colorGrid = figma.createFrame();
  colorGrid.name = 'Color Swatches';
  colorGrid.layoutMode = 'HORIZONTAL';
  colorGrid.layoutWrap = 'WRAP';
  colorGrid.primaryAxisSizingMode = 'FIXED';
  colorGrid.counterAxisSizingMode = 'AUTO';
  colorGrid.resize(1040, 10);
  colorGrid.itemSpacing = 16;
  colorGrid.counterAxisSpacing = 16;
  colorGrid.fills = [];

  const docColors = [
    {name:'background',hex:'#0B0E14',tw:'bg-background'},
    {name:'surface',hex:'#151925',tw:'bg-surface'},
    {name:'primary',hex:'#6366F1',tw:'bg-primary'},
    {name:'accent',hex:'#34D399',tw:'bg-accent'},
    {name:'text-main',hex:'#F8FAFC',tw:'text-text-main'},
    {name:'text-muted',hex:'#94A3B8',tw:'text-text-muted'},
  ];

  for (const dc of docColors) {
    const sw = figma.createFrame();
    sw.name = dc.name;
    sw.layoutMode = 'VERTICAL';
    sw.primaryAxisSizingMode = 'AUTO';
    sw.counterAxisSizingMode = 'FIXED';
    sw.resize(160, 10);
    sw.itemSpacing = 8;
    sw.fills = [];

    const box = figma.createFrame();
    box.resize(160, 80);
    box.cornerRadius = 12;
    box.fills = [{type:'SOLID', color: h(dc.hex)}];
    if (dc.name === 'background' || dc.name === 'surface') {
      box.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.1}];
      box.strokeWeight = 1;
    }
    sw.appendChild(box);

    const nm = figma.createText();
    nm.fontName = {family:'Inter',style:'Semi Bold'};
    nm.characters = dc.name;
    nm.fontSize = 12;
    nm.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    sw.appendChild(nm);

    const hx = figma.createText();
    hx.fontName = {family:'Inter',style:'Regular'};
    hx.characters = dc.hex + ' • ' + dc.tw;
    hx.fontSize = 10;
    hx.fills = [{type:'SOLID', color: h('#94A3B8')}];
    sw.appendChild(hx);

    colorGrid.appendChild(sw);
  }
  colorSection.appendChild(colorGrid);
  doc.appendChild(colorSection);

  // ── SECTION: Typography
  addDivider();
  const typoSection = figma.createFrame();
  typoSection.name = 'Typography Section';
  typoSection.layoutMode = 'VERTICAL';
  typoSection.primaryAxisSizingMode = 'AUTO';
  typoSection.counterAxisSizingMode = 'AUTO';
  typoSection.itemSpacing = 24;
  typoSection.fills = [];

  const typoLabel = figma.createText();
  typoLabel.fontName = {family:'Inter',style:'Semi Bold'};
  typoLabel.characters = '02 — TYPOGRAPHY';
  typoLabel.fontSize = 12;
  typoLabel.letterSpacing = {value: 2, unit: 'PIXELS'};
  typoLabel.fills = [{type:'SOLID', color: h('#6366F1')}];
  typoSection.appendChild(typoLabel);

  const typoInfo = figma.createText();
  typoInfo.fontName = {family:'Inter',style:'Regular'};
  typoInfo.characters = 'Display: Space Grotesk (Bold, Medium) — font-display\\nBody: Inter (Regular, Medium, Semi Bold, Bold) — font-body\\nFigma: Usa los Text Styles "NexVault/Display/..." y "NexVault/Body/..."';
  typoInfo.fontSize = 14;
  typoInfo.lineHeight = {value: 22, unit: 'PIXELS'};
  typoInfo.fills = [{type:'SOLID', color: h('#94A3B8')}];
  typoSection.appendChild(typoInfo);

  const typoSamples = [
    { label: 'H1 — 64px Bold', text: 'Tu Dinero, Reinventado.', family: 'Space Grotesk', style: 'Bold', size: 48 },
    { label: 'H2 — 48px Bold', text: 'Construido para el futuro', family: 'Space Grotesk', style: 'Bold', size: 36 },
    { label: 'Body — 16px Regular', text: 'Gestiona tus finanzas con total seguridad y transparencia.', family: 'Inter', style: 'Regular', size: 16 },
    { label: 'Caption — 12px Regular', text: 'Sin tarjeta de credito. Cancela cuando quieras.', family: 'Inter', style: 'Regular', size: 12 },
  ];

  for (const ts of typoSamples) {
    const row = figma.createFrame();
    row.layoutMode = 'VERTICAL';
    row.primaryAxisSizingMode = 'AUTO';
    row.counterAxisSizingMode = 'AUTO';
    row.itemSpacing = 4;
    row.fills = [];
    row.paddingBottom = 16;

    const lab = figma.createText();
    lab.fontName = {family:'Inter',style:'Regular'};
    lab.characters = ts.label;
    lab.fontSize = 11;
    lab.fills = [{type:'SOLID', color: h('#94A3B8')}];
    row.appendChild(lab);

    const sample = figma.createText();
    sample.fontName = {family: ts.family, style: ts.style};
    sample.characters = ts.text;
    sample.fontSize = ts.size;
    sample.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    row.appendChild(sample);

    typoSection.appendChild(row);
  }
  doc.appendChild(typoSection);

  // ── SECTION: Components
  addDivider();
  const compSection = figma.createFrame();
  compSection.name = 'Components Section';
  compSection.layoutMode = 'VERTICAL';
  compSection.primaryAxisSizingMode = 'AUTO';
  compSection.counterAxisSizingMode = 'AUTO';
  compSection.itemSpacing = 24;
  compSection.fills = [];

  const compLabel = figma.createText();
  compLabel.fontName = {family:'Inter',style:'Semi Bold'};
  compLabel.characters = '03 — COMPONENTS';
  compLabel.fontSize = 12;
  compLabel.letterSpacing = {value: 2, unit: 'PIXELS'};
  compLabel.fills = [{type:'SOLID', color: h('#6366F1')}];
  compSection.appendChild(compLabel);

  const compList = figma.createText();
  compList.fontName = {family:'Inter',style:'Regular'};
  compList.characters = 'Componentes disponibles en la pagina "🧩 Components":\\n\\n• Button/Primary — Boton principal con glow indigo\\n• Button/Secondary — Boton con borde sutil\\n• Button/Ghost — Boton transparente\\n• Button/Accent — Boton verde menta\\n• Card/Glass — Glassmorphism card con backdrop-blur\\n• Card/Stat — Tarjeta de estadisticas\\n• Card/Testimonial — Card con quote, estrellas y avatar\\n• Badge/Primary — Badge indigo\\n• Badge/Accent — Badge verde\\n• Badge/Muted — Badge gris\\n• Navbar — Barra de navegacion completa\\n\\nTodos son Figma Components reales. Crea instancias y personaliza.';
  compList.fontSize = 14;
  compList.lineHeight = {value: 24, unit: 'PIXELS'};
  compList.fills = [{type:'SOLID', color: h('#94A3B8')}];
  compList.resize(800, 10);
  compList.textAutoResize = 'HEIGHT';
  compSection.appendChild(compList);
  doc.appendChild(compSection);

  // ── SECTION: Figma Export Notes
  addDivider();
  const notesSection = figma.createFrame();
  notesSection.name = 'Figma Notes';
  notesSection.layoutMode = 'VERTICAL';
  notesSection.primaryAxisSizingMode = 'AUTO';
  notesSection.counterAxisSizingMode = 'AUTO';
  notesSection.itemSpacing = 16;
  notesSection.fills = [];

  const notesLabel = figma.createText();
  notesLabel.fontName = {family:'Inter',style:'Semi Bold'};
  notesLabel.characters = '04 — NOTAS PARA FIGMA';
  notesLabel.fontSize = 12;
  notesLabel.letterSpacing = {value: 2, unit: 'PIXELS'};
  notesLabel.fills = [{type:'SOLID', color: h('#6366F1')}];
  notesSection.appendChild(notesLabel);

  const notes = figma.createText();
  notes.fontName = {family:'Inter',style:'Regular'};
  notes.characters = '• Variables: Coleccion "NexVault Colors" (14 color vars) + "NexVault Spacing" (11 float vars)\\n• Paint Styles: 10 color styles + 3 gradient styles bajo "NexVault/"\\n• Text Styles: 10 text styles bajo "NexVault/" (Display H1-H4, Body L/M/S, UI Button/Caption/Overline)\\n• Componentes: 11 componentes con variantes en pagina "🧩 Components"\\n• Landing: Recreacion completa desktop 1440px en pagina "📱 Landing Page"\\n\\nPara exportar tokens a codigo:\\n  figma-ds-cli export css → Variables CSS\\n  figma-ds-cli export tailwind → tailwind.config.js\\n\\nCorrespondencia Tailwind → Figma:\\n  bg-background → Variable NexVault/background → Style NexVault/Background\\n  bg-primary → Variable NexVault/primary → Style NexVault/Primary\\n  text-text-muted → Variable NexVault/text-muted → Style NexVault/Text Muted\\n  font-display → Space Grotesk\\n  font-body → Inter';
  notes.fontSize = 13;
  notes.lineHeight = {value: 22, unit: 'PIXELS'};
  notes.fills = [{type:'SOLID', color: h('#94A3B8')}];
  notes.resize(900, 10);
  notes.textAutoResize = 'HEIGHT';
  notesSection.appendChild(notes);
  doc.appendChild(notesSection);

  figma.viewport.scrollAndZoomIntoView([doc]);
  return 'Design System Document created';
})()`);

console.log('✓ Design System Document creado');

// ═══════════════════════════════════════════════════════════
// NAVIGATE TO LANDING PAGE
// ═══════════════════════════════════════════════════════════
await run(`(async ()=>{
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  if (page) {
    await figma.setCurrentPageAsync(page);
    if (page.children.length > 0) figma.viewport.scrollAndZoomIntoView(page.children);
  }
  return 'Done';
})()`);

console.log('\n' + '═'.repeat(50));
console.log('✅ NexVault — Exportacion completa a Figma');
console.log('═'.repeat(50));
console.log('\nNuevo en esta ejecucion:');
console.log('  🎨 13 Paint Styles (Color Styles) + 3 Gradient Styles');
console.log('  📱 Landing Page completa (7 secciones):');
console.log('     Navbar → Hero → Features → How It Works → Stats → Testimonials → CTA → Footer');
console.log('  📋 Design System Doc (documento consolidado)');

client.close();
