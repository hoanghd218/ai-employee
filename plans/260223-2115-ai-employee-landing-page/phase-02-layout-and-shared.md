# Phase 02 - Layout & Shared Components

## Context Links
- [Plan Overview](./plan.md)
- [Phase 01 - Project Setup](./phase-01-project-setup.md)
- [Conversion Patterns Report](../reports/researcher-260223-2115-landing-page-conversion-patterns.md)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## Overview
- **Priority**: P1
- **Status**: pending
- **Effort**: 2h
- **Description**: Implement root layout with SEO metadata, Vietnamese Open Graph tags, and shared components (Navbar, Footer, CTAButton, sticky mobile CTA).

## Key Insights
- Metadata API in Next.js 15 uses JS objects (not manual `<head>` tags) for SEO
- JSON-LD structured data increases CTR by 20-30%
- Sticky mobile CTA reduces friction for mobile users
- Single CTA goal per page (Tally.so form link) -- avoid competing actions
- CTA button needs high contrast orange (#FF6B35) on light background

## Requirements

### Functional
- Root layout with fonts applied to `<html>` tag via CSS variables
- Complete SEO metadata: title, description, Open Graph, Twitter cards
- JSON-LD structured data for Course schema
- Navbar with logo/brand text + single CTA button
- Footer with minimal links (program name, copyright)
- Reusable CTAButton component linking to Tally.so
- Sticky mobile CTA bar (visible on scroll, hidden on desktop)

### Non-Functional
- Metadata must render correctly for Vietnamese characters
- Open Graph image (1200x630) placeholder path defined
- Lighthouse SEO score >= 95
- All shared components < 50 lines each

## Architecture

### Component Tree
```
layout.tsx
├── <html lang="vi"> + font CSS variables
├── Metadata (title, description, OG, JSON-LD)
├── <body>
│   ├── Navbar
│   │   ├── Brand/Logo text
│   │   └── CTAButton (desktop)
│   ├── <main>{children}</main>
│   ├── Footer
│   └── StickyMobileCTA (fixed bottom, mobile only)
```

### SEO Metadata Structure
```typescript
// src/lib/metadata.ts
export const siteMetadata = {
  title: "AI Employee - Chương Trình Đào Tạo AI 3 Tuần",
  description: "Học cách tuyển dụng nhân viên AI cho doanh nghiệp...",
  url: "https://ai-employee.vn", // TBD
  ogImage: "/images/og-image.png",
  locale: "vi_VN",
};
```

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "AI Employee",
  "description": "Chương trình đào tạo AI 3 tuần...",
  "provider": { "@type": "Organization", "name": "AI Employee" },
  "offers": {
    "@type": "Offer",
    "price": "1200",
    "priceCurrency": "USD"
  }
}
```

## Related Code Files

### Files to Create
| File | Purpose |
|------|---------|
| `src/components/shared/navbar.tsx` | Top navigation bar with brand + CTA |
| `src/components/shared/footer.tsx` | Minimal footer with copyright |
| `src/components/shared/cta-button.tsx` | Reusable CTA button linking to Tally.so |
| `src/components/shared/sticky-mobile-cta.tsx` | Fixed bottom CTA bar for mobile |

### Files to Modify
| File | Change |
|------|--------|
| `src/app/layout.tsx` | Add fonts, metadata, shared components wrapping |
| `src/lib/metadata.ts` | Populate SEO metadata + JSON-LD schema |
| `src/lib/constants.ts` | Add shared text constants (brand name, CTA text, Tally URL) |

## Implementation Steps

### 1. Define Shared Constants
In `src/lib/constants.ts`:
```typescript
export const SITE = {
  name: "AI Employee",
  tagline: "Tuyển Dụng Nhân Viên AI Cho Doanh Nghiệp",
  url: "https://ai-employee.vn",
  tallyUrl: "https://tally.so/r/obDBxx",
};

