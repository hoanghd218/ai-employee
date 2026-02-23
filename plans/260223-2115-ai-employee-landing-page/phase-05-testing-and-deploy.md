# Phase 05 - Testing & Deploy

## Context Links
- [Plan Overview](./plan.md)
- [Phase 04 - Responsive & Polish](./phase-04-responsive-and-polish.md)
- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

## Overview
- **Priority**: P2
- **Status**: pending
- **Effort**: 1.5h
- **Description**: Validate build output, test cross-browser/device compatibility, verify SEO metadata, configure deployment to Vercel (or static export).

## Key Insights
- Static export (`output: "export"`) works for simple static hosting (Netlify, S3, etc.)
- Vercel deployment is zero-config for Next.js, with image optimization included
- SSG pages are pre-rendered at build time -- verify HTML output contains all content
- JSON-LD validation critical for rich snippets in Google Search
- Open Graph validation ensures correct social media sharing previews

## Requirements

### Functional
- `npm run build` completes without errors or warnings
- All pages pre-rendered as static HTML
- All CTA links point to correct Tally.so URL
- Metadata renders in built HTML (view-source verification)
- JSON-LD validates with Google Rich Results Test
- OG tags validate with Facebook Sharing Debugger

### Non-Functional
- Build output size < 500KB (excluding images)
- Lighthouse scores: Performance >= 90, SEO >= 95, Accessibility >= 95
- Page loads < 3s on 3G simulation
- Works on: Chrome 111+, Safari 16.4+, Firefox 128+, Edge

## Architecture

### Deployment Options
```
Option A: Vercel (Recommended)
  - Zero-config for Next.js
  - Image optimization included
  - Edge CDN
  - Preview deployments per branch
  - Remove `output: "export"` from next.config.ts

Option B: Static Export
  - Add `output: "export"` to next.config.ts
  - Set `images: { unoptimized: true }`
  - Deploy to: Netlify, CloudFlare Pages, AWS S3+CloudFront
  - No server-side features (fine for this project)
```

### Pre-Deploy Checklist Structure
```
Build Validation → Content Verification → SEO Validation →
Cross-Browser Testing → Performance Audit → Deploy
```

## Related Code Files

### Files to Verify (no changes unless issues found)
| File | Verification |
|------|-------------|
| `src/app/layout.tsx` | Metadata renders correctly in HTML |
| `src/app/page.tsx` | All sections present in static HTML |
| `src/lib/constants.ts` | All Tally.so URLs correct |
| `src/lib/metadata.ts` | OG tags, JSON-LD valid |
| `next.config.ts` | Deployment mode correct |
| `package.json` | Build scripts work |

### Files to Create (if needed)
| File | Purpose |
|------|---------|
| `src/app/sitemap.ts` | Sitemap generation for SEO |
| `src/app/robots.ts` | Robots.txt configuration |
| `.github/workflows/deploy.yml` | CI/CD pipeline (optional) |

## Implementation Steps

### 1. Build Validation
```bash
npm run build
```
- Verify zero errors and zero warnings
- Check build output: all pages listed as "Static" (SSG)
- Note total build time and output size

### 2. Content Verification
Run dev server and manually verify:
- [ ] All 9 sections visible and in correct order
- [ ] All Vietnamese text renders with correct diacritics
- [ ] All CTA buttons link to `https://tally.so/r/obDBxx`
- [ ] CTA buttons open in new tab
- [ ] Video embed loads (or placeholder displays)
- [ ] Curriculum tabs switch correctly
- [ ] FAQ accordion expands/collapses
- [ ] Pricing shows both options
- [ ] Sticky mobile CTA visible on mobile viewport
- [ ] Navbar CTA visible on desktop

### 3. SEO Validation
- View page source, verify:
  - `<title>` tag contains Vietnamese title
  - `<meta name="description">` present
  - `<meta property="og:title">`, `og:description`, `og:image` present
  - `<html lang="vi">`
  - JSON-LD `<script type="application/ld+json">` present and valid
- Test with:
  - [Google Rich Results Test](https://search.google.com/test/rich-results) (paste built HTML)
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) (after deploy)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator) (after deploy)

