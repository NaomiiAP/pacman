import type { Portfolio } from '../content/portfolio.ts';
import { TAG_LABELS, handle, parseAward, parseSpan, projectTags, readyGraves, splitTitle } from '../content/derive.ts';

/*
 * The pup's memory: small passages written only from portfolio.ts.
 * Every answer the pup gives is built from these, so it can never say
 * something the page does not.
 */

export type Section = 'about' | 'education' | 'experience' | 'skills' | 'projects' | 'achievements' | 'graveyard' | 'contact';

export type Link = { label: string; href: string };

export type Chunk = {
  id: string;
  section: Section;
  /** Short name shown on the source chip. */
  title: string;
  text: string;
  /** Extra search words that are not shown, such as a project's categories. */
  hints?: string;
  links?: Link[];
};

export const SECTION_NAMES: Record<Section, string> = {
  about: 'About me',
  education: 'Education',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
  achievements: 'Achievements',
  graveyard: 'Project graveyard',
  contact: 'Contact',
};

function first(name: string): string {
  return name.split(' ')[0];
}

export function buildKnowledge(data: Portfolio): Chunk[] {
  const me = first(data.name);
  const chunks: Chunk[] = [];

  chunks.push({
    id: 'about',
    section: 'about',
    title: 'About me',
    text: `${data.name} is a ${data.roles} based in ${data.location}, focused on ${data.focus}. In ${me}'s words: “${data.bio}”`,
    hints: 'who is naomi introduce bio background person',
  });

  const study = parseSpan(data.education.dates);
  chunks.push({
    id: 'education',
    section: 'education',
    title: data.education.school,
    text: `${me} studies ${data.education.degree} at ${data.education.school}, ${data.education.location}, from ${data.education.dates}. ${data.education.score}.`,
    hints: `college university school degree study student graduate graduation cgpa gpa grades ${study.to}`,
  });

  data.jobs.forEach((job, index) => {
    const span = parseSpan(job.dates);
    chunks.push({
      id: `job-${index}`,
      section: 'experience',
      title: job.org,
      text: `${job.role} at ${job.org} (${job.dates}). ${job.points.join(' ')}`,
      hints: `work job internship intern company experience ${span.current ? 'current now present currently today' : 'past previous'}`,
    });
  });

  data.skills.forEach((group) => {
    chunks.push({
      id: `skills-${group.id}`,
      section: 'skills',
      title: group.title,
      text: `${group.title}: ${group.skills.join(', ')}.`,
      hints: 'skills stack tech technology tools know knows use',
    });
  });

  data.projects.forEach((project) => {
    const title = splitTitle(project.name);
    const tags = projectTags(project);
    const links: Link[] = [];
    if (project.demo) links.push({ label: `${title.short} live demo`, href: project.demo });
    if (project.source) links.push({ label: `${title.short} source`, href: project.source });
    chunks.push({
      id: project.id,
      section: 'projects',
      title: title.short,
      text: `${project.name}. Built with ${project.stack}. ${project.summary}`,
      hints: `project built build made app ${tags.map((tag) => TAG_LABELS[tag]).join(' ')} ${tags.includes('ai') ? 'ai ml machine learning model' : ''} ${tags.includes('cloud') ? 'aws cloud serverless' : ''}`,
      links,
    });
  });

  data.achievements.forEach((text, index) => {
    const award = parseAward(text);
    chunks.push({
      id: `award-${index}`,
      section: 'achievements',
      title: award.event,
      text: `${award.event}: ${award.place}${award.venue ? `, ${award.venue}` : ''}${award.date ? `, ${award.date}` : ''}.`,
      hints: `hackathon award prize win won achievement competition ${award.rank === 'first' ? 'first winner best top gold' : ''}`,
    });
  });

  readyGraves(data.graveyard).forEach((entry, index) => {
    chunks.push({
      id: `grave-${index}`,
      section: 'graveyard',
      title: entry.name,
      text: `${entry.name} (${entry.years}). What happened: ${entry.whatHappened} What was learned: ${entry.learned}`,
      hints: 'abandoned unfinished graveyard failed lesson learned',
    });
  });

  const links: Link[] = [];
  if (data.contact.github) links.push({ label: `GitHub ${handle(data.contact.github)}`, href: data.contact.github });
  if (data.contact.linkedin) links.push({ label: 'LinkedIn', href: data.contact.linkedin });
  if (data.contact.email) links.push({ label: data.contact.email, href: `mailto:${data.contact.email}` });
  if (data.contact.resume) links.push({ label: 'Resume', href: data.contact.resume });
  if (data.contact.repo) links.push({ label: "This site's code", href: data.contact.repo });
  chunks.push({
    id: 'contact',
    section: 'contact',
    title: 'Contact',
    text: `You can find ${me} on ${links.map((link) => link.label.split(' ')[0]).join(' and ')}.`,
    hints: 'contact reach hire email message connect github linkedin social',
    links,
  });

  return chunks;
}
