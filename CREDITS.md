# Credits

Every illustration on the site was drawn for it as original SVG in `src/art/`: the spirit pup and its costumes, the eight skill spirits, the hero scene, the project pictures, the village in dog mode, the stickers, the icons, the favicon, and the paw cursor. None of them are characters from a film or a game.

The sound is generated in the browser with the Web Audio API: a short music-box pattern, a noise burst for footsteps, and a low “boof”. No external audio files are used.

## No longer used

An earlier version used Luis Zuno’s GothicVania Town and Cemetery packs (CC0) for the village and the cream dog from “Dog Spritesheets” by Jason of GDN (CC0) for the pup. The current site does not load them. The files are kept, not deployed, in `unused-assets/`, and `ASSET_CREDITS.txt` still lists where they came from.

The React Bits components (Pixel Card, Shiny Text, Star Border) from the previous version were removed.

## Fonts

Both fonts are self-hosted with Fontsource and licensed under the SIL Open Font License, Version 1.1. The license text is in `node_modules/@fontsource/fredoka/LICENSE` and `node_modules/@fontsource/nunito/LICENSE`, and at https://scripts.sil.org/OFL.

| Font | Use | Source | License |
| --- | --- | --- | --- |
| Fredoka (600, 700) | Headings, buttons and labels | https://fonts.google.com/specimen/Fredoka | SIL OFL 1.1 |
| Nunito (400, 700) | Body text | https://fonts.google.com/specimen/Nunito | SIL OFL 1.1 |

Fredoka: Copyright 2016 The Fredoka Project Authors (https://github.com/hafontia/Fredoka-One).

Nunito: Copyright 2014 The Nunito Project Authors (https://github.com/googlefonts/nunito).

Only the Latin files are imported.

## Libraries

- **React** and **React DOM** (MIT) render the page to static HTML at build time. No React code is sent to the browser.
- **GSAP** plays the leaf gust and the opening scene in dog mode. Standard “no charge” license, https://gsap.com/community/standard-license/. Commercial use on a website is allowed. This project is not a visual animation builder, which is the use that license restricts.
- `aws-amplify`, `@aws-amplify/backend`, and `@aws-amplify/backend-cli` are the Amplify Gen 2 libraries used for the guestbook. They are loaded only if a deployed backend config is present at build time.
