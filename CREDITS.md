# Credits

The illustrations, icons, paper grain, paw cursor, and spirit creatures were drawn for this site as original SVG. They are not characters from any film or game.

The sound is generated in the browser with the Web Audio API: a short music-box pattern, a noise burst for footsteps, and a low “boof”. No external audio files are used.

## Fonts

Both fonts are self-hosted with Fontsource and licensed under the SIL Open Font License, Version 1.1. The license text is in `node_modules/@fontsource/fredoka/LICENSE` and `node_modules/@fontsource/nunito/LICENSE`, and at https://scripts.sil.org/OFL.

| Font | Use | Source | License |
| --- | --- | --- | --- |
| Fredoka | Headings and buttons | https://fonts.google.com/specimen/Fredoka | SIL OFL 1.1 |
| Nunito | Body text | https://fonts.google.com/specimen/Nunito | SIL OFL 1.1 |

Fredoka: Copyright 2016 The Fredoka Project Authors (https://github.com/hafontia/Fredoka-One).

Nunito: Copyright 2014 The Nunito Project Authors (https://github.com/googlefonts/nunito).

Only the Latin files are imported.

## Animation

GSAP, including ScrollTrigger, is used for the village scroll, the opening scene, and the leaf gust.

- Source: https://gsap.com/
- License: Standard “no charge” license, https://gsap.com/community/standard-license/
- Commercial use on a website is allowed. This project is not a visual animation builder, which is the use that license restricts.

## AWS libraries

`aws-amplify`, `@aws-amplify/backend`, and `@aws-amplify/backend-cli` are the Amplify Gen 2 libraries used for the guestbook. They are loaded only if a deployed backend config is present at build time.
