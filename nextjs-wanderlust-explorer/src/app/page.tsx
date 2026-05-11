import type { Metadata } from "next";
import Link from "next/link";
import { EXPERIENCES } from "@/data/experiences";
import type { Experience } from "@/types/experience";

export const metadata: Metadata = {
  title: "Wanderlust Explorer — Discover Curated Experiences",
  description:
    "Discover premium travel experiences across food, culture, nature, adventure, and wellness.",
};

const CATEGORIES: Array<{ name: Experience["category"]; emoji: string }> = [
  { name: "Adventure", emoji: "🏄" },
  { name: "Culture", emoji: "🏛️" },
  { name: "Food", emoji: "🍜" },
  { name: "Wellness", emoji: "🌿" },
  { name: "Nature", emoji: "🏔️" },
];

export default function Home() {
  const destinationsCount = new Set(
    EXPERIENCES.map((experience) =>
      `${experience.destination.city},${experience.destination.country}`.toLowerCase(),
    ),
  ).size;

  const rawCategoryCounts = EXPERIENCES.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryCounts = CATEGORIES.map(({ name, emoji }) => ({
    name,
    emoji,
    count: rawCategoryCounts[name] || 0,
  }));

  return (
    <div className="flex flex-1 flex-col">
      <section className="grain relative isolate min-h-[calc(100vh-4rem)] overflow-hidden sm:min-h-[calc(100vh-5rem)]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800')",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
          }}
        />

        <div className="grain pointer-events-none absolute inset-0 z-20" />

        <div className="relative z-30 mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center px-4 py-14 sm:min-h-[calc(100vh-5rem)] sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              {EXPERIENCES.length}+ curated experiences across {destinationsCount} destinations
            </span>

            <h1
              className="hero-text-shadow text-5xl font-semibold leading-[0.95] tracking-tight !text-white md:text-7xl"
              style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
            >
              The World Is
              <br />
              Waiting for <span className="bg-gradient-to-r from-[#FF6B6B] to-orange-400 bg-clip-text text-transparent">You</span>
            </h1>

            <p className="hero-text-shadow animate-fade-in mt-5 max-w-xl text-lg leading-relaxed text-white/85 sm:mt-6">
              Curated journeys for curious travelers, crafted with cinematic scenery,
              unforgettable tables, and the kind of stories that stay with you long
              after the return flight.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/experiences"
                className="inline-flex items-center justify-center rounded-full bg-[#FF6B6B] px-8 py-4 text-base font-bold text-white shadow-[0_14px_32px_-18px_rgb(255_107_107/0.92)] transition duration-300 hover:scale-[1.03] hover:ring-4 hover:ring-white/20 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                Start Exploring <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>

            <div className="mt-8 flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 text-sm text-white">
              <span className="snap-start flex-shrink-0 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-white/25">🏄 Adventure</span>
              <span className="snap-start flex-shrink-0 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-white/25">🍜 Food &amp; Culture</span>
              <span className="snap-start flex-shrink-0 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-white/25">🌿 Wellness</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-muted/15 bg-cream py-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2
              className="text-2xl text-primary sm:text-3xl"
              style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
            >
              Featured Categories
            </h2>
            <Link
              href="/experiences"
              className="text-sm font-medium text-slate-muted transition-colors hover:text-primary"
            >
              View all experiences
            </Link>
          </div>

          <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
            {categoryCounts.map((category) => (
              <Link
                key={category.name}
                href={`/experiences?category=${encodeURIComponent(category.name)}`}
                className="glass card-hover min-w-[220px] rounded-2xl px-5 py-4"
              >
                <div className="text-2xl" aria-hidden="true">
                  {category.emoji}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-primary">{category.name}</h3>
                <p className="mt-1 text-sm text-slate-muted">{category.count} experiences</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
