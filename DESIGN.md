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

No accent color. Photography is shown in black and white. Form errors use `#e4826f`.

## Type

Two families, both self-hosted in `public/fonts` (OFL):

- **Bodoni Moda** (display optical size, weights 400–600) for large display type only: hero name, section titles, contact title, list-view work titles. Always weight 400, never below ~1.8rem, never italic.
- **Schibsted Grotesk** (variable 400–900) for everything else.

- Name in hero: Bodoni 400, `clamp(3.6rem, 12.8vw, 13.5rem)`, line-height .88, tracking -0.025em (19.5vw on mobile).
- Section titles: Bodoni 400, `clamp(2.6rem, 6.6vw, 6.5rem)`, tracking -0.02em.
- Contact title: Bodoni 400, up to 9.25rem.
- List-view work titles: Bodoni 400, up to 4.75rem.
- Metadata and controls (`.meta`): 500, .75rem, uppercase, tracking .09em.
- Body: 400, 1rem / 1.55.

## Layout

- Side gutter `clamp(1rem, 3.2vw, 3rem)`; section spacing `clamp(5.5rem, 12vw, 11rem)`.
- Section head: title left, controls right, hairline below.
- Work grid: two columns; every fifth item spans full width in 2.39:1 scope. One column under 760px.
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
