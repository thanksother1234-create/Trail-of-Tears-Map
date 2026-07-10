import { motion } from "framer-motion";
import type { RouteId, TimelineEvent } from "@/types/trail";

interface RemovalTimelineProps {
  events: TimelineEvent[];
  activeEventId: string;
  onEventSelect: (routeId?: RouteId) => void;
}

export function RemovalTimeline({ events, activeEventId, onEventSelect }: RemovalTimelineProps) {
  return (
    <section className="paper-panel overflow-hidden rounded-[2rem] px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="section-kicker">Timeline of Removal</p>
          <h3 className="mt-3 font-display text-3xl leading-none text-stone-950 sm:text-4xl">
            Removal unfolded in waves, not in one continuous march.
          </h3>
        </div>
        <p className="max-w-md text-sm leading-6 text-stone-600">
          Tap a tribe-linked moment to focus the route it sharpened. On smaller screens, swipe the
          timeline horizontally so the cards keep their breathing room.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto pb-2">
        <div className="min-w-[1020px] px-1 pb-1">
          <div className="relative">
            <div className="absolute inset-x-6 top-[2.55rem] h-px bg-stone-400/30" />
            <div className="grid grid-cols-6 gap-4">
              {events.map((event) => {
                const isActive = event.id === activeEventId;

                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onEventSelect(event.routeId)}
                    className="group flex h-full flex-col text-left"
                  >
                    <div className="mb-6 flex min-h-14 flex-col items-start px-3">
                      <div className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-stone-500">
                        {event.year}
                      </div>
                      <div className="mt-3 flex h-4 w-4 items-center justify-center rounded-full border border-stone-400/30 bg-[#f2eadb]">
                        {isActive ? (
                          <motion.span
                            layoutId="timeline-dot"
                            className="h-[0.62rem] w-[0.62rem] rounded-full bg-[#6b40ab]"
                            transition={{ type: "spring", duration: 0.45, bounce: 0.25 }}
                          />
                        ) : null}
                      </div>
                    </div>

                    <div
                      className={`flex-1 rounded-[1.5rem] border px-4 py-4 transition ${
                        isActive
                          ? "border-stone-500/20 bg-white/86 shadow-[0_12px_28px_rgba(42,29,17,0.08)]"
                          : "border-stone-400/14 bg-white/54 group-hover:border-stone-500/18 group-hover:bg-white/72"
                      }`}
                    >
                      <h4 className="font-display text-[1.7rem] leading-none text-stone-950">
                        {event.title}
                      </h4>
                      <p className="mt-3 text-sm leading-6 text-stone-700">{event.summary}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
