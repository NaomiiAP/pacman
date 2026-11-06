import gsap from 'gsap';
import '../styles/dog.css';
import { cloud, moon } from '../art/critters.ts';
import { icon, lanternSticker } from '../art/icons.ts';
import { pupArt, pupHead } from '../art/pup.ts';
import { porch } from '../art/village.ts';
import { VillageAudio } from './audio.ts';
import { createDog, type Costume, type Pose } from './dog.ts';
import { WORLD_WIDTH, buildWorld, updateTrails, type Place, type Target } from './scene.ts';

const OPENING_KEY = 'naomi-spirit-opening-seen';
const COSTUME_KEY = 'naomi-spirit-costume';
const SOUND_KEY = 'naomi-spirit-sound';

/** The pup wakes at the cottage door and can walk to the far fence. */
const START_X = 190;
const END_X = WORLD_WIDTH - 230;

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const touchFirst = () => window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 720;

let mounted = false;
let dogRoot: HTMLElement;
let human: HTMLElement | null = null;
let scroller: HTMLElement;
let spacer: HTMLElement;
let stage: HTMLElement;
let openNear: HTMLButtonElement;
let status: HTMLElement;
let dialog: HTMLDialogElement;
let digDialog: HTMLDialogElement;
let digBody: HTMLElement;
let digKicker: HTMLElement;
let slot: HTMLElement;
let gust: HTMLElement;
let opening: HTMLElement;
let trails: HTMLElement;
let mapDot: HTMLElement;
let coach: HTMLElement;
let layers: HTMLElement[] = [];
let speeds: number[] = [];
let targets: Target[] = [];
let mounds: Target[] = [];
let places: Place[] = [];
let parked: { node: HTMLElement; parent: Node; next: ChildNode | null; hideAgain: boolean } | null = null;
let sniffHeld = false;
let sniffLocked = false;
let lastScroll = 0;
let lastMove = performance.now();
let pose: Pose = 'idle';
let sleepBoof = false;
let endingShown = false;
let shownX = START_X;
let frame = 0;
const lit = new Set<string>();
const audio = new VillageAudio();
const dog = createDog();

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function iconButton(className: string, glyph: string, label: string, visibleLabel = true): HTMLButtonElement {
  const button = el('button', className);
  button.type = 'button';
  button.innerHTML = `<span class="hud-icon" aria-hidden="true">${glyph}</span>`;
  const text = el('span', visibleLabel ? 'hud-label' : 'visually-hidden', label);
  button.append(text);
  return button;
}

function skyPhase(now = new Date()): 'golden' | 'dusk' | 'night' {
  const hour = now.getHours() + now.getMinutes() / 60;
  if (hour >= 17 && hour < 19.5) return 'dusk';
  if (hour >= 19.5 || hour < 6) return 'night';
  return 'golden';
}

function sniffing(): boolean {
  return sniffHeld || sniffLocked;
}

function maxScroll(): number {
  return Math.max(1, scroller.scrollHeight - scroller.clientHeight);
}

function layout(): void {
  spacer.style.height = `${Math.max(scroller.clientHeight, 1) + (END_X - START_X)}px`;
}

/** Where the scroll position puts the pup in the world. */
function goalX(): number {
  return START_X + (scroller.scrollTop / maxScroll()) * (END_X - START_X);
}

/** The camera keeps the pup a little left of centre and stops at the world's edges. */
function cameraFor(worldX: number): number {
  const width = stage.clientWidth;
  const anchor = width * (width < 720 ? 0.3 : 0.36);
  return Math.min(Math.max(0, worldX - anchor), Math.max(0, WORLD_WIDTH - width));
}

function nearest(): Target | null {
  const within = (pool: Target[], radius: number): Target | null => {
    let best: Target | null = null;
    let bestDist = radius;
    for (const target of pool) {
      const dist = Math.abs(target.x + target.width / 2 - shownX);
      if (dist < bestDist) {
        best = target;
        bestDist = dist;
      }
    }
    return best;
  };
  // Standing right on a dig spot beats a building nearby, so E digs there.
  return within(mounds, 56) ?? within(targets, 300) ?? within(mounds, 110);
}

