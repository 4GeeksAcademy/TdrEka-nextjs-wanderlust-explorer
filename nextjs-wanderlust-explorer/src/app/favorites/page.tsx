import type { Metadata } from "next";
import FavoritesPageClient from "@/components/pages/FavoritesPageClient";

export const metadata: Metadata = {
  title: "Your Saved Experiences | Wanderlust",
  description: "Review and manage your saved travel experiences in one place.",
};

export default function FavoritesPage() {
  return <FavoritesPageClient />;
}
