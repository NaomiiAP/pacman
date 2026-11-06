import { INK, P, blush, eye, face, line, sparkle, svg } from './kit.ts';
import { ghostBody } from './critters.ts';

/*
 * Extra cute bits: garlands, peeking critters, the school and the
 * small badges for each internship.
 */

function quad(p0: [number, number], p1: [number, number], p2: [number, number], t: number): [number, number] {
  const u = 1 - t;
  return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]];
}

const BULBS = [P.pumpkin, P.pink, P.butter, P.mint, P.lilac, P.sky];

/** A sagging string of fairy lights. `offset` shifts the colour order. */
export function garland(offset = 0): string {
  const segments: Array<[[number, number], [number, number], [number, number]]> = [
    [[0, 10], [150, 58], [300, 16]],
    [[300, 16], [450, 58], [600, 10]],
  ];
  let bulbs = '';
  let i = 0;
  for (const [a, b, c] of segments) {
    for (let step = 1; step <= 6; step += 1) {
      const [x, y] = quad(a, b, c, step / 7);
      const color = BULBS[(i + offset) % BULBS.length];
      bulbs +=
        `<g class="bulb" style="animation-delay:${((i * 0.43) % 2.4).toFixed(2)}s">` +
        `<circle cx="${x.toFixed(1)}" cy="${(y + 14).toFixed(1)}" r="13" fill="${color}" opacity=".28"/>` +
        `<rect x="${(x - 4).toFixed(1)}" y="${(y + 1).toFixed(1)}" width="8" height="6" rx="1.5" fill="${P.night2}" ${line(1.8)}/>` +
        `<ellipse cx="${x.toFixed(1)}" cy="${(y + 14).toFixed(1)}" rx="6.5" ry="8.5" fill="${color}" ${line(2.2)}/>` +
        `<ellipse cx="${(x - 2).toFixed(1)}" cy="${(y + 11).toFixed(1)}" rx="1.6" ry="2.6" fill="#fff" opacity=".7"/>` +
        `</g>`;
      i += 1;
    }
  }
  return svg(
    '0 0 600 84',
    `<path d="M0 10Q150 58 300 16Q450 58 600 10" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>` + bulbs,
    { className: 'garland-art' },
  );
}

/** A black cat peeking over an edge. The edge is the bottom of the drawing. */
export function catPeek(): string {
  const fur = '#3d332e';
  return svg(
    '0 0 120 64',
    `<path d="M28 34L24 6L48 22Z" fill="${fur}" ${line(3)}/><path d="M92 34L96 6L72 22Z" fill="${fur}" ${line(3)}/>` +
      `<path d="M31 26L29 13L41 21Z" fill="${P.pink}"/><path d="M89 26L91 13L79 21Z" fill="${P.pink}"/>` +
      `<path d="M22 64C22 34 38 18 60 18C82 18 98 34 98 64Z" fill="${fur}" ${line(3)}/>` +
      `<ellipse cx="47" cy="42" rx="6" ry="7" fill="${P.butter}" ${line(1.8)}/><ellipse cx="73" cy="42" rx="6" ry="7" fill="${P.butter}" ${line(1.8)}/>` +
      `<g class="peek-eyes"><ellipse cx="47" cy="43" rx="2.6" ry="5" fill="${INK}"/><ellipse cx="73" cy="43" rx="2.6" ry="5" fill="${INK}"/></g>` +
      `<circle cx="49" cy="39" r="1.6" fill="#fff"/><circle cx="75" cy="39" r="1.6" fill="#fff"/>` +
      blush(38, 52, 4.4, 2.6) +
      blush(82, 52, 4.4, 2.6) +
      `<path d="M57.5 50.5h5l-2.5 3z" fill="${P.pink}"/>` +
      `<ellipse cx="34" cy="62" rx="11" ry="6" fill="${fur}" ${line(2.6)}/><ellipse cx="86" cy="62" rx="11" ry="6" fill="${fur}" ${line(2.6)}/>` +
      `<path d="M30 60v4M35 59v5M82 60v4M87 59v5" stroke="${P.lilacSoft}" stroke-width="1.6" stroke-linecap="round"/>`,
    { className: 'peek-art' },
  );
}

