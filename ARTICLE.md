# My Portfolio Has a Dog, and the Dog Knows My Résumé

**In one sentence:** the creative feature is a spirit pup you can *ask* about my work, send to *fetch* a résumé for your job post, or *become* and walk through my portfolio as a village. The AWS piece is the guestbook, where anonymous visitors write to DynamoDB through Cognito guest credentials and AppSync, on AWS Amplify.

**Live site:** https://master.d3kz5bg2dsjqj0.amplifyapp.com  
**Source code:** https://github.com/paccmann218/portfolio

![The landing page: my name, the Ask the pup and Become the dog buttons, and a haunted village at night](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/hero.jpg)

*The landing page. Both ways into the creative feature are visible immediately: **Ask the pup** and **Become the dog**, with a one-line hint underneath.*

---

## Where the idea came from

Hi, I'm Naomi Andrea Pereira. I'm studying Information Science and Engineering at Ramaiah Institute of Technology in Bengaluru. Most of what I enjoy building involves retrieval pipelines, agents and multimodal AI.

I didn't want a portfolio people scroll through, glance at a few project cards and close. I wanted the portfolio itself to be the project. What if you could ask it about my work? Paste a job description and get a résumé back? Explore the whole thing as a little game?

The challenge opened four days before Halloween, which gave me an excuse to take the idea somewhere different: a haunted village at night, with a spirit pup as the guide.

## The creative feature: one pup, three tricks

The pup sits in the corner of every page and says "Ask me about Naomi!" shortly after the page loads, and again when you hover over it. Everything it does uses only what is already in my portfolio. It never invents anything.

### 1. Ask the pup

Ask in plain words: *What does Naomi build? Which projects use React? What hackathons has she won?*

Behind the face is a retrieval agent that runs entirely in the browser, with no LLM API. When the chat opens, my portfolio content is split into small passages (one per project, internship, award and skill group), and each question is ranked against them with **BM25**, with light stemming and synonyms ("won" also finds awards). Every answer shows a **Found in** chip that jumps to its source. If nothing matches well enough, the pup says so: *"My nose couldn't find that on Naomi's page, and I don't make things up."* Some questions are actions: "Show me the blockchain projects" filters the project grid, "Turn the lights off" switches to dark mode, and "Let me be the dog" starts the village.

![The chat answering "What hackathons has Naomi won?" with five first-place finishes and a Found in: Achievements chip](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/ask-the-pup.jpg)

*Asking about my hackathon wins. The answer cites the Achievements section it came from.*

### 2. Fetch!

This one is for recruiters. Pick a role (AI/ML, full-stack, cloud or blockchain) or paste a real job description, then press **Throw the ball**. The pup chases it across a little yard and brings back a bone: a one-page résumé for that role, with matching skills, my three best-matching projects, internships ordered by relevance, and hackathon wins. It only selects and reorders what's on the page. It knows "k8s" means Kubernetes, doesn't mistake "Series C startup" for the C language, and prints as a PDF.

![A résumé fetched for cloud and AWS roles: matching skills, best-matching projects, education, hackathon wins and experience](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/fetch.jpg)

*Fetched for a Cloud & AWS role. RepoWatch, my Lambda and Bedrock agent, comes first.*

### 3. Become the dog

This is the part I spent the most time on. **Become the dog** turns the page into a side-scrolling village, and you are the pup. Every building is a section of my portfolio:

| Building | Opens |
|---|---|
| The cottage | About me |
| The school | Education |
| The quest board | Experience |
| The spell workshop | Skills |
| The night market (one stall per project) | Projects |
| The trophy hall | Achievements |
| The mailbox | Contact |
| The graveyard | Projects I set down |

The sky follows your local time, so you might arrive at golden hour or under a full moon. Press **S** to sniff and see glowing scent trails, dig up three buried notes (my school report, my current internship and my hackathon record), and try on a pumpkin, ghost or witch-hat costume. Stand still and the pup sits, then falls asleep. Opening the cottage, the workshop and the market lights three memory lanterns, and a short ending plays.

