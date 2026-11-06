/** Small playful effects. Every one of them is skipped when the visitor asks for less motion. */

export const reducedMotion = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = (): boolean => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const CANDY = ['#ff9b54', '#ffa6c9', '#a9d05b', '#93e5c3', '#ffe07a', '#a6d6ff'];

let toastHost: HTMLElement | null = null;

/**
 * A short visual note at the bottom of the screen. It is hidden from
 * assistive tech: each caller already has its own live region or the
 * event is purely decorative.
 */
export function toast(message: string, art = ''): void {
  if (!toastHost) {
    toastHost = document.createElement('div');
    toastHost.className = 'toasts';
    toastHost.setAttribute('aria-hidden', 'true');
    document.body.append(toastHost);
  }
  const item = document.createElement('div');
  item.className = 'toast';
  if (art) {
    const holder = document.createElement('span');
    holder.className = 'art';
    holder.innerHTML = art;
    item.append(holder);
  }
  item.append(document.createTextNode(message));
  toastHost.append(item);
  while (toastHost.children.length > 3) toastHost.firstElementChild?.remove();
  window.setTimeout(() => {
    item.classList.add('is-leaving');
    window.setTimeout(() => item.remove(), 320);
  }, 2600);
}

/** Candy confetti from a point on the screen. */
export function burst(x: number, y: number, count = 12): void {
  if (reducedMotion()) return;
  for (let i = 0; i < count; i += 1) {
    const bit = document.createElement('span');
    bit.className = i % 3 === 0 ? 'burst-bit is-star' : 'burst-bit';
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const distance = 46 + Math.random() * 64;
    bit.style.left = `${x}px`;
    bit.style.top = `${y}px`;
    bit.style.background = CANDY[i % CANDY.length];
    bit.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    bit.style.setProperty('--dy', `${Math.sin(angle) * distance - 24}px`);
    bit.style.setProperty('--rot', `${Math.round(Math.random() * 540 - 270)}deg`);
    document.body.append(bit);
    bit.addEventListener('animationend', () => bit.remove(), { once: true });
  }
}

/** Burst from the middle of an element, for clicks that came from a keyboard. */
export function burstFrom(element: Element, count = 12): void {
  const rect = element.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, count);
}

/** Tiny sparkles that trail a mouse. Off on touch screens and in dog mode. */
export function sparkleTrail(): void {
  if (!finePointer()) return;
  let last = 0;
  let lastX = 0;
  let lastY = 0;
  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse' || reducedMotion() || document.body.classList.contains('is-dog')) return;
      const now = performance.now();
      if (now - last < 50) return;
      if (Math.hypot(event.clientX - lastX, event.clientY - lastY) < 22) return;
      last = now;
      lastX = event.clientX;
      lastY = event.clientY;
      const spark = document.createElement('span');
      spark.className = 'trail-spark';
      spark.style.left = `${event.clientX}px`;
      spark.style.top = `${event.clientY + 10}px`;
      spark.style.background = CANDY[Math.floor(Math.random() * CANDY.length)];
      document.body.append(spark);
      spark.addEventListener('animationend', () => spark.remove(), { once: true });
    },
    { passive: true },
  );
}

/**
 * Cards pop in as they scroll into view. Content is never hidden up
 * front: an element only animates once it is about to be seen, so a
 * full-page screenshot or a reader without JavaScript sees everything.
 */
export function popInOnScroll(): void {
  if (reducedMotion() || !('IntersectionObserver' in window)) return;
  const selectors = [
    '.section-head',
    '.about-note',
    '.fact',
    '.edu-scene',
    '.edu-card',
    '.quest-step',
    '.focus-card',
    '.skill-card',
    '.filters',
    '.project-card',
    '.fetch-panel',
    '.award',
    '.contact-card',
    '.grave-card',
  ];
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        element.classList.add('reveal', 'pop-in');
        element.addEventListener('animationend', () => element.classList.remove('pop-in'), { once: true });
      }
    },
    { rootMargin: '0px 0px 40px 0px' },
  );
  const viewport = window.innerHeight;
  for (const selector of selectors) {
    document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
      if (!element.style.getPropertyValue('--i')) element.style.setProperty('--i', String(index % 6));
      const rect = element.getBoundingClientRect();
      if (rect.top < viewport && rect.bottom > 0) return;
      observer.observe(element);
    });
  }
}
