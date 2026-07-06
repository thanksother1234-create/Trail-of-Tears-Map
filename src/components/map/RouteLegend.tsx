import type { TrailRoute } from "@/types/trail";

interface RouteLegendProps {
  routes: TrailRoute[];
}

export function RouteLegend({ routes }: RouteLegendProps) {
  return (
    <div className="grid gap-3 rounded-[1.35rem] border border-stone-400/18 bg-white/90 p-4 shadow-[0_14px_35px_rgba(36,24,13,0.1)] backdrop-blur-xl sm:max-w-sm">
      <div className="space-y-1">
        <p className="section-kicker text-[0.64rem]">Route Key</p>
        <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
          Indian Territory highlighted in sage
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
