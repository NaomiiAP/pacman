import { P, line, sparkle, svg } from './kit.ts';
import { ghostBody } from './critters.ts';

const BARK = '#4a3526';

function tube(d: string, color: string, width: number): string {
  return `<path d="${d}" fill="none" ${line(width + 5)}/><path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** Twinkling stars for the top of the hero sky. */
export function heroStars(): string {
  const big: Array<[number, number, number, string]> = [
    [40, 50, 8, P.butter],
    [150, 34, 6, '#fff'],
    [236, 82, 7, P.pink],
    [300, 30, 5, '#fff'],
    [356, 120, 6, P.butter],
    [96, 140, 5, '#fff'],
    [520, 210, 6, P.mint],
    [190, 196, 5, P.butter],
    [470, 36, 5, '#fff'],
    [20, 230, 5, P.pink],
  ];
  const dots: Array<[number, number]> = [
    [70, 20], [118, 92], [186, 128], [264, 150], [330, 70], [402, 40], [430, 170], [508, 150], [546, 60], [12, 110],
    [210, 20], [388, 214], [140, 250], [62, 190], [286, 222], [540, 260],
  ];
  return svg(
    '0 0 560 300',
    big.map(([x, y, s, c], i) => `<g class="twinkle" style="animation-delay:${(i * 0.37).toFixed(2)}s">${sparkle(x, y, s, c)}</g>`).join('') +
      dots.map(([x, y], i) => `<circle class="twinkle" style="animation-delay:${(i * 0.29).toFixed(2)}s" cx="${x}" cy="${y}" r="${i % 3 === 0 ? 2 : 1.4}" fill="#fff"/>`).join(''),
    { className: 'stars-art' },
  );
}

function house(): string {
  return (
    `<g transform="translate(300 344)">` +
    // smoke and chimney sit behind the roof
    `<g class="smoke"><circle cx="46" cy="-196" r="8" fill="#fff" opacity=".5"/><circle cx="56" cy="-214" r="10" fill="#fff" opacity=".4"/><circle cx="68" cy="-236" r="12" fill="#fff" opacity=".3"/></g>` +
    `<rect x="34" y="-182" width="24" height="70" fill="#8a7c6e" ${line(3)}/>` +
    `<rect x="29" y="-190" width="34" height="11" rx="3" fill="#a89a89" ${line(3)}/>` +
    // walls
    `<path d="M-66 0L-62 -112L62 -116L66 0Z" fill="#f3e9d8" ${line(3.2)}/>` +
    `<path d="M32 -115L62 -116L66 0L38 0Z" fill="#e9dcc6"/>` +
    `<path d="M-66 0L-62 -112L62 -116L66 0Z" fill="none" ${line(3.2)}/>` +
    // window glow
    `<circle cx="-36" cy="-66" r="30" fill="${P.glow}" opacity=".22"/><circle cx="36" cy="-66" r="30" fill="${P.glow}" opacity=".22"/>` +
    `<path d="M-50 -46L-50 -74C-50 -86 -22 -86 -22 -74L-22 -46Z" fill="${P.glow}" ${line(3)}/>` +
    `<path d="M22 -46L22 -74C22 -86 50 -86 50 -74L50 -46Z" fill="${P.glow}" ${line(3)}/>` +
    // a cat sits in the right window
    `<path d="M30 -46C30 -56 32 -62 36 -64L34 -71L39 -67L43 -67L46 -71L45 -64C48 -62 49 -58 48 -54C50 -50 48 -46 46 -46Z" fill="${P.plum}"/>` +
    `<path d="M47 -48C52 -50 54 -54 52 -58" fill="none" stroke="${P.plum}" stroke-width="2.6" stroke-linecap="round"/>` +
    `<path d="M-36 -84L-36 -46M-50 -62L-22 -62" stroke="#c9a33f" stroke-width="2.4"/>` +
    `<path d="M22 -62L30 -62" stroke="#c9a33f" stroke-width="2.4"/>` +
    `<rect x="-55" y="-48" width="38" height="7" rx="3" fill="#cdc3b2" ${line(2.6)}/><rect x="17" y="-48" width="38" height="7" rx="3" fill="#cdc3b2" ${line(2.6)}/>` +
    // door and step
    `<circle cx="0" cy="-30" r="26" fill="${P.glow}" opacity=".18"/>` +
    `<path d="M-16 0L-16 -34C-16 -50 16 -50 16 -34L16 0Z" fill="${P.pumpkin}" ${line(3)}/>` +
    `<path d="M-6 -46L-6 0M6 -46L6 0" stroke="${P.pumpkinShade}" stroke-width="2"/>` +
    `<circle cx="10" cy="-18" r="2.4" fill="${P.ink}"/>` +
    `<rect x="-26" y="-3" width="52" height="9" rx="4" fill="#cdc3b2" ${line(2.8)}/>` +
    // lantern by the door
    `<path d="M24 -64L24 -56" ${line(2)}/><circle cx="24" cy="-46" r="12" fill="${P.glow}" opacity=".35"/>` +
    `<rect x="19" y="-56" width="10" height="14" rx="3" fill="${P.butter}" ${line(2.4)}/>` +
    // roof
    `<path d="M-86 -100C-52 -118 -24 -160 -6 -224C-2 -236 8 -244 18 -244C10 -236 8 -228 8 -218C24 -164 50 -126 86 -106C40 -122 -40 -118 -86 -100Z" fill="${P.plum}" ${line(3.2)}/>` +
    `<path d="M-60 -116q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0" fill="none" stroke="#2c4426" stroke-width="2.6" stroke-linecap="round"/>` +
    `<path d="M-34 -150q8 7 16 0q8 7 16 0q8 7 16 0q8 7 16 0" fill="none" stroke="#2c4426" stroke-width="2.6" stroke-linecap="round"/>` +
    // attic window with a ghost that peeks out
    `<clipPath id="attic-window"><circle cx="0" cy="-176" r="15"/></clipPath>` +
    `<circle cx="0" cy="-176" r="17" fill="${P.glow}" ${line(3)}/>` +
    `<g clip-path="url(#attic-window)"><g class="attic-ghost"><g transform="translate(-14 -186) scale(0.3)">${ghostBody({ mouth: 'o' })}</g></g></g>` +
    `<circle cx="0" cy="-176" r="17" fill="none" ${line(3)}/>` +
    // a spider hangs from the eave
    `<g class="eave-spider"><path d="M78 -106L78 -76" stroke="${P.ink}" stroke-width="1.6"/>` +
    `<g fill="none" ${line(2)}><path d="M72 -72l-6 -4M72 -68l-7 1M84 -72l6 -4M84 -68l7 1"/></g>` +
    `<circle cx="78" cy="-70" r="7" fill="${P.pink}" ${line(2.4)}/><circle cx="75.5" cy="-71" r="1.4" fill="${P.ink}"/><circle cx="80.5" cy="-71" r="1.4" fill="${P.ink}"/></g>` +
    // mini pumpkins on the step
    miniPumpkin(-36, -2, 1) +
    miniPumpkin(40, -1, 0.8) +
    `</g>`
  );
}

function miniPumpkin(x: number, y: number, s: number): string {
  return (
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    `<path d="M0 -14C0 -18 2 -20 4 -21" fill="none" stroke="#7aa35b" stroke-width="3" stroke-linecap="round"/>` +
    `<ellipse cx="-5" cy="-7" rx="7" ry="7" fill="${P.pumpkin}" ${line(2.4)}/><ellipse cx="5" cy="-7" rx="7" ry="7" fill="${P.pumpkin}" ${line(2.4)}/><ellipse cx="0" cy="-7.5" rx="6" ry="8" fill="${P.pumpkin}" ${line(2.4)}/>` +
    `</g>`
  );
}

function tree(): string {
  const leaves: Array<[number, number, number, string]> = [
    [40, 222, -30, P.pumpkin],
    [56, 236, 20, P.pink],
    [140, 228, 40, P.pumpkin],
    [104, 186, -10, P.butter],
    [120, 210, 60, P.pink],
    [30, 250, 10, P.butter],
  ];
  return (
    `<path d="M74 364C82 330 84 300 82 272C80 252 74 238 68 228L82 224C88 238 94 254 96 272C98 302 100 332 106 364Z" fill="${BARK}" ${line(3)}/>` +
    tube('M82 272C66 260 50 252 44 238C40 228 48 222 54 228', BARK, 6) +
    tube('M95 262C110 250 128 246 138 232C143 223 135 216 129 222', BARK, 6) +
    tube('M78 230C76 212 82 198 94 192C102 188 106 196 100 200', BARK, 5) +
    leaves.map(([x, y, r, c]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="5" transform="rotate(${r} ${x} ${y})" fill="${c}" ${line(2.2)}/>`).join('') +
    `<path d="M126 238L126 258" ${line(2)}/>` +
    `<circle class="glow-pulse" cx="126" cy="270" r="20" fill="${P.glow}" opacity=".35"/>` +
    `<rect x="118" y="258" width="16" height="22" rx="5" fill="${P.butter}" ${line(2.6)}/>` +
    `<rect x="116" y="256" width="20" height="5" rx="2" fill="${P.night2}" ${line(2)}/>` +
    `<rect x="116" y="278" width="20" height="5" rx="2" fill="${P.night2}" ${line(2)}/>`
  );
}

