/**
 * NexVault — Fix broken sections in Figma Landing
 * Uses async API (setFillStyleIdAsync, setTextStyleIdAsync, setStrokeStyleIdAsync)
 */
import { FigmaClient } from './src/figma-client.js';

const client = new FigmaClient();
await client.connect();
console.log('✓ Conectado a Figma');

async function run(code) { return await client.eval(code); }

// ═══════════════════════════════════════════════════════════
// FIX 1: FEATURES SECTION
// ═══════════════════════════════════════════════════════════
console.log('\n🔧 Rebuilding Features Cards...');

const featResult = await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  
  const ps = await figma.getLocalPaintStylesAsync();
  const txs = await figma.getLocalTextStylesAsync();
  function gps(n) { const s = ps.find(s => s.name === n); return s ? s.id : null; }
  function gts(n) { const s = txs.find(s => s.name === n); return s ? s.id : null; }

  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Inter',style:'Medium'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  await figma.setCurrentPageAsync(page);
  const main = page.children[0];
  const features = main.children.find(c => c.name === 'Features');
  if (!features) return 'Features not found';

  const oldCards = features.children.find(c => c.name === 'Cards');
  if (oldCards) oldCards.remove();

  const cards = figma.createFrame();
  cards.name = 'Cards';
  cards.layoutMode = 'HORIZONTAL';
  cards.primaryAxisSizingMode = 'FIXED';
  cards.counterAxisSizingMode = 'AUTO';
  cards.resize(1248, 100);
  cards.itemSpacing = 24;
  cards.fills = [];

  const featureData = [
    {title:'Seguridad de Grado Militar',desc:'Encriptacion AES de 256 bits, autenticacion biometrica y deteccion de fraude en tiempo real protegen cada transaccion que realizas.',icon:'🔒',ic:'#6366F1',img:'cc05d433511401ff5f517af8590f9ae1b1bb87c0'},
    {title:'Transferencias Instantaneas',desc:'Envia dinero a cualquier lugar en menos de 3 segundos. Nuestra red propia liquida transacciones 100 veces mas rapido que los bancos tradicionales.',icon:'⚡',ic:'#34D399',img:'97182989c6e507f1743a74b032aa60f5afb910a8'},
    {title:'180+ Paises',desc:'Soporte multimoneda con tasas de conversion en tiempo real. Cero comisiones ocultas en transferencias internacionales.',icon:'🌍',ic:'#6366F1',img:'a231f1ad239e37342152404043b5aac170921411'}
  ];

  for (const fd of featureData) {
    const card = figma.createFrame();
    card.name = fd.title;
    card.layoutMode = 'VERTICAL';
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'FIXED';
    card.layoutGrow = 1;
    card.paddingTop = 24; card.paddingBottom = 24;
    card.paddingLeft = 24; card.paddingRight = 24;
    card.itemSpacing = 16;
    card.cornerRadius = 20;
    card.fills = [{type:'SOLID',color:h('#151925'),opacity:0.6}];
    card.strokes = [{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.06}];
    card.strokeWeight = 1;
    card.effects = [{type:'BACKGROUND_BLUR',radius:16,visible:true}];
    const bgId = gps('Effect / bg-surface/60');
    if (bgId) await card.setFillStyleIdAsync(bgId);
    const bId = gps('Border / border-white/5');
    if (bId) await card.setStrokeStyleIdAsync(bId);

    const imgFrame = figma.createFrame();
    imgFrame.name = 'Image';
    imgFrame.resize(300, 192);
    imgFrame.layoutAlign = 'STRETCH';
    imgFrame.cornerRadius = 12;
    imgFrame.fills = [{type:'IMAGE',imageHash:fd.img,scaleMode:'FILL'}];
    card.appendChild(imgFrame);

    const titleRow = figma.createFrame();
    titleRow.name = 'Title Row';
    titleRow.layoutMode = 'HORIZONTAL';
    titleRow.primaryAxisSizingMode = 'AUTO';
    titleRow.counterAxisSizingMode = 'AUTO';
    titleRow.counterAxisAlignItems = 'CENTER';
    titleRow.itemSpacing = 12;
    titleRow.fills = [];
    titleRow.layoutAlign = 'STRETCH';

    const iconBox = figma.createFrame();
    iconBox.resize(40, 40);
    iconBox.cornerRadius = 12;
    iconBox.fills = [{type:'SOLID',color:h(fd.ic),opacity:0.1}];
    iconBox.layoutMode = 'VERTICAL';
    iconBox.primaryAxisAlignItems = 'CENTER';
    iconBox.counterAxisAlignItems = 'CENTER';
    const iconText = figma.createText();
    iconText.fontName = {family:'Inter',style:'Regular'};
    iconText.characters = fd.icon;
    iconText.fontSize = 18;
    iconText.fills = [{type:'SOLID',color:h(fd.ic)}];
    iconBox.appendChild(iconText);
    titleRow.appendChild(iconBox);

    const title = figma.createText();
    title.fontName = {family:'Space Grotesk',style:'Medium'};
    title.characters = fd.title;
    title.fontSize = 20;
    title.fills = [{type:'SOLID',color:h('#F8FAFC')}];
    const tTs = gts('font-display / text-xl font-semibold');
    if (tTs) await title.setTextStyleIdAsync(tTs);
    const tFs = gps('Text / text-text-main');
    if (tFs) await title.setFillStyleIdAsync(tFs);
    titleRow.appendChild(title);
    card.appendChild(titleRow);

    const desc = figma.createText();
    desc.fontName = {family:'Inter',style:'Regular'};
    desc.characters = fd.desc;
    desc.fontSize = 14;
    desc.lineHeight = {value:22,unit:'PIXELS'};
    desc.fills = [{type:'SOLID',color:h('#94A3B8')}];
    desc.layoutAlign = 'STRETCH';
    desc.textAutoResize = 'HEIGHT';
    const dTs = gts('font-body / text-sm leading-relaxed');
    if (dTs) await desc.setTextStyleIdAsync(dTs);
    const dFs = gps('Text / text-text-muted');
    if (dFs) await desc.setFillStyleIdAsync(dFs);
    card.appendChild(desc);

    cards.appendChild(card);
  }

  features.appendChild(cards);
  features.primaryAxisSizingMode = 'AUTO';
  return 'Features rebuilt. Cards height: ' + Math.round(cards.height) + 'px';
})()`);
console.log('✓ ' + featResult);

// ═══════════════════════════════════════════════════════════
// FIX 2: HOW IT WORKS
// ═══════════════════════════════════════════════════════════
console.log('\n🔧 Rebuilding How It Works Steps...');

const stepsResult = await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  const ps = await figma.getLocalPaintStylesAsync();
  const txs = await figma.getLocalTextStylesAsync();
  function gps(n) { return (ps.find(s => s.name === n) || {}).id; }
  function gts(n) { return (txs.find(s => s.name === n) || {}).id; }

  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  const section = main.children.find(c => c.name === 'How It Works');
  if (!section) return 'not found';

  const old = section.children.find(c => c.name === 'Steps');
  if (old) old.remove();

  const steps = figma.createFrame();
  steps.name = 'Steps';
  steps.layoutMode = 'HORIZONTAL';
  steps.primaryAxisSizingMode = 'FIXED';
  steps.counterAxisSizingMode = 'AUTO';
  steps.resize(1248, 100);
  steps.itemSpacing = 32;
  steps.fills = [];

  const data = [
    {num:'1',title:'Crea tu Cuenta',desc:'Registrate en 30 segundos solo con tu correo. Sin papeleo, sin ir al banco.',c:'#6366F1'},
    {num:'2',title:'Vincula tu Banco',desc:'Conecta tu banco o tarjeta de forma segura. Tus credenciales nunca se almacenan.',c:'#6366F1'},
    {num:'3',title:'Envia y Gana',desc:'Transfiere dinero al instante, gana cashback en cada transaccion y mira como crece tu saldo.',c:'#34D399'},
  ];

  for (const sd of data) {
    const step = figma.createFrame();
    step.name = sd.title;
    step.layoutMode = 'VERTICAL';
    step.primaryAxisSizingMode = 'AUTO';
    step.counterAxisSizingMode = 'FIXED';
    step.layoutGrow = 1;
    step.counterAxisAlignItems = 'CENTER';
    step.itemSpacing = 16;
    step.fills = [];

    const numBox = figma.createFrame();
    numBox.resize(56, 56);
    numBox.cornerRadius = 16;
    numBox.fills = [{type:'SOLID',color:h(sd.c),opacity:0.1}];
    numBox.strokes = [{type:'SOLID',color:h(sd.c),opacity:0.2}];
    numBox.strokeWeight = 1;
    numBox.layoutMode = 'VERTICAL';
    numBox.primaryAxisAlignItems = 'CENTER';
    numBox.counterAxisAlignItems = 'CENTER';
    const num = figma.createText();
    num.fontName = {family:'Space Grotesk',style:'Bold'};
    num.characters = sd.num;
    num.fontSize = 20;
    num.fills = [{type:'SOLID',color:h(sd.c)}];
    const nFs = sd.c === '#6366F1' ? gps('Text / text-primary') : gps('Text / text-accent');
    if (nFs) await num.setFillStyleIdAsync(nFs);
    numBox.appendChild(num);
    step.appendChild(numBox);

    const title = figma.createText();
    title.fontName = {family:'Space Grotesk',style:'Medium'};
    title.characters = sd.title;
    title.fontSize = 18;
    title.fills = [{type:'SOLID',color:h('#F8FAFC')}];
    title.textAlignHorizontal = 'CENTER';
    const tTs = gts('font-display / text-lg font-semibold');
    if (tTs) await title.setTextStyleIdAsync(tTs);
    const tFs = gps('Text / text-text-main');
    if (tFs) await title.setFillStyleIdAsync(tFs);
    step.appendChild(title);

    const desc = figma.createText();
    desc.fontName = {family:'Inter',style:'Regular'};
    desc.characters = sd.desc;
    desc.fontSize = 14;
    desc.lineHeight = {value:22,unit:'PIXELS'};
    desc.fills = [{type:'SOLID',color:h('#94A3B8')}];
    desc.textAlignHorizontal = 'CENTER';
    desc.layoutAlign = 'STRETCH';
    desc.textAutoResize = 'HEIGHT';
    const dTs = gts('font-body / text-sm leading-relaxed');
    if (dTs) await desc.setTextStyleIdAsync(dTs);
    const dFs = gps('Text / text-text-muted');
    if (dFs) await desc.setFillStyleIdAsync(dFs);
    step.appendChild(desc);

    steps.appendChild(step);
  }

  section.appendChild(steps);
  section.primaryAxisSizingMode = 'AUTO';
  return 'Steps rebuilt. Height: ' + Math.round(steps.height) + 'px';
})()`);
console.log('✓ ' + stepsResult);

