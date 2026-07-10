import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ExternalLink, MapPinned, Milestone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RouteLocation, TrailRoute } from "@/types/trail";

interface InfoPanelProps {
  route: TrailRoute;
  location: RouteLocation;
}

export function InfoPanel({ route, location }: InfoPanelProps) {
  return (
    <aside id="location-panel" className="xl:sticky xl:top-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Card className="relative overflow-hidden border-stone-400/18 bg-[linear-gradient(180deg,rgba(255,252,247,0.9),rgba(245,237,223,0.82))]">
            <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: route.color }} />

            <CardHeader className="space-y-5 p-6 pb-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge
                    className="mb-3"
                    style={{
                      backgroundColor: `${route.color}14`,
                      borderColor: `${route.color}40`,
                      color: route.color,
                    }}
                  >
                    {route.label}
                  </Badge>
                  <CardTitle className="text-2xl leading-none text-stone-950 sm:text-3xl">
                    {location.title}
                  </CardTitle>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{location.subtitle}</p>
                </div>

                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-white/75"
                  style={{ borderColor: `${route.color}40`, color: route.color }}
                >
                  <MapPinned className="h-5 w-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 text-sm text-stone-700 sm:grid-cols-2">
                <div className="rounded-[1.25rem] border border-stone-400/16 bg-white/64 p-3">
                  <div className="flex items-center gap-2 text-stone-500">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]">
                      When
                    </span>
                  </div>
                  <p className="mt-3 font-display text-2xl text-stone-950">{location.year}</p>
                </div>

                <div className="rounded-[1.25rem] border border-stone-400/16 bg-white/64 p-3">
                  <div className="flex items-center gap-2 text-stone-500">
                    <Milestone className="h-4 w-4" />
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em]">
                      Route stops
                    </span>
                  </div>
                  <p className="mt-3 font-display text-2xl text-stone-950">{route.locations.length}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5 p-6">
              <div
                className="relative overflow-hidden rounded-[1.6rem] border border-stone-400/16 p-5"
                style={{
                  background: `linear-gradient(135deg, ${route.color}22, rgba(255,255,255,0.84) 62%)`,
                }}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/30 blur-2xl" />
                <p className="section-kicker text-[0.64rem] text-stone-600">What happened here</p>
                <p className="mt-3 text-sm leading-7 text-stone-800">{location.description}</p>
              </div>

              <div>
                <p className="section-kicker text-[0.64rem] text-stone-600">Why this stop matters</p>
                <p className="mt-3 text-sm leading-7 text-stone-700">{location.significance}</p>
              </div>

              <Separator />

              <div>
                <p className="section-kicker text-[0.64rem] text-stone-600">How to read this route</p>
                <div className="mt-3 rounded-[1.4rem] border border-stone-400/16 bg-[#f7f1e5]/82 p-4">
                  <p className="text-sm leading-7 text-stone-800">{route.readingLens}</p>
                  <p className="mt-3 text-sm leading-7 text-stone-700">{route.displacement}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="section-kicker text-[0.64rem] text-stone-600">Further reading</p>
                <div className="mt-4 space-y-2">
                  {route.sources.map((source) => (
                    <a
                      key={source.label}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-[1.1rem] border border-stone-400/16 bg-white/64 px-4 py-3 text-sm text-stone-800 transition hover:border-stone-500/28 hover:bg-white/84"
                    >
                      <span>{source.label}</span>
                      <ExternalLink className="h-4 w-4 text-stone-500" />
                    </a>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