function tuft(x: number, y: number, color: string = P.mintShade): string {
  return `<path d="M${x - 6} ${y}q2-8 4-10M${x} ${y}q0-9 1-13M${x + 6} ${y}q-1-8 -3-10" fill="none" stroke="${color}" stroke-width="2.6" stroke-linecap="round"/>`;
}

function mushroom(x: number, y: number, s = 1): string {
  return (
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    `<path d="M-4 0L-4 -10L4 -10L4 0Z" fill="${P.cream}" ${line(2.2)}/>` +
    `<path d="M-12 -9C-12 -20 12 -20 12 -9Z" fill="${P.pink}" ${line(2.4)}/>` +
    `<circle cx="-4" cy="-14" r="2" fill="#fff"/><circle cx="4" cy="-12" r="1.6" fill="#fff"/>` +
    `</g>`
  );
}

function tinyGrave(x: number, y: number, s = 1): string {
  return (
    `<g transform="translate(${x} ${y}) scale(${s})">` +
    `<path d="M-12 0L-12 -18C-12 -28 12 -28 12 -18L12 0Z" fill="${P.stone}" ${line(2.6)}/>` +
    `<path d="M-5 -15h10M0 -20v12" stroke="${P.stoneShade}" stroke-width="2.4" stroke-linecap="round"/>` +
    `</g>`
  );
}

