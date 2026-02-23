# Next.js 15 Landing Page Best Practices Research
**Date:** Feb 23, 2026 | **Focus:** High-Converting Landing Pages with Next.js 15 + Tailwind CSS v4 + shadcn/ui

---

## 1. Next.js 15 Rendering Strategy: SSG Best Practices

**Recommendation:** Use **Static Site Generation (SSG)** for landing pages—automatically statically renders without server functions.

**Key Approach:**
- Components without `fetch()` or async operations → automatically static
- Use `generateStaticParams()` for dynamic route variants
- Implement **Incremental Static Regeneration (ISR)** with `revalidate` for fresh content without rebuilds
- Structure `public/` directory for direct, cacheable asset access (Cache-Control: public, max-age=31536000)

**Why:** ISR blends static speed with dynamic freshness, ideal for landing pages that update content periodically. Vercel docs & Hashnode use this pattern for handling massive traffic.

---

## 2. shadcn/ui Components for Landing Pages

**Essential Components:**
| Component | Use Case |
|-----------|----------|
| **Accordion** | FAQ sections (built on Radix UI, WAI-ARIA compliant) |
| **Card** | Feature/testimonial/pricing sections |
| **Button** | CTA buttons with customizable variants |
| **Badge** | Status indicators, tags |

**Integration Pattern:** Combine Accordion + Button for interactive FAQs, use Badge within cards for status display. All components seamlessly integrate via Tailwind CSS with full keyboard navigation & screen reader support.

---

## 3. Tailwind CSS v4 Features & Best Practices

**Major Improvements:**
- **5x faster performance:** Full rebuilds <100ms (vs 3.5s in v3), incremental builds in milliseconds
- **CSS-first configuration:** Move theme config from JavaScript to CSS using `@theme` directives → runtime theme switching without rebuilds
- **Modern CSS support:** Cascade layers, container queries, 3D transforms, color-mix()
- **Rust-based engine:** Lightning CSS core for dramatic performance gains

**Migration Best Practices:**
- Run `npx @tailwindcss/upgrade` (handles ~90% mechanical changes)
- Replace deprecated `@apply` with explicit CSS properties (better IDE support, clearer debugging)
- Target browsers: Safari 16.4+, Chrome 111+, Firefox 128+ (modern CSS features)

**Configuration Approach:** Use CSS-native theme configuration for landing pages—eliminates JavaScript config overhead.

---

## 4. Performance Optimization (Core Web Vitals)

**Image Optimization:**
- Use `next/image` with `priority` prop for hero images (LCP element)
- Implement lazy loading, WebP/AVIF formats, include alt text
- Set `width`/`height` to prevent Cumulative Layout Shift (CLS)
- Use `sizes` attribute for responsive loading

**Font Loading:**
- Leverage `next/font` for self-hosted fonts (no external requests)
- Prevent layout shifts via correct `font-display` values
- Preload critical fonts, use font-display: swap/optional for fallback strategy

**Targets:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

---

## 5. SEO Best Practices for Next.js 15

**Metadata Management:**
- Use Metadata API (JavaScript objects vs manual head tags) in root layout for defaults
- Set title, meta description, Open Graph tags for all pages
- Implement structured data with JSON-LD schema.org format

**On-Page Structure:**
- One H1 per page, logical H2→H3 hierarchy
- Breadcrumbs for navigation
- Rich snippets increase CTR by 20-30%

**Automatic vs Manual:**
- ✅ Next.js handles: head management, code splitting, image optimization
- 📋 Manual: structured data, sitemaps, internal linking strategy, robots.txt

---

## 6. Recommended Project Structure (Single Landing Page)

```
landing-page/
├── app/
│   ├── layout.tsx           # Root layout (metadata, providers)
│   ├── page.tsx             # Landing page (SSG)
│   └── sitemap.ts           # Sitemap generation
├── components/
│   ├── ui/                  # shadcn/ui imports (button, card, accordion)
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── faq.tsx          # Accordion-based FAQ
│   │   ├── testimonials.tsx
│   │   └── cta.tsx
│   └── shared/              # Reusable (navbar, footer)
├── lib/
│   ├── metadata.ts          # SEO metadata config
│   ├── constants.ts         # Content constants
│   └── utils.ts
├── public/
│   ├── images/
│   ├── fonts/               # Preload fonts here
│   └── icons/
├── styles/
│   └── globals.css          # Tailwind v4 CSS with @theme directives
├── tailwind.config.ts       # Minimal config (most in CSS)
└── next.config.ts           # Image optimization settings
```

**Key Patterns:**
- Single `page.tsx` with section components for modularity
- shadcn/ui in dedicated `ui/` folder
- Centralize metadata in `lib/metadata.ts`
- CSS-first Tailwind configuration

---

## Summary: Action Items

1. **Rendering:** Use SSG (default) + ISR with `revalidate` for content updates
2. **Components:** Import shadcn/ui (accordion, button, card) → copy to components/ui/
3. **Styling:** Adopt Tailwind v4 CSS-first config, migrate away from @apply
4. **Performance:** Optimize hero image (priority), preload fonts, target CWV targets
5. **SEO:** Configure Metadata API, add structured data JSON-LD, implement sitemaps
6. **Structure:** Section-based component organization, centralized content constants

**Estimated Setup Time:** 2-4 hours (scaffold + component setup + optimization)

---

## Sources

- [Next.js Rendering: Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
- [Next.js 15 Dynamic Routes & SSG](https://devanddeliver.com/blog/frontend/next-js-15-dynamic-routes-and-static-site-generation-ssg)
- [shadcn/ui Accordion Component](https://ui.shadcn.com/docs/components/radix/accordion)
- [Tailwind CSS v4 Release Blog](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS v4 2026 Migration Best Practices](https://www.digitalapplied.com/blog/tailwind-css-v4-2026-migration-best-practices)
- [Optimize Next.js for Core Web Vitals](https://www.patterns.dev/react/nextjs-vitals/)
- [Next.js 15 Image & Font Optimization](https://medium.com/@sureshdotariya/images-fonts-and-css-in-next-js-15-10-tiny-tweaks-for-50-faster-loads-f2f5d6b256a8)
- [Next.js SEO: Metadata API Guide](https://nextjs.org/learn/seo/metadata)
- [Next.js 15 Complete SEO Guide](https://www.digitalapplied.com/blog/nextjs-seo-guide)
- [Next.js 15 Project Structure Guide](https://www.wisp.blog/blog/the-ultimate-guide-to-organizing-your-nextjs-15-project-structure)
