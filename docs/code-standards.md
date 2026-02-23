# Code Standards & Patterns

## Component Structure

All components follow a consistent pattern:

### Section Components
```tsx
export function HeroSection() {
  return (
    <section id="hero" className="...">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="font-heading text-3xl">
          {HERO_CONTENT.headline}
        </h1>
        {/* ... */}
      </div>
    </section>
  );
}
```

**Standards:**
- Section `id` for anchor links
- `mx-auto max-w-6xl` for container constraint
- Responsive padding: `px-4 sm:px-6`
- All text content from `lib/constants.ts`
- No state or hooks (SSG-ready)

### Shared Components
```tsx
interface Props {
  variant?: "primary" | "secondary";
  size?: "default" | "lg";
  className?: string;
}

export function Component({ variant = "primary", size = "default", className }: Props) {
  return (
    <Element className={cn(
      "base styles",
      variant === "primary" && "primary-specific",
      className
    )}>
      Content
    </Element>
  );
}
```

**Standards:**
- Props interface at top
- Destructure with defaults
- Use `cn()` for conditional classes
- Accept `className` for customization

## Typography

| Element | Font | Weight | Sizes |
|---------|------|--------|-------|
| `h1` | Be Vietnam Pro | 700-800 | `text-6xl` (lg), `text-4xl` (sm) |
| `h2` | Be Vietnam Pro | 600-700 | `text-4xl` (lg), `text-2xl` (sm) |
| `p` | Open Sans | 400-500 | `text-lg` (body), `text-sm` (meta) |
| `button` | Open Sans | 600 | `text-base` |

Applied via `font-heading` / `font-body` custom variables.

## Colors

**CSS Custom Properties** (in `globals.css`):
```css
--color-navy: #1A202C           /* Primary text, headings */
--color-gray-bg: #F7FAFC        /* Background sections */
--color-orange: #FF6B35         /* CTAs, accents */
--color-text-muted-custom: #718096  /* Secondary text */
```

Used with Tailwind: `text-navy`, `bg-orange`, `hover:bg-orange-hover`

## Layout Patterns

### Section Container
```tsx
<div className="mx-auto max-w-6xl px-4 sm:px-6">
  {/* Content */}
</div>
```

### Responsive Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Cards */}
</div>
```

### Spacing Scale
- **Vertical**: `py-20 md:py-32` (sections)
- **Horizontal**: `px-4 sm:px-6` (containers)
- **Gaps**: `gap-4 md:gap-6 lg:gap-8`
- **Margins**: `mt-6 md:mt-10`, `mb-8`

## Animation & Interaction

### Scroll Animations
```tsx
<AnimateOnScroll>
  <SectionComponent />
</AnimateOnScroll>
```

**Details** (AnimateOnScroll):
- Uses IntersectionObserver
- Fade-in + slide-up on scroll
- Respects `prefers-reduced-motion`
- CSS classes: `animate-hidden` → `animate-in`

### Button Styling
```tsx
className={cn(
  "font-semibold rounded-xl transition-all duration-200",
  "bg-orange text-white hover:bg-orange-hover shadow-lg",
  "hover:shadow-xl hover:-translate-y-0.5"  /* Lift effect */
)}
```

**Standards:**
- `rounded-xl` for buttons
- `transition-all duration-200` for smooth effects
- Hover state raises button slightly (`hover:-translate-y-0.5`)

## Accessibility

- **Semantic HTML**: `<section>`, `<nav>`, `<button>`, `<a>`
- **ARIA Labels**: Buttons have `aria-label` attributes
- **Focus States**: Custom `:focus-visible` with ring color
- **Skip Link**: Focus-visible skip-to-main link in layout
- **Reduced Motion**: CSS media query disables animations
- **Contrast**: Navy on white, orange on white meet WCAG AA

## Content Management

**Single Source of Truth**: `lib/constants.ts`

Structure:
```tsx
export const HERO_CONTENT = {
  headline: "...",
  subheadline: "...",
  ctaText: "...",
};
```

**Never hardcode text in components** — always import from constants.

## Naming Conventions

- **Components**: PascalCase (`HeroSection`, `CtaButton`)
- **Exports**: Named exports (not default)
- **Files**: kebab-case + component name (`hero-section.tsx`)
- **CSS Classes**: Lowercase with hyphens (`bg-navy`, `text-muted-custom`)
- **Variables**: camelCase (`heroContent`, `tallyUrl`)
- **Constants**: UPPER_SNAKE_CASE (`SITE`, `CTA_TEXT`)

## Type Safety

- **Strict Mode**: `"strict": true` in tsconfig
- **No `any`**: Always provide explicit types
- **Interfaces**: Used for component props
- **Optional Props**: Use `?` with defaults
- **Type Imports**: `import type { Metadata } from "next"`

## Linting & Formatting

Run before commit:
```bash
npm run lint    # ESLint check
npm run build   # TypeScript check
```

No Prettier (relies on ESLint defaults).
