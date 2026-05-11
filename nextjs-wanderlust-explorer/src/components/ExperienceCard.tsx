"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Heart, Star, StarHalf } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import type { Experience } from "@/types/experience";
import { cn } from "@/lib/cn";

interface ExperienceCardProps {
  experience: Experience;
}

function formatPrice(price: number): string {
  return `from $${price}`;
}

function getStarState(rating: number): Array<"full" | "half" | "empty"> {
  const rounded = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(rounded);
  const hasHalf = rounded - fullStars === 0.5;

  return Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) return "full";
    if (index === fullStars && hasHalf) return "half";
    return "empty";
  });
}

export default function ExperienceCard({
  experience,
}: ExperienceCardProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [isHeartPopping, setIsHeartPopping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFavorite = favoriteIds.includes(experience.id);
  const stars = getStarState(experience.rating);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <article className="group card-hover overflow-hidden rounded-2xl border border-slate-muted/15 bg-cream shadow-[0_14px_34px_-24px_rgb(15_23_42/0.45)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={experience.imageUrl}
          alt={experience.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />

        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
          {experience.category}
        </span>

        <span className="absolute right-14 top-3 rounded-full bg-[#0F172A]/80 px-3 py-1 text-xs font-medium text-white">
          {formatPrice(experience.price)}
        </span>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setIsHeartPopping(true);
            toggleFavorite(experience.id);
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => setIsHeartPopping(false), 300);
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition duration-200 hover:scale-105 hover:bg-black/45 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-90"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isHeartPopping && "animate-heart-pop",
              isFavorite ? "fill-accent text-accent" : "text-white",
            )}
          />
        </button>
      </div>

      <div className="space-y-4 bg-cream p-5">
        <h3
          className="overflow-hidden text-[18px] font-semibold leading-snug text-[#0F172A] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
          style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
        >
          {experience.title}
        </h3>

        <p className="text-sm text-slate-500">
          📍 {experience.destination.city}, {experience.destination.country}
        </p>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-accent">
            {stars.map((state, index) => {
              if (state === "full") {
                return <Star key={index} className="h-4 w-4 fill-accent text-accent" />;
              }

              if (state === "half") {
                return <StarHalf key={index} className="h-4 w-4 fill-accent text-accent" />;
              }

              return <Star key={index} className="h-4 w-4 text-slate-muted/35" />;
            })}
            <span className="ml-1 text-sm font-medium text-slate-700">
              {experience.rating.toFixed(1)}
            </span>
          </div>

          <span className="rounded-full bg-slate-muted/10 px-3 py-1 text-xs font-medium text-slate-muted">
            {experience.duration}
          </span>
        </div>

        <Link
          href={`/experiences/${experience.id}`}
          className="inline-flex items-center text-sm font-medium text-[#FF6B6B] transition-colors hover:text-[#E65E5E] focus-visible:ring-2 focus-visible:ring-coral focus-visible:outline-none"
        >
          View Experience
          <span
            aria-hidden="true"
            className="ml-1 transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
