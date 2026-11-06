import { burst, finePointer, reducedMotion, toast } from './effects.ts';

const LINES: Record<string, string[]> = {
  pumpkin: ['boo!', 'hehe!', 'trick or treat!', 'squish!', 'nom nom', 'again!'],
  ghost: ['boo!', 'eek!', 'wooo~', 'hehe', 'you found me!'],
};

const SECRET_POKES = 7;

/** Poking the critters in the hero: they squish, talk and throw candy. */
export function initScene(): void {
  const scene = document.querySelector<HTMLElement>('[data-scene]');
  if (!scene) return;
  let pokes = 0;

  scene.addEventListener('click', (event) => {
    const critter = (event.target as Element).closest<HTMLElement>('[data-critter]');
    if (!critter) return;
    const kind = critter.dataset.critter ?? 'pumpkin';
    critter.classList.remove('is-poked');
    void critter.offsetWidth;
    critter.classList.add('is-poked');
    const lines = LINES[kind] ?? LINES.pumpkin;
    const rect = critter.getBoundingClientRect();
    const box = scene.getBoundingClientRect();
    say(scene, lines[Math.floor(Math.random() * lines.length)], rect.left + rect.width / 2 - box.left, rect.top - box.top + 6);
    burst(rect.left + rect.width / 2, rect.top + rect.height * 0.35, 10);
    pokes += 1;
    if (pokes === SECRET_POKES) {
      candyRain();
      toast('Candy rain! You found a secret.');
    }
  });
  scene.addEventListener('animationend', (event) => {
    (event.target as Element).classList.remove('is-poked');
  });

  followPointer(scene);
}

function say(scene: HTMLElement, text: string, x: number, y: number): void {
  const bubble = document.createElement('span');
  bubble.className = 'speech';
  bubble.setAttribute('aria-hidden', 'true');
  bubble.textContent = text;
  bubble.style.left = `${Math.max(40, Math.min(scene.clientWidth - 40, x))}px`;
  bubble.style.top = `${Math.max(36, y)}px`;
  scene.append(bubble);
  window.setTimeout(() => bubble.remove(), 1700);
}

function candyRain(): void {
  if (reducedMotion()) return;
  const width = window.innerWidth;
  for (let i = 0; i < 9; i += 1) {
    window.setTimeout(() => burst(width * (0.1 + Math.random() * 0.8), 60 + Math.random() * 120, 8), i * 120);
  }
}

/** The ghost keeps an eye on the mouse. */
function followPointer(scene: HTMLElement): void {
  const eyes = scene.querySelector<SVGGElement>('.scene-ghost .ghost-eyes');
  if (!eyes || !finePointer() || reducedMotion()) return;
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const update = () => {
    frame = 0;
    const ghost = eyes.closest('.scene-ghost');
    if (!ghost) return;
    const rect = ghost.getBoundingClientRect();
    const dx = pointerX - (rect.left + rect.width / 2);
    const dy = pointerY - (rect.top + rect.height * 0.45);
    const distance = Math.hypot(dx, dy) || 1;
    const reach = Math.min(1, distance / 260);
    eyes.style.transform = `translate(${((dx / distance) * 3.4 * reach).toFixed(2)}px, ${((dy / distance) * 3 * reach).toFixed(2)}px)`;
  };
  window.addEventListener(
    'pointermove',
    (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    },
    { passive: true },
  );
}
