import { INK, P, blush, eye, line, shut, sparkle, svg } from './kit.ts';

const EAR = '#f2ad78';
const EAR_SHADE = '#e08d58';

function tube(d: string, color: string, width: number, className = ''): string {
  const cls = className ? ` class="${className}"` : '';
  return `<g${cls}><path d="${d}" fill="none" ${line(width + 5)}/><path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/></g>`;
}

/** The little lilac flame on the tail tip that marks the pup as a spirit. */
function wisp(x: number, y: number, scale = 1): string {
  return (
    `<g transform="translate(${x} ${y}) scale(${scale})"><g class="pup-wisp">` +
    `<circle cx="0" cy="-8" r="10" fill="${P.lilac}" opacity=".35"/>` +
    `<path d="M0 2C-7 -2 -8 -12 -2 -19C0 -13 7 -11 5 -4C4 0 2 2 0 2Z" fill="${P.lilac}" ${line(2.4)}/>` +
    `<path d="M0 -2C-3 -4 -3 -8 -1 -11C0 -8 3 -7 2 -4C1.6 -2.6 1 -2 0 -2Z" fill="#fff" opacity=".8"/>` +
    `</g></g>`
  );
}

/** Head centred on (0, 0). Costumes live inside it so they follow every pose. */
function head(sleeping: boolean): string {
  const earL = 'M-20 -18C-34 -17 -42 4 -37 19C-33 28 -23 25 -20 15C-17 5 -17 -9 -20 -18Z';
  const earR = 'M20 -18C34 -17 42 4 37 19C33 28 23 25 20 15C17 5 17 -9 20 -18Z';
  const eyes = sleeping ? shut(-11, 1, 4.6) + shut(11, 1, 4.6) : eye(-11, 0, 4.8) + eye(11, 0, 4.8);
  return (
    `<g class="pup-head">` +
    `<path class="costume costume-ghost" d="M-27 -8C-44 0 -55 18 -51 36C-47 31 -43 35 -39 31C-37 27 -33 29 -31 25C-33 14 -30 4 -27 -8Z" fill="#fff" ${line(3)}/>` +
    `<ellipse cx="0" cy="0" rx="30" ry="26" fill="${P.cream}" ${line(3.2)}/>` +
    `<path d="M17 -15C27 -4 27 14 15 22C7 26 -4 27 -12 25C6 22 20 8 17 -15Z" fill="${P.creamShade}" opacity=".55"/>` +
    `<path d="M-6 -25C-4 -32 0 -33 2 -27C4 -32 9 -31 8 -25" fill="${P.cream}" ${line(2.6)}/>` +
    `<path d="${earL}" fill="${EAR}" ${line(3)}/><path d="${earR}" fill="${EAR}" ${line(3)}/>` +
    `<path d="M-30 6C-32 14 -30 20 -26 21C-28 15 -28 10 -30 6Z" fill="${EAR_SHADE}" opacity=".7"/>` +
    `<path d="M30 6C32 14 30 20 26 21C28 15 28 10 30 6Z" fill="${EAR_SHADE}" opacity=".7"/>` +
    `<ellipse cx="0" cy="10" rx="10" ry="7" fill="#fff"/>` +
    `<g class="pup-eyes">${eyes}</g>` +
    blush(-15, 11, 4.4, 2.7) +
    blush(15, 11, 4.4, 2.7) +
    `<path d="M-4 6C-4 3.6 4 3.6 4 6C4 8.6 1.4 10 0 10C-1.4 10 -4 8.6 -4 6Z" fill="${INK}"/>` +
    `<ellipse cx="-1.3" cy="5.3" rx="1.3" ry=".8" fill="#fff"/>` +
    `<path d="M-5 11.5q2.5 3 5 0q2.5 3 5 0" fill="none" ${line(2.2)}/>` +
    (sleeping ? '' : `<path class="pup-tongue" d="M-2.6 13.6q2.6 6.4 5.2 0z" fill="${P.pink}" ${line(1.6)}/>`) +
    `<g class="costume costume-ghost">` +
    `<path d="M-31 -2C-35 -28 -16 -42 2 -41C22 -40 35 -26 33 -4C29 -14 22 -20 10 -22C-2 -24 -20 -18 -27 -6Z" fill="#fff" ${line(3)}/>` +
    `<ellipse cx="-5" cy="-31" rx="2.2" ry="3" fill="${INK}"/><ellipse cx="7" cy="-31" rx="2.2" ry="3" fill="${INK}"/>` +
    `</g>` +
    `<g class="costume costume-pumpkin">` +
    `<path d="M-1 -38C-1 -44 1 -47 4 -50" fill="none" stroke="#7aa35b" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M3 -45C8 -51 16 -50 17 -45C12 -42 7 -42 3 -45Z" fill="${P.leaf}" ${line(2)}/>` +
    `<ellipse cx="-9" cy="-29" rx="10" ry="9" fill="${P.pumpkin}" ${line(2.6)}/>` +
    `<ellipse cx="9" cy="-29" rx="10" ry="9" fill="${P.pumpkin}" ${line(2.6)}/>` +
    `<ellipse cx="0" cy="-30" rx="8.5" ry="10" fill="${P.pumpkin}" ${line(2.6)}/>` +
    `<ellipse cx="-3" cy="-35" rx="2" ry="3" fill="#fff" opacity=".45"/>` +
    `</g>` +
    `<g class="costume costume-witch">` +
    `<path d="M-15 -24C-11 -40 -1 -56 15 -62C11 -54 9 -44 13 -25Z" fill="${P.plum}" ${line(3)}/>` +
    `<ellipse cx="1" cy="-23" rx="27" ry="6.5" fill="${P.plum}" ${line(3)}/>` +
    `<path d="M-13.5 -28C-5 -25.5 6 -25.5 12.5 -29L12 -34C5 -31 -5 -31 -12 -33Z" fill="${P.butter}" ${line(2)}/>` +
    sparkle(1, -45, 4.5, P.butter) +
    `</g>` +
    `<g class="costume costume-grad">` +
    `<path d="M-15 -24v9c8 5 22 5 30 0v-9" fill="${P.night2}" ${line(2.6)}/>` +
    `<path d="M-28 -26L0 -38L28 -26L0 -14Z" fill="${P.plum}" ${line(2.8)}/>` +
    `<path d="M0 -26L21 -22V-9" fill="none" stroke="${P.pink}" stroke-width="2.6" stroke-linecap="round"/>` +
    `<path d="M18 -10h6l-1 8h-4z" fill="${P.pink}" ${line(1.8)}/>` +
    `</g>` +
    `</g>`
  );
}

