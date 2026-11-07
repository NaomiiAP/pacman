<p align="center">
  <img src="docs/screenshots/hero.jpg" alt="The portfolio's landing page: Naomi Andrea Pereira, with the Ask the pup and Become the dog buttons beside a haunted village at night" width="900">
</p>

<h1 align="center">Spirit Pup Portfolio</h1>

<p align="center">
  <b>Naomi Andrea Pereira</b> · Full Stack Developer and AI/ML Engineer · Bengaluru
</p>

<p align="center">
  A Halloween portfolio with a spirit pup that answers questions about me,<br>
  fetches a résumé for your job post, and lets you walk my village.
</p>

<p align="center">
  <a href="https://master.d3kz5bg2dsjqj0.amplifyapp.com"><b>Visit the live site</b></a>
</p>

<p align="center">
  <img alt="AWS Amplify" src="https://img.shields.io/badge/AWS_Amplify-Hosting_%2B_Gen_2-FF9900">
  <img alt="AWS AppSync" src="https://img.shields.io/badge/AWS_AppSync-GraphQL-FF4F8B">
  <img alt="Amazon DynamoDB" src="https://img.shields.io/badge/Amazon_DynamoDB-on--demand-4053D6">
  <img alt="Amazon Cognito" src="https://img.shields.io/badge/Amazon_Cognito-guest_access-DD344C">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white">
</p>

---

Built for the **AWS Student Builder Challenge**. Underneath, it's a normal, readable portfolio: About me, Education, Experience, Skills, Projects, Achievements, a project graveyard, Contact and a guestbook, all as real HTML that works without JavaScript. On top of it, a spirit pup knows three tricks. None of them get in the way of the page.

## The pup's three tricks

<table>
  <tr>
    <td width="33%" valign="top">
      <img src="docs/screenshots/ask-the-pup.jpg" alt="The chat panel answering which hackathons Naomi has won, with a Found in: Achievements source chip">
      <h3>Ask the pup</h3>
      <p>A small retrieval agent that runs in your browser. It ranks passages from the portfolio with BM25 (written from scratch), cites where each answer came from, admits when it doesn't know, and can act on the page: filter projects, switch to dark mode, or start dog mode.</p>
    </td>
    <td width="33%" valign="top">
      <img src="docs/screenshots/fetch.jpg" alt="A one-page résumé fetched for cloud and AWS roles, with matching skills, projects and experience">
      <h3>Fetch!</h3>
      <p>Pick a role or paste a job post and throw the ball. The pup runs back with a one-page résumé built only from what's already in the portfolio: matching skills, the three best projects, relevant internships and hackathon wins. Ready to print as a PDF.</p>
    </td>
    <td width="33%" valign="top">
      <img src="docs/screenshots/dog-village.jpg" alt="Dog mode: the pup walking past the cottage, school, quest board and spell workshop">
      <h3>Become the dog</h3>
      <p>The page turns into a side-scrolling village where every building is a section of the portfolio. Sniff out scent trails, dig up buried notes, try on costumes, and light three lanterns to reach the ending. <b>Back to human</b> is always one click away.</p>
    </td>
  </tr>
</table>

## Dog mode

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/dog-open-building.jpg" alt="The night market open in dog mode, showing the Projects section in a dialog"></td>
    <td width="50%"><img src="docs/screenshots/dog-sniff-dig.jpg" alt="The pup standing on a dig spot next to the graveyard, with a Dig here button"></td>
  </tr>
  <tr>
    <td align="center"><sub>Each building opens the real section of the page.</sub></td>
    <td align="center"><sub>Sniff (S) for scent trails, then dig where the bone is.</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/screenshots/dog-buried-notes.jpg" alt="A dug-up note: Naomi's hackathon record, 10 results, 5 of them first place"></td>
    <td width="50%"><img src="docs/screenshots/dog-lanterns.jpg" alt="The ending dialog titled The lanterns are lit"></td>
  </tr>
  <tr>
    <td align="center"><sub>Three dig spots: school report, current internship, hackathon record.</sub></td>
    <td align="center"><sub>Light the cottage, workshop and market lanterns for the ending.</sub></td>
  </tr>
