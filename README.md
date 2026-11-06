# Naomi Andrea Pereira — Spirit Pup Portfolio

A spooky-cute (kawaii Halloween) portfolio with two modes. Human mode is a single page: About me, Education, Experience, Skills, Projects, Achievements, and Contact, plus a project graveyard once its stones are filled in. The spirit pup is the creative feature, in two forms. **Ask the pup** is a tiny agent that answers questions from the portfolio (BM25 retrieval written from scratch, running in the browser) and can act on the page. **Become the dog** lets the visitor walk the pup through a pastel village that follows their local time of day; each building opens the same HTML as the page.

The pup, the skill spirits, the village and every other picture are original SVG drawings in `src/art/`. The pup is not a pet named in the bio, and none of the characters come from a film.

## How it is built

- `src/content/portfolio.ts` holds all personal text. `src/content/derive.ts` works out the numbers and project categories from it, so the page never states something the content does not.
- `src/human/HumanPage.tsx` is rendered to static HTML at build time by React. React is not sent to the browser.
- `src/main.ts` and the files next to it in `src/human/` add the interactions on top of that HTML: the menu, the "lights out" theme, the hero critters, project filters, and small effects. All of them switch off when the browser asks for less motion.
- `src/agent/` is the pup's chat: `knowledge.ts` turns the content into passages, `search.ts` ranks them with BM25, `brain.ts` picks a tool or an answer, and `chat.ts` is the panel. It loads only when someone opens the chat.
- `src/dog/` is dog mode. It loads only after **Become the dog**.
- `src/art/` draws every illustration as an SVG string, shared by both modes.

## Run it locally

You need Node.js 18.16 or newer.

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually http://localhost:5173.

```bash
npm run build
npm run preview
```

`npm run build` prints a warning for every `[PLACEHOLDER]` still in the content file and for every contact field that is still empty. The site still builds. Empty fields are left out of the page.

Screenshots of both modes, plus a check that the main interactions still work:

```bash
npm run build
npm run screenshots
```

Images land in `screenshots/`. The script uses Playwright's Chromium if you installed it with `npx playwright install chromium`, and your installed Chrome otherwise.

## Adding my details later

Edit only [src/content/portfolio.ts](src/content/portfolio.ts). The comments at the top of that file mark the blocks. A Vite plugin copies that data into `index.html` when you run the dev server or `npm run build`, so the finished site contains real HTML, not text drawn by JavaScript at runtime.

| What you want to change | Where |
| --- | --- |
| GitHub, LinkedIn, email, resume | `contact` at the top of the file |
| Profile photo | Put the image in `public/`, for example `public/portrait.webp`, then set `contact.photo` to `"/portrait.webp"` |
| A project’s Source or Demo button | `projects[].source` and `projects[].demo` |
| Graveyard stones | the `graveyard` array |
| Link to this site's code (footer and the pup) | `contact.repo` |

Rules that are already built:

- Leave a contact string as `""` and that link or photo is not rendered. There is no placeholder sentence on the page.
- Leave a project `source` or `demo` as `""` and that button is not rendered.
- Each graveyard object needs `name`, `years`, `whatHappened`, and `learned`. Replace every `[PLACEHOLDER]`. Add another object to the array to add a stone. You do not need to change a component or a stylesheet.
- A stone that still contains `[PLACEHOLDER]` is not shown. Once at least one stone is filled in, the Project graveyard section, its nav link, and the graveyard in dog mode appear by themselves.
- Email is the address only, such as `name@school.edu`. The page adds `mailto:`.
- Resume can be a full URL or a file in `public/`, such as `"/resume.pdf"`.

Then run `npm run build`. If a warning remains, that slot is still empty or still says `[PLACEHOLDER]`.

The education score is `education.score`. The source notes list 9.67 in Education and 9.63 under Achievements. The page shows 9.67.

## Deploy on Amplify Hosting

The repo includes [amplify.yml](amplify.yml) and an Amplify Gen 2 backend in `amplify/`.

1. Commit the project and push it to GitHub. This folder is a git repo only after `git init`; nothing has been pushed.
2. In the Amplify console, create a new app and connect that repository. Amplify should detect the Gen 2 backend because `amplify/` and `amplify.yml` are present.
3. The build spec installs dependencies with `npm ci --include=dev` (Amplify sets `NODE_ENV=production`, which would otherwise skip Vite and the Amplify CLI), deploys the backend with `npx ampx pipeline-deploy`, then runs `npm run build`. The site is a static Vite build. Artifacts are in `dist`.
4. After the first backend deploy, the guestbook appears. Until `amplify_outputs.json` exists at build time, the guestbook is not shown and the rest of the site works.

The guestbook stores a paw and a note of at most 140 characters in DynamoDB through Amplify Data (AppSync). Visitors use the Cognito identity pool’s unauthenticated role. There is no login form. They can create and read paws, not edit or delete them. The browser also waits 30 seconds between paws.

Local sandbox, once AWS credentials are configured:

```bash
npx ampx sandbox
```

That writes `amplify_outputs.json`, which is gitignored. Restart `npm run dev` and the Guestbook section shows up after Contact.

API keys are not used for the guestbook. Amplify’s current public-data guide recommends guest access through the identity pool because API keys expire.

## Controls

Human mode:

- **Fetch!** (the section before Contact): pick a role or paste a job post and press **Throw the ball**. The pup brings back a one-page résumé built only from `portfolio.ts`, with a print button. The logic is in `src/agent/match.ts` and the animation and card in `src/human/fetchball.ts`; both load on first use.
- **Ask the pup** in the hero, or the pup in the corner, opens the chat. Try "What does Naomi build?", "Show me the blockchain projects", "Turn the lights off" or "Let me be the dog". The pup answers only from the page and says so when it cannot find something.
- The nav, the **Become the dog** buttons, or the pup in the hero start dog mode.
- Poke the pumpkins and the ghost in the hero. Seven pokes start a candy rain.
- Tap the moon, or the moon button in the header, for "lights out" (a dark theme). The choice is remembered.
- Filter projects by AI & ML, Blockchain, or Web apps.

Dog mode:

- Scroll, or A and D, or the arrow keys, to walk. The pup can reach the far end of the village on any screen size.
- On a phone: swipe sideways, swipe up and down, or hold the ◀ ▶ buttons next to the map. A hint says so the first time.
- The mini-map shows where the pup is and jumps to a building. **Back to human** leaves dog mode.
- Walk up to a building and press the bubble over the pup, or E, to open that section.
- The cottage is About me, the school is Education, the quest board is Experience, the workshop is Skills, the market is Projects, the trophy hall is Achievements, and the mailbox is Contact.
- The Ask button in the top bar opens the chat; asking the pup to "take me to the projects" walks it to the market.
- Opening the cottage, the workshop, and the market lights the three memory lanterns and plays the ending.
- S, or the Sniff button, shows scent trails. Dig spots open a line that is already on the page.
- Costumes: pumpkin, bedsheet ghost, witch hat.
- Sound is off until you turn it on.

If the browser asks for less motion, the opening does not play, the layers move together, the hero critters and pop-in effects stay still, and the paw cursor stays off.
