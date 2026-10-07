# Design

Production-company register in the line of A24 and Samba Films: near-black ground, the images and the film titles carry the page, nothing decorative competes with the work.

## Color

| Token | Value | Use |
|---|---|---|
| `--ink` | `#0b0b0a` | Page ground |
| `--ink-2` | `#141413` | Image placeholders |
| `--ink-3` | `#1e1e1c` | Scrollbar thumb, featured placeholder |
| `--bone` | `#ecebe6` | Text, primary buttons, selection |
| `--bone-dim` | `#a3a29c` | Secondary text, descriptions, labels |
| `--bone-faint` | `#8a8983` | Quietest text (≥4.5:1 on ink) |
| `--rule` | `rgba(236,235,230,.16)` | Hairline section and list rules |
| `--rule-strong` | `rgba(236,235,230,.4)` | Input underlines, outlined controls |

Ground pattern: soft out-of-focus discs and thin lens rings (`public/images/pattern.svg`, tiled vertically, scrolls with the page). Ground texture: a fixed film-grain layer (`public/images/grain.png`, 7.5% opacity, jittered in 6 steps like projected film, static with reduced motion), a soft edge vignette, and a faint light falloff from the top of the page. The player sits above the grain so videos play clean.

No accent color. Behind-the-scenes photography is shown in black and white; film stills inside a work's sheet keep their own color. Form errors use `#e4826f`.

## Type

Two families, both self-hosted in `public/fonts` (OFL):

- **Noto Serif Display**, cut at 80% width (weights 200–400), for large display type only: hero name, section titles, contact title, list-view work titles. Weights 360–380 (lighter loses legibility over photos), never below ~2rem, never italic.
- Filmic treatment on every display-face title: the bone fill is a background clipped to the glyphs with a dark grain tile (`public/images/grain-ink.png`) over it, plus a two-step bloom (`drop-shadow`) like a mist filter. The box is padded so accents and descenders keep their fill.
- **Schibsted Grotesk** (variable 400–900) for everything else, kept light: 400 for running text, 500 for titles and labels.

- Name in hero: 380, soft text-shadow, `clamp(4rem, 14vw, 15rem)`, line-height .86, tracking -0.03em (23vw on mobile).
- Section titles: 360, `clamp(3rem, 7.4vw, 7.5rem)`, tracking -0.025em.
- Contact title: 360, up to 10.5rem.
- List-view work titles: 360, up to 5.5rem.
- Wordmark: 500, tracking .22em, uppercase.
- Metadata and controls (`.meta`): 500, .75rem, uppercase, tracking .13em.
- Body: 400, 1rem / 1.55.

## Layout

- Side gutter `clamp(1rem, 3.2vw, 3rem)`; section spacing `clamp(5.5rem, 12vw, 11rem)`.
- Section head: title left, controls right, hairline below.
- Work gallery: one large frame per row in a single column (Samba-style reel), each video's own YouTube thumbnail, uncropped and unfiltered. Reel items are centered. Caption: title in the display face with the roles in `.meta` under it, position ("01 / 14") on the right. Vertical Shorts get a 9:16 frame at a narrower width; the player switches to 9:16 for them.
- Work sheet (optional per work, e.g. the latest short): under the caption, a hairline, then synopsis (2/3) and festival selections in the display face (1/3), then the film stills in a 2-column 3:2 grid, same width as the frame.
- About (Samba-style): wide 21:9 set photo, role heading in the display face with the statement beside it, then a 4:5 portrait photo next to the bio.
- Services and contact: 5/7 split, intro sticky on desktop.
- Images are frameless: no borders, radius or shadows.

## Components

- Pill buttons in bone on ink (`.btn`, play chips), outlined pill for secondary controls (view toggle, player close).
- Links: underline grows from the left on hover (`.link-line`).
- Player: full-screen near-black overlay, 16:9 stage, Esc / close / backdrop to dismiss, focus trapped.

## Motion

- Easing: `--ease-out` `cubic-bezier(.23,1,.32,1)`, `--ease-out-expo` `cubic-bezier(.16,1,.3,1)`, `--ease-in-out` `cubic-bezier(.77,0,.175,1)`.
- One authored moment: the hero name rises from a mask on load (1.1s, 90ms stagger), then roles and featured film fade in.
- Hero stills crossfade every 5.2s (1.6s) with a slow settle from 1.08 scale; paused when the tab is hidden.
- Hover effects only behind `(hover: hover) and (pointer: fine)`; buttons scale to .97 on press.
- `prefers-reduced-motion`: no slideshow, no scale, near-instant transitions.
