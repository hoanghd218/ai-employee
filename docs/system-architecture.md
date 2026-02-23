# System Architecture

## Data Flow Diagram

```
lib/constants.ts (Vietnamese Content)
    ↓
    ├→ HERO_CONTENT
    ├→ PROBLEM_CONTENT
    ├→ SOLUTION_CONTENT
    ├→ CURRICULUM_CONTENT
    ├→ PRICING_CONTENT
    ├→ FAQ_CONTENT
    └→ (other content objects)

    ↓ Imported by section components

src/components/sections/ (9 Components)
    ├→ hero-section.tsx
    ├→ problem-section.tsx
    ├→ solution-section.tsx
    ├→ credibility-section.tsx
    ├→ curriculum-section.tsx
    ├→ deliverables-section.tsx
    ├→ pricing-section.tsx
    ├→ faq-section.tsx
    └→ final-cta-section.tsx

    ↓ Composed with AnimateOnScroll wrapper

src/app/page.tsx (Homepage)
    └→ Renders 9 sections in sequence

    ↓ Wrapped in layout

src/app/layout.tsx (Root Layout)
    ├→ Registers Google Fonts
    ├→ Adds SEO metadata
    ├→ Injects JSON-LD schema
    ├→ Renders Navbar (top)
    ├→ Renders main content
    ├→ Renders Footer (bottom)
    └→ Renders StickyMobileCta
```

## Component Hierarchy

```
<RootLayout>
  ├─ <Navbar />           (sticky, responsive CTA hidden on mobile)
  ├─ <main>
  │  ├─ <HeroSection />
  │  ├─ <AnimateOnScroll>
  │  │  └─ <ProblemSection />
  │  ├─ <AnimateOnScroll>
  │  │  └─ <SolutionSection />
  │  ├─ <AnimateOnScroll>
  │  │  └─ <CredibilitySection /> (with YouTube embed)
  │  ├─ <AnimateOnScroll>
  │  │  └─ <CurriculumSection /> (Tabs component)
  │  ├─ <AnimateOnScroll>
  │  │  └─ <DeliverablesSection />
  │  ├─ <AnimateOnScroll>
  │  │  └─ <PricingSection /> (2 pricing tiers)
  │  ├─ <AnimateOnScroll>
  │  │  └─ <FaqSection /> (Accordion component)
  │  └─ <AnimateOnScroll>
  │     └─ <FinalCtaSection />
  ├─ <Footer />           (links, copyright)
  └─ <StickyMobileCta />  (sticky bottom on small screens)
</RootLayout>
```

## Section Structure

Each section follows this pattern:

```
<section id="section-id" className="py-20 md:py-32">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <h2 className="font-heading text-4xl">Title</h2>
    <p className="mt-4 text-lg text-muted">Subtitle</p>

    {/* Content Grid / Cards / Accordion / Tabs */}

  </div>
</section>
```

## SEO Architecture

**Static Metadata** (via layout.tsx):
```tsx
export const metadata = siteMetadata;  // From lib/metadata.ts
```

**Content:**
- Meta title & description
- Open Graph image, title, description
- Twitter Card tags
- JSON-LD Course schema (for Google rich results)
- Canonical URL: `https://ai-employee.vn`
- Robots: `index: true, follow: true`

**JSON-LD Schema:**
```json
{
  "@type": "Course",
  "name": "AI Employee - Xây Dựng Nhân Viên AI",
  "description": "3-week cohort program",
  "provider": { "name": "AI Employee" },
  "offers": { "price": "1200", "priceCurrency": "USD" },
  "hasCourseInstance": { "duration": "P3W" }
}
```

## Styling Architecture

**Tailwind v4 with CSS-first** (in `globals.css`):

```css
@import "tailwindcss";
@theme inline {
  --color-navy: #1A202C;
  --color-orange: #FF6B35;
  /* Custom colors, fonts, radius tokens */
}

:root {
  /* CSS custom properties for all theme colors */
}

@keyframes fadeInUp { /* Scroll animation */ }
@layer base { /* Global styles */ }
```

**Utility-First Approach:**
- Tailwind classes compose in JSX
- No external CSS files
- Custom colors via CSS variables
- Responsive breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px)

## State & Logic

**Fully Static (SSG)**
- No React state hooks
- No API routes or server actions
- No dynamic data fetching
- All content in constants (build-time)

**Client-Only Components:**
- `AnimateOnScroll` (IntersectionObserver)
- `StickyMobileCta` (show/hide on scroll)
- `Accordion`, `Tabs` (from shadcn/ui)

## Responsive Design

**Mobile-First Breakpoints:**
```tsx
// XS (mobile): default styles
px-4 py-20

// SM (640px+): slightly larger
sm:px-6 sm:py-24

// MD (768px+): tablet
md:py-32 md:text-4xl

// LG (1024px+): desktop
lg:text-6xl lg:grid-cols-3
```

**Key Responsive Changes:**
- Hero: `text-4xl` (mobile) → `text-6xl` (lg)
- Navbar: Buttons hidden on mobile (`hidden md:inline-flex`)
- Mobile CTA: Sticky bottom (visible on small, hidden on md+)
- Grids: 1 column (mobile) → 2-3 columns (desktop)

## Performance Optimizations

- **Static Generation**: Zero runtime JS overhead (except interactive components)
- **Font Optimization**: Next.js Google Fonts with `display: "swap"`
- **Code Splitting**: shadcn components tree-shake unused code
- **Image Optimization**: CSS backgrounds (no img tags)
- **Bundle Size**: ~50KB gzipped (React 19 + Tailwind)

## File Sizes (Typical)

```
Section Components:     30-80 lines each
Shared Components:      20-60 lines each
Styles (globals.css):   130+ lines (includes animations)
Constants:              350+ lines (all content)
```

Components kept under 200 lines for readability.
