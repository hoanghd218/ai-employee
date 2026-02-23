# Code Review: AI Employee Landing Page

## Scope
- **Files**: 19 source files (components, lib, app)
- **LOC**: ~1,615 (application code, excluding node_modules)
- **Stack**: Next.js 16.1.6, React 19, Tailwind CSS v4, shadcn/ui, Radix UI
- **Focus**: Critical bugs, accessibility, performance, security, mobile responsiveness
- **Build**: Passes successfully (static export, Turbopack)
- **Lint**: Clean (0 errors)

## Overall Assessment

Well-structured landing page with clean separation of concerns: constants hold all Vietnamese content, sections are isolated components, and shared components handle cross-cutting concerns. The code is readable, consistent, and follows Next.js App Router conventions. However, there are several high-priority issues around missing assets, accessibility gaps, and a performance concern with the YouTube iframe.

---

## Critical Issues

### 1. Missing OG Image (SEO Breakage)

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/lib/metadata.ts` (line 27)
**File**: `/Users/hoangtran/Documents/Github/ai-employee/public/images/` (empty directory)

The metadata references `/images/og-image.png` for both OpenGraph and Twitter cards, but the file does not exist in `public/images/`. This means every social share (Facebook, Twitter/X, LinkedIn, Zalo) will show no image preview -- a significant issue for a landing page that relies on social distribution.

**Fix**: Add the actual `og-image.png` (1200x630px) to `public/images/`.

---

## High Priority

### 2. YouTube Iframe Loads Eagerly on Viewport (Performance)

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/components/sections/credibility-section.tsx` (lines 39-46)

The YouTube iframe has `loading="lazy"` which helps, but iframes are still heavy. On mobile connections, this pulls in ~500KB-1MB of YouTube resources the moment the section scrolls into view. For a landing page where LCP and Time-to-Interactive matter, consider a facade pattern (show a thumbnail, load iframe on click).

```tsx
// Current
<iframe
  src={CREDIBILITY_CONTENT.videoUrl}
  loading="lazy"
  ...
/>

// Suggested: Use a thumbnail + play button facade
// Load iframe only when user clicks play
```

**Impact**: Improves LCP and reduces initial page weight, especially on mobile 3G/4G.

### 3. Accessibility: No Skip Navigation Link

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/app/layout.tsx`

There is no "skip to content" link for keyboard users. With a sticky navbar and 9 sections, keyboard users must tab through the navbar on every page load.

**Fix**: Add a skip link as the first element in `<body>`:
```tsx
<a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-navy">
  Skip to content
</a>
```

### 4. Accessibility: Navbar Has No Accessible Label

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/components/shared/navbar.tsx` (line 6)

The `<nav>` element has no `aria-label`. When there are multiple `<nav>` landmarks (main nav + potentially mobile CTA area), screen readers need labels to distinguish them.

**Fix**:
```tsx
<nav aria-label="Main navigation" className="sticky top-0 ...">
```

### 5. Accessibility: Footer Content Lacks Structure

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/components/shared/footer.tsx`

The footer only contains the site name and copyright. It has no navigation links (e.g., link to FAQ, Pricing sections, or terms/privacy). For a Vietnamese audience, this is also a trust signal issue. Adding section links in the footer would improve both accessibility (keyboard nav) and user experience.

### 6. Sticky Mobile CTA Hides/Shows with Conditional Render (CLS Risk)

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/components/shared/sticky-mobile-cta.tsx` (line 17)

```tsx
if (!visible) return null;
```

When the component renders after scrolling past 600px, it causes a layout shift because it inserts a fixed-position element. While `fixed` positioning usually avoids CLS, the `return null` pattern means React unmounts/remounts the DOM node entirely. On slower devices, this can cause a brief flash.

**Fix**: Use CSS visibility/opacity toggle instead of conditional rendering:
```tsx
<div className={cn(
  "fixed bottom-0 left-0 right-0 z-50 ...",
  visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
)} style={{ transition: "transform 0.3s, opacity 0.3s" }}>
```

This also gives a smooth slide-in animation.

### 7. `dangerouslySetInnerHTML` for JSON-LD: Safe but Fragile

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/app/layout.tsx` (lines 33-36)

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

This is a standard pattern and currently safe because `jsonLd` is a static object from `metadata.ts` with no user input. However, if the jsonLd object ever incorporates dynamic/user data, this becomes an XSS vector. The `JSON.stringify` does not escape `</script>` sequences.

**Note**: Next.js 16 supports the `<script>` approach for JSON-LD natively. No action needed now, but worth noting for future changes.

---

## Medium Priority

### 8. Credibility Stats Grid Breaks on Narrow Mobile

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/components/sections/credibility-section.tsx` (line 20)

