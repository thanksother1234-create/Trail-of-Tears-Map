import { cn } from "@/lib/utils";
import type { TrailRoute } from "@/types/trail";

interface RouteLegendProps {
  className?: string;
  routes: TrailRoute[];
}

export function RouteLegend({ className, routes }: RouteLegendProps) {
  return (
    <div
      className={cn(
        "grid w-full gap-4 rounded-[1.45rem] border border-stone-400/18 bg-white/95 p-4 shadow-[0_14px_35px_rgba(36,24,13,0.1)] md:grid-cols-[minmax(220px,1.05fr)_repeat(2,minmax(0,1fr))] xl:grid-cols-[minmax(240px,1.05fr)_repeat(5,minmax(0,1fr))]",
        className,
      )}
    >
      <div className="space-y-1 md:pr-4">
        <p className="section-kicker text-[0.64rem]">Route Key</p>
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
          Color separates nations; dashed segments indicate water travel
        </p>
      </div>
      {routes.map((route) => (
        <div key={route.id} className="flex items-center gap-3 text-sm text-stone-700">
          <span className="relative h-3 w-11 shrink-0">
            <span className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full bg-[#f8f1df]" />
            <span
              className="absolute inset-x-0 top-1/2 h-[0.34rem] -translate-y-1/2 rounded-full"
              style={{ backgroundColor: route.color }}
            />
          </span>
          <span className="font-medium">{route.label}</span>
        </div>
      ))}
    </div>
  );
}
