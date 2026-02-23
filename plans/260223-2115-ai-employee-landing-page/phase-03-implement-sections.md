# Phase 03 - Implement Landing Page Sections

## Context Links
- [Plan Overview](./plan.md)
- [Phase 02 - Layout & Shared](./phase-02-layout-and-shared.md)
- [Conversion Patterns Report](../reports/researcher-260223-2115-landing-page-conversion-patterns.md)
- [Next.js 15 Best Practices Report](../reports/researcher-260223-2115-nextjs15-landing-best-practices.md)

## Overview
- **Priority**: P1
- **Status**: pending
- **Effort**: 5h
- **Description**: Implement all 9 landing page sections following PAS+StoryBrand hybrid framework. Each section is a standalone component composed in page.tsx. All Vietnamese content centralized in `lib/constants.ts`.

## Key Insights
- **PAS+StoryBrand hybrid** converts 15-25% better for educational products
- Section order follows: Hook frustration -> Agitate problem -> Bridge to solution -> Build credibility -> Show curriculum -> Show deliverables -> Price anchoring -> Handle objections -> Final push
- Multiple CTA placements: Hero, after credibility, pricing, final CTA (same Tally.so link)
- Testimonial near pricing = +340% conversion lift
- Accordion FAQ post-pricing addresses final objections (+30-50% friction reduction)
- Red/Orange CTAs outperform green by 162%

## Requirements

### Functional
- 9 section components, each self-contained
- All text content in Vietnamese, stored in `lib/constants.ts`
- CTA buttons throughout linking to Tally.so form
- Video embed in credibility section (YouTube/Vimeo iframe)
- Tabs or accordion for 3-week curriculum
- 5 deliverable cards using shadcn Card
- 2-tier pricing with shadcn Card
- 10-question FAQ using shadcn Accordion
- Smooth scroll anchors between sections

### Non-Functional
- Each section component < 100 lines (extract sub-components if needed)
- Server Components by default (no `"use client"` unless interactive)
- Only sections with interactivity (Tabs, Accordion) use `"use client"`
- Semantic HTML: one `<h1>` in hero, `<h2>` for each section, `<h3>` for sub-items

## Architecture

### Page Composition
```typescript
// src/app/page.tsx
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { CredibilitySection } from "@/components/sections/credibility-section";
import { CurriculumSection } from "@/components/sections/curriculum-section";
import { DeliverablesSection } from "@/components/sections/deliverables-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FinalCtaSection } from "@/components/sections/final-cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <CredibilitySection />
      <CurriculumSection />
      <DeliverablesSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
```

### Content Structure (lib/constants.ts)
```typescript
export const HERO_CONTENT = { headline, subheadline, ctaText, backgroundNote };
export const PROBLEM_CONTENT = { title, painPoints[], comparison };
export const SOLUTION_CONTENT = { title, pillars[] };
export const CREDIBILITY_CONTENT = { story, stats, videoUrl };
export const CURRICULUM_CONTENT = { weeks[] };
export const DELIVERABLES_CONTENT = { items[] };
export const PRICING_CONTENT = { plans[], guarantee };
export const FAQ_CONTENT = { questions[] };
export const FINAL_CTA_CONTENT = { headline, subtext, ctaText };
```

## Related Code Files

### Files to Create
| File | Purpose | Client? |
|------|---------|---------|
| `src/components/sections/hero-section.tsx` | Frustration hook + CTA | No |
| `src/components/sections/problem-section.tsx` | Pain agitation | No |
| `src/components/sections/solution-section.tsx` | Skills + Workflows + Agents | No |
| `src/components/sections/credibility-section.tsx` | Personal story + video | No |
| `src/components/sections/curriculum-section.tsx` | 3-week tabs/accordion | Yes (Tabs) |
| `src/components/sections/deliverables-section.tsx` | 5 cards | No |
| `src/components/sections/pricing-section.tsx` | 2 plans + guarantee | No |
| `src/components/sections/faq-section.tsx` | 10 Q&A accordion | Yes (Accordion) |
| `src/components/sections/final-cta-section.tsx` | Final push + CTA | No |

