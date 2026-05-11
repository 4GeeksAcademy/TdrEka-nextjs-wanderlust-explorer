# Wanderlust Explorer

Wanderlust Explorer is a premium travel discovery application built with Next.js App Router, TypeScript, and Tailwind CSS. It combines editorial storytelling with practical exploration tools, helping users browse, filter, save, and inspect curated travel experiences across 20 destinations.

## Design References

1. Airbnb Experiences Cards
- Borrowed: clear visual hierarchy, quick-scan metadata (price, rating, duration), and image-first browsing patterns.

2. Monocle Magazine Editorial Layouts
- Borrowed: spacious typography, narrative-forward detail pages, and premium, print-inspired visual rhythm.

3. Booking.com Filter Bars
- Borrowed: sticky utility-focused filtering, immediate feedback, and responsive controls optimized for mobile and desktop.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- next/font (Playfair Display + Inter)
- Lucide React Icons

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open the app

- Visit http://localhost:3000

4. Build and run production

```bash
npm run build
npm run start
```

## Features

- ✅ Editorial home hero with textured overlay, responsive typography, CTA, and featured category row
- ✅ Global design system with custom palette, typography variables, glass treatment, and micro-interactions
- ✅ Shared favorites state via React Context at the root layout
- ✅ Sticky responsive navbar with mobile hamburger menu and favorites badge
- ✅ Explorer page with URL-driven filters, debounced search, and responsive card grid
- ✅ Dynamic experience detail pages with booking side panel and related recommendations
- ✅ Favorites page with empty state and clear-all behavior
- ✅ Profile page with member summary, preference cards, and recently viewed section
- ✅ Loading skeletons for card-based listings
- ✅ Route-level SEO metadata for home, explorer, detail, favorites, and profile pages
- ✅ Page fade-in transitions and interaction polish (heart pop, arrow slide, category glow)

## Project Structure

```text
nextjs-wanderlust-explorer/
├── README.md
├── next.config.ts
├── package.json
├── tsconfig.json
├── public/
└── src/
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── experiences/
    │   │   ├── page.tsx
    │   │   └── [id]/
    │   │       └── page.tsx
    │   ├── favorites/
    │   │   └── page.tsx
    │   └── profile/
    │       └── page.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   ├── FilterBar.tsx
    │   ├── ExperienceCard.tsx
    │   ├── ExperienceCard.skeleton.tsx
    │   ├── ExperienceDetailActions.tsx
    │   └── pages/
    │       ├── ExperiencesPageClient.tsx
    │       └── FavoritesPageClient.tsx
    ├── context/
    │   └── FavoritesContext.tsx
    ├── data/
    │   └── experiences.ts
    ├── hooks/
    │   ├── useFilters.ts
    │   └── useExperiences.ts
    ├── lib/
    │   └── cn.ts
    └── types/
        └── experience.ts
```
