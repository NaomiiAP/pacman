import { pupArt } from '../art/pup.ts';

export type Pose = 'idle' | 'walk' | 'sit' | 'sleep';
export type Costume = 'plain' | 'pumpkin' | 'ghost' | 'witch';

/** The walking pup. Poses and costumes are CSS classes from src/styles/pup.css. */
export function createDog(): {
  root: HTMLElement;
  setPose: (pose: Pose) => void;
  setCostume: (costume: Costume) => void;
  setFacingLeft: (left: boolean) => void;
} {
  const root = document.createElement('div');
  root.className = 'dog-anchor is-idle';
  root.innerHTML =
    `<div class="dog-flip" data-costume="plain">${pupArt()}</div>` +
    '<div class="zzz" aria-hidden="true"><span>z</span><span>z</span><span>Z</span></div>';
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
