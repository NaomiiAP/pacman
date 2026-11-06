import { INK, P, blush, eye, face, line, sparkle, svg } from './kit.ts';

/** Line icons drawn with currentColor so they follow the text colour. */
const ICONS: Record<string, string> = {
  paw:
    '<g fill="currentColor" stroke="none"><ellipse cx="12" cy="16" rx="5" ry="4.2"/><ellipse cx="5.6" cy="10.2" rx="2.2" ry="2.9"/><ellipse cx="9.6" cy="6.4" rx="2.2" ry="2.9"/><ellipse cx="14.4" cy="6.4" rx="2.2" ry="2.9"/><ellipse cx="18.4" cy="10.2" rx="2.2" ry="2.9"/></g>',
  down: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  left: '<path d="M15 5l-7 7 7 7"/>',
  chat: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5z"/><path d="M8.5 10h.01M12 10h.01M15.5 10h.01"/>',
  right: '<path d="M9 5l7 7-7 7"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  pin: '<path d="M12 21s-7-6.4-7-12a7 7 0 0 1 14 0c0 5.6-7 12-7 12z"/><circle cx="12" cy="9" r="2.6"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3.2 2.2 8.8 2.2 12 0v-5M22 9v6"/>',
  spark: '<path d="M12 3c.6 4.8 2.2 6.4 7 7-4.8.6-6.4 2.2-7 7-.6-4.8-2.2-6.4-7-7 4.8-.6 6.4-2.2 7-7z"/><path d="M19 15c.3 2 .9 2.7 3 3-2.1.3-2.7 1-3 3-.3-2-1-2.7-3-3 2-.3 2.7-1 3-3z"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  sun: '<circle cx="12" cy="12" r="4.4"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
  branch: '<circle cx="6" cy="5" r="2.4"/><circle cx="6" cy="19" r="2.4"/><circle cx="18" cy="8" r="2.4"/><path d="M6 7.4v9.2M18 10.4c0 4-4 4.4-8.6 6.2"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10.5v6M8 7.5v.01M12 16.5v-6M12 13a3 3 0 0 1 5 0v3.5"/>',
  briefcase: '<rect x="3.5" y="7.5" width="17" height="12" rx="2.5"/><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5.5a2.5 2.5 0 0 0 2.6 3.6M16 6h2.5a2.5 2.5 0 0 1-2.6 3.6M12 13v3.5M8.5 20h7M9.5 16.5h5V20h-5z"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  soundOn: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  soundOff: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
  nose: '<path d="M5 13c2-5 5-7 9-7s5 3 5 5-2 3-4 3c-1 0-2 .5-3 2s-2.5 3-4 2.5S4.5 15.5 5 13z"/><path d="M13 10.5h.01"/>',
  map: '<path d="M3.5 6.5l5-2 7 2.5 5-2v13l-5 2-7-2.5-5 2z"/><path d="M8.5 4.5v13M15.5 7v13"/>',
  home: '<path d="M4 11l8-6.5 8 6.5v8.5a1 1 0 0 1-1 1h-4.5V15h-5v5.5H5a1 1 0 0 1-1-1z"/>',
  book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z"/>',
  candy: '<ellipse cx="12" cy="12" rx="5" ry="4"/><path d="M7.2 10.8L3 8v8l4.2-2.8M16.8 10.8L21 8v8l-4.2-2.8"/>',
  mail: '<rect x="3.5" y="6" width="17" height="12.5" rx="2.5"/><path d="M4.5 7.5l7.5 6 7.5-6"/>',
  grave: '<path d="M6 20V10a6 6 0 0 1 12 0v10z"/><path d="M4 20h16M12 9v6M9.5 11.5h5"/>',
};

export type IconName = keyof typeof ICONS;