// ═══════════════════════════════════════════════════════════
// FIX 3: STATS
// ═══════════════════════════════════════════════════════════
console.log('\n🔧 Rebuilding Stats...');

const statsResult = await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  const ps = await figma.getLocalPaintStylesAsync();
  const txs = await figma.getLocalTextStylesAsync();
  function gps(n) { return (ps.find(s => s.name === n) || {}).id; }
  function gts(n) { return (txs.find(s => s.name === n) || {}).id; }

  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});

  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  const section = main.children.find(c => c.name === 'Stats');
  if (!section) return 'not found';

  const old = section.children.find(c => c.name === 'Stats Card');
  if (old) old.remove();

  const card = figma.createFrame();
  card.name = 'Stats Card';
  card.layoutMode = 'HORIZONTAL';
  card.primaryAxisSizingMode = 'FIXED';
  card.counterAxisSizingMode = 'AUTO';
  card.resize(1248, 100);
  card.paddingTop = 48; card.paddingBottom = 48;
  card.paddingLeft = 48; card.paddingRight = 48;
  card.itemSpacing = 32;
  card.cornerRadius = 24;
  card.fills = [{type:'SOLID',color:h('#151925'),opacity:0.5}];
  card.strokes = [{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.06}];
  card.strokeWeight = 1;
  card.effects = [{type:'BACKGROUND_BLUR',radius:20,visible:true}];
  const bgId = gps('Effect / bg-surface/50');
  if (bgId) await card.setFillStyleIdAsync(bgId);

  const stats = [
    {value:'S/ 8.5B',label:'Volumen Transaccionado',gradient:true},
    {value:'180+',label:'Paises Soportados',color:'#FFFFFF'},
    {value:'99.99%',label:'Garantia de Disponibilidad',color:'#34D399'},
    {value:'< 3s',label:'Velocidad de Transferencia',color:'#FFFFFF'},
  ];

  for (const st of stats) {
    const col = figma.createFrame();
    col.name = st.value;
    col.layoutMode = 'VERTICAL';
    col.primaryAxisSizingMode = 'AUTO';
    col.counterAxisSizingMode = 'FIXED';
    col.layoutGrow = 1;
    col.counterAxisAlignItems = 'CENTER';
    col.itemSpacing = 8;
    col.fills = [];

    const val = figma.createText();
    val.fontName = {family:'Space Grotesk',style:'Bold'};
    val.characters = st.value;
    val.fontSize = 48;
    val.lineHeight = {value:56,unit:'PIXELS'};
    val.letterSpacing = {value:-1,unit:'PIXELS'};
    val.textAlignHorizontal = 'CENTER';
    if (st.gradient) {
      val.fills = [{type:'GRADIENT_LINEAR',gradientStops:[{position:0,color:{r:0.39,g:0.4,b:0.95,a:1}},{position:1,color:{r:0.2,g:0.83,b:0.6,a:1}}],gradientTransform:[[1,0,0],[0,1,0]]}];
      const gId = gps('Effect / text-gradient (primary→accent)');
      if (gId) await val.setFillStyleIdAsync(gId);
    } else {
      val.fills = [{type:'SOLID',color:h(st.color)}];
      const cId = st.color === '#34D399' ? gps('Text / text-accent') : gps('Text / text-white');
      if (cId) await val.setFillStyleIdAsync(cId);
    }
    const vTs = gts('font-display / text-5xl font-bold (stat)');
    if (vTs) await val.setTextStyleIdAsync(vTs);
    col.appendChild(val);

    const label = figma.createText();
    label.fontName = {family:'Inter',style:'Regular'};
    label.characters = st.label;
    label.fontSize = 14;
    label.fills = [{type:'SOLID',color:h('#94A3B8')}];
    label.textAlignHorizontal = 'CENTER';
    const lTs = gts('font-body / text-sm');
    if (lTs) await label.setTextStyleIdAsync(lTs);
    const lFs = gps('Text / text-text-muted');
    if (lFs) await label.setFillStyleIdAsync(lFs);
    col.appendChild(label);

    card.appendChild(col);
  }

  section.appendChild(card);
  section.primaryAxisSizingMode = 'AUTO';
  return 'Stats rebuilt. Card height: ' + Math.round(card.height) + 'px';
})()`);
console.log('✓ ' + statsResult);

// ═══════════════════════════════════════════════════════════
// FIX 4: TESTIMONIALS
// ═══════════════════════════════════════════════════════════
console.log('\n🔧 Rebuilding Testimonials Cards...');

const testResult = await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  const ps = await figma.getLocalPaintStylesAsync();
  const txs = await figma.getLocalTextStylesAsync();
  function gps(n) { return (ps.find(s => s.name === n) || {}).id; }
  function gts(n) { return (txs.find(s => s.name === n) || {}).id; }

  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});

  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  const section = main.children.find(c => c.name === 'Testimonials');
  if (!section) return 'not found';

  const old = section.children.find(c => c.name === 'Cards');
  if (old) old.remove();

  const cards = figma.createFrame();
  cards.name = 'Cards';
  cards.layoutMode = 'HORIZONTAL';
  cards.primaryAxisSizingMode = 'FIXED';
  cards.counterAxisSizingMode = 'AUTO';
  cards.resize(1248, 100);
  cards.itemSpacing = 24;
  cards.fills = [];

  const data = [
    {quote:'"Envie S/ 5,000 a mi familia en provincia en 2 segundos. Sin comisiones. NexVault es realmente el futuro del dinero."',name:'Carolina Mendoza',role:'Diseñadora Freelance',avatar:'c44939b9684e957b6f2717204571e58604a61d14',bc:'#6366F1'},
    {quote:'"Como fundador de startup, necesito pagar a colaboradores en 8 paises. NexVault lo maneja todo sin friccion. Un cambio total."',name:'Diego Ramirez',role:'CEO, BuildStack',avatar:'4d31c8847c935d3b306e2481e8a7a3c433639eaf',bc:'#6366F1'},
    {quote:'"El cashback en cada transaccion es increible. He ganado S/ 1,200 solo por gastar normalmente. Es basicamente dinero gratis."',name:'Valeria Torres',role:'Cientifica de Datos',avatar:'14911ebbedceb5eb8600ea95184590db3bcb6d34',bc:'#34D399'}
  ];

  for (const t of data) {
    const card = figma.createFrame();
    card.name = t.name;
    card.layoutMode = 'VERTICAL';
    card.primaryAxisSizingMode = 'AUTO';
    card.counterAxisSizingMode = 'FIXED';
    card.layoutGrow = 1;
    card.paddingTop = 28; card.paddingBottom = 28;
    card.paddingLeft = 28; card.paddingRight = 28;
    card.itemSpacing = 16;
    card.cornerRadius = 20;
    card.fills = [{type:'SOLID',color:h('#151925'),opacity:0.6}];
    card.strokes = [{type:'SOLID',color:{r:1,g:1,b:1},opacity:0.06}];
    card.strokeWeight = 1;
    card.effects = [{type:'BACKGROUND_BLUR',radius:16,visible:true}];
    const bgId = gps('Effect / bg-surface/60');
    if (bgId) await card.setFillStyleIdAsync(bgId);

    // Stars
    const stars = figma.createFrame();
    stars.name = 'Stars';
    stars.layoutMode = 'HORIZONTAL';
    stars.primaryAxisSizingMode = 'AUTO';
    stars.counterAxisSizingMode = 'AUTO';
    stars.itemSpacing = 2;
    stars.fills = [];
    for (let i = 0; i < 5; i++) {
      const star = figma.createText();
      star.fontName = {family:'Inter',style:'Regular'};
      star.characters = '★';
      star.fontSize = 14;
      star.fills = [{type:'SOLID',color:h('#34D399')}];
      const sf = gps('Text / text-accent');
      if (sf) await star.setFillStyleIdAsync(sf);
      stars.appendChild(star);
    }
    card.appendChild(stars);

    // Quote
    const quote = figma.createText();
    quote.fontName = {family:'Inter',style:'Regular'};
    quote.characters = t.quote;
    quote.fontSize = 14;
    quote.lineHeight = {value:22,unit:'PIXELS'};
    quote.fills = [{type:'SOLID',color:h('#F8FAFC')}];
    quote.layoutAlign = 'STRETCH';
    quote.textAutoResize = 'HEIGHT';
    const qTs = gts('font-body / text-sm leading-relaxed');
    if (qTs) await quote.setTextStyleIdAsync(qTs);
    const qFs = gps('Text / text-text-main');
    if (qFs) await quote.setFillStyleIdAsync(qFs);
    card.appendChild(quote);

    // Author
    const author = figma.createFrame();
    author.name = 'Author';
    author.layoutMode = 'HORIZONTAL';
    author.primaryAxisSizingMode = 'AUTO';
    author.counterAxisSizingMode = 'AUTO';
    author.counterAxisAlignItems = 'CENTER';
    author.itemSpacing = 12;
    author.fills = [];

    const avatar = figma.createEllipse();
    avatar.resize(40, 40);
    avatar.fills = [{type:'IMAGE',imageHash:t.avatar,scaleMode:'FILL'}];
    avatar.strokes = [{type:'SOLID',color:h(t.bc),opacity:0.3}];
    avatar.strokeWeight = 2;
    author.appendChild(avatar);

    const info = figma.createFrame();
    info.layoutMode = 'VERTICAL';
    info.primaryAxisSizingMode = 'AUTO';
    info.counterAxisSizingMode = 'AUTO';
    info.itemSpacing = 2;
    info.fills = [];

    const name = figma.createText();
    name.fontName = {family:'Inter',style:'Semi Bold'};
    name.characters = t.name;
    name.fontSize = 14;
    name.fills = [{type:'SOLID',color:h('#F8FAFC')}];
    const nTs = gts('UI / text-sm font-semibold (name)');
    if (nTs) await name.setTextStyleIdAsync(nTs);
    const nFs = gps('Text / text-text-main');
    if (nFs) await name.setFillStyleIdAsync(nFs);
    info.appendChild(name);

    const role = figma.createText();
    role.fontName = {family:'Inter',style:'Regular'};
    role.characters = t.role;
    role.fontSize = 12;
    role.fills = [{type:'SOLID',color:h('#94A3B8')}];
    const rTs = gts('font-body / text-xs');
    if (rTs) await role.setTextStyleIdAsync(rTs);
    const rFs = gps('Text / text-text-muted');
    if (rFs) await role.setFillStyleIdAsync(rFs);
    info.appendChild(role);

    author.appendChild(info);
    card.appendChild(author);
    cards.appendChild(card);
  }

  section.appendChild(cards);
  section.primaryAxisSizingMode = 'AUTO';
  return 'Testimonials rebuilt. Cards height: ' + Math.round(cards.height) + 'px';
})()`);
console.log('✓ ' + testResult);