/** A ghost holding on to an edge with both hands. */
export function ghostPeek(): string {
  return svg(
    '0 0 100 66',
    `<path d="M18 66L18 44C18 22 32 8 50 8C68 8 82 22 82 44L82 66Z" fill="#fff" ${line(3)}/>` +
      `<path d="M64 14C74 22 82 32 82 46L82 66L70 66C72 46 70 28 64 14Z" fill="${P.lilacSoft}"/>` +
      `<path d="M18 66L18 44C18 22 32 8 50 8C68 8 82 22 82 44L82 66" fill="none" ${line(3)}/>` +
      face(50, 38, { gap: 20, r: 4.4, mouth: 'o' }) +
      `<ellipse cx="14" cy="62" rx="9" ry="6" fill="#fff" ${line(2.6)}/><ellipse cx="86" cy="62" rx="9" ry="6" fill="#fff" ${line(2.6)}/>`,
    { className: 'peek-art' },
  );
}

/** A bat hanging upside down from a ledge. */
export function batHang(): string {
  return svg(
    '0 0 80 92',
    `<path d="M34 4v10M46 4v10" ${line(3)}/>` +
      `<path d="M24 26C10 30 6 48 12 62C18 58 22 60 24 66C28 58 30 50 30 42Z" fill="#4a3f3a" ${line(2.6)}/>` +
      `<path d="M56 26C70 30 74 48 68 62C62 58 58 60 56 66C52 58 50 50 50 42Z" fill="#4a3f3a" ${line(2.6)}/>` +
      `<ellipse cx="40" cy="40" rx="17" ry="24" fill="#5e524b" ${line(3)}/>` +
      `<path d="M28 76L26 90L36 82ZM52 76L54 90L44 82Z" fill="#5e524b" ${line(2.4)}/>` +
      `<circle cx="40" cy="62" r="15" fill="#5e524b" ${line(3)}/>` +
      `<g transform="rotate(180 40 62)">${eye(34, 60, 3)}${eye(46, 60, 3)}</g>` +
      blush(31, 58, 3.4, 2) +
      blush(49, 58, 3.4, 2) +
      `<path d="M36 55q4 -3.4 8 0" fill="none" ${line(2)}/>`,
    { className: 'peek-art' },
  );
}

/** A small spider on a long thread. */
export function spiderDangle(): string {
  return svg(
    '0 0 60 140',
    `<path d="M30 0V96" stroke="${INK}" stroke-width="1.8"/>` +
      `<g fill="none" ${line(3)}><path d="M20 104l-12 -8M19 110l-14 0M20 116l-12 8M40 104l12 -8M41 110l14 0M40 116l12 8"/></g>` +
      `<circle cx="30" cy="110" r="14" fill="${P.lilac}" ${line(2.8)}/>` +
      eye(25, 108, 2.6) +
      eye(35, 108, 2.6) +
      blush(21, 114, 2.6, 1.6) +
      blush(39, 114, 2.6, 1.6) +
      `<path d="M28 115q2 2 4 0" fill="none" ${line(1.6)}/>`,
    { className: 'peek-art' },
  );
}

