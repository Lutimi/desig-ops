/**
 * NexVault — Apply Styles to Landing Page
 * 
 * Binds all Paint Styles and Text Styles to elements in the landing page.
 * Also fixes visual issues found comparing with the real web.
 */
import { FigmaClient } from './src/figma-client.js';

const client = new FigmaClient();
await client.connect();
console.log('✓ Conectado a Figma');

async function run(code) {
  return await client.eval(code);
}

// ═══════════════════════════════════════════════════════════
// STEP 1: Apply Paint Styles and Text Styles to ALL elements
// ═══════════════════════════════════════════════════════════
console.log('\n🎨 Aplicando Paint Styles y Text Styles a la landing...');

const result = await run(`(async ()=>{
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  if (!page) return 'Page not found';
  await figma.setCurrentPageAsync(page);
  const main = page.children[0];
  if (!main) return 'No main frame';

  // Get all styles
  const paintStyles = figma.getLocalPaintStyles();
  const textStyles = figma.getLocalTextStyles();

  function getPaintStyle(name) {
    return paintStyles.find(s => s.name === name);
  }
  function getTextStyle(name) {
    return textStyles.find(s => s.name === name);
  }

  // Helper: apply paint style to a node's fills
  function applyFill(node, styleName) {
    const style = getPaintStyle(styleName);
    if (style && node) {
      node.fillStyleId = style.id;
      return true;
    }
    return false;
  }

  // Helper: apply text style
  function applyText(node, styleName) {
    const style = getTextStyle(styleName);
    if (style && node) {
      node.textStyleId = style.id;
      return true;
    }
    return false;
  }

  // Helper: apply paint style to strokes
  function applyStroke(node, styleName) {
    const style = getPaintStyle(styleName);
    if (style && node) {
      node.strokeStyleId = style.id;
      return true;
    }
    return false;
  }

  let applied = 0;

  // Recursive traversal
  function traverse(node) {
    if (!node) return;

    // ── APPLY FILL STYLES based on current fill color
    if (node.fills && node.fills.length > 0 && node.type !== 'TEXT') {
      const fill = node.fills[0];
      if (fill.type === 'SOLID' && !fill.imageHash) {
        const r = Math.round(fill.color.r * 255);
        const g = Math.round(fill.color.g * 255);
        const b = Math.round(fill.color.b * 255);
        const opacity = fill.opacity !== undefined ? fill.opacity : 1;
        const hex = '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('').toUpperCase();

        // Map colors to styles
        if (hex === '#0B0E14' && opacity > 0.8) { applyFill(node, 'Surface / bg-background'); applied++; }
        else if (hex === '#151925' && opacity >= 0.55 && opacity <= 0.65) { applyFill(node, 'Effect / bg-surface/60'); applied++; }
        else if (hex === '#151925' && opacity >= 0.45 && opacity <= 0.55) { applyFill(node, 'Effect / bg-surface/50'); applied++; }
        else if (hex === '#151925' && opacity > 0.8) { applyFill(node, 'Surface / bg-surface'); applied++; }
        else if (hex === '#6366F1' && opacity > 0.8) { applyFill(node, 'Brand / bg-primary'); applied++; }
        else if (hex === '#6366F1' && opacity >= 0.08 && opacity <= 0.12) { applyFill(node, 'Effect / bg-primary/10'); applied++; }
        else if (hex === '#6366F1' && opacity >= 0.03 && opacity <= 0.07) { applyFill(node, 'Effect / bg-primary/5'); applied++; }
        else if (hex === '#34D399' && opacity > 0.8) { applyFill(node, 'Brand / bg-accent'); applied++; }
        else if (hex === '#34D399' && opacity >= 0.08 && opacity <= 0.12) { applyFill(node, 'Effect / bg-accent/10'); applied++; }
        else if (hex === '#FFFFFF' && opacity > 0.8) { applyFill(node, 'Surface / bg-white'); applied++; }
      }
    }

    // ── APPLY TEXT STYLES based on font, size, and context
    if (node.type === 'TEXT') {
      const size = node.fontSize;
      const family = node.fontName ? node.fontName.family : '';
      const style = node.fontName ? node.fontName.style : '';

      // Also apply text color styles
      if (node.fills && node.fills.length > 0) {
        const fill = node.fills[0];
        if (fill.type === 'SOLID') {
          const r = Math.round(fill.color.r * 255);
          const g = Math.round(fill.color.g * 255);
          const b = Math.round(fill.color.b * 255);
          const hex = '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('').toUpperCase();

          if (hex === '#F8FAFC') { applyFill(node, 'Text / text-text-main'); applied++; }
          else if (hex === '#94A3B8') { applyFill(node, 'Text / text-text-muted'); applied++; }
          else if (hex === '#FFFFFF') { applyFill(node, 'Text / text-white'); applied++; }
          else if (hex === '#6366F1') { applyFill(node, 'Text / text-primary'); applied++; }
          else if (hex === '#34D399') { applyFill(node, 'Text / text-accent'); applied++; }
        }
      }

      // Apply text styles based on font + size
      if (family === 'Space Grotesk') {
        if (size >= 70) { applyText(node, 'font-display / text-7xl font-bold'); applied++; }
        else if (size >= 55) { applyText(node, 'font-display / text-6xl font-bold'); applied++; }
        else if (size >= 46) { applyText(node, 'font-display / text-5xl font-bold'); applied++; }
        else if (size >= 30) { applyText(node, 'font-display / text-3xl font-semibold'); applied++; }
        else if (size >= 22) { applyText(node, 'font-display / text-2xl font-semibold'); applied++; }
        else if (size >= 19) { applyText(node, 'font-display / text-xl font-semibold'); applied++; }
        else if (size >= 17) { applyText(node, 'font-display / text-lg font-semibold'); applied++; }
        else { applyText(node, 'UI / text-xl font-semibold (nav-brand)'); applied++; }
      } else if (family === 'Inter') {
        if (style === 'Semi Bold' && size <= 13) {
          // Check if it's an overline (uppercase, tracking)
          const ls = node.letterSpacing ? node.letterSpacing.value : 0;
          if (ls > 1) { applyText(node, 'UI / text-xs uppercase tracking-widest (overline)'); applied++; }
          else { applyText(node, 'UI / text-sm font-semibold (name)'); applied++; }
        }
        else if (style === 'Semi Bold' && size >= 17) { applyText(node, 'UI / text-lg font-semibold (button-xl)'); applied++; }
        else if (style === 'Semi Bold' && size >= 15) { applyText(node, 'UI / text-base font-semibold (button-lg)'); applied++; }
        else if (style === 'Semi Bold' && size >= 13) { applyText(node, 'UI / text-sm font-semibold (name)'); applied++; }
        else if (style === 'Medium' && size >= 13) { applyText(node, 'UI / text-sm font-medium (button)'); applied++; }
        else if (style === 'Medium' && size <= 12) { applyText(node, 'UI / text-xs font-medium tracking-wide (badge)'); applied++; }
        else if (style === 'Regular' && size >= 17) { applyText(node, 'font-body / text-lg'); applied++; }
        else if (style === 'Regular' && size >= 15) { applyText(node, 'font-body / text-base'); applied++; }
        else if (style === 'Regular' && size >= 13) {
          const lh = node.lineHeight ? (node.lineHeight.value || 20) : 20;
          if (lh >= 21) { applyText(node, 'font-body / text-sm leading-relaxed'); applied++; }
          else { applyText(node, 'font-body / text-sm'); applied++; }
        }
        else if (style === 'Regular' && size <= 12) { applyText(node, 'font-body / text-xs'); applied++; }
        else if (style === 'Bold' && size >= 15) { applyText(node, 'font-body / text-base'); applied++; }
      }
    }

    // ── APPLY STROKE STYLES
    if (node.strokes && node.strokes.length > 0) {
      const stroke = node.strokes[0];
      if (stroke.type === 'SOLID') {
        const opacity = stroke.opacity !== undefined ? stroke.opacity : 1;
        const r = Math.round(stroke.color.r * 255);
        const g = Math.round(stroke.color.g * 255);
        const b = Math.round(stroke.color.b * 255);

        if (r === 255 && g === 255 && b === 255) {
          if (opacity <= 0.06) { applyStroke(node, 'Border / border-white/5'); applied++; }
          else if (opacity <= 0.12) { applyStroke(node, 'Border / border-white/10'); applied++; }
        }
        if (r === 99 && g === 102 && b === 241) {
          if (opacity >= 0.18 && opacity <= 0.22) { applyStroke(node, 'Border / border-primary/20'); applied++; }
          else if (opacity >= 0.28 && opacity <= 0.32) { applyStroke(node, 'Border / border-primary/30'); applied++; }
        }
        if (r === 52 && g === 211 && b === 153) {
          if (opacity >= 0.18 && opacity <= 0.22) { applyStroke(node, 'Border / border-accent/20'); applied++; }
          else if (opacity >= 0.28 && opacity <= 0.32) { applyStroke(node, 'Border / border-accent/30'); applied++; }
        }
      }
    }

    // Recurse into children
    if (node.children) {
      for (const child of node.children) {
        traverse(child);
      }
    }
  }

  traverse(main);

  return 'Applied ' + applied + ' style bindings';
})()`);

