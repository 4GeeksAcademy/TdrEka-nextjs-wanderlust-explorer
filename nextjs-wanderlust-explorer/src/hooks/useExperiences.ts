import { useMemo } from "react";
import type { Experience } from "@/types/experience";
import type { FiltersState } from "@/hooks/useFilters";

export interface UseExperiencesResult {
  filtered: Experience[];
  total: number;
  hasResults: boolean;
}

/**
 * Filters the full experiences dataset using URL-driven filter values and
 * memoizes results to avoid unnecessary recalculation between renders.
 */
export function useExperiences(
  experiences: Experience[],
  filters: FiltersState,
): UseExperiencesResult {
  const filtered = useMemo(() => {
    const hasSearch = filters.search.trim().length > 0;
    const hasCategory = filters.category.trim().length > 0;
    const hasDestination = filters.destination.trim().length > 0;

    const escapedTerm = filters.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = hasSearch ? new RegExp(escapedTerm, "i") : null;
    const normalizedCategory = filters.category.trim().toLowerCase();
    const normalizedDestination = filters.destination.trim().toLowerCase();

    return experiences.filter((experience) => {
      const matchesSearch = regex
        ? regex.test(experience.title)
        : true;

      const matchesCategory = hasCategory
        ? experience.category.toLowerCase() === normalizedCategory
        : true;

      const matchesDestination = hasDestination
        ? experience.destination.city.toLowerCase().includes(normalizedDestination) ||
          experience.destination.country
            .toLowerCase()
            .includes(normalizedDestination)
        : true;

      return matchesSearch && matchesCategory && matchesDestination;
    });
  }, [experiences, filters.category, filters.destination, filters.search]);

  return {
    filtered,
    total: filtered.length,
    hasResults: filtered.length > 0,
  };
}
