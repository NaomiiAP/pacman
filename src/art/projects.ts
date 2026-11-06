import { INK, P, blush, eye, face, line, sparkle, svg } from './kit.ts';
import { ghostBody } from './critters.ts';

function tube(d: string, color: string, width: number): string {
  return `<path d="${d}" fill="none" ${line(width + 5)}/><path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function link(x: number, y: number, angle: number, color: string): string {
  return (
    `<g transform="rotate(${angle} ${x} ${y})">` +
    `<rect x="${x - 26}" y="${y - 14}" width="52" height="28" rx="14" fill="none" ${line(12)}/>` +
    `<rect x="${x - 26}" y="${y - 14}" width="52" height="28" rx="14" fill="none" stroke="${color}" stroke-width="6"/>` +
    `</g>`
  );
}

function cloudPuff(x: number, y: number, s = 1): string {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M-30 10C-40 10 -40 -2 -30 -2C-30 -14 -14 -18 -8 -8C-2 -20 18 -18 18 -4C28 -6 32 10 22 10Z" fill="#fff" ${line(2.6)}/>`;
}

function accps(): string {
  const shield = 'M200 30C224 42 246 42 262 36C266 94 248 140 200 168C152 140 134 94 138 36C154 42 176 42 200 30Z';
  return (
    link(84, 92, -24, P.lilac) +
    link(118, 120, -24, P.lilacShade) +
    `<path d="${shield}" fill="${P.mint}" ${line(3.2)}/>` +
    `<path d="M236 44C252 44 258 40 262 36C266 94 248 140 200 168C240 130 244 90 236 44Z" fill="${P.mintShade}" opacity=".55"/>` +
    face(200, 96, { gap: 30, r: 6, mouth: 'open' }) +
    `<circle cx="252" cy="54" r="15" fill="#fff" ${line(3)}/><path d="M245 54l5 5 9-10" fill="none" ${line(3.2)}/>` +
    tube('M336 116L362 146', P.bark, 7) +
    `<circle cx="314" cy="92" r="30" fill="${P.skySoft}" fill-opacity=".85" ${line(3)}/>` +
    `<circle cx="314" cy="92" r="30" fill="none" stroke="${P.butter}" stroke-width="6"/>` +
    `<circle cx="314" cy="92" r="33.5" fill="none" ${line(3)}/><circle cx="314" cy="92" r="26.5" fill="none" ${line(2.4)}/>` +
    `<circle cx="314" cy="92" r="13" fill="none" stroke="${P.plum}" stroke-width="3.4"/>` +
    `<path d="M319 87a6.5 6.5 0 1 0 0 10" fill="none" stroke="${P.plum}" stroke-width="3.4" stroke-linecap="round"/>` +
    sparkle(52, 40, 9, P.butter) +
    sparkle(362, 40, 7, '#fff') +
    sparkle(160, 176, 6, P.pink)
  );
}

function emotisense(): string {
  return (
    `<g transform="rotate(-9 92 104)">` +
    `<rect x="44" y="44" width="96" height="112" rx="8" fill="#fff" ${line(3.2)}/>` +
    `<rect x="54" y="54" width="76" height="68" rx="5" fill="${P.skySoft}" ${line(2.4)}/>` +
    `<circle cx="92" cy="90" r="22" fill="${P.butter}" ${line(2.8)}/>` +
    face(92, 88, { gap: 14, r: 3.4, mouth: 'grin', happy: true }) +
    `<path d="M62 136h40M62 145h26" stroke="${P.lilacSoft}" stroke-width="4" stroke-linecap="round"/>` +
    `</g>` +
    `<path d="M200 156C200 156 150 128 150 92C150 72 174 62 200 82C226 62 250 72 250 92C250 128 200 156 200 156Z" fill="${P.pink}" ${line(3.4)}/>` +
    `<path d="M228 74C244 78 248 96 238 112C230 124 214 138 200 146C226 126 240 100 228 74Z" fill="${P.pinkShade}" opacity=".5"/>` +
    face(200, 98, { gap: 22, r: 5, mouth: 'open' }) +
    `<path d="M276 40H360C368 40 372 44 372 52V108C372 116 368 120 360 120H316L298 138L300 120H276C268 120 264 116 264 108V52C264 44 268 40 276 40Z" fill="${P.lilacSoft}" ${line(3.2)}/>` +
    `<path d="M280 62h56M280 78h76M280 94h40" stroke="${P.lilacShade}" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M346 92c-3-4-9-3-9 2 0 4 9 9 9 9s9-5 9-9c0-5-6-6-9-2z" fill="${P.pink}" ${line(2)}/>` +
    sparkle(160, 40, 8, P.butter) +
    sparkle(244, 170, 6, '#fff') +
    sparkle(30, 170, 6, P.mint)
  );
}

