/**
 * Captures the client-work screenshots used on /work and /work/[slug].
 *
 * Run from the repo root (downloads Chromium the first time):
 *   npx -y playwright@latest install chromium && node scripts/capture-work-shots.mjs
 *
 * Outputs, per site:
 *   public/work/<slug>.png             — card image (1440×900 viewport)
 *   public/work/<slug>-fullpage.webp   — full-page shot for the interactive browser frame
 */
import { chromium } from "playwright";
import sharp from "sharp"; // npm i -D sharp (only needed for this script)

const SITES = [
  { slug: "claudia-garcia", url: "https://claudiavgarcia.com" },
  { slug: "riveros-street", url: "https://riverosstreet.com" },
  { slug: "angie-auto-sales", url: "https://angieautosales.com" },
];

const browser = await chromium.launch();
for (const { slug, url } of SITES) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  // Scroll through the page so lazy images/animations load, then back to top.
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += 800;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 150);
        else { window.scrollTo(0, 0); setTimeout(res, 800); }
      };
      step();
    });
  });
  const cardPng = await page.screenshot({ fullPage: false });
  const fullPng = await page.screenshot({ fullPage: true });
  await sharp(cardPng).png({ compressionLevel: 9, palette: true }).toFile(`public/work/${slug}.png`);
  await sharp(fullPng).resize({ width: 1200 }).webp({ quality: 78 }).toFile(`public/work/${slug}-fullpage.webp`);
  console.log("captured", slug);
  await page.close();
}
await browser.close();
