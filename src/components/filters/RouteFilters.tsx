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
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const isActive = visibleFilter === item.id;

        return (
          <Button
            key={item.id}
            type="button"
            variant="ghost"
            onClick={() => onFilterChange(item.id)}
            className={`relative overflow-hidden border px-4 ${
              isActive
                ? "border-stone-500/25 text-stone-950"
                : "border-stone-400/18 bg-white/55 text-stone-700 hover:text-stone-950"
            }`}
          >
            {isActive ? (
              <motion.span
                layoutId="route-filter-pill"
                className="absolute inset-0 rounded-full bg-[#f5efdf]"
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