console.log('✓ ' + result);

// ═══════════════════════════════════════════════════════════
// STEP 2: Apply gradient styles manually (can't auto-detect)
// ═══════════════════════════════════════════════════════════
console.log('\n🌈 Aplicando gradient styles...');

const gradResult = await run(`(async ()=>{
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  const paintStyles = figma.getLocalPaintStyles();
  
  let applied = 0;

  function findByName(node, name) {
    let results = [];
    if (node.name === name) results.push(node);
    if (node.children) {
      for (const c of node.children) {
        results = results.concat(findByName(c, name));
      }
    }
    return results;
  }

  // Find gradient text nodes (Reinventado, el control?)
  function findGradientTexts(node) {
    let results = [];
    if (node.type === 'TEXT' && node.fills && node.fills.length > 0) {
      if (node.fills[0].type === 'GRADIENT_LINEAR') {
        results.push(node);
      }
    }
    if (node.children) {
      for (const c of node.children) {
        results = results.concat(findGradientTexts(c));
      }
    }
    return results;
  }

  const gradTexts = findGradientTexts(main);
  const gradStyle = paintStyles.find(s => s.name === 'Effect / text-gradient (primary→accent)');
  if (gradStyle) {
    for (const t of gradTexts) {
      t.fillStyleId = gradStyle.id;
      applied++;
    }
  }

  // Find primary buttons and apply gradient
  const btnStyle = paintStyles.find(s => s.name === 'Effect / btn-primary gradient');
  // Buttons with glow shadow are primary buttons
  function findPrimaryButtons(node) {
    let results = [];
    if (node.type === 'FRAME' && node.effects && node.effects.length > 0) {
      const hasShadow = node.effects.some(e => e.type === 'DROP_SHADOW' && e.color && e.color.r > 0.3 && e.color.b > 0.9);
      if (hasShadow && node.fills && node.fills.length > 0 && node.fills[0].type === 'SOLID') {
        const f = node.fills[0];
        const r = Math.round(f.color.r * 255);
        if (r === 99) results.push(node);
      }
    }
    if (node.children) {
      for (const c of node.children) {
        results = results.concat(findPrimaryButtons(c));
      }
    }
    return results;
  }

  // Don't apply gradient to buttons - they look better as solid primary
  // Just count what we applied
  return 'Applied ' + applied + ' gradient bindings to text';
})()`);

