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

/** Playwright's own Chromium if it was installed, otherwise the local Chrome. */
async function launch() {
  try {
    return await chromium.launch();
  } catch (error) {
    try {
      return await chromium.launch({ channel: 'chrome' });
    } catch {
      throw error;
    }
  }
}

const viteBin = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js');
const preview = spawn(process.execPath, [viteBin, 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
  cwd: root,
  stdio: 'inherit',
});

try {
  await waitForServer();
  await mkdir(path.join(root, 'screenshots'), { recursive: true });
  const browser = await launch();

  const human = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await human.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  await page.goto(base, { waitUntil: 'networkidle' });
  const bio = page.getByText('I am a Full Stack Developer and AI/ML Engineer');
  if (!(await bio.count())) throw new Error('Bio text is missing');
  if (await page.getByText('TODO').count()) throw new Error('Visible TODO text');
  if (await page.getByText('[PLACEHOLDER]').count()) throw new Error('Visible [PLACEHOLDER] text');
  if (await page.getByRole('link', { name: 'Email' }).count()) throw new Error('Empty email should be hidden');
  if (!(await page.getByRole('link', { name: 'LinkedIn' }).count())) throw new Error('LinkedIn link missing');
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-1440.png'), fullPage: true });
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-1440-hero.png') });
  for (const href of ['#about', '#education', '#experience', '#skills', '#projects', '#achievements', '#contact']) {
    await page.locator(`.site-nav a[href="${href}"]`).click();
    await page.locator(href).waitFor();
  }

  if ((await page.locator('#skills .skill-card').count()) < 3) throw new Error('Skill groups are missing');
  if (!(await page.getByText('First Commit Hackathon').count())) throw new Error('First Commit award is missing');

  await page.locator('.filters [data-filter="chain"]').click();
  const shown = await page.locator('.project-grid .project-card:not(.is-out)').count();
  const total = await page.locator('.project-grid .project-card').count();
  if (!(shown > 0 && shown < total)) throw new Error('Project filter did not narrow the list');
  await page.locator('.filters [data-filter="all"]').click();

  // The spirit pup's chat answers from the page and can act on it.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('.hero-ctas [data-ask-pup]').click();
  await page.locator('#pup-chat-input').fill('Show me the blockchain projects');
  await page.locator('#pup-chat-input').press('Enter');
  await page.locator('.chat .from-pup', { hasText: 'Blockchain projects' }).waitFor();
  if ((await page.locator('.filters [data-filter="chain"]').getAttribute('aria-pressed')) !== 'true') throw new Error('The pup did not filter the projects');
  await page.locator('#pup-chat-input').fill('what is her favourite food');
  await page.locator('#pup-chat-input').press('Enter');
  await page.locator('.chat .from-pup', { hasText: "don't make things up" }).waitFor();
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-1440-chat.png') });
  await page.locator('.chat-close').click();
  await page.locator('.filters [data-filter="all"]').click();

  // Fetch!: a role preset, then a pasted job post.
  await page.locator('#fetch').scrollIntoViewIfNeeded();
  await page.locator('.role-chip', { hasText: 'Cloud & AWS' }).click();
  await page.locator('#fetch-form button[type="submit"]').click();
  await page.locator('#fetch-result .fetched', { hasText: 'RepoWatch' }).waitFor();
  await page.locator('#fetch-post').fill('We are hiring a frontend engineer with React, TypeScript and REST API experience. Series C startup.');
  await page.locator('#fetch-form button[type="submit"]').click();
  await page.locator('#fetch-result .fetched-skills li', { hasText: 'TypeScript' }).waitFor();
  if (await page.locator('#fetch-result .fetched-skills li', { hasText: /^C$/ }).count()) throw new Error('Fetch matched "Series C" as the C language');
  await page.locator('#fetch').screenshot({ path: path.join(root, 'screenshots', 'human-1440-fetch.png') });

  await page.locator('.theme-toggle').click();
  if ((await page.evaluate(() => document.documentElement.dataset.theme)) !== 'dark') throw new Error('Lights out did not switch the theme');
  await page.locator('#hero').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-1440-dark.png') });
  await page.locator('.theme-toggle').click();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: 'networkidle' });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (overflow > 0) throw new Error(`Phone layout scrolls sideways by ${overflow}px`);
  await page.locator('.menu-toggle').click();
  await page.locator('.site-nav.is-open a[href="#projects"]').click();
  await page.screenshot({ path: path.join(root, 'screenshots', 'human-390.png'), fullPage: true });
  await page.evaluate(() => window.scrollTo(0, 0));
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
  await dog.locator('.section-dialog').getByRole('heading', { name: 'About me' }).waitFor();
  await dog.screenshot({ path: path.join(root, 'screenshots', 'dog-1440-about.png') });
  await dog.keyboard.press('Escape');

  const stops = ['School', 'Quests', 'Workshop', 'Market', 'Trophies', 'Mailbox'];
  if (await dog.locator('#graveyard').count()) stops.push('Graveyard');
  const openLabel = {
    School: 'Open school',
    Quests: 'Open quest board',
    Workshop: 'Open workshop',
    Market: 'Open market',
    Trophies: 'Open trophy hall',
    Mailbox: 'Open mailbox',
    Graveyard: 'Open graveyard',
  };
  for (const name of stops) {
    await dog.getByRole('button', { name, exact: true }).click();
    // Wait for the pup to arrive: on the way it can pass dig spots and stalls.
    await dog.locator('#open-near', { hasText: openLabel[name] }).waitFor();
    await dog.locator('#open-near').click();
    await dog.locator('.section-dialog[open]').waitFor();
    if (name !== 'Market') await dog.keyboard.press('Escape');
    if (name === 'Market') {
      // About, Skills and Projects are all lit now, so the ending opens. Stay on
      // the market like a visitor reading it: the ending must replace it in the
      // open dialog (this used to leave the dialog empty).
      await dog.locator('.section-dialog').getByRole('heading', { name: 'The lanterns are lit' }).waitFor();
      await dog.screenshot({ path: path.join(root, 'screenshots', 'dog-1440-ending.png') });
      await dog.keyboard.press('Escape');
    }
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
  const startTop = await phone.locator('#dog-scroll').evaluate((node) => node.scrollTop);
  const walkRight = phone.getByRole('button', { name: 'Walk right', exact: true });
  const box = await walkRight.boundingBox();
  if (!box) throw new Error('Walk right button is not visible on a phone');
  await phone.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await phone.mouse.down();
  await phone.waitForTimeout(700);
  await phone.mouse.up();
  const walkedTop = await phone.locator('#dog-scroll').evaluate((node) => node.scrollTop);
  if (walkedTop <= startTop) throw new Error('Holding Walk right did not walk the pup');
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
