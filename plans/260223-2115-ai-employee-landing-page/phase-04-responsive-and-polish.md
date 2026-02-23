# Phase 04 - Responsive & Polish

## Context Links
- [Plan Overview](./plan.md)
- [Phase 03 - Implement Sections](./phase-03-implement-sections.md)
- [Next.js 15 Best Practices Report](../reports/researcher-260223-2115-nextjs15-landing-best-practices.md)
- [Tailwind CSS v4 Docs - Responsive](https://tailwindcss.com/docs/responsive-design)

## Overview
- **Priority**: P2
- **Status**: pending
- **Effort**: 2h
- **Description**: Ensure full mobile responsiveness, add scroll-triggered animations, optimize images and fonts for Core Web Vitals, and polish visual details.

## Key Insights
- Mobile-first design: most visitors will arrive via social media on mobile
- Core Web Vitals targets: LCP <2.5s, FID <100ms, CLS <0.1
- `next/image` with `priority` on hero image prevents LCP delay
- Tailwind v4 container queries enable component-level responsive design
- CSS `scroll-behavior: smooth` is sufficient (no JS scroll library needed)
- Subtle entrance animations increase perceived quality without hurting performance

## Requirements

### Functional
- All 9 sections fully responsive (mobile 320px -> desktop 1440px+)
- Sticky mobile CTA bar works correctly on all mobile devices
- Navbar collapses/simplifies on mobile
- Grid layouts stack vertically on mobile
- Images/video embeds scale properly
- Subtle scroll-triggered fade-in animations on section entry

### Non-Functional
- Lighthouse Performance score >= 90
- Lighthouse Accessibility score >= 95
- LCP < 2.5s on 3G simulation
- CLS < 0.1
- No horizontal scroll on any viewport
- Animations respect `prefers-reduced-motion`

## Architecture

### Responsive Breakpoints (Tailwind defaults)
- **sm**: 640px (large phones landscape)
- **md**: 768px (tablets)
- **lg**: 1024px (small laptops)
- **xl**: 1280px (desktops)

### Animation Strategy
Use CSS-only animations via Tailwind v4 for entrance effects:
- `@keyframes fadeInUp` for section entries
- `IntersectionObserver` triggers CSS class toggle
- Single reusable `<AnimateOnScroll>` wrapper component
- Respects `prefers-reduced-motion: reduce`

## Related Code Files

### Files to Create
| File | Purpose |
|------|---------|
| `src/components/shared/animate-on-scroll.tsx` | Reusable scroll-triggered animation wrapper |

### Files to Modify
| File | Change |
|------|--------|
| `src/app/globals.css` | Add animation keyframes, responsive utilities |
| `src/components/sections/*.tsx` | Add responsive classes, wrap in AnimateOnScroll |
| `src/components/shared/navbar.tsx` | Mobile-friendly layout |
| `src/components/shared/sticky-mobile-cta.tsx` | Polish visibility behavior |
| `public/images/*` | Optimize any static images |

## Implementation Steps

### 1. Mobile-First Responsive Audit
Go through each section component and verify/fix responsive behavior:

**Hero**: Stack content centered, reduce `py` on mobile, scale headline font size
```
Desktop: py-32, text-5xl heading
Mobile:  py-16, text-3xl heading
```

**Problem**: 4-column -> 2-column on tablet -> 1-column on mobile
```
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
```

**Solution**: 3-column -> 1-column on mobile
```
grid-cols-1 md:grid-cols-3
```

**Credibility**: 2-column -> stacked on mobile (story above, video below)
```
grid-cols-1 lg:grid-cols-2
```

**Curriculum**: Tabs remain horizontal on all sizes (compact text on mobile)

**Deliverables**: 3-column -> 2-column on tablet -> 1-column on mobile
```
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

**Pricing**: 2-column -> stacked on mobile (featured plan first)
```
grid-cols-1 md:grid-cols-2
```

**FAQ**: Full-width accordion, already responsive

**Final CTA**: Reduce padding on mobile, scale text

### 2. Create AnimateOnScroll Component
`src/components/shared/animate-on-scroll.tsx`:
```typescript
"use client";
// Uses IntersectionObserver to add 'animate-in' class
// Props: children, className, delay?
// Respects prefers-reduced-motion
// Default animation: fade-in + slide-up (20px)
```

**Implementation**:
- Uses `useRef` + `useEffect` with `IntersectionObserver`
- `threshold: 0.1` (trigger when 10% visible)
- Add CSS class that triggers animation
- `once: true` -- only animate on first appearance

### 3. Add Animation Keyframes to globals.css
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animate-hidden {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .animate-in {
    animation: none;
    opacity: 1;
  }
  .animate-hidden {
    opacity: 1;
  }
}
```

### 4. Wrap Sections with AnimateOnScroll
Add `<AnimateOnScroll>` wrapper to each section in page.tsx or within each section component. Stagger delays for adjacent elements if desired.

### 5. Optimize Images
- Any hero background images: use `next/image` with `priority` prop
- Set explicit `width`/`height` on all images to prevent CLS
- Use WebP format where possible
- Add meaningful `alt` text in Vietnamese

### 6. Optimize Video Embed
- Credibility section video: use `loading="lazy"` on iframe
- Consider facade pattern: show thumbnail + play button, load iframe on click
- This avoids iframe blocking LCP

### 7. Font Loading Optimization
- Verify `display: "swap"` set on both fonts (Phase 1)
- Check that font files are preloaded in HTML head
- Verify no external Google Fonts requests in Network tab

### 8. Polish Sticky Mobile CTA
- Ensure it doesn't overlap footer on short pages
- Add subtle shadow: `shadow-lg`
- Test on iOS Safari (safe area inset for bottom bar)
- Add `pb-safe` or `pb-16` to footer to account for sticky bar height

### 9. Polish Visual Details
- Consistent section padding: `py-16 md:py-24` for standard, `py-20 md:py-32` for hero/final CTA
- Consistent max-width: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Hover states on all interactive elements (buttons, accordion triggers)
- Focus ring styles for keyboard navigation (shadcn handles most)
- Dividers between sections if needed (subtle `border-t` or gradient)

### 10. Accessibility Audit
- Run axe-core or Lighthouse accessibility audit
- Verify color contrast ratios (Navy on white, white on navy, orange on white)
- Ensure all images have alt text
- Verify keyboard navigation through all interactive elements
- Check `aria-label` on CTAButton links
- Video embed: provide `title` attribute on iframe

### 11. Performance Check
Run Lighthouse in Chrome DevTools:
- Performance >= 90
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95

## Todo List
- [ ] Audit and fix responsive layout for all 9 sections
- [ ] Create AnimateOnScroll component with IntersectionObserver
- [ ] Add fadeInUp keyframes and reduced-motion support to globals.css
- [ ] Wrap sections with AnimateOnScroll
- [ ] Optimize images (next/image, priority, dimensions, alt text)
- [ ] Optimize video embed (lazy loading / facade pattern)
- [ ] Verify font loading (no external requests, swap display)
- [ ] Polish sticky mobile CTA (shadow, iOS safe area)
- [ ] Consistent padding, max-widths, hover/focus states
- [ ] Run accessibility audit, fix issues
- [ ] Run Lighthouse, achieve target scores

## Success Criteria
- Page is fully functional at 320px, 768px, 1024px, 1440px viewports
- No horizontal scroll at any viewport width
- Sections animate in on scroll (fade-in-up effect)
- Animations disabled when `prefers-reduced-motion: reduce` is set
- Lighthouse Performance >= 90
- Lighthouse Accessibility >= 95
- LCP < 2.5s (Lighthouse mobile simulation)
- CLS < 0.1
- All color contrast ratios pass WCAG AA
- Keyboard navigation works through all interactive elements
- Sticky mobile CTA doesn't overlap content or iOS bottom bar

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Animations cause layout shifts (CLS) | Medium | Medium | Use `opacity` + `transform` only (GPU-composited, no reflow) |
| iOS Safari sticky positioning issues | Medium | Medium | Test on real device or simulator; use `-webkit-sticky` |
| Large hero image impacts LCP | Medium | High | Use next/image with priority; optimize image size <200KB |
| Video iframe blocks main thread | Medium | Medium | Use facade pattern (thumbnail + click-to-load) |
| Font loading causes FOUT | Low | Low | next/font handles this; `display: swap` minimizes impact |

## Security Considerations
- No new security concerns in this phase
- Ensure video iframe uses appropriate `sandbox` attributes
- `allow` attribute on iframe restricted to needed permissions only

## Next Steps
- Phase 5: Testing, build validation, deployment preparation
