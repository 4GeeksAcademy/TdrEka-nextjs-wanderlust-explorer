"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type FilterKey = "search" | "category" | "destination";

export interface FiltersState {
  search: string;
  category: string;
  destination: string;
}

export interface UseFiltersResult extends FiltersState {
  setFilter: (key: FilterKey, value: string) => void;
  clearFilters: () => void;
}

/**
 * Reads active experience filters from URL search params and provides helpers
 * to update or clear them via client-side navigation without a page reload.
 */
export function useFilters(): UseFiltersResult {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const destination = searchParams.get("destination") ?? "";

  const setFilter = useCallback(
    (key: FilterKey, value: string) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        nextParams.set(key, value.trim());
      } else {
        nextParams.delete(key);
      }

      const query = nextParams.toString();
      router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  const clearFilters = useCallback(() => {
    router.push(pathname);
  }, [pathname, router]);

  return {
    search,
    category,
    destination,
    setFilter,
    clearFilters,
  };
}