### Files to Modify
| File | Change |
|------|--------|
| `src/app/page.tsx` | Import and compose all 9 sections |
| `src/lib/constants.ts` | Add all Vietnamese content for every section |

## Implementation Steps

### 1. Populate lib/constants.ts with All Content
Define all Vietnamese text content for all 9 sections. Structure as typed objects. This is the single source of truth for all copy.

Key content blocks:
- `SITE` -- brand, URL, Tally link (from Phase 2)
- `HERO_CONTENT` -- frustration hook headline, sub-headline, CTA text
- `PROBLEM_CONTENT` -- "Dung AI ≠ Tuyen Dung AI" comparison, 3-4 pain points
- `SOLUTION_CONTENT` -- 3 pillars (Skills, Workflows, Agents) with icons/descriptions
- `CREDIBILITY_CONTENT` -- personal story text, stats, video embed URL
- `CURRICULUM_CONTENT` -- 3 weeks, each with 2 calls, topics per call
- `DELIVERABLES_CONTENT` -- 5 items (what you get), each with title + description
- `PRICING_CONTENT` -- 2 plans (one-time $1200, installment $500/mo x3), guarantee text
- `FAQ_CONTENT` -- 10 questions + answers
- `FINAL_CTA_CONTENT` -- closing headline, urgency text, CTA text

### 2. Hero Section (`hero-section.tsx`)
**Design**: Full-width section, light gray background, centered content
**Content**:
- `<h1>` -- Frustration hook headline (large, bold, Be Vietnam Pro)
- Subheadline -- 1-2 sentences expanding the pain point
- Primary CTAButton (large, orange, "Dang Ky Ngay")
- Optional: subtle background pattern or gradient
- Optional: social proof line ("200+ hoc vien da tham gia")

**Layout**:
```
[ ===================== Hero Section ===================== ]
[                                                          ]
[              <h1> Frustration Headline </h1>             ]
[              <p> Subheadline text... </p>                ]
[              [ Dang Ky Ngay -> Tally.so ]                ]
[              "200+ hoc vien da tham gia"                 ]
[                                                          ]
```

**Styling**: `py-20 md:py-32`, `text-center`, `max-w-3xl mx-auto`

### 3. Problem Section (`problem-section.tsx`)
**Design**: White background, centered content
**Content**:
- `<h2>` -- "Dung AI ≠ Tuyen Dung AI"
- 3-4 pain point cards/blocks showing common struggles
- Each pain point: icon + short description
- Visual contrast between "what most people do" vs "what works"

**Layout**:
```
[ ============== Problem Section ============== ]
[                                               ]
[     <h2> Dung AI ≠ Tuyen Dung AI </h2>       ]
[                                               ]
[  [Pain 1]  [Pain 2]  [Pain 3]  [Pain 4]      ]
[  Icon+text Icon+text Icon+text Icon+text      ]
[                                               ]
```

