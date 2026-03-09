import { FigmaClient } from './src/figma-client.js';

const client = new FigmaClient();

try {
  await client.connect();
  const pageName = await client.eval('figma.currentPage.name');
  console.log('Conectado a Figma!');
  console.log('Pagina actual:', pageName);

  const childCount = await client.eval('figma.currentPage.children.length');
  console.log('Elementos en pagina:', childCount);

  console.log('\nTodo listo. Puedes empezar a crear.');
} catch (e) {
  console.error('Error de conexion:', e.message);
  console.log('\nVerifica que:');
  console.log('  1. Figma Desktop esta abierto');
  console.log('  2. Tienes un archivo de diseno abierto (no la pantalla de inicio)');
  console.log('  3. Figma esta parcheado: npx figma-ds-cli patch');
} finally {
  client.close();
}
