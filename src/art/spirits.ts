import { INK, P, blush, eye, face, line, sparkle, svg } from './kit.ts';
import { pumpkinBody } from './critters.ts';

/** Thick outlined stroke: an ink stroke with a coloured stroke on top. */
function tube(d: string, color: string, width: number): string {
  return `<path d="${d}" fill="none" ${line(width + 5)}/><path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** Loomling: a little spider that weaves the web. */
function loomling(): string {
  const legs = [
    'M44 62C32 54 26 46 22 34',
    'M42 68C30 66 20 62 13 56',
    'M42 74C30 78 20 82 15 92',
    'M46 80C38 88 33 96 31 106',
  ];
  const left = legs.map((d) => `<path d="${d}"/>`).join('');
  return (
    `<path d="M60 0L60 44" stroke="${INK}" stroke-width="2"/>` +
    `<g fill="none" ${line(4.5)}>${left}<g transform="matrix(-1 0 0 1 120 0)">${left}</g></g>` +
    `<circle cx="60" cy="70" r="25" fill="${P.pink}" ${line(3.2)}/>` +
    `<path d="M76 52C84 60 86 74 80 84C74 92 64 95 56 94C70 88 79 72 76 52Z" fill="${P.pinkShade}" opacity=".55"/>` +
    `<ellipse cx="51" cy="56" rx="6" ry="4" fill="#fff" opacity=".55" transform="rotate(-25 51 56)"/>` +
    `<path d="M50 44L44 37L44 51Z" fill="${P.lilac}" ${line(2.4)}/><path d="M60 44L66 37L66 51Z" fill="${P.lilac}" ${line(2.4)}/>` +
    `<circle cx="55" cy="44" r="3.6" fill="${P.lilacShade}" ${line(2.2)}/>` +
    face(60, 70, { gap: 19, r: 4.6, mouth: 'cat' })
  );
}

/** Plotkin: a studious pumpkin with a rising chart. */
function plotkin(): string {
  return (
    `<g transform="translate(-4 14) scale(0.98)">${pumpkinBody({ glasses: true, mouth: 'smile' })}</g>` +
    `<rect x="82" y="22" width="34" height="30" rx="6" fill="#fff" ${line(2.6)}/>` +
    `<rect x="88" y="38" width="5" height="9" rx="1.5" fill="${P.mint}" ${line(1.6)}/>` +
    `<rect x="96" y="33" width="5" height="14" rx="1.5" fill="${P.lilac}" ${line(1.6)}/>` +
    `<rect x="104" y="28" width="5" height="19" rx="1.5" fill="${P.pink}" ${line(1.6)}/>` +
    `<path d="M87 34L96 28L104 24L112 22" fill="none" stroke="${P.pumpkinShade}" stroke-width="2.4" stroke-linecap="round"/>` +
    `<path d="M99 52L97 62" ${line(3)}/>`
  );
}

/** Glyphmoth: a fluffy moth with code on its wings. */
function glyphmoth(): string {
  return (
    `<path d="M56 56C40 28 12 24 10 44C8 64 34 70 56 64Z" fill="${P.lilacSoft}" ${line(3)}/>` +
    `<path d="M64 56C80 28 108 24 110 44C112 64 86 70 64 64Z" fill="${P.lilacSoft}" ${line(3)}/>` +
    `<path d="M56 68C40 72 26 88 33 100C40 110 56 94 58 76Z" fill="${P.pink}" ${line(3)}/>` +
    `<path d="M64 68C80 72 94 88 87 100C80 110 64 94 62 76Z" fill="${P.pink}" ${line(3)}/>` +
    `<g fill="none" stroke="${P.lilacShade}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M21 46l-5 4.5 5 4.5"/><path d="M25 55.5l4-11"/><path d="M33 46l5 4.5-5 4.5"/>` +
    `<path d="M89 41c-4 0-4 3-4 6s-2 3-3 3c1 0 3 0 3 3s0 6 4 6"/><path d="M98 41c4 0 4 3 4 6s2 3 3 3c-1 0-3 0-3 3s0 6-4 6"/>` +
    `</g>` +
    `<ellipse cx="60" cy="72" rx="12" ry="24" fill="${P.butterSoft}" ${line(3)}/>` +
    `<path d="M50 70q10 4 20 0M50 80q10 4 20 0M52 90q8 3 16 0" fill="none" stroke="${P.butterShade}" stroke-width="2.4" stroke-linecap="round"/>` +
    `<path d="M54 34C50 24 44 18 37 20" fill="none" ${line(2.6)}/><path d="M66 34C70 24 76 18 83 20" fill="none" ${line(2.6)}/>` +
    `<circle cx="36" cy="20" r="4" fill="${P.butter}" ${line(2.2)}/><circle cx="84" cy="20" r="4" fill="${P.butter}" ${line(2.2)}/>` +
    `<path d="M45 46C42 38 48 32 52 36C54 30 66 30 68 36C72 32 78 38 75 46C79 50 72 56 60 56C48 56 41 50 45 46Z" fill="#fff" ${line(2.6)}/>` +
    `<circle cx="60" cy="44" r="13" fill="${P.cream}" ${line(3)}/>` +
    face(60, 44, { gap: 11, r: 3.2, mouth: 'smile', drop: 6 })
  );
}

/** Brushwisp: a will-o'-the-wisp that paints. */
function brushwisp(): string {
  const flame = 'M58 12C64 28 84 38 86 64C88 90 74 106 58 106C42 106 30 92 32 68C33 54 42 48 44 36C48 44 50 48 54 50C54 36 54 24 58 12Z';
  return (
    `<circle cx="58" cy="72" r="38" fill="${P.sky}" opacity=".25"/>` +
    `<path d="${flame}" fill="${P.sky}" ${line(3)}/>` +
    `<path d="M58 48C62 60 74 66 74 80C74 94 66 100 58 100C50 100 42 94 43 82C44 72 52 68 54 60C56 64 57 56 58 48Z" fill="${P.skySoft}"/>` +
    face(58, 76, { gap: 18, r: 4.4, mouth: 'open' }) +
    tube('M84 98L104 56', P.bark, 5) +
    `<path d="M101 60L107 52C110 48 112 44 113 38C108 42 104 44 101 48L99 55Z" fill="${P.pink}" ${line(2.6)}/>` +
    `<rect x="97" y="56" width="9" height="7" rx="1.5" transform="rotate(26 101 59)" fill="${P.butter}" ${line(2.2)}/>` +
    `<ellipse cx="84" cy="88" rx="6" ry="5" fill="${P.sky}" ${line(2.6)}/>` +
    `<circle cx="22" cy="30" r="5" fill="${P.pink}" ${line(2.2)}/><circle cx="104" cy="22" r="4" fill="${P.butter}" ${line(2.2)}/><circle cx="16" cy="56" r="3.5" fill="${P.mint}" ${line(2)}/>`
  );
}

/** Brewbase: a cauldron that keeps everything it is given. */
function brewbase(): string {
  return (
    `<circle cx="46" cy="26" r="7" fill="${P.mintSoft}" ${line(2.4)}/><circle cx="62" cy="14" r="5" fill="${P.mintSoft}" ${line(2.2)}/><circle cx="74" cy="28" r="4" fill="${P.mintSoft}" ${line(2)}/>` +
    `<g transform="translate(83 4)"><ellipse cx="9" cy="5" rx="9" ry="3.6" fill="${P.butterSoft}" ${line(2)}/><path d="M0 5v12c0 5 18 5 18 0V5" fill="${P.butterSoft}" ${line(2)}/><path d="M0 11c0 5 18 5 18 0" fill="none" ${line(2)}/></g>` +
    `<ellipse cx="42" cy="104" rx="8" ry="5" fill="${P.night2}" ${line(2.6)}/><ellipse cx="78" cy="104" rx="8" ry="5" fill="${P.night2}" ${line(2.6)}/>` +
    `<path d="M22 48C16 74 28 102 60 102C92 102 104 74 98 48Z" fill="#4a403a" ${line(3.2)}/>` +
    `<path d="M88 52C94 72 88 92 70 100C88 98 98 84 98 66C98 58 96 52 94 48Z" fill="#3a312c" opacity=".7"/>` +
    `<ellipse cx="60" cy="46" rx="42" ry="11" fill="#5f5550" ${line(3.2)}/>` +
    `<ellipse cx="60" cy="46" rx="34" ry="6.5" fill="${P.mint}" ${line(2.4)}/>` +
    `<path d="M40 44q6-4 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>` +
    face(60, 72, { gap: 24, r: 4.8, mouth: 'open' })
  );
}

