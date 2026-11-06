import { INK, P, blush, eye, face, line, sparkle, svg } from './kit.ts';
import { pumpkinBody, tombstoneBody } from './critters.ts';

/*
 * Dog-mode village. Each piece is drawn standing on y = its viewBox
 * height, so CSS can sit it on the ground line with bottom: var(--lane).
 */

function tube(d: string, color: string, width: number): string {
  return `<path d="${d}" fill="none" ${line(width + 5)}/><path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function smoke(x: number, y: number, tint = '#fff'): string {
  return (
    `<g class="v-smoke"><circle cx="${x}" cy="${y}" r="7" fill="${tint}" opacity=".55"/>` +
    `<circle cx="${x + 8}" cy="${y - 16}" r="9" fill="${tint}" opacity=".45"/>` +
    `<circle cx="${x + 18}" cy="${y - 36}" r="11" fill="${tint}" opacity=".35"/></g>`
  );
}

function glowWindow(x: number, y: number, w: number, h: number): string {
  return (
    `<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${Math.max(w, h) * 0.9}" fill="${P.glow}" opacity=".22" class="v-glow"/>` +
    `<path d="M${x} ${y + h}L${x} ${y + w / 2}C${x} ${y - w * 0.15} ${x + w} ${y - w * 0.15} ${x + w} ${y + w / 2}L${x + w} ${y + h}Z" fill="${P.glow}" ${line(3)}/>` +
    `<path d="M${x + w / 2} ${y + 4}L${x + w / 2} ${y + h}M${x} ${y + h * 0.55}L${x + w} ${y + h * 0.55}" stroke="#c9a33f" stroke-width="2.4"/>`
  );
}

