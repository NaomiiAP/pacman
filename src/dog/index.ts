import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/dog.css';
import { VillageAudio } from './audio';
import { createDog, type Costume, type Pose } from './dog';
import { WORLD_WIDTH, buildWorld, updateTrails, type Target } from './scene';

gsap.registerPlugin(ScrollTrigger);

const OPENING_KEY = 'naomi-spirit-opening-seen';
const COSTUME_KEY = 'naomi-spirit-costume';
const SOUND_KEY = 'naomi-spirit-sound';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
let slot: HTMLElement;
let gust: HTMLElement;
let opening: HTMLElement;
let trails: HTMLElement;
let layers: HTMLElement[] = [];
let targets: Target[] = [];
let mounds: Target[] = [];
let trigger: ScrollTrigger | null = null;
let parked: { node: HTMLElement; parent: Node; next: ChildNode | null; hideAgain: boolean } | null = null;
let sniffHeld = false;
let sniffLocked = false;
let lastScroll = 0;
let lastMove = performance.now();
let pose: Pose = 'idle';
let sleepBoof = false;
let endingShown = false;
const lit = new Set<string>();
const audio = new VillageAudio();
const dog = createDog();

function skyPhase(now = new Date()): 'golden' | 'dusk' | 'night' {
  const hour = now.getHours() + now.getMinutes() / 60;
  if (hour >= 17 && hour < 19.5) return 'dusk';
  if (hour >= 19.5 || hour < 6) return 'night';
  return 'golden';
}

function sniffing(): boolean {
  return sniffHeld || sniffLocked;
}

function layout(): void {
  const travel = Math.max(900, WORLD_WIDTH - stage.clientWidth);
  spacer.style.height = `${Math.max(scroller.clientHeight, 1) + travel}px`;
}

function cameraX(): number {
  const maxScroll = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
  const travel = Math.max(1, WORLD_WIDTH - stage.clientWidth);
  return (scroller.scrollTop / maxScroll) * travel;
}

function dogOffset(): number {
  const stageRect = stage.getBoundingClientRect();
  const dogRect = dog.root.getBoundingClientRect();
  if (!stageRect.width || !dogRect.width) return stage.clientWidth * 0.28;
  return dogRect.left - stageRect.left + dogRect.width / 2;
}

function nearest(): Target | null {
  const dogX = cameraX() + dogOffset();
  const within = (pool: Target[], radius: number): Target | null => {
    let best: Target | null = null;
    let bestDist = radius;
    for (const target of pool) {
      const dist = Math.abs(target.x + target.width / 2 - dogX);
      if (dist < bestDist) {
        best = target;
        bestDist = dist;
      }
    }
    return best;
  };
  return within(targets, 340) ?? within(mounds, 110);
}

