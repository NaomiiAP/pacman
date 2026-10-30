import { portfolio, type GraveEntry, type Project } from './portfolio.ts';

function esc(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
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
  if (trimmed.startsWith('mailto:')) return safeUrl(trimmed);
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return `mailto:${trimmed}`;
  return null;
}

function externalLink(href: string, label: string): string {
  const external = href.startsWith('http');
  const extra = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a class="btn" href="${esc(href)}"${extra}>${esc(label)}<span class="visually-hidden">${external ? ' (opens in a new tab)' : ''}</span></a>`;
}

const PAW = `<svg class="paw-icon" viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="42" rx="12" ry="10" fill="currentColor"/><ellipse cx="16" cy="24" rx="6" ry="8" fill="currentColor"/><ellipse cx="28" cy="15" rx="6" ry="8" fill="currentColor"/><ellipse cx="41" cy="15" rx="6" ry="8" fill="currentColor"/><ellipse cx="51" cy="26" rx="6" ry="8" fill="currentColor"/></svg>`;

function tags(list: string[]): string {
  return `<ul class="tags">${list.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function spiritSvg(id: string): string {
  const common = `viewBox="0 0 80 80" aria-hidden="true" class="spirit-art"`;
  const arts: Record<string, string> = {
    loomling: `<svg ${common}><ellipse cx="40" cy="48" rx="22" ry="18" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/><path d="M18 46 H62" stroke="#e8843a" stroke-width="3" fill="none"/><circle cx="32" cy="42" r="4" fill="#2a1c38"/><circle cx="48" cy="42" r="4" fill="#2a1c38"/><ellipse cx="28" cy="52" rx="4" ry="2.5" fill="#f3b6b0"/><ellipse cx="52" cy="52" rx="4" ry="2.5" fill="#f3b6b0"/><path d="M22 28c6-10 12-8 14 0" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/><path d="M44 28c2-8 8-10 14 0" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/></svg>`,
    plotmole: `<svg ${common}><ellipse cx="40" cy="46" rx="24" ry="20" fill="#6e8b5a" stroke="#3c2a4a" stroke-width="2.5"/><ellipse cx="40" cy="50" rx="12" ry="8" fill="#f3b6b0"/><circle cx="32" cy="42" r="4" fill="#2a1c38"/><circle cx="48" cy="42" r="4" fill="#2a1c38"/><rect x="22" y="58" width="6" height="12" rx="2" fill="#e8b84a"/><rect x="32" y="52" width="6" height="18" rx="2" fill="#e8843a"/><rect x="42" y="48" width="6" height="22" rx="2" fill="#f6e7d4"/><rect x="52" y="55" width="6" height="15" rx="2" fill="#c46b8a"/></svg>`,
    glyphmoth: `<svg ${common}><ellipse cx="28" cy="40" rx="16" ry="22" fill="#c46b8a" stroke="#3c2a4a" stroke-width="2.5"/><ellipse cx="52" cy="40" rx="16" ry="22" fill="#e8843a" stroke="#3c2a4a" stroke-width="2.5"/><ellipse cx="40" cy="46" rx="8" ry="16" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/><circle cx="36" cy="42" r="3" fill="#2a1c38"/><circle cx="44" cy="42" r="3" fill="#2a1c38"/><path d="M34 22 Q40 8 46 22" fill="none" stroke="#3c2a4a" stroke-width="2"/></svg>`,
    brushwisp: `<svg ${common}><path d="M40 14c10 10 16 22 12 36-6 4-18 4-24 0-4-14 2-26 12-36z" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/><circle cx="34" cy="40" r="3.5" fill="#2a1c38"/><circle cx="46" cy="40" r="3.5" fill="#2a1c38"/><ellipse cx="30" cy="48" rx="3" ry="2" fill="#f3b6b0"/><ellipse cx="50" cy="48" rx="3" ry="2" fill="#f3b6b0"/><rect x="36" y="58" width="8" height="14" rx="3" fill="#e8843a" stroke="#3c2a4a" stroke-width="2"/></svg>`,
    shellduck: `<svg ${common}><ellipse cx="46" cy="48" rx="20" ry="16" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/><path d="M22 46c8-16 28-16 36 0" fill="#e8b84a" stroke="#3c2a4a" stroke-width="2.5"/><ellipse cx="18" cy="50" rx="10" ry="6" fill="#e8843a" stroke="#3c2a4a" stroke-width="2.5"/><circle cx="40" cy="44" r="3.5" fill="#2a1c38"/><circle cx="54" cy="44" r="3.5" fill="#2a1c38"/><ellipse cx="36" cy="52" rx="3" ry="2" fill="#f3b6b0"/></svg>`,
    kitbranch: `<svg ${common}><path d="M24 30 L34 48 H22z" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/><path d="M56 30 L46 48 H58z" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/><ellipse cx="40" cy="50" rx="18" ry="16" fill="#e8843a" stroke="#3c2a4a" stroke-width="2.5"/><circle cx="33" cy="48" r="3.5" fill="#2a1c38"/><circle cx="47" cy="48" r="3.5" fill="#2a1c38"/><path d="M58 58c10 8 16-6 8-12" fill="none" stroke="#6e8b5a" stroke-width="3" stroke-linecap="round"/><path d="M66 50c6-8 2-14-4-8" fill="none" stroke="#6e8b5a" stroke-width="3" stroke-linecap="round"/></svg>`,
    fieldowl: `<svg ${common}><ellipse cx="40" cy="46" rx="20" ry="18" fill="#d8c4a4" stroke="#3c2a4a" stroke-width="2.5"/><path d="M22 34 L32 48 H20z" fill="#c46b8a" stroke="#3c2a4a" stroke-width="2.5"/><path d="M58 34 L48 48 H60z" fill="#c46b8a" stroke="#3c2a4a" stroke-width="2.5"/><circle cx="32" cy="46" r="6" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2"/><circle cx="48" cy="46" r="6" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2"/><circle cx="32" cy="46" r="3" fill="#2a1c38"/><circle cx="48" cy="46" r="3" fill="#2a1c38"/><path d="M36 54 h8 l-4 5z" fill="#e8843a"/><rect x="30" y="62" width="20" height="12" rx="2" fill="#fff8ee" stroke="#3c2a4a" stroke-width="2"/></svg>`,
    lanternkit: `<svg ${common}><rect x="28" y="18" width="24" height="8" rx="3" fill="#e8b84a" stroke="#3c2a4a" stroke-width="2.5"/><path d="M22 30 h36 v28 a12 12 0 0 1-36 0z" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/><circle cx="34" cy="44" r="3.5" fill="#2a1c38"/><circle cx="46" cy="44" r="3.5" fill="#2a1c38"/><path d="M30 28 l-6-8" stroke="#e8843a" stroke-width="3" stroke-linecap="round"/><path d="M50 28 l6-8" stroke="#e8843a" stroke-width="3" stroke-linecap="round"/><ellipse cx="34" cy="52" rx="3" ry="2" fill="#f3b6b0"/><ellipse cx="46" cy="52" rx="3" ry="2" fill="#f3b6b0"/></svg>`,
  };
  return (
    arts[id] ??
    `<svg ${common}><ellipse cx="40" cy="44" rx="22" ry="18" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="2.5"/><circle cx="32" cy="42" r="4" fill="#2a1c38"/><circle cx="48" cy="42" r="4" fill="#2a1c38"/><ellipse cx="30" cy="52" rx="4" ry="2" fill="#f3b6b0"/><ellipse cx="50" cy="52" rx="4" ry="2" fill="#f3b6b0"/></svg>`
  );
}

const HERO_ART = `<svg class="hero-art" viewBox="0 0 640 380" role="img" aria-label="A cream spirit pup beside a cottage under an autumn moon">
  <defs>
    <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2a1848"/>
      <stop offset="0.55" stop-color="#6a3a68"/>
      <stop offset="1" stop-color="#e07a45"/>
    </linearGradient>
  </defs>
  <rect width="640" height="380" rx="28" fill="url(#hero-sky)"/>
  <circle cx="520" cy="78" r="36" fill="#f6e7c8"/>
  <ellipse cx="150" cy="90" rx="54" ry="22" fill="#f6e7d4" opacity="0.85"/>
  <ellipse cx="300" cy="70" rx="70" ry="26" fill="#fff8ee" opacity="0.8"/>
  <ellipse cx="180" cy="300" rx="200" ry="70" fill="#3d5a45"/>
  <ellipse cx="460" cy="310" rx="220" ry="78" fill="#2e4636"/>
  <g stroke="#3c2a4a" stroke-width="3" stroke-linejoin="round">
    <path d="M250 250 L310 190 L370 250 Z" fill="#e8843a"/>
    <rect x="262" y="248" width="96" height="70" rx="8" fill="#f6e7d4"/>
    <rect x="292" y="274" width="28" height="44" rx="6" fill="#6a3a68"/>
    <rect x="270" y="262" width="18" height="16" rx="3" fill="#e8b84a"/>
    <rect x="332" y="262" width="18" height="16" rx="3" fill="#e8b84a"/>
  </g>
  <g stroke="#3c2a4a" stroke-width="3">
    <path d="M378 300c-22 4-28-18-8-24" fill="#f6e7d4"/>
    <ellipse cx="424" cy="300" rx="40" ry="22" fill="#f6e7d4"/>
    <rect x="400" y="308" width="12" height="22" rx="6" fill="#f6e7d4"/>
    <rect x="448" y="310" width="12" height="22" rx="6" fill="#f6e7d4"/>
    <ellipse cx="486" cy="286" rx="26" ry="20" fill="#f6e7d4"/>
    <ellipse cx="470" cy="262" rx="12" ry="16" fill="#f6e7d4"/>
    <ellipse cx="472" cy="268" rx="6" ry="9" fill="#f3b6b0"/>
    <circle cx="496" cy="282" r="4.5" fill="#2a1c38"/>
    <circle cx="498" cy="280" r="1.6" fill="#fff8ee"/>
    <ellipse cx="510" cy="294" rx="8" ry="5" fill="#e8843a"/>
    <ellipse cx="478" cy="296" rx="5" ry="3" fill="#f3b6b0"/>
  </g>
  <ellipse cx="120" cy="318" rx="16" ry="12" fill="#e8843a" stroke="#3c2a4a" stroke-width="3"/>
  <rect x="116" y="304" width="8" height="10" rx="2" fill="#6e8b5a" stroke="#3c2a4a" stroke-width="2"/>
  <circle cx="90" cy="150" r="3" fill="#e8b84a"/>
  <circle cx="560" cy="160" r="2.5" fill="#e8b84a"/>
  <circle cx="200" cy="140" r="2" fill="#fff8ee"/>
</svg>`;

function projectLinks(project: Project): string {
  const links = [
    project.source.trim() ? safeUrl(project.source) : null,
    project.demo.trim() ? safeUrl(project.demo) : null,
  ];
  const [source, demo] = links;
  if (!source && !demo) return '';
  return `<div class="actions">${source ? externalLink(source, 'Source') : ''}${demo ? externalLink(demo, 'Demo') : ''}</div>`;
}

function graveArticle(entry: GraveEntry, index: number): string {
  return `<article class="grave-card" id="grave-${index}" data-short="${esc(entry.name)}">
    <h3>${esc(entry.name)}</h3>
    <p class="grave-years">${esc(entry.years)}</p>
    <h4>What happened</h4>
    <p>${esc(entry.whatHappened)}</p>
    <h4>What I learned</h4>
    <p>${esc(entry.learned)}</p>
  </article>`;
}

export function renderPortfolio(): string {
  const { name, roles, location, focus, bio, bioLove, education, jobs, skills, projects, achievements, graveyard } = portfolio;
  const github = safeUrl(portfolio.contact.github);
  const alias = safeUrl(portfolio.contact.githubAlias);
  const linkedin = safeUrl(portfolio.contact.linkedin);
  const email = emailHref(portfolio.contact.email);
  const resume = safeUrl(portfolio.contact.resume);
  const photo = safeUrl(portfolio.contact.photo);

  const contactItems = [
    github ? `<li>${externalLink(github, 'GitHub')}</li>` : '',
    alias && alias !== github ? `<li>${externalLink(alias, 'GitHub · naomiiAP')}</li>` : '',
    linkedin ? `<li>${externalLink(linkedin, 'LinkedIn')}</li>` : '',
    email ? `<li><a class="btn" href="${esc(email)}">Email</a></li>` : '',
    resume ? `<li>${externalLink(resume, 'Resume')}</li>` : '',
  ].join('');

  const photoHtml = photo
    ? `<img class="portrait" src="${esc(photo)}" alt="Portrait of ${esc(name)}" width="96" height="96" />`
    : '';

  const beforeLove = bio.endsWith(bioLove) ? bio.slice(0, -bioLove.length) : bio;
  const bioHtml = bio.endsWith(bioLove)
    ? `${esc(beforeLove)}<span id="fact-bio" data-bone>${esc(bioLove)}</span>`
    : `<span id="fact-bio" data-bone>${esc(bio)}</span>`;

  const jobsHtml = jobs
    .map(
      (job) => `<article class="job">
        <h3>${esc(job.role)}</h3>
        <p class="meta">${esc(job.org)} · ${esc(job.dates)}</p>
        ${job.points.map((point) => `<p>${esc(point)}</p>`).join('')}
      </article>`,
    )
    .join('');

  const skillsHtml = skills
    .map(
      (group) => `<article class="spirit-card">
        <button type="button" class="spirit-btn" data-spirit="${esc(group.id)}" aria-pressed="false">
          ${spiritSvg(group.id)}
          <span class="spirit-name">${esc(group.spirit)}</span>
          <span class="spirit-role">${esc(group.title)}</span>
        </button>
        ${tags(group.skills)}
      </article>`,
    )
    .join('');

  const projectsHtml = projects
    .map((project) => {
      const stack = project.stack.split(',').map((part) => part.trim()).filter(Boolean);
      return `<article class="project-card" id="${esc(project.id)}" data-short="${esc(project.shortName)}">
        <h3>${esc(project.name)}</h3>
        ${tags(stack)}
        <p>${esc(project.summary)}</p>
        ${projectLinks(project)}
      </article>`;
    })
    .join('');

  const achievementsHtml = achievements
    .map((item, index) => `<li id="ach-${index}" data-bone>${esc(item)}</li>`)
    .join('');

  const gravesHtml = graveyard.map((entry, index) => graveArticle(entry, index)).join('');

  return `<div class="page" id="human">
    <header class="site-header">
      <div class="brand-lockup">
        ${photoHtml}
        <div>
          <p class="brand">${esc(name)}</p>
          <p class="roles">${esc(roles)}</p>
          <p class="loc" id="fact-bengaluru" data-bone>${esc(location)}</p>
        </div>
      </div>
      <button type="button" class="btn btn-dog" data-enter-dog>${PAW}Become the dog</button>
    </header>
    <nav class="site-nav" aria-label="Portfolio">
      <a href="#about">About</a>
      <a href="#skills">Tech Superpowers</a>
      <a href="#projects">Projects</a>
      <a href="#graveyard">Graveyard</a>
      <a href="#contact">Contact</a>
    </nav>
    <main>
      <section class="hero sheet" aria-labelledby="hero-title">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="kicker">A Halloween village</p>
            <h1 id="hero-title">${esc(name)}</h1>
            <p class="lede">${bioHtml}</p>
            <ul class="hero-facts">
              <li id="fact-focus" data-bone>Focus: ${esc(focus)}</li>
              <li>${esc(education.school)}</li>
            </ul>
          </div>
          <div class="hero-art-wrap">${HERO_ART}</div>
        </div>
      </section>
      <section id="about" class="sheet">
        <h2 id="about-title">About</h2>
        <article class="education">
          <h3>${esc(education.school)}</h3>
          <p>${esc(education.degree)}</p>
          <p class="meta">${esc(education.location)} · ${esc(education.dates)}</p>
          <p id="fact-cgpa" data-bone>${esc(education.score)}</p>
        </article>
        <h3 class="subhead">Experience</h3>
        ${jobsHtml}
      </section>
      <section id="skills" class="sheet">
        <h2 id="skills-title">Tech Superpowers</h2>
        <div class="skill-grid">${skillsHtml}</div>
        <aside id="spirit-journal" aria-live="polite">
          <h3>Spirit Journal</h3>
          <p class="journal-empty">Boop a spirit to keep it in the journal.</p>
          <ul></ul>
        </aside>
      </section>
      <section id="projects" class="sheet">
        <h2 id="projects-title">Projects and achievements</h2>
        <div class="project-grid">${projectsHtml}</div>
        <h3 class="subhead">Achievements</h3>
        <ul class="achievements">${achievementsHtml}</ul>
      </section>
      <section id="graveyard" class="sheet">
        <h2 id="graveyard-title">Project graveyard</h2>
        <p>Abandoned projects. Each stone keeps the name, the years, what happened, and what I learned.</p>
        <div class="grave-grid">${gravesHtml}</div>
      </section>
      <section id="contact" class="sheet">
        <h2 id="contact-title">Contact</h2>
        ${contactItems ? `<ul class="contact-links">${contactItems}</ul>` : ''}
        <div id="guestbook" hidden></div>
      </section>
      <aside id="lantern-ending" hidden>
        <h2 id="ending-title">The lanterns are lit</h2>
        <p>You are a lost little spirit pup who wandered into ${esc(name)}'s village on Halloween night. The cottage, the lantern workshop, and the night market are lit.</p>
        <blockquote>${esc(bio)}</blockquote>
      </aside>
    </main>
    <footer class="site-footer">
      <p>${esc(name)} · ${esc(location)}</p>
    </footer>
    <button type="button" class="puppy-peek" data-enter-dog>
      <span class="speech">psst… become the dog</span>
      <svg class="puppy" viewBox="0 0 120 100" aria-hidden="true">
        <ellipse cx="24" cy="62" rx="16" ry="22" transform="rotate(-28 24 62)" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="3"/>
        <ellipse cx="96" cy="62" rx="16" ry="22" transform="rotate(28 96 62)" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="3"/>
        <ellipse cx="26" cy="66" rx="8" ry="12" transform="rotate(-28 26 66)" fill="#f3b6b0"/>
        <ellipse cx="94" cy="66" rx="8" ry="12" transform="rotate(28 94 66)" fill="#f3b6b0"/>
        <ellipse cx="60" cy="62" rx="34" ry="28" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="3"/>
        <circle cx="46" cy="58" r="6" fill="#2a1c38"/>
        <circle cx="74" cy="58" r="6" fill="#2a1c38"/>
        <circle cx="48" cy="56" r="2" fill="#fff8ee"/>
        <circle cx="76" cy="56" r="2" fill="#fff8ee"/>
        <ellipse cx="60" cy="72" rx="8" ry="6" fill="#e8843a" stroke="#3c2a4a" stroke-width="2"/>
        <ellipse cx="40" cy="70" rx="6" ry="3" fill="#f3b6b0"/>
        <ellipse cx="80" cy="70" rx="6" ry="3" fill="#f3b6b0"/>
      </svg>
      <span class="visually-hidden">Become the dog</span>
    </button>
  </div>`;
}
