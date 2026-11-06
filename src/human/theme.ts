import { toast } from './effects.ts';

const KEY = 'naomi-theme';

/** "Lights out": the header switch and the moon in the hero both flip the theme. */
export function initTheme(): void {
  const root = document.documentElement;
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]')];
  const meta = document.querySelector('meta[name="theme-color"]');
  const paint = () => {
    const dark = root.dataset.theme === 'dark';
    for (const button of buttons) button.setAttribute('aria-pressed', String(dark));
    meta?.setAttribute('content', dark ? '#120d0a' : '#f8efe0');
  };
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const dark = root.dataset.theme !== 'dark';
      if (dark) root.dataset.theme = 'dark';
      else delete root.dataset.theme;
      try {
        localStorage.setItem(KEY, dark ? 'dark' : 'light');
      } catch {
        // Storage can be blocked. The theme still changes for this visit.
      }
      paint();
      toast(dark ? 'Lights out. The ghosts approve.' : 'Lights back on!');
    });
  }
  paint();
}