function render(): void {
  const camera = cameraFor(shownX);
  layers.forEach((layer, index) => {
    layer.style.transform = `translate3d(${(-camera * (speeds[index] ?? 1)).toFixed(1)}px, 0, 0)`;
  });
  dog.root.style.transform = `translate3d(${(shownX - camera).toFixed(1)}px, 0, 0)`;
  mapDot.style.left = `${((shownX / WORLD_WIDTH) * 100).toFixed(2)}%`;
  updateTrails(trails, mounds, shownX, sniffing());
  const near = nearest();
  if (near) {
    openNear.hidden = false;
    openNear.querySelector('.hud-label')!.textContent = near.label;
    // The prompt floats over the pup's head like a thought bubble.
    const half = openNear.offsetWidth / 2 + 12;
    const x = Math.min(stage.clientWidth - half, Math.max(half, shownX - camera));
    openNear.style.left = `${x.toFixed(1)}px`;
  } else {
    openNear.hidden = true;
  }
  const text = near ? near.label : 'Walking the village';
  if (status.textContent !== text) status.textContent = text;
}

function tick(): void {
  frame = 0;
  const goal = goalX();
  const diff = goal - shownX;
  if (reduced() || Math.abs(diff) < 0.6) {
    shownX = goal;
  } else {
    shownX += diff * 0.2;
    lastMove = performance.now();
    if (pose !== 'walk') setPose('walk');
  }
  render();
  if (shownX !== goal) frame = requestAnimationFrame(tick);
}

function schedule(): void {
  if (!frame) frame = requestAnimationFrame(tick);
}

function setPose(next: Pose): void {
  if (next === pose) return;
  if (next === 'sleep' && !sleepBoof) {
    sleepBoof = true;
    audio.boof();
  }
  if (next === 'walk') sleepBoof = false;
  pose = next;
  dog.setPose(next);
}

function restore(): void {
  if (!parked) return;
  const { node, parent, next, hideAgain } = parked;
  if (hideAgain) node.hidden = true;
  parent.insertBefore(node, next);
  parked = null;
}

function lanternFor(node: HTMLElement): 'about' | 'skills' | 'projects' | null {
  if (node.id === 'about' || node.id === 'skills' || node.id === 'projects') return node.id;
  if (node.id.startsWith('project-')) return 'projects';
  return null;
}

function openNode(node: HTMLElement): void {
  if (dialog.open) dialog.close();
  restore();
  const hideAgain = Boolean(node.hidden);
  node.hidden = false;
  parked = { node, parent: node.parentNode as Node, next: node.nextSibling, hideAgain };
  slot.append(node);
  const heading = node.querySelector('h2, h3');
  if (heading instanceof HTMLElement && heading.id) dialog.setAttribute('aria-labelledby', heading.id);
  else dialog.setAttribute('aria-label', 'Portfolio section');
  if (!reduced()) void playGust();
  dialog.showModal();
  slot.scrollTop = 0;
  const key = lanternFor(node);
  if (key) {
    lit.add(key);
    document.querySelector(`[data-lantern="${key}"]`)?.classList.add('lit');
    if (lit.size === 3 && !endingShown) {
      endingShown = true;
      const ending = document.getElementById('lantern-ending');
      if (ending) window.setTimeout(() => openNode(ending), 500);
    }
  }
}

/** Shows what was buried: one note, or (for the awards spot) the whole list. */
function dig(spot: HTMLElement): void {
  const notes = spot.dataset.bone
    ? [spot.dataset.bone]
    : [...spot.querySelectorAll<HTMLElement>('[data-bone]')].map((node) => node.dataset.bone ?? '');
  const found = notes.map((note) => note.trim()).filter(Boolean);
  digKicker.textContent = found.length > 1 ? `${found.length} buried notes` : 'A buried note';
  if (found.length > 1) {
    const list = el('ul', 'dig-list');
    for (const note of found) list.append(el('li', undefined, note));
    digBody.replaceChildren(list);
  } else {
    digBody.textContent = found[0] ?? spot.innerText.trim();
  }
  if (!digDialog.open) digDialog.showModal();
}

function activate(target: Target): void {
  if (target.kind === 'dig') dig(target.element);
  else openNode(target.element);
}