/** Overlapping circles drawn as one outlined silhouette. */
function blob(circles: Array<[number, number, number]>, fill: string): string {
  const outline = circles.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${INK}" stroke="${INK}" stroke-width="6"/>`).join('');
  const body = circles.map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`).join('');
  return outline + body;
}

function mini(x: number, y: number, s: number, extra = ''): string {
  return `<g transform="translate(${x} ${y}) scale(${s})">${pumpkinBody({ mouth: 'smile' })}${extra}</g>`;
}

/** About: a cosy cottage with a heart over the door. */
export function cottage(): string {
  return svg(
    '0 0 240 232',
    smoke(170, 34) +
      `<rect x="154" y="40" width="26" height="56" fill="#a89a89" ${line(3)}/>` +
      `<rect x="149" y="32" width="36" height="11" rx="3" fill="#b5a998" ${line(3)}/>` +
      `<path d="M42 230L46 112L196 108L200 230Z" fill="#ffd6b5" ${line(3.2)}/>` +
      `<path d="M168 109L196 108L200 230L172 230Z" fill="#ffc196"/>` +
      `<path d="M42 230L46 112L196 108L200 230Z" fill="none" ${line(3.2)}/>` +
      `<path d="M16 120C58 96 92 58 120 30C148 58 182 96 224 116C160 104 80 106 16 120Z" fill="${P.plum}" ${line(3.2)}/>` +
      `<path d="M50 112q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0" fill="none" stroke="#2c4426" stroke-width="2.6" stroke-linecap="round"/>` +
      `<circle cx="120" cy="80" r="15" fill="${P.glow}" ${line(3)}/><path d="M120 66v28M106 80h28" stroke="#c9a33f" stroke-width="2.2"/>` +
      glowWindow(62, 142, 34, 40) +
      `<rect x="56" y="182" width="46" height="10" rx="4" fill="#a37052" ${line(2.6)}/>` +
      mini(60, 166, 0.18) +
      mini(80, 168, 0.15) +
      `<circle cx="128" cy="196" r="34" fill="${P.glow}" opacity=".18" class="v-glow"/>` +
      `<path d="M110 230L110 190C110 170 146 170 146 190L146 230Z" fill="${P.pumpkin}" ${line(3)}/>` +
      `<path d="M128 174L128 230" stroke="${P.pumpkinShade}" stroke-width="2"/><circle cx="138" cy="206" r="2.6" fill="${INK}"/>` +
      `<path d="M128 160c-3-5-11-4-11 2 0 5 11 11 11 11s11-6 11-11c0-6-8-7-11-2z" fill="${P.pink}" ${line(2.4)}/>` +
      glowWindow(160, 146, 26, 32) +
      `<rect x="100" y="226" width="56" height="6" rx="3" fill="#cdc3b2" ${line(2.4)}/>`,
    { className: 'v-art' },
  );
}

/** Skills: the spell workshop with potions in the window. */
export function workshop(): string {
  const bottle = (x: number, color: string, h: number) =>
    `<path d="M${x} 120h8v6c4 2 6 6 6 10v${h}c0 3-2 5-5 5h-10c-3 0-5-2-5-5v-${h}c0-4 2-8 6-10z" fill="${color}" ${line(2.2)}/>`;
  return svg(
    '0 0 250 272',
    smoke(196, 40, P.pink) +
      `<path d="M180 120L184 54L204 56L202 120Z" fill="#8a7c6e" ${line(3)}/>` +
      `<path d="M178 54C186 44 198 42 210 50L206 58C196 54 188 54 182 60Z" fill="#a89a89" ${line(2.6)}/>` +
      `<path d="M36 270L40 132L210 128L214 270Z" fill="#c8f2df" ${line(3.2)}/>` +
      `<path d="M180 129L210 128L214 270L186 270Z" fill="#a9e8cd"/>` +
      `<path d="M36 270L40 132L210 128L214 270Z" fill="none" ${line(3.2)}/>` +
      `<path d="M14 140C54 116 86 70 112 8C120 -2 134 -2 140 6C132 8 128 14 130 24C150 76 186 116 236 136C170 124 80 126 14 140Z" fill="${P.lilacShade}" ${line(3.2)}/>` +
      `<path d="M52 128q9 8 18 0q9 8 18 0q9 8 18 0q9 8 18 0q9 8 18 0q9 8 18 0q9 8 18 0q9 8 18 0" fill="none" stroke="#2c4426" stroke-width="2.6" stroke-linecap="round"/>` +
      sparkle(118, 70, 9, P.butter) +
      `<circle cx="96" cy="176" r="46" fill="${P.glow}" opacity=".2" class="v-glow"/>` +
      `<circle cx="96" cy="166" r="34" fill="${P.glow}" ${line(3.2)}/>` +
      `<g transform="translate(64 34)">${bottle(14, P.pink, 14)}${bottle(30, P.sky, 20)}${bottle(46, P.mint, 12)}</g>` +
      `<path d="M66 176h60" stroke="#a37052" stroke-width="4" stroke-linecap="round"/>` +
      `<circle cx="96" cy="166" r="34" fill="none" ${line(3.2)}/>` +
      `<path d="M150 270L150 214C150 196 186 196 186 214L186 270Z" fill="${P.lilac}" ${line(3)}/>` +
      `<circle cx="178" cy="240" r="2.6" fill="${INK}"/>` +
      `<path d="M140 186L140 196" ${line(2)}/><rect x="134" y="196" width="12" height="16" rx="3" fill="${P.butter}" ${line(2.4)}/>` +
      `<circle cx="140" cy="204" r="14" fill="${P.glow}" opacity=".35" class="v-glow"/>` +
      `<path d="M60 230C58 254 70 266 84 266C98 266 110 254 108 230Z" fill="${P.night2}" ${line(3)}/>` +
      `<ellipse cx="84" cy="230" rx="26" ry="6" fill="${P.mint}" ${line(2.6)}/>` +
      `<g class="v-bubbles"><circle cx="78" cy="218" r="4" fill="${P.mintSoft}" ${line(2)}/><circle cx="90" cy="210" r="3" fill="${P.mintSoft}" ${line(1.8)}/></g>`,
    { className: 'v-art' },
  );
}

/** Projects: the night market gate with bunting and a striped tent. */
export function marketGate(): string {
  const flags = [P.pumpkin, P.lilac, P.mint, P.pink, P.butter, P.sky, P.pumpkin, P.lilac];
  return svg(
    '0 0 280 242',
    `<path d="M60 240L60 120L140 52L220 120L220 240Z" fill="#fff3e3" ${line(3)}/>` +
      `<path d="M60 120L140 52L100 120ZM140 52L180 120L220 120Z" fill="${P.pumpkin}" ${line(2.6)}/>` +
      `<path d="M140 52L140 30" ${line(3)}/><path d="M140 30L162 36L140 44Z" fill="${P.pink}" ${line(2.4)}/>` +
      `<path d="M96 240C96 190 184 190 184 240Z" fill="${P.night2}" ${line(3)}/>` +
      `<rect x="20" y="96" width="18" height="146" rx="5" fill="#c9a07a" ${line(3)}/>` +
      `<rect x="242" y="96" width="18" height="146" rx="5" fill="#c9a07a" ${line(3)}/>` +
      `<circle cx="29" cy="84" r="16" fill="${P.glow}" opacity=".4" class="v-glow"/><circle cx="251" cy="84" r="16" fill="${P.glow}" opacity=".4" class="v-glow"/>` +
      `<rect x="21" y="74" width="16" height="22" rx="5" fill="${P.butter}" ${line(2.6)}/><rect x="243" y="74" width="16" height="22" rx="5" fill="${P.butter}" ${line(2.6)}/>` +
      `<path d="M14 112C80 86 200 86 266 112L262 138C200 116 80 116 18 138Z" fill="${P.lilac}" ${line(3.2)}/>` +
      `<text x="140" y="121" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="19" fill="${INK}">NIGHT MARKET</text>` +
      `<path d="M30 146C90 172 190 172 250 146" fill="none" stroke="${INK}" stroke-width="2"/>` +
      flags
        .map((color, i) => {
          const x = 44 + i * 27;
          const y = 152 + Math.sin((i / (flags.length - 1)) * Math.PI) * 12;
          return `<path d="M${x} ${y}h18l-9 16z" fill="${color}" ${line(2)}/>`;
        })
        .join(''),
    { className: 'v-art' },
  );
}

const STALL_COLORS: Array<[string, string]> = [
  [P.pink, '#fff'],
  [P.mint, '#fff'],
  [P.lilac, '#fff'],
  [P.butter, '#fff'],
  [P.sky, '#fff'],
];

/** One market stall per project. The project name is an HTML label. */
export function stall(index = 0): string {
  const [a, b] = STALL_COLORS[index % STALL_COLORS.length];
  const stripes = [0, 1, 2, 3, 4, 5, 6]
    .map((i) => `<path d="M${10 + i * 20} 54h20v30c0 7-20 7-20 0z" fill="${i % 2 ? b : a}" ${line(2.6)}/>`)
    .join('');
  const goods =
    index % 3 === 0
      ? `<rect x="40" y="112" width="18" height="22" rx="5" fill="${P.pinkSoft}" ${line(2.2)}/><rect x="64" y="106" width="20" height="28" rx="5" fill="${P.mintSoft}" ${line(2.2)}/><rect x="90" y="112" width="18" height="22" rx="5" fill="${P.butterSoft}" ${line(2.2)}/>` +
        `<circle cx="49" cy="122" r="3" fill="${P.pink}"/><circle cx="74" cy="118" r="3" fill="${P.mint}"/><circle cx="74" cy="126" r="3" fill="${P.lilac}"/><circle cx="99" cy="122" r="3" fill="${P.pumpkin}"/>`
      : index % 3 === 1
        ? mini(46, 104, 0.3) + mini(84, 108, 0.24)
        : `<path d="M50 134v-16l8-8 8 8v16z" fill="${P.lilacSoft}" ${line(2.2)}/><path d="M78 134v-22c0-6 14-6 14 0v22z" fill="${P.skySoft}" ${line(2.2)}/>` + sparkle(110, 112, 6, P.butter);
  return svg(
    '0 0 160 172',
    `<rect x="18" y="64" width="10" height="106" rx="3" fill="#c9a07a" ${line(2.6)}/><rect x="132" y="64" width="10" height="106" rx="3" fill="#c9a07a" ${line(2.6)}/>` +
      `<path d="M4 58C40 40 120 40 156 58L150 66C110 52 50 52 10 66Z" fill="${a}" ${line(2.8)}/>` +
      stripes +
      goods +
      `<rect x="10" y="134" width="140" height="36" rx="6" fill="#e2b38c" ${line(3)}/>` +
      `<path d="M10 148h140" stroke="#c9946c" stroke-width="2.4"/>` +
      eye(70, 152, 3.2) +
      eye(90, 152, 3.2) +
      blush(62, 158, 3.6, 2) +
      blush(98, 158, 3.6, 2) +
      `<path d="M77 158q3 3 6 0" fill="none" ${line(2)}/>`,
    { className: 'v-art' },
  );
}

/** Experience: a quest board with notes pinned to it. */
export function questBoard(): string {
  const note = (x: number, y: number, angle: number, color: string, pin: string) =>
    `<g transform="rotate(${angle} ${x + 22} ${y + 26})">` +
    `<rect x="${x}" y="${y}" width="44" height="52" rx="4" fill="${color}" ${line(2.4)}/>` +
    `<path d="M${x + 8} ${y + 16}h28M${x + 8} ${y + 25}h22M${x + 8} ${y + 34}h26M${x + 8} ${y + 43}h16" stroke="${P.lilacShade}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<circle cx="${x + 22}" cy="${y + 5}" r="4.4" fill="${pin}" ${line(2)}/>` +
    `</g>`;
  return svg(
    '0 0 220 232',
    `<rect x="30" y="64" width="15" height="168" rx="4" fill="#c9a07a" ${line(3)}/>` +
      `<rect x="175" y="64" width="15" height="168" rx="4" fill="#c9a07a" ${line(3)}/>` +
      `<path d="M8 72L110 30L212 72L202 82L110 44L18 82Z" fill="${P.plum}" ${line(3)}/>` +
      `<rect x="72" y="46" width="76" height="22" rx="6" fill="#fff7ec" ${line(2.6)}/>` +
      `<text x="110" y="62" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="14" fill="${INK}">QUESTS</text>` +
      `<rect x="22" y="80" width="176" height="114" rx="10" fill="#e2b38c" ${line(3)}/>` +
      `<path d="M32 104h156M32 136h156M32 168h156" stroke="#c9946c" stroke-width="2.2" stroke-linecap="round"/>` +
      note(36, 92, -6, P.pinkSoft, P.pumpkin) +
      note(88, 88, 4, P.butterSoft, P.lilac) +
      note(140, 94, -3, P.mintSoft, P.pink) +
      `<path d="M190 96v12" ${line(2)}/><circle cx="190" cy="118" r="13" fill="${P.glow}" opacity=".4" class="v-glow"/>` +
      `<rect x="184" y="108" width="12" height="16" rx="3" fill="${P.butter}" ${line(2.4)}/>` +
      eye(98, 178, 3) +
      eye(122, 178, 3) +
      blush(90, 184, 3.6, 2) +
      blush(130, 184, 3.6, 2) +
      `<path d="M107 184q3 3 6 0" fill="none" ${line(2)}/>`,
    { className: 'v-art' },
  );
}

