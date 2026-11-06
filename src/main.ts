import '@fontsource/fredoka/latin-600.css';
import '@fontsource/fredoka/latin-700.css';
import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-700.css';
import './styles/pup.css';
import './styles/human.css';
import outputs from 'virtual:amplify-outputs';
import { popInOnScroll, sparkleTrail } from './human/effects.ts';
import { initNav } from './human/nav.ts';
import { initProjects } from './human/projects.ts';
import { initScene } from './human/scene.ts';
import { initTheme } from './human/theme.ts';

/*
 * The page arrives as finished HTML (see src/content/render.ts). This
 * file only adds behaviour on top of it, so everything still reads and
 * links correctly before or without JavaScript.
 */

initTheme();
initNav();
initScene();
initProjects();
popInOnScroll();
sparkleTrail();

// The spirit pup's chat loads the first time someone asks for it.
const loadChat = () => import('./agent/chat.ts');
document.addEventListener('ask-pup', () => void loadChat().then((chat) => chat.openChat()));

// Fetch! also loads on first use. The chat can ask for it with a role.
const loadFetch = () => import('./human/fetchball.ts');
document.getElementById('fetch-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  void loadFetch().then((fetcher) => fetcher.runFetch(form));
});
document.addEventListener('pup-fetch', (event) => {
  const role = (event as CustomEvent<'ai' | 'fullstack' | 'cloud' | 'chain' | null>).detail;
  void loadFetch().then((fetcher) => fetcher.fetchRole(role));
});

document.addEventListener('click', (event) => {
  const ask = (event.target as Element | null)?.closest<HTMLElement>('[data-ask-pup]');
  if (ask) {
    void loadChat().then((chat) => (ask.classList.contains('puppy-peek') ? chat.toggleChat() : chat.openChat()));
    return;
  }
  const enter = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-enter-dog]');
  if (!enter || enter.disabled) return;
  enter.disabled = true;
  enter.setAttribute('aria-busy', 'true');
  void import('./dog/index.ts')
    .then((dog) => dog.enterDog())
    .finally(() => {
      enter.disabled = false;
      enter.removeAttribute('aria-busy');
    });
});

// The guestbook section only appears once the Amplify backend exists.
const guestbookSection = document.getElementById('guestbook');
const guestbookHost = document.getElementById('guestbook-app');
if (!outputs) {
  guestbookSection?.remove();
} else {
  const config = outputs;
  void import('./guestbook.ts')
    .then((guestbook) => guestbook.mountGuestbook(guestbookHost, config))
    .catch((error: unknown) => {
      console.error(error);
      guestbookSection?.remove();
    });
}