export function icon(name: string, className = 'icon'): string {
  const body = ICONS[name] ?? ICONS.spark;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="${className}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

/** Spellbook sticker for the skills heading. */
export function spellbook(): string {
  return svg(
    '0 0 64 64',
    `<path d="M10 14C18 10 26 10 32 16C38 10 46 10 54 14L54 52C46 48 38 48 32 54C26 48 18 48 10 52Z" fill="${P.lilac}" ${line(2.8)}/>` +
      `<path d="M14 16C20 14 26 15 30 19L30 48C26 45 20 44 14 46Z" fill="${P.cream}" ${line(2)}/>` +
      `<path d="M50 16C44 14 38 15 34 19L34 48C38 45 44 44 50 46Z" fill="${P.cream}" ${line(2)}/>` +
      `<path d="M32 16L32 54" ${line(2.6)}/>` +
      sparkle(22, 30, 5, P.pink) +
      `<path d="M38 26h8M38 32h7M38 38h8" stroke="${P.lilacShade}" stroke-width="2.2" stroke-linecap="round"/>` +
      sparkle(54, 8, 5, P.butter) +
      sparkle(8, 8, 3.5, P.mint),
    { className: 'sticker-art' },
  );
}

/** Trick-or-treat pumpkin pail full of candy for the projects heading. */
export function candyBucket(): string {
  return svg(
    '0 0 64 64',
    `<path d="M14 26C14 8 50 8 50 26" fill="none" ${line(3)}/>` +
      `<circle cx="24" cy="24" r="7" fill="${P.pink}" ${line(2.4)}/><circle cx="38" cy="22" r="6" fill="${P.mint}" ${line(2.4)}/>` +
      `<path d="M30 14l4 10" ${line(2.4)}/><circle cx="29" cy="12" r="5" fill="${P.butter}" ${line(2.4)}/>` +
      `<path d="M10 28C8 44 16 58 32 58C48 58 56 44 54 28Z" fill="${P.pumpkin}" ${line(3)}/>` +
      `<ellipse cx="32" cy="28" rx="22" ry="5" fill="${P.pumpkinShade}" ${line(2.6)}/>` +
      `<path d="M20 38l4-6 4 6zM36 38l4-6 4 6z" fill="${INK}"/>` +
      `<path d="M22 46q10 8 20 0" fill="none" ${line(2.6)}/>`,
    { className: 'sticker-art' },
  );
}

/** A trophy with a little bow for the awards heading. */
export function trophySticker(): string {
  return svg(
    '0 0 64 64',
    `<path d="M18 14C8 14 8 30 20 30M46 14C56 14 56 30 44 30" fill="none" ${line(3)}/>` +
      `<path d="M16 10L48 10L48 22C48 34 40 40 32 40C24 40 16 34 16 22Z" fill="${P.butter}" ${line(3)}/>` +
      `<path d="M40 14C42 24 40 32 34 36C42 34 46 26 45 14Z" fill="${P.butterShade}" opacity=".7"/>` +
      `<path d="M28 40L28 48L36 48L36 40" fill="${P.butter}" ${line(2.6)}/>` +
      `<rect x="18" y="48" width="28" height="9" rx="3" fill="${P.lilac}" ${line(2.8)}/>` +
      eye(27, 22, 2.6) +
      eye(37, 22, 2.6) +
      blush(23, 27, 2.6, 1.6) +
      blush(41, 27, 2.6, 1.6) +
      `<path d="M30 27q2 2 4 0" fill="none" ${line(1.8)}/>` +
      sparkle(54, 40, 5, P.pink) +
      sparkle(8, 42, 4, P.mint),
    { className: 'sticker-art' },
  );
}

/** An envelope with bat wings for the contact heading. */
export function batMail(): string {
  return svg(
    '0 0 72 56',
    `<path d="M16 24C10 14 2 14 0 18C4 20 4 24 3 28C7 26 10 28 11 32C13 28 16 28 18 30Z" fill="#4a3f3a" ${line(2.4)}/>` +
      `<path d="M56 24C62 14 70 14 72 18C68 20 68 24 69 28C65 26 62 28 61 32C59 28 56 28 54 30Z" fill="#4a3f3a" ${line(2.4)}/>` +
      `<rect x="14" y="14" width="44" height="32" rx="5" fill="${P.cream}" ${line(3)}/>` +
      `<path d="M15 17L36 33L57 17" fill="none" ${line(2.6)}/>` +
      `<path d="M36 33C34 30 30 30 30 34C30 37 36 40 36 40C36 40 42 37 42 34C42 30 38 30 36 33Z" fill="${P.pink}" ${line(2)}/>`,
    { className: 'sticker-art' },
  );
}

/** A tiny ghost holding a name badge, for the about heading. */
export function badgeGhost(): string {
  return svg(
    '0 0 64 64',
    `<path d="M14 34C14 18 22 8 32 8C42 8 50 18 50 34L50 52C50 57 45 58 43 54C41 51 38 51 37 54C35 58 29 58 27 54C26 51 23 51 21 54C19 58 14 57 14 52Z" fill="#fff" ${line(2.8)}/>` +
      face(32, 28, { gap: 13, r: 3, mouth: 'smile' }) +
      `<rect x="20" y="38" width="24" height="11" rx="3" fill="${P.pink}" ${line(2.2)}/>` +
      `<path d="M25 43.5h14" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`,
    { className: 'sticker-art' },
  );
}

/** A lantern on a hook for the experience timeline. */
export function lanternSticker(): string {
  return svg(
    '0 0 48 56',
    `<circle cx="24" cy="32" r="18" fill="${P.glow}" opacity=".45"/>` +
      `<path d="M24 2v8" ${line(2.4)}/>` +
      `<rect x="15" y="9" width="18" height="6" rx="2" fill="${P.night2}" ${line(2.2)}/>` +
      `<path d="M14 16h20l-2 26H16z" fill="${P.butter}" ${line(2.6)}/>` +
      `<path d="M24 22c3 4 4 7 0 12-4-5-3-8 0-12z" fill="${P.pumpkin}"/>` +
      `<rect x="15" y="42" width="18" height="6" rx="2" fill="${P.night2}" ${line(2.2)}/>`,
    { className: 'sticker-art' },
  );
}
