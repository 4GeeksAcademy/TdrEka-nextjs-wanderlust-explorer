"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/cn";

type NavLink = {
  href: string;
  label: "Explore" | "Favorites" | "Profile";
};

const NAV_LINKS: NavLink[] = [
  { href: "/experiences", label: "Explore" },
  { href: "/favorites", label: "Favorites" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { favoriteIds } = useFavorites();
  const favoritesCount = favoriteIds.length;
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;
  const heartIconClass = favoritesCount > 0
    ? "h-4 w-4 fill-[#FF6B6B] text-[#FF6B6B]"
    : "h-4 w-4 text-slate-400";

  return (
    <header className={cn("sticky top-0 z-50 border-b border-slate-200/60 bg-cream/70 backdrop-blur-xl", isScrolled && "shadow-sm")}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[#0F172A] transition-opacity hover:opacity-90"
          aria-label="Wanderlust home"
        >
          <span className="text-lg leading-none" aria-hidden="true">
            🧭
          </span>
          <span
            className="text-xl font-bold leading-none tracking-tight text-slate-900 sm:text-2xl"
            style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
          >
            Wanderlust
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative inline-flex items-center gap-2 pb-2 text-sm font-medium tracking-wide text-slate-700 transition-colors hover:text-slate-900",
                  active && "font-semibold text-slate-900",
                )}
              >
                {link.label === "Favorites" ? (
                  <span className="inline-flex items-center gap-2">
                    <Heart className={heartIconClass} aria-hidden="true" />
                    <span>{link.label}</span>
                    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 py-0.5 text-[0.65rem] font-semibold leading-none text-white">
                      {favoritesCount}
                    </span>
                  </span>
                ) : (
                  <span>{link.label}</span>
                )}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-[#FF6B6B] transition-transform duration-300",
                    active && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-300 p-2 text-[#0F172A] transition hover:bg-slate-50 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 md:hidden",
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col px-4 py-3 sm:px-6" aria-label="Mobile primary">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "inline-flex items-center justify-between rounded-lg px-2 py-3 text-sm font-medium text-[#0F172A] transition-colors hover:bg-slate-50 hover:text-[#FF6B6B]",
                  active && "bg-[#FF6B6B]/10 text-[#FF6B6B]",
                )}
              >
                {link.label === "Favorites" ? (
                  <span className="inline-flex items-center gap-2">
                    <Heart className={heartIconClass} aria-hidden="true" />
                    <span>{link.label}</span>
                  </span>
                ) : (
                  <span>{link.label}</span>
                )}
                {link.label === "Favorites" ? (
                  <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 py-0.5 text-[0.65rem] font-semibold leading-none text-white">
                    {favoritesCount}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
