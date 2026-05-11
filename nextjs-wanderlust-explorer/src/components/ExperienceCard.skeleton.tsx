export default function ExperienceCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-muted/15 bg-cream shadow-[0_14px_34px_-24px_rgb(15_23_42/0.45)] animate-pulse">
      <div className="aspect-[4/3] bg-slate-muted/20" />

      <div className="space-y-4 p-5">
        <div className="h-4 w-24 rounded-full bg-slate-muted/25" />

        <div className="space-y-2">
          <div className="h-5 w-full rounded bg-slate-muted/20" />
          <div className="h-5 w-2/3 rounded bg-slate-muted/20" />
        </div>

        <div className="h-4 w-40 rounded bg-slate-muted/20" />

        <div className="flex items-center justify-between">
          <div className="h-4 w-28 rounded bg-slate-muted/20" />
          <div className="h-6 w-20 rounded-full bg-slate-muted/20" />
        </div>

        <div className="h-4 w-32 rounded bg-slate-muted/20" />
      </div>
    </article>
  );
}