function playGust(): Promise<void> {
  if (reduced()) return Promise.resolve();
  const leaves = [...gust.querySelectorAll<HTMLElement>('.gust-leaf')];
  gust.hidden = false;
  return new Promise((resolve) => {
    gsap.killTweensOf(leaves);
    gsap.fromTo(
      leaves,
      { x: -90, opacity: 0, rotation: -16 },
      {
        x: () => window.innerWidth + 140,
        opacity: 1,
        rotation: 200,
        duration: 0.75,
        stagger: 0.02,
        ease: 'power1.in',
        onComplete: () => {
          gust.hidden = true;
          resolve();
        },
      },
    );
  });
}

function playOpening(): Promise<void> {
  opening.hidden = false;
  const moonArt = opening.querySelector('.opening-moon');
  const clouds = opening.querySelectorAll('.opening-cloud');
  const porchArt = opening.querySelector('.opening-porch');
  const pup = opening.querySelector<HTMLElement>('.opening-pup');
  const skip = opening.querySelector<HTMLButtonElement>('.skip-open');
  pup?.classList.replace('is-sit', 'is-sleep');
  skip?.focus();
  return new Promise((resolve) => {
    let settled = false;
    let timeline: gsap.core.Timeline | null = null;
    const finish = () => {
      if (settled) return;
      settled = true;
      timeline?.kill();
      opening.hidden = true;
      gsap.set(opening, { clearProps: 'opacity,visibility' });
      window.removeEventListener('keydown', onEscape, true);
      resolve();
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      finish();
    };
    skip?.addEventListener('click', finish, { once: true });
    window.addEventListener('keydown', onEscape, true);
    timeline = gsap.timeline({ defaults: { ease: 'power1.inOut' } });
    if (moonArt) timeline.fromTo(moonArt, { y: 30, scale: 1.3 }, { y: -30, scale: 0.8, duration: 2.8 }, 0);
    timeline.fromTo(clouds, { x: -20 }, { x: 40, duration: 3 }, 0);
    if (porchArt) timeline.fromTo(porchArt, { y: 30 }, { y: 0, duration: 1.4 }, 0.1);
    if (pup) {
      timeline.call(() => pup.classList.replace('is-sleep', 'is-sit'), [], 1.7);
      timeline.fromTo(pup, { y: 0 }, { y: -14, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, 1.7);
    }
    timeline.to(opening, { autoAlpha: 0, duration: 0.45, onComplete: finish }, 3.4);
  });
}

function onKey(event: KeyboardEvent): void {
  if (!document.body.classList.contains('is-dog')) return;
  const tag = (event.target as HTMLElement | null)?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (event.key === 's' || event.key === 'S') {
    sniffHeld = event.type === 'keydown';
    dogRoot.classList.toggle('is-sniffing', sniffing());
    render();
    return;
  }
  if (event.type !== 'keydown' || opening.hidden === false || dialog.open || digDialog.open) return;
  const back = event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -140 : 0;
  const forward = event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 140 : 0;
  if (back || forward) {
    event.preventDefault();
    scroller.scrollTop += back + forward;
  }
  if ((event.key === 'e' || event.key === 'E' || (event.key === 'Enter' && event.target === scroller)) && !openNear.hidden) {
    event.preventDefault();
    const near = nearest();
    if (near) activate(near);
  }
}

function scrollToTarget(target: Target): void {
  const centre = Math.min(END_X, Math.max(START_X, target.x + target.width / 2));
  scroller.scrollTop = ((centre - START_X) / (END_X - START_X)) * maxScroll();
  schedule();
}

function readCostume(): Costume {
  const saved = sessionStorage.getItem(COSTUME_KEY);
  if (saved === 'pumpkin' || saved === 'ghost' || saved === 'witch' || saved === 'plain') return saved;
  return 'plain';
}

/**
 * A button that walks the pup for as long as it is held. A keyboard
 * press (or a click without a pointer) takes one step instead.
 */
function walkButton(direction: -1 | 1): HTMLButtonElement {
  const label = direction < 0 ? 'Walk left' : 'Walk right';
  const button = iconButton('hud-round walk-btn', icon(direction < 0 ? 'left' : 'right'), label, false);
  button.title = label;
  let frame = 0;
  let fromPointer = false;
  const step = () => {
    scroller.scrollTop += direction * 9;
    frame = requestAnimationFrame(step);
  };
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    button.classList.remove('is-held');
  };
  button.addEventListener('pointerdown', (event) => {
    fromPointer = true;
    event.preventDefault();
    button.setPointerCapture(event.pointerId);
    button.classList.add('is-held');
    if (!frame) step();
  });
  button.addEventListener('pointerup', stop);
  button.addEventListener('pointercancel', stop);
  button.addEventListener('lostpointercapture', stop);
  button.addEventListener('contextmenu', (event) => event.preventDefault());
  button.addEventListener('click', () => {
    if (fromPointer) {
      fromPointer = false;
      return;
    }
    scroller.scrollTop += direction * 140;
  });
  return button;
}