/** Awards: a little pavilion with a glowing trophy. */
export function trophyHall(): string {
  return svg(
    '0 0 230 262',
    `<path d="M14 262L22 236L208 236L216 262Z" fill="${P.stone}" ${line(3)}/>` +
      `<rect x="30" y="222" width="170" height="16" rx="4" fill="#e9dfcd" ${line(3)}/>` +
      [44, 92, 138, 186].map((x) => `<rect x="${x - 9}" y="120" width="18" height="102" rx="4" fill="#fff7ec" ${line(2.8)}/>`).join('') +
      `<path d="M14 124C30 108 200 108 216 124L210 132L20 132Z" fill="${P.lilac}" ${line(3)}/>` +
      `<path d="M30 112C40 40 190 40 200 112Z" fill="${P.butter}" ${line(3.2)}/>` +
      `<path d="M150 62C176 76 190 92 196 110L170 110C170 92 164 76 150 62Z" fill="${P.butterShade}" opacity=".6"/>` +
      `<path d="M115 52L115 26" ${line(3)}/>` +
      sparkle(115, 18, 12, P.pink) +
      `<circle cx="115" cy="176" r="44" fill="${P.glow}" opacity=".3" class="v-glow"/>` +
      `<path d="M98 150C84 150 84 168 100 168M132 150C146 150 146 168 130 168" fill="none" ${line(3)}/>` +
      `<path d="M96 146L134 146L134 160C134 176 124 184 115 184C106 184 96 176 96 160Z" fill="${P.butter}" ${line(3)}/>` +
      `<path d="M110 184h10v14h-10z" fill="${P.butter}" ${line(2.6)}/>` +
      `<rect x="98" y="198" width="34" height="12" rx="3" fill="${P.lilac}" ${line(2.6)}/>` +
      `<rect x="104" y="210" width="22" height="12" fill="${P.lilacShade}" ${line(2.6)}/>` +
      eye(108, 162, 2.6) +
      eye(122, 162, 2.6) +
      `<path d="M112 168q3 3 6 0" fill="none" ${line(1.8)}/>` +
      `<path d="M50 90L50 66L66 72L50 78" fill="${P.pink}" ${line(2.2)}/><path d="M180 90L180 66L196 72L180 78" fill="${P.mint}" ${line(2.2)}/>`,
    { className: 'v-art' },
  );
}