/** A bubbling potion bottle with a heart label. */
export function potion(color: string = P.pink): string {
  return svg(
    '0 0 70 90',
    `<circle cx="22" cy="10" r="4" fill="${P.mintSoft}" ${line(1.8)}/><circle cx="32" cy="4" r="2.6" fill="${P.mintSoft}" ${line(1.6)}/>` +
      `<rect x="26" y="12" width="18" height="12" rx="3" fill="#c9a07a" ${line(2.4)}/>` +
      `<path d="M28 24v10C14 40 8 52 10 64C12 78 24 86 35 86C46 86 58 78 60 64C62 52 56 40 42 34V24Z" fill="#fff" fill-opacity=".85" ${line(2.8)}/>` +
      `<path d="M12 58C24 52 46 64 58 56C60 72 50 84 35 84C20 84 10 74 12 58Z" fill="${color}"/>` +
      `<path d="M28 24v10C14 40 8 52 10 64C12 78 24 86 35 86C46 86 58 78 60 64C62 52 56 40 42 34V24Z" fill="none" ${line(2.8)}/>` +
      `<path d="M35 72c-2-3-7-2-7 1 0 3 7 7 7 7s7-4 7-7c0-3-5-4-7-1z" fill="#fff" ${line(1.6)}/>` +
      `<ellipse cx="22" cy="48" rx="3" ry="7" fill="#fff" opacity=".7" transform="rotate(20 22 48)"/>`,
    { className: 'decor-art' },
  );
}

/** A witch hat with a star buckle. */
export function witchHat(): string {
  return svg(
    '0 0 90 76',
    `<ellipse cx="45" cy="64" rx="42" ry="10" fill="${P.plum}" ${line(3)}/>` +
      `<path d="M22 62C28 42 36 18 56 4C50 18 52 34 68 60Z" fill="${P.plum}" ${line(3)}/>` +
      `<path d="M26 54C38 58 56 58 66 52L68 60C56 64 36 64 24 60Z" fill="${P.pink}" ${line(2.4)}/>` +
      sparkle(46, 34, 6, P.butter),
    { className: 'decor-art' },
  );
}

/** A pastel tennis ball for Fetch! */
export function ball(): string {
  return svg(
    '0 0 40 40',
    `<circle cx="20" cy="20" r="16" fill="${P.mint}" ${line(2.8)}/>` +
      `<path d="M9 9c7 6 7 16 0 22M31 9c-7 6-7 16 0 22" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>`,
    { className: 'decor-art' },
  );
}

/** A bone, drawn as one outlined silhouette. */
export function bone(): string {
  const parts =
    '<circle cx="10" cy="10" r="7"/><circle cx="10" cy="22" r="7"/><circle cx="58" cy="10" r="7"/><circle cx="58" cy="22" r="7"/>' +
    '<rect x="10" y="11" width="48" height="10"/>';
  return svg(
    '0 0 68 32',
    `<g fill="${INK}" stroke="${INK}" stroke-width="5.5">${parts}</g><g fill="${P.cream}">${parts}</g>` +
      `<path d="M18 13h28" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>`,
    { className: 'decor-art' },
  );
}

/** A pink-capped mushroom pair. */
export function mushrooms(): string {
  const shroom = (x: number, s: number, cap: string) =>
    `<g transform="translate(${x} 70) scale(${s})">` +
    `<path d="M-7 0L-6 -18H6L7 0Z" fill="${P.cream}" ${line(2.6)}/>` +
    `<path d="M-20 -16C-20 -36 20 -36 20 -16Z" fill="${cap}" ${line(2.8)}/>` +
    `<circle cx="-8" cy="-25" r="3" fill="#fff"/><circle cx="6" cy="-22" r="2.4" fill="#fff"/><circle cx="2" cy="-30" r="1.8" fill="#fff"/>` +
    eye(-3, -9, 1.6) +
    eye(3, -9, 1.6) +
    `</g>`;
  return svg('0 0 80 72', shroom(28, 1.1, P.pink) + shroom(58, 0.8, P.lilac), { className: 'decor-art' });
}

/** Sticker for the education heading: a graduation cap. */
export function gradCap(): string {
  return svg(
    '0 0 72 64',
    `<path d="M20 30v14c8 8 24 8 32 0V30" fill="${P.night2}" ${line(2.8)}/>` +
      `<path d="M4 24L36 10L68 24L36 38Z" fill="${P.plum}" ${line(3)}/>` +
      `<path d="M36 24L58 30V44" fill="none" stroke="${P.pink}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M54 44h8l-1 10h-6z" fill="${P.pink}" ${line(2)}/>` +
      sparkle(10, 46, 5, P.butter) +
      sparkle(64, 8, 4, P.mint),
    { className: 'sticker-art' },
  );
}

