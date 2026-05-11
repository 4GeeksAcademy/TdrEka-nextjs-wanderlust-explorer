"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/cn";

interface ExperienceDetailActionsProps {
  experienceId: string;
}

export default function ExperienceDetailActions({
  experienceId,
}: ExperienceDetailActionsProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [isHeartPopping, setIsHeartPopping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFavorite = favoriteIds.includes(experienceId);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        setIsHeartPopping(true);
        toggleFavorite(experienceId);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => setIsHeartPopping(false), 300);
      }}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      data-experience-id={experienceId}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-muted/20 bg-white text-primary shadow-sm transition duration-200 hover:scale-105 hover:border-accent/40 hover:text-accent active:scale-95"
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isHeartPopping && "animate-heart-pop",
          isFavorite ? "fill-accent text-accent" : "text-primary",
        )}
      />
    </button>
  );
}
