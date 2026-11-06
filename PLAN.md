# Spirit Pup Portfolio

Naomi Andrea Pereira’s portfolio for the AWS Student Builder Challenge. Human mode is a single readable page. Dog mode is an opt-in side-scrolling autumn village. A paw-print guestbook uses Amplify Gen 2 when that backend is deployed.

## Decisions

- Vite + TypeScript, no 3D. React renders the page to HTML at build time only; the browser gets plain TypeScript. GSAP plays the opening and the leaf gust.
- All personal text lives in `src/content/portfolio.ts` and is injected into `index.html` at build time, so the built file contains real HTML.
- The pup is an original spirit. about-me.txt does not name a dog.
- Skills are eight original spirits, one per category, with every skill name still written out.
- Education shows CGPA 9.67. about-me.txt also says 9.63 under Achievements; that second figure is not printed. Change `education.score` if you want the other number.
- Empty contact fields and empty project links are omitted. No “TODO” text on the page.
- `npm run build` warns about every `[PLACEHOLDER]` and every empty contact field. Those warnings are meant to stay until the slots are filled.
- Sound is synthesized in the browser. Art is original SVG, drawn in `src/art/` and shared by both modes.
- Graveyard stones that still say `[PLACEHOLDER]` are not shown. The section appears once one stone is filled in.
- "Lights out" is an optional dark theme, switched from the header or by tapping the moon.
- The sky uses the visitor’s local time: golden hour from 06:00–16:59, dusk from 17:00–19:29, night after that with lit lanterns.
- `prefers-reduced-motion` skips parallax, the opening, leaf gusts, paw prints, and looping motion. The page and the village still work.

## Tiers

1. Human page, hint, parallax village, scroll-to-walk, section buildings, mini-map, back button, three memory lanterns.
2. Sniff, dig, leaf gusts, desktop paw cursor, and walk buttons plus swiping on phones.
3. Skippable opening, local-time sky, costumes, sound toggle, project graveyard with three fill-in stones.
4. Amplify Gen 2 guestbook, hidden until `amplify_outputs.json` exists.
