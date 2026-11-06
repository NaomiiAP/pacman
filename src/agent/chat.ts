import '../styles/chat.css';
import { icon } from '../art/icons.ts';
import { pupHead } from '../art/pup.ts';
import { portfolio } from '../content/portfolio.ts';
import { STARTERS, createBrain, type Action, type Reply } from './brain.ts';
import { SECTION_NAMES, type Section } from './knowledge.ts';

/*
 * The chat panel for the spirit pup. It lives outside #human so it
 * also works in dog mode, where the human page is inert.
 */

const SECTIONS: Section[] = ['about', 'education', 'experience', 'skills', 'projects', 'achievements', 'graveyard', 'contact'];
const brain = createBrain(portfolio);
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const phone = () => window.matchMedia('(max-width: 560px)').matches;

let panel: HTMLElement | null = null;
let log: HTMLDivElement;
let input: HTMLInputElement;
let suggest: HTMLElement;
let returnFocus: HTMLElement | null = null;
const asked = new Set<string>();

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function context() {
  return {
    inDog: document.body.classList.contains('is-dog'),
    dark: document.documentElement.dataset.theme === 'dark',
    sections: SECTIONS.filter((id) => document.getElementById(id)),
  };
}

function scrollDown(): void {
  log.scrollTo({ top: log.scrollHeight, behavior: reduced() ? 'auto' : 'smooth' });
}

function setSuggestions(items: string[]): void {
  suggest.replaceChildren();
  for (const text of items) {
    const chip = el('button', 'chat-chip', text);
    chip.type = 'button';
    chip.addEventListener('click', () => ask(text));
    suggest.append(chip);
  }
}

function goTo(section: Section): void {
  if (document.body.classList.contains('is-dog')) {
    document.dispatchEvent(new CustomEvent('pup-goto', { detail: section }));
    return;
  }
  const target = document.getElementById(section);
  if (!target) return;
  target.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
  target.classList.remove('is-pointed');
  void target.offsetWidth;
  target.classList.add('is-pointed');
  // On a phone the panel covers the page, so step aside and let the visitor look.
  if (phone()) window.setTimeout(() => closeChat(false), 700);
}

/** The pup's tools: everything it can do to the page. */
function run(actions: Action[]): void {
  for (const action of actions) {
    if (action.type === 'theme') {
      const dark = document.documentElement.dataset.theme === 'dark';
      if (dark !== action.dark) document.querySelector<HTMLButtonElement>('.theme-toggle')?.click();
    } else if (action.type === 'filter') {
      document.querySelector<HTMLButtonElement>(`.filters [data-filter="${action.tag}"]`)?.click();
    } else if (action.type === 'goto') {
      goTo(action.section);
    } else if (action.type === 'fetch') {
      if (phone()) closeChat(false);
      document.dispatchEvent(new CustomEvent('pup-fetch', { detail: action.role }));
    } else if (action.enter) {
      document.querySelector<HTMLButtonElement>('.btn-dog[data-enter-dog]')?.click();
      if (phone()) closeChat(false);
    } else {
      document.querySelector<HTMLButtonElement>('.dog-hud .back-btn')?.click();
    }
  }
}

function say(reply: Reply): void {
  const item = el('div', 'msg from-pup');
  for (const line of reply.lines) item.append(el('p', line.startsWith('• ') ? 'msg-item' : 'msg-line', line.replace(/^• /, '')));
  if (reply.did) {
    const did = el('p', 'msg-did');
    did.innerHTML = icon('spark');
    did.append(document.createTextNode(reply.did));
    item.append(did);
  }
  const sections = [...new Set(reply.sources.map((source) => source.section))];
  if (sections.length || reply.links.length) {
    const chips = el('div', 'msg-chips');
    if (sections.length) chips.append(el('span', 'msg-from', 'Found in'));
    for (const section of sections) {
      const chip = el('button', 'msg-source', SECTION_NAMES[section]);
      chip.type = 'button';
      chip.addEventListener('click', () => goTo(section));
      chips.append(chip);
    }
    for (const link of reply.links) {
      const anchor = el('a', 'msg-link', link.label);
      anchor.href = link.href;
      if (/^https?:/.test(link.href)) {
        anchor.target = '_blank';
        anchor.rel = 'noopener noreferrer';
      }
      chips.append(anchor);
    }
    item.append(chips);
  }
  log.append(item);
  const next = reply.suggestions ?? STARTERS.filter((text) => !asked.has(text)).slice(0, 3);
  setSuggestions(next);
  scrollDown();
}

