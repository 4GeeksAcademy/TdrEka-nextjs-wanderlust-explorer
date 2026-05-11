"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import ExperienceCard from "@/components/ExperienceCard";
import { useFavorites } from "@/context/FavoritesContext";
import { EXPERIENCES } from "@/data/experiences";
import { useMemo } from "react";

export default function FavoritesPageClient() {
  const { favoriteIds, clearFavorites } = useFavorites();

  const favoriteExperiences = useMemo(
    () => EXPERIENCES.filter((experience) => favoriteIds.includes(experience.id)),
    [favoriteIds],
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1
            className="text-4xl text-primary sm:text-5xl"
            style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
          >
            Your Favorites
          </h1>
          <p className="mt-2 text-sm text-slate-muted sm:text-base">
            Experiences you&apos;ve saved
          </p>
        </div>

        {favoriteIds.length > 0 ? (
          <button
            type="button"
            onClick={clearFavorites}
            className="rounded-full border border-slate-muted/25 bg-white/70 px-5 py-2 text-sm font-semibold text-primary transition hover:border-accent/45 hover:text-accent"
          >
            Clear all favorites
          </button>
        ) : null}
      </header>

      {favoriteExperiences.length === 0 ? (
        <section className="glass flex min-h-[420px] flex-1 flex-col items-center justify-center rounded-3xl border border-slate-muted/20 px-6 py-16 text-center">
          <Heart className="h-16 w-16 fill-accent text-accent" aria-hidden="true" />
          <h2
            className="mt-5 text-3xl text-primary"
            style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
          >
            Nothing saved yet
          </h2>
          <p className="mt-3 max-w-md text-sm text-slate-muted sm:text-base">
            Start bookmarking journeys you love and build your personal edit of unforgettable escapes.
          </p>
          <Link
            href="/experiences"
            className="mt-7 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:brightness-110"
          >
            Discover Experiences <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </section>
      )}
    </div>
  );
}