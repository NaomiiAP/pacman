/*
 * A tiny BM25 search, written from scratch. It is the "R" in RAG:
 * the pup looks up the passages that best match a question before it
 * answers.
 */

const STOP = new Set(
  'a an and are as at be by can could did do does for from has have her his how i in is it its me my of on or our she so tell that the their them they this to was what when where which who why will with you your about naomi naomis please show'.split(
    ' ',
  ),
);

/** Words that mean the same thing to the pup. */
const SYNONYMS: Record<string, string[]> = {
  college: ['education', 'university'],
  university: ['education', 'college'],
  school: ['education'],
  study: ['education', 'degree'],
  degree: ['education'],
  gpa: ['cgpa'],
  grade: ['cgpa'],
  job: ['internship', 'work'],
  work: ['internship', 'job'],
  intern: ['internship'],
  company: ['internship'],
  hackathon: ['award'],
  win: ['award', 'winner', 'first'],
  won: ['award', 'winner', 'first'],
  prize: ['award'],
  achievement: ['award'],
  trophy: ['award'],
  ml: ['ai'],
  llm: ['ai', 'agentic'],
  agent: ['agentic'],
  web3: ['blockchain'],
  crypto: ['blockchain'],
  ethereum: ['blockchain', 'solidity'],
  frontend: ['web', 'react'],
  backend: ['fastapi', 'flask', 'node'],
  database: ['mysql', 'mongodb', 'databases'],
  db: ['database', 'databases'],
  reach: ['contact'],
  hire: ['contact'],
  email: ['contact'],
};

function stem(word: string): string {
  if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`;
  if (word.length > 5 && word.endsWith('ing')) return word.slice(0, -3);
  if (word.length > 4 && word.endsWith('ed') && !word.endsWith('eed')) return word.slice(0, -2);
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1);
  return word;
}

export function tokens(text: string, expand = false): string[] {
  const words = text
    .toLowerCase()
    .replace(/c\+\+/g, ' cpp ')
    .replace(/\.js\b/g, 'js')
    .replace(/[’']s\b/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word && !STOP.has(word))
    .map(stem);
  if (!expand) return words;
  const extra = words.flatMap((word) => (SYNONYMS[word] ?? []).map(stem));
  return [...words, ...extra];
}

export type Hit = { index: number; score: number };

export class Bm25 {
  private readonly docs: Map<string, number>[];
  private readonly lengths: number[];
  private readonly avg: number;
  private readonly df = new Map<string, number>();
  private readonly k1 = 1.3;
  private readonly b = 0.7;

  constructor(texts: string[]) {
    this.docs = texts.map((text) => {
      const counts = new Map<string, number>();
      for (const term of tokens(text)) counts.set(term, (counts.get(term) ?? 0) + 1);
      return counts;
    });
    this.lengths = this.docs.map((doc) => [...doc.values()].reduce((sum, n) => sum + n, 0));
    this.avg = this.lengths.reduce((sum, n) => sum + n, 0) / Math.max(1, this.lengths.length);
    for (const doc of this.docs) for (const term of doc.keys()) this.df.set(term, (this.df.get(term) ?? 0) + 1);
  }

  search(query: string): Hit[] {
    const terms = [...new Set(tokens(query, true))];
    const total = this.docs.length;
    const hits: Hit[] = [];
    this.docs.forEach((doc, index) => {
      let score = 0;
      for (const term of terms) {
        const tf = doc.get(term);
        if (!tf) continue;
        const df = this.df.get(term) ?? 0;
        const idf = Math.log(1 + (total - df + 0.5) / (df + 0.5));
        score += (idf * tf * (this.k1 + 1)) / (tf + this.k1 * (1 - this.b + (this.b * this.lengths[index]) / this.avg));
      }
      if (score > 0) hits.push({ index, score });
    });
    return hits.sort((x, y) => y.score - x.score);
  }
}
