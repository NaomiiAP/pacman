export const WORLD_WIDTH = 5200;

export type Target = {
  kind: 'open' | 'dig';
  id: string;
  label: string;
  x: number;
  width: number;
  element: HTMLElement;
};

const COTTAGE = `<svg viewBox="0 0 220 180" aria-hidden="true">
  <path d="M30 88 L110 28 L190 88 Z" fill="#e8843a" stroke="#3c2a4a" stroke-width="4" stroke-linejoin="round"/>
  <rect x="48" y="86" width="124" height="78" rx="8" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="4"/>
  <rect x="96" y="112" width="30" height="52" rx="6" fill="#5b2a55" stroke="#3c2a4a" stroke-width="3"/>
  <rect x="62" y="104" width="22" height="18" rx="3" fill="#e8b84a" stroke="#3c2a4a" stroke-width="3"/>
  <rect x="138" y="104" width="22" height="18" rx="3" fill="#e8b84a" stroke="#3c2a4a" stroke-width="3"/>
  <rect x="150" y="48" width="16" height="28" fill="#c46b8a" stroke="#3c2a4a" stroke-width="3"/>
  <ellipse cx="40" cy="150" rx="18" ry="12" fill="#e8843a" stroke="#3c2a4a" stroke-width="3"/>
</svg>`;

const WORKSHOP = `<svg viewBox="0 0 260 180" aria-hidden="true">
  <rect x="30" y="70" width="200" height="90" rx="10" fill="#d8c4a4" stroke="#3c2a4a" stroke-width="4"/>
  <path d="M20 74 H240 L210 36 H50 Z" fill="#5b2a55" stroke="#3c2a4a" stroke-width="4" stroke-linejoin="round"/>
  <rect x="108" y="108" width="40" height="52" rx="6" fill="#6a3a68" stroke="#3c2a4a" stroke-width="3"/>
  <g class="lantern-glow">
    <circle cx="70" cy="58" r="10" fill="#e8b84a" stroke="#3c2a4a" stroke-width="3"/>
    <circle cx="190" cy="58" r="10" fill="#e8b84a" stroke="#3c2a4a" stroke-width="3"/>
    <circle cx="130" cy="48" r="12" fill="#f6e7a8" stroke="#3c2a4a" stroke-width="3"/>
  </g>
  <rect x="48" y="92" width="28" height="22" rx="3" fill="#fff8ee" stroke="#3c2a4a" stroke-width="3"/>
  <rect x="184" y="92" width="28" height="22" rx="3" fill="#fff8ee" stroke="#3c2a4a" stroke-width="3"/>
</svg>`;

const MAILBOX = `<svg viewBox="0 0 160 180" aria-hidden="true">
  <rect x="74" y="70" width="12" height="90" rx="4" fill="#5b3a2a" stroke="#3c2a4a" stroke-width="3" transform="rotate(-8 80 110)"/>
  <rect x="28" y="48" width="92" height="48" rx="16" fill="#7a3d62" stroke="#3c2a4a" stroke-width="4" transform="rotate(-8 74 72)"/>
  <rect x="104" y="40" width="10" height="28" rx="2" fill="#e8b84a" stroke="#3c2a4a" stroke-width="3"/>
  <circle cx="48" cy="70" r="5" fill="#e8b84a"/>
</svg>`;

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function placeButton(
  parent: HTMLElement,
  className: string,
  label: string,
  x: number,
  width: number,
  svg = '',
): HTMLButtonElement {
  const button = el('button', className);
  button.type = 'button';
  button.tabIndex = -1;
  button.style.left = `${x}px`;
  button.style.width = `${width}px`;
  if (svg) button.innerHTML = svg;
  const name = el('span', className.includes('building') ? 'building-label' : '', label);
  if (!className.includes('building')) name.className = '';
  if (className.includes('building')) button.append(name);
  else button.textContent = label;
  parent.append(button);
  return button;
}

export function updateTrails(trails: HTMLElement, mounds: Target[], dogWorldX: number, active: boolean): void {
  trails.replaceChildren();
  trails.hidden = !active;
  if (!active) return;
  for (const mound of mounds) {
    const line = el('span', 'scent');
    const left = Math.min(dogWorldX, mound.x);
    line.style.left = `${left}px`;
    line.style.width = `${Math.max(24, Math.abs(mound.x - dogWorldX))}px`;
    trails.append(line);
  }
}

