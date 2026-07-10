import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import type { RouteFilter, RouteId, TrailRoute } from "@/types/trail";

interface RouteFiltersProps {
  routeOrder: RouteId[];
  routes: Record<RouteId, TrailRoute>;
  visibleFilter: RouteFilter;
  onFilterChange: (filter: RouteFilter) => void;
}

export function RouteFilters({
  routeOrder,
  routes,
  visibleFilter,
  onFilterChange,
}: RouteFiltersProps) {
  const items: Array<{ id: RouteFilter; label: string; color?: string }> = [
    { id: "all", label: "All Routes" },
    ...routeOrder.map((routeId) => ({
      id: routeId,
      label: routes[routeId].tribe,
      color: routes[routeId].color,
    })),
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
      {items.map((item) => {
        const isActive = visibleFilter === item.id;

        return (
          <Button
            key={item.id}
            type="button"
            variant="ghost"
            onClick={() => onFilterChange(item.id)}
            className={`relative h-11 w-full justify-center overflow-hidden border px-4 sm:w-auto ${
              isActive
                ? "border-stone-500/25 text-stone-950 shadow-[0_10px_24px_rgba(55,39,18,0.06)]"
                : "border-stone-400/18 bg-white/55 text-stone-700 hover:bg-white/72 hover:text-stone-950"
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId="route-filter-pill"
                className="absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(245,239,223,0.98),rgba(239,230,209,0.92))]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
              />
            ) : null}

            {item.color ? (
              <span
                className="relative z-10 mr-2 h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
            ) : null}
            <span className="relative z-10">{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