/** Contact: a mailbox with a letter waiting. */
export function mailbox(): string {
  return svg(
    '0 0 110 156',
    `<rect x="48" y="78" width="14" height="78" rx="4" fill="#c9a07a" ${line(3)}/>` +
      `<path d="M26 156h58" ${line(3)}/>` +
      `<path d="M84 50L84 18L102 24L84 32" fill="${P.pumpkin}" ${line(2.6)}/>` +
      `<path d="M10 82L10 46C10 22 92 22 92 46L92 82Z" fill="${P.pink}" ${line(3.2)}/>` +
      `<path d="M78 30C88 36 92 42 92 48L92 82L80 82L80 48C80 40 80 34 78 30Z" fill="${P.pinkShade}" opacity=".6"/>` +
      `<rect x="22" y="38" width="46" height="18" rx="6" fill="#fff7ec" transform="rotate(-8 45 47)" ${line(2.6)}/>` +
      `<path d="M28 42l17 8 17-10" fill="none" stroke="${P.pinkShade}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" transform="rotate(-8 45 47)"/>` +
      face(51, 66, { gap: 18, r: 3.6, mouth: 'smile' }),
    { className: 'v-art' },
  );
}

/** Graveyard: a curly gate with a sign. */
export function graveGate(): string {
  return svg(
    '0 0 170 182',
    `<rect x="10" y="60" width="26" height="122" rx="4" fill="${P.stone}" ${line(3)}/><rect x="134" y="60" width="26" height="122" rx="4" fill="${P.stone}" ${line(3)}/>` +
      `<rect x="6" y="50" width="34" height="14" rx="4" fill="${P.stoneShade}" ${line(3)}/><rect x="130" y="50" width="34" height="14" rx="4" fill="${P.stoneShade}" ${line(3)}/>` +
      `<path d="M36 90C50 40 120 40 134 90" fill="none" stroke="${P.night2}" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M52 66c-8-6-2-16 6-10M118 66c8-6 2-16-6-10" fill="none" stroke="${P.night2}" stroke-width="3.4" stroke-linecap="round"/>` +
      [48, 66, 85, 104, 122].map((x) => `<path d="M${x} 182L${x} ${x === 85 ? 58 : 80}" stroke="${P.night2}" stroke-width="4" stroke-linecap="round"/>`).join('') +
      `<path d="M85 58l-5 -8h10z" fill="${P.night2}"/>` +
      `<path d="M66 70L66 82M104 70L104 82" ${line(2)}/>` +
      `<rect x="56" y="82" width="58" height="26" rx="6" fill="#fff7ec" ${line(2.8)}/>` +
      `<text x="85" y="101" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="16" fill="${P.plum}">RIP</text>`,
    { className: 'v-art' },
  );
}

