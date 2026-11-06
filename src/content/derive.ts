import type { GraveEntry, Portfolio, Project } from './portfolio.ts';

/**
 * Display helpers. Everything here is computed from portfolio.ts so the
 * page never states a number or a category that the content does not.
 */

export type ProjectTag = 'ai' | 'cloud' | 'chain' | 'web';

export const TAG_LABELS: Record<ProjectTag, string> = {
  ai: 'AI & ML',
  cloud: 'Cloud & AWS',
  chain: 'Blockchain',
  web: 'Web apps',
};

const TAG_WORDS: Record<ProjectTag, RegExp> = {
  ai: /(\bAI\b|BERT|\bViT\b|Scikit|MobileNet|\bNLP\b|TF-IDF|Yield Prediction|Vision Transformer|Bedrock)/i,
  cloud: /(\bAWS\b|Lambda|Bedrock|EventBridge|CloudWatch)/i,
  chain: /(blockchain|Solidity|Sepolia|\bRemix\b|Ether\.js|\bIPFS\b)/i,
  web: /(Next\.js|React|FastAPI|Flask)/i,
};

export function projectTags(project: Project): ProjectTag[] {
  const text = `${project.name} ${project.stack} ${project.summary}`;
  return (Object.keys(TAG_WORDS) as ProjectTag[]).filter((tag) => TAG_WORDS[tag].test(text));
}

export function splitTitle(name: string): { short: string; rest: string } {
  const [short, ...rest] = name.split(' — ');
  return { short: short.trim(), rest: rest.join(' — ').trim() };
}

export function stackList(stack: string): string[] {
  return stack
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
}

export type Rank = 'first' | 'second' | 'third' | 'runner' | 'honor';

export type Award = {
  text: string;
  event: string;
  place: string;
  venue: string;
  date: string;
  rank: Rank;
};

export function parseAward(text: string): Award {
  const [event = text, place = '', venue = '', date = ''] = text.split(' — ').map((part) => part.trim());
  const lower = place.toLowerCase();
  const rank: Rank = lower.startsWith('1st') || lower.startsWith('winner')
    ? 'first'
    : lower.startsWith('2nd')
      ? 'second'
      : lower.startsWith('3rd')
        ? 'third'
        : lower.includes('runner')
          ? 'runner'
          : 'honor';
  return { text, event, place, venue, date, rank };
}

/** "internships" when every role is an internship, otherwise "roles". */
export function jobNoun(data: Portfolio): string {
  const one = data.jobs.length === 1;
  if (data.jobs.every((job) => /intern/i.test(job.role))) return one ? 'internship' : 'internships';
  return one ? 'role' : 'roles';
}

/** A short, readable handle for a profile link. */
export function handle(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/+$/, '');
    if (parsed.hostname.endsWith('github.com')) return `@${path.slice(1)}`;
    if (parsed.hostname.endsWith('linkedin.com')) return path.replace(/^\//, '');
    return `${parsed.hostname}${path}`;
  } catch {
    return url;
  }
}

/** Graveyard stones that are filled in. Placeholder stones stay off the page. */
export function readyGraves(entries: GraveEntry[]): GraveEntry[] {
  return entries.filter((entry) => !Object.values(entry).some((value) => value.includes('[PLACEHOLDER]')));
}

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

/** "October 2023" as the first (or, with `endOfMonth`, the last) day of that month. */
function parseMonth(text: string, endOfMonth = false): Date | null {
  const match = text.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTHS.indexOf(match[1].toLowerCase());
  if (month < 0) return null;
  return new Date(Date.UTC(Number(match[2]), endOfMonth ? month + 1 : month, endOfMonth ? 0 : 1));
}

export type Span = { from: string; to: string; start: Date | null; end: Date | null; current: boolean };

/** Splits "March 2026 – Present" into its two ends. */
export function parseSpan(dates: string): Span {
  const [from = dates, to = ''] = dates.split(/\s+[–—-]\s+/);
  const current = /present|now/i.test(to);
  return { from: from.trim(), to: to.trim(), start: parseMonth(from), end: current ? null : parseMonth(to, true), current };
}

const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

export function countWord(count: number): string {
  return WORDS[count] ?? String(count);
}
