import type { Portfolio } from '../content/portfolio.ts';
import { TAG_LABELS, jobNoun, parseAward, parseSpan, projectTags, splitTitle, type ProjectTag } from '../content/derive.ts';
import { SECTION_NAMES, buildKnowledge, type Chunk, type Link, type Section } from './knowledge.ts';
import { ROLES, type RoleId } from './match.ts';
import { Bm25 } from './search.ts';

/*
 * The pup's brain: a small agent. It first checks whether the visitor
 * asked it to *do* something (a tool), then retrieves passages from the
 * portfolio and answers only with what it found. No language model, no
 * server, nothing invented.
 */

export type Action =
  | { type: 'goto'; section: Section }
  | { type: 'filter'; tag: ProjectTag | 'all' }
  | { type: 'theme'; dark: boolean }
  | { type: 'dog'; enter: boolean }
  | { type: 'fetch'; role: RoleId | null };

export type Reply = {
  lines: string[];
  sources: Chunk[];
  links: Link[];
  actions: Action[];
  /** What the pup did, shown as a small note under the answer. */
  did?: string;
  suggestions?: string[];
};

export type Context = { inDog: boolean; dark: boolean; sections: Section[] };

export const STARTERS = [
  'What does Naomi build?',
  'Fetch a résumé for a cloud role',
  'Show me the blockchain projects',
  'Biggest hackathon wins?',
  'Where does Naomi study?',
  'Turn the lights off',
  'Let me be the dog',
];

const SECTION_WORDS: Array<[Section, RegExp]> = [
  ['education', /\b(education|school|college|universit\w*|degree|study|studies|studying|cgpa|gpa|grades?|ramaiah|graduat\w*)\b/],
  ['experience', /\b(experience|work|jobs?|intern\w*|compan\w*|career|hpe|hewlett|samsung|fintervue)\b/],
  ['skills', /\b(skills?|stack|tech|technolog\w*|languages?|frameworks?|tools?|superpowers?)\b/],
  ['projects', /\b(projects?|apps?|builds?|built)\b/],
  ['achievements', /\b(awards?|hackathons?|wins?|won|prizes?|achievements?|troph\w*|competitions?)\b/],
  ['graveyard', /\b(graveyard|abandoned|unfinished|failed)\b/],
  ['contact', /\b(contact|reach|email|hire|connect|github|linkedin|socials?)\b/],
  ['about', /\b(about|bio|intro\w*|yourself|who is)\b/],
];

function sectionIn(text: string): Section | null {
  for (const [section, words] of SECTION_WORDS) if (words.test(text)) return section;
  return null;
}

