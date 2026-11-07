import type { ReactNode } from 'react';
import { portfolio, type Project } from '../content/portfolio.ts';
import {
  TAG_LABELS,
  countWord,
  handle,
  jobNoun,
  parseAward,
  parseSpan,
  projectTags,
  readyGraves,
  splitTitle,
  stackList,
  type ProjectTag,
} from '../content/derive.ts';
import { bat, candyCorn, cloud, ghost, lollipop, moon, pumpkin, star, tombstone, wrappedCandy } from '../art/critters.ts';
import {
  academy,
  batHang,
  ball,
  bone,
  books,
  catPeek,
  gardenStrip,
  garland,
  ghostPeek,
  gradCap,
  jobArt,
  mushrooms,
  potion,
  questMap,
  spiderDangle,
  witchHat,
} from '../art/decor.ts';
import { badgeGhost, batMail, candyBucket, icon, spellbook, trophySticker } from '../art/icons.ts';
import { projectArt } from '../art/projects.ts';
import { pupArt, pupHead } from '../art/pup.ts';
import { heroLand, heroStars } from '../art/scene.ts';
import { spiritArt } from '../art/spirits.ts';
import { ROLES, type RoleId } from '../agent/match.ts';

/**
 * The human page. It is rendered to static HTML at build time and is not
 * hydrated: src/main.ts adds the interactions. Dog mode moves these
 * sections into a dialog in the real DOM, so keep the ids and classes
 * that src/dog reads (#education, #experience, #skills, #projects, #achievements, #contact,
 * #graveyard, .project-card[data-short], .grave-card).
 */

const TINTS = ['pink', 'peach', 'lilac', 'sky', 'mint', 'butter'] as const;

function Art({ html, className }: { html: string; className?: string }): ReactNode {
  return <span className={className ? `art ${className}` : 'art'} aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Icon({ name }: { name: string }): ReactNode {
  return <Art html={icon(name)} className="icon-wrap" />;
}

function safeUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href;
  } catch {
    return null;
  }
  return null;
}

function emailHref(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('mailto:')) return trimmed;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return `mailto:${trimmed}`;
  return null;
}

function NewTab(): ReactNode {
  return <span className="visually-hidden"> (opens in a new tab)</span>;
}

function SectionHead({
  id,
  sticker,
  kicker,
  title,
  sub,
  decor,
}: {
  id: string;
  sticker: string;
  kicker: string;
  title: string;
  sub?: string;
  /** Two little critters that float either side of the heading. */
  decor?: [string, string];
}): ReactNode {
  return (
    <div className="section-head">
      {decor ? (
        <>
          <Art html={decor[0]} className="head-decor decor-left" />
          <Art html={decor[1]} className="head-decor decor-right" />
        </>
      ) : null}
      <Art html={sticker} className="sticker" />
      <p className="kicker">{kicker}</p>
      <h2 id={id}>{title}</h2>
      {sub ? <p className="section-sub">{sub}</p> : null}
    </div>
  );
}

function Tags({ items, className = 'tags' }: { items: string[]; className?: string }): ReactNode {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }): ReactNode {
  const source = safeUrl(project.source);
  const demo = safeUrl(project.demo);
  if (!source && !demo) return null;
  return (
    <div className="project-links">
      {demo ? (
        <a className="btn btn-small btn-primary" href={demo} target="_blank" rel="noopener noreferrer">
          <Icon name="spark" />
          Live demo
          <NewTab />
        </a>
      ) : null}
      {source ? (
        <a className="btn btn-small btn-plain" href={source} target="_blank" rel="noopener noreferrer">
          <Icon name="code" />
          Source
          <NewTab />
        </a>
      ) : null}
    </div>
  );
}

function Medal({ rank }: { rank: string }): ReactNode {
  const glyph = rank === 'first' ? '1' : rank === 'second' ? '2' : rank === 'third' ? '3' : rank === 'runner' ? '★' : '♥';
  return (
    <span className="medal" aria-hidden="true">
      <span className="medal-ribbon" />
      <span className="medal-disc">{glyph}</span>
    </span>
  );
}

