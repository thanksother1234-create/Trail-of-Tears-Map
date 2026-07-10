import { motion } from "framer-motion";
import { Flag, Landmark, Route, Scale, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import type { JourneyStep, JourneyStepId } from "@/types/trail";

const iconMap = {
  landmark: Landmark,
  scale: Scale,
  route: Route,
  users: Users,
  flag: Flag,
};

interface JourneySidebarProps {
  activeStepId: JourneyStepId;
  steps: JourneyStep[];
  className?: string;
}

export function JourneySidebar({ activeStepId, steps, className }: JourneySidebarProps) {
  return (
    <aside id="journey" className={cn("lg:sticky lg:top-6 lg:h-fit", className)}>
      <div className="paper-panel overflow-hidden rounded-[2rem] p-6">
        <div className="rounded-[1.6rem] border border-stone-400/18 bg-[#152722] px-5 py-6 text-stone-50 shadow-[0_14px_36px_rgba(20,28,24,0.22)]">
          <p className="section-kicker text-stone-300">The Journey</p>
          <h2 className="mt-3 font-display text-4xl leading-none">A guided reading path</h2>
          <p className="mt-4 text-sm leading-7 text-stone-200/88">
            Move through the sections in order if you want the page to feel less like an exhibit
            label and more like a lived sequence of policy, confinement, transport, and survival.
          </p>
          <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-stone-200">
            1830 to 1842
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon];
            const isActive = step.id === activeStepId;

            return (
              <motion.div
                key={step.id}
                id={step.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.45 }}
                className={cn(
                  "scroll-mt-8 rounded-[1.55rem] border px-4 py-4 transition",
                  isActive
                    ? "border-[#d8c296]/35 bg-[linear-gradient(180deg,rgba(246,239,223,0.96),rgba(240,231,214,0.9))] shadow-[0_12px_30px_rgba(73,52,26,0.08)]"
                    : "border-stone-400/14 bg-white/54 hover:bg-white/68",
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

        <div className="mt-5 rounded-[1.6rem] border border-stone-400/14 bg-[linear-gradient(180deg,rgba(237,229,213,0.96),rgba(233,223,204,0.92))] p-5">
          <p className="font-display text-[1.55rem] italic leading-8 text-stone-900">
            “The removal of the Indians beyond the white settlements is necessary for their own
            good and for the permanent prosperity of ours.”
          </p>
          <p className="mt-4 text-sm leading-6 text-stone-700">
            - President Andrew Jackson, 1830
          </p>
        </div>
      </div>
    </aside>
  );
}