</table>

| Building | Opens |
| --- | --- |
| Cottage | About me |
| School | Education |
| Quest board | Experience |
| Spell workshop | Skills |
| Night market (one stall per project) | Projects |
| Trophy hall | Achievements |
| Mailbox | Contact |
| Graveyard (one tombstone per project) | Project graveyard |

The sky follows your local time: golden hour by day, dusk in the evening, and a full moon at night.

## The portfolio

<table>
  <tr>
    <td width="33%"><img src="docs/screenshots/about.jpg" alt="About me section"></td>
    <td width="33%"><img src="docs/screenshots/skills.jpg" alt="Skills section"></td>
    <td width="33%"><img src="docs/screenshots/projects.jpg" alt="Projects section with filters"></td>
  </tr>
  <tr>
    <td align="center"><sub>About me</sub></td>
    <td align="center"><sub>Skills</sub></td>
    <td align="center"><sub>Projects, with filters</sub></td>
  </tr>
  <tr>
    <td width="33%"><img src="docs/screenshots/achievements.jpg" alt="Achievements section"></td>
    <td width="33%"><img src="docs/screenshots/graveyard.jpg" alt="Project graveyard with two tombstones"></td>
    <td width="33%"><img src="docs/screenshots/guestbook.jpg" alt="Guestbook cork board with pinned notes"></td>
  </tr>
  <tr>
    <td align="center"><sub>Achievements</sub></td>
    <td align="center"><sub>Project graveyard: projects I set down, and what they taught me</sub></td>
    <td align="center"><sub>Guestbook: pin a note for the next visitor</sub></td>
  </tr>
</table>

<p align="center">
  <img src="docs/screenshots/dark-mode.jpg" alt="The landing page in dark mode" width="760"><br>
  <sub>"Lights out" dark mode: tap the moon.</sub>
</p>

<p align="center">
  <img src="docs/screenshots/phone-hero.jpg" alt="The landing page on a phone" width="230">&nbsp;&nbsp;
  <img src="docs/screenshots/phone-menu.jpg" alt="The menu on a phone" width="230">&nbsp;&nbsp;
  <img src="docs/screenshots/phone-projects.jpg" alt="Projects on a phone" width="230"><br>
  <sub>On a phone: the landing page, the menu, and the projects.</sub>
</p>

## How it runs on AWS

<p align="center">
  <img src="docs/architecture.png" alt="Architecture: code deployed from a laptop with the AWS CLI to Amplify Hosting; the browser runs the pup agent and dog mode; the guestbook uses Cognito, AppSync and DynamoDB" width="820">
</p>

Everything clever runs in the visitor's browser, so a judge asking the pup fifty questions costs nothing. AWS serves the site and runs the one feature that needs a backend: the guestbook, where **anonymous visitors write to a real database without logging in and without any AWS key in the page.**

| Service | Its job here |
| --- | --- |
| **AWS Amplify Hosting** | Serves the static site over HTTPS from a global CDN. Releases are uploaded from the terminal. |
| **Amplify Gen 2** | The backend is written in TypeScript in [`amplify/`](amplify/): one `PawPrint` model with validation and permissions. |
| **AWS CloudFormation** | `npx ampx pipeline-deploy` turns that TypeScript into a root stack with nested stacks for auth, data and the model. |
| **Amazon Cognito** | An identity pool with guest access gives each visitor temporary AWS credentials. No sign-up, no long-lived keys. |
| **AWS IAM** | The guest role may only call `appsync:GraphQL` on this one API's `PawPrint` fields. |
| **AWS AppSync** | The GraphQL API. Its resolvers check the 140-character limit and let guests create and read notes, never edit or delete them. |
| **Amazon DynamoDB** | Stores each note and the costume the pup was wearing, with on-demand capacity. |