/** Sticker for the experience heading: a quest map. */
export function questMap(): string {
  return svg(
    '0 0 72 64',
    `<path d="M8 14L24 8L40 14L56 8L64 12V54L56 58L40 52L24 58L8 52Z" fill="${P.butterSoft}" ${line(3)}/>` +
      `<path d="M24 8V58M40 14V52M56 8V58" stroke="${P.butterShade}" stroke-width="2"/>` +
      `<path d="M14 44C20 34 26 40 32 30S46 22 50 26" fill="none" stroke="${P.pinkShade}" stroke-width="2.6" stroke-dasharray="1 5" stroke-linecap="round"/>` +
      `<path d="M47 20l8 8M55 20l-8 8" ${line(3)}/>` +
      `<circle cx="14" cy="44" r="4" fill="${P.mint}" ${line(2)}/>`,
    { className: 'sticker-art' },
  );
}

/** The school: two towers, a clock with a face, pennants and a glowing door. */
export function academy(): string {
  const tower = (x: number, flag: string) =>
    `<rect x="${x}" y="80" width="54" height="176" fill="#faf3e7" ${line(3)}/>` +
    `<path d="M${x - 8} 84L${x + 27} 22L${x + 62} 84Z" fill="${P.plum}" ${line(3)}/>` +
    `<path d="M${x + 27} 22V4" ${line(2.6)}/><path d="M${x + 27} 4L${x + 46} 10L${x + 27} 16Z" fill="${flag}" ${line(2.2)}/>` +
    `<path d="M${x + 15} 150V128C${x + 15} 114 ${x + 39} 114 ${x + 39} 128V150Z" fill="${P.glow}" ${line(2.6)}/>` +
    `<path d="M${x + 15} 210V192C${x + 15} 180 ${x + 39} 180 ${x + 39} 192V210Z" fill="${P.glow}" ${line(2.6)}/>`;
  return svg(
    '0 0 320 262',
    tower(28, P.pink) +
      tower(238, P.mint) +
      `<rect x="78" y="110" width="164" height="146" fill="#fffaf2" ${line(3.2)}/>` +
      `<path d="M200 112L242 110L242 256L206 256Z" fill="#ebf3d6"/>` +
      `<rect x="78" y="110" width="164" height="146" fill="none" ${line(3.2)}/>` +
      `<path d="M66 116L160 44L254 116Z" fill="${P.lilacShade}" ${line(3.2)}/>` +
      `<circle cx="160" cy="88" r="21" fill="#fff" ${line(3)}/>` +
      `<path d="M160 88V74M160 88l9 5" ${line(2.6)}/>` +
      eye(152, 84, 1.8) +
      eye(168, 84, 1.8) +
      blush(147, 92, 2.6, 1.6) +
      blush(173, 92, 2.6, 1.6) +
      [104, 192].map((x) => `<path d="M${x} 176V150C${x} 136 ${x + 24} 136 ${x + 24} 150V176Z" fill="${P.glow}" ${line(2.8)}/><path d="M${x + 12} 140V176M${x} 160H${x + 24}" stroke="#c9a33f" stroke-width="2"/>`).join('') +
      `<circle cx="160" cy="214" r="34" fill="${P.glow}" opacity=".25"/>` +
      `<path d="M138 256V214C138 190 182 190 182 214V256Z" fill="${P.pumpkin}" ${line(3)}/>` +
      `<path d="M160 196V256" stroke="${P.pumpkinShade}" stroke-width="2"/>` +
      `<path d="M110 256h100" ${line(3.4)}/>` +
      `<rect x="122" y="250" width="76" height="10" rx="3" fill="${P.stone}" ${line(2.6)}/>` +
      `<path d="M78 126h164" stroke="${P.pink}" stroke-width="5"/>` +
      `<path d="M78 126h164" fill="none" ${line(1.4)}/>`,
    { className: 'academy-art' },
  );
}

