/**
 * Ejemplo basico: crea un frame con texto en Figma.
 * 
 * Uso: node example.mjs
 */
import { FigmaClient } from './src/figma-client.js';

const client = new FigmaClient();
await client.connect();
console.log('Conectado a Figma');

async function run(code) {
  return await client.eval(code);
}

// Crear un frame simple con texto
const frameId = await run(`(async ()=>{
  await figma.loadFontAsync({family:'Inter',style:'Regular'});
  await figma.loadFontAsync({family:'Inter',style:'Bold'});

  function h(c){
    c=c.replace('#','');
    return {
      r:parseInt(c.substring(0,2),16)/255,
      g:parseInt(c.substring(2,4),16)/255,
      b:parseInt(c.substring(4,6),16)/255
    };
  }

  const frame = figma.createFrame();
  frame.name = 'Mi Primer Frame';
  frame.resize(400, 200);
  frame.layoutMode = 'VERTICAL';
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'FIXED';
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  frame.paddingTop = 32;
  frame.paddingBottom = 32;
  frame.paddingLeft = 32;
  frame.paddingRight = 32;
  frame.itemSpacing = 12;
  frame.cornerRadius = 12;
  frame.fills = [{type:'SOLID',color:h('#FFFFFF')}];
  frame.effects = [{
    type:'DROP_SHADOW',
    color:{r:0,g:0,b:0,a:0.1},
    offset:{x:0,y:4},
    radius:12,
    visible:true,
    blendMode:'NORMAL',
    spread:0
  }];

  const title = figma.createText();
  frame.appendChild(title);
  title.fontName = {family:'Inter',style:'Bold'};
  title.characters = 'Hola Figma!';
  title.fontSize = 24;
  title.fills = [{type:'SOLID',color:h('#1A1A1A')}];

  const sub = figma.createText();
  frame.appendChild(sub);
  sub.fontName = {family:'Inter',style:'Regular'};
  sub.characters = 'Creado desde Cursor con figma-cli';
  sub.fontSize = 14;
  sub.fills = [{type:'SOLID',color:h('#888888')}];

  figma.currentPage.selection = [frame];
  figma.viewport.scrollAndZoomIntoView([frame]);

  return frame.id;
})()`);

console.log('Frame creado con ID:', frameId);
console.log('Revisa Figma!');
client.close();
