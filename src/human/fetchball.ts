import { icon } from '../art/icons.ts';
import { pupHead } from '../art/pup.ts';
import { fetchFor, ROLES, type Fetched, type RoleId } from '../agent/match.ts';
import { handle, splitTitle } from '../content/derive.ts';
import { portfolio } from '../content/portfolio.ts';
import { burstFrom, reducedMotion } from './effects.ts';

/*
 * Fetch! The visitor throws the ball, the pup runs after it and comes
 * back with a bone: a one-page résumé shaped to the role they picked or
 * the job post they pasted. Everything is built from portfolio.ts.
 */

let running = false;

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function withIcon(tag: 'h4' | 'p', name: string, text: string, className?: string): HTMLElement {
  const node = el(tag, className);
  const glyph = el('span', 'icon-wrap');
  glyph.setAttribute('aria-hidden', 'true');
  glyph.innerHTML = icon(name);
  node.append(glyph, document.createTextNode(text));
  return node;
}

function link(label: string, href: string): HTMLAnchorElement {
  const anchor = el('a', 'fetched-link', label);
  anchor.href = href;
  if (/^https?:/.test(href)) {
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
  }
  return anchor;
}

function setPose(stage: HTMLElement | null, pose: 'sit' | 'walk'): void {
  stage?.classList.remove('is-sit', 'is-walk');
  stage?.classList.add(`is-${pose}`);
}

/** Ball out, pup out, pup back with a bone. Skipped when the visitor asks for less motion. */
async function play(): Promise<void> {
  const yard = document.querySelector<HTMLElement>('.fetch-yard');
  const runner = yard?.querySelector<HTMLElement>('.fetch-runner');
  if (!yard || !runner || reducedMotion()) {
    yard?.classList.add('has-bone');
    return;
  }
  const stage = runner.querySelector<HTMLElement>('.fetch-stage');
  yard.style.setProperty('--run', `${Math.max(120, yard.clientWidth - runner.offsetWidth - 40)}px`);
  yard.classList.remove('has-bone', 'is-out', 'is-throw');
  runner.classList.remove('face-left');
  void yard.offsetWidth;
  yard.classList.add('is-throw');
  await wait(260);
  setPose(stage, 'walk');
  yard.classList.add('is-out');
  await wait(900);
  yard.classList.add('has-bone');
  runner.classList.add('face-left');
  yard.classList.remove('is-out');
  await wait(900);
  runner.classList.remove('face-left');
  setPose(stage, 'sit');
  yard.classList.remove('is-throw');
}

function printCard(): void {
  const root = document.documentElement;
  const dark = root.dataset.theme === 'dark';
  root.classList.add('print-fetch');
  if (dark) delete root.dataset.theme;
  const done = () => {
    root.classList.remove('print-fetch');
    if (dark) root.dataset.theme = 'dark';
    window.removeEventListener('afterprint', done);
  };
  window.addEventListener('afterprint', done);
  window.print();
}

