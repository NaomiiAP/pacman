/**
 * Shared drawing kit for every illustration on the site.
 * Art is built as SVG strings so the human page (rendered at build
 * time) and dog mode (built in the browser) draw the same characters.
 */

export const INK = '#2a1c14';

export const P = {
  ink: INK,
  white: '#ffffff',
  cream: '#fff7ec',
  creamShade: '#f3e0c8',
  pumpkin: '#ff9b54',
  pumpkinShade: '#ee7a34',
  pumpkinSoft: '#ffd6b5',
  lilac: '#a9d05b',
  lilacShade: '#80ad3c',
  lilacSoft: '#e8f2cf',
  mint: '#93e5c3',
  mintShade: '#5cc49b',
  mintSoft: '#d9f7ea',
  pink: '#ffa6c9',
  pinkShade: '#f27fae',
  pinkSoft: '#ffdeeb',
  butter: '#ffe07a',
  butterShade: '#f4c143',
  butterSoft: '#fff3c6',
  sky: '#a6d6ff',
  skyShade: '#74b7f0',
  skySoft: '#ddf0ff',
  night: '#1e1510',
  night2: '#3a2e27',
  plum: '#3e5a34',
  blush: '#ff8fb1',
  glow: '#ffe594',
  leaf: '#7fd19f',
  leafShade: '#4fae78',
  bark: '#8d5d47',
  stone: '#d1c8b8',
  stoneShade: '#a99e8c',
} as const;

/** Stroke attributes in the sticker style: rounded plum outline. */
export function line(width = 3, color: string = INK): string {
  return `stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"`;
}

/** A shiny kawaii eye: a tall oval with two highlights. */
export function eye(x: number, y: number, r = 4.5): string {
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${(r * 1.22).toFixed(2)}" fill="${INK}"/>` +
    `<circle cx="${(x + r * 0.32).toFixed(2)}" cy="${(y - r * 0.42).toFixed(2)}" r="${(r * 0.4).toFixed(2)}" fill="#fff"/>` +
    `<circle cx="${(x - r * 0.36).toFixed(2)}" cy="${(y + r * 0.5).toFixed(2)}" r="${(r * 0.17).toFixed(2)}" fill="#fff"/>`
  );
}

/** Closed eye. `happy` arches up (^), otherwise it curves down like sleep (u). */
export function shut(x: number, y: number, r = 4.5, happy = false): string {
  const dy = happy ? -r * 0.9 : r * 0.9;
  return `<path d="M${x - r} ${y} q${r} ${dy.toFixed(2)} ${r * 2} 0" fill="none" ${line(Math.max(2, r * 0.55))}/>`;
}

export function blush(x: number, y: number, rx = 5, ry = 3): string {
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${P.blush}" opacity=".75"/>`;
}

export type Mouth = 'smile' | 'cat' | 'open' | 'o' | 'grin' | 'fang';

export function mouth(kind: Mouth, x: number, y: number, s = 1): string {
  const w = 2.4 * s;
  switch (kind) {
    case 'cat':
      return `<path d="M${x - 5 * s} ${y} q${2.5 * s} ${3.2 * s} ${5 * s} 0 q${2.5 * s} ${3.2 * s} ${5 * s} 0" fill="none" ${line(w)}/>`;
    case 'open':
      return (
        `<path d="M${x - 4.5 * s} ${y} q${4.5 * s} ${8 * s} ${9 * s} 0 z" fill="${INK}" ${line(w)}/>` +
        `<path d="M${x - 2.4 * s} ${y + 3.4 * s} q${2.4 * s} ${2.2 * s} ${4.8 * s} 0" fill="${P.pink}"/>`
      );
    case 'o':
      return `<ellipse cx="${x}" cy="${y + 1.6 * s}" rx="${2.4 * s}" ry="${3 * s}" fill="${INK}"/>`;
    case 'grin':
      return `<path d="M${x - 6 * s} ${y} q${6 * s} ${7 * s} ${12 * s} 0" fill="none" ${line(w)}/>`;
    case 'fang':
      return (
        `<path d="M${x - 5 * s} ${y} q${5 * s} ${4.5 * s} ${10 * s} 0" fill="none" ${line(w)}/>` +
        `<path d="M${x - 3 * s} ${y + 1.2 * s} l${1.2 * s} ${3.2 * s} l${1.2 * s} ${-2.6 * s}" fill="#fff" ${line(1.4 * s)}/>`
      );
    default:
      return `<path d="M${x - 3.6 * s} ${y} q${3.6 * s} ${4 * s} ${7.2 * s} 0" fill="none" ${line(w)}/>`;
  }
}

export type FaceOptions = {
  gap?: number;
  r?: number;
  mouth?: Mouth;
  sleepy?: boolean;
  happy?: boolean;
  cheeks?: boolean;
  /** Distance from the eye line to the mouth. */
  drop?: number;
};

/** Two eyes, cheeks and a mouth centred on (x, y). */
export function face(x: number, y: number, options: FaceOptions = {}): string {
  const { gap = 20, r = 4.5, sleepy = false, happy = false, cheeks = true } = options;
  const drop = options.drop ?? r * 1.9;
  const left = x - gap / 2;
  const right = x + gap / 2;
  const eyesMarkup = sleepy || happy ? shut(left, y, r, happy) + shut(right, y, r, happy) : eye(left, y, r) + eye(right, y, r);
  const cheekMarkup = cheeks ? blush(left - r * 1.3, y + r * 1.9, r * 1.15, r * 0.7) + blush(right + r * 1.3, y + r * 1.9, r * 1.15, r * 0.7) : '';
  return `<g class="face">${eyesMarkup}${cheekMarkup}${mouth(options.mouth ?? 'smile', x, y + drop, r / 4.5)}</g>`;
}

/** A four-point sparkle centred on (x, y). */
export function sparkle(x: number, y: number, size = 10, fill: string = P.butter, outline = true): string {
  const s = size;
  const k = s * 0.22;
  const d = `M${x} ${y - s} C${x + k} ${y - k} ${x + k} ${y - k} ${x + s} ${y} C${x + k} ${y + k} ${x + k} ${y + k} ${x} ${y + s} C${x - k} ${y + k} ${x - k} ${y + k} ${x - s} ${y} C${x - k} ${y - k} ${x - k} ${y - k} ${x} ${y - s}Z`;
  return `<path d="${d}" fill="${fill}" ${outline ? line(Math.max(1.5, s * 0.18)) : ''}/>`;
}

/** Wrap drawing markup in an svg element. Decorative unless a label is passed. */
export function svg(viewBox: string, body: string, options: { className?: string; label?: string } = {}): string {
  const cls = options.className ? ` class="${options.className}"` : '';
  const a11y = options.label ? ` role="img" aria-label="${options.label}"` : ' aria-hidden="true" focusable="false"';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${cls}${a11y}>${body}</svg>`;
}
