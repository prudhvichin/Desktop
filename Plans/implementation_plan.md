# Premium React + Vite Developer Portfolio

## Goal

Build a fully-featured, visually stunning personal developer portfolio using React + Vite. The site will be dark-themed, glassmorphism-inspired, and highly interactive — designed to impress while remaining clean and beginner-friendly.

---

## Architecture Overview

```
demo2/
├── public/
│   └── resume.pdf              ← placeholder resume file
├── src/
│   ├── assets/                 ← images, icons, etc.
│   ├── components/             ← reusable UI building blocks
│   │   ├── Navbar.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── ParticleBackground.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── Loader.jsx
│   │   └── SectionTitle.jsx
│   ├── sections/               ← full-page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── GitHub.jsx
│   │   ├── Timeline.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/                   ← all content (easy to edit)
│   │   ├── projects.js
│   │   ├── skills.js
│   │   └── timeline.js
│   ├── hooks/                  ← custom React hooks
│   │   ├── useScrollAnimation.js
│   │   └── useTypewriter.js
│   ├── styles/                 ← global + module CSS
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── animations.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Proposed Changes

### Phase 1 — Project Scaffolding

#### [NEW] Vite + React project in `demo2/`
- Initialize with `create-vite` (React template)
- Install dependencies: `react-github-calendar`, `react-icons`, `react-scroll`

---

### Phase 2 — Design System

#### [NEW] `src/styles/variables.css`
CSS custom properties (tokens):
- Color palette: `--bg-primary`, `--bg-secondary`, `--accent-blue`, `--accent-purple`, `--text-primary`, `--text-muted`
- Typography scale, spacing, border-radius, shadows, transitions

#### [NEW] `src/styles/globals.css`
- Reset, base styles, scrollbar customization, selection color

#### [NEW] `src/styles/animations.css`
- `@keyframes` for: fadeIn, fadeInUp, slideInLeft, glow pulse, float, typing cursor

---

### Phase 3 — Reusable Components

#### [NEW] `src/components/Loader.jsx` + CSS Module
- Full-screen animated loader with glowing logo
- Fades out after 2s

#### [NEW] `src/components/Navbar.jsx` + CSS Module
- Fixed top navbar with blur glassmorphism
- Smooth scroll links
- Active section highlighting
- Hamburger menu for mobile

#### [NEW] `src/components/ScrollProgress.jsx`
- Thin neon progress bar at top of page

#### [NEW] `src/components/Button.jsx`
- Reusable button with variants: `primary`, `outline`, `ghost`
- Glow hover effect

#### [NEW] `src/components/Card.jsx`
- Glassmorphism card container with hover lift

#### [NEW] `src/components/SectionTitle.jsx`
- Centered section heading with gradient underline accent

#### [NEW] `src/components/ParticleBackground.jsx`
- Canvas-based floating particle animation (pure JS, no Three.js dependency)

---

### Phase 4 — Sections

#### [NEW] `src/sections/Hero.jsx`
- Animated particle background
- Typewriter effect for role titles
- Name, subtitle, CTA buttons (Resume, GitHub, LinkedIn, Email)
- Scroll-down indicator

#### [NEW] `src/sections/About.jsx`
- Developer story paragraph
- Animated profile avatar/illustration
- Key highlights as icon+text items

#### [NEW] `src/sections/Skills.jsx`
- Skills grouped by category (Frontend, Backend, Database, Other)
- Animated skill cards with tech icons (react-icons)
- Hover glow per card

#### [NEW] `src/sections/Projects.jsx`
- Project cards (4 sample projects)
- Tech badge chips
- GitHub + Live Demo buttons
- Hover lift + glow

#### [NEW] `src/sections/GitHub.jsx`
- `react-github-calendar` heatmap
- GitHub stats (streak, repos, contributions)

#### [NEW] `src/sections/Timeline.jsx`
- Vertical timeline (learning journey, milestones)
- Alternating left/right layout on desktop
- Stacked on mobile

#### [NEW] `src/sections/Contact.jsx`
- Contact form (name, email, message)
- Social icon links row
- Form validation

#### [NEW] `src/sections/Footer.jsx`
- Minimal footer with social icons and copyright

---

### Phase 5 — Data & Hooks

#### [NEW] `src/data/projects.js`
All 4 sample projects as JS objects

#### [NEW] `src/data/skills.js`
Skills grouped by category

#### [NEW] `src/data/timeline.js`
Timeline milestones

#### [NEW] `src/hooks/useScrollAnimation.js`
IntersectionObserver hook for fade-in-on-scroll

#### [NEW] `src/hooks/useTypewriter.js`
Typewriter cycling text hook

---

### Phase 6 — App Assembly

#### [NEW] `src/App.jsx`
- Wraps all sections in order
- Shows Loader on first mount
- ScrollProgress indicator

#### [NEW] `src/main.jsx`
- Renders App to DOM

---

## Design Specifications

| Token | Value |
|---|---|
| Background | `#0a0a0f` |
| Surface | `#111118` |
| Card | `rgba(255,255,255,0.04)` |
| Accent Blue | `#4fc3f7` |
| Accent Purple | `#a78bfa` |
| Text Primary | `#f1f5f9` |
| Text Muted | `#94a3b8` |
| Font | `'Inter'` (Google Fonts) |
| Code Font | `'JetBrains Mono'` (Google Fonts) |

---

## Verification Plan

### Automated
- `npm run dev` — confirm dev server starts
- Browser preview — validate all sections render

### Visual Check (Browser Subagent)
- Hero typewriter animation plays
- Particle background visible
- Navbar hamburger works on mobile viewport
- Scroll progress bar moves
- GitHub heatmap renders
- All buttons have hover effects
- Responsive at 375px, 768px, 1280px

---

## Open Questions

> [!NOTE]
> The following are assumed defaults — let me know if you'd like to change any:
> - **GitHub username**: `yourusername` (placeholder — change in `src/data/projects.js`)
> - **Your name**: `Dev Name` (placeholder in Hero — easy to edit)
> - **Resume**: A placeholder button is included; drop your `resume.pdf` into `public/`
> - **Contact form**: Logs to console (no backend). Suggest connecting to Formspree or EmailJS later.
> - **Three.js**: Not used (adds complexity). Using a canvas particle system instead, which is beginner-friendly and just as visually impressive.