![Dog mode: the pup walking past the cottage, the school, the quest board and the spell workshop, with the mini-map at the bottom](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/dog-village.jpg)

*Dog mode. Each building opens the real section of the page in a dialog, and the lanterns at the top track your progress.*

![The pup standing on a dig spot beside the graveyard, where the tombstones are labelled Assignment Decoder and DawnVerse, with a Dig here button](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/dog-sniff-dig.jpg)

*At the edge of the village: a dig spot beside the graveyard, where each tombstone is a project I set down.*

### Built to stay out of the way

The rules ask for a creative feature that never blocks navigation, so I treated that as a design constraint, not an afterthought. The normal portfolio (About me, Education, Experience, Skills, Projects, Achievements, Contact) is real HTML with a normal navigation bar, readable even without JavaScript. The hero shows both entry points with a hint. **Back to human** stays on screen in dog mode. On a phone, the village gets walk buttons and sideways swipes, and if the browser asks for less motion, the animations stop but every feature still works.

![The portfolio on a phone: the landing page, the open menu, and the projects with filters](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/phones.jpg)

*On a phone: the landing page, the menu, and the projects.*

### The graveyard and the guestbook

The **project graveyard** holds projects I set down, each with one line on what happened and one on what I learned. Two of them are earlier AWS weekend builds: *Assignment Decoder*, which used Amazon Bedrock to turn assignment PDFs into a plan, and *DawnVerse*, a Lambda function that wrote a poem every morning at 6 AM. Both shipped and are offline now. I kept them because they shaped decisions in this project.

The **guestbook** is a cork board at the end of the page where visitors pin a short note, stamped with the colour of the costume their pup was wearing. It's the one feature that needs a backend, which is where AWS comes in.

---

## How it runs on AWS

![Architecture: code deployed from my laptop with the AWS CLI to Amplify Hosting; the browser runs the pup agent and the village; the guestbook uses Cognito, AppSync and DynamoDB](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/architecture.png)

*The agent, Fetch and the village run in the visitor's browser. AWS hosts the site and runs the guestbook.*

The interesting backend problem was the guestbook: anonymous visitors had to write to a real database without creating an account, and without permanent AWS credentials sitting in my frontend.

| Service | What I used it for |
|---|---|
| AWS Amplify Hosting | Hosting the website over HTTPS |
| Amplify Gen 2 | Defining the backend in TypeScript |
| AWS CloudFormation | Provisioning the backend resources |
| Amazon Cognito | Temporary credentials for guests |
| AWS IAM | Restricting what those credentials can reach |
| AWS AppSync | The GraphQL API, with the per-operation rules |
| Amazon DynamoDB | Storing the guestbook notes |

### AWS Amplify Hosting

The site is static. Its HTML is generated at build time, so the portfolio is readable even without JavaScript, and the interactive features load only when used: the village code isn't downloaded until someone clicks **Become the dog**. Amplify Hosting serves it from my `master` branch over HTTPS through its global CDN.

![The Amplify console: the app "portfolio", master branch deployed as the production branch, with its amplifyapp.com domain](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/aws-amplify.jpg)

*The Amplify app `portfolio`. The `master` branch is the production branch, deployed and serving the live URL. ("Get to production" is Amplify's optional checklist for extras such as a custom domain, which is on my list below. It isn't a deployment status.)*

I chose not to connect the app to a Git provider. I build locally and upload each release with the AWS CLI, which keeps the build and the deployment in the terminal. A typical upload takes about eight seconds to pass Amplify's deploy and verify steps.

### Amplify Gen 2: the backend in TypeScript

The backend lives in an `amplify/` directory next to the frontend code. This is the whole guestbook model:

```ts
const schema = a.schema({
  PawPrint: a
    .model({
      message: a.string().required()
        .validate((v) =>
          v.minLength(1, 'Write a short note')
           .maxLength(140, 'Keep it to 140 characters')
        ),
      costume: a.enum(['plain', 'pumpkin', 'ghost', 'witch']),
    })
    .authorization((allow) => [
      allow.guest().to(['create', 'read'])
    ]),
});
```

