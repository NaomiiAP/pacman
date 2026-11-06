import { finePointer, reducedMotion } from './effects.ts';

/** Project filters and the gentle card tilt. */
export function initProjects(): void {
  const grid = document.querySelector<HTMLElement>('.project-grid');
  const chips = [...document.querySelectorAll<HTMLButtonElement>('.filters [data-filter]')];
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  if (!grid) return;

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter ?? 'all';
      for (const other of chips) other.setAttribute('aria-pressed', String(other === chip));
      const cards = [...grid.querySelectorAll<HTMLElement>('.project-card')];
      const matches = cards.filter((card) => filter === 'all' || (card.dataset.tags ?? '').split(' ').includes(filter));
      const shown = matches.length;
      for (const card of cards) {
        const match = matches.includes(card);
        card.classList.toggle('is-out', !match);
        // An odd card out at the end spans the row instead of sitting alone.
        card.classList.toggle('is-wide', shown % 2 === 1 && card === matches[shown - 1]);
        if (!match || reducedMotion()) continue;
        card.classList.remove('is-in');
        void card.offsetWidth;
        card.classList.add('is-in');
      }
      if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'project' : 'projects'}`;
    });
  }

  if (!finePointer() || reducedMotion()) return;
  document.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.classList.add('is-tilting');
      card.style.setProperty('--ry', `${((x - 0.5) * 7).toFixed(2)}deg`);
      card.style.setProperty('--rx', `${((0.5 - y) * 5).toFixed(2)}deg`);
      card.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}
