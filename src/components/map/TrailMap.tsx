import { Fragment, useEffect } from "react";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, ZoomControl, useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";

import { RouteLegend } from "@/components/map/RouteLegend";
import type { RouteFilter, RouteId, TrailRoute } from "@/types/trail";

interface TrailMapProps {
  routes: TrailRoute[];
  selectedRouteId: RouteId;
  selectedLocationId: string;
  visibleFilter: RouteFilter;
  onRouteSelect: (routeId: RouteId) => void;
  onLocationSelect: (routeId: RouteId, locationId: string) => void;
}

function MapViewport({ routes }: { routes: TrailRoute[] }) {
  const map = useMap();

  useEffect(() => {
    const coordinates = routes.flatMap((route) => route.lineCoordinates);

    if (coordinates.length === 0) {
      return;
    }

    map.fitBounds(latLngBounds(coordinates).pad(0.2), {
      animate: true,
      duration: 0.9,
    });
  }, [map, routes]);

  return null;
}

export function TrailMap({
  routes,
  selectedRouteId,
  selectedLocationId,
  visibleFilter,
  onRouteSelect,
  onLocationSelect,
}: TrailMapProps) {
  const visibleRoutes = visibleFilter === "all" ? routes : routes.filter((route) => route.id === visibleFilter);
  const drawOrder = [...visibleRoutes].sort((left, right) => {
    if (left.id === selectedRouteId) {
      return 1;
    }

    if (right.id === selectedRouteId) {
      return -1;
    }

    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="paper-panel relative overflow-hidden rounded-[1.9rem] p-3 sm:p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(195,143,53,0.16),transparent_24%),radial-gradient(circle_at_20%_70%,rgba(36,114,176,0.1),transparent_26%)]" />
        <div className="relative overflow-hidden rounded-[1.55rem] border border-stone-400/16">
          <div className="absolute inset-0 z-[350] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent_14%,transparent_86%,rgba(0,0,0,0.04))] pointer-events-none" />

          <MapContainer
            center={[34.6, -89.8]}
            zoom={5}
            minZoom={4}
            maxZoom={8}
            zoomControl={false}
            scrollWheelZoom={false}
            className="h-[480px] w-full sm:h-[560px] xl:h-[620px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <ZoomControl position="bottomright" />
            <MapViewport routes={visibleRoutes} />

            {drawOrder.map((route) => {
              const isSelected = route.id === selectedRouteId;

              return (
                <Fragment key={route.id}>
                  <Polyline
                    positions={route.lineCoordinates}
                    pathOptions={{
                      color: route.color,
                      weight: isSelected ? 7 : 4.2,
                      opacity: visibleFilter === "all" ? (isSelected ? 0.96 : 0.52) : 0.94,
                      lineCap: "round",
                    }}
                    eventHandlers={{
                      click: () => onRouteSelect(route.id),
                    }}
                  />

                  {route.locations.map((location) => {
                    const isLocationSelected = selectedLocationId === location.id;

                    return (
                      <CircleMarker
                        key={location.id}
                        center={location.coordinates}
                        radius={isLocationSelected ? 8.5 : isSelected ? 6.4 : 5.5}
                        pathOptions={{
                          color: "#fff7ea",
                          weight: isLocationSelected ? 3 : 2.2,
                          fillColor: route.color,
                          fillOpacity: isLocationSelected ? 1 : 0.92,
                        }}
                        eventHandlers={{
                          click: () => onLocationSelect(route.id, location.id),
                        }}
                      >
                        <Tooltip direction="top" offset={[0, -10]}>
                          {location.title}
                        </Tooltip>
                      </CircleMarker>
                    );
                  })}
                </Fragment>
              );
            })}
          </MapContainer>

          <div className="pointer-events-none absolute bottom-5 left-5 z-[400] hidden md:block">
            <RouteLegend routes={routes} />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <RouteLegend routes={routes} />
      </div>

      <p className="text-xs uppercase tracking-[0.24em] text-stone-600">
        Approximate routes shown for educational context.
      </p>
    </div>
  );
}