function render(result: Fetched): HTMLElement {
  const { name, roles, location, education, contact } = portfolio;
  const card = el('article', 'card fetched');
  card.tabIndex = -1;
  card.setAttribute('aria-labelledby', 'fetched-name');

  const head = el('div', 'fetched-head');
  const avatar = el('span', 'fetched-avatar');
  avatar.setAttribute('aria-hidden', 'true');
  avatar.innerHTML = pupHead();
  const who = el('div', 'fetched-who');
  const title = el('h3', undefined, name);
  title.id = 'fetched-name';
  who.append(el('p', 'fetched-kicker', `Fetched for ${result.title}`), title, el('p', 'fetched-roles', `${roles} · ${location}`));
  const actions = el('div', 'fetched-actions');
  const print = el('button', 'btn btn-small btn-plain');
  print.type = 'button';
  print.innerHTML = `<span class="icon-wrap" aria-hidden="true">${icon('book')}</span>`;
  print.append(document.createTextNode('Print or save as PDF'));
  print.addEventListener('click', printCard);
  actions.append(print);
  head.append(avatar, who, actions);
  card.append(head);

  const first = name.split(' ')[0];
  if (result.fallback) {
    card.append(el('p', 'fetched-note', `The pup couldn't find a close match, so it brought ${first}'s highlights instead.`));
  } else if (result.fromPost) {
    const count = result.skills.length;
    card.append(
      el('p', 'fetched-note', count ? `Your post mentions ${count} of ${first}'s listed skills. They're highlighted below.` : `Your post doesn't name any of ${first}'s listed skills, but these projects come closest.`),
    );
  }

  const grid = el('div', 'fetched-grid');
  const left = el('div', 'fetched-col');
  const right = el('div', 'fetched-col');

  if (result.skills.length) {
    const block = el('section', 'fetched-block');
    const tags = el('ul', 'tags fetched-skills');
    for (const skill of result.skills) tags.append(el('li', undefined, skill));
    block.append(withIcon('h4', 'spark', 'Matching skills'), tags);
    left.append(block);
  }

  const edu = el('section', 'fetched-block');
  edu.append(
    withIcon('h4', 'cap', 'Education'),
    el('p', 'fetched-strong', education.school),
    el('p', undefined, `${education.degree}, ${education.dates}`),
    el('p', undefined, education.score),
  );
  left.append(edu);

  if (result.wins.length) {
    const block = el('section', 'fetched-block');
    const list = el('ul', 'fetched-list');
    for (const award of result.wins) {
      const item = el('li');
      item.append(el('span', 'fetched-strong', award.event), document.createTextNode(` · ${award.place}, ${award.date}`));
      list.append(item);
    }
    block.append(withIcon('h4', 'trophy', 'Hackathon wins'), list);
    left.append(block);
  }

  const reach = el('section', 'fetched-block');
  const links = el('div', 'fetched-links');
  if (contact.github) links.append(link(`GitHub ${handle(contact.github)}`, contact.github));
  if (contact.linkedin) links.append(link('LinkedIn', contact.linkedin));
  if (contact.email) links.append(link(contact.email, `mailto:${contact.email}`));
  if (contact.resume) links.append(link('Full résumé', contact.resume));
  reach.append(withIcon('h4', 'mail', 'Get in touch'), links);
  left.append(reach);

  const projects = el('section', 'fetched-block');
  const projectList = el('ul', 'fetched-list');
  for (const project of result.projects) {
    const item = el('li', 'fetched-item');
    const parts = splitTitle(project.name);
    item.append(el('p', 'fetched-strong', parts.rest ? `${parts.short} — ${parts.rest}` : parts.short), el('p', undefined, project.summary));
    const projectLinks = el('div', 'fetched-links');
    if (project.demo) projectLinks.append(link('Live demo', project.demo));
    if (project.source) projectLinks.append(link('Source', project.source));
    if (projectLinks.childElementCount) item.append(projectLinks);
    projectList.append(item);
  }
  projects.append(withIcon('h4', 'candy', result.fallback ? 'Projects' : 'Best-matching projects'), projectList);
  right.append(projects);

  const jobs = el('section', 'fetched-block');
  const jobList = el('ul', 'fetched-list');
  for (const { job, point } of result.jobs) {
    const item = el('li', 'fetched-item');
    item.append(el('p', 'fetched-strong', `${job.role}, ${job.org}`), el('p', 'fetched-dates', job.dates), el('p', undefined, point));
    jobList.append(item);
  }
  jobs.append(withIcon('h4', 'briefcase', 'Experience'), jobList);
  right.append(jobs);

  grid.append(left, right);
  card.append(grid);
  return card;
}

export async function runFetch(form: HTMLFormElement): Promise<void> {
  if (running) return;
  running = true;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const host = document.getElementById('fetch-result');
  const status = document.querySelector<HTMLElement>('[data-fetch-status]');
  try {
    if (submit) submit.disabled = true;
    const data = new FormData(form);
    const picked = String(data.get('role') ?? 'ai');
    const role: RoleId = picked in ROLES ? (picked as RoleId) : 'ai';
    const result = fetchFor(portfolio, { role, post: String(data.get('post') ?? '') });
    if (status) status.textContent = 'The pup is fetching…';
    await play();
    if (!host) return;
    const card = render(result);
    host.replaceChildren(card);
    host.hidden = false;
    if (status) status.textContent = `Fetched a résumé for ${result.title}.`;
    card.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    card.focus({ preventScroll: true });
    burstFrom(card.querySelector('.fetched-avatar') ?? card, 14);
  } finally {
    if (submit) submit.disabled = false;
    running = false;
  }
}

/** Used by the chat: pick a role, clear any pasted post, and fetch. */
export function fetchRole(role: RoleId | null): void {
  const form = document.getElementById('fetch-form');
  if (!(form instanceof HTMLFormElement)) return;
  if (role) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="role"][value="${role}"]`);
    if (radio) radio.checked = true;
    const post = form.querySelector<HTMLTextAreaElement>('textarea[name="post"]');
    if (post) post.value = '';
  }
  document.getElementById('fetch')?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
  if (role) window.setTimeout(() => void runFetch(form), reducedMotion() ? 0 : 650);
}
