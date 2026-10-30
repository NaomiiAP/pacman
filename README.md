# Naomi Andrea Pereira — Spirit Pup Portfolio

A kawaii Halloween portfolio with two modes. Human mode is a single page: About, Tech Superpowers, Projects and achievements, a project graveyard, and Contact. Dog mode is optional. The visitor walks a little spirit pup through an autumn village at dusk. Each building opens the same HTML as the page.

The pup is an original character. It is not a pet named in the bio, and it is not a character from a film.

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

Screenshots of both modes:

```bash
npx playwright install chromium
npm run build
npm run screenshots
```

Images land in `screenshots/`.

## Adding my details later

Edit only [src/content/portfolio.ts](src/content/portfolio.ts). The comments at the top of that file mark the blocks. A Vite plugin copies that data into `index.html` when you run the dev server or `npm run build`, so the finished site contains real HTML, not text drawn by JavaScript at runtime.

| What you want to change | Where |
| --- | --- |
| GitHub, LinkedIn, email, resume | `contact` at the top of the file |
| Profile photo | Put the image in `public/`, for example `public/portrait.webp`, then set `contact.photo` to `"/portrait.webp"` |
| A project’s Source or Demo button | `projects[].source` and `projects[].demo` |
| Graveyard stones | the `graveyard` array |

Rules that are already built:

- Leave a contact string as `""` and that link or photo is not rendered. There is no placeholder sentence on the page.
- Leave a project `source` or `demo` as `""` and that button is not rendered.
- Each graveyard object needs `name`, `years`, `whatHappened`, and `learned`. Replace every `[PLACEHOLDER]`. Add another object to the array to add a stone. You do not need to change a component or a stylesheet.
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

That writes `amplify_outputs.json`, which is gitignored. Restart `npm run dev` and the paw wall shows up in Contact.

API keys are not used for the guestbook. Amplify’s current public-data guide recommends guest access through the identity pool because API keys expire.

## Controls

Human mode: the nav, or the **Become the dog** button, or the puppy in the corner.

Dog mode:

- Scroll, or A and D, or the arrow keys, to walk.
- The mini-map jumps to a building. **Back to human** leaves dog mode.
- S, or the Sniff button, shows scent trails. Dig spots open a line that is already on the page.
- Boop a spirit in Tech Superpowers to keep it in the Spirit Journal.
- Costumes: pumpkin, bedsheet ghost, witch hat.
- Sound is off until you turn it on.

If the browser asks for less motion, the opening does not play, the layers move together, and the paw cursor stays off.
