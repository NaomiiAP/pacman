import { INK, P, blush, eye, face, line, sparkle, svg } from './kit.ts';

export function ghostBody(options: { mouth?: 'open' | 'o' | 'smile'; className?: string } = {}): string {
  const body =
    'M22 60C22 30 35 14 50 14C65 14 78 30 78 60L78 90C78 99 70 101 66 94C62 88 57 88 55 94C52 101 48 101 45 94C43 88 38 88 34 94C30 101 22 99 22 90Z';
  return (
    `<path class="ghost-arm" d="M24 64C14 61 9 70 15 75C18 77 22 75 24 72" fill="#fff" ${line(3)}/>` +
    `<path class="ghost-arm" d="M76 64C86 61 91 70 85 75C82 77 78 75 76 72" fill="#fff" ${line(3)}/>` +
    `<path d="${body}" fill="#fff"/>` +
    `<path d="M64 20C73 28 78 42 78 60L78 90C78 99 70 101 66 94C64 90 62 89 60 90C67 74 70 46 64 20Z" fill="${P.lilacSoft}"/>` +
    `<path d="${body}" fill="none" ${line(3)}/>` +
    `<g class="ghost-eyes">${eye(40, 54, 5)}${eye(60, 54, 5)}</g>` +
    blush(32, 64, 5.5, 3.2) +
    blush(68, 64, 5.5, 3.2) +
    (options.mouth === 'o'
      ? `<ellipse cx="50" cy="66" rx="3" ry="3.8" fill="${INK}"/>`
      : options.mouth === 'smile'
        ? `<path d="M46 64q4 4 8 0" fill="none" ${line(2.6)}/>`
        : `<path d="M45.5 63q4.5 8 9 0z" fill="${INK}" ${line(2.4)}/><path d="M47.6 66.4q2.4 2.2 4.8 0" fill="${P.pink}"/>`)
  );
}

export function ghost(options: { mouth?: 'open' | 'o' | 'smile'; className?: string; label?: string } = {}): string {
  return svg('6 8 88 98', ghostBody(options), options);
}

export function pumpkinBody(options: { hat?: boolean; lit?: boolean; glasses?: boolean; mouth?: 'cat' | 'smile' | 'open' } = {}): string {
  const lobe = (cx: number, rx: number) => `<ellipse cx="${cx}" cy="62" rx="${rx}" ry="30" fill="${P.pumpkin}" ${line(3)}/>`;
  const faceMarkup = options.lit
    ? `<path d="M38 56l7-11 7 11z" fill="${P.glow}" ${line(2.6)}/><path d="M58 56l7-11 7 11z" fill="${P.glow}" ${line(2.6)}/>` +
      `<path d="M36 67q19 17 38 0q-5 4-9 2l-3 4-4-4-4 4-4-4-3 4-3-4q-4 2-8-2z" fill="${P.glow}" ${line(2.4)}/>`
    : face(55, 60, { gap: 24, r: 5, mouth: options.mouth ?? 'cat' });
  const glasses = options.glasses
    ? `<g fill="none" ${line(2.6)}><circle cx="43" cy="60" r="8.5" fill="#ffffff" fill-opacity=".35"/><circle cx="67" cy="60" r="8.5" fill="#ffffff" fill-opacity=".35"/><path d="M51.5 59q3.5-3 7 0"/></g>`
    : '';
  // The stem sits behind the lobes; a witch hat replaces it and sits on top.
  const stem =
    `<path d="M50 34C50 25 52 18 58 12L64 15C60 20 59 27 60 34Z" fill="#7aa35b" ${line(3)}/>` +
    `<path d="M61 20C68 10 82 11 85 19C77 25 67 25 61 20Z" fill="${P.leaf}" ${line(2.6)}/>`;
  const hat =
    `<path d="M30 30C40 28 70 28 80 31L76 36C66 34 44 34 34 35Z" fill="${P.plum}" ${line(3)}/>` +
    `<path d="M40 32C44 20 50 8 62 2C58 10 58 18 66 31Z" fill="${P.plum}" ${line(3)}/>` +
    `<path d="M42 27C50 25 60 25 66 27L66 31C58 30 50 30 41 31Z" fill="${P.butter}" ${line(2)}/>`;
  return (
    (options.hat ? '' : stem) +
    lobe(35, 25) +
    lobe(75, 25) +
    `<ellipse cx="55" cy="60" rx="23" ry="32" fill="${P.pumpkin}" ${line(3)}/>` +
    `<ellipse cx="47" cy="42" rx="5" ry="8" fill="#fff" opacity=".4" transform="rotate(20 47 42)"/>` +
    (options.lit ? `<ellipse cx="55" cy="62" rx="30" ry="22" fill="${P.glow}" opacity=".25"/>` : '') +
    faceMarkup +
    glasses +
    (options.hat ? hat : '')
  );
}

export function pumpkin(options: { hat?: boolean; lit?: boolean; glasses?: boolean; mouth?: 'cat' | 'smile' | 'open'; className?: string; label?: string } = {}): string {
  return svg(options.hat ? '6 0 98 96' : '6 6 98 90', pumpkinBody(options), options);
}