function buildHud(): HTMLElement {
  const hud = el('div', 'dog-hud');
  const top = el('div', 'hud-top');

  const back = iconButton('hud-btn primary back-btn', icon('home'), 'Back to human');
  back.addEventListener('click', () => exitDog());

  const lanterns = el('ul', 'lanterns');
  lanterns.setAttribute('aria-label', 'Memory lanterns');
  for (const [id, label] of [
    ['about', 'About'],
    ['skills', 'Skills'],
    ['projects', 'Projects'],
  ] as const) {
    const item = el('li');
    item.dataset.lantern = id;
    item.innerHTML = `<span class="lantern-art" aria-hidden="true">${lanternSticker()}</span>`;
    item.append(el('span', 'lantern-label', label));
    lanterns.append(item);
  }

  const costumes = el('div', 'costumes');
  costumes.setAttribute('role', 'group');
  costumes.setAttribute('aria-label', 'Costumes');
  const saved = readCostume();
  dog.setCostume(saved);
  const costumeNames: Record<Costume, string> = { plain: 'No costume', pumpkin: 'Pumpkin', ghost: 'Ghost', witch: 'Witch hat' };
  for (const costume of ['plain', 'pumpkin', 'ghost', 'witch'] as const) {
    const button = iconButton('hud-round costume-btn', pupHead('pup-head-art', costume === 'plain' ? undefined : costume), costumeNames[costume], false);
    button.title = costumeNames[costume];
    button.setAttribute('aria-pressed', String(costume === saved));
    button.addEventListener('click', () => {
      dog.setCostume(costume);
      sessionStorage.setItem(COSTUME_KEY, costume);
      costumes.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
    });
    costumes.append(button);
  }

  const sound = iconButton('hud-round sound-btn', '', 'Sound', false);
  sound.title = 'Sound';
  const paintSound = () => {
    sound.querySelector('.hud-icon')!.innerHTML = icon(audio.enabled ? 'soundOn' : 'soundOff');
    sound.setAttribute('aria-pressed', String(audio.enabled));
  };
  sound.addEventListener('click', () => {
    audio.setEnabled(!audio.enabled);
    sessionStorage.setItem(SOUND_KEY, audio.enabled ? 'on' : 'off');
    paintSound();
  });
  if (sessionStorage.getItem(SOUND_KEY) === 'on') audio.setEnabled(true);
  paintSound();

  const askPup = iconButton('hud-round ask-btn', icon('chat'), 'Ask the pup', false);
  askPup.title = 'Ask the pup';
  askPup.addEventListener('click', () => document.dispatchEvent(new Event('ask-pup')));

  const tools = el('div', 'hud-tools');
  tools.append(costumes, askPup, sound);
  top.append(back, lanterns, tools);

  const bottom = el('div', 'hud-bottom');
  const hints = el('div', 'hints');
  hints.append(el('p', 'walk-hint', 'Scroll to walk'), el('p', 'key-hint', 'Arrows or A and D walk · S sniff · E opens'));

  const map = el('nav', 'minimap');
  map.setAttribute('aria-label', 'Village map');
  const track = el('div', 'map-track');
  track.setAttribute('aria-hidden', 'true');
  for (const target of targets) {
    if (!places.some((place) => place.id === target.id)) continue;
    const pin = el('span', 'map-pin');
    pin.style.left = `${(((target.x + target.width / 2) / WORLD_WIDTH) * 100).toFixed(2)}%`;
    track.append(pin);
  }
  mapDot = el('span', 'map-dot');
  mapDot.innerHTML = icon('paw');
  track.append(mapDot);
  const stops = el('div', 'map-stops');
  for (const place of places) {
    const button = iconButton('map-stop', icon(place.icon), place.label);
    button.addEventListener('click', () => {
      const target = targets.find((item) => item.id === place.id);
      if (target) scrollToTarget(target);
    });
    stops.append(button);
  }
  map.append(track, stops);
  const mapRow = el('div', 'map-row');
  mapRow.append(walkButton(-1), map, walkButton(1));

  const sniffBtn = iconButton('hud-btn sniff-btn', icon('nose'), 'Sniff');
  sniffBtn.setAttribute('aria-pressed', 'false');
  sniffBtn.addEventListener('click', () => {
    sniffLocked = !sniffLocked;
    sniffBtn.setAttribute('aria-pressed', String(sniffLocked));
    dogRoot.classList.toggle('is-sniffing', sniffing());
    render();
  });

  openNear = iconButton('hud-btn primary open-near', icon('spark'), 'Open');
  openNear.id = 'open-near';
  openNear.hidden = true;
  openNear.addEventListener('click', () => {
    const near = nearest();
    if (near) activate(near);
  });

  status = el('p', 'visually-hidden');
  status.setAttribute('aria-live', 'polite');
  coach = el('p', 'coach', 'Swipe sideways, or hold the arrows, to walk');
  bottom.append(hints, mapRow, sniffBtn);
  hud.append(top, coach, openNear, bottom, status);
  return hud;
}

