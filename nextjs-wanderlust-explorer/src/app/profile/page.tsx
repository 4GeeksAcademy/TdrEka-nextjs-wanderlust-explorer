import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Compass, Heart, MapPin, Mountain, Sparkles, UtensilsCrossed } from "lucide-react";
import { EXPERIENCES } from "@/data/experiences";

export const metadata: Metadata = {
  title: "Alejandro's Profile | Wanderlust",
  description: "See profile stats, preferences, and recently viewed travel experiences.",
};

const PROFILE = {
  name: "Alejandro Rivera",
  location: "Valencia, Spain",
  memberSince: "March 2024",
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=alejandro",
};

const PREFERENCES = [
  { category: "Adventure", count: 18, icon: "🏄" },
  { category: "Culture", count: 14, icon: "🏛️" },
  { category: "Food", count: 21, icon: "🍜" },
  { category: "Wellness", count: 11, icon: "🌿" },
  { category: "Nature", count: 16, icon: "🏔️" },
];

const RECENT_IDS = ["exp-001", "exp-002", "exp-003", "exp-004"];

export default function ProfilePage() {
  const recentExperiences = RECENT_IDS.map((id) =>
    EXPERIENCES.find((experience) => experience.id === id),
  ).filter((experience) => experience !== undefined);

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="glass rounded-3xl border border-slate-muted/20 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md sm:h-28 sm:w-28">
              <Image
                src={PROFILE.avatar}
                alt={PROFILE.name}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            <div>
              <h1
                className="text-3xl text-primary sm:text-4xl"
                style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
              >
                {PROFILE.name}
              </h1>
              <p className="mt-1 text-sm text-slate-muted sm:text-base">📍 {PROFILE.location}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-muted">
                Member since {PROFILE.memberSince}
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Explorer Member
          </span>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="glass card-hover rounded-2xl border border-slate-muted/15 p-5">
          <div className="inline-flex rounded-full bg-accent/12 p-2 text-accent">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-3 text-2xl font-semibold text-primary">100</p>
          <p className="text-sm text-slate-muted">Experiences Available</p>
        </article>

        <article className="glass card-hover rounded-2xl border border-slate-muted/15 p-5">
          <div className="inline-flex rounded-full bg-accent/12 p-2 text-accent">
            <Heart className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-3 text-2xl font-semibold text-primary">0</p>
          <p className="text-sm text-slate-muted">Saved Favorites</p>
        </article>

        <article className="glass card-hover rounded-2xl border border-slate-muted/15 p-5">
          <div className="inline-flex rounded-full bg-accent/12 p-2 text-accent">
            <MapPin className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="mt-3 text-2xl font-semibold text-primary">20</p>
          <p className="text-sm text-slate-muted">Destinations</p>
        </article>
      </section>

      <section className="mt-10">
        <h2
          className="text-2xl text-primary sm:text-3xl"
          style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
        >
          My Preferences
        </h2>
        <p className="mt-2 text-sm text-slate-muted">Categories explored this season</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PREFERENCES.map((item) => (
            <article
              key={item.category}
              className="glass card-hover rounded-2xl border border-slate-muted/15 p-4"
            >
              <p className="text-2xl" aria-hidden="true">
                {item.icon}
              </p>
              <h3 className="mt-2 text-base font-semibold text-primary">{item.category}</h3>
              <p className="text-sm text-slate-muted">{item.count} explored</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 pb-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2
              className="text-2xl text-primary sm:text-3xl"
              style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
            >
              Recently Viewed
            </h2>
            <p className="mt-2 text-sm text-slate-muted">A quick way back to your last inspirations</p>
          </div>

          <div className="hidden items-center gap-2 text-slate-muted md:flex">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm">Curated for your travel mood</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {recentExperiences.map((experience, index) => (
            <Link
              key={experience.id}
              href={`/experiences/${experience.id}`}
              className="card-hover overflow-hidden rounded-2xl border border-slate-muted/15 bg-cream"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-auto sm:w-44">
                  <Image
                    src={experience.imageUrl}
                    alt={experience.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 176px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <span className="inline-flex rounded-full bg-slate-muted/10 px-2.5 py-1 text-xs font-medium text-slate-muted">
                      {experience.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-primary">
                      {experience.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-muted">
                      {experience.destination.city}, {experience.destination.country}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-slate-muted">
                    <span className="inline-flex items-center gap-1.5">
                      {index % 2 === 0 ? (
                        <Mountain className="h-4 w-4 text-accent" aria-hidden="true" />
                      ) : (
                        <UtensilsCrossed className="h-4 w-4 text-accent" aria-hidden="true" />
                      )}
                      {experience.duration}
                    </span>
                    <span className="font-semibold text-primary">From ${experience.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
