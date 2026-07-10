export type RouteId = "cherokee" | "choctaw" | "chickasaw" | "creek" | "seminole";

export type RouteFilter = RouteId | "all";

export type JourneyStepId =
  | "before-removal"
  | "the-law"
  | "the-route"
  | "the-human-cost"
  | "conclusion";

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

export interface RouteLine {
  id: string;
  label: string;
  transport: "land" | "water" | "mixed";
  coordinates: [number, number][];
}

export interface TrailRoute {
  id: RouteId;
  tribe: string;
  label: string;
  color: string;
  overview: string;
  readingLens: string;
  displacement: string;
  featuredEventId: string;
  sources: SourceLink[];
  routeLines: RouteLine[];
  locations: RouteLocation[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  summary: string;
  routeId?: RouteId;
  locationId?: string;
}

export interface JourneyStep {
  id: JourneyStepId;
  title: string;
  description: string;
  icon: "landmark" | "scale" | "route" | "users" | "flag";
}