export function batBody(): string {
  const wingL = 'M52 40C44 24 26 18 7 27C13 31 15 37 13 44C19 40 27 42 29 49C33 43 41 43 46 48Z';
  const wingR = 'M78 40C86 24 104 18 123 27C117 31 115 37 117 44C111 40 103 42 101 49C97 43 89 43 84 48Z';
  return (
    `<path class="wing wing-l" d="${wingL}" fill="#4a3f3a" ${line(3)}/>` +
    `<path class="wing wing-r" d="${wingR}" fill="#4a3f3a" ${line(3)}/>` +
    `<path d="M52 36L50 18L62 29Z" fill="#5e524b" ${line(3)}/>` +
    `<path d="M78 36L80 18L68 29Z" fill="#5e524b" ${line(3)}/>` +
    `<circle cx="65" cy="44" r="17" fill="#5e524b" ${line(3)}/>` +
    `<ellipse cx="65" cy="50" rx="10" ry="7" fill="#8b7e75"/>` +
    eye(58, 42, 3.4) +
    eye(72, 42, 3.4) +
    blush(53, 49, 3.4, 2.2) +
    blush(77, 49, 3.4, 2.2) +
    `<path d="M61 50q4 3.6 8 0" fill="none" ${line(2.2)}/>` +
    `<path d="M62.4 51.2l1 2.8 1-2.4" fill="#fff" ${line(1.2)}/>`
  );
}

export function bat(options: { className?: string; label?: string } = {}): string {
  return svg('4 14 122 40', batBody(), options);
}

export function candyCorn(options: { className?: string } = {}): string {
  const outline = 'M30 6C34 6 52 50 52 57C52 64 8 64 8 57C8 50 26 6 30 6Z';
  return svg(
    '4 2 52 64',
    `<path d="${outline}" fill="${P.butter}"/>` +
      `<path d="M30 6C33 6 40 24 47 44C42 47 18 47 13 44C20 24 27 6 30 6Z" fill="${P.pumpkin}"/>` +
      `<path d="M30 6C32 6 36 15 39.5 26C35 28 25 28 20.5 26C24 15 28 6 30 6Z" fill="#fff"/>` +
      `<path d="${outline}" fill="none" ${line(2.6)}/>` +
      eye(25, 36, 2.4) +
      eye(35, 36, 2.4) +
      `<path d="M28 40.5q2 2 4 0" fill="none" ${line(1.6)}/>`,
    options,
  );
}

export function lollipop(options: { className?: string; color?: string } = {}): string {
  const color = options.color ?? P.pink;
  return svg(
    '0 0 60 80',
    `<path d="M30 46L30 76" ${line(5)}/><path d="M30 46L30 76" stroke="#fff" stroke-width="2" stroke-linecap="round"/>` +
      `<circle cx="30" cy="28" r="20" fill="${color}" ${line(3)}/>` +
      `<path d="M30 28m-3 0a3 3 0 1 1 6 0a7 7 0 1 1-14 0a11 11 0 1 1 22 0a15 15 0 1 1-30 0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>`,
    options,
  );
}

export function wrappedCandy(options: { className?: string; color?: string } = {}): string {
  const color = options.color ?? P.mint;
  return svg(
    '0 0 90 50',
    `<path d="M24 25L6 12L9 25L6 38Z" fill="${color}" ${line(2.6)}/><path d="M66 25L84 12L81 25L84 38Z" fill="${color}" ${line(2.6)}/>` +
      `<ellipse cx="45" cy="25" rx="22" ry="16" fill="${color}" ${line(3)}/>` +
      `<path d="M33 13q6 12 0 24M45 9q6 16 0 32M57 13q6 12 0 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".85"/>`,
    options,
  );
}

export function moonBody(): string {
  return (
    `<circle cx="60" cy="60" r="46" fill="#fff3c8" ${line(3)}/>` +
    `<path d="M88 26C102 40 104 66 92 84C80 100 56 106 38 98C62 96 86 78 88 52C89 42 89 34 88 26Z" fill="#f6dd96" opacity=".8"/>` +
    `<circle cx="38" cy="38" r="6" fill="#f6dd96"/><circle cx="82" cy="78" r="4" fill="#f6dd96"/><circle cx="76" cy="34" r="3" fill="#f6dd96"/>` +
    face(58, 62, { gap: 26, r: 5, sleepy: true, mouth: 'smile' })
  );
}

export function moon(options: { className?: string; label?: string } = {}): string {
  return svg('10 10 100 100', moonBody(), options);
}

export function cloud(options: { className?: string; tint?: string } = {}): string {
  const tint = options.tint ?? P.lilacSoft;
  return svg(
    '0 0 160 70',
    `<path d="M22 58C8 58 4 42 16 36C14 22 30 14 42 22C48 6 74 4 82 20C92 10 112 14 112 30C126 26 140 36 136 48C146 52 144 60 134 60Z" fill="#fff" ${line(3)}/>` +
      `<path d="M30 56C46 52 70 54 84 50C100 46 118 50 132 56Z" fill="${tint}"/>`,
    options,
  );
}

export function star(options: { className?: string; fill?: string } = {}): string {
  return svg('0 0 40 40', sparkle(20, 20, 17, options.fill ?? P.butter), options);
}

export function tombstoneBody(text = 'RIP'): string {
  return (
    `<path d="M14 92L14 40C14 18 30 8 46 8C62 8 78 18 78 40L78 92Z" fill="${P.stone}" ${line(3)}/>` +
    `<path d="M62 14C72 20 78 30 78 40L78 92L66 92L66 40C66 30 64 22 62 14Z" fill="${P.stoneShade}" opacity=".7"/>` +
    `<path d="M8 92L84 92" ${line(3.4)}/>` +
    `<text x="46" y="44" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="16" fill="${P.plum}">${text}</text>` +
    eye(38, 60, 3.2) +
    eye(54, 60, 3.2) +
    blush(31, 66, 3.6, 2.2) +
    blush(61, 66, 3.6, 2.2) +
    `<path d="M43 66q3 3 6 0" fill="none" ${line(2)}/>`
  );
}

export function tombstone(options: { className?: string; text?: string } = {}): string {
  return svg('4 4 84 92', tombstoneBody(options.text), options);
}