- **Validation lives in the schema.** Amplify turns the 140-character rule into a validation step inside the AppSync resolver, so the API checks it before anything is written, not just the form.
- **The costume is an enum.** Only four values are accepted.
- **Guests can create and read, nothing else.** No editing or deleting other people's notes.

The frontend submits with Amplify's typed client: `client.models.PawPrint.create({ message, costume }, { authMode: 'identityPool' })`.

### AWS CloudFormation: what that TypeScript became

`npx ampx pipeline-deploy` turns those definitions into CloudFormation: a root stack for the branch, with nested stacks for authentication, data, the `PawPrint` model and the table resources, plus a one-time `CDKToolkit` stack in the account.

![CloudFormation: the PawPrint nested stack with status CREATE_COMPLETE](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/aws-cloudformation.jpg)

*The nested stack Amplify created for the `PawPrint` model, at `CREATE_COMPLETE`. (Account ID pixelated.)*

On DawnVerse I had written a SAM template by hand. This time I never wrote a template, and never clicked "create table" or "create API" in the console. Every resource exists because a line of TypeScript asked for it, so I can tear the backend down and rebuild it from the same definitions.

### Amazon Cognito: guests without logins

A browser needs AWS credentials to talk to the backend, and putting permanent credentials in frontend JavaScript wasn't an option. So I used a **Cognito identity pool with guest access**: when the page loads the guestbook, it requests an identity from the pool and gets *temporary* credentials tied to a guest IAM role. No sign-up, no password, nothing long-lived.

