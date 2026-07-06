import { motion } from "framer-motion";
import { Flag, Landmark, Route, Scale, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import type { JourneyStep } from "@/types/trail";

const iconMap = {
  landmark: Landmark,
  scale: Scale,
  route: Route,
  users: Users,
  flag: Flag,
};

interface JourneySidebarProps {
  steps: JourneyStep[];
  className?: string;
}

export function JourneySidebar({ steps, className }: JourneySidebarProps) {
  return (
    <aside id="journey" className={cn("lg:sticky lg:top-6 lg:h-fit", className)}>
      <div className="paper-panel overflow-hidden rounded-[2rem] p-6">
        <div className="rounded-[1.6rem] border border-stone-400/18 bg-[#152722] px-5 py-6 text-stone-50 shadow-[0_14px_36px_rgba(20,28,24,0.22)]">
          <p className="section-kicker text-stone-300">The Journey</p>
          <h2 className="mt-3 font-display text-4xl leading-none">1830 to 1842</h2>
          <p className="mt-4 text-sm leading-7 text-stone-200/88">
            Read the map like a narrative. Each stop sits inside a longer chain of law, detention,
            military power, and survival.
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            const isActive = step.id === "the-route";

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.45 }}
                className={cn(
                  "rounded-[1.4rem] border px-4 py-4 transition",
                  isActive
                    ? "border-[#d8c296]/35 bg-[#f3ecde]/88 shadow-[0_12px_30px_rgba(73,52,26,0.08)]"
                    : "border-stone-400/14 bg-white/50",
                )}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border",
                      isActive
                        ? "border-[#d6b36c]/40 bg-[#17312a] text-[#f6efdf]"
                        : "border-stone-400/20 bg-white/85 text-stone-700",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                      {index + 1}
                    </p>
                    <h3 className="mt-2 font-display text-[1.65rem] leading-none text-stone-950">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-700">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-5 rounded-[1.6rem] border border-stone-400/14 bg-[#ede5d5]/92 p-5">
          <p className="font-display text-[1.55rem] italic leading-8 text-stone-900">
            “This was not empty land and it was not voluntary movement.”
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.28em] text-stone-500">
            Context card
          </p>
        </div>
      </div>
    </aside>
  );
}
