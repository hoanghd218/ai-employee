# Codebase Summary

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, navbar, footer
│   ├── page.tsx            # Homepage with 9 sections
│   └── globals.css         # Tailwind v4 @theme, animations, base styles
├── components/
│   ├── sections/           # 9 landing page sections
│   │   ├── hero-section.tsx
│   │   ├── problem-section.tsx
│   │   ├── solution-section.tsx
│   │   ├── credibility-section.tsx
│   │   ├── curriculum-section.tsx
│   │   ├── deliverables-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── faq-section.tsx
│   │   └── final-cta-section.tsx
│   ├── shared/             # Shared components
│   │   ├── navbar.tsx      # Sticky top nav with logo and CTA
│   │   ├── footer.tsx      # Footer with links and copyright
│   │   ├── cta-button.tsx  # Reusable CTA button to Tally form
│   │   ├── animate-on-scroll.tsx  # IntersectionObserver wrapper
│   │   └── sticky-mobile-cta.tsx  # Mobile bottom CTA
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx      # Base button component
│       ├── card.tsx        # Card layout
│       ├── badge.tsx       # Badge component
│       ├── accordion.tsx    # FAQ accordion
│       └── tabs.tsx        # Curriculum tabs
└── lib/
    ├── constants.ts        # All Vietnamese content (500+ lines)
    ├── metadata.ts         # SEO metadata + JSON-LD Course schema
    └── utils.ts            # cn() utility for clsx + tailwind-merge
```

## Key Files

### Configuration
- `package.json` - Dependencies: React 19, Next.js 16, Tailwind v4, shadcn/ui
- `tsconfig.json` - Strict TypeScript, `@/` path alias, ES2017 target
- `next.config.ts` - Minimal Next.js config
- `tailwind.config.ts` - Not present (using CSS-first v4 in globals.css)
- `postcss.config.mjs` - PostCSS with Tailwind
- `eslint.config.mjs` - ESLint for code quality
- `components.json` - shadcn/ui configuration

### Entry Points
- `src/app/layout.tsx` - Registers fonts, metadata, JSON-LD, navbar, footer
- `src/app/page.tsx` - Composes 9 sections with AnimateOnScroll wrapper
- `src/lib/constants.ts` - **Single source of truth for all content**

## Component Patterns

### Sections
All section components are **functional, client-ready** with no client-side state:
```tsx
export function HeroSection() {
  return <section className="...">Content from constants</section>
}
```

### Shared Components
- `CtaButton`: Reusable button linking to Tally form (primary/secondary variants)
- `AnimateOnScroll`: "use client" component wrapping sections with fade-in animation
- `Navbar/Footer`: Static navigation and footer

### Styling Approach
- All Tailwind classes in JSX
- Custom colors via `--color-*` CSS variables
- No CSS modules or external stylesheets
- Uses `cn()` utility (clsx + tailwind-merge) for conditional classes

## Data Flow

1. **Content Source**: `constants.ts` (structured objects)
2. **Metadata**: `metadata.ts` (SEO + JSON-LD)
3. **Components**: Sections import and render directly from constants
4. **Styling**: Tailwind classes + custom color variables
5. **Output**: Static HTML (no runtime JS except animations)

## Key Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| `react` / `react-dom` | UI framework | 19.2.3 |
| `next` | Framework + router + SSG | 16.1.6 |
| `tailwindcss` + `@tailwindcss/postcss` | CSS utility framework | v4 |
| `shadcn` | Component library | ^3.8.5 |
| `lucide-react` | Icons | 0.575.0 |
| `class-variance-authority` | CVA for component variants | 0.7.1 |
| `clsx` + `tailwind-merge` | Utility: conditional classes | Latest |

## Build & Deployment

- **Type Check**: `tsc --noEmit` (via tsconfig)
- **Lint**: `npm run lint` (ESLint)
- **Dev**: `npm run dev` (Next.js dev server)
- **Build**: `npm run build` (SSG to `.next`)
- **Start**: `npm start` (serve static files)
- **Output**: Fully static HTML/CSS/JS (no API needed)