/** Kitbranch: a black cat whose tail forks like a git branch. */
function kitbranch(): string {
  const fur = '#3d332e';
  return (
    tube('M78 98C98 98 104 80 98 64', fur, 7) +
    tube('M101 76C110 72 113 62 109 52', fur, 6) +
    `<circle cx="98" cy="62" r="5.5" fill="${P.mint}" ${line(2.4)}/><circle cx="109" cy="50" r="5.5" fill="${P.pink}" ${line(2.4)}/><circle cx="101" cy="77" r="4" fill="${P.butter}" ${line(2.2)}/>` +
    `<path d="M36 106C30 82 38 64 60 64C82 64 90 82 84 106Z" fill="${fur}" ${line(3.2)}/>` +
    `<path d="M34 42L30 14L54 30Z" fill="${fur}" ${line(3.2)}/><path d="M86 42L90 14L66 30Z" fill="${fur}" ${line(3.2)}/>` +
    `<path d="M36 36L34 22L46 30Z" fill="${P.pink}"/><path d="M84 36L86 22L74 30Z" fill="${P.pink}"/>` +
    `<ellipse cx="60" cy="52" rx="31" ry="26" fill="${fur}" ${line(3.2)}/>` +
    `<ellipse cx="47" cy="50" rx="6.4" ry="7.4" fill="${P.butter}" ${line(2)}/><ellipse cx="73" cy="50" rx="6.4" ry="7.4" fill="${P.butter}" ${line(2)}/>` +
    `<ellipse cx="47" cy="51" rx="2.8" ry="5.4" fill="${INK}"/><ellipse cx="73" cy="51" rx="2.8" ry="5.4" fill="${INK}"/>` +
    `<circle cx="49" cy="47" r="1.8" fill="#fff"/><circle cx="75" cy="47" r="1.8" fill="#fff"/>` +
    blush(39, 61, 5, 3) +
    blush(81, 61, 5, 3) +
    `<path d="M57.5 58.5h5l-2.5 3z" fill="${P.pink}"/>` +
    `<path d="M55 63q2.5 3 5 0q2.5 3 5 0" fill="none" stroke="${P.lilacSoft}" stroke-width="2.2" stroke-linecap="round"/>` +
    `<path d="M30 56h-12M30 61l-11 3M90 56h12M90 61l11 3" stroke="${P.lilacSoft}" stroke-width="1.8" stroke-linecap="round"/>` +
    `<path d="M40 76C50 82 70 82 80 76" fill="none" stroke="${P.pink}" stroke-width="5" stroke-linecap="round"/>` +
    `<circle cx="60" cy="84" r="4.4" fill="${P.butter}" ${line(2.2)}/>` +
    `<ellipse cx="48" cy="106" rx="9" ry="5" fill="${fur}" ${line(2.6)}/><ellipse cx="72" cy="106" rx="9" ry="5" fill="${fur}" ${line(2.6)}/>`
  );
}