function wanderly(): string {
  const lobe = (cx: number, rx: number) => `<ellipse cx="${cx}" cy="72" rx="${rx}" ry="52" fill="${P.pumpkin}" ${line(3.2)}/>`;
  return (
    cloudPuff(70, 52, 1.1) +
    cloudPuff(344, 132, 0.9) +
    `<path d="M40 176C80 170 110 150 140 138" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>` +
    `<path d="M172 112L184 150M228 112L216 150" ${line(2.6)}/>` +
    lobe(178, 34) +
    lobe(222, 34) +
    `<ellipse cx="200" cy="70" rx="30" ry="54" fill="${P.pumpkin}" ${line(3.2)}/>` +
    `<ellipse cx="188" cy="44" rx="7" ry="13" fill="#fff" opacity=".4" transform="rotate(18 188 44)"/>` +
    `<path d="M186 20C186 12 190 8 196 6" fill="none" stroke="#7aa35b" stroke-width="5" stroke-linecap="round"/>` +
    face(200, 74, { gap: 26, r: 5.4, mouth: 'cat' }) +
    `<g transform="translate(181 104) scale(0.38)">${ghostBody({ mouth: 'smile' })}</g>` +
    `<path d="M178 146h44l-4 26h-36z" fill="#d79a6a" ${line(3)}/>` +
    `<path d="M182 156h36M186 164h28" stroke="#b97a4c" stroke-width="2.4" stroke-linecap="round"/>` +
    `<path d="M336 44C336 30 356 30 356 44C356 56 346 66 346 66C346 66 336 56 336 44Z" fill="${P.pink}" ${line(3)}/>` +
    `<circle cx="346" cy="44" r="4.4" fill="#fff" ${line(2)}/>` +
    sparkle(130, 30, 7, P.butter) +
    sparkle(268, 34, 6, '#fff') +
    sparkle(286, 170, 7, P.butter)
  );
}

