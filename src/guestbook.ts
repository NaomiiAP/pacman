import { Amplify } from 'aws-amplify';
import type { ResourcesConfig } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

const GAP_MS = 30_000;
const STORAGE_KEY = 'naomi-paw-last';
const client = generateClient<Schema>();

type Costume = 'plain' | 'pumpkin' | 'ghost' | 'witch';

function readCostume(): Costume {
  const saved = sessionStorage.getItem('naomi-spirit-costume');
  if (saved === 'pumpkin' || saved === 'ghost' || saved === 'witch') return saved;
  return 'plain';
}

function waitRemaining(): number {
  const last = Number(localStorage.getItem(STORAGE_KEY) || 0);
  return Math.max(0, GAP_MS - (Date.now() - last));
}

/**
 * Mounts the guestbook into `host` (the board inside the #guestbook section).
 * The whole section stays hidden, and is removed, when there is no backend
 * or the wall cannot be read, so the page never shows a broken form.
 */
export async function mountGuestbook(host: HTMLElement | null, outputs: Record<string, unknown>): Promise<void> {
  const shell = host?.closest<HTMLElement>('section') ?? host;
  if (!host || !outputs.data) {
    shell?.remove();
    return;
  }

  Amplify.configure(outputs as ResourcesConfig);
  const listed = await client.models.PawPrint.list({ authMode: 'identityPool', limit: 40 });
  if (listed.errors?.length) {
    shell?.remove();
    return;
  }

  if (shell) shell.hidden = false;
  host.replaceChildren();

  // The note card the visitor writes on.
  const compose = document.createElement('form');
  compose.className = 'paw-compose';
  const title = document.createElement('p');
  title.className = 'compose-title';
  title.textContent = 'Write on the board';
  const label = document.createElement('label');
  label.htmlFor = 'paw-message';
  label.className = 'visually-hidden';
  label.textContent = 'Your note';
  const field = document.createElement('input');
  field.type = 'text';
  field.id = 'paw-message';
  field.name = 'message';
  field.maxLength = 140;
  field.required = true;
  field.autocomplete = 'off';
  field.placeholder = 'Say hi to the pup...';
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'btn btn-primary btn-small';
  submit.textContent = 'Pin my paw';
  const row = document.createElement('div');
  row.className = 'compose-row';
  row.append(field, submit);
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  const count = document.createElement('p');
  count.className = 'paw-count';
  count.textContent = '0 / 140';
  const meta = document.createElement('div');
  meta.className = 'compose-meta';
  meta.append(status, count);
  compose.append(title, label, row, meta);

  // The pinned notes.
  const wall = document.createElement('ul');
  wall.className = 'paw-wall';
  wall.setAttribute('aria-label', 'Notes from visitors');
  const more = document.createElement('button');
  more.type = 'button';
  more.className = 'btn btn-plain btn-small paw-more';
  more.hidden = true;
  let showAll = false;
  const SHOWN = 8;

  const renderWall = (items: typeof listed.data) => {
    const sorted = [...items].sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
    wall.replaceChildren();
    if (!sorted.length) {
      const empty = document.createElement('li');
      empty.className = 'paw-empty';
      empty.textContent = 'No paws yet. Be the first!';
      wall.append(empty);
      more.hidden = true;
      return;
    }
    more.hidden = sorted.length <= SHOWN;
    more.textContent = showAll ? 'Show fewer notes' : `See all ${sorted.length} notes`;
    for (const item of showAll ? sorted : sorted.slice(0, SHOWN)) {
      const li = document.createElement('li');
      li.className = 'paw-note';
      const text = document.createElement('p');
      text.textContent = item.message ?? '';
      const paw = document.createElement('span');
      paw.className = 'paw-mark';
      paw.textContent = 'paw';
      paw.dataset.costume = item.costume ?? 'plain';
      li.append(text, paw);
      wall.append(li);
    }
  };

  field.addEventListener('input', () => {
    count.textContent = `${field.value.length} / 140`;
  });

  more.addEventListener('click', () => {
    showAll = !showAll;
    renderWall(listed.data);
  });

  compose.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = field.value.trim();
    status.textContent = '';
    if (!message || message.length > 140) {
      status.textContent = 'Keep the note between 1 and 140 characters.';
      return;
    }
    const wait = waitRemaining();
    if (wait > 0) {
      status.textContent = `Wait ${Math.ceil(wait / 1000)} seconds before leaving another paw.`;
      return;
    }
    submit.disabled = true;
    void client.models.PawPrint.create(
      { message, costume: readCostume() },
      { authMode: 'identityPool' },
    )
      .then((result) => {
        if (result.errors?.length || !result.data) {
          status.textContent = 'The board could not save that paw.';
          return;
        }
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        field.value = '';
        count.textContent = '0 / 140';
        status.textContent = 'Pinned! Your paw is on the board.';
        listed.data.unshift(result.data);
        renderWall(listed.data);
      })
      .catch(() => {
        status.textContent = 'The board could not save that paw.';
      })
      .finally(() => {
        submit.disabled = false;
      });
  });

  host.append(compose, wall, more);
  renderWall(listed.data);
}
