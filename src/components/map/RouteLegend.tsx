import type { TrailRoute } from "@/types/trail";

interface RouteLegendProps {
  routes: TrailRoute[];
}

export function RouteLegend({ routes }: RouteLegendProps) {
  return (
    <div className="grid gap-2 rounded-[1.35rem] border border-stone-400/18 bg-white/86 p-4 shadow-[0_14px_35px_rgba(36,24,13,0.1)] backdrop-blur-xl sm:max-w-xs">
      <p className="section-kicker text-[0.64rem]">Route Key</p>
      {routes.map((route) => (
        <div key={route.id} className="flex items-center gap-3 text-sm text-stone-700">
          <span className="h-1.5 w-8 rounded-full" style={{ backgroundColor: route.color }} />
          <span>{route.label}</span>
        </div>
      ))}
    </div>
  );
}
