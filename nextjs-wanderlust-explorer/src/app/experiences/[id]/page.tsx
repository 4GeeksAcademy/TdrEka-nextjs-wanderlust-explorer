import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import ExperienceDetailActions from "@/components/ExperienceDetailActions";
import { EXPERIENCES } from "@/data/experiences";
import type { Experience } from "@/types/experience";

type PageProps = {
  params: { id: string };
};

const INCLUDED_BY_CATEGORY: Record<Experience["category"], string[]> = {
  Adventure: [
    "Expert local adventure guide",
    "Safety briefing and technical support",
    "Premium small-group transportation",
    "Hydration and trail-side refreshments",
    "Curated photo stops at signature viewpoints",
  ],
  Culture: [
    "Specialist cultural storyteller",
    "Priority access to key heritage spaces",
    "Hands-on craft or ritual demonstration",
    "Context booklet with local history notes",
    "Small-group format for deeper discussion",
  ],
  Food: [
    "Professional chef or culinary host",
    "Ingredient sourcing at a local market",
    "Tasting flight across regional specialties",
    "Seasonal menu and recipe booklet",
    "Pairing guidance with local beverages",
  ],
  Wellness: [
    "Certified wellness practitioner",
    "Mindful movement or breathwork session",
    "Premium mats, props, and amenities",
    "Herbal tea or recovery refreshments",
    "Quiet cooldown and reflection time",
  ],
  Nature: [
    "Naturalist guide with local expertise",
    "Protected-area entry and permit handling",
    "Wildlife spotting equipment as needed",
    "Low-impact trail and habitat briefing",
    "Picnic break in a scenic location",
  ],
};

function buildDescription(experience: Experience): string {
  return `${experience.description} Designed for travelers who value depth over rush, this itinerary layers insider context with generous time to absorb each setting. Along the way, your host threads practical local insight with story-driven moments so the experience feels both effortless and personal. By the end, you will have a richer sense of ${experience.destination.city} and memories that feel distinctly your own.`;
}

function getMeetingPoint(experience: Experience): string {
  return `${experience.destination.city} Welcome Lounge, 24 Explorer Lane, ${experience.destination.country}`;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const experience = EXPERIENCES.find((e) => e.id === params.id);
  return {
    title: experience
      ? `${experience.title} | Wanderlust`
      : "Experience Not Found | Wanderlust",
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = params;
  const experience = EXPERIENCES.find((item) => item.id === id);

  if (!experience) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
        <div className="glass rounded-3xl border border-slate-muted/20 px-8 py-12">
          <div className="text-5xl" aria-hidden="true">
            🧭
          </div>
          <h1
            className="mt-4 text-3xl text-primary sm:text-4xl"
            style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
          >
            Experience not found
          </h1>
          <p className="mt-3 text-sm text-slate-muted sm:text-base">
            The journey you are looking for may have moved off the map.
          </p>
          <Link
            href="/experiences"
            className="mt-7 inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:brightness-110"
          >
            Back to Explorer
          </Link>
        </div>
      </div>
    );
  }

  const reviewCount = Math.round(experience.rating * 20);
  const includes = INCLUDED_BY_CATEGORY[experience.category];
  const moreLikeThis = EXPERIENCES.filter(
    (item) => item.category === experience.category && item.id !== experience.id,
  ).slice(0, 3);

  return (
    <div className="bg-cream">
      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={experience.imageUrl}
          alt={experience.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />

        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-sm sm:text-sm">
            {experience.category}
          </span>
          <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-white/80 sm:text-base">
            {experience.destination.city}, {experience.destination.country}
          </p>
          <h1
            className="mt-3 max-w-4xl text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
          >
            {experience.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3 md:py-14 lg:px-8">
        <div className="space-y-10 md:col-span-2">
          <article className="space-y-4 text-[1.04rem] leading-relaxed text-primary/85">
            <h2
              className="text-2xl text-primary sm:text-3xl"
              style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
            >
              Experience Overview
            </h2>
            <p>{buildDescription(experience)}</p>
          </article>

          <article className="space-y-4">
            <h2
              className="text-2xl text-primary sm:text-3xl"
              style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
            >
              What&apos;s Included
            </h2>
            <ul className="space-y-2 text-sm text-slate-muted sm:text-base">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="glass rounded-2xl border border-slate-muted/15 p-5 sm:p-6">
            <h2
              className="text-2xl text-primary sm:text-3xl"
              style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
            >
              Meeting Point
            </h2>
            <div className="mt-4 flex items-start gap-3 text-slate-muted">
              <MapPin className="mt-0.5 h-5 w-5 text-accent" aria-hidden="true" />
              <p className="text-sm sm:text-base">{getMeetingPoint(experience)}</p>
            </div>
          </article>
        </div>

        <aside className="md:col-span-1">
          <div className="glass sticky top-24 rounded-3xl border border-slate-muted/20 p-6 shadow-[0_18px_38px_-24px_rgb(15_23_42/0.5)]">
            <p className="text-sm uppercase tracking-[0.12em] text-slate-muted">Price</p>
            <p
              className="mt-2 text-3xl text-primary"
              style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
            >
              From ${experience.price} per person
            </p>

            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-muted">
                <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
                <span className="text-sm font-medium text-primary">{experience.rating.toFixed(1)}</span>
                <span className="text-sm">({reviewCount} reviews)</span>
              </div>
              <span className="rounded-full bg-slate-muted/10 px-3 py-1 text-xs font-semibold text-slate-muted">
                {experience.duration}
              </span>
            </div>

            <button
              type="button"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] hover:brightness-110"
            >
              Book Now
            </button>

            <div className="mt-4 flex justify-end">
              <ExperienceDetailActions experienceId={experience.id} />
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2
            className="text-2xl text-primary sm:text-3xl"
            style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
          >
            More Like This
          </h2>
          <Link
            href={`/experiences?category=${encodeURIComponent(experience.category)}`}
            className="text-sm font-medium text-slate-muted transition-colors hover:text-primary"
          >
            View all {experience.category}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {moreLikeThis.map((item) => (
            <Link
              key={item.id}
              href={`/experiences/${item.id}`}
              className="card-hover glass flex items-stretch gap-4 overflow-hidden rounded-2xl border border-slate-muted/15 p-3"
            >
              <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <div className="min-w-0 py-1">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-muted">{item.category}</p>
                <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-muted">
                  {item.destination.city}, {item.destination.country}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