/** Fieldowl: a wise owl that has read a lot of papers. */
function fieldowl(): string {
  return (
    `<path d="M32 30L26 10L48 24Z" fill="${P.sky}" ${line(3)}/><path d="M88 30L94 10L72 24Z" fill="${P.sky}" ${line(3)}/>` +
    `<path d="M60 18C88 18 98 44 98 70C98 96 82 108 60 108C38 108 22 96 22 70C22 44 32 18 60 18Z" fill="${P.sky}" ${line(3.2)}/>` +
    `<path d="M24 66C14 74 16 92 28 96C30 86 30 74 24 66Z" fill="${P.skyShade}" ${line(2.6)}/><path d="M96 66C106 74 104 92 92 96C90 86 90 74 96 66Z" fill="${P.skyShade}" ${line(2.6)}/>` +
    `<ellipse cx="60" cy="86" rx="22" ry="18" fill="${P.cream}" ${line(2.6)}/>` +
    `<path d="M52 80l3 3 3-3M62 80l3 3 3-3M57 90l3 3 3-3" fill="none" stroke="${P.creamShade}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="45" cy="52" r="15" fill="#fff" ${line(2.8)}/><circle cx="75" cy="52" r="15" fill="#fff" ${line(2.8)}/>` +
    eye(45, 53, 6) +
    eye(75, 53, 6) +
    `<path d="M55 64L65 64L60 72Z" fill="${P.butter}" ${line(2.4)}/>` +
    blush(34, 68, 4.4, 2.6) +
    blush(86, 68, 4.4, 2.6) +
    `<path d="M40 108l-4 6M48 108v7M72 108v7M80 108l4 6" ${line(3)}/>`
  );
}

/** Lanternkit: a paper lantern spirit that lights the way. */
function lanternkit(): string {
  return (
    `<circle cx="60" cy="62" r="46" fill="${P.glow}" opacity=".35"/>` +
    `<path d="M60 2L60 16" ${line(2.6)}/>` +
    `<rect x="42" y="14" width="36" height="10" rx="4" fill="${P.night2}" ${line(2.8)}/>` +
    `<ellipse cx="60" cy="60" rx="38" ry="36" fill="${P.butter}" ${line(3.2)}/>` +
    `<path d="M88 34C98 48 98 74 88 88C84 92 78 94 74 95C88 82 92 54 84 32Z" fill="${P.butterShade}" opacity=".6"/>` +
    `<g fill="none" stroke="${P.butterShade}" stroke-width="2.4" stroke-linecap="round"><path d="M25 46Q60 54 95 46"/><path d="M22 62Q60 70 98 62"/><path d="M26 78Q60 86 94 78"/></g>` +
    `<rect x="44" y="94" width="32" height="10" rx="4" fill="${P.night2}" ${line(2.8)}/>` +
    `<path d="M60 104L60 112M55 112L65 112" ${line(2.6)}/>` +
    `<path d="M56 112L54 120M60 112L60 121M64 112L66 120" stroke="${P.pink}" stroke-width="2.6" stroke-linecap="round"/>` +
    face(60, 58, { gap: 24, r: 5, mouth: 'cat' }) +
    sparkle(16, 22, 7, P.pink) +
    sparkle(104, 30, 6, '#fff') +
    sparkle(100, 98, 5, P.mint)
  );
}

const SPIRITS: Record<string, () => string> = {
  loomling,
  plotkin,
  glyphmoth,
  brushwisp,
  brewbase,
  kitbranch,
  fieldowl,
  lanternkit,
};

export function spiritArt(id: string, className = 'spirit-art'): string {
  const draw = SPIRITS[id] ?? loomling;
  return svg('0 0 120 122', draw(), { className });
}