export const CTA_TEXT = {
  primary: "Đăng Ký Ngay",
  secondary: "Tìm Hiểu Thêm",
};
```

### 2. Create Metadata Config
In `src/lib/metadata.ts`:
- Export `siteMetadata` object with title, description, OG tags
- Export `jsonLd` object with Course schema
- All text in Vietnamese

### 3. Implement Root Layout
In `src/app/layout.tsx`:
- Import fonts with `next/font/google` (Be Vietnam Pro + Open Sans)
- Apply font CSS variables to `<html>` element
- Set `lang="vi"` on `<html>`
- Import metadata from `lib/metadata.ts`
- Render: Navbar + `{children}` + Footer + StickyMobileCTA
- Add JSON-LD `<script>` tag in `<head>`

### 4. Build CTAButton Component
`src/components/shared/cta-button.tsx`:
- Props: `variant?: "primary" | "secondary"`, `size?: "default" | "lg"`, `className?: string`
- Primary variant: `bg-accent text-white hover:bg-accent-hover`
- Renders `<a>` tag wrapping shadcn Button, linking to `SITE.tallyUrl`
- Opens in new tab with `rel="noopener noreferrer"`
- Use `target="_blank"` for external Tally.so link

### 5. Build Navbar
`src/components/shared/navbar.tsx`:
- Sticky top, white background with subtle border-bottom
- Left: Brand text ("AI Employee") in Be Vietnam Pro bold
- Right: CTAButton (hidden on mobile, visible md+)
- Max-width container, horizontal padding
- `backdrop-blur-sm` for scroll transparency effect

### 6. Build Footer
`src/components/shared/footer.tsx`:
- Dark background (`bg-primary text-white`)
- Brand name, copyright year, minimal text
- Optional: link back to top of page
- Keep < 30 lines

### 7. Build StickyMobileCTA
`src/components/shared/sticky-mobile-cta.tsx`:
- Client component (`"use client"`)
- Fixed bottom bar, visible only on mobile (`md:hidden`)
- Contains CTAButton spanning full width
- Show/hide on scroll (show after scrolling past hero)
- Use `IntersectionObserver` or scroll event to toggle visibility
- `z-50` to stay above all content

### 8. Update page.tsx
- Minimal placeholder confirming layout renders correctly
- Import and display a test section or heading

### 9. Verify
- `npm run build` succeeds
- Check HTML source for correct metadata tags
- Validate JSON-LD with Google Rich Results Test
- Test mobile sticky CTA behavior in dev tools

## Todo List
- [ ] Define shared constants in lib/constants.ts (SITE, CTA_TEXT)
- [ ] Populate lib/metadata.ts with SEO metadata + JSON-LD
- [ ] Implement root layout.tsx with fonts, lang="vi", metadata
- [ ] Create cta-button.tsx shared component
- [ ] Create navbar.tsx with brand + CTA
- [ ] Create footer.tsx with dark background
- [ ] Create sticky-mobile-cta.tsx with scroll behavior
- [ ] Add JSON-LD script to layout head
- [ ] Verify build + metadata in HTML source
- [ ] Test mobile sticky CTA in browser dev tools

## Success Criteria
- Page title and meta description render in Vietnamese
- Open Graph tags present and correct in HTML source
- JSON-LD script renders valid Course schema
- Navbar sticks to top on scroll
- CTAButton links to https://tally.so/r/obDBxx in new tab
- Sticky mobile CTA visible only on mobile breakpoint
- Sticky mobile CTA appears after scrolling past hero area
- Fonts render correctly (Be Vietnam Pro headings, Open Sans body)
- Build succeeds with zero errors

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| OG image not ready | High | Low | Use placeholder path, generate later |
| Site URL not finalized | Medium | Low | Use placeholder, update before deploy |
| Sticky CTA z-index conflicts | Low | Low | Set z-50, test with all sections |
| Vietnamese diacritics in metadata | Low | Medium | Test OG tags with Facebook debugger |

## Security Considerations
- External link to Tally.so uses `rel="noopener noreferrer"` for security
- No user input collected on this page
- No cookies or tracking scripts in initial implementation

## Next Steps
- Phase 3: Implement all 9 landing page sections
