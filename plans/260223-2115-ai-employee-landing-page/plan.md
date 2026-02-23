---
title: "AI Employee Landing Page"
description: "Vietnamese landing page for AI Employee 3-week cohort program using Next.js 15 + Tailwind v4 + shadcn/ui"
status: pending
priority: P1
effort: 12h
branch: main
tags: [landing-page, nextjs, tailwind-v4, shadcn-ui, vietnamese, ssg]
created: 2026-02-23
---

# AI Employee Landing Page - Implementation Plan

## Objective
Build a high-converting Vietnamese landing page selling the AI Employee cohort (3-week program, $1200 or $500/mo x3). CTA links to Tally.so form. Light theme, SSG, optimized for Core Web Vitals.

## Tech Stack
- Next.js 15 (App Router, SSG)
- Tailwind CSS v4 (CSS-first config)
- shadcn/ui (Accordion, Button, Card, Badge, Tabs)
- Be Vietnam Pro (headings) + Open Sans (body) via `next/font/google`
- Colors: Navy #1A202C, Light gray bg #F7FAFC, Orange accent #FF6B35

## Research Reports
- [Next.js 15 Best Practices](../reports/researcher-260223-2115-nextjs15-landing-best-practices.md)
- [Conversion Patterns](../reports/researcher-260223-2115-landing-page-conversion-patterns.md)

## Phases

| # | Phase | File | Status | Effort |
|---|-------|------|--------|--------|
| 1 | Project Setup | [phase-01-project-setup.md](./phase-01-project-setup.md) | pending | 1.5h |
| 2 | Layout & Shared Components | [phase-02-layout-and-shared.md](./phase-02-layout-and-shared.md) | pending | 2h |
| 3 | Implement Sections (1-9) | [phase-03-implement-sections.md](./phase-03-implement-sections.md) | pending | 5h |
| 4 | Responsive & Polish | [phase-04-responsive-and-polish.md](./phase-04-responsive-and-polish.md) | pending | 2h |
| 5 | Testing & Deploy | [phase-05-testing-and-deploy.md](./phase-05-testing-and-deploy.md) | pending | 1.5h |

## Key Dependencies
- Tally.so form URL: https://tally.so/r/obDBxx
- Video embed URL (credibility section) -- TBD from client
- Testimonial/case study content -- TBD from client
- Hero image/illustration assets -- TBD or use placeholder

## Architecture
Single-page SSG app. All content in `lib/constants.ts`. Nine section components composed in `page.tsx`. shadcn/ui for interactive elements (Accordion, Tabs). No API routes, no database.

## Key Decisions
- **PAS+StoryBrand hybrid** copywriting framework (15-25% better conversion for educational products)
- **CSS-first Tailwind v4** config via `@theme` directives (no JS config overhead)
- **All Vietnamese content centralized** in `lib/constants.ts` for easy editing
- **Sticky mobile CTA** button for friction-free enrollment
- **No quiz/form built-in** -- CTA links to external Tally.so