// ═══════════════════════════════════════════════════════════
// FIX 5: FOOTER
// ═══════════════════════════════════════════════════════════
console.log('\n🔧 Rebuilding Footer Grid...');

const footerResult = await run(`(async ()=>{
  function h(c){ c=c.replace('#',''); return {r:parseInt(c.substring(0,2),16)/255,g:parseInt(c.substring(2,4),16)/255,b:parseInt(c.substring(4,6),16)/255}; }
  const ps = await figma.getLocalPaintStylesAsync();
  const txs = await figma.getLocalTextStylesAsync();
  function gps(n) { return (ps.find(s => s.name === n) || {}).id; }
  function gts(n) { return (txs.find(s => s.name === n) || {}).id; }

  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Semi Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Bold'});
  await figma.loadFontAsync({family:'Space Grotesk',style:'Medium'});

  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  const footer = main.children.find(c => c.name === 'Footer');
  if (!footer) return 'not found';

  const old = footer.children.find(c => c.name === 'Grid');
  if (old) old.remove();

  const grid = figma.createFrame();
  grid.name = 'Grid';
  grid.layoutMode = 'HORIZONTAL';
  grid.primaryAxisSizingMode = 'FIXED';
  grid.counterAxisSizingMode = 'AUTO';
  grid.resize(1248, 100);
  grid.itemSpacing = 32;
  grid.fills = [];

  // Brand column
  const col1 = figma.createFrame();
  col1.name = 'Brand';
  col1.layoutMode = 'VERTICAL';
  col1.primaryAxisSizingMode = 'AUTO';
  col1.counterAxisSizingMode = 'FIXED';
  col1.layoutGrow = 1;
  col1.itemSpacing = 12;
  col1.fills = [];

  const logoRow = figma.createFrame();
  logoRow.layoutMode = 'HORIZONTAL';
  logoRow.primaryAxisSizingMode = 'AUTO';
  logoRow.counterAxisSizingMode = 'AUTO';
  logoRow.counterAxisAlignItems = 'CENTER';
  logoRow.itemSpacing = 8;
  logoRow.fills = [];
  const logoBox = figma.createFrame();
  logoBox.resize(32,32);
  logoBox.cornerRadius = 8;
  logoBox.fills = [{type:'SOLID',color:h('#6366F1')}];
  const bPs = gps('Brand / bg-primary');
  if (bPs) await logoBox.setFillStyleIdAsync(bPs);
  logoBox.layoutMode = 'VERTICAL';
  logoBox.primaryAxisAlignItems = 'CENTER';
  logoBox.counterAxisAlignItems = 'CENTER';
  const logoN = figma.createText();
  logoN.fontName = {family:'Space Grotesk',style:'Bold'};
  logoN.characters = 'N';
  logoN.fontSize = 14;
  logoN.fills = [{type:'SOLID',color:h('#FFFFFF')}];
  logoBox.appendChild(logoN);
  logoRow.appendChild(logoBox);
  const logoName = figma.createText();
  logoName.fontName = {family:'Space Grotesk',style:'Bold'};
  logoName.characters = 'NexVault';
  logoName.fontSize = 18;
  logoName.fills = [{type:'SOLID',color:h('#F8FAFC')}];
  const lnFs = gps('Text / text-text-main');
  if (lnFs) await logoName.setFillStyleIdAsync(lnFs);
  logoRow.appendChild(logoName);
  col1.appendChild(logoRow);

  const brandDesc = figma.createText();
  brandDesc.fontName = {family:'Inter',style:'Regular'};
  brandDesc.characters = 'La billetera digital de nueva generacion para un mundo sin fronteras.';
  brandDesc.fontSize = 14;
  brandDesc.lineHeight = {value:22,unit:'PIXELS'};
  brandDesc.fills = [{type:'SOLID',color:h('#94A3B8')}];
  brandDesc.resize(250,10); brandDesc.textAutoResize = 'HEIGHT';
  const bdFs = gps('Text / text-text-muted');
  if (bdFs) await brandDesc.setFillStyleIdAsync(bdFs);
  col1.appendChild(brandDesc);
  grid.appendChild(col1);

  const linkCols = [
    {title:'PRODUCTO',links:['Beneficios','Precios','Seguridad','API']},
    {title:'EMPRESA',links:['Nosotros','Empleos','Blog','Prensa']},
    {title:'LEGAL',links:['Privacidad','Terminos','Cookies']},
  ];

  for (const lc of linkCols) {
    const col = figma.createFrame();
    col.name = lc.title;
    col.layoutMode = 'VERTICAL';
    col.primaryAxisSizingMode = 'AUTO';
    col.counterAxisSizingMode = 'FIXED';
    col.layoutGrow = 1;
    col.itemSpacing = 12;
    col.fills = [];

    const heading = figma.createText();
    heading.fontName = {family:'Space Grotesk',style:'Medium'};
    heading.characters = lc.title;
    heading.fontSize = 12;
    heading.letterSpacing = {value:2,unit:'PIXELS'};
    heading.fills = [{type:'SOLID',color:h('#94A3B8')}];
    const hTs = gts('UI / text-xs uppercase tracking-widest (overline)');
    if (hTs) await heading.setTextStyleIdAsync(hTs);
    const hFs = gps('Text / text-text-muted');
    if (hFs) await heading.setFillStyleIdAsync(hFs);
    col.appendChild(heading);

    for (const link of lc.links) {
      const l = figma.createText();
      l.fontName = {family:'Inter',style:'Regular'};
      l.characters = link;
      l.fontSize = 14;
      l.fills = [{type:'SOLID',color:h('#94A3B8')}];
      const lFs = gps('Text / text-text-muted');
      if (lFs) await l.setFillStyleIdAsync(lFs);
      col.appendChild(l);
    }
    grid.appendChild(col);
  }

  if (footer.children.length > 0) {
    footer.insertChild(0, grid);
  } else {
    footer.appendChild(grid);
  }
  footer.primaryAxisSizingMode = 'AUTO';
  return 'Footer rebuilt. Grid height: ' + Math.round(grid.height) + 'px';
})()`);
console.log('✓ ' + footerResult);

// ═══════════════════════════════════════════════════════════
// VERIFY
// ═══════════════════════════════════════════════════════════
console.log('\n📊 Verificando dimensiones finales...');

const verifyResult = await run(`(async ()=>{
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  await figma.setCurrentPageAsync(page);
  const main = page.children[0];
  const results = main.children.map(c => c.name + ': ' + Math.round(c.width) + 'x' + Math.round(c.height));
  return results.join('\\n');
})()`);
console.log(verifyResult);

console.log('\n' + '═'.repeat(50));
console.log('✅ Todas las secciones reconstruidas');
console.log('═'.repeat(50));

client.close();
