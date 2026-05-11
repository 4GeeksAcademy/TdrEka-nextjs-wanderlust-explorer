"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { FavoritesProvider } from "@/context/FavoritesContext";

interface ProvidersProps {
  children: React.ReactNode;
}

function ProvidersShell({ children }: ProvidersProps) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <main key={pathname} className="animate-page-enter flex-1">
        {children}
      </main>
    </>
  );
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <FavoritesProvider>
      <ProvidersShell>{children}</ProvidersShell>
    </FavoritesProvider>
  );
}