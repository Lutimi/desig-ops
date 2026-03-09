/**
 * NexVault — Rebuild Landing Page (pixel-accurate)
 * 
 * Deletes old landing and rebuilds with:
 * - Correct dimensions matching the real website
 * - Images placed using existing imageHash references
 * - Proper Auto Layout with correct padding/gaps
 */
import { FigmaClient } from './src/figma-client.js';

const client = new FigmaClient();
await client.connect();
console.log('✓ Conectado a Figma');

async function run(code) {
  return await client.eval(code);
}

const IMG = {
  hero: '7181486a1781dcd478096e8199e0215230c2cfe6',
  security: 'cc05d433511401ff5f517af8590f9ae1b1bb87c0',
  speed: '97182989c6e507f1743a74b032aa60f5afb910a8',
  global: 'a231f1ad239e37342152404043b5aac170921411',
  carolina: 'c44939b9684e957b6f2717204571e58604a61d14',
  diego: '4d31c8847c935d3b306e2481e8a7a3c433639eaf',
  valeria: '14911ebbedceb5eb8600ea95184590db3bcb6d34',
};

// ═══════════════════════════════════════════════════════════
// CLEAR PAGE
// ═══════════════════════════════════════════════════════════
console.log('\n🗑️  Limpiando pagina Landing Page...');
await run(`(async ()=>{
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  await figma.setCurrentPageAsync(page);
  page.children.forEach(c => c.remove());
  return 'cleared';
})()`);

// ═══════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════
console.log('📱 Construyendo landing page...');
console.log('  → Navbar...');