function list(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export function createBrain(data: Portfolio) {
  const me = data.name.split(' ')[0];
  const chunks = buildKnowledge(data);
  const index = new Bm25(chunks.map((chunk) => `${chunk.title} ${chunk.text} ${chunk.hints ?? ''}`));
  const awards = data.achievements.map(parseAward);
  const wins = awards.filter((award) => award.rank === 'first');
  const bySection = (section: Section) => chunks.filter((chunk) => chunk.section === section);

  const intro = (): Reply => ({
    lines: [
      `Hi! I'm the spirit pup who lives on ${me}'s page.`,
      `Ask me about ${me}'s projects, skills, internships, studies or hackathon wins. I only answer from what's on this page, and I can take you places too.`,
    ],
    sources: [],
    links: [],
    actions: [],
    suggestions: STARTERS,
  });

  function retrieve(question: string, focus: Section | null, context: Context): Reply {
    const hits = index
      .search(question)
      .map((hit) => ({ chunk: chunks[hit.index], score: hit.score * (focus && chunks[hit.index].section === focus ? 1.6 : 1) }))
      .filter((hit) => context.sections.includes(hit.chunk.section))
      .sort((x, y) => y.score - x.score);
    if (!hits.length || hits[0].score < 1.2) {
      if (focus === 'about') {
        const about = bySection('about')[0];
        return { lines: [about.text], sources: [about], links: [], actions: [] };
      }
      return {
        lines: [
          `My nose couldn't find that on ${me}'s page, and I don't make things up.`,
          'I know about education, internships, skills, projects, achievements and how to get in touch. Try one of these:',
        ],
        sources: [],
        links: [],
        actions: [],
        suggestions: STARTERS.slice(0, 4),
      };
    }
    const top = hits[0];
    const close = hits.filter((hit) => hit.score >= top.score * 0.62).slice(0, 4);
    const sameKind = close.filter((hit) => hit.chunk.section === top.chunk.section);
    const picked = sameKind.length > 1 ? sameKind : [top];
    let lines: string[];
    if (picked.length > 1 && top.chunk.section === 'projects') {
      lines = [
        'These projects match:',
        ...picked.map((hit) => {
          const project = data.projects.find((item) => item.id === hit.chunk.id);
          return project ? `• ${project.name} (${project.stack})` : `• ${hit.chunk.title}`;
        }),
      ];
    } else if (picked.length > 1) {
      lines = ["Here's what I sniffed out:", ...picked.map((hit) => `• ${hit.chunk.text}`)];
    } else {
      lines = [top.chunk.text];
    }
    return {
      lines,
      sources: picked.map((hit) => hit.chunk),
      links: picked.flatMap((hit) => hit.chunk.links ?? []),
      actions: [],
    };
  }

  function reply(raw: string, context: Context): Reply {
    const question = raw.trim().toLowerCase();
    if (!question || /^(hi|hey|hello|yo|hiya|help|start)\b|what can you do|who are you|what are you/.test(question)) return intro();

    // Tools first: the visitor asked the pup to do something.
    if (/\b(back to human|be human|exit dog|leave dog|leave the village|stop being)\b/.test(question)) {
      if (!context.inDog) return { lines: ["You're already on the human page!"], sources: [], links: [], actions: [] };
      return { lines: ['Back to the human page we go!'], sources: [], links: [], actions: [{ type: 'dog', enter: false }], did: 'Left dog mode' };
    }
    if (/\b(become|be|play|turn into|switch to)\b.*\b(dog|pup|puppy)\b|\bdog mode\b|\bexplore\b.*\bvillage\b/.test(question)) {
      if (context.inDog) return { lines: ["You're already the dog! Scroll or use the arrows to walk."], sources: [], links: [], actions: [] };
      return {
        lines: ['Woof! Hop in. Walk up to a building and it opens that part of the portfolio.'],
        sources: [],
        links: [],
        actions: [{ type: 'dog', enter: true }],
        did: 'Started dog mode',
      };
    }
    if (/\b(fetch|resume|résumé|cv|hiring|recruit\w*|job (post|description)|jd)\b/.test(question)) {
      const roleWords: Array<[RoleId, RegExp]> = [
        ['cloud', /\b(cloud|aws|devops|lambda|serverless|sre)\b/],
        ['chain', /\b(blockchain|web3|crypto|solidity)\b/],
        ['ai', /\b(ai|ml|machine learning|data scien\w*|nlp)\b/],
        ['fullstack', /\b(full[- ]?stack|web|front[- ]?end|back[- ]?end|react)\b/],
      ];
      const role = roleWords.find(([, words]) => words.test(question))?.[0] ?? null;
      const actions: Action[] = context.inDog ? [{ type: 'dog', enter: false }] : [];
      actions.push({ type: 'fetch', role });
      return {
        lines: role
          ? [`Fetch! I'll bring back the parts of ${me}'s portfolio that fit ${ROLES[role].label} roles.`]
          : [`Pick a role or paste a job post in Fetch!, then throw the ball. I'll bring back a one-page résumé made only from ${me}'s portfolio.`],
        sources: [],
        links: [],
        actions,
        did: role ? `Fetched a résumé for ${ROLES[role].label} roles` : 'Opened Fetch!',
      };
    }

    const lights = question.match(/\b(lights?\s*(off|out|on)|dark\s*(mode|theme)|light\s*(mode|theme)|night\s*mode|day\s*mode)\b/);
    if (lights) {
      const dark = /off|out|dark|night/.test(lights[0]);
      if (dark === context.dark) return { lines: [dark ? 'The lights are already off. Spooky, right?' : 'The lights are already on!'], sources: [], links: [], actions: [] };
      return {
        lines: [dark ? 'Lights out! The ghosts love this.' : 'Lights back on!'],
        sources: [],
        links: [],
        actions: [{ type: 'theme', dark }],
        did: dark ? 'Switched to the dark theme' : 'Switched to the light theme',
      };
    }

    const tagWords: Array<[ProjectTag, RegExp]> = [
      ['cloud', /\b(aws|cloud|lambda|bedrock|serverless)\b/],
      ['chain', /\b(blockchain|web3|crypto|solidity|ethereum)\b/],
      ['ai', /\b(ai|ml|machine learning|deep learning)\b/],
      ['web', /\b(web|web apps?|websites?|full[- ]?stack)\b/],
    ];
    if (/\bprojects?\b/.test(question)) {
      const tag = tagWords.find(([, words]) => words.test(question))?.[0];
      if (tag) {
        const matching = data.projects.filter((project) => projectTags(project).includes(tag));
        return {
          lines: [`${TAG_LABELS[tag]} projects:`, ...matching.map((project) => `• ${project.name}: ${project.summary}`)],
          sources: matching.map((project) => chunks.find((chunk) => chunk.id === project.id)).filter((chunk): chunk is Chunk => Boolean(chunk)),
          links: [],
          actions: [{ type: 'filter', tag }, { type: 'goto', section: 'projects' }],
          did: `Filtered the projects to ${TAG_LABELS[tag]}`,
        };
      }
    }

    if (/\b(this|the|your) (site|website|portfolio|page)\b|\bhow (do|does) you work\b|\bhow (was|is) (this|it) (built|made)\b/.test(question)) {
      const repo = bySection('contact')[0].links?.filter((link) => link.label === "This site's code") ?? [];
      return {
        lines: [
          `This page is plain HTML, written at build time from ${me}'s content and hosted on AWS Amplify Hosting, which builds it from GitHub on every push.`,
          "I'm a tiny agent that runs in your browser: I search the page with BM25 (written from scratch), answer only with what I find, and can use a few tools to move you around.",
        ],
        sources: [],
        links: repo,
        actions: [],
        suggestions: ['What does Naomi build?', 'Let me be the dog', 'Biggest hackathon wins?'],
      };
    }

    if (/\b(what|which)\b.*\b(builds?|built|makes?|made|creates?|created)\b/.test(question) && !/\bprojects?\b.*\b(use|using|with)\b/.test(question)) {
      const building = data.bio.split('. ').find((sentence) => /^Building\b/.test(sentence));
      return {
        lines: [building ? `In ${me}'s words: “${building.replace(/\.$/, '')}.”` : `${me} is a ${data.roles}.`, ...summaryOfProjects()],
        sources: [...bySection('about'), ...bySection('projects')],
        links: [],
        actions: [],
        suggestions: ['Show me the AI projects', 'Show me the blockchain projects', 'Which projects have live demos?'],
      };
    }

    if (/\b(demos?|live|links?|repos?|source code)\b/.test(question) && !/\b(github|linkedin|contact)\b/.test(question)) {
      const shown = data.projects.filter((project) => project.demo || project.source);
      const projectChunks = bySection('projects').filter((chunk) => shown.some((project) => project.id === chunk.id));
      return {
        lines: [`${shown.length} projects have links you can open:`, ...shown.map((project) => `• ${project.name}`)],
        sources: projectChunks,
        links: projectChunks.flatMap((chunk) => chunk.links ?? []),
        actions: [],
      };
    }

    const focus = sectionIn(question);
    if (/\b(go|take|jump|scroll|open|navigate|bring)\b/.test(question) && focus && context.sections.includes(focus)) {
      const answer = focus === 'achievements' ? summaryOfAwards() : focus === 'projects' ? summaryOfProjects() : null;
      return {
        lines: answer ?? [`Here's ${SECTION_NAMES[focus]}!`],
        sources: [],
        links: [],
        actions: [{ type: 'goto', section: focus }],
        did: context.inDog ? `Walked to ${SECTION_NAMES[focus]}` : `Scrolled to ${SECTION_NAMES[focus]}`,
      };
    }

    if (/\bhow many\b/.test(question) && focus) {
      if (focus === 'achievements' && /\b(won|wins?|first)\b/.test(question)) {
        return countReply([`${wins.length} first-place wins out of ${awards.length} achievements:`, ...wins.map((award) => `• ${award.event} (${award.date})`)]);
      }
      if (focus === 'projects') return { ...countReply(summaryOfProjects()), actions: [] };
      if (focus === 'achievements') return countReply([`${awards.length} achievements, ${wins.length} of them first place.`, ...summaryOfAwards().slice(1)]);
      if (focus === 'experience') {
        return countReply([`${data.jobs.length} ${jobNoun(data)}: ${list(data.jobs.map((job) => `${job.role} at ${job.org}`))}.`], bySection('experience'));
      }
      if (focus === 'skills') {
        const total = data.skills.reduce((sum, group) => sum + group.skills.length, 0);
        return countReply([`${total} skills across ${data.skills.length} groups: ${list(data.skills.map((group) => group.title.toLowerCase()))}.`], bySection('skills'));
      }
    }

    if (/\b(best|biggest|top|greatest|proudest|first place|winner|won)\b/.test(question) && focus === 'achievements') {
      return {
        lines: [`${wins.length} first-place finishes:`, ...wins.map((award) => `• ${award.event} (${award.place}, ${award.date})`)],
        sources: bySection('achievements').filter((chunk) => wins.some((award) => chunk.title === award.event)),
        links: [],
        actions: [],
      };
    }

    if (/\b(now|currently|current|today|these days)\b/.test(question) && (focus === 'experience' || /\bwork|doing|job\b/.test(question))) {
      const current = data.jobs.filter((job) => parseSpan(job.dates).current);
      if (current.length) {
        return {
          lines: current.map((job) => `${me} is currently a ${job.role} at ${job.org} (${job.dates}). ${job.points[0]}`),
          sources: bySection('experience').filter((chunk) => current.some((job) => chunk.title === job.org)),
          links: [],
          actions: [],
        };
      }
    }

    if (focus === 'contact') {
      const contact = bySection('contact')[0];
      return { lines: [contact.text], sources: [contact], links: contact.links ?? [], actions: [] };
    }

    return retrieve(question, focus, context);

    function countReply(lines: string[], sources: Chunk[] = []): Reply {
      return { lines, sources, links: [], actions: [] };
    }

    function summaryOfAwards(): string[] {
      return [`Here are ${me}'s latest achievements:`, ...awards.slice(0, 4).map((award) => `• ${award.event}: ${award.place}`)];
    }

    function summaryOfProjects(): string[] {
      return [`${data.projects.length} projects: ${list(data.projects.map((project) => splitTitle(project.name).short))}.`];
    }
  }

  return { reply, intro };
}