function buildDialogs(): void {
  dialog = el('dialog', 'section-dialog');
  const card = el('div', 'dialog-card');
  const close = iconButton('hud-btn dialog-close', icon('close'), 'Close');
  close.addEventListener('click', () => dialog.close());
  slot = el('div', 'dialog-slot');
  card.append(close, slot);
  dialog.append(card);
  dialog.addEventListener('close', () => restore());

  digDialog = el('dialog', 'dig-dialog');
  const digCard = el('div', 'dialog-card dig-card');
  const digClose = iconButton('hud-btn dialog-close', icon('close'), 'Close');
  digClose.addEventListener('click', () => digDialog.close());
  const digArt = el('div', 'dig-art is-sit');
  digArt.innerHTML = pupArt();
  digArt.setAttribute('aria-hidden', 'true');
  digBody = el('div', 'dig-body');
  digKicker = el('p', 'kicker', 'A buried note');
  digCard.append(digClose, digArt, digKicker, digBody);
  digDialog.append(digCard);
}

function mount(): void {
  dogRoot = document.getElementById('dog-root') as HTMLElement;
  human = document.getElementById('human');
  dogRoot.dataset.sky = skyPhase();
  dogRoot.replaceChildren();

  scroller = el('div', 'dog-scroll');
  scroller.id = 'dog-scroll';
  scroller.tabIndex = 0;
  scroller.setAttribute('role', 'region');
  scroller.setAttribute('aria-label', 'Village path. Scroll or press A and D to walk.');
  spacer = el('div', 'dog-spacer');
  scroller.append(spacer);

  stage = el('div', 'dog-stage');
  const world = buildWorld(stage);
  layers = world.layers;
  speeds = layers.map((layer) => Number(layer.dataset.speed ?? 1));
  targets = world.targets;
  mounds = world.mounds;
  trails = world.trails;
  places = world.places;
  stage.append(el('div', 'sky-tint'), dog.root);

  const hud = buildHud();
  buildDialogs();

  gust = el('div', 'gust');
  gust.hidden = true;
  gust.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 16; i += 1) {
    const leaf = el('span', `gust-leaf tone-${i % 4}`);
    leaf.style.top = `${8 + ((i * 17) % 80)}%`;
    gust.append(leaf);
  }

  opening = el('div', 'opening');
  opening.hidden = true;
  opening.innerHTML = `
    <button type="button" class="hud-btn skip-open"><span class="hud-label">Skip</span></button>
    <div class="opening-stars" aria-hidden="true"></div>
    <div class="opening-moon" aria-hidden="true">${moon()}</div>
    <div class="opening-cloud" aria-hidden="true" style="width:200px;top:24%;left:6%">${cloud()}</div>
    <div class="opening-cloud" aria-hidden="true" style="width:150px;top:36%;left:64%">${cloud({ tint: '#ffdeeb' })}</div>
    <div class="opening-porch" aria-hidden="true">${porch()}<div class="opening-pup is-sleep">${pupArt()}</div></div>
    <p class="opening-caption">A little spirit pup wakes in a basket on the porch.</p>
  `;

  dogRoot.append(stage, scroller, hud, dialog, digDialog, gust, opening);

  stage.addEventListener('click', (event) => {
    const hit = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-open]');
    if (!hit?.dataset.open) return;
    const target = targets.find((item) => item.id === hit.dataset.open || item.element.id === hit.dataset.open);
    if (target) openNode(target.element);
  });
  // The chat pup can send the walking pup to a building.
  document.addEventListener('pup-goto', (event) => {
    const id = (event as CustomEvent<string>).detail;
    const target = targets.find((item) => item.id === id);
    if (target) scrollToTarget(target);
  });
  stage.addEventListener('dig', (event) => {
    const bone = (event as CustomEvent<HTMLElement>).detail;
    if (bone) dig(bone);
  });

  scroller.addEventListener(
    'scroll',
    () => {
      const top = scroller.scrollTop;
      if (Math.abs(top - lastScroll) > 0.5) {
        dog.setFacingLeft(top < lastScroll);
        lastMove = performance.now();
        setPose('walk');
        audio.footstep();
      }
      lastScroll = top;
      schedule();
    },
    { passive: true },
  );
  // Sideways swipes walk too. The scroller only scrolls up and down by itself.
  let swipeX: number | null = null;
  scroller.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') swipeX = event.clientX;
  });
  scroller.addEventListener('pointermove', (event) => {
    if (swipeX === null || event.pointerType !== 'touch') return;
    const dx = event.clientX - swipeX;
    swipeX = event.clientX;
    scroller.scrollTop -= dx * 1.6;
  });
  const endSwipe = () => {
    swipeX = null;
  };
  scroller.addEventListener('pointerup', endSwipe);
  scroller.addEventListener('pointercancel', endSwipe);

  scroller.addEventListener('click', (event) => {
    scroller.style.pointerEvents = 'none';
    const under = document.elementFromPoint(event.clientX, event.clientY);
    scroller.style.pointerEvents = '';
    const hit = under?.closest('button');
    if (hit instanceof HTMLButtonElement && stage.contains(hit)) hit.click();
  });

  window.setInterval(() => {
    if (!document.body.classList.contains('is-dog')) return;
    const idle = performance.now() - lastMove;
    if (idle > 10000) setPose('sleep');
    else if (idle > 2500) setPose('sit');
    else if (idle > 180) setPose('idle');
  }, 250);

  window.addEventListener('keydown', onKey);
  window.addEventListener('keyup', onKey);
  window.addEventListener('resize', () => {
    if (dogRoot.hidden) return;
    layout();
    render();
  });
  dogRoot.addEventListener('pointerdown', (event) => {
    if (reduced() || !finePointer() || !document.body.classList.contains('is-dog')) return;
    const print = el('span', 'paw-print');
    print.style.left = `${event.clientX}px`;
    print.style.top = `${event.clientY}px`;
    document.body.append(print);
    print.addEventListener('animationend', () => print.remove());
  });
  mounted = true;
}

