# Round 2 audit

Checked against `portfolio-plan.md`, `about-me.txt`, `PLAN.md`, and the round 1 build. `npm run build` succeeds. Playwright found no console errors and no failed network requests in human or dog mode. Text contrast for the palette pairs used on the page is WCAG AA or better (ink on cream 15.9:1, plum on cream 7.5:1, cream on indigo 17:1). Lighthouse mobile, human mode: performance 100, accessibility 100. Paw cursor is off when the browser is emulated as a touch phone. No asset is over 300 KB. Dog-mode JavaScript loads only after "Become the dog".

The content warnings from `npm run build` (empty email, resume, and photo, plus three `[PLACEHOLDER]` graveyard entries) are intentional. They are not defects.

Checked and left as-is:

- LinkedIn is not in `about-me.txt`. It was supplied in the brief and is a real link, not an invented one.
- Education shows CGPA 9.67. The achievements note also says 9.63. Printing both would show two scores, so the page keeps the education figure only.
- Graveyard stones are the three fill-in slots from round 1, marked `[PLACEHOLDER]`, not invented projects.
- Spirit names label skill groups. The skill names themselves match `about-me.txt`.

## Blocker

1. `amplify.yml` runs `npm ci` with no `--include=dev`. Amplify Hosting sets `NODE_ENV=production`, which makes `npm ci` skip devDependencies. Vite, TypeScript, and the Amplify CLI are devDependencies, so a clean Amplify build can fail before `npm run build` or `npx ampx pipeline-deploy`.

## Rules

2. Keyboard focus uses a gold outline. Gold `#e8b84a` on cream `#fff8ee` is about 1.75:1, so focus on the light cards (Close, Source, Demo, spirit buttons) is hard to see.
3. A, D, Left, and Right walk the pup. Up and Down do not, even though the challenge asks for the arrow keys.
4. The graveyard intro says "what I learned". That first person is not a sentence from `about-me.txt`.

## Mobile

5. The fixed corner puppy and its speech bubble cover real text while scrolling at 390px. "Problem Solving" and part of the AgriAssist card sit underneath the bubble.
6. The sticky nav is two rows tall on a phone. Jumping to a section still leaves the heading under that bar. `scroll-margin-top: 6rem` is shorter than the wrapped nav.

## Visual

7. Sit is wrong. The legs rotate about 62 degrees and stick out sideways, so the pup looks like it is sprawling rather than sitting. Sleep (closed eye, lower body, Zzz) and facing left both read clearly. The walk stride is real but small.
8. Kitbranch's tail reads as a stray "3" next to the face, which breaks the set of spirit drawings.

## Performance

No change required. Human-mode mobile Lighthouse is 100 performance and 100 accessibility. The largest built file is the guestbook chunk at 188 KB, and it is not downloaded unless a backend config exists. Dog mode is a separate chunk loaded on demand.