/** A stack of books with a little pumpkin on top. */
export function books(): string {
  return svg(
    '0 0 110 92',
    `<rect x="8" y="64" width="94" height="22" rx="4" fill="${P.sky}" ${line(3)}/><path d="M16 70h70" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>` +
      `<rect x="16" y="44" width="80" height="20" rx="4" fill="${P.pink}" ${line(3)}/><path d="M24 50h56" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>` +
      `<rect x="12" y="26" width="84" height="18" rx="4" fill="${P.mint}" ${line(3)}/><path d="M20 32h60" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>` +
      `<g transform="translate(36 0) scale(0.3)">` +
      `<ellipse cx="35" cy="62" rx="25" ry="30" fill="${P.pumpkin}" ${line(6)}/><ellipse cx="75" cy="62" rx="25" ry="30" fill="${P.pumpkin}" ${line(6)}/><ellipse cx="55" cy="60" rx="23" ry="32" fill="${P.pumpkin}" ${line(6)}/>` +
      `<path d="M52 30C52 22 54 16 60 10" fill="none" stroke="#7aa35b" stroke-width="8" stroke-linecap="round"/>` +
      `</g>`,
    { className: 'decor-art' },
  );
}

/** HPE: a cloud captain at the helm (Helm charts on a private cloud). */
function helmCloud(): string {
  const spokes = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return `M${(60 + Math.cos(a) * 14).toFixed(1)} ${(78 + Math.sin(a) * 14).toFixed(1)}L${(60 + Math.cos(a) * 40).toFixed(1)} ${(78 + Math.sin(a) * 40).toFixed(1)}`;
  }).join('');
  return (
    `<path d="${spokes}" ${line(9)}/><path d="${spokes}" stroke="#c9a07a" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="60" cy="78" r="30" fill="none" ${line(11)}/><circle cx="60" cy="78" r="30" fill="none" stroke="#c9a07a" stroke-width="6"/>` +
    `<path d="M24 66C10 66 8 46 22 44C22 28 42 22 50 34C56 20 82 20 84 40C98 38 104 58 92 64Z" fill="${P.skySoft}" ${line(3)}/>` +
    `<path d="M30 62C46 58 70 60 90 58C86 64 60 66 30 62Z" fill="${P.sky}" opacity=".6"/>` +
    face(58, 46, { gap: 16, r: 3.6, mouth: 'smile' }) +
    `<circle cx="60" cy="78" r="8" fill="${P.butter}" ${line(2.6)}/>` +
    sparkle(104, 20, 6, P.butter) +
    sparkle(14, 96, 5, P.pink)
  );
}

/** Samsung R&D: a lens with an anamorphic streak of light. */
function lensFlare(): string {
  return (
    `<path d="M2 62C30 58 90 58 118 62C90 66 30 66 2 62Z" fill="${P.sky}" opacity=".85"/>` +
    `<path d="M10 62H110" stroke="#fff" stroke-width="2" stroke-linecap="round"/>` +
    `<rect x="26" y="22" width="68" height="80" rx="22" fill="${P.night2}" ${line(3)}/>` +
    `<circle cx="60" cy="62" r="30" fill="${P.lilac}" ${line(3)}/>` +
    `<circle cx="60" cy="62" r="22" fill="#2a221d" ${line(2.6)}/>` +
    `<circle cx="60" cy="62" r="15" fill="#4a3d33"/>` +
    `<path d="M48 52C52 46 60 44 66 46" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>` +
    `<circle cx="70" cy="70" r="3" fill="#fff" opacity=".7"/>` +
    `<circle cx="60" cy="62" r="9" fill="none" stroke="${P.pink}" stroke-width="2" opacity=".8"/>` +
    `<rect x="72" y="14" width="16" height="10" rx="3" fill="${P.pink}" ${line(2.4)}/>` +
    eye(48, 92, 2.4) +
    eye(72, 92, 2.4) +
    `<path d="M57 95q3 3 6 0" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>` +
    sparkle(104, 34, 6, P.butter) +
    sparkle(16, 28, 5, P.mint)
  );
}

