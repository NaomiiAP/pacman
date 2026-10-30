export type Pose = 'idle' | 'walk' | 'sit' | 'sleep';
export type Costume = 'plain' | 'pumpkin' | 'ghost' | 'witch';

const DOG_SVG = `
<svg class="dog" viewBox="0 0 200 160" aria-hidden="true">
  <ellipse cx="96" cy="140" rx="50" ry="8" fill="rgba(18,10,28,0.28)"/>
  <g class="tail">
    <path d="M46 96c-24 6-32-20-14-30" fill="none" stroke="#f6e7d4" stroke-width="12" stroke-linecap="round"/>
    <path d="M46 96c-24 6-32-20-14-30" fill="none" stroke="#3c2a4a" stroke-width="3" stroke-linecap="round"/>
  </g>
  <g class="leg leg-back">
    <rect x="62" y="104" width="16" height="32" rx="8" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="3"/>
  </g>
  <ellipse class="body" cx="96" cy="98" rx="48" ry="32" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="3"/>
  <g class="leg leg-front">
    <rect x="118" y="106" width="16" height="32" rx="8" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="3"/>
  </g>
  <g class="head">
    <g class="ear">
      <ellipse cx="132" cy="58" rx="12" ry="18" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="3"/>
      <ellipse cx="132" cy="62" rx="6" ry="10" fill="#f3b6b0"/>
    </g>
    <ellipse cx="156" cy="76" rx="30" ry="26" fill="#f6e7d4" stroke="#3c2a4a" stroke-width="3"/>
    <g class="eye-open">
      <circle cx="166" cy="74" r="8" fill="#2a1c38"/>
      <circle cx="168" cy="71" r="2.6" fill="#fff8ee"/>
    </g>
    <path class="eye-shut" d="M156 74h16" stroke="#2a1c38" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="178" cy="86" rx="7" ry="5" fill="#e8843a" stroke="#3c2a4a" stroke-width="2"/>
    <ellipse cx="150" cy="88" rx="6" ry="3.5" fill="#f3b6b0"/>
  </g>
  <g class="costume costume-pumpkin">
    <ellipse cx="96" cy="100" rx="42" ry="28" fill="#e8843a" stroke="#3c2a4a" stroke-width="3"/>
    <path d="M96 74v-14" stroke="#5f7d52" stroke-width="5" stroke-linecap="round"/>
    <path d="M82 100v18M96 92v26M110 100v18" stroke="#c4682a" stroke-width="2" fill="none"/>
  </g>
  <g class="costume costume-ghost">
    <path d="M54 72h88v36l-12 14-12-12-12 14-12-12-12 14-12-12-16 12z" fill="#fff8ee" stroke="#3c2a4a" stroke-width="3" opacity="0.94"/>
    <circle cx="86" cy="96" r="5" fill="#2a1c38"/>
    <circle cx="112" cy="96" r="5" fill="#2a1c38"/>
  </g>
  <g class="costume costume-hat">
    <ellipse cx="156" cy="50" rx="30" ry="7" fill="#2a1844" stroke="#3c2a4a" stroke-width="3"/>
    <path d="M138 50l18-30 18 30z" fill="#5b2a55" stroke="#3c2a4a" stroke-width="3"/>
    <rect x="150" y="24" width="12" height="7" rx="2" fill="#e8b84a" stroke="#3c2a4a" stroke-width="2"/>
  </g>
</svg>`;

export function createDog(): {
  root: HTMLElement;
  setPose: (pose: Pose) => void;
  setCostume: (costume: Costume) => void;
  setFacingLeft: (left: boolean) => void;
} {
  const root = document.createElement('div');
  root.className = 'dog-anchor is-idle';
  root.innerHTML = `<div class="dog-flip" data-costume="plain">${DOG_SVG}</div><div class="zzz" aria-hidden="true"><span>z</span><span>z</span><span>Z</span></div>`;
  const flip = root.querySelector('.dog-flip');
  if (!(flip instanceof HTMLElement)) throw new Error('Dog markup failed');
  return {
    root,
    setPose(pose) {
      root.classList.remove('is-idle', 'is-walk', 'is-sit', 'is-sleep');
      root.classList.add(`is-${pose}`);
    },
    setCostume(costume) {
      flip.dataset.costume = costume;
    },
    setFacingLeft(left) {
      root.classList.toggle('face-left', left);
    },
  };
}