The whole data model:

```ts
const schema = a.schema({
  PawPrint: a
    .model({
      message: a.string().required()
        .validate((v) => v.minLength(1, 'Write a short note').maxLength(140, 'Keep it to 140 characters')),
      costume: a.enum(['plain', 'pumpkin', 'ghost', 'witch']),
    })
    .authorization((allow) => [allow.guest().to(['create', 'read'])]),
});
```

To check the guest permissions against the deployed backend, run [`scripts/guest-check.sh`](scripts/guest-check.sh). It gets real guest credentials the way a visitor's browser does, then tries to read, update and delete notes. Reading works; updating and deleting come back `Not Authorized`. The update and delete target a note that doesn't exist, so it never changes the board.

```bash
bash scripts/guest-check.sh
```

The deployed resources in the AWS console (account ID pixelated):

<table>
  <tr>
    <td width="50%"><img src="docs/screenshots/aws-amplify.jpg" alt="Amplify console: the portfolio app with the master branch deployed"></td>
    <td width="50%"><img src="docs/screenshots/aws-cloudformation.jpg" alt="CloudFormation: the PawPrint nested stack at CREATE_COMPLETE"></td>
  </tr>
  <tr>
    <td align="center"><sub>Amplify Hosting: <code>master</code> deployed as the production branch</sub></td>
    <td align="center"><sub>CloudFormation: the <code>PawPrint</code> nested stack</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="docs/screenshots/aws-cognito.jpg" alt="Cognito identity pool with guest access Active"></td>
    <td width="50%"><img src="docs/screenshots/aws-dynamodb.jpg" alt="DynamoDB: items in the PawPrint table"></td>
  </tr>
  <tr>
    <td align="center"><sub>Cognito: guest access Active, mapped to the guest role</sub></td>
    <td align="center"><sub>DynamoDB: notes left through the live guestbook</sub></td>
  </tr>
</table>

## Built with

- **Vite + TypeScript.** The page is rendered to static HTML at build time with React, and React is not shipped to the browser. Small TypeScript modules add the interactions, and the chat, Fetch and dog mode only load when someone uses them.
- **Original SVG art.** Every illustration is drawn in code in [`src/art/`](src/art/) and shared by both modes.
- **GSAP** for the animations in dog mode, and the **Web Audio API** for sound.
- **AWS Amplify Gen 2** for the guestbook backend, and **Playwright** for screenshots and interaction checks.

```text
src/
  content/   portfolio.ts holds every word on the site; derive.ts works out counts and tags
  human/     the page (rendered at build time) and its interactions, including Fetch!
  agent/     the pup's chat: passages, BM25 search, routing and tools, the panel
  dog/       dog mode: the village, walking, sniffing, digging, lanterns
  art/       every illustration, as SVG
  styles/    CSS for the page, the chat and dog mode
  guestbook.ts
amplify/     Amplify Gen 2 backend: auth (Cognito) and data (AppSync + DynamoDB)
scripts/     screenshot.mjs (interaction check), guest-check.sh (guest permissions)
docs/        architecture diagram and README screenshots
```

## Run it locally