function applyCamera(): void {
  const camera = cameraX();
  const speeds = reduced() ? [1, 1, 1, 1] : [0.22, 0.48, 1, 1.15];
  layers.forEach((layer, index) => {
    gsap.set(layer, { x: -camera * (speeds[index] ?? 1) });
  });
  const dogX = camera + dogOffset();
  updateTrails(trails, mounds, dogX, sniffing());
  const near = nearest();
  if (near) {
    openNear.hidden = false;
    openNear.textContent = near.label;
  } else {
    openNear.hidden = true;
  }
  status.textContent = near ? near.label : 'Walking the village';
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

function activate(target: Target): void {
  if (target.kind === 'dig') {
    digBody.textContent = target.element.innerText.trim();
    if (!digDialog.open) digDialog.showModal();
    return;
  }
  openNode(target.element);
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
        rotation: 24,
        duration: 0.7,
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
  const moon = opening.querySelector('.opening-moon');
  const clouds = opening.querySelectorAll('.opening-cloud');
  const porch = opening.querySelector('.opening-porch');
  const skip = opening.querySelector<HTMLButtonElement>('.skip-open');
  skip?.focus();
  return new Promise((resolve) => {
    let settled = false;
    let timeline: gsap.core.Timeline | null = null;
    const finish = () => {
      if (settled) return;
      settled = true;
      timeline?.kill();
      opening.hidden = true;
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
    if (moon) timeline.fromTo(moon, { y: 20, scale: 1.35 }, { y: -36, scale: 0.7, duration: 2.6 }, 0);
    timeline.fromTo(clouds, { y: 10 }, { y: -60, duration: 2.8 }, 0);
    if (porch) timeline.fromTo(porch, { y: 24 }, { y: 0, duration: 1.4 }, 0.15);
    timeline.to(opening, { autoAlpha: 0, duration: 0.45, onComplete: finish }, 3.1);
  });
}

function onKey(event: KeyboardEvent): void {
  if (!document.body.classList.contains('is-dog')) return;
  const tag = (event.target as HTMLElement | null)?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (event.key === 's' || event.key === 'S') {
    sniffHeld = event.type === 'keydown';
    dogRoot.classList.toggle('is-sniffing', sniffing());
    applyCamera();
    return;
  }
  if (event.type !== 'keydown' || opening.hidden === false) return;
  const step = event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -140 : 0;
  const forward = event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 140 : 0;
  if (step || forward) {
    event.preventDefault();
    scroller.scrollTop += step + forward;
  }
  if ((event.key === 'e' || event.key === 'E' || (event.key === 'Enter' && event.target === scroller)) && !openNear.hidden) {
    event.preventDefault();
    const near = nearest();
    if (near) activate(near);
  }
}

function bindScroll(): void {
  trigger?.kill();
  layout();
  trigger = ScrollTrigger.create({
    scroller,
    trigger: spacer,
    start: 'top top',
    end: 'bottom bottom',
    scrub: reduced() ? true : 0.3,
    onUpdate: () => applyCamera(),
  });
  applyCamera();
}

function scrollToTarget(target: Target): void {
  const maxScroll = Math.max(1, scroller.scrollHeight - scroller.clientHeight);
  const travel = Math.max(1, WORLD_WIDTH - stage.clientWidth);
  const center = target.x + target.width / 2;
  const camera = Math.min(travel, Math.max(0, center - dogOffset()));
  scroller.scrollTo({ top: (camera / travel) * maxScroll, behavior: 'auto' });
  applyCamera();
}

function readCostume(): Costume {
  const saved = sessionStorage.getItem(COSTUME_KEY);
  if (saved === 'pumpkin' || saved === 'ghost' || saved === 'witch' || saved === 'plain') return saved;
  return 'plain';
}

function mount(): void {
  dogRoot = document.getElementById('dog-root') as HTMLElement;
  human = document.getElementById('human');
  dogRoot.dataset.sky = skyPhase();
  dogRoot.replaceChildren();

  scroller = document.createElement('div');
  scroller.id = 'dog-scroll';
  scroller.className = 'dog-scroll';
  scroller.tabIndex = 0;
  scroller.setAttribute('aria-label', 'Village path. Scroll or press A and D to walk.');
  spacer = document.createElement('div');
  spacer.className = 'dog-spacer';
  scroller.append(spacer);

  stage = document.createElement('div');
  stage.className = 'dog-stage';
  const world = buildWorld(stage);
  layers = world.layers;
  targets = world.targets;
  mounds = world.mounds;
  trails = world.trails;
  stage.append(dog.root);

  const hud = document.createElement('div');
  hud.className = 'dog-hud';
  const top = document.createElement('div');
  top.className = 'hud-top';
  const back = document.createElement('button');
  back.type = 'button';
  back.className = 'hud-btn primary';
  back.textContent = 'Back to human';
  back.addEventListener('click', () => exitDog());

  const lanterns = document.createElement('ul');
  lanterns.className = 'lanterns';
  lanterns.setAttribute('aria-label', 'Memory lanterns');
  for (const [id, label] of [
    ['about', 'About'],
    ['skills', 'Skills'],
    ['projects', 'Projects'],
  ] as const) {
    const item = document.createElement('li');
    item.dataset.lantern = id;
    item.textContent = label;
    lanterns.append(item);
  }

  const costumes = document.createElement('div');
  costumes.className = 'costumes';
  const saved = readCostume();
  dog.setCostume(saved);
  for (const costume of ['plain', 'pumpkin', 'ghost', 'witch'] as const) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hud-btn';
    button.textContent = costume === 'plain' ? 'No costume' : costume === 'witch' ? 'Witch hat' : costume[0].toUpperCase() + costume.slice(1);
    button.setAttribute('aria-pressed', String(costume === saved));
    button.addEventListener('click', () => {
      dog.setCostume(costume);
      sessionStorage.setItem(COSTUME_KEY, costume);
      costumes.querySelectorAll('button').forEach((item) => item.setAttribute('aria-pressed', 'false'));
      button.setAttribute('aria-pressed', 'true');
    });
    costumes.append(button);
  }

  const sound = document.createElement('button');
  sound.type = 'button';
  sound.className = 'hud-btn';
  const soundOn = sessionStorage.getItem(SOUND_KEY) === 'on';
  const paintSound = () => {
    sound.textContent = audio.enabled ? 'Sound: on' : 'Sound: off';
    sound.setAttribute('aria-pressed', String(audio.enabled));
  };
  sound.addEventListener('click', () => {
    audio.setEnabled(!audio.enabled);
    sessionStorage.setItem(SOUND_KEY, audio.enabled ? 'on' : 'off');
    paintSound();
  });
  if (soundOn) audio.setEnabled(true);
  paintSound();

  top.append(back, lanterns, costumes, sound);

  const bottom = document.createElement('div');
  bottom.className = 'hud-bottom';
  const hint = document.createElement('p');
  hint.className = 'walk-hint';
  hint.textContent = 'Scroll to walk';
  const keys = document.createElement('p');
  keys.className = 'key-hint';
  keys.textContent = 'Arrows or A and D walk · S sniff · E opens';
  const map = document.createElement('div');
  map.className = 'minimap';
  map.setAttribute('role', 'navigation');
  map.setAttribute('aria-label', 'Village map');
  const mapNames = [
    ['about', 'Cottage'],
    ['skills', 'Workshop'],
    ['projects', 'Market'],
    ['contact', 'Mailbox'],
    ['graveyard', 'Graveyard'],
  ];
  for (const [id, label] of mapNames) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => {
      const target = targets.find((item) => item.id === id);
      if (target) scrollToTarget(target);
    });
    map.append(button);
  }
  const sniffBtn = document.createElement('button');
  sniffBtn.type = 'button';
  sniffBtn.className = 'hud-btn';
  sniffBtn.textContent = 'Sniff';
  sniffBtn.setAttribute('aria-pressed', 'false');
  sniffBtn.addEventListener('click', () => {
    sniffLocked = !sniffLocked;
    sniffBtn.setAttribute('aria-pressed', String(sniffLocked));
    dogRoot.classList.toggle('is-sniffing', sniffing());
    applyCamera();
  });
  openNear = document.createElement('button');
  openNear.id = 'open-near';
  openNear.type = 'button';
  openNear.className = 'hud-btn primary';
  openNear.hidden = true;
  openNear.addEventListener('click', () => {
    const near = nearest();
    if (near) activate(near);
  });
  status = document.createElement('p');
  status.className = 'visually-hidden';
  status.setAttribute('aria-live', 'polite');
  bottom.append(hint, keys, map, sniffBtn, openNear, status);
  hud.append(top, bottom);

  dialog = document.createElement('dialog');
  dialog.className = 'section-dialog';
  const card = document.createElement('div');
  card.className = 'dialog-card';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'hud-btn dialog-close';
  close.textContent = 'Close';
  close.addEventListener('click', () => dialog.close());
  slot = document.createElement('div');
  card.append(close, slot);
  dialog.append(card);
  dialog.addEventListener('close', () => restore());

  digDialog = document.createElement('dialog');
  digDialog.className = 'dig-dialog';
  const digCard = document.createElement('div');
  digCard.className = 'dialog-card';
  const digClose = document.createElement('button');
  digClose.type = 'button';
  digClose.className = 'hud-btn dialog-close';
  digClose.textContent = 'Close';
  digClose.addEventListener('click', () => digDialog.close());
  const digKicker = document.createElement('p');
  digKicker.className = 'kicker';
  digKicker.textContent = 'A buried note';
  digBody = document.createElement('p');
  digCard.append(digClose, digKicker, digBody);
  digDialog.append(digCard);

  gust = document.createElement('div');
  gust.className = 'gust';
  gust.hidden = true;
  gust.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 14; i += 1) {
    const leaf = document.createElement('span');
    leaf.className = 'gust-leaf';
    leaf.style.top = `${8 + ((i * 17) % 80)}%`;
    gust.append(leaf);
  }

  opening = document.createElement('div');
  opening.className = 'opening';
  opening.hidden = true;
  opening.innerHTML = `
    <button type="button" class="hud-btn skip-open">Skip</button>
    <div class="opening-moon"></div>
    <div class="opening-cloud" style="width:180px;top:22%;left:10%"></div>
    <div class="opening-cloud" style="width:240px;top:34%;left:40%"></div>
    <div class="opening-cloud" style="width:160px;top:18%;left:68%"></div>
    <div class="opening-porch">${cottagePorch()}</div>
    <p class="opening-caption">A little spirit pup wakes in a basket on the porch.</p>
  `;

  dogRoot.append(stage, scroller, hud, dialog, digDialog, gust, opening);

  stage.addEventListener('click', (event) => {
    const hit = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-open]');
    if (!hit?.dataset.open) return;
    const target = targets.find((item) => item.id === hit.dataset.open || item.element.id === hit.dataset.open);
    if (target) openNode(target.element);
  });
  stage.addEventListener('dig', (event) => {
    const bone = (event as CustomEvent<HTMLElement>).detail;
    if (!bone) return;
    digBody.textContent = bone.innerText.trim();
    if (!digDialog.open) digDialog.showModal();
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
      applyCamera();
    },
    { passive: true },
  );
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
    bindScroll();
  });
  dogRoot.addEventListener('pointerdown', (event) => {
    if (reduced() || !finePointer() || !document.body.classList.contains('is-dog')) return;
    const print = document.createElement('span');
    print.className = 'paw-print';
    print.style.left = `${event.clientX}px`;
    print.style.top = `${event.clientY}px`;
    document.body.append(print);
    print.addEventListener('animationend', () => print.remove());
  });
  mounted = true;
}

