# A Lost Spirit Pup, a Haunted Village, and My Portfolio on AWS

*A Halloween-themed interactive portfolio with a spirit pup that answers questions, fetches résumés and lets visitors explore a village. Built using AWS Amplify, AppSync, DynamoDB and Cognito.*

**Live site:** https://master.d3kz5bg2dsjqj0.amplifyapp.com  
**Source code:** https://github.com/paccmann218/portfolio

---

## Where the idea came from

Hi, I'm Naomi Andrea Pereira. I'm studying Information Science and Engineering at Ramaiah Institute of Technology in Bengaluru. Most of the things I enjoy building involve AI systems, retrieval pipelines, agents and multimodal applications.

When I started thinking about what to build for this challenge, I didn't want to make another portfolio that people would scroll through, look at a few project cards and close.

I wanted the portfolio itself to be the project.

What if someone could ask questions about my work instead of searching through sections? What if they could paste a job description and get a résumé based on it? And what if they could explore the entire thing as a little game?

The challenge opened four days before Halloween, which gave me an excuse to take the idea in a slightly different direction.

I settled on a haunted village at night, with a little spirit pup as the guide. Visitors can talk to it, play fetch to generate a role-specific résumé, or take control of the pup and explore the village.

The idea eventually grew into three interactive features, a project graveyard and an AWS-backed guestbook.

> 🖼️ **Image: `screenshots/article/01-hero.jpg`**

*The landing page. The two main actions are visible immediately: Ask the pup and Become the dog.*

## Meet the spirit pup

The pup sits in the corner of every page and says "Ask me about Naomi!" shortly after the page loads, and again whenever you hover over it. It also appears on the landing page.

I ended up giving it three main features.

### 1. Ask the pup

Visitors can click the pup and ask questions in plain language:

- What does Naomi build?
- Which projects use React?
- Where does she work now?

Behind the animation is a retrieval agent that I implemented directly in the browser.

I didn't use an LLM API for this. When the chat opens, the portfolio content is split into smaller passages, with separate entries for projects, internships, awards and skills.

When someone asks a question, the system ranks the passages using **BM25**, with light stemming and synonym handling. For example, searching for "college" can also find education-related content, and searching for "won" can retrieve awards.

A few other things I added:

- **Source references:** Answers include a "Found in" chip that takes visitors to the relevant section.
- **No guessing:** If a question doesn't match the available content, the pup says so: *"My nose couldn't find that on Naomi's page, and I don't make things up."* Asking about my favourite food, for example, won't produce a made-up response.
- **Actions:** Some questions trigger actions on the website instead of returning text. Asking to see blockchain projects filters the project grid and scrolls to it. "Turn the lights off" switches to dark mode, and "Let me be the dog" opens dog mode.

Everything runs in the visitor's browser. There isn't a model API involved, so there are no API keys exposed in the frontend and no inference costs for these questions.

### 2. Fetch!

I wanted to make something useful for recruiters rather than add another chatbot feature.

The idea was to let someone select a role (AI/ML, full-stack, cloud or blockchain) or paste an actual job description. After pressing **Throw the ball**, the pup runs across a small yard and comes back carrying a bone.

That bone contains a one-page résumé generated for the selected role.

It picks out relevant skills, three matching projects, internships and hackathon achievements, then arranges them according to relevance. It doesn't generate new experience or invent qualifications; it works with the information already present in the portfolio.

I also added some basic terminology handling. For example, it recognises that "k8s" refers to Kubernetes and doesn't mistake "Series C startup" for the C programming language.

The resulting résumé can be printed as a PDF.

### 3. Become the dog

This is probably the feature I spent the most time on.

Clicking **Become the dog** turns the website into a side-scrolling village. Visitors control the pup and explore the different buildings.

Each building corresponds to a section of the portfolio.

| Building | Opens |
|---|---|
| The cottage | About me |
| The school | Education |
| The quest board | Experience |
| The spell workshop | Skills |
| The night market (one stall per project) | Projects |
| The trophy hall | Achievements |
| The mailbox | Contact |
| The graveyard | Unfinished projects |

The sky follows the visitor's local time, so depending on when you arrive, you might see golden hour or a full moon.