await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  // Main frame
  const main = figma.createFrame();
  main.name = 'NexVault Landing — Desktop 1440';
  main.resize(1440, 100);
  main.layoutMode = 'VERTICAL';
  main.primaryAxisSizingMode = 'AUTO';
  main.counterAxisSizingMode = 'FIXED';
  main.itemSpacing = 0;
  main.fills = [{type:'SOLID', color: h('#0B0E14')}];
  main.clipsContent = true;

  // ── NAVBAR (height 72, px-24 = px-6 * 4 = 96px at 1440)
  const nav = figma.createFrame();
  nav.name = 'Navbar';
  nav.layoutMode = 'HORIZONTAL';
  nav.primaryAxisSizingMode = 'FIXED';
  nav.counterAxisSizingMode = 'FIXED';
  nav.resize(1440, 72);
  nav.primaryAxisAlignItems = 'SPACE_BETWEEN';
  nav.counterAxisAlignItems = 'CENTER';
  nav.paddingLeft = 96; nav.paddingRight = 96;
  nav.fills = [{type:'SOLID', color: h('#0B0E14')}];

  // Logo
  const logo = figma.createFrame();
  logo.name = 'Logo';
  logo.layoutMode = 'HORIZONTAL';
  logo.primaryAxisSizingMode = 'AUTO';
  logo.counterAxisSizingMode = 'AUTO';
  logo.counterAxisAlignItems = 'CENTER';
  logo.itemSpacing = 8;
  logo.fills = [];

  const logoIcon = figma.createFrame();
  logoIcon.name = 'Icon';
  logoIcon.resize(32, 32);
  logoIcon.cornerRadius = 8;
  logoIcon.fills = [{type:'SOLID', color: h('#6366F1')}];
  logoIcon.layoutMode = 'VERTICAL';
  logoIcon.primaryAxisAlignItems = 'CENTER';
  logoIcon.counterAxisAlignItems = 'CENTER';
  const logoN = figma.createText();
  logoN.fontName = {family:'Inter',style:'Bold'};
  logoN.characters = 'N';
  logoN.fontSize = 16;
  logoN.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  logoIcon.appendChild(logoN);
  logo.appendChild(logoIcon);

  const brandName = figma.createText();
  brandName.fontName = {family:'Space Grotesk',style:'Bold'};
  brandName.characters = 'NexVault';
  brandName.fontSize = 20;
  brandName.letterSpacing = {value: -0.5, unit: 'PIXELS'};
  brandName.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  logo.appendChild(brandName);
  nav.appendChild(logo);

  // Nav links
  const links = figma.createFrame();
  links.name = 'Links';
  links.layoutMode = 'HORIZONTAL';
  links.primaryAxisSizingMode = 'AUTO';
  links.counterAxisSizingMode = 'AUTO';
  links.itemSpacing = 32;
  links.fills = [];
  const linkData = [
    {t:'Beneficios',c:'#94A3B8'},{t:'Como Funciona',c:'#94A3B8'},{t:'Cifras',c:'#94A3B8'},
    {t:'Precios',c:'#94A3B8'},{t:'Design System',c:'#34D399'}
  ];
  for (const ld of linkData) {
    const l = figma.createText();
    l.fontName = {family:'Inter',style:'Regular'};
    l.characters = ld.t;
    l.fontSize = 14;
    l.fills = [{type:'SOLID', color: h(ld.c)}];
    links.appendChild(l);
  }
  nav.appendChild(links);

  // Right CTA
  const rightCta = figma.createFrame();
  rightCta.name = 'Right CTA';
  rightCta.layoutMode = 'HORIZONTAL';
  rightCta.primaryAxisSizingMode = 'AUTO';
  rightCta.counterAxisSizingMode = 'AUTO';
  rightCta.counterAxisAlignItems = 'CENTER';
  rightCta.itemSpacing = 12;
  rightCta.fills = [];

  const loginT = figma.createText();
  loginT.fontName = {family:'Inter',style:'Regular'};
  loginT.characters = 'Iniciar Sesion';
  loginT.fontSize = 14;
  loginT.fills = [{type:'SOLID', color: h('#94A3B8')}];
  rightCta.appendChild(loginT);

  const navBtn = figma.createFrame();
  navBtn.name = 'Comenzar';
  navBtn.layoutMode = 'HORIZONTAL';
  navBtn.primaryAxisAlignItems = 'CENTER';
  navBtn.counterAxisAlignItems = 'CENTER';
  navBtn.primaryAxisSizingMode = 'AUTO';
  navBtn.counterAxisSizingMode = 'AUTO';
  navBtn.paddingTop = 10; navBtn.paddingBottom = 10;
  navBtn.paddingLeft = 20; navBtn.paddingRight = 20;
  navBtn.cornerRadius = 12;
  navBtn.fills = [{type:'SOLID', color: h('#6366F1')}];
  navBtn.effects = [{type:'DROP_SHADOW',color:{r:0.39,g:0.4,b:0.95,a:0.3},offset:{x:0,y:0},radius:20,visible:true,blendMode:'NORMAL',spread:0}];
  const navBtnT = figma.createText();
  navBtnT.fontName = {family:'Inter',style:'Medium'};
  navBtnT.characters = 'Comenzar';
  navBtnT.fontSize = 14;
  navBtnT.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  navBtn.appendChild(navBtnT);
  rightCta.appendChild(navBtn);
  nav.appendChild(rightCta);

  main.appendChild(nav);
  return 'Navbar done';
})()`);
console.log('  ✓ Navbar');

// ═══════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════
console.log('  → Hero...');

await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});

  const hero = figma.createFrame();
  hero.name = 'Hero';
  hero.resize(1440, 810);
  hero.layoutMode = 'HORIZONTAL';
  hero.primaryAxisSizingMode = 'FIXED';
  hero.counterAxisSizingMode = 'FIXED';
  hero.counterAxisAlignItems = 'CENTER';
  hero.paddingLeft = 96; hero.paddingRight = 96;
  hero.paddingTop = 80; hero.paddingBottom = 48;
  hero.itemSpacing = 48;
  hero.fills = [{type:'SOLID', color: h('#0B0E14')}];

  // Left col
  const left = figma.createFrame();
  left.name = 'Content';
  left.layoutMode = 'VERTICAL';
  left.primaryAxisSizingMode = 'AUTO';
  left.counterAxisSizingMode = 'FIXED';
  left.resize(600, 100);
  left.itemSpacing = 32;
  left.fills = [];
  left.layoutGrow = 1;

  // Badge
  const badge = figma.createFrame();
  badge.name = 'Badge';
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
  badgeT.fontSize = 12;
  badgeT.letterSpacing = {value: 1.5, unit: 'PIXELS'};
  badgeT.fills = [{type:'SOLID', color: h('#94A3B8')}];
  badge.appendChild(badgeT);
  left.appendChild(badge);

  // Title
  const t1 = figma.createText();
  t1.fontName = {family:'Space Grotesk',style:'Bold'};
  t1.characters = 'Tu Dinero,';
  t1.fontSize = 72;
  t1.lineHeight = {value: 76, unit: 'PIXELS'};
  t1.letterSpacing = {value: -2, unit: 'PIXELS'};
  t1.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  left.appendChild(t1);

  const t2 = figma.createText();
  t2.fontName = {family:'Space Grotesk',style:'Bold'};
  t2.characters = 'Reinventado.';
  t2.fontSize = 72;
  t2.lineHeight = {value: 76, unit: 'PIXELS'};
  t2.letterSpacing = {value: -2, unit: 'PIXELS'};
  t2.fills = [{
    type: 'GRADIENT_LINEAR',
    gradientStops: [
      { position: 0, color: { r: 0.39, g: 0.4, b: 0.95, a: 1 } },
      { position: 1, color: { r: 0.2, g: 0.83, b: 0.6, a: 1 } }
    ],
    gradientTransform: [[1, 0, 0], [0, 1, 0]]
  }];
  left.appendChild(t2);

  // Desc
  const desc = figma.createText();
  desc.fontName = {family:'Inter',style:'Regular'};
  desc.characters = 'NexVault es la billetera digital de nueva generacion que combina seguridad de grado militar con transacciones ultrarapidas. Envia, recibe y haz crecer tu dinero en todo el mundo.';
  desc.fontSize = 18;
  desc.lineHeight = {value: 28, unit: 'PIXELS'};
  desc.fills = [{type:'SOLID', color: h('#94A3B8')}];
  desc.resize(540, 10);
  desc.textAutoResize = 'HEIGHT';
  left.appendChild(desc);

  // Buttons
  const btns = figma.createFrame();
  btns.name = 'Buttons';
  btns.layoutMode = 'HORIZONTAL';
  btns.primaryAxisSizingMode = 'AUTO';
  btns.counterAxisSizingMode = 'AUTO';
  btns.itemSpacing = 16;
  btns.fills = [];

  const b1 = figma.createFrame();
  b1.name = 'Empieza Gratis';
  b1.layoutMode = 'HORIZONTAL';
  b1.primaryAxisAlignItems = 'CENTER';
  b1.counterAxisAlignItems = 'CENTER';
  b1.primaryAxisSizingMode = 'AUTO';
  b1.counterAxisSizingMode = 'AUTO';
  b1.paddingTop = 16; b1.paddingBottom = 16;
  b1.paddingLeft = 32; b1.paddingRight = 32;
  b1.cornerRadius = 16;
  b1.itemSpacing = 8;
  b1.fills = [{type:'SOLID', color: h('#6366F1')}];
  b1.effects = [{type:'DROP_SHADOW',color:{r:0.39,g:0.4,b:0.95,a:0.3},offset:{x:0,y:0},radius:20,visible:true,blendMode:'NORMAL',spread:0}];
  const b1t = figma.createText();
  b1t.fontName = {family:'Inter',style:'Semi Bold'};
  b1t.characters = 'Empieza Gratis';
  b1t.fontSize = 16;
  b1t.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  b1.appendChild(b1t);
  const arr = figma.createText();
  arr.fontName = {family:'Inter',style:'Regular'};
  arr.characters = '→';
  arr.fontSize = 16;
  arr.fills = [{type:'SOLID', color: h('#FFFFFF')}];
  b1.appendChild(arr);
  btns.appendChild(b1);

  const b2 = figma.createFrame();
  b2.name = 'Saber Mas';
  b2.layoutMode = 'HORIZONTAL';
  b2.primaryAxisAlignItems = 'CENTER';
  b2.counterAxisAlignItems = 'CENTER';
  b2.primaryAxisSizingMode = 'AUTO';
  b2.counterAxisSizingMode = 'AUTO';
  b2.paddingTop = 16; b2.paddingBottom = 16;
  b2.paddingLeft = 32; b2.paddingRight = 32;
  b2.cornerRadius = 16;
  b2.fills = [];
  b2.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.1}];
  b2.strokeWeight = 1;
  const b2t = figma.createText();
  b2t.fontName = {family:'Inter',style:'Semi Bold'};
  b2t.characters = 'Saber Mas';
  b2t.fontSize = 16;
  b2t.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  b2.appendChild(b2t);
  btns.appendChild(b2);
  left.appendChild(btns);

  // Social proof
  const social = figma.createFrame();
  social.name = 'Social Proof';
  social.layoutMode = 'HORIZONTAL';
  social.primaryAxisSizingMode = 'AUTO';
  social.counterAxisSizingMode = 'AUTO';
  social.counterAxisAlignItems = 'CENTER';
  social.itemSpacing = 16;
  social.fills = [];
  social.paddingTop = 16;

  const avStack = figma.createFrame();
  avStack.name = 'Avatars';
  avStack.layoutMode = 'HORIZONTAL';
  avStack.primaryAxisSizingMode = 'AUTO';
  avStack.counterAxisSizingMode = 'AUTO';
  avStack.itemSpacing = -12;
  avStack.fills = [];
  const grads = [
    [{r:0.39,g:0.4,b:0.95},{r:0.2,g:0.83,b:0.6}],
    [{r:0.2,g:0.83,b:0.6},{r:0.34,g:0.92,b:0.56}],
    [{r:0.49,g:0.45,b:0.98},{r:0.39,g:0.4,b:0.95}]
  ];
  for (const g of grads) {
    const av = figma.createEllipse();
    av.resize(40,40);
    av.fills = [{type:'GRADIENT_LINEAR',gradientStops:[{position:0,color:{...g[0],a:1}},{position:1,color:{...g[1],a:1}}],gradientTransform:[[0.7,0.7,0],[-0.7,0.7,0.5]]}];
    av.strokes = [{type:'SOLID', color: h('#0B0E14')}];
    av.strokeWeight = 2;
    avStack.appendChild(av);
  }
  social.appendChild(avStack);

  const sInfo = figma.createFrame();
  sInfo.name = 'Info';
  sInfo.layoutMode = 'VERTICAL';
  sInfo.primaryAxisSizingMode = 'AUTO';
  sInfo.counterAxisSizingMode = 'AUTO';
  sInfo.itemSpacing = 2;
  sInfo.fills = [];
  const s1 = figma.createText();
  s1.fontName = {family:'Inter',style:'Semi Bold'};
  s1.characters = '12,000+ usuarios';
  s1.fontSize = 14;
  s1.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  sInfo.appendChild(s1);
  const s2 = figma.createText();
  s2.fontName = {family:'Inter',style:'Regular'};
  s2.characters = 'se unieron este mes';
  s2.fontSize = 12;
  s2.fills = [{type:'SOLID', color: h('#94A3B8')}];
  sInfo.appendChild(s2);
  social.appendChild(sInfo);
  left.appendChild(social);
  hero.appendChild(left);

  // Right col — HERO IMAGE with actual image
  const right = figma.createFrame();
  right.name = 'Hero Image';
  right.resize(520, 640);
  right.cornerRadius = 24;
  right.fills = [{type:'IMAGE', imageHash:'${IMG.hero}', scaleMode:'FILL'}];
  right.effects = [{type:'DROP_SHADOW',color:{r:0,g:0,b:0,a:0.3},offset:{x:0,y:20},radius:60,visible:true,blendMode:'NORMAL',spread:-10}];
  hero.appendChild(right);

  main.appendChild(hero);
  return 'Hero done';
})()`);
console.log('  ✓ Hero (con imagen)');

