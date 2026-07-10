import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";

import { RouteFilters } from "@/components/filters/RouteFilters";
import { HeroHeader } from "@/components/layout/HeroHeader";
import { JourneySidebar } from "@/components/layout/JourneySidebar";
import { TrailMap } from "@/components/map/TrailMap";
import { InfoPanel } from "@/components/panels/InfoPanel";
import { ContentFeedbackSection } from "@/components/sections/ContentFeedbackSection";
import { StatementBanner } from "@/components/sections/StatementBanner";
import { RemovalTimeline } from "@/components/timeline/RemovalTimeline";
import { journeySteps, routeLookup, routeOrder, timelineEvents, trailRoutes } from "@/data/trailData";
import type { JourneyStepId, RouteFilter, RouteId } from "@/types/trail";

const initialRouteId: RouteId = "cherokee";
const initialLocationId = routeLookup[initialRouteId].locations[0]?.id ?? "";
const initialJourneyStepId: JourneyStepId = "the-route";
const initialNavLabel = "The Route";

function resolveNavigationState(hash: string) {
  switch (hash) {
    case "#before-removal":
      return { navLabel: "The Lands", journeyStepId: "before-removal" as JourneyStepId };
    case "#the-law":
      return { navLabel: "The Law", journeyStepId: "the-law" as JourneyStepId };
    case "#route":
      return { navLabel: "The Route", journeyStepId: "the-route" as JourneyStepId };
    case "#impact":
      return { navLabel: "The Human Cost", journeyStepId: "the-human-cost" as JourneyStepId };
    case "#conclusion":
      return { navLabel: "Conclusion", journeyStepId: "conclusion" as JourneyStepId };
    case "#sources":
      return { navLabel: "Sources", journeyStepId: "conclusion" as JourneyStepId };
    case "#home":
      return { navLabel: "Home" };
    default:
      return undefined;
  }
}

export default function App() {
  const [visibleFilter, setVisibleFilter] = useState<RouteFilter>("all");
  const [selectedRouteId, setSelectedRouteId] = useState<RouteId>(initialRouteId);
  const [selectedLocationId, setSelectedLocationId] = useState(initialLocationId);
  const [activeNavLabel, setActiveNavLabel] = useState(initialNavLabel);
  const [activeJourneyStepId, setActiveJourneyStepId] = useState<JourneyStepId>(initialJourneyStepId);

  const selectedRoute = routeLookup[selectedRouteId];
  const selectedLocation =
    selectedRoute.locations.find((location) => location.id === selectedLocationId) ??
    selectedRoute.locations[0];

  useEffect(() => {
    function syncNavigationFromHash() {
      const currentHash = window.location.hash;

      if (!currentHash) {
        return;
      }

      const nextState = resolveNavigationState(currentHash);

      if (!nextState) {
        return;
      }

      setActiveNavLabel(nextState.navLabel);

      if (nextState.journeyStepId) {
        setActiveJourneyStepId(nextState.journeyStepId);
      }
    }

    syncNavigationFromHash();
    window.addEventListener("hashchange", syncNavigationFromHash);

    return () => {
      window.removeEventListener("hashchange", syncNavigationFromHash);
    };
  }, []);

  function syncRouteSelection(routeId: RouteId, locationId?: string) {
    const route = routeLookup[routeId];
    const nextLocationId = locationId ?? route.locations[0]?.id ?? "";

    setSelectedRouteId(routeId);
    setSelectedLocationId(nextLocationId);
  }

  function handleFilterChange(filter: RouteFilter) {
    setVisibleFilter(filter);
    setActiveNavLabel("The Route");
    setActiveJourneyStepId("the-route");

    if (filter !== "all") {
      syncRouteSelection(filter);
    }
  }

  function handleRouteSelect(routeId: RouteId) {
    const activeLocationIsOnRoute = routeLookup[routeId].locations.some(
      (location) => location.id === selectedLocationId,
    );

    setActiveNavLabel("The Route");
    setActiveJourneyStepId("the-route");
    syncRouteSelection(routeId, activeLocationIsOnRoute ? selectedLocationId : undefined);
  }

  function handleLocationSelect(routeId: RouteId, locationId: string) {
    setActiveNavLabel("The Route");
    setActiveJourneyStepId("the-route");
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
        activeNavLabel={activeNavLabel}
        activeStepId={activeJourneyStepId}
        journeySteps={journeySteps}
        onNavigate={handleHeroNavigate}
      />

      <main className="mx-auto max-w-[1720px] px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
        <div className="grid gap-6 pt-6 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-8 xl:pt-8">
          <JourneySidebar
            activeStepId={activeJourneyStepId}
            steps={journeySteps}
            className="hidden xl:block"
          />

          <section className="min-w-0 space-y-6 xl:space-y-8">
            <div
              id="route"
              className="paper-panel relative overflow-hidden rounded-[2rem] px-5 py-6 sm:px-8 sm:py-7"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-white/70" />
              <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(191,145,67,0.24),transparent_72%)]" />

              <div className="relative flex flex-col gap-5">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)] xl:items-end">
                  <div className="max-w-none">
                    <p className="section-kicker">The Route</p>
                    <h2 className="mt-3 max-w-none font-display text-4xl leading-[0.94] tracking-tight text-stone-950 sm:text-5xl xl:text-[4.3rem]">
                      Trace five removals, then notice how differently each nation was pushed west.
                    </h2>
                    <p className="mt-4 max-w-5xl text-pretty text-sm leading-7 text-stone-700 sm:text-base">
                      Choose a route or map stop to connect its geography with historical context.
                    </p>

                    <div className="mt-4 rounded-[1.45rem] border border-stone-400/14 bg-[#f8f2e6]/92 p-4 xl:hidden">
                      <p className="section-kicker text-[0.62rem]">Mobile reading tip</p>
                      <p className="mt-2 text-sm leading-6 text-stone-700">
                        Open the menu in the upper left for the journey guide and section links,
                        rotate to landscape for a wider map, and keep scrolling below the map for
                        the route panel, timeline, sources, and feedback form.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-[1.7rem] border border-stone-400/14 bg-[linear-gradient(180deg,rgba(22,42,36,0.95),rgba(19,35,31,0.92))] p-5 text-stone-100 shadow-[0_18px_36px_rgba(22,31,27,0.16)]">
                    <p className="section-kicker text-stone-400">How to use this atlas</p>
                    <div className="mt-4 space-y-3 text-sm leading-6 text-stone-300">
                      <p>Pick one nation first, then compare it against another rather than treating all five removals as interchangeable.</p>
                      <p>Clicking a stop updates the route panel so each location sits inside a larger system of policy, transport, and survival.</p>
                    </div>
                  </div>
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
                setActiveNavLabel("The Route");
                setActiveJourneyStepId("the-route");
                syncRouteSelection(routeId);
              }}
            />

            <StatementBanner />
            <ContentFeedbackSection selectedRouteLabel={selectedRoute.label} />
          </section>
        </div>
      </main>

      <Analytics />
    </div>
  );
}