/** Hills, the haunted house, a curly tree and the path down to the pup. */
export function heroLand(): string {
  const farHouses = [
    [58, 300],
    [470, 292],
  ]
    .map(
      ([x, y]) =>
        `<g transform="translate(${x} ${y})"><path d="M-12 0L-12 -14L0 -24L12 -14L12 0Z" fill="#3d3128"/><rect x="-4" y="-12" width="6" height="6" fill="${P.glow}"/></g>`,
    )
    .join('');
  return svg(
    '0 0 560 520',
    `<path d="M0 318C60 296 120 290 180 300C240 310 290 292 350 286C420 280 480 300 560 292L560 520L0 520Z" fill="#4a3a26"/>` +
      farHouses +
      `<path d="M140 300l8 -18 8 18zM400 288l7 -16 7 16zM412 290l6 -13 6 13z" fill="#3d3128"/>` +
      `<path d="M0 384C70 356 150 344 230 342C320 340 380 352 450 364C500 372 530 376 560 374L560 520L0 520Z" fill="#33281b" ${line(3)}/>` +
      tree() +
      tinyGrave(462, 372, 1) +
      tinyGrave(500, 378, 0.8) +
      `<path d="M396 360l0 -16M410 362l0 -16M424 364l0 -16M438 366l0 -16M390 354L444 360" stroke="#cdc3b2" stroke-width="4" stroke-linecap="round"/>` +
      house() +
      `<path d="M0 436C90 420 180 416 280 420C380 424 470 416 560 426L560 520L0 520Z" fill="#2e2014" ${line(3)}/>` +
      `<path d="M286 346C296 366 268 384 260 404C252 424 300 442 318 470C328 490 320 510 316 524L380 524C384 502 386 480 374 456C358 430 322 418 322 400C322 384 332 366 316 346Z" fill="#7a6a55"/>` +
      `<path d="M300 380q10 4 20 0M282 420q12 5 24 0M324 470q14 5 28 0" fill="none" stroke="#8a7558" stroke-width="3" stroke-linecap="round"/>` +
      tuft(40, 440) +
      tuft(206, 432) +
      tuft(470, 436) +
      tuft(538, 448) +
      tuft(150, 380, '#8fe3bf') +
      tuft(520, 386, '#8fe3bf') +
      mushroom(236, 452, 1.1) +
      mushroom(252, 458, 0.8) +
      mushroom(420, 452, 0.9),
    { className: 'land-art' },
  );
}