function eduvault(): string {
  return (
    `<g transform="rotate(-12 82 112)">` +
    `<rect x="40" y="96" width="84" height="34" rx="17" fill="${P.cream}" ${line(3)}/>` +
    `<ellipse cx="124" cy="113" rx="9" ry="17" fill="${P.creamShade}" ${line(3)}/>` +
    `<path d="M76 96v34M86 96v34" stroke="${P.pink}" stroke-width="6"/>` +
    `<path d="M81 130l-8 18 8-5 8 5z" fill="${P.pink}" ${line(2.4)}/>` +
    `</g>` +
    `<path d="M140 92C140 64 260 64 260 92L260 100L140 100Z" fill="${P.lilacShade}" ${line(3.2)}/>` +
    `<rect x="136" y="98" width="128" height="70" rx="12" fill="${P.lilac}" ${line(3.2)}/>` +
    `<path d="M164 98v70M236 98v70" stroke="${P.butter}" stroke-width="7"/>` +
    `<path d="M164 98v70M236 98v70" stroke="${INK}" stroke-width="1.6" stroke-dasharray="1 9" stroke-linecap="round"/>` +
    `<rect x="186" y="92" width="28" height="30" rx="6" fill="${P.butter}" ${line(2.8)}/>` +
    `<circle cx="200" cy="103" r="4" fill="${INK}"/><path d="M200 105v8" ${line(3)}/>` +
    eye(186, 138, 4.4) +
    eye(214, 138, 4.4) +
    blush(176, 148, 5, 3) +
    blush(224, 148, 5, 3) +
    `<path d="M196 146q4 4 8 0" fill="none" ${line(2.4)}/>` +
    `<path d="M164 58L200 42L236 58L200 74Z" fill="${P.night2}" ${line(3)}/>` +
    `<path d="M178 64v12c8 5 36 5 44 0V64" fill="${P.night2}" ${line(3)}/>` +
    `<path d="M236 58v20" stroke="${P.pink}" stroke-width="3" stroke-linecap="round"/><circle cx="236" cy="81" r="4" fill="${P.pink}" ${line(2)}/>` +
    `<g ${line(2.6)}>` +
    `<path d="M296 70l18-9 18 9-18 9z" fill="${P.mint}"/><path d="M296 70v20l18 9V79z" fill="${P.mintShade}"/><path d="M332 70v20l-18 9V79z" fill="${P.mintSoft}"/>` +
    `<path d="M320 120l16-8 16 8-16 8z" fill="${P.sky}"/><path d="M320 120v18l16 8v-18z" fill="${P.skyShade}"/><path d="M352 120v18l-16 8v-18z" fill="${P.skySoft}"/>` +
    `</g>` +
    `<path d="M322 98l8 12" stroke="${INK}" stroke-width="3" stroke-dasharray="3 5" stroke-linecap="round"/>` +
    sparkle(132, 40, 8, P.butter) +
    sparkle(286, 36, 6, '#fff') +
    sparkle(48, 54, 6, P.pink)
  );
}

function agriassist(): string {
  return (
    `<path d="M50 52H136C144 52 148 56 148 64V104C148 112 144 116 136 116H100L84 132L86 116H50C42 116 38 112 38 104V64C38 56 42 52 50 52Z" fill="#fff" ${line(3.2)}/>` +
    `<rect x="84" y="62" width="18" height="30" rx="9" fill="${P.lilac}" ${line(2.8)}/>` +
    `<path d="M78 84c0 10 30 10 30 0M93 98v8" fill="none" ${line(2.8)}/>` +
    `<path d="M62 76q-6 8 0 16M118 76q6 8 0 16" fill="none" stroke="${P.lilacShade}" stroke-width="3" stroke-linecap="round"/>` +
    `<path d="M200 118C200 100 198 86 200 72" fill="none" stroke="${P.leafShade}" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M200 96C186 98 168 90 166 74C182 70 196 80 200 96Z" fill="${P.leaf}" ${line(3)}/>` +
    `<path d="M200 88C214 90 232 80 234 64C218 60 204 70 200 88Z" fill="${P.leaf}" ${line(3)}/>` +
    `<circle cx="200" cy="56" r="20" fill="${P.mint}" ${line(3.2)}/>` +
    face(200, 56, { gap: 14, r: 3.6, mouth: 'smile' }) +
    `<path d="M160 116H240L232 168H168Z" fill="${P.pumpkin}" ${line(3.2)}/>` +
    `<rect x="154" y="110" width="92" height="16" rx="6" fill="${P.pumpkinShade}" ${line(3)}/>` +
    face(200, 146, { gap: 22, r: 4, mouth: 'cat', cheeks: true }) +
    `<rect x="276" y="122" width="18" height="40" rx="5" fill="${P.sky}" ${line(2.8)}/>` +
    `<rect x="304" y="102" width="18" height="60" rx="5" fill="${P.butter}" ${line(2.8)}/>` +
    `<rect x="332" y="78" width="18" height="84" rx="5" fill="${P.pink}" ${line(2.8)}/>` +
    `<path d="M270 112L300 92L326 70L352 50" fill="none" stroke="${P.leafShade}" stroke-width="4" stroke-linecap="round"/>` +
    `<path d="M340 48l13 1-3 12" fill="none" stroke="${P.leafShade}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="M266 166h92" ${line(3)}/>` +
    sparkle(250, 30, 7, P.butter) +
    sparkle(156, 34, 6, '#fff') +
    sparkle(20, 160, 6, P.butter)
  );
}