There are a few smaller interactions too. Pressing **S** lets the pup sniff around and reveals glowing scent trails. Visitors can dig up buried notes containing facts about me, including one spot with all my hackathon wins. There are also three costumes: pumpkin, ghost and witch hat.

If you leave the pup standing still for a while, it sits down and eventually falls asleep.

There's also a small ending. Visiting the cottage, workshop and market lights up three memory lanterns. Once all three are lit, the ending appears. A **Back to human** button stays visible throughout, so visitors can leave whenever they want.

> 🖼️ **Image: `screenshots/article/14-dog-market.jpg`**

*Dog mode at the night market. Each stall opens one of my projects, and the lanterns at the top track exploration progress.*

> 🎬 **Video: A walkthrough of the portfolio**

*The walkthrough shows the question-answering feature, résumé generation through Fetch, and a trip through the village.*

### Two smaller features worth mentioning

**The project graveyard**

I didn't want the portfolio to contain only finished projects.

The graveyard contains projects I eventually stopped working on, with a short explanation of what happened and what I took away from each one.

Two examples are Assignment Decoder, which used Amazon Bedrock to turn assignment PDFs into a plan, and DawnVerse, a Lambda function that generated a poem every morning at 6 AM.

Both projects are offline now, but I wanted to keep them visible. They were also useful references when making decisions about this project.

**The guestbook**

At the bottom of the website is a corkboard where visitors can leave short messages. Each message gets a paw stamp matching the costume the pup was wearing.

Unlike the other interactive features, this one needs a backend. Messages have to persist between visits, and anyone opening the portfolio should be able to read them.

That became the main reason for using AWS services beyond hosting.

---

## How it runs on AWS

> 🖼️ **Image: `docs/architecture.png`**

*The architecture behind the portfolio. The interactive agent, Fetch and village run in the browser. AWS handles hosting and the guestbook.*

Most of the interactive features don't need a server. The interesting backend problem was the guestbook: I wanted anonymous visitors to write to a database without making them create an account or exposing permanent AWS credentials in the frontend.

Here's how I put it together.

| Service | What I used it for |
|---|---|
| AWS Amplify Hosting | Hosting the website over HTTPS |
| Amplify Gen 2 | Defining the backend in TypeScript |
| AWS CloudFormation | Provisioning backend resources |
| Amazon Cognito | Providing temporary credentials to guests |
| AWS IAM | Restricting guest permissions |
| AWS AppSync | Exposing the GraphQL API |
| Amazon DynamoDB | Storing guestbook messages |

### AWS Amplify Hosting

The website is a static site. Its main HTML is generated at build time, so the portfolio content remains readable even without JavaScript.

The interactive features load separately when needed. For example, the village code isn't downloaded until someone actually clicks "Become the dog".

Amplify Hosting serves the site from my `master` branch over HTTPS through its global CDN.

> 🖼️ **Image: Amplify console, app overview**

*The Amplify app named `portfolio`, with `master` configured as the production branch.*

I chose not to connect the app to a Git provider for deployment. Instead, I build locally and upload the output through the AWS CLI.

This keeps the build and deployment process in the terminal. A typical upload takes around eight seconds to go through Amplify's deployment and verification steps.

### Amplify Gen 2: defining the backend

The backend lives inside an `amplify/` directory in the same repository as the frontend code.

With Amplify Gen 2, I could define the data model and its permissions directly in TypeScript.

Here's the guestbook model:

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

There are a few decisions here that matter:

- **Validation lives in the schema.** Messages are limited to 140 characters. Amplify turns this rule into a validation step inside the AppSync resolver, so it is checked by the API before anything is written, not just by the frontend form.
- **The costume is an enum.** Visitors can only submit one of the four supported values.
- **Guest access is limited.** Visitors can create and read messages, but cannot update or delete them.

The frontend uses Amplify's typed client to submit messages:

```ts
client.models.PawPrint.create(
  { message, costume },
  { authMode: 'identityPool' }
);
```

### AWS CloudFormation: provisioning everything

Running `npx ampx pipeline-deploy` takes the backend definitions and provisions the corresponding AWS resources through CloudFormation.

Amplify creates a root stack for the branch, along with nested stacks for authentication, data, the `PawPrint` model and the table resources. The account also has a one-time `CDKToolkit` stack.

