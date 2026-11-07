/**
 * ============================================================
 * THE ONLY FILE TO EDIT FOR PERSONAL CONTENT
 * ============================================================
 * Contact links, the profile photo, project Source/Demo URLs,
 * and project-graveyard entries all live in this file.
 * A Vite plugin injects them into index.html at dev and build
 * time, so the built page contains real HTML.
 *
 * Empty contact strings and empty project links are left out of
 * the page. There is no "TODO" label.
 * `npm run build` warns about every [PLACEHOLDER] and every
 * empty contact field below.
 *
 * Photo: put an image in public/ (for example public/portrait.webp)
 * and set `contact.photo` to "/portrait.webp".
 *
 * Graveyard: replace the [PLACEHOLDER] strings. Add another object
 * to the `graveyard` array to add a tombstone. No other file needs
 * to change.
 * ============================================================
 */

export type Contact = {
  github: string;
  /** Second GitHub profile. Leave "" to hide. Not part of the empty-field warning. */
  githubAlias: string;
  linkedin: string;
  /** Address only, such as name@school.edu. Leave "" to hide. */
  email: string;
  /** URL or a path such as /resume.pdf. Leave "" to hide. */
  resume: string;
  /** URL or a public/ path such as /portrait.webp. Leave "" to hide. */
  photo: string;
  /** GitHub link to this website's own code, shown in the footer. Leave "" to hide. */
  repo: string;
};

export type Project = {
  id: string;
  name: string;
  /** Short label used on a night-market stall. */
  shortName: string;
  stack: string;
  summary: string;
  /** Leave "" to hide the Source button. */
  source: string;
  /** Leave "" to hide the Demo button. */
  demo: string;
};

export type GraveEntry = {
  name: string;
  /** Example once you know it: "2024–2024" */
  years: string;
  whatHappened: string;
  learned: string;
  /** Link to the code. Leave "" to hide the Source button. */
  repo: string;
};

export type SkillGroup = {
  /** Picks the little drawing shown next to the group. */
  id: string;
  title: string;
  skills: string[];
};

export type Job = {
  role: string;
  org: string;
  dates: string;
  points: string[];
};

/**
 * All personal content for the site. The page, the pup's answers and the
 * Fetch résumé are all built from this one object.
 */