// ═══════════════════════════════════════════════════════════
// MARQUEE
// ═══════════════════════════════════════════════════════════
console.log('  → Marquee...');
await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  const marquee = figma.createFrame();
  marquee.name = 'Marquee Partners';
  marquee.resize(1440, 64);
  marquee.layoutMode = 'HORIZONTAL';
  marquee.primaryAxisSizingMode = 'FIXED';
  marquee.counterAxisSizingMode = 'FIXED';
  marquee.primaryAxisAlignItems = 'CENTER';
  marquee.counterAxisAlignItems = 'CENTER';
  marquee.itemSpacing = 64;
  marquee.fills = [{type:'SOLID', color: h('#0B0E14')}];
  marquee.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.05}];
  marquee.strokeWeight = 1;
  marquee.strokeAlign = 'INSIDE';

  for (const name of ['Visa','Mastercard','Apple Pay','Google Pay','Stripe','Plaid','Coinbase']) {
    const t = figma.createText();
    t.fontName = {family:'Space Grotesk',style:'Medium'};
    t.characters = name;
    t.fontSize = 20;
    t.fills = [{type:'SOLID', color: h('#94A3B8'), opacity: 0.4}];
    marquee.appendChild(t);
  }
  main.appendChild(marquee);
  return 'Marquee done';
})()`);
console.log('  ✓ Marquee');

// ═══════════════════════════════════════════════════════════
// FEATURES
// ═══════════════════════════════════════════════════════════
console.log('  → Features...');
await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  const section = figma.createFrame();
  section.name = 'Features';
  section.resize(1440, 10);
  section.layoutMode = 'VERTICAL';
  section.primaryAxisSizingMode = 'AUTO';
  section.counterAxisSizingMode = 'FIXED';
  section.counterAxisAlignItems = 'CENTER';
  section.paddingTop = 80; section.paddingBottom = 80;
  section.paddingLeft = 96; section.paddingRight = 96;
  section.itemSpacing = 48;
  section.fills = [{type:'SOLID', color: h('#0B0E14')}];

  // Header
  const hdr = figma.createFrame();
  hdr.name = 'Header';
  hdr.layoutMode = 'VERTICAL';
  hdr.primaryAxisSizingMode = 'AUTO';
  hdr.counterAxisSizingMode = 'AUTO';
  hdr.counterAxisAlignItems = 'CENTER';
  hdr.itemSpacing = 16;
  hdr.fills = [];
  const hl = figma.createText();
  hl.fontName = {family:'Inter',style:'Semi Bold'};
  hl.characters = 'POR QUE NEXVAULT';
  hl.fontSize = 12; hl.letterSpacing = {value:2,unit:'PIXELS'};
  hl.fills = [{type:'SOLID', color: h('#34D399')}];
  hdr.appendChild(hl);
  const ht = figma.createText();
  ht.fontName = {family:'Space Grotesk',style:'Bold'};
  ht.characters = 'Construido para el futuro de las finanzas';
  ht.fontSize = 48; ht.lineHeight = {value:56,unit:'PIXELS'}; ht.letterSpacing = {value:-1,unit:'PIXELS'};
  ht.textAlignHorizontal = 'CENTER';
  ht.fills = [{type:'SOLID', color: h('#F8FAFC')}];
  hdr.appendChild(ht);
  const hd = figma.createText();
  hd.fontName = {family:'Inter',style:'Regular'};
  hd.characters = 'Tres pilares que hacen de NexVault la billetera digital mas confiable del mercado.';
  hd.fontSize = 18; hd.lineHeight = {value:28,unit:'PIXELS'};
  hd.textAlignHorizontal = 'CENTER';
  hd.fills = [{type:'SOLID', color: h('#94A3B8')}];
  hdr.appendChild(hd);
  section.appendChild(hdr);

  // Cards
  const grid = figma.createFrame();
  grid.name = 'Cards';
  grid.layoutMode = 'HORIZONTAL';
  grid.primaryAxisSizingMode = 'FIXED';
  grid.counterAxisSizingMode = 'AUTO';
  grid.resize(1248, 10);
  grid.itemSpacing = 24;
  grid.fills = [];

  const cards = [
    {icon:'🔒',title:'Seguridad de Grado Militar',desc:'Encriptacion AES de 256 bits, autenticacion biometrica y deteccion de fraude en tiempo real protegen cada transaccion que realizas.',img:'${IMG.security}',iconColor:'#6366F1'},
    {icon:'⚡',title:'Transferencias Instantaneas',desc:'Envia dinero a cualquier lugar en menos de 3 segundos. Nuestra red propia liquida transacciones 100 veces mas rapido que los bancos tradicionales.',img:'${IMG.speed}',iconColor:'#34D399'},
    {icon:'🌍',title:'180+ Paises',desc:'Soporte multimoneda con tasas de conversion en tiempo real. Cero comisiones ocultas en transferencias internacionales.',img:'${IMG.global}',iconColor:'#6366F1'},
  ];

  for (const cd of cards) {
    const card = figma.createFrame();
    card.name = cd.title;
    card.layoutMode = 'VERTICAL';
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'FIXED';
    card.resize(400, 10);
    card.paddingTop = 28; card.paddingBottom = 28;
    card.paddingLeft = 28; card.paddingRight = 28;
    card.itemSpacing = 16;
    card.cornerRadius = 20;
    card.fills = [{type:'SOLID', color: h('#151925'), opacity: 0.6}];
    card.strokes = [{type:'SOLID', color: {r:1,g:1,b:1}, opacity: 0.06}];
    card.strokeWeight = 1;
    card.effects = [{type:'BACKGROUND_BLUR', radius:16, visible:true}];
    card.layoutGrow = 1;

    // Image
    const img = figma.createFrame();
    img.name = 'Image';
    img.resize(344, 192);
    img.cornerRadius = 12;
    img.fills = [{type:'IMAGE', imageHash: cd.img, scaleMode:'FILL'}];
    img.clipsContent = true;
    card.appendChild(img);

    // Icon + title
    const titleRow = figma.createFrame();
    titleRow.name = 'Title';
    titleRow.layoutMode = 'HORIZONTAL';
    titleRow.primaryAxisSizingMode = 'AUTO';
    titleRow.counterAxisSizingMode = 'AUTO';
    titleRow.counterAxisAlignItems = 'CENTER';
    titleRow.itemSpacing = 12;
    titleRow.fills = [];
    const iconBox = figma.createFrame();
    iconBox.resize(40,40);
    iconBox.cornerRadius = 12;
    iconBox.fills = [{type:'SOLID', color: h(cd.iconColor), opacity: 0.1}];
    iconBox.layoutMode = 'VERTICAL';
    iconBox.primaryAxisAlignItems = 'CENTER';
    iconBox.counterAxisAlignItems = 'CENTER';
    const iconT = figma.createText();
    iconT.fontName = {family:'Inter',style:'Regular'};
    iconT.characters = cd.icon;
    iconT.fontSize = 18;
    iconBox.appendChild(iconT);
    titleRow.appendChild(iconBox);
    const cardT = figma.createText();
    cardT.fontName = {family:'Space Grotesk',style:'Medium'};
    cardT.characters = cd.title;
    cardT.fontSize = 20;
    cardT.fills = [{type:'SOLID', color: h('#F8FAFC')}];
    titleRow.appendChild(cardT);
    card.appendChild(titleRow);

    const cardD = figma.createText();
    cardD.fontName = {family:'Inter',style:'Regular'};
    cardD.characters = cd.desc;
    cardD.fontSize = 14; cardD.lineHeight = {value:22,unit:'PIXELS'};
    cardD.fills = [{type:'SOLID', color: h('#94A3B8')}];
    cardD.resize(344, 10);
    cardD.textAutoResize = 'HEIGHT';
    card.appendChild(cardD);
    grid.appendChild(card);
  }
  section.appendChild(grid);
  main.appendChild(section);
  return 'Features done';
})()`);
console.log('  ✓ Features (con imagenes)');