> 🖼️ **Image: CloudFormation, PawPrint nested stack**

*The nested stack created for the PawPrint model. Its status is `CREATE_COMPLETE`.*

I'd previously used infrastructure-as-code for DawnVerse, where I wrote a SAM template myself.

This time, I didn't have to manually create a table or API in the AWS console, or write a CloudFormation template. I defined what I needed in TypeScript and let Amplify generate the infrastructure.

It also means I can tear down and recreate the backend from the same definitions.

### Amazon Cognito: anonymous visitors

A guestbook that requires visitors to register before leaving a message would be a little inconvenient.

At the same time, the browser needs AWS credentials to communicate with the backend. Putting permanent credentials in frontend JavaScript wasn't an option.

I used a **Cognito identity pool with guest access**.

When the page loads the guestbook, the application requests an identity from the pool and receives temporary credentials associated with the guest IAM role. There is no registration form or password involved.

> 🖼️ **Image: Cognito identity pool configuration**

*Guest access is active and mapped to the guest role.*

Amplify also created a Cognito user pool, which appears as an identity provider. I don't currently use it because the portfolio doesn't have a sign-in flow. It is there as part of the generated authentication resources.

### IAM and AppSync: restricting guest access

Getting temporary credentials is only part of the problem. I also needed to make sure those credentials couldn't be used to access unrelated resources in my AWS account.

The guest IAM role has permission for `appsync:GraphQL`, restricted to the relevant API and its `PawPrint` operations. Interestingly, that policy lists every `PawPrint` operation, including update and delete, so IAM alone isn't what stops a guest from editing a message.

The operation-level restrictions are handled by AppSync. It verifies the IAM-signed request and applies the authorization rules defined in the Amplify schema before the request reaches the database.

> 🖼️ **Image: AppSync, amplifyData schema**

*The GraphQL schema AppSync generated from my TypeScript model.*

I wanted to verify that the permissions actually worked, rather than just assume that the configuration was correct.

I wrote a small script called `scripts/guest-check.sh`. It obtains real guest credentials from the identity pool, signs GraphQL requests with them and tests three operations.

The results:

- **Listing messages:** Successful, and returns the messages on the board.
- **Updating a message:** Rejected with `Not Authorized to access updatePawPrint on type Mutation`.
- **Deleting a message:** Rejected with `Not Authorized to access deletePawPrint on type Mutation`.

> 🖼️ **Image: Terminal running `bash scripts/guest-check.sh`**

*The test uses anonymous guest credentials. Reading succeeds, while update and delete requests are rejected.*

This was a useful distinction to understand while building the backend. IAM controls access to the API, while AppSync authorization controls which operations the guest can perform through that API.

### Amazon DynamoDB: storing the messages

Amplify creates a DynamoDB table for the `PawPrint` model.

Each item stores an ID, message, costume and timestamps.

Amplify creates the table with on-demand capacity, which suits a guestbook well because its traffic is unpredictable. Someone might share the portfolio and several visitors could leave messages within a few minutes, followed by a day with no activity.

On-demand capacity means I don't have to reserve throughput for traffic that might never arrive.

> 🖼️ **Image: DynamoDB, PawPrint table items**

*The table containing the messages submitted through the guestbook.*

### Deploying a new version

My deployment process has three stages.

First, deploy the backend:

```bash
npx ampx pipeline-deploy --branch master --app-id <app-id>
```

Next, build the frontend:

```bash
npm run build
```

Finally, upload the generated `dist/` directory to Amplify Hosting.

The AWS CLI commands are:

```bash
aws amplify create-deployment \
  --app-id <app-id> \
  --branch-name master

aws amplify start-deployment \
  --app-id <app-id> \
  --branch-name master \
  --job-id <job-id>
```

The deployment command returns an upload URL and job ID. The `dist/` directory is zipped and uploaded to that URL before starting the deployment.

The order matters. The backend deployment generates `amplify_outputs.json`, which the frontend needs to know where its API and authentication resources are.

If the backend isn't available, the guestbook doesn't render. I made it so that the rest of the website continues working normally.

### Running costs

I kept the server-side work fairly small.