export const portfolio = {
  name: 'Naomi Andrea Pereira',
  roles: 'Full Stack Developer and AI/ML Engineer',
  location: 'Bengaluru, India',
  focus: 'AI/ML',
  bio: 'I am a Full Stack Developer and AI/ML Engineer. Building intelligent systems with Agentic Systems, RAG, multimodal AI, and scalable full-stack solutions. I love clean code, bold designs, and pushing the boundaries of what\'s possible on the web.',
  bioLove: 'I love clean code, bold designs, and pushing the boundaries of what\'s possible on the web.',

  contact: {
    github: 'https://github.com/Naomiiap',
    githubAlias: 'https://github.com/naomiiAP',
    linkedin: 'https://www.linkedin.com/in/naomi-pereira-36b5bb28b',
    email: '',
    resume: '',
    photo: '',
    repo: 'https://github.com/paccmann218/portfolio',
  } satisfies Contact,

  education: {
    school: 'Ramaiah Institute of Technology',
    degree: 'B.E. Information Science and Engineering',
    location: 'Bengaluru',
    dates: 'October 2023 – August 2027',
    score: 'CGPA 9.67 / 10.00',
  },

  jobs: [
    {
      role: 'Project Intern',
      org: 'Hewlett Packard Enterprise',
      dates: 'March 2026 – Present',
      points: [
        "Built an internal tool to automate software recipe detection for Hewlett Packard Enterprise's Private Cloud platform, mapping deployed Helm chart versions to component recipes by integrating Kubernetes cluster data, Git history, and a dynamic web UI.",
      ],
    },
    {
      role: 'Research Intern',
      org: 'Samsung R&D Institute',
      dates: 'November 2025 – March 2026',
      points: [
        'Implemented a real-time, GPU-accelerated pipeline to simulate anamorphic lens effects from standard spherical sensor data.',
        'Integrated custom geometric transformation shaders into the imaging stack to enable high-fidelity projection remapping at real-time frame rates.',
      ],
    },
    {
      role: 'Frontend Development Intern',
      org: 'Fintervue (Remote)',
      dates: 'December 2024 – February 2025',
      points: [
        'Designed and developed the frontend of the Fintervue website.',
        'Worked on an AI-powered interviewer and resume analyser.',
      ],
    },
  ] satisfies Job[],

  skills: [
    {
      id: 'loomling',
      title: 'Web development',
      skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Next.js', 'FastAPI', 'Flask'],
    },
    {
      id: 'plotkin',
      title: 'Libraries and tools',
      skills: ['NumPy', 'Pandas', 'Matplotlib'],
    },
    {
      id: 'glyphmoth',
      title: 'Languages',
      skills: ['Python', 'C', 'C++', 'Dart', 'Solidity'],
    },
    {
      id: 'brushwisp',
      title: 'Web design',
      skills: ['Figma', 'Canva'],
    },
    {
      id: 'brewbase',
      title: 'Databases',
      skills: ['MySQL', 'MongoDB'],
    },
    {
      id: 'kitbranch',
      title: 'Other',
      skills: ['Git', 'REST APIs', 'Problem Solving', 'Blockchain'],
    },
    {
      id: 'fieldowl',
      title: 'Also used in project work',
      skills: [
        'BERT',
        'Vision Transformer (ViT)',
        'Scikit-Learn',
        'TF-IDF',
        'perceptual hashing',
        'Sepolia',
        'Remix',
        'Ether.js',
        'IPFS',
        'SQLite',
        'MobileNetV2',
        'NLP',
        'Kubernetes',
        'Helm',
        'GPU shaders',
      ],
    },
    {
      id: 'lanternkit',
      title: 'Focus areas',
      skills: [
        'Agentic systems',
        'RAG',
        'multimodal AI',
        'full-stack products',
        'blockchain credentials and authentication',
      ],
    },
  ] satisfies SkillGroup[],

  projects: [
    {
      id: 'project-repowatch',
      name: 'RepoWatch — Always-On GitHub Issue Triage Agent',
      shortName: 'RepoWatch',
      stack: 'AWS Lambda, Amazon Bedrock Nova, EventBridge Scheduler, CloudWatch Logs, AWS SAM, GitHub API',
      summary:
        'An always-on AI agent that checks open GitHub issues every 10 minutes, asks Amazon Bedrock Nova to triage each new one, then posts the severity, complexity, area and first steps as a comment and adds labels. Built for the AWS Builder Center Always-On Agent Weekend Challenge.',
      source: 'https://github.com/NaomiiAP/Always-on-AI-Agent--RepoWatch',
      demo: '',
    },
    {
      id: 'project-accps',
      name: 'ACCPS — AI Content Copyright System',
      shortName: 'ACCPS',
      stack: 'Next.js, FastAPI, Sepolia, Remix, Scikit-Learn',
      summary:
        'Blockchain-based product authentication and counterfeit detection using lightweight TF-IDF and perceptual hashing.',
      source: 'https://github.com/Byte-Sized-Brain/accps',
      demo: 'https://accps.vercel.app/',
    },
    {
      id: 'project-emotisense',
      name: 'Emotisense — AI-Powered Emotion Analysis',
      shortName: 'Emotisense',
      stack: 'React, Node.js, Python, BERT, ViT',
      summary:
        'An AI-based emotion detection system using BERT for text and a Vision Transformer for images. Fine-tuned models on benchmark datasets.',
      source: '',
      demo: '',
    },
    {
      id: 'project-wanderly',
      name: 'Wanderly — Smart Travel Companion',
      shortName: 'Wanderly',
      stack: 'Next.js, Flask, SQLite, Solidity',
      summary:
        'AI-driven travel platform with adaptive itinerary generation and blockchain-based memories. Voice-first trip planning included.',
      source: '',
      demo: '',
    },
    {
      id: 'project-eduvault',
      name: 'EduVault — Decentralized Academic Records',
      shortName: 'EduVault',
      stack: 'React, Solidity, Ether.js, IPFS',
      summary:
        'A secure, blockchain-based platform for storing and verifying academic records, changing credential verification and preventing fraud.',
      source: 'https://github.com/naomiiAP/eduvault',
      demo: 'https://eduvault-woad.vercel.app/',
    },
    {
      id: 'project-agriassist',
      name: 'AgriAssist — Smart Farming Assistant',
      shortName: 'AgriAssist',
      stack: 'MobileNetV2, NLP, Yield Prediction',
      summary:
        'Multilingual farming assistant with crop disease detection, yield prediction, and a voice-enabled chatbot for accessibility.',
      source: 'https://github.com/NaomiiAP/AgriAssist',
      demo: '',
    },
  ] satisfies Project[],

  achievements: [
    'First Commit Hackathon (Ship It track) — Winner — WeMakeDevs × AWS Bharat Builds Tour — September 2026',
    "Google X Deepstation Hackathon — 1st Place — MSRIT Bangalore — May 2026",
    'Code2Create 2026 — 1st Place — MSRIT ACM — May 2026',
    'Athernex Hackathon — 2nd Place — BMSCE Bangalore — April 2026',
    'Hack-A-War Hackathon — 1st Place — MSRIT Bangalore — April 2026',
    'SustainAI Buildathon — 1st Place — MSRIT Bangalore — April 2026',
    'Mindscape Hackathon — 2nd Place — BNMIT Bangalore — July 2025',
    "Code-A-Thon Hackathon — 3rd Place — MIT Bangalore — April 2025",
    "Code Red '25 — Consolation Prize — BMSIT — January 2025",
    'Smart India Hackathon (SIH) 2024 — Runner-up — LPU Punjab — December 2024',
  ],

  /**
   * Project graveyard. Replace every [PLACEHOLDER].
   * Each object becomes one tombstone and one card.
   * Fields: name, years, whatHappened, learned, repo.
   */
  graveyard: [
    {
      name: 'Assignment Decoder',
      years: '2026–2026',
      whatHappened: 'Turned assignment PDFs into a due date and a plan with Bedrock. A weekend build, now offline.',
      learned: 'Scope beats cleverness: one model and a good prompt were enough.',
      repo: 'https://github.com/NaomiiAP/assignment-decoder',
    },
    {
      name: 'DawnVerse',
      years: '2026–2026',
      whatHappened: 'A Lambda that woke at 6 AM to write a fresh poem with Bedrock. Its gallery is offline now.',
      learned: 'An always-on agent is mostly the trigger, not the model.',
      repo: 'https://github.com/NaomiiAP/dawnverse',
    },
    {
      name: '[PLACEHOLDER] Third buried project',
      years: '[PLACEHOLDER] years',
      whatHappened: '[PLACEHOLDER] One line about what happened.',
      learned: '[PLACEHOLDER] What you learned from setting it down.',
      repo: '',
    },
  ] satisfies GraveEntry[],
};

export type Portfolio = typeof portfolio;