![Cognito: the identity pool's User access tab, with guest access Active and mapped to the guest role](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/aws-cognito.jpg)

*Guest access is **Active** and mapped to the guest role. (Account ID in the ARN pixelated.)*

Amplify also created a Cognito user pool, listed as an identity provider. The site has no sign-in, so it isn't used; it's part of the generated auth resources.

### IAM and AppSync: who may do what

The guest IAM role may only call `appsync:GraphQL`, and only on my API's `PawPrint` operations. Interestingly, that policy lists *every* `PawPrint` operation, including update and delete. So IAM alone isn't what stops a guest from editing a note. That rule lives one layer deeper: AppSync verifies the IAM-signed request, then runs the authorization rules from my Amplify schema in its resolvers, before anything reaches the database.

I didn't want to assume that worked, so I wrote a small script, `scripts/guest-check.sh`. It gets real guest credentials from the identity pool, exactly as a visitor's browser does, signs GraphQL requests with them, and tries to read, update and delete. The update and delete target a note that doesn't exist, so the board never changes. Its output, trimmed for length:

```text
1) Read the paws (allowed):
{"data":{"listPawPrints":{"items":[{"message":"Hello there!","costume":"plain"},{"message":"nice work (:","costume":"plain"}]}}}

2) Update a paw (should be refused):
{"data":{"updatePawPrint":null},"errors":[{"errorType":"Unauthorized",
  "message":"Not Authorized to access updatePawPrint on type Mutation"}]}

3) Delete a paw (should be refused):
{"data":{"deletePawPrint":null},"errors":[{"errorType":"Unauthorized",
  "message":"Not Authorized to access deletePawPrint on type Mutation"}]}
```

IAM decides *which API* a guest can call. AppSync decides *which operations* on it are allowed. Understanding that split was the most useful AWS lesson of this build.

### Amazon DynamoDB: where the notes live

Amplify creates a DynamoDB table for the `PawPrint` model. Each item stores an ID, the message, the costume and timestamps. The table uses on-demand capacity, Amplify's default, which suits a guestbook: traffic arrives in bursts when someone shares the link, then nothing for a day, and I don't reserve throughput for traffic that may never come.

![DynamoDB: the PawPrint table's items, showing notes left through the live guestbook](https://raw.githubusercontent.com/paccmann218/portfolio/master/docs/screenshots/aws-dynamodb.jpg)

*Notes left through the live guestbook, stored in the `PawPrint` table.*

### Deploying a new version

Three steps, always in this order:

```bash
# 1. Backend: Cognito, AppSync, DynamoDB. Also writes amplify_outputs.json
npx ampx pipeline-deploy --branch master --app-id <app-id>

# 2. Frontend: the build bakes amplify_outputs.json into the page
npm run build

# 3. Upload dist/ to Amplify Hosting
aws amplify create-deployment --app-id <app-id> --branch-name master
#    (returns an upload URL and a job ID; zip dist/ and upload it to that URL)
aws amplify start-deployment --app-id <app-id> --branch-name master --job-id <job-id>
```

The order matters: the frontend needs `amplify_outputs.json` to know where its API and auth resources are. If the backend isn't there, the guestbook section removes itself and the rest of the site works normally.

### Running costs

The agent, Fetch and the village all run in the browser, so a judge asking the pup fifty questions sends zero requests to a model API. The guestbook is the only feature that calls the backend. Posting is limited in the browser to one note every 30 seconds, and DynamoDB bills per request.

---

## Things that didn't work the first time

**The dig spots looked wrong.** My first version was a row of about twelve brown domes with dark speckles, right on the path, and they looked like exactly what a real dog leaves behind. I redrew them as flat patches of turned soil with a bone and a sparkle, moved them onto the grass, and cut them down to three spots that each hold a proper note instead of a single fact. The lesson: check your art at the size and in the place people will actually see it.

**The purple colour scheme looked generic.** The first version was lavender and purple everywhere, like a generated landing page. I re-coloured the whole site (CSS, every SVG illustration, the favicon) into midnight brown-black, pumpkin orange, bone white and witch-hat green.

**The ending opened as an empty box.** If you were still reading the market when the third lantern lit, the ending dialog appeared with nothing in it. My code closed the dialog and immediately reopened it with the ending, but the browser delivers the `close` event *later*, and my close handler then moved the section back where it came from, pulling the ending straight out of the new dialog. I fixed it by swapping content in place when the dialog is already open, and by checking the dialog really is closed before the handler runs.

**A horizontal village on a vertical phone.** I mapped a tall invisible scroller to the pup's position in the world. That hid the buildings under the scroller, so it now forwards each tap to the element beneath it. Phones also got walk buttons and sideways swipes.

**The pup was too confident.** Early answers stitched unrelated passages together. Now it only combines passages from the same section that score close to the best match, and anything below the relevance threshold gets the honest "my nose couldn't find that". For a portfolio, admitting it doesn't know beats making something up.

## What I took away

- **Retrieval and routing do most of the work in a small agent.** The pup doesn't need an LLM to answer questions about a fixed portfolio. Good retrieval and choosing the right action mattered more.
- **AWS permissions need testing, not just configuring.** Cognito, IAM and AppSync each do one part of the job, and the guest-check script made that concrete.
- **Infrastructure-as-code makes sense once you see the result.** Watching a few TypeScript definitions become a tree of CloudFormation stacks showed me what Amplify does behind the scenes.
- **A creative feature has to respect the visitor.** Visible hints, Back to human, mobile controls and reduced motion are what make the fun optional.

## What's next

- Give the pup a voice with Amazon Bedrock behind an Amplify function, keeping the retrieval step so answers stay grounded in the portfolio.
- A custom domain through Amplify Hosting.
- More stones in the graveyard.

## Give it a try

Ask the pup *"What hackathons has Naomi won?"*, paste a job description into Fetch, then become the dog: sniff out a buried note, light all three lanterns, and leave a paw on the guestbook on your way out.

**Live portfolio:** https://master.d3kz5bg2dsjqj0.amplifyapp.com  
**Source code:** https://github.com/paccmann218/portfolio

---

*All illustrations on the site are original SVG drawings made for this project. I built it with a coding agent as my pair programmer. AWS services used: Amplify Hosting, Amplify Gen 2, Amazon Cognito, AWS IAM, AWS AppSync, Amazon DynamoDB and AWS CloudFormation.*