// ═══════════════════════════════════════════════════════════
// HOW IT WORKS + STATS + TESTIMONIALS + CTA + FOOTER
// ═══════════════════════════════════════════════════════════
console.log('  → How It Works, Stats, Testimonials, CTA, Footer...');

await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  // ═══ HOW IT WORKS ═══
  const how = figma.createFrame();
  how.name = 'How It Works';
  how.resize(1440, 10);
  how.layoutMode = 'VERTICAL';
  how.primaryAxisSizingMode = 'AUTO';
  how.counterAxisSizingMode = 'FIXED';
  how.counterAxisAlignItems = 'CENTER';
  how.paddingTop = 80; how.paddingBottom = 80;
  how.paddingLeft = 96; how.paddingRight = 96;
  how.itemSpacing = 48;
  how.fills = [{type:'SOLID', color: h('#0B0E14')}];

  const howL = figma.createText(); howL.fontName={family:'Inter',style:'Semi Bold'}; howL.characters='COMO FUNCIONA'; howL.fontSize=12; howL.letterSpacing={value:2,unit:'PIXELS'}; howL.fills=[{type:'SOLID',color:h('#34D399')}]; how.appendChild(howL);
  const howT = figma.createText(); howT.fontName={family:'Space Grotesk',style:'Bold'}; howT.characters='Listo en minutos'; howT.fontSize=48; howT.letterSpacing={value:-1,unit:'PIXELS'}; howT.fills=[{type:'SOLID',color:h('#F8FAFC')}]; how.appendChild(howT);

  const steps = figma.createFrame(); steps.name='Steps'; steps.layoutMode='HORIZONTAL'; steps.primaryAxisSizingMode='FIXED'; steps.counterAxisSizingMode='AUTO'; steps.resize(1248,10); steps.itemSpacing=40; steps.fills=[];
  const stData = [{n:'1',t:'Crea tu Cuenta',d:'Registrate en 30 segundos solo con tu correo. Sin papeleo, sin ir al banco.',c:'#6366F1'},{n:'2',t:'Vincula tu Banco',d:'Conecta tu banco o tarjeta de forma segura. Tus credenciales nunca se almacenan.',c:'#6366F1'},{n:'3',t:'Envia y Gana',d:'Transfiere dinero al instante, gana cashback en cada transaccion y mira como crece tu saldo.',c:'#34D399'}];
  for (const s of stData) {
    const step = figma.createFrame(); step.name='Step '+s.n; step.layoutMode='VERTICAL'; step.primaryAxisSizingMode='AUTO'; step.counterAxisSizingMode='FIXED'; step.counterAxisAlignItems='CENTER'; step.resize(380,10); step.itemSpacing=16; step.fills=[]; step.layoutGrow=1;
    const numBox = figma.createFrame(); numBox.resize(56,56); numBox.cornerRadius=16; numBox.fills=[{type:'SOLID',color:h(s.c),opacity:0.1}]; numBox.strokes=[{type:'SOLID',color:h(s.c),opacity:0.2}]; numBox.strokeWeight=1; numBox.layoutMode='VERTICAL'; numBox.primaryAxisAlignItems='CENTER'; numBox.counterAxisAlignItems='CENTER';
    const numT = figma.createText(); numT.fontName={family:'Space Grotesk',style:'Bold'}; numT.characters=s.n; numT.fontSize=20; numT.fills=[{type:'SOLID',color:h(s.c)}]; numBox.appendChild(numT); step.appendChild(numBox);
    const stT = figma.createText(); stT.fontName={family:'Space Grotesk',style:'Medium'}; stT.characters=s.t; stT.fontSize=18; stT.fills=[{type:'SOLID',color:h('#F8FAFC')}]; step.appendChild(stT);
    const stD = figma.createText(); stD.fontName={family:'Inter',style:'Regular'}; stD.characters=s.d; stD.fontSize=14; stD.lineHeight={value:22,unit:'PIXELS'}; stD.textAlignHorizontal='CENTER'; stD.fills=[{type:'SOLID',color:h('#94A3B8')}]; stD.resize(320,10); stD.textAutoResize='HEIGHT'; step.appendChild(stD);
    steps.appendChild(step);
  }
  how.appendChild(steps);
  main.appendChild(how);

  // ═══ STATS ═══
  const stats = figma.createFrame(); stats.name='Stats'; stats.resize(1440,10); stats.layoutMode='VERTICAL'; stats.primaryAxisSizingMode='AUTO'; stats.counterAxisSizingMode='FIXED'; stats.counterAxisAlignItems='CENTER'; stats.paddingTop=80; stats.paddingBottom=80; stats.paddingLeft=96; stats.paddingRight=96; stats.fills=[{type:'SOLID',color:h('#0B0E14')}];
  const sCard = figma.createFrame(); sCard.name='Stats Card'; sCard.resize(1248,10); sCard.layoutMode='HORIZONTAL'; sCard.primaryAxisSizingMode='FIXED'; sCard.counterAxisSizingMode='AUTO'; sCard.paddingTop=40; sCard.paddingBottom=40; sCard.paddingLeft=40; sCard.paddingRight=40; sCard.cornerRadius=24; sCard.fills=[{type:'SOLID',color:h('#151925'),opacity:0.5}]; sCard.strokes=[{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.06}]; sCard.strokeWeight=1; sCard.effects=[{type:'BACKGROUND_BLUR',radius:20,visible:true}];
  const sData = [{v:'S/ 8.5B',l:'Volumen Transaccionado',grad:true},{v:'180+',l:'Paises Soportados',c:'#F8FAFC'},{v:'99.99%',l:'Garantia de Disponibilidad',c:'#34D399'},{v:'< 3s',l:'Velocidad de Transferencia',c:'#F8FAFC'}];
  for (const sd of sData) {
    const si = figma.createFrame(); si.name=sd.l; si.layoutMode='VERTICAL'; si.primaryAxisSizingMode='AUTO'; si.counterAxisSizingMode='FIXED'; si.counterAxisAlignItems='CENTER'; si.resize(290,10); si.itemSpacing=8; si.fills=[]; si.layoutGrow=1;
    const sv = figma.createText(); sv.fontName={family:'Space Grotesk',style:'Bold'}; sv.characters=sd.v; sv.fontSize=48; sv.textAlignHorizontal='CENTER';
    if (sd.grad) { sv.fills=[{type:'GRADIENT_LINEAR',gradientStops:[{position:0,color:{r:0.39,g:0.4,b:0.95,a:1}},{position:1,color:{r:0.2,g:0.83,b:0.6,a:1}}],gradientTransform:[[1,0,0],[0,1,0]]}]; }
    else { sv.fills=[{type:'SOLID',color:h(sd.c)}]; }
    si.appendChild(sv);
    const sl = figma.createText(); sl.fontName={family:'Inter',style:'Regular'}; sl.characters=sd.l; sl.fontSize=14; sl.textAlignHorizontal='CENTER'; sl.fills=[{type:'SOLID',color:h('#94A3B8')}]; si.appendChild(sl);
    sCard.appendChild(si);
  }
  stats.appendChild(sCard);
  main.appendChild(stats);

  // ═══ TESTIMONIALS ═══
  const test = figma.createFrame(); test.name='Testimonials'; test.resize(1440,10); test.layoutMode='VERTICAL'; test.primaryAxisSizingMode='AUTO'; test.counterAxisSizingMode='FIXED'; test.counterAxisAlignItems='CENTER'; test.paddingTop=80; test.paddingBottom=80; test.paddingLeft=96; test.paddingRight=96; test.itemSpacing=48; test.fills=[{type:'SOLID',color:h('#0B0E14')}];
  const tL = figma.createText(); tL.fontName={family:'Inter',style:'Semi Bold'}; tL.characters='TESTIMONIOS'; tL.fontSize=12; tL.letterSpacing={value:2,unit:'PIXELS'}; tL.fills=[{type:'SOLID',color:h('#34D399')}]; test.appendChild(tL);
  const tT = figma.createText(); tT.fontName={family:'Space Grotesk',style:'Bold'}; tT.characters='Miles ya confian en nosotros'; tT.fontSize=48; tT.letterSpacing={value:-1,unit:'PIXELS'}; tT.fills=[{type:'SOLID',color:h('#F8FAFC')}]; test.appendChild(tT);

  const tGrid = figma.createFrame(); tGrid.name='Cards'; tGrid.layoutMode='HORIZONTAL'; tGrid.primaryAxisSizingMode='FIXED'; tGrid.counterAxisSizingMode='AUTO'; tGrid.resize(1248,10); tGrid.itemSpacing=24; tGrid.fills=[];
  const tData = [
    {q:'"Envie S/ 5,000 a mi familia en provincia en 2 segundos. Sin comisiones. NexVault es realmente el futuro del dinero."',n:'Carolina Mendoza',r:'Diseñadora Freelance',img:'${IMG.carolina}'},
    {q:'"Como fundador de startup, necesito pagar a colaboradores en 8 paises. NexVault lo maneja todo sin friccion. Un cambio total."',n:'Diego Ramirez',r:'CEO, BuildStack',img:'${IMG.diego}'},
    {q:'"El cashback en cada transaccion es increible. He ganado S/ 1,200 solo por gastar normalmente. Es basicamente dinero gratis."',n:'Valeria Torres',r:'Cientifica de Datos',img:'${IMG.valeria}'},
  ];
  for (const td of tData) {
    const tc = figma.createFrame(); tc.name=td.n; tc.layoutMode='VERTICAL'; tc.primaryAxisSizingMode='AUTO'; tc.counterAxisSizingMode='FIXED'; tc.resize(400,10); tc.paddingTop=28; tc.paddingBottom=28; tc.paddingLeft=28; tc.paddingRight=28; tc.itemSpacing=16; tc.cornerRadius=20; tc.fills=[{type:'SOLID',color:h('#151925'),opacity:0.6}]; tc.strokes=[{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.06}]; tc.strokeWeight=1; tc.layoutGrow=1;
    const stars = figma.createText(); stars.fontName={family:'Inter',style:'Regular'}; stars.characters='★ ★ ★ ★ ★'; stars.fontSize=14; stars.fills=[{type:'SOLID',color:h('#34D399')}]; tc.appendChild(stars);
    const quote = figma.createText(); quote.fontName={family:'Inter',style:'Regular'}; quote.characters=td.q; quote.fontSize=14; quote.lineHeight={value:22,unit:'PIXELS'}; quote.fills=[{type:'SOLID',color:h('#F8FAFC')}]; quote.resize(344,10); quote.textAutoResize='HEIGHT'; tc.appendChild(quote);
    const aRow = figma.createFrame(); aRow.name='Author'; aRow.layoutMode='HORIZONTAL'; aRow.primaryAxisSizingMode='AUTO'; aRow.counterAxisSizingMode='AUTO'; aRow.counterAxisAlignItems='CENTER'; aRow.itemSpacing=12; aRow.fills=[];
    const avatar = figma.createEllipse(); avatar.resize(40,40); avatar.fills=[{type:'IMAGE',imageHash:td.img,scaleMode:'FILL'}]; avatar.strokes=[{type:'SOLID',color:h('#6366F1'),opacity:0.3}]; avatar.strokeWeight=2; aRow.appendChild(avatar);
    const aInfo = figma.createFrame(); aInfo.layoutMode='VERTICAL'; aInfo.primaryAxisSizingMode='AUTO'; aInfo.counterAxisSizingMode='AUTO'; aInfo.itemSpacing=2; aInfo.fills=[];
    const aN = figma.createText(); aN.fontName={family:'Inter',style:'Semi Bold'}; aN.characters=td.n; aN.fontSize=14; aN.fills=[{type:'SOLID',color:h('#F8FAFC')}]; aInfo.appendChild(aN);
    const aR = figma.createText(); aR.fontName={family:'Inter',style:'Regular'}; aR.characters=td.r; aR.fontSize=12; aR.fills=[{type:'SOLID',color:h('#94A3B8')}]; aInfo.appendChild(aR);
    aRow.appendChild(aInfo); tc.appendChild(aRow); tGrid.appendChild(tc);
  }
  test.appendChild(tGrid);
  main.appendChild(test);

  // ═══ CTA ═══
  const cta = figma.createFrame(); cta.name='CTA'; cta.resize(1440,10); cta.layoutMode='VERTICAL'; cta.primaryAxisSizingMode='AUTO'; cta.counterAxisSizingMode='FIXED'; cta.counterAxisAlignItems='CENTER'; cta.paddingTop=80; cta.paddingBottom=80; cta.paddingLeft=200; cta.paddingRight=200; cta.fills=[{type:'SOLID',color:h('#0B0E14')}];
  const ctaC = figma.createFrame(); ctaC.name='CTA Card'; ctaC.resize(1040,10); ctaC.layoutMode='VERTICAL'; ctaC.primaryAxisSizingMode='AUTO'; ctaC.counterAxisSizingMode='FIXED'; ctaC.counterAxisAlignItems='CENTER'; ctaC.paddingTop=64; ctaC.paddingBottom=64; ctaC.paddingLeft=64; ctaC.paddingRight=64; ctaC.itemSpacing=24; ctaC.cornerRadius=24; ctaC.fills=[{type:'SOLID',color:h('#151925'),opacity:0.5}]; ctaC.strokes=[{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.06}]; ctaC.strokeWeight=1; ctaC.effects=[{type:'BACKGROUND_BLUR',radius:20,visible:true}];
  const ct1 = figma.createText(); ct1.fontName={family:'Space Grotesk',style:'Bold'}; ct1.characters='Listo para tomar'; ct1.fontSize=56; ct1.lineHeight={value:64,unit:'PIXELS'}; ct1.textAlignHorizontal='CENTER'; ct1.fills=[{type:'SOLID',color:h('#F8FAFC')}]; ctaC.appendChild(ct1);
  const ct2 = figma.createText(); ct2.fontName={family:'Space Grotesk',style:'Bold'}; ct2.characters='el control?'; ct2.fontSize=56; ct2.lineHeight={value:64,unit:'PIXELS'}; ct2.textAlignHorizontal='CENTER'; ct2.fills=[{type:'GRADIENT_LINEAR',gradientStops:[{position:0,color:{r:0.39,g:0.4,b:0.95,a:1}},{position:1,color:{r:0.2,g:0.83,b:0.6,a:1}}],gradientTransform:[[1,0,0],[0,1,0]]}]; ctaC.appendChild(ct2);
  const ctD = figma.createText(); ctD.fontName={family:'Inter',style:'Regular'}; ctD.characters='Unete a las 12,000+ personas que ya dieron el salto.\\nSin comisiones los primeros 3 meses.'; ctD.fontSize=18; ctD.lineHeight={value:28,unit:'PIXELS'}; ctD.textAlignHorizontal='CENTER'; ctD.fills=[{type:'SOLID',color:h('#94A3B8')}]; ctaC.appendChild(ctD);
  const ctBtn = figma.createFrame(); ctBtn.name='Button'; ctBtn.layoutMode='HORIZONTAL'; ctBtn.primaryAxisAlignItems='CENTER'; ctBtn.counterAxisAlignItems='CENTER'; ctBtn.primaryAxisSizingMode='AUTO'; ctBtn.counterAxisSizingMode='AUTO'; ctBtn.paddingTop=16; ctBtn.paddingBottom=16; ctBtn.paddingLeft=40; ctBtn.paddingRight=40; ctBtn.cornerRadius=16; ctBtn.itemSpacing=8; ctBtn.fills=[{type:'SOLID',color:h('#6366F1')}]; ctBtn.effects=[{type:'DROP_SHADOW',color:{r:0.39,g:0.4,b:0.95,a:0.3},offset:{x:0,y:0},radius:20,visible:true,blendMode:'NORMAL',spread:0}];
  const ctBT = figma.createText(); ctBT.fontName={family:'Inter',style:'Semi Bold'}; ctBT.characters='Crear Cuenta Gratis'; ctBT.fontSize=18; ctBT.fills=[{type:'SOLID',color:h('#FFFFFF')}]; ctBtn.appendChild(ctBT);
  const ctArr = figma.createText(); ctArr.fontName={family:'Inter',style:'Regular'}; ctArr.characters='→'; ctArr.fontSize=18; ctArr.fills=[{type:'SOLID',color:h('#FFFFFF')}]; ctBtn.appendChild(ctArr);
  ctaC.appendChild(ctBtn);
  const ctNote = figma.createText(); ctNote.fontName={family:'Inter',style:'Regular'}; ctNote.characters='Sin tarjeta de credito. Cancela cuando quieras.'; ctNote.fontSize=12; ctNote.fills=[{type:'SOLID',color:h('#94A3B8')}]; ctaC.appendChild(ctNote);
  cta.appendChild(ctaC);
  main.appendChild(cta);

  // ═══ FOOTER ═══
  const footer = figma.createFrame(); footer.name='Footer'; footer.resize(1440,10); footer.layoutMode='VERTICAL'; footer.primaryAxisSizingMode='AUTO'; footer.counterAxisSizingMode='FIXED'; footer.paddingTop=40; footer.paddingBottom=40; footer.paddingLeft=96; footer.paddingRight=96; footer.itemSpacing=32; footer.fills=[{type:'SOLID',color:h('#0B0E14')}]; footer.strokes=[{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.05}]; footer.strokeWeight=1; footer.strokeAlign='INSIDE';
  const fGrid = figma.createFrame(); fGrid.name='Grid'; fGrid.layoutMode='HORIZONTAL'; fGrid.primaryAxisSizingMode='FIXED'; fGrid.counterAxisSizingMode='AUTO'; fGrid.resize(1248,10); fGrid.itemSpacing=40; fGrid.fills=[];
  const fCols = [
    {title:null,items:[{t:'NexVault',b:true},{t:'La billetera digital de nueva generacion para un mundo sin fronteras.',b:false}]},
    {title:'PRODUCTO',items:[{t:'Beneficios'},{t:'Precios'},{t:'Seguridad'},{t:'API'}]},
    {title:'EMPRESA',items:[{t:'Nosotros'},{t:'Empleos'},{t:'Blog'},{t:'Prensa'}]},
    {title:'LEGAL',items:[{t:'Privacidad'},{t:'Terminos'},{t:'Cookies'}]},
  ];
  for (const col of fCols) {
    const cf = figma.createFrame(); cf.name=col.title||'Brand'; cf.layoutMode='VERTICAL'; cf.primaryAxisSizingMode='AUTO'; cf.counterAxisSizingMode='FIXED'; cf.resize(290,10); cf.itemSpacing=12; cf.fills=[]; cf.layoutGrow=1;
    if (col.title) { const ct = figma.createText(); ct.fontName={family:'Inter',style:'Semi Bold'}; ct.characters=col.title; ct.fontSize=12; ct.letterSpacing={value:1.5,unit:'PIXELS'}; ct.fills=[{type:'SOLID',color:h('#94A3B8')}]; cf.appendChild(ct); }
    for (const item of col.items) {
      const it = figma.createText();
      if (item.b) { it.fontName={family:'Space Grotesk',style:'Bold'}; it.fontSize=18; it.fills=[{type:'SOLID',color:h('#F8FAFC')}]; }
      else { it.fontName={family:'Inter',style:'Regular'}; it.fontSize=14; it.lineHeight={value:22,unit:'PIXELS'}; it.fills=[{type:'SOLID',color:h('#94A3B8')}]; if (!col.title && !item.b) { it.resize(260,10); it.textAutoResize='HEIGHT'; } }
      it.characters = item.t;
      cf.appendChild(it);
    }
    fGrid.appendChild(cf);
  }
  footer.appendChild(fGrid);
  const copy = figma.createText(); copy.fontName={family:'Inter',style:'Regular'}; copy.characters='© 2026 NexVault. Todos los derechos reservados.'; copy.fontSize=12; copy.fills=[{type:'SOLID',color:h('#94A3B8')}]; footer.appendChild(copy);
  main.appendChild(footer);

  figma.viewport.scrollAndZoomIntoView([main]);
  return 'All sections done. Total height: ' + Math.round(main.height) + 'px';
})()`);
console.log('  ✓ How It Works, Stats, Testimonials, CTA, Footer');

console.log('\n' + '═'.repeat(50));
console.log('✅ Landing page reconstruida completamente');
console.log('═'.repeat(50));

client.close();
