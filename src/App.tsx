import { useState } from "react";

import { RouteFilters } from "@/components/filters/RouteFilters";
import { HeroHeader } from "@/components/layout/HeroHeader";
import { JourneySidebar } from "@/components/layout/JourneySidebar";
import { TrailMap } from "@/components/map/TrailMap";
import { InfoPanel } from "@/components/panels/InfoPanel";
import { StatementBanner } from "@/components/sections/StatementBanner";
import { RemovalTimeline } from "@/components/timeline/RemovalTimeline";
import { journeySteps, routeLookup, routeOrder, timelineEvents, trailRoutes } from "@/data/trailData";
import type { JourneyStepId, RouteFilter, RouteId } from "@/types/trail";

const initialRouteId: RouteId = "cherokee";
const initialLocationId = routeLookup[initialRouteId].locations[0]?.id ?? "";
const initialJourneyStepId: JourneyStepId = "the-route";

export default function App() {
  const [visibleFilter, setVisibleFilter] = useState<RouteFilter>("all");
  const [selectedRouteId, setSelectedRouteId] = useState<RouteId>(initialRouteId);
  const [selectedLocationId, setSelectedLocationId] = useState(initialLocationId);
  const [activeNavLabel, setActiveNavLabel] = useState("The Route");
  const [activeJourneyStepId, setActiveJourneyStepId] =
    useState<JourneyStepId>(initialJourneyStepId);

  const selectedRoute = routeLookup[selectedRouteId];
  const selectedLocation =
    selectedRoute.locations.find((location) => location.id === selectedLocationId) ??
    selectedRoute.locations[0];

  function syncRouteSelection(routeId: RouteId, locationId?: string) {
    const route = routeLookup[routeId];
    const nextLocationId = locationId ?? route.locations[0]?.id ?? "";

    setSelectedRouteId(routeId);
    setSelectedLocationId(nextLocationId);
  }

  function handleFilterChange(filter: RouteFilter) {
    setVisibleFilter(filter);

    if (filter !== "all") {
      syncRouteSelection(filter);
    }
  }

  function handleRouteSelect(routeId: RouteId) {
    const activeLocationIsOnRoute = routeLookup[routeId].locations.some(
      (location) => location.id === selectedLocationId,
    );

    syncRouteSelection(routeId, activeLocationIsOnRoute ? selectedLocationId : undefined);
  }

  function handleLocationSelect(routeId: RouteId, locationId: string) {
    syncRouteSelection(routeId, locationId);
  }

  function handleHeroNavigate(navLabel: string, journeyStepId?: JourneyStepId) {
    setActiveNavLabel(navLabel);

    if (journeyStepId) {
      setActiveJourneyStepId(journeyStepId);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroHeader
        journeySteps={journeySteps}
        activeNavLabel={activeNavLabel}
        onNavigate={handleHeroNavigate}
      />

      <main className="mx-auto max-w-[1720px] px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid gap-6 pt-6 lg:grid-cols-[320px_minmax(0,1fr)] xl:gap-8 xl:pt-8">
          <JourneySidebar
            steps={journeySteps}
            activeStepId={activeJourneyStepId}
            className="hidden lg:block"
          />

          <section className="min-w-0 space-y-6 xl:space-y-8">
            <div
              id="route"
              className="paper-panel relative overflow-hidden rounded-[2rem] px-5 py-6 sm:px-8 sm:py-7"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
              <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(191,145,67,0.24),transparent_72%)]" />

              <div className="relative flex flex-col gap-5">
                <div className="w-full">
                  <p className="section-kicker">The Route</p>
                  <h2 className="mt-3 w-full font-display text-4xl leading-none tracking-tight text-stone-950 sm:text-5xl xl:text-[4rem]">
                    Follow the forced paths west and trace where each nation was pushed.
                  </h2>
                  <p className="mt-4 text-pretty text-sm leading-7 text-stone-700 sm:text-base">
                    Select a route or a location to move through the geography of removal. The map,
                    timeline, and narrative panel stay linked so the journey reads like a guided
                    historical atlas instead of a static diagram.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-stone-600">
                  <span className="rounded-full border border-stone-400/30 bg-white/55 px-4 py-2">
                    Five Nations
                  </span>
                  <span className="rounded-full border border-stone-400/30 bg-white/55 px-4 py-2">
                    1830 to 1842
                  </span>
                  <span className="rounded-full border border-stone-400/30 bg-white/55 px-4 py-2">
                    Interactive historical map
                  </span>
                </div>

                <RouteFilters
                  routeOrder={routeOrder}
                  routes={routeLookup}
                  visibleFilter={visibleFilter}
                  onFilterChange={handleFilterChange}
                />

                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
                  <TrailMap
                    routes={trailRoutes}
                    selectedRouteId={selectedRouteId}
                    selectedLocationId={selectedLocation.id}
                    visibleFilter={visibleFilter}
                    onRouteSelect={handleRouteSelect}
                    onLocationSelect={handleLocationSelect}
                  />

                  <InfoPanel route={selectedRoute} location={selectedLocation} />
                </div>
              </div>
            </div>

            <RemovalTimeline
              events={timelineEvents}
              activeEventId={selectedRoute.featuredEventId}
              onEventSelect={(routeId) => {
                if (!routeId) {
                  return;
                }

                setVisibleFilter("all");
                syncRouteSelection(routeId);
              }}
            />

            <StatementBanner />
          </section>
        </div>
      </main>
    </div>
  );
}
