# Volca Brew

> Premium coffee web app built around one question: why does every coffee app feel like a checkout page dressed up as a brand?
> This is the answer.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

**Live Demo →** [Volca Brew](https://volcabrew.netlify.app/)

---

## Overview

Volca Brew is a full-stack premium coffee platform that treats the brand experience as a first-class engineering concern. Every feature exists because of a product decision. Every architecture choice exists because of a scale decision.

No team. No template. No shortcuts. Built alone, from a blank canvas.

---

## Tech Stack

| Layer | Technology | Decision |
|---|---|---|
| Frontend | React.js + TypeScript | Type safety across the entire component tree |
| State | Zustand | Replaced 12+ prop-drilling chains with one global store |
| Animation | Framer Motion | Motion as a design language, not decoration |
| Styling | CSS HSL Token System | Entire brand in one file — rebrand in 60 seconds |
| Build | Vite + Code Splitting | 94 Lighthouse score — fast by architecture |

---

## Product Features

### Farm-Level Origin Map
Every coffee traces back to its source. Not just a country flag — volcanic soil type, altitude, processing method, farmer profile. Starbucks shows you a drink. Volca Brew shows you where it was born.

### AI Mood Engine
Answer three questions about how you feel right now. The engine recommends a brew profile matched to your state — energy, focus, calm, social. Zero competitors have shipped this feature.

### Masterclass Booking
Education as a product feature — not an afterthought. Browse instructors by specialty, filter by skill level, book seats. A first in the coffee app space.

### Cinematic Onboarding
The first 5 seconds are a design decision. Beans fall. Steam rises. The brand introduces itself before a single word is read.

### Passport Identity System
Not a loyalty points counter. A journey. Users collect origin stamps as they explore coffees from different regions — identity built through experience, not transactions.

---

## Engineering Decisions

### 1. Zustand Over Prop Drilling

Cart state, user preferences, and mood engine results were threading through 12+ component layers. Zustand replaced the entire chain with one global store — zero prop drilling, full TypeScript inference, scales without rewrites.

```ts
const useStore = create<BrewStore>((set) => ({
  mood: null,
  cart: [],
  passport: [],
  setMood: (mood) => set({ mood }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  stampPassport: (origin) => set((state) => ({
    passport: [...state.passport, origin]
  })),
}));
```

**Why:** Context API re-renders the entire tree on every state change. Zustand subscribes components only to the slice they use — surgical updates, no wasted renders.

---

### 2. Framer Motion as a Design System

Motion is not an effect layer applied on top of the UI. It is the UI. Every entrance, exit, and transition is defined in a shared `variants` object — one source of truth for the entire animation language.

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } }
};
```

**Why:** Defining motion inline per component produces inconsistent timing and easing. A shared variant system means the entire product moves with one voice.

---

### 3. HSL Token System — Brand in One File

The entire visual identity lives in a single CSS token file. Hue, saturation, and lightness are declared once. Every component references tokens — never raw hex values.

```css
:root {
  --brand-h: 24;
  --brand-s: 72%;
  --brand-l: 38%;

  --color-primary:    hsl(var(--brand-h), var(--brand-s), var(--brand-l));
  --color-surface:    hsl(var(--brand-h), 12%, 10%);
  --color-text:       hsl(var(--brand-h), 8%, 94%);
  --color-accent:     hsl(calc(var(--brand-h) + 180), 60%, 55%);
}
```

**Why:** A hex-based system requires finding and replacing every color instance across every file for a rebrand. An HSL token system means changing `--brand-h: 24` to `--brand-h: 200` rebrands the entire product in one edit.

---

### 4. Vite Code Splitting — 94 Lighthouse Score

Heavy features — the origin map, the mood engine, the masterclass module — are lazy-loaded only when the user navigates to them. The initial bundle contains only what the landing page needs.

```ts
const OriginMap      = lazy(() => import('./features/OriginMap'));
const MoodEngine     = lazy(() => import('./features/MoodEngine'));
const Masterclass    = lazy(() => import('./features/Masterclass'));
```

**Why:** A monolithic bundle punishes users who never visit a feature. Route-level splitting means the first paint is fast by architecture — not by compressing images.

---

## Project Structure

```
volca-brew/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Badge.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   ├── features/
│   │   ├── OriginMap/
│   │   ├── MoodEngine/
│   │   ├── Masterclass/
│   │   ├── Onboarding/
│   │   └── Passport/
│   ├── store/
│   │   └── useStore.ts
│   ├── motion/
│   │   └── variants.ts
│   ├── tokens/
│   │   └── brand.css
│   ├── types/
│   │   └── index.ts
│   └── App.tsx
├── public/
├── index.html
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/volca-brew.git
cd volca-brew

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Performance

| Metric | Score |
|---|---|
| Lighthouse Performance | 94 |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.0s |
| Cumulative Layout Shift | 0.02 |

Achieved through route-level code splitting, lazy loading, optimized asset delivery, and no render-blocking resources.

---

## What This Demonstrates

This project is evidence of one thing: the ability to own a product end-to-end.

Not just writing components. Asking why the component exists. Not just adding animation. Deciding what the animation communicates. Not just shipping features. Measuring whether they work.

The gap between a developer who builds what they're told and one who builds what should exist — that's the gap this project was designed to close.

---

## License

[MIT](./LICENSE)

---

## Author

**Bhavesh Kumar** — Full Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bhavesh-kumar-4466a3276/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bhavesh310)

---

<p align="center"><i>Built with obsession, not tutorials.</i></p>

