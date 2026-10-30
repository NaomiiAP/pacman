import '@fontsource/fredoka/latin-500.css';
import '@fontsource/fredoka/latin-600.css';
import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-700.css';
import './styles/human.css';
import outputs from 'virtual:amplify-outputs';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setupJournal(): void {
  const journal = document.querySelector<HTMLUListElement>('#spirit-journal ul');
  const empty = document.querySelector<HTMLElement>('.journal-empty');
  if (!journal) return;

  document.querySelectorAll<HTMLButtonElement>('.spirit-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.spirit ?? '';
      const name = button.querySelector('.spirit-name')?.textContent?.trim() ?? 'Spirit';
      const skills = [...(button.parentElement?.querySelectorAll('.tags li') ?? [])]
        .map((item) => item.textContent?.trim() ?? '')
        .filter(Boolean)
        .join(', ');
      const existing = journal.querySelector(`[data-kept="${CSS.escape(id)}"]`);
      button.classList.add('boop');
      window.setTimeout(() => button.classList.remove('boop'), 350);
      if (existing) return;
      button.setAttribute('aria-pressed', 'true');
      const item = document.createElement('li');
      item.dataset.kept = id;
      item.textContent = `${name}: ${skills}`;
      journal.append(item);
      empty?.setAttribute('hidden', '');
    });
  });
}

async function enterDog(button: HTMLButtonElement): Promise<void> {
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  try {
    const dog = await import('./dog/index');
    await dog.enterDog();
  } finally {
    button.disabled = false;
    button.removeAttribute('aria-busy');
  }
}

function setupDogEntry(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-enter-dog]').forEach((button) => {
    button.addEventListener('click', () => {
      void enterDog(button);
    });
  });
}

async function setupGuestbook(): Promise<void> {
  const host = document.querySelector<HTMLElement>('#guestbook');
  if (!outputs) {
    host?.remove();
    return;
  }
  try {
    const guestbook = await import('./guestbook');
    await guestbook.mountGuestbook(host, outputs);
  } catch (error) {
    console.error(error);
    host?.remove();
  }
}

setupJournal();
setupDogEntry();
void setupGuestbook();

reducedMotion.addEventListener('change', () => {
  document.documentElement.classList.toggle('reduce-motion', reducedMotion.matches);
});
document.documentElement.classList.toggle('reduce-motion', reducedMotion.matches);
