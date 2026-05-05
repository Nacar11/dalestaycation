# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Brand name: Adam's Staycation** (the repo is named `dalestaycation` but the product/website is Adam's Staycation). Single-page marketing site for an Airbnb property (Tambuli Seaside Living, Lapu-Lapu City, Cebu). Built with Next.js 14 (App Router) and TypeScript. No tests — lint is the only CI check.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run lint` — ESLint
- `npm start` — Serve production build

## Architecture

Single page (`app/page.tsx`) with three scrollable sections: `LandingSection` → `ExperienceSection` → `HostSection`, wrapped by `Navbar`.

**Component layers:**
- `components/sections/` — Page sections; all use `'use client'` for Framer Motion `useInView` scroll animations
- `components/shared/` — Navbar and other layout primitives
- `components/ui/` — Magic UI / shadcn-style animated primitives installed via `npx shadcn@latest add "https://magicui.design/r/[component].json"`
- `lib/constants.ts` — `AIRBNB_LISTING_URL` and `CONTACT_EMAIL` (single source of truth for external links)
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge)

Static property images live in `public/images/` organized by room/area (studio, pool, beach, gym, etc.).

## Design System

### Color tokens (use these, never hardcode hex)

| Token | Hex | Usage |
|---|---|---|
| `sand-light` | `#F5F0E8` | Primary backgrounds, cards |
| `sand` | `#E8DFD0` | Secondary backgrounds |
| `sand-dark` | `#C4B8A5` | Borders, muted text |
| `ocean-light` | `#E6F2F5` | Accent backgrounds |
| `ocean` | `#1E4D5C` | Primary text, CTAs, navigation |
| `ocean-deep` | `#0D2B33` | Headings, overlays |
| `coral` | `#E07A5F` | Accent CTAs, highlights |

### Typography
- `font-display` (Playfair Display) — H1/H2 display headings
- `font-sans` (Inter) — body text and UI elements

### Utility classes (defined in `app/globals.css`)
- `glass-effect`, `glass-card` — glassmorphism
- `animate-fade-in`, `animate-slide-up`, `animate-float`, `animate-stagger` — CSS keyframe animations
- Premium shadow utilities

## Magic UI Integration

**Component selection hierarchy** (always prefer in this order):
1. **Magic UI** — text effects, animated buttons, cards with hover effects, background effects, scroll reveals
2. **shadcn/ui** — form controls and utilities not covered by Magic UI
3. **Framer Motion wrappers** — only when neither above fits
4. **Custom component** — last resort

**Installing new Magic UI components:**
```bash
npx shadcn@latest add "https://magicui.design/r/[component-name].json"
# e.g.: blur-fade, magic-card, shimmer-button, text-animate, neon-gradient-card
```

**Key components already installed and their roles:**
- `BlurFade` — all scroll-triggered content reveals (use `inView` prop)
- `TextAnimate` — section titles and hero text
- `MagicCard` — amenity/feature cards with spotlight hover
- `ShimmerButton` — primary CTAs ("Book Your Stay")
- `NumberTicker`, `Marquee`, `Particles`, `DotPattern`, `Ripple`, `BorderBeam`, `ShineBorder`, `NeonGradientCard`, `AnimatedShinyText`

**Standard stagger pattern for lists:**
```typescript
const BASE_DELAY = 0.2
const STAGGER_DELAY = 0.1

{items.map((item, index) => (
  <BlurFade key={item.id} delay={BASE_DELAY + STAGGER_DELAY * index} inView direction="up">
    <MagicCard gradientColor="rgba(30, 77, 92, 0.15)">{/* content */}</MagicCard>
  </BlurFade>
))}
```

**Adapting Magic UI colors to design tokens:**
```typescript
// MagicCard spotlight color
gradientColor="rgba(30, 77, 92, 0.15)"  // ocean

// ShimmerButton
shimmerColor="rgba(224, 122, 95, 0.3)"  // coral

// NeonGradientCard
neonColors={{ firstColor: "#E07A5F", secondColor: "#1E4D5C" }}  // coral + ocean
```

## Framer Motion Standards

```typescript
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
}
```

| Animation | Duration | Trigger |
|---|---|---|
| Fade In | 600ms ease-out | Scroll into view |
| Slide Up | 500ms ease-out | Scroll into view |
| Scale Tap | 100ms ease-in-out | Button press |
| Hover Zoom | 300ms ease-out | Mouse enter |
| Float | 3000ms ease-in-out | Continuous |

For heavy components (`Globe`, `IconCloud`), use `dynamic()` with `ssr: false` and a pulse skeleton as loading fallback.

## Code Conventions

- `'use client'` only when needed (state, effects, event handlers)
- `const` arrow functions, not `function` declarations
- Event handlers prefixed with `handle` (e.g., `handleClick`, `handleSubmit`)
- TypeScript interfaces/types for all props and data structures
- `cn()` for conditional class merging — never inline styles or `<style>` tags
- Early returns to reduce nesting

## SEO Metadata Template

```typescript
export const metadata: Metadata = {
  title: "Adam's Staycation | Luxury Condo Rental at Tambuli Seaside Living, Cebu",
  description: 'Book your luxury staycation at Tambuli Seaside Living in Lapu-Lapu City, Cebu.',
  openGraph: {
    title: "Adam's Staycation | Luxury Cebu Staycation",
    description: 'Your luxury escape at Tambuli Seaside Living',
    images: ['/og-image.png'],
    url: 'https://adamstaycation.business',
    type: 'website',
  },
}
```

## Accessibility

- All interactive elements need `aria-label`, visible focus states (`focus:` utilities), and `onKeyDown` alongside `onClick`
- Semantic HTML: `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- `next/image` for all images with descriptive `alt` text, `width`, `height`, `priority` on above-the-fold images
- Respect `prefers-reduced-motion` by zeroing out animation durations when matched