export function tomb(): string {
  return svg('4 4 84 92', tombstoneBody(), { className: 'v-art' });
}

export function tree(variant = 0): string {
  const leaf = [P.pumpkin, P.pink, '#ffb36b'][variant % 3];
  const leafShade = [P.pumpkinShade, P.pinkShade, '#f39a4a'][variant % 3];
  return svg(
    '0 0 170 236',
    `<path d="M74 236C80 196 82 168 78 140L96 140C92 168 94 196 100 236Z" fill="#5c4030" ${line(3)}/>` +
      tube('M84 170C70 160 58 160 48 150', '#5c4030', 5) +
      blob(
        [
          [52, 104, 40],
          [118, 100, 42],
          [86, 62, 46],
          [84, 116, 36],
        ],
        leaf,
      ) +
      `<path d="M70 120q10 8 22 2M104 66q10 6 16 18" fill="none" stroke="${leafShade}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M128 70C150 84 158 112 146 130C138 140 122 144 110 140C134 128 142 98 128 70Z" fill="${leafShade}" opacity=".5"/>` +
      `<circle cx="66" cy="44" r="9" fill="#fff" opacity=".35"/>` +
      `<circle cx="60" cy="96" r="5" fill="${P.butter}" ${line(2)}/><circle cx="112" cy="80" r="5" fill="${P.butter}" ${line(2)}/><circle cx="92" cy="122" r="5" fill="${P.butter}" ${line(2)}/>`,
    { className: 'v-art' },
  );
}

