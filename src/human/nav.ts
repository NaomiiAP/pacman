/** Mobile menu, the active nav link, the scroll progress bar and the corner pup. */

export function initNav(): void {
  initMenu();
  initScrollSpy();
  initProgress();
  initPeek();
}

function initMenu(): void {
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
  if (!nav || !toggle) return;
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close the menu' : 'Open the menu');
    nav.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(!isOpen()));
  nav.addEventListener('click', (event) => {
    if ((event.target as Element).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });
  document.addEventListener('click', (event) => {
    if (isOpen() && !(event.target as Element).closest('.topbar')) setOpen(false);
  });
}

function initScrollSpy(): void {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map((link) => [link.dataset.nav ?? '', link]));
  const visible = new Set<string>();
  const paint = () => {
    const order = links.map((link) => link.dataset.nav ?? '');
    const active = order.filter((id) => visible.has(id)).pop();
    for (const [id, link] of byId) {
      if (id === active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id;
        if (entry.isIntersecting) visible.add(id);
        else visible.delete(id);
      }
      paint();
    },
    { rootMargin: '-35% 0px -55% 0px' },
  );
  for (const id of byId.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

function initProgress(): void {
  const root = document.documentElement;
  let queued = false;
  const update = () => {
    queued = false;
    const max = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--progress', max > 0 ? (window.scrollY / max).toFixed(4) : '0');
  };
  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();
}

/**
 * The corner pup opens the chat. It says hello once, a moment after the page loads.
 * Its speech bubble stays hidden while the footer is on screen, so it never covers
 * the footer buttons.
 */
function initPeek(): void {
  const peek = document.querySelector<HTMLElement>('.puppy-peek');
  if (!peek) return;
  const footer = document.querySelector('.site-footer');
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      document.body.classList.toggle('footer-in-view', entry.isIntersecting);
    }).observe(footer);
  }
  window.setTimeout(() => {
    if (document.body.classList.contains('chat-open')) return;
    peek.classList.add('is-hinting');
    window.setTimeout(() => peek.classList.remove('is-hinting'), 5000);
  }, 2500);
}