export async function enterDog(): Promise<void> {
  if (!mounted) mount();
  if (human) human.inert = true;
  dogRoot.hidden = false;
  document.body.classList.add('is-dog');
  document.body.classList.toggle('paw-cursor', finePointer() && !reduced());
  dogRoot.dataset.sky = skyPhase();
  layout();
  shownX = goalX();
  lastScroll = scroller.scrollTop;
  render();
  const seen = sessionStorage.getItem(OPENING_KEY) === '1';
  if (reduced()) sessionStorage.setItem(OPENING_KEY, '1');
  else if (!seen) {
    await playOpening();
    sessionStorage.setItem(OPENING_KEY, '1');
  } else {
    await playGust();
  }
  if (audio.enabled) audio.startMusic();
  if (touchFirst()) {
    coach.classList.add('is-shown');
    window.setTimeout(() => coach.classList.remove('is-shown'), 6000);
  }
  document.querySelector<HTMLButtonElement>('.dog-hud .back-btn')?.focus();
}

export function exitDog(): void {
  if (dialog?.open) dialog.close();
  if (digDialog?.open) digDialog.close();
  restore();
  audio.stopMusic();
  if (human) human.inert = false;
  dogRoot.hidden = true;
  document.body.classList.remove('is-dog', 'paw-cursor');
  document.querySelectorAll('.paw-print').forEach((print) => print.remove());
  document.querySelector<HTMLButtonElement>('[data-enter-dog]')?.focus();
}
