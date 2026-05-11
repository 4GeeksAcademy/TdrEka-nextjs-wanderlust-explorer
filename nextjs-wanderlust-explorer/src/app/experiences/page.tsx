import type { Metadata } from "next";
import { Suspense } from "react";
import ExperiencesPageClient from "@/components/pages/ExperiencesPageClient";

export const metadata: Metadata = {
  title: "Explore 100+ Experiences | Wanderlust",
  description:
    "Filter and browse curated travel experiences across adventure, culture, food, wellness, and nature.",
};

export default function ExperiencesPage() {
  return (
    <Suspense fallback={null}>
      <ExperiencesPageClient />
    </Suspense>
  );
}
