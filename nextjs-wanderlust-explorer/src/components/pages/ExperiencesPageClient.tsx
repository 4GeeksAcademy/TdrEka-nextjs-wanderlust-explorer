"use client";

import { useEffect, useMemo, useState } from "react";
import FilterBar from "@/components/FilterBar";
import ExperienceCard from "@/components/ExperienceCard";
import ExperienceCardSkeleton from "@/components/ExperienceCard.skeleton";
import { useFavorites } from "@/context/FavoritesContext";
import { EXPERIENCES } from "@/data/experiences";
import { useExperiences } from "@/hooks/useExperiences";
import { useFilters } from "@/hooks/useFilters";
import type { Experience } from "@/types/experience";

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <ExperienceCardSkeleton key={`skeleton-${i}`} />
      ))}
    </div>
  );
}

interface ExperienceResultsProps {
  hasResults: boolean;
  clearFilters: () => void;
  experiences: Experience[];
}

function ExperienceResults({
  hasResults,
  clearFilters,
  experiences,
}: ExperienceResultsProps) {
  if (!hasResults) {
    return (
      <div className="glass flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-slate-muted/20 px-6 py-14 text-center">
        <div className="mb-4 text-5xl" aria-hidden="true">
          🗺️
        </div>
        <h2 className="text-2xl text-primary" style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}>
          No results found
        </h2>
        <p className="mt-2 max-w-md text-sm text-slate-muted sm:text-base">
          Try broadening your search or removing filters to uncover more extraordinary journeys.
        </p>
        <button
          type="button"
          onClick={clearFilters}
          className="mt-6 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:brightness-110"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}

export default function ExperiencesPageClient() {
  const [isHydrated, setIsHydrated] = useState(false);
  const filters = useFilters();
  const { filtered, total, hasResults } = useExperiences(EXPERIENCES, filters);
  const { favoriteIds } = useFavorites();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const countries = useMemo(() => {
    const unique = new Set(EXPERIENCES.map((experience) => experience.destination.country));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, []);

  return (
    <div className="flex flex-1 flex-col bg-cream">
      <FilterBar filters={filters} countries={countries} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <p className="mb-6 text-sm text-slate-500">
          Showing {total} of {EXPERIENCES.length} experiences · {favoriteIds.length} saved
        </p>

        {isHydrated ? (
          <ExperienceResults
            hasResults={hasResults}
            clearFilters={filters.clearFilters}
            experiences={filtered}
          />
        ) : (
          <SkeletonGrid />
        )}
      </main>
    </div>
  );
}