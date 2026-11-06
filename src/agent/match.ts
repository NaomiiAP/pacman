import type { Job, Portfolio, Project } from '../content/portfolio.ts';
import { TAG_LABELS, parseAward, projectTags } from '../content/derive.ts';
import { Bm25, tokens } from './search.ts';

/*
 * Fetch! The pup reads a role or a pasted job post and brings back the
 * parts of the portfolio that match it. It only reorders real content:
 * it never adds a skill, project or claim that portfolio.ts does not have.
 */

export type RoleId = 'ai' | 'fullstack' | 'cloud' | 'chain';

/** Each preset is just a query made of words that already appear in the portfolio. */
export const ROLES: Record<RoleId, { label: string; query: string }> = {
  ai: {
    label: 'AI / ML engineer',
    query:
      'AI ML machine learning models agentic agents RAG multimodal NLP BERT Vision Transformer ViT Scikit-Learn TF-IDF MobileNetV2 Bedrock Python NumPy Pandas emotion detection',
  },
  fullstack: {
    label: 'Full-stack developer',
    query: 'full-stack web frontend backend React.js Next.js Node.js FastAPI Flask TypeScript JavaScript HTML CSS REST APIs MySQL MongoDB SQLite web UI website',
  },
  cloud: {
    label: 'Cloud & AWS',
    query: 'AWS cloud Lambda Bedrock EventBridge CloudWatch serverless Kubernetes Helm private cloud Git automation always-on agent',
  },
  chain: {
    label: 'Blockchain',
    query: 'blockchain Solidity Ether.js IPFS Sepolia Remix smart contracts decentralized credentials authentication verification',
  },
};

/** Skills whose names need a hand-written pattern to be found in ordinary text. */
const SPECIAL: Record<string, RegExp> = {
  // Only the language: "C, C++", "C/C++", "C programming". Not "Series C" or "Plan C".
  C: /(^|[\s,(/])C(?=\s*([/,;)]|$)|\s+(and|or|programming|language)\b)/,
  'C++': /c\+\+/i,
  'Next.js': /next\.?js/i,
  'REST APIs': /\brest(ful)?\b/i,
  'Problem Solving': /problem[- ]solving/i,
  'Vision Transformer (ViT)': /vision transformer|\bvit\b/i,
  'Scikit-Learn': /scikit|sklearn/i,
  'TF-IDF': /tf-?idf/i,
  MobileNetV2: /mobilenet/i,
  NLP: /\bnlp\b|natural language/i,
  Kubernetes: /kubernetes|\bk8s\b/i,
  'GPU shaders': /\bshaders?\b/i,
  'Agentic systems': /\bagentic\b|\bai agents?\b/i,
  'multimodal AI': /multi-?modal/i,
  'full-stack products': /full[- ]?stack/i,
  'blockchain credentials and authentication': /credential/i,
  'perceptual hashing': /perceptual hash/i,
  'Ether.js': /\bethers?(\.js)?\b/i,
};

function skillPattern(skill: string): RegExp {
  const special = SPECIAL[skill];
  if (special) return special;
  const base = skill.replace(/\.js$/i, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(^|[^a-z0-9])${base}(\\.?js)?(?![a-z0-9])`, 'i');
}

export type Fetched = {
  /** What the pup fetched for, such as "Cloud & AWS roles". */
  title: string;
  fromPost: boolean;
  /** Nothing matched, so the pup brought the highlights instead. */
  fallback: boolean;
  skills: string[];
  projects: Project[];
  jobs: Array<{ job: Job; point: string }>;
  wins: ReturnType<typeof parseAward>[];
};

export function fetchFor(data: Portfolio, input: { role: RoleId; post?: string }): Fetched {
  const post = (input.post ?? '').trim().slice(0, 6000);
  const fromPost = post.length > 0;
  const query = fromPost ? post : ROLES[input.role].query;

  const allSkills = [...new Set(data.skills.flatMap((group) => group.skills))];
  const skills = allSkills.filter((skill) => skillPattern(skill).test(query));

  const projectIndex = new Bm25(
    data.projects.map((project) => `${project.name} ${project.stack} ${project.summary} ${projectTags(project).map((tag) => TAG_LABELS[tag]).join(' ')}`),
  );
  const projectHits = projectIndex.search(query);
  const fallback = projectHits.length === 0;
  const projectOrder = fallback ? data.projects.map((_, index) => index) : projectHits.map((hit) => hit.index);
  const projects = projectOrder.slice(0, 3).map((index) => data.projects[index]);

  const jobIndex = new Bm25(data.jobs.map((job) => `${job.role} ${job.org} ${job.points.join(' ')}`));
  const jobHits = jobIndex.search(query).map((hit) => hit.index);
  const jobOrder = [...jobHits, ...data.jobs.map((_, index) => index).filter((index) => !jobHits.includes(index))];
  const wanted = new Set(tokens(query, true));
  const overlap = (text: string) => tokens(text).filter((term) => wanted.has(term)).length;
  const jobs = jobOrder.map((index) => {
    const job = data.jobs[index];
    const point = [...job.points].sort((a, b) => overlap(b) - overlap(a))[0];
    return { job, point };
  });

  const wins = data.achievements
    .map(parseAward)
    .filter((award) => award.rank === 'first')
    .slice(0, 3);

  return {
    title: fromPost ? 'your job post' : `${ROLES[input.role].label} roles`,
    fromPost,
    fallback,
    skills,
    projects,
    jobs,
    wins,
  };
}
