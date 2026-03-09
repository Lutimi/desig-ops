const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'temporary_screenshots');
const BASE_URL = 'http://localhost:3000';

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

async function takeScreenshots(options = {}) {
  const { fullPage = true, viewport = 'desktop', sections = false } = options;

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    const vp = VIEWPORTS.find((v) => v.name === viewport) || VIEWPORTS[0];
    await page.setViewport({ width: vp.width, height: vp.height });

    console.log(`Navigating to ${BASE_URL}...`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForTimeout(2000);

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

    if (fullPage) {
      const filename = `full-page-${vp.name}-${timestamp}.png`;
      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, filename),
        fullPage: true,
      });
      console.log(`Full page screenshot saved: ${filename}`);
    }

    if (sections) {
      const sectionSelectors = [
        { name: 'hero', selector: 'section.hero, #hero, [data-section="hero"], header + section, main > section:first-child' },
        { name: 'features', selector: 'section.features, #features, [data-section="features"]' },
        { name: 'about', selector: 'section.about, #about, [data-section="about"]' },
        { name: 'testimonials', selector: 'section.testimonials, #testimonials, [data-section="testimonials"]' },
        { name: 'pricing', selector: 'section.pricing, #pricing, [data-section="pricing"]' },
        { name: 'cta', selector: 'section.cta, #cta, [data-section="cta"]' },
        { name: 'footer', selector: 'footer, #footer' },
      ];

      for (const { name, selector } of sectionSelectors) {
        try {
          const element = await page.$(selector);
          if (element) {
            const filename = `section-${name}-${vp.name}-${timestamp}.png`;
            await element.screenshot({
              path: path.join(SCREENSHOT_DIR, filename),
            });
            console.log(`Section screenshot saved: ${filename}`);
          }
        } catch (err) {
          console.log(`Could not capture section "${name}": ${err.message}`);
        }
      }
    }

    const allSections = await page.$$('section, [data-section]');
    let idx = 1;
    for (const section of allSections) {
      try {
        const filename = `viewport-${idx}-${vp.name}-${timestamp}.png`;
        await section.screenshot({
          path: path.join(SCREENSHOT_DIR, filename),
        });
        console.log(`Viewport screenshot ${idx} saved: ${filename}`);
        idx++;
      } catch (err) {
        // skip sections that can't be captured
      }
    }

    console.log('\nAll screenshots saved to temporary_screenshots/');
  } catch (err) {
    console.error('Screenshot error:', err.message);
  } finally {
    await browser.close();
  }
}

const args = process.argv.slice(2);
const options = {
  fullPage: true,
  sections: args.includes('--sections') || args.includes('--full'),
  viewport: 'desktop',
};

if (args.includes('--mobile')) options.viewport = 'mobile';
if (args.includes('--tablet')) options.viewport = 'tablet';

takeScreenshots(options);