export function buildWorld(stage: HTMLElement): { layers: HTMLElement[]; targets: Target[]; mounds: Target[]; trails: HTMLElement } {
  const world = el('div', 'world');
  const sky = el('div', 'layer sky');
  sky.dataset.speed = '0.22';
  const skyBg = el('div', 'sky-bg');
  sky.append(skyBg);
  for (let i = 0; i < 6; i += 1) {
    const cloud = el('div', 'cloud');
    cloud.style.left = `${30 + i * 220}px`;
    cloud.style.top = `${28 + (i % 3) * 34}px`;
    cloud.style.width = `${110 + (i % 3) * 28}px`;
    cloud.style.height = '40px';
    sky.append(cloud);
  }
  for (let i = 0; i < 8; i += 1) {
    const cloud = el('div', 'cloud');
    cloud.style.left = `${120 + i * 640}px`;
    cloud.style.top = `${40 + (i % 3) * 36}px`;
    cloud.style.width = `${120 + (i % 3) * 30}px`;
    cloud.style.height = '42px';
    sky.append(cloud);
  }
  const stars = el('div', 'stars');
  for (let i = 0; i < 36; i += 1) {
    const star = el('span', 'firefly');
    star.style.left = `${80 + ((i * 137) % 5000)}px`;
    star.style.top = `${20 + ((i * 53) % 180)}px`;
    star.style.animationDelay = `${(i % 7) * 0.3}s`;
    stars.append(star);
  }
  sky.append(stars);

  const hills = el('div', 'layer hills');
  hills.dataset.speed = '0.48';
  hills.append(el('div', 'hills-bg'));

  const village = el('div', 'layer village');
  village.dataset.speed = '1';
  village.append(el('div', 'ground'));
  for (const x of [820, 1700, 3000, 4700]) {
    const tree = el('div', 'tree');
    tree.style.left = `${x}px`;
    tree.innerHTML = `<svg viewBox="0 0 80 130" aria-hidden="true"><rect x="34" y="70" width="12" height="48" rx="4" fill="#5b3a2a" stroke="#3c2a4a" stroke-width="3"/><ellipse cx="40" cy="58" rx="28" ry="26" fill="#5f7d52" stroke="#3c2a4a" stroke-width="3"/><ellipse cx="28" cy="70" rx="16" ry="14" fill="#6e8b5a" stroke="#3c2a4a" stroke-width="3"/><ellipse cx="54" cy="72" rx="16" ry="14" fill="#4e6b52" stroke="#3c2a4a" stroke-width="3"/></svg>`;
    village.append(tree);
  }

  const targets: Target[] = [];
  const addOpen = (button: HTMLButtonElement, id: string, label: string, x: number, width: number, element: HTMLElement | null) => {
    if (!element) return;
    button.dataset.open = id;
    button.setAttribute('aria-label', label);
    targets.push({ kind: 'open', id, label, x, width, element });
  };

  const about = document.getElementById('about');
  const skills = document.getElementById('skills');
  const projects = document.getElementById('projects');
  const contact = document.getElementById('contact');
  const graveyard = document.getElementById('graveyard');

  addOpen(placeButton(village, 'building cottage', 'Cottage', 30, 230, COTTAGE), 'about', 'Open cottage', 30, 230, about);
  addOpen(placeButton(village, 'building workshop', 'Workshop', 1180, 300, WORKSHOP), 'skills', 'Open workshop', 1180, 300, skills);
  addOpen(placeButton(village, 'building market', 'Market', 2050, 900, ''), 'projects', 'Open market', 2050, 900, projects);

  document.querySelectorAll<HTMLElement>('#projects article.project-card').forEach((article, index) => {
    const x = 2140 + index * 165;
    const label = article.dataset.short || 'Project';
    const button = placeButton(village, 'stall', label, x, 150);
    addOpen(button, article.id, `Open ${label}`, x, 150, article);
  });

  addOpen(placeButton(village, 'building mailbox', 'Mailbox', 3520, 180, MAILBOX), 'contact', 'Open mailbox', 3520, 180, contact);
  addOpen(placeButton(village, 'building yard', 'Graveyard', 4020, 760, ''), 'graveyard', 'Open graveyard', 4020, 760, graveyard);

  document.querySelectorAll<HTMLElement>('#graveyard article').forEach((article, index) => {
    const x = 4120 + index * 210;
    const name = article.querySelector('h3')?.textContent?.trim() || `Stone ${index + 1}`;
    const button = placeButton(village, 'tomb', name, x, 180);
    button.setAttribute('aria-label', name);
    addOpen(button, article.id, `Open ${name}`, x, 180, article);
  });

  const mounds: Target[] = [];
  const trails = el('div', 'trails');
  trails.hidden = true;
  village.append(trails);
  document.querySelectorAll<HTMLElement>('[data-bone]').forEach((bone, index) => {
    const x = 980 + index * 400;
    const button = placeButton(village, 'mound', 'Dig', x, 74);
    button.setAttribute('aria-label', 'Dig this spot');
    mounds.push({ kind: 'dig', id: bone.id, label: 'Dig here', x, width: 74, element: bone });
    button.addEventListener('click', () => {
      button.dispatchEvent(new CustomEvent('dig', { bubbles: true, detail: bone }));
    });
  });

  const grass = el('div', 'layer grass');
  grass.dataset.speed = '1.15';
  grass.append(el('div', 'grass-bg'));
  for (let i = 0; i < 18; i += 1) {
    const leaf = el('span', 'leaf');
    leaf.style.left = `${100 + i * 360}px`;
    leaf.style.bottom = `${40 + (i % 4) * 18}px`;
    leaf.style.animationDelay = `${i * 0.4}s`;
    grass.append(leaf);
  }

  world.append(sky, hills, village, grass);
  stage.append(world);
  return { layers: [sky, hills, village, grass], targets, mounds, trails };
}
