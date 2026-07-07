import { Fragment, useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Pane,
  Polygon,
  Polyline,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import { divIcon, latLngBounds, type LatLngTuple } from "leaflet";

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

const indianTerritoryOutline: LatLngTuple[] = [
  [37.0, -103.0],
  [36.5, -103.0],
  [36.5, -100.0],
  [34.56, -100.0],
  [34.56, -94.43],
  [37.0, -94.43],
];

const indianTerritoryLabelIcon = divIcon({
  className: "indian-territory-label",
  html: '<span class="indian-territory-label__title">Indian Territory</span>',
  iconAnchor: [72, 12],
  iconSize: [144, 24],
});

function MapViewport({ routes }: { routes: TrailRoute[] }) {
  const map = useMap();

  useEffect(() => {
    const coordinates = routes.flatMap((route) => route.lineCoordinates);

    if (coordinates.length === 0) {
      return;
    }

    map.fitBounds(latLngBounds(coordinates).pad(0.1), {
      animate: true,
      duration: 0.9,
      maxZoom: 5.9,
    });
  }, [map, routes]);

  return null;
}

function TerritoryOverlay() {
  return (
    <>
      <Pane name="territory-glow" style={{ zIndex: 285 }}>
        <Polygon
          interactive={false}
          positions={indianTerritoryOutline}
          pathOptions={{
            color: "#edf3e3",
            fillOpacity: 0,
            opacity: 0.32,
            weight: 10,
          }}
        />
      </Pane>

      <Pane name="territory-fill" style={{ zIndex: 290 }}>
        <Polygon
          interactive={false}
          positions={indianTerritoryOutline}
          pathOptions={{
            color: "#7f8f67",
            fillColor: "#becba6",
            fillOpacity: 0.34,
            opacity: 0.86,
            weight: 1.4,
          }}
        />
        <Marker interactive={false} position={[35.78, -98.62]} icon={indianTerritoryLabelIcon} />
      </Pane>
    </>
  );
}

interface HistoricalRouteLineProps {
  isSelected: boolean;
  isVisibleAlone: boolean;
  onRouteSelect: (routeId: RouteId) => void;
  route: TrailRoute;
}

function HistoricalRouteLine({
  isSelected,
  isVisibleAlone,
  onRouteSelect,
  route,
}: HistoricalRouteLineProps) {
  const outerOpacity = isVisibleAlone ? 0.92 : isSelected ? 0.9 : 0.8;
  const routeOpacity = isVisibleAlone ? 0.98 : isSelected ? 0.98 : 0.84;

  return (
    <>
      <Polyline
        interactive={false}
        positions={route.lineCoordinates}
        pathOptions={{
          color: "#f8f1df",
          lineCap: "round",
          lineJoin: "round",
          opacity: outerOpacity,
          weight: isSelected ? 12 : 9.4,
        }}
      />
      <Polyline
        interactive={false}
        positions={route.lineCoordinates}
        pathOptions={{
          color: route.color,
          lineCap: "round",
          lineJoin: "round",
          opacity: routeOpacity,
          weight: isSelected ? 7.1 : 5.25,
        }}
      />
      <Polyline
        positions={route.lineCoordinates}
        pathOptions={{
          color: "#fff6e4",
          lineCap: "round",
          lineJoin: "round",
          opacity: isVisibleAlone ? 0.34 : isSelected ? 0.32 : 0.18,
          weight: isSelected ? 1.6 : 1.2,
        }}
        eventHandlers={{
          click: () => onRouteSelect(route.id),
        }}
      />
    </>
  );
}

export function TrailMap({
  routes,
  selectedRouteId,
  selectedLocationId,
  visibleFilter,
  onRouteSelect,
  onLocationSelect,
}: TrailMapProps) {
  const visibleRoutes =
    visibleFilter === "all" ? routes : routes.filter((route) => route.id === visibleFilter);
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(195,143,53,0.18),transparent_24%),radial-gradient(circle_at_18%_72%,rgba(120,145,110,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.18),rgba(239,230,214,0.06))]" />
        <div className="relative overflow-hidden rounded-[1.55rem] border border-stone-400/16 shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_18px_40px_rgba(45,30,15,0.09)]">
          <div className="pointer-events-none absolute inset-0 z-[350] bg-[linear-gradient(180deg,rgba(255,255,255,0.26),transparent_16%,transparent_82%,rgba(63,44,23,0.08)),radial-gradient(circle_at_14%_26%,rgba(189,205,164,0.12),transparent_22%),radial-gradient(circle_at_84%_78%,rgba(84,123,152,0.12),transparent_24%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[360] h-24 bg-[linear-gradient(180deg,transparent,rgba(28,23,16,0.08))]" />

          <MapContainer
            center={[34.6, -89.8]}
            zoom={5}
            minZoom={4}
            maxZoom={8}
            preferCanvas={true}
            zoomControl={false}
            scrollWheelZoom={false}
            className="h-[500px] w-full sm:h-[580px] xl:h-[640px]"
          >
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            />
            <ZoomControl position="bottomright" />
            <MapViewport routes={visibleRoutes} />
            <TerritoryOverlay />

            {drawOrder.map((route) => {
              const isSelected = route.id === selectedRouteId;

              return (
                <Fragment key={route.id}>
                  <HistoricalRouteLine
                    isSelected={isSelected}
                    isVisibleAlone={visibleFilter !== "all"}
                    onRouteSelect={onRouteSelect}
                    route={route}
                  />

                  {route.locations.map((location) => {
                    const isLocationSelected = selectedLocationId === location.id;

                    return (
                      <CircleMarker
                        key={location.id}
                        center={location.coordinates}
                        radius={isLocationSelected ? 9.4 : isSelected ? 7 : 6}
                        pathOptions={{
                          color: "#fff7ea",
                          fillColor: route.color,
                          fillOpacity: isLocationSelected ? 1 : 0.94,
                          opacity: isSelected || visibleFilter !== "all" ? 1 : 0.9,
                          weight: isLocationSelected ? 3.2 : 2.3,
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
        </div>
      </div>

      <div className="grid gap-4 lg:gap-5">
        <RouteLegend className="w-full sm:max-w-md" routes={routes} />
        <p className="text-xs uppercase tracking-[0.24em] text-stone-600">
          Approximate routes shown for educational context.
        </p>
      </div>
    </div>
  );
}
