# Spirit Pup Portfolio Plan

Oct 30, 2026 · @dssehelkjgok

## Don't let the dog block the portfolio

Build a normal, readable portfolio first and make the dog world an opt-in mode. The rules say the creative feature needs a visible hint and can't get in the way of navigation. Usability on desktop and mobile is 20% of the score.

- **Base layer:** a portfolio in the kawaii Halloween theme with About, Skills and Projects.
- **Entry point:** a big "Become the dog" button with a paw icon, or a puppy peeking from a corner.
- **Inside explore mode:** a small map that jumps to any section, plus a "Back to human" button.
- **Real text:** keep About, Skills and Projects as HTML text, not painted into a game canvas. Gate 1 includes AI scoring, and an automated reviewer probably can't read text drawn inside a canvas.

## Give the dog a reason to exist

Judges score how well the feature reflects you, so the dog needs a personal reason to be there.

- **Your real dog:** if you have or had one, make it that dog, with its real name.
- **A story hook:** "You're a lost little spirit pup who wandered into \[your name\]'s village on Halloween night. Find 3 memory lanterns to get home."
  - The three lanterns are About, Skills and Projects.
  - Finding all three plays an ending scene with a note from you.

## Things only a dog can do

These mechanics make it a dog game rather than a generic avatar walking around.

| Mechanic | What it does |
| --- | --- |
| Sniff | Hold S and glowing scent trails lead to hidden things. This also covers the "visible hint" rule. |
| Dig | Dirt mounds hide bones, which are your certs, achievements and fun facts. |
| Fetch | Throw a ball and the pup brings back a project card. |
| Bark | Wakes sleeping ghosts, who pop up and explain a skill. |
| Zoomies | Hold Shift to sprint, with leaves flying behind. |
| Idle | Leave it for 10 seconds and it curls up asleep with little Zzz's while ghosts sneak out. |
| Costumes | Pumpkin, bedsheet ghost, witch hat or vampire cape, each one re-skinning the world a little. |

## World and scene ideas

The world is a tiny autumn village at dusk, where each building is one portfolio section.

- **Village buildings as sections:**
  - Your cottage is About.
  - A lantern workshop is Skills.
  - A spirit night market, with one stall per project, is Projects.
  - A crooked mailbox is Contact.
- **Skills as a spirit bestiary:** each skill is a little creature, like a cloud spirit for AWS or a snake ghost for Python. Booping one adds it to your "Spirit Journal," which doubles as your actual skills list.
- **Project graveyard:** tombstones for abandoned side projects, like "RIP my first todo app, 2024–2024." Clicking one shows what you learned. It's funny and honest, and it feeds the "challenges and learnings" part of the write-up.
- **Trick-or-treat doors:** "Treat" shows a project, "Trick" shows a bug or blooper story.
- **Sky synced to the visitor's local time:** golden hour, dusk, or moonlit night with the lanterns lit.
- **Resume as a treasure map** that the pup finds at the end.

## Getting the Ghibli feel without copying

Use the techniques behind the look, but invent your own spirits. The look mostly comes from:

- painted, layered backgrounds
- wind rippling through grass
- huge soft clouds
- lovingly animated food
- quiet moments where nothing happens

In practice that means parallax layers, a paper-grain overlay and slow wind. Avoid Totoro, soot-sprite or No-Face lookalikes. Those characters are copyrighted, this is a public site, and an original creature scores better on "distinctive" anyway.

## Animation: pick 3 hero moments and nail them

Three polished moments beat twenty half-finished ones.

- **Opening scene:** the camera drifts down from the moon through clouds, and the pup wakes up in a basket on a porch. Make it skippable.
- **Section transitions:** a gust of leaves sweeps across the screen, or a lantern-shaped wipe.
- **Cursor as a paw:** clicks leave paw prints that fade.
- **Sound, off by default with a toggle:** a music-box loop, crunchy leaf footsteps, a tiny "boof."

### Scroll = walk

Scrolling walks the dog through a side-scrolling village, with arrow keys also working on desktop. This fixes mobile in one move: no joystick, works on phones, and it still behaves like a normal page.

### Stack

- GSAP for the opening scene and scroll animation
- Rive or sprite sheets for the dog's states (idle, walk, sniff, dig, sleep)
- Plain HTML/CSS for the content
- Skip 3D, which is too slow to build in a week

### Performance

Compress images to webp, lazy-load scenes, and respect reduced-motion settings. A gorgeous site that takes 12 seconds to load on a phone loses points.

## AWS points (25% of the score)

One small backend feature beyond Amplify Hosting gives you something real to document. Pick one or two:

- **Paw-print guestbook:** visitors leave a paw and a short message on a wall, stored in DynamoDB through Amplify's data backend.
- **Visit counter:** "X spirits visited tonight."
- **Spirit voices with Amazon Polly:** generate the voice lines once and ship them as audio files.

A clean architecture diagram in your write-up matters more than how many services you use.

## 7-day build plan

The deadline is Nov 6, 11:59 PM PST, which is Nov 7, 2026 at 1:29 PM IST. Aim to submit on Nov 5, 2026 (Thursday night).

- [ ] **Fri–Sat:** a plain themed portfolio with all 3 sections, deployed. This is your safety net.
- [ ] **Sun–Mon:** village scene, parallax, scroll-to-walk dog, buildings linked to sections.
- [ ] **Tue:** sniff and dig, bones, Spirit Journal, transitions.
- [ ] **Wed:** opening scene, sound, guestbook, and a pass on mobile and reduced motion.
- [ ] **Thu:** write-up, screenshots, GIFs, architecture diagram, then submit.
- [ ] **Fri:** buffer.

Screen-record as you build. A GIF of the pup sniffing out a hidden project will sell it to judges better than any paragraph.