/** RepoWatch: a scheduled robot that triages GitHub issues and labels them. */
function repowatch(): string {
  const dots = (d: string) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>`;
  return (
    `<circle cx="78" cy="92" r="46" fill="none" stroke="${P.pink}" stroke-width="6" stroke-dasharray="190 60" stroke-linecap="round"/>` +
    `<path d="M120 70l6 14-15 -2" fill="none" stroke="${P.pink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<circle cx="78" cy="92" r="34" fill="${P.butterSoft}" ${line(3)}/>` +
    `<path d="M78 70v22l14 9" ${line(3.4)}/>` +
    `<circle cx="78" cy="92" r="3.6" fill="${INK}"/>` +
    `<rect x="48" y="146" width="60" height="22" rx="11" fill="#fff" ${line(2.4)}/>` +
    `<text x="78" y="162" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="13" fill="${INK}">10 min</text>` +
    dots('M134 98H158') +
    `<path d="M200 30V20" ${line(3)}/><circle cx="200" cy="16" r="7" fill="${P.glow}" ${line(2.4)}/><circle cx="200" cy="16" r="14" fill="${P.glow}" opacity=".35"/>` +
    `<rect x="166" y="30" width="68" height="52" rx="18" fill="${P.mint}" ${line(3)}/>` +
    `<rect x="176" y="40" width="48" height="32" rx="12" fill="#fff7ec" ${line(2.4)}/>` +
    eye(191, 55, 3.6) +
    eye(209, 55, 3.6) +
    blush(184, 64, 3.4, 2) +
    blush(216, 64, 3.4, 2) +
    `<path d="M197 63q3 3 6 0" fill="none" ${line(2)}/>` +
    `<path d="M158 112C150 104 150 92 160 90M242 112C250 104 250 92 240 90" fill="none" ${line(3)}/>` +
    `<rect x="160" y="86" width="80" height="70" rx="20" fill="${P.mint}" ${line(3)}/>` +
    `<path d="M208 92c12 6 20 24 18 46-6 8-18 12-26 13 16-12 18-38 8-59z" fill="${P.mintShade}" opacity=".45"/>` +
    `<text x="200" y="132" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="30" fill="${INK}">λ</text>` +
    `<rect x="172" y="156" width="18" height="16" rx="6" fill="${P.mint}" ${line(2.6)}/><rect x="210" y="156" width="18" height="16" rx="6" fill="${P.mint}" ${line(2.6)}/>` +
    dots('M246 98H272') +
    `<rect x="282" y="38" width="98" height="118" rx="12" fill="#fff" ${line(3)}/>` +
    `<circle cx="300" cy="58" r="8" fill="none" stroke="${P.mintShade}" stroke-width="3"/><circle cx="300" cy="58" r="2.6" fill="${P.mintShade}"/>` +
    `<path d="M314 54h50M314 64h34M294 82h70M294 92h54" stroke="${P.lilacSoft}" stroke-width="5" stroke-linecap="round"/>` +
    `<rect x="292" y="108" width="40" height="16" rx="8" fill="${P.pink}" ${line(2)}/><text x="312" y="120" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="10" fill="${INK}">high</text>` +
    `<rect x="336" y="108" width="36" height="16" rx="8" fill="${P.lilac}" ${line(2)}/><text x="354" y="120" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="10" fill="${INK}">docs</text>` +
    `<rect x="292" y="130" width="62" height="16" rx="8" fill="${P.butter}" ${line(2)}/><text x="323" y="142" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="600" font-size="10" fill="${INK}">first issue</text>` +
    sparkle(368, 30, 8, P.butter) +
    sparkle(256, 160, 6, P.pink) +
    sparkle(30, 34, 6, '#fff')
  );
}

const PROJECT_ART: Record<string, () => string> = {
  'project-repowatch': repowatch,
  'project-accps': accps,
  'project-emotisense': emotisense,
  'project-wanderly': wanderly,
  'project-eduvault': eduvault,
  'project-agriassist': agriassist,
};

export function projectArt(id: string): string {
  const draw = PROJECT_ART[id];
  if (!draw) return '';
  return svg('0 0 400 196', draw(), { className: 'project-art' });
}