You need Node.js 18.16 or newer.

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # static site in dist/
npm run preview
npm run screenshots  # after a build: checks the main interactions and saves screenshots
```

The guestbook appears locally once `amplify_outputs.json` exists, either from a deploy or from `npx ampx sandbox` with AWS credentials configured. Without it, the guestbook section is left out and the rest of the site works.

<details>
<summary><b>Editing the content</b></summary>

<br>

Edit only [`src/content/portfolio.ts`](src/content/portfolio.ts). A Vite plugin copies that data into `index.html` when you run the dev server or `npm run build`, so the finished site contains real HTML, not text drawn by JavaScript at runtime.

| What you want to change | Where |
| --- | --- |
| GitHub, LinkedIn, email, resume | `contact` at the top of the file |
| Profile photo | Put the image in `public/`, for example `public/portrait.webp`, then set `contact.photo` to `"/portrait.webp"` |
| A project's Source or Demo button | `projects[].source` and `projects[].demo` |
| Graveyard stones | the `graveyard` array |
| Link to this site's code (footer and the pup) | `contact.repo` |

- Leave a contact string as `""` and that link or photo is not rendered.
- Leave a project `source` or `demo` as `""` and that button is not rendered.
- Each graveyard object needs `name`, `years`, `whatHappened`, `learned` and `repo` (`""` hides its Source button). A stone that still contains `[PLACEHOLDER]` is not shown. The graveyard section, its nav link and the graveyard in dog mode appear once at least one stone is filled in.
- Email is the address only, such as `name@school.edu`. The page adds `mailto:`.
- Resume can be a full URL or a file in `public/`, such as `"/resume.pdf"`.

`npm run build` prints a warning for every `[PLACEHOLDER]` and every empty contact field. The site still builds.

</details>

<details>
<summary><b>Deploying to Amplify Hosting</b></summary>

<br>

The live site is an Amplify Hosting app that is not connected to Git. Each release is deployed from the terminal, backend first:

1. **Backend.** `npx ampx pipeline-deploy --branch master --app-id <app-id>` deploys the backend in `amplify/` through CloudFormation and writes `amplify_outputs.json`.
2. **Site.** `npm run build` bakes `amplify_outputs.json` into the page. Build before the backend exists and the guestbook is simply left out.
3. **Upload.** Zip the contents of `dist/` and publish it to the `master` branch, for example with `aws amplify create-deployment` and `aws amplify start-deployment`.

[`amplify.yml`](amplify.yml) runs the same steps if the app is ever connected to a Git repository. It installs with `npm ci --include=dev`, because Amplify's build image sets `NODE_ENV=production`, which would otherwise skip Vite and the Amplify CLI.

</details>

<details>
<summary><b>All the controls</b></summary>

<br>

**On the page**

- **Ask the pup** in the hero, or the pup in the corner, opens the chat. Try "What does Naomi build?", "Show me the blockchain projects", "Turn the lights off" or "Let me be the dog".
- **Fetch!** (the section before Contact): pick a role or paste a job post, then press **Throw the ball**.
- Poke the pumpkins and the ghost in the hero. Seven pokes start a candy rain.
- Tap the moon, or the moon button in the header, for "lights out". The choice is remembered.
- Filter projects by AI & ML, Cloud & AWS, Blockchain or Web apps.
- Leave a note on the guestbook at the end of the page.

**In dog mode**

- Scroll, A and D, or the arrow keys to walk. On a phone, swipe sideways or hold the ◀ ▶ buttons next to the map.
- Walk up to a building and press the bubble over the pup, or E, to open it. The mini-map jumps to any building.
- S, or the Sniff button, shows scent trails. Stand on one of the three dig spots and press E to dig up its note.
- Costumes: pumpkin, bedsheet ghost, witch hat.
- Stop walking and the pup sits, then curls up and falls asleep.
- Asking the pup to "take me to the projects" walks it to the market.
- Sound is off until you turn it on. **Back to human** leaves dog mode.

If the browser asks for less motion, the opening does not play, the layers move together, the hero critters and pop-in effects stay still, and the paw cursor stays off. Every feature still works.

</details>

## Credits

- **Art:** every illustration (the pup and its costumes, the village, the skill spirits, the icons, the favicon and the paw cursor) is an original SVG drawing in `src/art/`. No image files from elsewhere are used.
- **Sound:** generated in the browser with the Web Audio API. No audio files.
- **Fonts:** [Fredoka](https://fonts.google.com/specimen/Fredoka) and [Nunito](https://fonts.google.com/specimen/Nunito), self-hosted with Fontsource, both under the SIL Open Font License 1.1.
- **Libraries:** React and React DOM (MIT) render the page to HTML at build time only; GSAP plays the animations in dog mode; the Amplify libraries power the guestbook.