function ask(text: string): void {
  const question = text.trim().slice(0, 160);
  if (!question) return;
  asked.add(question);
  input.value = '';
  log.append(el('div', 'msg from-you', question));
  const reply = brain.reply(question, context());
  const typing = el('div', 'msg from-pup typing');
  typing.setAttribute('aria-label', 'The pup is sniffing around');
  typing.append(el('span'), el('span'), el('span'));
  log.append(typing);
  setSuggestions([]);
  scrollDown();
  const wait = reduced() ? 0 : 380 + Math.min(520, reply.lines.join(' ').length * 2);
  window.setTimeout(() => {
    typing.remove();
    say(reply);
    run(reply.actions);
  }, wait);
}

function build(): HTMLElement {
  const root = el('section', 'chat');
  root.id = 'pup-chat';
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-labelledby', 'pup-chat-title');
  root.hidden = true;

  const head = el('div', 'chat-head');
  const avatar = el('span', 'chat-avatar');
  avatar.setAttribute('aria-hidden', 'true');
  avatar.innerHTML = pupHead();
  const titles = el('div', 'chat-titles');
  const title = el('h2', 'chat-title', 'Ask the spirit pup');
  title.id = 'pup-chat-title';
  titles.append(title, el('p', 'chat-sub', 'Answers only from this page. Runs in your browser.'));
  const close = el('button', 'chat-close');
  close.type = 'button';
  close.setAttribute('aria-label', 'Close the chat');
  close.innerHTML = icon('close');
  close.addEventListener('click', () => closeChat());
  head.append(avatar, titles, close);

  log = el('div', 'chat-log');
  log.setAttribute('role', 'log');
  log.setAttribute('aria-live', 'polite');
  log.setAttribute('aria-label', 'Conversation');
  log.tabIndex = 0;

  suggest = el('div', 'chat-suggest');
  suggest.setAttribute('aria-label', 'Suggested questions');
  suggest.setAttribute('role', 'group');

  const form = el('form', 'chat-form');
  const label = el('label', 'visually-hidden', 'Ask the pup a question');
  label.htmlFor = 'pup-chat-input';
  input = el('input', 'chat-input');
  input.id = 'pup-chat-input';
  input.type = 'text';
  input.autocomplete = 'off';
  input.maxLength = 160;
  input.placeholder = 'Ask about Naomi…';
  const send = el('button', 'chat-send');
  send.type = 'submit';
  send.setAttribute('aria-label', 'Send');
  send.innerHTML = icon('paw');
  form.append(label, input, send);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ask(input.value);
  });

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    closeChat();
  });
  root.append(head, log, suggest, form);
  document.body.append(root);
  // The corner pup is a toggle for this panel, now that the panel exists.
  document.querySelector('.puppy-peek')?.setAttribute('aria-controls', root.id);
  return root;
}

export function openChat(): void {
  if (!panel) {
    panel = build();
    say(brain.intro());
  }
  if (!panel.hidden) {
    input.focus();
    return;
  }
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  panel.hidden = false;
  document.body.classList.add('chat-open');
  document.querySelector('.puppy-peek')?.setAttribute('aria-expanded', 'true');
  requestAnimationFrame(() => panel?.classList.add('is-open'));
  // A phone keyboard would cover the panel, so only desktop jumps straight to typing.
  if (phone()) log.focus();
  else input.focus();
}

export function closeChat(restoreFocus = true): void {
  if (!panel || panel.hidden) return;
  const root = panel;
  root.classList.remove('is-open');
  document.body.classList.remove('chat-open');
  document.querySelector('.puppy-peek')?.setAttribute('aria-expanded', 'false');
  window.setTimeout(() => {
    root.hidden = true;
  }, reduced() ? 0 : 220);
  if (restoreFocus) returnFocus?.focus();
}

export function toggleChat(): void {
  if (panel && !panel.hidden) closeChat();
  else openChat();
}