**Styling**: `py-16 md:py-24`, grid layout `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

### 4. Solution Section (`solution-section.tsx`)
**Design**: Light gray background, 3-column layout
**Content**:
- `<h2>` -- Solution bridge headline
- 3 pillars: Skills, Workflows, Agents
- Each pillar: icon + title + description
- Brief explanation of how the program bridges the gap

**Layout**:
```
[ ============== Solution Section ============== ]
[                                                ]
[   <h2> What You'll Actually Learn </h2>        ]
[                                                ]
[   [Skills]     [Workflows]    [Agents]         ]
[   Icon         Icon           Icon             ]
[   Title        Title          Title            ]
[   Description  Description    Description      ]
[                                                ]
```

**Styling**: `py-16 md:py-24`, `grid-cols-1 md:grid-cols-3 gap-8`

### 5. Credibility Section (`credibility-section.tsx`)
**Design**: White background, two-column on desktop
**Content**:
- `<h2>` -- Credibility headline
- Personal story (left column): brief bio, experience, why this program
- Case study stats (badges/numbers): cohorts run, students, success rate
- Video embed (right column or below): YouTube/Vimeo iframe
- CTA button after credibility content

**Layout**:
```
[ ============= Credibility Section ============= ]
[                                                  ]
[  [Story + Stats]         [Video Embed]           ]
[  Bio paragraph           YouTube iframe          ]
[  Stats: 3 cohorts,                               ]
[  200+ students, etc.                             ]
[                                                  ]
[         [ Dang Ky Ngay -> Tally.so ]             ]
```

**Notes**: Video iframe uses `loading="lazy"`, `allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"`. Wrap in responsive container (`aspect-video`).

### 6. Curriculum Section (`curriculum-section.tsx`)
**Design**: Light gray background, tabbed interface
**Component**: `"use client"` -- uses shadcn Tabs
**Content**:
- `<h2>` -- "Noi Dung Chuong Trinh"
- 3 tabs: "Tuan 1", "Tuan 2", "Tuan 3"
- Each tab shows 2 calls with topics
- Each call: title + bullet list of topics

**Layout**:
```
[ ============= Curriculum Section ============= ]
[                                                 ]
[   <h2> Noi Dung Chuong Trinh </h2>             ]
[                                                 ]
[   [Tuan 1] [Tuan 2] [Tuan 3]   <- Tabs         ]
[   ┌─────────────────────────┐                   ]
[   │ Call 1: Topic title     │                   ]
[   │ - Bullet point 1       │                   ]
[   │ - Bullet point 2       │                   ]
[   │                         │                   ]
[   │ Call 2: Topic title     │                   ]
[   │ - Bullet point 1       │                   ]
[   │ - Bullet point 2       │                   ]
[   └─────────────────────────┘                   ]
```

**Styling**: shadcn Tabs with custom styling. Tab triggers styled with `font-heading`. Active tab: `border-b-2 border-accent`.

### 7. Deliverables Section (`deliverables-section.tsx`)
**Design**: White background, card grid
**Content**:
- `<h2>` -- "Ban Se Nhan Duoc Gi?"
- 5 shadcn Cards, each with: icon + title + short description
- Items: e.g., custom AI agents, workflow templates, community access, recordings, 1-on-1 support

**Layout**:
```
[ ============ Deliverables Section ============ ]
[                                                ]
[   <h2> Ban Se Nhan Duoc Gi? </h2>              ]
[                                                ]
[   [Card 1]  [Card 2]  [Card 3]                ]
[        [Card 4]  [Card 5]                      ]
[                                                ]
```

**Styling**: `grid-cols-1 md:grid-cols-3` first row, `grid-cols-1 md:grid-cols-2` second row centered. Or single `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` with last row auto-centered.

### 8. Pricing Section (`pricing-section.tsx`)
**Design**: Light gray background, 2-column card layout
**Content**:
- `<h2>` -- "Chi Phi Dau Tu"
- 2 shadcn Cards side by side:
  - **Option 1**: One-time $1,200 (highlighted as "Best Value" with Badge)
  - **Option 2**: 3 installments of $500/month
- Each card: price, what's included (bullet list), CTA button
- Guarantee text below cards (money-back or satisfaction guarantee)
- Optional: short testimonial quote near pricing (+340% conversion)

**Layout**:
```
[ =============== Pricing Section =============== ]
[                                                 ]
[   <h2> Chi Phi Dau Tu </h2>                     ]
[                                                 ]
[   ┌──────────────┐  ┌──────────────┐            ]
[   │ [Best Value] │  │              │            ]
[   │ $1,200       │  │ $500/thang   │            ]
[   │ One-time     │  │ x 3 thang    │            ]
[   │ - Feature    │  │ - Feature    │            ]
[   │ - Feature    │  │ - Feature    │            ]
[   │ [Dang Ky]    │  │ [Dang Ky]    │            ]
[   └──────────────┘  └──────────────┘            ]
[                                                 ]
[   "Bao dam hoan tien trong 7 ngay"              ]
```

**Styling**: `grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto`. Best Value card: `border-accent ring-2 ring-accent` + Badge.

### 9. FAQ Section (`faq-section.tsx`)
**Design**: White background, centered accordion
**Component**: `"use client"` -- uses shadcn Accordion
**Content**:
- `<h2>` -- "Cau Hoi Thuong Gap"
- 10 questions in shadcn Accordion
- Questions cover: prerequisites, time commitment, refund policy, technical requirements, community access, etc.

**Layout**:
```
[ ================ FAQ Section ================ ]
[                                               ]
[   <h2> Cau Hoi Thuong Gap </h2>               ]
[                                               ]
[   ┌─ Q1: Question text... ────── [+] ┐       ]
[   └───────────────────────────────────┘       ]
[   ┌─ Q2: Question text... ────── [+] ┐       ]
[   └───────────────────────────────────┘       ]
[   ...                                         ]
[   ┌─ Q10: Question text... ───── [+] ┐       ]
[   └───────────────────────────────────┘       ]
```

**Styling**: `max-w-2xl mx-auto`, shadcn Accordion with `type="single" collapsible`. Custom styling: `font-heading` for questions, `text-text-muted` for answers.

### 10. Final CTA Section (`final-cta-section.tsx`)
**Design**: Navy/primary background, white text, centered
**Content**:
- `<h2>` -- Closing urgency headline
- Subtext -- 1-2 sentences reinforcing value
- Large CTAButton (orange on dark = high contrast)
- Optional: countdown or cohort start date

**Layout**:
```
[ ============= Final CTA Section ============= ]
[  (dark navy background)                       ]
[                                               ]
[   <h2> Closing headline </h2>                 ]
[   <p> Reinforcement text </p>                 ]
[   [ Dang Ky Ngay -> Tally.so ]                ]
[                                               ]
```

**Styling**: `bg-primary text-white py-20 md:py-28 text-center`

### 11. Compose page.tsx
Import all 9 sections in order, add section `id` attributes for smooth scroll.

### 12. Add Smooth Scroll
In `globals.css`: `html { scroll-behavior: smooth; }`. Each section gets `id` attribute for anchor links.

### 13. Verify All Sections
- Run `npm run dev`, scroll through all sections
- Verify content renders in Vietnamese
- Verify all CTA buttons link to Tally.so
- Check heading hierarchy (h1 > h2 > h3)

## Todo List
- [ ] Populate lib/constants.ts with all Vietnamese content (9 sections)
- [ ] Implement hero-section.tsx (frustration hook + CTA)
- [ ] Implement problem-section.tsx (pain agitation)
- [ ] Implement solution-section.tsx (3 pillars)
- [ ] Implement credibility-section.tsx (story + video)
- [ ] Implement curriculum-section.tsx (tabs, 3 weeks)
- [ ] Implement deliverables-section.tsx (5 cards)
- [ ] Implement pricing-section.tsx (2 plans + guarantee)
- [ ] Implement faq-section.tsx (10 questions, accordion)
- [ ] Implement final-cta-section.tsx (closing CTA)
- [ ] Compose all sections in page.tsx with section IDs
- [ ] Add smooth scroll behavior
- [ ] Verify all sections render correctly in dev

## Success Criteria
- All 9 sections render in order on the landing page
- All text displays in Vietnamese with correct diacritics
- CTA buttons in Hero, Credibility, Pricing, and Final CTA all link to Tally.so
- Curriculum tabs switch between 3 weeks without page reload
- FAQ accordion expands/collapses correctly
- Pricing cards show both options with "Best Value" badge on one-time
- Video embed loads lazily in credibility section
- Heading hierarchy: exactly one `<h1>` (hero), eight `<h2>` (one per remaining section)
- No `"use client"` on sections that don't need interactivity
- Each component file < 100 lines

## Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Vietnamese content not finalized | High | Medium | Use realistic placeholder text, easy to swap from constants.ts |
| Video embed URL not provided | High | Low | Use placeholder iframe with "Video Coming Soon" fallback |
| Tabs/Accordion performance on mobile | Low | Low | shadcn components are Radix-based, well-optimized |
| Content too long, page feels heavy | Medium | Medium | Keep each section concise; whitespace and visual breaks |
| Too many CTA buttons feels pushy | Low | Medium | Limit to 4 placements: Hero, Credibility, Pricing, Final |

## Security Considerations
- Video iframe: use `sandbox` attribute if embedding unknown sources
- External links use `rel="noopener noreferrer"`
- No user-generated content rendered (all from constants.ts)

## Next Steps
- Phase 4: Mobile responsive, animations, performance polish