The question-answering agent, résumé generator and village all run in the browser. Someone asking the pup fifty questions doesn't create fifty requests to a model API.

The guestbook is the only feature making regular backend calls. Posting is limited in the browser to one message every 30 seconds, and DynamoDB uses on-demand billing.

---

## Things that didn't work the first time

Not everything looked or behaved the way I expected. A few problems took longer to fix than the actual features.

**The dig spots looked like poop.**

I'm not even exaggerating. My first version had a brown dome with dark speckles, placed in the middle of the path. There were about twelve of them in a row.

I looked at it and immediately realised what it resembled.

I redrew the spots as patches of freshly turned soil, added a bone and a little sparkle, and moved them onto the grass beside the path. I also combined all the hackathon wins into one location instead of scattering them everywhere.

**The purple colour scheme wasn't working.**

The first version used lavender and purple almost everywhere. It looked too much like a generic generated landing page.

I went back and changed the palette across the entire site, including the CSS, SVG illustrations and favicon. The final version uses midnight brown-black, pumpkin orange, bone white and witch-hat green.

**The ending kept opening as an empty box.**

This one took some debugging.

After the third lantern was lit, the ending dialog would open, but its contents disappeared if the visitor stayed in the market for more than a moment.

The problem was the order of browser events. My code closed the dialog and immediately reopened it with the new content. The browser's `close` event was delivered later, and the close handler moved the section back to its original location. That meant it was effectively pulling the ending content out of the newly opened dialog.

I fixed it by updating the content in place when the dialog is already open, and checking whether it is actually closed before running the close handler.

**Getting a horizontal village to work on a vertical phone.**

The village moves from left to right, but phones are designed around vertical scrolling.

I used a tall, invisible scroller and mapped its scroll position to the pup's position in the world. That introduced another problem: the buildings were underneath the scroller and stopped receiving clicks.

I changed the interaction so that taps on the scroller are forwarded to the elements beneath it. I also added dedicated walking buttons and sideways swipe support for mobile.

**The pup was answering questions too confidently.**

Some early answers combined unrelated passages and produced responses that sounded convincing but weren't actually supported by the portfolio.

I changed the retrieval logic so that it only combines passages from the same section when their scores are close to the best match. Anything below the relevance threshold gets an honest "my nose couldn't find that" response.

For this particular project, I'd rather have the pup admit it doesn't know something than make up an answer.

---

## What I took away from building this

A few things became clearer while working on the project.

- **Retrieval and routing do most of the work in a small agent.** The pup doesn't need an LLM to answer questions about a fixed set of portfolio content. Getting the retrieval right and deciding what action to take made a bigger difference.
- **AWS permissions need to be tested, not just configured.** Setting up Cognito, IAM and AppSync separately helped me understand how their responsibilities fit together. The guest-check script was especially useful for verifying the restrictions.
- **Infrastructure-as-code is easier to understand when you can see the result.** Watching a few TypeScript definitions turn into a tree of CloudFormation stacks helped me understand what Amplify was doing behind the scenes.
- **Interactive features need to work around the actual website.** The visible hints, reduced-motion support, mobile controls and Back to human button were all important. Visitors should still be able to use the portfolio normally.

## What's next?

There are a few things I'd like to work on:

- Give the pup a voice using Amazon Bedrock behind an Amplify function, while keeping the retrieval step so answers remain grounded in the portfolio.
- Add a custom domain through Amplify Hosting.
- Add more entries to the project graveyard. I like having a place for projects that didn't make it to completion.

## Give it a try

If you want to explore the portfolio, start by asking the pup:

*"What hackathons has Naomi won?"*

Then try pasting a job description into Fetch and see what résumé it puts together.

If you have a little more time, switch to dog mode, explore the village, sniff out a buried note and light all three lanterns. You can also leave a message on the guestbook before leaving.

**Live portfolio:** https://master.d3kz5bg2dsjqj0.amplifyapp.com  
**Source code:** https://github.com/paccmann218/portfolio

---

*The illustrations throughout the site are original SVG drawings made for this project. I built it with a coding agent as my pair programmer. The AWS stack uses Amplify, Amazon Cognito, AWS IAM, AWS AppSync, Amazon DynamoDB and AWS CloudFormation.*