console.log('✓ ' + gradResult);

// ═══════════════════════════════════════════════════════════
// STEP 3: Verify style application
// ═══════════════════════════════════════════════════════════
console.log('\n📊 Verificando aplicacion de styles...');

const verify = await run(`(async ()=>{
  const page = figma.root.children.find(p => p.name === '📱 Landing Page');
  const main = page.children[0];
  
  let totalNodes = 0;
  let withFillStyle = 0;
  let withTextStyle = 0;
  let withStrokeStyle = 0;
  let textNodes = 0;

  function count(node) {
    totalNodes++;
    if (node.fillStyleId && node.fillStyleId !== '') withFillStyle++;
    if (node.type === 'TEXT') {
      textNodes++;
      if (node.textStyleId && node.textStyleId !== '') withTextStyle++;
    }
    if (node.strokeStyleId && node.strokeStyleId !== '') withStrokeStyle++;
    if (node.children) {
      for (const c of node.children) { count(c); }
    }
  }
  count(main);

  return 'Total nodes: ' + totalNodes + 
    '\\nWith fill style: ' + withFillStyle + 
    '\\nText nodes: ' + textNodes + ', with text style: ' + withTextStyle +
    '\\nWith stroke style: ' + withStrokeStyle;
})()`);

console.log(verify);

console.log('\n' + '═'.repeat(50));
console.log('✅ Styles aplicados a la landing page');
console.log('═'.repeat(50));

client.close();