function collar(d: string, bellX: number, bellY: number): string {
  return (
    tube(d, P.lilac, 5) +
    `<circle cx="${bellX}" cy="${bellY}" r="4.6" fill="${P.butter}" ${line(2.4)}/>` +
    `<path d="M${bellX - 2.6} ${bellY + 0.6}h5.2" ${line(1.6)}/>`
  );
}

function standPose(): string {
  return (
    `<g class="pose pose-stand">` +
    `<g class="pup-tail">` +
    tube('M42 92C28 90 22 80 24 66', P.cream, 8) +
    wisp(24, 66) +
    `</g>` +
    `<rect class="leg leg-fb" x="44" y="100" width="13" height="23" rx="6.5" fill="${P.creamShade}" ${line(3)}/>` +
    `<rect class="leg leg-ff" x="86" y="100" width="13" height="23" rx="6.5" fill="${P.creamShade}" ${line(3)}/>` +
    `<g class="pup-body">` +
    `<ellipse cx="72" cy="94" rx="37" ry="21" fill="${P.cream}" ${line(3.2)}/>` +
    `<path d="M40 100C52 112 92 116 106 102C100 112 84 116 72 116C56 116 44 110 40 100Z" fill="${P.creamShade}" opacity=".6"/>` +
    `<ellipse cx="60" cy="85" rx="10" ry="6.5" fill="${EAR}" opacity=".9"/>` +
    `</g>` +
    `<rect class="leg leg-nb" x="52" y="102" width="14" height="22" rx="7" fill="${P.cream}" ${line(3)}/>` +
    `<rect class="leg leg-nf" x="94" y="102" width="14" height="22" rx="7" fill="${P.cream}" ${line(3)}/>` +
    collar('M92 76C98 84 110 86 118 80', 106, 87) +
    `<g transform="translate(108 56)">${head(false)}</g>` +
    `</g>`
  );
}

function sitPose(): string {
  return (
    `<g class="pose pose-sit">` +
    `<g class="pup-tail">` +
    tube('M58 121C42 123 30 117 29 104', P.cream, 8) +
    wisp(29, 104) +
    `</g>` +
    `<rect x="98" y="96" width="12" height="27" rx="6" fill="${P.creamShade}" ${line(3)}/>` +
    `<ellipse cx="84" cy="94" rx="26" ry="29" transform="rotate(-12 84 94)" fill="${P.cream}" ${line(3.2)}/>` +
    `<ellipse cx="66" cy="107" rx="21" ry="16" fill="${P.cream}" ${line(3.2)}/>` +
    `<ellipse cx="63" cy="101" rx="8" ry="5.5" fill="${EAR}" opacity=".9"/>` +
    `<ellipse cx="55" cy="121" rx="11" ry="5" fill="${P.cream}" ${line(3)}/>` +
    `<rect x="86" y="98" width="13" height="26" rx="6.5" fill="${P.cream}" ${line(3)}/>` +
    collar('M84 72C90 80 102 82 110 76', 98, 83) +
    `<g transform="translate(100 50)">${head(false)}</g>` +
    `</g>`
  );
}

function sleepPose(): string {
  return (
    `<g class="pose pose-sleep">` +
    `<ellipse cx="72" cy="107" rx="44" ry="17" fill="${P.cream}" ${line(3.2)}/>` +
    `<path d="M32 112C44 122 96 126 112 114C104 122 88 124 72 124C54 124 38 120 32 112Z" fill="${P.creamShade}" opacity=".6"/>` +
    `<ellipse cx="56" cy="99" rx="10" ry="6" fill="${EAR}" opacity=".9"/>` +
    `<g class="pup-tail">` +
    tube('M33 109C22 122 44 127 60 125', P.cream, 8) +
    wisp(62, 124, 0.75) +
    `</g>` +
    `<g transform="translate(104 96) rotate(-6)">${head(true)}</g>` +
    `<ellipse cx="98" cy="122" rx="9" ry="5" fill="${P.cream}" ${line(3)}/>` +
    `<ellipse cx="113" cy="122" rx="9" ry="5" fill="${P.cream}" ${line(3)}/>` +
    `</g>`
  );
}

/** The spirit pup with every pose. CSS on a parent picks the visible one. */
export function pupArt(className = 'pup-art'): string {
  return svg('0 14 152 116', standPose() + sitPose() + sleepPose(), { className });
}

/** Only the sitting pup, for places that never change pose. */
export function pupSitting(className = 'pup-art'): string {
  return svg('0 14 152 116', sitPose(), { className });
}

/** Just the head, for small badges. */
export function pupHead(className = 'pup-head-art', costume?: 'witch' | 'pumpkin' | 'ghost' | 'grad'): string {
  const body = `<g transform="translate(46 44)">${head(false)}</g>`;
  const cls = costume ? `${className} show-${costume}` : className;
  return svg('0 6 92 74', body, { className: cls });
}
