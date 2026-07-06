export type RouteId = "cherokee" | "choctaw" | "chickasaw" | "creek" | "seminole";

export type RouteFilter = RouteId | "all";

export interface SourceLink {
  label: string;
  url: string;
}

export interface RouteLocation {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  coordinates: [number, number];
  description: string;
  significance: string;
}

export interface TrailRoute {
  id: RouteId;
  tribe: string;
  label: string;
  color: string;
  overview: string;
  displacement: string;
  featuredEventId: string;
  sources: SourceLink[];
  lineCoordinates: [number, number][];
  locations: RouteLocation[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  summary: string;
  routeId?: RouteId;
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: "landmark" | "scale" | "route" | "users" | "flag";
}