function HeroScene(): ReactNode {
  return (
    <div className="hero-scene">
      <div className="scene" data-scene="">
        <Art html={heroStars()} className="scene-stars" />
        <button type="button" className="scene-moon" data-theme-toggle="" aria-pressed="false" aria-label="Lights out">
          <Art html={moon()} />
        </button>
        <Art html={cloud()} className="scene-cloud cloud-a" />
        <Art html={cloud({ tint: '#ffdeeb' })} className="scene-cloud cloud-b" />
        <Art html={bat()} className="scene-bat bat-a" />
        <Art html={bat()} className="scene-bat bat-b" />
        <Art html={heroLand()} className="scene-land" />
        <button type="button" className="critter scene-ghost" data-critter="ghost" aria-label="Poke the ghost">
          <Art html={ghost()} />
        </button>
        <Art html={lollipop()} className="scene-candy candy-a" />
        <Art html={candyCorn()} className="scene-candy candy-b" />
        <Art html={wrappedCandy({ color: '#a9d05b' })} className="scene-candy candy-c" />
        <button type="button" className="critter scene-pumpkin pumpkin-a" data-critter="pumpkin" aria-label="Poke the big pumpkin">
          <Art html={pumpkin()} />
        </button>
        <button type="button" className="critter scene-pumpkin pumpkin-b" data-critter="pumpkin" aria-label="Poke the pumpkin in the witch hat">
          <Art html={pumpkin({ hat: true, mouth: 'open' })} />
        </button>
        <button type="button" className="critter scene-pumpkin pumpkin-c" data-critter="pumpkin" aria-label="Poke the little pumpkin">
          <Art html={pumpkin({ mouth: 'smile' })} />
        </button>
        <button type="button" className="scene-pup" data-enter-dog="">
          <span className="pup-bubble" aria-hidden="true">
            walk me? <Icon name="paw" />
          </span>
          <span className="pup-stage is-sit">
            <Art html={pupArt()} />
          </span>
          <span className="visually-hidden">Become the dog</span>
        </button>
      </div>
      <p className="scene-hint">
        <Icon name="spark" /> Poke the pumpkins, tap the moon, or take the pup for a walk.
      </p>
    </div>
  );
}