export function lamp(): string {
  return svg(
    '0 0 70 206',
    `<rect x="30" y="40" width="10" height="164" rx="4" fill="${P.night2}" ${line(2.8)}/>` +
      `<path d="M20 206h30" ${line(3)}/>` +
      `<path d="M35 42C35 24 54 22 56 34" fill="none" stroke="${P.night2}" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M35 42C35 24 54 22 56 34" fill="none" ${line(1.4)}/>` +
      `<circle cx="56" cy="56" r="22" fill="${P.glow}" opacity=".45" class="v-glow"/>` +
      `<path d="M56 34L56 40" ${line(2)}/>` +
      `<path d="M46 40h20l-3 26h-14z" fill="${P.butter}" ${line(2.6)}/>` +
      `<rect x="44" y="38" width="24" height="6" rx="2" fill="${P.night2}" ${line(2)}/>`,
    { className: 'v-art' },
  );
}

export function bush(): string {
  return svg(
    '0 0 130 66',
    `<rect x="10" y="38" width="110" height="26" fill="${INK}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>` +
      blob(
        [
          [34, 40, 26],
          [94, 40, 26],
          [64, 30, 28],
        ],
        P.leaf,
      ) +
      `<rect x="10" y="38" width="110" height="26" fill="${P.leaf}"/>` +
      `<path d="M48 44q8 6 16 0M76 48q6 5 12 0" fill="none" stroke="${P.leafShade}" stroke-width="2.6" stroke-linecap="round"/>` +
      `<circle cx="48" cy="26" r="4" fill="${P.pink}" ${line(1.8)}/><circle cx="84" cy="34" r="4" fill="${P.butter}" ${line(1.8)}/>`,
    { className: 'v-art' },
  );
}

export function fence(): string {
  return svg(
    '0 0 176 70',
    `<path d="M4 34h168M4 54h168" stroke="#efe4d0" stroke-width="8" stroke-linecap="round"/>` +
      `<path d="M4 34h168M4 54h168" fill="none" ${line(1.6)}/>` +
      [12, 44, 76, 108, 140].map((x) => `<path d="M${x} 70V22l10 -12 10 12v48z" fill="#faf3e7" ${line(2.6)}/>`).join(''),
    { className: 'v-art' },
  );
}

export function welcomeSign(name: string): string {
  return svg(
    '0 0 170 140',
    `<rect x="78" y="56" width="14" height="84" rx="4" fill="#c9a07a" ${line(3)}/>` +
      `<path d="M10 22L150 16L160 38L150 60L12 58Z" fill="#e2b38c" ${line(3)}/>` +
      `<text x="84" y="44" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="15" fill="${INK}">${name}</text>` +
      sparkle(148, 10, 7, P.butter),
    { className: 'v-art' },
  );
}

/**
 * A dig spot: a flat patch of freshly turned soil with a bone sticking up out
 * of the hole. Kept low and flat, with the bone as the focus, so it reads as
 * "something buried here" and not as a lump on the path.
 */