/** Fintervue: a laptop interviewer with a resume beside it. */
function interviewLaptop(): string {
  return (
    `<g transform="rotate(-10 30 60)"><rect x="10" y="36" width="36" height="46" rx="4" fill="#fff" ${line(2.6)}/>` +
    `<path d="M17 46h22M17 54h18M17 62h22M17 70h14" stroke="${P.lilacShade}" stroke-width="2.6" stroke-linecap="round"/></g>` +
    `<rect x="40" y="38" width="66" height="46" rx="6" fill="${P.lilac}" ${line(3)}/>` +
    `<rect x="47" y="45" width="52" height="32" rx="3" fill="#fff7ec" ${line(2)}/>` +
    face(73, 58, { gap: 14, r: 3.2, mouth: 'smile' }) +
    `<path d="M34 84H112L106 94H40Z" fill="${P.lilacShade}" ${line(3)}/>` +
    `<path d="M70 8H106C110 8 112 10 112 14V28C112 32 110 34 106 34H90L82 42L84 34H70C66 34 64 32 64 28V14C64 10 66 8 70 8Z" fill="${P.pink}" ${line(2.6)}/>` +
    `<text x="88" y="27" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="15" fill="${INK}">?</text>` +
    sparkle(18, 22, 5, P.butter)
  );
}

function genericJob(): string {
  return `<g transform="translate(10 4) scale(1)">${ghostBody({ mouth: 'smile' })}</g>`;
}

/** A badge drawing for an internship, picked from the organisation name. */
export function jobArt(org: string): string {
  const body = /hewlett|hpe/i.test(org) ? helmCloud() : /samsung/i.test(org) ? lensFlare() : /fintervue/i.test(org) ? interviewLaptop() : genericJob();
  return svg('0 0 120 120', body, { className: 'job-art' });
}

/** A strip of garden for the footer, drawn to repeat sideways. */
export function gardenStrip(): string {
  const pumpkin = (x: number, s: number) =>
    `<g transform="translate(${x} 0) scale(${s})">` +
    `<path d="M0 -40C0 -46 2 -50 6 -52" fill="none" stroke="#7aa35b" stroke-width="4" stroke-linecap="round"/>` +
    `<ellipse cx="-11" cy="-20" rx="13" ry="16" fill="${P.pumpkin}" ${line(2.8)}/><ellipse cx="11" cy="-20" rx="13" ry="16" fill="${P.pumpkin}" ${line(2.8)}/><ellipse cx="0" cy="-21" rx="11" ry="17" fill="${P.pumpkin}" ${line(2.8)}/>` +
    eye(-5, -20, 2.2) +
    eye(5, -20, 2.2) +
    `</g>`;
  return svg(
    '0 0 640 90',
    `<g transform="translate(0 86)">` +
      pumpkin(60, 1) +
      pumpkin(96, 0.7) +
      `<g transform="translate(250 0)"><path d="M-12 0L-12 -26C-12 -40 12 -40 12 -26L12 0Z" fill="${P.stone}" ${line(2.6)}/><path d="M-5 -24h10M0 -30v12" stroke="${P.stoneShade}" stroke-width="2.4" stroke-linecap="round"/></g>` +
      `<g transform="translate(372 0)"><path d="M-6 0L-5 -14H5L6 0Z" fill="${P.cream}" ${line(2.4)}/><path d="M-16 -12C-16 -30 16 -30 16 -12Z" fill="${P.pink}" ${line(2.6)}/><circle cx="-6" cy="-20" r="2.4" fill="#fff"/><circle cx="6" cy="-18" r="2" fill="#fff"/></g>` +
      pumpkin(500, 0.85) +
      `<path d="M140 0q4-14 8-18M150 0q0-16 3-22M160 0q-2-12-6-16M430 0q4-14 8-18M440 0q0-16 3-22M590 0q4-14 8-18M600 0q0-16 3-22" fill="none" stroke="${P.mintShade}" stroke-width="3" stroke-linecap="round"/>` +
      `</g>`,
    { className: 'garden-art' },
  );
}
