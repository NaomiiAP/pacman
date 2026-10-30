import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const port = 4173;
const base = `http://127.0.0.1:${port}`;

function waitForServer() {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const tick = async () => {
      try {
        const response = await fetch(base);
        if (response.ok) {
          resolve();
          return;
        }
      } catch {
        // preview is still starting
      }
      if (Date.now() - started > 30000) {
        reject(new Error('preview server did not start'));
        return;
      }
      setTimeout(tick, 400);
    };
    void tick();
  });
}

const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
const preview = spawn(process.execPath, [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
  cwd: root,
  stdio: 'inherit',
});

try {
  await waitForServer();
  await mkdir(path.join(root, 'screenshots'), { recursive: true });
  const browser = await chromium.launch();

  const human = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await human.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  await page.goto(base, { waitUntil: 'networkidle' });
  const bio = page.getByText('I am a Full Stack Developer and AI/ML Engineer');
  if (!(await bio.count())) throw new Error('Bio text is missing');
  if (await page.getByText('TODO').count()) throw new Error('Visible TODO text');
  if (await page.getByRole('link', { name: 'Email' }).count()) throw new Error('Empty email should be hidden');
  if (!(await page.getByRole('link', { name: 'LinkedIn' }).count())) throw new Error('LinkedIn link missing');
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-1440.png'), fullPage: true });
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-1440-hero.png') });
  await page.locator('#graveyard').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-1440-graveyard.png') });
  for (const href of ['#about', '#skills', '#projects', '#contact']) {
    await page.locator(`.site-nav a[href="${href}"]`).click();
    await page.locator(href).waitFor();
  }
  await page.getByRole('button', { name: 'Loomling' }).click();
  if (!(await page.locator('#spirit-journal li').count())) throw new Error('Journal did not record a spirit');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-390.png'), fullPage: true });
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-390-hero.png') });
  await human.close();

  const dogContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await dogContext.addInitScript(() => sessionStorage.setItem('naomi-spirit-opening-seen', '1'));
  const dog = await dogContext.newPage();
  dog.on('pageerror', (error) => errors.push(String(error)));
  await dog.goto(base, { waitUntil: 'networkidle' });
  await dog.getByRole('button', { name: 'Become the dog' }).first().click();
  await dog.getByRole('button', { name: 'Back to human' }).waitFor();
  await dog.screenshot({ path: path.join(root, 'screenshots', 'dog-1440.png') });

  await dog.getByRole('button', { name: 'Cottage', exact: true }).click();
  await dog.locator('#open-near').waitFor();
  await dog.locator('#open-near').click();
  await dog.locator('.section-dialog').getByRole('heading', { name: 'About' }).waitFor();
  await dog.screenshot({ path: path.join(root, 'screenshots', 'dog-1440-about.png') });
  await dog.keyboard.press('Escape');

  for (const name of ['Workshop', 'Market', 'Mailbox', 'Graveyard']) {
    await dog.getByRole('button', { name, exact: true }).click();
    await dog.locator('#open-near').waitFor();
  await dog.locator('#open-near').click();
    if (name === 'Graveyard') {
      await dog.locator('dialog').getByRole('heading', { name: 'What I learned' }).first().waitFor();
    }
    await dog.keyboard.press('Escape');
  }

  const before = await dog.locator('#dog-scroll').evaluate((node) => node.scrollTop);
  await dog.keyboard.press('a');
  await dog.keyboard.press('a');
  const after = await dog.locator('#dog-scroll').evaluate((node) => node.scrollTop);
  if (after >= before) throw new Error('A did not walk the pup back');
  await dog.keyboard.down('s');
  await dog.screenshot({ path: path.join(root, 'screenshots', 'dog-1440-sniff.png') });
  await dog.keyboard.up('KeyS');
  await dog.getByRole('button', { name: 'Back to human' }).click();
  await dog.getByRole('heading', { name: 'Naomi Andrea Pereira' }).waitFor();
  await dogContext.close();

  const mobileDog = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await mobileDog.addInitScript(() => sessionStorage.setItem('naomi-spirit-opening-seen', '1'));
  const phone = await mobileDog.newPage();
  phone.on('pageerror', (error) => errors.push(String(error)));
  await phone.goto(base, { waitUntil: 'networkidle' });
  await phone.getByRole('button', { name: 'Become the dog' }).first().click();
  await phone.getByRole('button', { name: 'Back to human' }).waitFor();
  await phone.screenshot({ path: path.join(root, 'screenshots', 'dog-390.png') });
  await phone.getByRole('button', { name: 'Sniff' }).click();
  await phone.screenshot({ path: path.join(root, 'screenshots', 'dog-390-sniff.png') });
  await mobileDog.close();

  const calm = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const calmPage = await calm.newPage();
  calmPage.on('pageerror', (error) => errors.push(String(error)));
  await calmPage.goto(base, { waitUntil: 'networkidle' });
  await calmPage.getByRole('button', { name: 'Become the dog' }).first().click();
  await calmPage.getByRole('button', { name: 'Back to human' }).waitFor();
  if (await calmPage.locator('.opening:not([hidden])').count()) throw new Error('Opening played with reduced motion');
  await calmPage.screenshot({ path: path.join(root, 'screenshots', 'dog-1440-reduced.png') });
  await calm.close();

  const openingContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const openingPage = await openingContext.newPage();
  await openingPage.goto(base, { waitUntil: 'networkidle' });
  await openingPage.evaluate(() => sessionStorage.removeItem('naomi-spirit-opening-seen'));
  await openingPage.getByRole('button', { name: 'Become the dog' }).first().click();
  await openingPage.getByRole('button', { name: 'Skip' }).waitFor();
  await openingPage.screenshot({ path: path.join(root, 'screenshots', 'dog-1440-opening.png') });
  await openingPage.getByRole('button', { name: 'Skip' }).click();
  await openingPage.getByRole('button', { name: 'Back to human' }).waitFor();
  await openingContext.close();

  await browser.close();
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('Screenshots written to screenshots/');
} finally {
  preview.kill();
}