function cottagePorch(): string {
  return `<svg viewBox="0 0 420 220" aria-hidden="true">
    <ellipse cx="210" cy="180" rx="180" ry="28" fill="#3d5a45"/>
    <path d="M70 120 L150 58 L230 120 Z" fill="#e8843a" stroke="#3c2a4a" stroke-width="4"/>
    <rect x="90" y="118" width="120" height="70" rx="8" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="4"/>
    <rect x="250" y="150" width="70" height="36" rx="12" fill="#c46b8a" stroke="#3c2a4a" stroke-width="4"/>
    <ellipse cx="286" cy="146" rx="22" ry="16" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="3"/>
    <circle cx="292" cy="144" r="3" fill="#2a1c38"/>
    <ellipse cx="304" cy="150" rx="5" ry="3" fill="#e8843a"/>
  </svg>`;
}

export async function enterDog(): Promise<void> {
  if (!mounted) mount();
  if (human) human.inert = true;
  dogRoot.hidden = false;
  document.body.classList.add('is-dog');
  document.body.classList.toggle('paw-cursor', finePointer() && !reduced());
  dogRoot.dataset.sky = skyPhase();
  bindScroll();
  const seen = sessionStorage.getItem(OPENING_KEY) === '1';
  if (reduced()) sessionStorage.setItem(OPENING_KEY, '1');
  else if (!seen) {
    await playOpening();
    sessionStorage.setItem(OPENING_KEY, '1');
  } else {
    await playGust();
  }
  if (audio.enabled) audio.startMusic();
  document.querySelector<HTMLButtonElement>('.hud-btn.primary')?.focus();
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
