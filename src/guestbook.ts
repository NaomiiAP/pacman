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

export async function mountGuestbook(host: HTMLElement | null, outputs: Record<string, unknown>): Promise<void> {
  if (!host || !outputs.data) {
    host?.remove();
    return;
  }

  Amplify.configure(outputs as ResourcesConfig);
  const listed = await client.models.PawPrint.list({ authMode: 'identityPool', limit: 40 });
  if (listed.errors?.length) {
    host.remove();
    return;
  }

  host.hidden = false;
  host.replaceChildren();

  const heading = document.createElement('h3');
  heading.textContent = 'Paw-print wall';

  const form = document.createElement('form');
  const label = document.createElement('label');
  label.htmlFor = 'paw-message';
  label.textContent = 'Leave a paw and a short note';
  const field = document.createElement('textarea');
  field.id = 'paw-message';
  field.name = 'message';
  field.maxLength = 140;
  field.required = true;
  field.rows = 3;
  const count = document.createElement('p');
  count.className = 'paw-count';
  count.textContent = '0 / 140';
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'btn';
  submit.textContent = 'Leave a paw';
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  const wall = document.createElement('ul');
  wall.className = 'paw-wall';

  const renderWall = (items: typeof listed.data) => {
    const sorted = [...items].sort((a, b) => (b.createdAt ?? '').localeCompare(a.createdAt ?? ''));
    wall.replaceChildren();
    if (!sorted.length) {
      const empty = document.createElement('li');
      empty.textContent = 'No paws yet. Be the first.';
      wall.append(empty);
      return;
    }
    for (const item of sorted) {
      const li = document.createElement('li');
      const paw = document.createElement('span');
      paw.className = 'paw-mark';
      paw.textContent = 'paw';
      paw.dataset.costume = item.costume ?? 'plain';
      const text = document.createElement('p');
      text.textContent = item.message ?? '';
      li.append(paw, text);
      wall.append(li);
    }
  };

  field.addEventListener('input', () => {
    count.textContent = `${field.value.length} / 140`;
  });

  form.addEventListener('submit', (event) => {
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
          status.textContent = 'The wall could not save that paw.';
          return;
        }
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
        field.value = '';
        count.textContent = '0 / 140';
        status.textContent = 'The paw is on the wall.';
        renderWall([result.data, ...listed.data]);
        listed.data.unshift(result.data);
      })
      .catch(() => {
        status.textContent = 'The wall could not save that paw.';
      })
      .finally(() => {
        submit.disabled = false;
      });
  });

  form.append(label, field, count, submit, status);
  host.append(heading, form, wall);
  renderWall(listed.data);
}