```tsx
<div className="mt-8 grid grid-cols-3 gap-4">
```

The 3-column grid for stats ("4 hours/week", "$30K+/year", "$100/month") is forced at all breakpoints. On narrow mobile screens (320px), each column gets ~90px which may cause text overflow.

**Fix**: Add responsive breakpoint:
```tsx
<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
```

### 9. Emoji Icons Not Accessible

**Files**: All sections using emoji icons (problem, solution, deliverables, pricing sections)

Emoji characters like `icon` used as visual indicators (e.g., `"icon": "🎯"` in constants) have no `role="img"` or `aria-label`. Screen readers may read them inconsistently or skip them entirely.

**Fix**: Wrap emoji icons:
```tsx
<span role="img" aria-hidden="true">{point.icon}</span>
```

Since these are decorative (the title provides meaning), `aria-hidden="true"` is appropriate.

### 10. No `<h1>` Landmark for Screen Reader Page Structure

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/app/page.tsx`

The page composition is good, but the sections lack `aria-labelledby` linking to their heading IDs. This is a minor but meaningful improvement for screen reader navigation.

---

## Low Priority

### 11. Footer Uses Dynamic Date in Server Component

**File**: `/Users/hoangtran/Documents/Github/ai-employee/src/components/shared/footer.tsx` (line 11)

```tsx
{new Date().getFullYear()}
```

Since the page is statically generated, this will be baked in at build time. This is fine and expected behavior -- the year will only update on next build/deploy. No action needed, just noting for awareness.

### 12. Unused Default Public Assets

**File**: `/Users/hoangtran/Documents/Github/ai-employee/public/`

The default Next.js SVG files (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) are still present. These are unused and should be cleaned up before production deployment.

---

## Positive Observations

1. **Content-code separation**: All Vietnamese content lives in `constants.ts`, making localization and content changes straightforward without touching component logic.
2. **Reduced motion support**: The `animate-on-scroll.tsx` component and `globals.css` both properly respect `prefers-reduced-motion`. This is a strong accessibility practice.
3. **Passive scroll listeners**: `sticky-mobile-cta.tsx` uses `{ passive: true }` for scroll events, which is correct for scroll performance.
4. **Safe area insets**: The mobile CTA properly handles iOS notch with `env(safe-area-inset-bottom)`.
5. **External links use `rel="noopener noreferrer"`**: CTA buttons linking to Tally correctly set security attributes.
6. **Font loading strategy**: `display: "swap"` on both fonts prevents FOIT and improves perceived performance.
7. **Clean component structure**: Each section is self-contained, easy to reorder or modify independently.
8. **Static generation**: The entire page is statically rendered (no SSR at request time), which is optimal for a landing page.

---

## Recommended Actions (Prioritized)

1. **[CRITICAL]** Add the OG image file (`public/images/og-image.png`, 1200x630px)
2. **[HIGH]** Add skip navigation link in layout.tsx
3. **[HIGH]** Add `aria-label` to navbar `<nav>` element
4. **[HIGH]** Consider YouTube iframe facade for mobile performance
5. **[MEDIUM]** Make credibility stats grid responsive (`grid-cols-1 sm:grid-cols-3`)
6. **[MEDIUM]** Add `aria-hidden="true"` to decorative emoji icons
7. **[MEDIUM]** Animate sticky CTA with CSS instead of conditional render
8. **[LOW]** Remove unused default SVGs from `public/`

## Metrics

- **TypeScript**: Strict mode, no type errors
- **Build**: Passes (Turbopack, 0.96s compile)
- **Lint**: 0 errors, 0 warnings
- **Test Coverage**: No tests present (acceptable for a static landing page)
- **Accessibility**: WCAG 2.1 AA partially met (reduced motion supported; gaps in skip-nav, aria labels, emoji markup)

## Unresolved Questions

1. Is the Tally form URL (`https://tally.so/r/obDBxx`) correct and active? Could not verify.
2. Should a privacy policy / terms of service link be added to the footer for PDPA (Vietnam data protection) compliance?
3. The social proof text says "tháng 3" (March) -- should this be dynamically updated or is it intentionally static for the current cohort?
