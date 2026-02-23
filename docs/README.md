# AI Employee Landing Page

Professional landing page for a Vietnamese AI Employee cohort training program built with Next.js 16, React 19, Tailwind CSS v4, and shadcn/ui.

## Project Overview

**AI Employee** is a 3-week cohort-based course teaching entrepreneurs and business owners how to build custom AI Employees using Claude Code. This is a fully static, production-ready landing page optimized for SEO and conversion.

- **Language**: Vietnamese with English support
- **Theme**: Light only (navy #1A202C, orange #FF6B35, light gray #F7FAFC)
- **CMS**: None (static SSG with content in `lib/constants.ts`)
- **Hosting**: Deployment-agnostic (Next.js 16 static export ready)

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev
# Open http://localhost:3000

# Production build
npm run build
npm start
```

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.6 |
| UI Library | React | 19.2.3 |
| Styling | Tailwind CSS + shadcn/ui | v4 |
| Fonts | Be Vietnam Pro (headings) + Open Sans (body) | Google Fonts |
| Icons | Lucide React | 0.575.0 |
| Type Safety | TypeScript | ^5 |

## Architecture at a Glance

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout with fonts, metadata, JSON-LD
│   ├── page.tsx      # Homepage - 9 sections with scroll animations
│   └── globals.css   # Tailwind v4 CSS-first config
├── components/
│   ├── sections/     # 9 landing page sections
│   ├── shared/       # Navbar, footer, buttons, animations
│   └── ui/           # shadcn/ui components (accordion, card, button, tabs)
└── lib/
    ├── constants.ts  # All Vietnamese content
    ├── metadata.ts   # SEO + JSON-LD schema
    └── utils.ts      # Utility functions (cn)
```

## Key Features

- **9 Landing Sections**: Hero → Problem → Solution → Credibility → Curriculum → Deliverables → Pricing → FAQ → Final CTA
- **Scroll Animations**: `AnimateOnScroll` component with IntersectionObserver + fade-in transitions
- **Mobile CTA**: Sticky bottom button on mobile devices, hidden on desktop
- **SEO Optimized**: JSON-LD Course schema, meta tags, Open Graph, Twitter Card
- **Fully Accessible**: Semantic HTML, ARIA labels, focus skip link, reduced motion support
- **No Dark Mode**: Light theme only per design specifications
- **Static Generation**: Pure SSG, zero runtime rendering

## Content Structure

All content lives in `src/lib/constants.ts` with structured data:
- `SITE`: Site metadata and Tally form URL
- `HERO_CONTENT`: Hero headline and messaging
- `PROBLEM_CONTENT`: Problem sections with 4 pain points
- `SOLUTION_CONTENT`: Solution pillars (Skills, Workflows, Agents)
- `CURRICULUM_CONTENT`: 3-week curriculum with 6 sessions
- `PRICING_CONTENT`: Two pricing plans with ROI calculation
- `FAQ_CONTENT`: 10 common questions
- And more for each section

## Styling System

Tailwind CSS v4 with CSS-first configuration in `globals.css`:

```css
@theme inline {
  --color-navy: #1A202C;
  --color-gray-bg: #F7FAFC;
  --color-orange: #FF6B35;
  --color-text-muted-custom: #718096;
  /* ... additional theme tokens */
}
```

Custom Tailwind classes available in every component.

## Development Workflow

1. **Modify Content**: Edit `src/lib/constants.ts`
2. **Update Sections**: Edit files in `src/components/sections/`
3. **Add Components**: Follow shadcn pattern in `src/components/ui/`
4. **Test**: `npm run dev` and check in browser
5. **Lint**: `npm run lint`
6. **Build**: `npm run build` (static export by default)

## Important Notes

- All content is Vietnamese; modify `constants.ts` for translations
- Uses `@` path alias (configured in `tsconfig.json`)
- No API routes or server-side functionality
- Mobile CTA is sticky and dismissible via CSS class
- Fonts use Next.js Google Fonts with `display: "swap"`
- Reduced motion support respects user preferences
