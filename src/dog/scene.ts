import { cloud, moon, pumpkin, wrappedCandy, candyCorn } from '../art/critters.ts';
import { academy } from '../art/decor.ts';
import { sparkle } from '../art/kit.ts';
import { portfolio } from '../content/portfolio.ts';
import { buriedNotes, type BuriedNote } from './notes.ts';
import {
  bush,
  cottage,
  fence,
  graveGate,
  hills,
  lamp,
  mailbox,
  marketGate,
  mound,
  questBoard,
  stall,
  sun,
  tomb,
  tree,
  trophyHall,
  welcomeSign,
  workshop,
} from '../art/village.ts';

export const WORLD_WIDTH = 5200;

export type Target = {
  kind: 'open' | 'dig';
  id: string;
  label: string;
  x: number;
  width: number;
  element: HTMLElement;
  /** Dig spots only: what the pup digs up. */
  note?: BuriedNote;
};

/** A stop on the village map. */
export type Place = { id: string; label: string; icon: string };

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function placeScenery(parent: HTMLElement, markup: string, x: number, width: number, className = ''): HTMLElement {
  const holder = el('span', `scenery ${className}`.trim());
  holder.innerHTML = markup;
  holder.style.left = `${x}px`;
  holder.style.width = `${width}px`;
  holder.setAttribute('aria-hidden', 'true');
  parent.append(holder);
  return holder;
}

function placeButton(parent: HTMLElement, className: string, label: string, x: number, width: number, markup: string): HTMLButtonElement {
  const button = el('button', className);
  button.type = 'button';
  button.tabIndex = -1;
  button.style.left = `${x}px`;
  button.style.width = `${width}px`;
  const art = el('span', 'place-art');
  art.innerHTML = markup;
  art.setAttribute('aria-hidden', 'true');
  button.append(art, el('span', 'building-label', label));
  parent.append(button);
  return button;
}

/** Scent trails run from the pup to dig spots that are close enough to smell. */
export function updateTrails(trails: HTMLElement, mounds: Target[], dogWorldX: number, active: boolean): void {
  trails.replaceChildren();
  trails.hidden = !active;
  if (!active) return;
  for (const spot of mounds) {
    const centre = spot.x + spot.width / 2;
    if (Math.abs(centre - dogWorldX) > 1100) continue;
    const line = el('span', 'scent');
    const left = Math.min(dogWorldX, centre);
    line.style.left = `${left}px`;
    line.style.width = `${Math.max(24, Math.abs(centre - dogWorldX))}px`;
    trails.append(line);
  }
}