export function mound(): string {
  const soil = '#6b4a33';
  const bone =
    `<g transform="translate(62 21) rotate(-38)">` +
    `<rect x="-17" y="-4.5" width="34" height="9" rx="3" fill="${P.cream}" ${line(2.4)}/>` +
    `<circle cx="-17" cy="-4.5" r="5.4" fill="${P.cream}" ${line(2.4)}/><circle cx="-17" cy="4.5" r="5.4" fill="${P.cream}" ${line(2.4)}/>` +
    `<circle cx="17" cy="-4.5" r="5.4" fill="${P.cream}" ${line(2.4)}/><circle cx="17" cy="4.5" r="5.4" fill="${P.cream}" ${line(2.4)}/>` +
    `<rect x="-17" y="-3.3" width="34" height="6.6" fill="${P.cream}"/></g>`;
  return svg(
    '0 0 112 48',
    // grass tufts either side
    `<path d="M6 40q1-8 5-11M11 40q0-9 2-13M100 40q1-8-3-11M105 40q0-9-2-13" fill="none" stroke="${P.leafShade}" stroke-width="2.6" stroke-linecap="round"/>` +
      // the flat patch of turned soil and the hole in it
      `<ellipse cx="56" cy="38" rx="44" ry="8.5" fill="${soil}" ${line(2.8)}/>` +
      `<ellipse cx="54" cy="37" rx="22" ry="4.4" fill="#2e1f15"/>` +
      bone +
      // the front lip of the hole covers the buried end of the bone
      `<path d="M31 37.5C40 43 68 43 77 37.5C70 40.5 38 40.5 31 37.5Z" fill="${soil}"/>` +
      // a few flat clods thrown out by digging
      `<ellipse cx="22" cy="33" rx="5" ry="2.6" fill="#8a6246" ${line(1.8)}/>` +
      `<ellipse cx="90" cy="34" rx="4.4" ry="2.4" fill="#8a6246" ${line(1.8)}/>` +
      sparkle(90, 10, 6, P.butter),
    { className: 'v-art' },
  );
}

/** A small round sun with a face for golden hour. */
export function sun(): string {
  const rays = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    const x1 = 60 + Math.cos(a) * 46;
    const y1 = 60 + Math.sin(a) * 46;
    const x2 = 60 + Math.cos(a) * 56;
    const y2 = 60 + Math.sin(a) * 56;
    return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="${P.butterShade}" stroke-width="6" stroke-linecap="round"/>`;
  }).join('');
  return svg('0 0 120 120', rays + `<circle cx="60" cy="60" r="38" fill="${P.butter}" ${line(3)}/>` + face(60, 58, { gap: 22, r: 4.4, mouth: 'smile', happy: true }), {
    className: 'v-art',
  });
}

/** A porch with a basket for the opening scene. The pup is layered on top in HTML. */
export function porch(): string {
  return svg(
    '0 0 420 230',
    `<ellipse cx="210" cy="214" rx="200" ry="16" fill="#1c140f"/>` +
      `<path d="M40 210L44 70L250 64L254 210Z" fill="#ffd6b5" ${line(3.2)}/>` +
      `<path d="M20 78C70 56 120 30 150 6C180 30 230 56 276 74C200 62 100 64 20 78Z" fill="${P.plum}" ${line(3.2)}/>` +
      glowWindow(70, 104, 40, 46) +
      `<path d="M150 210L150 150C150 128 194 128 194 150L194 210Z" fill="${P.pumpkin}" ${line(3)}/>` +
      `<circle cx="184" cy="180" r="3" fill="${INK}"/>` +
      `<rect x="20" y="204" width="380" height="12" rx="5" fill="#c9a07a" ${line(3)}/>` +
      `<path d="M270 206C266 168 380 168 376 206Z" fill="#e2b38c" ${line(3)}/>` +
      `<path d="M262 178C262 170 384 170 384 178L380 206C350 212 296 212 266 206Z" fill="#d79a6a" ${line(3)}/>` +
      `<path d="M276 186h96M280 196h88" stroke="#b97a4c" stroke-width="2.4" stroke-linecap="round"/>` +
      `<path d="M262 178C280 150 366 150 384 178" fill="none" stroke="#b97a4c" stroke-width="5" stroke-linecap="round"/>` +
      mini(18, 160, 0.42) +
      mini(380, 170, 0.3),
    { className: 'v-art' },
  );
}

/** Rolling hills drawn as one long path, coloured by CSS. */
export function hills(width: number, height: number, base: number, amp: number, period: number, seed: number, className: string): string {
  let d = `M0 ${height}L0 ${base}`;
  let x = 0;
  let i = 0;
  while (x < width) {
    const wobble = Math.sin((i + 1) * 12.9898 * seed) * 0.5 + 0.5;
    const peak = base - amp * (0.55 + wobble * 0.45);
    const step = period * (0.8 + wobble * 0.4);
    d += `Q${(x + step / 2).toFixed(1)} ${peak.toFixed(1)} ${(x + step).toFixed(1)} ${base}`;
    x += step;
    i += 1;
  }
  d += `L${width} ${height}Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" class="${className}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
}