### 4. Add Sitemap and Robots
Create `src/app/sitemap.ts`:
```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ai-employee.vn",  // Update with actual domain
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

Create `src/app/robots.ts`:
```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ai-employee.vn/sitemap.xml",
  };
}
```

### 5. Cross-Browser Testing
Test on these browsers (use BrowserStack or manual):
- Chrome 111+ (desktop + mobile)
- Safari 16.4+ (desktop + iOS)
- Firefox 128+ (desktop)
- Edge (desktop)

Check for:
- Layout consistency across browsers
- Font rendering (Vietnamese diacritics)
- Animations (fade-in-up)
- Sticky positioning (navbar, mobile CTA)
- Accordion/tab interactions

### 6. Performance Audit
Run Lighthouse in Chrome DevTools (Incognito mode):
```
Target Scores:
- Performance: >= 90
- Accessibility: >= 95
- Best Practices: >= 95
- SEO: >= 95
```

If scores below target, check:
- LCP: Is hero image optimized? Priority set?
- CLS: Are image dimensions set? Fonts loaded with swap?
- FID/TBT: Any heavy JS bundles? (Should be minimal for SSG)

### 7. Configure Deployment

**For Vercel (recommended):**
1. Remove `output: "export"` from `next.config.ts` (if present)
2. Remove `images: { unoptimized: true }` (Vercel optimizes images)
3. Connect GitHub repo to Vercel
4. Set custom domain (when available)
5. Vercel auto-deploys on push to main

**For static export:**
1. Keep `output: "export"` in `next.config.ts`
2. Run `npm run build` -- output in `out/` directory
3. Deploy `out/` to hosting provider

### 8. Post-Deploy Verification
After deployment:
- Visit live URL, verify all sections render
- Test all CTA links go to Tally.so
- Run Lighthouse on live URL
- Test OG tags with Facebook Debugger (requires live URL)
- Test on real mobile device
- Verify HTTPS enabled
- Check custom domain DNS (if configured)

## Todo List
- [ ] Run `npm run build`, verify zero errors
- [ ] Manual content verification (all 9 sections, CTAs, interactive elements)
- [ ] View-source SEO verification (title, meta, OG, JSON-LD)
- [ ] Create sitemap.ts
- [ ] Create robots.ts
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Run Lighthouse audit, achieve target scores
- [ ] Configure deployment (Vercel or static export)
- [ ] Deploy to staging/production
- [ ] Post-deploy verification (live URL, OG debugger, mobile test)

## Success Criteria
- `npm run build` completes with zero errors
- All pages listed as "Static" in build output
- Build output size < 500KB (excluding images)
- All CTA links verified pointing to Tally.so
- JSON-LD validates with Google Rich Results Test
- Lighthouse Performance >= 90, Accessibility >= 95, SEO >= 95
- Page works on Chrome 111+, Safari 16.4+, Firefox 128+, Edge
- Vietnamese diacritics render correctly across all browsers
- Live URL accessible and HTTPS enabled
- OG tags render correct preview on Facebook/Twitter

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Build fails due to type errors | Low | Medium | TypeScript strict catches issues early |
| Lighthouse score below target | Medium | Medium | Optimize images, defer non-critical JS |
| OG image not ready for deploy | High | Low | Use text-only OG fallback, add image later |
| Domain not configured | Medium | Low | Use Vercel preview URL initially |
| Safari rendering differences | Medium | Medium | Test with BrowserStack or real device |

## Security Considerations
- Verify HTTPS enabled on deployed site
- Check no source maps exposed in production (`productionBrowserSourceMaps: false` in next.config.ts)
- Verify no sensitive data in HTML source
- CSP headers recommended for production (configure in Vercel or hosting provider)
- No API keys, secrets, or env vars needed for this static site

## Next Steps
- Share deployed URL with stakeholders for review
- A/B test headline variants (future iteration)
- Add analytics tracking (Google Analytics or Plausible) -- separate task
- Create OG image (1200x630) with Vietnamese text
- Collect real testimonials for credibility section
