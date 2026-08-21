# Portfolio Design System: "Systems Engineer"

## Philosophy
Restraint over flash. Information density. Engineering credibility.
The design itself should feel like it was built by someone who
understands memory layout and cache lines — tight, intentional, no waste.

One wow moment per section, then get out of the way.

---

## Color Palette

| Token           | Hex       | Usage                                      |
|-----------------|-----------|---------------------------------------------|
| bg-primary      | `#0a0e12` | Page background. Deeper than pure black.    |
| bg-elevated     | `#111820` | Cards, sections. Subtle lift.               |
| border-subtle   | `#1e293b` | Dividers, card borders. Barely visible.     |
| text-primary    | `#e2e8f0` | Headings, important text. Warm gray.        |
| text-secondary  | `#64748b` | Body text, metadata. Recedes when not needed|
| accent          | `#f59e0b` | Amber. ONE accent only. Links on hover,     |
|                 |           | active nav, your name in hero.              |
| terminal-green  | `#4ade80` | Sparingly. Command prompt `$`, status       |
|                 |           | indicators, one decorative element.         |

RULE: Never use more than one accent color in the same view.
Amber OR green, not both competing.

---

## Typography

| Role      | Font              | Weight    | Size        |
|-----------|-------------------|-----------|-------------|
| Body, UI  | Inter             | 400, 500  | 16px base   |
| Code,     | JetBrains Mono    | 400, 700  | 14px–16px   |
| terminal  |                   |           |             |
| Headings  | Inter             | 700, 800  | 32px–48px   |

Load both from Google Fonts in index.html.

---

## Layout

Single column, max-width 720px, centered.

Why 720px? Optimal line length for reading (55–75 characters).
Forces tight writing. No sidebar, no hero image eating 60% of viewport.

Spacing:
- Section gaps: 96px (mb-24)
- Inner padding: 32px (p-8)
- Text gaps: 16px–24px (mb-4 to mb-6)

---

## Sections (in order)

1. BOOT SEQUENCE (2s, once per session)
   BIOS v1.0.4... OK
   Memory test: 16384K... OK
   Loading kernel...
   [your name] portfolio v1.0.0 initialized
   $
   → fades to main terminal

2. TERMINAL HERO — functional shell
   $ whoami
   [Your Name]
   Systems programmer. I build the layer between hardware and everything else.
   
   The terminal accepts commands:
   - ls → lists sections
   - cat about.txt → shows career narrative
   - open github → opens your GitHub
   - clear → clears terminal
   - help → lists commands
   - neofetch → stylized system info block
   - rm -rf / → "nice try" easter egg

3. CAREER NARRATIVE
   3–4 sentences. Where you started → what obsessed you → what you do now.
   One metric if you have it.

4. FLAGSHIP PROJECT — interactive architecture diagram
   Boxes = services/processes. Lines = data flow.
   Click a box → expands: your role, tech, one challenge.
   Built with SVG + React state. No heavy library.

5. OTHER WORK — ls -la style list
   2–3 projects. Title + one line + link. No screenshots.

6. WRITING — cat article.md style
   2–3 posts. Title + date + one-line summary.
   Monospace with syntax highlighting for code blocks.

7. CONTACT
   $ echo "Get in touch"
   Email, GitHub, LinkedIn. Copy-to-clipboard on click.
   No form.

---

## Interactive Elements

- TYPEWRITER: on hero $ whoami line. Types once, stops. No loop.
- TERMINAL SHELL: full command parser, history, tab hints.
- ARCHITECTURE DIAGRAM: SVG boxes, click to expand.
- BOOT SEQUENCE: localStorage flag, plays once.
- EASTER EGGS: neofetch, rm -rf /, sudo.

---

## Background

Subtle ASCII noise or hex dump scrolling at 5% opacity.
Like cmatrix but restrained. OR 20 memory-address particles
drifting upward, fading out. One every 3 seconds.

---

## Sound (optional, OFF by default)

Mechanical keyboard click on terminal input.
Toggle: sound on / sound off. Web Audio API, one oscillator.
Never autoplay.

---

## Animation Rules

- No bounce, no elastic snap. Linear or ease-out only.
- 200ms max transitions.
- No gradients, no glassmorphism.

---

## Component Structure

src/
├── sections/
│   ├── BootSequence.tsx
│   ├── Hero.tsx              (terminal shell)
│   ├── Career.tsx
│   ├── Flagship.tsx          (interactive diagram)
│   ├── ProjectList.tsx
│   ├── Writing.tsx
│   └── Contact.tsx
├── components/
│   ├── Terminal.tsx          (reusable shell)
│   ├── Typewriter.tsx
│   └── ArchitectureDiagram.tsx
├── hooks/
│   ├── useTypewriter.ts
│   └── useTerminal.ts        (command parser, history)
├── App.tsx
├── main.tsx
└── index.css

---

## Tailwind Config Extensions

colors:
  sys-bg: '#0a0e12'
  sys-elevated: '#111820'
  sys-border: '#1e293b'
  sys-text: '#e2e8f0'
  sys-muted: '#64748b'
  sys-amber: '#f59e0b'
  sys-green: '#4ade80'

fontFamily:
  sans: ['Inter', 'system-ui', 'sans-serif']
  mono: ['JetBrains Mono', 'monospace']

maxWidth:
  content: '720px'

---

## Base Styles (index.css)

body: bg-sys-bg, text-sys-text, font-sans, antialiased
::selection: bg-sys-amber, text-sys-bg