export function buildWorld(stage: HTMLElement): {
  layers: HTMLElement[];
  targets: Target[];
  mounds: Target[];
  trails: HTMLElement;
  places: Place[];
} {
  const world = el('div', 'world');

  const sky = el('div', 'layer sky');
  sky.dataset.speed = '0.12';
  sky.append(el('div', 'sky-bg'));
  const stars = el('div', 'stars');
  for (let i = 0; i < 46; i += 1) {
    const star = el('span', i % 4 === 0 ? 'star is-sparkle' : 'star');
    star.style.left = `${40 + ((i * 137) % 2600)}px`;
    star.style.top = `${4 + ((i * 53) % 44)}%`;
    star.style.animationDelay = `${(i % 7) * 0.35}s`;
    if (i % 4 === 0) star.innerHTML = `<svg viewBox="0 0 20 20" aria-hidden="true">${sparkle(10, 10, 8, i % 8 === 0 ? '#ffa6c9' : '#ffe07a', false)}</svg>`;
    stars.append(star);
  }
  sky.append(stars);
  const skyItem = (markup: string, x: number, width: number, top: string, className: string) => {
    placeScenery(sky, markup, x, width, className).style.top = top;
  };
  skyItem(moon(), 980, 130, '8%', 'sky-moon');
  skyItem(sun(), 940, 150, '7%', 'sky-sun');
  skyItem(cloud(), 180, 200, '16%', 'sky-cloud');
  skyItem(cloud({ tint: '#ffdeeb' }), 640, 150, '30%', 'sky-cloud');
  skyItem(cloud(), 1400, 230, '12%', 'sky-cloud');
  skyItem(cloud({ tint: '#ffdeeb' }), 2050, 170, '26%', 'sky-cloud');

  const far = el('div', 'layer hills-far');
  far.dataset.speed = '0.3';
  far.innerHTML = hills(3400, 300, 210, 120, 420, 1.7, 'hill-shape');
  for (const x of [260, 900, 1540, 2300, 2900]) {
    const hut = el('span', 'far-hut');
    hut.style.left = `${x}px`;
    far.append(hut);
  }

  const near = el('div', 'layer hills-near');
  near.dataset.speed = '0.55';
  near.innerHTML = hills(4200, 220, 160, 70, 300, 3.1, 'hill-shape');
  for (const x of [120, 700, 1350, 1980, 2620, 3300, 3900]) {
    const pine = el('span', 'near-tree');
    pine.style.left = `${x}px`;
    near.append(pine);
  }

  const village = el('div', 'layer village');
  village.dataset.speed = '1';
  village.append(el('div', 'ground'));

  placeScenery(village, welcomeSign("Naomi's village"), 350, 160);
  placeScenery(village, lamp(), 1520, 70);
  placeScenery(village, tree(1), 1570, 160);
  placeScenery(village, fence(), 3620, 190);
  placeScenery(village, bush(), 4020, 130);
  placeScenery(village, lamp(), 4180, 70);
  placeScenery(village, tree(1), 4900, 190);
  placeScenery(village, fence(), 5060, 170);

  const targets: Target[] = [];
  const places: Place[] = [];

  /** Puts a building in the village and makes it open `element`. Missing sections are skipped. */
  const stop = (className: string, name: string, x: number, width: number, art: string, element: HTMLElement | null, label: string, place?: Place) => {
    if (!element) return;
    const button = placeButton(village, className, name, x, width, art);
    button.dataset.open = element.id;
    button.setAttribute('aria-label', label);
    targets.push({ kind: 'open', id: element.id, label, x, width, element });
    if (place) places.push(place);
  };

  const section = (id: string) => document.getElementById(id);

  stop('building cottage', 'Cottage', 40, 280, cottage(), section('about'), 'Open cottage', { id: 'about', label: 'Cottage', icon: 'home' });
  stop('building school', 'School', 540, 330, academy(), section('education'), 'Open school', { id: 'education', label: 'School', icon: 'cap' });
  stop('building quests', 'Quests', 906, 220, questBoard(), section('experience'), 'Open quest board', { id: 'experience', label: 'Quests', icon: 'briefcase' });
  stop('building workshop', 'Workshop', 1160, 300, workshop(), section('skills'), 'Open workshop', { id: 'skills', label: 'Workshop', icon: 'book' });
  stop('building market', 'Market', 1740, 320, marketGate(), section('projects'), 'Open market', { id: 'projects', label: 'Market', icon: 'candy' });

  document.querySelectorAll<HTMLElement>('#projects .project-card').forEach((article, index) => {
    const label = article.dataset.short || 'Project';
    stop('stall', label, 2100 + index * 196, 170, stall(index), article, `Open ${label}`);
  });

  stop('building trophies', 'Trophies', 3330, 266, trophyHall(), section('achievements'), 'Open trophy hall', { id: 'achievements', label: 'Trophies', icon: 'trophy' });
  stop('building mailbox', 'Mailbox', 3860, 124, mailbox(), section('contact'), 'Open mailbox', { id: 'contact', label: 'Mailbox', icon: 'mail' });

  const yard = section('graveyard');
  if (yard) {
    stop('building yard', 'Graveyard', 4330, 180, graveGate(), yard, 'Open graveyard', { id: 'graveyard', label: 'Graveyard', icon: 'grave' });
    yard.querySelectorAll<HTMLElement>('.grave-card').forEach((article, index) => {
      const name = article.querySelector('h3')?.textContent?.trim() || `Stone ${index + 1}`;
      stop('tomb', name, 4550 + index * 150, 92, tomb(), article, `Open ${name}`);
    });
  } else {
    // With no stones filled in yet the yard is scenery only.
    placeScenery(village, graveGate(), 4330, 180);
    placeScenery(village, tomb(), 4550, 86);
    placeScenery(village, tomb(), 4700, 72);
  }

  const mounds: Target[] = [];
  const trails = el('div', 'trails');
  trails.hidden = true;
  village.append(trails);
  // A few dig spots, each holding a proper note (see notes.ts).
  const spots = buriedNotes(portfolio);
  const SPOT_W = 96;
  // Spots sit in the grass strip, so keep them out from under building labels.
  const clearOfLabels = (start: number): number => {
    let x = start;
    for (let guard = 0; guard < 24; guard += 1) {
      const hit = targets.find((t) => Math.abs(t.x + t.width / 2 - (x + SPOT_W / 2)) < 64 + SPOT_W / 2);
      if (!hit) break;
      x = Math.round(hit.x + hit.width / 2 + 64 + 6);
    }
    return Math.min(x, WORLD_WIDTH - SPOT_W - 20);
  };
  spots.forEach((note, index) => {
    const x = clearOfLabels(Math.round(640 + index * ((4700 - 640) / Math.max(1, spots.length - 1))));
    const button = el('button', 'mound');
    button.type = 'button';
    button.tabIndex = -1;
    button.style.left = `${x}px`;
    button.innerHTML = `<span class="place-art" aria-hidden="true">${mound()}</span><span class="mound-label">Dig</span>`;
    button.setAttribute('aria-label', 'Dig this spot');
    village.append(button);
    mounds.push({ kind: 'dig', id: note.id, label: 'Dig here', x, width: SPOT_W, element: button, note });
    button.addEventListener('click', () => {
      button.dispatchEvent(new CustomEvent('dig', { bubbles: true, detail: note }));
    });
  });

  const front = el('div', 'layer front');
  front.dataset.speed = '1.2';
  front.append(el('div', 'front-grass'));
  const treats = [pumpkin({ mouth: 'smile' }), candyCorn(), wrappedCandy({ color: '#ffa6c9' }), pumpkin({ hat: true }), wrappedCandy({ color: '#93e5c3' })];
  for (let i = 0; i < 16; i += 1) {
    placeScenery(front, treats[i % treats.length], 260 + i * 400 + ((i * 97) % 140), i % 5 === 0 || i % 5 === 3 ? 58 : 40, 'treat');
  }
  for (let i = 0; i < 22; i += 1) {
    const leaf = el('span', 'leaf');
    leaf.style.left = `${100 + i * 300}px`;
    leaf.style.top = `${10 + ((i * 37) % 50)}%`;
    leaf.style.animationDelay = `${(i * 0.7) % 9}s`;
    front.append(leaf);
  }

  world.append(sky, far, near, village, front);
  stage.append(world);
  return { layers: [sky, far, near, village, front], targets, mounds, trails, places };
}
