const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:3001/design-system.html', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  const outDir = path.join(__dirname, '..', 'temporary_screenshots');
  await page.screenshot({ path: path.join(outDir, 'ds-fullpage.png'), fullPage: true });
  console.log('✓ Design System full page screenshot');

  // Section screenshots
  const sections = ['#colors', '#typography', '#spacing', '#components', '#effects', '#assets', '#grid'];
  for (const sel of sections) {
    try {
      const el = await page.$(sel);
      if (el) {
        await el.screenshot({ path: path.join(outDir, 'ds-' + sel.replace('#','') + '.png') });
        console.log('✓ ds-' + sel.replace('#',''));
      }
    } catch(e) { console.log('⚠ ' + sel + ': ' + e.message); }
  }

  await browser.close();
  console.log('\nDone!');
})();