export function HumanPage(): ReactNode {
  const { name, roles, location, focus, bio, bioLove, education, jobs, skills, projects, achievements, graveyard } = portfolio;
  const github = safeUrl(portfolio.contact.github);
  const alias = safeUrl(portfolio.contact.githubAlias);
  const linkedin = safeUrl(portfolio.contact.linkedin);
  const email = emailHref(portfolio.contact.email);
  const resume = safeUrl(portfolio.contact.resume);
  const photo = safeUrl(portfolio.contact.photo);
  const repo = safeUrl(portfolio.contact.repo);
  const love = bio.endsWith(bioLove);
  const beforeLove = love ? bio.slice(0, -bioLove.length) : bio;
  const tagline = bio.split('. ').find((sentence) => /^Building\b/.test(sentence)) ?? roles;
  const currentJob = jobs.find((job) => parseSpan(job.dates).current);
  const [firstName] = name.split(' ');
  const roleList = roles.split(/\s+and\s+/);
  const graves = readyGraves(graveyard);
  const awards = achievements.map(parseAward);
  const firsts = awards.filter((award) => award.rank === 'first').length;
  const tagged = projects.map((project) => ({ project, tags: projectTags(project) }));
  const tagCounts = (Object.keys(TAG_LABELS) as ProjectTag[])
    .map((tag) => ({ tag, count: tagged.filter((item) => item.tags.includes(tag)).length }))
    .filter((item) => item.count > 0);
  const tickerSkills = skills.flatMap((group) => group.skills).slice(0, 26);
  const study = parseSpan(education.dates);
  const graduating = study.end !== null && study.end.getTime() > Date.now();
  const focusGroup = skills.find((group) => /focus/i.test(group.title));
  const toolGroups = skills.filter((group) => group !== focusGroup);

  const navItems: Array<[string, string, string]> = [
    ['about', 'About', 'home'],
    ['education', 'Education', 'cap'],
    ['experience', 'Experience', 'briefcase'],
    ['skills', 'Skills', 'book'],
    ['projects', 'Projects', 'candy'],
    ['achievements', 'Achievements', 'trophy'],
    ...(graves.length ? ([['graveyard', 'Graveyard', 'grave']] as Array<[string, string, string]>) : []),
    ['contact', 'Contact', 'mail'],
  ];

  return (
    <div className="page" id="human">
      <header className="topbar">
        <div className="topbar-inner">
          <a className="brand" href="#hero">
            <Art html={pupHead()} className="brand-mark" />
            <span className="brand-name">
              {firstName}
              <span className="brand-dot">.</span>
            </span>
            <span className="visually-hidden"> — back to the top</span>
          </a>
          <nav className="site-nav" id="site-nav" aria-label="Portfolio">
            <ul>
              {navItems.map(([id, label, glyph]) => (
                <li key={id}>
                  <a href={`#${id}`} data-nav={id}>
                    <Icon name={glyph} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="topbar-actions">
            <button type="button" className="icon-btn theme-toggle" data-theme-toggle="" aria-pressed="false" aria-label="Lights out">
              <Art html={icon('moon')} className="theme-icon-moon" />
              <Art html={icon('sun')} className="theme-icon-sun" />
            </button>
            <button type="button" className="btn btn-dog" data-enter-dog="">
              <Icon name="paw" />
              <span className="btn-dog-label">Become the dog</span>
            </button>
            <button type="button" className="icon-btn menu-toggle" aria-controls="site-nav" aria-expanded="false" aria-label="Open the menu">
              <Art html={icon('menu')} className="menu-icon-open" />
              <Art html={icon('close')} className="menu-icon-close" />
            </button>
          </div>
        </div>
        <div className="scroll-progress" aria-hidden="true">
          <span className="progress-fill" />
        </div>
      </header>

      <main id="main">
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hello">
              <Art html={ghost({ mouth: 'o' })} className="hello-ghost" />
              <span>Boo! Hi, I&rsquo;m</span>
            </p>
            {photo ? <img className="portrait" src={photo} alt={`Portrait of ${name}`} width="112" height="112" /> : null}
            <h1 id="hero-title">
              {name}
            </h1>
            <ul className="roles" aria-label="Roles">
              {roleList.map((role, index) => (
                <li key={role} className={`role-${index}`}>
                  {role}
                </li>
              ))}
            </ul>
            <p className="lede">{tagline.replace(/\.?$/, '.')}</p>
            <div className="hero-ctas">
              <button type="button" className="btn btn-primary btn-big" data-ask-pup="">
                <Icon name="chat" />
                Ask the pup
              </button>
              <button type="button" className="btn btn-lilac btn-big" data-enter-dog="">
                <Icon name="paw" />
                Become the dog
              </button>
            </div>
            <p className="hero-note">
              <Icon name="spark" />
              <span>
                Three tricks: ask the pup anything, have it <a href="#fetch">fetch a résumé for your role</a>, or become the dog and walk the village.
              </span>
            </p>
          </div>
          <HeroScene />
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <span className="ticker-run" key={copy}>
                {tickerSkills.map((skill) => (
                  <span className="ticker-item" key={`${copy}-${skill}`}>
                    {skill}
                    <span className="ticker-dot">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <section id="about" className="section" aria-labelledby="about-title">
          <SectionHead id="about-title" sticker={badgeGhost()} kicker="Hello, human" title="About me" decor={[ghost({ mouth: 'smile' }), candyCorn()]} />
          <div className="about-layout">
            <article className="card about-note">
              <Art html={pumpkin({ mouth: 'smile' })} className="note-pin" />
              <p className="about-hello">Hi, I&rsquo;m {firstName}!</p>
              <p className="about-bio">
                {beforeLove}
                {love ? (
                  <span id="fact-bio">
                    {bioLove}
                  </span>
                ) : null}
              </p>
              <button type="button" className="btn btn-small btn-plain" data-ask-pup="">
                <Icon name="chat" />
                Ask the pup about me
              </button>
            </article>
            <ul className="facts" aria-label="Quick facts">
              <li className="fact tint-pink" id="fact-bengaluru">
                <Icon name="pin" />
                <span>
                  <span className="fact-label">Based in</span>
                  <span className="fact-value">{location}</span>
                </span>
              </li>
              <li className="fact tint-lilac" id="fact-focus">
                <Icon name="spark" />
                <span>
                  <span className="fact-label">Focus</span>
                  <span className="fact-value">{focus}</span>
                </span>
              </li>
              {currentJob ? (
                <li className="fact tint-mint">
                  <Icon name="briefcase" />
                  <span>
                    <span className="fact-label">Right now</span>
                    <span className="fact-value">
                      {currentJob.role}, {currentJob.org}
                    </span>
                  </span>
                </li>
              ) : null}
              <li className="fact tint-sky">
                <Icon name="cap" />
                <span>
                  <span className="fact-label">Studying</span>
                  <span className="fact-value">{education.school}</span>
                </span>
              </li>
              <li className="fact tint-butter">
                <Icon name="trophy" />
                <span>
                  <span className="fact-label">Hackathons</span>
                  <span className="fact-value">
                    {awards.length} achievements, {firsts} first places
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section id="education" className="section band band-pink" aria-labelledby="education-title">
          <Art html={garland(0)} className="garland" />
          <SectionHead id="education-title" sticker={gradCap()} kicker="School days" title="Education" decor={[potion(), books()]} />
          <div className="edu-layout">
            <div className="edu-scene" aria-hidden="true">
              <Art html={heroStars()} className="edu-stars" />
              <Art html={moon()} className="edu-moon" />
              <Art html={academy()} className="edu-academy" />
              <Art html={books()} className="edu-books" />
              <span className="edu-pup is-sit" data-costume="grad">
                <Art html={pupArt()} />
              </span>
              <Art html={spiritArt('fieldowl', 'edu-owl-art')} className="edu-owl" />
            </div>
            <article className="card edu-card">
              <Art html={catPeek()} className="peeker peek-cat" />
              {graduating ? (
                <p className="card-label">
                  <Icon name="cap" />
                  Graduating {study.to}
                </p>
              ) : null}
              <h3>{education.school}</h3>
              <p className="edu-degree">{education.degree}</p>
              <ul className="edu-meta">
                <li>
                  <Icon name="pin" />
                  {education.location}
                </li>
                <li>
                  <Icon name="spark" />
                  {education.dates}
                </li>
                <li id="fact-cgpa" className="edu-cgpa">
                  {education.score}
                </li>
              </ul>
            </article>
          </div>
        </section>

        <section id="experience" className="section" aria-labelledby="experience-title">
          <SectionHead
            id="experience-title"
            sticker={questMap()}
            kicker="Quest log"
            title="Experience"
            sub={`${countWord(jobs.length)} ${jobNoun(portfolio)} so far.`}
            decor={[witchHat(), mushrooms()]}
          />
          <ol className="quest">
            {jobs.map((job, index) => {
              const span = parseSpan(job.dates);
              return (
                <li className={`quest-step tint-${TINTS[(index * 2) % TINTS.length]}`} key={`${job.role}-${job.org}`}>
                  <span className="quest-node" aria-hidden="true">
                    <Art html={jobArt(job.org)} />
                  </span>
                  <article className="card quest-card">
                    {span.current ? <span className="now-badge">Now</span> : null}
                    <p className="job-dates">{job.dates}</p>
                    <h3>{job.role}</h3>
                    <p className="job-org">{job.org}</p>
                    <ul className="job-points">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                </li>
              );
            })}
          </ol>
        </section>

        <section id="skills" className="section band band-mint" aria-labelledby="skills-title">
          <Art html={garland(2)} className="garland" />
          <SectionHead
            id="skills-title"
            sticker={spellbook()}
            kicker="Toolbox"
            title="Skills"
            sub="Languages, frameworks and tools, grouped by what they are for."
            decor={[potion('#93e5c3'), wrappedCandy({ color: '#ffa6c9' })]}
          />
          {focusGroup ? (
            <div className="focus-card">
              <Art html={ghostPeek()} className="peeker peek-ghost" />
              <Art html={spiritArt(focusGroup.id, 'focus-art-svg')} className="focus-art" />
              <div className="focus-text">
                <h3>{focusGroup.title}</h3>
                <ul className="focus-tags">
                  {focusGroup.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          <ul className="skill-grid">
            {toolGroups.map((group, index) => (
              <li className={`skill-card tint-${TINTS[index % TINTS.length]}${group.skills.length > 9 ? ' is-wide' : ''}`} key={group.id}>
                <div className="skill-head">
                  <Art html={spiritArt(group.id, 'skill-icon-svg')} className="skill-icon" />
                  <div>
                    <h3>{group.title}</h3>
                    <p className="skill-count">
                      {group.skills.length} {group.skills.length === 1 ? 'skill' : 'skills'}
                    </p>
                  </div>
                </div>
                <Tags items={group.skills} />
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <Art html={spiderDangle()} className="dangler" />
          <SectionHead
            id="projects-title"
            sticker={candyBucket()}
            kicker="Trick-or-treat bag"
            title="Projects"
            sub="Things built across AI, the cloud, blockchain and the web."
            decor={[lollipop(), candyCorn()]}
          />
          <div className="filters" role="group" aria-label="Filter projects">
            <button type="button" className="chip" data-filter="all" aria-pressed="true">
              All <span className="chip-count">{projects.length}</span>
            </button>
            {tagCounts.map(({ tag, count }) => (
              <button type="button" className="chip" data-filter={tag} aria-pressed="false" key={tag}>
                {TAG_LABELS[tag]} <span className="chip-count">{count}</span>
              </button>
            ))}
          </div>
          <p className="visually-hidden" aria-live="polite" data-filter-status=""></p>
          <div className="project-grid">
            {tagged.map(({ project, tags }, index) => {
              const title = splitTitle(project.name);
              return (
                <article
                  id={project.id}
                  className={`project-card tint-${TINTS[(index + 2) % TINTS.length]}${projects.length % 2 === 1 && index === projects.length - 1 ? ' is-wide' : ''}`}
                  data-short={project.shortName}
                  data-tags={tags.join(' ')}
                  key={project.id}
                >
                  <div className="project-art-wrap">
                    <Art html={projectArt(project.id)} className="project-figure" />
                    <ul className="project-kinds">
                      {tags.map((tag) => (
                        <li key={tag}>{TAG_LABELS[tag]}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="project-body">
                    <h3>
                      <span className="project-name">{title.short}</span>
                      {title.rest ? <span className="project-sub">{title.rest}</span> : null}
                    </h3>
                    <p className="project-summary">{project.summary}</p>
                    <Tags items={stackList(project.stack)} className="tags stack" />
                    <ProjectLinks project={project} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="achievements" className="section band band-butter" aria-labelledby="achievements-title">
          <Art html={garland(4)} className="garland" />
          <SectionHead
            decor={[star({ fill: '#ffa6c9' }), pumpkin({ hat: true })]}
            id="achievements-title"
            sticker={trophySticker()}
            kicker="Trophy shelf"
            title="Achievements"
          />
          <ol className="award-grid">
            {awards.map((award, index) => (
              <li id={`ach-${index}`} className={`award rank-${award.rank}`} key={award.text}>
                <Medal rank={award.rank} />
                <p className="award-place">{award.place}</p>
                <h3 className="award-event">{award.event}</h3>
                <p className="award-meta">
                  {award.venue}
                  {award.date ? ` · ${award.date}` : ''}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {graves.length ? (
          <section id="graveyard" className="section" aria-labelledby="graveyard-title">
            <SectionHead
              id="graveyard-title"
              sticker={tombstone()}
              kicker="Rest in pieces"
              title="Project graveyard"
              sub="Each stone keeps a name, the years, what happened, and what was learned."
            />
            <div className="grave-grid">
              {graves.map((entry, index) => (
                <article id={`grave-${index}`} className="grave-card" data-short={entry.name} key={entry.name}>
                  <Art html={tombstone()} className="grave-figure" />
                  <h3>{entry.name}</h3>
                  <p className="grave-years">{entry.years}</p>
                  <h4>What happened</h4>
                  <p>{entry.whatHappened}</p>
                  <h4>What was learned</h4>
                  <p>{entry.learned}</p>
                  {safeUrl(entry.repo) ? (
                    <a className="btn btn-small btn-plain grave-link" href={safeUrl(entry.repo) ?? undefined} target="_blank" rel="noopener noreferrer">
                      <Icon name="code" />
                      Source
                      <NewTab />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <section id="fetch" className="section fetch" aria-labelledby="fetch-title">
          <SectionHead
            id="fetch-title"
            sticker={bone()}
            kicker="Hiring? Play fetch"
            title="Fetch!"
            sub="Pick a role or paste a job post, then throw the ball. The pup brings back a one-page résumé made only from this portfolio."
            decor={[ball(), lollipop({ color: '#a9d05b' })]}
          />
          <div className="card fetch-panel">
            <div className="fetch-yard" aria-hidden="true">
              <Art html={cloud()} className="yard-cloud" />
              <span className="fetch-runner">
                <span className="fetch-flip">
                  <span className="fetch-stage is-sit">
                    <Art html={pupArt()} />
                  </span>
                  <Art html={bone()} className="fetch-bone" />
                </span>
              </span>
              <span className="fetch-ball">
                <Art html={ball()} className="fetch-ball-y" />
              </span>
              <Art html={pumpkin({ mouth: 'smile' })} className="yard-pumpkin" />
            </div>
            <form id="fetch-form" className="fetch-form">
              <fieldset className="fetch-roles">
                <legend>What are you hiring for?</legend>
                <div className="role-list">
                  {(Object.entries(ROLES) as Array<[RoleId, (typeof ROLES)[RoleId]]>).map(([id, role], index) => (
                    <label className="role-chip" key={id}>
                      <input type="radio" name="role" value={id} defaultChecked={index === 0} />
                      <span>{role.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="fetch-label" htmlFor="fetch-post">
                Or paste a job post (optional)
              </label>
              <textarea
                id="fetch-post"
                name="post"
                className="fetch-post"
                rows={4}
                maxLength={6000}
                placeholder="We're looking for an engineer who knows React, Python and AWS…"
              />
              <div className="fetch-row">
                <button type="submit" className="btn btn-primary btn-big">
                  <Icon name="paw" />
                  Throw the ball
                </button>
                <p className="fetch-privacy">
                  <Icon name="spark" />
                  Runs in your browser. Your text is never sent anywhere.
                </p>
              </div>
            </form>
          </div>
          <p className="visually-hidden" aria-live="polite" data-fetch-status=""></p>
          <div id="fetch-result" className="fetch-result" hidden></div>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="contact-panel">
            <Art html={heroStars()} className="contact-stars" />
            <Art html={batHang()} className="hang-bat bat-one" />
            <Art html={batHang()} className="hang-bat bat-two" />
            <SectionHead id="contact-title" sticker={batMail()} kicker="Bat mail" title="Contact" sub={`Find ${firstName} online.`} />
            <ul className="contact-links">
              {github ? (
                <li>
                  <a className="contact-card" href={github} target="_blank" rel="noopener noreferrer">
                    <Art html={icon('branch', 'icon contact-icon')} />
                    <span className="contact-text">
                      <span className="contact-name">GitHub</span>
                      <span className="contact-handle">{handle(github)}</span>
                    </span>
                    <Icon name="external" />
                    <NewTab />
                  </a>
                </li>
              ) : null}
              {alias && alias.toLowerCase() !== github?.toLowerCase() ? (
                <li>
                  <a className="contact-card" href={alias} target="_blank" rel="noopener noreferrer">
                    <Art html={icon('branch', 'icon contact-icon')} />
                    <span className="contact-text">
                      <span className="contact-name">GitHub</span>
                      <span className="contact-handle">{handle(alias)}</span>
                    </span>
                    <Icon name="external" />
                    <NewTab />
                  </a>
                </li>
              ) : null}
              {linkedin ? (
                <li>
                  <a className="contact-card" href={linkedin} target="_blank" rel="noopener noreferrer">
                    <Art html={icon('linkedin', 'icon contact-icon')} />
                    <span className="contact-text">
                      <span className="contact-name">LinkedIn</span>
                      <span className="contact-handle">{handle(linkedin)}</span>
                    </span>
                    <Icon name="external" />
                    <NewTab />
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a className="contact-card" href={email}>
                    <Art html={icon('mail', 'icon contact-icon')} />
                    <span className="contact-text">
                      <span className="contact-name">Email</span>
                      <span className="contact-handle">{portfolio.contact.email}</span>
                    </span>
                  </a>
                </li>
              ) : null}
              {resume ? (
                <li>
                  <a className="contact-card" href={resume} target="_blank" rel="noopener noreferrer">
                    <Art html={icon('book', 'icon contact-icon')} />
                    <span className="contact-text">
                      <span className="contact-name">Resume</span>
                      <span className="contact-handle">PDF</span>
                    </span>
                    <Icon name="external" />
                    <NewTab />
                  </a>
                </li>
              ) : null}
            </ul>
            <div className="contact-ground" aria-hidden="true">
              <Art html={tombstone()} className="ground-grave grave-a" />
              <Art html={tombstone({ text: 'BOO' })} className="ground-grave grave-b" />
              <Art html={pumpkin({ lit: true })} className="ground-pumpkin" />
              <Art html={ghost({ mouth: 'smile' })} className="ground-ghost" />
            </div>
          </div>
        </section>

        {/* Shown only when the Amplify backend exists (src/guestbook.ts). */}
        <section id="guestbook" className="section guestbook" aria-labelledby="guestbook-title" hidden>
          <SectionHead
            id="guestbook-title"
            sticker={candyBucket()}
            kicker="Before you go"
            title="Guestbook"
            sub="Leave a paw and a short note. The pup pins it to the board for the next visitor."
            decor={[lollipop(), wrappedCandy({ color: '#ffa6c9' })]}
          />
          <div className="paw-board">
            <Art html={garland(1)} className="board-lights" />
            <Art html={spiderDangle()} className="board-spider" />
            <Art html={pupArt()} className="board-pup is-sit" />
            <Art html={pumpkin({ mouth: 'smile' })} className="board-pumpkin" />
            <Art html={candyCorn()} className="board-candy" />
            <div id="guestbook-app"></div>
          </div>
        </section>

        <aside id="lantern-ending" className="ending" hidden>
          <h2 id="ending-title">The lanterns are lit</h2>
          <p>
            {`You are a lost little spirit pup who wandered into ${name}'s village on Halloween night. The cottage, the lantern workshop, and the night market are lit.`}
          </p>
          <blockquote>{bio}</blockquote>
        </aside>
      </main>

      <footer className="site-footer">
        <div className="garden" aria-hidden="true">
          <div className="garden-row">
            <Art html={gardenStrip()} />
            <Art html={gardenStrip()} />
            <Art html={gardenStrip()} />
          </div>
          <span className="garden-pup is-sleep">
            <Art html={pupArt()} />
          </span>
        </div>
        <div className="footer-row">
          <p className="footer-name">
            {name} · {location}
          </p>
          <span className="footer-links">
            {repo ? (
              <a className="btn btn-small btn-plain" href={repo} target="_blank" rel="noopener noreferrer">
                <Icon name="code" />
                Code for this site
                <NewTab />
              </a>
            ) : null}
            <a className="btn btn-small btn-plain" href="#hero">
              <Icon name="up" />
              Back to top
            </a>
          </span>
        </div>
      </footer>

      <button type="button" className="puppy-peek" data-ask-pup="">
        <span className="peek-bubble" aria-hidden="true">
          Ask me about {firstName}!
        </span>
        <Art html={pupHead()} className="peek-head" />
        <span className="visually-hidden">Ask the spirit pup</span>
      </button>
    </div>
  );
}
