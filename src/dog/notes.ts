import { parseAward } from '../content/derive.ts';
import type { Portfolio } from '../content/portfolio.ts';

/** One dig spot in the village: a short note built only from portfolio.ts. */
export type BuriedNote = {
  id: string;
  title: string;
  intro?: string;
  lines: string[];
};

/**
 * The notes the pup can dig up. Each one gathers a few related facts so a dig
 * is worth the walk, rather than turning up a single word.
 */
export function buriedNotes(data: Portfolio): BuriedNote[] {
  const notes: BuriedNote[] = [];
  const first = data.name.split(' ')[0];

  const edu = data.education;
  notes.push({
    id: 'note-school',
    title: `${first}'s school report`,
    lines: [`${edu.school}, ${edu.location}`, edu.degree, edu.dates, edu.score],
  });

  const now = data.jobs[0];
  if (now) {
    notes.push({
      id: 'note-now',
      title: `Where ${first} works now`,
      intro: `${now.role} at ${now.org}, ${now.dates.replace(/\s*–\s*Present$/i, ' onwards')}.`,
      lines: now.points,
    });
  }

  const awards = data.achievements.map(parseAward);
  if (awards.length) {
    const firsts = awards.filter((award) => award.rank === 'first').length;
    notes.push({
      id: 'note-wins',
      title: `${first}'s hackathon record`,
      intro: `${awards.length} results, ${firsts} of them first place.`,
      lines: awards.map((award) => [award.event, award.place, award.date].filter(Boolean).join(' · ')),
    });
  }

  return notes;
}
