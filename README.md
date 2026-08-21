# Massimiliano Baglioni — Portfolio

A personal portfolio website showcasing projects, experience and background information. The site includes an interactive terminal UI and a configurable "matrix" background effect.

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS
- Canvas-based Matrix background (custom component)
- Basic i18n (English / Italian)

## Key features

- Working terminal-like interface embedded in the site that accepts commands and renders information directly in the page.
- Configurable Matrix (cmatrix-like) background: density, font size, colors, speeds, trail length and character sets can be adjusted from the UI.
- Bilingual content (English and Italian) via a lightweight i18n system.
- Responsive layout and accessible, keyboard-friendly controls.

## Terminal commands

The terminal accepts a small set of commands to explore the site, for example:

- `welcome` — intro and quick tips
- `about` — personal profile
- `projects` / `project <id>` — list or show projects
- `work` / `experience` — work history
- `instruction` — (Education section; displays degrees and thesis info)
- `clear` — clear the terminal output
- `echo <text>` — prints text back

Note: some visible UI labels may use localized names (e.g. "Education") while the terminal command remains `instruction`.

## Local development

Requirements: Node.js (LTS), npm or yarn.

1. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```
