const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:3001', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // Force all reveal elements visible
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  });
  await new Promise(r => setTimeout(r, 500));

  const outDir = path.join(__dirname, '..', 'temporary_screenshots');

  // Full page
  await page.screenshot({ path: path.join(outDir, 'web-fullpage.png'), fullPage: true });
  console.log('✓ Full page screenshot');

  // Individual sections at 1440px
  const sections = [
    { name: 'web-navbar-hero', y: 0, h: 900 },
    { name: 'web-features', selector: '#features' },
    { name: 'web-how-it-works', selector: '#how-it-works' },
    { name: 'web-stats', selector: '#stats' },
    { name: 'web-cta', selector: '#cta' },
  ];

  for (const s of sections) {
    if (s.selector) {
      const el = await page.$(s.selector);
      if (el) {
        await el.screenshot({ path: path.join(outDir, s.name + '.png') });
        console.log('✓ ' + s.name);
      }
    } else {
      await page.screenshot({ 
        path: path.join(outDir, s.name + '.png'),
        clip: { x: 0, y: s.y, width: 1440, height: s.h }
      });
      console.log('✓ ' + s.name);
    }
  }

  await browser.close();
  console.log('\nDone! Screenshots saved to temporary_screenshots/');
})();
