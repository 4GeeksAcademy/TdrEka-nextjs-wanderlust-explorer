"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import type { Experience } from "@/types/experience";
import type { FilterKey, UseFiltersResult } from "@/hooks/useFilters";
import { cn } from "@/lib/cn";

const CATEGORIES: Array<"All" | Experience["category"]> = [
  "All",
  "Adventure",
  "Culture",
  "Food",
  "Wellness",
  "Nature",
];

interface FilterBarProps {
  filters: UseFiltersResult;
  countries: string[];
}

export default function FilterBar({ filters, countries }: FilterBarProps) {
  const [searchDraft, setSearchDraft] = useState(filters.search);
  const destinationSelectId = "destination-filter";

  useEffect(() => {
    setSearchDraft(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchDraft !== filters.search) {
        filters.setFilter("search", searchDraft);
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [filters, searchDraft]);

  const isActive =
    filters.search.length > 0 ||
    filters.category.length > 0 ||
    filters.destination.length > 0;

  const updateFilter = (key: FilterKey, value: string) => {
    filters.setFilter(key, value);
  };

  return (
    <section className="sticky top-16 z-40 border-b border-slate-200 bg-white shadow-sm sm:top-20">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
            <label className="relative block md:min-w-[260px] md:flex-[1.2]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchDraft}
                onChange={(event) => setSearchDraft(event.target.value)}
                placeholder="Search experiences"
                aria-label="Search experiences"
                className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#0F172A] focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
              />
            </label>

            <fieldset className="flex flex-wrap gap-2 md:flex-1">
              <legend className="sr-only">Filter by category</legend>
              {CATEGORIES.map((category) => {
                const active =
                  category === "All"
                    ? filters.category.length === 0
                    : filters.category.toLowerCase() === category.toLowerCase();

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => updateFilter("category", category === "All" ? "" : category)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-medium transition focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none sm:text-sm",
                      active
                        ? "bg-[#0F172A] text-white"
                        : "text-slate-600 hover:text-[#0F172A]",
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </fieldset>

            <label className="block md:min-w-[200px] md:flex-[0.8]">
              <span className="sr-only" id={`${destinationSelectId}-label`}>
                Filter by destination country
              </span>
              <select
                id={destinationSelectId}
                value={filters.destination}
                onChange={(event) => updateFilter("destination", event.target.value)}
                aria-labelledby={`${destinationSelectId}-label`}
                className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-[#0F172A] focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
              >
                <option value="">All destinations</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>

            {isActive ? (
              <button
                type="button"
                onClick={filters.clearFilters}
                className="justify-self-start self-center text-sm font-medium text-slate-600 underline-offset-4 transition hover:text-[#0F172A] hover:underline focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none md:ml-auto"
              >
                Clear filters
              </button>
            ) : (
              <span className="hidden md:block" />
            )}
        </div>
      </div>
    </section>
  );
}
